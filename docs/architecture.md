# TechCart Landing Page — Architecture

Companion to [`srs/SRS.md`](srs/SRS.md) and
[`srs/features/LP-001-landing-page.md`](srs/features/LP-001-landing-page.md). This
describes **how** the landing page will be built once `LP-001` is approved. Nothing
here is implemented yet.

---

## 1. Why Astro

The page is content-heavy (a marketing hero plus ~13 guide sections) and almost
entirely static. Astro suits that exactly:

- **Near-zero client JavaScript.** Astro ships HTML and CSS by default; the only
  interactive pieces (scroll-spy, theme toggle, copy buttons) are tiny inline
  scripts or small islands.
- **SEO and load performance.** Static output gives the best achievable Lighthouse
  scores, which `LP-001` §3 requires (≥ 95 in every category).
- **Consistency with TechCart.** TechCart's frontends deploy to Vercel; Astro
  deploys to Vercel with a zero-config framework preset, so the operational story
  matches.
- **TypeScript-first.** The content data modules are typed, matching TechCart's
  TypeScript-everywhere convention.

Tailwind CSS handles styling — small production CSS, no bikeshedding, and the same
utility model TechCart's apps already use.

## 2. Planned source layout

Described, not built:

```
src/
├── layouts/
│   └── BaseLayout.astro      # <head>, meta/OG/Twitter tags, theme tokens, skip link
├── pages/
│   └── index.astro           # assembles every section + the TOC sidebar
├── components/
│   ├── Nav.astro             # top bar: wordmark, GitHub link, CTA
│   ├── TocSidebar.astro      # sticky desktop section nav, scroll-spy active state
│   ├── MobileNav.astro       # "On this page" disclosure below 1024px
│   ├── Section.astro         # id + heading + consistent spacing wrapper
│   ├── Prose.astro           # typographic container for long-form copy
│   ├── CodeBlock.astro       # terminal-style block with a copy button
│   ├── FeatureCard.astro     # one TechCart capability
│   ├── StatCard.astro        # hero stat strip item
│   ├── StackTable.astro      # tech-stack table
│   ├── Callout.astro         # note / warning / tip
│   └── Footer.astro
├── data/
│   ├── toc.ts                # ordered [{ id, title }] — single source for sidebar + anchors
│   └── techcart.ts           # stack rows, milestones, data model, features (facts, each cited)
└── styles/
    └── global.css            # Tailwind entry + CSS custom properties for light/dark
```

`src/data/toc.ts` and `src/data/techcart.ts` are the only places facts live
(`LP-001` §5, NFR-LP-006). Components import them; nothing is duplicated in
markup.

## 3. Interactivity budget

| Piece            | Implementation                                             |
| ---------------- | -------------------------------------------------------- |
| Scroll-spy       | ~15 lines of vanilla JS using `IntersectionObserver`     |
| Theme toggle     | Small inline script; reads `prefers-color-scheme`, persists an explicit choice to `localStorage` |
| Copy buttons     | One delegated click handler; `navigator.clipboard`        |

No UI framework runtime. No client-side routing. The page works with JavaScript
disabled — the TOC is a plain anchor list and the theme follows the OS setting.

## 4. Deploy topology

```
git push  →  Vercel (Astro preset)  →  astro build  →  static dist/  →  CDN
```

- No server, no serverless functions, no environment variables required at
  runtime.
- Preview deployment per pull request (Vercel default).
- `vercel.json` added only if custom headers or redirects become necessary.
- Any static host (Netlify, Cloudflare Pages, GitHub Pages) is a viable fallback.

## 5. Repository conventions

- **Branches:** `feature/<issue>-<scope>` → `main`; squash-merge only; branch
  protection on `main` (required CI, no direct pushes, linear history).
- **Commits:** Conventional Commits — `type(scope): message (Issue #N)`.
- **AI attribution (this repo):** `Co-Authored-By: Claude Sonnet 5
  <noreply@anthropic.com>` on commits; `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
  on pull requests. (TechCart's own repo forbids AI trailers — that is TechCart's
  rule, not this project's.)
- **Planning:** use the `discuss-plan-build` Claude Code skill for non-trivial
  changes.
- **Formatting / linting:** Prettier (`prettier --check` in CI) and ESLint
  (`npm run lint` in CI).
- **Node:** pinned to `24` via `.nvmrc` and `.node-version`, matching TechCart.

## 6. Suggested CI for this repo

A single GitHub Actions workflow on `pull_request` to `main`:

1. `actions/setup-node` with `node-version-file: .nvmrc`, `cache: npm`
2. `npm ci`
3. `npx prettier --check .`
4. `npm run lint`
5. `npm run build` (`astro build`)
6. Optionally, Lighthouse CI against the built output

CD is left to Vercel's git integration — the same "platform owns CD" reasoning
TechCart uses (`LP-001` FR-LP-014).
