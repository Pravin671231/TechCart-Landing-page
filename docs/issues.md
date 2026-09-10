# Issue Drafts — TechCart Landing Page

Issue drafts for milestone
[**M1 — Landing Page**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1).
Companion to [`milestone.md`](milestone.md), [`srs/SRS.md`](srs/SRS.md), and the
feature spec [`srs/features/LP-001-landing-page.md`](srs/features/LP-001-landing-page.md).

All six drafts are now open as GitHub issues
[#1–#6](https://github.com/Pravin671231/TechCart-Landing-page/issues?q=is%3Aissue+milestone%3A%22M1+%E2%80%94+Landing+Page%22).
The full drafts are kept here as the working checklist; GitHub carries the live
status.

## Workflow

1. **Draft here** — full context, task checklist, and acceptance criteria.
2. **Open on GitHub** —
   `gh issue create --milestone "M1 — Landing Page" --title "M1.x — <title>" --body-file <draft>`.
3. **Work it** — branch `feature/<issue-number>-<scope>` off `main`; squash-merge
   the PR back; delete the branch.
4. **Track** — status moves here, in [`srs/SRS.md`](srs/SRS.md) §5, and in
   [`milestone.md`](milestone.md): Draft → Open (`#N`) → Complete.

Issue IDs are milestone-scoped (`M1.1` … `M1.6`), matching TechCart's `M2.13`
style; each maps to one GitHub issue number.

| Draft  | GitHub issue |
| ------ | ------------ |
| M1.1   | [#1](https://github.com/Pravin671231/TechCart-Landing-page/issues/1) |
| M1.2   | [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) |
| M1.3   | [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3) |
| M1.4   | [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4) |
| M1.5   | [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5) |
| M1.6   | [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6) |

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

**Status:** In progress — [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) on branch `feature/2-page-shell`

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

**Status:** Open — [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3)

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

**Status:** Open — [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4)

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

**Status:** Open — [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5)

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

**Status:** Open — [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6)

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

## Coverage check

Every requirement in `LP-001` maps to exactly one issue. Draft IDs map to GitHub
issues one-to-one: `M1.1` → #1, `M1.2` → #2, `M1.3` → #3, `M1.4` → #4, `M1.5` → #5,
`M1.6` → #6.

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
