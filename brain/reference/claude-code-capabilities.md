---
name: claude-code-capabilities
description: What Claude Code (the agent behind CRS Brain) can actually do — tools, skills, and the app's spawn sandbox. Consult before assuming a capability exists.
metadata:
  type: reference
  updated: 2026-07-16
---

# Claude Code — tools, capabilities & skills

The CRS Brain app drives Claude via the headless `claude` CLI on the Max
subscription (never API keys). This is the reference for **what that agent can
do**, so prompts and features don't assume capabilities it lacks — or miss ones
it has. Wishlist item: `w-anr0tw`.

## 1. What the Brain's spawned agent is allowed to do

`runClaudeStream()` spawns `claude -p` with a **deliberately narrow** tool
allow-list (see `server.js`, `--allowedTools`). The agent can:

| Capability | Tool | Used for |
|---|---|---|
| Read the live web | `WebFetch`, `WebSearch` | Bubble release-notes/forum watcher, research |
| Bubble schema/workflow edits | `Bash(buildprint:*)`, `mcp__buildprint` | TEST-branch Buildprint loop (sync→apply→check) |
| Visual/interactive checks | `Bash(agent-browser:*)` | screenshots, run-mode verification |
| Local scripting | `Bash(node:*)`, `Bash(python:*/python3:*)` | data transforms, one-off scripts |

A **PreToolUse guard** (`bp-guard.js`, wired via `--settings BP_GUARD_SETTINGS`)
hard-blocks dangerous Buildprint commands (`--force-apply`, `--no-check`,
`sync --reset`, live-branch writes). Permission mode is `acceptEdits`. Anything
NOT on the allow-list (arbitrary shell, git push, file deletes) is unavailable to
the spawned agent by design — keep prompts within this sandbox.

## 2. Full Claude Code tool surface (interactive CLI, broader than the sandbox)

When *you* run `claude` interactively (not through the Brain's spawn), the tool
set is larger. Grouped by kind:

- **Files:** Read, Edit, Write, NotebookEdit, Glob, Grep.
- **Shell:** Bash (foreground + background), with a sandbox/permission layer.
- **Web:** WebFetch, WebSearch.
- **Agents/orchestration:** Agent (subagents), Task tools, Workflow (multi-agent
  fan-out), background tasks.
- **Browser:** an in-app Chromium (`mcp__Claude_Browser__*`) and Claude-in-Chrome
  (`mcp__claude-in-chrome__*`) for real logged-in sessions — navigate, click,
  read_page, screenshots, network/console inspection.
- **MCP connectors:** GitHub, Linear, Notion, Slack, Figma, Datadog, Sentry, and
  many more — each needs OAuth in an interactive session before use.
- **Memory:** a persistent file-based memory the agent reads each session.

## 3. Skills (packaged expert workflows)

Skills are invokable playbooks. The ones most relevant to CRS work:

- **Engineering:** `code-review`, `debug`, `system-design`, `architecture`
  (ADRs), `testing-strategy`, `tech-debt`, `deploy-checklist`,
  `incident-response`, `documentation`.
- **Product:** `write-spec` (PRDs), `product-brainstorming`, `competitive-brief`,
  `synthesize-research`, `roadmap-update`, `sprint-planning`, `metrics-review`.
- **Design/Frontend:** `frontend-design`, `senior-frontend`, `ui-ux-pro-max`,
  `design-system`, `design-critique`, `accessibility-review`, `ux-copy`,
  `design-handoff`.
- **Docs/Files:** `docx`, `pptx`, `xlsx`, `pdf`, `canvas-design`, `dataviz`.
- **Meta:** `skill-creator`, `mcp-builder`, `brainstorming`, `deep-research`,
  `schedule`/`loop` (recurring tasks), `verify`/`run` (exercise a change).

Invoke a skill by name (e.g. `/code-review`) or let the model trigger it by task
match. The Brain's spawned agent does NOT auto-load these — they're for
interactive Claude Code sessions.

## 4. Models & routing (ties to `w-modelrouting`)

- **Fable 5**, **Opus 4.8**, **Sonnet 5**, **Haiku 4.5** are the current models.
  IDs: `claude-opus-4-8`, `claude-sonnet-5`, `claude-haiku-4-5-20251001`,
  `claude-fable-5`.
- The Brain's **smart model routing** (`settings.autoRoute`) picks the cheapest
  capable model per task: Haiku/Sonnet + low effort for mechanical work, Opus +
  high effort for architecture/security/privacy/reasoning. See `classifyTask()`
  / `routeModel()` in `server.js`.

## 5. Practical implications for CRS Brain features

- Features that need live data (Bubble watcher, research items) rely on
  `WebFetch`/`WebSearch` — already in the sandbox. ✅
- Features that touch Bubble schema go through `buildprint` on the TEST branch
  only, under the `bp-guard` gate. ✅
- Anything needing arbitrary shell, deletes, or git push must be done by Vlad in
  an interactive session — the spawned agent can't. ⛔
