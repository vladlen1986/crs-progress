# Component libraries
> Source: https://docs.buildprint.ai/component-libraries-wwbiq · Captured: 2026-07-14

A **library** is "a named collection of related components." For example, a "Stripe Billing" library might contain API connectors, webhook handlers, and data structures. Libraries group related components and manage access permissions.

## Workspace vs. public

- **Workspace libraries** remain private to your workspace — standardized, reusable building blocks for your team only.
- **Public libraries** are available on the Buildprint marketplace, accessible to all Buildprint workspaces.

## Visibility, end to end

Component accessibility depends on library listing status AND component status.

### Library listing status

| Status | Who can see the library |
| --- | --- |
| **Private** | Only your workspace (default) |
| **Awaiting approval** | Under marketplace review by Buildprint |
| **Public** | Live on the marketplace for every workspace |
| **Archived** | Hidden |

### Component status (within library)

| Status | Meaning |
| --- | --- |
| **Draft** | Work in progress, unpublished |
| **Public** | Published within its library |
| **Archived** | Retired |

**Access rule:** "a component is reachable by people outside your workspace only when" it is both Public and its library is Public. Components show "Internal" badges until their library goes public.

## Going public

1. Package a library with **public** listing status.
2. Library moves to **Awaiting approval** — not yet live.
3. Buildprint admin reviews and approves to **Public**.

Workspace admins cannot independently make libraries public; review maintains marketplace quality.

## What's in a component

- Name and short description
- Full description (overview, application, requirements)
- One or more categories (database, UI, workflow, expression, API, plugin)
- Dependencies on other library components
- Images
