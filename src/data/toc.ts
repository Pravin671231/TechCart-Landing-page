/**
 * The landing page's section list — the single source of truth for the
 * table-of-contents sidebar, the mobile "On this page" nav, the scroll-spy, and
 * the section anchors (LP-001 §6.1, NFR-LP-006).
 *
 * Issues #3–#5 fill each section with real content but reuse these exact ids.
 */
export interface TocEntry {
  /** DOM id of the `<section>` and the anchor target. */
  id: string;
  /** Label shown in the sidebar / mobile nav. */
  title: string;
}

export const TOC: readonly TocEntry[] = [
  { id: 'hero', title: 'Overview' },
  { id: 'summary', title: 'Project Summary' },
  { id: 'features', title: 'Features' },
  { id: 'suggested-features', title: 'Suggested Features' },
  { id: 'tech-stack', title: 'Tech Stack' },
  { id: 'claude-code', title: 'How to Handle Claude Code' },
  { id: 'folder-architecture', title: 'Folder Architecture' },
  { id: 'node-version', title: '.node-version & .nvmrc' },
  { id: 'env-vars', title: 'Environment Variables' },
  { id: 'api-debugging', title: 'Frontend API Debugging' },
  { id: 'eslint-prettier-lockfile', title: 'ESLint, Prettier & package-lock' },
  { id: 'ci-cd', title: 'CI & CD Pipelines' },
  { id: 'deployment', title: 'Deployment' },
  { id: 'api-design', title: 'API Design & Documentation' },
  { id: 'git-github', title: 'Git, GitHub & GitHub Actions' },
  { id: 'get-started', title: 'Get Started' },
] as const;
