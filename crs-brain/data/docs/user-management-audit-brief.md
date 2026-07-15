# Buildprint audit brief — User Management (reusable element)

> Everything Buildprint needs to know before auditing the User Management RE on the **TEST branch**.
> Sources: `brain/STATUS.md` §2/§3/§0.5, `brain/security.md`, `brain/security-test-checklist.md`,
> `brain/buildprint/module-audit-prompt.md`, `decisions.md`. Read-only audit — **make zero changes.**

---

## 0. Guardrails (non-negotiable)
- **TEST branch ONLY**, never Live. Read-only: no `apply`, `--force-apply`, `--no-check`, `sync --reset`.
- `buildprint sync` first, then work from the shredded workspace files + `buildprint` read commands
  (summary, tree, context, find, audit).
- Do not invent modules, fields, or rules. If it isn't in the workspace, say **"not found"** — never guess.

---

## 1. Identity
- **Module:** User Management — Section **Admin / Core** (1 of 11). Icon `person-gear` (swapped to resolve
  collision with Visitor Management's person-badge — see `decisions.md` 2026-04-28 icon swaps).
- **Delivery:** a **reusable element**, not a page. ⚠️ **Prefix drift** to flag: it exists as
  `RE_Name` / `RE - Name`; standard is `# Name`. Confirm actual current name in the workspace.
- **Route/registration:** rendered inside the single `App` SPA page via URL param `v` (route `users` /
  slug per Option Set). Verify it's registered and reachable.
- **Foundation module:** 3rd of the 4-module foundation refactor
  (R&P ✅ · Casino Settings ✅ · **User Management 🟡** · Fiscal Week 🔴). Definition of done matches the
  other three — see §6.

## 2. Data model (what it reads/writes)
- **User DT** — the primary type. Fields in play:
  - `role` (single Role) + `property` (direct link). Real User DT is wired in (July pass replaced the old
    `ZZ_UI_DemoUser`).
  - `search_tokens` (text) — precomputed for sort/filter, because Bubble can't server-sort across
    traversals. Verify it's populated and used, not bypassed.
  - `is_active` (bool) — **must gate access** (see §4).
  - **NO `company` field** — company fields on User were **deleted**. This is the crux of the Pattern A gap.
- Reads Role DT (for role display/badge) and Property DT (for the property link).

---

## 3. Current build state — what's DONE vs what this audit must confirm
From `brain/STATUS.md` §3 (18-dimension table, updated 2026-07-15):

| # | Dimension | Status | Note |
|---|---|---|---|
| 1 | Page UI | ✅ | 7 KPI tiles (click-to-filter), 4 views (list/card/detail/table) via one toggle, profile header, alphabet rail, filter chips |
| 2 | UX | ✅ | click = quick-view drawer; "View Profile" = full page; mobile filter sheet + overview collapse |
| 3 | Database | ✅ | real User DT wired; role (single) + property (direct) |
| 5 | Search tokens | 🟡 | `search_tokens` for sort/filter |
| 6 | Perms defined | 🟡 | `users___view` page-visibility gate wired |
| 7 | **Privacy: tenant isolation** | 🔴 | **NOT built — User DT is property-only, no company** |
| 8 | Privacy: permission-based | 🔴 | Pass-2 |
| 9 | Conditionals | ✅ | theme (`theme_is_dark`), view toggles, filter states |
| 10 | **WF permission guards** | 🔴 | Pass-2 — create/reset/deactivate must be server-guarded |
| 11 | Workflows CRUD | 🟡 | UI-state + read searches done; create-with-temp-password / deactivate = Pass-2 |
| 12 | Backend/API WF | 🔴 | Pass-2 |
| 13 | Form validation | 🟡 | |
| 14 | Audit logging | 🔴 | deferred app-wide |
| 15 | Empty/Loading/Error | 🟡 | loading animations built |
| 16 | Theme-aware | ✅ | dark + light, ~280 conditionals |
| 17 | Responsive | ✅ | desktop 1440 + mobile 390; breakpoints 760/960 |
| 18 | Tested | 🔴 | UI verified in run mode; **security NEG not started** |

**Overall status:** 🟡 UI done, **security Pass-2 pending.** This audit is the entry point to Pass-2.

### ⚠️ Known flags to verify in the live app (from the as-built audit)
- **22 demo records still present** in User DT → confirm and flag for purge.
- **Mobile "Filters" button reported non-functional** → verify.
- **Live-seed workflow flagged for deletion** → locate and flag (don't delete — read-only).
- **`is_active` MUST enforce app-load logout** — unlike Casino Settings' deferred cosmetic flag, here a
  deactivated user must actually be logged out / blocked at app load. Confirm whether that enforcement
  exists or is missing.

---

## 4. The central finding to expect (Pattern A gap)
Architecture is **Pattern A (strict multi-tenant):** every business DT's privacy rule must check
`Current User's company = This Thing's company AND Current User's property = This Thing's property`.

- **User DT is currently `property-only`** ("Same property as current user") — **company fields deleted**,
  so it CANNOT check company. This is a real gap, not a known exception.
- Known Pattern-A exceptions (NOT failures): `01 Company`, `01.1 Property`, Subscription, system configs.
  User is **not** on that list.
- Question the audit must answer: is property-only acceptable for User given company was removed, or must
  company be reintroduced? (Ties to Open Decision on `01 Company`/`01.1 Property` exception shape.) Flag as
  a DECISION for Vlad → `decisions.md`; never resolve silently.

---

## 5. Security checklist — run against `brain/security-test-checklist.md`
Buildprint logs in as **OWNER**, so it proves **[STRUCT]** (editor structure) and **[POS]** (admin action
works) only. **[NEG]** (low-perm / second-tenant / property-admin) = **CANNOT-TEST** → list them for Vlad's
manual pass. A module is not security-verified until [NEG] passes.

**Module-specific additions for User Management:**
- Can a user **enumerate or see other users' sensitive fields across tenants**? (email/phone/role) — field-
  level privacy (§2 of checklist).
- Can a user **change their OWN role or property** (self-escalation)? Must be server-blocked.
- **Password-reset gating** — who can trigger a reset for whom.
- **Invite / deactivate / anonymize** — each must be a private, server-guarded backend WF with a permission
  trigger (`expose:false`, `auth_unecessary:false`), reading Current User server-side.
- **Account-takeover paths** — any write that reassigns ownership/identity.

**Must-check structural items:**
- Privacy rule on User: quote it; confirm company AND property (expect: fails, property-only).
- **Data API exposure** for User DT — probe `GET /api/1.1/obj/user` → must 404 / unchecked.
- Every write (create-with-temp-password, deactivate, reset, role change): quote the guard. Flag any
  UI-only / auto-bind / client-side write.
- **Auto-bind on sensitive fields** (role, property, is_active, email) → flag if on.
- **Regression:** confirm the RE didn't weaken shared-type protections on User/Role/Company/Property.

---

## 6. Definition of done for User Management (Pass-2 target)
Matches the foundation-refactor bar (all four modules):
- Core-7 ✅ each · tenant-isolation privacy rules on every DT touched · server-side WF guards on
  destructive/admin actions (create/reset/deactivate) · role creation + access gate verified · `is_active`
  enforced at app load · single clean dev→live cutover at cycle end.

## 7. Output Buildprint should return
Follow `brain/buildprint/module-audit-prompt.md`:
1. **Human-readable report** — Identity · Core-7 rating (✅/🟡/🔴/➖ + one-line evidence) · Security
   (STRUCT+POS, [NEG] listed separately) · Findings ranked SECURITY > FUNCTIONAL > POLISH · **Delta vs the
   ledger** (where `brain/STATUS.md` differs from reality).
2. **Machine JSON block** matching the Progress Tree schema (`crs-brain/data/modules.json`) so it ingests.
3. End with: the critical security fails, the **[NEG] list Vlad must run manually** (step-by-step), and
   which module to harden next.

**After the audit:** save under `audits/`, hand the JSON to CRS Brain Ingest, flag any DECISION items for
`decisions.md`, feed security fails into the Pattern A rollout packet (`brain/security.md`).
