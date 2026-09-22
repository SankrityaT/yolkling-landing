// Meta Marketing API adapter (covers Facebook + Instagram, one ad account, one API).
// Scope note: this creates and manages the CAMPAIGN object (objective, budget, status)
// and reads its spend. It does not yet create the ad set / creative / ad beneath it,
// that needs a real Page (blocked, see handoff notes), finalized creative assets, and
// for a lead campaign, a Lead Form. Wiring that is the next concrete step once those
// exist, not something to fake here. A campaign with nothing under it spends nothing,
// so this is safe to leave partial.

const GRAPH_VERSION = "v21.0";

function requireConfig() {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const adAccountId = process.env.META_AD_ACCOUNT_ID; // e.g. "act_1234567890"
  if (!accessToken || !adAccountId) {
    throw new Error(
      "Meta is not configured yet (META_ACCESS_TOKEN / META_AD_ACCOUNT_ID missing). " +
        "Needs a System User token with ads_management scope, created by hand once the " +
        "restricted Business Manager is resolved."
    );
  }
  return { accessToken, adAccountId };
}

async function graphFetch(path: string, init: RequestInit = {}) {
  const { accessToken } = requireConfig();
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`);
  if (init.method === "GET" || !init.method) {
    url.searchParams.set("access_token", accessToken);
  }
  const res = await fetch(url.toString(), {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Meta API error (${res.status}): ${body?.error?.message || JSON.stringify(body)}`);
  }
  return body;
}

import type { CreateCampaignInput } from "./index";

// Search-specific fields (keywords, headlines, geo/language targeting) on
// CreateCampaignInput are accepted for interface compatibility with the shared
// PlatformAdapter type, unused here. Meta's ad set + creative layer is still not
// built (blocked on Meta access as of 2026-08-09), see the file header. This still
// only creates the campaign object.
export async function createCampaign(input: CreateCampaignInput): Promise<{ externalCampaignId: string }> {
  const { adAccountId, accessToken } = requireConfig();
  const body = await graphFetch(`${adAccountId}/campaigns`, {
    method: "POST",
    body: new URLSearchParams({
      access_token: accessToken,
      name: input.name,
      objective: "OUTCOME_LEADS",
      status: "ACTIVE",
      daily_budget: String(input.dailyBudgetCents),
      special_ad_categories: "[]",
    }).toString() as any,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return { externalCampaignId: body.id };
}

export async function pauseCampaign(externalCampaignId: string): Promise<void> {
  const { accessToken } = requireConfig();
  await graphFetch(externalCampaignId, {
    method: "POST",
    body: new URLSearchParams({ access_token: accessToken, status: "PAUSED" }).toString() as any,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export async function getSpend(
  externalCampaignId: string
): Promise<{ spendCents: number; impressions: number; clicks: number }> {
  const body = await graphFetch(
    `${externalCampaignId}/insights?fields=spend,impressions,clicks&date_preset=maximum`
  );
  const row = body?.data?.[0];
  if (!row) return { spendCents: 0, impressions: 0, clicks: 0 };
  return {
    spendCents: Math.round(parseFloat(row.spend || "0") * 100),
    impressions: parseInt(row.impressions || "0", 10),
    clicks: parseInt(row.clicks || "0", 10),
  };
}

export function isConfigured(): boolean {
  return Boolean(process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID);
}
