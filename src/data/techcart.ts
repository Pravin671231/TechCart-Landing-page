/**
 * TechCart fact module — the single source for every TechCart claim on the page
 * (LP-001 §5, NFR-LP-006). Every value cites its section in
 * `docs/srs/SRS.md` Appendix A, which is itself sourced from the TechCart repo
 * (README.md, docs/architecture.md, .github/workflows/ci.yml, root config),
 * captured 2026-09-10.
 */

export interface Workspace {
  name: string;
  role: string;
  stack: string;
  host: string;
}

// Appendix A.2 — Workspaces.
export const WORKSPACES: readonly Workspace[] = [
  {
    name: 'buyer-app',
    role: 'Storefront',
    stack:
      'Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4; Zustand + Redux Toolkit / RTK Query; SSR/ISR',
    host: 'Vercel',
  },
  {
    name: 'admin-app',
    role: 'Admin console',
    stack: 'Vite 7, React 19, TypeScript, Tailwind CSS 4, React Router 7; SPA with RBAC',
    host: 'Vercel',
  },
  {
    name: 'backend',
    role: 'API',
    stack: 'Node.js 24, Express 5, TypeScript, Zod, Mongoose / MongoDB Atlas',
    host: 'Render (Docker)',
  },
];

export interface Milestone {
  id: string;
  title: string;
  status: 'shipped' | 'open';
  scope: string;
}

// Appendix A.5 — Milestones. 9 shipped (M0–M7, M10), 3 open (M8, M9, M11).
export const MILESTONES: readonly Milestone[] = [
  { id: 'M0', title: 'Foundation', status: 'shipped', scope: 'Workspace scaffold, tooling' },
  { id: 'M1', title: 'CI Pipeline', status: 'shipped', scope: 'GitHub Actions, branch protection' },
  {
    id: 'M2',
    title: 'Product Catalog',
    status: 'shipped',
    scope: 'Brands, categories, products, variants',
  },
  {
    id: 'M3',
    title: 'Authentication',
    status: 'shipped',
    scope: 'Google OAuth + OTP, admin 2FA, bearer sessions',
  },
  {
    id: 'M4',
    title: 'Shopping Cart',
    status: 'shipped',
    scope: 'Per-buyer cart, warehouse-scoped stock',
  },
  {
    id: 'M5',
    title: 'Orders',
    status: 'shipped',
    scope: 'Address book, checkout, order lifecycle',
  },
  { id: 'M6', title: 'Payments', status: 'shipped', scope: 'Razorpay, webhooks, refunds' },
  {
    id: 'M7',
    title: 'Dashboard',
    status: 'shipped',
    scope: 'Sales / catalog aggregations, 60s cache',
  },
  {
    id: 'M8',
    title: 'Backend NFRs',
    status: 'open',
    scope: 'Performance, security, error handling',
  },
  {
    id: 'M9',
    title: 'Frontend NFRs',
    status: 'open',
    scope: 'Core Web Vitals, error boundaries, a11y',
  },
  {
    id: 'M10',
    title: 'Inventory',
    status: 'shipped',
    scope: 'Per-(variant, warehouse) stock tracking',
  },
  {
    id: 'M11',
    title: 'Launch Readiness',
    status: 'open',
    scope: 'Final polish, deployment validation',
  },
];

export const MILESTONES_SHIPPED = MILESTONES.filter((m) => m.status === 'shipped').length; // 9
export const MILESTONES_TOTAL = MILESTONES.length; // 12

export interface Collection {
  name: string;
  note: string;
}

// Appendix A.4 — Data model, five core collections.
export const DATA_MODEL: readonly Collection[] = [
  { name: 'users', note: 'Buyer + admin accounts; role field for RBAC' },
  { name: 'products / categories', note: 'Atlas Search indexed; sellable variants embedded' },
  { name: 'carts', note: 'One per user/session; stock allocated per warehouse' },
  {
    name: 'orders',
    note: 'State machine: pending → paid → processing → shipped / cancelled / refunded',
  },
  { name: 'inventory', note: 'Stock tracked per (variantId, warehouseId)' },
];

export type IconKey =
  | 'discovery'
  | 'catalog'
  | 'upload'
  | 'admin'
  | 'auth'
  | 'cart'
  | 'orders'
  | 'payments'
  | 'dashboard'
  | 'inventory'
  | 'docker'
  | 'cicd';

export interface Feature {
  title: string;
  blurb: string;
  milestone: string;
  icon: IconKey;
}

// LP-001 FR-LP-005 — the 12-card feature showcase (blurbs follow the spec).
export const FEATURES: readonly Feature[] = [
  {
    title: 'Product Discovery',
    blurb:
      'Buyer search, category browsing, and faceted filtering on price, brand, category, variant and specification — powered by MongoDB Atlas Search.',
    milestone: 'M2',
    icon: 'discovery',
  },
  {
    title: 'Catalog Management',
    blurb:
      'Admin CRUD for brands, hierarchical categories, category-governed specs and variant types, and products with embedded sellable variants.',
    milestone: 'M2',
    icon: 'catalog',
  },
  {
    title: 'Image Uploads',
    blurb: 'Presigned direct-to-Cloudflare-R2 uploads with a backend-proxied fallback path.',
    milestone: 'M2',
    icon: 'upload',
  },
  {
    title: 'Admin Search & Status Control',
    blurb:
      'Search across every admin list view; dedicated status-update endpoints for products, categories and brands.',
    milestone: 'M2',
    icon: 'admin',
  },
  {
    title: 'Authentication',
    blurb:
      'Google OAuth and OTP sign-in for buyers; password plus mandatory OTP for admins; bearer-token sessions and RBAC guards.',
    milestone: 'M3',
    icon: 'auth',
  },
  {
    title: 'Shopping Cart',
    blurb:
      'Persistent per-buyer cart with live pricing and warehouse-scoped stock availability checks.',
    milestone: 'M4',
    icon: 'cart',
  },
  {
    title: 'Orders',
    blurb:
      'Address book, checkout, and a full order lifecycle state machine; buyer and admin order history.',
    milestone: 'M5',
    icon: 'orders',
  },
  {
    title: 'Payments',
    blurb:
      'Razorpay integration, webhook handling and refunds; the paise boundary is isolated to the payments collection.',
    milestone: 'M6',
    icon: 'payments',
  },
  {
    title: 'Dashboard',
    blurb: 'Read-only sales and catalog aggregations with 60-second caching.',
    milestone: 'M7',
    icon: 'dashboard',
  },
  {
    title: 'Inventory',
    blurb:
      'A fixed 2–3 warehouse set with stock tracked per (variantId, warehouseId) and allocated at cart time.',
    milestone: 'M10',
    icon: 'inventory',
  },
  {
    title: 'Containerised',
    blurb: 'A Dockerfile per app plus a root docker-compose.yml for one-command local startup.',
    milestone: 'DevOps',
    icon: 'docker',
  },
  {
    title: 'CI / CD',
    blurb:
      'GitHub Actions runs lint, test and build on every PR; Render and Vercel deploy on merge to main.',
    milestone: 'M1',
    icon: 'cicd',
  },
];

export interface StackRow {
  a: string;
  b: string;
  c?: string;
}

// LP-001 FR-LP-007 Table A — this landing page's own stack.
export const LANDING_STACK: readonly StackRow[] = [
  { a: 'Framework', b: 'Astro', c: 'Content-heavy page; ships near-zero JavaScript' },
  { a: 'Styling', b: 'Tailwind CSS', c: 'Fast, consistent, small production CSS' },
  { a: 'Language', b: 'TypeScript', c: 'Type-safe data modules; matches TechCart' },
  { a: 'Rendering', b: 'Static (SSG)', c: 'Best possible load performance and SEO' },
  { a: 'Hosting', b: 'Vercel', c: "Same platform as TechCart's frontends; zero-config deploy" },
  { a: 'Runtime', b: 'Node 24', c: 'Pinned via .nvmrc / .node-version, mirrors TechCart' },
  { a: 'Formatting', b: 'Prettier', c: 'Removes style debate; --check in CI' },
];

// LP-001 FR-LP-007 Table B — TechCart's per-layer stack (Appendix A.2 + README).
export const TECHCART_STACK: readonly StackRow[] = [
  { a: 'Buyer Storefront', b: 'Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4' },
  { a: 'Admin Console', b: 'Vite 7, React 19, TypeScript, Tailwind CSS 4, React Router 7' },
  { a: 'Backend API', b: 'Node.js 24, Express 5, TypeScript, Zod' },
  { a: 'Database', b: 'MongoDB (Mongoose, Atlas)' },
  { a: 'File Storage', b: 'Cloudflare R2' },
  { a: 'Testing', b: 'Vitest, React Testing Library, MSW, Supertest' },
  { a: 'DevOps', b: 'Docker, GitHub Actions, Render, Vercel' },
];

// LP-001 FR-LP-006 — roadmap. In-flight = open milestones (Appendix A.5); ideas = not yet specced.
export const SUGGESTED: {
  inFlight: readonly { milestone: string; scope: string }[];
  ideas: readonly string[];
} = {
  inFlight: [
    {
      milestone: 'M8',
      scope:
        'Backend NFRs — performance budgets, helmet, CORS allowlist, rate limiting, structured error responses.',
    },
    {
      milestone: 'M9',
      scope: 'Frontend NFRs — Core Web Vitals budgets, error boundaries, accessibility pass.',
    },
    {
      milestone: 'M11',
      scope: 'Launch readiness — final polish and deployment validation.',
    },
  ],
  ideas: [
    'Reviews & ratings',
    'Wishlist',
    'Coupons & promotions',
    'Search autosuggest',
    'Personalised recommendations',
    'Multi-currency',
    'PWA / installable storefront',
    'Returns / RMA flow',
    'Seller portal',
    'Email / SMS order notifications',
    'Shipment tracking',
  ],
};

// 24x24 stroke icons (Lucide-style), rendered with stroke="currentColor".
export const ICONS: Record<IconKey, string> = {
  discovery: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
  catalog: 'M4 6h16M4 12h16M4 18h10M4 6a1 1 0 011-1h1M4 12a1 1 0 011-1h1M4 18a1 1 0 011-1h1',
  upload: 'M12 15V3m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2',
  admin: 'M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z',
  auth: 'M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4zM9 12l2 2 4-4',
  cart: 'M3 3h2l2.4 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z',
  orders:
    'M9 2h6a1 1 0 011 1v1h2a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2V3a1 1 0 011-1zM9 12l2 2 4-4',
  payments: 'M2 7h20v10H2zM2 11h20M6 15h4',
  dashboard: 'M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z',
  inventory: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M3 12l9 5 9-5',
  docker:
    'M4 13h4v4H4zM9 13h4v4H9zM14 13h4v4h-4zM9 8h4v4H9zM3 17c2 2 6 3 10 1 3-1.5 4-4 4-6-2 1-3 1-4 0M20 13a2 2 0 012 2',
  cicd: 'M4 12a8 8 0 018-8V1l4 4-4 4V6a6 6 0 106 6M12 8v4l3 2',
};
