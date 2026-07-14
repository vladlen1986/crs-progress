# CLI: Installing and packaging components
> Source: https://docs.buildprint.ai/cli/installing-and-packaging-components-ltb29 · Captured: 2026-07-14 (verbatim .md)

Components are reusable, publishable bundles of Bubble app logic - elements, workflows, and API calls packaged as a unit so they can be installed into another app. The `buildprint components` command (alias `component`) discovers published components, installs them into a workspace, and packages your own for publishing.

Review the relevant guideline before you start:

```bash
buildprint guidelines get components/installing
buildprint guidelines get components/authoring
```

## Discovering components

```bash
buildprint components list
buildprint components list --library stripe-kit --json
buildprint components list --category ui
buildprint components list --limit 20 --offset 20
buildprint components search checkout
buildprint components search payments --category api
buildprint components categories
```

- `components list` lists visible published components.
- `components search [query...]` searches visible published components.
- Both accept `--library <slug>`, `--category <category>` (repeat to filter on more than one), `--limit <count>` (page size, 1-100, default 50), `--offset <count>` (for pagination), and `--json`.
- `components categories` lists the valid categories for `component.json`, and accepts `--json`.

## Installing a component

```bash
buildprint components add stripe-kit/checkout-flow
buildprint components add stripe-kit/checkout-flow --json
```

- `components add <component>` downloads and unpacks a component package into `.buildprint/components`.
- `<component>` is the slug in `<library>/<component>` form.
- `--json` prints the unpack result as JSON.

## Packaging a component

`buildprint components package` builds a package from your workspace using `library.json` and `component.json`, then uploads it.

```bash
buildprint components package
buildprint components package --dry-run
buildprint components package --library ./library.json --component ./component.json
```

- `--library <path>` is the path to `library.json` (default `library.json`).
- `--component <path>` is the path to `component.json` (default `component.json`).
- `--dry-run` validates and builds the package zip without uploading it.
- `--json` prints the package result as JSON.
