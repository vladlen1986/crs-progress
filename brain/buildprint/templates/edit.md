<!-- TEMPLATE: edit.md — scoped build/adapt pass. Implements PROMPT-STANDARD.md.
     Generator: fill {placeholders}; build the spec table with EXACT numbers; do token/style mapping
     find-first-create-last; inline all context; keep dimensions literal. Delete these notes before emitting. -->

# Buildprint Prompt — {verb} {precise scope}

**On TEST/DEV branch only. Create savepoint "Before {scope}" first. Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens §2, naming §13, theme §25){, `{spec_html}` (the pixel spec — open it and match it)}. For dimensions, `{spec_html}` is authoritative. <!-- name only files BP receives; inline the rest -->

## Scope
- **IN:** {exactly what changes — element(s), behavior(s)}.
- **OUT:** {what must NOT change — e.g. "no DB schema, no privacy rules, no permission changes"}.
- **STOP** for my review {if applicable — e.g. "after Task 1 before wiring behaviors"}.

## Context you must honor (inlined)
- {locked decisions / patterns relevant to this change — e.g. Pattern A if a DT is touched; permission model if a gate is touched. Inline verbatim; do not reference repo files.}

## Task 0 — Locate + report
Report, by exact name/ID: the page/reusable and the element(s) this change targets (route `{route}`), their current styles and dimensions, and any data source they read. If a referenced element isn't found, say so and STOP.

## Task 1 — Implement the spec exactly (dimensions are not suggestions)
| Element | Dimensions | Type | Color |
|---|---|---|---|
| {element} | {w × h, radius, padding, gap — exact px} | {font family / size / weight} | {token or approved literal} |
| … | … | … | … |

Content rules: {each fact once; what binds to what; exact string formats}.

## Task 2 — Token & style mapping (find first, create last)
For EVERY value above, map: **spec value → design.md token → existing approved style name (or "NEW")**. Reuse existing styles; do not fork near-duplicates. Only where nothing fits, create the pair `Name (Dark)` / `Name (Light)` from tokens and **showcase it on the `design_system` page** — list every creation and why nothing existing fit. Theming = **full style swap on `dark_theme is "no"` only**; zero property-level color conditionals. Approved literals ({badge rgba / selected-row tint / overlay ink}) stay literal.

## Task 3 — Behaviors
{Each interaction the change introduces/touches: trigger → action. Reuse existing workflows/reusables where possible; if a write is involved, route it through a private server-guarded backend workflow — do not add a UI-only or auto-bound write.}

## Task 4 — Verify, then report (measured numbers)
- Browser at 100% zoom, side-by-side with `{spec_html}`: **measure** each key dimension and report the number vs spec ({e.g. card 248, photo 208, button 28}).
- Both themes via `getComputedStyle` on {key elements}: colors come from swapped styles; **zero** property-level color conditionals.
- {zero-new-searches / WU proof if a list/search is touched}.
- **Flag, don't substitute:** anything Bubble genuinely cannot hit → report it with your closest compliant alternative; never silently substitute.

## Report
Element mapping table · styles reused vs created (+ showcased) · measured dimensions vs spec · theme proof · where you tested. Any finding that contradicts a locked decision → **flag for decisions.md**, do not resolve. **Max two attempts** on any failing step, then halt and report.

**TEST/DEV only. Savepoint "Before {scope}" made. `buildprint check` after each task. Do not push to live.**
