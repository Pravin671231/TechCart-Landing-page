/**
 * Structured content for the engineering-process guide sections (issue #4).
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
