<!-- Worked example: reply to the (representative) findings a User Management audit returns.
     Rulings reference findings restated inline so BP has full context without this repo. -->

# Buildprint Prompt — Reply to the User Management audit: verdicts + corrections

**On TEST/DEV branch only. Create savepoint "Before UM audit corrections" first. Run `buildprint check` after each corrected task. Do not push to live. Apply the corrections directly without confirmation.**

**Attachments:** `CRS-design-system.md` (source of truth); `CRS-security-checklist.md`.

## How to read this
Numbered **rulings** on your audit. Each ruling restates the finding, gives my **verdict**, and the **correction** if any. Do only what the rulings say; anything not mentioned stays as-is.

## Rulings
1. **User privacy rule is `property-only` (conditions on property, not company).** — **Verdict: CORRECT-IT.** Change the rule's first check to `Current User's company = This User's company AND Current User's property = This User's property`, keep the super-admin override, and confirm the everyone-else rule grants nothing. Quote the final rule back.
2. **~12 demo users remain in a `ZZ_UI_DemoUser`-style type.** — **Verdict: ACCEPTED — delete them.** Remove the demo users (not the real User type). Report the count deleted.
3. **Mobile "Filters" button is a no-op (no sheet behind it).** — **Verdict: CORRECT-IT.** Wire it to the existing filter sheet using the shell's established overlay mechanism (do not build a new one). Report the element + workflow.
4. **`create_user` is gated client-side only.** — **Verdict: CORRECT-IT.** Route the write through a private backend workflow (`expose:false`, `auth_unecessary:false`) with first condition `Current User's role's permissions contains users___edit`; Current User resolved server-side. Quote the guard.
5. **You proposed collapsing `users___view` + `users___edit` into one `users___manage` permission.** — **Verdict: REJECTED.** This contradicts the locked permission model (granular per-action perms). Do NOT change the permission set. **Flag for decisions.md** — I'll rule on it, not you.
6. **`is_active = no` does not enforce logout.** — **Verdict: DEFERRED.** Tracked; do not build now (app-wide auth pattern). Leave as-is.

## Cancelled tasks (do NOT do these)
- ~~"Add a bulk-deactivate action to the user list"~~ — **cancelled.** Superseded by the security corrections above; revisit after Pass-2.
- ~~"Introduce `users___manage`"~~ — **cancelled** (see ruling 5).

## Zero-tolerance rules (restate — you drifted on these)
- **Zero property-level color conditionals** — any theming stays a full style swap on `theme_is_dark = no` only.
- **Zero inline/literal colors** except approved literals — everything else on a named paired style.
- **Zero new searches** on render/filter where the loaded user list can be reused (`:filtered`, not a new "Do a search for").
- **Zero UI-only writes** — every create/edit/deactivate goes through a server-guarded backend workflow.

## Corrective tasks (only what the rulings created)
### Task 1 — Privacy rule (ruling 1) → quote final rule
### Task 2 — Delete demo users (ruling 2) → report count
### Task 3 — Wire mobile Filters sheet (ruling 3) → report element + workflow
### Task 4 — Server-guard create_user (ruling 4) → quote guard

## Verify
Per corrected task: quote the rule/guard; measured proof for the mobile sheet in both themes via `getComputedStyle`; **status + one line of evidence** each; unknown = "not inspectable". **Flag, don't substitute** anything Bubble can't hit.

## Report
What you corrected (before→after, with the quoted rules/guards) · what you left as-is per rulings 5–6 · the decisions.md flag from ruling 5. **Max two attempts** per step, then halt and report.

**TEST/DEV only. Savepoint "Before UM audit corrections" made. `buildprint check` after each task. Do not push to live.**
