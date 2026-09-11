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
- `docs/user-manuals/`, `docs/case-studies/`, `docs/features/` — reference
  material about **TechCart itself** (not this page), split Buyer App / Admin
  App. The manuals link out to TechCart's live, screenshot-rendered originals
  rather than duplicating them; the case studies and feature lists are composed
  here from TechCart's README/SRS/architecture docs. No landing-page rendering
  reads these yet.

**Single-source data modules (`src/data/`).** Components never hardcode content:
- `toc.ts` — exports `NAV`, the ordered `[{ id, title }]` app-shell nav (four
  items: overview/casestudy/user-manual/features) — the only source for
  `LeftSidenav` and `TopBar`'s menu drawer — and `TABS` (`NAV` minus
  `overview`), which drives `DocTabs.astro`'s tablist.
- `apps.ts` — Buyer/Admin copy (title, description, repo/demo URLs) for the
  Overview toggle, sourced from `WORKSPACES` (`techcart.ts`) + `consts.ts`.
- `techcart.ts` — every TechCart claim (stack, milestones, features, data model),
  **each value carrying a comment citing its `SRS.md` Appendix A source**. Add new
  facts to Appendix A first, then here.
- `guide.ts` — copy/snippets for the engineering-guide sections.

**Design tokens & theming.** `src/data/brand-kit.json` — the **Ocean Royale**
brand kit — is the single source of truth for every color; it is not read
directly by components. `src/data/brand-kit.ts`'s `tokenCss()` derives the
`--bg`, `--fg`, `--accent`, … CSS custom properties from it (light values on
`:root`, dark values under both `@media (prefers-color-scheme: dark) :root:not([data-theme='light'])`
and `:root[data-theme='dark']`), and `<BrandTokens />` (rendered from
`BaseLayout.astro`) is the only place that CSS actually lands on the page.
`src/styles/global.css`'s `@theme inline` re-exposes those custom properties as
Tailwind utilities (`bg-page`, `text-fg`, `border-border`, plus `font-sans` for
the self-hosted Inter variable font) that still track the runtime theme. Use
those utilities — don't reach for raw Tailwind color classes, and don't add a
color literal anywhere outside `brand-kit.json`. A pre-paint inline script in
`src/layouts/BaseLayout.astro` applies a stored `localStorage` theme before
first paint; the toggle button markup + its `<style>` live in
`src/components/ThemeToggle.astro` (rendered once each from `LeftSidenav` and
`TopBar`), and its logic in `src/scripts/theme.ts` rebinds every
`.theme-toggle` instance.
Tailwind v4 is wired via `@tailwindcss/vite` in `astro.config.mjs` with CSS-first
config (`@import 'tailwindcss'` in `global.css`) — there is no `tailwind.config`.

**Interactivity budget (`src/scripts/`).** Near-zero client JS, all progressive
enhancement — the page must be fully usable with JavaScript disabled and by
keyboard alone:
- `scrollspy.ts` — `IntersectionObserver` marks the active `[data-toc-link]` for
  `#overview`; it skips `#documentation` and clears the highlight when nothing
  is in the band, handing that entry off to `tabs.ts`. Also reveals
  `.section-enter` sections; no-JS fallback is a plain anchor list.
- `tabs.ts` — click / `ArrowLeft`-`ArrowRight`-`Home`-`End` activation for
  `DocTabs.astro`'s tablist; syncs `location.hash` and mirrors the active tab
  onto `[data-toc-link]`. All three panels render visible in markup — `tabs.ts`
  is what hides the inactive two, so a no-JS reader gets every panel stacked.
- `theme.ts` (theme toggle) and `app-toggle.ts` (Overview's Buyer/Admin toggle)
  are the remaining scripts, plus the delegated copy-button handler (in
  `CodeBlock.astro`).
`prefers-reduced-motion` must disable all non-essential animation.

**Page assembly.** `src/pages/index.astro` imports `BaseLayout` and renders the
app-shell grid: `LeftSidenav` (sticky, `lg`+) + a main column with `TopBar`
(`lg:hidden` menu drawer), `Overview`, then `DocTabs` — the Case Study / User
Manual / Features tablist, each `<slot>` holding the M1 content in `Section`
wrappers (panel ids are the bare `casestudy`/`user-manual`/`features` slugs so
`LeftSidenav`/`TopBar` links resolve natively; tab-button ids get a `tab-`
prefix). `BaseLayout.astro` owns `<head>` (meta/OG/Twitter, canonical, sitemap,
favicons, theme-color) and the skip link. `@astrojs/sitemap` generates
`sitemap-index.xml`; `astro.config.mjs` `site` is a placeholder Vercel URL
until the project is connected.

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
- **Skills** (vendored in `.claude/skills/`, shared verbatim with the TechCart repo):
  use `discuss-plan-build` for any non-trivial change; `auto-commit-push` to
  stage, commit, and push the working tree; `auto-pr-merge` to open the PR, wait
  for CI, squash-merge, and clean up.
- Accessibility bar is **WCAG 2.1 AA**; no horizontal page scroll 320–1920 px
  (wide tables/code blocks scroll inside their own `overflow-x-auto` container).

## In flight — M2 Redesign

`docs/milestone.md` + `docs/issues.md` (M2.1–M2.4) describe a redesign to an
app-shell. **M2.1 (Ocean Royale brand kit, #16), M2.2 (app-shell layout +
Overview, #17), and M2.3 (documentation tabs, #18) are merged** — see the
Design tokens & theming, Interactivity budget, and Page assembly sections
above. `#casestudy`/`#user-manual`/`#features` all resolve now. Remaining:
**M2.4 (#19)** — reframe the Case Study panel with a problem → approach →
outcome lede (`CaseStudy.astro`) and split `Footer`'s "Get Started" content
into the User Manual panel — after which `v2.0.0` is tagged. The feature spec
`LP-002` is still not written.
