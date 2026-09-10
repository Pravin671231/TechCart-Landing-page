/**
 * Buyer / Admin app toggle for the Overview section (LP-002 FR-LP-023).
 * Reads `#apps-data` (rendered server-side by `Overview.astro`) and swaps the
 * title, description, and both CTA links with no reload. With JavaScript
 * disabled the Buyer view (rendered server-side) is all that's shown.
 */
interface AppEntry {
  key: string;
  label: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
}

const dataEl = document.getElementById('apps-data');
const apps: AppEntry[] = dataEl ? JSON.parse(dataEl.textContent ?? '[]') : [];

const buttons = document.querySelectorAll<HTMLButtonElement>('[data-app-key]');
const titleEl = document.querySelector<HTMLElement>('[data-app-title]');
const descEl = document.querySelector<HTMLElement>('[data-app-desc]');
const repoEl = document.querySelector<HTMLAnchorElement>('[data-app-repo]');
const demoEl = document.querySelector<HTMLAnchorElement>('[data-app-demo]');

for (const btn of buttons) {
  btn.addEventListener('click', () => {
    const app = apps.find((a) => a.key === btn.dataset.appKey);
    if (!app) return;

    for (const b of buttons) b.setAttribute('aria-pressed', String(b === btn));
    if (titleEl) titleEl.textContent = app.title;
    if (descEl) descEl.textContent = app.description;
    if (repoEl) repoEl.href = app.repoUrl;
    if (demoEl) demoEl.href = app.demoUrl;
  });
}

export {};
