# Buildprint Prompt — User Management Pass-2: server-side security guards

**On TEST/DEV branch only, never live. Create savepoint "Before UM Pass-2 security" first. Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation — except Task 5 (delete live-seed workflow), which requires the confirmation gate stated in that task.**

**Attachments:** `CRS-design-system.md` (source of truth — tokens, `Name (Dark)`/`Name (Light)` pairing, naming §13); `CRS-security-checklist.md` (STRUCT/POS/NEG definitions — this prompt is Section B "Write authorization" + parts of Section A of that checklist).

## Context you must honor (inlined)

- **Locked permission model** (decisions.md 2026-04-17): custom **Role** DT carrying a list of **Permission** Option Set values + a per-user "extras" list. Checks are always "does this user's role (or extras) contain permission X" — never a hardcoded role-name check. Do NOT collapse granular per-action permissions into one combined permission (rejected precedent: `users___manage` was rejected in favor of separate `users___view` / `users___create` / etc.).
- **User DT tenancy is an approved Pattern A exception** (decisions.md 2026-07-16, security.md): `User` carries `property` only (no `company` field) and its privacy rule is `Current User's property = This User's property` (+ super-admin override). This is **correct as-is** — property transitively pins company because Property→Company is single-parent and a user belongs to exactly one property. **Do not add a company field or a company check to User. Do not "fix" this rule.** Precondition to reconfirm in Task 0: `User.property` is still required + single-valued (never a list, never empty by default).
- **Reference pattern to mirror** (Casino Settings, done + NEG-proven 2026-06-08): edit-vs-deactivate split is **server-enforced by two separate guarded steps in the same backend workflow** — the content write is gated on the edit permission; the `is_active`/status write is a *separate* conditional step gated on a distinct `*___deactivate` permission. Super-admin override is `Current User's role's is_super_admin is yes` on every guard. Mirror this shape for User Management's four backend workflows.
- **Existing backend workflows already built** (brain/workflows.md, confirm in Task 0 rather than trust this): `um_create_user`, `um_save_user`, `um_reset_user_password`, `um_set_user_status` (api/bppelc · bppeku · bppelf · bppeky) — each is documented as already scheduling an audit-log write. Do not create new workflows for these four actions; harden the existing ones.
- **Audit logging:** no dedicated `ActivityLog` DT is built yet app-wide; the closest existing mechanism is `log_user_action` (api/bppeks), a private backend WF that writes audit-log entries via Schedule API Workflow (async, never inline). Use it — do not build a new logging path.
- **WU guardrails** (`brain/engine/context/wu-guardrails.md`): any privacy/permission check must run server-side inside the guarded backend workflow, not as a client-side `:filtered` check the user can bypass. Tenant/permission constraints belong in the search/workflow condition itself, not a post-load filter.

## Task 0 — Locate + report (mandatory first, no changes yet)

Report, by exact name/ID, before touching anything:
1. The four backend workflows `um_create_user` / `um_save_user` / `um_reset_user_password` / `um_set_user_status` — current trigger conditions (if any), `expose` and `auth_unecessary` flags, and whether each currently checks `Current User` server-side at all.
2. Every entry in `OS - Permission` scoped to module "Users" (or equivalent) — exact display + db values. Confirm whether distinct `users___create`, `users___edit`/`users___save`, `users___reset_password`, `users___deactivate` (or your closest existing equivalents) already exist. List what exists and what's missing — do not assume names.
3. `User.property`'s field config: required? single-valued? Confirm the Pattern-A-exception precondition above still holds.
4. The front-end workflows currently wired to Create User / Save User / Reset Password / Set Status buttons in the User Management UI — do they call the backend WFs above, or write directly to the DB client-side?
5. The self-escalation surface: can a logged-in user (via the User Management edit form or a crafted call) change their **own** `role` or `property` field? Which workflow would carry that write today?
6. Demo/seed data: count of `User` records that are demo/test/seed rows (STATUS.md flags "22 demo records" — confirm current count, don't assume it's still 22) and how they're identifiable (a flag field, a naming pattern, or membership in a `ZZ_UI_DemoUser`-adjacent type).
7. The "live-seed workflow flagged for deletion" (STATUS.md) — locate it by name/ID, report what it does and where it's triggered from (button, page-load, scheduled). Do not delete yet.
8. The mobile "Filters" button on the User Management page — locate its element and current workflow (or confirm it has none), and locate the existing filter-sheet overlay mechanism already used elsewhere in the shell (reuse it, don't build a new one).

If anything above can't be located, say so explicitly and **STOP that sub-item** — report it as not found rather than guessing.

## Task 1 — Server-guard the four backend workflows

For each of `um_create_user`, `um_save_user`, `um_reset_user_password`, `um_set_user_status`:
- Ensure `expose: false`, `auth_unecessary: false`.
- First step/condition reads `Current User`'s role permissions **server-side** — never a client-supplied user/tenant id trusted for authorization.
- `um_create_user`: guard on the create permission (from Task 0's list; use the exact existing name, or if genuinely missing, add ONE new `Permission` OS entry following the exact naming convention already used for Users perms, scoped to module Users — list what you added and why nothing existing fit).
- `um_save_user`: guard the field-write step on the edit permission.
- `um_reset_user_password`: guard on a distinct reset-password permission (do not reuse the edit permission — password reset is a separate capability, same granularity precedent as Casino Settings' edit-vs-deactivate split).
- `um_set_user_status`: guard the `is_active`/status-flip step on a distinct deactivate permission, as its **own** conditional step — mirror Casino Settings exactly (a user with edit-but-not-deactivate can change fields but cannot flip status).
- Every guard also carries the super-admin override: `Current User's role's is_super_admin is yes`.
- Quote the final guard expression for each of the four workflows in your report.

## Task 2 — Block self-escalation

In whichever workflow currently allows a user to edit their own User record (Task 0.5), add a server-side check: if the target User = Current User, the `role` and `property` fields are **not** writable through that path unless `Current User's role's is_super_admin is yes`. A non-super-admin editing their own profile can change non-privilege fields (name, contact info) but not their own role or property. Quote the guard.

## Task 3 — Purge demo records

Delete the demo/seed `User` records identified in Task 0.6 (not the real `User` type — only rows confirmed as demo/seed). Report the exact count deleted and how you confirmed each was safe to delete (flag field, naming pattern, or type membership — not guesswork).

## Task 4 — Wire the mobile Filters button

Wire the mobile "Filters" button (Task 0.8) to the existing filter-sheet overlay mechanism already used elsewhere in the shell. Do not introduce a new overlay/animation pattern. Report the element ID and the workflow now firing.

## Task 5 — Live-seed workflow (confirm before deleting)

Using Task 0.7's findings: if the workflow is confirmed dev/seed-only (not reachable from any real user-facing path, e.g. a manual-trigger or page-load seeding action with no production caller), delete it and report what was removed. **If there is any doubt it might still be load-bearing (e.g. still wired to a live button or page-load event), do NOT delete — report the ambiguity instead and leave it in place for my review.**

## Task 6 — Audit logging on write actions

Wire `log_user_action` (async, via Schedule API Workflow — never inline) into each of the four hardened backend workflows from Task 1, so create/edit/reset-password/deactivate on a User all produce an audit entry. Confirm it does not block or slow the user-facing action (schedule, don't await). Report which workflows now schedule it and with what payload (actor, target user, action type).

## Verify, then report

- **[STRUCT]** For each of the 4 workflows: quote the final guard expression (permission checked, super-admin override present, `Current User` resolved server-side) — status PASS/FAIL/MISSING + one line of evidence each.
- **[STRUCT]** Confirm zero UI-only writes remain for create/edit/reset/deactivate (each routes through a guarded backend WF, not a client-side/auto-bound write).
- **[POS]** As the owner/super-admin account, exercise create, edit, reset-password, and deactivate once each — confirm they still work end-to-end and persist.
- **[STRUCT]** Self-escalation guard (Task 2): quote the expression.
- Demo purge: exact count + identification method.
- Mobile filter: element + workflow, confirmed via `getComputedStyle` proof in both themes if the sheet has theme-dependent styling.
- Live-seed workflow: deleted-and-what, or flagged-and-why-not.
- Audit logging: which workflows now schedule `log_user_action`.
- **Flag, don't substitute:** anything Bubble genuinely can't hit → report with your closest compliant alternative; never silently substitute.
- **Max two attempts** on any failing step, then halt and report — do not loop.

## Report

### Human report
1. Exec summary (≤10 lines).
2. Scorecard: `Area | Item | Status | Evidence | Severity` for every task above.
3. Quoted guard expressions (all 4 workflows + the self-escalation guard).
4. Debt/left-over list (anything flagged-not-fixed, e.g. Task 5 ambiguity).
5. Missing-for-MVP checklist, smallest first, for whatever's still open in Pass-2 after this session.

### Machine block
Fenced ```json``` delta for `STATUS.md` §3 User Management rows 7 (Privacy: tenant — note this row is already correct as an approved exception per decisions.md 2026-07-16, do not re-flag), 10 (WF permission guards), 11 (Workflows CRUD), 12 (Backend/API WF), 14 (Audit logging) — `module, dimension, old→new status, evidence` per row.

### [NEG] manual-test list (for me, not BP — BP logs in as owner and cannot run these)
Numbered, exact steps per test, each naming which throwaway account (low-permission / property-admin / second-tenant) and the expected block:
1. Low-permission user attempts create/edit/reset-password/deactivate via the UI — confirm blocked, not just hidden.
2. Low-permission user attempts the same via a crafted/forced call (devtools, direct API) — confirm server rejects, no DB change.
3. Any authenticated non-super-admin user attempts to set their **own** `role` or `property` via a crafted edit — confirm rejected per Task 2's guard.
4. Second-tenant (different property) user attempts to view or edit a User record from another property — confirm still blocked (this reconfirms the existing approved property-only rule under the new write guards, doesn't just trust it held).

**TEST/DEV only. Savepoint "Before UM Pass-2 security" made. `buildprint check` after each task. Do not push to live.**
