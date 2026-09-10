# LP-001 — TechCart Landing Page

**Feature code:** `LP`
**Milestone:** M1 — Landing Page
**Status:** Spec drafted (v0.1.0, 2026-09-10)
**Parent SRS:** [`../SRS.md`](../SRS.md)

---

## 1. Feature Overview

### 1.1 Purpose

A single public web page that presents **TechCart** as a product and, in the same
scroll, teaches the **engineering process** used to build and operate it. It is
both a portfolio piece and a reusable reference guide.

### 1.2 Audience

| Audience               | What they need from the page                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| Recruiter / reviewer   | A fast, credible picture of scope and quality; a link to the repo         |
| Prospective contributor | The repo's structure and the rules for getting a change merged           |
| Developer / learner    | A worked example of spec-driven, CI-backed, managed-platform delivery     |

### 1.3 Success Measures

- Every topic listed in §2 is present and populated **only** with facts traceable
  to the TechCart repository.
- Lighthouse ≥ 95 in all four categories (Performance, Accessibility, Best
  Practices, SEO).
- First contentful paint < 1.5 s and LCP < 2.0 s on a "Fast 3G" profile.
- Zero console errors or warnings on load.
- Fully operable with a keyboard alone; readable with CSS-only (no-JS) fallback.

---

## 2. Functional Requirements

Each requirement has an ID, an acceptance note, and a **content outline** listing
the points the section must cover. The outline is guidance for whoever writes the
final copy — it is not the final copy.

### Page shell and navigation

#### FR-LP-001 — Hero

**Acceptance:** Above the fold on a 1280×720 viewport: the product name, a
one-line pitch, a primary call-to-action linking to the GitHub repository, and a
secondary call-to-action that scrolls to the first guide section.

**Outline:**

- Product name: **TechCart**.
- Pitch: "Production, India-first e-commerce — a Next.js storefront and a React
  admin console on one Express + MongoDB API."
- Primary CTA → `https://github.com/Pravin671231/TechCart`.
- Secondary CTA → in-page anchor to **Project Summary**.
- Stat strip: `3 workspaces` · `10 milestones shipped` · `Node 24` · `Razorpay`.
- Visual: indigo → violet gradient background; honours `prefers-reduced-motion`.

#### FR-LP-002 — Sticky table-of-contents sidebar

**Acceptance:** On viewports ≥ 1024 px a sidebar lists every section as an anchor
link and stays visible while scrolling. Below 1024 px it collapses into an
"On this page" disclosure that is closed by default.

**Outline:**

- Section list is generated from a single data module (see §5) so it can never
  drift from the page content.
- Clicking a link smooth-scrolls to the section (instant jump when
  `prefers-reduced-motion` is set).

#### FR-LP-003 — Scroll-spy

**Acceptance:** As the reader scrolls, the TOC entry for the section currently in
view is visually marked as active. Implemented with `IntersectionObserver`;
degrades gracefully to a plain list without JavaScript.

### Product sections

#### FR-LP-004 — TechCart Project Summary

**Acceptance:** A prose section that lets a reader who knows nothing about
TechCart understand what it is and its current state in under a minute.

**Outline:**

- What it is: a production-oriented, India-first e-commerce platform.
- Philosophy: managed platforms only (Vercel, Render, MongoDB Atlas) — no
  self-managed infrastructure; built feature-by-feature against a versioned SRS.
- Shape: an npm-workspaces monorepo, flat structure, three workspaces
  (`buyer-app`, `admin-app`, `backend`) sharing **one** API and **one** database.
- Current status: M0–M7 and M10 shipped; M8 / M9 (non-functional requirements)
  and M11 (launch readiness) open.
- Links to TechCart's own `docs/srs/SRS.md` and `docs/architecture.md` (noting
  that §10 of the architecture doc is the live status source of truth).

#### FR-LP-005 — TechCart Features showcase

**Acceptance:** A responsive card grid, one card per shipped capability, each
tagged with its milestone. Cards reflow to a single column below 640 px with no
horizontal scroll.

**Outline (one card each):**

- **Product Discovery** — buyer search, category browsing, and faceted filtering
  on price / brand / category / variant / specification, with sorting; powered by
  MongoDB Atlas Search. *(M2)*
- **Catalog Management** — admin CRUD for brands, hierarchical categories,
  category-governed specifications and variant types, and products with embedded
  sellable variants. *(M2)*
- **Image Uploads** — presigned direct-to-R2 uploads with a backend-proxied
  fallback path. *(M2)*
- **Admin Search & Status Control** — search across all admin list views;
  dedicated status-update endpoints for products, categories, and brands. *(M2)*
- **Authentication** — Google OAuth and OTP sign-in for buyers; password plus
  mandatory OTP for admins; bearer-token sessions; RBAC guards. *(M3)*
- **Shopping Cart** — persistent per-buyer cart with live pricing and
  warehouse-scoped stock availability checks. *(M4)*
- **Orders** — address book, checkout, and a full order lifecycle state machine;
  buyer and admin order history. *(M5)*
- **Payments** — Razorpay integration, webhook handling, and refunds; paise
  boundary isolated to the `payments` collection. *(M6)*
- **Dashboard** — read-only sales and catalog aggregations with 60-second
  caching. *(M7)*
- **Inventory** — a fixed 2–3 warehouse set with stock tracked per
  `(variantId, warehouseId)` and allocated at cart time. *(M10)*
- **Containerised** — a `Dockerfile` per app plus a root `docker-compose.yml` for
  one-command local startup.
- **CI/CD** — GitHub Actions runs lint, test, and build on every PR; Render and
  Vercel deploy on merge to `main`.

#### FR-LP-006 — Suggested Features / roadmap

**Acceptance:** A visually distinct "Next up" section (checklist or kanban-style
board) separating in-flight milestone work from speculative product ideas.

**Outline:**

- **In flight (open milestones):**
  - M8 — backend non-functional requirements: performance budgets, `helmet`,
    CORS allowlist, rate limiting, structured error responses.
  - M9 — frontend non-functional requirements: Core Web Vitals budgets, error
    boundaries, accessibility pass.
  - M11 — launch readiness: final polish and deployment validation.
- **Product ideas (not yet specced):** reviews and ratings, wishlist, coupons and
  promotions, search autosuggest, personalised recommendations, multi-currency,
  PWA / installable storefront, returns / RMA flow, a seller portal, email / SMS
  order notifications, shipment tracking.

### Guide sections

#### FR-LP-007 — Tech Stack

**Acceptance:** Two tables. Table A covers the landing page's own stack with a
one-line rationale per row. Table B reproduces TechCart's per-layer stack.

**Outline — Table A (this landing page):**

| Concern      | Choice           | Why                                                        |
| ------------ | ---------------- | -------------------------------------------------------- |
| Framework    | Astro            | Content-heavy page; ships near-zero JavaScript            |
| Styling      | Tailwind CSS     | Fast, consistent, small production CSS                    |
| Language     | TypeScript       | Type-safe data modules; matches TechCart                  |
| Rendering    | Static (SSG)     | Best possible load performance and SEO                    |
| Hosting      | Vercel           | Same platform as TechCart's frontends; zero-config deploy |
| Runtime      | Node 24          | Pinned via `.nvmrc` / `.node-version`, mirrors TechCart   |
| Formatting   | Prettier         | Removes style debate; `--check` in CI                     |

**Outline — Table B (TechCart):** Buyer Storefront → Next.js 16 (App Router),
React 19, TypeScript, Tailwind CSS 4. Admin Console → Vite 7, React 19,
TypeScript, Tailwind CSS 4, React Router 7. Backend API → Node.js 24, Express 5,
TypeScript, Zod. Database → MongoDB (Mongoose, Atlas). File Storage → Cloudflare
R2. Testing → Vitest, React Testing Library, MSW, Supertest. DevOps → Docker,
GitHub Actions, Render, Vercel.

#### FR-LP-008 — How to Handle Claude Code

**Acceptance:** A section with two clearly separated parts — **Skills** and
**Rules** — each with at least one concrete example drawn from the TechCart repo.

**Outline — Skills:**

- What a skill is: a packaged set of instructions for a recurring task, invoked by
  name or as a `/slash` command; the model loads the instructions and follows
  them in place of its default approach.
- Where they live: `.claude/skills/<name>/SKILL.md`.
- Skill anatomy: YAML frontmatter with `name` and a `description` that contains
  the **trigger phrases** the model matches against; optional `allowed-tools`;
  the body is the instruction set; supporting files can sit alongside.
- The skills in the TechCart repo and what each is for:
  - `auto-commit-push` — stage, commit, and push the working tree in one pass, no
    confirmation gates.
  - `auto-pr-merge` — open a PR from the current branch, wait for CI, squash-merge
    to `main`, delete the branch, sync local `main`.
  - `discuss-plan-build` — discuss and confirm requirements, write a step-by-step
    plan, confirm it, then execute against a live task checklist.
  - `skill-creator` — scaffold and refine new skills.
- Creating one: run `skill-creator`, describe the task and its trigger phrases,
  keep the instruction body short and imperative.
- When a skill beats a plain prompt: the task is repeated, multi-step, and has a
  fixed correct sequence (release steps, review checklists, repo-specific flows).

**Outline — Rules:**

- `CLAUDE.md` at the repo root: always-on project context (what the project is,
  invariants, conventions). Keep it short and factual.
- Scoped `CLAUDE.md` per directory (for example `backend/CLAUDE.md`): the
  most-specific file wins, so put workspace-specific rules there.
- `AGENTS.md`: the cross-tool equivalent of `CLAUDE.md`; TechCart keeps both at
  the root and per workspace.
- `.claude/settings.json`: permissions (allow / deny tool calls) and **hooks**.
  Any "whenever X happens, do Y" automation is a **hook** — the harness runs it,
  not the model — so it cannot be expressed as a prose rule.
- Writing good rules: imperative voice, one rule per line, each rule verifiable,
  show an example instead of describing one, delete rules that go stale.
- Example rule block for TechCart:
  - Commits use Conventional Commits with an issue reference:
    `type(scope): message (Issue #N)`.
  - The backend is the single validation authority; frontend validation is UX
    convenience only.
  - Every API response is `{ success, code, message }`.
  - Merge to `main` by squash only; never push to `main` directly.

#### FR-LP-009 — Folder Architecture

**Acceptance:** An annotated tree of the TechCart monorepo root and of
`backend/src`, plus a subsection on enforcing structure with Claude Code.

**Outline:**

- Root tree: `.claude/skills/`, `.github/`, `admin-app/`, `backend/`,
  `buyer-app/`, `docker/`, `docs/`, `mock-ui/`, and the root config files
  (`.nvmrc`, `.node-version`, `.prettierrc`, `eslint.config.ts`,
  `tsconfig.base.json`, `package.json`, `package-lock.json`, `docker-compose.yml`,
  `render.yaml`, `CLAUDE.md`, `AGENTS.md`, `README.md`).
- `backend/src` tree: `config/`, `externalService/`, `lib/`, `middleware/`,
  `modules/`, `routes/`, `scripts/`, `utils/`, `tests/`, `app.ts`, `index.ts`.
- The **feature-module pattern**: each feature is a folder under `modules/`
  holding its route, controller, service, Zod schema, and tests together.
- Why a flat npm-workspaces monorepo (from TechCart's `architecture.md`): matches
  the sibling LeafFlow project; simpler than pnpm + Turborepo; no shared
  `packages/` directory, to keep the build to three workspaces.
- **Enforcing it with Claude Code:**
  - A scoped `backend/CLAUDE.md` that describes the module layout.
  - A rule: "when adding a feature, create `modules/<name>/` with
    `<name>.routes.ts`, `<name>.controller.ts`, `<name>.service.ts`,
    `<name>.schema.ts`, and `<name>.test.ts`."
  - Optionally an ESLint `no-restricted-imports` rule or a hook that checks new
    files land in an allowed path.
  - A PR-checklist item: "new code follows the feature-module layout."

#### FR-LP-010 — `.node-version` and `.nvmrc`

**Acceptance:** Explains what each file is, which tools read it, why the project
pins a version, and the commands to switch.

**Outline:**

- `.nvmrc` is read by `nvm` (`nvm use`). `.node-version` is read by `nodenv`,
  `asdf`, `fnm`, `volta` and others (`fnm use`, `nodenv install`). TechCart ships
  both, each containing `24`.
- Why pin: development, CI, and production all run the same Node major, so
  "works on my machine" bugs from version drift disappear. TechCart's CI reads
  `node-version-file: .nvmrc`; Vercel and Render honour these files too.
- Best practice: commit both files; keep them in sync; pin at least the major
  version; bump the version through a normal PR so CI validates it.

#### FR-LP-011 — Environment Variables (`.env`)

**Acceptance:** Covers development, testing / CI, and production separately, then
lists security best practices. Uses TechCart's real variables as examples.

**Outline — per tier:**

- **Development:** copy `backend/.env.example` to `backend/.env` (git-ignored);
  fill in `MONGODB_URI` (local `mongod` or an Atlas dev cluster), `ADMIN_API_KEY`,
  and the five `R2_*` values. `buyer-app` needs `NEXT_PUBLIC_API_URL` and
  `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- **Testing / CI:** no real secrets in the repo. Real test secrets are GitHub
  Actions **Secrets** (TechCart uses `ATLAS_SEARCH_TEST_URI`). Build-time values
  that are not sensitive are set inline in the workflow (for example
  `NEXT_PUBLIC_API_URL=http://localhost:4000`, a dummy `NEXT_PUBLIC_GOOGLE_CLIENT_ID`).
- **Production:** set in the Vercel and Render dashboards, per environment. Each
  environment (dev / staging / prod) has its own Atlas cluster and its own
  Razorpay key pair, so a leak or mistake in one cannot touch another.

**Outline — best practices:**

- Commit only `.env.example`; never commit a real `.env`.
- Anything prefixed `PUBLIC_` (Astro) or `NEXT_PUBLIC_` (Next.js) is shipped to
  the browser — never put a secret behind those prefixes.
- Least privilege per key; rotate on a schedule and on staff changes.
- Distinct secret values per environment.
- Validate required environment variables at process start (Zod) so a missing
  variable fails fast and loudly.
- For a team, use a secrets manager rather than sharing `.env` files.

#### FR-LP-012 — Frontend API Request & Response Debugging

**Acceptance:** Lists the tools, shows how to read TechCart's error envelope, and
gives a table of common failures with fixes plus a step-by-step triage flow.

**Outline — tools:**

- Browser DevTools **Network** tab: status code, timing waterfall, request and
  response headers, request payload and response body, the `Fetch/XHR` filter,
  "Preserve log" across navigations, and "Copy as cURL" to replay a request
  outside the app.
- **RTK Query / React Query devtools:** inspect cache entries, tags, and refetch
  triggers.
- **MSW:** reproduce a failing response deterministically in a test.

**Outline — reading responses:** every TechCart response is
`{ success, code, message }`. On failure, branch UI on `code` (a stable string),
show `message` only as a fallback, and never parse `message` for logic.

**Outline — common issues:**

| Symptom                          | Likely cause                                                                 | Fix                                                                        |
| -------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Request blocked, no response     | CORS — origin not on the backend allowlist                                   | Add the origin to the backend CORS config (the class of bug TechCart hit) |
| 401 after a successful login     | Bearer token from the `set-auth-token` response header not stored / not resent | Persist it client-side; resend as `Authorization: Bearer <token>`         |
| Auth works locally, fails in prod | Cross-domain cookies dropped (Vercel ↔ Render)                               | Use the bearer-token path, as TechCart does                               |
| 404 on every call                | Wrong `NEXT_PUBLIC_API_URL` / base URL for the environment                    | Check the environment's value; log the resolved base URL once at boot     |
| Stale data after a mutation      | RTK Query cache not invalidated                                              | Tag the query and invalidate the tag in the mutation                      |
| 422 with a validation error      | Request body shape does not match the backend Zod schema                     | Compare the payload to the schema; fix the client serializer             |
| Slow page, many sequential calls | Request waterfall / N+1                                                      | Parallelise independent calls; add a batch endpoint if needed             |

**Outline — triage flow:** reproduce → replay with cURL or Postman to isolate
frontend vs backend → inspect the request (URL, method, headers, body) → inspect
the response (status, `code`, body) → check the environment values → check the
auth header → apply the fix and re-run.

#### FR-LP-013 — ESLint, Prettier, and `package-lock.json`

**Acceptance:** One subsection each, stating what it is, how it is configured in
TechCart, and why it matters.

**Outline:**

- **ESLint** — `eslint.config.ts` flat config with `typescript-eslint`. Catches
  bugs and anti-patterns, enforces consistency. Runs in CI as `npm run lint` and
  ideally as a pre-commit hook. Per-workspace configs extend the root config.
  *Why:* mechanical review feedback caught before a human reads the diff.
- **Prettier** — `.prettierrc`. Formatting only. Run on save in the editor and as
  `prettier --check` in CI. Kept in a separate lane from ESLint (no
  `eslint-plugin-prettier`) so the two tools do not fight. *Why:* zero time spent
  arguing about formatting in review.
- **`package-lock.json`** — the exact, fully resolved dependency tree. **Always
  commit it.** CI installs with `npm ci`, which fails if the lockfile and
  `package.json` disagree, guaranteeing reproducible installs. TechCart pins
  `overrides` for `postcss` and `sharp`, resolved through the lockfile. Never
  hand-edit it; resolve merge conflicts by re-running `npm install`. *Why:* every
  machine and every CI run builds against identical dependency versions.

#### FR-LP-014 — CI Pipeline and CD Pipeline

**Acceptance:** Walks through TechCart's `ci.yml`, explains why CD is not in
GitHub Actions, and states a recommended approach.

**Outline — CI setup:**

- Trigger: `pull_request` to `main`, with `concurrency` + `cancel-in-progress` so
  a new push supersedes an in-flight run.
- Job **lint**: `npm ci`, then `npm run lint` across the repo.
- Job **test**: matrix over `[backend, buyer-app, admin-app]`; the `backend` leg
  caches `~/.cache/mongodb-binaries` and uses the `ATLAS_SEARCH_TEST_URI` secret;
  each leg runs `npm run test --workspace <name>`.
- Job **build**: matrix over the same three; `buyer-app` builds with dummy
  `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- All jobs pin Node with `node-version-file: .nvmrc` and install with `npm ci`.
- These three checks are marked **required** in branch protection, so `main` only
  ever receives green code.

**Outline — why CD is separate:**

- Render (via the `render.yaml` Blueprint) and Vercel both watch the repository
  and deploy on merge to `main` themselves.
- Putting deployment into GitHub Actions would duplicate that, require storing
  platform deploy tokens in CI, and give up the platforms' automatic per-PR
  preview deploys.
- So CD is intentionally **not** a GitHub Actions job — it is owned by the
  hosting platforms.

**Outline — recommended approach:** keep CI in GitHub Actions minimal and fast
(lint + test + build on every PR); let the managed platform own CD through its
native git integration.

#### FR-LP-015 — Deployment

**Acceptance:** Describes how TechCart deploys, lists deployment best practices,
and states how this landing page deploys.

**Outline — TechCart:**

- `backend` → Render as a Docker service, built from `docker/Dockerfile.backend`
  via the repo-root `render.yaml` Blueprint; deploys on merge to `main`.
- `buyer-app` and `admin-app` → Vercel, as two separate projects from the one
  repository, each with its project root directory set to the workspace folder;
  deploy on git push, with preview deployments per PR.
- Three isolated environments (development, staging, production), each with its
  own Atlas cluster and Razorpay key pair.
- Full local stack: `docker compose up --build` brings all three apps up on
  ports 4000 / 3000 / 5173.

**Outline — best practices:** immutable build artifacts; environment parity;
health-check endpoints; database seed / migration scripts kept in the repo
(`backend/src/scripts`); one-click rollback through the platform; preview deploys
for every PR; DNS and TLS managed by the platform.

**Outline — this landing page:** `astro build` produces a static `dist/`; Vercel
auto-detects the Astro framework preset and needs no configuration; add a
`vercel.json` only for custom headers or redirects. Any static host works as a
fallback.

#### FR-LP-016 — API Design and Documentation

**Acceptance:** Covers design principles, why documentation matters, and how to
use Postman (with an OpenAPI alternative).

**Outline — design principles (from TechCart):**

- RESTful resource routes under `backend/src/routes`, with logic in feature
  `modules/`.
- Zod schemas are the single validation authority; the frontends do their own
  checks for UX only.
- Uniform error envelope: `{ success, code, message }`.
- Dedicated status-update endpoints rather than overloading a generic update.
- Deterministic pagination — order by the sort key with `_id` as the tie-breaker.
- Money in whole rupees everywhere except the `payments` collection (integer
  paise), converted once at payment time.

**Outline — why documentation matters:** the API is the contract between the
backend and two frontends plus any future consumer; good docs cut onboarding
time, double as test fixtures, and reduce "go read the code" support requests.

**Outline — Postman:**

- One collection per feature (TechCart already keeps Postman documentation for
  each shipped feature).
- Collection / environment variables for the base URL and the auth token.
- Save example responses against each request.
- Run the collection in CI with `newman` as a lightweight contract test.
- Publish the collection or export the JSON into the repository.
- **Alternative:** generate an OpenAPI document from the Zod schemas
  (`zod-to-openapi`) and serve Swagger UI.

#### FR-LP-017 — Git, GitHub, and GitHub Actions

**Acceptance:** Covers branching, commits, pull requests, repository management,
and GitHub Actions, using TechCart's `ci.yml` as the worked example.

**Outline — branching:** trunk-based on `main`; short-lived branches named
`feature/<issue>-<scope>`; **squash-merge only**; branch protection on `main`
(required CI checks, no direct pushes, linear history).

**Outline — commits:** Conventional Commits — `type(scope): message (Issue #N)`;
small, atomic, imperative-mood messages.

**Outline — pull requests:** one issue per PR; the description links the issue and
the relevant SRS section; CI green and review required before merge; delete the
branch after merge; keep PRs small enough to review in one sitting.

**Outline — repository management:** issues tied to milestones (M0–M11); a label
scheme; `docs/` treated as a living specification; an optional `CODEOWNERS` file;
semantic-version tags on release.

**Outline — GitHub Actions:** anatomy — a workflow is triggered by **events**,
contains **jobs**, jobs contain **steps**, jobs can fan out with a **matrix**,
secrets are injected via `secrets.*`, dependency caches via `actions/cache`, and
`concurrency` cancels superseded runs. Point at `ci.yml` for each of these.
Other automation worth adding: a stale-issue bot, a labeler, a release-drafter,
`newman` contract tests, and Lighthouse CI on this landing page.

### Content affordances

#### FR-LP-018 — Copy buttons

**Acceptance:** Every code block has a "copy" control that copies the block's raw
text to the clipboard and confirms visually. Keyboard-focusable.

#### FR-LP-019 — Theme toggle

**Acceptance:** A control toggles light and dark themes. The initial theme
follows `prefers-color-scheme`; an explicit choice is persisted (localStorage)
and survives reload. Both palettes meet AA contrast.

#### FR-LP-020 — Footer / Get Started

**Acceptance:** A closing section with a copy-pasteable quickstart and a link
list.

**Outline:**

- Quickstart (from TechCart's README): `git clone`, `cd TechCart`, `npm install`,
  `cp backend/.env.example backend/.env`, then `npm run dev --workspace <name>`
  for each app — or `docker compose up --build`.
- Links: the repository, TechCart's `docs/srs/SRS.md`, its `docs/architecture.md`,
  and the per-workspace `CLAUDE.md` files.
- Credit line and the "built with Astro, deployed on Vercel" note.

---

## 3. Baseline Non-Functional Requirements

- **NFR-LP-001 — Accessibility.** WCAG 2.1 AA. Full keyboard navigation; a
  visible focus indicator on every interactive element; a skip-to-content link;
  `prefers-reduced-motion` respected (no non-essential animation); text and UI
  contrast meet AA.
- **NFR-LP-002 — Performance.** Static output; near-zero client JavaScript (only
  scroll-spy and the theme toggle). Lighthouse Performance ≥ 95. LCP < 2.0 s on
  Fast 3G. Cumulative Layout Shift < 0.1. All images sized and lazy-loaded below
  the fold.
- **NFR-LP-003 — SEO.** One `<h1>`; a correct heading outline; a meta description;
  Open Graph and Twitter-card tags; a `sitemap.xml`; a canonical URL.
- **NFR-LP-004 — Responsive.** Usable from 320 px to 1920 px with no horizontal
  page scroll. Wide tables and code blocks scroll inside their own container.
- **NFR-LP-005 — Security / privacy.** No secrets in the repository or the bundle.
  No third-party trackers or analytics. External links carry
  `rel="noopener noreferrer"`.
- **NFR-LP-006 — Maintainability.** The section list and the TechCart fact set
  each live in exactly one data module, imported everywhere they are used, so the
  navigation and the prose cannot fall out of sync.
- **NFR-LP-007 — Browser support.** The last two versions of Chrome, Firefox,
  Safari, and Edge. No Internet Explorer.

---

## 4. User Stories / Use Cases

- **As a recruiter,** I open the page, read the hero, the summary, and the
  feature grid, and within a minute I have a clear picture of scope and quality
  and a link to the repository.
- **As a prospective contributor,** I use the TOC to jump straight to Folder
  Architecture, CI/CD, and Git & GitHub, and I come away knowing how the repo is
  laid out and how to get a change merged.
- **As a developer / learner,** I read every guide section top to bottom on my
  phone during a commute and use it as a template for my own project.
- **As the maintainer,** I add a new TechCart feature by editing one data module,
  and the feature card and any references update consistently.

---

## 5. Data Model / Content Contract

There is **no database and no API**. Content comes from two committed data
modules:

| Module          | Contents                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `toc` data      | Ordered list of `{ id, title }` for every section — the single source for the sidebar and anchors |
| `techcart` data | Structured facts: stack rows, milestone list, data-model rows, feature list                        |

Every fact in `techcart` data traces to a named source in the TechCart repository
(`README.md`, `docs/architecture.md`, `.github/workflows/ci.yml`, or a root config
file), recorded as a comment next to the value. There is no user-generated
content and nothing is persisted at runtime.

---

## 6. UI/UX Requirements

### 6.1 Section order (identical to TOC order)

1. Hero
2. TechCart Project Summary
3. Features
4. Suggested Features
5. Tech Stack
6. How to Handle Claude Code
7. Folder Architecture
8. `.node-version` and `.nvmrc`
9. Environment Variables
10. Frontend API Debugging
11. ESLint, Prettier & `package-lock.json`
12. CI & CD Pipelines
13. Deployment
14. API Design & Documentation
15. Git, GitHub & GitHub Actions
16. Get Started / Footer

### 6.2 Layout and interaction

- Sticky TOC sidebar on desktop; an "On this page" disclosure (closed by default)
  below 1024 px.
- Hero: indigo → violet gradient; primary and secondary CTAs.
- Cards: rounded corners, subtle border, a small hover lift (suppressed under
  `prefers-reduced-motion`).
- Code blocks: terminal-style, monospace, horizontal scroll inside the block, a
  copy button top-right.
- Callouts: three styles — note, warning, tip — each with an icon and a coloured
  left border.
- Section entrance: a short fade / slide-up, disabled under
  `prefers-reduced-motion`.
- Light and dark palettes, both meeting AA contrast; toggle per FR-LP-019.

---

## 7. Out of Scope

- A CMS or any in-browser content editing
- In-page search
- Comments or reactions
- Multiple languages
- A blog or changelog
- A contact form or any backend
- Real analytics or behavioural tracking
- A/B testing or feature flags
- Auth-gated content

---

## 8. Acceptance Criteria

1. Every `FR-LP-###` section is present and populated only with facts traceable
   to the TechCart repository.
2. Every TOC link smooth-scrolls to the correct section; scroll-spy marks the
   section in view.
3. No horizontal page scroll at 320, 768, 1280, and 1920 px widths.
4. The theme toggle switches light / dark, and an explicit choice survives a
   reload.
5. Every code block has a working copy button.
6. `astro build`, `astro check`, and `prettier --check .` all pass with no
   errors.
7. Lighthouse scores ≥ 95 in Performance, Accessibility, Best Practices, and SEO
   on the deployed page.
8. The page is fully operable with a keyboard alone; content is readable with
   JavaScript disabled.
9. Every external link resolves (repository, TechCart SRS, TechCart architecture
   doc, per-workspace `CLAUDE.md`).
10. All seventeen requested guide topics (see the parent SRS §1.1 and the
    requirements above) map to a specific `FR-LP-###`.

---

## 9. Dependencies

- **Build / runtime:** Astro, Tailwind CSS, TypeScript, Node 24, Prettier,
  ESLint; optionally `@astrojs/vercel`.
- **Content source:** the public TechCart repository.
- **Hosting:** a Vercel account (or any static host).
- **Process:** the `discuss-plan-build` Claude Code skill for planning the build.

---

## 10. Open Questions

- Are TechCart product screenshots available to embed, or should the design use
  abstract graphics only?
- Custom domain, or the default Vercel URL?
- Should the landing-page repository include its own Lighthouse-CI GitHub Action?
- Should the guide sections later be split into standalone `/guide/*` pages, or
  stay single-scroll only?
- Should the page display live GitHub repository stats (stars, last commit), which
  would add one build-time fetch, or stay fully static?
