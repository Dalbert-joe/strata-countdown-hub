# STRATA '26 Website — Project Context

Paste-ready context for any AI tool working on this site.
Last Updated: 2026-07-29

---

## What this is

The website for **STRATA '26**, the annual Artificial Intelligence & Data Science
department symposium. Batman / Gotham themed. Six competitive events.

Owner: Jabin (B.Tech AI & DS, 5th semester).

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | TanStack Start (file-based routing, SSR) |
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@theme inline` tokens in `src/styles.css`) |
| Components | shadcn/ui — full set installed under `src/components/ui/` |
| Origin | Scaffolded in [Lovable](https://lovable.dev), synced via `.lovable/project.json` |
| Package manager | npm (a `bun.lock` also exists from the Lovable scaffold) |

Run locally:

```
npm run dev
```

Serves on **http://localhost:5173**. A Claude Code launch config exists at
`.claude/launch.json` under the name `strata`.

---

## Structure — SINGLE PAGE

The site is **one scrolling page**, not multiple routes. Home / Events / Contact are
sections on `/`, reached by hash anchors and smooth scrolling.

| File | Role |
| --- | --- |
| `src/routes/__root.tsx` | app shell (wraps everything, holds `<Outlet />`) |
| `src/routes/index.tsx` | `/` — composes all three sections |
| `src/routes/events.tsx` | redirect only: `/events` → `/#events` |
| `src/components/SiteNav.tsx` | fixed nav, smooth-scroll anchors, active-section tracking |
| `src/components/HeroSection.tsx` | `#home` — video hero |
| `src/components/EventsSection.tsx` | `#events` — event grid + detail dialogs |
| `src/components/ContactSection.tsx` | `#contact` — contact block + footer |

`/events` is kept purely as a redirect so links already shared out (posters, Instagram
bios, WhatsApp forwards) don't 404.

**To add a new section:** create a component with an `id`, give it `scroll-mt-24` so the
fixed nav doesn't cover its heading, render it in `index.tsx`, and add it to the
`SECTIONS` array in `SiteNav.tsx`.

Active-section tracking measures with `getBoundingClientRect().top`, **not** `offsetTop` —
the lower sections sit inside a `relative` wrapper, so `offsetTop` would measure from that
wrapper and report 0 for every one of them.

TanStack Start file-based routing still applies to `src/routes/`. `src/routeTree.gen.ts`
is auto-generated — never hand-edit it. Do **not** create `src/pages/` or `app/layout.tsx`;
those are Next.js/Remix conventions and will not work here.

---

## Data flow

All site content is centralized so components stay presentational:

- `src/data/events.ts` — the six events (mirrors `context/events.md`)
- `src/data/site.ts` — symposium identity, date, contact slots, nav

Empty strings in `site.ts` render nothing, so unconfirmed details simply don't appear
rather than showing placeholders. Fill them in as information is confirmed.

---

## Design language

Dark-only. Black base, `red-600` accent, heavy uppercase letter-spacing, Gotham mood.

Theme tokens live in `src/styles.css`. `:root` is defined **dark** because the site has
no light mode — this is what keeps the 404 and error pages from rendering white on an
otherwise black site.

---

## Current status (2026-07-29)

**Done**
- Converted from multi-page to a **single scrolling page** (Home / Events / Contact)
- Fixed nav: transparent over the hero, blurred bar once scrolled, active-section underline
- Hero section with autoplaying background video, bat scroll-cue and scroll indicator
- Events section with all six real events and full detail dialogs
- Contact section with footer; `/events` kept as a redirect
- Dark theme tokens, smooth scrolling, reduced-motion support

**Confirmed open items**
- Event date **confirmed**: 8 August 2026, 09:00 IST — set in `SITE.date` / `SITE.dateISO`
- Venue **confirmed**: Loyola ICAM College of Engineering and Technology, Chennai — `SITE.venue`
- Registration is a single Google Form for all six events — `REGISTER_URL` in `src/data/site.ts` is the switch, still `"#"` pending the actual form link
- Overall coordinators (Dhana Kishore, Dalbert Joe) and per-event coordinators are in place
- No social links yet
- The Gotham Times has no poster of its own

**Known technical debt**
- `src/herobg.mp4` is **5.3 MB** and autoplays. Needs compression (ffmpeg is not
  installed on this machine) and a poster frame. This is the main mobile-performance risk.
- `LeagueOfShadows.jpg` is 964 KB, unoptimized, and now unused.
- Images live loose in `src/` root rather than `src/assets/`.
- `src/assets/*.asset.json` are orphaned Lovable metadata stubs pointing at files that
  no longer exist under those names.
- `og:image` in `__root.tsx` points at a Lovable preview R2 URL that will break once
  deployed elsewhere. No favicon.
- Event posters are official Warner Bros. / DC Batman promotional art, not original
  artwork. Standard practice for college fests, but it is licensed material.
- **The project is not a git repository.** No local version control or backup; history
  exists only in Lovable.

---

## Undecided — needs Jabin

1. **Event details presentation** — currently a modal dialog per event, which suits the
   single-page design. If shareable per-event links are ever needed (Instagram bios,
   posters), the data is already keyed by `slug`, so dedicated routes could be added
   alongside the dialogs without touching `src/data/events.ts`.
2. **Registration** — the Google Form itself isn't wired yet. `REGISTER_URL` in
   `src/data/site.ts` is the single switch: paste the form link and every register button
   site-wide activates.
3. **Deployment** — Lovable, Vercel, or college hosting. Affects whether the repo can be
   restructured freely or must stay Lovable-compatible.

---

## Working rules

- Keep `context/events.md` and `src/data/events.ts` in sync.
- Don't invent event details, dates, or contact information — leave the slot empty and
  ask instead.
- Avoid rewriting published git history if the project is later connected to Lovable's
  git sync.
