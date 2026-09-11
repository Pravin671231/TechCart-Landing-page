# TechCart Landing Page

Specification and documentation for the **TechCart** landing page — a single
public web page that presents [TechCart](https://github.com/Pravin671231/TechCart)
as a product and doubles as a guide to the engineering process behind it.

> **Status:** spec only. The landing page itself is **not built yet**. This
> repository currently holds the SRS it will be built against.
>
> **Tracking:** milestone [M1 — Landing Page](https://github.com/Pravin671231/TechCart-Landing-page/milestone/1),
> issues [#1–#6](https://github.com/Pravin671231/TechCart-Landing-page/issues).

## Documentation

| Document | Purpose |
| -------- | ------- |
| [`docs/srs/SRS.md`](docs/srs/SRS.md) | Master SRS — scope, feature index, traceability, workflow, and a full appendix of the TechCart facts the page relies on |
| [`docs/srs/features/LP-001-landing-page.md`](docs/srs/features/LP-001-landing-page.md) | The landing-page feature spec — functional requirements (`FR-LP-001`…`FR-LP-020`), non-functional requirements, UI/UX, and acceptance criteria |
| [`docs/milestone.md`](docs/milestone.md) | Milestone roadmap — M1 scope, the six work packages, and the Definition of Done |
| [`docs/issues.md`](docs/issues.md) | Issue drafts M1.1–M1.6 (opened as #1–#6) with task checklists and a full requirement-to-issue coverage table |
| [`docs/architecture.md`](docs/architecture.md) | How the page will be built: Astro + Tailwind, planned source layout, deploy topology, repo conventions |
| [`docs/user-manuals/`](docs/user-manuals/) | Entry point + per-app summaries linking TechCart's live Buyer App and Admin App user manuals |
| [`docs/case-studies/`](docs/case-studies/) | A short Problem → Approach → Architecture → Outcome write-up for the TechCart Buyer App and Admin App |
| [`docs/features/`](docs/features/) | The TechCart capability set, split into buyer-facing and staff-facing feature lists |

## Planned stack

Astro + Tailwind CSS + TypeScript, static output, deployed on Vercel, Node 24.
Rationale in [`docs/architecture.md`](docs/architecture.md).

## Next steps

Follow TechCart's own five-step, spec-driven workflow:

```
Feature → Update SRS → Add to Milestone → Add to Issue → Implement Code
```

1. ~~Review and approve `docs/srs/SRS.md` and `LP-001`.~~
2. ~~Create milestone **M1 — Landing Page** and file the implementation issues.~~
   Done — milestone M1, issues [#1–#6](https://github.com/Pravin671231/TechCart-Landing-page/issues).
3. Work the issues in order (#1 → #2 → #3/#4/#5 → #6): scaffold the Astro project
   and build the page against `LP-001`, checking each section off against its
   `FR-LP-###` acceptance criteria.
4. Deploy to Vercel; squash-merge to `main`; tag `v1.0.0`.

## Related

- TechCart repository: <https://github.com/Pravin671231/TechCart>
- TechCart SRS and architecture docs: `docs/srs/SRS.md` and `docs/architecture.md`
  in that repository
