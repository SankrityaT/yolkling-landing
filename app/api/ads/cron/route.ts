import { NextResponse } from "next/server";
import { LIFETIME_SPEND_CENTS_CAP } from "@/app/lib/ads/caps";
import { getObservedTotalSpentCents, insertSpendSnapshot, listCampaigns, updateCampaign } from "@/app/lib/ads/db";
import { getAdapter } from "@/app/lib/ads/platforms";

// Vercel Cron target (see vercel.json), runs every 30 min. Vercel signs cron requests
// with `Authorization: Bearer $CRON_SECRET` automatically when CRON_SECRET is set, so
// this checks that instead of the dashboard's x-ads-key.
function checkCronAuth(req: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "CRON_SECRET not configured" }, { status: 500 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: Request) {
  const authError = checkCronAuth(req);
  if (authError) return authError;

  const campaigns = await listCampaigns();
  const active = campaigns.filter((c) => c.status === "active" && c.external_campaign_id);

  const polled = await Promise.all(
    active.map(async (c) => {
      try {
        const spend = await getAdapter(c.platform).getSpend(c.external_campaign_id!);
        await insertSpendSnapshot({
          campaign_id: c.id,
          spend_cents: spend.spendCents,
          impressions: spend.impressions,
          clicks: spend.clicks,
        });
        return { id: c.id, ok: true, spendCents: spend.spendCents };
      } catch (e: any) {
        return { id: c.id, ok: false, error: String(e.message || e) };
      }
    })
  );

  const totalSpentCents = await getObservedTotalSpentCents();
  let killSwitchTriggered = false;

  // Backstop: the platform's own daily/lifetime budget field is the primary limit.
  // This is what catches it if that ever slips (a budget misconfigured by hand, etc).
  if (totalSpentCents >= LIFETIME_SPEND_CENTS_CAP) {
    killSwitchTriggered = true;
    await Promise.all(
      active.map(async (c) => {
        try {
          await getAdapter(c.platform).pauseCampaign(c.external_campaign_id!);
          await updateCampaign(c.id, { status: "paused", paused_at: new Date().toISOString(), status_detail: "lifetime cap reached, auto-paused by cron" });
        } catch {
          // best-effort, already logged via `polled` above if the read side failed too
        }
      })
    );
  }

  return NextResponse.json({ ok: true, polled, totalSpentCents, killSwitchTriggered });
}
