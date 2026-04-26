# CRS Decisions Log

Append-only log of architectural and product decisions. Newest at top.
Each entry: date, decision, why, alternatives considered, required artifacts.

Do not edit historical entries. If a decision is reversed, add a new entry 
explaining the reversal and link to the original.

---

## 2026-04-27 — Locked 4 sections via Bubble Option Set reconciliation

**Decided:** Bubble Option Set is now source of truth for these 4 sections,
finalized in this commit:

- Admin / Core (10): Casino Settings, User Management, Roles & Permissions,
  Subscription & Tier, Fiscal Week Management, Notifications, System Activity
  Log, Import & Export, API & Integrations, Contacts
- Operations (8): Dashboard, Reporting, Task Manager, Request for
  Investigation, Malfunction Log, Lost & Found, Break List, Policies &
  Procedures
- Surveillance (5): Daily Activity Log, Gaming Day Report, CCTV Audits,
  Investigation Cases, Alert Center
- HR / Employees (9): Employee Management, Job Board, Onboarding, Attendance,
  Scheduling, Leave Management, Disciplinary Actions, Appraisals, Payroll

**Net changes from prior locked state:**
- Renamed: End of Shift Report → Gaming Day Report (Surveillance) — reflects
  24h gaming day scope vs single shift
- Removed: Equipment Inspection Log, Vehicles (both Surveillance)
- Added: Policies & Procedures (Operations) — operational SOPs distinct from
  Compliance's Policy Library
- Confirmed: Import & Export already in CLAUDE.md changelog, now reflected
  in Excel/Bubble
- Reordered: sort_order in all 4 sections matched to Bubble display order
  (× 10 increments)

**Pending:** Guests, Compliance, Communication sections under review
tomorrow. Source-of-truth for those remains the prior locked state until
reviewed.

**Trade-off accepted:** Equipment Inspection Log and Vehicles removed without
formal pilot validation. Logged here as risk — if pilot later asks for either,
revisit and re-add.

---

## 2026-04-27 — Tech debt: rename DT code names ShiftLog → DailyActivityLog

**Status:** Deferred. Identified but not acted on.

**Issue:** Internal DT code names ShiftLog and ShiftLogEntry remain in
specs/CRS_Blueprint_Source.html (e.g., line 4697) after module name renames
(Shift Log → Daily Activity Log). The display name now matches Excel, but
the code identifier still uses the old terminology.

**Why deferred:** Renaming code identifiers is a wider refactor — every
reference in spec, privacy rule documentation, and (eventually) Bubble DT
names. Not blocking any current work because no Bubble DT exists yet.

**When to revisit:** Before creating the actual Bubble DT. Decide at that
moment whether to use DailyActivityLog as the canonical code name or accept
the legacy ShiftLog convention.

---

## 2026-04-27 — Multi-property tenancy: Pattern A (strict isolation)

**Decided:** Pattern A — strict property isolation. Every business Data
Type carries `company` AND `property` fields. Each User belongs to exactly
ONE property. Privacy rules check both fields on every business DT. No
cross-property visibility for any user, ever.

**Privacy rule template:**
```
Current User's company = This Thing's company
AND
Current User's property = This Thing's property
```

**Why Pattern A:**
- Simplest correct model for MVP
- Cleanest privacy logic — easy to reason about, hard to leak
- Matches single-property pilot reality
- Defensible to security review

**Known trade-offs accepted:**
- Group operators (Director overseeing 3 properties) need 3 user accounts
- No cross-property reporting
- No "view all properties" admin UX
- A future multi-property customer triggers migration work

**Exceptions — Data Types that DO NOT need a property field:**
- `Company` — company is the parent of properties; no property field
- `Property` — itself the property record; has company but not self-reference
- `Subscription` / `Tier` — company-level billing
- `Permission` (Option Set) — system-level
- `Module` / `ModuleSection` / `ModuleStatus` (Option Sets) — system-level
- Any system-level config or static reference data

If a Data Type is unsure, default to having `company + property`. Removing
later is safe; adding later requires migration.

**Migration path to Pattern B (when a multi-property customer signs):**
1. Convert `User.property` (single) to `User.accessible_properties` (list)
2. Update all privacy rules to check
   `Current User's accessible_properties contains This Thing's property`
3. Update UI to show property selector for users with >1 property
4. Migrate existing single-property users by wrapping their value in a list
5. Document in `decisions.md` as Pattern B activation

**Migration path to Pattern C (when a casino group signs):**
1. Add `Role.has_all_properties` boolean (or equivalent permission)
2. Update privacy rule template to allow role-based bypass:
   `Current User's role's has_all_properties = yes
    OR Current User's accessible_properties contains This Thing's property`
3. Document trigger event and rollout

**Required artifacts:**
- `CLAUDE.md` updated (this commit)
- `specs/CRS_Blueprint.html` — every business DT must show company + property
  fields (audit pending — see `audits/2026-04-27-property-field-audit.md`
  in this commit)
- All Bubble Data Types built going forward must include both fields
- All Bubble privacy rules must check both fields

---

## 2026-04-27 — Break List module added (45 total)

**Decided:** Added Break List to Operations section as module 45.

**Why:** Pilot explicitly requested it. Real-time pit boss allocation is a
universal casino floor workflow. Confirmed separate from Scheduling —
different lifecycle (real-time vs weekly), different ownership pattern
during shift (Pit Boss vs HR/Manager).

**Scope distinction:**
- Scheduling (HR/Employees) — weekly/monthly shift planning, owned by HR
- Break List (Operations) — real-time table assignment in 20–30 min
  rotations during shift, owned by Pit Boss

**Why not a feature of Scheduling:** Different users in operational context,
different time horizon (real-time vs planning), different data shape
(allocations to physical tables vs shifts to people), different access
patterns (mobile/floor view vs desk view).

**Open questions for build phase (not blocking module creation):**
- Rotation interval: 20 vs 30 min — should be a casino setting per tenant
- How does Break List read from Scheduling? (Does it pre-populate today's
  available staff from the weekly schedule?)
- Floor visualization: list view vs table-grid view
- Break tracking: separate "on break" status vs implied gaps in allocation

**Required artifacts:**
- data/CRS_Module_OptionSets.xlsx — 45 rows
- CLAUDE.md — module count updated to 45

---

## 2026-04-27 — Reality reset on module status

**Decided:** All modules set to 'roadmap' status in the Excel. The previous
live/soon/roadmap labels were aspirational tier-groupings, not build state.
Nothing is actually built yet.

**Why:** Mismatch between intended status and actual status was causing
Claude (assistant + Code) to give answers based on aspirational state.
Truth in source-of-truth is non-negotiable.

**Future:** When a module ships in Bubble, flip its row to 'live' (and
later 'soon' for active development). Until then, all 44 are roadmap.

---

## 2026-04-27 — iTrak gap analysis: 4 modules added, 12 skipped

**Decided:** After comparing CRS's 39 modules against iTrak's published
module list (Omnigo iTrak Modules Overview brochure), added 4 modules and
permanently skipped 12.

**Added (4):**
- Contacts (Admin / Core) — vendors, agencies, regulators, suppliers
- Vehicles (Surveillance) — plate, make, owner, linked to subjects/incidents
- Lost & Found (Operations) — intake to disposal lifecycle
- Visitor Management (Guests) — contractors, vendors, deliveries, VIP visits

**Permanently skipped (12):**
- Dispatch, Guard Tour, Work Orders — real needs but out of scope for
  Core/Pro and don't fit ICP (mid-market European casinos)
- Standard Reports — already covered by CRS Reporting module
- Command & Planning — large-property pre-event feature, ICP doesn't need it
- Mobile App — already a tier capability, not a module (per pricing/tiers.md)
- Facial Recognition, License Plate Recognition — integration territory
  (third-party APIs), not modules to build
- FINTRAC — Canadian-specific AML reporting, ICP is European
- IGNET+ — cross-property network effect, can't replicate from zero.
  Counter-positioning: "regional system, no shared DB needed."
- BI by Exago — already covered by CRS Dashboard module
- Subjects — already covered by Guest Watchlist + Guest Barring

**Equivalents confirmed (no action needed):**
- iTrak "Daily Log" = CRS "Daily Activity Log"
- iTrak "Briefing Log" = CRS "End of Shift Report"
- iTrak "Incident Records" = CRS "Reporting"
- iTrak "Personnel" = CRS "Employee Management"
- iTrak "Patron Management" = CRS "Guest Management"
- iTrak "Case Management" = CRS "Investigation Cases"
- iTrak "Alerts" = CRS "Alert Center"
- iTrak "Audits" = CRS "CCTV Audits" (CRS narrower scope, intentional)
- iTrak "Notifications" = CRS "Notifications"

**Why these criteria:**
For each iTrak gap, three filters:
1. Will the pilot's surveillance director use this in 90 days?
2. Does it strengthen the wedge against iTrak, or just chase parity?
3. Can it be built solo without partners?
Two of three "no" → skip.

**Required artifacts:**
- data/CRS_Module_OptionSets.xlsx updated to 44 modules, all roadmap
- CLAUDE.md updated to reflect 44 module count and reality reset
- specs/CRS_Blueprint.html regeneration deferred to a separate commit
  (still has stale module names in scripts/v21_content.py)

---

## 2026-04-26 — Pricing tier structure locked (USD)

**Decided:** Three-tier structure — Core ($15K/yr, 6 modules), Pro ($25K/yr, 
14 modules + Mobile + Operational Alerts), Enterprise ($40K/yr, all 39 modules). 
Setup fees: $3,800 / $5,500 / $9,500. Per-property pricing. Annual contracts 
only. 100% upfront on setup.

**Why:** Casino procurement is annual. Per-property is industry standard. 
Three tiers anchor Pro as the "reasonable middle." Setup fees protect against 
unprofitable onboarding and signal serious product.

**Alternatives considered:**
- Per-user pricing (rejected — gameable, unpredictable revenue)
- Monthly billing (rejected — kills cash flow, invites churn)
- Free setup (rejected — onboarding eats 20–40h, must be funded)
- Two tiers only (rejected — no anchor for Pro)

**Required artifacts:** pricing/tiers.md (locked).

**Constraint:** Don't sell Enterprise in year 1. Cannot support solo. List on 
pricing page only as anchor.

---

## 2026-04-26 — Pilot does not pay setup fee

**Decided:** Pilot casino gets free 3–6 month pilot, no setup fee. Trade is 
written agreement covering: logo rights, case study at month 4, 2 reference 
calls, bi-weekly feedback sessions, named champion, auto-conversion to paid 
annual at locked rate, and exit clause for vendor IP retention if no conversion.

**Why:** Pilot is a co-builder, not a customer. Their value (real deployment, 
edge cases, case study, references) exceeds $3,800 setup fee. Charging weakens 
leverage on the asks that actually matter.

**Alternatives considered:**
- Charge full setup (rejected — wrong trade)
- Charge token amount $500–1000 (rejected — neither side benefits)
- Charge "data migration & training fee" $1,500–2,000 (acceptable only if 
  pilot pushes to pay something)

**Required artifacts:** Written pilot agreement before any production work.

---

## 2026-04-26 — Floor Alert Stations parked until gates pass

**Decided:** Hardware product (Android tablets at gaming tables for F100/F1000-
type alerts) parked at Phase 3, earliest start Q1 2027. Software-only 
Operational Alerts ships first in Pro tier as the validation step.

**Gates (all must pass before hardware build starts):**
1. Core tier shipped and stable in pilot for 30+ days
2. Pilot converted to paid OR second paying customer signed
3. Mobile MVP (5 screens) shipped and used by ≥1 customer
4. Operational Alerts (software-only) live in Pro for 60+ days
5. Pilot surveillance director confirmed final alert codes in writing
6. 2-device borrowed-phone prototype tested 2+ weeks, no critical failures
7. Written revenue commitment from ≥1 customer
8. $10K+ capital available without affecting runway
9. Hardware/MDM partner identified (e.g., Esper, Hexnode)

**Why:** Hardware is a different business (procurement, MDM, replacement, 
compliance, network). Solo founder cannot run hardware ops + ship SaaS 
simultaneously. Software-only validation must come first.

**Pricing target when shipped:** $400/device setup + $20/device/mo. Margin 
target ≥60%.

**Alternatives considered:**
- Build hardware in parallel with Core (rejected — distracts from paid logo #1)
- Skip software-only step (rejected — no validation of alert pipeline before 
  spending hardware capital)
- White-label per tenant on App Store (rejected — breaks at 10 customers, 
  not 50)

**Required artifacts:** modules/enterprise/floor-alert-stations.md spec when 
gates pass; MSA Operational Alerts Disclaimer clause before any device install.

---

## 2026-04-26 — Operational Alerts positioning: helper, not life-safety

**Decided:** Operational Alerts module (software-only in Pro, hardware add-on 
in Enterprise) is positioned as an operational productivity tool, NOT a 
distress/panic/life-safety system. UI text, contract clauses, marketing copy, 
and sales conversations must consistently reinforce this framing.

**Why:** Life-safety positioning creates lawsuit risk Bubble's reliability 
profile cannot defend. Real distress systems are hardwired or use dedicated 
radio (Vingcard, ASSA ABLOY, Inovonics). The "helper" framing preserves the 
competitive wedge vs iTrak (which lacks this module) without inheriting 
life-safety liability.

**Required artifacts:**
- Contract: MSA Operational Alerts Disclaimer clause (drafted, store in 
  pricing/msa-template.md when created)
- UI: small text on alert screens — "Helper alert — also call pit boss / use 
  phone for emergencies"
- Marketing: never use the words "panic," "distress," "emergency," "life-
  safety," "police integration"

**Alternatives considered:**
- Position as panic button / distress alarm (rejected — life-safety liability)
- Skip the module entirely (rejected — gives up the wedge vs iTrak)
- Build proper certified life-safety system (rejected — out of scope, requires 
  hardware partner + regulatory cert in each jurisdiction)

---

## 2026-04-26 — Migrated to Claude Code + GitHub workflow

**Decided:** Project source-of-truth migrated from scattered [claude.ai](http://claude.ai) chats 
to single git repo at github.com/vladlen1986/crs-progress. Cloned to 
~/projects/crs-progress on Mac and Windows. GitHub Desktop for sync. Claude 
Code as primary working assistant.

**Why:** [claude.ai](http://claude.ai) chats are scattered, partial, can't be diffed, and have 
no canonical "latest." Repo gives one source of truth, version history, 
cross-machine sync, and CLAUDE.md preloaded context.

**Workflow rules:**
- Work directly on `main`. No branches, worktrees, or PRs unless explicitly 
  requested. Solo spec repo, not production codebase.
- [claude.ai](http://claude.ai) used only for mobile brainstorming or when away from a machine. 
  Useful outputs must be copied into the repo within 24 hours.
- Daily ritual: pull at start of session, commit + push at end.
- CLAUDE.md is the project context file. Update when major decisions or 
  status changes happen.

**Required artifacts:** README.md, CLAUDE.md, .gitignore (all present).

---

## 2026-04-17 — Permission-based access control (not role-based)

**Decided:** Role is a Data Type carrying a list of Permission Option Set 
values. Privacy rules and UI checks ask "does this user's role contain 
permission X" — not "is this user's role = Admin."

**Why:** Enables runtime role management per tenant without redeployment. 
Customer admins can create custom roles ("Pit Boss," "Shift Lead") and 
assign exactly the permissions needed. Hardcoded role enums would force 
a deploy for every new role.

**Alternatives considered:**
- Role enum + hardcoded permission matrix (rejected — every new role 
  requires a deploy)
- Permissions directly on User (rejected — explodes at scale; 500 users × 
  50 permissions = 25K rows of admin work)

**Required artifacts:** Role DT, Permission OS, per-user "extras" field 
for one-off grants. Documented in specs/CRS_Blueprint.html under Roles & 
Permissions module.

---

## 2026-04-17 — Hybrid GDPR strategy: anonymize / soft-delete / retain

**Decided:** Three distinct data lifecycle paths. (1) Anonymize for personal 
identifiers when subject exercises right-to-erasure but data must remain for 
legal/regulatory hold. (2) Soft-delete for normal operational deletion 
(reversible). (3) Retain for required audit/compliance records.

**Why:** Casino regulators require retention windows that conflict with GDPR 
right-to-erasure. Hybrid approach satisfies both — records remain for 
compliance, personal data is scrubbed.

**Required artifacts:** Documented in specs/CRS_Blueprint.html. Backend 
workflows: anonymize_user, soft_delete_record, retention_check.

---

## Locked Architecture Decisions (foundational — see CLAUDE.md)

These are foundational and not re-litigated without strong reason:

1. **Multi-tenant:** Company + Property tenancy. MVP = 1 property per company.
2. **Permissions:** Custom Role DT + fixed Permission OS + per-user extras.
3. **GDPR:** Hybrid anonymize / soft-delete / retain.
4. **Tiers:** Three subscription tiers (Core / Pro / Enterprise). 5 internal 
   tier slots reserved in data model for future flexibility.
5. **Routing:** Single `App` page (SPA), URL parameter `v` switches module.
6. **Search:** Hybrid — Native Bubble + Scious Omnisearch + Typesense.
7. **Audit:** Single `ActivityLog` DT, polymorphic `subject_type`/`subject_id`, 
   async write via Schedule API Workflow.

---

*Append new decisions above this footer. Format: ## YYYY-MM-DD — Decision title.*
