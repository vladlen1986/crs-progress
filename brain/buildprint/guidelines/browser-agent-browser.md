# Agent Browser
> Source: `buildprint guidelines get browser/agent-browser` · Captured: 2026-07-17 (verbatim)

Browser automation is available in the sandbox via `agent-browser`.
Use it for page exploration, login flows, form filling, evidence capture, downloads, and verifying browser behavior.

## Good default operating style

- Use a named session (`--session <name>`) for multi-step work so navigation, tabs, and auth state stay attached to one workflow.
- After `open`, use `wait --load networkidle` on slow pages before you trust the first snapshot.
- Use `snapshot -i` when you need clickable or fillable refs. Use plain `snapshot` when you need to read page structure or content.
- Re-snapshot after anything that can change the DOM, URL, or available actions.
- Check `console` and `errors` when UI behavior is unclear; browser failures are often visible there before they are obvious in the page.

## Core workflow

Every browser automation follows this loop:

1. **Navigate**: `agent-browser open <url>`
2. **Snapshot**: `agent-browser snapshot -i` (get element refs like `@e1`, `@e2`)
3. **Interact**: Use refs to click, fill, select
4. **Re-snapshot**: After navigation or DOM changes, get fresh refs

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
## Output: @e1 [input type="email"], @e2 [input type="password"], @e3 [button] "Submit"

agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i  # Check result
```

### Ref lifecycle

Refs (`@e1`, `@e2`, etc.) are invalidated when the page changes. Always re-snapshot after:
- Clicking links or buttons that navigate
- Form submissions
- Dynamic content loading (dropdowns, modals)

## Bubble app URLs

Use the project context first when choosing a Bubble app URL.
- Standard public app URL: `https://{app-slug}.bubbleapps.io/`. Version-specific URLs usually append `/version-{version-id}/`.
- Custom public domain: `https://{custom-domain}/` when the project has one configured.
- Dedicated public run-mode URL: `https://{dedicated}.bubble.is/site/{app-id}/`.
- Dedicated instance ids are also used directly for Bubble editor/data endpoints like `https://{dedicated}.bubble.is/page?...`, `/appeditor/...`, and `/version-.../elasticsearch/...`. Do not assume `https://{dedicated}.bubble.is/` is the public app root unless the user confirms it.
If the project context is missing a usable browser URL, state the ambiguity and ask the user which public URL to open.

## Test user credentials

Test user credentials may be pre-loaded at `.context/browser-auth.json`.
If it exists, read it to discover saved test accounts (_id, name, email, password, description) you can use when logging into the app under test.
These credentials are for visible in-app login forms and auth-flow tests.
A saved account with `password: null` is not usable for visible password login. Use `buildprint login` when the task should start authenticated as that user.
To log into the app itself, navigate to the relevant sign-in area, fill the email and password inputs, then click the relevant log in button.

## Starting already authenticated

When a task or saved test should begin as an already-authenticated app user, use `buildprint login` before opening the app.
From a Buildprint branch workspace, run `buildprint login <email>` and let the CLI infer the app and branch.
Outside a branch workspace, pass the target explicitly: `buildprint login <email> --app <appId> --branch <branch>`.
If you use a named Agent Browser session, add `--session <name>` to `buildprint login` and reuse that same session on later `agent-browser` commands.
`buildprint login` installs only Bubble app-user cookies into Agent Browser. It does not configure run-mode HTTP basic auth and it does not prove the visible login form works.
Do not use `buildprint login` for tests whose purpose is to verify login, signup, logout, SSO, password reset, or another auth UI. Use the visible form and `.context/browser-auth.json` credentials for those tests.
If cookie installation fails or you intentionally pass `--no-browser`, use the fallback `agent-browser cookies set ...` commands printed by the CLI.

## Run-mode HTTP basic auth

Some projects protect the site itself with run-mode HTTP basic auth before the app loads.
This is separate from any in-app login.
In the normal case, `agent-browser open` automatically applies scoped HTTP Basic auth for the configured app origins.
If the site still returns an HTTP basic-auth 401 or the automatic setup appears to be failing, read `.context/http-basic-auth.json` first.
That file, when present, contains the run-mode site username and password plus `domains`/`origins` where they may be used.
These credentials control access to the site itself before the app loads, separate from any in-app user login.
Do not use `agent-browser set credentials <u> <p>` for Buildprint run-mode auth. It applies globally and can send `Authorization` to third-party assets such as Google Fonts.
Retry the exact app URL only when its host matches the saved `domains`/`origins`; otherwise ask the user for the correct run-mode URL or domain.
Only ask the user for run-mode credentials if the file is missing or the saved credentials still fail.

## Command chaining

Chain commands with `&&` when you don't need intermediate output:

```bash
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser snapshot -i
```

Run commands separately when you need to parse output first (e.g., snapshot to discover refs, then interact).

## Navigation

```bash
agent-browser open <url>      # Navigate (auto-prepends https://)
agent-browser back            # Go back
agent-browser forward         # Go forward
agent-browser reload          # Reload page
agent-browser close           # Close browser
```

## Snapshot

```bash
agent-browser snapshot             # Full accessibility tree
agent-browser snapshot -i         # Interactive elements only (recommended)
agent-browser snapshot -i -C      # Include cursor-interactive elements (onclick, cursor:pointer)
agent-browser snapshot -s "#main" # Scope to CSS selector
agent-browser snapshot -c         # Compact output
agent-browser snapshot -d 3       # Limit depth
```

## Interactions

```bash
agent-browser click @e1           # Click
agent-browser click @e1 --new-tab # Open in new tab
agent-browser fill @e2 "text"     # Clear and type
agent-browser type @e2 "text"     # Type without clearing
agent-browser press Enter         # Press key
agent-browser press Control+a     # Key combination
agent-browser keyboard type "text"    # Type at current focus
agent-browser keyboard inserttext "t" # Insert without key events
agent-browser hover @e1           # Hover
agent-browser check @e1           # Check checkbox
agent-browser uncheck @e1         # Uncheck checkbox
agent-browser select @e1 "value"  # Select dropdown option
agent-browser scroll down 500     # Scroll page
agent-browser scroll down 500 --selector "div.content"  # Scroll container
agent-browser scrollintoview @e1  # Scroll element into view
agent-browser drag @e1 @e2        # Drag and drop
agent-browser upload @e1 file.pdf # Upload files
```

## Get information

```bash
agent-browser get text @e1        # Get element text
agent-browser get html @e1        # Get innerHTML
agent-browser get value @e1       # Get input value
agent-browser get attr @e1 href   # Get attribute
agent-browser get title           # Get page title
agent-browser get url             # Get current URL
agent-browser get count ".item"   # Count matching elements
agent-browser get box @e1         # Get bounding box
agent-browser get styles @e1      # Get computed styles
```

## Check state

```bash
agent-browser is visible @e1      # Check if visible
agent-browser is enabled @e1      # Check if enabled
agent-browser is checked @e1      # Check if checked
```

## Wait

```bash
agent-browser wait @e1                    # Wait for element
agent-browser wait 2000                   # Wait milliseconds
agent-browser wait --text "Success"       # Wait for text (substring match)
agent-browser wait --url "**/dashboard"   # Wait for URL pattern
agent-browser wait --load networkidle     # Wait for network idle
agent-browser wait --fn "window.ready"    # Wait for JS condition
agent-browser wait #spinner --state hidden  # Wait for element to disappear
```

For slow pages, use `wait --load networkidle` after `open` before taking a snapshot.

## Screenshots and capture

```bash
agent-browser screenshot              # Screenshot to temp dir
agent-browser screenshot path.png     # Save to specific path
agent-browser screenshot /output/page.png  # Persist a screenshot for later handoff or tooling
agent-browser screenshot --full       # Full page
agent-browser screenshot --annotate   # Annotated with numbered element labels
agent-browser pdf output.pdf          # Save as PDF
```

When you need a browser artifact to persist beyond the immediate command output, save it under `/output/` with an absolute path.
Do not leave user-visible screenshots, downloads, PDFs, or HTML files in `/tmp` or another sandbox path; copy or write the final artifact to `/output/`.

### Annotated screenshots

Use `--annotate` when the page has unlabeled icon buttons, visual-only elements, canvas/charts, or you need spatial reasoning. Each label `[N]` maps to ref `@eN`, and refs are cached so you can interact immediately.

## Recording and evidence capture

Use screenshots for static states, layout checks, or quick handoffs. Use video recordings when the important detail is a sequence, timing issue, animation, or state transition.

```bash
agent-browser record start flow.webm   # Start a video capture
agent-browser type @e1 "user@example.com"
agent-browser click @e2
agent-browser screenshot --annotate flow-result.png
agent-browser record stop              # Finish the recording
```

- If you are collecting proof for a bug report or handoff, confirm the behavior once before you start recording so the final artifact is clean.
- During a visible recording, prefer `type` or `keyboard type` over `fill` when human-readable playback matters.
- For multi-step flows, capture a screenshot at meaningful checkpoints, not just the final state.
- When spatial context matters, annotated screenshots are usually more useful than raw screenshots because they let you refer to exact controls.

## Semantic locators (alternative to refs)

When refs are unavailable or unreliable:

```bash
agent-browser find role button click --name "Submit"
agent-browser find text "Sign In" click
agent-browser find label "Email" fill "user@test.com"
agent-browser find placeholder "Search" type "query"
agent-browser find testid "submit-btn" click
agent-browser find first ".item" click
agent-browser find nth 2 "a" hover
```

## Iframes

Iframe content is automatically inlined in snapshots. Refs inside iframes carry frame context, so you can interact directly without switching frames.

```bash
agent-browser snapshot -i
## @e2 [Iframe] "payment-frame"
##   @e3 [input] "Card number"
##   @e4 [button] "Pay"

## Interact directly — no frame switch needed
agent-browser fill @e3 "4111111111111111"
agent-browser click @e4
```

To scope a snapshot to one iframe, use `agent-browser frame @e2` then `snapshot -i`, then `frame main` to return.

## Viewport and device emulation

```bash
agent-browser set viewport 1440 900       # Set viewport size
agent-browser set viewport 1440 900 2     # 2x retina
agent-browser set device "iPhone 14"      # Emulate device
agent-browser set media dark              # Dark mode
```

## Tabs

```bash
agent-browser tab                 # List tabs
agent-browser tab new [url]       # New tab
agent-browser tab 2               # Switch to tab by index
agent-browser tab close           # Close current tab
```

## Downloads

```bash
agent-browser download @e1 ./file.pdf     # Click to trigger download
agent-browser wait --download ./out.zip   # Wait for download to complete
```

## Dialogs

```bash
agent-browser dialog accept [text]  # Accept dialog
agent-browser dialog dismiss        # Dismiss dialog
```

## Diffing (verify changes)

```bash
agent-browser snapshot -i                              # Baseline
agent-browser click @e2                                # Action
agent-browser diff snapshot                            # See what changed
agent-browser diff screenshot --baseline before.png    # Visual pixel diff
```

## Debugging

```bash
agent-browser --headed open example.com   # Show browser window
agent-browser console                     # View console messages
agent-browser errors                      # View page errors
agent-browser highlight @e1               # Highlight element
agent-browser inspect                     # Open Chrome DevTools
```
