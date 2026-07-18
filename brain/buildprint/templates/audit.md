<!-- TEMPLATE: audit.md — read-only module audit. Implements PROMPT-STANDARD.md.
     Generator: fill {placeholders}; walk the §3.1 coverage checklist and include each task or
     state why excluded; convert EVERY known/tracked item into a confirm/refute Flag (never an answer);
     inline all context (BP cannot open this repo). Delete these notes before emitting. -->

# Buildprint Prompt — Audit {Module Name}

**On TEST branch only, never live. READ-ONLY — change NOTHING: no apply, no --force-apply, no --no-check, no sync --reset. Run `buildprint sync` first, then inspect. `buildprint check` after any read step that touches state.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens, `Name (Dark)`/`Name (Light)` pairing, naming §13); `CRS-security-checklist.md` (STRUCT/POS/NEG definitions){, `{spec_html}` (the intended UI — pixel spec)}. <!-- name only files BP will actually receive; inline anything else -->

## Scope
- **IN:** {module} — its page/reusable, the data types it reads/writes, its privacy rules, workflows, permissions, styling, mobile.
- **OUT:** anything outside {module}. Do not audit or change sibling modules.
- **STOP** after reporting — this is an audit; make no edits.

## Context you must honor (inlined — do not assume, verify against the workspace)
- Architecture is **Pattern A**: every business data type must carry `company` + `property` and a privacy rule conditioning on **BOTH** (`Current User's company = This Thing's company AND Current User's property = This Thing's property`; super-admin override; everyone-else grants nothing). Exceptions: Company, Property, Subscription, system configs.
- Access is **permission-based**: gates read `Current User's role's permissions contains <perm>`.
- {other locked decisions relevant to this module, inlined verbatim}

## Task 0 — Locate + report (before anything else)
Report, by exact name/ID: the page or reusable hosting {module} (route `{route}`), its top-level element tree, the data types it reads/writes (display name + slug), and the workflows it fires. If something isn't found, say "not found" — do not infer.

## Task 1 — UI vs spec
Compare the built UI to `{spec_html}` (or describe as-built if no spec). Status + evidence per area.

## Task 2 — UX interaction contract
For each control: what it does (state/show-hide/navigate/write), and whether the built behavior matches intent. Status + evidence.

## Task 3 — Database
List fields per data type (present vs expected), derived/`search_tokens`-style fields and where they're written, and whether demo/seed data is still present (name the DT + count if visible).

## Task 4 — Privacy rules (quote verbatim)
For EACH business data type {module} touches, **quote the privacy rule verbatim** and classify: `Pattern-A` / `company-only` / `property-only` / `logged-in-only` / `public-everyone` / `NO RULES`. State Data API exposure (`exposed` yes/no).

## Task 5 — Workflow / backend guards
For every create/edit/delete/state-change: name the workflow, its `expose` / `auth_unecessary` settings, and the **first** trigger condition (the permission check). Flag any UI-only or auto-bind write.

## Task 6 — Permission gating
For each gated action/element: is it **hidden-only** (client) or **server-guarded**? Name the gate.

## Task 7 — Performance / WU
Count "Do a search for" per render and per action; hunt for missing `:filtered` / `:count` constraints; flag any unconstrained or repeated search. Zero-new-searches where the loaded list can be reused.

## Task 8 — Style-system compliance + mobile
Named paired styles vs inline colors; swap-only theming (`dark_theme is "no"`); and mobile behavior at the breakpoints (sheet/drawer, touch targets).

## Task 9 — Run-mode screenshots (visual evidence + design reuse)
Capture the module's key views with `buildprint screenshot` (agent-browser under the hood): each primary view/state you audited, in **both themes** (flip the test user's `theme_is_dark`, restore after) and **both viewports** — desktop **1920×1080 @2x retina** and mobile **390×844 @2x**. NOTE: the screenshot subcommand has NO `--viewport` flag — set it first (`agent-browser set viewport 1920 1080 2` / `set viewport 390 844 2`, then `reload`), and always capture with `--full` so nothing below the fold is cropped. Save with the ABSOLUTE output path (the daemon resolves relative paths against its own cwd); embed in the report with the repo-relative path (`crs-brain/data/screenshots/…`). Save to `crs-brain/data/screenshots/{module_id}/<view>-<dark|light>-<desktop|mobile>.png` — predictable names; these feed later UI analysis and design prototyping. READ each PNG after capture (you see images) and use what you SAW as evidence in Tasks 1/2/8; embed the most telling shots in the report as `![…](crs-brain/data/screenshots/{module_id}/….png)`. List every captured file in the report. If the CLI reports agent-browser missing, say so and skip — never fake a capture.

## Flags to verify (confirm or refute — these are hypotheses, NOT facts)
<!-- generator: EVERY tracked/known item becomes one confirm/refute line here. Never write a status here. -->
- **Confirm or refute:** {flag_1 — e.g. "the mobile Filters button opens a working sheet"} — report the element + workflow, or "not found".
- **Confirm or refute:** {flag_2}.
- {…}

## [NEG] — CANNOT-TEST (owner login can't prove these; list for Vlad, do not "confirm")
- {neg_1 — e.g. "a second-tenant user cannot see {module}'s records"} — exact steps for a manual second-tenant test.
- {neg_2 — e.g. "a low-perm user is blocked from the guarded write"}.

## Verify (how you prove each claim)
- Editor inspection for [STRUCT]; run-mode-as-owner for [POS]; `getComputedStyle` in **both** themes for styling; measured px vs spec; search-count proof for WU. Every claim = **status + one line of evidence**; unknown = **"not inspectable"**.

## Report (return BOTH)
**(a) Human report:** exec summary (≤10 lines) → scorecard `Area | Item | Status | Evidence | Severity` → security findings (each with a reproduction path) → performance findings → debt list → missing-for-MVP checklist (smallest-first).
**(b) Machine block** — fenced ```json:
```json
{ "module": "{module}", "audited": "<date>", "deltas": [
  { "module": "{module}", "dimension": "privacy|ui|ux|db|perms|wf|theme|mobile|wu", "old": "<tracked>", "new": "BUILT|PARTIAL|MISSING", "evidence": "<element/style/workflow name>" } ] }
```
**(c) [NEG] manual-test list** — numbered, exact steps per test.
Any finding that contradicts a locked decision: **flag it for decisions.md**, do not resolve it. Never invent — "not found" / "not inspectable" over a guess. **Max two attempts** on any blocked step, then report.

**TEST branch only. READ-ONLY — nothing changed. `buildprint sync` first; no apply. Do not push to live.**
