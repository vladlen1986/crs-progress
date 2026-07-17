# Conditional Style Swapping (Theming in CRS)

> How do we theme in CRS? Answer: the LOCKED paired-styles pattern in `../../design/design.md` §3.2, executed via Bubble's element-level conditional style swap (shipped June 2026). Part 1 = platform mechanics (researched 2026-07-17). Part 2 = how that maps onto the locked CRS pattern. This doc records mechanics — it does not decide anything.

---

## Part 1 — Platform mechanics (Bubble, as of July 2026)

### What shipped

Bubble now supports swapping an element's **entire applied Style** via a conditional rule — "Conditional styles", documented under the heading "Applying styles with conditions" ([conditions manual](https://manual.bubble.io/help-guides/logic/conditions), local copy: `help-guides/logic/conditions.md`). Shipped early June 2026: demoed in the June 3, 2026 live demo ([forum walkthrough](https://forum.bubble.io/t/how-to-use-the-latest-bubble-feature-releases-in-your-app/396874)) and listed in the June 2026 [feature megathread](https://forum.bubble.io/t/megathread-latest-product-features-and-your-ideas/396929). Closes feature requests open since 2016 ([original 2016 thread](https://forum.bubble.io/t/change-style-on-conditional/1177)).

### Editor mechanics

1. Select element → **Conditional** tab → add a rule.
2. **When**: any dynamic expression evaluating to yes — custom states, DB data, and user properties are all valid here (unlike style-internal conditions, below).
3. **Then**: select the **Style** attribute to swap the whole style in one rule — or set individual properties (the old way; avoid, see Part 2).

The docs' own example is light/dark mode: apply the dark style when "Current user's dark mode = yes" ([conditions manual](https://manual.bubble.io/help-guides/logic/conditions), "Applying styles with conditions").

### Caveats

- **Conditions INSIDE a style definition are still limited to basic states** (hovered, focused, etc.). Per the [styles manual](https://manual.bubble.io/help-guides/design/variables-and-styles/styles) (local: `help-guides/design/variables-and-styles/styles.md`): "conditions using data, or properties on the user, will not qualify as basic."
- **Last-listed condition wins** on conflicts — conditions are read top-down; the bottom rule is applied last ([conditions manual](https://manual.bubble.io/help-guides/logic/conditions); [conditional formatting reference](https://manual.bubble.io/core-resources/elements/conditional-formatting)).
- **Element-level overrides beat style-level** — a property set on the element wins over the same property from the applied style.
- **Searches inside conditionals consume WU** like any other search; keep theme conditions on page-local data (custom state / Current User field), never `Do a search for`.
- **Transitions don't apply to gradient backgrounds** — solid-color styles animate the 200ms theme flip; gradients snap.
- UNVERIFIED: likely requires the **redesigned property editor** to be enabled. Not confirmed in the manual; verify in the editor before relying on it.

### Two features people conflate (don't)

| | (a) Element Conditional tab — full-style swap | (b) Style-internal conditions |
|---|---|---|
| Status | NEW (June 2026) | Long-standing, unchanged |
| Condition scope | Any dynamic expression (states, DB, user fields) | Basic states only (hovered, focused) |
| What changes | The element's entire applied Style (or single properties) | Properties within the style |

Community threads routinely mix these up. Theme logic lives in (a). Hover/focus behavior lives in (b), inside each style definition.

---

## Part 2 — The LOCKED CRS pattern

Source of truth: **`../../design/design.md` §3.2 "Implementation in Bubble — Conditional Style Swapping"**. Do not restate values here — this section only maps the platform mechanics onto the locked decision.

### The pattern

- **Paired styles**: every style exists as `Name (Dark)` (default) and `Name (Light)` — the `(Dark)`/`(Light)` suffix convention, e.g. `CRS - Elevated Card (Dark)` / `CRS - Elevated Card (Light)`.
- **One condition per element**: the `(Dark)` style is the element's default; the `(Light)` variant is attached via the `bptheme` theme custom state — a single conditional rule swapping the whole style.
- **User preference**: theme stored on the User — currently the `dark_theme` boolean in the app (exact field under review per §3.2; a `theme` text field is the alternative). The toggle flips it; every element re-styles at once.
- **Theme states live INSIDE each style pair** — hover/focus variants are defined per style (basic states, which style-internal conditions support). **Zero property-level theme conditionals scattered on elements.**
- **Prerequisite (non-negotiable, per §3.2)**: every element on a named style, no inline/literal colors. An element with inline colors has nothing to swap and stays dark when the rest flips.

### What the June 2026 feature changes: nothing

The platform feature is exactly the mechanism the locked pattern anticipated — swap whole styles in one conditional per element, never per-property conditionals. It **CONFIRMS the pattern; it does not reopen the decision.** The `Name (Dark)`/`Name (Light)` pairing, `bptheme` state, and one-condition-per-element rule stand as written in §3.2, including the Buildprint standing rule quoted there.

### Change control

Any migration away from or modification to the locked pattern (e.g. dropping `bptheme` in favor of a direct `Current User's dark_theme` expression in every element's condition) requires a new entry in `../../decisions.md` first. This doc records mechanics; decisions happen there.

---

## Sources

Accessed 2026-07-17:

- https://manual.bubble.io/help-guides/logic/conditions — "Applying styles with conditions" (local: `help-guides/logic/conditions.md`)
- https://manual.bubble.io/help-guides/design/variables-and-styles/styles — style-internal condition limits (local: `help-guides/design/variables-and-styles/styles.md`)
- https://manual.bubble.io/core-resources/elements/conditional-formatting — rule ordering, property editor reference (local: `core-resources/elements/conditional-formatting.md`)
- https://forum.bubble.io/t/how-to-use-the-latest-bubble-feature-releases-in-your-app/396874 — June 3, 2026 live-demo walkthrough
- https://forum.bubble.io/t/megathread-latest-product-features-and-your-ideas/396929 — June 2026 feature megathread
- https://forum.bubble.io/t/change-style-on-conditional/1177 — historical 2016 feature request (closed by this release)
- `../../design/design.md` §3.2 — LOCKED CRS pattern (paired styles, `bptheme`, standing Buildprint rule)
