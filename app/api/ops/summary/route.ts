import { NextResponse } from "next/server";
import { checkAdsAuth } from "@/app/lib/ads/auth";
import { getObservedTotalSpentCents, getWaitlistUtmBreakdown, listCampaigns } from "@/app/lib/ads/db";
import { DAILY_BUDGET_CENTS_CAP, LIFETIME_SPEND_CENTS_CAP } from "@/app/lib/ads/caps";

// Everything the /ads dashboard needs in one call: campaigns, observed spend,
// the caps we're working against, and the real waitlist signups broken down by
// UTM campaign (this works today even with zero ad spend, since it's just reading
// whatever query params people actually arrived with).
export async function GET(req: Request) {
  const authError = checkAdsAuth(req);
  if (authError) return authError;

  try {
    const [campaigns, totalObservedSpentCents, utmBreakdown] = await Promise.all([
      listCampaigns(),
      getObservedTotalSpentCents(),
      getWaitlistUtmBreakdown(),
    ]);
    return NextResponse.json({
      ok: true,
      campaigns,
      totalObservedSpentCents,
      utmBreakdown,
      caps: { dailyBudgetCentsCap: DAILY_BUDGET_CENTS_CAP, lifetimeSpendCentsCap: LIFETIME_SPEND_CENTS_CAP },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e.message || e) }, { status: 500 });
  }
}
