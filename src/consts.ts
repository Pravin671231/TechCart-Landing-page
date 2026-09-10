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
