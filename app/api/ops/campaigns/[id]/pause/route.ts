import { NextResponse } from "next/server";
import { checkAdsAuth } from "@/app/lib/ads/auth";
import { getCampaignById, updateCampaign } from "@/app/lib/ads/db";
import { getAdapter } from "@/app/lib/ads/platforms";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = checkAdsAuth(req);
  if (authError) return authError;

  const { id } = await params;
  const campaign = await getCampaignById(id);
  if (!campaign) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  if (!campaign.external_campaign_id) {
    return NextResponse.json({ ok: false, error: "campaign was never launched on the platform" }, { status: 409 });
  }

  try {
    const adapter = getAdapter(campaign.platform);
    await adapter.pauseCampaign(campaign.external_campaign_id);
    await updateCampaign(id, { status: "paused", paused_at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e.message || e) }, { status: 502 });
  }
}
