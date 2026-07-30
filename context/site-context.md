# STRATA '26 Website — Architecture & Status

Technical context. Read `README.md` first for orientation and ground rules.
Last Updated: 2026-07-30

---

## The event itself

|                      |                                                                    |
| -------------------- | ------------------------------------------------------------------ |
| Name                 | STRATA '26                                                         |
| Tagline              | Artificial Intelligence & Data Science Symposium                   |
| Date                 | **8 August 2026**, 09:00 IST                                       |
| Venue                | Loyola ICAM College of Engineering and Technology (LICET), Chennai |
| Department           | Department of Artificial Intelligence & Data Science               |
| Entry fee            | **Free** — all events, no registration fee                         |
| Events               | 6 (see `events.md`)                                                |
| Registration         | One Google Form for all six events — **URL not yet supplied**      |
| Overall coordinators | Thana Kishore (+91 93425 03004), Dalbert Joe (+91 95666 87085)     |
| Theme                | Batman / Gotham (see `design-system.md`)                           |

All of the above is encoded in **`src/data/site.ts`** — that file is the single
source of truth for site-wide facts, and every component reads from it.

---

## Stack

| Layer           | Choice                                       | Notes                                                                  |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| Framework       | **TanStack Start**                           | File-based routing, SSR                                                |
| UI              | **React 19**                                 |                                                                        |
| Build           | **Vite 8**                                   | Config is thin on purpose — see below                                  |
| Styling         | **Tailwind CSS v4**                          | `@theme inline` tokens in `src/styles.css`, `oklch` colors             |
| Components      | **shadcn/ui**                                | Full 47-component set under `src/components/ui/`                       |
| Icons           | **lucide-react**                             |                                                                        |
| Fonts           | **Anton** via Google Fonts                   | Preconnect + stylesheet in `__root.tsx`; used for countdown digits     |
| Data fetching   | **TanStack Query**                           | Provider wired in `__root.tsx`; nothing uses it yet                    |
| Toasts          | **sonner**                                   | `<Toaster theme="dark" />` mounted in `index.tsx`; nothing uses it yet |
| Origin          | Scaffolded in [Lovable](https://lovable.dev) | `.lovable/project.json`, git-synced                                    |
| Package manager | **npm**                                      | A `bun.lock` also exists from the Lovable scaffold                     |

### Vite config warning

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which **already
includes** the TanStack Start plugin, nitro, `@tailwindcss/vite`, tsconfig-paths,
and the devtools. **Do not add any of those manually** — duplicate registration
breaks the build.

---

## Architecture — ONE SCROLLING PAGE

This is the most important structural fact. The site is **not** multi-page.
Home / Events / Contact are **sections on `/`**, reached by hash anchors with
CSS smooth scrolling.

### Routes

| File                    | Role                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/routes/__root.tsx` | App shell. `<html>`/`<body>`, all `<meta>`, font links, QueryClientProvider, 404 + error components, `<Outlet />` |
| `src/routes/index.tsx`  | `/` — composes the three sections and the shared backdrop                                                         |
| `src/routes/events.tsx` | **Redirect only:** `/events` → `/#events`                                                                         |
| `src/routeTree.gen.ts`  | **Auto-generated. Never edit.**                                                                                   |
| `src/router.tsx`        | Router instance + QueryClient                                                                                     |

`/events` exists purely as a redirect so links already shared out — posters,
Instagram bios, WhatsApp forwards — don't 404.

### Components

| File                          | Section    | Role                                                                                                                                                                                                                      |
| ----------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SiteNav.tsx`                 | fixed      | Nav bar. Transparent over hero, blurred bar past 80px. Active-section underline. Mobile hamburger → full-screen overlay. Register CTA.                                                                                    |
| `HeroSection.tsx`             | `#home`    | Full-viewport. Background video (desktop) / poster image (mobile), vignette layers, logo with interactive searchlight, countdown, scroll cue.                                                                             |
| `CountdownTimer.tsx`          | in hero    | Live D/H/M/S countdown to `SITE.dateISO`. SSR-safe. Pauses when tab hidden.                                                                                                                                               |
| `EventsSection.tsx`           | `#events`  | 3-across grid of six event cards + the detail `Dialog`. Whole card is the click target.                                                                                                                                   |
| `CardBurst.ts`                | in events  | Fire-and-forget particle burst (bat / joker / card / question-mark silhouettes) on card open. Plain DOM + Web Animations API, deliberately outside React.                                                                 |
| `PhoneNumber.tsx`             | shared     | Click-to-copy phone number; `tel:` link on touch devices.                                                                                                                                                                 |
| `ContactSection.tsx`          | `#contact` | Identity, when/where, overall coordinators, location card with Maps link, final register CTA, footer bar. Doubles as the footer.                                                                                          |
| `hooks/use-hero-spotlight.ts` | in hero    | Desktop-only searchlight. Writes only `transform` per frame so the static blur is rasterized once.                                                                                                                        |
| `Atmosphere.tsx`              | whole page | Film grain + cool night haze + low fog. Fixed at `z-60` so it lays over the nav and every section — grain belongs to the frame, not to elements. `pointer-events-none`. Static, so nothing to disable for reduced-motion. |

### Adding a new section

1. Create the component with an `id` and `scroll-mt-24` (offsets the fixed nav so
   the heading isn't covered on anchor jump).
2. Render it inside `index.tsx`.
3. Add `{ id, label }` to the `SECTIONS` array in `SiteNav.tsx` — the nav links,
   the mobile menu, and active tracking all derive from that one array.

---

## Data flow

Content is centralized so components stay purely presentational.

```
src/data/site.ts    ──►  SiteNav, HeroSection, CountdownTimer,
                         EventsSection, ContactSection
src/data/events.ts  ──►  EventsSection   (imports PLACEHOLDER_PHONE from site.ts)
```

### `src/data/site.ts` exports

| Export              | Purpose                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE`              | Typed `SiteConfig` object — name, tagline, date, `dateISO`, venue, department, college, fee, contact, socials                                             |
| `REGISTER_URL`      | **The single switch for every register button on the site.** Currently `"#"`. Paste the Google Form URL here and all five register CTAs activate at once. |
| `PLACEHOLDER_PHONE` | `"00000 00000"` — used by every per-event coordinator so all can be swapped in one pass                                                                   |

**Empty-string convention:** every field is rendered conditionally. An empty
string renders _nothing_ rather than a visible placeholder. This is intentional —
fill values in as they're confirmed and the corresponding UI appears on its own.
`SiteConfig` is typed with plain `string` fields (not `as const`) specifically so
`!== ""` comparisons compile; see `decisions.md`.

### `src/data/events.ts`

Exports `StrataEvent` type and `EVENTS` array of six. Each event carries:
`slug`, `title`, `tag`, `category`, `participation`, `poster`, `summary`,
`description[]`, `highlights[]`, `coordinators[]`.

`slug` is already unique and URL-safe, so migrating from the current modal to
real `/events/$slug` routes would need **no data changes**.

---

## Assets

Images live **loose in `src/` root** (not `src/assets/`) — a Lovable scaffold
artifact. Imported directly by Vite, so they get hashed and bundled correctly.

| File                                   | Used for                                                                          | Size note                           |
| -------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------- |
| `strata26Logo.png`                     | Logo, nav + hero, spotlight mask                                                  | 487 KB                              |
| `herobg.mp4`                           | Hero background video (desktop only)                                              | **2.1 MB** (compressed from 5.5 MB) |
| `Events.jpg`                           | Hero video poster (and the mobile hero still, since mobile never loads the video) |                                     |
| `Paperpresentation.jpg`                | WayneTech Research Summit                                                         |                                     |
| `WhySoSerious.jpg`                     | Why So Serious?                                                                   |                                     |
| `RougeAI.jpg`                          | Rogue AI (filename keeps the old typo)                                            |                                     |
| `OperationKnightfall.jpg`              | **Stand-in** for The Gotham Times                                                 |                                     |
| `BatmanRobin.jpg`                      | Batman & Robin                                                                    |                                     |
| `Riddler.jpg`                          | Riddler's Escape                                                                  |                                     |
| `ArkhamEscape.jpg`                     | **Unused** — event removed                                                        |                                     |
| `LeagueOfShadows.jpg`                  | **Unused** — event removed                                                        | 964 KB dead weight                  |
| `BAT.jpg`, `bgSite.jpeg`, `button.png` | **Unused** scaffold leftovers                                                     |                                     |
| `src/assets/*.asset.json`              | **Orphaned** Lovable metadata stubs pointing at filenames that no longer exist    |                                     |

Event posters are official Warner Bros. / DC promotional art, not original
artwork. Standard practice for college fests, but it is licensed material — worth
Jabin knowing before anything goes wide.

---

## Performance choices already made

- **Mobile never loads the video.** `HeroSection` starts from `isDesktop = false`
  and only mounts `<video>` after a `matchMedia` check passes, so a real mobile
  visitor never fires the 2.1 MB request — not even for one frame.
- `preload="metadata"` + `poster` so the video doesn't block first paint.
- Event posters: first three `loading="eager"`, rest `lazy`.
- Countdown `setInterval` is cleared on `visibilitychange` when the tab hides.
- Spotlight writes only `transform` per frame; the blurred gradient is static so
  the browser rasterizes it once and re-transforms a cached bitmap.
- Nav scroll handler is `requestAnimationFrame`-throttled and `passive`.
- Card burst animates detached DOM nodes via the Web Animations API instead of
  React state — no render per shape per frame.

---

## Accessibility choices already made

- `prefers-reduced-motion: reduce` block in `styles.css` neutralizes animations
  and smooth scroll site-wide; `EventsSection` also skips the burst entirely.
- Event cards are `role="button"` with `tabIndex={0}` and Enter/Space handlers.
- Dialog is fully controlled (no `DialogTrigger`), so focus return is handled
  manually via `triggerRef` + `onCloseAutoFocus`.
- Mobile menu locks body scroll and closes on Escape.
- `aria-current` on the active nav link, `aria-hidden` on every decorative layer,
  `sr-only` `<h1>` in the hero (the visible wordmark is an image).
- Focus-visible rings on cards, register buttons, and the menu toggle.

---

## Current status — 2026-07-30

### Done

- Single scrolling page (Home / Events / Contact) with hash-anchor nav
- Fixed nav: transparent → blurred, active-section underline, mobile overlay menu
- Hero: video/poster background, vignette stack, interactive logo searchlight
- Live countdown to 8 Aug 2026 09:00 IST, SSR-safe, tab-aware
- All six real events with full verbatim rules in detail modals
- Whole-card click affordance + themed particle burst
- Per-event and overall coordinators with click-to-copy phone numbers
- Contact section with Google Maps deep link, doubles as footer
- Dark-only theme tokens, smooth scroll, reduced-motion support
- Hero video compressed 5.5 MB → 2.1 MB
- Git repo initialized and pushed to <https://github.com/strata2k25/strata-countdown-hub>

### Blocking launch

- **`REGISTER_URL` is `"#"`** — the Google Form link has not been supplied. Five
  register buttons currently go nowhere.
- **Per-event coordinator phone numbers are all `PLACEHOLDER_PHONE`** — the site
  publicly displays `00000 00000` six times over.
- **Riddler's Escape has no coordinators** (`coordinators: []` → renders "To be
  announced").
- No favicon.
- No `og:image` — the original Lovable R2 URL was removed as it would 404 after
  deployment. Link previews currently have no image.
- Not deployed anywhere.

### Known debt

- Unused assets still in the repo: `ArkhamEscape.jpg`, `LeagueOfShadows.jpg`
  (964 KB), `BAT.jpg`, `bgSite.jpeg`, `button.png`.
- Orphaned `src/assets/*.asset.json` metadata stubs.
- Images loose in `src/` root instead of `src/assets/`.
- The Gotham Times uses `OperationKnightfall.jpg` as a poster stand-in.
- Event posters are licensed WB/DC material.
- `logoAsset` is a 487 KB PNG used at `h-8` in the nav — wildly oversized for
  that usage.
- TanStack Query and sonner are both wired up but unused.
- No tests, no CI.

### Open questions for Jabin

1. **WayneTech Research Summit** — source text says _"Each team will be allotted
   5 minutes"_ but the category is Individual. Site currently says "Each
   participant." Which is correct?
2. **Deployment target** — Vercel, Lovable hosting, or college hosting? Affects
   whether the repo can be restructured freely or must stay Lovable-compatible.
3. **Per-event detail links** — modals work well for the single-page design, but
   if shareable per-event URLs are wanted for Instagram bios, the `slug` data is
   already in place to add routes alongside the modals.
