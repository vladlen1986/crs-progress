# Migrations

> The answer to "what do I migrate next, and how?" lives here. Order matters; each migration lists method, risks, and rollback thinking. Test branch only (Buildprint workspace); the **May 31 cutover** rule has passed — cutover status itself needs confirmation, see Pending.

## As-built facts that shape the queue (2026-07-15 inventory)

- **Schema gaps precede data backfill:** 12 live DTs are missing `company` and/or `property` FIELDS (list in database.md) — those fields must be added before any tenancy backfill can touch their records. FOREX Rate and the deprecated the_board tenant via the `OS - Company` option set (single option "Otium"), not the Company DT.
- **Country migration machinery already exists:** backend WFs `migrate_country_employee`/`migrate_country_guest` + the one-button `migration` page. Whether they were RUN is a data question Buildprint can't answer — verify record state in the editor, then retire all three.
- **`backfill_guest_first_letter` completed 2026-07-11** (comment in api/bpfpdc says endpoint disabled) — retire.
- **64 soft-deleted DTs and 24 soft-deleted option sets are still in payload** — Bubble can't hard-delete; any "cleanup" is really about the 46 live DTs.

## Migration queue (ordered)

### 1. Finish Casino Settings build — IN PROGRESS
Not a data migration, but it blocks everything: Company/Property must be fully editable before data hangs off them.
- Done: Identity card. In progress: Locale & Operations card. Pending: Contact, Status toggle, Properties tab, property detail cards, 4 workflows, Pattern A privacy rules.
- Method: Buildprint Build mode, dev branch. Next step per decisions.md 2026-05-02: Locale & Operations card → Contact → Status → Properties tab → Workflows → Privacy rules.

### 2. Tenancy backfill (company + property on existing data)
Legacy records (Report ~13K, Tasks, RFI, users…) predate Pattern A.
- **Step 0 (new, from inventory): add the missing fields first.** 12 live DTs lack company and/or property fields (database.md "Tenancy field gaps"); FOREX Rate + the_board must be repointed from `OS - Company` to the Company DT. Schema part via Buildprint.
- Method: Bubble bulk operation or scheduled API Workflow on a list, batched (Bubble WU limits — never one giant "Make changes to a list" on 13K records in one pass).
- Set `company` = Otium Company, `property` = Otium Casino Property (single-tenant pilot makes this safe).
- Risk: records missed → invisible under Pattern A privacy rules (they'll just vanish for users). Verify with counts: total records vs records-with-property, before and after. **This risk is now live-relevant: the Pattern A rollout (security.md) will hide any record with empty company/property the moment rules are added — backfill BEFORE or WITH each privacy pass.**
- Rollback: fields are additive — nothing destructive.

### 3. Report DT cleanup (WU optimization) — deferred, separate focused session
Per decisions.md 2026-05-02; scope CONFIRMED by 2026-07-15 inventory:
- `genarated_report` = **74 live + 28 soft-deleted fields, 13 live list fields** (full lists in database.md): `bookmarked by`, `read_by`, `report_view_history`, `related_users`, `receipient_list`, `new_receipient_list`, `report_comments`, `response`, `reported_by`, `response_by`, `employees_list`, `guest_list`, `file_attachments` → move to child DTs per Blueprint. Note: child DT "21 Comment" (`report_comments`) already exists live; the old `report_response` child DT is type-deleted, so ReportResponse needs re-creation.
- Also: 4 multilingual description fields × 13K records; denormalized gaming_date+fiscal_week, event_section+event_location.
- Method: create new fields/DTs first → migrate data via batched backend workflow → repoint UI → soft-retire old fields. Never delete before repoint is verified.
- Risk: high — this is live-critical reporting data. Do on test with a fresh live→test DB copy; verify record counts + spot-checks per batch.

### 4. DT code renames — tech debt
ShiftLog → DailyActivityLog (decisions.md 2026-04-27). Bubble renames DT display names easily; code-level references in workflows/expressions must be re-checked after rename.

### 5. DT→OS migrations — deferred to post-May refactor (commits 6781c14, bcca4f3, 77aa8df)
Report Group, Report Event Status, Inspector/Tables: currently DTs, spec says Option Sets. Confirmed 2026-07-15 still live DTs (`report_group` 4 fields, `event_status` 2, `inspector_assigment` 2, `inspector_watching_table` 3 — all tiny). Deferred deliberately; revisit after cutover stabilizes.

### Completed / to retire (one-offs found done by inventory)

| Migration | Status | Retire |
|---|---|---|
| Guest first_letter backfill | ✅ done 2026-07-11 (per api/bpfpdc comment) | backend WF `backfill_guest_first_letter` |
| Country field on Employee/Guest | ❓ machinery exists, run-status unverified | `migrate_country_*` WFs + `migration` page once confirmed |
| has_response flags fix | ❓ unknown | `fix_has_response_batch` once confirmed |

## How migrations are run here (rules)

1. **Test branch only.** Never touch live data until cutover process is defined.
2. Schema part → Buildprint (sync → edit → check → apply; plan approved before apply).
3. Data part → batched Bubble bulk ops / scheduled API workflows; always count-verify before/after. Buildprint edits STRUCTURE only — record data moves through the Bubble editor / Data API / scheduled WFs.
4. Every completed migration step gets ingested into this file + changelog.md same day.

## Pending

- [ ] Confirm cutover status/date (May 31 rule referenced in CLAUDE.md predates today — was cutover executed?)
- [x] Buildprint inventory of legacy structure → done 2026-07-15. ⚠️ Record COUNTS per DT still unknown (structure-only tool) — get them from the Bubble editor/Data API; sizes drive batching
- [ ] Verify run-status of country migration + has_response fix → move to "retire" list
- [ ] Execute queue items 1 → 5 in order (note: queue item 1 "Casino Settings build" — no RE_CasinoSettings page found in the 2026-07-15 inventory; its workflows/privacy rules are NOT built)

## Links

- Day 2 state & next-session priority: ../decisions.md 2026-05-02
- Pattern A (why backfill matters): ../decisions.md 2026-04-27
- WU debt detail: brain/database.md
