# Project and workspace permissions
> Source: https://docs.buildprint.ai/project-and-workspace-permissions-ek72b · Captured: 2026-07-14 (verbatim .md)

Buildprint controls access at two levels: workspace access and project access. Workspace roles decide what someone can do across the workspace. Project roles decide what they can do inside a specific Bubble app project.

## Workspace roles

- Admin: can manage workspace settings, members, billing, integrations, and all projects. Workspace admins automatically have project Admin access to every project in the workspace.
- Member: can use the workspace directory and create projects. Members only see and work on projects they have been added to.
- Guest: can access the workspace shell and only the projects explicitly shared with them. Guests do not have workspace-wide directory access or project creation access. Guests should be used for all external users that do not work directly with your company (e.g clients, if you are using Buildprint as an agency). **Guests are not billable users.**

One workspace admin is the primary admin. The primary admin can transfer primary admin responsibility and delete the workspace.

Workspace admins always receive implicit project Admin access.

## Inviting and adding people

Workspace admins can invite people to the workspace as Admin or Member.

Project admins can add existing workspace members to a project or invite someone by email directly to that project. Project email invites can grant Member, Guest, or Read-only access. When someone accepts a project-only invite, Buildprint also gives them limited workspace Guest access so they can open that project.

Pending invites can be resent or revoked from the workspace or project member lists, depending on where the invite was created.

## Transferring primary admin responsibility

The primary admin can transfer primary admin responsibility to another workspace Admin or Member. The recipient becomes an Admin if they are not already one.

The primary admin cannot leave the workspace until responsibility has been transferred.

## Moving a project to another workspace

A source workspace admin can move a project to another workspace where they are at least a Member. Open the project's settings and use Move to another workspace in the Danger Zone.
