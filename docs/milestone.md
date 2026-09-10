# TechCart Landing Page — Milestones

Roadmap for the landing-page project. Companion to [`srs/SRS.md`](srs/SRS.md) and
the feature spec [`srs/features/LP-001-landing-page.md`](srs/features/LP-001-landing-page.md).
Issue drafts are in [`issues.md`](issues.md).

---

## Project Status Overview

The repository foundation (SRS, feature spec, architecture note, conventions) is
complete. The single delivery milestone, **M1 — Landing Page**, is open and
specified but not started. Target release: `v1.0.0`.

| ID  | Title                  | Scope                                                          | Status              | Release          |
| --- | ---------------------- | ------------------------------------------------------------ | ------------------- | ---------------- |
| M0  | Repo & SRS Foundation  | Repository, `SRS.md`, `LP-001`, `architecture.md`, conventions | Complete            | —                |
| M1  | Landing Page           | Build and deploy the single-page site per `LP-001`             | Open (spec drafted) | `v1.0.0` (target) |

**Possible future milestones** (only if the `LP-001` §10 open questions resolve
that way — not committed):

| ID  | Title                | Trigger                                                        |
| --- | -------------------- | ----------------------------------------------------------- |
| M2? | Standalone guide     | Split the guide sections into dedicated `/guide/*` pages       |
| M3? | Live repo stats      | Add a build-time fetch of GitHub stars / last-commit to the hero |

---

## M1 — Landing Page

**Goal:** ship the page described by `LP-001` — a marketing hero plus a scrollable
engineering-process guide — as a static Astro site deployed on Vercel.

### Work packages

Each is an issue draft in [`issues.md`](issues.md). One issue per package.

| Issue  | Package                                   | Requirements covered                                            |
| ------ | ---------------------------------------- | ------------------------------------------------------------- |
| `M1.1` | Project scaffold & tooling                | `LP-001` §2.4 constraints; `architecture.md` §2 layout          |
| `M1.2` | Page shell: nav, TOC, scroll-spy, theme   | `FR-LP-002`, `003`, `018`, `019`; `NFR-LP-001`, `006`          |
| `M1.3` | Product sections                          | `FR-LP-001`, `004`, `005`, `006`, `007`, `020`                 |
| `M1.4` | Guide sections, part 1 (Claude Code, repo) | `FR-LP-008`, `009`, `010`, `011`                              |
| `M1.5` | Guide sections, part 2 (engineering, delivery) | `FR-LP-012`, `013`, `014`, `015`, `016`, `017`            |
| `M1.6` | Accessibility, performance, SEO & deploy   | `NFR-LP-002`, `003`, `004`, `005`, `007`; Vercel deploy         |

Order: `M1.1` → `M1.2` → (`M1.3`, `M1.4`, `M1.5` in any order) → `M1.6` last.

### Definition of Done

From `LP-001` §8 Acceptance Criteria. M1 is complete when, on the deployed URL:

- [ ] Every `FR-LP-001…020` section is present and populated only with facts
      traceable to the TechCart repository.
- [ ] Every `NFR-LP-001…007` is satisfied.
- [ ] Every TOC link smooth-scrolls to the correct section; scroll-spy marks the
      section in view.
- [ ] No horizontal page scroll at 320, 768, 1280, and 1920 px.
- [ ] The theme toggle switches light / dark and an explicit choice survives a
      reload.
- [ ] Every code block has a working copy button.
- [ ] `astro build`, `astro check`, and `prettier --check .` pass with no errors.
- [ ] Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, and SEO.
- [ ] The page is fully operable with a keyboard alone; readable with JavaScript
      disabled.
- [ ] Every external link resolves.
- [ ] Deployed to Vercel (preview + production); the implementation PR is
      squash-merged to `main`; version tagged `v1.0.0`.

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
- **AI attribution** in this repo: `Co-Authored-By: Claude Sonnet 5
  <noreply@anthropic.com>` on commits; `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
  on PRs. (TechCart's own repo forbids AI trailers; that is TechCart's rule.)
