# Buildprint prompt — per-module audit (read-only)

> Paste the block below into a **Buildprint chat** (or the CRS Brain Buildprint copilot). It produces a
> structured, read-only audit of one or more CRS modules against the **live Test branch**, rating each
> module on the Core-7 / full-18 dimensions and running the STRUCT/POS security checks. Output is shaped to
> drop straight into `brain/STATUS.md` and the Progress Tree (`crs-brain/data/modules.json`).
>
> **Guardrails (from decisions.md 2026-05-01 + crs-brain-operations.md):** Test branch ONLY, never Live.
> Read-only — this audit makes NO changes. `buildprint sync` first. Never `apply` / `--force-apply` / `sync --reset`.
>
> Set the scope on the first line: `ALL` for every module, or a comma-separated list
> (e.g. `User Management, Fiscal Week Management`).

---

```
AUDIT SCOPE: ALL        # or: User Management, Reporting, ...

You are auditing the CRS Bubble app on the TEST branch. READ-ONLY: make zero changes — no apply, no
force-apply, no sync --reset. Run `buildprint sync` first (pull the latest snapshot), then work only from
the shredded workspace files (data_types/, pages/, option_sets/, api/, settings/, styles/) and `buildprint`
read commands (summary, tree, context, find, audit).

CONTEXT (read before auditing):
- Architecture is Pattern A (strict multi-tenant): every BUSINESS data type must carry BOTH `company` and
  `property` fields, and every privacy rule's isolation check must be
  `Current User's company = This Thing's company AND Current User's property = This Thing's property`.
  Known exceptions (NOT failures): Company, Property, Subscription, and system-level config types.
- Access is PERMISSION-based: gates read `Current User's role's permissions contains <perm>`.
- The 46 modules and their sections are the locked list in data/CRS_Module_OptionSets.xlsx.
- Reuse the standing security gate in brain/security-test-checklist.md — its STRUCT/POS/NEG tags define
  what you (Buildprint, logged in as OWNER) can vs. cannot prove.

FOR EACH module in scope, produce this audit:

1. IDENTITY
   - Module name + section. Its page/reusable (`# <Name>`), route, and whether it's registered/reachable.
   - The data types it reads or writes (list them by display name + slug).

2. CORE-7 RATING — rate each dimension ✅ done / 🟡 partial / 🔴 missing / ➖ n/a, with one-line evidence:
   UI · UX · DB (fields present, company+property?) · Perms (defined + grouped?) ·
   Privacy (tenant isolation actually built?) · WF-CRUD (create/edit/delete via guarded workflows?) · Theme (dark+light paired styles?).
   Then a single overall module status: done / in-progress / not-started / roadmap
   (done = all Core-7 ✅ AND security [NEG] would pass; in-progress = some built; not-started = only DB/perms scaffolding; roadmap = nothing).

3. SECURITY (STRUCT + POS only — you cannot run [NEG]; list those separately):
   - Privacy rule per business DT: quote the rule. Does it check company AND property? Flag company-only,
     property-only, logged-in-only, public-everyone, or NO RULES.
   - Data API exposure for each DT (exposed → REST-readable regardless of workflow guards). Flag if ON.
   - Every write (create/edit/delete/state-change): is it a private, server-guarded backend workflow
     (`expose:false`, `auth_unecessary:false`) with a permission trigger condition? Quote the guard. Flag any
     UI-only / auto-bind / client-side write.
   - File uploaders: public CDN vs private file. Flag sensitive uploads that are public.
   - Auto-bind on sensitive fields (access/status/money/ownership) → flag.

4. FINDINGS — ranked SECURITY > FUNCTIONAL > POLISH. For each: severity, the exact file/entity/expression,
   and the concrete fix. Then the **[NEG] list a human must run** (second-tenant, property-admin, low-perm),
   with step-by-step instructions per item.

5. DELTA vs the ledger — compare your findings to brain/STATUS.md and note where the tracked status is wrong
   (e.g. STATUS says "done" but a privacy rule is public-everyone).

OUTPUT FORMAT — return BOTH:
(a) A human-readable report grouped by module.
(b) A machine block, fenced as ```json, matching the Progress Tree schema so it can be ingested:
    { "audited": "<date>", "branch": "test", "snapshot": "<buildprint snapshot id>",
      "modules": [ { "id": "<slug>", "name": "<Name>", "section": "<Section>",
        "status": "done|in-progress|not-started|roadmap",
        "core7": { "ui": "...", "ux": "...", "db": "...", "perms": "...", "privacy": "...", "wf_crud": "...", "theme": "..." },
        "security_findings": [ { "severity": "critical|high|med|low", "where": "...", "issue": "...", "fix": "..." } ],
        "neg_tests_todo": [ "..." ],
        "ledger_delta": "..." } ] }

Do NOT invent modules, fields, or rules. If something isn't in the workspace, say "not found" — never guess.
End with: (1) the critical security fails across all audited modules, and (2) which module to harden next.
```

---

## After the audit — feeding it back

1. Save Buildprint's report under `audits/` (e.g. `audits/module-audit-<date>.md`).
2. Hand the `json` block to the CRS Brain (Ingest mode) → it updates `brain/STATUS.md` (Core-7 table + §3)
   and reconciles `crs-brain/data/modules.json` statuses so the Progress Tree reflects reality.
3. Anything that's a DECISION (e.g. "accept Company company-only as a Pattern A exception") → flag to Vlad
   to append to `decisions.md`; never write decisions silently.
4. Security fails feed the Pattern A rollout packet (brain/security.md).

## Narrower variants
- **Security-only sweep (fast):** replace steps 1–2 with "run `buildprint audit` and map each finding to its
  module + DT," keep step 3.
- **Single-module deep dive:** set `AUDIT SCOPE:` to one module and add "expand to the full 18 dimensions
  from brain/STATUS.md §3."
