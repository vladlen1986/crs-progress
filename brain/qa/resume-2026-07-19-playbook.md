# Resume — 2026-07-19 · Playbook program mid-flight (Windows → Mac handoff)

> **✅ COMPLETED on the Mac, 2026-07-19.** Zebra probe 10/10 twice (agent + independent verifier), PLAYBOOK.1–6 appended (216 rows: 204 PASS / 12 ENV-LIMITED / 0 FAIL), checkpoint at brain/qa/checkpoints/playbook.md, T5 logged-out evidence in brain/qa/evidence/2026-07-19-t5/. Probe-design fix (allowlist-safe `node --zebra-hello`) baked into the committed rig script. Program CLOSED — this file is historical.
> Still on Vlad: `buildprint link <token>` on the Mac (CLI installed at 4.2.7, Unauthorized) · .bp-test-user creds · GitHub push auth on the Mac (no gh login / SSH key — commits are local until then).

> Paste the Playbook program prompt again on the Mac and point the session here FIRST.
> Everything below is committed & pushed. App: `cd crs-brain && npm install && node server.js` → :4317.
> Buildprint CLI: linked on the Windows PC; Mac may still be Unauthorized (`buildprint link <token>`).

## Program position (Playbook = self-learning made law; commits `playbook: <task>`)

**DONE & COMMITTED:**
- T0 (landed in the prior session): distiller + tool-RESULT capture (`⇒ ✗ …` tails into step bodies) + auto-distill on learnable bp turns; synthetic positive + dedup-negative tests both proven.
- T1 store: `crs-brain/data/playbook.json` — schema {id, category(platform-gotcha|cli-bug|workspace-rule|design-pattern|verification|decision-pointer), trigger, rule, fix, errorSig, source, hits, lastHit, recurred, status}. One-time migration ran: the 7 operational memory seeds moved in (memory.json now holds only human facts / "remember this"). Distiller (`distillLessons`) now outputs this schema + learn-events.
- T2 injection: `matchLessons()` (trigger keywords) → matched subset appended to bp systemPrompt via `playbookBlock()`; VISIBLE lifeStep "Playbook check — N lessons loaded" (expandable) / "— clean"; `stampLessonHits()`; gen endpoint (`/api/modules/edit-prompt`) injects matched traps into intents (returns `playbook: N`).
- T3 recurrence machinery: `normalizeErrSig()`, injectedLessons tracked per turn; onToolResult ✗ error matching an INJECTED lesson's errorSig → `markRecurrence()` = warning notification + What's-wrong todo (`pb-recur:<id>`) + lesson.recurred++ + learn-event.
- T4: BP_PROMPT visual DoD hardened (authenticated `.bp-test-user` path, logged-out state captured when reachable, BOTH theme images embedded or it's a contract violation).
- T6 surfaces: `crs-brain/public/playbook.html` (grouped by category, rule/fix/trigger/hits/recurrences/source, Edit/Retire/Reactivate/Delete via POST /api/playbook); APP_SURFACES + ⌘K command "Playbook — what the brain knows"; dashboard What's-wrong "Playbook — top traps" strip from `dash.playbook.recurredThisWeek`.
- Vlad's toast addendum: learn-events (`data/learn-events.jsonl`, GET /api/learn-events?since=) + top-right expandable toasts in index.html (🧠 Learning/Learned · ⚡ Applying knowledge · ⚠ Known mistake repeated; learning-clean logged but silent; expand → full-height panel).
- Endpoints: GET/POST /api/playbook (edit/retire/delete/add), GET /api/learn-events.

**VERIFIED LIVE so far (rig run 1, `verify-playbook.js` — script committed under brain/qa/rig-scripts/):**
- P1 "Playbook check — 1 lesson loaded" visible step ✔ · P2 hits 0→1 on injection ✔ · playbook.html renders both themes ✔ · retire/edit persist ✔ · migration ✔ · learn-events written + served ✔ (file + endpoint confirmed) · zero console errors ✔.
- **Remarkable side-finding: prevention WORKS** — the recurrence test asked the session to run `python --version`; the injected lesson made it refuse/avoid, so no error occurred. The Playbook prevented the planted mistake, which invalidated the recurrence probe.

**REMAINING (next session picks up EXACTLY here):**
1. Run `brain/qa/rig-scripts/verify-playbook2.js` (copy into the machine-local `qa-scratch/rig/` first; needs puppeteer-core + Chrome — rebuild rig per resume-2026-07-18 pattern, sanity-prove on a known-PASS row). It was WRITTEN but NOT RUN (user interrupted). Design: temp synthetic lesson (trigger `zebra`, neutral rule that doesn't forbid the command, errorSig `'zebra' is not recognized…`) → bp turn "run `zebra --hello`" → proves R1 injection, R2 ⚡ toast DURING turn, R4 recurrence stamped, R5/R6 ⚠ toast + expand, R7 todo, R8 real-turn ✗ tails, R9 dash strip via API (not text-match — run 1's P9 text-match was a FALSE POSITIVE, template source matched). Cleans up after itself.
2. If green: independent verification subagent (program's Verify list), then rows PLAYBOOK.1–6 appended to brain/qa/master-checklist.md, checkpoint + final report per the program prompt.
3. T5 close-out: root cause already CONFIRMED + RULED (decisions.md 2026-07-19 — anonymous sign-in dark BY DESIGN; lesson + decision-pointer already in playbook.json). Still owed: evidence captures (agent-browser logged-out shots of crsapp.live/version-test) archived as evidence; logged-in light capture parked on `.bp-test-user` creds (Vlad's homework — form sign-in path documented in BP_PROMPT).
4. Toast timing note: applied-toast fires at turn START and auto-dismisses in ~11s — any probe must sample DURING the turn.
5. Known open homework (unchanged): .bp-test-user creds · Buildprint login Windows bug todo · UM audit ingest + HIGH role-escalation fix · pilot chunk reports · Tailscale · review digest ratification.

## Checklist truth right now
208 rows: 196 PASS / 12 ENV-LIMITED / 0 FAIL (ASK.1–6 landed; PLAYBOOK.1–6 pending the rerun above).

## Environment notes for the Mac
- qa-scratch/rig is machine-local (gitignored) — rebuild: `npm init -y && npm install puppeteer-core` + Chrome path; rig scripts to copy live in brain/qa/rig-scripts/.
- agent-browser 0.32.2 + buildprint 4.2.7 are installed/linked on the WINDOWS PC only.
- settings.json: model=auto (task routing), effort=max (deep lane). Ask Protocol + model visibility + attachment previews + image viewer/native-fullscreen/hover-actions all live (see ASK.*, MODELVIS.1, ATTACH.*, IMGVIEW.* rows).
- Server data to expect: playbook.json (7 lessons + hits/1 from the live test), learn-events.jsonl, standing-answers.json (1 retired test rule), ask-log.jsonl.
