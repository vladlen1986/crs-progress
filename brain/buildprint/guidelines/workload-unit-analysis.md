# Workload unit analysis
> Source: `buildprint guidelines get workload/unit-analysis` · Captured: 2026-07-17 (verbatim)

Workload analysis is an operational topic, not something the branch workspace can answer by itself. Use this path to reason about WU findings once you have them from external Buildprint or Bubble tooling.

## Core model

- Workload units measure server work, not visual complexity.
- The biggest drivers are repeated searches, large result sets, writes, backend workflow runs, API calls, and trigger fan-out.
- A simple-looking UI can still be expensive if its expressions repeatedly hit the server.

## MCP tool to use

Use `get_workload_usage` when you need Buildprint's workload breakdowns. Pass `appId`, `start_date_in_iso_format`, `end_date_in_iso_format`, optional `tag1` / `tag2`, `granularity` (`day`, `hour`, or `minute`), `platformToggleValue` (`web`, `mobile`, or `web_and_mobile`), and `hasOnlyOneApp`. Keep the window at or below 30 days.

## How to investigate

1. Find the high-cost area in the operational workload view.
2. Map the reported page, workflow, or trigger back to the worktree using friendly names.
3. Inspect the relevant workflow, expressions, searches, and API connector calls in the filesystem.
4. Look for repetition, high-volume reads, repeated writes, and unnecessary backend scheduling.

## What the worktree is good for

- Explaining why a workflow is expensive after you know which workflow it is.
- Checking whether the same search or API call is duplicated across several actions.
- Confirming whether a page/reusable is wiring expensive logic into load-time or interval workflows.

## Reporting rule

- Never present raw internal IDs from workload tooling to the user.
- Resolve them to page, workflow, action, or trigger names from the worktree first.
