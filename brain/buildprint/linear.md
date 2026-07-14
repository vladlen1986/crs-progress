# Linear
> Source: https://docs.buildprint.ai/linear-ovk9x · Captured: 2026-07-14

The Linear integration lets you invoke the Buildprint agent directly from Linear issues by mentioning @Buildprint or assigning issues to it. You can also attach Linear issues within Buildprint chat conversations.

## Connect Linear

Workspace admins connect via **Integrations > Linear**:

1. Click Connect
2. Authorize Buildprint in the Linear popup
3. Verify your Linear organization displays in Buildprint

To disconnect, use the menu adjacent to the organization name.

## Team scope configuration

After connecting, map Linear teams to Buildprint projects. This controls which Bubble apps the Linear agent can access when handling requests from specific Linear teams. Teams without mapped projects trigger an error when invoking Buildprint.

## Agent settings

Configurable options on the Linear integration page:

- **Run as**: workspace admin whose permissions and AI provider connections are applied
- **Model**: Buildprint, Claude, OpenAI, or Gemini model accessible to the run-as user
- **Reasoning**: None, Low, Medium, or High
- **Task permissions**: Plan mode provides read-only access; Build mode allows editing when project and branch permissions permit
- **Auto-sync issue branches**: applies destination branch labels following successful Bubble branch merges or deployments

## Invocation methods

- **Mention**: tag @Buildprint in a comment
- **Assignment**: assign the issue to Buildprint

The agent processes issue context and initiates or resumes a Linear session; responses appear as agent activity in the issue.

## Attaching issues to Buildprint chat

Use the command menu in the Buildprint chat composer to link Linear issues. Buildprint incorporates issue titles, descriptions, comments, related issues, and supported file attachments as context.

File attachment constraints:

- Maximum 8 files
- 10 MB per file limit
- 30 MB total limit

## Branch tracking

Apply a Linear label matching the Bubble branch name to enable tracking (example: label `acme-103` for a branch named acme-103).

When Auto-sync is active, Buildprint identifies issues with source branch labels and adds destination branch labels following successful merges or deployments:

- Merging acme-103 into test → adds `test` label
- Deploying test to live → adds `live` label

The system can generate missing labels. If creation fails, Buildprint comments requesting manual label creation. Labels remain following reversions; use new branches with corresponding labels for subsequent updates.
