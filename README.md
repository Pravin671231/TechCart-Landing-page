# TechCart Landing Page

Specification and documentation for the **TechCart** landing page — a single
public web page that presents [TechCart](https://github.com/Pravin671231/TechCart)
as a product and doubles as a guide to the engineering process behind it.

> **Status:** spec only. The landing page itself is **not built yet**. This
> repository currently holds the SRS it will be built against.

## Documentation

| Document | Purpose |
| -------- | ------- |
| [`docs/srs/SRS.md`](docs/srs/SRS.md) | Master SRS — scope, feature index, workflow, and a full appendix of the TechCart facts the page relies on |
| [`docs/srs/features/LP-001-landing-page.md`](docs/srs/features/LP-001-landing-page.md) | The landing-page feature spec — functional requirements (`FR-LP-001`…`FR-LP-020`), non-functional requirements, UI/UX, and acceptance criteria |
| [`docs/architecture.md`](docs/architecture.md) | How the page will be built: Astro + Tailwind, planned source layout, deploy topology, repo conventions |

## Planned stack

Astro + Tailwind CSS + TypeScript, static output, deployed on Vercel, Node 24.
Rationale in [`docs/architecture.md`](docs/architecture.md).

## Next steps

Follow TechCart's own five-step, spec-driven workflow:

```
Feature → Update SRS → Add to Milestone → Add to Issue → Implement Code
```

1. Review and approve `docs/srs/SRS.md` and `LP-001`.
2. Create milestone **M1 — Landing Page** and file the implementation issue(s).
3. Scaffold the Astro project and build the page against `LP-001`, checking each
   section off against its `FR-LP-###` acceptance criteria.
4. Deploy to Vercel; squash-merge to `main`.

## Related

- TechCart repository: <https://github.com/Pravin671231/TechCart>
- TechCart SRS and architecture docs: `docs/srs/SRS.md` and `docs/architecture.md`
  in that repository
