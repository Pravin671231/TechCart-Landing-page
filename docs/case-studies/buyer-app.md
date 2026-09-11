# Case Study — TechCart Buyer App

The customer-facing storefront of [TechCart](https://github.com/Pravin671231/TechCart),
a production, India-first e-commerce platform.

## Problem

An online store needs a fast, public catalogue that anyone can browse, plus a
gated path — cart, checkout, payment, order history — for signed-in shoppers. It
has to run against the **same** backend and database the admin console uses, with
no shopping logic re-implemented on the client, and it has to feel right for the
Indian market: rupee pricing, Razorpay payment, email or Google sign-in with no
password to remember.

## Approach

- **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.** Static and
  server rendering where it helps SEO and first paint; a thin client layer for
  the interactive parts.
- **Routing is only routing.** Files under `src/app/` resolve URLs and compose
  providers; all UI and logic live in `src/features/<feature>/` modules
  (`home`, `category`, `search`, `productDetail`, `products`, `cart`,
  `authentication`, …), each owning its own components, types, and API endpoints.
- **One data layer.** Redux Toolkit + RTK Query, with a single custom
  `baseQuery` that unwraps the backend's `{ success, data }` envelope and
  normalises both backend error shapes into one `{ code, message }` for every
  hook. Cache tags give the filtered/paged listing screens automatic
  refetch-on-argument-change with no manual effects.
- **Fail loud on config.** `NEXT_PUBLIC_API_URL` is validated at module load and
  throws immediately if missing, so a misconfigured build fails at build time,
  not in production.
- **Progressive gating.** Browsing, search, category pages and product pages are
  public. Add-to-cart, the cart, checkout, orders and the account area require a
  session; an unauthenticated action routes to sign-in and returns the shopper to
  where they were.

## Architecture

```
Buyer App (Next.js)  ─┐
                       ├─▶  API (Node/Express)  ─▶  MongoDB (Atlas)
Admin App (React)    ─┘                          └▶  Razorpay · Cloudflare R2
```

- The storefront calls only the **public** and **buyer-session** routes of the
  shared API; it holds no business rules of its own — pricing, stock, and order
  state all come from the server.
- **Sessions are bearer tokens**, not cookies: the API returns a token in a
  response header on sign-in, the client stores it and sends it as
  `Authorization: Bearer …` — this is what makes a Vercel storefront and a Render
  backend on different domains work reliably.
- **Checkout → payment.** Placing an order creates it server-side immediately
  (status *Pending payment*) and clears the ordered items from the cart; the
  Razorpay Checkout overlay then collects payment, and a shopper can return and
  pay a pending order later or cancel it.
- **Variant selection never refetches.** A product response carries all its
  variants; choosing a colour or size resolves the active variant from the
  already-cached data and swaps price, availability, and images in place.

## Outcome

The buyer-facing halves of every shipped TechCart feature are live: product
catalogue and search (SRS v0.2), authentication (v0.3), shopping cart (v0.4),
orders (v0.5), Razorpay payments (v0.6), the buyer account dashboard (v0.7), and
inventory-aware availability (v0.10). The app is deployed on Vercel as its own
project from the shared monorepo, built and tested on every pull request by
GitHub Actions.

## Sources

TechCart [README](https://github.com/Pravin671231/TechCart/blob/main/README.md) ·
[docs/srs/SRS.md](https://github.com/Pravin671231/TechCart/blob/main/docs/srs/SRS.md) ·
[buyer-app/docs/architecture.md](https://github.com/Pravin671231/TechCart/blob/main/buyer-app/docs/architecture.md) ·
this repo's [`docs/srs/SRS.md`](../srs/SRS.md) Appendix A.
