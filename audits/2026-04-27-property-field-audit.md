# CRS Blueprint — Multi-Property Tenancy Field Audit

**Audit date:** 2026-04-27
**Source spec:** `specs/CRS_Blueprint.html` (read-only, not modified by this commit)
**Pattern locked:** Pattern A (strict isolation) — every business DT must carry BOTH `company` AND `property`. See `decisions.md` 2026-04-27.

---

## Summary

- **Data Types found:** 70
- **Compliant (have both `company` and `property`):** 66
- **Legitimate exceptions (per `decisions.md` list):** 3
- **Real fixes required:** 1
- **Reclassifications from raw findings:** 2 (see "Reconciliation" below)

---

## Reconciliation against `decisions.md` exception list

The raw scan flagged 3 DTs as `NEEDS PROPERTY`. Two of them are explicitly exempted in the locked exception list and have been reclassified to `EXCEPTION`:

| DT | Raw flag | Reclassified | Reason |
|---|---|---|---|
| `Tier` | NEEDS PROPERTY | EXCEPTION | Company-level billing — explicit exception in `decisions.md` 2026-04-27. |
| `Module` | NEEDS PROPERTY | EXCEPTION | Modeled as Option Set, not a true DT — explicit exception in `decisions.md`. |
| `PermissionRequest` | NEEDS PROPERTY | NEEDS PROPERTY | Real gap. Not exempted. Must be fixed. |

**Net real fix list:** 1 DT — `PermissionRequest`.

---

## Complete audit table

| Data Type | Has company? | Has property? | Status | Notes |
|---|---|---|---|---|
| Company | n/a | n/a | EXCEPTION | Top-level tenant; IS the company |
| Property | n/a | n/a | EXCEPTION | IS the property record |
| Tier | yes | no | EXCEPTION | Company-level billing (per `decisions.md` exception list) |
| Module | yes | no | EXCEPTION | Option Set per `decisions.md` exception list, not a DT |
| EmailTemplate | nullable | yes | EXCEPTION | v20: company nullable (global default vs tenant override). Has property. |
| User | yes | yes | SPECIAL | Login identity; property is primary, single-property assignment in MVP |
| ApplicantAccount | yes | yes | SPECIAL | v20: custom auth identity, separate from User; carries both correctly |
| PermissionRequest | yes | no | **NEEDS PROPERTY** | Add property FK; update privacy rule to scope by property |
| Guest | yes | yes | OK | PII holder, 16 fields |
| Attachment | yes | yes | OK | Polymorphic, 18 fields |
| Role | yes | yes | OK | Tenant-scoped, soft-delete via is_active |
| Notification | yes | yes | OK | v20: multi-recipient, 27 fields |
| NotificationPreferences | yes | yes | OK | 1-to-1 with User, 8 fields |
| EventPreference | yes | yes | OK | Per-event override, 8 fields |
| Subscription (Watch/Follow) | yes | yes | OK | 7 fields. Distinct from billing Subscription. |
| ActivityLog | yes | yes | OK | System audit trail, 22 fields |
| GamingDate | yes | yes | OK | v21: time-period DT, 13 fields |
| FiscalWeek | yes | yes | OK | v21: time-period DT, 14 fields |
| FiscalYear | yes | yes | OK | v21: time-period DT, 9 fields |
| Counter | yes | yes | OK | Per-property numbering, 6 fields |
| UserPreferences | yes | yes | OK | UI prefs, 6 fields |
| Session | yes | yes | OK | Login tracking, 13 fields |
| Report | yes | yes | OK | Incident reporting header, 27 fields |
| ReportDetail | yes | yes | OK | Heavy fields split, 11 fields |
| ReportEmployeeLink | yes | yes | OK | Junction w/ metadata, 7 fields |
| ReportGuestLink | yes | yes | OK | Guest reference, 7 fields |
| ReportResponse | yes | yes | OK | Department response thread, 11 fields |
| ReportComment | yes | yes | OK | Internal comment thread, 9 fields |
| ReportRevision | yes | yes | OK | Field-level history, 9 fields |
| Task | yes | yes | OK | Task header |
| Subtask | yes | yes | OK | Task sub-item |
| SubtaskUpdate | yes | yes | OK | Subtask change tracking |
| TaskComment | yes | yes | OK | Comment thread |
| Division | yes | yes | OK | 3-level hierarchy, soft-delete |
| Section | yes | yes | OK | Mid-level org, soft-delete |
| Department | yes | yes | OK | Operational unit, soft-delete |
| Position | yes | yes | OK | Role within department, soft-delete |
| Employee | yes | yes | OK | Main HR record, 54 fields, PII holder |
| EmployeeAssignment | yes | yes | OK | Multi-property assignment, 10 fields |
| EmployeeDocument | yes | yes | OK | Employee doc track, 15+ fields |
| EmployeeNote | yes | yes | OK | Scoped notes, 8 fields |
| EmployeeSkill | yes | yes | OK | Competency tracking |
| EmployeeLanguage | yes | yes | OK | Language proficiency |
| EmployeeCertification | yes | yes | OK | Cert tracking |
| EmployeeHistory | yes | yes | OK | Tenure timeline |
| JobOpening | yes | yes | OK | Job posting, 25+ fields, v20: public-access pattern |
| JobOpeningTranslation | yes | yes | OK | Multilingual jobs (4-language) |
| JobScreeningQuestion | yes | yes | OK | Screening logic, token-validated API |
| Applicant | yes | yes | OK | Application record, 20+ fields |
| ApplicantDraft | yes | yes | OK | Draft application save, 8 fields |
| ApplicantDocument | yes | yes | OK | Resume/attachments, 7 fields |
| ApplicantNote | yes | yes | OK | HR notes on applicant, 7 fields |
| ApplicantScreeningAnswer | yes | yes | OK | Answer tracking, 7 fields |
| ApplicantRating | yes | yes | OK | Interview ratings, 6 fields |
| ApplicantMessage | yes | yes | OK | Applicant communication, 7 fields |
| ApplicantStageHistory | yes | yes | OK | Pipeline tracking, 6 fields |
| ApplicantEmploymentHistory | yes | yes | OK | Career history, 9 fields |
| InterviewSession | yes | yes | OK | Interview record, 18 fields |
| OnboardingTemplate | yes | yes | OK | Checklist template, 8 fields |
| OnboardingTaskTemplate | yes | yes | OK | Task template item, 8 fields |
| OnboardingChecklist | yes | yes | OK | Active checklist, 9 fields |
| OnboardingTask | yes | yes | OK | Checklist item, 10 fields |
| OnboardingTaskAttachment | yes | yes | OK | Document attach, 6 fields |
| PrivacyPolicy | yes | yes | OK | Policy version, 6 fields |
| GDPRSettings | yes | yes | OK | Compliance config, 7 fields |
| ApplicantErasureRequest | yes | yes | OK | Erasure tracking, 8 fields |
| HiringDailySummary | yes | yes | OK | Analytics, 10 fields |
| HiringWeeklyRollup | yes | yes | OK | Analytics, 8 fields |
| HiringRetentionCohort | yes | yes | OK | Cohort analysis, 8 fields |
| Location | yes | yes | OK | Casino location, shared lookup |
| GameType | yes | yes | OK | Game catalog, shared lookup |
| Tag | yes | yes | OK | Color-coded tags |
| ReportType | yes | yes | OK | Report classification, shared lookup |

---

## Priority fixes

### 1. `PermissionRequest` — add `property` field

- **Current state in spec:** has `company` (indexed FK), missing `property`.
- **Fix:** add `property` (FK to Property, indexed). Update privacy rule to check `Current User's company = This Thing's company AND Current User's property = This Thing's property`.
- **Why this matters:** without `property`, a user at Property A could see permission requests raised at Property B under the same Company. Violates Pattern A isolation.
- **Spec edit required:** yes — `specs/CRS_Blueprint.html` (deferred to a separate commit; spec is regenerated from `scripts/v21_content.py`).

---

## Special cases — note rather than fix

| DT | Why it's OK as-is |
|---|---|
| `User` | Has both fields. MVP single-property assignment matches Pattern A. Future Pattern B/C migration documented in `decisions.md`. |
| `ApplicantAccount` | v20 design: custom auth identity scoped globally; the related `Applicant` records carry both fields correctly. |
| `EmailTemplate` | v20: `company` is nullable by design (global default vs tenant override); has `property` where applicable. |

---

## Out of scope for this audit

- Option Sets (Permission, Module, ModuleSection, ModuleStatus) — not Data Types, exempt by spec rule.
- Privacy rules themselves — this audit confirms field presence only. Rule logic must still be reviewed in Bubble per the `decisions.md` 2026-04-27 template.
- The `scripts/v21_content.py` source that generates the Blueprint — stale module names (`Shift Log`, `Daily Brief`) flagged in an earlier audit; that cleanup is a separate commit.
