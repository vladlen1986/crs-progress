# Buildprint Manual (scraped docs.buildprint.ai)

> **Operating CRS via CLI + MCP without the paid web app → [CLI-MCP-PLAYBOOK.md](CLI-MCP-PLAYBOOK.md)** —
> the money thesis (CLI/MCP = $0 agent runtime), CLI-vs-MCP capability split, permissions, safety, the
> per-feature workflow, command reference, and do-not-do. Read this first for "how do I build features
> without paying for the web app". Operational guardrails live in [crs-brain-operations.md](crs-brain-operations.md).

Question about HOW to use Buildprint (modes, agents, prompts, limits, troubleshooting) → read the relevant page below. Project-specific Buildprint RULES (dev-branch-only, Plan-mode-first, etc.) live in ../../decisions.md 2026-05-01 — those override generic docs advice.

Captured 2026-07-14 from https://docs.buildprint.ai/ in two passes the same day: first pass 23 high-priority pages, second pass the remaining ~48 (full manual — all doc sections, all 10 CLI reference pages, and the complete REST API reference consolidated from the official OpenAPI schema). Coverage is now the entire docs site.

## Getting started

| Page | Answers |
|---|---|
| [getting-started.md](getting-started.md) | Hub page — map of the Getting Started section |
| [how-buildprint-works.md](how-buildprint-works.md) | Core concepts: what Buildprint can access, snapshots, workspace/project/branch terms, what it does NOT do |
| [connecting-your-bubble-app.md](connecting-your-bubble-app.md) | Setup: app ID, inviting connect@getbuildprints.com, ownership verification (metatag / Admin API token), connection troubleshooting |
| [connect-codex-claude-gemini-subscription.md](connect-codex-claude-gemini-subscription.md) | Connecting your own Claude / ChatGPT-Codex / Gemini / Cursor subscription, credential troubleshooting |
| [using-buildprint-models.md](using-buildprint-models.md) | Pay-as-you-go Buildprint credits ($5/mo included), adding credits, credit errors |
| [support-guidelines.md](support-guidelines.md) | How to get support, what support will/won't help with, ~96h response time |
| [buildprint-paid-plans.md](buildprint-paid-plans.md) | Pricing tiers (Basic free / Pro $49 / Team $249 / Enterprise), member/log/agent-runtime limits |

## Agents (most relevant for CRS Bubble work)

| Page | Answers |
|---|---|
| [agents-overview.md](agents-overview.md) | Hub page — map of the Agents section |
| [introduction-to-buildprint-agents.md](introduction-to-buildprint-agents.md) | Plan mode vs Build mode, what agents can do, permission layers, concurrency limits |
| [best-practices-for-using-agents.md](best-practices-for-using-agents.md) | Prompting patterns: branch + scope + success criteria, focused tasks, Plan-first, restart-when-confused, /test, "do not change X" |
| [permissions-and-data-safety.md](permissions-and-data-safety.md) | Roles (Admin/Member/Guest/Read-only), Plan vs Build permission requirements, branch safety, DB read-only (bypasses privacy rules!), secrets handling |
| [choosing-a-model.md](choosing-a-model.md) | Provider options, model picker as source of truth, cost guidance |
| [testing-buildprints-changes.md](testing-buildprints-changes.md) | /test command, Preview run-as-user, live vs test data gotchas |
| [code-reviews-with-buildprint.md](code-reviews-with-buildprint.md) | Branch-vs-branch reviews (Bubble "pull request"): creating, sections, rerun/retry, when to review |
| [agents-skills.md](agents-skills.md) | Full Skills article: scopes (official/workspace/project), creating, attaching via / or @, example skill template, safety |
| [troubleshooting-faqs.md](troubleshooting-faqs.md) | Wrong change, stale branch/sync issues, "cannot apply changes" causes, agent slow/failed, usage limits |

## Observability

| Page | Answers |
|---|---|
| [observability-overview.md](observability-overview.md) | Hub page — map of the Observability section |
| [introduction-to-logging.md](introduction-to-logging.md) | Server log capture (waitlist-gated), View/Explorer/Monitors tabs, sync delays up to 3h for low-traffic apps, Logs permission requirement |
| [exploring-logs.md](exploring-logs.md) | Log Explorer: filters (time range, log type, text, user email, thing ID), URL-synced filters, volume histogram, detail panel, View time-series charts |
| [monitors.md](monitors.md) | Automated log alerts: Threshold / Match event / Anomaly detection types, created via agent chat, webhook (primary) + email fallback (3/hr, 10/day limits), managing from Logs → Monitors |
| [observability-troubleshooting.md](observability-troubleshooting.md) | Empty logs checklist (waitlist, collaborator, Logs permission), live-only log limitation, test-version logs |

## Tests

| Page | Answers |
|---|---|
| [tests-overview.md](tests-overview.md) | Hub page — map of the Tests section |
| [introduction-to-tests.md](introduction-to-tests.md) | Plain-English browser QA flows, tabs (Dashboard/Tests/Users/History) |
| [test-users.md](test-users.md) | Saved test accounts: automatic vs password login, when NOT to use automatic (auth-flow tests), Live vs Test user assignment, managing under Tests > Users |
| [creating-tests.md](creating-tests.md) | Test builder: Start node settings, step types (Test/Condition/Component), failure behavior, folders, files |
| [running-tests.md](running-tests.md) | Run single/folder/group, vision-capable model required, pre-run checks, REST + MCP test-run routes |
| [viewing-results.md](viewing-results.md) | Tests > History: run records, statuses (queued/running/passed/warning/error/canceled), run viewer, screenshots/videos artifacts |
| [tests-best-practices.md](tests-best-practices.md) | Stable test design, login-flow rules, test troubleshooting |

## Automations

| Page | Answers |
|---|---|
| [automations-overview.md](automations-overview.md) | Hub page — map of the Automations section |
| [introduction-to-automations.md](introduction-to-automations.md) | Trigger + actions model, 6 triggers (Manual/API, Live deployed, Branch merged/created/removed, Recurring), 4 actions, automations page columns |
| [creating-automations.md](creating-automations.md) | Automation editor, trigger choice, cron/preset recurring schedules, branch params only on branch triggers, enable/disable/delete semantics |
| [automation-actions.md](automation-actions.md) | Action details: Run tests (all vs chosen), Send message templates ({{branch.name}} etc.), Send webhook payload, Deploy agent (early — avoid in production) |

## Collaboration

| Page | Answers |
|---|---|
| [collaboration-overview.md](collaboration-overview.md) | Hub page — map of the Collaboration section |
| [project-and-workspace-permissions.md](project-and-workspace-permissions.md) | Workspace roles (Admin/Member/Guest), primary admin, project-only invites → limited Guest access, moving projects between workspaces |
| [sharing-chats.md](sharing-chats.md) | Adding conversation members (owner-only), public read-only links, whose AI credentials shared chats consume, private access rules |
| [workspace-settings.md](workspace-settings.md) | General/Members/Billing sections, primary admin transfer, workspace deletion consequences |
| [project-settings.md](project-settings.md) | General/Members/Style sections, project roles incl. Read-only, Style = per-project AI guidance, Danger Zone (move workspace, disconnect) |
| [delete-your-data.md](delete-your-data.md) | GDPR-style deletion requests (support@getbuildprints.com), workspace delete vs disconnect-and-remove-all-data |

## Skills

| Page | Answers |
|---|---|
| [skills-overview.md](skills-overview.md) | Hub page — map of the Skills section |
| [introduction-to-skills.md](introduction-to-skills.md) | What skills are, when to create one |
| [official-skills.md](official-skills.md) | Buildprint-managed skills, where to find them, examples |

## Plugins

| Page | Answers |
|---|---|
| [plugins-overview.md](plugins-overview.md) | Hub page — map of the Plugins section |
| [building-plugins-with-buildprint.md](building-plugins-with-buildprint.md) | AI plugin building overview; limitations: cannot publish, cannot create empty plugin |
| [creating-a-plugin-project.md](creating-a-plugin-project.md) | Plugin project type (not billable), plugin editor URL, inviting connect@, HTML-tag ownership verification |
| [creating-a-plugin-in-bubble.md](creating-a-plugin-in-bubble.md) | Two-step: bubble.io/home/plugins → "Create a new plugin" |

## Components

| Page | Answers |
|---|---|
| [components-overview.md](components-overview.md) | Hub page — map of the Components section |
| [how-to-use-components.md](how-to-use-components.md) | Beta feature: ask agent or browse catalog, 6 component categories (Database/UI/Workflow/Expression/API/Plugin), auto dependency install |
| [component-libraries.md](component-libraries.md) | Library concept, workspace vs public, listing statuses (Private/Awaiting approval/Public/Archived), component statuses, marketplace review |
| [publishing-and-updating-components.md](publishing-and-updating-components.md) | library.json / component.json / README structure, short vs long descriptions, `buildprint components package`, dependencies, marketplace flow |

## Integrations

| Page | Answers |
|---|---|
| [integrations-overview.md](integrations-overview.md) | Hub page — map of the Integrations section |
| [connect-via-mcp.md](connect-via-mcp.md) | Creating an MCP server, bearer token, Claude Code / Cursor install commands, MCP tool list, revoking access |
| [linear.md](linear.md) | @Buildprint in Linear issues, team→project mapping, agent settings (run as/model/reasoning/permissions), branch-label tracking with auto-sync |
| [slack-integration.md](slack-integration.md) | @Buildprint in Slack, channel access modes, run-as config, thread continuity, file limits (30MB/file, 100MB/msg), troubleshooting |
| [rest-api.md](rest-api.md) | REST API intro (beta): token creation at Integrations > API, bearer auth, available endpoint areas |
| [openrouter.md](openrouter.md) | Connecting your own OpenRouter key (sk-or-...), at-cost billing, warning: all workspace members can chat on your key |

## Buildprint for Agencies

| Page | Answers |
|---|---|
| [buildprint-for-agencies.md](buildprint-for-agencies.md) | Hub page — map of the Agencies section |
| [managing-client-projects.md](managing-client-projects.md) | One-workspace-many-projects pattern, per-project member assignment, agency role model |
| [inviting-clients.md](inviting-clients.md) | Project-scoped client invites (Read-only/Guest/Member), what clients can see, per-conversation sharing |
| [integrating-buildprint-into-your-workflows.md](integrating-buildprint-into-your-workflows.md) | Agency workflows: reviews for QA, debugging with agents, monitoring client apps, Linear connection |

## CLI reference

| Page | Answers |
|---|---|
| [cli-installation-and-authentication.md](cli-installation-and-authentication.md) | npm install, buildprint link token, quickstart, mcp install, login as Bubble test user; CLI avoids agent-runtime billing |
| [cli-exploring-an-app.md](cli-exploring-an-app.md) | Read-side commands: project list/info/clone, branch list, summary, tree, context, find, schema, docs, guidelines — with all flags |
| [cli-workspaces.md](cli-workspaces.md) | App root + .buildprint/, branch-per-worktree model, the three refs (heads/bubble/published), why drift detection works |
| [cli-filesystem.md](cli-filesystem.md) | Full shredded file-tree layout (pages/, data_types/, option_sets/, styles/, api/, settings/), lifted fields, children arrays, map key vs internal id, canonical JSON rules, what not to edit |
| [cli-applying-changes.md](cli-applying-changes.md) | buildprint apply (gates, flags, out-of-sync handling), buildprint sync (--no-merge/--reset/status), buildprint changelog |
| [cli-validating-with-check.md](cli-validating-with-check.md) | buildprint check: changed-file scoping (no full-app scan flag), targets, autofix output, --level/--rule/--auto-apply |
| [cli-creating-and-copying-entities.md](cli-creating-and-copying-entities.md) | buildprint new (page/mobile/reusable/data_type/option_set/workflow/action/folder/test) and buildprint copy (root/workflow/element/action) — all flags |
| [cli-savepoints-and-branches.md](cli-savepoints-and-branches.md) | buildprint savepoint create/list/restore, branch create --from, merge with conflict --resolve flags |
| [cli-running-an-audit.md](cli-running-an-audit.md) | buildprint audit security scan: 6 checks (public data types, public backend workflows, public uploaders, temp passwords, missed server-side redirects, gitleaks), severity report |
| [cli-installing-and-packaging-components.md](cli-installing-and-packaging-components.md) | buildprint components list/search/categories/add/package with flags |
| [cli-plugins.md](cli-plugins.md) | buildprint plugin clone/upload/publish, plugin workspace layout, draft save vs manual publish handoff |

## API reference

| Page | Answers |
|---|---|
| [api-reference.md](api-reference.md) | Complete public REST API (beta): base URL, bp_ tokens, quick start, and every endpoint (agents, agent messages, code reviews, automations, tests, test groups, test runs, test group runs, test users, versions) with all parameters, request/response fields, model enums, and error codes — generated from the official OpenAPI schema |

## Gaps

None — every page in the docs site navigation (Documentation, API Reference, and CLI trees) is captured. Known limitation carried over from the first pass: the buildprint-paid-plans page contains a plan-comparison image with exact per-tier allowances that could not be captured as text.
