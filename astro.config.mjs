// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Placeholder production URL — corrected once the Vercel project exists (issue #6).
  site: 'https://techcart-landing-page.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
