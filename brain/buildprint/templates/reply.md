<!-- TEMPLATE: reply.md — respond to a BP report with numbered rulings + corrections.
     Implements PROMPT-STANDARD.md. Generator: one numbered ruling per BP finding (accept / reject /
     correct / defer); cancel superseded tasks EXPLICITLY; restate zero-tolerance rules where BP drifted;
     inline the finding you're ruling on so BP has context. Delete these notes before emitting. -->

# Buildprint Prompt — Reply to {report name}: verdicts + corrections

**On TEST/DEV branch only. Continue on savepoint "Before {scope}" (create one now if none). Run `buildprint check` after each corrected task. Do not push to live. Apply the corrections directly without confirmation.**

**Attachments:** `CRS-design-system.md` (source of truth){, `{spec_html}` (pixel spec)}.

## How to read this
Below are numbered **rulings** on your report. Each ruling: the finding (restated so you have it), my **verdict**, and the **correction** if any. Do only what the rulings say. Anything not mentioned stays as-is.

## Rulings
1. **{finding 1, restated}** — **Verdict: {ACCEPTED / REJECTED / CORRECT-IT / DEFERRED}.** {If CORRECT-IT: the exact fix. If REJECTED: why + what to leave alone. If DEFERRED: it's tracked, do not touch now.}
2. **{finding 2}** — **Verdict: …** {…}
3. {…}

## Cancelled tasks (do NOT do these)
- ~~{task from a prior prompt/plan that is now superseded}~~ — **cancelled.** {reason.}
- ~~{…}~~ — **cancelled.**

## Zero-tolerance rules (restate where you drifted)
- **Zero pixel deviation** from the spec table — measure and match, don't approximate.
- **Zero inline/literal colors** except the approved literals ({badge rgba, selected-row tint, overlay ink}) — everything else on a named paired style.
- **Zero property-level color conditionals** — theme is a full style swap on `dark_theme is "no"` only.
- **Zero new searches** on {render/hover/click} where the loaded list can be reused.
- {any other "zero" rule BP violated}

## Corrective tasks (only the ones a ruling created)
### Task 1 — {corrective task}
{concrete steps + measured verify}

## Verify
{measured px vs spec; both themes via getComputedStyle; WU proof} — **status + one line of evidence** per item; unknown = "not inspectable". **Flag, don't substitute** anything Bubble can't hit.

## Report
What you corrected (before→after with measured numbers) · what you left as-is per each ruling · any locked-decision conflict → **flag for decisions.md**, don't resolve. **Max two attempts** per corrected step, then halt and report.

**TEST/DEV only. Savepoint in place. `buildprint check` after each task. Do not push to live.**
