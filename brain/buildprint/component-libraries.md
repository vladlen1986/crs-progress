# Component libraries
> Source: https://docs.buildprint.ai/component-libraries-wwbiq · Captured: 2026-07-28 (verbatim .md)

A **library** is a named collection of related components. For example, a "Stripe Billing" library might hold a Customers API connector, an Invoices API connector, a webhook handler workflow, and a billing data structure. Libraries keep related components together and control who can see them.

## Workspace vs. public

Every library is either private to your workspace or shared on the public marketplace.

- **Workspace libraries** are private to your workspace. This is where you  
  standardize and reuse your own components - the building blocks your team  
  pulls into every project. Only members of your workspace can see them.
- **Public libraries** are the shared Buildprint marketplace. Once a library is public, every Buildprint workspace can find and install its components.

## Visibility, end to end

Two things control whether someone can use a component: the **library's listing status** and the **component's own status**.

**Library listing status**

| Status | Who can see the library |
| --- | --- |
| **Private** | Only your workspace (the default) |
| **Awaiting approval** | Submitted to the marketplace, under review by Buildprint |
| **Public** | Live on the marketplace — every workspace |
| **Archived** | Hidden |

**Component status** (within its library)

| Status | Meaning |
| --- | --- |
| **Draft** | Work in progress, not published |
| **Public** | Published within its library |
| **Archived** | Retired |

**The rule that ties them together:** a component is reachable by people **outside** your workspace only when the component is **Public **_**and**_** its library**  
**is Public**. Inside an internal library, every component is effectively internal  
\- no matter its own status - because the library itself isn't on the  
marketplace. That's why a component's badge reads "Internal" until its library  
goes public.

## Going public

Publishing to the marketplace is a reviewed step:

1. You package a library with a **public** listing status.
2. The library moves to **Awaiting approval** - it isn't live yet.
3. A Buildprint admin reviews it and approves it to **Public**.

Workspace admins can't flip a library straight to public on their own; the review step keeps the marketplace clean. Until approval, the library and its components stay visible only to your workspace.

## What's in a component

Each component in a library carries:

- a **name** and a **short description** (the one-liner on its card),
- a **full description** (overview, how to apply, and requirements),
- one or more **categories** (database, UI, workflow, expression, API, plugin),
- **dependencies** — other components in the library it needs, and
- **images**
