# Post-decision `brain gen` intent drafts — User Management (P6, pre-report)

> DRAFTS ONLY — written 2026-07-18 by the Steps-2+3 program, per Phase 6.4 ("written as
> drafts, NOT generated"). Refine against the audit report once it lands; regenerate each
> through the engine (guard will pass only after the referenced [OPEN] stubs are resolved).

## Blocked on: Company/Property own-table privacy-rule shape (Pattern A exceptions)
1. "Apply the ruled own-table privacy shape to 01 Company and 01.1 Property; quote each privacy rule verbatim in the report and confirm no business DT regressed to company-only checks" — module: user_management.
2. "Bring the User Management privacy rules to full Pattern A (company AND property) per the ruling, module-by-module batch 1 per the rollout-order decision" — module: user_management. (Also blocked on: Pattern A rollout order & batching.)

## Blocked on: Permission matrix vs checklist for view-only gates
3. "Build the UM view-only gating per the ruled matrix/checklist shape; wire role gating for card view/profile/edit buttons" — module: user_management.

## Unblocked candidates (no [OPEN] stub touched — can generate as soon as the audit's scorecard confirms the gap)
4. "Fix any FAIL rows the audit scorecard reports in UM UI/UX dimensions (buttons, empty states, theme pairs) without touching privacy rules or permission gating" — module: user_management.
5. "Add the missing audit-log writes for UM admin actions per the ActivityLog async-write pattern" — module: user_management (verify against the report first — may already exist).
