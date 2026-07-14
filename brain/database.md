# Database — Data Types

> Rule (locked): every business DT carries BOTH `company` and `property` fields. Exceptions must be listed in decisions.md (Company, Subscription, system-level configs). See ../CLAUDE.md.

## Current state (as-built on dev branch)

Per decisions.md 2026-05-02 and commits d6859d6 (Day 1) / current:

- **Tenancy foundation built (Day 1):** Company / Property structure on dev branch. One Property auto-created per Company.
- **Field type updates (Day 2):**
  - `Company.timezone` → OS - Timezone
  - `Property.timezone` → OS - Timezone
  - `Company.currency` → OS - Currency ("Default Currency" — group HQ default, applied to new properties)
  - `Property.currency` → OS - Currency ("Reporting Currency" — source of truth for reports/financials/rollups)
- **Pilot data populated:** Otium Company (Georgia, Asia/Tbilisi, USD) + Otium Casino Property (Batumi, Asia/Tbilisi, USD).
- ⚠️ Everything else below is **spec-only** until confirmed by a Buildprint inventory ingest.

## Known field-level debt

- **Report DT WU optimization (deferred):** 50+ active fields (3× normal); 22 soft-deleted fields still in payload; list fields bloating records (`bookmarked_by`, `read_by`, `report_view_history`, `related_users`, `receipient_list`, `new_receipient_list`, `report_comments`, `response`); 4 multilingual description fields × 13K records; denormalized `gaming_date`+`fiscal_week`, `event_section`+`event_location`. Cleanup planned as separate focused session. See migrations.md.
- **DT code renames pending:** ShiftLog → DailyActivityLog (decisions.md 2026-04-27 tech debt).

## Spec'd Data Types (68, from specs/CRS_Blueprint_Source.html)

Status: `spec` = designed, not confirmed in Bubble. Update via ingest.

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

- [ ] Buildprint Plan-mode inventory of actual Bubble DTs → ingest here (first ingest priority)
- [ ] Report DT cleanup session (see migrations.md)
- [ ] ShiftLog → DailyActivityLog code rename
- [ ] Verify company+property fields present on every business DT as built

## Where in Bubble

- Dev branch only (never live before May 31 cutover). Data → Data types tab.
- Schema changes go through **Buildprint Build mode** with Claude-written prompts (decisions.md 2026-05-01).

## Links

- Tenancy rules: ../CLAUDE.md · decisions.md 2026-04-27 (Pattern A)
- Currency/timezone architecture: decisions.md 2026-05-02
- Full field specs: ../specs/CRS_Blueprint.html
