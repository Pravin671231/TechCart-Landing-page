# Buyer App — Features

Everything a shopper can do in the TechCart storefront. See the
[Buyer App user manual](../user-manuals/buyer-app.md) for step-by-step guides.

## Discovery

- **Search** with a suggestions dropdown after two characters (up to five
  categories and five products), and a full results page with relevance /
  price / newest sorting.
- **Category browsing** from a two-level category menu, with breadcrumbs.
- **Faceted filters** — price range, brand, per-category specification facets,
  variant options, in-stock only, on-sale only.
- **Sorting** — Recommended, Newest, Price low→high, Price high→low.
- **Paging** — the home grid loads more on scroll; category and search results
  use numbered pages.
- Prices shown in Indian Rupees with no decimals (`₹1,24,999`).

## Product details

- Image **gallery** with thumbnails.
- **Variant selector** — picking a colour, size, etc. updates price, availability
  and images instantly with no page reload; the page opens on the lowest-priced
  in-stock variant.
- **Availability badge** — In stock / Out of stock.
- **Specifications** shown in collapsible groups, each value with its unit.

## Cart

- Persistent **per-buyer cart** (sign-in required); quantity stepper from 1 to
  10 per line.
- Lines that become unavailable are kept but excluded from the total and clearly
  marked.
- Header **mini-cart** dropdown with a running subtotal.
- **Buy Now** adds to the cart and jumps straight to checkout.

## Checkout & payments

- Single-page checkout: choose a saved **shipping address** or add one inline.
- **Razorpay Checkout** overlay (card / UPI / net-banking, per the merchant
  account).
- The order is created the moment you place it (status *Pending payment*) and the
  items leave your cart — you can pay later or cancel.
- **Retry payment** if a payment attempt fails or the window is dismissed.

## Orders

- **Order history** with status badges and totals; numbered paging.
- **Order detail** — items, shipping address, and a full status timeline.
- **Cancel** an order while it is *Pending payment* or *Paid*.
- Statuses: Pending payment → Paid → Processing → Shipped → Delivered, plus
  Cancelled and Refunded.

## Account

- **Profile** — edit name and phone (email is read-only); lifetime orders and
  lifetime spend.
- **Saved addresses** — add, edit, delete, set default; the same form is used at
  checkout.

## Sign-in

- **No password.** Sign in with Google or with a 6-digit one-time code emailed to
  you; first sign-in creates the account automatically.
- You are returned to whatever action you were doing after signing in.

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
[Buyer App user manual](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/buyer-app.md).
