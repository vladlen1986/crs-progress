# Option Sets

> Bubble OS are static app-level data (no tenancy fields). Naming: `OS - Name`. Bubble can't hard-delete entries — retired entries are soft-deleted and stay in payload.

## Current state (as-built on dev branch)

Per decisions.md 2026-05-02:

| Option Set | Entries | Attributes | Notes |
|---|---|---|---|
| **OS - Timezone** | 385 active | display_name (IANA), region | Sorted region → GMT offset → alpha. Half-hour offsets label-fixed (Tehran +3:30, Kathmandu +5:45, Eucla +8:45, Chatham +12:45, …). GMT labels static — no DST math, IANA display_name is authoritative. 21 old entries soft-deleted. |
| **OS - Currency** | 156 active | code, name, country, symbol (all text) | Full ISO 4217 active list. Display: `USD - US Dollar ($)`, ASCII hyphens. 6 old entries soft-deleted. |
| **OS - Module Status** | 3 | Display, badge_bg, badge_border, badge_text | Synced with ../data/CRS_Module_OptionSets.xlsx |
| **OS - Module Section** | 7 | Display, sort_order | Synced with xlsx — 7 sections locked |
| **OS - Module** | 46 | #, Display, label, icon_code, section, status, sort_order, show_in_sidebar, page_route, description | Bubble OS is the authoritative module list; xlsx mirrors it (decisions.md 2026-04-28) |

## Spec'd Option Sets (not yet confirmed in Bubble) — from Blueprint source

OS - Activity Action · OS - Activity Severity · OS - Activity Source · OS - Activity Subject Type · OS - Applicant Document Category · OS - Application Source · OS - Certification Status · OS - Citizenship · OS - Consent Type · OS - Counter Type · OS - Day of Week · OS - Device Type · OS - Directory View · OS - Document Status · OS - Document Type · OS - Education Level · OS - Email Delivery Event · OS - Employment Gap Reason · OS - Employment History Type · OS - Employment Status · OS - Employment Type · OS - Erasure Grounds · OS - FiscalWeek Status · OS - FiscalYear Status · OS - GamingDate Status · OS - Gender · OS - Gender Identity · OS - History Change Type · OS - Interview Outcome · OS - Interview Type · OS - Language Proficiency · OS - Leave Status · OS - Locale · OS - Management Level · OS - Marital Status · OS - Note Scope · OS - Notification Entity Type · OS - Notification Event Type · OS - Notification State · OS - Onboarding Task Category · OS - Onboarding Trigger · OS - Permission · OS - Permission Group · OS - Permission Subgroup · OS - Pipeline Stage · OS - Presence Status · OS - Rating Dimension · OS - Recipient Kind · OS - Separation Reason · OS - Session Status · OS - Skill Proficiency

(≈51 spec'd; definitions live in ../specs/CRS_Blueprint.html per module.)

## Pending

- [ ] Buildprint Plan-mode inventory of actual Bubble Option Sets → ingest here
- [ ] Reconcile spec'd OS list against Bubble as modules get built

## Where in Bubble

Data → Option sets tab, dev branch. Create/edit via Buildprint Build mode (full attribute + options table in the prompt).

## Links

- Module OS data: ../data/CRS_Module_OptionSets.xlsx (3 sheets)
- Timezone/currency details: ../decisions.md 2026-05-02
