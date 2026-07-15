# Casino Settings — Technical Reference

> **Audience:** the builder (you / future-you / any developer maintaining CRS).
> **Purpose:** the complete "how it's built and why" for the Casino Settings module — data model, workflows, guards, privacy rules, security model. So this module can be maintained without re-reverse-engineering it.
> **Companion doc:** the *Casino Settings — User Manual* (plain-language, for end users).
> **Status:** Security: ✅ done & NEG-proven (2026-06-08). Theme/mobile polish (Pass 3): 🟡 outstanding.
> **Last updated:** 2026-06-08

> **Template note:** follows the Roles & Permissions Technical Reference section structure (1–13).
> **⚠️ VERIFY items:** a few exact strings (field internal names, element IDs, the Company privacy-rule expression) are marked `⚠️ VERIFY` — confirm against the editor and fill in. See §11 for the consolidated punch-list. Everything not so marked was verified during the 2026-06-08 security audit.

---

## 1. Overview

The Casino Settings page lets an authorized user edit their company (HQ) details and manage the properties (casinos) belonging to that company — scoped to their own tenant. It uses the **role-based** permission model (checks read `Current User's role's permissions`).

- **Page / reusable:** `# Casino Settings`. ⚠️ VERIFY reusable + definition IDs.
- **Org scope:** **Company** edits are company-scoped; **Property** edits are property-scoped. Hierarchy: Company → Property (Division/Department live below, not on this page). Casino Section + Location are physical attributes on Property.
- **Access model:** inherits the app-wide three-tier model (Super Admin / Property Admin / Everyone else — see §6). No module-specific sensitive-permission mechanism on this page.
- **MVP scope:** 1 property per company; multi-property is a v2 flip (Pattern A — Property already carries a direct `company` link).

---

## 2. Data model

### 2.1 Company data type
| Field | Type | Purpose |
|---|---|---|
| `name` | text | company / casino-group display name |
| `registration_number` | text | legal registration no. |
| `vat_number` | text | VAT / tax no. |
| `license_number` | text | gaming licence no. |
| `email` | text | company contact email |
| `phone` | text | company contact phone |
| `logo` | image | company logo — **public-CDN file** (see §11) |
| `default_currency` | OS - Currency | HQ fallback currency ("Default Currency") |
| `is_active` | yes/no | soft-active flag — **currently cosmetic** (see §11) |

- **No `company` field on Company** (confirmed during `save_company` review) — the tenant link for a Company *is* the record itself (`Current User's company` points to a Company).
- ⚠️ VERIFY: exact internal field names; presence of `activated_date` / `deactivated_date`; complete field list (the above is the audited set, may be incomplete).

### 2.2 Property data type (internal name `01_1_propery` — misspelled, see §11)
| Field | Type | Purpose |
|---|---|---|
| `name` | text | property / casino display name |
| `company` | Company | **tenant link** (set server-side on create) |
| `logo` | image | property logo — **public-CDN file** (see §11) |
| `active` | yes/no | soft-active flag (note: named `active`, not `is_active` — see §11) — **currently cosmetic** |
| `timezone` | OS - Timezone | property timezone (IANA handles time math) |
| `reporting_currency` | OS - Currency | operational source-of-truth currency ("Reporting Currency") |
| `casino_section` / `location` | (physical attrs) | per design system, physical attributes on Property only |

- ⚠️ VERIFY: exact internal field names; `activated_date` / `deactivated_date`; casino_section/location field types.

### 2.3 Option Sets used
- **OS - Timezone** — 385 IANA entries (GMT labels static, IANA handles math).
- **OS - Currency** — 156 ISO 4217 currencies (display "USD - US Dollar ($)").

### 2.4 Audit log
- **None.** No audit entries are written for company/property create/edit/deactivate. Deferred to the app-wide ActivityLog build (see §11).

---

## 3. Privacy rules (read isolation)

### Company
| Rule | Condition | Grants |
|---|---|---|
| Own company or super admin | `This Company = Current User's company  OR  Current User's role's is_super_admin is yes` ⚠️ VERIFY exact expression | search + view all fields + view attachments |
| Everyone else | (none) | nothing |

> ⚠️ **VERIFY — Company privacy expression.** The 2026-06-08 audit quoted this rule as `This Company's company = Current User's company …`, but Company has **no `company` field**. The correct identity form is `This Company = Current User's company` (Company = Company). Confirm the live rule reads the identity form, not a non-existent field. The *behaviour* (own-tenant + super-admin only; everyone = nothing) was verified; only the exact left-hand expression is in question.

### Property (`01_1_propery`)
| Rule | Condition | Grants |
|---|---|---|
| Same property or super admin | `This Property = Current User's property  OR  Current User's role's is_super_admin is yes` | search + view all fields + view attachments |
| Everyone else | (none) | nothing |

- **Boundary note:** Company is scoped company-level; Property is scoped property-level (`This Property = Current User's property`). Consequence: a user assigned to one property of a company **cannot** see sibling properties of the same company (only their exact property; super admin sees all). This is intentional and matches Roles/Users property-scoping. Multi-property admin visibility is a v2 concern.
- **Field level:** no per-field "View" narrowing exists; the tenant rule grants `view_all`, so all fields (incl. registration/VAT/licence/email/phone) are visible to own-tenant + super-admin only. No cross-tenant field exposure (everyone = nothing).

**Critical dependency — Data API:** verified **NOT exposed** for Company, Property, Role, User (Settings → API panel, 2026-06-08). **App-level Data API + Workflow API are globally ON**, so the per-type exposure checkboxes are the only thing keeping these types off REST. **Re-check the panel before exposing or adding any business DT.** Auto-bind is **off** across the module (all writes go through guarded workflows).

---

## 4. Permissions used by this page
| Permission | Internal value | Gates | Sensitive? |
|---|---|---|---|
| Casino Settings - View | `casino_settings___view` | seeing the page (No-Access gate) | no |
| Company - Edit | `company___edit` | save company fields; clear company logo | no |
| Company - Deactivate | `company___deactivate` | flip company `is_active` | no |
| Property - Edit | `property___edit` | save property fields | no |
| Property - Create | `property___create` | create a new property | no |
| Property - Deactivate | `property___deactivate` | flip property `active` | no |

- All in the **Admin / Core** permission group. **None is `is_sensitive`** — managing casino settings is a property-admin's normal job; the sensitive-lock mechanism is reserved for the permission system itself (R&P).
- **Retired:** `casino_settings___edit` was logically orphaned (0 logic references app-wide), removed from the Super Admin role, then hard-deleted from `OS - Permission` (post-delete re-scan confirmed 0 references / no dangling pointers). **Edit is gated by the granular `company___*` / `property___*` perms, not by a single settings-edit perm.** Do not re-introduce a collapsed `casino_settings___edit`.

---

## 5. Workflows

### 5.1 Backend (API) workflows — where the real security lives
All are **private**: `expose = false`, `auth_unecessary = false`. ⚠️ VERIFY workflow IDs.

| Workflow | Type | Guard (server-side trigger condition) |
|---|---|---|
| `save_company` | ChangeThing (Current User's company — **no param**) | `Current User's role's permissions contains company___edit` |
| `save_property` | ChangeThing (param: `property`) | `permissions contains property___edit  AND  (passed property = Current User's property  OR  is_super_admin is yes)` |
| `create_property` | NewThing | `permissions contains property___create` (sets `company = Current User's company` server-side) |
| `clear_company_logo` | ChangeThing (param: `company`) | `permissions contains company___edit  AND  (passed company = Current User's company  OR  is_super_admin is yes)`; `ignore_privacy_rules = true` |

### 5.2 The guard-shape rule (why save_company differs)
- `save_company` takes **no company parameter** — all three of its ChangeThing actions target `Current User's company`, server-resolved. There is nothing for a caller to redirect, so a **permission gate alone is complete**: `company___edit` decides *whether* you can write; the param-less structure pins *whose* record (always your own).
- `save_property` / `clear_company_logo` take a **passed Thing** (`property` / `company`), which a caller could point at another tenant's record — so they require permission **plus an explicit tenant check** on that passed Thing.
- **Standing rule:** *param-less server-resolved write → permission gate only; write taking a passed Thing → permission + explicit tenant check on that Thing.*
- History: `save_company`'s guard formerly carried a tautology (`Current User's company = Current User's company`); reduced to `contains company___edit` (behaviourally identical, now unambiguous). `save_property`'s suspected tenant-scope gap was closed to the form above.

### 5.3 Edit-vs-deactivate split (server-enforced)
In both save workflows, the content write is gated behind the edit permission, while **every `is_active` / `active` write is a separate conditional step** gated on the deactivate permission:
- `save_company`: set `is_active = yes/no` only when `permissions contains company___deactivate`.
- `save_property`: set `active = yes/no` only when `permissions contains property___deactivate`.

So a user with edit-but-not-deactivate can change fields but **cannot** flip status in either direction. Verified.

### 5.4 Front-end workflows
- **Save (Company / Property):** form inputs → schedule the matching backend WF. ⚠️ VERIFY button/action IDs.
- **Add Property:** modal → schedule `create_property` (front-end also carries an `Only when … contains property___create` client pre-check).
- **Remove Logo:** Delete uploaded file → Schedule `clear_company_logo` (passing `Current User's company`) → Reset Logo input. **No direct client-side write to the logo field remains** (app-wide scan = 0). All three button actions also carry an `Only when … contains company___edit` client condition (defense-in-depth on top of the server guard).
- ⚠️ VERIFY all front-end element/workflow IDs.

---

## 6. Security model — three tiers (inherited)

Same app-wide three-tier model as Roles & Permissions:

| Tier | Identified by | Capabilities on this page |
|---|---|---|
| **Super Admin** (app owner) | `Current User's role's is_super_admin is yes` | Override on every privacy rule + write guard; can edit/deactivate any tenant's company/property. |
| **Property Admin** | holds `company___*` / `property___*` perms | Edit/create/deactivate within own tenant per the specific perms they hold. |
| **Everyone else** | their role's perms | No `casino_settings___view` → No-Access state. |

- Super-admin override is the server-side `is_super_admin` role flag, used in privacy rules and write guards — never a client value.
- This module exposes **no** action that grants a permission, role, or tenant — no escalation surface.

---

## 7. Page gate & states
- **MAIN CONTAINER:** visible only when `Current User's role's permissions contains casino_settings___view`. ⚠️ VERIFY element ID.
- **No-Access state:** visible when `...doesn't contain casino_settings___view` → shows the shared empty-state reusable `bVDzf` ("Access Restricted" + required-permission chip). Protects direct-URL access, not just menu nav.
- **Other states (Pass 3 polish, 🟡):** empty/loading/error states + honest `# Toggle - Status` swap are outstanding.

---

## 8. UI behavior
- **Edit vs deactivate:** a property-admin without the relevant `*___deactivate` perm sees/uses Edit normally but the status toggle is denied server-side (and gated client-side per recent fix — denied attempts surface the denied-toast, not a silent failure).
- **Logo:** Remove-Logo routes through `clear_company_logo` (§5.4). Logos are public-CDN files (§11).
- **Status flip:** preceded by the dirty-toast / confirmation pattern.

---

## 9. Responsive
- 🟡 **Pass 3 outstanding** — mobile/tablet layout pass not yet done. Desktop layout (Company panel + Properties list/Add-Property modal) is built.

---

## 10. Theming
- Dark (primary) + Soft Grey light via Conditional Style Swapping (one element, swap condition on `Current User's theme`).
- 🟡 **Inline-color cleanup outstanding** — ~30% of elements still carry inline hex (app-wide blocker for light mode); convert to named Styles as elements are touched.

---

## 11. Known constraints / debt
- **`is_active` / `active` is cosmetic (DEFERRED, by decision):** no privacy rule or gate reads Company `is_active` or Property `active`, so deactivation revokes nothing — it is record-keeping only. Acceptable for the single-property pilot. To make it real later: add `… AND This Thing's is_active/active is yes` (with super-admin allowance) to the tenant privacy rule. **Contrast: User `is_active` MUST enforce** (app-load logout) — that one is a real auth gate, not deferrable.
- **Naming drift:** Property uses `active`; Company uses `is_active`. Standardize when convenient.
- **Misspelled internal name:** Property DT internal name is `01_1_propery` (visible in editor).
- **Public-CDN logos:** Company + Property logo uploaders store public CDN files (shareable/guessable URL). Low sensitivity (logos); switch to private storage only if deemed confidential.
- **No audit trail:** create/edit/deactivate and denied attempts are not logged. Deferred to app-wide ActivityLog.
- **Theme + mobile polish (Pass 3):** inline-color cleanup, mobile layout, honest status-toggle swap, empty/loading/error states.
- **⚠️ VERIFY punch-list (fill from editor for full precision):**
  1. Company privacy-rule exact expression (`This Company = …` vs the audit's `This Company's company = …` — §3).
  2. Complete Company + Property field lists with exact internal names; presence of `activated_date` / `deactivated_date`.
  3. Backend workflow IDs; front-end element/workflow/button IDs.
  4. `# Casino Settings` reusable + definition IDs; MAIN CONTAINER + No-Access element IDs.

---

## 12. Verification status (2026-06-08)
- Privacy rules — tenant-scoped, tenant-check-first, everyone = nothing, no `view_all` without tenant check: ✅ (behaviour verified; one exact expression to confirm — §3/§11).
- Data API not exposed (Company/Property/Role/User): ✅.
- Server-side write guards (save_company / save_property / create_property / clear_company_logo), correct guard-shape per §5.2: ✅.
- `save_property` write-tenant-scope gap: ✅ closed.
- `save_company` guard clarified (tautology → permission-only): ✅.
- Remove-Logo ungated client write: ✅ fixed (routed through `clear_company_logo`).
- Edit-vs-deactivate split server-enforced: ✅.
- Auto-bind off; ownership server-set: ✅.
- `casino_settings___edit` removed + post-delete re-scan clean: ✅.
- **[NEG] runtime proof — second-tenant + property-admin accounts on Test: ✅ passed** (cross-tenant read blocked; property-admin status-flip blocked while edit works).
- Deferred (by decision): `is_active` enforcement, audit logging.

---

## 13. Change log (module-level)
- 2026-06-08 — **Module closed (done & NEG-proven).** Logo hole fixed (`clear_company_logo` server-guarded WF); `save_company` guard clarified; `casino_settings___edit` removed + hard-deleted (re-scan clean); Data API confirmed not exposed; `save_property` tenant-scope gap closed; [NEG] runtime pass via second-tenant + property-admin accounts. Established guard-shape rule (§5.2).
- 2026-06-08 — Editor-only security audit (structurally sound).
- earlier — Company + Property tabs; Add-Property modal; Timezone (385) + Currency (156) Option Sets; create `is_active`/`activated_date` fix; 3 writes moved to private server-guarded backend WFs.
