# Introduction to automations
> Source: https://docs.buildprint.ai/introduction-to-automations-m3d8h · Captured: 2026-07-14 (verbatim .md)

Automations run actions when something happens in your project.

Use automations to run tests after deploys, send notifications when branches change, post webhooks to external systems, or queue a repeatable workflow through the UI, REST API, or MCP.

## How automations work

Each automation has two parts:

- Trigger: the event that starts the automation.
- Actions: what Buildprint does when the trigger fires.

When a trigger fires, Buildprint executes the actions in order. If one action fails, Buildprint records the error and continues with the remaining actions.

## Triggers

Buildprint supports these trigger types:

- Manual / API: queued on demand from the UI, public REST API, or MCP.
- Live deployed: fires when a new version is deployed to live.
- Branch merged: fires when a branch is merged.
- Branch created: fires when a branch is created.
- Branch removed: fires when a branch is removed.
- Recurring: fires on a schedule.

## Actions

Buildprint supports these action types in the automation editor:

- Run tests: run all tests or selected tests and folders.
- Send message: send a templated message by email or Slack.
- Send webhook: POST a JSON payload to an HTTPS endpoint.
- Deploy agent: may appear as an early feature in some workspaces. Do not rely on it for production automations until Buildprint marks it available.

## The automations page

Open your project and select Automations in the sidebar.

The page shows:

- Name.
- Trigger.
- Actions.
- Created by.
- Last run.
- Enabled.

Manual / API automations can be queued from the row menu with Run now. Disabled automations keep their configuration but do not fire.
