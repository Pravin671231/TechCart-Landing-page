/**
 * Runs axe-core against the built dist/index.html and fails on any WCAG 2 A/AA
 * or best-practice violation. Run with `npm run check:a11y` after `npm run build`.
 *
 * jsdom has no layout engine, so rules that need computed geometry (notably
 * color-contrast) return "incomplete" rather than pass/fail — contrast is
 * verified separately against the design tokens.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
window.eval(axe.source);

const results = await window.axe.run(window.document, {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] },
});

const violations = results.violations;
if (violations.length === 0) {
  console.log('axe: 0 violations');
  const incomplete = results.incomplete.map((i) => i.id).join(', ');
  if (incomplete) console.log(`axe: incomplete (needs a real browser): ${incomplete}`);
  process.exit(0);
}

console.error(`axe: ${violations.length} violation type(s)\n`);
for (const v of violations) {
  console.error(`  [${v.impact}] ${v.id} — ${v.help}`);
  for (const node of v.nodes) console.error(`      ${node.target.join(' ')}`);
  console.error(`      ${v.helpUrl}\n`);
}
process.exit(1);
