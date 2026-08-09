// Supabase helpers for the ad-ops layer. Same shape as app/lib/db.ts: everything
// degrades to a clear error if Supabase isn't configured, nothing pretends to work.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type Platform = "meta" | "google";
export type CampaignStatus = "draft" | "active" | "paused" | "failed" | "ended";

export interface AdCampaign {
  id: string;
  platform: Platform;
  external_campaign_id: string | null;
  hook: string;
  utm_campaign: string;
  daily_budget_cents: number;
  lifetime_budget_cents: number | null;
  status: CampaignStatus;
  status_detail: string | null;
  created_at: string;
  launched_at: string | null;
  paused_at: string | null;
}

function requireSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing)");
  }
}

function sb(path: string, init: RequestInit = {}) {
  requireSupabase();
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function listCampaigns(): Promise<AdCampaign[]> {
  const res = await sb("ad_campaigns?select=*&order=created_at.desc");
  if (!res.ok) throw new Error(`listCampaigns failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function getCampaignById(id: string): Promise<AdCampaign | null> {
  const res = await sb(`ad_campaigns?id=eq.${id}&select=*`);
  if (!res.ok) throw new Error(`getCampaignById failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows[0] ?? null;
}

export async function createCampaignRow(input: {
  platform: Platform;
  hook: string;
  utm_campaign: string;
  daily_budget_cents: number;
  lifetime_budget_cents?: number;
}): Promise<AdCampaign> {
  const res = await sb("ad_campaigns", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ ...input, status: "draft" }),
  });
  if (!res.ok) throw new Error(`createCampaignRow failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows[0];
}

export async function updateCampaign(
  id: string,
  patch: Partial<
    Pick<AdCampaign, "external_campaign_id" | "status" | "status_detail" | "launched_at" | "paused_at">
  >
): Promise<void> {
  const res = await sb(`ad_campaigns?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`updateCampaign failed: ${res.status} ${await res.text()}`);
}

export async function insertSpendSnapshot(input: {
  campaign_id: string;
  spend_cents: number;
  impressions: number;
  clicks: number;
}): Promise<void> {
  const res = await sb("ad_spend_snapshots", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`insertSpendSnapshot failed: ${res.status} ${await res.text()}`);
}

// Latest snapshot per campaign, summed, as a lifetime-spend proxy for the cap check.
// Not a source of financial truth (the platform's own billing is), just what we've
// observed so far via polling.
export async function getObservedTotalSpentCents(): Promise<number> {
  const res = await sb("ad_spend_snapshots?select=campaign_id,spend_cents,fetched_at&order=fetched_at.desc");
  if (!res.ok) throw new Error(`getObservedTotalSpentCents failed: ${res.status} ${await res.text()}`);
  const rows: { campaign_id: string; spend_cents: number }[] = await res.json();
  const latestByCampaign = new Map<string, number>();
  for (const row of rows) {
    if (!latestByCampaign.has(row.campaign_id)) latestByCampaign.set(row.campaign_id, row.spend_cents);
  }
  return [...latestByCampaign.values()].reduce((sum, cents) => sum + cents, 0);
}

export interface UtmBreakdownRow {
  utm_campaign: string | null;
  utm_source: string | null;
  signups: number;
}

// Raw aggregation in JS on purpose: this is a hobby-scale waitlist (hundreds of rows,
// not millions), and there's no SQL view for this yet. Revisit if it ever gets slow.
export async function getWaitlistUtmBreakdown(): Promise<UtmBreakdownRow[]> {
  const res = await sb("waitlist?select=utm_campaign,utm_source&utm_campaign=not.is.null");
  if (!res.ok) throw new Error(`getWaitlistUtmBreakdown failed: ${res.status} ${await res.text()}`);
  const rows: { utm_campaign: string | null; utm_source: string | null }[] = await res.json();
  const counts = new Map<string, UtmBreakdownRow>();
  for (const row of rows) {
    const key = `${row.utm_campaign}::${row.utm_source}`;
    const existing = counts.get(key);
    if (existing) existing.signups += 1;
    else counts.set(key, { utm_campaign: row.utm_campaign, utm_source: row.utm_source, signups: 1 });
  }
  return [...counts.values()].sort((a, b) => b.signups - a.signups);
}
