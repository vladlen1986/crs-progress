# Creating automations
> Source: https://docs.buildprint.ai/creating-automations-aatyf · Captured: 2026-07-14

Navigate to your project's Automations tab and select **Create automation**.

The automation editor has three components: Name, Trigger, Actions.

## Name

Choose a descriptive identifier, e.g. "Run smoke tests on deploy" or "Notify Slack on branch merge."

## Choosing a trigger

Six trigger categories:

- **Manual / API**: activates only when initiated from the UI, public REST API, or MCP
- **Live deployed**: activates upon new version deployment to live
- **Branch merged**: activates when a branch merge occurs
- **Branch created**: activates when a branch is created
- **Branch removed**: activates when a branch is removed
- **Recurring**: activates on a schedule

Branch-based triggers make branch parameters available to actions. Manual / API, Live deployed, and Recurring triggers do NOT expose branch parameters.

## Recurring schedules

Preset options:

- Every hour
- Every day at 9am UTC
- Every Monday at 9am UTC
- Every Sunday at 9am UTC

For custom timing, select **Custom** and provide a cron expression. Alternatively, describe your preferred schedule in plain language and request cron expression generation.

## Adding actions

Each automation requires at least one action. Select **Add action** and choose from:

- Run tests
- Send message
- Send webhook
- Deploy agent

Actions execute sequentially. If an action encounters an error, Buildprint logs it and proceeds to subsequent actions.

**Deploy agent** may be marked as early feature in certain workspaces. Avoid using it for production automations until Buildprint indicates general availability.

## Editing an automation

Access the row menu and choose **Edit**. Modifications activate upon saving.

## Enabling and disabling

Toggle the **Enabled** switch in the automations table. Disabled automations retain settings without triggering. For scheduled automations, disabling cancels the schedule and enabling re-registers it.

## Deleting an automation

Select **Delete** from the row menu. Buildprint archives the automation, removes it from display, disables it, and cancels any scheduled runs.
