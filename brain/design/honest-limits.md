# Honest-limits report

> P9.6 deliverable — what the app deliberately does NOT do, and why. Nothing here is a bug; each is a capability boundary shipped with an honest label instead of a fake.

1. **pdf editing** — view-only (native Chromium viewer). No lossless in-app pdf editor exists; round-tripping damages documents. "Edit externally" opens the OS default app.
2. **docx editing** — view-only (vendored mammoth 1.8.0 renders to HTML). Same lossy-round-trip reasoning. Note: verified against a generated minimal docx only — no real Word-authored file existed in the repo.
3. **xlsx saves collapse formulas on edited sheets** — SheetJS Community Edition writes values, not formulas/styling. Disclosed in-UI in edit mode; untouched sheets pass through byte-preserved.
4. **Copy file OUT to the OS clipboard as a file** — impossible in any browser. Equivalents shipped: Download, Download as ZIP, Copy content (text), Copy image (PNG).
5. **Drag-out to the OS** — Chromium-only (`DownloadURL`), one item per drag (folder/multi = ZIP). Other browsers degrade to the Download menu items; feature-detected, no errors.
6. **Cmd+W** — reserved by Chrome, cannot be intercepted; Ctrl+W works and the tooltip says so.
7. **External http(s) links** — the single sanctioned exception to the single-app rule (call #37): they open the system browser with ↗. Arbitrary sites refuse iframe embedding (X-Frame-Options).
8. **Buildprint sync on this Mac** — currently `Unauthorized` (link expired; CLI 4.1.6→4.2.5 update pending). Issue checker degrades to last-synced local state with a caveat line in each report. Fix: `buildprint update` + re-link in Settings → Connections.
9. **`server-unreachable` notifications** — banner+sound only; the bell entry can't persist because the server is what's down (call #47).
10. **Sound audibility** — verified to the engine boundary (correct buffer reaches `SOUNDS.playSound`) in headless QA; human ears confirm the rest.
11. **ENV-LIMITED regression rows** (QA loop, excluded from the green gate with code-level evidence recorded): real-OS drag-in/paste-in/drag-out (synthetic DataTransfer verified), live prompt-generation through Claude chat (wiring + samples verified statically).
12. **tsv** — simple tab split; no quoting dialect (none specced for tsv).
