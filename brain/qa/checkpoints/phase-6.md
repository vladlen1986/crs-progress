# Checkpoint — PHASE 6 (UM audit through the pipe) — COMPLETE 2026-07-18 (copy-path variant)

## Gate proof (independent verifier — one cycle, PASS on all 6 items)

- **P6.1 PASS** — combined audit prompt regenerated through the engine (`um-audit-combined` didn't exist; retrieval evaluated first, <0.8 → generated): `brain/buildprint/generated/2026-07-18-user_management-read-only-combined-audit-….md`, engine-stamped, Bundle-SHA256 a9b23469…, READ-ONLY + TEST wrapper, scorecard per dimension + explicit as-built section cross-check task, machine JSON block, 6 [NEG] items.
- **P6.2 ENV-LIMITED (root cause in row)** — the report cannot exist without a real Buildprint session: CLI Unauthorized (phase-4 stop), BP-web is Vlad's. **Nothing fabricated.** Follow-up todo with exact copy-path instructions is live on the board (copy prompt → BP TEST → attach report → Ingest to Brain; the ingest path then applies modules.json/STATUS deltas and raises scorecard/[NEG] todos — that machinery is the standard ingest flow, already shipped).
- **P6.3 PASS** — "Decision needed: Company/Property own-table privacy-rule shape (Pattern A exceptions)" todo OPEN, linked {kind:decision, ref:stub title}, raised through the REAL emit-guard mechanism (not hand-inserted; notification 490290be decision-attention). Auto-closes only when the stub is resolved in decisions.md.
- **P6.4 PASS** — guard blocks UM-scoping intents on all three paths: /api/modules/edit-prompt → 409 in 4ms (zero model spend) · CLI gen exit 2 (trigger "01 Company") · emit whole-plan stop (trigger "privacy rule on Company"); plan restored + validates.
- **P6.5 PASS** — `brain/buildprint/drafts-post-decision-um.md`: 3 drafts mapped to their blocking [OPEN] stubs + 2 unblocked candidates, labeled DRAFTS NOT generated.
- Zero state edited beyond the claimed scope (modules.json + STATUS.md provably untouched by P6 commits).

## Program-text adjustment honored (reconciliation E, flagged since Phase 0)

The program expected "Pattern A / User company field" decisions from the report. "User company field" is already LOCKED (2026-07-16, User DT property-only) — no such stub exists. The Pattern-A decision surfaced is the real own-table stub; further Decisions-needed entries will come from the actual report when Vlad runs it, via the ingest flow (never resolved silently).

## WHAT AWAITS YOUR RULING (the phase's whole point)

1. **[OPEN] Company/Property own-table privacy-rule shape (Pattern A exceptions)** — blocks drafts 1–2 (own-table privacy application + full Pattern A UM sweep). Board Needs-me row + linked todo live.
2. **[OPEN] Pattern A rollout order & batching** — additionally blocks draft 2.
3. **[OPEN] Permission matrix vs checklist for view-only gates** — blocks draft 3 (UM view-only gating).
4. Resolve = add a dated `## YYYY-MM-DD —` entry in decisions.md and delete the stub; the guard unblocks and the decision todo auto-closes on the next reconcile.
5. **First post-decision `brain gen` intents** = drafts 1–5 in `brain/buildprint/drafts-post-decision-um.md` (drafts 4–5 are unblocked already but wait on the audit scorecard to confirm the gaps).
6. **Run the audit** (the follow-up todo has the copy-path steps) — its report then drives the P6.2 ingest: deltas, scorecard-FAIL todos, [NEG] needs-eyes todos.

Rows P6.1–5 appended (PASS ×4, ENV-LIMITED ×1). **Gate to PHASE 7: OPEN.**
