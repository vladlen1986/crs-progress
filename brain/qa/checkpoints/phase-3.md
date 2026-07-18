# Checkpoint — PHASE 3 (Prototyping studio) — COMPLETE 2026-07-18

## Gate proof (independent verification subagent — one cycle, PASS; 24/24 rig checks)

- **STUDIO.1** all 4 templates scaffolded; token block byte-identical to §2.10 canon in each (2578B, Buffer.compare=0); settled+mapped scaffold → 0 flags, 87/87 MATCH in the stale-token check; theme toggle proven both via the scaffold's in-page button and the bar's postMessage (computed bg flips 24,24,24 ↔ 250,250,250). Verifier gotcha on record: read computed colors after the §2.10 200ms cross-fade.
- **STUDIO.2** external edit → iframe reloaded with ?v= in 103ms and rendered the marker; Tier-1 editor path end-to-end (real Save button → PUT /api/file → overlay renders saved content); mtime-only touch also reloads.
- **STUDIO.3** snapshot ×2 with notes → panel lists; View ⧉ current = exactly two doc windows (version + current); Restore v1 → bytes swapped, prior current auto-preserved as v3 "auto — before restore of v1".
- **STUDIO.4** restore on settled → 409 explicit refusal (writes nothing); deliberate byte-edit path still auto-reverts with warning notification (Phase-1 rule holds); panel both themes; zero console errors; favicon 204 (P2 nit closed).
- STUDIO.1–4 appended to master-checklist (`2026-07-18 p3-accept`). Rig: qa-scratch/rig/studio-accept.{js,json}.

## What was built (commits 4d6392a · 5a1e8a2 · d224eae · 7a6b8c0)

- **3.1** brain/engine/proto-scaffold.js — §2.10 fence injected BYTE-VERBATIM between `/* §2.10 BEGIN */…END` markers (assembled by script via style-inventory.rawCss210()); var-only shell (data-theme toggle, ?theme, postMessage listener); templates blank/cards/form/table from design-system patterns; POST /api/protos/create. Mapper hardened alongside: [data-theme] token blocks theme-aware in the stale check, custom-property declarations exempt from the literal scan (canon light shadows no longer false-flag).
- **3.2** live iteration — PARENT-driven 1s mtime poll (`/api/protos/mtime`) resetting the sandboxed iframe with a ?v= cache-buster (stated choice: POLL, not fs.watch — matches the app's zero-dep versionGuard precedent and the sandbox constraint: allow-scripts iframes can't fetch the app origin). Prototype bar as parent chrome on the fullscreen overlay: live status chip + version count, ◐ theme (postMessage), ⬇ Snapshot, ✓ Mark settled; poll torn down on close.
- **3.3** versions — POST /snapshot (versions/v<N>.html + note in proto.json), /restore (REFUSES on settled; auto-snapshots current first — nothing is ever lost); panel versions table (View ⧉ current side-by-side via new `openDocWindow {htmlView:true}` sandboxed doc-window kind; Restore). "New prototype" on the board + explorer background menu + panel form.

## Notes for Vlad

- Legacy registered prototypes (e.g. buttons) ignore the bar's theme toggle — only scaffolded ones carry the postMessage listener (documented limitation).
- studio-sample (settled) kept as a scaffold demo; buttons untouched, f1/f2 still your homework.

**Gate to PHASE 4: OPEN** (buildprint CLI precondition check runs first — honest ENV-LIMITED stop if unlinked).
