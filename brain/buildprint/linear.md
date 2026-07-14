# Linear
> Source: https://docs.buildprint.ai/linear-ovk9x · Captured: 2026-07-14 (verbatim .md)

Connect Buildprint to Linear to use the Buildprint agent from Linear issues. Mention @Buildprint in an issue comment or assign an issue to Buildprint to start an agent session with your Bubble app context.

You can also attach Linear issues to Buildprint chat conversations.

## Connect Linear

Workspace admins can connect Linear from **Integrations > Linear**.

1. Click Connect.
2. Authorize Buildprint in the Linear popup.
3. Confirm that your Linear organization appears in Buildprint.

To disconnect, use the menu next to the connected organization.

## Configure team scope

After connecting, map Linear teams to Buildprint projects.

Team scope controls which Bubble apps the Linear agent can access when responding to an issue from each Linear team.

If a team has no mapped projects, Buildprint will return an error when invoked from that team.

## Agent settings

Configure Linear agent behavior from the Linear integration page:

- Run as: the workspace admin whose permissions and connected AI providers are used.
- Model: a Buildprint, Claude, OpenAI, or Gemini model available to the run-as user.
- Reasoning: None, Low, Medium, or High.
- Task permissions: Plan mode is read-only. Build mode can edit when the project and branch permissions allow it.
- Auto-sync issue branches: add destination branch labels after successful Bubble branch merges or deploys.

## Use @Buildprint in Linear

You can invoke Buildprint in two ways:

- Mention: tag @Buildprint in an issue comment.
- Assignment: assign the issue to Buildprint.

Buildprint reads the issue context and starts or continues a Linear agent session. Responses appear in the Linear issue as agent activity.

Follow-up messages in the same Linear session keep the conversation context.

## Attach Linear issues to Buildprint chat

In the Buildprint chat composer, open the command menu and link a Linear issue. Buildprint attaches the issue title, description, comments, related issues, and supported Linear file attachments as context.

File attachment limits for Linear issue attachments are:

- Up to 8 files.
- Up to 10 MB per file.
- Up to 30 MB total.

## Branch tracking

Buildprint can track Bubble branch progress in Linear with labels.

Use a Linear label that matches the Bubble branch name. For example, if work happens on a Bubble branch named acme-103, add the acme-103 label to the Linear issue.

When Auto-sync issue branches is enabled, Buildprint finds issues labeled with the source branch and adds the destination branch label after a successful merge or deploy.

Examples:

- If acme-103 is merged into test, Buildprint adds the test label.
- If test is deployed to live, Buildprint adds the live label.

Buildprint can create missing destination labels. If label creation fails, Buildprint comments on the issue and asks you to create the label manually.

Buildprint does not remove labels after later reversions or follow-up changes. For updates, create a new branch and label the same issue with the new branch name.
