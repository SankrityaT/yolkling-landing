# What changed on 2026-08-08 (read before writing any new copy)

The product moved a long way in the last few sessions. Parts of `START-HERE.md`, the
pillars, and `CLAIMS.md` in the iOS repo are now stale. This file is the delta.

**The rule has not changed:** never claim something the app does not do. Every line
below is tagged SAFE (shipped AND seen working), ALMOST (built, but nobody has
watched it run - usually because it needs real hardware), or NOT YET (designed, not
built). Do not market anything in NOT YET, however good it sounds, and do not put
anything in ALMOST into a paid ad until it moves to SAFE. The gap between "the code
exists" and "I have seen it work" is exactly where false claims come from.

---

## 1. Trading is no longer cut. It shipped.

`CLAIMS.md` says trading was "CUT, and removed from the landing page". That was true
when written. It is not true now.

**PR #1 on this repo still deletes both trading lines from the landing page.** It
removes `"collect, and trade your spare ones with friends"` and `"trade and gift
cosmetics"`. Those are now accurate. **Do not merge that part of PR #1.** The AASA
file and the other honesty fixes in that PR are still wanted; the trading deletions
are not.

SAFE to say: you can swap a spare cosmetic with a friend. Both sides have to agree,
nothing moves until they do, and it is friends only (never strangers).

---

## 2. The creature you made is not tradeable, on purpose

This is a positioning asset, not a limitation, and it is now enforced in the
database rather than promised.

Your yolkling's colour, pattern, look and room are part of that creature. They cannot
be traded, gifted or lost. What moves between players is the costume: hats, glasses,
scarves. Founding species never move either.

SAFE to say: the one you made is yours. only the outfit travels.

Worth knowing for credibility posts: this was a real bug we found and fixed. A
blocklist meant the colour of your creature's face was technically tradeable, and
because the app stored the applied colour rather than a reference to the item you
could trade the swatch away and keep the colour. It is now an allowlist generated
from the catalog, so new item types are untradeable by default instead of tradeable
by default. That is a good "here is a bug I found in my own app" post, and those
land well.

---

## 3. Holo cards. The most demo-able thing in the app.

Brand new, nothing about it on the site.

Every species is a collectible card that turns in real 3D toward your phone's tilt,
with a foil sheet above the print that lags behind the card because laminate has
mass. Rarity picks the laminate: common gets a near neutral pearl you have to look
for, legendary gets three star plates moving at different rates. You can tell them
apart across a room without reading a word.

All of it is drawn in code. No image assets, no textures. Same as the creature.

**Updated 2026-08-10: the Dex tap-through landed**, so cards are no longer dev-seam
only. Tapping a Dex cell opens the full card, and there is a bond card for your own
creature, a card back, and PNG share.

SAFE to say: the card exists, and the foil renders as described. That much has been
seen, at many fixed tilt angles.

ALMOST, and read this before planning the video: **the gyroscope path has never once
run.** `CardTilt` guards on `isDeviceMotionAvailable`, which is false in the
simulator, so every check so far drove the card by dragging it with a cursor, not by
moving a phone. "Turns toward your phone's tilt" is the single best line we have and
it is the one thing least proven. It is very likely fine. It is not verified.

ALMOST: the Dex tap-through and the PNG share are built but have not been eyeballed
once (a test run wandered into another app and the taps never reached Yolkling).

Do not put a card in a paid ad, and do not shoot the video, until someone has held a
real phone and tilted it. "Built" and "seen working" are not the same claim, and this
doc exists to keep them apart.

This is still the strongest thing we have for video. Tilt is the whole demo and it
reads in two seconds — which is exactly why it is worth ten minutes on a device
before any money goes behind it.

---

## 4. Money: what we sell and what we refuse to sell

The old `CLAIMS.md` line "no real-money IAP" is now wrong. Replace it with this.

**We sell:** a supporter subscription (Yolkling Plus), and cosmetic packs.
**We do not sell:** Yolks. The currency itself is not purchasable, at any price.

That second one is deliberate and it is the sharpest thing we can say about the
business. We adopted RevenueCat's virtual currency system specifically in order not
to sell currency, so their ledger records exactly the Yolks that came from money and
ours records the ones that came from living. An engaged free player out-earns a
subscriber roughly 3.4x.

Also true and worth repeating:
- no gacha, no loot boxes, no pay-for-random. Cash never touches a random roll.
- rarity is found, never bought. money buys the *finish* on a card (the frame, the
  presentation), never what the card *is*. real collectors already understand this:
  you cannot make a common card rare, but you can sleeve it.
- your own creature's card has a finish that cannot be bought at any price. it comes
  from trust, which only rises when you look after yourself and decays if you stop.
  the best looking card in the app has no price on it.

SAFE to say: all of the above.
NOT YET: do not describe the card finish shop. it is designed, not built.

---

## 5. The "off your phone" claim: still not earned. Do not lean on it.

Pillar-adjacent and the easiest thing to get wrong.

The plan is that most Yolks come from being off the phone (steps, sleep, and a Screen
Time budget), which would turn the slogan into a mechanic and let us say something
measurable: our highest earning players have the lowest screen time.

**Updated 2026-08-10: the Screen Time half IS now built** — real Family Controls
authorization, a `DeviceActivityReport` extension that writes off-phone hours to the
App Group, and its own onboarding step. This section previously said "none of it is
built", which was true when written and is not any more.

**The marketing verdict does not change, and it is worth being clear why.** Two things
still stand between the code and the claim, and neither is code:

1. Apple has to grant the Family Controls entitlement (requested 2026-08-08, 2 to 4
   weeks). Until then it self-gates to off.
2. It has never run on hardware. Family Controls does not work in the simulator at
   all, so nobody has yet seen a single real number come out of it.

So "our highest earning players have the lowest screen time" is still a design intent
rather than a measurement, and a measurement is the entire reason that line is worth
saying. Shipping the code does not earn the claim; data does.

SAFE to say: focus sessions, and that steps and sleep feed the creature.
NOT YET: anything about screen time, phone limits, or the app knowing you were
doomscrolling. `CLAIMS.md` flags it as built-but-unproven.

---

## 6. Daily ceilings: partly true, so scope the claim

The design is that everything is finished for the day rather than rate limited. One
check-in, one drift, one trade, one pack. Nothing to gain from minute three.

**Today:** the daily wander and stranger gifting are genuinely capped. Trading and
packs are not yet.

SAFE to say: your yolkling wanders once a day, and that is it. you cannot grind it.
NOT YET: "two minutes a day is the whole app". true of the design, not yet of the
build.

When it is all true this is a strong and unusual thing to say out loud, and worth
saying: the cap is the retention mechanic, not a cost. wordle is one puzzle a day.

---

## 7. Species cards will be tradeable, and "met" stops meaning "held"

NOT YET. Needs server side ownership rows that do not exist.

When it lands, the collection gets two numbers: how many species you have met, and
how many you are holding. Trade a card away and it stops counting toward your
collection, the way it would anywhere else. A met-but-traded species shows as a
greyed card rather than reverting to a mystery egg, because you did meet it and
pretending otherwise would be a lie about your own history.

Do not market this yet. Noted so nobody writes copy that contradicts it later.

---

## 8. Pack opening is a SCRATCH CARD now, not crack-and-flip

**Updated 2026-08-10. Ignore any brief describing crack-and-flip** — that design was
dropped, and anyone briefed on it will write copy for a thing that does not exist.

What shipped instead: the card arrives face down, you see the back and the engraved
mark, and **you scratch the foil off with your finger** to reveal it. Roughly 55% of
the surface has to come away before it gives, and the card goes gyroscopic the moment
it does. There is a continuous haptic texture under the drag, so it feels like
scratching rather than dragging.

It is better than the crack-and-flip was, for a reason worth putting in copy: the
reveal is something you *do* rather than something you watch. A cutscene is the same
every time and people skip it. Nobody skips scratching a card.

Built and working. Two caveats: the haptic texture has never been felt (the simulator
cannot produce haptics), and the Blender work is no longer needed for this.

Randomness only ever sits behind packs you earn. If a pack is ever sold, its contents
are disclosed up front. A bundle, not a box.

---

## Quick reference

| Claim | Status |
|---|---|
| swap a spare cosmetic with a friend | SAFE |
| the creature you made is yours, only the outfit travels | SAFE |
| holo cards exist, rarity is the material, all drawn in code | SAFE (but not user-reachable yet) |
| Yolks are not for sale | SAFE |
| no gacha, no loot boxes, no pay-for-random | SAFE |
| rarity is found, finish is bought | SAFE |
| free to hatch, always | SAFE |
| made by one person, no AI art, no image assets | SAFE |
| steps and sleep feed the creature | SAFE |
| friend visits, postcards, waves, gifting, daily wander | SAFE |
| screen time / doomscroll detection | NOT YET (built, but the entitlement is pending and it has never run on hardware, so there is no measurement behind the claim) |
| "two minutes a day" | NOT YET (only some caps exist) |
| open your card in the app | ALMOST (built: bond card, card back, Dex tap-through, PNG share. Never eyeballed, so do not put a card in a paid ad until someone has opened one) |
| trade species cards / met vs held | NOT YET |
| the pack opening | ALMOST (it is a SCRATCH card now, NOT crack-and-flip. Built and working; the haptic texture has never been felt. Do not brief anyone on crack-and-flip) |
| card finish shop | NOT YET |

## Action needed on this repo

1. **PR #1: keep the AASA file and the honesty fixes, drop the two trading deletions.**
   Trading is real now.
2. Add trading back to the store card copy, scoped honestly: friends only, both sides
   agree.
3. Do not add holo cards to the site until the Dex tap-through ships. Then it should
   probably become the hero.
