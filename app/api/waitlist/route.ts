import { NextResponse } from "next/server";
import { insertWaitlist, getWaitlistCount, sendWelcomeEmail } from "@/app/lib/db";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export async function POST(req: Request) {
  let email = "";
  let utm: Record<string, string> = {};
  try {
    const body = await req.json();
    email = String(body.email || "").trim();
    for (const key of UTM_KEYS) {
      const value = body[key];
      if (typeof value === "string" && value.trim()) utm[key] = value.trim().slice(0, 100);
    }
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });

  const result = await insertWaitlist(email, utm);
  if (result.status === "ok") {
    // MUST await: on serverless the function freezes after returning, killing any
    // un-awaited fetch, so a fire-and-forget send silently never reaches Resend.
    await sendWelcomeEmail(email, result.code);
  }
  // "error" means the write genuinely failed after retries, this must NOT look like
  // success to the client, that's exactly the silent-data-loss failure mode to avoid.
  if (result.status === "error") {
    return NextResponse.json({ ok: false, status: "error", error: "please try again in a moment" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, status: result.status });
}

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}
