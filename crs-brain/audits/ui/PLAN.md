# CRS Brain — UI/UX Implementation Plan (working queue)

Branch `ui-ux-overhaul`. Atomic commit per unit. Screenshot before/after into `audits/ui/<ws>/`.
Design source of truth: `design/tokens.css` + `design/design.md`. Assumptions A1–A6 in FINDINGS.md.

## Already shipped on this branch (prior passes, now committed)
- W1 partial: light/dark whole-palette swap + theme toggle (Settings→Appearance), persisted.
- W2 partial: header filled (usage chip + bell + gear + view switcher); right rail removed; sidebar dead
  items removed; no footer.
- W3 partial: dashboard rebuilt (KPIs, distinct actions, tools, recent/next-step).
- W7 partial: distinct quick-action icons + tints.
- W8 partial: folder→file→Back fixed.
- W9 partial: notifications (bell/inbox/toasts/sound/store/email-hook) + outcome events.
- W10 partial: Claude auth + Buildprint token link.
- W4 partial: live token meter + tool-use visibility.

## Ordered remaining queue

1. **Setup (this pass):** branch ✓, secrets/.gitignore ✓, audit dirs ✓, FINDINGS/PLAN ✓, PROGRESS/decisions.
   Screenshot pipeline. Baseline capture of current state → `audits/ui/00-baseline/`.
2. **W1 finish — token audit.** Grep changed files for raw hex; route to tokens; verify both themes; document.
3. **W2 finish — sidebar/right bar.** Move Chats/Buildprint switch out of sidebar (→ W4). Record right-bar
   decision (removed) in decisions.md. Group sidebar nav with correct states.
4. **W4 — Chat surface.** One chat view; Regular/Buildprint segmented switch ABOVE the input; mode-aware
   distinct template cards seeding the input; keep token meter + tool activity. Retire sidebar split.
5. **W3 finish — dashboard states.** Empty/loading/error for each widget.
6. **W7 finish — icon audit.** All Feather, consistent stroke/size.
7. **W5 — Kanban redesign** (`map.html` board mode): full-area, neutral surfaces, blue accent only, one-row
   toolbar, per-column states, kill orange/purple.
8. **W6 — Progress tree** (`tree.html`): left-spine / right-branch vertical timeline + date markers; tokenized.
9. **W10 — Connections + SMTP + secrets.** `.env.local` store; masked inputs; test-connection; status chips.
10. **W9 finish — per-type prefs + SMTP email + more events.**
11. **W11 — Bubble Best-Practices KB.** Section + entries (Title/How/Where/Explanation); add/edit;
    seed "Conditional Style Swapping"; per-entry on-demand "Enrich from web" (WebFetch/WebSearch) with citations.
12. **W12 — Brain toolset.** Formalize + document (web search, repo read/write scoped, git, run buildprint);
    surface each invocation with status (reuse work-blocks). Document in CLAUDE.md.
13. **W8 finish — NAV-TEST.** Drive every control; `audits/ui/NAV-TEST.md`; all green or removed.
14. **Phase 2 — FINAL.** Re-screenshot every route both themes → `audits/ui/FINAL/`; score DoD; iterate;
    `audits/ui/FINAL/REPORT.md`.

## Deviations from the prompt (justified)
- Accent #3B82F6 + Inter (not #1D4ED8 / IBM Plex) — operating rule #2 (design.md wins). See A1/A2.
- Kanban/List live in `map.html` (iframe board mode), not a separate component — redesign happens there.
