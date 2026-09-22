# Yolkling Growth Machine

Default mode for now: Reddit plus launch/listings. X is manual/light because the official API is paid. TikTok/Reels/Shorts are optional, not required this week.

## Weekly Loop

1. Run:
   ```bash
   npm run growth:week
   ```
2. Open the generated file under `marketing/generated/`.
3. Pick one Reddit post where self-promo is invited or allowed.
4. Add 3 to 5 no-plug comments using the generated comment angles.
5. Submit one launch/listing surface.
6. Improve the waitlist/referral loop.

## Reddit Autopilot Execution

Preferred path is Reddit API OAuth. It avoids Playwright and avoids browser-profile blocks.

Setup:
```text
https://www.reddit.com/prefs/apps
create script app
export REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET / REDDIT_USERNAME / REDDIT_PASSWORD
```

Run:
```bash
npm run autopilot:batch
npm run reddit:me
npm run autopilot:discover
npm run autopilot:reddit-api
REDDIT_API_SUBMIT=1 npm run autopilot:reddit-api
```

Self-promo/link comments require:
```bash
ALLOW_LINK_POSTS=1 REDDIT_API_SUBMIT=1 npm run autopilot:reddit-api
```

Fallback path: local Chrome extension bridge. It runs inside a dedicated system Chrome profile and avoids Playwright.

Setup once:
```bash
npm run autopilot:chrome-login
```

Log into Reddit in that dedicated Chrome window. It is system Chrome with a persistent profile, not Playwright.

Run:
```bash
npm run autopilot:batch
npm run autopilot:bridge
npm run autopilot:chrome
npm run autopilot:run
npm run autopilot:status
```

Default behavior fills the comment box only. Submitting requires:
```bash
AUTOPILOT_SUBMIT=1 npm run autopilot:reddit-demo
```

For batches, link posts remain fill-only unless allowed:
```bash
AUTOPILOT_SUBMIT=1 npm run autopilot:batch
ALLOW_LINK_POSTS=1 AUTOPILOT_SUBMIT=1 npm run autopilot:batch
```

Do not enable submit for more than a tiny batch until logs show the targets are correct.

## Priorities

- Reddit posts only where allowed.
- Comments should mostly not mention Yolkling.
- Listings should be direct and reusable.
- TikTok only when there is already a strong asset or screenshot.
- X only as manual ambient presence unless API credits are approved.

## Good Users

Prioritize people who already care about:
- cozy games
- Tamagotchi / virtual pets
- Finch-style self-care
- digital minimalism
- iOS apps
- no-streak / no-guilt habit loops
- handmade/no-AI creative software

## What Counts

Good output is not volume. Good output is:
- a real discussion with a possible user
- a useful comment history in target communities
- a listing that compounds over time
- one waitlist signup with a reason they care
