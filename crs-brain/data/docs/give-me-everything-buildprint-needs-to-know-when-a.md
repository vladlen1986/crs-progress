Saved to `crs-brain/data/docs/user-management-audit-brief.md`. Here it is inline:

---

# Buildprint audit brief — User Management (reusable element)

> Read-only audit on the **TEST branch**. Sources: `brain/STATUS.md` §2/§3/§0.5, `brain/security.md`, `brain/security-test-checklist.md`, `brain/buildprint/module-audit-prompt.md`, `decisions.md`.

## 0. Guardrails
- **TEST branch ONLY**, never Live. No `apply` / `--force-apply` / `--no-check` / `sync --reset`.
- `buildprint sync` first, then work from shredded workspace files + read commands (summary, tree, context, find, audit).
- Don't invent modules/fields/rules. Not in the workspace → say **"not found"**.

## 1. Identity
- **Module:** User Management — **Admin / Core** (1 of 11). Icon `person-gear`.
- **Delivery:** a **reusable element**, not a page. ⚠️ **Prefix drift** — exists as `RE_Name`/`RE - Name`, standard is `# Name`. Confirm actual name.
- Rendered inside the `App` SPA via URL param `v` (route `users`). Verify registered/reachable.
- **3rd of the 4 foundation modules** (R&P ✅ · Casino Settings ✅ · **UM 🟡** · Fiscal Week 🔴).

## 2. Data model
- **User DT** — `role` (single Role) + `property` (direct). Real User DT wired (replaced `ZZ_UI_DemoUser`).
- `search_tokens` (text) for sort/filter (Bubble can't server-sort across traversals).
- `is_active` (bool) — **must gate access at app load**.
- **NO `company` field — company fields were deleted.** This is the crux of the Pattern A gap.

## 3. Build state — DONE vs must-confirm (STATUS §3, 18-dim)
- ✅ UI (7 KPI tiles, 4 views + toggle, profile header, alphabet rail, filter chips), UX (quick-view drawer + full profile, mobile sheet), Database (real User DT), Conditionals, Theme (dark+light ~280 conds), Responsive (1440/390; bps 760/960).
- 🟡 `search_tokens`, `users___view` perm gate, CRUD (reads done; create-with-temp-password/deactivate pending), form validation, empty/loading.
- 🔴 **Privacy tenant isolation, permission-based privacy, WF permission guards, Backend/API WF, audit logging, security Tested** → all **Pass-2**.
- **Overall: UI done, security Pass-2 pending.** This audit is the Pass-2 entry.

### Flags to verify
- **22 demo records** still in User DT → confirm/flag purge.
- **Mobile "Filters" button non-functional** → verify.
- **Live-seed workflow** flagged for deletion → locate/flag (don't delete).
- **`is_active` must force app-load logout** — not cosmetic (unlike Casino Settings' deferred flag).

## 4. Central finding to expect (Pattern A gap)
User DT is **`property-only`** ("Same property as current user"); company was deleted so it can't check company. Pattern A requires `company = AND property =`. User is **not** a known exception (Company/Property/Subscription are). Decision needed: accept property-only, or reintroduce company? → **flag for `decisions.md`, don't resolve silently.**

## 5. Security checklist (`brain/security-test-checklist.md`)
BP = OWNER → proves **[STRUCT]/[POS]** only; **[NEG]** = CANNOT-TEST, list for Vlad. UM-specific:
- Cross-tenant user enumeration / sensitive-field leakage (email/phone/role).
- **Self-escalation:** user changing own role/property — must be server-blocked.
- Password-reset gating; invite/deactivate/anonymize = private server-guarded backend WFs; account-takeover paths.
- Quote User privacy rule (expect property-only fail); **Data API off** (`GET /api/1.1/obj/user` → 404); guard every write; flag auto-bind on role/property/is_active/email; regression on User/Role/Company/Property.

## 6. Definition of done (Pass-2)
Core-7 ✅ · tenant-isolation privacy on every DT · server-side guards on create/reset/deactivate · access gate verified · `is_active` enforced at app load · clean dev→live cutover.

## 7. Output
Human report (Identity · Core-7 · Security · Findings SECURITY>FUNCTIONAL>POLISH · **delta vs STATUS.md**) + machine JSON for `modules.json` + the **[NEG] list Vlad runs manually**. After: save to `audits/`, Ingest, feed fails into the Pattern A packet in `brain/security.md`.

---

The one thing to settle before you run it: **whether User stays property-only or gets `company` back** — that decision shapes every privacy-rule finding the audit produces.