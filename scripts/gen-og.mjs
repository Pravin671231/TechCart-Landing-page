/**
 * Generates public/og.png (1200x630) — the Open Graph / Twitter-card image.
 * Run with `npm run gen:og`. Regenerate only when the wordmark or tagline changes.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og.png');

const sans =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#818cf8"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b1120"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>
  <text x="80" y="150" font-family="${sans}" font-size="26" letter-spacing="4" fill="#94a3b8">
    PRODUCTION E-COMMERCE PLATFORM
  </text>
  <text x="80" y="300" font-family="${sans}" font-size="132" font-weight="700" fill="#e2e8f0">
    Tech<tspan fill="url(#accent)">Cart</tspan>
  </text>
  <text x="80" y="390" font-family="${sans}" font-size="34" fill="#94a3b8">
    A Next.js storefront and a React admin console on one Express + MongoDB API.
  </text>
  <text x="80" y="560" font-family="${sans}" font-size="26" fill="#818cf8">
    The project, and the engineering process behind it.
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out);
