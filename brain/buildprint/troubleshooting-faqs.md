# Troubleshooting & FAQs
> Source: https://docs.buildprint.ai/troubleshooting-faqs-02xz4 · Captured: 2026-07-14 (verbatim .md)

## The agent made the wrong change. What should I do?

If the change has not been applied yet, ask the agent to revert or adjust its draft edits.

If the change was applied to Bubble, restore a Bubble savepoint if one was created. Then start again with a narrower prompt and the correct branch.

## I changed something in Bubble, but the agent does not see it.

Ask the agent to sync the branch. Buildprint agents work from synced branch snapshots, so direct Bubble editor changes are not visible until the branch is synced.

## Another agent changed the same branch. Will this agent see it?

Only after syncing. If another agent applied changes to the same Bubble branch, ask this agent to sync before continuing.

## Buildprint says the branch is stale.

That means Bubble changed since the agent last synced. Ask the agent to sync, resolve any conflicts if needed, then continue.

## Buildprint cannot apply changes.

Common causes include:

- The selected model cannot edit.
- Build mode is not enabled.
- You do not have Buildprint build permission.
- The Bubble collaborator cannot edit the branch.
- The branch is stale and needs sync.
- Buildprint checks found issues that must be fixed first.

Ask the agent what blocked the apply and what it needs next.

## Bubble's issue checker shows problems.

Buildprint can inspect synced issue-checker output when it exists in the synced snapshot, but that output can be stale. Bubble refreshes issue-checker state in the editor.

For small obvious issues, you can fix them in Bubble and sync. For larger issues, ask the agent to inspect the synced issue output and run Buildprint checks.

## I do not see the changes in Bubble.

Check that:

- The agent actually applied changes successfully.
- You are looking at the same branch the agent edited.
- The Bubble editor or run-mode tab has been refreshed.
- You are not looking at live when the change was applied to a development branch.

## The agent stopped or failed unexpectedly.

Retry once. If it fails again, start a new chat with a concise summary, the branch, and what already happened.

## The agent is slow.

Large Bubble apps, complex workflows, model reasoning, browser testing, and sync or apply operations can take time. For better results, keep tasks focused and ask the agent to work one area at a time.

## I hit a model or usage limit.

Usage limits may come from Buildprint billing, Buildprint-managed credits, or your connected AI provider. Check the relevant provider or workspace billing UI.

## I cannot find attached files or context.

Attached files and skill context are made available to the agent for the current run. Ask the agent to list the files it can see if you are unsure.

## How do I rename a conversation?

Use the conversation menu in the chat UI.

## Where are invoices?

Open workspace billing settings in Buildprint.
