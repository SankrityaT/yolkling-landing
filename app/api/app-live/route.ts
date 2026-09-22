import { NextResponse } from "next/server";

// Is Yolkling actually on the App Store yet? Apple's public lookup returns the listing once
// the release goes out, so the site flips from waitlist to download by itself, with no
// redeploy on launch night. Cached for five minutes.
const APP_ID = "6804105200";
const BUNDLE_ID = "com.yolkling.ios";

export const revalidate = 300;

export async function GET() {
  try {
    const r = await fetch(`https://itunes.apple.com/lookup?id=${APP_ID}&country=us`, { next: { revalidate: 300 } });
    const j = await r.json();
    const hit = (j?.results ?? []).find((x: { bundleId?: string }) => x.bundleId === BUNDLE_ID);
    return NextResponse.json({ live: Boolean(hit), url: hit?.trackViewUrl ?? null }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch {
    return NextResponse.json({ live: false, url: null });
  }
}
