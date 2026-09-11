# Case Study — TechCart Admin App

The staff console of [TechCart](https://github.com/Pravin671231/TechCart), used to
run the catalogue, inventory, and orders behind the storefront.

## Problem

Store staff need to build and maintain a structured catalogue (brands,
categories, per-category specification schemas and variant axes, products with
sellable variants), keep stock accurate across warehouses, and move orders
through their lifecycle including refunds — all against the **same** API and
database the storefront reads. Different staff should see different things: a
catalogue editor has no business touching orders or other admins' accounts, and
that boundary must be enforced on the server, not just hidden in the UI.

## Approach

- **Vite 7 + React 19 + TypeScript + Tailwind CSS 4 + React Router 7**, built as
  a single-page app (no SSR needed for an internal tool).
- **Three roles, enforced twice.** `catalog-manager`, `order-manager`, and
  `super-admin`. The client mirrors the backend's role list, filters the sidebar
  by the signed-in role, and wraps routes in `RequireAuth` / `RequireRole`
  guards — but the API independently checks every request, so a hidden link is
  also a blocked request.
- **Mandatory two-factor sign-in.** Password first, then a one-time code every
  time — a correct password alone never signs anyone in. Sign-in is rate-limited.
- **Same data layer as the storefront.** Redux Toolkit + RTK Query with a shared
  `createApi` instance; each feature injects its own endpoints and cache tags.
  Bearer-token auth (`Authorization: Bearer …`), matching the buyer app.
- **Consistent screens.** Every list view (Products, Brands, Categories, Orders,
  Inventory, Warehouses, Admin Users) reuses one table primitive — search,
  filter dropdowns with *Clear filters*, sortable headers, and a paginated
  footer.

## Architecture

```
Admin App (React/Vite SPA)  ─▶  API (Node/Express)  ─▶  MongoDB (Atlas)
                                                     └▶  Cloudflare R2 (images)
```

- The console calls the API's **admin** routes (role-gated) plus the shared
  media-upload path. Products carry no price or stock of their own — every
  sellable unit is a **variant**, and stock lives in one row per
  *(variant × warehouse)*.
- **Guarded deletes.** A brand, category, or specification field that is still in
  use cannot be deleted; the API returns a specific error code
  (`BRAND_IN_USE`, `CATEGORY_IN_USE`, `SPECIFICATION_FIELD_IN_USE`) and the UI
  surfaces it inline.
- **Order state is a machine.** The *Change status* control only ever offers the
  legal next statuses; cancelling a *Pending payment* / *Paid* order records a
  reason shown to the buyer; refunds go through Razorpay (full → *Refunded*,
  partial → payment-only) and cannot be undone.
- **Data-setup order matters.** Categories → specification schemas + variant axes
  → products + variants → warehouses → inventory. Warehouse creation order also
  decides the order carts draw stock from.

## Outcome

The admin-facing halves of every shipped TechCart feature are live: full catalog
management with image uploads to Cloudflare R2 (SRS v0.2), admin authentication
and RBAC (v0.3), order management and refunds (v0.5–v0.6), the sales and catalog
dashboards (v0.7), and per-warehouse inventory (v0.10). The console deploys to
Vercel as a separate project from the shared monorepo, built and tested on every
pull request by GitHub Actions.

## Sources

TechCart [README](https://github.com/Pravin671231/TechCart/blob/main/README.md) ·
[docs/srs/SRS.md](https://github.com/Pravin671231/TechCart/blob/main/docs/srs/SRS.md) ·
[admin-app/docs/architecture.md](https://github.com/Pravin671231/TechCart/blob/main/admin-app/docs/architecture.md) ·
[docs/user-manuals/admin-app.md](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md) ·
this repo's [`docs/srs/SRS.md`](../srs/SRS.md) Appendix A.
