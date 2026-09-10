# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A standalone static website that markets **TechCart** (a separate e-commerce
monorepo at <https://github.com/Pravin671231/TechCart>) and doubles as a guide to
the engineering process behind it. One long page today; being reshaped into an
app-shell under milestone M2 (see `docs/milestone.md`). Astro + Tailwind v4 +
TypeScript, static output, deployed on Vercel. No backend, no database, no
runtime data — every fact is baked in at build time.

## Commands

```bash
npm run dev            # astro dev — localhost:4321
npm run build          # astro build — static dist/
npm run check          # astro check — type-check .astro + .ts (CI gate)
npm run lint           # eslint . (CI gate)
npm run format         # prettier --write .
npm run format:check   # prettier --check . (CI runs `npx prettier --check .`)
npm run check:a11y     # axe-core (wcag2a/2aa/best-practice) on dist/index.html — run AFTER build
npm run gen:og         # regenerate public/og.png — only when the wordmark/tagline changes
```

No test runner. Verification is `check` + `lint` + `format:check` + `check:a11y`,
plus a manual browser pass (keyboard-only, JS-disabled, 320–1920 px no horizontal
scroll, theme toggle survives reload). CI (`.github/workflows/ci.yml`, on PR to
`main`) runs prettier → lint → check → build in one `verify` job.

## Architecture

**Spec-driven workflow.** Changes follow
`Feature → Update SRS → Add to Milestone → Add to Issue → Implement Code`. `docs/`
is the contract, not notes:
- `docs/srs/SRS.md` — master SRS; **Appendix A** is the canonical list of TechCart
  facts the page may state.
- `docs/srs/features/LP-00N-*.md` — per-feature spec: `FR-LP-NNN` requirements
  with acceptance notes + content outlines, `NFR-LP-NNN`, acceptance criteria.
- `docs/milestone.md` / `docs/issues.md` — milestone roadmap and full issue
  drafts (M#.x IDs → GitHub issue numbers). Update these alongside code.
- `docs/architecture.md` — build/deploy rationale.

**Single-source data modules (`src/data/`).** Components never hardcode content:
- `toc.ts` — ordered `[{ id, title }]`; the only source for the section nav, the
  mobile nav, scroll-spy, and section anchor ids. Section ids here must match the
  `<section id>` in `src/pages/index.astro`.
- `techcart.ts` — every TechCart claim (stack, milestones, features, data model),
  **each value carrying a comment citing its `SRS.md` Appendix A source**. Add new
  facts to Appendix A first, then here.
- `guide.ts` — copy/snippets for the engineering-guide sections.

**Design tokens & theming.** `src/styles/global.css` defines CSS custom properties
(`--bg`, `--fg`, `--accent`, …): light values on `:root`, dark values under both
`@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` and
`:root[data-theme='dark']`. `@theme inline` re-exposes them as Tailwind utilities
(`bg-page`, `text-fg`, `border-border`) that still track the runtime theme. Use
those utilities — don't reach for raw Tailwind color classes. A pre-paint inline
script in `src/layouts/BaseLayout.astro` applies a stored `localStorage` theme
before first paint; the toggle button + its logic live in `src/components/Nav.astro`.
Tailwind v4 is wired via `@tailwindcss/vite` in `astro.config.mjs` with CSS-first
config (`@import 'tailwindcss'` in `global.css`) — there is no `tailwind.config`.

**Interactivity budget (`src/scripts/`).** Near-zero client JS, all progressive
enhancement — the page must be fully usable with JavaScript disabled and by
keyboard alone:
- `scrollspy.ts` — `IntersectionObserver` marks the active `[data-toc-link]` and
  reveals `.section-enter` sections; no-JS fallback is a plain anchor list.
- theme toggle (in `Nav.astro`) and the delegated copy-button handler (in
  `CodeBlock.astro`) are the only other scripts.
`prefers-reduced-motion` must disable all non-essential animation.

**Page assembly.** `src/pages/index.astro` imports `BaseLayout` and composes every
section in `toc.ts` order. `BaseLayout.astro` owns `<head>` (meta/OG/Twitter,
canonical, sitemap, favicons, theme-color) and the skip link. `@astrojs/sitemap`
generates `sitemap-index.xml`; `astro.config.mjs` `site` is a placeholder Vercel
URL until the project is connected.

## Conventions

- **Branches:** `feature/<issue-number>-<scope>` off `main`; **squash-merge only**;
  `main` is protected (required CI, linear history, no direct pushes).
- **Commits:** Conventional Commits — `type(scope): message (Issue #N)`.
- **Before opening any PR:** run and confirm `npm run lint`, `npm run format:check`,
  and `npm run build` locally pass. Do not open a PR with any of them failing.
- **After any PR merges to `main`:** cut a new branch and update the related
  documentation (`docs/srs/*`, `docs/milestone.md`, `docs/issues.md`) and this
  file's status sections (**In flight** here, plus any command/architecture note
  the merge changed), then open that as its own follow-up PR.
- **No AI attribution:** commits carry **no** `Co-Authored-By` trailer; PRs carry
  **no** "Generated with Claude Code" line. (Older text in `docs/architecture.md`
  §5 and `docs/srs/SRS.md` §6 still says the opposite — that is superseded;
  `docs/milestone.md` is current.)
- **Markdown under `docs/` and `README.md` is hand-authored and Prettier-ignored**
  (`.prettierignore` excludes `**/*.md`) — keep tables and wrapping tidy by hand.
- **`prettier-plugin-astro` bug:** it glues adjacent words when it wraps an inline
  `<code>` / `<strong>` onto a new line. Keep identifiers as plain text in prose;
  reserve inline `<code>` for standalone tokens.
- Node is pinned to `24` via `.nvmrc` / `.node-version`; CI reads `.nvmrc`.
- Use the `discuss-plan-build` skill for any non-trivial change.
- Accessibility bar is **WCAG 2.1 AA**; no horizontal page scroll 320–1920 px
  (wide tables/code blocks scroll inside their own `overflow-x-auto` container).

## In flight — M2 Redesign

`docs/milestone.md` + `docs/issues.md` (M2.1–M2.4) describe a redesign to an
app-shell: an `src/data/brand-kit.json` "Ocean Royale" palette becoming the single
source of truth for the design tokens, a `container-fluid` two-column grid with a
sticky full-height left sidenav, an 80dvh Overview with a Buyer/Admin toggle, and
a tabbed documentation area. The feature spec `LP-002` is not yet written.
