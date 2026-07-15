# Backend Workflows & "Magic Buttons"

> Every workflow that exists in Bubble gets a row here: what triggers it, what it does, which module owns it, where to find it. This is the file that answers "where is that button / workflow?"

## Current state (as-built on test branch — full Buildprint inventory 2026-07-15)

### Backend / API workflows (29 — all APIEvent; no recurring or DB-trigger events; none disabled)

| Workflow | Folder | ignore_privacy | Gist |
|---|---|---|---|
| `add_user_to_read_by_all_reports_copy` | api/bUUsh | ✅ | 🔴 Adds user to report read_by — **`auth_unecessary: true` + only WF without `expose: false` → candidate PUBLIC endpoint** (see security.md) |
| `create_user` | api/bUXPn0 | ✅ | SignUp action; `auth_unecessary: true` but not exposed |
| `um_create_user` / `um_save_user` / `um_reset_user_password` / `um_set_user_status` | api/bppelc·bppeku·bppelf·bppeky | ✅ | User-management CRUD, each schedules audit log |
| `create_property` / `save_property` | api/bpcppr·bpsvpr | ✅ | Property create/update |
| `save_company` / `clear_company_logo` | api/bpsvco·bppzir | ✅ | Company update / logo clear |
| `create_role` / `save_role` / `delete_role` | api/bpcrtrl·bpsavrl·bpvilt | ✅ | Role CRUD (delete also strips role from users) |
| `log_role_action` / `log_user_action` | api/bplograr·bppeks | ✅ | Write audit-log entries (async via Schedule) |
| `audit_create_response` / `audit_recalc_run` | api/bVCNH·bVCNb | — | CCTV audit: create checklist response / recalc run totals |
| `add-fiscal-week-to-report` | api/bTVLm0 | — | Recursive batch: set fiscal_week on reports |
| `add_customer_links_to_report` / `add_employee_links_to_report` / `create_report_customer_links` / `create_report_employee_links_copy` | api/bTPhy·bTPdo0·bTNLe·bTUpe | — | Recursive creators of Report↔Employee/Guest link records (note the `_copy` duplicate pair) |
| `send_reports` / `send_reviewed_reports` | api/bUZCv·bUdSt | — | Mark report lists as sent |
| `update_Report_Employees` | api/bUaUg | ✅ | Rebuild report's employee list from links; `auth_unecessary: true` (not exposed) |
| `fix_has_response_batch` | api/bUoZV | — | Data-fix: reset response flags on link records |
| `migrate_country_employee` / `migrate_country_guest` | api/bptgcu·bpujgh | — | One-off country-field migrations (paired with `migration` page) |
| `backfill_guest_first_letter` | api/bpfpdc | ✅ | One-off backfill — comment says **COMPLETED 2026-07-11, endpoint disabled** → retire |

**19 of 29 run `ignore_privacy_rules: true`.** No workflow implements the spec'd ActivityLog/Counter architecture yet.

### Pages (7) + mobile views (3)

| Page | ID | Workflows | Notes |
|---|---|---|---|
| index (sign-in) | bTGbC | 9 (1 disabled) | Sign-in/reset flows. Legacy: `bUout0` disabled toast WF; `bUfKF` triggers on an element that no longer exists |
| app (main shell) | bTpoF | 56 | Directory filters, pagination, nav, LoggedOut redirect. 1 zero-action WF; 7 empty WF-folders; client-side redirect guard (audit finding) |
| reporting | bTIlg1 | 67 | Main legacy workspace. **20 zero-action shells, 2 dead duplicate grid WFs, 1 "copy 2" WF, 12 WFs calling actions of uninstalled plugins, 20 empty WF-folders** |
| design_system | bpeelt | 209 | Component-gallery sandbox — all demo interactions (toggle/set-state). Non-production tooling; keep as UI-kit reference |
| migration | bpjfsf | 1 | One button → schedules the 2 country migrations. Retire together with them once run |
| reset_pw | AAW | 1 | Password-reset submit. Keeper |
| 404 | AAX | 0 | Static |
| mobile-views | bUTyG Home · bUTyY update_app · bUjTF reset_password | 1 (on reset_password) | |

### Legacy cleanup candidates (confirmed by inventory)

- 1 disabled WF (`index/bUout0`), 1 orphaned-trigger WF (`index/bUfKF`), 21 zero-action WF shells (20 reporting + 1 app), 27 empty organizational WF-folders (20 reporting + 7 app).
- 12 reporting WFs reference plugin actions absent from `plugins/` (uninstalled → broken): the RG-sorter block (`bTeRD0`, `bTeXr0`, `bTeYF0`, `bTeZF0`, `bTeZN0`, `bURqb0/j0/u0`, `bURrF0/N0`) + `bTOcw0` + `bTUJV0`.
- Duplicates: PageLoaded auth-redirect `bTIoE3` exists verbatim on both app and reporting; backend `create_report_employee_links` vs `_copy`.
- Completed one-offs to retire: `backfill_guest_first_letter`, `migrate_country_*` + migration page (after confirming the migration ran), `fix_has_response_batch`.

## Workflow tracker

| Workflow | Trigger | Module | Status | Where in Bubble |
|---|---|---|---|---|
| Save Company | Button (Casino Settings → Identity card) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Save Property | Button (Properties tab) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Add Property | Button (Properties tab) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Logo upload | File uploader | Casino Settings | ❌ pending | RE_CasinoSettings |
| ActivityLog write | Schedule API Workflow (async) | System Activity Log | spec | Backend workflows — polymorphic subject_type/subject_id (locked architecture). NOT built (confirmed 2026-07-15; closest existing: log_user_action/log_role_action) |
| Numbering (reports/RFI/tasks/warnings) | On create | cross-module | spec | Counter DT, keyed (company, date), atomic increment. NOT built |
| Legacy workflows (Reporting, Tasks, RFI, …) | various | legacy app | ✅ inventoried 2026-07-15 | See "Current state" above — 29 backend + 343 page workflows on test branch |

## Conventions

- Async writes (audit log, notifications) go through **Schedule API Workflow** — never inline on user actions.
- Workflow edits happen via **Buildprint Build mode**, dev branch only, Claude-written prompts, review plan before approving (decisions.md 2026-05-01).
- UI elements follow naming: `#PP - Name` popups, `#GR - Name` reusables, `#FG - Name` floating groups — workflows live with their element.

## Pending

- [ ] Build 4 Casino Settings workflows (current session priority per decisions.md 2026-05-02) — note: no RE_CasinoSettings page/reusable found in 2026-07-15 inventory
- [x] Buildprint inventory of ALL legacy backend workflows → ingested 2026-07-15 (Current state above)
- [ ] Legacy cleanup pass: disabled/orphaned/zero-action WFs, empty folders, uninstalled-plugin actions, completed one-off migrations (list above) — needs Vlad's per-item confirmation before deleting
- [ ] Spec ActivityLog async writer when System Activity Log is rebuilt

## Links

- Audit architecture: ../CLAUDE.md (locked decisions #7) · ../specs/CRS_Blueprint.html
- Buildprint rules & prompt patterns: ../decisions.md 2026-05-01
