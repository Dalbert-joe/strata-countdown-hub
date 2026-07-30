# STRATA '26 — Decisions & Landmines

Why things are built the way they are, and the bugs that already cost us time.
Read this before refactoring anything — most entries exist because something
broke once already.

Last Updated: 2026-07-30

---

## Architecture decisions

### Single scrolling page instead of multiple routes

**Decided:** 2026-07-29 (Jabin's explicit request)

The site was originally a multi-page Lovable scaffold with separate `/` and
`/events` routes. It is now one page with Home / Events / Contact as hash-anchored
sections.

**Why:** A symposium site has one job — get a student to read the events and hit
register. Every route change is a chance to lose them. Everything now lives one
scroll away.

**Consequence:** `/events` is kept as a **redirect only** (`src/routes/events.tsx`
throws `redirect({ to: "/", hash: "events" })`) so links already shared out —
posters, Instagram bios, WhatsApp forwards — don't 404.

### Content centralized in `src/data/`

Components are presentational; all facts live in `src/data/site.ts` and
`src/data/events.ts`.

**Why:** Non-developers (or Jabin at 2am before the fest) need to change a phone
number without reading JSX. And `REGISTER_URL` being one constant means the
Google Form link gets pasted **once** to activate five buttons.

### Empty string means "render nothing"

Every optional field in `SITE` is conditionally rendered. Empty string → the UI
element doesn't exist at all.

**Why:** This is a public site for a real college event. A visible
`[Venue TBD]` placeholder is worse than no venue line. Unconfirmed information
should be invisible, not fake.

### Modals instead of per-event routes

Event details open in a shadcn `Dialog`, not at `/events/$slug`.

**Why:** Fits the single-page decision — you never leave the page.

**Escape hatch:** every event already has a unique URL-safe `slug`. Adding real
routes later needs **zero data changes**, only new route files.

---

## Landmines — bugs that already happened

Each of these was a real debugging session. Don't re-introduce them.

### 1. `offsetTop` returns 0 for the lower sections

**Symptom:** Nav active-section indicator was permanently stuck on "Home."

**Cause:** `SiteNav` originally measured section positions with `offsetTop`.
`offsetTop` is measured **from the nearest positioned ancestor**, not the
document. The events and contact sections live inside a `relative` wrapper in
`index.tsx` (it holds the shared backdrop), so both reported `offsetTop: 0`.

**Fix:** Use `getBoundingClientRect().top`, which is always viewport-relative
regardless of DOM ancestry.

```js
// ✅ correct — in SiteNav.tsx
if (el && el.getBoundingClientRect().top <= line) current = id;
```

**Do not** "optimize" this back to `offsetTop`.

### 2. TanStack's route splitter does not hoist module-scope constants

**Symptom:** `ReferenceError: SITE_DESCRIPTION is not defined` at runtime, only
in the built/split output.

**Cause:** The TanStack route-splitter plugin extracts `head()` and `component`
into separate chunks. It **hoists `import` statements** into those chunks but
**not `const` declarations** from the same file. So a module-scope const
referenced inside `head()` is undefined in the split chunk.

**Fix:** Meta description strings are **inlined verbatim** in every field in
`__root.tsx` and `index.tsx`. The duplication is deliberate.

```js
// ❌ breaks at runtime
const DESC = "...";
head: () => ({ meta: [{ name: "description", content: DESC }] });

// ✅ works
head: () => ({ meta: [{ name: "description", content: "..." }] });
```

Importing from another module _does_ work — that's why
`import { SITE } from "../data/site"` is fine inside components. The restriction
is specifically module-scope consts inside a split route file's `head()`.

### 3. `as const` on `SITE` made `!== ""` a type error

**Symptom:** TypeScript flagged `SITE.department !== ""` as an impossible
comparison.

**Cause:** `as const` narrows every field to a **literal type**. `SITE.date` was
typed as the literal `""`, so comparing it to `""` is provably always false and TS
rejects it.

**Fix:** `src/data/site.ts` declares an explicit `SiteConfig` type with plain
`string` fields instead of using `as const`. The empty-string-means-hidden pattern
depends on this.

### 4. `:root` must hold the dark values

**Symptom:** The 404 page and error boundary rendered as a **white page** on an
otherwise all-black site.

**Cause:** shadcn's default `:root` holds _light_ theme values; dark values live
under `.dark`. The 404 and error components use `bg-background` /
`text-foreground`, and were rendering outside the dark class context.

**Fix:** `src/styles.css` defines `:root` with the **dark** values directly, and
keeps `.dark` in sync so the class is harmless wherever it appears.
`<html className="dark">` is also set explicitly in `__root.tsx` for shadcn
variant selectors.

The site is dark-only. There is no light mode and no plan for one.

### 5. Imports placed after the route export

**Symptom:** `posterAsset is not defined`.

**Cause:** An asset `import` was written below `export const Route = ...`.

**Fix:** All imports at the top of the file. Obvious, but the split-chunk
transform makes the failure mode confusing rather than a clean lint error.

### 6. Vite HMR serves stale module graphs after big refactors

**Symptom:** `item.toLowerCase is not a function` after changing the nav
`SECTIONS` array from `string[]` to `{ id, label }[]`. Also "module not found"
for components that definitely exist, and phantom `<<<<<<< HEAD` parse errors
after a git operation.

**Cause:** Vite's HMR held the old module. Git operations that rewrite files
underneath a running dev server are especially prone to this.

**Fix:** **Full dev server restart.** Not a page reload — stop and restart the
process. If a Vite error mentions conflict markers or a missing file you can see
on disk, restart before debugging anything else.

### 7. Mobile must never request the hero video

**Decision, not a bug** — but easy to accidentally undo.

`HeroSection` initializes `isDesktop = false` and only mounts `<video>` after a
`matchMedia("(min-width: 768px)")` check passes in an effect.

**Why the default matters:** if it defaulted to `true`, a real mobile visitor
would fire the 2.1 MB video request during the first render pass before the
effect corrected it. Starting from "no video" means the safe state is the default
and desktop opts _in_.

Do not "simplify" this to a CSS `hidden md:block` — that still downloads the file.

### 8. Controlled Dialog loses focus return

`EventsSection` uses a fully controlled `Dialog` with no `DialogTrigger`, because
the trigger is the whole card and there are six of them.

Radix normally returns focus to its trigger on close. With no trigger it can't,
so the card element is tracked in `triggerRef` and refocused manually via
`onCloseAutoFocus`. Removing that breaks keyboard navigation.

---

## Deliberate non-obvious choices

| Choice                                                     | Reason                                                                                                                                                                                                                                  |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card burst uses raw DOM + Web Animations API, not React    | Fire-and-forget visual with no lasting state. React would cost a render per shape per frame. Also self-cleans via `onfinish` **and** a `setTimeout` fallback, because `onfinish` doesn't fire if the tab is backgrounded mid-animation. |
| Modal opens 250ms _after_ the burst starts                 | The two overlap so they read as one gesture instead of two sequential animations.                                                                                                                                                       |
| Spotlight writes only `transform` per frame                | The blurred gradient is static, so the browser rasterizes it once and re-transforms a cached bitmap. Animating the gradient itself would re-rasterize a 14px blur every frame.                                                          |
| Countdown starts at `undefined`, not a computed value      | SSR-safe. Server and client first paint render the identical placeholder; real numbers are only computed client-side in the effect. Baking `Date.now()` into render output would cause a hydration mismatch.                            |
| Countdown clears its interval on `visibilitychange`        | No point ticking a hidden tab.                                                                                                                                                                                                          |
| Hero background layers are `fixed`, not `absolute`         | They stay as the backdrop for the whole page rather than scrolling away with the hero section.                                                                                                                                          |
| Section backdrop in `index.tsx` is `absolute`, not `fixed` | So it does _not_ bleed through the hero video above it.                                                                                                                                                                                 |
| Event posters use fixed `aspect-[3/4]`                     | Source images have inconsistent dimensions; fixed ratio keeps all six cards identical.                                                                                                                                                  |
| First 3 posters `eager`, rest `lazy`                       | Row one is likely above the fold on desktop.                                                                                                                                                                                            |
| Anton loaded from Google Fonts CDN, not self-hosted        | Expedient. If offline resilience or performance matters later, self-host it.                                                                                                                                                            |

---

## Ecosystem constraints

### Lovable git sync

This project originated in Lovable and is still connected (`AGENTS.md`,
`.lovable/project.json`).

**Never force-push, rebase, amend, or squash already-pushed commits.** It rewrites
history on Lovable's side and Jabin can lose project history. Add new commits.

### The remote can be ahead of you

Jabin pushes from multiple places — Lovable, other Claude sessions, other
machines. On 2026-07-30 a large overhaul commit landed on `origin/main` from
outside this session.

**Always `git fetch` and compare against `origin/main` before starting work.**

### Rebase conflict semantics (if a rebase is ever unavoidable)

During `git rebase`, the sides are **inverted** from what most people expect:

- `--theirs` = the commit being replayed (**your** new work)
- `--ours` = `HEAD` (the upstream baseline you're replaying onto)

Getting this backwards silently discards your own changes.

### Vite plugin duplication

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which already bundles
the TanStack Start plugin, nitro, `@tailwindcss/vite`, tsconfig-paths, and
devtools. Adding any of them manually breaks the build.

---

## Reversible vs. hard to reverse

Useful when deciding how much to deliberate.

**Cheap to change:** colors and tokens, copy, card layout, animation timings,
which events are featured, adding sections.

**Expensive to change:** the single-page decision (nav, anchors, and backdrop
layering all assume it), the `src/data/` centralization pattern (every component
reads from it), dark-only theming (no light values exist anywhere), TanStack Start
itself (routing, SSR, and the Lovable config are all coupled to it).
