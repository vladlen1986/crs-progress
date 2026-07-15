<!-- TEMPLATE: pilot.md — prove a pattern on ONE target, then STOP for go/no-go before any rollout.
     Implements PROMPT-STANDARD.md. Generator: pick the single pilot target; make the STOP gate
     unmissable; the rollout set is OUT of scope. Delete these notes before emitting. -->

# Buildprint Prompt — Pilot: {pattern} on {single target}

**On TEST/DEV branch only. Create savepoint "Before {pattern} pilot" first. Run `buildprint check` after each task. Do not push to live. Apply directly without confirmation — but STOP at the gate (below); do not roll out.**

**Attachments:** `CRS-design-system.md` (source of truth){, `{spec_html}` (pixel spec)}.

## Scope — this is a PILOT
- **IN:** apply {pattern} to **exactly one** target: **{single target}** (route `{route}`, element/reusable `{id}`).
- **OUT:** every other candidate ({list the rollout set — e.g. "the other 45 modules / the other 6 report cards"}). Do NOT touch them.
- **STOP GATE (hard):** after Task 2 verify, **halt and report — do not apply {pattern} anywhere else.** Wait for my explicit "roll out" before any further change. Rolling out without go/no-go is a failure.

## Context you must honor (inlined)
- {locked decisions / patterns relevant, inlined verbatim — no repo-file references}

## Task 0 — Locate + report
By exact name/ID: the pilot target `{id}`, its current state (styles, dimensions, data source, workflows). Confirm it is the intended single target before changing anything.

## Task 1 — Apply {pattern} to the ONE pilot target
{Concrete steps to implement the pattern on {single target} only — spec table / mapping / behaviors as the pattern requires. Follow the styling rules: named paired styles, swap-only theming, approved literals stay literal.}

## Task 2 — Verify the pilot (measured), then STOP
- {measured px vs spec}; both themes via `getComputedStyle`; {WU/behavior proof}.
- Report the result and **the exact, repeatable recipe** you'd use to roll {pattern} out to the OUT set (so I can approve it once and trust the rest).
- **Then STOP.** Make no further edits.

## Report (then await go/no-go)
Human report (exec summary → scorecard `Area | Item | Status | Evidence | Severity`) · the reusable rollout recipe · anything that fought the pattern (**flag, don't substitute**) · any locked-decision conflict → **flag for decisions.md**. Machine block (```json delta) for the pilot target only. **Max two attempts** on any failing step, then halt. **Do not roll out — wait for my "roll out {pattern}".**

**TEST/DEV only. Savepoint made. Pilot = ONE target. STOP at the gate; do not push to live; do not roll out.**
