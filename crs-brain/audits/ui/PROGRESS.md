# UI/UX Overhaul — PROGRESS

**Sprint goal:** take CRS Brain to executive, professional-grade SaaS against the DoD. Branch `ui-ux-overhaul`.
**Design source of truth:** `design/tokens.css` + `design/design.md`. Accent `#3B82F6`, Inter, JetBrains Mono.

## Done (with paths)
- Branch `ui-ux-overhaul`; `.gitignore` hardened (`.env.local`, runtime notif store); audit dirs.
- Prior work committed: `crs-brain/server.js`, `crs-brain/public/index.html`, `wishlist.html`, `doctor.js`,
  `.gitattributes`, `brain/reference/claude-code-capabilities.md`.
- W1 (partial): light/dark whole-palette swap + toggle (`index.html` `:root[data-theme=light]`, Settings→Appearance).
- W2 (partial): header filled (usage chip/bell/gear/switcher); right rail removed; sidebar dead items removed; no footer.
- W3 (partial): dashboard rebuilt (KPIs/actions/tools/recent/next-step).
- W4 (partial): live token meter (server `onUsage` SSE + `#genMeter`) + tool-use visibility (work-blocks).
- W7 (partial): distinct quick-action icons/tints.
- W8 (partial): folder→file→Back fix (`explOpen`/`openFile`/`goBack`).
- W9 (partial): notifications (bell/inbox/toasts/sound/store/email-hook) + outcome events; endpoints in `server.js`.
- W10 (partial): Claude auth + Buildprint token link (`/api/connections/buildprint-link`).
- FINDINGS.md + PLAN.md written.

## Done (cont.)
- Phase-0/1 setup complete: branch, secrets, audit dirs, FINDINGS/PLAN/PROGRESS, decisions entry.
- Screenshot pipeline (`shoot.sh`, headless Chrome) + baseline captures in `audits/ui/00-baseline/`.
- Fixed misplaced `crs-brain/brain/reference/…` → `brain/reference/…`.
- **W4 DONE** — Chat/Buildprint mode switch above the input; mode-aware template cards that seed the input;
  unified "Conversations" sidebar with bp badges; Buildprint sidebar tab retired. Verified (cards swap + seed,
  no console errors). Commit `3106c55`.

## In progress
- (between workstreams)

## Next (ordered — see PLAN.md)
- W1 token audit (grep raw hex → tokens, both themes) → W2 right-bar decision recorded (done in decisions.md) +
  sidebar states → W3 dashboard states → W7 icon audit → **W5 kanban** → **W6 progress tree** → W10 SMTP/secrets
  → W9 per-type prefs → W11 Bubble best-practices KB → W12 toolset doc → W8 NAV-TEST → Phase 2 FINAL.

## Blocked
- _(none yet)_

## Creds needed from Vlad (paste into Settings → Connections; stored in gitignored `.env.local`)
- Buildprint CLI token (to run `buildprint link`).
- SMTP host/port/user/pass + from-address (for email notifications, W10).
