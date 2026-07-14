# Publishing and updating components
> Source: https://docs.buildprint.ai/publishing-and-updating-components-365c9 · Captured: 2026-07-14

Turn sections of your Bubble apps into reusable components for deployment across other apps. Two methods: **ask your Buildprint agent** or **use the CLI directly**.

> INFO: Component marketplace submissions are currently unavailable. You may establish private components now and submit when the program reopens.

## The easy way: ask your agent

In the Buildprint web interface or CLI agent, describe what to publish:

- "Package this Stripe checkout flow as a component."
- "Publish our billing data structure to our workspace library."
- "Update the webhook handler component with the changes I just made."

The agent handles assembly, documentation generation, and packaging. This is the suggested approach since you need not master the file structure.

## What a component package contains

Components consist of multiple files within your branch workspace:

- `library.json` — library details: slug, name, description, listing status (`internal` by default, or `public`), and optional hero image.
- `component.json` — component specifications: slug, name, short description, status, categories, dependencies, workspace files (`nodes`), README location, and image paths.
- `README.md` — full component description for the component page. Must include **Overview**, **How to apply**, and **Requirements** sections.
- Workspace files and images referenced via `component.json`.

### Descriptions

- **Short description** (maximum 120 characters in `component.json`) appears on component cards as "a one-line summary shown on the component's card."
- **Long description** (README file, up to 10,000 characters) is the full component page writeup explaining functionality, application methods, and prerequisites.

```json
// component.json
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
  "images": ["images/cover.png"]
}
```

## Publishing or updating with the CLI

From your branch workspace:

```bash
buildprint components package
```

This validates manifests and README, bundles referenced files, and uploads the package. Flags:

- `--dry-run` — validate and build without uploading.
- `--library <path>` / `--component <path>` — specify alternative manifest paths.

**Updating** follows identical procedures: repackage using matching library and component slugs, and Buildprint refreshes the existing component automatically (new files, descriptions, images, status).

> "All component work goes through the Buildprint CLI (or the agent, which uses it). Don't edit published components by hand — re-package them so the catalog stays in sync."

## Categories

Assign one or more categories for discoverability: `database`, `ui`, `workflow`, `expression`, `api`, `plugin`.

List valid categories anytime:

```bash
buildprint components categories
```

## Dependencies

When components require others from the same library, specify them under `dependencies` (using slugs). Installation automatically includes dependencies. Self-dependencies are prohibited, and dependency resolution occurs within single libraries only.

## Sharing on the marketplace

Libraries default to **internal** status — accessible only within your workspace. For public marketplace availability, package the library with `public` listing status. The component then enters **Awaiting approval** while Buildprint administrators review before launch.
