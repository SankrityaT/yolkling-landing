import { NextResponse } from "next/server";
import { insertFeedback } from "@/app/lib/db";

export async function POST(req: Request) {
  let name = "", message = "";
  try {
    const body = await req.json();
    name = String(body.name || "").trim();
    message = String(body.message || "").trim();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (message.length < 2) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  await insertFeedback(name, message);
  return NextResponse.json({ ok: true });
}
