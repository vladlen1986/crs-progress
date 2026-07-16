# Buildprint Prompt — Pilot: Pattern A privacy rule on 06 Employee

**On TEST/DEV branch only. Create savepoint "Before Pattern A pilot (Employee)" first. Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation — but STOP at the gate (below); do not roll out to other data types.**

**Attachments:** `CRS-security-checklist.md` (STRUCT/POS/NEG definitions).

> Assumption (labelled): the person entity is the `06 Employee` data type (slug `employee`). Correct me in Task 0 if the slug differs.

## Scope — this is a PILOT
- **IN:** apply Pattern A tenant isolation to **exactly one** data type: **`06 Employee`**.
- **OUT:** every other data type (the ~38 other public / no-rules types). Do **NOT** touch them.
- **STOP GATE (hard):** after Task 3 verify, **halt and report — do not apply Pattern A to any other type.** Wait for my explicit "roll out" before further changes.

## Context you must honor (inlined — verify in Task 0 before changing)
- **Pattern A** (locked): a business data type carries `company` + `property` fields and a privacy rule whose first check is `Current User's company = This Thing's company AND Current User's property = This Thing's property`; super-admin override (`Current User's role's is_super_admin is yes`); the everyone-else rule grants **nothing** (no search, no view fields, no view attachments).
- Employee holds **PII** (passport / national ID / DOB / phone). It must not be world-readable.
- Auto-bind must be **off** on Employee; writes go through guarded workflows.

## Task 0 — Locate + report
By exact name/ID: `06 Employee`'s current fields (does it have `company` + `property`?), its **current privacy rules quoted verbatim**, whether Data API is exposed for it, whether auto-bind is on, and every element/workflow that reads or writes it. Confirm this is the intended single pilot target before changing anything.

## Task 1 — Add tenant fields (only if missing)
If `company` and/or `property` are absent, add them. Do **not** backfill records in this pilot — note that a backfill will be needed (empty tenant fields will hide rows once the rule lands). Report what you added.

## Task 2 — Apply the Pattern A privacy rule
Replace Employee's privacy rules with: (a) an owner-tenant rule conditioning on company AND property (+ super-admin override) granting search + view; (b) an everyone-else rule granting nothing. Turn Data API **off** for Employee and auto-bind **off**. Quote the final rules back verbatim.

## Task 3 — Verify the pilot (measured), then STOP
- [STRUCT] Quote the final privacy rules; confirm both conditions present; confirm Data API off + auto-bind off.
- [POS] As owner, confirm you still see your own tenant's Employees.
- Report the **exact repeatable recipe** to roll this out to the OUT set (field-add → rule-shape → API/auto-bind → backfill note), so I can approve it once.
- **Then STOP.** No further edits.

## [NEG] — CANNOT-TEST (owner can't prove; for Vlad, do not "confirm")
1. A **second-tenant** user sees **zero** Employees from this property. (Manual: log in as another company/property user; try list/search/URL-id; expect nothing.)
2. A **logged-out** request to the Employee endpoint returns nothing.

## Report (then await go/no-go)
Human report (exec summary → scorecard `Area | Item | Status | Evidence | Severity`) · the rollout recipe · anything that fought the pattern (**flag, don't substitute**) · the backfill requirement · any locked-decision conflict → **flag for decisions.md**. Machine block (```json delta) for `06 Employee` only. **Max two attempts** on any failing step. **Do not roll out — wait for my "roll out Pattern A".**

**TEST/DEV only. Savepoint made. Pilot = ONE data type. STOP at the gate; do not push to live; do not roll out.**
