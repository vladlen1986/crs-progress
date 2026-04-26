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

1. **Multi-tenant:** Company + Property tenancy. MVP = 1 property per company.
2. **Permissions:** Custom Role DT + fixed Permission OS + per-user extras list.
3. **GDPR:** Hybrid anonymize/soft-delete/retain.
4. **Tiers:** 3 subscription tiers (Core / Pro / Enterprise). 5 internal tier slots reserved in data model for future flexibility. See pricing/tiers.md.
5. **Routing:** Single `App` page (SPA), URL param `v` switches module.
6. **Search:** Hybrid (Native Bubble + Scious Omnisearch + Typesense).
7. **Audit:** Single `ActivityLog` DT, polymorphic, async write.

### Module count: 39 (locked)

10 live, ~7 soon, ~22 roadmap. **Do not invent new modules.** If discussing a module, it must be in `data/CRS_Module_OptionSets.xlsx`.

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

---

## Most recent changes (Apr 2026)

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

---

## When in doubt

1. Check `decisions.md` for prior rulings on architecture or commercial questions
2. Check `pricing/tiers.md` for pricing questions
3. Check `design/design.md` for design questions
4. Check `data/CRS_Module_OptionSets.xlsx` for module data
5. Check `specs/CRS_Blueprint.html` for spec details
6. Ask the user — don't guess
