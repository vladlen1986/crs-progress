# Database Triggers
> Source: `buildprint guidelines get workflows/database-triggers` · Captured: 2026-07-17 (verbatim)

Use this path for backend workflows of type `DatabaseTriggerEvent` under `api/`.

## What matters

- Which data type the trigger watches.
- Whether the condition is narrow enough to avoid firing on every write.
- Whether heavy follow-up work should be delegated to a scheduled backend workflow instead of running inline.

## Practical rules

- Broad triggers without a condition are usually a bad idea.
- Compare before/after values deliberately when the trigger is meant to react to a change, not just any save.
- Treat trigger-side writes carefully to avoid hidden fan-out or hard-to-explain behavior.

## How to inspect

- Find the trigger workflow under `api/`.
- Read the trigger condition and the first few action files together.
- Cross-check the watched type in `data_types/` so field names and intent are clear.
