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

## In progress
- Phase-0/1 setup + deliverables (this pass).

## Next (ordered — see PLAN.md)
- Screenshot pipeline + baseline. → W1 token audit → W2 sidebar/right-bar → **W4 chat mode-switch + templates**
  → W3 states → W7 icons → W5 kanban → W6 tree → W10 SMTP/secrets → W9 per-type → W11 Bubble KB → W12 toolset
  → W8 NAV-TEST → Phase 2 FINAL.

## Blocked
- _(none yet)_

## Creds needed from Vlad (paste into Settings → Connections; stored in gitignored `.env.local`)
- Buildprint CLI token (to run `buildprint link`).
- SMTP host/port/user/pass + from-address (for email notifications, W10).
