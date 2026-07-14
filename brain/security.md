# Security & Privacy Rules

> Locked (Pattern A — strict isolation): every business DT's privacy rule checks
> `Current User's company = This Thing's company AND Current User's property = This Thing's property`.
> A user belongs to exactly ONE property. Never company-only checks. See ../CLAUDE.md, ../decisions.md 2026-04-27.

## Current state (as-built)

- ⚠️ **No privacy rules confirmed built yet.** Casino Settings session (2026-05-02) lists "Privacy rules pending (Pattern A across both DTs)" for Company + Property.
- Access model locked: **permission-based, not role-based** (decisions.md 2026-04-17) — custom Role DT + fixed `OS - Permission` + per-user extras list.
- GDPR strategy locked: **hybrid anonymize / soft-delete / retain** (decisions.md 2026-04-17). Supporting DTs spec'd: GDPRSettings, PrivacyPolicy, ApplicantErasureRequest.

## Privacy-rule tracker

| DT | Rule built? | Notes |
|---|---|---|
| Company | ❌ pending | Casino Settings session |
| Property | ❌ pending | Casino Settings session |
| User | ❌ pending | |
| Report (legacy, 13K records) | ❓ unknown — audit | Predates Pattern A; must be verified against company+property |
| All other DTs | — | Rules added as each DT is built; every ingest must update this table |

## 🔴 Buildprint security audit — 2026-07-14 (Test branch, `buildprint audit`)

First live audit via the CLI. **45 high-severity findings:**

| Category | Count | Meaning |
|---|---|---|
| `public-data-types` | 39 | Data types publicly readable (no privacy rules, or "everyone" role grants read/search) — **direct Pattern A violation** |
| `public-uploaders` | 5 | Picture uploaders store files publicly (Company Logo, Photo, etc.) — set to private, attach to a protected Thing |
| `missed-server-side-redirects` | 1 | `app` page uses a "User is logged out" event as a redirect guard — not server-side; protected pages render before redirect. Fix: PageLoaded workflow with one simple Go-to-page action |

**24 data types with NO privacy rules at all** (publicly readable until a rule is added):
01.2 Division · 01.3 Department · 07 Employee Position · 09 Report Group · 14 Report - Event Status · 15 Report - Inspector_Tables · 23 Game Type · 24 Identified By · 25 Inspector · 26 Info Board · 27 Membership Status · 29_2 Subtask Update · 30 User Group · 32 EGM · 33 Gaming Date · 34 Info Board Category · 36 Notification · 55 Audit Checklist Item · 55 Audit Response · 55 Audit Run · 55 Audit Template · Country · Report Comparison · User Audit Log

Plus DTs whose "everyone" role grants public read/search (e.g. '29_3 Task Key Point', 'Message / Task - Depricated').

Context: this is the **Test branch** (the rebuild), so these are the Pattern A rollout to-dos, not confirmed live exposure — but Test is reachable at crsapp.live/version-test, so treat as real. Reference tables (Country, Game Type, Membership Status) may be intentionally public-read, but each needs a deliberate "everyone" role with field limits, not zero rules. Re-run `buildprint audit` after each privacy-rule pass to burn this down.

## Known risks / gaps

- Legacy Report data predates tenancy — risk of records without `property` set. Backfill is part of the tenancy migration (see migrations.md).
- Applicant* DTs will need public-facing rules (job applications arrive from non-logged-in users via custom auth — Session DT + API Workflows per Blueprint).
- **24+ DTs currently unprotected** (audit above) — the single biggest security gap; blocks any real-data go-live.

## Pending

- [ ] Build Pattern A rules for Company + Property (current Casino Settings session)
- [ ] Privacy-rule audit via Buildprint Plan-mode inventory → ingest results here
- [ ] Define public/applicant access rules when Onboarding/Job Board is built

## Where in Bubble

Data → Privacy tab per DT, dev branch. Changes via Buildprint Build mode with explicit logic + verification step (decisions.md 2026-05-01).

## Links

- Pattern A decision + trade-offs: ../decisions.md 2026-04-27
- Permission model: ../decisions.md 2026-04-17 · ../specs/CRS_Blueprint.html (Roles & Permissions)
- GDPR: ../decisions.md 2026-04-17
