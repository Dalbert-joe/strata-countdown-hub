# STRATA '26 Website — Start Here

**If you are an AI assistant or a new collaborator opening this project for the first, read this file completely before touching any code.**

Last Updated: 2026-07-30

---

## The 30-second version

This is the public website for **STRATA '26**, the annual Artificial Intelligence &
Data Science department symposium at **Loyola ICAM College of Engineering and
Technology (LICET), Chennai**, happening **8 August 2026**.

It is a **Batman / Gotham themed single scrolling page** with three sections
(Home, Events, Contact) presenting **six competitive events**. Registration is one
Google Form shared across all six events.

Owner: **Jabin** — B.Tech AI & Data Science, 5th semester. He is the developer and
the decision-maker. He is an intermediate coder who is learning fast and wants the
_why_ behind changes, not just the _how_.

Live repo: <https://github.com/strata2k25/strata-countdown-hub> (branch `main`)

---

## Read these in order

| #   | File                        | What it gives you                                                                     |
| --- | --------------------------- | ------------------------------------------------------------------------------------- |
| 1   | **`README.md`** (this file) | Orientation, ground rules, how to run it                                              |
| 2   | **`site-context.md`**       | Stack, architecture, every file's job, current status                                 |
| 3   | **`design-system.md`**      | The Gotham design language — palette, type, motion, what "Batman" actually means here |
| 4   | **`events.md`**             | Source of truth for all six events' content                                           |
| 5   | **`decisions.md`**          | Why things are built the way they are + landmines that already bit us                 |
| 6   | **`backlog.md`**            | What is still open, prioritized, with exact file pointers                             |

If you only have time for two: **`site-context.md`** and **`decisions.md`**.
`decisions.md` will save you from re-breaking things that were already fixed once.

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

Serves on **<http://localhost:5173>**.

A Claude Code / preview launch config exists at `.claude/launch.json` under the
name **`strata`** — start it with the preview tooling rather than a raw shell
command so the browser tools can attach to it.

Other scripts (see `package.json`): `npm run build`, `npm run lint`,
`npx prettier --write <files>`.

---

## Ground rules

These are not stylistic preferences. Breaking them has already caused real bugs
or real rework in this project.

### Content integrity

1. **Never invent facts.** Event details, dates, prices, phone numbers,
   coordinator names, prize amounts — if it is not in `context/events.md` or
   `src/data/site.ts`, it does not exist. Leave the slot empty and ask Jabin.
   Empty strings in `site.ts` are designed to render _nothing_, which is always
   better than a plausible-looking lie on a public site.
2. **Keep `context/events.md` and `src/data/events.ts` in sync.** They mirror each
   other. Change one, change the other, in the same pass.
3. **Event descriptions are verbatim from the department.** Do not "improve" the
   wording of a rule. You may fix a genuine typo (e.g. Rouge → Rogue) and note it.

### Code

4. **`src/routeTree.gen.ts` is auto-generated. Never hand-edit it.**
5. **This is TanStack Start, not Next.js and not Remix.** Do not create
   `src/pages/`, `app/layout.tsx`, `getServerSideProps`, or `app/api/` routes.
   Routing is file-based under `src/routes/`.
6. **Do not add Vite plugins for tailwind, tsconfig paths, nitro, or TanStack
   devtools.** `@lovable.dev/vite-tanstack-config` already bundles all of them.
   Adding them again causes duplicate-plugin failures.
7. **All colors must be `oklch`** in `src/styles.css` tokens. Tailwind v4 with
   `@theme inline`.
8. **The site is dark-only.** `:root` in `styles.css` holds the _dark_ values on
   purpose — see `decisions.md` for why removing that breaks the 404 page.
9. **Run Prettier before committing.** `.prettierrc` is checked in and CI-style
   lint will flag formatting.

### Git

10. **This project is connected to Lovable's git sync** (see `AGENTS.md`).
    **Do not force-push, rebase, amend, or squash commits that are already
    pushed** — it rewrites history on Lovable's side and Jabin can lose project
    history. Always add new commits instead.
11. Jabin sometimes pushes changes from other tools (Lovable, another Claude
    session). **`git fetch` and check `origin/main` before starting work** — the
    remote may be ahead of your local checkout.

### Working with Jabin

12. **Learn-by-doing rule.** Before doing foundational hands-on work _for_ him —
    running deploys, wiring up APIs, terminal work, hands-on debugging — **ask
    first**. He may want to do it himself to build durable understanding. Default
    to asking, not assuming.
13. **Plan before building.** He explicitly prefers a solid plan over an
    immediate half-build.
14. **Explain the why.** He is learning. A change with no rationale is a change he
    can't maintain after you're gone.

---

## What "Batman theme" means here

This matters enough to have its own file — read **`design-system.md`**.

The short version, because it is the single most common thing to get wrong:

> Gotham is **not** "everything dark grey with red accents."
> Gotham is **near-total darkness with scarce, hard, motivated light** — sodium
> streetlamps, searchlight beams, rain-slicked reflections. Contrast is the whole
> point. Red is an _alarm_, used sparingly, not the primary interface color.

The current implementation leans hard on `red-600` everywhere, which reads more
"generic dark tech startup" than Gotham. `design-system.md` covers the intended
direction and the concrete token changes to get there.

---

## Current one-line status

**Deployed nowhere yet.** Structurally complete and running locally: single-page
scroll, all six events with detail modals, live countdown to 8 Aug 2026, working
contact section. Blocking launch: the registration Google Form URL
(`REGISTER_URL` is still `"#"`), per-event coordinator phone numbers are all
placeholders, and there is no favicon or share image.

See `backlog.md` for the full prioritized list.
