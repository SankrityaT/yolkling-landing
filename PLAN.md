# Yolkling, the master plan

Living source of truth. Everything you have told me, captured so nothing is lost.
Last updated while you were heading to sleep.

## north star
- Three real products, in order: **1) Yolkling**, 2) PASS (the anti spend app), 3) BACKROOM (the cozy web side scroll).
- Get Yolkling out, get a good number of waitlist signups to validate before committing more.
- You are not trying to get rich. Goal is to cover infra costs plus a little, nothing greedy.
- I act as your co founder. Research first, no slop, methodical, one thing at a time.

## yolkling, the decisions
- Name: **Yolkling** (clean on .com, .app, and the App Store). The creature is a little yolk with a face.
- Platform: **iOS first.**
- It is a **social** app: friends, your creatures visit each other, gifts, postcards.
- Core loop: hatch a one of a kind creature from your vibe, it grows when you take care of yourself (sleep, water, sun, texting people back), it gets sleepy when you doomscroll. The app that wants you off your phone.
- Free to hatch, always. Money comes from a cosmetics store (hats, colours, rooms, seasonal species) and an optional cheap supporter tier.
- Store has two currencies: earned for free by living well, plus optional premium. No gacha, no loot boxes, no dark patterns.
- Referral: invite a friend, you both get a free item / a founding species.
- Payments on iOS must use Apple In App Purchase (StoreKit), NOT Stripe. Apple takes 15 percent under the Small Business Program.

## landing page (this Next.js + Tailwind project)
- It is a **waitlist** page. Collect emails.
- **Mobile responsiveness is priority one.** No overlapping text or elements. Verify at real phone widths before anything else.
- **No em dashes anywhere.** Page and posts.
- **No fake numbers.** No "2 million alive." Show the real waitlist count from Supabase, or "be one of the first."
- **No fake reviews.** Instead, a cool "share what you think" form that matches the design system, so people leave real thoughts.
- Honest one person founder note on the page.
- Say clearly: iOS app for now.
- Ask people what feature would make them or a friend actually pay.
- Egg palette: eggshell white, yolk yellow, warm ink. design.md documents the system.
- Host on **Vercel**. Do NOT buy a domain yet. Use the generic .vercel.app url to validate first.

## email system
- When someone joins the waitlist, send a **cute, Yolkling branded** confirmation email.
- You said I can reuse the API key from your "round" iOS project, but do NOT send round's email or branding. Yolkling only.
- One email on signup, then only one more at release. Never spam.

## backend
- You are setting up **Supabase** for me. Tables: waitlist (email, unique), feedback (name optional, message). Real count drives the page number.

## marketing (you said this is really important)
- Research how consumer apps like this actually grow first.
- You connected **X and Reddit** in the browser I control. You said: control them, do not ask each time, just stay on the goal.
- It is not only about plugging Yolkling. Also: engage genuinely, build karma on Reddit, grow followers on X (you have 200 to 300 dead followers, we need active ones).
- On others' posts: be genuine first ("hey that is so cool"), only plug Yolkling if it fits, and never steal their moment.
- Match each subreddit's tone. Simple, human, natural. Nothing that reads as AI.
- Add a PS when relevant: "haven't bought a domain yet, it's a generic vercel.app for now, just validating before I commit."
- The voice (your words): "hey guys im trying to build this. not trying to make a lot of money, just enough to not pay out of pocket for infra. if you love the concept or the ui from the landing page and are intrigued, sign up for the waitlist. i promise i won't bug you unless it's the release announcement. ios first for now. let me know what feature would make you or someone you know actually pay."

### my honest co founder note on the marketing (important, read this)
- Automated posting / commenting from your real accounts is how accounts get banned and a brand gets torched. Reddit punishes astroturfing hard. That kills the goal.
- Also nothing is live yet, so there is no link to post.
- So the plan: I research, I read every relevant subreddit to learn its rules and culture, I find the exact threads where we genuinely fit, and I draft everything in your voice, ready to fire. We post and engage once the site is deployed, you in the loop. This stays on goal and keeps your accounts safe.

## /loop, how we use it
- /loop runs a prompt on a repeating interval (or self paced) so work continues across time.
- Right use for us, AFTER launch: a daily ops cycle. Check new signups, summarize feedback, draft that day's authentic posts and comments for you to approve. Report each morning.
- Wrong use: auto posting marketing on a timer. That is spam and gets you banned. I will not do that.
- Tonight it has little to do (site not deployed, no signups yet), so we set it up once we are live.

## iOS app (when we build it, after waitlist validates)
- Production level code. No AI slop. Clean, sensible folder structure.
- Research best practices before anything big. Look at how you built "round" and follow that bar.
- Security from the start: secure storage, no secrets in the client, proper auth, privacy by design.
- It reads gentle activity signals (sleep, steps), so be careful with HealthKit rules and the App Store privacy label.

## App Store publishing
- You may publish under a friend's developer account to pay back money you owe him.
- My flag: the account holder is the legal publisher, gets the payouts, and is liable. Cleanest is your own 99 dollar account, then pay him from revenue. Your call, just do not get boxed in.

## current status
- Landing page rebuilt in Next.js + Tailwind, egg palette, yolk creature, waitlist form, feedback form, honest copy, no em dashes, no fake numbers or reviews. Needs: API routes finished, email wired, and a full mobile responsiveness pass (priority).
- Not yet: deployed, Supabase connected, email key set, design.md, marketing drafts.

## morning checklist for you (5 to 15 min)
1. Deploy to Vercel (I will leave it one command ready).
2. Paste Supabase url + key and the email key into env.
3. Read the marketing drafts, then we go live and start engaging.

## assets (you are not a designer, and that is the point)
The art direction is built so we never hand draw anything:
- The creature is a parametric "blob with a face": body, two eyes, pupils, blush, mouth, arms, feet. Pure geometry, built in code (CSS on web, SwiftUI shapes on iOS). The landing page already proves it.
- "Unique creature from your vibe" and "912 species" are PROCEDURAL. Define a small kit of parts (a dozen body shapes, a few eye and mouth styles, a palette set, a few patterns and accessories) and combine them. A handful of parts makes millions of unique creatures. We build the system, not the creatures.
- Cosmetics (hats, glasses, rooms) are simple layerable vector shapes. A few dozen over time, not hundreds up front.
- Animation is the transforms we already do (breathe, blink, hop, squish) plus optional Lottie for special moves (a Lottie MCP is available).
- App icon is just the yolk creature. App Store screenshots are the app UI itself.
- AI image gen only for marketing and concepts, never the core collectible set (consistency matters). Free CC0 packs (Kenney.nl, itch.io) for any filler.
- I can generate the part kit, palettes, and SwiftUI/SVG shape code for you.

## privacy and security (HARD REQUIREMENT: E2E at rest and in transit)
- E2E is a first-class requirement, the whole data architecture is designed around it. Not optional, not deferred.
- In transit: TLS everywhere.
- At rest on device: iOS Data Protection + an encrypted local store.
- At rest on server (true E2E): the client encrypts content before it leaves the device, the server only ever holds ciphertext. Covers creature data, progress, cosmetics, wellness signals, and the postcards/visits between friends (encrypted between the two friends, server just relays ciphertext).
- The one honest caveat (same as Signal/WhatsApp): the server knows the bare social graph (A is friends with B) to route a visit, never the content. Market E2E honestly with exactly that caveat.
- Minimal data, no third party tracking, no ads, no ATT needed. Clear privacy nutrition label + Apple privacy manifest.
- The security research doc drives the exact key management + encryption design BEFORE the data/persistence/sync layer is written.

## the real differentiator (lead with this)
- It is the only virtual pet that is actually SOCIAL: your creature wanders off on its own and visits your friends' creatures, creating unscripted funny emergent moments ("it visited my sister's and now they're dating"). Finch, Tamagotchi, Pou, Forest are all single player. The social layer + the emergent stories are the moat and the most shareable thing. See DIFFERENTIATION.md.

## the core mechanic (how we actually deliver "off your phone" without over-claiming)
Three tiers, by how reliably iOS lets us ship them:
1. GROWS FROM WELLNESS (rock solid, the real engine): HealthKit signals (sleep, steps, daylight, mindful minutes). Easy to request, no special entitlement. This is the primary "grows when you take care of yourself" loop.
2. PHONE-DOWN FOCUS SESSIONS (solid, fully ours): a focus / "phone down" timer we build, with a Live Activity. Creature thrives while you are off. No entitlement needed. This alone delivers the "wants you off your phone" feeling.
3. PASSIVE DOOMSCROLL REACTION (the bonus, the only risky part): needs Apple's Family Controls entitlement (Screen Time API). Opt-in, and privacy-blind by design (can see "2 hours on social", never WHAT you looked at). Apple grants this to legit wellness apps but not guaranteed, so it is a layer on top, never a dependency.
RULE: lead the product and the marketing with tiers 1 and 2 (we control them 100%). Frame tier 3 as the opt-in bonus, and own the privacy-blindness as a feature ("wants you off your phone and literally can't see what you do on it"). Do not imply always-on scroll surveillance. Keep landing copy honest to this.

## current status (updated)
- Domain yolkling.com SECURED.
- Landing page: rebuilt in Next.js, the FULL animated UI ported faithfully (preloader egg, interactive yolk creature, hatch canvas, sticky cards, statement, ball pit, 3D collection, marquee, stroke outro), egg/yolk palette, waitlist + feedback forms wired to the API, no fake numbers, no fake reviews, no em dashes. Renders clean, zero console errors.
- Backend: Supabase tables waitlist + feedback created, RLS enabled and locked to server only (service role bypasses, browser never touches Supabase). Keys in gitignored .env.local.
- Email: Resend key wired. Sends from the test sender until yolkling.com is verified in Resend.
- Docs: design.md and MARKETING.md written.
- On the loop next: full mobile scroll pass to fix any overlap in pinned sections, create Resend domain to get DNS records, prep one command Vercel deploy.

## morning checklist (updated)
1. Run the one command Vercel deploy I will leave ready, then point yolkling.com at it.
2. Verify yolkling.com in Resend (add the DNS records I will generate) and set EMAIL_FROM to hey@yolkling.com.
3. Read MARKETING.md, then post as you and start engaging. I will have drafts ready.
