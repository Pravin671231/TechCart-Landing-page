/**
 * Structured content for the engineering-process guide sections (issues #4–#5).
 * Every value traces to `docs/srs/SRS.md` Appendix A or the LP-001 §2 outline
 * cited beside it — nothing here is invented.
 */

export interface Skill {
  name: string;
  purpose: string;
}

// LP-001 FR-LP-008 — the skills in the TechCart repo's .claude/skills/.
export const SKILLS: readonly Skill[] = [
  {
    name: 'auto-commit-push',
    purpose: 'Stage, commit and push the working tree in one pass — no confirmation gates.',
  },
  {
    name: 'auto-pr-merge',
    purpose:
      'Open a PR from the current branch, wait for CI, squash-merge to main, delete the branch, sync local main.',
  },
  {
    name: 'discuss-plan-build',
    purpose:
      'Discuss and confirm requirements, write a step-by-step plan, confirm it, then execute against a live task checklist.',
  },
  { name: 'skill-creator', purpose: 'Scaffold and refine new skills.' },
];

// LP-001 FR-LP-008 — SKILL.md anatomy (illustrative).
export const SKILL_FRONTMATTER = `---
name: deploy-web
description: >-
  Deploy the web app to staging. Use when the user says "deploy",
  "ship it", or "push to staging".
allowed-tools: Bash, Read
---

1. Run the test suite; stop if it fails.
2. Build the production bundle.
3. Upload to the staging bucket and print the URL.`;

export interface DirNote {
  path: string;
  note: string;
}

// SRS Appendix A.6 — repository root.
export const ROOT_TREE = `TechCart/
├── .claude/skills/       # packaged, repo-specific workflows
├── .github/              # CI workflow (ci.yml)
├── admin-app/            # Vite + React admin console
├── backend/              # Node + Express API (the business-logic authority)
├── buyer-app/            # Next.js storefront
├── docker/               # per-app Dockerfiles
├── docs/                 # SRS, architecture, milestone/issue tracking
├── mock-ui/              # design references / wireframes
├── .node-version         # Node pin for nodenv / asdf / fnm / volta
├── .nvmrc                # Node pin for nvm
├── .prettierrc
├── eslint.config.ts      # flat config, typescript-eslint
├── tsconfig.base.json    # shared compiler options
├── package.json          # npm workspaces (root)
├── package-lock.json     # committed; overrides for postcss + sharp
├── docker-compose.yml    # one-command local stack
├── render.yaml           # Render Blueprint for the backend
├── AGENTS.md  CLAUDE.md  # agent guidance (root)
└── README.md`;

export const ROOT_DIR_NOTES: readonly DirNote[] = [
  {
    path: 'admin-app/ · buyer-app/ · backend/',
    note: 'The three npm workspaces. One shared API, one shared database.',
  },
  {
    path: '.claude/skills/',
    note: 'auto-commit-push, auto-pr-merge, discuss-plan-build, skill-creator (among others).',
  },
  {
    path: 'docs/',
    note: 'The living spec — docs/srs/SRS.md is the source of truth; docs/architecture.md §10 tracks status.',
  },
  {
    path: 'docker/ + docker-compose.yml',
    note: 'A Dockerfile per app; "docker compose up --build" brings all three up locally.',
  },
  {
    path: 'render.yaml',
    note: "Render Blueprint — the backend's deploy config lives in the repo, not a dashboard.",
  },
];

// SRS Appendix A.7 — backend/src.
export const BACKEND_SRC_TREE = `backend/src/
├── config/           # env parsing, app configuration
├── externalService/  # Razorpay, Cloudflare R2, Mailtrap clients
├── lib/              # shared helpers (no feature logic)
├── middleware/       # auth guards, error handler, rate limiting
├── modules/          # one folder per feature (see below)
├── routes/           # route registration, wiring modules to paths
├── scripts/          # database seeding
├── utils/            # small pure utilities
├── tests/            # cross-cutting test helpers
├── app.ts            # builds the Express app
└── index.ts          # process entrypoint`;

export const BACKEND_DIR_NOTES: readonly DirNote[] = [
  {
    path: 'modules/',
    note: 'Where feature code lives. Each feature is self-contained — see the feature-module pattern.',
  },
  {
    path: 'middleware/',
    note: 'Every response leaves through the shared error handler as { success, code, message }.',
  },
  {
    path: 'config/',
    note: 'Environment variables are parsed and validated here at process start.',
  },
  {
    path: 'externalService/',
    note: 'The only place third-party SDKs are imported — features depend on these wrappers, not the SDKs.',
  },
];

// LP-001 FR-LP-009 — the feature-module pattern.
export const FEATURE_MODULE_TREE = `backend/src/modules/orders/
├── orders.routes.ts      # path + method definitions
├── orders.controller.ts  # request / response handling
├── orders.service.ts     # business logic
├── orders.schema.ts      # Zod schemas — the validation authority
└── orders.test.ts        # Vitest + Supertest`;

// LP-001 FR-LP-008 — a sample rule block for TechCart's CLAUDE.md (plain text).
export const TECHCART_RULES: readonly string[] = [
  'Commits use Conventional Commits with an issue reference: type(scope): message (Issue #N).',
  'The backend is the single validation authority; frontend validation is UX convenience only.',
  'Every API response is { success, code, message }.',
  'Merge to main by squash only; never push to main directly.',
];

export interface NodeTool {
  file: string;
  readBy: string;
  command: string;
}

// LP-001 FR-LP-010. Both files contain the line "24".
export const NODE_TOOLS: readonly NodeTool[] = [
  { file: '.nvmrc', readBy: 'nvm', command: 'nvm use' },
  {
    file: '.node-version',
    readBy: 'nodenv, asdf, fnm, volta',
    command: 'fnm use  ·  nodenv install',
  },
];

export interface EnvVar {
  name: string;
  scope: 'backend' | 'buyer-app';
  purpose: string;
}

// SRS Appendix A.10 — the actual environment variables.
export const ENV_VARS: readonly EnvVar[] = [
  {
    name: 'MONGODB_URI',
    scope: 'backend',
    purpose: 'Connection string (local mongod or an Atlas cluster).',
  },
  { name: 'ADMIN_API_KEY', scope: 'backend', purpose: 'Shared key guarding admin-only endpoints.' },
  {
    name: 'R2_* (five variables)',
    scope: 'backend',
    purpose: 'Cloudflare R2 account, bucket, keys and endpoint.',
  },
  {
    name: 'Razorpay keys',
    scope: 'backend',
    purpose: 'Payment gateway credentials — a distinct pair per environment.',
  },
  {
    name: 'NEXT_PUBLIC_API_URL',
    scope: 'buyer-app',
    purpose: 'Base URL of the backend API. Shipped to the browser.',
  },
  {
    name: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    scope: 'buyer-app',
    purpose: 'Google OAuth client id. Shipped to the browser.',
  },
];

// LP-001 FR-LP-011 — security best practices (plain text).
export const ENV_BEST_PRACTICES: readonly string[] = [
  'Commit only .env.example; never commit a real .env.',
  'Anything prefixed PUBLIC_ (Astro) or NEXT_PUBLIC_ (Next.js) is shipped to the browser — never put a secret there.',
  'Least privilege per key; rotate on a schedule and whenever someone leaves.',
  'Use distinct secret values per environment — dev, staging and production never share credentials.',
  'Validate required variables at process start (Zod) so a missing value fails fast and loudly.',
  'For a team, use a secrets manager rather than passing .env files around.',
];

/* ---------------------------------------------------------------------------
 * Issue #5 — engineering & delivery
 * ------------------------------------------------------------------------- */

export interface ApiFailure {
  symptom: string;
  cause: string;
  fix: string;
}

// LP-001 FR-LP-012 — common failures table (verbatim from the spec).
export const API_FAILURES: readonly ApiFailure[] = [
  {
    symptom: 'Request blocked, no response',
    cause: 'CORS — the origin is not on the backend allowlist',
    fix: 'Add the origin to the backend CORS config (the class of bug TechCart hit)',
  },
  {
    symptom: '401 after a successful login',
    cause: 'Bearer token from the set-auth-token response header not stored or not resent',
    fix: 'Persist it client-side; resend it as Authorization: Bearer <token>',
  },
  {
    symptom: 'Auth works locally, fails in production',
    cause: 'Cross-domain cookies dropped between the Vercel front end and the Render backend',
    fix: 'Use the bearer-token path, as TechCart does',
  },
  {
    symptom: '404 on every call',
    cause: 'Wrong NEXT_PUBLIC_API_URL / base URL for the environment',
    fix: "Check the environment's value; log the resolved base URL once at boot",
  },
  {
    symptom: 'Stale data after a mutation',
    cause: 'The RTK Query cache was not invalidated',
    fix: 'Tag the query and invalidate the tag in the mutation',
  },
  {
    symptom: '422 with a validation error',
    cause: 'The request body shape does not match the backend Zod schema',
    fix: 'Compare the payload to the schema; fix the client serializer',
  },
  {
    symptom: 'Slow page, many sequential calls',
    cause: 'Request waterfall / N+1',
    fix: 'Parallelise independent calls; add a batch endpoint if needed',
  },
];

// LP-001 FR-LP-012 — triage flow.
export const API_TRIAGE: readonly string[] = [
  'Reproduce the failure reliably.',
  'Replay the request with cURL or Postman to isolate the front end from the back end.',
  'Inspect the request — URL, method, headers, body.',
  'Inspect the response — status, code, body.',
  'Check the environment values (base URL, keys).',
  'Check the Authorization header is present and correct.',
  'Apply the fix and re-run.',
];

// SRS Appendix A.8 — the real ci.yml, trimmed for display.
export const CI_YML = `name: CI

on:
  pull_request:
    branches: [main]

concurrency:
  group: ci-\${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        workspace: [backend, buyer-app, admin-app]
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - if: matrix.workspace == 'backend'
        uses: actions/cache@v4
        with: { path: ~/.cache/mongodb-binaries, key: mongodb-\${{ runner.os }} }
      - run: npm run test --workspace \${{ matrix.workspace }}
        env:
          ATLAS_SEARCH_TEST_URI: \${{ secrets.ATLAS_SEARCH_TEST_URI }}

  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        workspace: [backend, buyer-app, admin-app]
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - run: npm run build --workspace \${{ matrix.workspace }}
        env:            # buyer-app only
          NEXT_PUBLIC_API_URL: http://localhost:4000
          NEXT_PUBLIC_GOOGLE_CLIENT_ID: dummy-client-id`;

export interface ToolFact {
  name: string;
  what: string;
  techcart: string;
  why: string;
}

// LP-001 FR-LP-013.
export const CODE_TOOLS: readonly ToolFact[] = [
  {
    name: 'ESLint',
    what: 'A linter that catches bugs and anti-patterns and enforces consistency.',
    techcart:
      'A flat config in eslint.config.ts with typescript-eslint; per-workspace configs extend the root. Runs in CI as "npm run lint" and ideally as a pre-commit hook.',
    why: 'Mechanical review feedback is caught before a human reads the diff.',
  },
  {
    name: 'Prettier',
    what: 'A formatter — it rewrites code to one canonical style. Formatting only, no lint rules.',
    techcart:
      'Configured in .prettierrc. Run on save in the editor and as "prettier --check" in CI. Kept in a separate lane from ESLint (no eslint-plugin-prettier) so the two tools never fight.',
    why: 'No time is spent arguing about formatting in review.',
  },
  {
    name: 'package-lock.json',
    what: 'The exact, fully resolved dependency tree — every transitive version, pinned.',
    techcart:
      'Committed. CI installs with "npm ci", which fails if the lockfile and package.json disagree. TechCart pins overrides for postcss and sharp, resolved through the lockfile. Never hand-edited; merge conflicts are resolved by re-running npm install.',
    why: 'Every machine and every CI run builds against identical dependency versions.',
  },
];

// LP-001 FR-LP-015 — deployment best practices.
export const DEPLOY_BEST_PRACTICES: readonly string[] = [
  'Immutable build artifacts — the thing tested is the thing deployed.',
  'Environment parity — dev, staging and production differ only in configuration.',
  'Health-check endpoints the platform can poll.',
  'Database seed and migration scripts kept in the repo (backend/src/scripts).',
  'One-click rollback through the platform.',
  'A preview deployment for every pull request.',
  'DNS and TLS managed by the platform.',
];

// LP-001 FR-LP-016 — API design principles (from TechCart).
export const API_PRINCIPLES: readonly string[] = [
  'RESTful resource routes under backend/src/routes, with logic in feature modules/.',
  'Zod schemas are the single validation authority; the front ends do their own checks for UX only.',
  'A uniform error envelope on every response: { success, code, message }.',
  'Dedicated status-update endpoints rather than overloading a generic update.',
  'Deterministic pagination — order by the sort key with _id as the tie-breaker.',
  'Money in whole rupees everywhere except the payments collection (integer paise), converted once at payment time.',
];

// LP-001 FR-LP-017 — Git and GitHub conventions.
export const GIT_CONVENTIONS: {
  branching: readonly string[];
  commits: readonly string[];
  prs: readonly string[];
  repo: readonly string[];
} = {
  branching: [
    'Trunk-based on main.',
    'Short-lived branches named feature/<issue>-<scope>.',
    'Squash-merge only — one commit per PR on main.',
    'Branch protection on main: required CI checks, no direct pushes, linear history.',
  ],
  commits: [
    'Conventional Commits: type(scope): message (Issue #N).',
    'Small, atomic, imperative-mood messages.',
  ],
  prs: [
    'One issue per PR; the description links the issue and the relevant SRS section.',
    'CI green and a review before merge.',
    'Delete the branch after merge.',
    'Keep each PR small enough to review in one sitting.',
  ],
  repo: [
    'Issues tied to milestones (M0–M11).',
    'A consistent label scheme.',
    'docs/ treated as a living specification.',
    'An optional CODEOWNERS file.',
    'Semantic-version tags on release.',
  ],
};

// LP-001 FR-LP-017 — GitHub Actions anatomy, mapped to ci.yml.
export const ACTIONS_ANATOMY: readonly { term: string; note: string }[] = [
  { term: 'events', note: 'What triggers a run — ci.yml uses pull_request to main.' },
  { term: 'jobs', note: 'Independent units that run in parallel — lint, test, build.' },
  {
    term: 'steps',
    note: 'Ordered commands inside a job — checkout, setup-node, npm ci, npm run ...',
  },
  { term: 'matrix', note: 'Fans one job into many — test and build each run once per workspace.' },
  { term: 'secrets', note: 'Injected via secrets.* — ci.yml reads ATLAS_SEARCH_TEST_URI.' },
  {
    term: 'cache',
    note: 'actions/cache keys reusable state — the backend mongodb-binaries download.',
  },
  {
    term: 'concurrency',
    note: 'cancel-in-progress kills a superseded run when a new commit is pushed.',
  },
];
