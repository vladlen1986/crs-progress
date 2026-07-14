# Publishing and updating components
> Source: https://docs.buildprint.ai/publishing-and-updating-components-365c9 · Captured: 2026-07-14 (verbatim .md)

Turn a piece of one of your Bubble apps into a reusable component so you (and, once approved, everyone) can drop it into other apps. You can do this two ways: **ask your Buildprint agent to do it**, or **run the CLI yourself**.

> [!INFO]
> At this time, we are not approving submissions to the component marketplace. If you wish to do this in future, you're welcome to create your private components now and submit them when we begin accepting submissions.

## The easy way: ask your agent

Whether you're in the Buildprint web app chat or working through your CLI agent, just describe what to publish:

- "Package this Stripe checkout flow as a component."
- "Publish our billing data structure to our workspace library."
- "Update the webhook handler component with the changes I just made."

The agent assembles the component's files, writes its documentation, and runs the packaging step for you. This is the recommended path — you don't have to learn the file format.

## What a component package contains

If you'd rather author it directly (or want to know what the agent produces), a component is described by a few files in your branch workspace:

- `library.json` — the library it belongs to: slug, name, description, listing status (`internal` by default, or `public`), and an optional hero image.
- `component.json` — the component itself: slug, name, **short description**, status, categories, dependencies, the workspace files to include (`nodes`), the README path, and image paths.
- `README.md` — the component's **long description**. This is what people read on the component page, so it must explain what the component does and how it works. It's required to include these headings: **Overview**, **How to apply**, and **Requirements**.
- the **workspace files and images** referenced from `component.json`.

### Descriptions

- **Short description** (`shortDescription` in `component.json`, up to 120 characters) is the one-line summary shown on the component's card.
- **Long description** (your `README.md`, up to 10,000 characters) is the full write-up shown on the component page. Anyone reading it should come away understanding what the component does, how to apply it, and what it requires.

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

From your branch workspace, run:

```bash
buildprint components package
```

This validates your manifests and README, bundles the referenced files, and uploads the package. Useful flags:

- `--dry-run` — validate and build the package without uploading it.
- `--library <path>` / `--component <path>` — point at non-default manifest locations.

**Updating** a component is the same command: package it again with the same library and component slug, and Buildprint updates the existing component in place (new files, description, images, and status).

> All component work goes through the Buildprint CLI (or the agent, which uses it). Don't edit published components by hand — re-package them so the catalog stays in sync.

## Categories

Tag each component with one or more categories so people can find it:

`database`, `ui`, `workflow`, `expression`, `api`, `plugin`.

List the valid categories any time with:

```bash
buildprint components categories
```

## Dependencies

If a component needs another component from the same library, list it under `dependencies` (by slug). When someone installs your component, Buildprint pulls in its dependencies too. A component can't depend on itself, and dependencies are resolved within the same library.

## Sharing on the marketplace

By default a library is **internal** - published only to your workspace. To put  
it on the public marketplace, package the library with a `public` listing status.  
It then enters **Awaiting approval** and a Buildprint admin reviews it before it  
goes live.
