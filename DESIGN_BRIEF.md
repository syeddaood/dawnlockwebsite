# DawnLock — Design Brief

**Concept:** A sunrise you commit to, not snooze through. The site itself moves from night
toward dawn as you scroll, mirroring the app's actual promise: the only way out is through.

**Aesthetic:** Gradient Dawn / Product Noir — a near-black product-dashboard shell (matching
the app's dark screens: Garden, Streaks, Report, Settings) punctuated by the app's one warm
motif: the plum → maroon → ember → amber → gold sunrise gradient and layered mountain
silhouette, taken directly from the Figma showcase's alarm-ring screen.

**Mood words:** Firm, warm, unshakeable.

**Palette** (extracted from the Figma showcase + app screenshots):

| Token | Hex | Role |
|---|---|---|
| `bg` | `#0B0A10` | Page background (matches app dark screens) |
| `surface` | `#15121D` | Card surface |
| `ink` | `#F7F3ED` | Primary text on dark |
| `muted` | `#9C94A8` | Secondary text |
| `accent` | `#E8742F` | Primary actions, links (exact hero-text orange) |
| `gold` | `#F2B84B` | Highlights, focus rings, badges |
| `success` | `#3FBE6B` | Win states |
| `danger` | `#E2576A` | Errors |
| dawn sweep | `#2B1526 → #5C2430 → #B9552C → #E6962F → #F4C969 → #FBE7B8` | Hero & final-CTA backgrounds, lifted straight from the ring/alarm screenshots |

**Type pairing:** Space Grotesk (display, 500/700) for headlines — a heavy geometric grotesk
that echoes the condensed "RISE & SHINE" lockup seen in-app — paired with Inter (400–700) for
body text, which is the exact font used in the Figma hero copy. IBM Plex Mono carries numeric
readouts (times, streak counts) for a dashboard feel.

**Signature move:** *"Try to turn it off."* A fully interactive ringing-alarm phone mockup in
the hero. Visitors can drag the alarm card to swipe it away, tap a disabled Snooze pill, or tap
the X — every escape hatch taunts back and snaps into place. The only way to silence it is to
solve three real math problems, which triggers a warm, cream-gold "Wake successful" reveal and
a streak increment. This is the one interaction people will screenshot, and it's a literal,
truthful demonstration of the product's core mechanic — not a gimmick bolted on top of it.

**Motion style:** Snappy and a little mean for anything that resists you (taunts, shake,
disabled buttons — 150–450ms); slow and cinematic for the dawn-gradient scroll narrative and
section reveals (450–700ms, `ease-out`/spring).

---

## Scope decisions

- **Single theme, no light/dark toggle.** The night→dawn gradient *is* the brand's central
  metaphor and mirrors the app's own predominantly dark UI. Forcing a conventional light mode
  would dilute the one thing this brand has to say visually. Documented here as a deliberate
  call, not an oversight against the usual "both modes" guidance.
- **No testimonials section.** DawnLock is pre-launch; there are no real users to quote yet.
  Per the no-fabricated-testimonials rule, the site omits this section entirely rather than
  shipping a placeholder that reads as fake. Add it once real quotes exist.
- **No invented stats.** The "Problem" section deliberately uses relatable excuses and the
  app's own real mechanism copy instead of invented numbers ("73% of people snooze…") or fake
  user counts. The Streaks/Garden/Report proof section uses the actual Figma screenshots rather
  than a hand-built chart with made-up data.
- **Primary CTA is waitlist signup**, per product stage (pre-launch, Android only). The waitlist
  form posts to `app/api/waitlist/route.ts`, which currently appends to `data/waitlist.json` —
  **this is a dev-friendly placeholder, not a production data store.** Before shipping, wire it
  to a real email service (e.g. an ESP) or a database table.
- **Logo mark is an original design**, not a pixel-extraction from the app's small in-screenshot
  icon (no clean vector asset was available). It reuses the brand's moon/sun motif deliberately.
- **No smooth-scroll library (Lenis was removed).** It was in the original plan for a cinematic
  scroll feel, but its continuous `requestAnimationFrame` loop cost ~770ms of Total Blocking Time
  under Lighthouse's throttled CPU, dropping the Performance score from 97 to 77. Native CSS
  `scroll-behavior: smooth` gives in-page anchor links a smooth scroll for free; the cinematic
  feel instead comes from the scroll-scrubbed mechanism crossfade, parallax mountains, and
  staggered reveals, which cost nothing at idle.
- **Footer omits social/legal links** (Privacy, Terms, social handles) since none exist yet —
  dead links would be worse than no links. Add them once those pages/accounts are real.

## Source material

All eight in-app screenshots and the hero copy/colors were pulled from the Figma file
"DawnLock — App Showcase" and downloaded into `public/app-shots/`.
