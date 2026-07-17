# Global Expressions (Bubble)

> Reusable dynamic expressions with input parameters, returning native Bubble data
> (thing, list, number, text, yes/no). Live in the **Global tab** of the redesigned
> property editor. Shipped early June 2026; featured in the July 9, 2026
> "Redesigned property editor: Now on by default" announcement (forum thread 398077).
> New property editor only — in the old editor, existing global expressions still
> function but new ones can't be created. Facts researched 2026-07-17; sources below.

## What

- A.k.a. "Global saved expressions." Define an expression once, call it from any
  dynamic-expression field in the app.
- The Global tab is the renamed Styles tab; it now holds: Styles, Font variables,
  Color variables, **Global expressions**.
- Returns whatever the expression evaluates to — a thing, a list, a number, text,
  or yes/no — so it slots into conditionals, data sources, filters, and text fields.

## Mechanics

1. Global tab → Global expressions → create; build the expression exactly as anywhere
   else in the editor.
2. Bake constant constraints into the expression; expose the values that vary as
   **parameters**, filled in at each call site.
3. Consume via the **"Use global expression"** data source in any dynamic-expression
   field.
4. Nestable — a global expression can call another global expression.
5. Data-source scope is limited to **global sources**: `Do a search for`,
   `Get an option`, `Current user`. No `This element`, `This page`, or page-URL
   sources — nothing tied to a specific page context.

## When to use

- **Single source of truth** for logic currently duplicated inline across pages,
  conditionals, and filters — edit once, every call site updates.
- **Prefer over a backend workflow** when the logic is synchronous, non-secret, and
  needed inline (no server round-trip, no return-value plumbing).
- **Backend workflows stay right** for privileged, heavy, or async work.
- **Option sets stay right** for static enumerations — global expressions are for
  logic, not data.

## Caveats

- **All parameters are required** — no optional params, no defaults. Top community
  complaint; feature request filed July 13, 2026 (forum thread 398182).
- **No if/then/else branching** inside a global expression.
- **No privacy toggle — expressions ship client-side.** Never embed sensitive data
  (keys, internal thresholds) in one. Privacy rules still govern what any search
  inside returns; the expression is not a security boundary.
- **WU:** searches inside a global expression cost workload per call site, same as
  the inline equivalent. Reuse saves maintenance, not workload.
- One reported bug: result mismatch when compared against the same logic in a
  backend workflow (forum thread, June 2026 — see "My take on global expressions").
- Not copyable between apps.

## CRS candidates

**All three are PROPOSALS — not decisions. Each requires Vlad's approval + a
decisions.md entry before use.**

1. **Permission-check expression** — params: permission key, user → yes/no.
   Combines the user's Role's fixed `OS - Permission` grants with the per-user
   extras list (permission model locked in decisions.md 2026-04-17). Replaces the
   same 3-term check that would otherwise be pasted across 46 modules' conditionals.
2. **Tenant-scope expression** — params: thing → yes/no. Asserts
   `Current User's company = thing's company AND Current User's property = thing's property`
   (the Pattern A guard) for use in conditionals and client-side filters.
   **Explicitly NOT a replacement for privacy rules** — it runs client-side;
   Pattern A privacy rules (security.md) remain the enforcement layer.
3. **Display-format expression** — params: raw value/thing → standardized display
   text, e.g. guest display name or the house timestamp format, used identically
   across tables and cards instead of per-element formatting.

## Sources (accessed 2026-07-17)

- Manual — Global expressions: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab/global-expressions
- Manual — Global tab: https://manual.bubble.io/core-resources/bubbles-interface/global-tab
- Manual — Data sources ("Use global expression"): https://manual.bubble.io/core-resources/data/data-sources
- Forum — feature-release roundup (ship timing): https://forum.bubble.io/t/how-to-use-the-latest-bubble-feature-releases-in-your-app/396874
- Forum — "My take on global expressions" (mechanics, bug report): https://forum.bubble.io/t/my-take-on-global-expressions/396924
- Forum — feedback thread (required-params complaint, 2026-07-13): https://forum.bubble.io/t/feedback-on-global-expressions/398182
- Forum — "Redesigned property editor: Now on by default" (2026-07-09): https://forum.bubble.io/t/redesigned-property-editor-now-on-by-default/398077
