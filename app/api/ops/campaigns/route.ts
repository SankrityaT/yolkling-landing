import { NextResponse } from "next/server";
import { checkAdsAuth } from "@/app/lib/ads/auth";
import { assertDailyBudgetWithinCap, assertRoomUnderLifetimeCap, SpendCapExceededError } from "@/app/lib/ads/caps";
import { createCampaignRow, getObservedTotalSpentCents, listCampaigns, updateCampaign } from "@/app/lib/ads/db";
import { getAdapter } from "@/app/lib/ads/platforms";

export async function GET(req: Request) {
  const authError = checkAdsAuth(req);
  if (authError) return authError;
  try {
    const campaigns = await listCampaigns();
    return NextResponse.json({ ok: true, campaigns });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e.message || e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authError = checkAdsAuth(req);
  if (authError) return authError;

  let input: {
    platform: "meta" | "google";
    hook: string;
    utmCampaign: string;
    dailyBudgetCents: number;
    lifetimeBudgetCents?: number;
    keywords?: string[];
    headlines?: string[];
    descriptions?: string[];
    geoTargetConstant?: string;
    languageConstant?: string;
    validateOnly?: boolean;
  };
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  if (!input.platform || !input.hook || !input.utmCampaign || !input.dailyBudgetCents) {
    return NextResponse.json(
      { ok: false, error: "platform, hook, utmCampaign, dailyBudgetCents are required" },
      { status: 400 }
    );
  }
  if (input.platform === "google") {
    const missing = [
      (!input.keywords || !input.keywords.length) && "keywords",
      (!input.headlines || input.headlines.length < 3) && "headlines (need at least 3)",
      (!input.descriptions || input.descriptions.length < 2) && "descriptions (need at least 2)",
      !input.geoTargetConstant && "geoTargetConstant",
    ].filter(Boolean);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: `google campaigns also need: ${missing.join(", ")}` }, { status: 400 });
    }
  }

  // The one link every click actually lands on, tagged so it attributes back to
  // exactly this campaign in the waitlist UTM breakdown.
  const finalUrl = `https://yolkling.com/?utm_source=${input.platform}&utm_medium=paid&utm_campaign=${encodeURIComponent(
    input.utmCampaign
  )}&utm_content=${encodeURIComponent(input.hook)}`;

  // Hard caps, checked before anything touches a real ad platform.
  try {
    assertDailyBudgetWithinCap(input.dailyBudgetCents);
    const spentSoFar = await getObservedTotalSpentCents();
    assertRoomUnderLifetimeCap(spentSoFar, input.lifetimeBudgetCents ?? input.dailyBudgetCents);
  } catch (e) {
    if (e instanceof SpendCapExceededError) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 422 });
    }
    throw e;
  }

  // Row first (draft), so a platform-side failure still leaves an honest audit trail.
  const row = await createCampaignRow({
    platform: input.platform,
    hook: input.hook,
    utm_campaign: input.utmCampaign,
    daily_budget_cents: input.dailyBudgetCents,
    lifetime_budget_cents: input.lifetimeBudgetCents,
  });

  const adapter = getAdapter(input.platform);
  if (!adapter.isConfigured()) {
    await updateCampaign(row.id, { status: "failed", status_detail: `${input.platform} is not configured yet` });
    return NextResponse.json(
      { ok: false, error: `${input.platform} is not configured yet`, campaign: { ...row, status: "failed" } },
      { status: 409 }
    );
  }

  try {
    const result = await adapter.createCampaign({
      name: `yolkling — ${input.hook} — ${input.utmCampaign}`,
      dailyBudgetCents: input.dailyBudgetCents,
      keywords: input.keywords ?? [],
      headlines: input.headlines ?? [],
      descriptions: input.descriptions ?? [],
      finalUrl,
      geoTargetConstant: input.geoTargetConstant ?? "2840",
      languageConstant: input.languageConstant,
      validateOnly: input.validateOnly,
    });

    if (result.validated) {
      // Dry-run: Google confirmed the whole chain is valid, nothing was created,
      // so there's no external id yet and this campaign stays in draft.
      await updateCampaign(row.id, { status_detail: "validated ok, not launched (validateOnly)" });
      return NextResponse.json({ ok: true, validated: true, campaign: row });
    }

    await updateCampaign(row.id, {
      external_campaign_id: result.externalCampaignId,
      status: "active",
      launched_at: new Date().toISOString(),
    });
    return NextResponse.json({
      ok: true,
      campaign: { ...row, external_campaign_id: result.externalCampaignId, status: "active" },
      finalUrl,
    });
  } catch (e: any) {
    const detail = String(e.message || e);
    await updateCampaign(row.id, { status: "failed", status_detail: detail });
    return NextResponse.json({ ok: false, error: detail, campaign: { ...row, status: "failed", status_detail: detail } }, { status: 502 });
  }
}
