# Migrating Frontend
> Source: `buildprint guidelines get migrating/frontend` · Captured: 2026-07-17 (verbatim)

Use the Buildprint worktree as the source of truth when migrating Bubble UI to traditional code such as React. Break the migration into reasonable steps and ensure every piece of Bubble UI is mapped 1:1 to code, including conditional states, custom CSS, and data wiring.

## Reusable elements

Reusable elements in Bubble are similar to React components and should generally be made into reusable elements. Beyond this, if you see repeated patterns, feel free to consolidate them into components, so long as it remains an exact 1:1 copy of the UI.

## Colors

Styles and design tokens live in the worktree under `styles/`, especially `styles/tokens.json`, `styles/defaults.json`, and `styles/fonts.json`.
Other app-wide settings live under `settings/client-safe.json` and related extracted settings files.

## Images and embeds

If the Bubble app uses hardcoded image URLs, you can port those directly over, keeping the URL the same. Depending on your framework, you may need to add the domain/URL to the config as it will be a foreign URL.

## How to go about implementing UI migration

The exact method is up to you, but generally speaking it is wise to:
1. Understand the colors, styles, tokens, and typography of the app from the worktree first
2. Understand the existing state of the codebase you’re migrating UI to
3. Read the general structure of the UI with `buildprint summary`, `buildprint tree`, and direct file reads
4. Once you have enough exact details on the parent elements, implement them. Then keep drilling down into exact child properties and behaviors, building component by component. A top-down approach is usually effective.

## Common mistakes

- Forgetting fit width/full width properties as appropriate
- If icons in Bubble are, for example, 30×30px but include 4px of padding, then the icon is actually only 22×22px.
- Fonts will sometimes need to be imported from Google fonts.
- Try to use the same icon pack as the Bubble app.
- Do not make approximations/assumptions. You always need the full properties of every element you’re implementing.
