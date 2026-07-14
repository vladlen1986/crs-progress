# CLI: Installing and packaging components
> Source: https://docs.buildprint.ai/cli/installing-and-packaging-components-ltb29 · Captured: 2026-07-14

Components are "reusable, publishable bundles of Bubble app logic - elements, workflows, and API calls packaged as a unit so they can be installed into another app." The `buildprint components` command group covers discovering, installing, and packaging.

Initial setup — review relevant guidelines:

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

- `components list` — "lists visible published components"
- `components search [query...]` — "searches visible published components"

Both support filtering via `--library <slug>`, `--category <category>` (repeatable for multiple filters), `--limit <count>` (range 1-100, default 50), `--offset <count>` (pagination), and `--json`.

- `components categories` — "lists the valid categories for `component.json`"; accepts `--json`.

## Installing a component

```bash
buildprint components add stripe-kit/checkout-flow
buildprint components add stripe-kit/checkout-flow --json
```

`components add <component>` "downloads and unpacks a component package into `.buildprint/components`." The component identifier uses `<library>/<component>` slug format. `--json` outputs results as JSON.

## Packaging a component

Packaging leverages `library.json` and `component.json` configuration files (see [publishing-and-updating-components.md](publishing-and-updating-components.md) for their contents):

```bash
buildprint components package
buildprint components package --dry-run
buildprint components package --library ./library.json --component ./component.json
```

Flags:

- `--library <path>` (default `library.json`)
- `--component <path>` (default `component.json`)
- `--dry-run` — validates and builds without uploading
- `--json` — outputs results as JSON
