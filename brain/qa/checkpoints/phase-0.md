# Checkpoint — PHASE 0 (deep comprehension) — COMPLETE 2026-07-18

## Gate proof (independent verification subagent)

- **Cycle 1:** PART 1 app-map spot-checks **5/5 PASS** (openDocWindow/openHtmlOverlay/raw-headers · guard 7-stub trigger set + User-DT LOCKED ruling · queue blocked-limit/resumeAt/boot-requeue + seconds assumption · notifyT/16-type registry/DND-bell semantics · confirmed-absent files). PART 2 FAIL — overlap list missed Progress Tree + Wishlist (+ Tier-1 editor, action-log).
- **Fix cycle 1:** overlaps 9–12 added (commit 69d5842).
- **Cycle 2:** items 9–12 verified accurate against code; adversarial sweep found **no remaining missed overlaps**. **Overall gate: PASS.**

## Commits

| commit | content |
|---|---|
| 59e1083 | p0: persist program prompt |
| ae1ac69 | p0: init progress file |
| 1ceef7c | p0: app-map as-built refresh + reconciliation + phase-1 plan |
| 69d5842 | p0: reconciliation fix (verify cycle 1) |

## Artifacts

- `brain/design/app-map.md` — as-built truth (server surface, UI region APIs, engine interfaces, state-file writer/reader table, design canon, fragile spots, §8 = 10 doc-vs-reality corrections).
- `brain/qa/program-progress.md` §P0.3 — 12 pre-existing overlaps (reuse, never rebuild) + 11 approach adjustments (A–K).

## FLAGS FOR VLAD (adjusted approaches — not silently improvised; full text in progress file §P0.3)

1. **A — Bubble style export missing.** `design-system-export.md` (design-system §20 L438) doesn't exist. Mapping will find-first over a script-built `style-inventory.json` from the ~6 attested style names + §13 naming + STATUS §6 reusables; unmatched tokens become explicit "chunk 1 creates <style>" rows. Drop a real export at `brain/design/design-system-export.md` anytime to upgrade the lookup.
2. **D — "[LOCKED] tag" reality.** decisions.md has no literal tag; resolved = dated entry + [OPEN] stub deleted. All program references to "tagged [LOCKED]" are implemented as stub-removal detection; P10's remote ruling appends the dated entry + deletes the stub with a `via: remote` audit stamp.
3. **E — "User company field" decision doesn't exist as [OPEN]** (LOCKED 2026-07-16: User DT property-only). P6 raises decision todos from the audit report's actual Decisions-needed section; the guard's Pattern-A stop = the own-table stub.
4. **K — engine template is 7-part**, not PROMPT-STANDARD's literal 8 sections (no Attachments line/guardrail footer). Chunk prompts inherit the engine template as the program directs; divergence logged, not resolved — your call whether the engine should grow the missing two sections.
5. **P6 prompt name.** No `um-audit-combined` in the archive; closest are `2026-07-16-user-management-audit.md` + `2026-07-16-user-management-as-built-section-audit.md`. Phase 6 will combine/regenerate through the engine per its own rules.
6. **Stale server process suspected:** live :4317 answers /api/ping but 404s /api/version (endpoint exists in code) → the running process predates recent commits. Phases with new endpoints will restart the server (launcher scripts exist; state is stamp-gated and restart-safe by design).

## Reconciliation summary

Phases 1–3 core stores all greenfield (prototypes/, data/tasks.json, brain/digests/ confirmed absent). Phase 4 transport helpers exist (spawnBuildprint/runBuildprint). Phase 9 rides the proven limit-aware queue. Phase 7 extends the stamp-gated watcher pattern. Phase 10 extends the single-handler PIN chokepoint with bearer auth. Nothing gets rebuilt that already works.

**Gate to PHASE 1: OPEN.**
