# Searching logs
> Source: `buildprint guidelines get logs/searching` · Captured: 2026-07-17 (verbatim)

Logs are not available from the branch workspace itself. Use this path when you need runtime evidence from Bubble server execution history.

## Decision rule

- Start with the worktree when the question is structural: pages, workflows, elements, expressions, API connector config, or schema.
- Escalate to logs when the question is runtime: what executed, how often it ran, who triggered it, where it failed, how long it took, or how much workload it used.
- Confirm current data state before blaming logs alone; stale or missing data often explains runtime behavior.

## MCP tools to use

Use the Buildprint MCP log tools; logs are not represented in the CLI branch workspace.

- `get_simple_logs`: use first for Bubble server-log investigation when you know the app, branch/database (`version`: `live`, `test`, or a branch/version id), and time window. Pass `after` and `before` as Unix timestamps in milliseconds. Add `current_user_email`, `fiber_id`, `contains`, `messages`, `ascending`, and `limit` only when they narrow the result.
- `get_advanced_logs`: use for APL queries over synced advanced logs. Pass `appId`, an APL pipeline that starts with `|`, and optional `startTime` / `endTime` as ISO timestamps or relative values like `-1h`. Do not include the dataset name; Buildprint injects it.
- `get_workload_usage`: use for workload-unit breakdowns rather than freeform log search. Fetch `workload/unit-analysis` before using it.

## Advanced-log mental model

Advanced logs are Bubble server logs ingested into Axiom and queried with APL. APL is a pipe-delimited query language. In direct Axiom syntax a query starts with a dataset, but Buildprint injects the project's dataset automatically.

Do this:
```apl
| where tag_message == 'action completed'
| summarize rows = count() by display
```

Do not do this in Buildprint MCP:
```apl
['dataset-name']
| where tag_message == 'action completed'
```

When a targeted query fails or you are unsure which fields exist, inspect the schema first:
```apl
| getschema
| project ColumnName, DataType
| order by ColumnName asc
```

## Common advanced-log fields

| Field | Meaning | Typical use |
|---|---|---|
| `_time` | Event timestamp | Time filtering and charts |
| `_sysTime` | Ingestion/system timestamp | Debug ingestion delay |
| `display` | Human-readable event/action/workflow label | Find workflow or action names |
| `tag_message` | Log event category | Filter completions, failures, API requests |
| `tag_fiber_id` | Correlation id for one workflow/API execution | Trace or deduplicate workflow runs |
| `tag_server_call_id` | Server-call correlation id | Trace browser-triggered server calls |
| `tag_task_id` | Scheduled task id | Trace scheduled workflows |
| `tag_current_user_email` | Current user's email when present | User-specific investigation |
| `tag_current_user_id` | Current user's id when present | Count or trace users |
| `tag_app_version` | Bubble version/branch label | Confirm live/test context |
| `tag_workflow_item` | Workflow/action reference | Disambiguate same-label actions |
| `action_time_lapsed` | Action duration in ms | Find slow actions |
| `workload_used_units` | Bubble workload consumed | Workload analysis |
| `thing_type` | Bubble data type involved when present | Filter Thing creates/changes |
| `thing_id` | Bubble Thing id when present | Trace one Thing |
| `situation` | Execution situation, such as scheduled or database trigger | Distinguish trigger type |
| `properties_json` | Serialized action properties | Parse deeper action details |
| `request_data_json` | Serialized request payload | Inspect API/request inputs |
| `log_data_json` | Serialized Bubble log data | Parse custom/log metadata |
| `elastic_id` | Internal per-ingest-row id (opaque, can repeat across re-ingested files) | Exact-row pointer / deep-link only, not a citation anchor |

Simple logs and advanced logs use different field shapes. Common mapping:

| Simple-log concept | Advanced-log field |
|---|---|
| `tags.message` | `tag_message` |
| `tags.fiber_id` | `tag_fiber_id` |
| `tags.current_user_email` | `tag_current_user_email` |
| `tags.current_user_id` | `tag_current_user_id` |
| `tags.server_call_id` | `tag_server_call_id` |
| `tags.task_id` | `tag_task_id` |
| `data.display` | `display` |
| `data.action_time_lapsed` | `action_time_lapsed` |
| `data.properties` | `properties_json` |
| `data.request_data` | `request_data_json` |
| `data.log_data` | `log_data_json` |
| `data.thing_type` | `thing_type` |
| `data.thing_id` | `thing_id` |

## Time windows

- Prefer tool-level absolute `startTime` / `endTime` ISO timestamps for reproducible investigations.
- Prefer APL relative filters such as `_time > ago(7d)` for reusable queries, monitors, and dashboards.
- Do not accidentally combine both unless you intend the intersection. Tool-level time windows and APL `_time` filters both apply.
- If relative tool values such as `startTime: "-7d"` fail or behave unexpectedly, use absolute ISO timestamps at the tool level or move the relative filter into APL.

## Default investigation flow

1. Start with `get_simple_logs` over a narrow window when you need direct server-log rows and already know the branch/database context.
2. Switch to `get_advanced_logs` when you need schema discovery, aggregation, grouping, deduplication, performance analysis, workload analysis, or reusable APL.
3. Begin broad but cheap: project only the fields you need and use `take`.
4. Summarize `tag_message` values to find the right event category.
5. Narrow by `display`, `tag_current_user_email`, `tag_fiber_id`, `tag_task_id`, `thing_id`, or other known context.
6. Map anything opaque back through `buildprint summary`, `buildprint tree`, or `buildprint context` before explaining it to the user.

Broad but cheap starting query:
```apl
| where _time > ago(24h)
| project _time, tag_message, display, tag_current_user_email, tag_fiber_id
| order by _time desc
| take 50
```

Find event categories:
```apl
| where _time > ago(24h)
| summarize rows = count() by tag_message
| order by rows desc
```

Common `tag_message` values include `running event`, `event condition passed`, `event completed`, `running action`, `action completed`, `received request for API workflow`, `failed because of error`, and `error occurred during workflow execution`.

## Query templates

Recent rows for a workflow or action label:
```apl
| where _time > ago(7d)
| where display contains 'Checkout'
| project _time, tag_message, display, tag_current_user_email, tag_fiber_id
| order by _time desc
| take 100
```

Trace one workflow/API execution:
```apl
| where tag_fiber_id == 'example-fiber-id'
| project _time, tag_message, display, action_time_lapsed, workload_used_units
| order by _time asc
```

Recent errors:
```apl
| where _time > ago(24h)
| where tag_message in ('failed because of error', 'error occurred during workflow execution')
| project _time, display, tag_current_user_email, tag_fiber_id
| order by _time desc
| take 100
```

Error count by workflow/action label:
```apl
| where _time > ago(7d)
| where tag_message in ('failed because of error', 'error occurred during workflow execution')
| summarize errors = count() by display
| order by errors desc
```

Slowest actions:
```apl
| where _time > ago(7d)
| where tag_message == 'action completed'
| where isnotnull(action_time_lapsed)
| summarize runs = count(), avg_ms = avg(action_time_lapsed), p95_ms = percentile(action_time_lapsed, 95), max_ms = max(action_time_lapsed) by display
| order by p95_ms desc
| take 20
```

Top workload-consuming actions:
```apl
| where _time > ago(7d)
| where isnotnull(workload_used_units)
| where workload_used_units > 0
| summarize total_workload = sum(workload_used_units), rows = count() by display
| order by total_workload desc
| take 20
```

Distinct active users by day:
```apl
| where _time > ago(30d)
| where isnotnull(tag_current_user_id)
| summarize active_users = dcount(tag_current_user_id) by bin(_time, 1d)
| order by _time asc
```

Scheduled API workflow requests:
```apl
| where _time > ago(7d)
| where tag_message == 'received request for API workflow'
| project _time, display, tag_task_id, tag_fiber_id, tag_current_user_email
| order by _time desc
| take 100
```

Count records created by a `Create a new Thing` action:
```apl
| where _time > ago(7d)
| where tag_message == 'action completed'
| where display == 'Create a new Example Thing...'
| distinct tag_fiber_id
| count
```

Parse action properties when flattened fields are not enough:
```apl
| where _time > ago(7d)
| where tag_message == 'action completed'
| extend props = parse_json(properties_json)
| project _time, display, thing_type, props
| take 20
```

## Counting and deduplication

- Logs are rows, not always business events. One Bubble workflow run can produce many rows.
- Use `tag_fiber_id` to deduplicate workflow/API runs.
- Use `tag_task_id` to deduplicate scheduled tasks.
- Use `thing_id` to deduplicate specific Things when populated.
- Do not deduplicate by `elastic_id`: it identifies an ingest row, not an event, and can repeat across re-ingested files. Use `tag_fiber_id` / `tag_task_id` instead.
- Use `distinct <field> | count` when you need an exact count and the result set is manageable.
- Use `dcount(<field>)` for high-volume approximate counts.

## Citing specific logs

Anchor every log citation on `_time` (to the millisecond) plus `tag_fiber_id`:

- `tag_fiber_id` is present on every row, identifies one workflow/API execution, and stays stable across re-syncs — it is the durable handle.
- `_time` pins the exact row within that execution; add `tag_message` and `display` so the citation reads clearly.
- For scheduled tasks anchor on `tag_task_id`; for browser-triggered server calls use `tag_server_call_id`.
- `elastic_id` is an opaque internal ingest id and can repeat across re-ingested files. Reference it only as a precise exact-row pointer, copied verbatim from tool output — never as the primary citation, and never invent one.

Re-query a cited execution:
```apl
| where tag_fiber_id == 'example-fiber-id'
| where _time == datetime('2026-01-01T00:00:00.000Z')
| order by _time asc
```

## APL watch-outs

- Field names are case-sensitive.
- Advanced logs are generally flattened. Simple-log paths such as `data.properties.thing_type` usually fail. Use flattened fields such as `thing_type`, or parse JSON fields with `parse_json()`.
- If a field contains a space, dot, or dash, quote it with bracket notation such as `['field.with.dot']`.
- `display` is human-readable and not guaranteed unique. If precision matters, group by `display` and `tag_workflow_item`, then map the result back to the Bubble workflow/action.
- Some scheduled workflows, database triggers, and backend actions have no current user. Do not assume `tag_current_user_email` is present.
- `where * has 'text'` is expensive. Use it only for discovery, then replace it with targeted field filters such as `display contains 'text'`.
- Use `project` early while inspecting so returned rows stay readable.
- Check returned metadata for range adjustment, license limits, partial results, or unavailable synced periods.
- Cite specific log rows by `_time` + `tag_fiber_id` (see "Citing specific logs"); include a verbatim `elastic_id` only as an exact-row pointer, never an invented one.

## Monitor-specific APL

- Match-event monitors should use raw-event filters only. Do not aggregate.
- Threshold monitors should aggregate into one or more metrics.
- Anomaly monitors should aggregate into a stable metric over time.

Match-event example:
```apl
| where tag_message in ('failed because of error', 'error occurred during workflow execution')
| where display contains 'Checkout'
| project _time, display, tag_fiber_id, tag_current_user_email
```

Threshold example:
```apl
| where tag_message in ('failed because of error', 'error occurred during workflow execution')
| summarize failed_runs = dcount(tag_fiber_id)
```

## Practical guidance

- Keep time windows narrow first, then widen only if necessary.
- Isolate one failing request or workflow execution before searching broadly.
- Prefer correlation IDs, workflow names, and user/session context over text-only searching.
- Translate any internal IDs you find back to friendly names before presenting conclusions.

## Pair logs with the worktree

- Use the worktree to map workflow IDs, page surfaces, action order, and API connector calls to readable names.
- Use logs to confirm which path actually executed and where it failed.
- Do not infer workflow ownership or intent from logs alone when the filesystem model can answer it directly.
