# Software Requirements Specification — TechCart Landing Page

> Master index for the TechCart landing-page project. The landing page is a single
> public web page that both **markets TechCart as a product** and serves as a
> **developer / engineering-process guide** to how TechCart is built and operated.
>
> The page itself is not implemented yet. This SRS is the contract it will be
> built against, following TechCart's own process:
> `Feature → Update SRS → Add to Milestone → Add to Issue → Implement Code`.

---

## Version History

| Version | Date       | Scope                         | Status       |
| ------- | ---------- | ----------------------------- | ------------ |
| v0.1.0  | 2026-09-10 | Landing page feature spec     | Spec drafted |
| v1.0.0  | —          | Landing page live in production | Planned    |

---

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for the **TechCart Landing Page** — a
standalone static website, deployed independently of the TechCart application,
whose job is to:

1. Explain what TechCart is and show its shipped capabilities.
2. Document the engineering practices used to build TechCart (Claude Code usage,
   folder architecture, Node version pinning, environment variables, linting and
   formatting, CI/CD, deployment, API design and documentation, and Git / GitHub
   workflow) as a reusable reference.

### 1.2 Product Scope

**In scope:** one long-scroll page with a sticky table-of-contents sidebar,
containing a marketing hero, a project summary, a feature showcase, a suggested
roadmap, and a set of guide sections. Static hosting. No login, no server, no
database.

**Out of scope (project-wide):** authentication, any backend or API, a database,
a CMS or admin UI, internationalisation, a blog, comments, a contact form, real
analytics or user tracking, and A/B testing.

### 1.3 Definitions and Acronyms

| Term       | Meaning                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| SRS        | Software Requirements Specification                                    |
| FR         | Functional Requirement                                                 |
| NFR        | Non-Functional Requirement                                             |
| TOC        | Table of Contents (the in-page section navigation)                     |
| SSG        | Static Site Generation                                                 |
| OG         | Open Graph (social share metadata)                                     |
| CI / CD    | Continuous Integration / Continuous Delivery                           |
| RBAC       | Role-Based Access Control                                              |
| MSW        | Mock Service Worker (network mocking for tests)                        |
| R2         | Cloudflare R2 object storage                                           |
| Atlas      | MongoDB Atlas (managed MongoDB)                                        |

### 1.4 References

- **TechCart repository:** <https://github.com/Pravin671231/TechCart>
- **TechCart SRS:** `docs/srs/SRS.md` in that repository
- **TechCart architecture:** `docs/architecture.md` in that repository (its §10 is
  the live implementation-status source of truth)
- **TechCart guidance for AI agents:** `CLAUDE.md`, `AGENTS.md` at the repo root and
  one per workspace

All factual claims about TechCart on the landing page trace back to these sources.

---

## 2. Overall Description

### 2.1 Product Perspective

The landing page is a **self-contained static site**. It has no runtime
dependency on TechCart — it reads no live data and calls no TechCart API. It is
deployed as its own project (its own repository, its own Vercel project).

### 2.2 User Classes

| User class                  | Goal                                                                            | Primary sections                                        |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Recruiter / hiring manager  | Understand the scope and quality of TechCart in about a minute                 | Hero, Project Summary, Features                         |
| Prospective contributor     | Learn how the repo is structured and how to get a change merged                | Folder Architecture, CI/CD, Git & GitHub, Env Variables |
| Developer / learner         | Study the end-to-end engineering process as a template for their own projects  | All guide sections, read top to bottom                  |

### 2.3 Operating Environment

Modern evergreen browsers (last two versions of Chrome, Firefox, Safari, Edge) on
mobile and desktop. No IE. JavaScript enabled is assumed but the page must remain
readable and navigable with JavaScript disabled (progressive enhancement for
scroll-spy and the theme toggle).

### 2.4 Design and Implementation Constraints

- Built with **Astro + Tailwind CSS + TypeScript**; output is **static** (SSG).
- Deployed on **Vercel** (matches TechCart's frontend hosting).
- Node **24**, pinned via `.nvmrc` and `.node-version` (mirrors TechCart).
- Formatted with **Prettier**; linted with **ESLint**.
- **No secrets** in the repository or the shipped bundle.
- Accessibility target **WCAG 2.1 AA**.

### 2.5 Assumptions and Dependencies

- The public TechCart repository remains the single source of truth for all facts
  presented on the page.
- A Vercel account is available for deployment.
- Product screenshots may not be available; the design must work with abstract
  graphics as a fallback (see `LP-001` §10 Open Questions).

---

## 3. Feature Index

| Code | Feature       | Spec Doc                                | Milestone           | Status       |
| ---- | ------------- | --------------------------------------- | ------------------- | ------------ |
| LP   | Landing Page  | `features/LP-001-landing-page.md`       | M1 — Landing Page   | Spec drafted |

There is exactly one feature. Future additions (for example a standalone
multi-page guide) would be filed here as `LP-002`, `GUIDE-001`, and so on.

---

## 4. Feature SRS Template

Every feature document under `features/` uses this 10-section structure (adopted
from the TechCart SRS so the two projects stay consistent):

1. **Feature Overview** — purpose, audience, and success measures.
2. **Functional Requirements** — numbered `FR-<CODE>-<NNN>`, each with acceptance
   notes and, in this project, a content outline.
3. **Baseline Non-Functional Requirements** — accessibility, performance, SEO,
   responsiveness, security, maintainability, browser support. Numbered
   `NFR-<CODE>-<NNN>`.
4. **User Stories / Use Cases** — role-based narratives.
5. **Data Model / Content Contract** — data sources and shapes (no database here).
6. **UI/UX Requirements** — screens, sections, states, and interaction rules.
7. **Out of Scope** — explicit exclusions for this feature.
8. **Acceptance Criteria** — testable completion conditions.
9. **Dependencies** — upstream features and external services or tools.
10. **Open Questions** — unresolved decisions.

---

## 5. Traceability Matrix

The milestone roadmap is [`../milestone.md`](../milestone.md); the issue drafts
are [`../issues.md`](../issues.md). `LP-001` is delivered as six work-package
issues under milestone
[**M1 — Landing Page**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1):

| Feature | Milestone         | Issue | Requirements                                   | Status |
| ------- | ----------------- | ----- | -------------------------------------------- | ------ |
| LP-001  | M1 — Landing Page | [#1](https://github.com/Pravin671231/TechCart-Landing-page/issues/1) | scaffold & tooling (`LP-001` §2.4)        | Complete |
| LP-001  | M1 — Landing Page | [#2](https://github.com/Pravin671231/TechCart-Landing-page/issues/2) | `FR-LP-002,003,018,019`; `NFR-LP-001,006` | Complete |
| LP-001  | M1 — Landing Page | [#3](https://github.com/Pravin671231/TechCart-Landing-page/issues/3) | `FR-LP-001,004,005,006,007,020`           | Complete |
| LP-001  | M1 — Landing Page | [#4](https://github.com/Pravin671231/TechCart-Landing-page/issues/4) | `FR-LP-008,009,010,011`                   | Complete |
| LP-001  | M1 — Landing Page | [#5](https://github.com/Pravin671231/TechCart-Landing-page/issues/5) | `FR-LP-012,013,014,015,016,017`           | In progress |
| LP-001  | M1 — Landing Page | [#6](https://github.com/Pravin671231/TechCart-Landing-page/issues/6) | `NFR-LP-002,003,004,005,007`; deploy      | Open   |

Each issue's status moves Open → Complete as its PR squash-merges to `main`. The
full requirement-to-issue coverage table lives at the end of
[`../issues.md`](../issues.md).

---

## 6. Development Workflow

This project follows TechCart's five-step, spec-driven flow:

```
Feature Selection → SRS Update → Milestone Creation → Issue Filing → Code Implementation
```

| Step | Deliverable                                                        | Status update       |
| ---- | ----------------------------------------------------------------- | ------------------- |
| 1    | Decision to build the landing page                                | —                   |
| 2    | This SRS + `features/LP-001-landing-page.md`                       | "Spec drafted"      |
| 3    | Milestone [**M1 — Landing Page**](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1); roadmap in [`../milestone.md`](../milestone.md) | Feature indexed |
| 4    | Issues [#1–#6](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1) (drafts in [`../issues.md`](../issues.md)); branch `feature/<n>-<scope>` | "Issues open" |
| 5    | PR squash-merged to `main`; acceptance criteria validated          | "Complete (v1.0.0)" |

**Conventions (inherited from TechCart, adjusted for this repo):**

- Branches: `feature/<issue>-<scope>` → `main`, **squash-merge only**, branch
  protection on `main` (required CI, no direct pushes, linear history).
- Commits: Conventional Commits — `type(scope): message (Issue #N)`.
- Commit / PR attribution for AI-assisted work in **this** repo:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` on commits and
  `🤖 Generated with [Claude Code](https://claude.com/claude-code)` on PRs.
  (Note: the TechCart repo itself forbids AI co-author trailers — that rule is
  TechCart's, not this project's.)
- Planning: use the `discuss-plan-build` Claude Code skill for non-trivial changes.

---

## 7. Out of Scope (project-wide)

- User authentication or accounts
- Any backend service, API, or serverless function beyond static hosting
- A database or persistent storage
- A content-management system or in-browser content editing
- Internationalisation / multiple languages
- A blog, news feed, or changelog page
- Comments, reactions, or any user-generated content
- A contact form or email capture
- Real analytics, session recording, or behavioural tracking
- A/B testing or feature flags

---

## Appendix A — TechCart facts referenced by the landing page

Captured here so the feature spec and the eventual page copy stay consistent.
Source: TechCart `README.md`, `docs/architecture.md`, `CLAUDE.md`, `AGENTS.md`,
`.github/workflows/ci.yml`, and root configuration files, as of 2026-09-10.

### A.1 What TechCart is

A production-oriented, **India-first** e-commerce platform. An npm-workspaces
monorepo with a **flat structure** and three workspaces sharing **one** backend
API and **one** MongoDB database. Hosted only on **managed platforms** — no
self-managed infrastructure.

### A.2 Workspaces

| Workspace   | Stack                                                                                          | Hosting          |
| ----------- | -------------------------------------------------------------------------------------------- | ---------------- |
| `buyer-app` | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4; Zustand (cart) + Redux Toolkit / RTK Query (data); SSR/ISR | Vercel |
| `admin-app` | Vite 7, React 19, TypeScript, Tailwind CSS 4, React Router 7; SPA with RBAC                   | Vercel           |
| `backend`   | Node.js 24, Express 5, TypeScript, Zod, Mongoose / MongoDB Atlas                              | Render (Docker)  |

### A.3 External services

Razorpay (payments; whole rupees everywhere except the `payments` collection,
which uses integer paise — a single conversion boundary at payment time),
Cloudflare R2 (image storage; presigned direct upload with a backend-proxied
fallback), Mailtrap (email), MongoDB Atlas Search (catalog search), BullMQ
(background workers). **Redis / Upstash was removed** — rate limiting and caching
now use in-memory fallbacks.

### A.4 Data model — five core collections

| Collection            | Notes                                                                        |
| --------------------- | -------------------------------------------------------------------------- |
| `users`               | Buyer and admin accounts, `role` field for RBAC                             |
| `products` / `categories` | Indexed for Atlas Search; sellable variants embedded in products        |
| `carts`               | One per user/session; stock allocated per warehouse                         |
| `orders`              | State machine: `pending → paid → processing → shipped / cancelled / refunded` |
| `inventory`           | Stock tracked per `(variantId, warehouseId)`                                |

### A.5 Milestones

**Shipped:** M0 Foundation · M1 CI Pipeline · M2 Product Catalog · M3
Authentication (Google OAuth + OTP for buyers; password + mandatory OTP for
admins; **bearer-token sessions** after cross-domain cookie breakage) · M4
Shopping Cart · M5 Orders · M6 Payments (Razorpay + webhooks + refunds) · M7
Dashboard (aggregations with 60-second caching) · M10 Inventory.

**Open:** M8 / M9 — Backend / Frontend Non-Functional Requirements (performance,
security, error handling) · M11 — Launch Readiness.

### A.6 Repository layout (root)

Directories: `.claude/skills/`, `.github/`, `admin-app/`, `backend/`,
`buyer-app/`, `docker/`, `docs/`, `mock-ui/`.

Key files: `.node-version` and `.nvmrc` (both pin `24`), `.prettierrc`,
`eslint.config.ts` (flat config, `typescript-eslint`), `tsconfig.base.json`,
`package.json` (v0.1.0) + `package-lock.json` (with `overrides` for `postcss` and
`sharp`), `docker-compose.yml`, `render.yaml` (Render Blueprint), `.dockerignore`,
`.gitattributes`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`, `README.md`.

`.claude/skills/` contains `auto-commit-push`, `auto-pr-merge`,
`discuss-plan-build`, and `skill-creator` (among others).

### A.7 `backend/src` layout

`config/`, `externalService/`, `lib/`, `middleware/`, `modules/` (one folder per
feature), `routes/`, `scripts/` (seeding), `utils/`, `tests/`, plus `app.ts` and
`index.ts`. Every API response follows the envelope `{ success, code, message }`.

### A.8 CI — `.github/workflows/ci.yml`

Triggered on pull requests to `main`. `concurrency` with `cancel-in-progress`.
Three jobs:

- **lint** — `npm ci` then `npm run lint` over the whole repo.
- **test** — matrix over `[backend, buyer-app, admin-app]`; the `backend` leg
  caches `~/.cache/mongodb-binaries` and reads the `ATLAS_SEARCH_TEST_URI` secret;
  runs `npm run test --workspace <name>`.
- **build** — matrix over the same three; `buyer-app` builds with
  `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` set to dummy values.

All jobs use `actions/setup-node` with `node-version-file: .nvmrc` and `npm ci`.

### A.9 CD

Not in GitHub Actions. `backend` auto-deploys to **Render** from `render.yaml`
(built from `docker/Dockerfile.backend`) on merge to `main`; `buyer-app` and
`admin-app` auto-deploy natively on **Vercel** as two separate projects from the
one repository. Three isolated environments (development, staging, production),
each with its own Atlas cluster and its own Razorpay key pair.

### A.10 Environment variables (actual)

- **backend:** `MONGODB_URI`, `ADMIN_API_KEY`, five `R2_*` variables, Razorpay
  keys. Seeded from `backend/.env.example`.
- **buyer-app:** `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- The README's claim that the frontends declare no environment variables is stale
  — the CI workflow and the `.env.example` files show otherwise. The landing page
  presents the accurate picture.
