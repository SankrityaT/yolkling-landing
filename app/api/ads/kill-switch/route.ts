import { NextResponse } from "next/server";
import { checkAdsAuth } from "@/app/lib/ads/auth";
import { listCampaigns, updateCampaign } from "@/app/lib/ads/db";
import { getAdapter } from "@/app/lib/ads/platforms";

// Pauses every active campaign on every platform. Used by the dashboard button and
// by the cron job when observed spend nears the lifetime cap. Best-effort: keeps
// going even if one platform call fails, and reports exactly which ones did.
export async function POST(req: Request) {
  const authError = checkAdsAuth(req);
  if (authError) return authError;

  const campaigns = await listCampaigns();
  const active = campaigns.filter((c) => c.status === "active");

  const results = await Promise.all(
    active.map(async (c) => {
      try {
        if (!c.external_campaign_id) throw new Error("no external_campaign_id on an active row");
        await getAdapter(c.platform).pauseCampaign(c.external_campaign_id);
        await updateCampaign(c.id, { status: "paused", paused_at: new Date().toISOString() });
        return { id: c.id, ok: true };
      } catch (e: any) {
        return { id: c.id, ok: false, error: String(e.message || e) };
      }
    })
  );

  const failed = results.filter((r) => !r.ok);
  return NextResponse.json({ ok: failed.length === 0, paused: results.length - failed.length, failed });
}
