# Monitors
> Source: https://docs.buildprint.ai/monitors-oknnr · Captured: 2026-07-14

Monitors set up automated alerts on your Bubble app's logs. When a log pattern matches a condition you define, Buildprint notifies you via webhook or email so you can respond quickly to errors, outages, or unusual behavior.

## Monitor types

- **Threshold** — triggers when a metric crosses a value you set (e.g. alert when error count exceeds 50 in a 5-minute window).
- **Match event** — triggers when specific log events are detected. Useful for catching particular error messages or workflow failures.
- **Anomaly detection** — triggers when log patterns deviate from normal behavior. Catches issues a static threshold might miss.

## Creating monitors

Monitors are created through the Buildprint AI agent — ask the agent to create a monitor in your chat conversation, and it configures the underlying alert rule.

Example requests:

- "Create a monitor that alerts when error rate exceeds 10% over 5 minutes"
- "Alert me when the checkout workflow fails"
- "Set up anomaly detection on workload units"

## Notification delivery

- **Webhook (primary)** — if you configure a webhook URL on the monitor, Buildprint sends a POST request to your endpoint with the event details. Custom headers can be set for authentication. Failed deliveries are retried automatically.
- **Email (fallback)** — if no webhook is configured, email notifications go to all project members and workspace admins. Emails are rate-limited to 3 per hour and 10 per day per monitor.

## Managing monitors

View and manage monitors from **Logs → Monitors**. Each monitor shows its current status with a green indicator when enabled.

From the actions menu on each monitor:

- **Send test notification** — verify webhook or email setup
- **Enable / Disable** — pause or resume without deleting
- **Edit forwarding** — update the webhook URL and custom headers
- **Delete** — permanently remove the monitor

## Viewing events

The monitors page also shows a history of triggered events, filterable by monitor to see when and how often each alert has fired.
