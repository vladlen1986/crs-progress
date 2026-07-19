# T5 evidence — anonymous sign-in renders DARK (by design)

Evidence captures closing out T5. Root cause was already CONFIRMED + RULED:
see **decisions.md § "2026-07-19 — Sign-in (index) page: anonymous visitors always see DARK"**
(anonymous temp users have empty theme fields, so per-element `bptheme` light-mode
states never activate and the dark defaults stand — by design, not a bug).

## Captures

| file | shows |
|---|---|
| `2026-07-19-version-test-logged-out-desktop.png` | https://crsapp.live/version-test loaded logged OUT (fresh browser profile, no session/cookies restored) at 1440x900 desktop viewport. Renders the CRS sign-in (index) page fully DARK: dark page background (computed `body` background = `rgb(24, 24, 24)`), dark card with Sign in form (Email / Password / Forgot password? / Sign in / Terms & Privacy / "All systems operational"). |

Consistent with the ruling: logged-out/anonymous visitors see the dark index page.

## Capture notes

- Captured: 2026-07-19
- Tool: agent-browser CLI v0.32.2 (dedicated session `t5-evidence`, fresh context — no
  `--profile`/`--restore`, i.e. logged out), Chromium screenshot at 1440x900.
- An immediate capture and a +6s "settled" capture were byte-identical (md5
  `abce8f12957b818418f6557a24290a36`) — the Bubble page had fully rendered before the
  first shot; the single file above is that capture.
- A full-page (`--full`) capture was also identical in dimensions (1440x900 — the page
  fits one viewport, nothing below the fold), so it was not kept.
- The logged-in LIGHT capture is deliberately absent: parked on `.bp-test-user`
  credentials (see brain/qa/resume-2026-07-19-playbook.md item 3 and BPAUTH.1).
