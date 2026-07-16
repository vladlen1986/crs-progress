# Buildprint Prompt — Restyle the User card "View Profile" button to spec

**On TEST/DEV branch only. Create savepoint "Before UM card View-Profile button" first. Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens §2, naming §13, theme §25); `crs-user-cards.html` (the pixel spec — open it and match the card's footer button). For dimensions, `crs-user-cards.html` is authoritative.

> Assumption (labelled): the User card lives in the `# User Management` reusable, card view, one card per user in a fixed-column grid. Correct me in Task 0 if not.

## Scope
- **IN:** only the **"View Profile" button** at the bottom of each User card — its dimensions, style, and hover.
- **OUT:** no DB, no privacy rules, no permissions, no other card element (photo, tags, name, login row). Do not touch the card's data source or workflows.
- **STOP** and report after Task 4 — do not proceed to other cards or views.

## Context you must honor (inlined)
- Theming = **full style swap on `theme_is_dark = no` only**; zero property-level color conditionals. New styles are named pairs `Name (Dark)` / `Name (Light)` and must be **showcased on the `design_system` page**.
- No inline/literal colors except approved literals; this button uses tokens only.

## Task 0 — Locate + report
Report, by exact name/ID: the card reusable, the "View Profile" button element, and its **current** applied style + dimensions. If the button isn't found, say so and STOP.

## Task 1 — Implement the spec exactly (dimensions are not suggestions)
| Element | Dimensions | Type | Color |
|---|---|---|---|
| View Profile button | full-width × **h 28**, radius **6**, icon **12.5** | Inter **600 / 11** | bg `--bg-elevated`; border `--border-default`; text `--text-primary` |
| — hover | (same box) | — | border → `--border-hover` |

Content: label "View Profile" + a right-chevron icon (12.5). One button per card; full card width.

## Task 2 — Token & style mapping (find first, create last)
Map each value: **spec → design.md token → existing approved style (or NEW)**. Look for an existing 28px secondary/ghost button style on the `design_system` page first; reuse it. Only if none fits, create `Button Card Ghost 28 (Dark)` / `(Light)` from the tokens above and **showcase it on the `design_system` page**. List reused vs created + why.

## Task 3 — Behaviors
Leave the existing click behavior intact (it should open the user's full profile). Do NOT add or rewire any workflow — this is a restyle only. Confirm the click still routes to the profile.

## Task 4 — Verify, then report (measured numbers)
- Browser at 100% zoom, next to `crs-user-cards.html`: **measure** button height (=28), radius (=6), icon (=12.5), and full-width fit. Report each number vs spec.
- Both themes via `getComputedStyle` on the button: bg / border / text come from the swapped style; **zero** property-level color conditionals.
- **Flag, don't substitute:** if Bubble can't hit an exact value (e.g. sub-pixel icon), report it with your closest compliant alternative.

## Report
Element mapping table · style reused vs created (+ showcased) · measured dimensions vs spec · theme proof · where you tested. Any locked-decision conflict → **flag for decisions.md**. **Max two attempts** on any failing step, then halt and report.

**TEST/DEV only. Savepoint "Before UM card View-Profile button" made. `buildprint check` after each task. Do not push to live.**
