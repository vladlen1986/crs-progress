# Project and workspace permissions
> Source: https://docs.buildprint.ai/project-and-workspace-permissions-ek72b · Captured: 2026-07-14

Buildprint manages access through two distinct levels — workspace permissions and project permissions — with roles determining capabilities at each level.

## Workspace roles

- **Admin**: can manage workspace settings, members, billing, integrations, and all projects. "Workspace admins automatically have project Admin access to every project in the workspace."
- **Member**: can use the workspace directory and create projects. Members only interact with projects they've been assigned to.
- **Guest**: can access the workspace shell and specific projects explicitly shared with them. "Guests do not have workspace-wide directory access or project creation access." Guests work best for external collaborators. "Guests are not billable users."

One workspace admin serves as the **primary admin**, holding authority to transfer primary admin status and delete the workspace.

## Inviting and adding people

- Workspace admins can invite people as Admin or Member roles.
- Project admins can add existing workspace members to a project or send direct email invites granting Member, Guest, or Read-only access.
- Project-only invites automatically grant limited workspace Guest access upon acceptance.
- Admins can resend or revoke pending invites from the relevant member lists.

## Transferring primary admin responsibility

The primary admin can transfer primary admin status to another workspace Admin or Member. Non-admin recipients automatically become Admins upon acceptance.

"The primary admin cannot leave the workspace until responsibility has been transferred."

## Moving a project to another workspace

A source workspace admin can move a project to another workspace where they hold at least Member status: open the project's settings and select **Move to another workspace** in the Danger Zone.
