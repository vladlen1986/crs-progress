# Claude Context — CRS Project

This file pre-loads context for Claude Code so the AI assistant understands the project structure and conventions.

> **Building the CRS Brain app?** The local second-brain tool lives in `crs-brain/` (Node server + `public/index.html` + `public/map.html`). Its build state, in-progress tasks, locked decisions, and gotchas are in **`PROGRESS.md`** (repo root) — read it first for any work on the app. Key locked rules: spawn `claude` WITHOUT `shell:true` (use `spawnClaude()`); the cloned Bubble workspace lives OUTSIDE this repo at `~/projects/crs-bubble/…`; Buildprint edits are TEST-branch-only with plan-before-apply; project-only file view is the default. Do NOT commit `crs-brain/node_modules` changes (breaks Windows).

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

## Tooling & workflow

### Bubble work via Buildprint (added 2026-05-01; CLI flow since 2026-07-14)

For schema changes, Option Sets, and workflow edits in Bubble:
- Operated through the **Buildprint CLI** from CRS Brain's Buildprint chat mode
  (bp:true chats) against the cloned **TEST branch worktree**
  (`~/projects/crs-bubble/<app>/test`) — no website paste needed.
- The loop is always `buildprint sync` → edit files → `buildprint check` (must
  pass) → `buildprint apply`. Plan-before-first-apply: the copilot states its
  exact plan and waits for approval. Never `--force-apply` / `--no-check` /
  `sync --reset` without explicit approval. TEST branch only — never live.
- Build packets (crs-brain/data/plans.json, managed in the app's Build plan
  panel) break a module into one-session steps; each step expands into a
  guardrail-hardened Buildprint prompt.
- After each session, changes are ingested back into `brain/` (auto-tracking
  or the Ingest button).

For repo work (decisions.md, CLAUDE.md, audits):
- Claude Code as before, PERMISSION MODE pattern

For strategy / design / UX decisions:
- Direct chat with Claude

See `decisions.md` 2026-05-01 for the original rule set and
`brain/buildprint/crs-brain-operations.md` for the operational guardrails.

### Prompt generation (Buildprint)

When asked to generate a Buildprint prompt, the authoritative spec is
`brain/buildprint/PROMPT-STANDARD.md` and the templates are in
`brain/buildprint/templates/` (`audit.md`, `edit.md`, `pilot.md`, `reply.md`).
Follow this procedure:

1. **Classify → pick the template.** Audit an existing module → `audit.md`;
   build/adapt a bounded change → `edit.md`; prove a pattern on one target first →
   `pilot.md`; respond to a returned BP report → `reply.md`.
2. **Pull state, inject it correctly.** Read the relevant state (STATUS.md,
   decisions.md, security.md, modules.json flags, record counts) and inject it per
   the standard: **inline** locked decisions / spec values / known flags as context,
   but turn every tracked *status* into a **confirm/refute verify-question** — never
   an answer. Prompts are **self-contained**: never reference a brain/repo file BP
   can't open; inline what it needs.
3. **Consistency check.** Validate injected facts against the locked sources (e.g.
   module counts vs `design/design.md` / `data/CRS_Module_OptionSets.xlsx`; a status
   vs `brain/STATUS.md`). On any contradiction, **surface it to Vlad — do not pick
   one silently.**
4. **At most ONE clarifying question**, and only if the answer changes the prompt's
   architecture. Otherwise proceed and **label assumptions inline** at the top of the
   generated prompt.
5. **Output.** One complete markdown code block, AND save it to
   `brain/buildprint/generated/YYYY-MM-DD-<scope>.md`.
6. **Retrieval transparency.** If an existing artifact already covers ≥80% of the
   request, return it labeled **"RETRIEVED from `<path>`, not generated"** with a
   diff-style note of what changed. **Never present retrieval as generation.**
7. **After a BP report comes back**, offer to **ingest**: update `brain/STATUS.md` +
   `crs-brain/data/modules.json` from the report's machine block, and append any
   decision candidates to `decisions.md` (never resolve a decision silently).

Every emitted prompt must pass the self-check in `PROMPT-STANDARD.md` §6
(8 sections present, zero brain-file references, zero anchored answers, Task 0 =
locate-and-report, [NEG] split, evidence discipline, decision protection,
fix-attempt cap, both report formats).

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

## Knowledge base — brain/ (added 2026-07-14)

`brain/` is the living infrastructure ledger. **Read `brain/INDEX.md` first** for any question about database schema, option sets, privacy rules, backend workflows, or migrations — it maps every domain to its file and links the authoritative sources. One fact lives in exactly one file; brain/ links to decisions.md / design/ / specs/, never duplicates them. After each Buildprint session, ingest the session report via CRS Brain's "Ingest to Brain" button (attach the .md → Ingest) — it routes facts into the right brain/ files and appends brain/changelog.md.

**As of 2026-07-15 the "Current state" sections in brain/ reflect the first full real-state inventory of the Bubble test branch** (110 DTs, 98 option sets, 29 backend + 343 page workflows, complete privacy-rule tracker) — they are as-built facts, no longer spec-only. Key standing fact: 0 live DTs currently meet Pattern A; the rollout plan lives in brain/security.md.

## When in doubt

1. Check `brain/INDEX.md` for infrastructure state (schema, OS, security, workflows, migrations)
2. Check `decisions.md` for prior rulings on architecture or commercial questions
3. Check `pricing/tiers.md` for pricing questions
4. Check `design/design.md` for design questions
5. Check `data/CRS_Module_OptionSets.xlsx` for module data
6. Check `specs/CRS_Blueprint.html` for spec details
7. Ask the user — don't guess
