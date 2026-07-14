# Exploring logs
> Source: https://docs.buildprint.ai/exploring-logs-pmfs1 · Captured: 2026-07-14

The log explorer lets you "search, filter, and drill into your Bubble app's server logs" for debugging and analysis.

## Accessing the explorer

Navigate to your project and select Logs > Explorer (tab appears once logging is enabled). The interface shows a volume histogram followed by a paginated table of log entries, displaying current live logs.

## Filtering logs

The filter bar offers:

- **Time range**: presets from 1 hour to 30 days, plus custom ranges
- **Log type**: filter by Bubble server message categories
- **Search text**: query the log message content
- **User emails**: restrict to specific users
- **Thing IDs**: filter by Bubble thing identifiers

"Filters are synced to the URL, so you can bookmark or share filtered views with teammates."

## Volume histogram

A bar chart displays log volume across the selected timeframe. Clicking a bar zooms into that specific window.

## Log detail view

Selecting a log entry opens a detail panel with full content, metadata, timestamps, user information, workload/latency data, related properties, and trace information for the same Bubble fiber.

## Using the View tab

"Logs > View provides time-series charts for" workload units, median action time, unique users, workflows executed, errors, and error rates. Time ranges span 1 hour to 30 days, with a live refresh mode available.
