# Introduction to automations
> Source: https://docs.buildprint.ai/introduction-to-automations-m3d8h · Captured: 2026-07-14

Automations execute actions when specific events occur within your project.

Use automations to execute tests following deployments, alert teams when branches are modified, send webhooks to third-party systems, or initiate repeatable workflows through the UI, REST API, or MCP.

## How automations work

Each automation has two components:

- **Trigger**: the event that initiates the automation.
- **Actions**: the operations Buildprint performs when the trigger activates.

When a trigger activates, Buildprint runs the actions sequentially. If an action encounters an error, Buildprint logs it and proceeds with subsequent actions.

## Triggers

- **Manual / API**: initiated on demand via the UI, public REST API, or MCP.
- **Live deployed**: activates when a new version deploys to live.
- **Branch merged**: activates when a branch merges.
- **Branch created**: activates when a branch is created.
- **Branch removed**: activates when a branch is removed.
- **Recurring**: activates according to a schedule.

## Actions

Available in the automation editor:

- **Run tests**: execute all tests or specific tests and folders.
- **Send message**: deliver a templated message via email or Slack.
- **Send webhook**: POST a JSON payload to an HTTPS endpoint.
- **Deploy agent**: may appear as an early feature in certain workspaces. Do not use for production automations until Buildprint marks it available.

## The automations page

Navigate to your project and choose Automations from the sidebar. The page displays columns:

- Name
- Trigger
- Actions
- Created by
- Last run
- Enabled

Manual / API automations can be triggered from the row menu using **Run now**. Disabled automations retain their configuration but do not activate.
