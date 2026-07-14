# Troubleshooting & FAQs
> Source: https://docs.buildprint.ai/troubleshooting-faqs-02xz4 · Captured: 2026-07-14

## The agent made the wrong change. What should I do?

If changes haven't been applied yet, request the agent to revert or adjust draft edits. If already applied to Bubble, restore a savepoint if available, then retry with a more specific prompt and correct branch.

## I changed something in Bubble, but the agent does not see it.

Request the agent to sync the branch. "Buildprint agents work from synced branch snapshots, so direct Bubble editor changes are not visible until the branch is synced."

## Another agent changed the same branch. Will this agent see it?

Only after syncing. If another agent modified the shared Bubble branch, ask this agent to sync before proceeding.

## Buildprint says the branch is stale.

Bubble has changed since the last sync. Request the agent to sync and resolve any conflicts if needed.

## Buildprint cannot apply changes.

Common causes include:

- The selected model cannot edit
- Build mode is not enabled
- Missing Buildprint build permission
- The Bubble collaborator cannot edit the branch
- The branch is stale and needs sync
- Buildprint checks found issues requiring fixes

Ask the agent what prevented the apply and what it requires next.

## Bubble's issue checker shows problems.

Buildprint can review synced issue-checker output in snapshots, though this output may be outdated. Bubble refreshes issue-checker state in the editor. For minor issues, fix them in Bubble and sync. For complex issues, ask the agent to inspect synced output and run Buildprint checks.

## I do not see the changes in Bubble.

Verify:

- The agent successfully applied changes
- You're viewing the correct branch
- The Bubble editor or run-mode tab is refreshed
- You're not viewing live when changes were applied to development

## The agent stopped or failed unexpectedly.

Retry once. If it fails again, start a new chat with a summary, branch name, and prior actions.

## The agent is slow.

Large Bubble apps, complex workflows, model reasoning, browser testing, and sync or apply operations require time. Keep tasks focused and request the agent work on one area at a time.

## I hit a model or usage limit.

Check Buildprint billing, Buildprint-managed credits, or your connected AI provider's usage settings.

## I cannot find attached files or context.

Files and skills are available only during the current run. Ask the agent to list accessible files if uncertain.

## How do I rename a conversation?

Use the conversation menu in the chat UI.

## Where are invoices?

Open workspace billing settings in Buildprint.
