/**
 * The app-shell's top-level nav — the single source of truth for the left
 * sidenav, the TopBar menu drawer, and the scroll-spy (LP-002 §6, NFR-LP-006).
 *
 * `casestudy` and `user-manual` don't resolve to a section yet — the tabbed
 * `#documentation` area that hosts them lands in M2.3 (issue #18).
 */
export interface TocEntry {
  /** DOM id of the `<section>` and the anchor target. */
  id: string;
  /** Label shown in the sidenav / TopBar drawer. */
  title: string;
}

export const NAV: readonly TocEntry[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'casestudy', title: 'Case Study' },
  { id: 'user-manual', title: 'User Manual' },
  { id: 'features', title: 'Features' },
] as const;
