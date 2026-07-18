# Program Prompt — Steps 2+3 combined (verbatim, authoritative)

> Persisted per the context-survival protocol. If context is ever compacted, truncated, or the session restarts: re-read THIS file, then program-progress.md, then program-state.md, then the master checklist — and resume. This file, not memory, is the program.

---

Claude Code Prompt — Steps 2+3 combined: Prototype→BP Chunker + Chief-of-Staff Dashboard

Two phases became five — the full remaining chief-of-staff stack in one governed run. HARD PHASE GATE: a phase is COMPLETE only when its verification subagent reports every acceptance item PASS (or quarantined with a written root cause), the work is committed, and a checkpoint report is written. Only then may the next phase begin. No parallel phase execution, no "starting ahead on the easy parts" of a later phase — sequential by contract. Every phase follows UNDERSTAND → written PLAN → IMPLEMENT → TEST/FIX → independent VERIFY → COMMIT → CHECKPOINT (see Per-phase discipline below), and the context-survival protocol keeps the run alive across compaction, restarts, and usage limits — nothing is ever lost at 1M tokens. Commits: `<phase>: <task>`. Design per `CRS-design-system.md`, both themes.

## Subagent strategy (maximize, correctly)

Run-start parallel read-only fan-out — one message, multiple Task invocations: (a) the engine's as-built interfaces (assemble/guard/gen, bundle format, archive); (b) the design-system export's style-name inventory for the mapping pass; (c) prototype files' current home + how the HTML fullscreen window opens them; (d) current dashboard code + every state file that will feed the new one (STATUS.md, decisions.md [OPEN] entries, modules.json, master-checklist statuses, sync last-run stamps, wishlist.json, notification registry); (e) pick + brief the sample prototype for acceptance. During implementation: single-writer on shared files; standalone new files parallel-safe; an independent verification subagent runs each phase's acceptance list — no self-grading. Micro-loop per phase (implement → verify → fix, max 3 cycles, quarantine + report).

## Context-survival protocol (do this FIRST, before anything else — the run must outlive your context window)

1. First action of the run: save THIS prompt, verbatim and complete, to `brain/qa/program-prompt.md`. Commit (`p0: persist program prompt`). The file in the repo is now the authoritative program — if your context is ever compacted, truncated, or the session restarts, you re-read it from disk, never from memory.
2. `brain/qa/program-progress.md` is your working memory, updated after EVERY task (not every phase): current phase + task, what was just completed (one line + commit id), what is next, open threads / half-finished thoughts, any in-flight subagent results not yet acted on. Commit it together with each task commit. Write it as notes to your future self who remembers nothing.
3. On any restart or compaction: re-read, in order — `program-prompt.md` → `program-progress.md` → `program-state.md` → the master checklist — then resume from the exact recorded position. Zero re-doing of committed work, zero guessing at where you were. If the progress file and git log disagree, git wins; note the discrepancy.
4. Usage-limit pause = finish the current task, update the progress file, stop. The three files above ARE the handoff — no separate continuation file needed mid-program.

## Per-phase discipline (this sequence, every phase, no exceptions)

UNDERSTAND → PLAN → IMPLEMENT → TEST → FIX → VERIFY → COMMIT → CHECKPOINT → next. Understanding means the Phase-0 comprehension (below) plus that phase's targeted recon. The PLAN is written INTO program-progress.md before the first edit — numbered steps, files to touch, risks — using extended/long thinking for the planning step; if implementation needs to deviate from the written plan, update the plan first, then deviate. TEST/FIX loops until the phase's own checks pass, THEN the independent verification subagent runs the acceptance list; only its green (or written quarantine) opens the gate to the next phase.

## PHASE 0 — Deep comprehension of the current app (before ANY plan, before ANY edit)

This program lands on a large, living system built across many prior passes. You do not touch it until you understand it as-built — not as-documented.

1. Full-codebase read, parallel: fan out read-only subagents across the entire repo — server.js end to end (every endpoint, the scheduler, guards), public/ (the index.html monolith by region: window manager, explorer, chat, dashboard, tree, sounds/notify, editors/viewers), the engine (assemble/guard/gen as actually built), all state files, brain/design/, brain/bubble/, brain/qa/. Each agent returns: what this region does, its public interfaces, its quirks/hacks, and anything that contradicts the docs.
2. Refresh `brain/design/app-map.md` into the as-built truth: module map, data flows (who writes which state file), the window/notify/sound APIs other code must call, known fragile spots. Where the map and reality disagreed, the map is corrected and the disagreement listed.
3. Reconcile against the program: walk Phases 1–10 against the as-built map — mark anything already partially existing (gate it like the master program taught: DONE parts verified, not rebuilt), anything whose stated approach conflicts with how the app actually works (propose the adjusted approach in the progress file, flag it in the checkpoint — do not silently improvise later).
4. Phase 0 output = the refreshed app-map, the reconciliation notes, and the written Phase-1 plan. ACCEPTANCE: the verification subagent spot-checks 5 app-map claims against the code (must hold), and the reconciliation lists every pre-existing overlap. Only then does Phase 1 begin.

## PHASE 1 — Prototype → BP chunker (the translator)

### 1.1 Prototype lifecycle (minimal — no visual editor)

`prototypes/<name>/` = the html + `proto.json` `{name, module, status: draft|settled|built, settledHash, created, notes}`. Brain UI: prototype cards (explorer + dashboard panel) — open in the existing HTML fullscreen window; "Mark settled" freezes the file hash into proto.json; editing a settled file reverts to draft with a warning. Chunks generate ONLY from a settled hash.

### 1.2 Mapping pass — where drift dies

`brain chunk <name>` first writes `prototypes/<name>/mapping.md`: every CSS `var(--…)` → token → existing Bubble style name from the export (find-first); every detected component → §20 family + existing reusable/style IDs; every interaction the prototype demonstrates, inventoried. Every literal NOT in canon → a FLAGGED row (value, location, nearest token). Chunking REFUSES while unresolved flags exist — I resolve each (map / approve-as-literal / fix prototype). The chunker never invents a token, style, or approval.

### 1.3 Chunk plan

`build-plan.json`: dependency-ordered BP-sized chunks — (1) styles that must exist (create + showcase rule) → (2) layout/containers → (3) components per section (reusables cloned by ID, never recreated) → (4) states/conditionals (full style swap only) → (5) workflows → (6) data bindings. Each chunk: `{id, title, scope IN/OUT, dependsOn, producedNames, status: pending|sent|verified|failed}`. Sized err-small (~one component family or section). Contract validation before the plan writes: a chunk references only earlier producedNames or export IDs — hand-broken plans are rejected.

### 1.4 Emission through the engine

`brain chunk <name> --emit <id>` (+ per-chunk Generate in UI) → the engine's `gen` with the chunk scope as intent + the module: verbatim bundle, GUARD (ANY chunk touching an [OPEN] decision stops the WHOLE plan with DECISION-NEEDED, zero chunks emitted), the standard BP template (TEST wrapper, reusables by ID, [NEG] manual list), archive stamped with bundle hash + prototype hash + chunk id. The chunk prompt embeds its mapping rows verbatim + the exact producedNames it must create.

### 1.5 Follow-through

Per-prototype chunk list: copy-prompt (→ status `sent`), paste-back field saving BP's report to `chunks/<id>-report.md`, I mark verified/failed, failed chunks get a regenerate-with-corrections slot. All chunks verified → prototype `built`.

### Phase 1 acceptance (verification subagent; prove, don't claim)

1. Full flow on the sample: settle → mapping cites real export style names; a PLANTED off-canon literal appears FLAGGED and blocks chunking until resolved.
2. Plan validates; a deliberately broken reference is rejected.
3. Chunk-1 emission: complete BP prompt, TEST wrapper, at least one real existing ID cited, mapping rows embedded verbatim, [NEG] list present, archive carries both hashes.
4. GUARD plan-stop: a scope touching the open Pattern A decision → DECISION-NEEDED, zero chunks.
5. UI: settle → plan → copy → sent → paste fake report → saved → verified → card shows 1/N. Both themes, zero console errors. Append CHUNKER.1–5 to the master checklist.

## PHASE 2 — Chief-of-Staff dashboard (replaces the file-count screen)

### 2.1 Data rule

Rendered EXCLUSIVELY from state files: tasks store (new, below), STATUS.md, decisions.md `[OPEN]`, modules.json, build-plan.json statuses, master-checklist counts, sync last-run stamps, wishlist.json. No Bubble-graph introspection, no raw JSON shown to me, no file counts. Everything on screen answers: what stage am I at, what's in flight, what needs me, what's wrong, what synced.

### 2.2 Todos & follow-ups (the loop that chases things)

1. `data/tasks.json`: `{id, title, status: todo|doing|blocked|done, due?, followUp?, link?: {kind: module|prototype|chunk|decision|wishlist, ref}, created, notes}`.
2. Dashboard Todos card: add inline, check off, status cycle, linked entities render as chips that OPEN the thing (module → tree, chunk → its prototype panel, decision → decisions.md in a document window). Overdue follow-ups float to top with warning styling.
3. Auto-generated follow-ups (chief-of-staff behavior): chunk marked `sent` → auto follow-up "await BP report: <chunk>" (due +1 day); GUARD DECISION-NEEDED → auto todo linked to that decision; QA quarantine entries → auto todos; sync failure → auto todo. Auto items close themselves when their source resolves (report pasted, decision tagged [LOCKED], row passes). Follow-up due → `notify()` through the notification system.
4. Chat integration: "add todo <text>" in the brain chat creates one (through the tasks store, not freelance).

### 2.3 The board (executive layout, §20 cards)

Row 1 — Now: current focus module (from tree), in-flight build plans with chunk progress bars, tasks `doing`. Row 2 — Needs me: Decisions-needed (each with "open decisions.md" action) · overdue follow-ups · unresolved mapping FLAGs. Row 3 — What's wrong: failed chunks, checklist FAIL/quarantine, sync failures, ENV-LIMITED needs-eyes list. Row 4 — Synced & background: forum/release/manual last-sync stamps + new-item counts, QA cycle status, the existing Digest + Sync action cards (they stay). A compact Progress Tree summary tile (counts + focus) linking to the tree. Empty states per CRS pattern; every figure JBMono; labels Inter Tight; zero decorative filler.

### Phase 2 acceptance (verification subagent)

1. The old dashboard's file-count/introspection content is GONE (grep the rendered DOM); every displayed figure traces to a named state file (report the mapping).
2. Todos: add via UI and via chat command → both persist; link chip opens the target; overdue follow-up floats + fires notify.
3. Auto follow-ups: mark a chunk sent → follow-up appears; paste its report → auto-closes. Trigger a GUARD stop → decision todo appears linked.
4. Needs-me and What's-wrong rows populate from planted fixtures (one FLAG, one quarantine row, one failed sync) and clear when fixed.
5. Both themes getComputedStyle spot-checks; zero console errors; append DASH.1–5 to the master checklist.

## PHASE 3 — Prototyping studio (job 2: iterate designs INSIDE the brain)

### 3.1 Scaffold from canon

"New prototype" (dashboard + explorer context menu): creates `prototypes/<name>/` with `proto.json` (draft) and an html scaffold that injects the design system's real `:root` token blocks (dark+light, verbatim from the canonical doc — assembled by script, never retyped) plus a minimal starter shell (theme toggle wired to `data-theme`, base type styles, an empty stage). Optional starter templates: blank / card grid / form panel / table view — each built ONLY from §20 component patterns, zero invented styling.

### 3.2 Live iteration loop

Editing a draft prototype (via the Tier-1 editor, via chat/Claude edits, or externally) live-reloads the open fullscreen preview window (file-watch or poll — match the app's zero-dep pattern; state which). The preview window gains a slim prototype bar: version label, theme toggle, "Snapshot", "Mark settled".

### 3.3 Versions & notes

"Snapshot" copies the current html to `versions/v<N>.html` with an optional one-line note in proto.json; a version list in the prototype panel opens any version read-only side-by-side with current (two windows), and "Restore" copies a version back to draft (itself snapshotted first — nothing is ever lost). This replaces my ad-hoc "v2-final-final.html" file juggling.

### Phase 3 acceptance

1. New prototype from scaffold → tokens in the file are byte-identical to canon (diff against the assembled token block — the engine's stale-token grep applies here too); theme toggle works in the preview.
2. Edit the draft in the Tier-1 editor → preview reloads without manual refresh; external edit (touch the file) → same.
3. Snapshot ×2 → versions listed with notes; open v1 beside current (two windows); Restore v1 → current becomes v1, prior current preserved as a new snapshot automatically.
4. Settled prototypes refuse silent edits from the studio UI too (Phase-1 rule holds everywhere). Both themes, zero console errors. Append STUDIO.1–4 to the master checklist.

## PHASE 4 — Buildprint CLI bridge: `--send` (the paste-transport retires)

### 4.1 Preconditions (hard-stop check first)

Verify the buildprint CLI is installed AND linked on THIS machine (`buildprint --version` + an auth-touching read command). Not linked → STOP the phase, mark ENV-LIMITED with the exact command + what you need from me, and proceed to Phase 5's non-CLI path. Never mock the CLI.

### 4.2 Send a chunk

`brain chunk <name> --send <chunkId>` (+ a Send button beside Copy in the chunk UI): pipes the emitted chunk prompt to the buildprint CLI against the TEST branch only, honoring the CLI's plan-before-apply flow; refuse to send any chunk whose prompt lacks the TEST wrapper (belt and braces). One chunk in flight at a time — a second send queues, never parallel; BP sessions don't interleave.

### 4.3 Capture the report

CLI output is captured verbatim to `chunks/<id>-report.md` automatically; status flips `sent → reported`. `verified` remains EXCLUSIVELY mine — the bridge automates transport, never judgment. The dashboard auto-follow-up becomes "review BP report: <chunk>" and closes when I mark verified/failed.

### 4.4 Safety

The GUARD still runs at emission (unchanged). Any CLI error surfaces verbatim via `notify('sync-failed'…)` + `failed` status — no swallowed errors, no auto-retry (failed = failed, I decide).

### Phase 4 acceptance

1. Precondition check demonstrably ran (paste the version/auth output — or the honest ENV-LIMITED stop).
2. Send the smallest real chunk: CLI invoked, TEST branch visible in the transcript, report captured verbatim beside the chunk, status `reported`, dashboard follow-up updated.
3. Refusals: no-TEST-wrapper chunk → refused before the CLI; second send mid-flight → queued; a forced CLI error (dry test) → `failed` + notify, zero retries. Append BRIDGE.1–3 to the master checklist.

## PHASE 5 — End-to-end pilot + loop-to-green (the integration proof)

### 5.1 The pilot

Run ONE small real prototype through the ENTIRE pipe: scaffold in the studio → iterate (≥1 snapshot) → Mark settled → mapping pass (resolve real flags with me listed as resolver — plant nothing this time) → build-plan → emit chunk 1 → send via the bridge if Phase 4 is live, else the copy path → BP report captured → leave `verified` pending for me — do not self-verify → the dashboard shows plan progress and the follow-up lifecycle live. Pick the smallest real prototype in the repo and say why you chose it.

### 5.2 Loop to green

Append every new check (CHUNKER, DASH, STUDIO, BRIDGE, pilot rows) to `brain/qa/master-checklist.md`, then run the standing QA loop over the FULL checklist — parallel verify fan-out, serial fixes, full re-verify per cycle — until two consecutive 100%-PASS runs (quarantine after 3 cycles with root cause; ENV-LIMITED rows into my needs-eyes list). The five-job stack is not "built" until the loop says so twice.

### Phase 5 acceptance

End-to-end artifact trail exists (proto.json history, mapping.md, plan, chunk archive with both hashes, report file, my pending-verify follow-up) · two consecutive green runs logged with per-cycle FAIL counts trending to zero · quarantine + needs-eyes lists as my only homework.

## PHASE 6 — First production run: the User Management audit through the pipe (the brain does its real job)

The pilot proved the machinery; this phase points it at the actual product. The combined UM audit prompt already exists in the generated-prompts archive (um-audit-combined — locate it; if absent, regenerate via `brain gen` from its intent, engine rules apply).

1. Send the audit through the Phase-4 bridge (read-only prompt, TEST branch; copy path if the bridge is ENV-LIMITED). Capture `um-audit-report.md` verbatim into the archive next to the prompt.
2. Ingest: parse the report's machine JSON block → apply deltas to `modules.json` + the STATUS.md UM slice (the ingest path from the standard — diffs shown, committed as `p6: ingest um-audit`). The scorecard's FAIL/MISSING rows → auto todos linked to the UM module; the [NEG] manual-test list → my needs-eyes todos.
3. The decision surfaces properly: the report's Decisions-needed section (Pattern A / User company field first among them) → each becomes a `decision` todo linked to its decisions.md `[OPEN]` entry, flagged in the dashboard's Needs-me row, `decision-attention` notification fired. You do not resolve any of them — the GUARD keeps blocking dependent generation until I tag them [LOCKED].
4. Phase completes at: audit sent + report captured + deltas ingested + todos/decisions raised + a checkpoint report telling me exactly what awaits my ruling and what the first post-decision `brain gen` intents will be (written as drafts, NOT generated). My ruling is not part of your gate — surfacing it correctly is.

### Phase 6 acceptance

Report file exists verbatim · modules.json/STATUS diff committed and consistent with the report · every scorecard FAIL has a linked todo · Pattern A decision todo present, linked, notified · guard demonstrably still blocks a UM-scoping intent · zero state edited beyond the ingest diffs. Append P6.1–5 to the master checklist.

## PHASE 7 — Scheduled operations + state self-audit (the brain runs itself)

1. Daily (reuse the existing scheduler; use `/schedule` routines instead only if genuinely available and say so): the three Bubble syncs (already built — verify wired) + a NEW state-consistency audit: cross-check modules.json ↔ STATUS.md ↔ Progress Tree data ↔ build-plan statuses ↔ open todos' links. Any mismatch (module Done in one file, In-progress in another; a plan chunk `verified` whose todo is still open; a todo linking a deleted entity) → auto todo in What's-wrong + one `warning` notification summarizing count. Read-only: the audit reports drift, it never auto-reconciles.
2. Weekly digest, real this time: auto-compile `brain/digests/YYYY-WW.md` — what shipped (commits by prefix), checklist trend (PASS/FAIL/quarantine counts vs last week), open decisions with AGE (a decision open >14 days gets called out), sync highlights, oldest untouched todos. Rendered as a dashboard card + `info` notification; the old manual Weekly-digest action now opens the latest one.
3. Scheduled smoke QA: a marked ~20-row critical subset of the master checklist (window system, engine determinism grep, guard block, sync buttons, notify matrix sample) runs on the daily schedule; failures → todos + notification. The FULL loop stays on-demand only — scheduled jobs never auto-fix anything.

### Phase 7 acceptance

Plant one deliberate state mismatch → next audit run raises the todo + notification, and does NOT edit either file · a generated weekly digest exists with all five sections populated from real data · smoke subset marked in the checklist and a scheduled run's log shows it executing · scheduler survives restart (stamps) · all schedules provably read-only (git status clean after a full scheduled cycle except digest/todo/notification state files). Append P7.1–5.

## PHASE 8 — Self-documentation + resilience (the brain survives me, machines, and time)

1. `brain handoff` (command + dashboard button): auto-generates the machine-transfer continuation file — current phase/loop state, in-flight work (wip commits listed), resume point, env caveats (CLI linked?, needs-eyes rows), conventions pointer — modeled on the Mac↔Windows handoffs that worked, then commits and pushes. Acceptance: generate one and diff it against reality (every claim traceable to a file or commit).
2. USER-GUIDE.md — written from the BUILT system, not aspiration: the six flows I actually use (prototype→settle→chunks→send→verify · todos/follow-ups · decisions workflow · sync + digest · notifications/sounds config · explorer/windows essentials), each as a short numbered walkthrough with the real commands/buttons. A "troubleshooting" section from the quarantine + judgment-calls history. Verification subagent follows the guide literally, step by step, on the running app — every step must work as written or the guide gets fixed.
3. Restore drill (backup proven, not assumed): fresh clone to a temp dir → `npm install` → start → the app runs with full state (tree, todos, checklist, prototypes, sounds regenerate). Any state that did NOT survive the clone (gitignored, machine-local) gets explicitly listed with a mitigation (commit it, regenerate-on-boot, or documented as ephemeral). Paste the drill transcript.
4. Review digest for me: compile `brain/design/judgment-calls.md` + retrieval-transparency events + all quarantines into ONE review document, grouped, each item with accept/reverse checkboxes — my single sit-down to ratify every autonomous call the system has made.

### Phase 8 acceptance

Handoff file generated + reality-diffed clean · guide walkthrough executed by the verifier with zero broken steps · restore drill transcript with the survived/ephemeral table · review digest exists and every autonomous call of record appears in it. Append P8.1–4 · then run one final full loop pass to two consecutive greens INCLUDING P6–P8 rows. STOP.

## PHASE 9 — Production throughput: the factory runs on real CRS work (queue-driven, limit-aware)

The pipe exists; now it carries sustained real load. Preconditions decide scope honestly: if I have tagged the Pattern A decision `[LOCKED]` by the time this phase starts, the P6 drafted UM fix intents are IN scope; if it's still `[OPEN]`, the GUARD keeps them blocked (correctly) and this phase runs on unblocked work only — state which path applied, never nag me mid-run.

1. Load the task queue with the real backlog as discrete intents: the unblocked P6 audit-fix items (each scorecard FAIL that doesn't touch an open decision), and the kickoff intents for the next foundation module in the Progress Tree (Fiscal Week Management — its own DT/permission notes come from its brain detail, through `brain gen`, not from your imagination).
2. The runner works the queue end-to-end: per intent — gen (engine) → send (bridge; copy-path fallback) → report captured → status `reported` → dashboard follow-up for my verification. Sequential, one BP session at a time, the standing Buildprint safety gate on every prompt. `verified` stays exclusively mine — the factory produces, I accept.
3. Prove limit-aware endurance: the run must cross at least one usage-limit window for real — queue flips to `blocked-limit`, reads the reset, resumes automatically, nothing lost, nothing duplicated (the archive hash check proves no re-send).
4. Throughput telemetry on the dashboard: intents processed, chunks awaiting my verify, average intent→reported time, limit blocks survived — JBMono figures on the Now row, rendered from the queue log, not estimated.

### Phase 9 acceptance

≥5 real intents processed end-to-end with full artifact trails · one genuine limit block + auto-resume in the log · zero GUARD bypasses (any blocked intent still blocked, listed) · my pending-verify list matches the reported chunks exactly · telemetry figures reconcile to the queue log. Append P9.1–5 to the master checklist.

## PHASE 10 — Remote command post: run the brain from my phone (night-shift mode)

I work nights away from this machine. The decisions, verifications, and alerts should reach me anywhere — securely, read-mostly.

1. Secure tunnel: expose the local server via an authenticated tunnel — recon picks between Tailscale (preferred if installable: identity-based, no public exposure) and cloudflared as fallback; state the choice + why. Server-side auth regardless of tunnel: a bearer token required on EVERY endpoint (the tunnel is transport, not auth); token stored in an env/gitignored file, rotation documented; unauthenticated requests rejected with zero information leak. All existing path guards re-verified through the tunnel (probe `../` remotely).
2. Mobile layout (responsive subset, not the whole app): at phone width the app serves the command post — Now / Needs-me / What's-wrong cards stacked, the notification bell + inbox, todo check-off, and two deep flows: read a chunk's BP report → mark verified/failed (buttons, confirm), and read an [OPEN] decision's full entry → either tag it [LOCKED] with a typed confirmation phrase or leave a note-to-self todo. Touch targets ≥44px, both themes, sounds respect the device.
3. Explicitly OUT on mobile v1: file editing, prototype studio, chunk sending, settings, explorer file operations — reading and ruling only. The desktop stays the workshop; the phone is the situation room.
4. Remote actions flow through the SAME endpoints and state files (no mobile-only side channel); every remote `verified`/`[LOCKED]` action lands in the audit trail with a `via: remote` stamp.

### Phase 10 acceptance

Tunnel live + choice justified · unauthenticated and bad-token requests rejected (paste both refusals) · remote `../` probe rejected · on a real phone (or exact viewport emulation, say which): check off a todo, mark one chunk verified, read one decision and leave the note — all three land in the state files with the remote stamp and fire their notifications · nothing from the OUT list reachable at phone width · both themes. Append P10.1–5, run the final loop to two consecutive greens including P9–P10 rows, and STOP — the program is complete.

## Final report

Per-phase checkpoint reports (gate proof: acceptance PASS list from the verification subagent, commit ids) · Phase-1 artifacts (mapping.md, plan, chunk-1 output, guard transcript) · Phase-2 state-file→widget mapping table · Phase-3 scaffold token diff · Phase-4 CLI transcript or ENV-LIMITED stop · Phase-5 pilot trail + loop greens · Phase-6 audit ingest diffs + the decisions awaiting me · Phase-7 planted-mismatch catch + a real weekly digest · Phase-8 handoff file, guide-walkthrough result, restore-drill transcript, the review digest · Phase-9 queue log with the limit-block resume + telemetry reconciliation · Phase-10 tunnel choice, the three remote actions' audit-trail entries, and the security refusal transcripts · judgment calls · quarantine + needs-eyes lists — my only homework. Nothing skipped silently, ever.
