# Exploring logs
> Source: https://docs.buildprint.ai/exploring-logs-pmfs1 · Captured: 2026-07-14 (verbatim .md)

The log explorer lets you search, filter, and drill into your Bubble app's server logs. Use it to debug errors, trace workflow execution, or understand usage patterns.

## Accessing the explorer

Navigate to your project, then open Logs > Explorer. The Explorer tab is available after logs are enabled for the project.

The explorer shows a volume histogram at the top and a paginated log table below. The current Explorer view is for live logs.

## Filtering logs

Narrow down results using the filter bar at the top of the explorer:

- Time range: choose 1 hour, 3 hours, 6 hours, 12 hours, 24 hours, 48 hours, 7 days, 14 days, 30 days, or set a custom range.
- Log type: filter by Bubble server log message type.
- Search text: search the displayed log message text.
- User emails: filter logs by the user who triggered the action.
- Thing IDs: filter by Bubble thing IDs found directly on a log entry or inside related log data.

Filters are synced to the URL, so you can bookmark or share filtered views with teammates.

## Volume histogram

The bar chart at the top shows log volume over your selected time range. Click a bar to zoom into that time window.

## Log detail view

Click any log entry in the table to open its detail view. The detail panel can show:

- Full log content and metadata.
- Timestamp and log type.
- User fields when present.
- Workload and latency fields when present.
- Related data such as properties, request data, and unique IDs when present.
- Trace information for the same Bubble fiber.

## Using the View tab

Logs > View provides time-series charts for:

- Workload units.
- Median action time.
- Unique users.
- Workflows ran.
- Errors.
- Error rate.

Select a time range from 1 hour to 30 days. Use Live - 1 hour mode for charts that refresh every minute.
