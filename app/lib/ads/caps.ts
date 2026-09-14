// Hard spend ceilings. These are not suggestions, every code path that can create or
// raise a budget must run through these, and they cannot be overridden by a prompt,
// an env var, or a caller argument. The actual enforcement backstop is the native
// daily/lifetime budget field set on the platform campaign itself (Meta and Google both
// physically cap delivery there); this module is what stops us from ever creating a
// campaign with a budget field that exceeds the agreed ceiling in the first place.

// Raised 2026-09-14 at the founder's explicit request: a $50 day-one push per
// platform, then back down to $5/day. $300 lifetime covers that shape on up to two
// platforms for the rest of the Shipaton window, with room to spare.
export const DAILY_BUDGET_CENTS_CAP = 5_000; // $50.00/day per platform
export const LIFETIME_SPEND_CENTS_CAP = 30_000; // $300 total, across every platform combined

export class SpendCapExceededError extends Error {}

export function assertDailyBudgetWithinCap(dailyBudgetCents: number) {
  if (!Number.isFinite(dailyBudgetCents) || dailyBudgetCents <= 0) {
    throw new SpendCapExceededError("daily budget must be a positive number of cents");
  }
  if (dailyBudgetCents > DAILY_BUDGET_CENTS_CAP) {
    throw new SpendCapExceededError(
      `daily budget ${dailyBudgetCents}c exceeds the hard cap of ${DAILY_BUDGET_CENTS_CAP}c ($${(DAILY_BUDGET_CENTS_CAP / 100).toFixed(2)}/day)`
    );
  }
}

export function assertRoomUnderLifetimeCap(spentSoFarCents: number, additionalLifetimeBudgetCents: number) {
  const projected = spentSoFarCents + additionalLifetimeBudgetCents;
  if (projected > LIFETIME_SPEND_CENTS_CAP) {
    throw new SpendCapExceededError(
      `spent ${spentSoFarCents}c so far, adding a ${additionalLifetimeBudgetCents}c budget would reach ${projected}c, over the ${LIFETIME_SPEND_CENTS_CAP}c ($${(LIFETIME_SPEND_CENTS_CAP / 100).toFixed(2)}) lifetime cap`
    );
  }
}
