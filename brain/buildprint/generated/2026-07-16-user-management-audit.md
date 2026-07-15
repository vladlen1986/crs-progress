# Buildprint Prompt — Audit User Management

**On TEST branch only, never live. READ-ONLY — change NOTHING: no apply, no --force-apply, no --no-check, no sync --reset. Run `buildprint sync` first, then inspect.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens, `Name (Dark)`/`Name (Light)` pairing, naming §13); `CRS-security-checklist.md` (STRUCT/POS/NEG definitions).

> Assumptions (labelled): the module is the `# User Management` reusable on route `user_management`; the person entity is Employee and the login entity is User. Correct me in Task 0 if the workspace disagrees.

## Scope
- **IN:** User Management — its page/reusable, the data types it reads/writes (User, and any Employee/Role it reads), its privacy rules, workflows, permissions, styling, mobile.
- **OUT:** Roles & Permissions, Casino Settings, Employees, and every other module. Do not audit or change them.
- **STOP** after reporting — this is an audit; make no edits.

## Context you must honor (inlined — verify against the workspace, do not assume)
- **Pattern A** (locked): every business data type must carry `company` + `property` and a privacy rule conditioning on **BOTH** (`Current User's company = This Thing's company AND Current User's property = This Thing's property`; super-admin override via `is_super_admin` on Role; everyone-else grants nothing). Exceptions: Company, Property, Subscription, system configs.
- Access is **permission-based**: gates read `Current User's role's permissions contains <perm>` (e.g. `users___view`).
- User theme is `theme_is_dark` (yes/no) on User; light mode = conditionals on `theme_is_dark = no`.

## Task 0 — Locate + report (before anything else)
Report, by exact name/ID: the reusable hosting User Management (route `user_management`), its top-level element tree (list / card / detail / table views + the view toggle), the data types it reads/writes (display name + slug), and the workflows it fires. If something isn't found, say "not found".

## Task 1 — UI vs intent
Report the built views (list, card, detail, table) and the KPI tiles. Status + one line of evidence each.

## Task 2 — UX interaction contract
For each control (row click, View Profile, view toggle, filters, KPI click-to-filter): what it does (set state / show-hide / navigate / write). Status + evidence.

## Task 3 — Database
List User fields (present vs expected: role single, property direct), any `search_tokens`/derived field and where it's written, and whether demo/seed users are still present — **name the data type and count**.

## Task 4 — Privacy rules (quote verbatim)
For User (and any Employee/Role it reads), **quote the privacy rule verbatim** and classify: `Pattern-A` / `company-only` / `property-only` / `logged-in-only` / `public-everyone` / `NO RULES`. State Data API exposure for each (exposed yes/no).

## Task 5 — Workflow / backend guards
For every create/edit/delete/state-change (create-user, assign-role, deactivate, reset-password): name the workflow, its `expose` / `auth_unecessary` settings, and the **first** trigger condition. Flag any UI-only or auto-bind write.

## Task 6 — Permission gating
For each gated action/element: **hidden-only** (client) or **server-guarded**? Name the gate (e.g. `users___view`, `users___edit`).

## Task 7 — Performance / WU
Count "Do a search for" per render and per action; hunt for missing `:filtered`/`:count`; flag unconstrained/repeated searches. Confirm the list is reused for KPIs/filters rather than re-searched.

## Task 8 — Style-system compliance + mobile
Named paired styles vs inline colors; swap-only theming (`theme_is_dark = no`); mobile at the breakpoints (Filters sheet, touch targets, KPI collapse).

## Flags to verify (confirm or refute — hypotheses, NOT facts)
- **Confirm or refute:** ~12 demo/seed users still exist in a `ZZ_UI_DemoUser`-style data type — report the DT name + row count, or "not found".
- **Confirm or refute:** the mobile **Filters** button opens a working bottom sheet — report the element + the workflow that shows it, or "not found / no-op".
- **Confirm or refute:** a **live-seed** workflow still exists that inserts demo users — name it, or "not found".
- **Confirm or refute:** User `is_active = no` actually enforces logout on app load — quote the enforcing condition, or "not found".

## [NEG] — CANNOT-TEST (owner login can't prove these; list for Vlad, do not "confirm")
1. A **second-tenant** user cannot enumerate or open this property's users. (Manual: log in as a user in another company/property; open User Management; try search/URL-id; expect nothing.)
2. A **low-perm** user (no `users___edit`) is blocked at the server from create/deactivate/reset — try via a crafted/forced action; expect no DB change.
3. A user **cannot change their own role/property** (self-escalation) via a crafted save.

## Verify (how you prove each claim)
Editor inspection for [STRUCT]; run-mode-as-owner for [POS]; `getComputedStyle` in **both** themes; measured px; search-count proof for WU. Every claim = **status + one line of evidence**; unknown = **"not inspectable"**.

## Report (return BOTH)
**(a) Human report:** exec summary (≤10 lines) → scorecard `Area | Item | Status | Evidence | Severity` → security findings (each with reproduction path) → performance findings → debt list → missing-for-MVP checklist (smallest-first).
**(b) Machine block** — fenced ```json:
```json
{ "module": "user_management", "audited": "2026-07-16", "deltas": [
  { "module": "user_management", "dimension": "privacy", "old": "todo", "new": "BUILT|PARTIAL|MISSING", "evidence": "<rule text / DT>" } ] }
```
**(c) [NEG] manual-test list** — numbered, exact steps per test.
Any finding contradicting a locked decision → **flag for decisions.md**, do not resolve. "not found" / "not inspectable" over a guess. **Max two attempts** on any blocked step.

**TEST branch only. READ-ONLY — nothing changed. `buildprint sync` first; no apply. Do not push to live.**
