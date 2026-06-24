# Yolkling — Design System

> a little yolk creature that is secretly you. the app that wants you off your phone.

This is the working design system for Yolkling. Every value below is pulled from the real
CSS: `app/globals.css` (the live Tailwind `@theme` — source of truth for the egg palette and
fonts), `app/yolk.css` (the landing-page components, including the `EGG PALETTE OVERRIDES`
block at the bottom), and `_port/orig.css` (the original grape-world port that the egg palette
overrides).

A note on the two palettes: the original port (`orig.css` and the top of `yolk.css`) built a
**grape-primary candy world**. The brand then moved to an **egg/yolk identity**: `globals.css`
and the `EGG PALETTE OVERRIDES` at the bottom of `yolk.css` make **yolk yellow** the creature
and the primary. Grape is now demoted to one of several "vibe" accent colors. This document
treats the **egg palette as the real brand** and calls out where grape still drives section
backgrounds in the landing page.

---

## 1. Brand essence

Yolkling is a cozy iOS app with a soft-toy heart. The mascot is a little yolk creature —
the "yolkling" — that is secretly *you*. The whole pitch is gentle: it wants you off your
phone, and it is honest about being made by one person.

**Personality**

- **Warm** — eggshell base, yolk yellow, rounded everything. Nothing is cold or sharp.
- **Honest** — no fake numbers, no fake reviews, no dark patterns. The waitlist and feedback
  forms literally replace the usual "10,000 happy users" and star-rating theater.
- **Cozy** — soft shadows, big radii, a hatching-egg loader, a creature that breathes.
- **A little funny** — the yolkling has moods ("feral", "chill", "dreamy"), hops when you
  hover, and squishes when you drag it.
- **Never corporate** — lowercase voice, hand-drawn-feeling blobs, no stock-photo gloss.
- **Never tries to rip you off** — one-person-founder honesty is a stated rule, not a vibe.

---

## 2. Color — the egg palette

Source of truth: the `@theme` block in `app/globals.css`. These are the brand colors.

### Core eggshell + ink

| Token | Hex | Used for |
|---|---|---|
| `--color-shell` (eggshell base) | `#FBF6EC` | Page background. The default canvas everywhere. |
| `--color-shell2` (eggshell deep) | `#F4EAD6` | Alternate section backgrounds (friends, pricing, feedback). |
| `--color-ink` (warm ink) | `#2A241B` | Primary text, borders (the 3px outlines), pupils. |
| `--color-inksoft` (soft ink) | `#6B5E49` | Secondary text, subheads, captions. |
| `--color-mut` (muted) | `#A99A82` | Hints, meta, status lines, the quietest text. |

> The landing CSS (`yolk.css`) carries a slightly different warm ink, `#2C2118`, with
> soft ink `#6E5C49` and muted `#A8937D`. Treat `globals.css` (`#2A241B` / `#6B5E49` /
> `#A99A82`) as canonical and `yolk.css` values as the legacy port. Both read as the same
> warm near-black brown family.

### Yolk (the primary)

| Token | Hex | Used for |
|---|---|---|
| `--color-yolk` (yolk yellow) | `#FFC23B` | **Primary.** The creature's body, arms, logo dot, the blink pip, selection highlight. |
| `--color-yolkdeep` (yolk deep) | `#E8A21E` | The creature's feet, deeper edges, the body's drop-shadow tint. |
| `--color-yolksoft` (yolk soft) | `#FFE7A6` | Soft fills: the "you're in" waitlist + feedback success cards. |

The creature body is a radial gradient, not a flat fill:
`radial-gradient(120% 120% at 32% 28%, color-mix(in srgb, var(--cv) 78%, white), var(--cv) 62%)`
where `--cv` defaults to `--color-yolk`. In the landing override it is spelled out as
`radial-gradient(120% 120% at 32% 28%, #FFD873, #FFC23B 62%)` — a brighter top-left highlight
(`#FFD873`) falling to yolk yellow.

Selection uses yolk on ink: `::selection { background: var(--color-yolk); color: var(--color-ink); }`.

### Candy "vibe" accents

These are the creature's alternate colors (the vibe picker) and the candy section backgrounds.
Grape lives here now — it is an accent, not the primary.

| Token | Hex | Role |
|---|---|---|
| `--color-grape` (grape) | `#7B5CF0` | A vibe option; also drives marquee, hatch headline, "step 4" card, statement reveal word, outro, and the preloader egg shell in the landing page. The original primary, now an accent. |
| `--color-pink` (pink) | `#FF94C2` | The creature's blush (always pink, every vibe); a vibe option; card 1 background. |
| `--color-mint` (mint) | `#73E0AE` | A vibe option; card 2 + statement section background. |
| `--color-sky` (sky) | `#8FD0FF` | A vibe option. |
| `--lemon` (lemon) | `#FFD25A` | Marquee dots, "live" status, plan badges, accent on dark sections. (Defined in `yolk.css`; close cousin of yolk yellow.) |
| `--tang` (tangerine) | `#FF8A5B` | Spare warm accent (defined in the port, used sparingly). |

`--grape-deep` `#5a3fd0` is the pressed/shadow tone for grape buttons in the landing page.

### Lines + grain

| Token | Value | Used for |
|---|---|---|
| `--color-line` / `--line` | `rgba(42,36,27,0.12)` | Hairline dividers, dashed plan separators, ghost-button underline. |
| `--line-soft` | `rgba(44,33,24,.06)` | Faintest dividers. |
| grain overlay | `opacity: .035`, `mix-blend-mode: multiply`, fractal-noise SVG | A fixed film-grain layer over everything for warmth and texture. |

---

## 3. Typography

Three families, set as font variables in `globals.css`:

| Role | Family | Token | Notes |
|---|---|---|---|
| **Display** | Onest | `--font-display` / `.font-display` / `.brand` | Chunky-friendly. Headlines, the wordmark, big numbers. |
| **Body** | DM Sans | `--font-body` | Default `body` font. Paragraphs, UI text. |
| **Labels / eyebrows** | DM Mono | `--font-mono` / `.font-mono` / `.mono` | Uppercase micro-labels. |

### Display weights (Onest)

Onest is used at multiple weights depending on heft needed:

- **700** — marquee text.
- **800** — the workhorse display weight. Wordmark (`.brand`), hero H1, section heads,
  card titles, menu links, hatch headline, pricing prices, outro.
- **900** — the giant statement word only (maximum impact).

Display letter-spacing runs tight: `-.02em` on the wordmark up to `-.035em` / `-.04em` on the
biggest headings. Display line-height is dense (`.85`–`.98`).

### Labels (DM Mono)

The `.mono` / `.font-mono` label style:
```
font-family: "DM Mono", monospace;
font-weight: 400;
letter-spacing: .03em;
text-transform: uppercase;
font-size: .7rem;
```
Used for eyebrows, section tags, "founder note" lines, slide attributions, plan kickers.

### Heading scale (clamp, fluid)

Every heading is fluid via `clamp(min, viewport, max)`:

| Element | Clamp |
|---|---|
| Hero H1 | `clamp(3rem, 7vw, 6.5rem)` — line-height `.94` |
| Big section head (`.big-h`) | `clamp(2.4rem, 7vw, 6rem)` |
| Sticky card title (`.card-h`) | `clamp(2.6rem, 8vw, 6.5rem)` — line-height `.9` |
| Hatch headline | `clamp(2.2rem, 5.5vw, 4.6rem)` |
| Menu link | `clamp(2.6rem, 11vw, 8rem)` |
| Statement word (weight 900) | `clamp(4rem, 20vw, 18rem)` — line-height `.85` |
| Statement reveal sub | `clamp(1.4rem, 3.4vw, 2.6rem)` |
| Marquee | `clamp(1.3rem, 2.6vw, 2.1rem)` |
| Outro line | `clamp(2.4rem, 7vw, 5rem)` |
| Pricing price | `clamp(2.2rem, 3.6vw, 3rem)` |
| Body / hero sub | `clamp(1.02rem, 1.2vw, 1.2rem)` — line-height `1.55` |
| Card paragraph | `clamp(1.05rem, 1.5vw, 1.4rem)` — line-height `1.45` |

---

## 4. The yolkling (creature anatomy)

The mascot is built entirely from CSS shapes — no image. Source: `.creature` and `.cr-*` in
`globals.css` (canonical) and `yolk.css` (landing variant). It is "secretly you": you pick its
vibe, you drag it, it reacts.

### Anatomy

| Part | Class | What it is |
|---|---|---|
| **Body** | `.cr-body` | A soft blob. `aspect-ratio: 1/1.02`, organic radius `48% 52% 47% 53% / 53% 51% 49% 47%`. Yolk radial gradient. Inner shadow `inset -14px -18px 0 rgba(0,0,0,.08)` plus a yolk-tinted drop `0 22px 46px rgba(232,162,30,.28)`. |
| **Eyes** | `.cr-eye` (`-l` / `-r`) | Two white ovals, `width:22%`, `aspect-ratio:1/1.15`, at `top:33%`, `left/right:24%`. |
| **Pupils** | `.cr-pupil` | Ink discs, `46% × 46%`, centered, each with a tiny white catchlight (`::after`, top-right). **They track the cursor** — `transition: transform .12s ease-out`, nudged by JS toward the pointer. |
| **Blush** | `.cr-blush` (`-l` / `-r`) | Two soft **pink** ovals, `opacity:.65`, `blur(1px)`, at `top:52%`. Always pink regardless of vibe. |
| **Mouth** | `.cr-mouth` | A small open curve (`border-radius:0 0 60px 60px`, no top border). Changes shape by vibe (see below). |
| **Arms** | `.cr-arm` (`-l` / `-r`) | Yolk-colored stubs at `top:50%`, poking out `±-7%`, behind the body (`z-index:-1`). |
| **Feet** | `.cr-foot` (`-l` / `-r`) | Two **yolk-deep** ovals at the bottom, behind the body. |
| **Shadow** | `.cr-shadow` | A blurred ink ellipse on the ground (`rgba(42,36,27,.15)`, `blur(7px)`). |

### Motions

| Motion | How | Detail |
|---|---|---|
| **Idle breathe** | `@keyframes breathe` on `.cr-body` | `3.6s` infinite, `scale(1,1) → scale(1.03,.97)` — a gentle squash-and-stretch lung. |
| **Arm sway** | `@keyframes armL` / `armR` | `2.8s` infinite, arms rotate `±12° → ∓2°`, mirrored, origin at the inner edge. |
| **Blink** | JS toggles eyes; the eyebrow `.pip` blinks on its own | `@keyframes blink` `2s`, opacity `1 → .3`. |
| **Hover hop** | `.cr-hop` → `@keyframes hop` | `.5s`, `translateY(0 → -14px → 0)`. Triggered on hover/poke. |
| **Drag squish + spring back** | JS drag handler | Grab cursor (`cursor:grab` → `grabbing`), body squishes while dragged, then springs home using the `--pop` spring easing. |
| **Spontaneous antics** | JS timers | Random hops, happy mouth (`.creature.happy`), floating hearts (`.heart`) — the creature does little things on its own. |
| **Vibe re-hatch** | vibe picker | Choosing a vibe swaps `--cv`/`--cvd` (body/arms/feet color) and the mouth shape, with a `.45s ease` color transition — it "re-hatches" into a new mood. |

### Vibe moods (mouth shapes)

Set via `data-vibe` (globals) or `.vibe-*` class (landing):

- **default** — small open smile (`border-radius:0 0 60px 60px`).
- **feral** — wide open filled grin (`width:23%`, ink fill, `0 0 80px 80px`).
- **chill** — a flat line (`height:0`, just a bottom border) — unbothered.
- **dreamy** — a tiny round "o" (`9% × 9%` circle) — soft and far away.

The blush stays pink in every mood; only the fill color (`--cv`/`--cvd`) and mouth change.

> Reduced motion: `@media (prefers-reduced-motion: reduce)` stops the body breathe and arm
> sway and disables smooth scroll. Always respected.

---

## 5. Core components

### Buttons

**Pill button (`.btn-pill`)** — nav CTA. Ink fill, eggshell text, `border-radius:100px`,
`.6rem 1.15rem`. Hover: `scale(1.05) rotate(-1deg)` on the `--pop` spring.

**Primary button (`.btn-primary`)** — the chunky toy button. In the landing page it is grape
with a hard bottom shadow:
```
background: var(--grape); color:#fff; border-radius:100px;
padding:1rem 1.7rem; box-shadow:0 6px 0 var(--grape-deep);
```
It physically presses: hover `translateY(-2px)` + `0 8px 0`; active `translateY(4px)` + `0 2px 0`.
`.btn-xl` is the bigger hero variant. On dark sections it inverts to white-on-grape.
(In a fully egg-themed build this becomes yolk with a `--color-yolkdeep` shadow.)

**Ghost button (`.btn-ghost`)** — text with a `--line` underline; hover colors it in.

**Line button (`.btn-line`)** — bare text link in accent color, for "edit / undo"-style actions.

### Sticky cards (`.how` / `.card`)

The "how it works" section. Each `.card` is `position:sticky; top:0`, full-height, and the
`.card-inner` has `border-radius:36px 36px 0 0`, a `3px solid` ink border, and a candy
background that stacks as you scroll: card 1 **pink**, card 2 **mint**, card 3 **lemon**,
card 4 **grape** (white text). A numbered ink-circle badge (`.card-num`) tops each. An
`::after` ink overlay (`--ov`) darkens cards as the next one slides over.

### Marquee (`.marquee`)

Full-bleed grape band, white Onest 700 text, framed by `3px` ink borders top and bottom.
Words separated by lemon dots (`.m-dot`). Scrolls infinitely (`@keyframes marq`, `translateX(0 → -50%)`).

### Forms

Honest by design — these literally replace fake social proof.

**Waitlist (`.waitlist`)** — a pill text input (`.wl-input`, `2px` ink border, white fill,
`border-radius:100px`) next to a primary button. Focus turns the border grape. `.wl-meta` is a
muted reassurance line. On submit, the form swaps to `.wl-done`: a **yolk-soft** (`#FFE7A6`)
card with an Onest heading and a soft-ink subline.

**Feedback (`.feedback` / `.fb-form`)** — sits on eggshell-deep. A rounded `.fb-textarea`
(`16px` radius, `2px` ink border) plus inputs and a primary button. Success swaps to `.fb-done`,
same yolk-soft card. This block is explicitly labeled in the CSS as the replacement for fake reviews.

### Overlay menu (`.menu`)

Full-screen takeover. Three stacked `.menu-bg` panels (**pink → lemon → grape**) wipe in by
`scaleY(0 → 1)` from the top. Huge Onest links (`clamp(2.6rem,11vw,8rem)`) white, hover to ink.
The inner panel reveals via an animating `clip-path`. Toggler hamburger animates into an X.

### Preloader — hatching egg (`.preloader` / `.egg`)

The first thing you see. A `120×152px` egg (`.egg-shell`, grape, egg-shaped radius
`50% 50% 48% 52% / 62% 62% 38% 38%`) sits on the eggshell background. A zig-zag `.egg-crack`
(eggshell-colored, jagged `clip-path`) fades in across the middle — the egg cracking — with a
muted status line below. Then it hatches into the page.

---

## 6. Motion principles

- **Springy "pop" everywhere.** `--pop: cubic-bezier(.34,1.56,.64,1)` — the overshoot spring.
  It is the brand's signature feel: buttons, the cursor ring, vibe dots, plan hovers, the
  creature's mouth and spring-back all use it. When in doubt, things should *bounce* slightly
  past and settle.
- **Soft glide for reveals.** `--ease-out: cubic-bezier(.16,1,.3,1)` for underlines, nav, the
  pressing button shadow — confident decel without bounce.
- **GSAP ScrollTrigger** drives the scroll story: sections **pin** (`height:100svh` + pin) while
  inner content animates — the hatch canvas, the statement word scaling up, the 3D collection
  scatter, the sticky-card stack.
- **Scrub.** Scroll-linked animations are scrubbed (tied to scroll position), so scrolling back
  and forth plays them forward and backward — nothing is a one-shot you can't rewind.
- **Custom cursor.** A dot + ring (`.cursor`) replaces the system cursor (`body{cursor:none}`);
  the ring grows on hover and becomes a labeled grape pill over interactive targets. Falls back
  to the system cursor on touch (`@media(hover:none)`).
- **Texture is alive.** The grain layer animates subtly; nothing sits perfectly still.

---

## 7. Voice and tone

Yolkling sounds like a kind friend who built something small and means it.

- **lowercase, friendly.** headlines and body lean lowercase. it feels handwritten, not announced.
- **warm and gentle.** the app wants you *off* your phone — say it softly, never naggy or preachy.
- **honest above all.** no fake numbers. no fake reviews. no invented user counts. the waitlist
  and feedback forms exist *because* we won't fake social proof.
- **NO em dashes.** use a comma, a period, or just start a new sentence. (this doc uses them to
  describe the system; the product copy does not.)
- **one-person-founder honesty.** it's okay — encouraged — to say "i" and "made by one person."
  the smallness is the trust.
- **a little funny.** the creature has moods and does dumb cute things. lean into that. never
  corporate, never a growth-hack tone, never trying to rip anyone off.

---

## Do / Don't

**Do**
- use eggshell `#FBF6EC` as the canvas and yolk yellow `#FFC23B` as the primary.
- give everything big radii, soft inner shadows, and `3px` ink outlines on cards/inputs.
- make interactive things bounce with the `--pop` spring; let reveals glide with `--ease-out`.
- set display in Onest 800 (900 only for the giant statement), body in DM Sans, labels in DM Mono uppercase.
- keep the creature reactive: tracking pupils, breathe, hop, drag-squish, vibes.
- write lowercase, warm, and honest. say it's made by one person.
- respect `prefers-reduced-motion` and fall back to a real cursor on touch.

**Don't**
- don't make yolk feel cold or sharp, and don't flatten the body gradient to a solid.
- don't use em dashes in product copy.
- don't fake numbers, reviews, ratings, or user counts — ship the waitlist/feedback forms instead.
- don't go corporate, salesy, or nagging about screen time.
- don't treat grape as the primary — it's a vibe accent now (even though it still backs some landing sections).
- don't recolor the blush — it stays pink in every vibe.
- don't ship one-shot scroll animations; keep them scrubbed and reversible.
