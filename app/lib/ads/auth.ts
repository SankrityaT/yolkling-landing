import { NextResponse } from "next/server";

// Every /api/ads/* route (and the /ads dashboard) sits behind this shared secret.
// This is what makes it safe for aside (or anyone) to hit a publicly reachable URL:
// no key, no access, regardless of what the request asks for.
export function checkAdsAuth(req: Request): NextResponse | null {
  const key = process.env.ADS_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "ADS_API_KEY not configured on the server" }, { status: 500 });
  }
  const provided = req.headers.get("x-ads-key");
  if (provided !== key) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}
