# Option Sets

> Bubble OS are static app-level data (no tenancy fields). Naming: `OS - Name`. Bubble can't hard-delete entries — retired entries are soft-deleted and stay in payload.

## Current state (as-built on test branch — full Buildprint inventory 2026-07-15)

Source: every folder under `option_sets/` read (98 sets). **74 live + 24 set-level deleted.** Counts below are LIVE options (soft-deleted options noted). Corrections to earlier notes: OS - Module is 47 live entries (not 46) + 10 deleted; OS - Module Status has 6 entries (not 3) with badge/code/Meaning attrs and misaligned db_values (e.g. db `live` displays "Beta").

### Live option sets (74)

| slug | display | live/del opts | attributes / notes |
|---|---|---|---|
| `os_timezone` | OS - Timezone | 385/21 | display_name (IANA), region. Successor of deleted empty `os___timezone` |
| `os___currency` | OS - Currency | 156/6 | code, country, name, symbol — full ISO 4217 |
| `os___country` | OS - Country | 244/0 | code, phone_code — full country list |
| `os___permission0` | OS - Permission | 91/34 | description, is_sensitive, permission_group. Slug has `0` collision suffix |
| `module` | OS - Module | 47/10 | description, icon_code, label, page_route, release_date, section, show_in_sidebar, status (+6 deleted attrs) — module registry |
| `os_design_system_nav_item` | OS - Design System Nav Item | 36/0 | grouping, icon, item_sort, label, search_tokens, status, target |
| `employee_assignment_options` | OS - Employee Assignment | 28/0 | Abbriviation (typo) — casino job assignments |
| `os___navigation` | OS - Pages | 25/0 | Label — page routes (incl. tasks_old/tasks_new) |
| `os___days_before` | OS - Relative Time | 17/0 | Value — date presets; TWO live "This Month" duplicates |
| `os___report_filters` | OS - Custom Report Filter | 17/1 | Description, Group; db_values misaligned with displays |
| `os___ui_kit_menu` | OS - UI Kit Menu | 15/0 | icon, search_tokens |
| `power_class` | OS - Power Class | 14/0 | Group → power_class_group |
| `os___relationship` | OS - Relationship | 13/0 | emergency-contact relations |
| `os___color` | OS - Color | 12/1 | color_code |
| `os___release_date` | OS - Release Date | 12/0 | monthly slots May 2026–Apr 2027; db_values still quarter-named |
| `os___navigation_tabs` | OS - Navigation Tabs | 10/0 | generic "Tab 1…10" placeholders |
| `os___view_settings___reports_directory` | OS - Reports Directory Columns | 10/6 | column registry; 3 deleted "Report Group" duplicates |
| `report_source` | OS - Report Source | 10/0 | Description, sort_order |
| `os___file_types` | OS - FILE TYPES | 9/0 | Extentions (typo) |
| `report_status` | OS - Report Status | 9/1 | Details, Recipient View, Visibility; **db_values misaligned** (db `void` = "Final Closed") |
| `shift_summary_info_type` | OS - Shift Summary - Info Type | 9/0 | — |
| `user_role_option` | OS - User Role | 9/0 | Owner…Surveillance Operator |
| `os___pp___delete` | OS - PP - Delete | 8/0 | delete-confirmation contexts |
| `os___update_type` | OS - Update Type | 8/0 | — |
| `power_class_group` | OS - Power Class Group | 8/0 | — |
| `os___sidebar_menu` | OS - Sidebar Main Menu Item | 8/0 | ID, page |
| `module_component` | OS - Module Component | 7/0 | Module (+1 deleted attr) |
| `os___module_section` | OS - Module Section | 7/0 | 7 sections locked |
| `os___user_permission_modules` | Permission Group | 7/3 | display lacks "OS -" prefix |
| `week_day` | OS - Week Day | 7/0 | Day Number |
| `os___dashboard_tabs` | OS - Dashboard Tabs | 6/0 | — |
| `os___module_status` | OS - Module Status | 6/0 | badge_bg/border/text, code, Meaning; db_values misaligned |
| `os___with_comment_filter` / `os___with_response_filter` | filters | 3/0 each | — |
| `os___control_size` | OS - Control Size | 5/0 | 28–48px |
| `os___the_board_message___type` | OS - Board Message - Type | 5/0 | — |
| `os___yes___cancel_popuo` | OS - Confirmation Popup | 5/0 | No/Yes Button, Subtitle, Title (slug typo "popuo") |
| `os___audit_answer` | OS - Audit Answer | 4/0 | is_active, score, sort_order |
| `os___audit_run_status` | OS - Audit Run Status | 4/0 | sort_order |
| `os___comment_type` | OS - Comment Type | 4/0 | — |
| `os___create_or_edit_report` | OS - View Mode | 4/0 | Create, Edit, Preview, AI |
| `os___priority` | OS - Priority | 4/2 | sort_order |
| `os___report_filter_group` | OS - Report Filter Group | 4/0 | — |
| `os___the_board_message___status` | OS - Task Status | 4/0 | legacy db_values (pending/completed/completed0) |
| `report_severity_level` | OS - Severity Level | 4/1 | Level of Impact |
| `os___mission_status` | OS - Mission Status | 4/0 | Russian display texts — Zona legacy |
| `os___mission_type` | OS - Mission Award Type | 4/0 | Zona legacy |
| `os___gpt_model` | OS - GPT Model | 3/0 | gpt-4.1 / -mini / -nano |
| `os___game_action_type` | OS - Action Level | 3/0 | color |
| `os___avatar_size` / `os___sidebar_mode` / `os___tag_type` / `os___residency_status` / `os___inititator_filter_list` (typo) / `os___mission_popup_state` / `user_notification_type` / `employees` (OS - Sub Menu - Employee) | small UI sets | 3/0 each | — |
| `os___fiscal_week_status` | OS - Fiscal Week Status | 2/0 | Closed, Current |
| `device` / `device_location` / `employee_gender` / `employee_status` / `employee_initiator0` (OS - Yes / No) / `newest_first` (OS - Sorting) / `report_options` / `sop_status` (has "Depricated" typo) / `table_limit_type` / `os___todo_options` (2/2) | tiny sets | 2/0 each | — |
| `os___company` | **OS - Company** | 1/0 | ⚠️ single option "Otium" — the legacy tenancy hack; FOREX Rate + the_board still reference it |
| `os___cctv_audit_type_menu_item` | OS - CCTV Audit Type Menu Item | 1/0 | Dealer AR Compliance |
| `os___report_event_status` | OS - Report Event Status | 1/0 | only "Open" |
| `os___notification_entity_type` | OS - Notification Entity Type | **0/0** | live but EMPTY stub |
| `os___notification_event_type` | OS - Notification Event Type | **0/0** | live but EMPTY stub |

Tiny sets grouped for brevity; per-option detail is always re-readable from the workspace (`option_sets/<slug>/`), which is the source of truth.

### Set-level deleted (24 — still in payload)

amount_status · app_dev_stage · integrations (empty) · nationality (18 — superseded by OS - Country) · os___add_employee_mode · os___ai_option · os___casino_setup___tabs · os___create_report_popup_view_options · os___create_report_tabs · os___employee_customer_filter · os___employee_status___resigned_dismissed · os___entry_status · os___expense_type (personal test data!) · os___financial_filters · os___game_type__type_of_the_game_ · os___message_to · os___report_filters_tab · os___report_financial_status · os___reports_directory_popup · os___release_date_timing · os___timezone (empty — superseded by os_timezone) · os___yes___no_popup · release_nature_type · release_type

### Known quirks worth remembering

- **Duplicate/successor chains:** os___timezone→os_timezone · nationality→os___country · os___yes___no_popup→os___yes___cancel_popuo · release trio (release_type/release_nature_type/app_dev_stage)→os___update_type+os___module_status · old report-filter/create-report tab sets→os___report_filters/os___report_filter_group/os___view_settings___reports_directory/os___create_or_edit_report.
- **Three yes/no-ish sets**: employee_initiator0 (live, widely used as generic Yes/No — even for DT fields like `is_read`, `passed`, `is_completed`), os___yes___no_popup (deleted), os___yes___cancel_popuo (live confirmation popup).
- **db_value misalignments** (display renamed, db value kept): report_status, os___module_status, os___report_filters, os___the_board_message___status, os___release_date — never trust db_value to match display.
- **Rename-collision `0` suffixes:** employee_initiator0, os___permission0 (+ attr-level this_month0, report_group0/1…).

## Spec'd Option Sets (not yet confirmed in Bubble) — from Blueprint source

OS - Activity Action · OS - Activity Severity · OS - Activity Source · OS - Activity Subject Type · OS - Applicant Document Category · OS - Application Source · OS - Certification Status · OS - Citizenship · OS - Consent Type · OS - Counter Type · OS - Day of Week · OS - Device Type · OS - Directory View · OS - Document Status · OS - Document Type · OS - Education Level · OS - Email Delivery Event · OS - Employment Gap Reason · OS - Employment History Type · OS - Employment Status · OS - Employment Type · OS - Erasure Grounds · OS - FiscalWeek Status · OS - FiscalYear Status · OS - GamingDate Status · OS - Gender · OS - Gender Identity · OS - History Change Type · OS - Interview Outcome · OS - Interview Type · OS - Language Proficiency · OS - Leave Status · OS - Locale · OS - Management Level · OS - Marital Status · OS - Note Scope · OS - Notification Entity Type · OS - Notification Event Type · OS - Notification State · OS - Onboarding Task Category · OS - Onboarding Trigger · OS - Permission · OS - Permission Group · OS - Permission Subgroup · OS - Pipeline Stage · OS - Presence Status · OS - Rating Dimension · OS - Recipient Kind · OS - Separation Reason · OS - Session Status · OS - Skill Proficiency

(≈51 spec'd; definitions live in ../specs/CRS_Blueprint.html per module.)

## Pending

- [x] Buildprint inventory of actual Bubble Option Sets → ingested 2026-07-15 (98 sets: 74 live / 24 deleted)
- [ ] Reconcile spec'd OS list against Bubble as modules get built (note: OS - Notification Entity Type / Event Type exist but are EMPTY — fill when Notifications module is built)
- [ ] Fix in-set duplicates: os___days_before has two live "This Month" options
- [ ] Decide whether `OS - Company` (single "Otium" option) gets retired once FOREX Rate + the_board move to the Company DT

## Where in Bubble

Data → Option sets tab, test branch (Buildprint workspace: `option_sets/<slug>/`). Create/edit via Buildprint (sync → edit → check → apply).

## Links

- Module OS data: ../data/CRS_Module_OptionSets.xlsx (3 sheets)
- Timezone/currency details: ../decisions.md 2026-05-02
