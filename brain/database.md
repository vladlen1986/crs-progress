# Database — Data Types

> Rule (locked): every business DT carries BOTH `company` and `property` fields. Exceptions must be listed in decisions.md (Company, Subscription, system-level configs). See ../CLAUDE.md.

## Current state (as-built on test branch — full Buildprint inventory 2026-07-15)

Source: read-only sweep of the Buildprint workspace (branch `test`, snapshot `a297cb2b`), every `data_types/*/type.json` read. This section supersedes "spec-only" caveats for schema existence.

**Headline: 110 data-type folders → 46 LIVE types + 64 type-level soft-deleted (legacy carcasses still in payload). ZERO live types meet Pattern A.**

Privacy verdict tally for the 46 live types (reconciles exactly with `buildprint audit`'s 39 public-data-types):
NO RULES ×24 · public-everyone ×15 · company-only ×2 · property-only ×4 · logged-in-only ×1 (11 Report) · **Pattern A OK ×0**.

### Live data types (46)

| DT (display) | slug | fields live/del | company | property | privacy |
|---|---|---|---|---|---|
| 01 Company | `company` | 17/1 | — (is Company) | no | company-only |
| 01.1 Property | `01_1_propery` (typo slug) | 21/2 | yes | — (is Property) | property-only |
| 01.2 Division | `department_section` | 4/2 | yes | yes | NO RULES |
| 01.3 Department | `casino_department1` | 5/3 | **no (deleted)** | yes | NO RULES |
| 02 Casino Section | `report_event_location` | 3/3 | **no (deleted)** | yes | public-everyone |
| 02.1 Casino Location | `location` | 3/2 | **no (deleted)** | yes | public-everyone |
| 06 Employee | `employee` | 25/3 | yes | yes | **public-everyone (PII + autobind!)** |
| 07 Employee Position | `employee_positions` | 5/2 | yes | yes | NO RULES |
| 08 Guest | `employee1` | 13/16 | yes | yes | public-everyone |
| 09 Report Group | `report_group` | 4/1 | yes | **no** | NO RULES |
| 10 Report Type | `report_type` | 4/1 | yes | yes | public-everyone |
| 11 Report (legacy, 13K records) | `genarated_report` | **74/28** | yes | yes | logged-in only (cross-tenant read) |
| 12 Report - Employee Link | `report_employee_link` | 11/1 | yes | yes | public-everyone |
| 13 Report - Guest Link | `report_employee_link1` | 5/1 | yes | yes | public-everyone |
| 14 Report - Event Status | `event_status` | 2/1 | yes | **no** | NO RULES |
| 15 Report - Inspector_Tables | `inspector_assigment` | 2/1 | yes | **no** | NO RULES |
| 21 Comment | `report_comments` | 9/3 | yes | yes | public-everyone |
| 22 Fiscal Week | `fiscal_week` | 8/1 | yes | yes | public-everyone |
| 23 Game Type | `game_type` | 6/1 | yes | yes | NO RULES |
| 24 Identified By | `report_origination` | 3/1 | yes | yes | NO RULES |
| 25 Inspector's Focus | `inspector_watching_table` | 3/1 | yes | yes | NO RULES |
| 26 Info Board | `info_board` | 11/1 | yes | yes | NO RULES |
| 27 Membership Status | `membership_status` | 3/1 | yes | yes | NO RULES |
| 28 Tag | `tag` | 6/1 | yes | yes | public-everyone |
| 29_0 Task | `task` | 19/1 | yes | yes | public-everyone |
| 29_1 Subtask | `37_subtask` | 12/0 | yes | yes | **public-everyone + API CRUD (`exposed_api: true`)** |
| 29_2 Subtask Update | `38_subtask_update` | 6/1 | yes | yes | NO RULES |
| 29_3 Task Key Point | `taskkeypoint` | 3/3 | **no** | yes | public-everyone |
| 30 User Group | `user_group` | 6/2 | yes | yes | NO RULES |
| 31 Role | `permission_groups` | 5/3 | **no (deleted)** | yes | property-only |
| 31.1 Role Audit Log | `role_audit_log` | 7/0 | **no** | yes | property-only |
| 32 EGM | `egm_manufacturer1` | 5/1 | yes | yes | NO RULES |
| 33 Gaming Date | `gaming_date1` | 9/1 | yes | yes | NO RULES |
| 34 Info Board Category | `info_board_category` | 3/1 | yes | yes | NO RULES |
| 36 Notification | `notification` | 16/0 | yes | yes | NO RULES |
| 37 Attachment | `37_attachment` | 8/1 | yes | yes | company-only |
| 55 Audit Template | `audit` | 9/0 | yes | yes | NO RULES |
| 55 Audit Run | `audit___ar_dealer_compliance` | 16/19 | yes | yes | NO RULES |
| 55 Audit Checklist Item | `audit___ar_dealer_compliance___checklist_item` | 8/5 | yes | yes | NO RULES |
| 55 Audit Response | `audit_response` | 10/0 | yes | yes | NO RULES |
| Country (reference) | `country` | 2/1 | no | no | NO RULES |
| FOREX Rate | `forex_rate` | 2/0 | yes (**OS - Company!**) | **no** | public-everyone |
| Message / Task - Depricated | `the_board` | 14/9 | yes (**OS - Company!**) | yes | public-everyone |
| Report Comparison | `report_comparison` | 9/0 | yes | yes | NO RULES |
| User (built-in) | `user` | 13/18 | **no (deleted)** | yes | property-only |
| User Audit Log | `user_audit_log` | 7/0 | **no** | yes | NO RULES |

Tenancy field gaps among live types: **no live company field** on 01.3 Department, 02 Casino Section, 02.1 Casino Location, 29_3 Task Key Point, 31 Role, 31.1 Role Audit Log, User, User Audit Log. **No property field** on 09 Report Group, 14 Report - Event Status, 15 Report - Inspector_Tables, FOREX Rate. **Legacy tenancy hack:** FOREX Rate and Message/Task-Depricated point company at the `OS - Company` *option set*, not the Company DT (many deleted types do too).

### Soft-deleted data types (64 — still in payload)

Whole families retired at type level: Zona gamification (zona_artifact/inventory_item/mission_goal/mussion_days_completed/store/wallet, mission, mission_awards, mission_task), Daily Log (cctv_daily_log, daily_log_cage_info, daily_log_entry___comment, daily_log_menu), Shift Summary (shift_summary, shift_summary___general_info), old task stack (to_do, todo_list, task_update, the board comments `board_message_comment`, app_ticket, personal_notes), report accessories (report_bookmark, bookmarked_reports, report_currency, report_filter, report_nature_type, report_permissions, report_recipient, report_recipient_group, report_response, report_title, report_view_history, footage_reviewed, employee_report_stats, employee_report_stats1 — duplicate display names), user infra (user_role, user_role1/Power Class, user_device, user_login_activity_log, user_notification, zz_ui_demouser), casino misc (break_list, changelog/Release Note, color_palette, country-less days_before, customer_privilege_status, disciplinary_options, document_type, employee_disciplinary_measures, expense, junket_group, key_point, os___initiator_filter, player, reason_for_barring, sop_file, surveillance_informed, table_limit, time_slot, update, update1, video, youtube_video).

Note: a handful of deleted types still carry privacy rules (sop_file, personal_notes, app_ticket, zz_ui_demouser) — harmless while deleted, but they'll resurface if a type is ever restored.

## Known field-level debt

- **Report DT WU optimization (deferred) — numbers now CONFIRMED by 2026-07-15 inventory:** `genarated_report` has **74 live fields + 28 soft-deleted** in payload; **13 live list-type fields** bloating every record (`bookmarked by`, `guest_list`, `employees_list`, `file_attachments`, `new_receipient_list`, `read_by`, `related_users`, `report_comments`, `response`, `report_view_history`, `reported_by`, `response_by`, `receipient_list`); 4 multilingual description fields (english/georgian/russian/turkish) × 13K records; denormalized `gaming_date`+`fiscal_week`, `event_section`+`event_location`. Cleanup planned as separate focused session. See migrations.md.
- **Slug typos baked in:** `01_1_propery` (Property), `genarated_report` (Report), `inspector_assigment` — cosmetic, but they're the API/Buildprint identifiers.
- **DT code renames pending:** ShiftLog → DailyActivityLog (decisions.md 2026-04-27 tech debt).

## Spec'd Data Types (68, from specs/CRS_Blueprint_Source.html)

Status: `spec` = designed, not confirmed in Bubble. Update via ingest.
2026-07-15 mapping note: spec DTs that already exist as live legacy Bubble types — Report=`genarated_report`, ReportComment=`report_comments`, ReportEmployeeLink=`report_employee_link`, ReportGuestLink=`report_employee_link1`, ReportResponse=(deleted type `report_response`), Task=`task`, Subtask=`37_subtask`, SubtaskUpdate=`38_subtask_update`, Attachment=`37_attachment`, Notification=`notification`, FiscalWeek=`fiscal_week`, GamingDate=`gaming_date1`, Guest=`employee1`, Role=`permission_groups`, Department=`casino_department1`, Division=`department_section`, Position=`employee_positions`, Country=`country`.

| DT | Status | | DT | Status |
|---|---|---|---|---|
| ActivityLog | spec | | Notification | spec |
| Applicant | spec | | NotificationPreferences | spec |
| ApplicantAccount | spec | | OnboardingChecklist | spec |
| ApplicantDocument | spec | | OnboardingTask | spec |
| ApplicantDraft | spec | | OnboardingTaskAttachment | spec |
| ApplicantEmploymentHistory | spec | | OnboardingTaskTemplate | spec |
| ApplicantErasureRequest | spec | | OnboardingTemplate | spec |
| ApplicantMessage | spec | | PermissionRequest | spec |
| ApplicantNote | spec | | Position | spec |
| ApplicantRating | spec | | PrivacyPolicy | spec |
| ApplicantScreeningAnswer | spec | | Property | **built (foundation)** |
| ApplicantStageHistory | spec | | Report | live-legacy (13K records, needs cleanup) |
| Attachment | spec | | ReportComment | spec |
| Company | **built (foundation)** | | ReportDetail | spec |
| Counter | spec | | ReportEmployeeLink | spec |
| Department | spec | | ReportGuestLink | spec |
| Division | spec | | ReportResponse | spec |
| EmailTemplate | spec | | ReportRevision | spec |
| EmployeeAssignment | spec | | Role | spec |
| EmployeeCertification | spec | | Section | spec |
| EmployeeDocument | spec | | Session | spec |
| EmployeeHistory | spec | | Subscription | spec (tenancy exception) |
| EmployeeLanguage | spec | | Subtask | spec |
| EmployeeNote | spec | | SubtaskUpdate | spec |
| EmployeeSkill | spec | | Task | spec |
| EventPreference | spec | | TaskComment | spec |
| FiscalWeek | spec | | Tier | spec |
| FiscalYear | spec | | User | **built (foundation)** |
| GDPRSettings | spec | | UserPreferences | spec |
| GamingDate | spec | | | |
| Guest | spec | | | |
| HiringDailySummary | spec | | | |
| HiringRetentionCohort | spec | | | |
| HiringWeeklyRollup | spec | | | |
| InterviewSession | spec | | | |
| JobOpening | spec | | | |
| JobOpeningTranslation | spec | | | |
| JobScreeningQuestion | spec | | | |
| Module | spec | | | |

Field-by-field schemas: see the DT tables inside ../specs/CRS_Blueprint.html (regenerated from ../scripts/).

## Pending

- [x] Buildprint inventory of actual Bubble DTs → ingested 2026-07-15 (Current state above)
- [x] Verify company+property fields present on every business DT as built → **verified: 12 live types have gaps** (list in Current state)
- [ ] Report DT cleanup session (see migrations.md) — scope confirmed: 74 live + 28 deleted fields, 13 list fields
- [ ] Backfill company/property fields on the 12 gapped live DTs; migrate FOREX Rate + the_board off `OS - Company`
- [ ] Decide fate of 64 soft-deleted DTs (Bubble keeps them in payload; restore-or-purge review)
- [ ] ShiftLog → DailyActivityLog code rename

## Where in Bubble

- Test branch only (never live). Data → Data types tab; Buildprint workspace mirror: `data_types/<slug>/type.json`.
- Schema changes go through **Buildprint** (sync → edit → check → apply), test branch, plan approved by Vlad before apply (decisions.md 2026-05-01).

## Links

- Tenancy rules: ../CLAUDE.md · decisions.md 2026-04-27 (Pattern A)
- Currency/timezone architecture: decisions.md 2026-05-02
- Full field specs: ../specs/CRS_Blueprint.html
