/**
 * Documentation tablist behaviour (LP-002 FR-LP-025).
 *
 * - Click and roving-arrow-key activation of the three `<button role="tab">`.
 * - Shows the matching `<div role="tabpanel">` and hides the others (the
 *   inactive panels are only marked `hidden` here, so a no-JS reader sees all
 *   three stacked).
 * - Keeps `location.hash` in sync (`#casestudy` / `#user-manual` / `#features`)
 *   and mirrors the active tab onto the `[data-toc-link]` entries in the
 *   sidenav / TopBar; `scrollspy.ts` owns the `#overview` entry.
 * - Honours a `#…` deep link on load and on `hashchange`.
 *
 * With JavaScript disabled none of this runs: the panels stay visible and the
 * sidenav anchors jump to each panel by id.
 */
const tablist = document.querySelector<HTMLElement>('#documentation [role="tablist"]');
const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];

const NAV_SLUGS = ['overview', 'casestudy', 'user-manual', 'features'];
const slugOf = (tab: HTMLButtonElement) => tab.id.replace(/^tab-/, '');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const mirrorToNav = (slug: string) => {
  for (const nav of NAV_SLUGS) {
    const on = nav === slug;
    for (const link of document.querySelectorAll(`[data-toc-link="${nav}"]`)) {
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }
};

let activeSlug = tabs.length ? slugOf(tabs[0]) : '';

const activate = (tab: HTMLButtonElement, opts: { focus?: boolean; scroll?: boolean } = {}) => {
  activeSlug = slugOf(tab);

  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !on;
  }

  if (opts.scroll !== false) {
    tab.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }
  if (opts.focus) tab.focus();

  history.replaceState(null, '', `#${activeSlug}`);
  mirrorToNav(activeSlug);
};

if (tablist && tabs.length) {
  for (const tab of tabs) {
    tab.addEventListener('click', () => activate(tab));
  }

  tablist.addEventListener('keydown', (event) => {
    const current = tabs.findIndex((t) => t === document.activeElement);
    if (current === -1) return;

    let next: number;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;

    event.preventDefault();
    activate(tabs[next], { focus: true });
  });

  const syncFromHash = () => {
    const slug = location.hash.replace(/^#/, '');
    const target = tabs.find((t) => slugOf(t) === slug);
    if (target) {
      activate(target, { scroll: false });
      document.getElementById('documentation')?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      // No tab deep link — apply the server default's hidden state only.
      for (const t of tabs) {
        const on = t.getAttribute('aria-selected') === 'true';
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !on;
      }
    }
  };

  syncFromHash();
  window.addEventListener('hashchange', syncFromHash);

  const docs = document.getElementById('documentation');
  if (docs) {
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) mirrorToNav(activeSlug);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    ).observe(docs);
  }
}

export {};
