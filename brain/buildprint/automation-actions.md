# Actions (automations)
> Source: https://docs.buildprint.ai/actions-5t46t · Captured: 2026-07-14 (verbatim .md)

## Run tests

The Run tests action starts Buildprint test runs.

Choose either:

- All tests: every active runnable test in the project.
- Choose: selected individual tests and test folders.

Folders may include components for organization, but only runnable tests are started.

## Branch selection

Choose which branch the tests should run against.

Branch event triggers can use values from the event:

- Branch created: Created branch.
- Branch removed: Removed branch.
- Branch merged: Source branch or Target branch.

You can also choose a specific project branch.

Manual / API and Recurring triggers do not provide a branch parameter, so choose a project branch.

## Send message

The Send message action sends a templated text message.

Destinations:

- Email: one or more comma-separated email addresses.
- Slack: a Slack channel connected to the workspace.

Branch-based triggers can insert template parameters into the message.

Available parameters:

- Branch merged: {{branchFrom.id}}, {{branchFrom.name}}, {{branchTo.id}}, {{branchTo.name}}
- Branch created: {{branch.id}}, {{branch.name}}
- Branch removed: {{branch.id}}, {{branch.name}}

Manual / API, Live deployed, and Recurring triggers do not expose branch parameters.

Use Send preview to send a preview message.

## Send webhook

The Send webhook action sends an HTTPS POST request.

Configure:

- URL: must start with https://.
- Headers: optional key-value headers.

Buildprint automatically includes Content-Type: application/json.

The payload includes:

- event: trigger kind.
- automation: automation ID and name.
- project: project ID and app name.
- params: trigger-specific parameters.
- timestamp: ISO 8601 timestamp.

Use Send test request to send the preview payload to the configured URL.

## Deploy agent

Deploy agent may appear as an early feature in some workspaces. Do not rely on it for production automations until Buildprint marks it available.

For now, use Manual / API automations, MCP, REST API, or a normal Buildprint agent conversation when you need to start agent work.
