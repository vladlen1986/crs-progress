# Migrations

> The answer to "what do I migrate next, and how?" lives here. Order matters; each migration lists method, risks, and rollback thinking. Dev branch only until the **May 31 cutover** rule is superseded (it has passed — cutover status itself needs confirmation, see Pending).

## Migration queue (ordered)

### 1. Finish Casino Settings build — IN PROGRESS
Not a data migration, but it blocks everything: Company/Property must be fully editable before data hangs off them.
- Done: Identity card. In progress: Locale & Operations card. Pending: Contact, Status toggle, Properties tab, property detail cards, 4 workflows, Pattern A privacy rules.
- Method: Buildprint Build mode, dev branch. Next step per decisions.md 2026-05-02: Locale & Operations card → Contact → Status → Properties tab → Workflows → Privacy rules.

### 2. Tenancy backfill (company + property on existing data)
Legacy records (Report ~13K, Tasks, RFI, users…) predate Pattern A.
- Method: Bubble bulk operation or scheduled API Workflow on a list, batched (Bubble WU limits — never one giant "Make changes to a list" on 13K records in one pass).
- Set `company` = Otium Company, `property` = Otium Casino Property (single-tenant pilot makes this safe).
- Risk: records missed → invisible under Pattern A privacy rules (they'll just vanish for users). Verify with counts: total records vs records-with-property, before and after.
- Rollback: fields are additive — nothing destructive.

### 3. Report DT cleanup (WU optimization) — deferred, separate focused session
Per decisions.md 2026-05-02:
- Remove/restructure: 22 soft-deleted fields; list-field bloat (`bookmarked_by`, `read_by`, `report_view_history`, `related_users`, `receipient_list`, `new_receipient_list`, `report_comments`, `response` → move to child DTs like ReportComment/ReportResponse per Blueprint); 4 multilingual description fields × 13K records; denormalized gaming_date+fiscal_week, event_section+event_location.
- Method: create new fields/DTs first → migrate data via batched backend workflow → repoint UI → soft-retire old fields. Never delete before repoint is verified.
- Risk: high — this is live-critical reporting data. Do on dev with a fresh live→dev DB copy; verify record counts + spot-checks per batch.

### 4. DT code renames — tech debt
ShiftLog → DailyActivityLog (decisions.md 2026-04-27). Bubble renames DT display names easily; code-level references in workflows/expressions must be re-checked after rename.

### 5. DT→OS migrations — deferred to post-May refactor (commits 6781c14, bcca4f3, 77aa8df)
Report Group, Report Event Status, Inspector/Tables: currently DTs, spec says Option Sets. Deferred deliberately; revisit after cutover stabilizes.

## How migrations are run here (rules)

1. **Dev branch only.** Never touch live data until cutover process is defined.
2. Schema part → Buildprint Build mode (Claude writes the prompt, review plan before approving).
3. Data part → batched Bubble bulk ops / scheduled API workflows; always count-verify before/after.
4. Every completed migration step gets ingested into this file + changelog.md same day.

## Pending

- [ ] Confirm cutover status/date (May 31 rule referenced in CLAUDE.md predates today — was cutover executed?)
- [ ] Buildprint inventory: which legacy DTs have how many records (sizes drive batching)
- [ ] Execute queue items 1 → 5 in order

## Links

- Day 2 state & next-session priority: ../decisions.md 2026-05-02
- Pattern A (why backfill matters): ../decisions.md 2026-04-27
- WU debt detail: brain/database.md
