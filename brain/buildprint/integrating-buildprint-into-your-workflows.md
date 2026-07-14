# Integrating Buildprint into your workflows
> Source: https://docs.buildprint.ai/integrating-buildprint-into-your-workflows-q7fom · Captured: 2026-07-14 (verbatim .md)

Buildprint fits into agency workflows for QA, debugging, monitoring, and task tracking.

## Reviews for QA

Run a review before merging Bubble branch work.

To start a review:

1. Open the project.
2. Go to Reviews.
3. Click Create.
4. Select the From version or branch.
5. Select the To version or branch.
6. Choose a model.
7. Optionally link a Linear issue and add focus areas.
8. Click Create review.

Buildprint generates review sections for Changes, Comments, and Tests. Comments and tests can be checked off as your team works through them. You can also add, edit, or delete review items manually.

When the work has shipped or been merged, mark the review as Merged. You can also close, retry, rerun, or open a review in chat.

## Collaborating during reviews

Each review has an activity timeline. Your team can:

- Add comments.
- Reply in threads.
- Mention project members.
- Paste or attach images.
- Track created, completed, merged, and closed events.

## Debugging with agents

When a client reports a bug, start an agent conversation in the project and ask the agent to inspect relevant context. Agents can use Buildprint project context and, where enabled, logs and runtime tools to help explain what happened.

Share the investigation by adding project teammates to the conversation or by creating a public read-only link for someone outside Buildprint.

## Monitoring client apps

Enable log sync for projects where you want observability. The logs area includes analytics for workload units, unique users, workflow counts, errors, and error rate.

Monitors are created through Buildprint MCP. Ask your AI coding agent to create a monitor for a condition such as workload spikes, payment workflow failures, or API timeouts. After a monitor exists, you can view events, configure delivery, send test notifications, enable or disable it, and delete it from Logs > Monitors.

Monitor notifications can be delivered to a webhook. If no webhook is configured, Buildprint sends email notifications to project members and workspace admins.

## Connecting Linear

If your agency uses Linear, connect it from Agent > Integrations > Linear. Workspace admins can map Linear teams to Buildprint projects and configure how the Linear agent runs.

After Linear is connected and scoped, your team can link Linear issues to reviews and invoke @Buildprint from Linear issue workflows for project-aware analysis.
