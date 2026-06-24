import { NextResponse } from "next/server";

// Live marketing board engine: pulls the LATEST real posts from target subreddits +
// keyword searches so you always have fresh things to genuinely reply to. Reading
// only, nothing posts.
//
// Reddit blocks anonymous reads now, so this uses the official OAuth API. One-time
// setup (2 min): create a "script" app at https://www.reddit.com/prefs/apps and put
// these in yolkling-app/.env.local, then `npm run dev`:
//   REDDIT_CLIENT_ID=...
//   REDDIT_CLIENT_SECRET=...
//   REDDIT_USERNAME=No_Investigator9020
//   REDDIT_PASSWORD=...

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SUBS = [
  "cozygamers", "iosgaming", "Tamagotchi", "virtualpets", "incremental_games",
  "SideProject", "IndieDev", "IMadeThis", "iosapps", "InternetIsBeautiful",
  "digitalminimalism", "nosurf", "getdisciplined", "selfimprovement", "decidingtobebetter",
];
const SEARCHES = [
  "tamagotchi app", "screen time addiction", "self care app", "virtual pet app", "doomscrolling help",
];

const UA = "ios:yolkling-board:1.0 (by /u/No_Investigator9020)";

type Target = {
  id: string; subreddit: string; author: string; title: string; body: string;
  url: string; permalink: string; score: number; comments: number; created: number; ageHrs: number;
};

let cachedToken: { token: string; exp: number } | null = null;

async function getToken(): Promise<string | null> {
  const id = process.env.REDDIT_CLIENT_ID, secret = process.env.REDDIT_CLIENT_SECRET;
  const user = process.env.REDDIT_USERNAME, pass = process.env.REDDIT_PASSWORD;
  if (!id || !secret || !user || !pass) return null;
  if (cachedToken && cachedToken.exp > Date.now()) return cachedToken.token;
  try {
    const body = new URLSearchParams({ grant_type: "password", username: user, password: pass });
    const r = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": UA,
      },
      body,
      cache: "no-store",
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j.access_token) return null;
    cachedToken = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 - 60_000 };
    return cachedToken.token;
  } catch {
    return null;
  }
}

function clean(d: any, now: number): Target | null {
  if (!d || d.stickied || d.over_18 || d.pinned) return null;
  const created = (d.created_utc || 0) * 1000;
  return {
    id: d.id, subreddit: d.subreddit, author: d.author, title: d.title || "",
    body: String(d.selftext || "").slice(0, 400), url: d.url || "",
    permalink: "https://www.reddit.com" + (d.permalink || ""),
    score: d.score || 0, comments: d.num_comments || 0,
    created, ageHrs: Math.round((now - created) / 3.6e6),
  };
}

async function pull(token: string, url: string, now: number): Promise<Target[]> {
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}`, "User-Agent": UA }, cache: "no-store" });
    if (!r.ok) return [];
    const j = await r.json();
    return (j?.data?.children || []).map((k: any) => clean(k.data, now)).filter(Boolean) as Target[];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const now = Date.now();
  const token = await getToken();
  if (!token) {
    return NextResponse.json(
      { error: "reddit_auth_missing", count: 0, targets: [],
        hint: "Add REDDIT_CLIENT_ID / SECRET / USERNAME / PASSWORD to yolkling-app/.env.local (register a script app at reddit.com/prefs/apps), then restart npm run dev." },
      { status: 200 }
    );
  }
  const maxAge = Number(new URL(req.url).searchParams.get("maxAgeHrs") || 72);
  const subURLs = SUBS.map((s) => `https://oauth.reddit.com/r/${s}/new?limit=12&raw_json=1`);
  const searchURLs = SEARCHES.map(
    (q) => `https://oauth.reddit.com/search?q=${encodeURIComponent(q)}&sort=new&t=week&limit=10&raw_json=1`
  );
  const batches = await Promise.all([...subURLs, ...searchURLs].map((u) => pull(token, u, now)));

  const seen = new Set<string>();
  const targets = batches.flat().filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return t.ageHrs <= maxAge;
  });
  targets.sort((a, b) => b.created - a.created);
  return NextResponse.json({ count: targets.length, fetchedAt: now, targets });
}
