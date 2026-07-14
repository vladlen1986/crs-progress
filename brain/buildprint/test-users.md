# Test users
> Source: https://docs.buildprint.ai/test-users-vvuno · Captured: 2026-07-14 (verbatim .md)

Test users are saved accounts that Buildprint can use while testing your Bubble app.

Each test user has:

- Name: a label like Admin user or Free tier user.
- Database: either Test or Live.
- Description: optional guidance about when to use the account.
- Email: optional login email.
- Login method: either automatic login or password login.

Use unique, low-privilege accounts created only for testing. The Buildprint agent can access saved test user details during runs, so do not reuse personal or production passwords.

## Login methods

## Log in automatically

If you do not save a password, Buildprint treats the user as an account it should start as automatically. This is useful for faster tests, 2FA accounts, and flows where you do not want to test the visible login UI.

Automatic login requires Buildprint to have the Bubble editor permissions needed to view and run as users.

Do not use automatic login for tests whose purpose is to verify login, signup, logout, SSO, password reset, or another auth flow.

## Log in with password

If you save a password, the agent can use the visible login form during test steps.

Use this when the test is supposed to verify the login flow itself.

## Managing test users

Open Tests > Users to add, edit, disable, enable, or delete test users.

Disabled test users are ignored by normal test setup and cannot be used as assigned users for a run.

## Adding a test user

Click Add test user and fill in:

- Name: required.
- Database: Test or Live.
- Description: optional.
- Email: optional.
- Login method: automatic login or password login.
- Password: required only when using password login.

## Assigning test users to tests

Open a test in the builder and select:

- Live user: used when the run targets the live branch.
- Test user: used when the run targets any non-live branch.

If no user is assigned for the selected environment, the run can still start, but the agent runs without a pre-configured login account.

## Changes during active runs

Changes to test users may not appear inside an already running test immediately. Start a new run if you need the agent to pick up recent test user changes.
