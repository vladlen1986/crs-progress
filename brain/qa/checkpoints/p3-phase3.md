# Checkpoint — BRAIN PROGRAM 3, PHASE 3 (entity pages + backlinks) — COMPLETE 2026-07-18

## Gate proof (independent verifier — 3/5 first pass, 1 fix cycle catching 2 real bugs, then PASS 5/5)

- **ENTITY.1 PASS** — entity.html#module=<id>: all 7 sections (What's left/Decisions/Chunks+reports/Prompts/Todos/Feedback/Checklist) from real data, counts match /api/entity exactly, 18 source links wired, title name+status+%.
- **ENTITY.2 PASS** — backlinks both places: entity rail "Referenced by 10" == API; main-app decisions.md doc window → .dp-backlinks "Referenced by 39" (12 chips, routes correctly).
- **ENTITY.3 PASS (after fix)** — auto-link chips: two module names → two .ent-chips (multi-match), code/pre excluded, click opens the correct entity page. FIRST PASS FAILED — Bug 1: the chip onclick closed over the loop var `m` which is null after the while-loop exits, so every click threw. Fixed with a per-iteration `const nm=m[1]`.
- **ENTITY.4 PASS** — orphan (zero-inbound → orphan:true) + incremental (BACKLINK_CACHE mtime-gated; scratch chat 16→17→16).
- **ENTITY.5 PASS (after fix)** — reach paths (palette→entity, tree Brain-overview→entity, mentions). FIRST PASS FAILED — Bug 2 (serious): tree detailHTML used `m.name` but the in-scope var is `m0`, so detailHTML threw ReferenceError on EVERY module expansion, emptying the tree (46→0) on any click. Fixed `m`→`m0`.

## Two bugs the gate caught (both mine, both fixed — commit 6d12962)

Bug 2 is the important one: my own smoke test deep-linked a module directly (which worked) rather than clicking a row (which threw) — the independent verifier's adversarial row-click exposed it. This is exactly why the gate uses an independent verifier that drives real interactions.

## Built (commits 0ecb735, 26cf2e4, cf2d0f6, 6d12962)

- **T1 /api/entity?module=<id>** — moduleDetail + cross-store aggregation (decisions, prompts, chunks+reports, linked todos, feedback, checklist), each with a source ref.
- **T2 /api/backlinks?ref=<>** — reference index over docs + chat messages + chunk reports; mtime-gated cache; orphan = zero inbound. /api/entities resolver for auto-linking.
- **T3 entity.html** — param-driven surface (#module=), 7 sections + source links + Referenced-by rail + orphan flag; registered in APP_SURFACES.
- **T4 auto-linking** — autoLinkEntities: module names in rendered bodies → .ent-chip → entity page (multi-match per text node, code/pre/anchors excluded).
- **T5 doc-window backlinks** — dwBacklinks appends a "Referenced by" strip to text/md doc windows.
- Reach paths: palette module result → entity page; tree "Brain overview ↗" link → entity page.

**Gate to PHASE 4: OPEN.**
