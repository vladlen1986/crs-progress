# Testing Buildprint's changes
> Source: https://docs.buildprint.ai/testing-buildprints-changes-41p73 · Captured: 2026-07-14

The preview capability allows selection of a branch, page, and Bubble user to open Bubble run mode as that specific user.

## Ask Buildprint to `/test`

Enter `/test` in the message composer to have Buildprint test its own changes in the browser while logged in as a real user.

## Run-as from Buildprint

Within an agent chat, select **Preview** in the chat header, then specify:

- Which branch to test
- Which page to open
- Which user to run as

The Preview function remains disabled until a user is selected.

## Live and test data

Bubble maintains separate databases for live and development data. When switching between the live branch and other branches, Preview clears the selected user because those user records exist in different databases. Search for the user again after switching between live and test branches.

## Tips

- Verify the selected branch before testing
- If the page list appears outdated, sync the branch
- If branches were changed, verify the page did not revert to `index`
- If **Run as** encounters issues, verify your Bubble editor login and collaborator permissions
- Test critical workflows using realistic user accounts and corresponding data
