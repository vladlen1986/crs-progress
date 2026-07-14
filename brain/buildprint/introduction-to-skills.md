# Introduction to skills
> Source: https://docs.buildprint.ai/introduction-to-skills-mq7pq · Captured: 2026-07-14

Skills are reusable instructions designed for Buildprint agents. They prove valuable when an agent needs to repeatedly follow the same process or checklist, such as testing modifications, examining privacy rules, creating documentation, or adhering to established team conventions.

## How skills work

A skill accompanies an agent message, providing the agent with additional context for that particular interaction. To add a skill, type `/` or `@` in the chat composer to access the command menu and select the desired skill. Selected skills appear as Buildprint skill chips within the message.

## Skill scopes

Buildprint organizes skills across three different scopes:

- **Official skills** — Managed by Buildprint and automatically available
- **Workspace skills** — Accessible throughout the workspace
- **Project skills** — Available only when their owning project is selected

## When to create a skill

Develop a skill when you find yourself repeating identical instructions frequently. Consider creating skills for scenarios like:

- Testing modifications in run mode
- Reviewing branches for privacy rule risks
- Creating documentation of changes for team members
- Ensuring compliance with your team's page layout conventions

## Keep skills safe

Never include the following in skills: secrets, credentials, API keys, cookies, private tokens, or sensitive customer information.
