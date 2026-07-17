# CRS Brain — App Map

Reference for fixer agents working the Phase 2 design-compliance pass. Source lives in
`crs-brain/public/`. Canonical tokens: `crs-brain/public/tokens.css` + design system §-refs
used in `brain/design/element-inventory.md`.

## 1. Pages

### index.html — the SPA (one document, six switchable views + overlays)

| View | DOM id | Entry function | Notes |
|---|---|---|---|
| Dashboard (home) | `#dashView` | `showDashboard()` (~line 1667) | KPIs, quick actions, tools row, dash cards; re-rendered by `renderDashboard()` |
| Chat | `#chatView` | `showChat()` (~1569), `ensureChatView()` (1572) | Normal chat AND Buildprint chat share this view; `state.bp` flags BP mode (`newChat()` / `newBpChat()` at 1468-1469) |
| File preview | `#fileView` | file-open path (~2930) | `state.beforeFile` remembers origin; `goBack()` (2980-2983) restores it |
| Galaxy map | `#mapView` | `showMap(mode)` (1635) | Hosts `/map` (map.html) in `#mapFrame` iframe |
| Kanban / List | `#kanbanView` | `showKanban('board'|'list')` (1588) | Same board, two layouts (`kbMode`); project/all scope via `state.kbCrs` |
| Bubble data | `#bubbleView` | `showBubble()` (3096) | Live Bubble app structure |
| Settings | modal (`.modal-wrap`) | gear icon | Tabs via `.modal-nav`; Appearance / Sounds / connections |

Overlays layered on top of any view (the "window system", see §3):
`#explWrap` file-explorer window, `#docPop` document popup, `#propPop` properties,
`#htmlFull` fullscreen HTML, `#filepeek` hover preview, `#explMenu` context menu,
`#palWrap` command palette, `#minBar` taskbar.

### Standalone pages (own documents, own `:root` token blocks)

| Page | What it is | Theming today |
|---|---|---|
| `map.html` | Galaxy map (canvas) + board drawer + preview/ref/dock panels; embedded by index via iframe `/map` | **Hardcoded dark-only**, bespoke blue-black palette (lines 8-15), no data-theme |
| `tree.html` | Progress tree / roadmap editor | Dark-only legacy `:root` (8-16), no light pairs |
| `wishlist.html` | Wishlist items + prompt modal | Dark-only legacy `:root` (8-15) |
| `queue.html` | Build queue with status chips + banner | Dark-only legacy `:root` (8-15), identical copy of wishlist's block |
| `memory.html` | Memory entries CRUD | Dark-only legacy `:root` (8-15) |
| `activity.html` | Activity timeline with type badges/filter chips | Dark-only legacy `:root` (8-15) |

## 2. How views switch (index.html)

There is **no router**. Switching is imperative `style.display` toggling:

- `setView(v)` (1579-1584) is the header view-switcher entry: `chat → ensureChatView()`,
  `map → showMap()`, `kanban → showKanban('board')`, `list → showKanban('list')`.
- Every `show*()` function hides ALL other views (`chatView/fileView/dashView/mapView/kanbanView/bubbleView`),
  toggles `#centerCol` classes (`map-mode` = composer floats over the map; `no-composer`),
  shows/hides header buttons (`editToggle/saveBtn/openExt/downloadBtn/backBtn`),
  sets `#centerTitle`, then calls `markView(v)` (1631) which sets `.on` on `#viewSeg` buttons.
- `bumpView()` invalidates in-flight renders via `state.viewGen`.
- **Map iframe hash protocol**: first load sets `fr.src='/map' + hash` where hash is
  `#board`/`#list`/`#ideas` (map.html's boot reads it). After load, index calls
  `fr.contentWindow.applyView(mode)` directly (1655). The map calls back
  `parent.setMapBoardOpen(open)` (1661-1665) so the composer un-floats while the board drawer is open.
- `goBack()` from file preview restores `state.beforeFile` (chat/map/kanban/bubble/expl/dash).
- Mobile (<=900px): `mob(null)` closes the drawers; `.col.show` + `#mscrim` drive left/right drawers.

## 3. Reusable patterns (fix once, lands everywhere)

- **Toast** — `.toast` CSS 878-879, `toast(t)` JS 1317 (2.2s auto-dismiss). Separate
  **undo toast** `.utoast` (809-812, JS 2571/2786-2793, 6s) in the explorer. Both have
  hardcoded dark shadows and off-pattern hovers.
- **Notify / bell** — `.hicon` bell + `.nbadge` count (179-183), `.ninbox` popover (185-199),
  `renderInbox()` ~3469 with `NCOLOR` var-based dot map (token-safe). Unread rows use `--accent-tint`.
- **Settings rows** — `.msec-title` / `.mrow` / `.mlbl` (218-224), `.switch` (226-231),
  `.seg` segmented (233-236), `.tinput` (237-238), `.mbtn2` buttons (239-242), `.sel` selects
  (156-159, shared with header), `.mstat` status text (243-244). The Appearance `.seg` at
  3536-3538 is the theme toggle.
- **Window / popup system** — explorer window `.expl` (591+) with `.winctl` min/max/fs/close
  (690-699); minimize parks a chip on the taskbar; `#docPop` document popup (759+) with the same
  control language; `#propPop` properties; `#filepeek` hover preview (730-757); `.expl-menu`
  context menu + submenu (715-727); `#htmlFull` fullscreen overlay (801-807). All share
  hardcoded dark `rgba(0,0,0,…)` shadows — one `--shadow-modal`/`--shadow-dropdown` fix family.
- **Taskbar chips** — `#minBar .minchip` (CSS 700-704, JS 2145-2165). JS injects inline
  `color:#5B9CF6` folder icon (same literal at 645/2100/2891).
- **Segmented controls** — four variants: `.viewseg` (header, active = accent fill + #fff),
  `.tabs` (sidebar, active = elev), `.seg` (settings, active = elev), `.seg2` (chat mode +
  kanban toolbar, active = accent fill). Target: one §20.1 pattern.
- **Ghost/secondary buttons** — header ghosts (153-155), `.newbtn` (121-122), `.hbtn`
  (standalone pages), `.mbtn2`: all `--panel2` bg + `--line` border, hover `--line3`/`--elev`.
- **File-type icons** — `icons.js` generates SVG sheet art with hardcoded dark fills (line 5)
  and ext-badge hex map (8-12); rendered by explorer, docPop header, minchips, peek cards.

## 4. How theming works today

- **index.html**: data-theme aware. `:root` (9-21) defines **legacy alias names**
  (`--bg --panel --panel2 --elev --line/--line2/--line3 --primary --secondary --muted
  --accent2 --good --warn --danger --grad`) with dark values that match canonical tokens;
  `:root[data-theme="light"]` (23-31) overrides them — but the **light values drift from the
  canonical §2 palette** and light `--elev` uses brightness-as-elevation. Theme is applied from
  `?theme` param / localStorage (~3423-3424) and toggled by the settings Appearance segmented
  control (~3536-3538). Because nearly all CSS is var-driven, most rules pair for light
  automatically; what does NOT flip: hardcoded shadows (popover/modal/toast/chip), the `.sel`
  data-URI chevron, uchip status-tint borders, and JS-injected inline hexes (kpi/action/tool
  tints 1697-1700, `#5B9CF6` folder icons, usage barColor() 3261, icons.js fills).
- **Naming collision**: app `--accent-soft` holds `rgba(59,130,246,.13)` = canonical
  `--accent-glow`; canonical `--accent-soft` (#60A5FA text color) is app `--accent2`.
  Dark `:root` also has self-referential `--code-fg:var(--code-fg)` / `--prose:var(--prose)`
  (19-20) — invalid, so both are unset in dark.
- **Standalone pages**: each duplicates its own dark-only `:root` with no data-theme handling
  and no link to tokens.css → fully unthemed. map.html additionally uses a bespoke off-token
  palette and hardcoded canvas draw colors (only the ref-overlay reads `--accent`/`--error`
  via getComputedStyle at 499-500 — the pattern to copy for canvas theming).
- **Fix direction**: replace every per-page `:root` with the canonical paired token block
  (tokens.css), wire `data-theme`, rename legacy aliases mechanically, tokenize shadows
  (`--shadow-modal`, `--shadow-dropdown`) and motion (`--transition` 160ms cubic-bezier,
  `--transition-colors` 200ms ease-in), and make all JS color injection emit `var(...)` refs.
