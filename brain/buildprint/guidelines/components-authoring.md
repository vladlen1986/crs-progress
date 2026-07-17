# Components: Creating & Updating
> Source: `buildprint guidelines get components/authoring` · Captured: 2026-07-17 (verbatim)

Use this path when packaging part of a Bubble app into a reusable Buildprint component, or updating one you already published. A component bundles selected projected files (pages, workflows, data types, API connectors, etc.) plus metadata and documentation so it can be added into another app.

All component work goes through `buildprint components package`. There is no Bubble-editor or web-UI path for authoring — the manifests in the branch workspace are the source of truth.

## Required companion paths

Read whichever of these match what the component contains, so you describe it accurately:
- `schema/data-type` - for components that add data types/fields
- `schema/workflow`, `workflows/backend` - for workflow components
- `editing/frontend` - for page/element components
- `schema/api-connector` - for API connector components

## The package layout

A component is authored as files inside the projected branch workspace:

- `library.json` - the library this component belongs to (a named collection of related components).
- `component.json` - the component manifest.
- `README.md` - the component's public long description (see below).
- `docs/` - optional agent-facing documentation listed in `component.json.docs` (see 'Two audiences' below).
- `library.md` - optional library long description (see 'The library overview' below).
- the selected workspace files listed in `component.json.nodes`.
- optional images referenced from `component.json.images` and `library.json.heroImage`.

`library.json` and `component.json` are stable v1 JSON manifests (no YAML). The same parser runs in the CLI and the backend.

### library.json

```json
{
  "manifestVersion": 1,
  "slug": "stripe-billing",
  "name": "Stripe Billing",
  "description": "Reusable Stripe billing components.",
  "heroImage": "images/banner.png",
  "readme": "library.md",
  "listingStatus": "internal"
}
```

- `slug`, `name` - library identity and display name.
- `description` - optional one-line library summary (shown on the library card).
- `heroImage` - optional local image path.
- `readme` - optional path to the library's long-description markdown (its overview page). See 'The library overview' below. Use a name OTHER than `README.md` (that is the component's), e.g. `library.md`.
- `listingStatus` - `internal` (default; visible only to your workspace), `awaiting_approval`, `public`, or `archived`. You set `internal` or `awaiting_approval`; only a platform admin flips a library to `public`.

### component.json

```json
{
  "manifestVersion": 1,
  "library": "stripe-billing",
  "slug": "checkout-flow",
  "name": "Checkout Flow",
  "shortDescription": "A checkout page and backend webhook pattern.",
  "status": "public",
  "categories": ["ui", "api"],
  "dependencies": ["billing-data-structure"],
  "nodes": ["pages/checkout", "api/webhooks/stripe"],
  "readme": "README.md",
  "images": ["images/cover.png"],
  "docs": ["docs/implementation.md"]
}
```

- `library` - target library slug only (full library metadata lives in `library.json`).
- `slug`, `name` - component identity and display name.
- `shortDescription` - the one-line summary shown on the component card. Max 120 characters. Required.
- `status` - `draft` (default), `public`, or `archived`. A component is only reachable outside your workspace when it is `public` AND its library is `public`.
- `categories` - one or more of `database`, `ui`, `workflow`, `expression`, `api`, `plugin`. At least one. List the valid values with `buildprint components categories`.
- `dependencies` - optional component slugs in the SAME library (bare slugs like `billing-data-structure`, not `stripe-billing/billing-data-structure`). A component cannot depend on itself. When someone adds the component, its dependencies are pulled in too.
- `nodes` - the projected workspace paths this component owns (e.g. `pages/home`, `api/webhooks/stripe`, a data type, an API connector group). At least one. They must point at existing projected paths.
- `readme` - path to the README (defaults to `README.md`). This is PUBLIC documentation.
- `images` - optional local image paths shown on the component page.
- `docs` - optional agent-facing doc paths (files or directories, e.g. `docs/`). Bundled with the package and unpacked next to the component on install, but NEVER shown in the public catalog. See 'Two audiences' below.

## Two audiences: public README vs. agent docs

A component carries documentation for two different readers — keep them separate:
- **`README.md` (public, user-facing).** Rendered on the component page in the catalog. It is what a human browsing the marketplace (or an agent deciding WHETHER to use the component) reads. Keep it user-facing: what the component is, what it builds, and how to use it. No internal build minutiae.
- **`docs/` (agent-facing, declared in `component.json.docs`).** Bundled with the package and unpacked next to the component on install, but NEVER shown in the catalog. This is where you write the implementation guidance for the agent that will actually integrate the component — gotchas, exact rewiring/ID notes, design decisions, anything too detailed or internal for the public page. See 'Agent docs' below.

Both ship inside the package, so anything in `docs/` is readable by anyone who installs the component — 'agent-facing' means 'not listed publicly', not 'secret'. Don't put credentials or anything sensitive in either place.

## Writing the README (the public long description)

The README IS the component's long description — it is rendered on the component page and is how a reader (a human or an agent) decides whether and how to use the component. Write it so someone can understand and apply the component WITHOUT opening the package files. Max 10,000 characters. Keep it public and user-facing; put agent implementation notes in `docs/` instead.

Required headings (validated):
- `# Overview` - what the component does and what it adds to the app.
- `# How to use` - integration steps: how to wire it into the destination app.

Hard rules (the package step rejects violations):
- Do NOT repeat the component name as a top-level `#` title heading. The name is already shown above the description in the UI. Lead with `# Overview`.
- The README must not be empty and must be at most 10,000 characters.
- The README is public catalog copy. Use display names only. Do NOT reference internal Bubble IDs, generated type IDs, workspace paths, JSON files, manifest filenames, package file paths, or source file locations. Put those implementation details in `docs/`.

Content guidance:
- Write for a Buildprint agent that already has workspace context. Do NOT state self-evident prerequisites such as 'requires a linked Buildprint workspace', 'access to the source Bubble branch', or 'a CLI token'. Go straight to the integration detail.
- Beyond the two required headings, structure it however the component needs — but describe what it actually BUILDS, concretely:
  - Data types: list each data type and the fields it adds by display name. Do not include internal type strings like `custom.foo`, `option.bar`, or API Connector return IDs.
  - Workflows: explain each workflow — its trigger and what it does.
  - Pages / reusable elements: what each page or element provides.
  - API connectors / plugins: the specific calls or plugin setup included by display name. Do not include internal connector ids, JSON filenames, or workspace paths.
- The goal: anyone reading the description understands what the component does and how it works, end to end.

## Agent docs (the `docs` field)

Use `component.json.docs` to ship documentation written FOR the implementing agent — the things that help someone adapt the component into a real app but don't belong on the public page. List file or directory paths (a directory is bundled recursively, so you can just point at `docs/`):

```json
"docs": ["docs/implementation.md", "docs/data-model.md"]
```

Good agent-doc content:
- Exact rewiring notes: which references, ids, data sources, option sets, and custom states must be remapped, and to what.
- The data model the component assumes (types/fields), so the agent can reconcile it with the destination app.
- Gotchas, ordering constraints, and decisions that aren't obvious from the files.
- App-specific config the component intentionally left out (endpoints, secrets to supply, redirect URLs).

Docs are bundled into the package and unpacked to `.buildprint/components/<library>/<component>/docs/...` on install; the `add` command points the agent at them. They are not validated for structure (free-form) beyond safe relative paths and must exist at package time. They are never stored as the long description or shown in the catalog.

## The library overview (optional library long description)

A library can have its own long description — an 'about this collection' overview shown on the library page above its components. It is OPTIONAL. To add one, point `library.json.readme` at a markdown file (e.g. `library.md`) and write the overview there. Max 10,000 characters.

Use it to describe the library as a whole: what the collection is for, what the components have in common, and how they fit together — not the detail of any one component (that belongs in each component's README).

Rules (the package step rejects violations): it must not be empty, must be at most 10,000 characters, and must not repeat the library name as a top-level `#` title heading (the name is already shown above it). It is free-form otherwise — no required sections.

Because every component carries a copy of `library.json` (and its `readme`), the library's name, description, overview, hero image, and listing status are taken from whichever component you package. Keep `library.json` and `library.md` IDENTICAL across all components in the same library so re-packaging one does not overwrite the library with stale metadata.

## Selecting nodes

`nodes` are the projected files the component carries. Pick the smallest set that makes the component self-contained:
- Include the primitives the component is about (the page, the workflow, the data type, the API connector group).
- Include same-library components it relies on via `dependencies` rather than duplicating their nodes.
- Do not include unrelated app files. Each node path must exist in the projected workspace.

## Packaging and publishing

1. Author `library.json`, `component.json`, `README.md`, any agent `docs/`, the optional `library.md`, any images, and confirm the `nodes` paths exist in the projected workspace.
2. Validate without uploading:
   ```bash
   buildprint components package --dry-run
   ```
   This checks the manifests, README headings/length/title rule, the optional library overview, node paths, and image paths locally, then checks backend permissions and dependency availability. Missing/non-public/archived/unpackagable dependencies are reported as warnings and do NOT block packaging.
3. Upload:
   ```bash
   buildprint components package
   ```
   This creates or updates the library and component rows and stores the package zip.

### Publishing visibility

- Publish inside your workspace: set `"status": "public"` in `component.json` and package again. Workspace members can now list and add it.
- Submit a library to the public marketplace: set `"listingStatus": "awaiting_approval"` in `library.json` and package again. A platform admin reviews and approves it to `public`. You cannot set `public` yourself.
- Public discovery requires BOTH sides public: the library `listingStatus` is `public` and the component `status` is `public`.

## Updating an existing component

Updating is the same command. Package again with the SAME `library` and component `slug`:

```bash
buildprint components package
```

Re-packaging updates the existing component row in place — new files, `shortDescription`, README (long description), images, categories, dependencies, and status all reflect the current manifests and files. There is no separate update command and no version history in v1; the current package replaces the previous one.

When you change what the component builds, update the README in the same pass so the long description stays accurate.

## What NOT to do

- Don't edit a published component by hand or in the Bubble editor — re-package it so the catalog stays in sync.
- Don't reference cross-library or versioned dependencies (v1 supports same-library bare-slug dependencies only).
- Don't rely on a web UI to edit component/library metadata — the manifests are authoritative.
