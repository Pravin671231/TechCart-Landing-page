# TechCart Case Studies

A short, factual write-up of each TechCart application in the same four-part
shape: **Problem → Approach → Architecture → Outcome**. They are condensed from
TechCart's own documentation — the
[README](https://github.com/Pravin671231/TechCart/blob/main/README.md), the
[SRS](https://github.com/Pravin671231/TechCart/blob/main/docs/srs/SRS.md), and
the per-app architecture docs — and every claim traces back to those sources.

| Case study | App | Stack |
| --- | --- | --- |
| [buyer-app.md](buyer-app.md) | Buyer storefront | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| [admin-app.md](admin-app.md) | Admin console | Vite 7, React 19, TypeScript, Tailwind CSS 4, React Router 7 |

Both apps sit on **one** Node/Express API and **one** MongoDB database — the
shared platform is described in each case study's Architecture section.

## See also

- [`../user-manuals/`](../user-manuals/) — end-user guides.
- [`../features/`](../features/) — per-app capability lists.
