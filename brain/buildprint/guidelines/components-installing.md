# Components: Finding & Installing
> Source: `buildprint guidelines get components/installing` · Captured: 2026-07-17 (verbatim)

Use this path when you want to pull an existing Buildprint component into the app you are working on — to add a feature (a checkout flow, a billing data model, a webhook handler) without building it from scratch.

## Mental model: a component is a canonical example, not a one-click install

This is the most important thing to understand. A component is a worked, known-good EXAMPLE of how to build something in Bubble — not a drop-in module that wires itself into your app. `buildprint components add` does NOT mutate your Bubble branch. It downloads the package into a scratch folder for you to read and learn from.

It is YOUR job, as the agent, to take what you need and adapt it to fit the target app exactly:
- Regenerate or remap IDs so they are unique and valid in the destination app.
- Rewire references — data sources, fields, option sets, custom states, reusable element references, workflow/action targets — to the destination app's real names and ids.
- Match the app's existing data model, naming, and styles instead of importing the example's verbatim.
- Take only the parts you need and drop the rest.

Treat the component as a reference implementation that makes integration far easier and lower-risk than starting blank — not as something that 'just works' on its own. Set expectations accordingly: the value is a correct example to adapt, not zero-effort installation.

## Required companion paths

Adapting a component means editing the branch worktree, so read the editing contract and the schema for whatever the component contains:
- `editing/apps` - filesystem editing contract and how ids/paths work.
- `schema/data-type` - when the component adds data types/fields.
- `schema/workflow`, `workflows/backend` - for workflow components.
- `editing/frontend`, `editing/frontend/expressions` - for page/element components.
- `schema/api-connector` - for API connector components.

## 1. Find a component

Search and list against the linked workspace's visible catalog (workspace/internal libraries plus approved public libraries):

```bash
buildprint components list
buildprint components list --library stripe-billing --category ui
buildprint components search checkout
buildprint components search payments --category api --json
```

- `search` matches case-insensitive substrings across slug, library name, component name, short/long description, and categories.
- repeated `--category` filters are all-of; `--library` filters by library slug.
- `--json` gives machine-readable results for picking the exact `<library>/<component>` slug.
- only `public` components inside visible libraries are returned.

## 2. Add (download & unpack) the component

```bash
buildprint components add stripe-billing/checkout-flow
```

This downloads the current package zip and unpacks it under:

```text
.buildprint/components/<library>/<component>/
```

Notes:
- This is a Buildprint-owned scratch location in the app root. It does NOT edit the active Bubble branch worktree.
- Missing same-library dependencies are installed first (into their own `.buildprint/components/<library>/<dependency>/` folders); dependency folders already present are skipped. A missing, undownloadable required dependency blocks the unpack; dependency cycles fail with the cycle chain.
- The command prints the package README after unpacking, and lists any bundled agent docs to read (or returns both with `--json`).

## 3. Understand what it builds

There are two kinds of documentation in a package, and they serve different readers:
- The **README** is PUBLIC, user-facing documentation. `# Overview` tells you what it does and `# How to use` is the author's integration guidance. Read it first for the high-level picture.
- The **agent docs** (the `docs` declared in `component.json`, unpacked under `.buildprint/components/<library>/<component>/docs/`) are written FOR YOU, the implementing agent — the build details, gotchas, ID/rewiring notes, and decisions that don't belong in public-facing docs. When a component ships docs, READ THEM before integrating; they are the most direct guidance on how to adapt the component correctly.

Then, before changing anything in the destination app:
- Read the unpacked payload under `.buildprint/components/<library>/<component>/files/` — these are the projected Bubble files (the example implementation) plus `component.json`/`library.json`.
- Inventory dependencies you'll also need from the installed dependency folders.

## 4. Adapt and integrate into the app

Now do the real work in the branch worktree, following `editing/apps` and the relevant schema paths:
1. Decide what to take — the whole thing or specific pieces (one workflow, one data type, a page).
2. Recreate or copy those primitives into the destination app's real paths, giving them ids that are unique and valid there. Do not paste example ids blindly.
3. Rewire every reference to the destination app:
   - data sources, field references, and `group_type` to the app's actual data types/fields,
   - option set references, custom states, and conditions,
   - dynamic expressions (including `GetElement` references),
   - workflow/action target element ids and custom-event calls,
   - reusable element references.
4. Align names, styles, and layout with the app's conventions.
5. Reconcile the data model: if the component assumes fields/types the app lacks, add them (see `schema/data-type`); if the app already has equivalents, point at those instead of duplicating.
6. Fill in app-specific secrets, endpoints, and config the component intentionally left out.

## 5. Validate and apply

Adapted edits go through the normal Buildprint flow — `buildprint check` then `buildprint apply` — and you review the diff like any other change. The `.buildprint/components/...` scratch folder is just reference material; it is never applied to Bubble directly.

## Don't

- Don't expect `add` to change your app — it only unpacks reference files.
- Don't carry example ids, names, or data references into the app unchanged.
- Don't import parts you don't need just because they're in the package.
