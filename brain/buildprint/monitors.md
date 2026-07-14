# Monitors
> Source: https://docs.buildprint.ai/monitors-oknnr · Captured: 2026-07-14 (verbatim .md)

Monitors let you set up automated alerts on your Bubble app's logs. When a log pattern matches a condition you define, Buildprint notifies you via webhook or email so you can respond quickly to errors, outages, or unusual behavior.

## Monitor types

Buildprint supports three types of monitors:

- **Threshold** — Triggers when a metric crosses a value you set. For example, alert when error count exceeds 50 in a 5-minute window.
- **Match event** — Triggers when specific log events are detected. Useful for catching particular error messages or workflow failures.
- **Anomaly detection** — Triggers when log patterns deviate from normal behavior. Catches issues that a static threshold might miss.

## Creating monitors

Monitors are created through the Buildprint AI agent. Ask the agent to create a monitor in your chat conversation, and it will configure the underlying alert rule for you.

Example requests:

- "Create a monitor that alerts when error rate exceeds 10% over 5 minutes"
- "Alert me when the checkout workflow fails"
- "Set up anomaly detection on workload units"

## Notification delivery

When a monitor triggers, Buildprint delivers notifications through one of two channels:

**Webhook (primary)** — If you configure a webhook URL on the monitor, Buildprint sends a POST request to your endpoint with the event details. You can also set custom headers for authentication. Failed deliveries are retried automatically.

**Email (fallback)** — If no webhook is configured, email notifications are sent to all project members and workspace admins. Emails are rate-limited to 3 per hour and 10 per day per monitor to avoid flooding your inbox.

## Managing monitors

View and manage your monitors from **Logs → Monitors**. Each monitor shows its current status with a green indicator when enabled.

From the actions menu on each monitor, you can:

- **Send test notification** — Verify your webhook or email setup is working.
- **Enable / Disable** — Pause or resume a monitor without deleting it.
- **Edit forwarding** — Update the webhook URL and custom headers.
- **Delete** — Permanently remove the monitor.

## Viewing events

The monitors page also shows a history of triggered events. You can filter events by monitor to see when and how often each alert has fired.
