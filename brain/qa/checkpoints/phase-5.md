# Checkpoint — PHASE 5 (End-to-end pilot + loop-to-green) — COMPLETE 2026-07-18

## 5.1 Pilot — casino-settings through the ENTIRE pipe (copy path)

**Subject: demos/casino_property_settings.html → prototypes/casino-settings (module casino_settings).** Chosen because it is the smallest real prototype that maps to a REAL modules.json module (37.9KB; Coming_Soon is smaller but module-less — would hollow the engine's MODULE BLOCK/STATUS grounding; buttons was already consumed as the P1 acceptance sample).

**Trail (all committed; re-verified by two independent agents — PILOT.1 PASS in both loop cycles):**
- proto.json history: registered → snapshot v1 "as registered from demos/ (pilot)" → settled @ `dd65bf739ecf…`
- mapping.md: **12 REAL flags, zero planted**, all resolved with vlad as resolver-of-record (per program 5.1). Rulings, for ratification: f1–f5 legacy `--status-*` tokens → mapped to canonical `--cyan/--error/--purple/--success/--warning` (values byte-equal) · f6 22px slider radius → `--radius-pill` · f7/f9 status-tint backgrounds → `--success-tint`/`--warning-tint` · **f8/f10 approved-as-literal** (0.3-alpha status border-tints have no canon token — candidate future tokens `--success-border-tint`/`--warning-border-tint`) · f11/f12 shadow colors → `--shadow-modal`/`--shadow-dropdown`.
- build-plan.json: 12 dependency-ordered chunks (14 styles → layout → 8 component families → states → workflows), validates exit 0.
- Chunk c1 emitted through the engine: archive `2026-07-18-casino_settings-chunk-c1-…` stamped Bundle-SHA256 `cb9cc4269e28…` + Prototype-SHA256 `dd65bf739ecf…` + Chunk-Id c1; prompt carries TEST wrapper + [NEG] + byte-verbatim MAPPING CONTRACT.
- Copy path (bridge = ENV-LIMITED): c1 → `sent`; auto follow-up **"Await BP report: casino-settings/c1"** live on the board (PILOT.2 PASS, both themes). `verified` untouched — exclusively Vlad's.
- **Honest deviation, documented up front:** "BP report captured" needs a real Buildprint session — the CLI is Unauthorized (phase-4 stop) and BP-web is Vlad's. The pilot ends at `sent` + the open follow-up that chases exactly that report. **No fake report was planted** (PILOT.3 ENV-LIMITED).

## 5.2 Loop-to-green — GOAL MET

- Checklist grew to **128 rows** (CHUNKER/DASH/STUDIO/BRIDGE/PILOT appended).
- **Cycle 1** (6 parallel domain verifiers, fresh rigs, both themes): **119 PASS / 9 ENV-LIMITED / 0 FAIL / 0 UNTESTED** — commit 5db0d65. Upgrades: P6-os-interop.1 ENV-LIMITED→PASS (real 101MB POST → 413). FAIL count: 0.
- **Cycle 2** (c3 precedent: persisted rigs re-executed in fresh processes over UNCHANGED code + static battery; osgrade-notify via fresh consolidated rig): **identical 119/9/0/0** — commit 8e669b5. Three rig outputs byte-identical to cycle 1; engine determinism sha reproduced exactly; all divergences benign (checklist-count shift from the merge itself, measurement-boundary bytes, one transient external 502 with clean retry).
- **Two consecutive 100%-clean runs achieved (c1+c2). Per-cycle FAIL counts: 0 → 0.**

## Quarantine list

**Empty** — no row failed any cycle; nothing hit the 3-cycle cap.

## Needs-eyes / needs-auth list (Vlad's only homework, 9 rows)

1. **`buildprint link <token>`** (Buildprint app → Integrations → CLI) → clears BRIDGE.2/3 (then Phase 4 implements the real --send), P1-promptgen.3, P8-sounds-wishlist.7, and unblocks PILOT.3's report capture.
2. **Run the c1 Buildprint session** for casino-settings (Copy the emitted prompt from the panel → BP → paste report back) → PILOT.3.
3. Real-OS checks that headless can't do: Finder drag-IN (P6-os-interop.3), OS clipboard/screenshot paste (.4), drag-OUT to Desktop (.5).
4. Queue restart-persistence under a REAL usage limit (P8-sounds-wishlist.6).
5. **Mapping homework:** buttons f1/f2 (stale 6px radius, #B91C1C) await your ruling in the panel; pilot rulings f1–f12 above await ratification (P8 review digest will compile them).

## Hardening candidates surfaced by the loop (no row failures)

- Undo-toast handler race (<200ms window swaps in the previous op's undo) — disable/replace the button synchronously on new ops.
- bpTrack() thread loses bp:true mode (task chip already spawned).
- `/api/raw` traversal rejects with 500 vs 400 elsewhere (no leak; cosmetic consistency).
- Engine-generated 2026-07-18 prompts include repo-path labels (PROMPT-STANDARD §6 literal reading) — the referenced rows ARE embedded verbatim; flag to Vlad whether the label should drop the path.

**Gate to PHASE 6: OPEN.**
