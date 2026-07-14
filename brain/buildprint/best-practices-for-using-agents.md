# Best practices for using agents
> Source: https://docs.buildprint.ai/best-practices-for-using-agents-xk9k2 · Captured: 2026-07-14

Buildprint agents follow the same basic rule as other AI agents: garbage in, garbage out.

The clearer the task, context, branch, and success criteria, the better the result. Vague prompts usually produce vague work.

## Garbage in, garbage out

Take the time to instruct the agent effectively. Use the voice feature to record your thoughts if typing takes a long time. If you expect good results, you must ensure your prompts have clear instructions and clear success criteria.

Before asking an agent to work, define:

- The branch (Buildprint editing must be done on different branches)
- The page, reusable element, workflow, data type, or setting involved
- The expected behavior
- The current problem
- Any constraints or edge cases
- Whether the agent should plan first or start building
- Clear success criteria

A good prompt might look like this:

> On the test branch, update the signup page so users see a clearer error when their invite code is invalid. Inspect the current workflow first, then explain your plan before editing.

## Keep tasks focused

Agents work better on small, bounded tasks.

Avoid combining unrelated work in one chat. For example, do not ask the same agent to redesign a page, fix a payment workflow, update data privacy rules, and write release notes in one task.

Split larger work into separate steps:

1. Investigate the current behavior
2. Propose the change
3. Make the change
4. Test the result (or use `/test` to get Buildprint to test its own work)
5. Review before merging or deploying

## Use Plan mode before risky work

Use Plan mode when the task is large, unclear, or risky.

Ask the agent to inspect the app, explain its approach, and identify anything that could break. Switch to Build mode only after the plan is specific enough to review.

Use Build mode when you are ready for the agent to edit the selected branch.

## Restart when the agent gets confused

If the agent starts misunderstanding the task, repeating itself, or going in circles, start a new chat.

Do not keep adding corrections to a messy conversation and hope it recovers. That usually makes the context worse.

Start again with:

- A short summary of the goal
- The branch to use
- What has already been tried
- What should be ignored
- The exact next step you want

## Test before merging

Always test agent changes on a development branch before merging or deploying, or ask Buildprint to do it for you using `/test`.

## Review important changes

Use Buildprint reviews for changes that affect:

- Privacy
- Permissions
- Data structure
- Backend workflows
- Payments
- API Connector calls
- Branches you plan to merge
- Anything users depend on in production

AI-generated changes should be reviewed like code. Treat the agent as a fast assistant, not an authority.

## Be explicit about what not to change

If part of the app should stay untouched, say so. For example:

> Update the checkout confirmation email only. Do not change the payment workflow, Stripe API calls, or the checkout page UI.

This reduces accidental edits and helps the agent keep the work bounded.

## Prefer verifiable outcomes

Ask for outcomes that can be checked.

Instead of:

> Make onboarding better.

Use:

> On the test branch, update the onboarding workflow so new users are redirected to /setup after email verification. Confirm the workflow condition and test the redirect in Preview.

Verifiable outcomes make it easier for the agent to test its work and easier for you to review it.
