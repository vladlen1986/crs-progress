# Integrating Buildprint into your workflows
> Source: https://docs.buildprint.ai/integrating-buildprint-into-your-workflows-q7fom · Captured: 2026-07-14

Buildprint integrates into agency processes for quality assurance, debugging, monitoring, and task tracking.

## Reviews for QA

Execute a review before merging Bubble branch work:

1. Open the project
2. Navigate to Reviews
3. Select Create
4. Pick the From version or branch
5. Pick the To version or branch
6. Select a model
7. Optionally connect a Linear issue and specify focus areas
8. Select Create review

The system generates review sections covering **Changes**, **Comments**, and **Tests**. Team members can check off comments and tests during review. Review items may be added, modified, or removed manually.

Upon shipping or merging, mark the review as **Merged**. Additional actions: closing, retrying, rerunning, or opening a review in chat.

## Collaborating during reviews

Each review contains an activity timeline enabling teams to:

- Post comments
- Reply within threads
- Reference project members
- Share or attach images
- Document created, completed, merged, and closed events

## Debugging with agents

When clients report bugs, start an agent conversation within the project and request inspection of relevant context. Agents leverage Buildprint project context and available logs and runtime tools to diagnose issues.

Share findings by inviting project teammates to the conversation or generating a public read-only link for external parties.

## Monitoring client apps

Activate log sync for projects requiring observability. The logs interface displays analytics covering workload units, unique users, workflow counts, errors, and error rate.

Create monitors via Buildprint MCP by instructing your AI agent to establish monitoring for specific conditions like workload spikes, payment workflow failures, or API timeouts. Once active, manage events, delivery settings, test notifications, status, and deletion through Logs > Monitors.

Monitor notifications route to webhooks. Without webhook configuration, Buildprint distributes email notifications to project members and workspace admins.

## Connecting Linear

For agencies using Linear, connect via Agent > Integrations > Linear. Workspace admins can assign Linear teams to Buildprint projects and configure Linear agent behavior.

With Linear connected and configured, teams can attach Linear issues to reviews and use @Buildprint within Linear issue workflows for project-aware evaluation.
