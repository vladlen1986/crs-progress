# Brain Changelog

Append-only. One entry per ingest or manual brain update. Newest at top.

---

## 2026-07-16 — Bubble sync `a297cb2b → be1670b3`: settings/client-safe.json only

One-file sync. `git name-status` shows exactly one change: `M settings/client-safe.json`. No data types, option sets, styles, pages, or workflows touched — Pattern A status unchanged (still 0/46 live DTs compliant), nothing moves between Pending/Current anywhere.

- **Key-level delta not recoverable in this session:** the sandbox blocks `git`/`node`/`python3` and any command touching `.buildprint/remote.git`, and the Buildprint CLI has no commit-to-commit diff (`changelog` compares branch workspaces only). Do NOT treat any specific key as "changed in this sync".
- **What was verified instead (current file, snapshot `be1670b3`):** all app-level security facts tracked in security.md are unchanged — `exposes_wf_api`/`exposes_get_api` true, `allow_iframe: "allow"`, `twofa_auth: false`, `have_pw_policy: false`, `sendgrid_verified: false`, restricted Google Maps key, crs.statuspage.io header script.
- **security.md** — re-verification note added; also pinned `app_rights: "private"`, `pw_protection: false`, `remove_bubble_console: true`.
- **design.md** — new as-built pointer: app-level header CSS/JS in client-safe.json (`custom_header_meta_tag_content`): preloader mask, auto-hide scrollbars, dark pickadate skin, dropdown trigger/chip ellipsis fixes, accent via `--color_bpbstx_default`.
- Settings-only diffs commonly come from editor bookkeeping (`comments_viewers`), plugin version bumps, or header-CSS edits — plausible here but **unconfirmed**, recorded as possibilities only.

Needs Vlad: if key-level history of client-safe.json matters, either approve `git diff` interactively next session or say the word and I'll keep a plain-text baseline copy of the file in crs-progress for future diffing.

Follow-up pass routing the inventory into the remaining development files:

- **migrations.md** — new "As-built facts" section (schema gaps precede backfill; country-migration machinery exists; guest first_letter backfill done 2026-07-11); Report-cleanup scope updated to confirmed numbers; "Completed / to retire" table; rules retargeted from dev→test branch; pending updated (record counts still unknown — structure-only tool; no RE_CasinoSettings page found).
- **design.md** — as-built pointers (design_system sandbox page with 209 demo WFs, UI-kit option sets); pending: audit Bubble styles/ vs tokens.css.
- **option-sets.md** — added OS - Module 47-vs-46 reconciliation to Pending.
- **PROGRESS.md** — INVENTORY next-up item marked done; Pattern A rollout packet queued as next build work; session entry appended to the decisions log.
- **CLAUDE.md** — knowledge-base section now states brain/ reflects real as-built state (0 live DTs meet Pattern A).
- **README.md** — fixed stale facts: 39→46 modules with locked section split, "10 live"→all-roadmap (2026-04-27 reality reset), 5→3 tiers, repo tree now shows brain//pricing//audits//crs-brain/, OS counts as-built.
- **decisions.md untouched** (append-only, Vlad's) — decision candidates flagged in PROGRESS.md: Company/Property rule-shape exceptions, fate of 64 soft-deleted DTs, OS - Module 47th entry.

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
