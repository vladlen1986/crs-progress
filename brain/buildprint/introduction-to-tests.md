# Introduction to tests
> Source: https://docs.buildprint.ai/introduction-to-tests-17i5p · Captured: 2026-07-14

Tests allow you to "define repeatable browser-based QA flows in plain English that Buildprint can run against Bubble branches."

## How tests work

A test run operates with a real browser targeting the selected branch URL. Buildprint captures screenshots and video artifacts, records step comments, and "summarize what happened so you can debug failures and regressions."

The system can also store durable tips, such as "reliable selectors, waits, or gotchas" that future runs leverage for improved reliability.

## Test area tabs

The Tests section contains four main tabs:

- **Dashboard**: View current test and regression status
- **Tests**: Create tests, reusable components, and folders
- **Users**: Manage saved test accounts
- **History**: Inspect individual runs and group runs

## Section organization

The tests documentation follows the typical testing workflow:

- Test users: saved accounts and login behavior
- Creating tests: the builder, steps, conditions, components, folders, files, users, viewports, and timeouts
- Running tests: single-test runs, folder and group runs, model selection, branches, REST API, and MCP tools
- Viewing results: run history, statuses, step comments, screenshots, videos, and summaries
- Best practices: stable test design and common troubleshooting

**Note:** If your workflow requires login functionality, establish test users first and assign the appropriate Live or Test user in the test builder.
