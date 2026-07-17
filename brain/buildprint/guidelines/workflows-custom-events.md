# Custom Events
> Source: `buildprint guidelines get workflows/custom-events` · Captured: 2026-07-17 (verbatim)

Use this path for `CustomEvent` workflows in pages, reusables, and backend workflow trees.

## Key behavior

- Triggered custom events are synchronous from the caller's point of view.
- Scheduled custom events are asynchronous, even with zero delay.
- Frontend custom events depend on page lifecycle; backend work should use backend workflows instead.

## What to inspect

- Parameter definitions on the custom event workflow.
- Argument wiring in the caller action files.
- Return-type declarations and any terminate/return action that emits them.
- Whether the event belongs in page/reusable scope or backend scope.

## Filesystem workflow

- Locate the custom event's `workflow.json`.
- Read the caller workflow and the custom event together.
- Use `rg` to find every trigger/schedule call site before changing parameter names or return semantics.
