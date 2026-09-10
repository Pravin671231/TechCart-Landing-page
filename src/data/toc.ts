/**
 * The app-shell's top-level nav — the single source of truth for the left
 * sidenav, the TopBar menu drawer, and the scroll-spy (LP-002 §6, NFR-LP-006).
 *
 * `NAV` is the four sidenav entries. `TABS` is the subset rendered as the
 * `DocTabs` tablist inside `#documentation` (`casestudy` / `user-manual` /
 * `features`) — `overview` is the standalone Overview section.
 */
export interface TocEntry {
  /** DOM id of the `<section>` / panel and the anchor target. */
  id: string;
  /** Label shown in the sidenav / TopBar drawer / tab. */
  title: string;
}

export const NAV: readonly TocEntry[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'casestudy', title: 'Case Study' },
  { id: 'user-manual', title: 'User Manual' },
  { id: 'features', title: 'Features' },
] as const;

export const TABS: readonly TocEntry[] = NAV.filter((entry) => entry.id !== 'overview');
