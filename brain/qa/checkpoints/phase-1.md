# Checkpoint — PHASE 1 (Prototype → BP chunker) — COMPLETE 2026-07-18

## Gate proof (independent verification subagent; micro-loop: 2 cycles)

- **Cycle 1:** CHUNKER.2 PASS · CHUNKER.3 PASS · CHUNKER.4 PASS · CHUNKER.5 PASS (rig-driven, both themes, zero console errors, screenshots in qa-scratch/rig/) · **CHUNKER.1 FAIL** — inline `style=""` literals bypassed the mapper (the exact acceptance plant was invisible).
- **Fix cycle:** inline style-attribute scan added to computeMapping (literals + var() uses, double- AND single-quoted), tokenRows computed after all scans. Reproduced flag f3 `#FF00AA` and `#123456` via both CLI and HTTP.
- **Cycle 2 (adversarial re-run by the same independent verifier):** CHUNKER.1 **PASS** end-to-end with the exact original plant — auto-revert + warning notification, f3 flagged, plan REFUSED on 3 flags, approve-literal → still refused on f1/f2, pristine restore verified (sha 48c14d6e2301… == settledHash == plan.protoHash). CHUNKER.3 byte-identity re-checked post-fix (23/23 token-table lines). **Overall gate: PASS.**
- Verifier's cycle-2 catches, both fixed same-day: (a) the server's require cache ran stale engine code over HTTP → `freshChunkEngine()` per request; (b) single-quoted style attrs unscanned → regex widened (proven live through HTTP without a restart, i.e. (a) works).

## What was built

- **1.1 Lifecycle:** `prototypes/<name>/` + proto.json (draft|settled|built, settledHash, notes audit trail); GET /api/protos(+detail), POST register/settle; byte-hash drift check on every read auto-reverts settled/built→draft + warning notification. autoCommit extended to prototypes/.
- **1.2 Mapping:** brain/engine/style-inventory.js (deterministic inventory: §2.10 paired tokens, curated alias map, attested styles w/ provenance, STATUS §6 reusables; auto-upgrades if design-system-export.md appears) + chunk.js `map` — var→canonical rows, stale-token diff vs canon (the "stale-token grep" now exists as code), literal scan incl. inline styles → FLAGGED rows w/ nearest token, value-matched literals auto-map (dark-first), component→§-family find-first, interaction inventory; resolutions carry over re-maps; chunking refuses while any flag is unresolved.
- **1.3 Plan:** chunk.js `plan` — dependency-ordered chunks (styles→layout→components→states→workflows), producedNames per §13, usesNames contract validated on every load; hand-broken refs rejected.
- **1.4 Emission:** `emit` — whole-plan GUARD (any chunk touching an [OPEN] stub → DECISION-NEEDED, zero chunks, 409 + decision-attention notification), engine gen (verbatim bundle, TEST wrapper, [NEG]), archive stamped Bundle-SHA256 + Prototype-SHA256 + Chunk-Id, MAPPING CONTRACT appended mechanically (judgment call #53), regenerate-with-corrections slot.
- **1.5 Follow-through:** protos.html panel (register/settle/map/plan/flag-resolution/chunk list: Generate·Copy→sent·paste report→reported·Verified/Failed; all-verified→built) + dashboard Prototypes card + explorer "Register as prototype".

## Commits

fc11d6b (T1) · b9fb7cc (T2) · 2f192aa (T3) · fd9b29f (T4) · fb9b86f (T5) · a3809a0 (flag reset) · 657065e + 7677e19 (verify fixes) — plus app autoCommit audit-trail commits (`brain: prototype …`), including 0ca3e41 which swept the inline-scan fix in (hygiene hazard, noted).

## Artifacts (acceptance trail)

prototypes/buttons/{proto.json, buttons.html, mapping.md, build-plan.json, chunks/c1-prompt.md, chunks/c1-report.md (self-identified FAKE test report)} · brain/design/style-inventory.json · archive brain/buildprint/generated/2026-07-18-user_management-chunk-c1-….md (all three hashes) · master-checklist rows CHUNKER.1–5 (all PASS, `2026-07-18 p1-accept`/`c2`) · rig screenshots qa-scratch/rig/chunker5-{dark,light}.png.

## Standing notes for Vlad

1. **Your homework on the sample:** flags f1 (stale `--r-button:6px` vs canon 7px) and f2 (literal `#B91C1C`) are deliberately UNRESOLVED — the panel gives you Map / Approve literal / Fixed-in-proto buttons. Chunk c1's emitted prompt exists; the plan won't advance past mapping refusal until you rule.
2. autoCommit sweeps concurrent working-tree edits into `brain:` commits — history stays honest but noisy (P1 verify caught it; consider CRS_BRAIN_AUTOCOMMIT=0 during heavy dev).
3. `verified` remains exclusively yours — acceptance test statuses were reset to pending; the fake c1 report file remains (self-labeled).

**Gate to PHASE 2: OPEN.**
