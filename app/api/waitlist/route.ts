import { NextResponse } from "next/server";
import { insertWaitlist, getWaitlistCount, sendWelcomeEmail } from "@/app/lib/db";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body.email || "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });

  const result = await insertWaitlist(email);
  if (result.status === "ok") {
    // MUST await: on serverless the function freezes after returning, killing any
    // un-awaited fetch, so a fire-and-forget send silently never reaches Resend.
    await sendWelcomeEmail(email, result.code);
  }
  return NextResponse.json({ ok: true, status: result.status });
}

export async function GET() {
  const count = await getWaitlistCount();
  return NextResponse.json({ count });
}
