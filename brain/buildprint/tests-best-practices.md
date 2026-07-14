# Tests: Best practices
> Source: https://docs.buildprint.ai/best-practices-nobci · Captured: 2026-07-14 (verbatim .md)

## Writing stable tests

- Give each step one clear job.
- Include success criteria in the details.
- Prefer user-visible goals over fragile selector or layout instructions.
- Add exact button labels or field names only when the agent needs that precision.
- Use conditions when the flow should branch based on what appears in the app.
- Use components for repeated setup flows like logging in or opening the same page.
- Use folders to organize related tests and run groups of runnable tests together.
- Assign separate Live and Test users when the environments use different data.
- Use a vision-capable model that is reliable enough for the suite.
- Attach files to tests when the agent needs uploads or fixtures.

## Login flows

Use automatic login when the test should begin already authenticated.

Use password login when the test is verifying the visible login flow.

Do not pre-authenticate tests that are meant to verify login, signup, logout, SSO, password reset, or other auth behavior.

## Troubleshooting common issues

## The agent takes too long on one step

The instruction may be too broad. Add the page, controls, inputs, and expected result.

## The run fails after UI changes

If the product still works, the test may be too brittle. Make the step more goal-oriented and keep exact UI wording only where it matters.

## The agent keeps getting stuck at the same step

Add more detail or split the step into smaller steps.

## The wrong account is being used

Check the assigned Live user or Test user. Live branch runs use the Live user. Other branch runs use the Test user.

## The run starts without logging in

No matching test user may be assigned, or the assigned user may be disabled.

## The folder will not run

A folder needs at least one runnable test. Components can be organized in folders, but components are not run directly.

## The run continued after a failed step

Check the step's On failure setting. Continue on failure records the problem and keeps going.
