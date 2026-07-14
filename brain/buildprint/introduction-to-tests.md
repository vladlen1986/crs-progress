# Introduction to tests
> Source: https://docs.buildprint.ai/introduction-to-tests-17i5p · Captured: 2026-07-14 (verbatim .md)

Tests let you define repeatable browser-based QA flows in plain English that Buildprint can run against Bubble branches.

A test run uses a real browser against the selected branch URL. Buildprint can capture screenshots and video artifacts, record step comments, and summarize what happened so you can debug failures and regressions.

Runs can also save durable tips, such as reliable selectors, waits, or gotchas. Future runs can use those tips to complete the same steps more reliably.

## Test area tabs

The Tests area is split into four tabs:

- Dashboard: view current test and regression status.
- Tests: create tests, reusable components, and folders.
- Users: manage saved test accounts.
- History: inspect individual runs and group runs.

## How this section is organized

This collection follows the normal testing workflow:

- Test users explains saved accounts and login behavior.
- Creating tests explains the builder, steps, conditions, components, folders, files, users, viewports, and timeouts.
- Running tests covers single-test runs, folder and group runs, model selection, branches, REST API, and MCP tools.
- Viewing results explains run history, statuses, step comments, screenshots, videos, and summaries.
- Best practices covers stable test design and common troubleshooting.

If your flow needs login, create test users first and assign the right Live or Test user in the test builder.
