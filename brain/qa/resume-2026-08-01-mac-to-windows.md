# Resume — 2026-08-01 · Mac → Windows handoff

> **⛔ GATE FIRST: nothing below reaches the Windows PC until the Mac pushes.**
> The Mac has NO GitHub auth (no gh login, no SSH key, empty keychain). ~130 commits
> on `main` are local-only, plus `dev` (8) and `mac-breaklist-wip` (6) exist on NO remote.
> On the Mac run `gh auth login` (or add an SSH key), then:
> `git push origin main && git push -u origin dev && git push -u origin mac-breaklist-wip && git push origin ui-ux-overhaul`.
> Only then `git pull` on Windows and read on.

## Where the program stands

Checklist truth: **228 rows — 216 PASS / 12 ENV-LIMITED / 0 FAIL** (through the voice batch;
the later features below shipped verified but without new rows — see "Next session" #1).

### Closed programs (this Mac session)
1. **Playbook (T0–T6) CLOSED** — zebra probe 10/10 twice (independent verifier), PLAYBOOK.1–6,
   checkpoint `brain/qa/checkpoints/playbook.md`, committed rig script now cross-platform
   (`node --zebra-hello` — the original `zebra --hello` was allowlist-blocked on EVERY platform).
   T5 evidence in `brain/qa/evidence/2026-07-19-t5/`. Playbook now at 9 lessons (2 self-learned).
2. **Sidebar v3** — Claude-Code-style rows (search+"+" one row, Pinned/Recents overlines, BP chip,
   live-turn pulse, 280px, selected wash + 2px bar), SIDEBAR3.1–6. Theme-toggle "regression" was
   mistaken identity: POLISH.3 never regressed; proto-overlay button relabeled; grep invariant in SIDEBAR3.6.
3. **Invisible scrollbars app-wide** — shared `public/scrollbars.css` + `js/scrollbars.js` on all 11 pages.
4. **Voice batch** — LEARNSFX.1 (s25/s26 chimes), CHATCHROME.1 (step rail/lane rules/bp accent rail
   removed — labels stay), VOICE.1–3 (Web Speech dictation EN/RU/KA + mic device picker with
   MacBook-mic default + Gemini transcribe path for non-default mics; msedge-tts read-aloud
   Ava/Svetlana/Eka with disk cache), LIVEMAP.1. Adversarial verifier 80/80.
5. **Live System Map v2→v4** (`public/js/livemap.js`, ~700 lines, self-contained) — floating
   chromeless resizable panel, nebula idle skin, typewriter ticker, ephemeral child molecules from
   real activity, v4 galaxy species: real-data satellite swarms (chats/lessons/learn-events/tools)
   with count pills, spokes, hex+starfield, ringed planets. Auto-reveals on first turn unless user
   chose a mode. Hover chrome = instant-trigger 200ms ease-in-out.
6. **Learning UX staged** — one toast morphing: 🧠 signal (actual failed command) → "searching for
   a solution…" (animated) → ✓ Solution found (problem→solution cards from the real lesson) or
   "Already known". s26 fires at solution reveal. Server emits `learning-thinking` + enriched payloads.
7. **Turn-recovery ladder** (`runClaudeWithFallback`) — transient `error_during_execution` pre-output:
   retry same session once → fresh session, visible "Turn hiccup" step. 5 unit cases + live regression.
8. **Buildprint link UX** — `/api/bp/status` now truthful (`linked` + account via auth.json + cached
   CLI probe); linked state shows Unlink (revoke endpoint deletes `~/.buildprint/auth.json` only).
   **Mac is LINKED as VLAD.** Windows was already linked (4.2.7 both).
9. **Gmail connector for spawned sessions** — `ToolSearch` + `mcp__claude_ai_Gmail` on the bp-spawn
   allowlist (connector = read/label/draft only, NO send tool). App side verified live.
10. **Review sweep fixes** — 3 light-theme color breakers → tokens; 127 lines confirmed-dead CSS/JS
    removed; docs caught up (BRAIN_APP_PROGRESS.md, CLAUDE.md page list); LEARN.3/POLISH.5/BPFLOW.2
    ADAPTED notes. Full-app runtime sweep was CLEAN (22 page/theme loads, 37 APIs, zero errors).
11. **App Preview surface** — `public/app-preview.html` + header/dashboard/APP_SURFACES wiring
    (committed a023e4a; found complete in the tree — Vlad's, uncommitted at handoff time).

## Windows first-run notes
- `cd crs-brain && npm install` — **new dep: msedge-tts** (pure JS, no native build) + @google/genai.
- Server restart picks up everything; s25/s26 WAVs are committed (regenerate button exists in Settings→Sounds).
- Rig: machine-local `qa-scratch/rig` — this session's verify scripts preserved in
  `brain/qa/rig-scripts/2026-08-01-mac-session/` (29 files). **They hardcode the Mac Chrome path** —
  adapt `CHROME` to `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` when reusing
  (only `rig-scripts/verify-playbook2.js` is already platform-aware). All need viewport ≥1400x900
  (live map hides ≤900px).
- Dictation device picker defaults to /macbook|built-in/i — on Windows it falls back to system
  default; harmless, but the regex could learn Windows mic names (small follow-up).
- TTS cache `data/tts-cache/` and `data/google-ai.json` (Gemini key) are gitignored/machine-local.

## Blocked on Vlad
1. **GitHub auth on the Mac** (the gate above) — until then this file itself can't travel.
2. **Gmail connector reauth** — claude.ai → Settings → Connectors → Gmail → reconnect and TICK the
   Gmail checkboxes on Google's consent screen (current grant lacks Gmail scopes:
   "Request had insufficient authentication scopes" from Google, app side proven working).
   Then retry: ask the app to list Gmail labels.
3. **.bp-test-user creds** — logged-in light-theme capture still parked (BPAUTH.1).

## Next session (in order)
1. **Checklist rows for the post-voice features** — LEARNUX.1–2 (staged toast: real distill +
   already-known paths), LIVEMAP ADAPTED notes for v3/v4 (LIVEMAP.1 describes v2's look; behavior
   contracts unchanged), BRAINFIX.1 (recovery ladder — unit 5/5 + live), BPLINK.1 (status/unlink UI),
   GMAIL.1 (pending Vlad's reauth for the live half). Verification evidence is in this session's
   agent reports; re-verify cheaply with the preserved rig scripts.
2. **Design rulings for Vlad** (open, low-stakes): `--accent-glow` vs `--accent-tint` for selected
   backgrounds app-wide (doc says tint, app uses glow everywhere); `.item.on` three-channel
   (wash+bar+text) vs §10 "pick two"; expanded solution-toast full-height green border (loud?).
3. Optional experiments parked: `~/projects/kimi-sandbox/` (ZenMux/Kimi reroute, scoped to that dir,
   needs Vlad's ZenMux account+key; NEVER point the brain app itself at it — connectors break).
4. Standing homework unchanged: UM audit ingest + HIGH role-escalation fix · pilot chunk reports ·
   Tailscale (p10 plan on branch claude/recursing-lovelace-ad3dff: tailscale serve) · review digest ratification.

## Environment parity snapshot
- Mac: claude 2.1.209 · buildprint 4.2.7 LINKED · agent-browser 0.32.2 · Chrome present ·
  npm globals under `~/.local` (plain `npm -g` fails, /usr/local is root-owned).
- Windows: buildprint 4.2.7 linked · agent-browser 0.32.2 (per 07-19 notes) · needs `npm install`
  in crs-brain for the new deps on first pull.
- Server data to expect after pull: playbook.json (9 lessons), learn-events.jsonl (staged-event
  fields runId/signal/lessons), sounds/ (26 WAVs), settings.json (+sounds.learnSounds).
