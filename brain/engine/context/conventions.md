# Conventions — standing BP-prompt rules (VERBATIM EXTRACTION)

> **Do not edit rules here.** This file is a Task-1 extraction for the prompt engine:
> every rule below is copied **byte-for-byte** from its canonical source, cited above the
> quote. To change a rule, change the source, then re-extract. Injected verbatim into
> every bundle by `brain/engine/assemble.js`. Extraction date: 2026-07-18. Zero rules
> authored here.

## 1. TEST-branch-only

Source: `brain/buildprint/crs-brain-operations.md` §HARD GUARDRAILS, rules 1–2:

> 1. **dev/test branch ONLY. Never clone, edit, or apply the live branch.**
> 2. **Always `buildprint sync` before starting work** — editor edits are invisible until synced, and the next apply can clobber them.

Source: `brain/buildprint/PROMPT-STANDARD.md` §1.2 (Guardrail header):

> - TEST/DEV branch only.
> - Savepoint name: `"Before <scope>"`.
> - `buildprint check` after each task.
> - Do not push to live.
> - For **edit** prompts: `Apply directly without confirmation.` For **audits**: `READ-ONLY — change NOTHING.`

## 2. Savepoint-before-apply

Source: `brain/buildprint/crs-brain-operations.md` §HARD GUARDRAILS, rules 3–4:

> 3. **Savepoint before every apply; `buildprint check` must pass before every apply. One step per apply. NEVER use `--force-apply`, `--no-check`, or `sync --reset --confirm`** without Vlad explicitly approving in that same conversation.
> 4. **Show the plan first**: describe the exact files/entities to change and expected Bubble effect; get Vlad's go-ahead before the first `apply` of a session.

## 3. Reusable-clone-by-ID (find first, create last)

Source: `brain/buildprint/PROMPT-STANDARD.md` §1.5 (Numbered Tasks):

> **Task 0 is always locate-and-report**: exact
> element / reusable / style names + IDs (and the data types touched) *before any change*.

Source: `brain/buildprint/cli-creating-and-copying-entities.md` §Pages, mobile views, and reusables:

> Pages, mobile views, and reusables are canvas roots. Each shares an optional `--layout` (one of `column`, `row`, or `fixed`) and an optional `--copy` to clone an existing root by id or name. `--layout` cannot be combined with `--copy`.

Source: `brain/buildprint/cli-creating-and-copying-entities.md` §Copying entities with `buildprint copy`:

> `buildprint copy` duplicates existing roots, workflows, actions, or element subtrees. Every copy mints fresh ids so the new entity is independent of its source (see [How ids are rewritten](#how-ids-are-rewritten)).

Source: `brain/buildprint/templates/edit.md` Task 2 / Task 3:

> Reuse existing styles; do not fork near-duplicates.

> Reuse existing workflows/reusables where possible; if a write is involved, route it through a private server-guarded backend workflow — do not add a UI-only or auto-bound write.

*(Extraction note, not a rule: there is no single canonical sentence literally named
"reusable-clone-by-ID" — the convention is the CLI `--copy … by id or name` capability
plus the locate-by-ID Task 0 plus the reuse-first discipline quoted above. Flagged, not
invented.)*

## 4. Paired styles

Source: `design/design.md` §3.2 "Buildprint standing rule (apply to every future prompt)":

> Use named Bubble Styles for all colors — never inline/literal hex. Name styles in dark/light-ready pairs using the **`Name (Dark)` / `Name (Light)`** convention. Build the `(Dark)` variant now; if light isn't being built yet, still name it `Name (Dark)` so the `(Light)` variant slots in later via the element's `bptheme` theme state. All color/background/border transitions use 200ms ease-in.

## 5. Zero property-level conditionals

Source: `design/design.md` §3.2:

> Bubble now supports swapping an element's **entire applied Style** via a single condition (no per-property overrides).

Source: `brain/buildprint/PROMPT-STANDARD.md` §2 (Styling rules, edit prompts):

> - **Styling rules (edit prompts).** Named paired styles `Name (Dark)` / `Name (Light)`; theme = **full style
>   swap on `dark_theme is "no"` only**; **zero** property-level color conditionals; new styles must be
>   **showcased on the `design_system` page**; approved literals (badge rgba, selected-row tint, overlay ink)
>   **stay literal**.

## 6. Approved literals

Source: `brain/buildprint/templates/edit.md` Task 2:

> Approved literals ({badge rgba / selected-row tint / overlay ink}) stay literal.

*(The PROMPT-STANDARD.md §2 quote in family 5 above carries the same rule; both sources
agree.)*
