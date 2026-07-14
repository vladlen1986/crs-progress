# Creating automations
> Source: https://docs.buildprint.ai/creating-automations-aatyf · Captured: 2026-07-14 (verbatim .md)

Open your project's Automations tab and click Create automation.

The editor has three parts:

- Name.
- Trigger.
- Actions.

## Name

Use a descriptive name, such as Run smoke tests on deploy or Notify Slack on branch merge.

## Choosing a trigger

Buildprint supports six trigger types:

- Manual / API: runs only when queued on demand from the UI, public REST API, or MCP.
- Live deployed: fires when a new version is deployed to live.
- Branch merged: fires when a branch is merged.
- Branch created: fires when a branch is created.
- Branch removed: fires when a branch is removed.
- Recurring: fires on a schedule.

Branch-based triggers expose branch parameters that actions can use.

Manual / API, Live deployed, and Recurring triggers do not expose branch parameters.

## Recurring schedules

Recurring automations include presets:

- Every hour.
- Every day at 9am UTC.
- Every Monday at 9am UTC.
- Every Sunday at 9am UTC.

For a custom schedule, choose Custom and enter a cron expression. You can also describe the schedule in plain language and ask Buildprint to generate the cron expression.

## Adding actions

Each automation needs at least one action.

Click Add action and choose:

- Run tests.
- Send message.
- Send webhook.
- Deploy agent.

Actions run in the order shown. If one action fails, Buildprint records the error and continues with later actions.

Deploy agent may appear as an early feature in some workspaces. Do not rely on it for production automations until Buildprint marks it available.

## Editing an automation

Open the row menu and select Edit. Changes take effect after saving.

## Enabling and disabling

Use the Enabled toggle in the automations table.

Disabled automations keep their configuration but will not fire. For recurring automations, disabling removes the scheduled run and enabling registers it again.

## Deleting an automation

Use Delete from the row menu.

Buildprint archives the automation, hides it from the list, disables it, and removes any recurring schedule.
