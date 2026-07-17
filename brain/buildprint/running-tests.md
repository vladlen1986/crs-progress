# Running tests
> Source: https://docs.buildprint.ai/running-tests-lh4vs · Captured: 2026-07-14 (verbatim .md)

## Running a single test

Open a test and click Run. Choose:

- Branch: the Bubble branch to test.
- Model: the model Buildprint should use.

Buildprint starts a browser run against the selected branch URL.

Live runs use the assigned Live user. Non-live branch runs use the assigned Test user. If no matching user is assigned, the run still starts without a pre-configured login account.

## Running folders and groups

From the Tests tab, run a folder to start runs for the runnable tests in that folder.

Group runs create child runs for each test and show the combined result in History. Components are not run directly.

## Selecting a model

Use a vision-capable model because the agent works against a browser.

The model picker uses your connected providers and saved preferences. Start with the cheapest vision-capable model that can reliably pass the suite, then move to a stronger model for fragile or high-value flows.

## What Buildprint checks before starting

A run needs:

- A Bubble app or domain configured for the project.
- An available branch.
- An app URL for that branch.
- Sandbox capacity.
- A supported model.
- Access to the project.

If the selected test user is disabled, missing, or assigned to the wrong database, the run fails before execution.

## Running tests through the API

Buildprint also supports starting and reading runs through public REST routes:

- POST /api/public/v1/test-runs
- GET /api/public/v1/test-runs/{runId}
- POST /api/public/v1/test-group-runs
- GET /api/public/v1/test-group-runs/{groupRunId}

The start request includes the test or group ID, a branch ID or branch label, and optionally a model.

## Running tests through MCP

The hosted MCP server exposes tools for test execution, including:

- start_test_run
- start_test_group_run
- get_test_run
- get_test_group_run

Use these when an agent or external tool should start a Buildprint test run.
