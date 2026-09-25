# Apple Search Ads brief (for Javi's agent)

Budget: **$50 for the first week**, US only, **everything created PAUSED** until a human
says go. Meta ads are handled separately and must not be touched.

Copy everything below the line into the agent.

---

You are setting up **Apple Search Ads** for an iOS app, using the **aside CLI** (an AI
browser agent) to drive the web UI. Run tasks as `aside "<task>"` with the Aside Browser
app open. Aside stops and reports if it hits a login or 2FA prompt; it must never guess
credentials.

## The app

- Name: **Yolkling: Self Care Pet**
- Apple ID: **6804105200**, bundle id `com.yolkling.ios`
- Product page: https://apps.apple.com/us/app/yolkling-self-care-pet/id6804105200
- Team in App Store Connect: **HAVISHEA SAIRAM VANNEMREDDY** (the account holder is
  Havishea; Sankritya has App Store Connect access)
- Subtitle: "grow a cozy virtual creature". Categories: Lifestyle, then Health & Fitness
- Free to download, with an optional subscription ($4.99/month, $34.99/year)
- Live since Sep 21, 2026. Current version 1.0.1

**What it is, in one line:** a cozy virtual pet that grows when you look after yourself.
It reads your steps and sleep from Apple Health, rewards putting the phone down, and your
creature wanders off to visit other people's rooms and brings back postcards. No ads, and
the in-app currency is earned, never bought.

## Rules

1. **Create everything PAUSED.** Nothing spends until a human enables it.
2. **Never exceed $7.00/day** across all campaigns combined ($49/week).
3. Only this app. Do not touch any other app, the App Store listing, pricing, or
   availability.
4. If Apple Search Ads has no account yet, or a payment method or agreement is missing,
   **stop and report exactly what is needed and who must do it** (agreements and billing
   usually require the Account Holder).
5. Use **Apple Search Ads Advanced**, not Basic. Basic gives no keyword control.
6. Report back with campaign names, ad group names, keyword counts, bids, daily caps, and
   a screenshot of each campaign's settings page.

## Structure to build (US storefront, Search Results placement only)

**Campaign 1 — `yolkling-brand`** · daily cap **$1** · default CPT bid **$0.50**
Exact match, defends the name so competitors cannot buy it out from under us:
`yolkling`, `yolkling app`, `yolkling pet`, `yolk pet`, `yolkling self care`

**Campaign 2 — `yolkling-category`** · daily cap **$4** · default CPT bid **$0.80**
Broad match, the terms someone types when they want this kind of app:
`virtual pet`, `virtual pet app`, `digital pet`, `pet that grows with you`, `cozy game`,
`cozy app`, `self care app`, `self care pet`, `wellbeing app`, `habit pet`,
`daily check in app`, `mood check in`, `screen time pet`, `phone addiction app`,
`cute pet game`, `tamagotchi app`, `pixel pet`, `pet game no wifi`, `gentle habit tracker`,
`mental health pet`

**Campaign 3 — `yolkling-discovery`** · daily cap **$2** · default CPT bid **$0.60**
No keywords. **Search Match ON**, so Apple finds terms we have not thought of. This is the
cheapest way to discover what people actually search.

In campaigns 1 and 2, turn Search Match **off** so budget goes where we chose.

### Negative keywords (add to campaigns 1 and 2)
`free`, `hack`, `mod`, `cheats`, `roblox`, `minecraft`, `dog`, `cat food`, `real pet`,
`vet`, `adoption`

### Audience settings
Leave demographics wide open at this budget. Do NOT narrow by age or gender: the audience
is broad and narrowing at $7/day starves the algorithm.

## After it is running (report, do not act alone)

- After **3 days**: pause any keyword with **15+ taps and 0 installs**.
- Target cost per install under **$3**. Report anything above it.
- If the discovery campaign surfaces a search term with 2+ installs, report it so it can be
  added as an exact-match keyword in campaign 2.
- Report daily spend so the $50 weekly total is never exceeded.

## Also worth reporting (free, no spend)

While in App Store Connect, note anything weak for **App Store Optimization**: the app
currently has a subtitle but we have not reviewed the 100-character keyword field. Report
what is there now and suggest improvements, but **do not change any metadata** — that ships
with an app update and is not yours to edit.
