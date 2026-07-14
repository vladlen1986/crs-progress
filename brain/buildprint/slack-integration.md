# Slack
> Source: https://docs.buildprint.ai/slack-integration-pzpo7 · Captured: 2026-07-14 (verbatim .md)

The Slack integration lets your team interact with Buildprint's AI agent from Slack. Mention @Buildprint in an authorized channel or thread and the agent replies in the same thread with access to the configured Bubble app context.

## Connect Slack

Workspace admins can connect Slack from **Integrations > Slack**.

1. Click Connect.
2. Authorize Buildprint in the Slack popup.
3. Confirm that your Slack workspace appears as connected.

If Buildprint later needs new Slack permissions, reconnect Slack from the same page. Channel settings are preserved.

## Configure the agent

After connecting Slack, configure:

- Run as: the workspace admin whose permissions and connected AI providers are used.
- Workspace access: which Slack channels can use Buildprint and which projects are available.
- Model: a Buildprint, Claude, OpenAI, or Gemini model available to the run-as user.
- Reasoning: None, Low, Medium, or High.
- Task permissions: Plan mode is read-only. Build mode can edit when permissions allow it.

## Channel access modes

## Per-channel permissions

Only configured channels can use Buildprint. Add each channel and choose which projects it can access.

## All public, custom private

Any public channel where the bot is invited can use Buildprint with all projects. Private channels must be added and configured individually.

## All channels, all projects

Any invited public or private channel can use Buildprint with all active workspace projects.

## Manage channels

When using per-channel permissions or custom private-channel permissions:

1. Invite Buildprint to the Slack channel with /invite @Buildprint.
2. In Buildprint, click Manage channels.
3. Add the channel.
4. Choose all projects or selected projects for that channel.

Channels must be visible to the Buildprint Slack app before they appear in the picker.

## How Slack conversations work

When someone mentions @Buildprint:

1. Buildprint adds a working reaction while processing.
2. It reads the relevant Slack thread or nearby channel context.
3. It resolves project access from the channel configuration.
4. It starts or continues a Buildprint conversation.
5. It replies in the Slack thread.
6. The working reaction is removed after the response.

Follow-up mentions in the same Slack thread continue the same Buildprint conversation.

## File attachments

You can attach files when mentioning Buildprint.

Limits:

- 30 MB per file.
- 100 MB total per message.

Files over the limits are skipped, but the text message can still be processed.

## Troubleshooting

## The bot does not respond

- Invite it with /invite @Buildprint.
- Confirm the channel is authorized in Agent > Integrations > Slack.
- Confirm the channel has at least one project available.
- Confirm the run-as user has credentials for the selected model.

## The channel is not authorized

Ask a workspace admin to add the channel or change the Slack workspace access mode.

## There are no projects available

Add projects to the channel scope or create/connect a Buildprint project in the workspace.

## The bot can access too much

Change workspace access from All channels, all projects to Per-channel permissions or All public, custom private.
