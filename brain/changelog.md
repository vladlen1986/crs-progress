# Brain Changelog

Append-only. One entry per ingest or manual brain update. Newest at top.

---

## 2026-07-15 — First full Buildprint inventory ingested (test branch, read-only)

Swept the entire Buildprint workspace (snapshot `a297cb2b`, synced clean; no Bubble changes made). Brain stops being spec-only:

- **database.md** — as-built table of all 110 data types: 46 live / 64 type-level soft-deleted. Zero live DTs meet Pattern A. 12 live DTs missing company and/or property fields; FOREX Rate + the_board still tenant via the `OS - Company` option set. Report DT debt confirmed: `genarated_report` = 74 live + 28 deleted fields, 13 list fields. Spec→actual slug mapping added.
- **option-sets.md** — all 98 option sets: 74 live / 24 set-level deleted, entry counts + attributes; duplicate/successor chains (os_timezone, os___country, confirmation popups, release trio); db_value-vs-display misalignments flagged (report_status, module_status…); two empty live stubs (Notification Entity/Event Type).
- **security.md** — full privacy-rule tracker: 24 live DTs NO RULES, 15 public-everyone (incl. 06 Employee exposing PII with autobind, 29_1 Subtask with public API CRUD), 2 company-only, 4 property-only, 11 Report logged-in-only cross-tenant. `buildprint audit` re-run: same 45 highs as 2026-07-14. NEW backend findings: candidate no-auth endpoint `add_user_to_read_by_all_reports_copy`; 19/29 backend WFs ignore privacy rules; app-level exposes_wf_api + exposes_get_api on, 2FA/pw-policy off, allow_iframe on.
- **workflows.md** — 29 backend API workflows (all APIEvent) + 7 pages / 343 page workflows inventoried; legacy cleanup list: 1 disabled WF, 1 orphaned trigger, 21 zero-action shells, 27 empty WF folders, 12 broken-plugin WFs, completed one-off migrations to retire.

Source: 6 parallel read-only inventory agents over data_types/, option_sets/, pages/, api/, settings/. No apply, no edits to the workspace.

---

## 2026-07-14 — Brain initialized

Seeded brain/ from repo sources: decisions.md (Day 1–2 as-built state), specs/CRS_Blueprint_Source.html (68 DTs, ~51 spec'd OS), data/CRS_Module_OptionSets.xlsx (46 modules / 7 sections / 3 statuses), CLAUDE.md locked rules. Marked everything not confirmed in Bubble as spec/pending. First ingest priority: Buildprint Plan-mode inventory of actual DTs, Option Sets, privacy rules, and legacy backend workflows.
