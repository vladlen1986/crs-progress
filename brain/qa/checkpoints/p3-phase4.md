# Checkpoint — BRAIN PROGRAM 3, PHASE 4 (cost & usage intelligence) — COMPLETE 2026-07-18

## Gate proof (independent verifier — PASS 4/4)

- **COST.1** per-run capture: gen + chat both logged with {ts,purpose,model,in,out,ms,costUsd,estimated}; touchpoints tagged gen/wishlist/digest/issue/memory/chat/bp-chat/ingest/sync/queue; verification-subagent gap (external claude procs) stated in the note.
- **COST.2** reconciliation: independent jsonl sum == /api/usage-analytics totals exactly; byPurpose sum == byModel sum == total; cost-from-tokens recomputed for two rows and matched; cost.html renders (estimated badge, 6 tiles, svg trend chart, both tables), both themes, zero console.
- **COST.3** routing suggestion: gen ran on Opus → route to Sonnet, cross-checked (routeModel wired to 1 site only; gen passes cfg.model directly). Report-only.
- **COST.4** cost-per-outcome (0/16 verified chunks → "—", honest) + 5h/7d window tiles from usage.json; limitation stated. Both themes.

## Built (commits 9754b9c, c916e94)

- **T1 capture:** MODEL_RATES table + estCostUsd + logUsage → data/usage-log.jsonl; runClaudeStream logs on close when opts.purpose set (one point, all model calls pass through it); call sites tagged by purpose.
- **T2 analytics:** /api/usage-analytics (byDay/byPurpose/byModel, cost-per-verified-chunk, 5h/7d windows, routingAudit, rates, honesty note) + cost.html surface (§20.4 tiles + SVG token trend chart + by-purpose/model tables + routing flags), registered in APP_SURFACES + Tools row.
- **T3 routing audit:** flags Opus-on-mechanical-purpose runs with a concrete cheaper target, keyed on the routing policy's own mechanical classification (not token size), report-only.

## Honest limitations (stated on the surface)

Cost is ESTIMATED (tokens × published rates) — the CLI's account cost isn't per-run-attributable. Verification-subagent tokens run in external claude processes the server can't meter.

**Gate to PHASE 5: OPEN.**
