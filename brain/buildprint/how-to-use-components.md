# How to use components
> Source: https://docs.buildprint.ai/how-to-use-components-vzb3l · Captured: 2026-07-14

Components are pre-built pieces of a Bubble app including "UI, workflows, expressions, API connectors, plugins, and data structures" that you can integrate rather than building from scratch.

> INFO: Components are in beta and subject to change.

## The easy way: ask Buildprint

Instead of manually searching, request components through the Buildprint agent via web chat or CLI with natural-language requests like:

- "Add a Stripe checkout flow to my app."
- "I need a billing data structure for customers, subscriptions, and invoices."
- "Find me a component for retrying failed background workflows."

Buildprint uses semantic search, identifies the best match, retrieves dependencies, and applies it to the app following the component's documentation before requesting user review.

## Browsing the catalog yourself

The Components section in your workspace displays:

- **Your libraries** — workspace-specific components
- **Public libraries** — shared components from the Buildprint marketplace

Search filters by purpose and source. Opening a library reveals components organized by type, with details including summaries, categories, dependencies, and installation counts.

## Component types

| Category | Function |
| --- | --- |
| **Database** | Data types and fields |
| **UI** | Pages and reusable elements |
| **Workflow** | Backend or page workflows |
| **Expression** | Reusable expressions / logic |
| **API** | API connector call patterns |
| **Plugin** | Plugin setup and configuration |

## What happens when you add one

Adding a component triggers automatic downloading, unpacking into the workspace, and application of all included elements. Dependent components install automatically, with changes reviewed through the standard Buildprint workflow.
