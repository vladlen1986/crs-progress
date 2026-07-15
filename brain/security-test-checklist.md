# CRS — Security Test Checklist (per module)

> **Purpose:** the standing security gate every CRS module passes before it's considered done. Attach this file when asking Buildprint to security-test a module/page. Built for a **multi-tenant Bubble.io SaaS** — it targets the exposure paths that actually leak data or allow escalation in Bubble, not generic web theory (Bubble's platform handles XSS/CSRF/SQLi).

---

## ⚠️ READ FIRST — what Buildprint can and cannot prove

Buildprint logs in as the **OWNER (full-permission admin)**. It can verify *structure* and *positive* cases ("an admin can do X"). It **cannot** verify most *negative* cases ("a user WITHOUT permission is blocked") because it has no low-permission account — and **the negative cases are the ones that actually prove security.**

Every test is tagged:
- **[STRUCT]** — Buildprint verifies in the editor (privacy rules, guards, settings, exposure flags). BP can do these.
- **[POS]** — Buildprint runtime-tests as admin (an authorized action works). BP can do these.
- **[NEG]** — requires a **HUMAN** logged in as a low-permission / other-tenant / property-admin user. BP marks these **CANNOT-TEST**; the owner runs them. **These are the real proof.**

> **A module is NOT "security-verified" until a human has run the [NEG] tests.** A wall of green [STRUCT]/[POS] checks proves the lock is installed — only [NEG] proves the door is locked.

**Standing rules:** test on TEST/DEV branch only; read-only where possible; never push to live during testing.

---

## 0. Test setup — accounts the owner creates once (on TEST branch)
To run [NEG] tests you need throwaway accounts:
- [ ] **Low-permission user** — a role with minimal/no permissions for the module under test.
- [ ] **Property-admin user** — has edit but NOT super-admin (for tier/escalation tests).
- [ ] **Second-tenant user** — different property/company (for isolation tests). *The single most valuable test account — most leaks only show with a second tenant.*
- [ ] **Owner / super-admin** — you.
Delete throwaway accounts/roles after testing.

---

# A. DATA ISOLATION — can another tenant's data be seen?

## 1. Privacy rules — type level
- [ ] **[STRUCT]** Every business data type the module touches has a tenant-scoping privacy rule (`This Thing's property = Current User's property` and/or `company = Current User's company`) as the FIRST condition. Quote each rule.
- [ ] **[STRUCT]** The "everyone else" / unscoped rule grants NOTHING (no find-in-search, no view fields, no view attachments).
- [ ] **[STRUCT]** No type the module uses has `view_all = true` for "logged in" without a tenant condition.
- [ ] **[STRUCT]** Tenant boundary is explicit and consistent: company-level, property-level, or both? Does it match how sibling modules scope (Roles/Users)? Flag any inconsistency. State whether a user in one property of a company can see SIBLING properties.
- [ ] **[NEG]** As a SECOND-TENANT user: confirm NO record from this module (lists, dropdowns, searches, detail loads) shows another tenant's data. Actively try direct searches/filters.

## 2. Privacy rules — field level (often missed)
- [ ] **[STRUCT]** Even when a row is legitimately visible, confirm SENSITIVE FIELDS aren't over-exposed via the per-field "View" checkboxes (salary, internal notes, status flags, other users' email/phone, evidence links). A correctly tenant-scoped type can still leak individual fields. List sensitive fields + confirm their view is restricted.

## 3. Indirect data sources (the subtle leaks)
- [ ] **[NEG]** Dropdowns / relation pickers in the module are tenant-scoped (common leak: list is scoped, dropdown source isn't).
- [ ] **[STRUCT]** Any "Do a search for" used in CONDITIONS/LOGIC — `:count`, aggregations, existence checks — carries the tenant constraint. An unconstrained search relies entirely on privacy rules; if weak, it leaks cross-tenant data or counts/existence.
- [ ] **[STRUCT]** **URL parameters:** the module doesn't load a record purely from a URL-supplied id without a privacy/tenant check (IDOR — a user editing the id in the URL to load another tenant's record). Confirm such loads are privacy-protected, and that ids/sensitive values aren't exposed in URLs.
- [ ] **[STRUCT]** **Cross-tenant navigation:** any "Navigate to page / send a Thing to a page" can't be used to hand a current user a Thing from another tenant (the destination must re-enforce scope via privacy, not trust the passed Thing).
- [ ] **[STRUCT]** **Page-source / pre-render exposure:** sensitive values aren't placed in element data that Bubble renders into the page HTML/source before privacy applies (don't stuff secrets into hidden elements / custom states on a page reachable by the wrong user).
- [ ] **[STRUCT]** **Export / print:** any CSV/PDF/print export applies the SAME tenant + permission scope as the on-screen list (export path doesn't bypass the constraint).

## 4. API & endpoint surface
- [ ] **[STRUCT]** Bubble **Data API DISABLED** for every business data type the module uses (probe: `GET /api/1.1/obj/<type>` → 404, or confirm unchecked in Settings → API). If it MUST be on, privacy rules alone (not workflow guards) must fully enforce access — flag for review.
- [ ] **[STRUCT]** **API workflow sweep:** list EVERY backend/API workflow the module uses; flag any with "expose as public API workflow" and especially "can be run without authentication." Each must be private or justified-and-safe.
- [ ] **[NEG]** A public/exposed endpoint (if any) doesn't return tenant data to an unauthenticated or wrong-tenant caller.

## 5. File / image uploads (Bubble-specific — critical for surveillance)
Bubble uploads default to a **public CDN URL** accessible to anyone with the link, regardless of privacy rules. Incident photos, evidence, employee documents are at stake.
- [ ] **[STRUCT]** Each upload in the module: is it a PRIVATE file (privacy-protected) or public CDN with a shareable/guessable URL?
- [ ] **[STRUCT]** Sensitive attachments (evidence, IDs, employee docs, anything tenant-confidential) MUST be private files. Flag any sensitive upload that is publicly accessible.
- [ ] **[NEG]** Copy an uploaded file's URL; open it logged-out / as another tenant → confirm it's NOT accessible if it's meant to be protected.

---

# B. WRITE AUTHORIZATION — can a user do what they shouldn't?

## 6. Server-side write guards (not UI-only)
UI hiding stops honest users; server guards stop everyone.
- [ ] **[STRUCT]** EVERY create/edit/delete/state-change: the actual DB write is protected by a SERVER-SIDE permission check — a backend (API) workflow with a trigger condition, OR a front-end "Only when" backed by a privacy/backend check. List each write + its guard expression.
- [ ] **[STRUCT]** Flag any write that is UI-hidden ONLY (button hidden/disabled, workflow has no condition) — **FAIL.**
- [ ] **[STRUCT]** Destructive actions (delete, deactivate, bulk) have the guard as the FIRST step.
- [ ] **[STRUCT]** Backend workflows performing writes are PRIVATE (`expose=false`, `auth_unecessary=false`) and read **Current User server-side** — never a client-supplied user/tenant id trusted for authorization.
- [ ] **[POS]** As an authorized user, each write succeeds and persists (verify in DB).
- [ ] **[NEG]** As a user WITHOUT the required permission: each write is blocked at the SERVER (not just hidden) — attempt via a crafted/forced path; confirm NO DB change.

## 7. Write-tenant-scope (distinct from "can they write at all")
- [ ] **[NEG]** As a user WITH edit permission in tenant A: confirm they cannot MODIFY a record belonging to tenant B (having permission ≠ permission on every tenant's rows). Test a crafted change to another tenant's Thing.
- [ ] **[STRUCT]** **Mass-assignment:** any "Make changes to a list of Things" is scoped to the intended, tenant-constrained list — it can't write to more rows (or other tenants' rows) than intended.

## 8. Privilege escalation
- [ ] **[STRUCT]** Through this module, a user cannot grant themselves/others a permission, role, or tenant they shouldn't have. Identify every action that changes access; confirm it's guarded by an appropriate (often higher) permission, server-side.
- [ ] **[STRUCT]** Owner/sensitive operations are gated by the correct tier (e.g. super-admin flag), enforced SERVER-SIDE, not just hidden.
- [ ] **[NEG]** As a property-admin (edit, not super-admin): cannot perform owner-only operations even via crafted saves (change a protected flag, grant a sensitive permission, edit a protected/system record).
- [ ] **[NEG]** As a low-permission user: cannot reach or trigger any privileged action in the module.

## 9. Ownership & actor integrity
- [ ] **[STRUCT]** Created/modified-by is set to Current User SERVER-SIDE (not client-supplied/spoofable).
- [ ] **[STRUCT]** A user can't reassign a record's ownership or tenant to escalate or impersonate.

---

# C. INTEGRITY & STATE

## 10. Destructive-action safety
- [ ] **[STRUCT]** Destructive actions (delete, deactivate, anonymize) require UI confirmation before firing.
- [ ] **[STRUCT]** Cascading effects are handled — deleting a parent reassigns/handles children, never orphaning data or leaving users access-less.
- [ ] **[POS]** Perform the destructive action as admin on a throwaway record → cascade/handling works (dependents reassigned, not empty).
- [ ] **[STRUCT]** "Disable/deactivate" that claims to revoke access ACTUALLY enforces it (a real `is_active` check gates access somewhere) — not a cosmetic flag.

## 11. State-machine integrity
- [ ] **[STRUCT]** Status/state transitions (e.g. report Draft→Submitted→Verified→Closed) can't be SKIPPED or set directly via a crafted action that bypasses the required workflow/permission for that transition. Each transition is guarded by its specific permission and can't jump states.

## 12. Input validation
- [ ] **[STRUCT]** Required fields enforced before save (no empty/invalid save).
- [ ] **[POS]** Save with missing required fields → blocked, clear message, no partial/corrupt write.
- [ ] **[STRUCT]** Numeric/limit fields can't be set to invalid/negative values where that breaks logic.

---

# D. IDENTITY, AUDIT, REGRESSION

## 13. Session / identity
- [ ] **[STRUCT]** Actions rely on Current User server-side (not a client-passed id that could be swapped).
- [ ] **[NEG]** Logged-out / unauthenticated: the module's pages and any endpoints don't return data to an anonymous request.

## 14. Audit trail (where applicable)
- [ ] **[STRUCT]** Security-relevant actions (create/edit/delete of protected records, permission/role changes, deactivations, denied attempts) write an audit entry: actor + action + target + timestamp. If app-wide audit isn't built yet, note as DEFERRED (tracked, not a FAIL).

## 15. Regression — existing protections intact
- [ ] **[STRUCT]** This module's changes didn't weaken any existing privacy rule, guard, or Data-API setting on shared types (especially User, Role, Company, Property).
- [ ] **[STRUCT]** No new inline write or auto-bound field was introduced that bypasses an existing guard.

## 16. Auto-bind (write bypass)
- [ ] **[STRUCT]** Auto-binding is OFF on sensitive fields (access, status, money, ownership, permissions) — auto-bind writes directly to the DB, bypassing workflow guards. List any auto-bound fields; justify or flag.

---

## Report format Buildprint returns
Per item: **PASS / FAIL / N/A / CANNOT-TEST(needs human)** + evidence (quoted expression, DB result, screenshot). End with:
1. **Critical fails** (security holes — fix before proceeding), ranked SECURITY > FUNCTIONAL > POLISH.
2. **The [NEG] list the owner must run manually**, with exact step-by-step instructions per item.
3. **Deferred items** (e.g. audit logging if not yet app-wide).

## Owner's manual [NEG] pass — the real proof
After BP's report, run the [NEG] items as low-permission / second-tenant / property-admin users. **A module is only "security-verified" once these pass.** Record the result against each.

---

## Module-specific additions (add when testing that module)
- **User Management:** can a user enumerate or see other users' sensitive fields across tenants; can a user change their OWN role/property (self-escalation); password-reset gating; invite/deactivate/anonymize guarded; account-takeover paths.
- **Reporting / evidence:** uploaded media privacy (§5) is critical; report-status transitions (§11); can't view/edit/submit/verify/delete OTHERS' reports without the scoped permission; internal notes field-level privacy (§2).
- **Billing / subscription (future):** payment fields never client-trusted; tier/quota changes server-guarded; can't self-upgrade.
- **Fiscal Week:** week-close is guarded and can't be reversed without permission; closing one tenant's week can't affect another's.

## Lower-priority (note, not a pilot gate)
- Rate-limiting / abuse on UNAUTHENTICATED endpoints (signup, password reset) — relevant when public-facing.
- Brute-force on login — largely Bubble-handled; revisit before enterprise onboarding.
- Formal compliance (SOC-2 / GDPR control matrix) — a SEPARATE document, not this file; build when onboarding enterprise clients.

---

*Attach when security-testing any CRS module. [STRUCT]/[POS] = Buildprint. [NEG] = you, and they're what actually prove the module is safe. Don't mark a module done on green [STRUCT] alone.*
