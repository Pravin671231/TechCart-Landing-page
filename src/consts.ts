/**
 * Site-wide constants. Kept tiny and dependency-free so `astro.config.mjs`,
 * layouts, and CI can all reference the same values.
 */
export const SITE_TITLE = 'TechCart — Landing Page';

export const SITE_DESCRIPTION =
  'TechCart is a production, India-first e-commerce platform — a Next.js storefront and a React admin console on one Express + MongoDB API. This site presents the project and the engineering process behind it.';

/** Placeholder production URL; corrected once the Vercel project exists (issue #6). */
export const SITE_URL = 'https://techcart-landing-page.vercel.app';

/** Canonical GitHub repository for the TechCart application. */
export const TECHCART_REPO_URL = 'https://github.com/Pravin671231/TechCart';

/** Deep links into the TechCart repo's buyer/admin workspaces (Overview app toggle). */
export const BUYER_APP_REPO_URL = `${TECHCART_REPO_URL}/tree/main/buyer-app`;
export const ADMIN_APP_REPO_URL = `${TECHCART_REPO_URL}/tree/main/admin-app`;

/** Placeholder demo URL; corrected once the buyer app is deployed. TODO */
export const BUYER_APP_DEMO_URL = 'https://techcart-storefront.vercel.app';
/** Placeholder demo URL; corrected once the admin app is deployed. TODO */
export const ADMIN_APP_DEMO_URL = 'https://techcart-admin.vercel.app';

const TECHCART_BLOB = `${TECHCART_REPO_URL}/blob/main`;

/** Deep links into the TechCart repository's own documentation. */
export const TECHCART_DOCS = {
  srs: `${TECHCART_BLOB}/docs/srs/SRS.md`,
  architecture: `${TECHCART_BLOB}/docs/architecture.md`,
  buyerAppClaude: `${TECHCART_BLOB}/buyer-app/CLAUDE.md`,
  adminAppClaude: `${TECHCART_BLOB}/admin-app/CLAUDE.md`,
  backendClaude: `${TECHCART_BLOB}/backend/CLAUDE.md`,
} as const;
