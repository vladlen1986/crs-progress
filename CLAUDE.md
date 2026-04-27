# Claude Context — CRS Project

This file pre-loads context for Claude Code so the AI assistant understands the project structure and conventions.

---

## Project: CRS (Casino Reporting Suite)

Multi-tenant SaaS for casino operations. Built on Bubble.io. Solo founder building solo (4 yrs Bubble experience).

---

## How to interact with the user (Vlad)

- **Be direct.** Short, actionable answers. No motivational filler. 1-3 sentences default.
- **Act as a ruthless mentor.** Challenge weak ideas, stress-test assumptions, attack the idea not the person, reject "feels right" as justification.
- **Apply the scale test:** "What breaks at 50 tenants / 500 users / 5M records?"
- **No long tables or multi-layered breakdowns** unless explicitly asked.
- **No fabrication.** If you don't know something, say so. Never invent modules, fields, or features that aren't in the spec.

---

## Critical project facts

### Locked architecture decisions

1. **Multi-tenant + Multi-property (Pattern A — strict isolation):** Every business Data Type carries BOTH `company` and `property` fields. A user belongs to exactly ONE property. Privacy rules check both: `Current User's company = This Thing's company AND Current User's property = This Thing's property`. No cross-property visibility. See `decisions.md` 2026-04-27 for trade-offs and migration path.
2. **Permissions:** Custom Role DT + fixed Permission OS + per-user extras list.
3. **GDPR:** Hybrid anonymize/soft-delete/retain.
4. **Tiers:** 3 subscription tiers (Core / Pro / Enterprise). 5 internal tier slots reserved in data model for future flexibility. See pricing/tiers.md.
5. **Routing:** Single `App` page (SPA), URL param `v` switches module.
6. **Search:** Hybrid (Native Bubble + Scious Omnisearch + Typesense).
7. **Audit:** Single `ActivityLog` DT, polymorphic, async write.

### Module count: 46 (locked, updated 2026-04-28)

All 46 on roadmap. Nothing shipped yet. Status field in Excel = roadmap for all rows. **Do not invent new modules.** If discussing a module, it must be in `data/CRS_Module_OptionSets.xlsx`.

### Sections (7, locked)

Admin / Core, Operations, Surveillance, Guests, HR / Employees, Compliance, Communication.

### Design tokens

Use `design/tokens.css` — never hard-code colors. Source of truth.

**Default body text is `#A6A6A6` (secondary), not `#E0E0E0` (primary).** This is intentional — primary is reserved for headings/key info.

### Bubble naming

| Kind | Prefix |
|---|---|
| Page | `#Name` |
| Popup | `#PP - Name` |
| Reusable Element | `#GR - Name` |
| Floating Group | `#FG - Name` |

---

## When making changes

### To modules
- Update `data/CRS_Module_OptionSets.xlsx`
- Update `specs/CRS_Blueprint.html` roadmap table
- Update `design/design.md` if section structure changes

### To design system
- Update `design/tokens.css` (CSS source)
- Update `design/Styles.txt` (plain reference)
- Update `design/design.md` (rules and reasoning)

### To Blueprint spec content
- Edit `scripts/v21_content.py` or `scripts/components_data.py`
- Run `python scripts/build_blueprint.py` to regenerate

### To pricing or commercial decisions
- Update pricing/tiers.md
- Append a new entry to decisions.md (newest at top, append-only)
- Update CLAUDE.md if a foundational fact changes

---

## Pricing & Commercial

- Pricing locked in pricing/tiers.md — three tiers, USD, annual contracts, 
  100% upfront setup fees.
- Don't sell Enterprise in year 1. List on pricing page only as anchor for Pro.
- Pilot casino does NOT pay setup fee. Trade is pilot agreement (logo, case 
  study, references, conversion clause). See decisions.md.
- Floor Alert Stations (hardware add-on) parked until 9 gates pass. Earliest 
  start Q1 2027. See decisions.md and modules/enterprise/floor-alert-stations.md 
  (when created).
- Operational Alerts module is positioned as helper, not life-safety. Never use 
  the words panic, distress, emergency, life-safety in UI/marketing/contracts. 
  See decisions.md.

---

## Things NOT to do

- ❌ Don't fabricate modules. If unsure, check the Excel.
- ❌ Don't suggest hardware/contract/commercial decisions unless asked.
- ❌ Don't add `text-decoration: line-through` to completed items.
- ❌ Don't combine bg + border + text-color on active states.
- ❌ Don't fragment shared modules per department (Reporting is one module).
- ❌ Don't use `#E0E0E0` as default body text.
- ❌ Don't over-engineer. MVP first, scale later.
- ❌ Don't write privacy rules that check only company. Must check company AND property on every business DT.
- ❌ Don't add a Data Type without `company` and `property` fields unless it's explicitly listed in `decisions.md` as a known exception (Company, Subscription, system-level configs).
- ❌ Don't design UI assumes a user can switch properties. They cannot.

---

## Most recent changes (Apr 2026)

- 2026-04-27: Reality reset — all modules set to 'roadmap' status. Nothing built yet; previous live/soon labels were aspirational.
- 2026-04-27: Added 4 modules from iTrak gap analysis — Contacts (Admin / Core), Vehicles (Surveillance), Lost & Found (Operations), Visitor Management (Guests). Total now 44, all roadmap.
- 2026-04-27: Confirmed Alert Center covers operational alarm management — no separate alarm module needed.
- 2026-04-27: Executed pending renames — Warnings → Disciplinary Actions; Onboarding + Job Board split into Onboarding and Job Board.
- 2026-04-27: Added Break List module (Operations) — pilot explicitly requested. Real-time pit boss allocation distinct from Scheduling. Total now 45.
- 2026-04-27: LOCKED — Multi-property tenancy as Pattern A (strict isolation). Every business DT requires company + property fields. User belongs to one property. See `decisions.md`.
- 2026-04-27: Reconciled 4 sections (Admin / Core, Operations, Surveillance, HR / Employees) against finalized Bubble Option Set. Section composition locked for these 4. Guests/Compliance/Communication review pending tomorrow.
- 2026-04-27: Renamed End of Shift Report → Gaming Day Report (Surveillance). Reflects 24-hour gaming day scope, not single shift.
- 2026-04-27: Removed Equipment Inspection Log and Vehicles from Surveillance. Net composition unchanged after Policies & Procedures + Import & Export added.
- 2026-04-27: Added Policies & Procedures (Operations) — central operational SOP library, distinct from Compliance's Policy Library.
- 2026-04-28: Locked Guests, Compliance, Communication sections + finalized cross-section additions. Net: 6 ADDs, 6 DELETEs, 1 RENAME.
  - Added: Meetings, Chain of Command Chart (Operations); Guest Opportunist List, Blackbook Network (Guests); House Rules (Compliance); Support Center (Admin / Core).
  - Renamed: Internal Messaging → Intercom (Communication).
  - Deleted: Policies & Procedures (Operations); Guest Statistics, VIP / Loyalty Tracking (Guests); Compliance Register, Regulatory Reports (Compliance); Announcements (Communication, folded into Info Board).
- 2026-04-28: FINAL RECONCILIATION — all 7 sections locked at 46 modules total. Bubble Option Set is authoritative source. xlsx fully synced. Section composition: Operations 9, Surveillance 6, HR / Employees 9, Guests 6, Communication 2, Admin / Core 11, Compliance 3.
- Tasks moved to Operations (was Surveillance)
- Investigation Cases moved to Surveillance (was Compliance)
- Malfunction Log moved to Operations (was Surveillance)
- Onboarding + Job Board split into 2 modules
- Disciplinary Actions renamed (was Warnings)
- Daily Activity Log + End of Shift Report (industry standard names, was Shift Log + Daily Brief)
- Alert Center added to Surveillance (roadmap — F100/F1000 floor alerts via tablets)
- Import & Export added to Admin / Core
- Sidebar width: 256px (was 240px)

---

## Sidebar implementation pattern

- One Repeating Group per section
- All sections collapsed by default
- Active state: bg + text color change only (no border)
- Pinned section at top, items remain visible in original section with filled pin icon
- Module click → `Go to page App, send parameter v = module's page_route`
- App page renders `#GR - Coming Soon` if module status ≠ live
- All sidebar queries (Repeating Groups, Search for X) must constrain by Current User's property, not just company.

---

## When in doubt

1. Check `decisions.md` for prior rulings on architecture or commercial questions
2. Check `pricing/tiers.md` for pricing questions
3. Check `design/design.md` for design questions
4. Check `data/CRS_Module_OptionSets.xlsx` for module data
5. Check `specs/CRS_Blueprint.html` for spec details
6. Ask the user — don't guess
