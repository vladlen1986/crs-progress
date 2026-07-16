# Roles & Permissions — Technical Reference

> **Audience:** the builder (you / future-you / any developer maintaining CRS).
> **Purpose:** the complete "how it's built and why" for the Roles & Permissions module — element IDs, workflows, guards, privacy rules, flags, security model. So this module can be maintained without re-reverse-engineering it.
> **Companion doc:** the *Roles & Permissions — User Manual* (plain-language, for end users).
> **Status:** Functional + security: ✅ complete & verified (2026-06-07). Empty-state styling: in final polish.
> **Last updated:** 2026-06-07

> **Template note:** this file's section structure (1–13) is the reusable pattern for documenting every CRS module. Copy it for the next module and fill in.

---

## 1. Overview

The Roles & Permissions page lets an authorized user create roles, assign permissions to them, and delete roles — scoped to their own property (tenant). It uses a **role-based** permission model: permissions live on the Role, and access checks read `Current User's role's permissions`, not a field on the User.

- **Page / reusable:** `# Roles & Permissions 2` — reusable `bVGDT`, definition `bVGPf`.
- **Org scope:** per-property. A user only sees/edits roles belonging to their own Property.
- **Access model:** three-tier (Super Admin / Property Admin / Everyone else — see §6).

---

## 2. Data model

### 2.1 Role data type (`permission_groups`)
| Field | Type | Purpose |
|---|---|---|
| `name_text` | text | role display name |
| `permission_list_option_os___permission0` | list of OS - Permission | the permissions this role grants |
| `property` | Property (`01_1_propery`) | tenant owner of the role |
| `is_default_boolean` | yes/no | system/template role — can't be renamed/deleted by non-super-admins |
| `is_super_admin_boolean` | yes/no | the single owner role (see §6) — exactly one role = yes |

### 2.2 OS - Permission (`os___permission0`)
- 79 active values (112 total, 33 deleted), grouped into 7 Permission Groups.
- Key attributes:
  - display name pattern `{Resource} - {Action} ({Scope})` (e.g. "Report - Edit (Own)")
  - internal value (e.g. `roles___edit`)
  - `user_permission_module` (the group it belongs to)
  - `is_sensitive` (yes/no) — only a Super Admin can grant/revoke a sensitive permission (see §6).

### 2.3 Permission Group (`os___user_permission_modules`) — 7 groups
| Group | Active count |
|---|---|
| Reporting (`cctv_reporting`) | 48 |
| Tasks | 11 |
| Menu Items (`menu_items`) | 10 |
| Admin / Core (`admin___core`) | 5 |
| Customer | 2 |
| General | 2 |
| Employee | 1 |

### 2.4 role_audit_log
- Logs role actions. Fields: `action_text`, `actor_user`, `role_name_text`, `target_role`, `property`, Created Date (timestamp).
- Actions logged: `created`, `edited`, `deleted`, `sensitive_denied`, `super_admin_role_edited`.
- **Scope note:** audit logging currently exists for Roles only. App-wide ActivityLog is a separate future build.

---

## 3. Privacy rules (read isolation)

### Role (`permission_groups`)
| Rule | Condition | Grants |
|---|---|---|
| Same property as current user | `This Role's property is Current User's property` | find in searches + view all fields |
| Everyone else | (none) | nothing |

### User
| Rule | Condition | Grants |
|---|---|---|
| Same property as current user | `This User's property = Current User's property` | search + view all + auto-bind |
| Everyone | (none) | nothing |

### role_audit_log
- Same property-scoped pattern as Role.

**Why this is sufficient:** privacy rules govern *read* isolation (a user can only see their own property's roles/users). *Write* authorization is handled separately by the backend workflow guards (§5). Both layers are required and both are present.

**Critical dependency:** the **Data API is DISABLED** for the Role and User types (verified via 404 probe). If it were enabled, a same-property user could PATCH a role directly, bypassing the backend write-guards (privacy rules allow same-property modify; they don't check `roles___edit`). **Never enable the Data API on these types.** Auto-bind is also off on Role fields, forcing all writes through guarded workflows.

---

## 4. Permissions used by this page
| Permission | Internal value | Gates | Sensitive? |
|---|---|---|---|
| Roles - View | `roles___view` | seeing the page + role list + assigned perms | ✅ yes |
| Roles - Edit | `roles___edit` | create, rename, change permissions | ✅ yes |
| Roles - Delete | `roles___delete` | delete a non-system role | ✅ yes |

All three are flagged `is_sensitive = yes` — only a Super Admin can grant/revoke them.

---

## 5. Workflows

### 5.1 Backend (API) workflows — where the real security lives
| Workflow | ID | Type | Guard (server-side trigger condition) |
|---|---|---|---|
| `create_role` | `bpcrtrl` | NewThing | `Current User's role's permissions contains roles___edit` (also sets `property = Current User's property`) |
| `save_role` | `bpsavrl` | ChangeThing (name + permission_list) | `Current User's role's permissions contains roles___edit` + super-admin-role guard + name-on-default guard + sensitive-perm comparison (see 5.3) |
| `delete_role` | `bpvilt` | reassign users → DeleteThing | `(is_default is no OR Current User's role's is_super_admin is yes) AND permissions contains roles___delete AND is_super_admin is no` |
| `log_role_action` | `bplograr` | writes role_audit_log | fired async from create/save/delete |

All backend workflows are **private**: `expose = false`, `auth_unecessary = false`.

### 5.2 delete_role — user reassignment
On delete, affected users (those whose role = the deleted role) are reassigned to:
`Search permission_groups (property = deleted role's property, is_default = yes):first item` — i.e. the property's default role, not empty. Falls back to empty only if no default role exists.

### 5.3 save_role — the sensitive-permission lock (core security)
The permission write only executes when:
```
( (incoming permissions  minus_list  current permissions) :filtered(is_sensitive = yes) :count < 1
  AND (current permissions  minus_list  incoming permissions) :filtered(is_sensitive = yes) :count < 1 )
OR  Current User's role's is_super_admin is yes
```
This computes both ADDED and REMOVED permissions, and rejects the entire save if any *sensitive* permission changed and the actor isn't a Super Admin. **Enforced server-side — crafted-save-proof.** UI checkbox disabling is polish on top, not the lock.

Name change on an `is_default` role is separately gated: only writes when `is_default is no OR Current User's role's is_super_admin is yes`.

### 5.4 Front-end workflows (reusable `bVGPf`)
- Role select: `Role Cell` (`bVGQD`, desktop list click) + `Mobile Select Role` (`bpmgkd`, dropdown) — both set the same selected-role state.
- Create: `New Role (has edit)` (`bVGQF`) + denied variant; mobile `bpiyoo` + denied.
- Save: `Save Permissions (has edit)` (`bVGNR` / action `bpdnes`) + denied → schedules `save_role` + `log_role_action`.
- Discard: `Toast Discard Permissions` (`bVGNQ`).
- Delete: `Open Delete Popup (has edit)` (`bpvily`) + denied; confirm (`bpvimn`); cancel (`bpvimm`).
- Permission toggle: `bVGSC` / `bVGSJ` (on row `bVGRS`). All/None: `bpoovc`(All `bpoovh`) / `bpoovd`(None `bpoovi`). Group expand: `bVGRL`.
- Dirty bar: `Show Permissions Toast When Dirty`.
- Create-role reusable (`bVGUj`): `Create Role` (`bpAPwS`), `Cancel Create Role`, `Close Create Role Popup`.

---

## 6. Security model — three tiers

| Tier | Identified by | Capabilities |
|---|---|---|
| **Super Admin** (app owner, one user) | `Current User's role's is_super_admin is yes` | Everything: edit the Super Admin role, grant/revoke sensitive permissions, rename/delete default roles. |
| **Property Admin** | `role's permissions contains roles___edit` | Manage roles in own property; edit non-sensitive permissions; **cannot** touch sensitive permissions, rename/delete default or super-admin roles. |
| **Everyone else** | their role's permissions | Gated normally (e.g. no `roles___view` → No Access state). |

**Super Admin specifics:**
- Exactly **one** role carries `is_super_admin = yes` ("Super Admin"). No app workflow sets this flag → a second can't be created in-app (editor-only).
- Excluded from role-assignment UI (dropdown `DD - Selected User Role` constraint `is_super_admin = no`) and from the R&P role list/search source for non-super-admins.
- Never deletable (delete_role guard `is_super_admin is no`).
- **Break-glass:** if the owner account is lost, re-flag via Bubble editor → App Data. (The editor is the master key — keep that access secured.)

**`is_default` roles:** rename + delete locked for non-super-admins; non-sensitive permissions remain editable by property admins.

**`is_sensitive` permissions:** currently `roles___view`, `roles___edit`, `roles___delete`. Add more here as modules grow (billing, cross-property, bulk-delete). The mechanism enforces whatever is flagged.

---

## 7. Page gate & states
- **MAIN CONTAINER** `bVGMt`: visible only when `Current User's role's permissions contains roles___view`.
- **No Access State** `bpvbxh`: visible when `...doesn't contain roles___view` → shows the styled empty-state reusable `bVDzf` (grid + ghost "RESTRICTED" + shield + "Access Restricted" message). Protects direct-URL access, not just menu nav.
- Empty-state reusable `bVDzf` is property-driven (inputs: `title_text`, `message_text`, `ghost_text`, `badge_text`) so it's reused app-wide.

---

## 8. UI behavior — sensitive permissions
For a non-super-admin viewing a sensitive permission:
- Checkbox shows **true state** (checked if role has it, unchecked if not) + a **lock indicator** beside it. Checkbox is disabled.
- All/None operate only on **non-sensitive** permissions — sensitive perms are left in their current state, so a non-super-admin's bulk action never stages a doomed (rejected) change.
- A rejected save (sensitive change attempted) shows the Access Denied popup, not a silent failure.

---

## 9. Responsive
- **< 768px:** `Mobile Role Bar` (`bpzrdq`) shows a sticky role dropdown replacing the left column; `Roles Panel` (`bVGPr`) hidden; content stacks; consistent gutters; compact right-aligned All/None.
- **≥ 768px:** two-column (role list left, editor right).

---

## 10. Theming
- Dark (primary) + Soft Grey light via Conditional Style Swapping (one element, swap condition on `Current User's theme`).
- Colors-only swap — geometry identical between themes.
- Empty-state grid: near-white low-opacity lines in dark, near-black low-opacity in light (so grid is visible on white).

---

## 11. Known constraints / debt
- **Permission-model migration tail:** 8 permission gates on **PP - Report** and the **app page** still read the OLD user-based `permissions` field. Blocked by pre-existing `buildprint check` errors on those pages (duplicate id `bUOoR`, invalid `text_so_far`, reserved `app` page name). **Do NOT delete the user `permissions_list` field until these are converted** — deleting it breaks those 8 gates. Plan: rebuild those pages → convert gates → retire legacy User Permissions editor (`bUTsG`/`bUTsS`/`bUVOL`) → delete field.
- 6 empty junk roles in DB (no name/property) — manual editor delete pending. IDs: …246031, …246035, …246037, …246039, …249853, …250456.
- Audit logging is Roles-only — extend app-wide later.

---

## 12. Verification status (2026-06-07)
- Server-side guards (create/save/delete): ✅ verified.
- Tenant isolation (User + Role): ✅ verified (Data API 404 probe).
- Page gate, delete-reassign, 0 ungrouped perms: ✅.
- Three-tier model + sensitive-perm server lock: ✅ built, server logic confirmed intact.
- **End-to-end runtime test as a property-admin login: ✅ passed** (sensitive perms locked, All/None valid, Super Admin hidden, no false Access Denied).

---

## 13. Change log (module-level)
- 2026-06-07 — Three-tier model + sensitive-perm enforcement; empty-state reusable wired; two UI bugfixes (role-list gap, sensitive checked+lock state); end-to-end verified.
- 2026-06-07 — Security hardening pass: server guards, user tenant isolation, page gate, system-role protection, delete reassignment, permission grouping (16 backfilled + Tasks group), audit logging.
- earlier — mobile responsive; light mode; roles___delete added; permission model → role-based.
