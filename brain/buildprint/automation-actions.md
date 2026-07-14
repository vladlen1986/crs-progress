# Actions (automations)
> Source: https://docs.buildprint.ai/actions-5t46t · Captured: 2026-07-14

## Run tests

Initiates Buildprint test runs. Select "All tests: every active runnable test in the project" or "Choose: selected individual tests and test folders." Note: "Folders may include components for organization, but only runnable tests are started."

### Branch selection

Specifies which branch tests run against. Options depend on trigger type:

- **Branch event triggers** can use values from the event itself: Created branch, Removed branch, or Source/Target branch for merges
- **Manual / API and Recurring triggers** require you to select a specific project branch since no branch parameter is provided

## Send message

Delivers templated text messages to:

- Email addresses (comma-separated)
- Connected Slack channels

With branch-based triggers you can insert template parameters like `{{branch.id}}`, `{{branch.name}}` for created or removed branches, or `{{branchFrom.name}}`, `{{branchTo.name}}` for merges. "Manual / API, Live deployed, and Recurring triggers do not expose branch parameters." A **Send preview** feature lets you test the message before sending.

## Send webhook

Sends HTTPS POST requests with configurable:

- **URL** (must start with https://)
- **Headers** (optional key-value pairs)

The payload automatically includes Content-Type headers and contains event type, automation details, project information, trigger-specific parameters, and ISO 8601 timestamps.

## Deploy agent

Carries an early status notice: "Do not rely on it for production automations until Buildprint marks it available." Recommended alternatives: Manual/API automations, MCP, REST API, or standard Buildprint agent conversations.
