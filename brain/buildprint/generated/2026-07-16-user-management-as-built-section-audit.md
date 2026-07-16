# Buildprint Prompt — As-Built Section Audit: User Management (read-only)

**On TEST branch only, never live. READ-ONLY — change NOTHING: no apply, no --force-apply, no --no-check, no sync --reset, no savepoint edits. Run `buildprint sync` first, then inspect only. This prompt produces a report; it makes zero edits.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens, `Name (Dark)`/`Name (Light)` style pairing, naming §13); `CRS-security-checklist.md` (STRUCT / POS / NEG capability definitions).

> **Assumptions (labelled — correct in Task 0 if the workspace disagrees):** the module is the `# User Management` page/reusable on route `user_management`; the login/person entity is the **User** data type; the page reads Role and Property.

## What this audit is
A **section-by-section as-built walk** of the User Management page. For **every region of the page**, report **what is built** against **what is specified**, with a status + one line of evidence. This is a reconciliation of reality vs. spec — not a redesign, not a fix. You are the app **owner**, so you can prove `[STRUCT]` (editor inspection) and `[POS]` (an authorized action works); anything needing a second tenant or a lower-privilege account is `[NEG] — CANNOT-TEST` and goes on a manual list, never "confirmed".

## Scope
- **IN:** the User Management page/reusable only — its shell, every visual section listed in Tasks 1–8, and the data/privacy/workflow/permission layers those sections depend on.
- **OUT:** Roles & Permissions, Casino Settings, Employees, Fiscal Week, and every other module. Do not open or audit them except to name a shared DT/style the UM page reads.
- **STOP** after the report. Make no edits. Max **two** inspection attempts on any blocked item, then mark "not inspectable" and move on.

## Context you must honor (inlined ground-truth — verify against the workspace, do not assume state)
- **Pattern A** (locked architecture): every *business* data type carries `company` + `property` and a privacy rule conditioning on **BOTH** (`Current User's company = This Thing's company AND Current User's property = This Thing's property`; super-admin override; everyone-else grants nothing). Exceptions: Company, Property, Subscription, system configs.
- **User DT is a documented Pattern-A exception:** **property-only** is the *intended, approved* shape for User. `User.property` (direct, single-valued) pins company transitively because Property→Company is single-parent. So do **NOT** flag "User has no `company` field" as a gap. Instead verify the three preconditions the exception rests on (see Flags).
- Access is **permission-based**: gates read `Current User's role's permissions contains <perm>` (e.g. `users___view`, `users___edit`).
- Theme is a **full style swap** driven by `theme_is_dark` (yes/no) on User; light mode = conditionals on `theme_is_dark = no`. Named paired styles only; approved literals (badge rgba, selected-row tint, overlay ink) may stay literal.

## Task 0 — Locate + report (before anything else)
Report, by **exact name/ID**: the page/reusable hosting User Management and its route; its top-level element tree; the data types it reads/writes (display name + slug); and the workflows it fires. If a section named below does not exist, say **"not found"** — do not invent it.

---

## Section-by-section walk (Tasks 1–8)
For **each** section report a row: **Section | Specified | As-built status (BUILT / PARTIAL / MISSING / EXTRA) | Evidence (element/style/workflow name) | Note.** "EXTRA" = built but not in spec (report it, don't judge it). Unknown = **"not inspectable"** — never guess.

### Task 1 — Page shell & navigation
**Specified:** app shell with left sidebar + a responsive "RE Nav Toggle" (collapse/expand); User Management mounted as a page-level view; page-visibility gated on `users___view`.
Report: the shell elements, the nav-toggle element + the workflow/state that drives it, and **where** the `users___view` gate sits (page load? element visibility? both?) — quote the condition.

### Task 2 — KPI / overview tiles
**Specified:** a row of **~7 KPI tiles**, each **click-to-filter** the user list. On mobile the overview **collapses**.
Report: the actual tile count, each tile's label + the source expression behind its number, whether clicking a tile sets a filter state (name the state + the list constraint it feeds), and the mobile collapse behavior.

### Task 3 — View switcher & the four views
**Specified:** **one** view toggle switching **4 views — list / card / detail(profile) / table** — over the same dataset.
Report: the toggle element + the state it sets; for **each** of the 4 views, whether it exists and renders the User list, and confirm they share one search rather than re-searching per view (see Task 9 WU).

### Task 4 — Profile header / detail view
**Specified:** a profile header (avatar/name/role/property/status) and a full-page or drawer detail for a selected user; a **"View Profile"** affordance from the row/card.
Report: the header fields actually bound, the detail container (drawer vs full page), and what "View Profile" does (set state / navigate) — quote it.

### Task 5 — Alphabet rail & sorting
**Specified:** an A–Z alphabet rail for jump/scroll; list sort backed by a derived **`search_tokens`** (or similar) field.
Report: the rail element + what it filters/scrolls, the sort expression, and **where `search_tokens` is written** (which workflow/auto-bind computes it) — or "not found".

### Task 6 — Filter chips & search
**Specified:** filter chips (role / property / status) + text search, composing with the KPI-tile filters over one dataset.
Report: each chip and the constraint it adds, the search input's target field(s), and whether chips + KPI filters + search compose (AND) or clobber each other.

### Task 7 — Mobile filter sheet
**Specified:** on mobile, a **"Filters"** button opens a bottom sheet holding the chips/search.
Report: the Filters button element and the workflow that shows the sheet. **Confirm or refute:** the button actually opens a working sheet — report the show/hide workflow, or "not found / no-op". (This is a known-suspect item; verify from the workflow, not from appearance.)

### Task 8 — Theme system (dark + light)
**Specified:** full-style-swap theming on `theme_is_dark = no`; named paired styles `Name (Dark)`/`Name (Light)`; zero property-level color conditionals except approved literals.
Report: whether UM elements sit on named paired styles vs. inline colors, a rough count of `theme_is_dark = no` conditionals on this page, and any raw hex/rgba that isn't an approved literal. Check `getComputedStyle` in **both** themes on the tiles, a list row, and a chip.

---

## Cross-cutting layers (Tasks 9–12) — the sections above depend on these
### Task 9 — Data & write paths
List **User** fields present vs expected (`role` single, `property` direct single-valued, `is_active`, `theme_is_dark`, `search_tokens`). Name every create/edit/delete/state-change the page can trigger (create-user, assign-role, deactivate, reset-password) and **how** each writes: server-guarded backend workflow vs. UI-only vs. **auto-bind**. Flag auto-bind on any sensitive field (role / property / is_active / permissions).

### Task 10 — Privacy rules (quote verbatim)
For **User** (and any Role/Property the page reads), **quote the privacy rule verbatim** and classify: `Pattern-A` / `company-only` / `property-only` / `logged-in-only` / `public-everyone` / `NO RULES`. State **Data API exposure** per DT (exposed yes/no — exposed = REST-readable regardless of workflow guards).

### Task 11 — Backend guards & permission gating
For each write in Task 9: name the backend workflow, its `expose` / `auth_unecessary` settings, and its **first** trigger condition (the permission check). For each gated control/section: is it **hidden-only** (client) or **server-guarded**? Name the gate. Flag any destructive/admin action that is UI-hidden but not server-enforced.

### Task 12 — Performance / WU
Count **"Do a search for"** per initial render and per filter action. Confirm the four views + KPI tiles + chips reuse **one** User search rather than re-searching. Hunt for missing `:filtered` / `:count`, unconstrained searches, and per-row searches. Flag each with its element/expression.

---

## Flags to verify (confirm/refute — hypotheses, NOT facts; report evidence or "not found")
- **Confirm or refute:** ~**22 demo/seed User records** are still present (e.g. left over from a `ZZ_UI_DemoUser` migration) — report the exact DT + row count.
- **Confirm or refute:** a **live-seed workflow** that inserts demo users still exists — name it, or "not found".
- **Confirm or refute:** the mobile **Filters** button is **non-functional** — quote the show/hide workflow, or state it's wired.
- **Confirm or refute:** User `is_active = no` **enforces logout on app load** — quote the enforcing condition, or "not found".
- **Confirm or refute (the User exception preconditions):** the User privacy rule is `Current User's property = This Thing's property` (property-only) **AND** `User.property` is a **direct single-valued** field **AND** it is **required / never empty** on every User. If all three hold → isolation is airtight and this is the **approved** exception (not a gap). If `property` is a list, can be empty, or the rule traverses → **that** is the finding.

## [NEG] — CANNOT-TEST as owner (collect for Vlad; never "confirm" these)
1. A **second-tenant** user cannot enumerate or open this property's users (search / direct URL-id). *(Manual: log in as a user in another company/property → open User Management → try search + a known user URL-id → expect nothing.)*
2. A **low-perm** user (no `users___edit`) is **server-blocked** from create / deactivate / reset — try via a forced/crafted action → expect no DB change.
3. A user **cannot change their own role or property** (self-escalation) via a crafted save.

## Verify (how each claim is proven)
`[STRUCT]` = editor inspection; `[POS]` = run-mode-as-owner action succeeds; theme = `getComputedStyle` in **both** themes; WU = measured search count. Every claim = **status + one line of evidence**. "not found" / "not inspectable" always beats a guess.

## Report (return ALL THREE)
**(a) Human report:**
1. Exec summary (≤10 lines): how much of the page is built-to-spec, and the top 3 gaps.
2. **Section scorecard table** — one row per section (Tasks 1–12): `Section | Specified | Status | Evidence | Severity`.
3. Security findings — each with a reproduction path.
4. Performance / WU findings.
5. Debt list (EXTRA / demo data / dead workflows).
6. Missing-for-spec checklist, smallest-first.

**(b) Machine block** — fenced ```json:
```json
{ "module": "user_management", "audited": "2026-07-16", "branch": "test",
  "sections": [ { "section": "kpi_tiles", "specified": "~7 click-to-filter tiles",
    "status": "BUILT|PARTIAL|MISSING|EXTRA", "evidence": "<element/expr>", "severity": "n/a|low|med|high|critical" } ],
  "deltas": [ { "dimension": "privacy", "old": "todo", "new": "BUILT|PARTIAL|MISSING", "evidence": "<rule text>" } ] }
```
**(c) [NEG] manual-test list** — numbered, exact steps + expected block per test.

Any finding that contradicts a locked decision → **flag for decisions.md**, do not resolve it yourself.
End with: (1) the section(s) furthest from spec, and (2) the single highest-severity security gap on this page.

**TEST branch only. READ-ONLY — nothing changed. `buildprint sync` first; no apply, no force, no reset. Do not push to live.**
