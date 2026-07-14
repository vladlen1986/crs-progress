# Project settings
> Source: https://docs.buildprint.ai/project-settings-h1nyt · Captured: 2026-07-14 (verbatim .md)

Project settings let you manage a project's identity, Bubble connection details, AI guidance, and project access.

## Open project settings

1. Open the project.
2. Use the project menu or project navigation to open Settings.

Workspace admins and project Admins can change project settings. Other project members may see settings in a read-only state.

## Settings sections

- General: update the project logo, name, URL slug, Bubble App ID, primary domain, run-mode credentials, collaborator permissions, and app summary. Once app ownership is verified, the Bubble App ID is locked to that project.
- Members: add existing workspace members, invite people by email, update project roles, remove collaborators, and view pending project invites.
- Style: add project-specific style preferences for naming, UI patterns, implementation constraints, or review standards. Buildprint includes this guidance when AI works on the project.

## Project roles

- Admin: can manage project settings, members, invitations, and Build mode.
- Member: can work in the project, use Build mode, chat, and see project members.
- Guest: can use Build mode and chat in this project without broader workspace access.
- Read-only: can read project context and participate in Plan-mode chat, but cannot use Build mode.

Workspace admins have implicit project Admin access.

## Danger Zone

Project settings includes two Danger Zone actions.

Move to another workspace transfers the project to a different workspace where you have access. You must be a workspace admin in the source workspace and at least a member in the destination workspace.

Disconnect Buildprint removes the Buildprint collaborator from the Bubble app. You can either keep the Buildprint project data for later reconnection or remove all Buildprint data for that project. Disconnecting does not delete or change the Bubble app itself.
