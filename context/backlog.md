# STRATA '26 — Open Work

Prioritized. Every item names the exact file to change.
Last Updated: 2026-07-30
Session note: A+B+C plan locked 2026-07-30. Resume at P2 §AGREED NEXT STEPS.

Event date: **8 August 2026** — roughly **9 days** out as of this file's date.

---

## P0 — Blocking launch

These make the site actively wrong or unusable if it went live today.

### ~~1. Registration form URL~~ ✅ DONE 2026-07-30

- **File:** `src/data/site.ts` → `REGISTER_URL`
- **Now:** live Google Form URL. All 9 register links on the page verified
  pointing at it (nav, per-event cards, modal, closing CTA).
- The closing "Register Now" button in `ContactSection.tsx` was also enlarged
  (`px-14 py-5 text-sm`, up from `px-10 py-4 text-[0.7rem]`) for visibility.

### 2. Per-event coordinator phone numbers

- **File:** `src/data/events.ts` → every `coordinators[].phone`
- **Current:** all six events use `PLACEHOLDER_PHONE` = `"00000 00000"`
- **Impact:** The live site publicly displays `00000 00000` as a contact number,
  with click-to-copy. Worse than showing nothing.
- **Action:** Either collect the ten real numbers, **or** temporarily drop the
  `phone` display for per-event coordinators and show names only. Names are real;
  numbers are not.

### 3. Riddler's Escape has no coordinators

- **File:** `src/data/events.ts` → `riddlers-escape` → `coordinators: []`
- **Current:** renders "To be announced" — handled gracefully, but it's the only
  event missing them.
- **Action:** get the two names.

### 4. Favicon

- **Files:** `public/` + `src/routes/__root.tsx` `links`
- **Current:** none. Browser tabs show the default blank document icon.
- **Action:** export the bat/STRATA mark at 32×32 and 180×180, add
  `icon` + `apple-touch-icon` link tags.

---

## P1 — Should land before sharing widely

### 5. Open Graph share image

- **File:** `src/routes/__root.tsx`
- **Current:** no `og:image`. The original Lovable R2 URL was removed because it
  would 404 after deployment.
- **Impact:** WhatsApp / Instagram / LinkedIn link previews render with no image.
  For a fest promoted primarily through social sharing, this is a real cost.
- **Action:** create a 1200×630 image, put it in `public/`, reference it with the
  **absolute deployed URL** (`og:image` does not accept relative paths reliably).
  Needs the deploy target decided first.

### 6. Deploy

- **Current:** nowhere. Runs on localhost only.
- **Decision needed:** Vercel / Lovable hosting / college hosting.
- **Blocks:** the `og:image` absolute URL, and any QR code on printed posters.
- **Note:** per the learn-by-doing rule — **ask Jabin before deploying for him.**
  He may want to do this himself.

### 7. The Gotham Times poster

- **File:** `src/data/events.ts` → `the-gotham-times.poster`
- **Current:** `OperationKnightfall.jpg` as a stand-in (Operation Knightfall was
  cut from the lineup).
- **Action:** a real poster. A newspaper front-page treatment would fit the event
  perfectly — see `design-system.md` §6.

### 8. Resolve the WayneTech participation contradiction

- **Files:** `context/events.md`, `src/data/events.ts`
- **Issue:** source text says _"Each **team** will be allotted 5 minutes"_ but the
  category is **Individual**. Site currently says "Each participant."
- **Action:** confirm with the department. Affects both the copy and the
  `participation` badge.

---

## P2 — Theme work

The full brief is in `design-system.md` §8. Summarized here with effort estimates.

### ▶ AGREED NEXT STEPS (decided 2026-07-30)

Items 10 + 11 + 12 in sequence — labelled **A**, **B**, **C** below.
These three together are the biggest visible jump toward real Gotham.
Start the next session here; do them in order.

**A — Add sodium + cold-blue tokens** (`styles.css`)
- Purely additive. No existing token changes, nothing can break.
- Unlocks items B and C which reference the new color names.
- File: `src/styles.css` — add the token block from `design-system.md §4`.

**B — Rebalance the red budget** (after A)
- Red currently appears in ~30 places. Target: 3–5 (Register CTAs + countdown only).
- Non-CTA reds become `--sodium-glow` (decorative light) or `--blood-oxblood` (structural).
- Files to search: `SiteNav.tsx`, `HeroSection.tsx`, `EventsSection.tsx`, `ContactSection.tsx`, `styles.css`.
- What stays red: the nav Register button, the hero/contact Register CTAs, the countdown timer.
- What changes: event category badges, eyebrow labels, section dividers, glow effects, borders.

**C — De-round + de-glass the event cards** (after B)
- Today: `rounded-xl`, translucent (`bg-white/[0.03]`), `backdrop-blur-sm`, red hover glow.
- Target: `rounded-none`, opaque (`bg-[--gotham-asphalt]`), thin `--gotham-concrete` border,
  single warm lit edge (top or left) in `--sodium-deep` that intensifies on hover.
- File: `src/components/EventsSection.tsx` (card styles and dialog styles).

| #     | Item                                                                                  | Effort | Impact            |
| ----- | ------------------------------------------------------------------------------------- | ------ | ----------------- |
| ~~9~~ | ~~**Grain + fog overlay**~~ — ✅ **DONE** 2026-07-30, `src/components/Atmosphere.tsx` | S      | **Very high**     |
| **A** | **Add sodium/cold-blue tokens** to `styles.css` — purely additive                     | S      | High (enables B)  |
| **B** | **Rebalance the red budget** — non-CTA reds → sodium/oxblood                          | M      | **Very high**     |
| **C** | **De-round + de-glass cards** — squared, opaque, single lit edge                      | M      | High              |
| 13    | **Fix type scale** — tighten tracking on display, keep wide on labels                 | M      | Medium            |
| 14    | **Deco geometry** — vertical ribs, section rules, corner brackets                     | M      | Medium            |
| 15    | **Bat-signal beam** — hero or contact feature                                         | M      | Medium            |
| 16    | **Rain** — desktop only, reduced-motion aware                                         | S      | Low (pure polish) |

Items **A–C alone** close most of the gap between the current site and the
intended Gotham theme.

---

## P3 — Content gaps

Not blocking, but the site is thinner than it could be without them.

- [ ] **Duration / time slot per event** — students plan their day around this.
      Would need a new `StrataEvent` field.
- [x] **Venue / lab per event** — confirmed 2026-08-04, in each event's `venue` field
      (floor included: G-rooms Third Floor, B22 Second Floor).
- [x] **Prize details** — confirmed 2026-08-04, site-wide: cash prizes for top participants,
      participation certificates for everyone.
- [ ] **Social links** — `SITE.socials.instagram` / `.linkedin` are empty, so the
      footer social row doesn't render at all.
- [ ] **Contact email** — `SITE.contact.email` is empty.
- [x] **Registration fee** — confirmed free, in `SITE.fee`.
- [x] **Event date and venue** — confirmed, in `SITE.date` / `SITE.venue`.
- [x] **Overall coordinators** — Thana Kishore, Dalbert Joe, with real numbers.

---

## P4 — Cleanup / debt

None of this is visible to a visitor. Do it when there's slack.

- [ ] **Delete unused assets:** `ArkhamEscape.jpg`, `LeagueOfShadows.jpg`
      (964 KB), `BAT.jpg`, `bgSite.jpeg`, `button.png`. All are shipped-adjacent
      dead weight from removed events and the scaffold.
- [ ] **Delete orphaned `src/assets/*.asset.json`** — Lovable metadata stubs
      pointing at filenames that no longer exist.
- [ ] **Optimize `strata26Logo.png`** — 487 KB PNG rendered at `h-8` in the nav.
      Should be a fraction of that; consider SVG.
- [ ] **Move images from `src/` root into `src/assets/`** — cosmetic, but the root
      is cluttered. Touches every import.
- [ ] **Rename `RougeAI.jpg` → `RogueAI.jpg`** — the typo is fixed in copy but
      lives on in the filename.
- [ ] **Remove or use TanStack Query and sonner** — both wired up, neither used.
- [ ] **Consider self-hosting Anton** instead of the Google Fonts CDN.
- [ ] **Licensing note:** event posters are official Warner Bros. / DC promotional
      art. Standard for college fests, but Jabin should know it's licensed
      material before it goes wide.
- [ ] No tests, no CI. Probably fine for a one-off event site — noting it so the
      absence is a decision rather than an oversight.

---

## Not doing (decided)

| Item                               | Why not                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Light mode                         | Site is dark-only by design. No light token values exist anywhere.                                |
| Per-event routes (`/events/$slug`) | Modals fit the single-page design. `slug` is already in place if shareable links are ever needed. |
| Multi-page structure               | Explicitly reverted on 2026-07-29.                                                                |
| Custom registration backend        | A Google Form is the right tool for a free college event. No payments, no auth, no database.      |
