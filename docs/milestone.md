# TechCart Landing Page — Milestones

Roadmap for the landing-page project. Companion to [`srs/SRS.md`](srs/SRS.md) and
the feature spec [`srs/features/LP-001-landing-page.md`](srs/features/LP-001-landing-page.md).
Issue drafts are in [`issues.md`](issues.md).

---

## Project Status Overview

[**M1 — Landing Page**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1)
is **complete and closed** — all six issues merged, tagged
[`v1.0.0`](https://github.com/Pravin671231/TechCart-Landing-page/releases/tag/v1.0.0).
Remaining operational step: connect the repo to Vercel (the `site` URL stays the
`techcart-landing-page.vercel.app` placeholder until confirmed).

[**M2 — Redesign**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/2)
is the active milestone: reshape the shipped single-scroll page into an
app-shell — an Ocean Royale brand kit, a `container-fluid` two-column grid, a
sticky full-height left sidenav, an Overview hero with a Buyer/Admin app toggle,
and a tabbed documentation area. [#16](https://github.com/Pravin671231/TechCart-Landing-page/issues/16)
(M2.1 — Ocean Royale brand kit) is merged;
[#17–#19](https://github.com/Pravin671231/TechCart-Landing-page/milestone/2) are
open; full drafts in [`issues.md`](issues.md). The `LP-002` feature spec is still
to be written.

| ID  | Title                  | Scope                                                          | Status      | Release  |
| --- | ---------------------- | ------------------------------------------------------------ | ----------- | -------- |
| M0  | Repo & SRS Foundation  | Repository, `SRS.md`, `LP-001`, `architecture.md`, conventions | Complete    | —        |
| M1  | Landing Page           | Build and deploy the single-page site per `LP-001`             | Complete    | `v1.0.0` |
| M2  | Redesign               | Ocean Royale brand kit + `container-fluid` app-shell per `LP-002` | In progress — [#16](https://github.com/Pravin671231/TechCart-Landing-page/issues/16) merged, [#17–#19](https://github.com/Pravin671231/TechCart-Landing-page/milestone/2) open | `v2.0.0` (planned) |

**Possible later milestones** (not committed):

| ID  | Title                | Trigger                                                        |
| --- | -------------------- | ----------------------------------------------------------- |
| M3? | Standalone guide     | Split the User Manual tab into dedicated `/guide/*` pages      |
| M4? | Live repo stats      | Add a build-time fetch of GitHub stars / last-commit to the Overview |

---

## M1 — Landing Page

**Goal:** ship the page described by `LP-001` — a marketing hero plus a scrollable
engineering-process guide — as a static Astro site deployed on Vercel.

### Work packages

Each is an issue draft in [`issues.md`](issues.md). One issue per package.

| Issue | Package                                   | Requirements covered                                            |
| ----- | ---------------------------------------- | ------------------------------------------------------------- |
| [#1](https://github.com/Pravin671231/TechCart-Landing-page/issues/1) | Project scaffold & tooling                | `LP-001` §2.4 constraints; `architecture.md` §2 layout          |
| [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) | Page shell: nav, TOC, scroll-spy, theme   | `FR-LP-002`, `003`, `018`, `019`; `NFR-LP-001`, `006`          |
| [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3) | Product sections                          | `FR-LP-001`, `004`, `005`, `006`, `007`, `020`                 |
| [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4) | Guide sections, part 1 (Claude Code, repo) | `FR-LP-008`, `009`, `010`, `011`                              |
| [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5) | Guide sections, part 2 (engineering, delivery) | `FR-LP-012`, `013`, `014`, `015`, `016`, `017`            |
| [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6) | Accessibility, performance, SEO & deploy   | `NFR-LP-002`, `003`, `004`, `005`, `007`; Vercel deploy         |

Order: #1 → #2 → (#3, #4, #5 in any order) → #6 last.

### Definition of Done

From `LP-001` §8 Acceptance Criteria.

- [x] Every `FR-LP-001…020` section is present and populated only with facts
      traceable to the TechCart repository.
- [x] Every `NFR-LP-001…007` is satisfied.
- [x] Every TOC link smooth-scrolls to the correct section; scroll-spy marks the
      section in view.
- [x] No horizontal page scroll at 320, 768, 1280, and 1920 px. *(structural —
      every table / code block in `overflow-x-auto`; final browser sweep is the
      operator's)*
- [x] The theme toggle switches light / dark and an explicit choice survives a
      reload.
- [x] Every code block has a working copy button.
- [x] `astro build`, `astro check`, and `prettier --check .` pass with no errors.
- [ ] Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, and SEO.
      *(verify on the deployed URL — 0 axe violations locally; near-zero JS)*
- [x] The page is fully operable with a keyboard alone; readable with JavaScript
      disabled.
- [x] Every external link resolves.
- [x] The implementation PRs are squash-merged to `main`; version tagged
      [`v1.0.0`](https://github.com/Pravin671231/TechCart-Landing-page/releases/tag/v1.0.0).
- [ ] Deployed to Vercel (preview + production). *(connect the repo in Vercel —
      Astro preset, no env vars)*

---

## M2 — Redesign

**Goal:** reshape the shipped single-scroll page (`v1.0.0`) into an app-shell,
without dropping any content.

- **Ocean Royale brand kit** — a committed `src/data/brand-kit.json` becomes the
  single source of truth for the palette; the CSS design tokens and the site
  font (Inter, self-hosted) are derived from it.
- **`container-fluid` grid** — full-bleed, `col-2` / `col-10` split from `lg`
  down to a single mobile-first column below it.
- **Left sidenav** — sticky `top: 0`, `height: 100dvh`, four items: Overview ·
  Case Study · User Manual · Features. Below `lg` it becomes a top-bar "Menu"
  drawer. No right sidenav.
- **Overview section** — `min-height: 80dvh`, flex-column: a Buyer App / Admin
  App toggle on top, a centred title + description, and GitHub Repo + Live Demo
  actions at the bottom. The toggle swaps the Overview content between the two
  apps client-side; with JavaScript off the Buyer view is shown.
- **Documentation tabs** — Case Study · User Manual · Features, as an ARIA
  tablist, keyboard-operable, hash-deep-linkable, with all panels visible when
  JavaScript is off.
- **Content migration** — M1's 16 sections are reorganised into the three tabs.
  "Summary" is reframed and renamed **Case Study** (problem → approach →
  outcome). `LP-001` stays the historical M1 record.

**Feature:** `LP-002` — `docs/srs/features/LP-002-redesign.md` (to be drafted),
requirements `FR-LP-021…027`. NFRs inherit `NFR-LP-001…007` from `LP-001`.

### Work packages

One issue per package. Full drafts in [`issues.md`](issues.md). Order is strict:
**M2.1 → M2.2 → M2.3 → M2.4** — each builds on the previous merge.

| Issue | Package                          | Requirements covered              |
| ----- | ------------------------------- | -------------------------------- |
| [#16](https://github.com/Pravin671231/TechCart-Landing-page/issues/16) M2.1 | Ocean Royale brand kit — merged  | `FR-LP-021`                       |
| [#17](https://github.com/Pravin671231/TechCart-Landing-page/issues/17) M2.2 | App-shell layout + Overview — merged | `FR-LP-022`, `023`, `024`, `027` |
| [#18](https://github.com/Pravin671231/TechCart-Landing-page/issues/18) M2.3 | Documentation tabs               | `FR-LP-025`, `027`               |
| [#19](https://github.com/Pravin671231/TechCart-Landing-page/issues/19) M2.4 | Migrate M1 sections into tabs     | `FR-LP-026`                       |

### Definition of Done

- [x] `brand-kit.json` is the only place palette values are defined; the computed
      `--bg` / `--surface` / `--fg` / … tokens match it in both themes.
- [ ] The `container-fluid` grid, sticky full-height sidenav, 80dvh Overview, and
      tabbed docs area are all in place and match `LP-002` §6.
- [x] The Buyer / Admin toggle swaps the Overview title, description, and both
      action links with no page reload; the Buyer view renders server-side.
- [ ] Every M1 section is still present under one of the three tabs; exactly one
      `<h1>` (in Overview) and a correct heading outline per panel.
- [ ] No horizontal **page** scroll from 320 px to 1920 px; a ≥ 16 px side gutter
      at every width; wide tables and code blocks scroll within their container;
      the tab strip scrolls horizontally on narrow screens.
- [ ] Fully operable with a keyboard alone (sidenav, app toggle, tabs via arrow
      keys, CTAs); readable with JavaScript disabled.
- [ ] The theme toggle still switches light / dark and an explicit choice
      survives a reload; both palettes meet AA contrast.
- [ ] `npm run build`, `npm run check`, `npm run lint`, and `npm run format:check`
      pass; `npm run check:a11y` reports 0 violations.
- [ ] Each implementation PR is squash-merged to `main` in order; version tagged
      `v2.0.0` after M2.4.

---

## Development Process

- **Branch** per issue: `feature/<issue-number>-<scope>` (e.g.
  `feature/3-page-shell`), cut from and squash-merged back to `main`.
- **Commits:** Conventional Commits — `type(scope): message (Issue #N)` — small
  and atomic, ideally one per FR.
- **Branch protection** on `main`: required status checks, no direct pushes,
  linear history.
- **Planning:** use the `discuss-plan-build` Claude Code skill for any non-trivial
  package.
- **CI** (GitHub Actions, on PR): `prettier --check`, `npm run lint`,
  `astro build`; optionally Lighthouse CI. See [`architecture.md`](architecture.md) §6.
- **CD** is owned by **Vercel's git integration**, not GitHub Actions — the same
  "let the platform own CD" reasoning TechCart uses (`LP-001` FR-LP-014).
- **AI attribution:** none. Commits carry no `Co-Authored-By` trailer and pull
  requests carry no "Generated with Claude Code" line.
