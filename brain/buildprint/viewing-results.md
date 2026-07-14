# Viewing results
> Source: https://docs.buildprint.ai/viewing-results-o94uv · Captured: 2026-07-14 (verbatim .md)

Open Tests > History to see run history for the project.

You can also open the run history for a single test from that test's builder page.

History includes individual test runs and group runs. Group runs can be expanded to inspect their child test runs.

## Run records

Each run record can show:

- Status.
- Branch.
- Model.
- Assigned test user.
- Start and completion time.

Common statuses include queued, running, passed, warning, error, and canceled.

## Inspecting a run

Open a run to inspect it in the run viewer.

Buildprint stores:

- The run status and final summary.
- The branch and app URL.
- The assigned test user.
- Step statuses.
- Step comments.
- Condition outcomes.
- Screenshots.
- Videos.
- Other run artifacts.

The run viewer shows the test graph so you can see which steps ran, which branches were skipped, and where the agent hit a warning or error.

## Artifacts

Artifacts can be attached to individual steps or to the whole run.

Screenshots are useful for static checkpoints. Videos are useful for movement, timing, transitions, and reproducing where a flow got stuck.
