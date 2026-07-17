# Monitors
> Source: `buildprint guidelines get monitors` · Captured: 2026-07-17 (verbatim)

Use monitors to detect conditions in a project's advanced logs (workload usage spikes, error rate spikes, user spikes, etc.).

## Notification delivery
- Webhook delivery is optional.
- Ask the user if they want a webhook URL and any headers included (for authentication), e.g. `Authorization: Bearer ...`.
- If no webhook is configured, Buildprint will email monitor notifications.
- Email notifications go to all project members (and workspace owner/admin).

Webhook delivery can be configured at creation time or later in the monitor management surface you are using.

## MCP tools to use
- `list_monitors`: inspect existing Buildprint-managed monitors before creating duplicates.
- `get_advanced_logs`: validate the APL pipeline against recent logs before creating or updating a monitor.
- `create_monitor`: create a monitor after the APL, monitor type, threshold/operator, timing, and notification delivery are clear.
- `update_monitor`: adjust an existing monitor's APL, threshold, schedule, enabled state, or delivery settings.
- `delete_monitor`: remove a monitor only when the user clearly wants it deleted.

## How to structure monitors

### Dataset scoping
- Provide only the APL pipeline (start with `|`).
- Buildprint injects the project's dataset name automatically.

### Pick monitor type by query shape (critical)
- `Threshold`: use for aggregated metrics. Include a `summarize` step (or equivalent aggregation) and set `operator` + `threshold`.
- `MatchEvent`: use for matching raw events. Do NOT aggregate (`summarize`, `count`, etc.).
- `AnomalyDetection`: use for baseline drift. Start from a stable aggregated metric query (similar to Threshold).

### Type-specific APL constraints (Axiom)
- MatchEvent queries cannot contain aggregations.
- MatchEvent queries only allow: `where`, `project` (including project-away/project-keep/project-rename/project-reorder), `extend` (including extend-valid), `union`, and `parse`.
- Threshold queries must contain aggregations.
- Threshold operator must be one of: `Above`, `AboveOrEqual`, `Below`, `BelowOrEqual`.
- Do not use `AboveOrBelow`.

### Designing "X for Y time"
Monitors run on an interval and evaluate a window each run.
Map "X for Y time" to these fields:
- rangeMinutes: lookback window per evaluation (Y).
- intervalMinutes: how often the monitor runs.
- triggerFromNRuns: require N consecutive positive runs before triggering.

Rule of thumb:
- intervalMinutes = 1-5
- rangeMinutes = 5-30 (depends on volume)
- triggerFromNRuns = 2-5

### Prefer aggregation-first APL for Threshold/Anomaly monitors
Most Threshold/Anomaly monitors should follow this structure:
1) filter to relevant rows
2) summarize into one metric
3) compare against a threshold

For Threshold monitors, prefer setting `operator` + `threshold` explicitly instead of relying only on `| where <metric> > <threshold>` in APL.

### Validate APL before create/update
- Run the same APL pipeline against recent advanced logs before creating or updating the monitor.
- If syntax fails, simplify first (`where`/`project`/`extend`), then re-add aggregations as needed.
- If a string helper fails (example: `endswith`), use a more broadly supported expression (example: `contains`) and re-test.

## Common fields (advanced logs)
Advanced logs are Bubble Jetstream logs ingested into Axiom. Commonly useful columns:
- _time (datetime): event timestamp
- tag_message: event category (ex: "action completed", "failed because of error")
- tag_fiber_id: correlation id for a workflow/API run (use for grouping)
- tag_current_user_id / tag_current_user_email: user identity when present
- display: human-readable line (often contains workflow/action names)
- workload_used_units: workload units for the event when present

## Example APL pipelines

### 1) Workload units spike (sum over window)
Goal: total workload_used_units over last 60 minutes exceeds 30,000.
```apl
| where isnotnull(workload_used_units) and workload_used_units > 0 and tag_message != 'event completed'
| summarize total_wu = sum(workload_used_units)
| where total_wu > 30000
```

### 2) Error rate exceeds 2% (error fibers / total fibers)
```apl
| extend is_error = tag_message in ("failed because of error", "error occurred during workflow execution")
| summarize
    total_fibers = dcount(tag_fiber_id),
    error_fibers = dcountif(tag_fiber_id, is_error)
| extend error_rate = todouble(error_fibers) / todouble(total_fibers)
| where total_fibers >= 50 and error_rate > 0.02
```

### 3) Unique users spike
```apl
| summarize users = dcount(tag_current_user_id)
| where users > 2000
```

### 4) Workflow failures (rough label from display)
```apl
| where tag_message in ("failed because of error", "error occurred during workflow execution")
| extend wf = tostring(split(tostring(display), " and ")[0])
| summarize failures = count() by wf
| where failures > 20
```

## Practical workflow
1) Ask what should trigger (metric + threshold + time window).
2) Choose monitor type based on query shape (Threshold vs MatchEvent) before drafting APL.
3) Validate APL against recent advanced logs before creating the monitor.
4) Ask if they want webhook delivery and, if so, the URL + headers.
5) Create the monitor and include a clear name + description for the UI.
6) Suggest sending a test notification after configuring delivery.
