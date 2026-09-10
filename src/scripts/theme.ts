/**
 * Theme toggle logic (LP-001 FR-LP-004), rebinding every `.theme-toggle`
 * button — the app-shell now renders one in `LeftSidenav` and one in
 * `TopBar`. Imported once from `BaseLayout.astro`.
 */
const buttons = document.querySelectorAll<HTMLButtonElement>('.theme-toggle');

const effectiveTheme = (): 'light' | 'dark' => {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const syncPressed = () => {
  const pressed = String(effectiveTheme() === 'dark');
  for (const btn of buttons) btn.setAttribute('aria-pressed', pressed);
};

for (const btn of buttons) {
  btn.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore write failures (private mode, etc.) */
    }
    syncPressed();
  });
}

syncPressed();

export {};
