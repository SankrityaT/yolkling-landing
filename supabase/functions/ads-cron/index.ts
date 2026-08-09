// Supabase Edge Function, scheduled by pg_cron (see docs/sql/ads-cron-schedule.sql).
// Runs on Deno, not Node, so this is a self-contained port of the polling logic in
// app/api/ads/cron/route.ts, not a shared import. Its job: poll spend for active
// campaigns, write a snapshot, and if the observed lifetime total crosses the cap,
// call the app's own kill-switch endpoint (mutation logic stays in one place, the
// Next.js app, this function only reads platform spend and reports it).

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://yolkling.com";
const ADS_API_KEY = Deno.env.get("ADS_API_KEY")!;
const LIFETIME_SPEND_CENTS_CAP = 10_000; // $100, mirrors app/lib/ads/caps.ts

function sb(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

type Campaign = {
  id: string;
  platform: "meta" | "google";
  external_campaign_id: string | null;
  status: string;
};

async function getMetaSpend(externalCampaignId: string) {
  const accessToken = Deno.env.get("META_ACCESS_TOKEN");
  if (!accessToken) throw new Error("META_ACCESS_TOKEN not set");
  const url = `https://graph.facebook.com/v21.0/${externalCampaignId}/insights?fields=spend,impressions,clicks&date_preset=maximum&access_token=${accessToken}`;
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) throw new Error(`Meta insights error: ${body?.error?.message || JSON.stringify(body)}`);
  const row = body?.data?.[0];
  if (!row) return { spendCents: 0, impressions: 0, clicks: 0 };
  return {
    spendCents: Math.round(parseFloat(row.spend || "0") * 100),
    impressions: parseInt(row.impressions || "0", 10),
    clicks: parseInt(row.clicks || "0", 10),
  };
}

async function getGoogleAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("GOOGLE_ADS_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_ADS_CLIENT_SECRET")!,
      refresh_token: Deno.env.get("GOOGLE_ADS_REFRESH_TOKEN")!,
      grant_type: "refresh_token",
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google token refresh failed: ${body.error_description || body.error}`);
  return body.access_token as string;
}

async function getGoogleSpend(externalCampaignId: string) {
  const customerId = Deno.env.get("GOOGLE_ADS_CUSTOMER_ID");
  const developerToken = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN");
  const loginCustomerId = Deno.env.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID");
  if (!customerId || !developerToken || !loginCustomerId) throw new Error("Google Ads env vars incomplete");
  const accessToken = await getGoogleAccessToken();
  const res = await fetch(`https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "login-customer-id": loginCustomerId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `SELECT metrics.cost_micros, metrics.impressions, metrics.clicks FROM campaign WHERE campaign.id = ${externalCampaignId}`,
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google Ads search error: ${JSON.stringify(body?.error || body)}`);
  const row = body?.results?.[0]?.metrics;
  if (!row) return { spendCents: 0, impressions: 0, clicks: 0 };
  return {
    spendCents: Math.round(Number(row.costMicros || 0) / 10_000),
    impressions: Number(row.impressions || 0),
    clicks: Number(row.clicks || 0),
  };
}

Deno.serve(async (req) => {
  // pg_net calls this with the service role key as a bearer token (see the schedule
  // SQL); reject anything else so this can't be triggered by a stray public request.
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
  }

  const campaignsRes = await sb("ad_campaigns?select=id,platform,external_campaign_id,status&status=eq.active");
  const campaigns: Campaign[] = await campaignsRes.json();

  const polled = await Promise.all(
    campaigns
      .filter((c) => c.external_campaign_id)
      .map(async (c) => {
        try {
          const spend =
            c.platform === "meta"
              ? await getMetaSpend(c.external_campaign_id!)
              : await getGoogleSpend(c.external_campaign_id!);
          await sb("ad_spend_snapshots", {
            method: "POST",
            headers: { Prefer: "return=minimal" },
            body: JSON.stringify({
              campaign_id: c.id,
              spend_cents: spend.spendCents,
              impressions: spend.impressions,
              clicks: spend.clicks,
            }),
          });
          return { id: c.id, ok: true, spendCents: spend.spendCents };
        } catch (e) {
          return { id: c.id, ok: false, error: String((e as Error).message || e) };
        }
      })
  );

  const snapshotsRes = await sb("ad_spend_snapshots?select=campaign_id,spend_cents,fetched_at&order=fetched_at.desc");
  const snapshots: { campaign_id: string; spend_cents: number }[] = await snapshotsRes.json();
  const latestByCampaign = new Map<string, number>();
  for (const row of snapshots) {
    if (!latestByCampaign.has(row.campaign_id)) latestByCampaign.set(row.campaign_id, row.spend_cents);
  }
  const totalSpentCents = [...latestByCampaign.values()].reduce((sum, c) => sum + c, 0);

  let killSwitchTriggered = false;
  if (totalSpentCents >= LIFETIME_SPEND_CENTS_CAP) {
    killSwitchTriggered = true;
    await fetch(`${SITE_URL}/api/ads/kill-switch`, {
      method: "POST",
      headers: { "x-ads-key": ADS_API_KEY },
    }).catch(() => {});
  }

  return new Response(JSON.stringify({ ok: true, polled, totalSpentCents, killSwitchTriggered }), {
    headers: { "Content-Type": "application/json" },
  });
});
