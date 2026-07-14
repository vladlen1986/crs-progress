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

## Known risks / gaps

- Legacy Report data predates tenancy — risk of records without `property` set. Backfill is part of the tenancy migration (see migrations.md).
- Applicant* DTs will need public-facing rules (job applications arrive from non-logged-in users via custom auth — Session DT + API Workflows per Blueprint).

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
