# Slack
> Source: https://docs.buildprint.ai/slack-integration-pzpo7 · Captured: 2026-07-14

The Slack integration lets team members interact with Buildprint's AI agent through Slack by mentioning @Buildprint in authorized channels or threads; the agent responds in the same thread using configured Bubble app context.

## Connect Slack

Workspace admins connect via **Integrations > Slack**:

1. Click Connect.
2. Authorize Buildprint in the Slack popup.
3. Confirm your Slack workspace appears as connected.

If Buildprint requires additional Slack permissions later, reconnect from the same page while preserving channel settings.

## Configure the agent

- **Run as**: the workspace admin whose permissions and connected AI providers apply
- **Workspace access**: which Slack channels can use Buildprint and available projects
- **Model**: a Buildprint, Claude, OpenAI, or Gemini model available to the run-as user
- **Reasoning**: None, Low, Medium, or High
- **Task permissions**: Plan mode is read-only; Build mode can edit when permissions allow

## Channel access modes

- **Per-channel permissions**: only configured channels can use Buildprint. Add each channel and select which projects it can access.
- **All public, custom private**: any public channel where the bot is invited can use Buildprint with all projects. Private channels require individual addition and configuration.
- **All channels, all projects**: any invited public or private channel can use Buildprint with all active workspace projects.

## Manage channels

For per-channel or custom private-channel permissions:

1. Invite Buildprint to the Slack channel using /invite @Buildprint.
2. In Buildprint, click Manage channels.
3. Add the channel.
4. Select all projects or specific projects for that channel.

Channels must be visible to the Buildprint Slack app before appearing in the picker.

## How Slack conversations work

When someone mentions @Buildprint:

1. Buildprint adds a working reaction during processing.
2. It reads the relevant Slack thread or nearby channel context.
3. It resolves project access from the channel configuration.
4. It starts or continues a Buildprint conversation.
5. It replies in the Slack thread.
6. The working reaction is removed after the response.

Follow-up mentions in the same Slack thread continue the existing Buildprint conversation.

## File attachments

Limits when attaching files with a mention:

- 30 MB per file
- 100 MB total per message

Files exceeding limits are skipped, though the text message can still be processed.

## Troubleshooting

**The bot does not respond**

- Invite it using /invite @Buildprint.
- Confirm the channel is authorized in Agent > Integrations > Slack.
- Confirm the channel has at least one project available.
- Confirm the run-as user has credentials for the selected model.

**The channel is not authorized**: ask a workspace admin to add the channel or change the Slack workspace access mode.

**There are no projects available**: add projects to the channel scope or create/connect a Buildprint project in the workspace.

**The bot can access too much**: switch workspace access from "All channels, all projects" to "Per-channel permissions" or "All public, custom private."
