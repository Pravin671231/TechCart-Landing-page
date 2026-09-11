# Admin App — Features

Everything store staff can do in the TechCart admin console, grouped by area with
the role that can use it. See the
[Admin App user manual](../user-manuals/admin-app.md) for step-by-step guides.

Roles: **catalog-manager** (CM), **order-manager** (OM), **super-admin** (SA).

## Catalog — CM, OM, SA

- **Brands** — create, edit, activate/deactivate; a brand with products cannot be
  deleted.
- **Categories** — two levels (category + subcategory); delete is blocked while
  products or subcategories remain.
- **Specification schemas** — one per category, grouped fields with types
  (text / number / boolean / enum), units, required and filterable flags; drives
  the product form and the storefront's spec filters.
- **Variant axes** — one set per category (colour, size, …) with types and option
  lists; drives the variant form.
- **Products** — name, brand, category, description, SEO fields, and
  category-driven specification inputs. A product has no price or stock of its
  own.
- **Variants** — the sellable units: SKU, MRP, discount %, server-computed
  selling price, active flag, 1–2 images each.
- **Status** — Draft / Published / Archived; only Published products with an
  active, in-stock variant reach shoppers.

## Media — CM, SA

- **Image uploads** to Cloudflare R2 via presigned direct-to-storage upload, with
  a backend-proxied fallback path. JPEG / PNG / WebP; per-image alt text and a
  primary-image toggle.

## Inventory — CM, SA

- **Warehouses** — a small fixed set (name + code); creation order decides
  stock-allocation order.
- **Inventory** — one row per *(variant × warehouse)*, created automatically at
  zero; edit the count inline. Negative values are rejected.
- A product reads as *Out of stock* to shoppers when every active variant is at
  zero across all warehouses.

## Orders — OM, SA

- **List** — order #, buyer email, date, status, total; search and status filter.
- **Detail** — buyer and payment info, items, shipping address, status timeline.
- **Change status** — only the legal next statuses are offered
  (Pending payment → Paid / Cancelled; Paid → Processing / Cancelled;
  Processing → Shipped; Shipped → Delivered).
- **Cancel** a *Pending payment* / *Paid* order with a reason shown to the buyer.

## Refunds & payments — OM, SA

- Each order shows its payment status and the Razorpay payment id once captured.
- **Refund** (when captured or partially refunded): blank amount = full refund
  (order → *Refunded*); an amount = partial refund (payment only). Refunds call
  Razorpay and cannot be undone.

## Dashboard — all roles

- **Sales view** (OM, SA) — total orders and revenue, orders by status, revenue
  over time, top products, with a date-range picker.
- **Catalog view** (CM) — product counts (total / published / draft), and
  active/total categories and brands.

## Admin Users & RBAC — SA only

- Create admins (name, email, role); the new admin sets their own password via a
  reset email.
- Change another admin's role or active status inline; you cannot change your own
  role or deactivate yourself (`CANNOT_MODIFY_OWN_ACCOUNT`).

## My account — all roles

- Change your own password (current + new, ≥ 8 chars); changing it signs out your
  other sessions.

## Admin sign-in

- Two steps, always: **password, then a mandatory one-time code (2FA)**. A
  correct password alone never signs you in. Rate-limited to 5 attempts / 15 min.

## Shared platform

Both TechCart apps run on **one** Node/Express API and **one** MongoDB database —
no business logic is duplicated between them. Every API response uses the
`{ success, code, message }` envelope, Zod schemas on the backend are the single
validation authority, images are stored in Cloudflare R2, and payments go
through Razorpay. Local development runs all three services with
`docker compose up --build`; GitHub Actions lints and tests every pull request,
and Render (backend) and Vercel (both frontends) deploy on merge to `main`.

## Source

TechCart [README](https://github.com/Pravin671231/TechCart/blob/main/README.md),
[SRS](https://github.com/Pravin671231/TechCart/blob/main/docs/srs/SRS.md), and the
[Admin App user manual](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md).
