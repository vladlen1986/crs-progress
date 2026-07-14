# Permissions and data safety
> Source: https://docs.buildprint.ai/permissions-and-data-safety-gld0g · Captured: 2026-07-14

Buildprint uses layered permissions. A user needs permission in Buildprint, and the connected Bubble collaborator also needs permission in Bubble.

If either layer blocks an action, Buildprint cannot apply the change.

## How permissions are layered

- Buildprint permissions control what a user can do inside Buildprint.
- Bubble collaborator permissions control what Buildprint can actually do inside your Bubble app.
- Branch access controls which Bubble branches an agent can inspect or edit.

This means a user may be able to open a project in Buildprint but still be unable to edit a Bubble branch. Also, Buildprint cannot bypass the permissions granted to `connect@getbuildprints.com` in Bubble.

## Buildprint roles

Buildprint has workspace-level and project-level access. Project roles:

| Role | What it allows |
| --- | --- |
| Admin | Manage project settings, access, and invites. |
| Member | Work inside the project and use Build mode. |
| Guest | Use chat and Build mode in a specific project without workspace-wide access; appropriate for external team members like freelancers. |
| Read-only | Read project context and use Plan-mode chat. |

## Plan mode

Plan mode lets an agent inspect permitted app context without applying edits.

Depending on the project setup and permissions, the agent may read:

- Synced app structure
- Pages, reusable elements, workflows, data types, option sets, styles, settings, and branches
- Logs when log access is enabled
- Read-only database data when requested
- Buildprint project context, reviews, tests, automations, and version history

Plan mode is appropriate for:

- Understanding how the app works
- Debugging issues
- Asking for an implementation plan
- Reviewing risks before making changes
- Investigating logs or database records without changing the app

Plan mode cannot apply Bubble app edits.

## Build mode

Build mode lets an agent edit Bubble app structure on permitted branches.

For a Build mode edit to apply:

- The user must have Build permission for the project
- The conversation must allow edits
- The selected branch must be permitted for that conversation
- The Buildprint collaborator in Bubble must have the needed edit permissions

If the branch is read-only, Buildprint will block the edit.

If editing is enabled but the target branch is unclear, the agent will generally ask which branch should receive the change.

Build mode can change app structure such as pages, reusable elements, workflows, data types, option sets, styles, settings, and supported API Connector configuration. Build mode cannot edit Bubble database Things.

## External agents and MCP tokens

External AI clients can use Buildprint through scoped MCP or API access.

Those requests can be read-only or edit-enabled. They can also be restricted to specific branches.

For external agent runs, edit access is not assumed. The request must explicitly allow edits, and the same Buildprint, branch, and Bubble collaborator checks still apply.

## Buildprint CLI

In the Buildprint CLI, permissions are scoped to the projects selected when the CLI token is created. However, this will not programmatically restrict to certain branches or projects. When you use the CLI, it is your responsibility to ensure changes are applied to the right place.

## Bubble collaborator permissions

Buildprint connects to Bubble through the collaborator account `connect@getbuildprints.com`.

The collaborator needs the right Bubble permissions for the work you want Buildprint to do. For example:

- App access is needed to inspect app structure
- Data access is needed for read-only database investigation
- Logs access is needed for log debugging
- Versions access is needed for branch and version workflows
- Edit access is needed before Build mode can apply app changes

If a permission check fails, update the collaborator permissions in Bubble and check again in Buildprint.

## Branch safety

Agents work against a selected Bubble branch.

Use a development branch for implementation work whenever possible. Avoid editing live unless you understand the risk and have a rollback plan.

Before Build mode work, create a Bubble savepoint. In addition, Buildprint fully integrates with Bubble's version control.

## Database data

Buildprint database tools are read-only.

Agents can search, fetch, and aggregate Bubble database records when needed, but those tools cannot create, modify, or delete Things.

Treat database results as sensitive. They may include user data, operational data, or records protected by your Bubble privacy rules, as **Buildprint database access bypasses privacy rules using editor access**.

## Logs

Buildprint can inspect Bubble server logs when log access is enabled.

Logs may contain user emails, workflow details, error messages, IDs, or other sensitive debugging context.

## Synced app snapshots

When you sync a branch, Buildprint stores a point-in-time snapshot of that branch's app structure.

Agents use synced snapshots to understand your app. If someone changes the app directly in Bubble after the last sync, the agent may be working from stale context until the branch is synced again.

Sync before asking an agent to continue work that depends on recent Bubble editor changes.

## Secrets

Buildprint sanitizes synced Bubble exports before storing normal app snapshots.

Private API Connector values and plugin secrets are not visible to agents and not stored by Buildprint.

Do not paste secrets into:

- Chat messages
- Skill instructions
- Review comments
- Linear issues used to trigger agents
- Slack messages used to trigger agents
- Files you ask an agent to edit

If a secret may have been exposed, rotate it in the original provider.

## Model providers

When an agent runs, Buildprint sends the prompt and relevant working context to the selected model provider.

That provider may be a connected OpenAI/ChatGPT, Claude, Gemini, or OpenRouter account, or a Buildprint-managed model when available for your workspace.

Provider behavior, retention, and legal terms can change. Use the Buildprint terms and the provider's own terms as the current source for compliance decisions.

## User responsibility

Agents can make mistakes.

Do not grant Build access to users who should only inspect the app. Review important changes, and work on feature branches.

Use extra review for changes involving privacy rules, data types, backend workflows, payments, authentication, API Connector calls, production branches, or user data.
