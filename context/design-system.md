# STRATA '26 — Gotham Design Language

What the Batman theme actually means, and how to execute it in this codebase.
Last Updated: 2026-07-30

> **Status (2026-07-30):** Sections 1–3 describe the _intended_ direction;
> section 3 is an honest diagnosis of where the current build falls short.
>
> **Implemented so far:** step 1 only — `src/components/Atmosphere.tsx` (film
> grain + night haze + low fog).
>
> **▶ AGREED NEXT — resume here:** Steps A → B → C (see `backlog.md §P2`).
>
> - **A:** Add the token block from §4 below into `src/styles.css`. Additive only.
> - **B:** Rebalance red — demote ~30 reds to sodium/oxblood, keep only Register CTAs + countdown.
> - **C:** Redo event cards — `rounded-none`, opaque `--gotham-asphalt`, single sodium lit edge.
>
> Do them in that order. A enables B and C; each step is self-contained and
> independently visible.

---

## 1. The reference canon

Batman is one of the most visually codified properties in existence. "Batman
themed" is not a vibe to improvise — there is an actual established visual
grammar. The four references worth knowing, because each contributes something
different:

| Source                                                                             | What it contributes                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anton Furst's Gotham** — _Batman_ (1989)                                         | The architecture. Furst described the goal as if hell had erupted through the pavement and kept going. Monumental, oppressive, vertical, crushing scale.                                                  |
| **"Dark Deco"** — _Batman: The Animated Series_ (1992), Bruce Timm & Eric Radomski | The graphic language. Art Deco geometry drawn on **black paper** rather than white — shadow is the default state and light is what gets added. This is the single most useful mental model for a website. |
| **The Nolan trilogy** (2005–2012)                                                  | The color temperature. Cold steel-blue night, desaturated, grounded, industrial. Restraint.                                                                                                               |
| **The Batman** (2022), Matt Reeves                                                 | The atmosphere. Rain, sodium-vapor amber, halation around every light source, oxblood red as mood rather than accent.                                                                                     |
| **Arkham** games (2009–2015)                                                       | The UI treatment. How Gothic architecture and interface elements coexist without the UI looking like a SaaS dashboard.                                                                                    |

### The one principle that matters most

> **Gotham is defined by chiaroscuro — scarce, hard, motivated light in
> overwhelming darkness.**

Not "dark grey everywhere." _Darkness with light carved into it._ Every light
source in Gotham has a reason to exist: a sodium streetlamp, a searchlight beam,
a lit window, headlights on wet asphalt, the bat-signal. Light is an event, not
an ambience.

A page that is uniformly dark with a uniform accent color is not Gotham. It is
just a dark page. The difference is **contrast range and light motivation**.

---

## 2. The six pillars

### 2.1 Light is scarce and motivated

- Most of the viewport should be genuinely near-black — not `#1a1a1a` "dark mode
  grey."
- Where something is lit, it should be **clearly lit by something**: a beam, an
  edge glow, a lamp pool, a signal. Ask "what is lighting this?" for every bright
  element.
- Falloff must be soft and directional. Hard-edged uniform glows read as
  neon/cyberpunk, not Gotham.
- **Halation** — light bleeding slightly past its source — is the single cheapest
  way to make a dark page feel cinematic rather than flat.

### 2.2 Color: red is an alarm, not a theme

This is where the current site diverges most from canon.

Canonical Gotham is **black + cold blue-grey night + warm sodium amber**, with
red reserved for violence, alarm, and menace. Red-dominant Batman is almost
exclusively _The Batman_ (2022), and even there it's atmospheric wash, not
interface color.

The palette should be:

- **Black / charcoal** — 80%+ of every screen. The base state.
- **Cold slate blue** — the night air. Fog, distance, atmosphere, inactive UI.
- **Sodium amber** — the light sources. Lamp pools, beams, warm rim lighting.
  This is the _warm counterpoint that makes the cold read as cold._
- **Oxblood / deep crimson** — structural accents, borders, dividers.
- **Bright red** — **CTAs and alerts only.** Register buttons, live countdown,
  urgent state. If everything is red, nothing is urgent.
- **Bat-signal yellow** — one iconic spot use, maximum. Not a general accent.

### 2.3 Architecture: vertical, monumental, Deco

- **Verticality.** Tall proportions, upward-reaching lines, generous vertical
  rhythm. Gotham dwarfs the human — the layout should feel like looking _up_.
- **Deco geometry.** Stepped setbacks (ziggurat forms), symmetry, strong vertical
  ribs, chevrons, sunburst radials, hard 45° angles. No soft blobs, no organic
  shapes, no playful curves.
- **Sharp corners over round.** Current cards use `rounded-xl` / `rounded-[20px]`,
  which is friendly and modern — the opposite of the intent. Deco wants
  `rounded-none` or at most a 2px chamfer, with the interest coming from _framing
  and edge treatment_ instead of corner radius.
- **Heavy framing.** Deco loves a border, a rule line, an inset frame, a plinth.

### 2.4 Texture: Gotham is never clean

Flat translucent cards (`bg-white/[0.03]` + `backdrop-blur`) are glassmorphism —
the visual language of Apple and SaaS dashboards, not Gotham. Gotham surfaces are
**concrete, wet asphalt, scratched steel, weathered stone.**

Cheap, high-impact additions:

- **Film grain** — a fixed, low-opacity noise overlay across the whole page. Single
  biggest atmosphere-per-byte win available. Kills the "flat digital" feel instantly.
- **Fog / haze gradients** — soft horizontal bands of very slightly lifted black
  to imply depth and distance between layers.
- **Vignette** — already present in the hero; should extend site-wide.
- **Rain** (optional, desktop only, respects reduced-motion) — the most
  recognizable Gotham signifier there is.

### 2.5 Typography: compressed for power, not spread for luxury

Batman's title design is **heavy, condensed, tall, tightly tracked.** Compression
reads as power and weight.

The current site uses `tracking-[0.3em]` to `tracking-[0.5em]` uppercase almost
everywhere. Ultra-wide tracking is the visual language of _luxury fashion
branding_ — Dior, Balenciaga — not Gotham.

The rule:

- **Display / headings** → condensed heavy face (Anton is already loaded and is a
  good choice), `tracking-tight` to `tracking-normal`, very large, uppercase.
- **Small labels / eyebrows** → _this_ is where wide tracking belongs. Wide
  tracking works at 10–12px as a texture; it fights you at 60px.
- **Body** → normal tracking, comfortable reading. Don't style paragraphs as
  branding.

A newspaper serif is worth considering for The Gotham Times event specifically —
it is literally a newspaper.

### 2.6 Motion: emerge and vanish, never bounce

Batman appears from darkness and disappears into it. He does not spring.

- **Fade + slight scale up from dark** for entrances. No overshoot, no bounce,
  no elastic easing.
- `ease-out` and `ease-in-out`. **Never** spring/bounce curves.
- **Slow reveals, sharp exits** — things resolve out of shadow gradually, then
  cut away.
- Light-based motion is the theme's signature: a beam sweeping, a glow
  intensifying on hover, a signal flickering to life. Prefer animating _light_
  over animating _position_.
- Everything must degrade cleanly under `prefers-reduced-motion` (already wired
  in `styles.css`).

---

## 3. Honest diagnosis of the current implementation

What is already right:

- ✅ Near-black base with a genuinely dark `:root`
- ✅ Hero vignette stack + video desaturation — real chiaroscuro instinct
- ✅ **The logo searchlight** is exactly the right idea. Motivated, moving,
  masked light on a dark field. This is the most on-theme thing in the codebase.
- ✅ Themed particle burst using bat / joker / card / question-mark silhouettes
- ✅ Anton for display digits
- ✅ Reduced-motion discipline throughout

What diverges from canon:

| Issue                                 | Where                                                                  | Why it's off                                                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Red is the only accent**            | everywhere — `text-red-500`, `bg-red-600`, `border-red-600`            | Flattens the palette. No cold/warm tension. Reads "dark tech startup." Red loses all urgency by being constant. |
| **No amber light source**             | site-wide                                                              | Nothing motivates the light. Cold can't read as cold without a warm reference.                                  |
| **Glassmorphism cards**               | `EventsSection`, `ContactSection` — `bg-white/[0.03] backdrop-blur-sm` | SaaS dashboard language. Gotham surfaces are opaque, textured, heavy.                                           |
| **Rounded corners**                   | `rounded-xl`, `rounded-[20px]`, `rounded-full` badges                  | Friendly and modern. Deco is angular and severe.                                                                |
| **Ultra-wide tracking on large type** | `tracking-[0.15em]`–`tracking-[0.5em]` on `text-6xl` headings          | Luxury-fashion register, not Batman. Compression = power.                                                       |
| **No texture layer**                  | site-wide                                                              | Flat digital black. No grain, no fog, no atmosphere.                                                            |
| **No Deco geometry**                  | site-wide                                                              | No vertical ribs, chevrons, setbacks, or framing. Theme is carried entirely by the poster images.               |
| **Uniform lighting**                  | events + contact                                                       | Sections are evenly lit. Nothing is _in_ shadow, so nothing reads as lit.                                       |

The blunt summary: **the theme currently lives in the poster images and the word
"Gotham," not in the design system.** Strip the posters out and it's a
competent generic dark event site. The fix is atmosphere and palette, not more
red.

---

## 4. Proposed token set

To go in `src/styles.css`. **All colors must be `oklch`** (Tailwind v4
requirement in this project). Values below are calculated approximations — eyeball
them in the browser and adjust; the _relationships_ matter more than the exact
numbers.

```css
:root {
  /* ── Base: the dark. Cool-shifted, not neutral grey. ───────────────── */
  --gotham-void: oklch(0.03 0.004 250); /* deepest black, page base   */
  --gotham-asphalt: oklch(0.09 0.008 252); /* raised surface / card      */
  --gotham-concrete: oklch(0.16 0.01 254); /* borders, dividers, inset   */
  --gotham-steel: oklch(0.28 0.014 256); /* muted strokes              */

  /* ── Night air: the cold. Atmosphere, fog, inactive state. ─────────── */
  --gotham-night: oklch(0.27 0.03 258); /* fog bands, distant haze    */
  --gotham-slate: oklch(0.55 0.04 257); /* secondary text, inactive   */

  /* ── Sodium: the light. Motivated warm light sources. ──────────────── */
  --sodium-core: oklch(0.9 0.07 75); /* lamp / beam center         */
  --sodium-glow: oklch(0.77 0.16 70); /* lamp falloff, rim light    */
  --sodium-deep: oklch(0.65 0.15 60); /* warm shadow edge           */

  /* ── Blood: the alarm. Sparingly. ──────────────────────────────────── */
  --blood-oxblood: oklch(0.37 0.13 27); /* structural accent, borders */
  --blood-crimson: oklch(0.577 0.245 27.325); /* CTA only (= red-600)    */

  /* ── Signal: one iconic spot use. ──────────────────────────────────── */
  --signal-yellow: oklch(0.82 0.16 83);
}
```

### Usage discipline

| Token               | Allowed uses                                          | Hard limit                                                        |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| `--gotham-void`     | Page background                                       | —                                                                 |
| `--gotham-asphalt`  | Cards, panels, modals                                 | —                                                                 |
| `--gotham-concrete` | Borders, dividers, table rules                        | —                                                                 |
| `--gotham-slate`    | Secondary/muted text                                  | —                                                                 |
| `--sodium-*`        | Light beams, lamp pools, hover rim light, active glow | This is the **primary** atmospheric accent — use it more than red |
| `--blood-oxblood`   | Structural borders, section accents, eyebrow labels   | —                                                                 |
| `--blood-crimson`   | **Register CTAs and live countdown only**             | Max ~3 elements visible per screen                                |
| `--signal-yellow`   | One hero/section moment                               | **Once per page**                                                 |

### The red budget

The single highest-leverage change: demote `red-600`. Currently it appears in
roughly 30 places. It should appear in **three to five**: the nav register
button, the section register CTAs, and the countdown. Everything currently red
that is _not_ a call to action becomes `--sodium-glow` (if it represents light) or
`--blood-oxblood` (if it represents structure).

---

## 5. Component direction

| Element                | Now                                                     | Should be                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Event card**         | Rounded, translucent, blurred, red hover glow           | Squared. Opaque `--gotham-asphalt`. Thin `--gotham-concrete` border with a **single lit edge** (top or left) in `--sodium-deep`. On hover the lit edge intensifies and warms — _light falling on it_, not a red aura. |
| **Card badges**        | `rounded-full` pills                                    | Squared tags or plain tracked labels. Deco doesn't do pills.                                                                                                                                                          |
| **Section heading**    | `text-6xl tracking-[0.15em]` red glow                   | Anton, `text-7xl`+, `tracking-tight`. Lit from one side with sodium rim, not a symmetrical red drop-shadow.                                                                                                           |
| **Eyebrow label**      | Red, `tracking-[0.5em]`                                 | Keep the wide tracking (correct at this size), recolor to `--sodium-glow` or `--gotham-slate`.                                                                                                                        |
| **Section divider**    | `border-t border-white/10`                              | Deco rule: a thin double line, or a centered stepped/chevron motif.                                                                                                                                                   |
| **Nav bar (scrolled)** | Dark red-tinted blur                                    | Near-opaque `--gotham-void` with a `--blood-oxblood` hairline and a faint sodium underglow.                                                                                                                           |
| **Buttons**            | Solid red, rounded-md                                   | CTA stays crimson but squared, with a sodium rim-light on hover. Secondary buttons become outlined in `--gotham-concrete`.                                                                                            |
| **Location card**      | Rounded-20 translucent                                  | Squared concrete panel, Deco corner brackets.                                                                                                                                                                         |
| **Page backdrop**      | Frosted/darkened pane over the still-playing hero video | ✅ **Done** — `Atmosphere.tsx` adds the grain layer and fog bands.                                                                                                                                                    |

### New atmospheric elements worth adding

1. **Film grain overlay** — one fixed full-viewport div, SVG `feTurbulence` noise
   or a tiny tiled PNG, `opacity: 0.03–0.05`, `pointer-events-none`,
   `mix-blend-overlay`. Cheap, static, transformative.
2. **Bat-signal beam** — a section transition or contact-section feature. The most
   iconic Batman image in existence and currently unused.
3. **Deco vertical ribs** — thin repeating vertical lines at low opacity flanking
   section content. Implies architecture without any asset.
4. **Fog bands** — 2–3 very soft horizontal `--gotham-night` gradients at section
   boundaries. Creates depth between the sections.
5. **Rain** (desktop only, reduced-motion off) — CSS-only diagonal streaks at
   very low opacity. Optional, but it is _the_ Gotham signifier.

---

## 6. Per-event tonal notes

Each event references a different corner of the Batman mythos. Worth a small
distinguishing touch in the modal rather than six identical panels — but keep it
subtle; six loud themes would be chaos.

| Event                     | Character / reference    | Tonal hook                                                                                           |
| ------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| WayneTech Research Summit | Wayne Enterprises R&D    | Corporate Deco. Clean, formal, brushed-steel restraint.                                              |
| Why So Serious?           | The Joker                | The one place chaos is allowed — slight skew, acid green as a _single_ spot accent, jitter on hover. |
| Rogue AI                  | Rogue tech / Brother Eye | Cold, systemic, machine. Cyan-shifted, monospace, scanline.                                          |
| The Gotham Times          | Gotham City newspaper    | Newsprint. Serif headline, halftone texture, column rules.                                           |
| Batman & Robin            | The Dynamic Duo          | Paired/mirrored layout — two halves, one describing, one building.                                   |
| Riddler's Escape          | The Riddler              | Question-mark motif, puzzle-grid background, acid green-on-purple restraint.                         |

Note: acid green (Joker) and purple (Riddler) are legitimate canon colors, but
they must stay **spot accents inside those two modals only** — never leaking into
global tokens.

---

## 7. Anti-patterns

Do not, under any circumstances:

- ❌ **Neon / cyberpunk glow.** Gotham light is dirty sodium and cold moonlight,
  not saturated purple-cyan neon. This is the most common wrong turn.
- ❌ **Uniform dark grey with one accent.** That's generic dark mode.
- ❌ **Glassmorphism.** Frosted translucent panels are Apple/SaaS, not Gotham.
- ❌ **Rounded, friendly, bouncy anything.** No spring easing, no blobs, no big
  border radii.
- ❌ **Comic-book pop treatment.** No halftone POW/BAM, no primary-color panels,
  no comic speech bubbles. This is cinematic Gotham, not 1960s camp.
- ❌ **Red everywhere.** Covered above. The single biggest current issue.
- ❌ **Emoji.** Anywhere on the site.
- ❌ **Low-contrast body text.** Atmosphere never justifies unreadable copy — the
  darkness goes in the _background_, not the text. Keep body copy at or above
  `--gotham-slate` lightness on the void background.
- ❌ **Motion that can't be disabled.** Every effect must respect
  `prefers-reduced-motion`.

---

## 8. Implementation order

If executing this, do it in this sequence — each step is visible on its own and
low-risk:

1. ✅ **Grain + fog overlay** — **DONE 2026-07-30.** `src/components/Atmosphere.tsx`,
   mounted in `index.tsx`. Best effort-to-impact ratio by a wide margin.
2. **Add the sodium and cold-blue tokens** to `styles.css`. Additive only,
   nothing breaks.
3. **Rebalance the red budget.** Mechanical find-and-replace of non-CTA reds to
   sodium/oxblood. Highest-impact palette fix.
4. **De-round and de-glass the cards.** Squared corners, opaque surfaces, single
   lit edge.
5. **Fix the typography scale.** Tighten tracking on large display type; keep it
   wide on small labels only.
6. **Add Deco geometry.** Vertical ribs, section rules, corner brackets.
7. **Bat-signal beam** as a hero or contact feature.
8. **Rain**, if wanted, last — pure polish and the easiest to cut.

Steps 1–3 alone would close most of the gap between the current site and the
intended theme.
