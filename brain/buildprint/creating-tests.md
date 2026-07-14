# Creating tests
> Source: https://docs.buildprint.ai/creating-tests-4qqhr · Captured: 2026-07-14

Open Tests > Tests and create a new test from the sidebar. Tests save automatically as you edit.

The builder has a Start node and one or more step nodes.

## Start settings

Select the Start node to configure the whole test:

- **Reusable component:** turn the definition into a reusable component instead of a runnable test.
- **Description:** optional context for the test or component.
- **Files:** attach files the agent can use during the run.
- **Viewport:** choose Desktop, Tablet, or Mobile.
- **Live user:** account used for live branch runs.
- **Test user:** account used for non-live branch runs.
- **Timeout:** maximum time for the run.

Files, viewport, assigned users, and timeout apply to runnable tests. Reusable components are inserted into tests and are not run directly.

## Step types

Each step can be one of three types:

- **Test:** an action or assertion the agent should perform.
- **Condition:** a branch point the agent evaluates as met or not met.
- **Component:** an inserted reusable component.

For direct Test and Condition steps, configure the step name, details or condition, and failure behavior.

For Component steps, select the reusable component and choose the failure behavior.

## Conditions

Use a Condition step when later steps depend on what the agent sees.

Condition steps have two possible outcomes: **Met** and **Not met**. Buildprint follows the matching branch and skips the other branch.

## Failure behavior

Every runnable step has an **On failure** setting:

- **Stop on failure:** if the agent marks the step as warning or error, the run stops and remaining pending steps are cancelled.
- **Continue on failure:** the warning or error is recorded, but Buildprint continues with the next ready step.

Continuing does not ignore the problem. A run can still finish with a warning or error status.

## Reusable components

Use reusable components for repeated setup flows like logging in, opening a page, or navigating to the same feature area.

Components are created in the same builder. After a definition is marked as reusable, you can insert it into tests as a Component step.

When a test run starts, Buildprint expands component steps into normal runnable steps and groups them in the results.

## Folders

Folders organize tests and components in the Tests tab.

Running a folder starts the runnable tests in that folder. Components in the folder are useful for organization, but they are not run directly.

## Adding files

Attach files from the Start node. During a run, the agent receives the files and can upload or inspect them when the test requires it.
