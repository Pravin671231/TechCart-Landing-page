/**
 * Ocean Royale brand kit — the single source of truth for the site's color
 * tokens (M2.1, `FR-LP-021`). `tokenCss()` derives the `:root` custom
 * properties consumed everywhere else (`global.css`'s `@theme inline`
 * mapping, and every `bg-*`/`text-*`/`border-*` Tailwind utility built on it)
 * from `brand-kit.json`, so the JSON stays the only place a color is spelled
 * out as a literal hex value.
 */
import brandKit from './brand-kit.json';

export interface BrandKitMode {
  background: string;
  surface: string;
  text: string;
  heading: string;
  secondary_text: string;
  border: string;
  primary: string;
  highlight: string;
  button: string;
  button_text: string;
  accent_fg: string;
}

export interface BrandKit {
  theme: string;
  font: string;
  focus: string;
  palette: Record<string, string>;
  light_mode: BrandKitMode;
  dark_mode: BrandKitMode;
}

export const BRAND_KIT: BrandKit = brandKit;

function modeDeclarations(mode: BrandKitMode): string {
  return `
    --bg: ${mode.background};
    --surface: ${mode.surface};
    --fg: ${mode.text};
    --heading: ${mode.heading};
    --muted: ${mode.secondary_text};
    --border: ${mode.border};
    --accent: ${mode.primary};
    --accent-2: ${mode.highlight};
    --highlight: ${mode.highlight};
    --button: ${mode.button};
    --button-text: ${mode.button_text};
    --accent-fg: ${mode.accent_fg};
    --focus: ${BRAND_KIT.focus};
  `;
}

/**
 * Builds the same three rule shapes `global.css` used to hand-write: a
 * `:root` default (light), an OS-preference dark override, and an explicit
 * `[data-theme]` override for the toggle in `ThemeToggle.astro`.
 */
export function tokenCss(): string {
  const light = modeDeclarations(BRAND_KIT.light_mode);
  const dark = modeDeclarations(BRAND_KIT.dark_mode);

  return `
:root {${light}}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {${dark}}
}

:root[data-theme='dark'] {${dark}}
`;
}
