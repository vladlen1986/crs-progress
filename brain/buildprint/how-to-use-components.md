# How to use components
> Source: https://docs.buildprint.ai/how-to-use-components-vzb3l · Captured: 2026-07-14 (verbatim .md)

Components are pre-built pieces of a Bubble app - UI, workflows, expressions, API  
connectors, plugins, and data structures - that you can drop into your app  
instead of building them from scratch. Each one is packaged with everything it  
needs and documented so you know exactly what it does and how it fits.

> [!INFO]
> Components are in beta and subject to change.

## The easy way: ask Buildprint

You don't have to hunt through a catalog. Tell your Buildprint agent what you need, in the web app chat or through your CLI agent:

- "Add a Stripe checkout flow to my app."
- "I need a billing data structure for customers, subscriptions, and invoices."
- "Find me a component for retrying failed background workflows."

Buildprint searches the catalog by meaning (not just keywords), picks the best  
match, pulls in anything it depends on, and adds it to your app - following the  
component's own "How to apply" instructions. You review the result like any  
other Buildprint change before it lands.

## Browsing the catalog yourself

Open **Components** in your workspace to browse everything available to you:

- **Your libraries** - components published inside your workspace.
- **Public libraries** - components shared on the Buildprint marketplace by other  
workspaces.

Use the search box to find components by what they do. Filter the source between your workspace and public libraries.

Open a library to see its components grouped by type, then open a component to read its full details:

- a short summary and a complete description (overview, how to apply, and requirements),
- its categories,
- its dependencies (other components it needs), and
- how many times it's been installed.

## Component types

Every component is tagged with one or more categories so you can tell at a glance what it brings to your app:

| Category | What it adds |
| --- | --- |
| **Database** | Data types and fields |
| **UI** | Pages and reusable elements |
| **Workflow** | Backend or page workflows |
| **Expression** | Reusable expressions / logic |
| **API** | API connector call patterns |
| **Plugin** | Plugin setup and configuration |

## What happens when you add one

When you add a component, Buildprint downloads its package, unpacks it into your  
workspace, and applies it - pages, workflows, data types, and anything else it  
includes. Components can depend on other components; those are added too. You  
always review and apply the changes through the normal Buildprint flow.
