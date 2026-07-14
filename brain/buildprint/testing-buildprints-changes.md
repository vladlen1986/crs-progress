# Testing Buildprint's changes
> Source: https://docs.buildprint.ai/testing-buildprints-changes-41p73 · Captured: 2026-07-14 (verbatim .md)

Preview lets you choose a branch, choose a page, search for a Bubble user, and open Bubble run mode as that user.

## Ask Buildprint to `/test`

Use `/test` in the message composer to get Buildprint to test its own changes, in the browser, logged in as a real user.

![Image](https://static.ferndesk.com/user-images/file_01KSASYDNQAHTD43SD3B3ZDMCW.gif)

## Run-as from Buildprint

From an agent chat, click **Preview** in the chat header.

Choose:

- The branch to test.
- The page to open.
- The user to run as.

Preview is disabled until a user is selected.

![Image](https://static.ferndesk.com/user-images/file_01KSASQEQ8M1CBVH6QH7ED85AG.jpg)

## Live and test data

Bubble separates live and development data.

When you switch between the live branch and a non-live branch, Preview clears the selected user because those user records come from different databases.

Search for the user again after switching between live and test branches.

## Tips

- Check the selected branch before testing.
- If the page list looks stale, sync the branch.
- If you changed branches, confirm the page did not reset to `index`.
- If **Run as** fails, check your Bubble editor login and collaborator permissions.
- Test important workflows with realistic user accounts and data.
