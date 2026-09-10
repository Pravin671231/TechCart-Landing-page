/**
 * Buyer / Admin app copy for the Overview toggle (LP-002, FR-LP-023). Titles
 * and descriptions are derived from `WORKSPACES` (`techcart.ts`); URLs from
 * `consts.ts`. Emitted as JSON (`#apps-data` in `Overview.astro`) so
 * `app-toggle.ts` can swap the section content client-side.
 */
import {
  BUYER_APP_REPO_URL,
  ADMIN_APP_REPO_URL,
  BUYER_APP_DEMO_URL,
  ADMIN_APP_DEMO_URL,
} from '../consts';

export interface AppEntry {
  key: 'buyer' | 'admin';
  label: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
}

// First entry renders server-side and is the no-JS default (LP-002 FR-LP-023).
export const APPS: readonly AppEntry[] = [
  {
    key: 'buyer',
    label: 'Buyer App',
    title: 'TechCart Storefront',
    description:
      'A Next.js 16 storefront for browsing, cart, and checkout — React 19, TypeScript, Tailwind CSS 4, SSR/ISR on Vercel.',
    repoUrl: BUYER_APP_REPO_URL,
    demoUrl: BUYER_APP_DEMO_URL,
  },
  {
    key: 'admin',
    label: 'Admin App',
    title: 'TechCart Admin Console',
    description:
      'A Vite + React 19 SPA for managing catalog, orders, and access — TypeScript, Tailwind CSS 4, React Router 7, RBAC.',
    repoUrl: ADMIN_APP_REPO_URL,
    demoUrl: ADMIN_APP_DEMO_URL,
  },
] as const;
