# Buildprint Manual (scraped docs.buildprint.ai)

Question about HOW to use Buildprint (modes, agents, prompts, limits, troubleshooting) → read the relevant page below. Project-specific Buildprint RULES (dev-branch-only, Plan-mode-first, etc.) live in ../../decisions.md 2026-05-01 — those override generic docs advice.

Captured 2026-07-14 from https://docs.buildprint.ai/. 23 of ~60 docs pages captured (all high-priority sections); skipped pages listed under Gaps.

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

## Skills

| Page | Answers |
|---|---|
| [introduction-to-skills.md](introduction-to-skills.md) | What skills are, when to create one |
| [official-skills.md](official-skills.md) | Buildprint-managed skills, where to find them, examples |

## CLI & MCP

| Page | Answers |
|---|---|
| [cli-installation-and-authentication.md](cli-installation-and-authentication.md) | npm install, buildprint link token, quickstart, mcp install, login as Bubble test user; CLI avoids agent-runtime billing |
| [connect-via-mcp.md](connect-via-mcp.md) | Creating an MCP server, bearer token, Claude Code / Cursor install commands, MCP tool list, revoking access |

## Tests

| Page | Answers |
|---|---|
| [introduction-to-tests.md](introduction-to-tests.md) | Plain-English browser QA flows, tabs (Dashboard/Tests/Users/History) |
| [creating-tests.md](creating-tests.md) | Test builder: Start node settings, step types (Test/Condition/Component), failure behavior, folders, files |
| [tests-best-practices.md](tests-best-practices.md) | Stable test design, login-flow rules, test troubleshooting |

## Gaps

No fetch failures — all 23 attempted pages captured. The following ~37 lower-priority pages were deliberately skipped (docs site has ~60 pages; capture prioritized core concepts, modes, agent best practices, prompting, limits, troubleshooting per scope). Fetch from docs.buildprint.ai if ever needed:

- **Observability section:** observability-dmvkg (hub), introduction-to-logging-r1sfq, exploring-logs-pmfs1, monitors-oknnr, troubleshooting-onqv1
- **Plugins section:** plugins-27k2m (hub), building-plugins-with-buildprint-mnih2, creating-a-plugin-project-oksex, creating-a-plugin-in-bubble-caiph
- **Tests section (remainder):** tests-mp888 (hub), test-users-vvuno, running-tests-lh4vs, viewing-results-o94uv
- **Automations section:** automation-y836f (hub), introduction-to-automations-m3d8h, creating-automations-aatyf, actions-5t46t
- **Collaboration section:** collaboration-4gi7y (hub), project-and-workspace-permissions-ek72b, sharing-chats-n9ro8, workspace-settings-l7pe6, project-settings-h1nyt, delete-your-data-teqlc
- **Skills section:** skills-cdbx7 (hub only; content covered by captured skills pages)
- **Components section:** components-5t0pn (hub), how-to-use-components-vzb3l, component-libraries-wwbiq, publishing-and-updating-components-365c9
- **Integrations section (remainder):** integrations-wioqs (hub), linear-ovk9x, slack-integration-pzpo7, rest-api-crdvd, openrouter-sssrw
- **Buildprint for Agencies:** buildprint-for-agencies-dkb65 (hub), managing-client-projects-4ujop, inviting-clients-u4fo2, integrating-buildprint-into-your-workflows-q7fom
- **Other doc trees not captured:** /api-reference (API Reference), /cli (CLI reference beyond installation-and-authentication)
- The buildprint-paid-plans page contains a plan-comparison image with exact per-tier allowances that could not be captured as text.
