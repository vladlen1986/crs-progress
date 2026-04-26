# CRS Decisions Log

Append-only log of architectural and product decisions. Newest at top.
Each entry: date, decision, why, alternatives considered, required artifacts.

Do not edit historical entries. If a decision is reversed, add a new entry 
explaining the reversal and link to the original.

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
