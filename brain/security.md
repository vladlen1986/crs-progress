# Security & Privacy Rules

> Locked (Pattern A — strict isolation): every business DT's privacy rule checks
> `Current User's company = This Thing's company AND Current User's property = This Thing's property`.
> A user belongs to exactly ONE property. Never company-only checks. See ../CLAUDE.md, ../decisions.md 2026-04-27.

## Current state (as-built — full privacy inventory 2026-07-15, test branch)

Every `privacy_role` in every live data type read via Buildprint workspace. **Result: 0 of 46 live DTs meet Pattern A. Not one privacy rule in the entire app conditions on BOTH company and property; only 2 rules anywhere condition on company at all.**

Tally (46 live DTs): NO RULES ×24 · public-everyone (unconditional read/search) ×15 · company-only ×2 · property-only ×4 · logged-in-only ×1.

- Access model locked: **permission-based, not role-based** (decisions.md 2026-04-17) — custom Role DT + fixed `OS - Permission` + per-user extras list.
- GDPR strategy locked: **hybrid anonymize / soft-delete / retain** (decisions.md 2026-04-17). Supporting DTs spec'd: GDPRSettings, PrivacyPolicy, ApplicantErasureRequest.

## Privacy-rule tracker (2026-07-15 — all 46 live DTs)

| DT | Rule state | Notes |
|---|---|---|
| 01 Company | ⚠️ company-only | "Own company or super admin" — OK by design? It IS the company table; confirm as decisions.md exception |
| 01.1 Property | ⚠️ property-only | "Same property or super admin" — no company check |
| 37 Attachment | ⚠️ company-only | + "Visible to creator" rule; missing property check |
| 31 Role (`permission_groups`) | ⚠️ property-only | everyone-role locked down (grants nothing, non-filterable fields) — best-practice shape, just missing company |
| 31.1 Role Audit Log | ⚠️ property-only | |
| User | ⚠️ property-only | "Same property as current user"; company fields on User are deleted |
| 11 Report (13K records) | 🔴 logged-in only | ANY authenticated user of ANY tenant can search/view all reports + autobind 73 fields. Rule is *named* "company" but only checks logged-in |
| **public-everyone ×15** | 🔴 unconditional read/search | 06 Employee (**PII: passport, national ID, DOB, phone — plus auto-binding for everyone**), 08 Guest, 02 Casino Section, 02.1 Casino Location, 10 Report Type, 12 Employee Link, 13 Guest Link, 21 Comment, 22 Fiscal Week, FOREX Rate, 28 Tag, 29_0 Task, 29_1 Subtask (**+ create/modify/delete via API for any logged-in user, `exposed_api: true`**), 29_3 Task Key Point, Message/Task-Depricated |
| **NO RULES ×24** | 🔴 publicly readable | 01.2 Division, 01.3 Department, 07 Employee Position, 09 Report Group, 14 Event Status, 15 Inspector_Tables, 23 Game Type, 24 Identified By, 25 Inspector's Focus, 26 Info Board, 27 Membership Status, 29_2 Subtask Update, 30 User Group, 32 EGM, 33 Gaming Date, 34 Info Board Category, 36 Notification, 55 Audit Template/Run/Checklist Item/Response, Country, Report Comparison, User Audit Log |

## 🔴 Buildprint security audit — re-run 2026-07-15 (unchanged from 2026-07-14)

**45 high-severity findings:** 39 `public-data-types` (= the 24 NO-RULES + 15 public-everyone above — inventory and audit reconcile exactly) · 5 `public-uploaders` (PictureUploader A, Upload Photo, Picture Uploader, Company Logo ×2 — files stored public) · 1 `missed-server-side-redirects` (`app` page guards with "User is logged out" event → pages render before redirect; fix = PageLoaded workflow with one Go-to-page action).

## Backend & app-level security (from 2026-07-15 API/settings inventory)

- 🔴 **Candidate public no-auth endpoint:** API workflow `add_user_to_read_by_all_reports_copy` (`api/bUUsh`) has `auth_unecessary: true` + `ignore_privacy_rules: true` and is the ONLY workflow without explicit `expose: false` — with app-level `exposes_wf_api: true` it likely defaults to exposed. If live, an unauthenticated caller can add any user to any report's read_by. **Verify in editor / disable.**
- `create_user` (SignUp) and `update_Report_Employees` also carry `auth_unecessary: true` but are `expose: false` — dormant risk if ever re-exposed.
- **19 of 29 backend workflows run `ignore_privacy_rules: true`** — privacy rules are not a backstop for backend logic.
- App-level (settings/client-safe.json): `exposes_wf_api: true`, `exposes_get_api: true` (Data GET API on app-wide), `allow_iframe: "allow"` (clickjacking surface), `twofa_auth: false`, `have_pw_policy: false`, SendGrid enabled but `sendgrid_verified: false`, Google Maps key client-exposed (restricted). External script loaded from crs.statuspage.io in header.

History: first CLI audit ran 2026-07-14 with the same 45 highs (details now merged into the tracker above). Context stands: this is the **test branch** (the rebuild), so findings are Pattern A rollout to-dos rather than confirmed live exposure — but test is reachable at crsapp.live/version-test, so treat as real.

## Known risks / gaps

- **06 Employee exposes PII (passport, national ID, DOB, phone) to everyone, unconditionally, with auto-binding** — worst single finding of the 2026-07-15 inventory.
- Legacy Report data predates tenancy — risk of records without `property` set. Backfill is part of the tenancy migration (see migrations.md).
- Applicant* DTs will need public-facing rules (job applications arrive from non-logged-in users via custom auth — Session DT + API Workflows per Blueprint).
- **39 live DTs publicly readable** (audit + inventory agree) — the single biggest security gap; blocks any real-data go-live.
- Reference tables (Country, Game Type, Membership Status, Fiscal Week…) may be intentionally readable, but each needs a deliberate limited "everyone" role — never zero rules.

## Pending

- [ ] Verify/disable `add_user_to_read_by_all_reports_copy` no-auth endpoint (top priority)
- [ ] Pattern A rollout across all 46 live DTs (24 no-rules first, then the 15 public-everyone; fix 06 Employee PII before anything else)
- [ ] Company + Property own-table rules: confirm intended shape as decisions.md exceptions (company-only / property-only by nature)
- [ ] 5 public uploaders → private + attach to protected Things; server-side redirect on `app` page
- [ ] Re-run `buildprint audit` after each privacy pass to burn down the 45 highs
- [ ] Define public/applicant access rules when Onboarding/Job Board is built

## Where in Bubble

Data → Privacy tab per DT, test branch (Buildprint workspace: `data_types/<slug>/type.json` → `privacy_role`). Changes via Buildprint (sync → edit → check → apply) with explicit logic + verification step (decisions.md 2026-05-01).

## Links

- Pattern A decision + trade-offs: ../decisions.md 2026-04-27
- Permission model: ../decisions.md 2026-04-17 · ../specs/CRS_Blueprint.html (Roles & Permissions)
- GDPR: ../decisions.md 2026-04-17
