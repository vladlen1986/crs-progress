# Test users
> Source: https://docs.buildprint.ai/test-users-vvuno · Captured: 2026-07-14

Test users are saved accounts that Buildprint uses during testing of your Bubble application.

## What a test user includes

- **Name**: a descriptive label (examples: "Admin user" or "Free tier user")
- **Database**: Test or Live environment
- **Description**: optional notes about appropriate usage scenarios
- **Email**: optional login credential
- **Login method**: automatic or password-based authentication

The docs emphasize using "unique, low-privilege accounts created only for testing" and warn against reusing personal or production credentials.

## Authentication approaches

### Automatic login

Omitting a password tells Buildprint to log the agent in automatically. Benefits: faster test execution, works for accounts requiring 2FA, and scenarios where the login interface itself isn't being tested.

Requires Buildprint to have the necessary Bubble editor permissions for user impersonation.

Do NOT use automatic login when validating "login, signup, logout, SSO, password reset, or another auth flow."

### Password-based login

Saving a password enables the agent to interact with visible login forms during test execution. Select this method when "the test is supposed to verify the login flow itself."

## Account management

Go to Tests > Users to create, modify, disable, enable, or remove test accounts. Disabled accounts are ignored during standard test setup.

## Creating test users

Select Add test user and complete:

- Name (required)
- Database (Test or Live)
- Description (optional)
- Email (optional)
- Login method selection
- Password (required for password login only)

## User assignment

Within the test builder, designate:

- **Live user** for live branch targeting
- **Test user** for non-live branch targeting

Tests proceed even without pre-assigned credentials, though the agent lacks pre-configured login information.

## Runtime considerations

Recent test user modifications may not immediately reflect in ongoing test executions. Start a fresh run to ensure the agent recognizes updates.
