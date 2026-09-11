/**
 * Scroll-spy + section reveal (LP-001 FR-LP-003, §6.2).
 *
 * - Marks the TOC link for the section nearest the top of the viewport with
 *   `.is-active` (covers both the desktop sidebar and the mobile disclosure,
 *   which share `[data-toc-link]`).
 * - Adds `.is-visible` to each `.section-enter` as it scrolls into view so the
 *   fade/slide-up in global.css can run. The animation itself is disabled under
 *   `prefers-reduced-motion` by CSS, so this stays safe to run unconditionally.
 *
 * With JavaScript disabled the TOC links are plain anchors and every section is
 * fully visible — nothing here is required for the page to work.
 *
 * The only spied section is `#overview`: `#documentation` is a tablist whose
 * active nav entry is owned by `tabs.ts`, so this observer skips it and clears
 * every nav link when nothing is in the band, handing the highlight to
 * `tabs.ts` as the reader scrolls into the docs area.
 */
const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
const spiedSections = sections.filter((s) => s.id !== 'documentation');
const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));

if (sections.length && tocLinks.length) {
  const linksById = new Map<string, HTMLAnchorElement[]>();
  for (const link of tocLinks) {
    const id = link.dataset.tocLink;
    if (!id) continue;
    const list = linksById.get(id) ?? [];
    list.push(link);
    linksById.set(id, list);
  }

  const visible = new Set<string>();
  let activeId = '';

  const setActive = () => {
    // The first spied section (in document order) currently in the band, or
    // none — clearing every nav link so `tabs.ts` can own the highlight in the
    // docs area.
    const nextId = spiedSections.find((s) => visible.has(s.id))?.id ?? '';
    if (nextId === activeId) return;
    activeId = nextId;
    for (const [id, links] of linksById) {
      const on = id === activeId;
      for (const link of links) {
        link.classList.toggle('is-active', on);
        if (on) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    }
  };

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      setActive();
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  );

  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  for (const section of spiedSections) spy.observe(section);
  for (const section of sections) {
    if (section.classList.contains('section-enter')) reveal.observe(section);
  }
}
