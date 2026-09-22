# Yolkling ad creative — Meta/Instagram test set

4 variants, one per message hook from the paid-ads plan. All 1080x1080 (Meta/IG feed square).

| File | Hook | Headline |
|---|---|---|
| `ad-a-hatch.html` | the hatch | "pick your egg." |
| `ad-b-contrast.html` | the contrast | "every app wants your attention. yours wants you outside." |
| `ad-c-noticing.html` | the noticing (tagline) | "take care. they notice." |
| `ad-d-no-ai.html` | the no-AI flex | "every line of this creature is written. not drawn." |

## Dropping in your GPT Image 2.0 backgrounds

Each file has a `.bg-photo` layer with a background-image pointing at a local file next to the
HTML: `bg-hatch.jpg`, `bg-contrast.jpg`, `bg-noticing.jpg`, `bg-no-ai.jpg`. Generate the image,
save it under that exact name in this folder, and it appears immediately on reload. No file
there yet, so right now each ad falls back to a brand-gradient placeholder (still looks
intentional, not broken).

Background brief per variant, so the generated image supports the text instead of fighting it:
- **hatch:** soft, warm, mostly negative space. The creature crop is the subject, the photo is
  just atmosphere behind it (think diffused morning light, not a busy scene).
- **contrast:** outdoors, real daylight, a little wild. This is the one doing the most work,
  no creature shown, the photo has to carry "yours wants you outside."
- **noticing:** cozy interior, warm lamp light, evening. Matches the "little guy in his room"
  screenshot already in the layout.
- **no-ai:** dark or muted, a code-editor-adjacent mood (not literal code, that's handled in
  type). Grape accent should pop against it.

## Exporting to PNG for Ads Manager

Open the file in a browser at 100% zoom and screenshot the `.ad-square` element, or:
```
npx playwright screenshot --viewport-size=1080,1080 marketing/ads/ad-a-hatch.html ad-a-hatch.png
```

## Typography note

Adobe's font-kit service returned an account-entitlement error (not a missing-font error) when
checked this session, so these use Google Fonts directly for Onest / DM Sans / DM Mono, the
same three families already live on yolkling.com, nothing substituted.
