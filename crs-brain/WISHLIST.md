# CRS Brain — Improvements Wishlist

> Manually-maintained todo list for the **Second Brain app itself** (not the CRS product).
> Add whatever you want the Brain to do here — one line per idea, newest section on top.
> When something ships, move it to **Done** at the bottom (don't delete — it's the record).
> Companion: build/handoff state lives in [BRAIN_APP_PROGRESS.md](BRAIN_APP_PROGRESS.md).

Status key: `[ ]` idea · `[~]` in progress · `[x]` done · `(P1/P2/P3)` priority you set.

---

## Bubble platform awareness (keep the brain current with Bubble)

- [ ] **(P1) Daily Bubble forum check** — once a day, scan the Bubble forum and update the
  brain's Bubble-forum documents (`brain/bubble/`) with anything new/relevant (plugins,
  gotchas, patterns, breaking changes). Should append to a dated digest, not overwrite.
- [ ] **(P1) Track `bubble.io/release-notes`** — Bubble ships new features constantly and the
  brain must stay aware of them. Watch the release-notes page, and when something lands that
  affects how CRS is built, record it in a brain reference (e.g. `brain/bubble/release-notes.md`)
  and flag it if it changes a locked decision or unblocks a feature.

  **Features to research + document (flagged by Vlad — mechanics NOT yet verified, do not assume):**
  - **Style swapping in conditions** — reportedly you can now *swap an element's whole style*
    inside a conditional, instead of overriding each property one-by-one. If true, this is the
    clean way to build the **dark/light theme** feature: define a full "Button — Dark" style with
    every property set, and swap to it in a condition when dark mode is on. → Verify on
    release-notes, confirm exactly how it works, then document the theming pattern in the brain
    and reconcile with the theme approach in the design system.
  - **Global expressions** — lots of community discussion; Vlad hasn't confirmed how they work.
    → Research from release-notes/docs, write up what they are, when to use them, and whether
    they help CRS (reusable computed expressions across the app?). Document in the brain.

  *When the release-notes-tracking capability exists (or done manually), these two get proper
  writeups under `brain/bubble/` and, if they change the build approach, a `decisions.md` candidate.*

---

## App features / UX

*(add ideas here)*

---

## Automation / agent behavior

- [ ] **(P1) Task loops with limit-aware auto-resume** — let the agent use the full power of the
  Claude subscription. Give it several tasks; if the **5-hour usage limit** is hit mid-run and it
  stops, the Brain should detect the limit, **read when it resets** (from the usage/statusline data
  it already captures), wait, and then **automatically continue** the unfinished tasks — no manual
  restart. Needs: a durable task queue (what's done / in-progress / pending per task), reset-time
  detection, and a resumable run loop that picks up where it left off. (Loops must still obey the
  Buildprint safety gate + plan→savepoint→apply→check.)
- [ ] **(P2) Auto-check + fix Bubble.io-reported issues** — periodically pull issues Bubble reports
  (the Issue Checker / errors surfaced in the editor or logs) and, where safe, fix them using the
  Buildprint CLI + the brain's knowledge — under the same guardrails (test branch, savepoint per
  step, check before apply, surface anything risky instead of auto-applying). Start read-only
  (report the issues + proposed fixes) before ever auto-applying.

---

## Done

*(move shipped items here with the date)*
