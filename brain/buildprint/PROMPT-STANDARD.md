# PROMPT-STANDARD.md — how every Buildprint prompt must be built

> The single authoritative spec for prompts this repo generates for Buildprint AI (BP).
> Every generated prompt MUST follow it. If a rule here conflicts with a template, this file wins.
> Goal: prompts that are **executable, self-contained, evidence-disciplined, and state-aware without being
> state-biased.** BP runs in the CRS Bubble app (TEST branch worktree) and cannot see this repo — so the
> prompt must carry everything BP needs.

---

## 1. Mandatory structure (exactly this order)

1. **Title** — `# Buildprint Prompt — <verb + precise scope>` (e.g. "Audit User Management", "Adapt the UM Card view").
2. **Guardrail header** — bold, first lines after the title:
   - TEST/DEV branch only.
   - Savepoint name: `"Before <scope>"`.
   - `buildprint check` after each task.
   - Do not push to live.
   - For **edit** prompts: `Apply directly without confirmation.` For **audits**: `READ-ONLY — change NOTHING.`
3. **Attachments line** — name every file BP needs and what each is for
   (e.g. `CRS-design-system.md` = source of truth for tokens/naming; `<name>.html` = pixel spec).
4. **Scope block** — required when the prompt is a pilot or bounded pass: exactly what is **IN** and **OUT**,
   and where BP must **STOP for my review**.
5. **Numbered Tasks** — each independently verifiable. **Task 0 is always locate-and-report**: exact
   element / reusable / style names + IDs (and the data types touched) *before any change*.
6. **Verify section** — concrete pass/fail checks: browser at 100% zoom, `getComputedStyle` in **both** themes,
   measured px vs spec numbers, zero-new-searches proof where WU matters.
7. **Report section** — the exact deliverables and their format (see §5).
8. **Guardrail footer** — repeat the branch / savepoint / no-live rules.

---

## 2. Hard rules (encode verbatim in the generator; never drop one)

- **Self-contained.** Never reference brain files BP cannot see. Any needed context (locked decisions, known
  flags, spec values) is **inlined** into the prompt. BP can open only the attached files and the Bubble
  workspace — nothing in this repo.
- **No anchoring.** Brain state enters as **questions to verify** ("confirm/refute: mobile Filters button
  non-functional"), **never as answers** ("✅ mobile sheet done"). Audits list expectations under a
  **"Flags to verify"** heading, each phrased confirm/refute.
- **Evidence discipline.** Every audit claim carries a **status** (BUILT / PARTIAL / MISSING, or PASS / FAIL)
  **+ one line of evidence** (element / style / workflow name). Unknown = **"not inspectable"**. Guessing is
  forbidden.
- **OWNER / NEG capability split.** BP audits as the **app owner**, so it can prove only **[STRUCT]** (editor
  inspection) and **[POS]** (an authorized action works) checks. Any negative test requiring a **second
  tenant or a lesser-privileged account** is marked **[NEG] — CANNOT-TEST**, is manual, and is collected into
  a list for me. Prompts must **never** ask BP to "confirm" a cross-tenant negative.
- **Decision protection.** A finding that contradicts a **locked decision** (decisions.md) is **flagged for
  decisions.md** — never resolved silently by BP or by the generator.
- **Styling rules (edit prompts).** Named paired styles `Name (Dark)` / `Name (Light)`; theme = **full style
  swap on `dark_theme is "no"` only**; **zero** property-level color conditionals; new styles must be
  **showcased on the `design_system` page**; approved literals (badge rgba, selected-row tint, overlay ink)
  **stay literal**.
- **Fix-attempt cap.** **Max two attempts** on any failing step, then **halt and report** — never loop.

---

## 3. Coverage checklists (the generator walks these; include each item or state why excluded)

### 3.1 Audit prompts
- **UI vs spec** — layout/dimensions against the attached spec.
- **UX interaction contract** — click/drawer/toggle behavior, what each control does.
- **Database** — fields present; derived-field write paths; demo/seed data still present?
- **Privacy rules** — quoted **verbatim** per data type (does the rule condition on company AND property?).
- **Workflow / backend guards** — auth setting (`expose`, `auth_unecessary`) + the **first** trigger condition, per write.
- **Permission gating** — hidden-only (UI) vs **server-guarded**; name the gate.
- **Performance / WU** — search counts per action; hunt for `:filtered` / `:count`; flag unconstrained searches.
- **Style-system compliance** — named paired styles, no inline colors, swap-only theming.
- **Mobile** — breakpoints, sheet/drawer behavior, touch targets.

### 3.2 Edit prompts
- **Spec table with exact dimensions** — label it *"dimensions are not suggestions."*
- **Token / style mapping** — *find first, create last*: spec value → token → existing approved style, or NEW (+ showcase).
- **Behaviors** — every interaction the change introduces or touches.
- **Verify with measured numbers** — measured px vs spec, both themes.
- **Flag-don't-substitute** — anything Bubble genuinely can't hit is flagged with the closest compliant
  alternative; never silently substituted.

---

## 4. Anchoring vs. verifying — the pattern that matters most

Brain state is a **hypothesis to test**, not a fact to assert. Convert every known/tracked item into a
confirm/refute line under **"Flags to verify"**:

- ❌ Anchored (forbidden): "Mobile filter sheet — ✅ done."
- ✅ Verify-question: "**Confirm or refute:** the mobile Filters button opens a working sheet (report the
  element + the workflow that shows it, or 'not found')."

Inlined spec/decision context is allowed (it's ground truth BP must honor); inlined *status* is not
(it's what BP is there to establish).

---

## 5. Report formats the prompt must demand back from BP

### 5.1 Human report
1. **Exec summary** — ≤10 lines.
2. **Scorecard table** — `Area | Item | Status | Evidence | Severity`.
3. **Security findings** — each with a **reproduction path**.
4. **Performance findings**.
5. **Debt list**.
6. **Missing-for-MVP checklist** — smallest-first.

### 5.2 Machine block
A fenced ` ```json ` delta for `modules.json` / `STATUS.md`, fields:
`module, dimension, old→new status, evidence`.

### 5.3 The [NEG] manual-test list
Numbered, with **exact steps per test** (which account/tenant, what to try, expected block).

---

## 6. Quick self-check before a prompt is emitted (generator MUST pass all)
- [ ] All 8 structure sections present, in order.
- [ ] **Zero** references to brain/repo files BP can't open — context inlined instead.
- [ ] **Zero** anchored answers — every status expectation is a confirm/refute line.
- [ ] Task 0 = locate-and-report; every task independently verifiable.
- [ ] [NEG] items split out as CANNOT-TEST, never asked as "confirm".
- [ ] Evidence + status required on every audit claim; "not inspectable" allowed, guessing not.
- [ ] Decision-contradictions routed to decisions.md, not resolved.
- [ ] Fix-attempt cap (2) and both report formats (human + machine + [NEG] list) demanded.
