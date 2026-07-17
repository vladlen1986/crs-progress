# Design-system compliance matrix — before / after

> P9.6 deliverable. Before = Phase-0 element inventory (2026-07-17, pre-sweep). After = post-P9.2 sweeps as verified by QA-loop cycle 1 (72 PASS / 5 FAIL / 5 ENV-LIMITED across 82 rows; the 5 FAILs are fixed in `qa-loop: cycle-1`, re-verified in cycle 2 — see brain/qa/master-checklist.md for the row-level record).

| Screen | Before (C / OT / NC / UN) | After |
|---|---|---|
| index: header+sidebar+taskbar | 1 / 19 / 9 / 0 | compliant (OT ratified as alias-derivations, call #8; NC fixed in a29b3d7) |
| index: dashboard | 0 / 8 / 4 / 1 | compliant (JS color injection themed via var()+color-mix) |
| index: chat surfaces | 2 / 11 / 13 / 1 | compliant (focus rings, resting borders, code/prose vars fixed) |
| index: explorer+doc windows | 11 / 1 / 13 / 2 | compliant (shadows tokenized, syntax-highlight vars, icons.js theme-aware) |
| index: settings+toasts+modals | 8 / 2 / 12 / 2 | compliant (crsConfirm replaces native confirms; scrims → --overlay in qa-loop cycle-1) |
| index: kanban+list | 3 / 6 / 6 / 0 | compliant |
| map.html | 1 / 6 / 19 / 6 | compliant (canvas reads tokens at runtime + theme-flip observer; f113d35) |
| tree.html | 1 / 10 / 10 / 2 | compliant (288d681) |
| wishlist + queue | 0 / 4 / 16 / 1 | compliant (0 residual literals) |
| memory + activity | 1 / 7 / 11 / 2 | compliant |
| **Totals** | **28 / 74 / 113 / 17** | **NON-COMPLIANT = 0 · UNTHEMED = 0**; approved literals carry citation comments; user overrides #35-#37 supersede spec where noted |

Approved-literal register (all carry in-code comments): §2.10 block internals · `--white` on accent/status fills · code/prose/veil/overlay/head-bg app tokens (call #4) · constellation `--c-*` (call #6/#20) · dark doc-preview backdrop (call #19) · image-viewer stage (call #38) · file-badge inset depth cue · light `.seg` elevation shadow (§3.3).
