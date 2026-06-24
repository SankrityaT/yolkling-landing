// server-only helpers. all keys come from env. everything degrades gracefully
// so the UI never breaks if Supabase / Resend are not connected yet.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "Yolkling <onboarding@resend.dev>";

function sb(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function insertWaitlist(
  email: string,
): Promise<{ status: "ok" | "dup" | "skip"; code?: string }> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return { status: "skip" };
  // return=representation so we get the founder code the DB trigger generated.
  const res = await sb("waitlist", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({ email: email.toLowerCase().trim() }),
  });
  if (!res.ok) return { status: "skip" };
  const rows = await res.json().catch(() => []);
  // a fresh insert returns the row; an ignored duplicate returns nothing.
  if (Array.isArray(rows) && rows.length > 0) {
    return { status: "ok", code: rows[0]?.referral_code };
  }
  return { status: "dup" };
}

export async function getWaitlistCount(): Promise<number | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const res = await sb("waitlist?select=email", { method: "HEAD", headers: { Prefer: "count=exact" } });
  const range = res.headers.get("content-range"); // e.g. "0-24/25" or "*/25"
  if (!range) return null;
  const total = range.split("/")[1];
  return total && total !== "*" ? parseInt(total, 10) : null;
}

export async function insertFeedback(name: string, message: string): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  const res = await sb("feedback", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ name: name?.slice(0, 80) || null, message: message.slice(0, 2000) }),
  });
  return res.ok;
}

export async function sendWelcomeEmail(email: string, code?: string): Promise<any> {
  if (!RESEND_API_KEY) return { skipped: "no RESEND_API_KEY" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: EMAIL_FROM, to: [email], reply_to: "hey@yolkling.com", subject: "you are on the yolkling list", html: welcomeHtml(code), text: welcomeText(code) }),
    });
    const body = await res.text();
    return { status: res.status, ok: res.ok, from: EMAIL_FROM, body: body.slice(0, 400) };
  } catch (e) {
    return { error: String(e), from: EMAIL_FROM };
  }
}

function welcomeText(code?: string): string {
  const codeBlock = code
    ? `\nyour founder code: ${code}\nkeep this. it unlocks an early supporter bonus when your little guy hatches in the app.\n`
    : "";
  return `you are on the list.

hey, thank you for signing up for yolkling. it means a lot, genuinely.
${codeBlock}
quick promise: this is the only email you will get from me until it is actually ready to hatch. no weekly newsletters, no nonsense. just one note when your little guy is ready.

i am one person building this. i am not trying to get rich, i just want to cover the server bills. so it will be free to hatch, always.

if you have a second, hit reply and tell me what would make you or a friend actually love this. i read every one.

yolkling, the little guy who is secretly you. ios first, coming soon.
ps. you got here early, before it even hatched. that genuinely means a lot. more soon at yolkling.com.`;
}

function welcomeHtml(code?: string): string {
  const codeBlock = code
    ? `<div style="margin:0 0 18px;padding:16px 18px;background:#FFF6E0;border:1px solid #F0D98A;border-radius:14px">
      <p style="font-size:13px;color:#A99A82;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">your founder code</p>
      <p style="font-size:22px;margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0.04em;color:#2A241B"><strong>${code}</strong></p>
      <p style="font-size:13px;color:#4a4030;margin:0">keep this. it unlocks an early supporter bonus when your little guy hatches in the app.</p>
    </div>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#FBF6EC;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2A241B">
  <div style="max-width:480px;margin:0 auto;padding:36px 26px">
    <div style="display:inline-block;width:42px;height:42px;border-radius:50%;background:#FFC23B;box-shadow:inset -6px -7px 0 rgba(0,0,0,0.12)"></div>
    <h1 style="font-size:26px;margin:22px 0 6px;letter-spacing:-0.02em">you are on the list.</h1>
    <p style="font-size:16px;line-height:1.55;color:#4a4030;margin:0 0 14px">
      hey, thank you for signing up for yolkling. it means a lot, genuinely.
    </p>
    ${codeBlock}
    <p style="font-size:16px;line-height:1.55;color:#4a4030;margin:0 0 14px">
      quick promise: this is the only email you will get from me until it is actually ready to hatch. no weekly newsletters, no nonsense. just one note when your little guy is ready.
    </p>
    <p style="font-size:16px;line-height:1.55;color:#4a4030;margin:0 0 14px">
      i am one person building this. i am not trying to get rich, i just want to cover the server bills. so it will be free to hatch, always.
    </p>
    <p style="font-size:16px;line-height:1.55;color:#4a4030;margin:0 0 22px">
      if you have a second, hit reply and tell me what would make you or a friend actually love this. i read every one.
    </p>
    <div style="border-top:1px solid rgba(42,36,27,0.12);padding-top:16px">
      <p style="font-size:13px;color:#A99A82;margin:0">yolkling, the little guy who is secretly you. ios first, coming soon.</p>
      <p style="font-size:12px;color:#A99A82;margin:8px 0 0">ps. you got here early, before it even hatched. that genuinely means a lot. more soon at yolkling.com.</p>
    </div>
  </div></body></html>`;
}
