# Issue Drafts — TechCart Landing Page

Issue drafts for the landing-page milestones. Companion to
[`milestone.md`](milestone.md), [`srs/SRS.md`](srs/SRS.md), and the feature specs
under [`srs/features/`](srs/features/).

- **[M1 — Landing Page](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1)** —
  all six drafts (M1.1–M1.6) merged as issues
  [#1–#6](https://github.com/Pravin671231/TechCart-Landing-page/issues?q=is%3Aissue+milestone%3A%22M1+%E2%80%94+Landing+Page%22);
  spec [`LP-001`](srs/features/LP-001-landing-page.md).
- **[M2 — Redesign](https://github.com/Pravin671231/TechCart-Landing-page/milestone/2)** —
  drafts M2.1–M2.4 filed as issues
  [#16–#19](https://github.com/Pravin671231/TechCart-Landing-page/issues?q=is%3Aissue+milestone%3A%22M2+%E2%80%94+Redesign%22);
  spec `LP-002` (`srs/features/LP-002-redesign.md`, to be drafted).

The full drafts are kept here as the working checklist; GitHub carries the live
status once filed.

## Workflow

1. **Draft here** — full context, task checklist, and acceptance criteria.
2. **Open on GitHub** —
   `gh issue create --milestone "<milestone>" --title "<M#.x> — <title>" --body-file <draft>`.
3. **Work it** — branch `feature/<issue-number>-<scope>` off `main`; squash-merge
   the PR back; delete the branch.
4. **Track** — status moves here, in [`srs/SRS.md`](srs/SRS.md) §5, and in
   [`milestone.md`](milestone.md): Draft → Open (`#N`) → Complete.

Issue IDs are milestone-scoped (`M1.1` … `M2.4`), matching TechCart's `M2.13`
style; each maps to one GitHub issue number once filed.

| Draft  | GitHub issue |
| ------ | ------------ |
| M1.1   | [#1](https://github.com/Pravin671231/TechCart-Landing-page/issues/1) |
| M1.2   | [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) |
| M1.3   | [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3) |
| M1.4   | [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4) |
| M1.5   | [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5) |
| M1.6   | [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6) |
| M2.1   | [#16](https://github.com/Pravin671231/TechCart-Landing-page/issues/16) |
| M2.2   | [#17](https://github.com/Pravin671231/TechCart-Landing-page/issues/17) |
| M2.3   | [#18](https://github.com/Pravin671231/TechCart-Landing-page/issues/18) |
| M2.4   | [#19](https://github.com/Pravin671231/TechCart-Landing-page/issues/19) |

---

## M1.1 — Project scaffold & tooling

**Status:** Complete — [#1](https://github.com/Pravin671231/TechCart-Landing-page/issues/1) (merged in [#7](https://github.com/Pravin671231/TechCart-Landing-page/pull/7))

### Context

Empty repository apart from `docs/`. Stand up the Astro project so later issues
have somewhere to add sections. Stack and constraints are fixed by `LP-001` §2.4
and the layout by [`architecture.md`](architecture.md) §2.

### Tasks

- [ ] `npm create astro@latest` — minimal template, TypeScript **strict**, into
      the repo root.
- [ ] Add `@astrojs/tailwind` + `tailwindcss`; Tailwind config with the
      indigo→violet accent and a system font stack.
- [ ] Add `.nvmrc` and `.node-version`, both containing `24`.
- [ ] Add `.prettierrc` (+ `prettier-plugin-astro`) and an ESLint flat config
      (`eslint.config.mjs`) with `typescript-eslint` and the Astro plugin.
- [ ] `package.json` scripts: `dev`, `build`, `preview`, `lint`, `format`,
      `check` (`astro check`).
- [ ] Create the `src/` tree from `architecture.md` §2: `layouts/`, `pages/`,
      `components/`, `data/`, `styles/`.
- [ ] `src/layouts/BaseLayout.astro` — `<head>` with charset/viewport, `<title>`,
      meta description, Open Graph + Twitter-card tags, canonical link, a
      skip-to-content link, and a slot for page content.
- [ ] `src/styles/global.css` — Tailwind entry + CSS custom properties for the
      light and dark palettes (both AA contrast).
- [ ] `src/pages/index.astro` renders `BaseLayout` with a placeholder `<h1>`.
- [ ] `.vscode/extensions.json` recommending the Astro + Tailwind + Prettier
      extensions (optional).
- [ ] Add the GitHub Actions CI workflow from `architecture.md` §6.

### Requirements covered

`LP-001` §2.4 (stack, Node pin, Prettier, ESLint, no secrets); groundwork for all
FRs.

### Test / acceptance criteria

- `npm run dev` serves a themed blank shell at `localhost:4321` with no console
  errors.
- `npm run build`, `npm run check` (`astro check`), `npm run lint`, and
  `npx prettier --check .` all pass.
- Toggling the OS colour scheme switches the shell's palette.

### Dependencies

None.

---

## M1.2 — Page shell: nav, TOC sidebar, scroll-spy, theme toggle

**Status:** Complete — [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) (merged in [#8](https://github.com/Pravin671231/TechCart-Landing-page/pull/8))

### Context

The structural chrome every section drops into: top nav, the sticky
table-of-contents sidebar, scroll-spy, the mobile "On this page" disclosure, the
theme toggle, and the shared content primitives (`Section`, `Prose`, `CodeBlock`,
`Callout`).

### Tasks

- [ ] `src/data/toc.ts` — ordered `[{ id, title }]` for all 16 sections
      (`LP-001` §6.1). Single source for the sidebar, the mobile nav, and the
      section anchors.
- [ ] `src/components/Nav.astro` — wordmark, GitHub repo link, primary CTA.
- [ ] `src/components/TocSidebar.astro` — sticky on viewports ≥ 1024 px; renders
      from `toc.ts`.
- [ ] `src/components/MobileNav.astro` — `<details>`-based "On this page"
      disclosure, closed by default, shown below 1024 px.
- [ ] Scroll-spy — `IntersectionObserver` marks the in-view section's TOC entry
      active; no-JS fallback is a plain anchor list.
- [ ] Theme toggle — inline script: initial theme from `prefers-color-scheme`,
      explicit choice persisted to `localStorage`, applied before paint to avoid
      a flash.
- [ ] `src/components/Section.astro` — `id` + heading + consistent vertical
      rhythm.
- [ ] `src/components/Prose.astro` — typographic wrapper for long-form copy.
- [ ] `src/components/CodeBlock.astro` — terminal-style, monospace,
      `overflow-x: auto`, a keyboard-focusable copy button using
      `navigator.clipboard` with a visual confirmation.
- [ ] `src/components/Callout.astro` — note / warning / tip variants.
- [ ] Wire the sidebar + mobile nav + a placeholder section list into
      `index.astro`.

### Requirements covered

`FR-LP-002`, `FR-LP-003`, `FR-LP-018`, `FR-LP-019`; `NFR-LP-001`, `NFR-LP-006`.

### Test / acceptance criteria

- Every TOC link smooth-scrolls to its section; instant jump when
  `prefers-reduced-motion` is set.
- Scroll-spy highlights exactly one section while scrolling.
- Below 1024 px the sidebar is replaced by the closed disclosure; above, it is
  sticky.
- Theme toggle switches light/dark with no flash on reload; choice persists.
- Copy button copies raw block text and confirms; reachable by keyboard.
- Page is navigable with the keyboard alone; usable with JS disabled.

### Dependencies

`M1.1`.

---

## M1.3 — Product sections

**Status:** Complete — [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3) (merged in [#9](https://github.com/Pravin671231/TechCart-Landing-page/pull/9))

### Context

The marketing half of the page: hero, project summary, feature showcase,
suggested-features board, tech-stack tables, and the footer / get-started block.
All TechCart facts come from one typed data module.

### Tasks

- [ ] `src/data/techcart.ts` — stack rows, milestone list, data-model rows, and
      the feature list; every value carries a comment citing its source in the
      TechCart repo (`README.md`, `architecture.md`, `ci.yml`, root config). See
      `SRS.md` Appendix A.
- [ ] `FR-LP-001` Hero — name, one-line pitch, primary CTA → repo, secondary CTA
      → `#summary`; stat strip (`3 workspaces · 10 milestones shipped · Node 24 ·
      Razorpay`); indigo→violet gradient; reduced-motion safe.
- [ ] `FR-LP-004` Project Summary — prose from `SRS.md` Appendix A.1–A.5; links
      to TechCart's `docs/srs/SRS.md` and `docs/architecture.md`.
- [ ] `FR-LP-005` Features — `src/components/FeatureCard.astro`; one card per
      capability from `techcart.ts`, each with an icon, blurb, and milestone
      badge; responsive grid collapsing to one column below 640 px.
- [ ] `FR-LP-006` Suggested Features — "Next up" board split into in-flight
      milestones (M8 / M9 / M11) and un-specced product ideas.
- [ ] `FR-LP-007` Tech Stack — `src/components/StackTable.astro`; Table A (this
      landing page) and Table B (TechCart), per `LP-001` FR-LP-007.
- [ ] `FR-LP-020` Footer / Get Started — `src/components/Footer.astro`; the
      clone-and-run quickstart and the link list.

### Requirements covered

`FR-LP-001`, `FR-LP-004`, `FR-LP-005`, `FR-LP-006`, `FR-LP-007`, `FR-LP-020`.

### Test / acceptance criteria

- Hero primary/secondary CTAs above the fold at 1280×720; both work.
- Feature grid reflows with no horizontal scroll at 320 / 768 / 1280 px.
- Every fact on screen matches `SRS.md` Appendix A / `techcart.ts` citations.
- All external links resolve and carry `rel="noopener noreferrer"`.

### Dependencies

`M1.2`.

---

## M1.4 — Guide sections, part 1 (Claude Code & repo structure)

**Status:** Complete — [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4) (merged in [#10](https://github.com/Pravin671231/TechCart-Landing-page/pull/10))

### Context

First half of the engineering-process guide. Content outlines are in `LP-001` §2
under each FR — this issue turns the outlines into copy.

### Tasks

- [ ] `FR-LP-008` How to Handle Claude Code — two labelled parts: **Skills**
      (what a skill is, `.claude/skills/<name>/SKILL.md` anatomy, the four
      TechCart skills, creating one with `skill-creator`, when a skill beats a
      prompt) and **Rules** (root vs scoped `CLAUDE.md`, `AGENTS.md`,
      `.claude/settings.json` permissions + hooks, how to write good rules, a
      sample TechCart rule block).
- [ ] `FR-LP-009` Folder Architecture — annotated tree of the TechCart monorepo
      root and of `backend/src`; the feature-module pattern; the flat
      npm-workspaces rationale; a subsection on enforcing structure with a scoped
      `CLAUDE.md` + a rule + an optional lint rule / hook + a PR-checklist item.
- [ ] `FR-LP-010` `.node-version` and `.nvmrc` — which tools read each, why pin
      (dev = CI = prod; TechCart's CI uses `node-version-file: .nvmrc`), switch
      commands, keep-both-in-sync best practice.
- [ ] `FR-LP-011` Environment Variables — development, testing/CI, and production
      tiers separately, with TechCart's real variables; then the security
      best-practices list (`.env.example` only, `PUBLIC_`/`NEXT_PUBLIC_` never
      secret, least privilege, rotation, per-env values, boot-time validation).
- [ ] Use `Callout` for the "never commit `.env`" and "public prefix ships to the
      browser" warnings.

### Requirements covered

`FR-LP-008`, `FR-LP-009`, `FR-LP-010`, `FR-LP-011`.

### Test / acceptance criteria

- Each section present, in TOC order, with a stable anchor `id`.
- Claude Code section visibly separates Skills from Rules.
- Env-vars section addresses all three tiers explicitly.
- Every claim traces to the TechCart repo (`SRS.md` Appendix A, `CLAUDE.md`,
  `AGENTS.md`, `ci.yml`).
- Code blocks scroll within their container; no page-level horizontal scroll.

### Dependencies

`M1.2` (needs `Section`, `Prose`, `CodeBlock`, `Callout`).

---

## M1.5 — Guide sections, part 2 (engineering & delivery)

**Status:** Complete — [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5) (merged in [#11](https://github.com/Pravin671231/TechCart-Landing-page/pull/11))

### Context

Second half of the guide: debugging, tooling, pipelines, deployment, API design,
and the Git workflow. Outlines in `LP-001` §2.

### Tasks

- [ ] `FR-LP-012` Frontend API Request & Response Debugging — tools (DevTools
      Network tab, RTK/React Query devtools, MSW); reading the
      `{ success, code, message }` envelope; the common-issues table (CORS, 401 /
      bearer token, cross-domain cookies, wrong base URL, stale cache, Zod 422,
      waterfalls); the step-by-step triage flow.
- [ ] `FR-LP-013` ESLint, Prettier & `package-lock.json` — one subsection each:
      what it is, how TechCart configures it, why it matters; the "always commit
      the lockfile / CI uses `npm ci`" point.
- [ ] `FR-LP-014` CI & CD Pipelines — walk TechCart's `ci.yml` (triggers, the
      three jobs, matrix, caching, `node-version-file`, concurrency); why CD is
      not a GitHub Actions job (platform-owned, preview deploys, no CI tokens);
      the recommended minimal-CI approach.
- [ ] `FR-LP-015` Deployment — TechCart's Render (Blueprint) + Vercel (two
      projects) setup; the three isolated environments; `docker compose up`;
      deployment best practices; how this landing page deploys
      (`astro build` → Vercel preset).
- [ ] `FR-LP-016` API Design & Documentation — design principles (REST routes +
      modules, Zod authority, error envelope, status endpoints, deterministic
      pagination, paise boundary); why docs matter; Postman usage (collection per
      feature, env vars, saved examples, `newman` in CI); the OpenAPI-from-Zod
      alternative.
- [ ] `FR-LP-017` Git, GitHub & GitHub Actions — branching, commits, PRs, repo
      management, and GitHub Actions anatomy with `ci.yml` as the worked example;
      other automation ideas.

### Requirements covered

`FR-LP-012`, `FR-LP-013`, `FR-LP-014`, `FR-LP-015`, `FR-LP-016`, `FR-LP-017`.

### Test / acceptance criteria

- Each section present, in TOC order, with a stable anchor `id`.
- The `ci.yml` walkthrough names all three jobs and matches the real workflow.
- CD section states plainly why it is separate from GitHub Actions.
- API section covers both Postman and the OpenAPI alternative.
- Every claim traces to the TechCart repo.

### Dependencies

`M1.2`.

---

## M1.6 — Accessibility, performance, SEO polish & deploy

**Status:** Complete — [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6) (merged in [#12](https://github.com/Pravin671231/TechCart-Landing-page/pull/12); released [`v1.0.0`](https://github.com/Pravin671231/TechCart-Landing-page/releases/tag/v1.0.0)). Remaining operational step: connect the repo to Vercel; the `site` URL stays the `techcart-landing-page.vercel.app` placeholder until confirmed.

### Context

Final pass to meet the non-functional bar and ship. Nothing new on screen; this
hardens what `M1.2`–`M1.5` produced and puts it on Vercel.

### Tasks

- [ ] **Accessibility (`NFR-LP-001`)** — full keyboard pass; visible focus rings
      on every interactive element; skip link works; `prefers-reduced-motion`
      disables non-essential animation; text + UI contrast checked at AA in both
      themes; one `<h1>` and a correct heading outline.
- [ ] **Performance (`NFR-LP-002`)** — audit the client-JS budget (scroll-spy +
      theme toggle + copy handler only); size and lazy-load below-the-fold
      images; no layout shift (CLS < 0.1); Lighthouse Performance ≥ 95; LCP
      < 2.0 s on Fast 3G.
- [ ] **SEO (`NFR-LP-003`)** — meta description; Open Graph + Twitter-card tags
      with an OG image; `@astrojs/sitemap` for `sitemap.xml`; canonical URL;
      `robots.txt`.
- [ ] **Responsive (`NFR-LP-004`)** — manual sweep at 320 / 375 / 768 / 1024 /
      1280 / 1920 px; no horizontal page scroll; wide tables and code blocks
      scroll within their own container.
- [ ] **Security / privacy (`NFR-LP-005`)** — every external link
      `rel="noopener noreferrer"`; confirm no trackers and no secrets in the
      bundle.
- [ ] **Browser support (`NFR-LP-007`)** — smoke-test latest Chrome, Firefox,
      Safari, Edge.
- [ ] **Deploy** — create the Vercel project (Astro preset, no env vars); verify
      a PR preview deploy and the production deploy; wire the production URL into
      the canonical tag and OG tags.
- [ ] Optional: add Lighthouse CI to the GitHub Actions workflow
      (`architecture.md` §6).
- [ ] Tag `v1.0.0` after the implementation PR squash-merges to `main`.

### Requirements covered

`NFR-LP-002`, `NFR-LP-003`, `NFR-LP-004`, `NFR-LP-005`, `NFR-LP-007`; deployment
half of `FR-LP-015`.

### Test / acceptance criteria

The full `LP-001` §8 Acceptance Criteria list passes on the **deployed** URL —
see the Definition of Done in [`milestone.md`](milestone.md).

### Dependencies

`M1.3`, `M1.4`, `M1.5` (polishes their output).

---

# M2 — Redesign

Drafts for milestone
[**M2 — Redesign**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/2) —
feature `LP-002` (`srs/features/LP-002-redesign.md`, to be drafted). Filed as
issues [#16–#19](https://github.com/Pravin671231/TechCart-Landing-page/issues?q=is%3Aissue+milestone%3A%22M2+%E2%80%94+Redesign%22).
Order is strict: **M2.1 → M2.2 → M2.3 → M2.4**, each branched off the previous
merge. Branch names `feature/<issue-number>-<scope>`; commits carry no
`Co-Authored-By` trailer and PRs no "Generated with Claude Code" line.

NFRs inherit `NFR-LP-001…007` from `LP-001`. The shared responsive contract
(`FR-LP-027`) is: no horizontal **page** scroll from 320 px to 1920 px, a ≥ 16 px
side gutter at every width, wide tables / code blocks scroll within their own
container, and the tab strip scrolls horizontally on narrow screens.

---

## M2.1 — Ocean Royale brand kit

**Status:** Open — [#16](https://github.com/Pravin671231/TechCart-Landing-page/issues/16)

### Context

M1 shipped with an indigo→violet accent and a system font stack, with palette
values hard-coded in `src/styles/global.css`. Introduce a committed **Ocean
Royale** brand kit as the single source of truth for the palette, and derive the
CSS design tokens and the site font (Inter) from it.

### Tasks

- [ ] `src/data/brand-kit.json` — the Ocean Royale brand kit (theme, font,
      `light_mode`, `dark_mode`, `palette`). Valid JSON (no trailing comma).
- [ ] `src/data/brand-kit.ts` — import the JSON; typed export plus a `tokenCss()`
      helper that builds the `:root`, `:root[data-theme='dark']`, and
      `@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` rule
      text from `light_mode` / `dark_mode`.
- [ ] `src/components/BrandTokens.astro` — emit
      `<style is:global set:html={tokenCss()}></style>`; render from
      `BaseLayout.astro` after the `global.css` import so it is the sole definer
      of the colour custom properties.
- [ ] `src/styles/global.css` — remove the hard-coded `:root` / dark colour
      blocks; keep the `@theme inline` mapping; add `--color-heading`,
      `--color-button`, `--color-button-text`, `--color-highlight`; set
      `--font-sans` to `'InterVariable', ui-sans-serif, system-ui, …` and apply
      it to `body`.
- [ ] `@fontsource-variable/inter` — add the dependency (self-hosted, no external
      request); `import '@fontsource-variable/inter'` in `BaseLayout.astro`;
      `npm install` to update `package-lock.json`.
- [ ] `BaseLayout.astro` — update the two `<meta name="theme-color">` values to
      `#CAF0F8` (light) / `#03045E` (dark); keep the pre-paint theme script.
- [ ] `scripts/gen-og.mjs` — recolour to Ocean Royale (`#03045E` ground,
      cyan→gold accent bar, `#CAF0F8` text); run `npm run gen:og` to rewrite
      `public/og.png`.

**Token map** (`brand-kit.json` key → CSS var): `background`→`--bg`,
`surface`→`--surface`, `text`→`--fg`, `heading`→`--heading`,
`secondary_text`→`--muted`, `border`→`--border`, `primary`→`--accent`,
`highlight`→`--accent-2` / `--highlight`, `button`→`--button`,
`button_text`→`--button-text`; `--accent-fg` = `#CAF0F8`, `--focus` = `#00B4D8`.
Existing consumers keep working — the var names are unchanged, only the values
move to the JSON.

### Requirements covered

`FR-LP-021`.

### Test / acceptance criteria

- `npm run build`, `npm run check`, `npm run lint`, `npm run format:check` pass;
  `npm run check:a11y` reports 0 violations.
- In the browser, `getComputedStyle(document.documentElement)` gives `--bg` =
  `#CAF0F8` (light) and `#03045E` (dark); every token matches `brand-kit.json`.
- The theme toggle still switches light / dark; an explicit choice survives a
  reload; text / muted / button pairs meet AA contrast in both modes.
- `public/og.png` regenerated in the Ocean Royale palette.

### Dependencies

None (first M2 issue).

---

## M2.2 — App-shell layout + Overview

**Status:** Open — [#17](https://github.com/Pravin671231/TechCart-Landing-page/issues/17)

### Context

Replace the single-scroll shell (top `Nav`, sticky 16-item `TocSidebar`, `Hero`)
with a `container-fluid` two-column grid: a sticky full-height left sidenav and a
`col-10` main column whose first section is an 80dvh Overview with a Buyer / Admin
app toggle.

### Tasks

- [ ] `src/components/LeftSidenav.astro` — `<aside>` `sticky top-0 h-dvh`,
      `hidden lg:flex flex-col`: wordmark on top; a `<nav>` list from `NAV`
      (`src/data/toc.ts`) with `data-toc-link` anchors `#overview`, `#casestudy`,
      `#user-manual`, `#features`; GitHub link + `ThemeToggle` at the bottom.
- [ ] `src/components/TopBar.astro` — `lg:hidden` sticky bar (`h-14`): wordmark,
      `ThemeToggle`, and a `<details>` "Menu" drawer (full-width panel, the four
      `NAV` links stacked, closes on link pick and on `Esc`). Replaces
      `MobileNav.astro`.
- [ ] `src/components/ThemeToggle.astro` — the toggle button markup + local
      `<style>` extracted from `Nav.astro`.
- [ ] `src/scripts/theme.ts` — the theme logic from `Nav.astro`, rebinding **all**
      `.theme-toggle` buttons; imported once from `BaseLayout.astro`.
- [ ] `src/components/Overview.astro` — `<section id="overview">`
      `flex min-h-[80dvh] flex-col`: top `role="group"` app toggle (`Buyer App`
      primary / `Admin App` outline, `aria-pressed`); centred eyebrow +
      `<h1 data-app-title>` (`text-3xl` → `md:text-4xl` → `lg:text-5xl`) +
      `<p data-app-desc>`; bottom actions `<a data-app-repo>` **GitHub Repo** +
      `<a data-app-demo>` **Live Demo** (`rel="noopener noreferrer"`). Buttons
      full-width below `md`, auto-width above; actions pinned to the bottom via a
      `flex-1` centre.
- [ ] `src/data/apps.ts` — `APPS: [{ key, label, title, description, repoUrl,
      demoUrl }]` for `buyer` and `admin`, sourced from `WORKSPACES`
      (`techcart.ts`) + new `consts.ts` URLs; emitted as
      `<script type="application/json" id="apps-data">`.
- [ ] `src/scripts/app-toggle.ts` — on toggle click set `aria-pressed`, read
      `#apps-data`, and swap `[data-app-title]`, `[data-app-desc]`,
      `[data-app-repo].href`, `[data-app-demo].href`. No-JS = Buyer default.
- [ ] `src/consts.ts` — add `BUYER_APP_REPO_URL` / `ADMIN_APP_REPO_URL`
      (`…/tree/main/<app>`) and `BUYER_APP_DEMO_URL` / `ADMIN_APP_DEMO_URL`
      (placeholder, `TODO` comment like `SITE_URL`).
- [ ] `src/pages/index.astro` — `container-fluid` grid
      `min-h-dvh lg:grid lg:grid-cols-[2fr_10fr]`; `<LeftSidenav />` + a
      `min-w-0 px-4 lg:px-8` main column with `<TopBar />` and `<Overview />`.
- [ ] Delete `src/components/Nav.astro`, `TocSidebar.astro`, `MobileNav.astro`,
      `Hero.astro`.
- [ ] `src/scripts/scrollspy.ts` — retarget to `#overview` / `#documentation`;
      keep the section-reveal observer.

### Requirements covered

`FR-LP-022`, `FR-LP-023`, `FR-LP-024`, `FR-LP-027`.

### Test / acceptance criteria

- Sidebar is sticky and full height at `lg`+; below `lg` it is replaced by the
  `TopBar` Menu drawer (opens / closes, `Esc` closes, closes on link pick).
- The Buyer / Admin toggle swaps the title, description, and both action links
  with no reload and updates `aria-pressed`; the Buyer view renders server-side.
- Overview fills ≥ 80dvh with the actions pinned to the bottom; `<h1>` scales per
  breakpoint.
- No horizontal page scroll at 320 / 375 / 768 / 1024 / 1280 / 1920 px; ≥ 16 px
  gutter throughout.
- Keyboard: Tab reaches wordmark → nav links → toggle → app buttons → CTAs, all
  with a visible focus ring; theme toggle works from both `LeftSidenav` and
  `TopBar`.
- `npm run build`, `npm run check`, `npm run lint`, `npm run format:check` pass.

### Dependencies

`M2.1`.

---

## M2.3 — Documentation tabs

**Status:** Open — [#18](https://github.com/Pravin671231/TechCart-Landing-page/issues/18)

### Context

Add the tabbed documentation area below the Overview: Case Study · User Manual ·
Features, as an accessible tablist. Content is migrated in `M2.4`; this issue is
the component, the behaviour, and the nav wiring.

### Tasks

- [ ] `src/components/DocTabs.astro` — `<section id="documentation">` with a
      `role="tablist"` of three `<button role="tab">` (Case Study active by
      default) and three `<div role="tabpanel">` exposing named slots
      `casestudy`, `manual`, `features`. Roving `tabindex`,
      `aria-controls` / `aria-labelledby`. The tablist is a horizontal
      `overflow-x-auto` strip with scroll-snap and no wrap; static row once it
      fits (`md`+); subtle edge fade on overflow.
- [ ] `src/scripts/tabs.ts` — click + `ArrowLeft/Right/Home/End` activation; on
      activate set `aria-selected` / `tabindex` / panel `hidden`, centre the
      active tab with `scrollIntoView` (respecting `prefers-reduced-motion`),
      push `#casestudy` / `#user-manual` / `#features` to `location.hash`, and
      mirror the active state onto the matching `[data-toc-link]`. On load +
      `hashchange`, activate the hash's tab and scroll `#documentation` into
      view. Inactive panels get `hidden` only after this runs.
- [ ] `src/data/toc.ts` — export `NAV` (4 items: `overview`, `casestudy`,
      `user-manual`, `features`) and `TABS` (the last 3); keep the `TocEntry`
      interface; remove the 16-entry `TOC`.
- [ ] `src/pages/index.astro` — wrap the tab area in `<DocTabs>` with three slots
      (placeholder content; filled in `M2.4`).
- [ ] `src/components/Section.astro` — drop `border-b` / `first:pt-8` /
      `scroll-mt-20`; keep `id` + `<h2>` + spacing for use inside panels.

### Requirements covered

`FR-LP-025`, `FR-LP-027`.

### Test / acceptance criteria

- `npm run build`, `npm run check`, `npm run lint`, `npm run format:check` pass;
  `npm run check:a11y` reports 0 violations.
- Tabs switch on click and on Arrow / Home / End; the active tab mirrors to the
  sidenav / TopBar highlight.
- Visiting `…/#user-manual` opens with that tab active and `#documentation`
  scrolled into view.
- At 320 px the tab strip scrolls horizontally while the page does not.
- JS off: all three panels are visible and stacked with a valid heading outline.

### Dependencies

`M2.2`.

---

## M2.4 — Migrate M1 sections into tabs

**Status:** Open — [#19](https://github.com/Pravin671231/TechCart-Landing-page/issues/19)

### Context

Move M1's 16 sections into the three tab panels. "Summary" is reframed and
renamed **Case Study** (problem → approach → outcome). No content is dropped;
`LP-001` stays the historical M1 record.

### Tasks

- [ ] `src/components/CaseStudy.astro` — a short problem → approach → outcome lede
      (problem: build a production, India-first e-commerce platform end-to-end;
      approach: spec-driven, managed platforms only, flat monorepo, one API / one
      DB; outcome: 9 of 12 milestones shipped), then the existing
      `<ProjectSummary />` and both `<StackTable>`s. Facts stay sourced from
      `techcart.ts` / `SRS.md` Appendix A. Keep identifiers plain in prose (no
      inline `<code>` mid-sentence — prettier-plugin-astro wrapping bug).
- [ ] `src/pages/index.astro` — fill the `DocTabs` slots:
  - **casestudy:** `<CaseStudy />`.
  - **manual:** `<Section>` wrappers around `ClaudeCode`, `FolderArchitecture`,
    `NodeVersion`, `EnvVars`, `ApiDebugging`, `EslintPrettierLockfile`, `CiCd`,
    `Deployment`, `ApiDesign`, `GitGithub`, then Get Started. Each `<Section>`
    keeps a stable `id`.
  - **features:** the `FEATURES.map(<FeatureCard/>)` grid + `<SuggestedFeatures />`.
- [ ] `src/components/Footer.astro` — move the "Get Started" quickstart into the
      manual panel; keep the credit line in `BaseLayout.astro`'s `<footer>`.
- [ ] `src/data/toc.ts` — confirm final `NAV` / `TABS` labels (`Case Study`, not
      `Summary`).
- [ ] `docs/issues.md`, `docs/milestone.md`, `docs/srs/SRS.md` §5 — mark M2.1–M2.4
      Complete with PR links; add the `v2.0.0` release note.
- [ ] Tag `v2.0.0` after the final squash-merge.

### Requirements covered

`FR-LP-026`.

### Test / acceptance criteria

- Every M1 section is present under one of the three tabs; exactly one `<h1>`
  (Overview) and a correct `<h2>` / `<h3>` outline per panel.
- `npm run build`, `npm run check`, `npm run lint`, `npm run format:check` pass;
  `npm run check:a11y` reports 0 violations.
- Full Definition of Done sweep (see [`milestone.md`](milestone.md)) — keyboard,
  JS-off, 320–1920 responsive, theme toggle, external links.

### Dependencies

`M2.3`.

---

## Coverage check

Every requirement in `LP-001` maps to exactly one M1 issue. Draft IDs map to
GitHub issues one-to-one: `M1.1` → #1, `M1.2` → #2, `M1.3` → #3, `M1.4` → #4,
`M1.5` → #5, `M1.6` → #6.

Every requirement in `LP-002` maps to exactly one M2 issue: `FR-LP-021` → `M2.1`;
`FR-LP-022` / `023` / `024` → `M2.2`; `FR-LP-025` → `M2.3`; `FR-LP-026` → `M2.4`;
`FR-LP-027` (shared responsive contract) → `M2.2` + `M2.3`. Draft IDs map to
GitHub issues one-to-one: `M2.1` → #16, `M2.2` → #17, `M2.3` → #18, `M2.4` → #19.

### Functional requirements

| Requirement                    | Issue  |
| ------------------------------ | ------ |
| `FR-LP-001` Hero               | `M1.3` |
| `FR-LP-002` TOC sidebar        | `M1.2` |
| `FR-LP-003` Scroll-spy         | `M1.2` |
| `FR-LP-004` Project Summary    | `M1.3` |
| `FR-LP-005` Features showcase  | `M1.3` |
| `FR-LP-006` Suggested Features | `M1.3` |
| `FR-LP-007` Tech Stack         | `M1.3` |
| `FR-LP-008` Claude Code        | `M1.4` |
| `FR-LP-009` Folder Architecture | `M1.4` |
| `FR-LP-010` node-version/nvmrc | `M1.4` |
| `FR-LP-011` Environment Variables | `M1.4` |
| `FR-LP-012` API Debugging      | `M1.5` |
| `FR-LP-013` ESLint/Prettier/lockfile | `M1.5` |
| `FR-LP-014` CI & CD            | `M1.5` |
| `FR-LP-015` Deployment         | `M1.5` (content) + `M1.6` (deploy) |
| `FR-LP-016` API Design & Docs  | `M1.5` |
| `FR-LP-017` Git/GitHub/Actions | `M1.5` |
| `FR-LP-018` Copy buttons       | `M1.2` |
| `FR-LP-019` Theme toggle       | `M1.2` |
| `FR-LP-020` Footer / Get Started | `M1.3` |

### Non-functional requirements

| Requirement                    | Issue  |
| ------------------------------ | ------ |
| `NFR-LP-001` Accessibility     | `M1.2` (build) + `M1.6` (audit) |
| `NFR-LP-002` Performance       | `M1.6` |
| `NFR-LP-003` SEO               | `M1.1` (tags scaffold) + `M1.6` (audit) |
| `NFR-LP-004` Responsive        | `M1.6` |
| `NFR-LP-005` Security/privacy  | `M1.6` |
| `NFR-LP-006` Maintainability   | `M1.2` (single data modules) |
| `NFR-LP-007` Browser support   | `M1.6` |

### Setup (no FR)

| Item                          | Issue  |
| ----------------------------- | ------ |
| Astro scaffold, tooling, CI   | `M1.1` |
