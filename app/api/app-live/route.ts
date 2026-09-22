import { NextResponse } from "next/server";

// Is Yolkling actually on the App Store yet? Apple's public lookup returns the listing once
// the release goes out, so the site flips from waitlist to download by itself, with no
// redeploy on launch night. Cached for five minutes.
const APP_ID = "6804105200";
const BUNDLE_ID = "com.yolkling.ios";

export const revalidate = 300;

export async function GET() {
  try {
    // The US storefront lookup lags the others by hours after a release (on launch night the
    // app was downloadable, and listed in GB, IN and the global bundleId lookup, while the US
    // lookup still returned nothing). So ask both and take whichever answers first.
    const urls = [
      `https://itunes.apple.com/lookup?id=${APP_ID}&country=us`,
      `https://itunes.apple.com/lookup?bundleId=${BUNDLE_ID}`,
    ];
    let hit: { bundleId?: string; trackViewUrl?: string } | undefined;
    for (const u of urls) {
      const j = await (await fetch(u, { next: { revalidate: 300 } })).json();
      hit = (j?.results ?? []).find((x: { bundleId?: string }) => x.bundleId === BUNDLE_ID);
      if (hit) break;
    }
    return NextResponse.json({ live: Boolean(hit), url: hit?.trackViewUrl ?? null }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch {
    return NextResponse.json({ live: false, url: null });
  }
}
