# Admin App — User Manual

The TechCart admin console is where staff manage the catalogue, inventory,
orders, and — for super-admins — other admin accounts. Every account has exactly
one role: **catalog-manager**, **order-manager**, or **super-admin**. The sidebar
only shows what your role can open, and the backend enforces the same rules on
every request. Sign-in is two steps: password, then a mandatory one-time code
(2FA).

**[Read the full manual →](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md)**
(rendered on GitHub with screenshots)

For a fresh deployment, work through sections 5 → 11 in order: categories before
specifications, specifications and variant axes before products, products and
warehouses before inventory.

## What it covers

| # | Section | |
| --- | --- | --- |
| 1 | Roles & access | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#1-roles--access) |
| 2 | Signing in | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#2-signing-in) |
| 3 | Console layout | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#3-console-layout) |
| 4 | Dashboard | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#4-dashboard) |
| 5 | How to add a brand | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#5-how-to-add-a-brand) |
| 6 | How to add a category or subcategory | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#6-how-to-add-a-category-or-subcategory) |
| 7 | How to define a category's specification schema | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#7-how-to-define-a-categorys-specification-schema) |
| 8 | How to define a category's variant axes | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#8-how-to-define-a-categorys-variant-axes) |
| 9 | How to add a product | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#9-how-to-add-a-product) |
| 10 | How to add a warehouse | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#10-how-to-add-a-warehouse) |
| 11 | How to set inventory stock | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#11-how-to-set-inventory-stock) |
| 12 | Orders | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#12-orders) |
| 13 | Refunds & payments | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#13-refunds--payments) |
| 14 | Admin users | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#14-admin-users) |
| 15 | My account | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#15-my-account) |
| 16 | Reference | [open](https://github.com/Pravin671231/TechCart/blob/main/docs/user-manuals/admin-app.md#16-reference) |

## Role → area

| Area | catalog-manager | order-manager | super-admin |
| --- | :---: | :---: | :---: |
| Dashboard | catalog view | sales view | sales view |
| Products, Categories, Brands, Specifications, Variant types | ✅ | ✅ | ✅ |
| Inventory, Warehouses | ✅ | — | ✅ |
| Orders, Refunds | — | ✅ | ✅ |
| Admin Users | — | — | ✅ |

## Related

- [Admin App case study](../case-studies/admin-app.md)
- [Admin App features](../features/admin-app.md)
- [Buyer App manual](buyer-app.md)
