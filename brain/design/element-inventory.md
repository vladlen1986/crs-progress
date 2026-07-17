# CRS Brain — Element Inventory (Phase 2 work order)

Every non-COMPLIANT family across all screens. Verdicts: **NC** = NON-COMPLIANT (wrong pattern/values),
**OT** = OFF-TOKEN (correct pattern, legacy alias names / literal values equal to tokens),
**UN** = UNTHEMED (dark-only, no light pairing). Paths are relative to `crs-brain/`.

## Totals

| Verdict | Count |
|---|---|
| COMPLIANT | 28 |
| OFF-TOKEN | 74 |
| NON-COMPLIANT | 113 |
| UNTHEMED | 17 |
| **Total audited** | **232** |

---

## index: header + sidebar + taskbar — 1 compliant · 19 OT · 9 NC · 0 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| tokens/root-dark-aliases | public/index.html:9-21 | OT | Whole app runs on legacy alias names (--bg/--panel/--panel2/--elev/--line*/--primary/--secondary/--muted/--good/--warn/--danger/--grad); values match dark tokens; app --accent-soft holds rgba(59,130,246,.13) = canonical --accent-glow's value (canonical --accent-soft is text #60A5FA) — naming collision | Mechanical rename to canonical §2 names; remap app --accent-soft usages to --accent-glow; §2/§3.3 |
| tokens/root-light-overrides | public/index.html:23-31 | NC | Light values diverge from canonical: --bg #F4F4F3 (spec #FAFAFA), --panel2 #F1F1F0, --elev #E9E9E7 (spec #FFFFFF + shadow — brightness-as-elevation), lines #E4E4E2/#D6D6D3/#C4C4C1, text #1A1A1A/#4B4B4B/#8A8A88, --accent2 #1D4ED8 role mismatch | Replace block with canonical §2 light column; light elevation = --shadow-* not darker grey; map --accent2 to --accent-text/--accent-soft per usage; §2, §2.7 |
| motion/transitions | public/index.html:33-34 + ~30x shorthands (75,80,83,102,109,116,121,124,129,133,138,149,153,157,162,172,179,188,191,866,872,929,944,984,995) | NC | Pervasive transition:.15s/.12s/.1s all-props shorthand; global color transition .2s ease vs spec 200ms ease-in | Define/use --transition 160ms cubic-bezier(.4,0,.2,1) and --transition-colors 200ms ease-in; §14 |
| scrollbars | public/index.html:46-52 | OT | Correct pattern (track --panel, thumb --line3→--muted, --accent when dragging) on legacy aliases | Rename to --bg-secondary/--border-active/--text-muted/--accent; §2 |
| layout/columns | public/index.html:54-58,839-841 | OT | .col.left/.right bg var(--panel) + 1px --line border — correct surface, alias names (incl. mobile drawer) | Rename to --bg-secondary + --border-default; §2 |
| sidebar/side-rail | public/index.html:74-79,1053-1069 | OT | Collapsed icon rail (14 buttons): hover --panel2 + --primary + --line (correct); radius 9 vs --radius-btn 7; aliases | Rename aliases; radius 7 per §20.1 |
| sidebar/col-collapse+expand-handle | public/index.html:80-87,1071,1099 | NC | .col-collapse:hover sets border-color:var(--accent) — accent border on plain hover (reserved for active/focus) | Hover → --border-hover, keep color --text-primary; expand-handle rename-only; §2 |
| sidebar/brand | public/index.html:90-93,485-486,889,1071 | OT | Logo bg var(--grad) (flat #3B82F6, ok) + #fff icon; .brand-home:hover uses opacity:.85 instead of token color shift | Rename --grad → --accent; hover via --transition-colors color shift; §2, §14 |
| sidebar/account-card | public/index.html:96-105,884,3056 | NC | .adot.on box-shadow 0 0 9px var(--good) — glow, forbidden; .connect:hover background:#2563EB hardcoded; radius 11 vs card 10; .connect bg var(--grad) | Drop glow (flat --success dot); hover var(--accent-hover); radius 10; §2, §2.7, §20.1 |
| sidebar/tabs-segmented | public/index.html:108-112,1073-1076,1087-1090 | OT | Track --panel2 + --line, active .on = --elev + --primary (matches §5); radius 11/8 off-spec; aliases; 2 instances | Rename (--bg-tertiary track, --bg-elevated active); radius --radius-btn; §5, §20.1 |
| sidebar/side-set (settings entry) | public/index.html:115-120,1091-1093 | OT | Active = accent-soft bg + --primary text, no border (correct rule); alias names incl. app accent-soft (=canonical accent-glow) | Rename: bg --accent-glow/--accent-tint, icon --accent-soft per canonical roles; §2 |
| sidebar/newbtn actions | public/index.html:121-122,1077-1082 | OT | 3 buttons: --panel2 + --line, hover --line3 + --elev — correct secondary language on aliases; radius 11 vs btn 7 | Rename aliases; radius --radius-btn 7 (or --radius-card 10 as list rows); §20.1 |
| sidebar/chats-list items | public/index.html:124-131,1084 | OT | Hover --panel2, active = accent-soft + --primary (correct); .meta pill uses app-invented --veil token | Rename aliases; .meta pill → --bg-tertiary (or --na); §2, §20.7 |
| sidebar/files-tree | public/index.html:133-141,1086 | OT | Tree nodes: hover --panel2, active accent-soft + --primary (correct); aliases only | Mechanical rename; §2 |
| sidebar/chat-search input | public/index.html:829-830,1078 | NC | Border --line instead of --input-border; :focus swaps to --accent but NO 3px --accent-glow ring | Border → --input-border; :focus add box-shadow 0 0 0 3px var(--accent-glow); §2, §16 |
| sidebar/bp-conn status | public/index.html:565-568,1083,3352-3359 | NC | .bp-ok dot box-shadow 0 0 7px var(--good) — glow, forbidden | Remove glow, flat --success dot; §2 |
| sidebar/sidenav (Map/Kanban) | public/index.html:982-985 | OT | CSS-only family (likely dormant): --panel2 + --line, hover --elev + --primary on aliases | Rename or delete if dead; §2 |
| header/center-head | public/index.html:144-146,844-845,1100-1104 | OT | bg var(--head-bg) rgba(24,24,24,.62) + backdrop blur — app-invented translucent-header token (unspecified effect) | Solid --bg-secondary + --border-default per §2, or ratify --head-bg as documented token; rename aliases |
| header/viewseg (view switcher) | public/index.html:148-152,846-848,1109-1114 | OT | Active = --accent fill + #fff (matches §20.1); inactive label --muted vs spec --text-secondary; radius 10/8 off; .15s transitions | Inactive → --text-secondary; radius/transition tokens; rename aliases; §20.1 |
| header/ghost-buttons | public/index.html:153-155,447,1101,1115-1118,1153 | OT | 5 instances: --panel2 + --line, hover --line3, .on = accent-soft + --primary (correct); aliases; unicode arrows instead of stroke icons | Rename aliases; swap glyph arrows for 1.7px stroke SVGs per §4/§15; §20.1 |
| header/select (.sel model/effort) | public/index.html:156-159,849,992 | NC | Chevron data-URI stroke #6c6c78 (not a token, same in light); :focus accent border only, no 3px --accent-glow ring; border --line not --input-border | Theme-scoped data-URIs (or mask + currentColor) using --text-muted; focus add glow ring; border --input-border; §2, §16 |
| header/usage-chip | public/index.html:162-168,1105,3269 | NC | .uchip.warn/.crit borders rgba(245,158,11,.35)/rgba(239,68,68,.4) hardcoded — never flip to light #D97706/#DC2626 | Status borders via --warning-tint/--error-tint (13% dark / 10% light) or 1px var(--warning)/var(--error); §2 |
| header/usage-popover | public/index.html:169-174,1121-1124,893-910 | OT | Shadow 0 24px 60px rgba(0,0,0,.6) hardcoded (stays heavy in light); .enable/.connect hover #2563EB hardcoded; .bar track --veil | Tokenize var(--shadow-dropdown); #2563EB → var(--accent-hover); bar track → --na/--bg-tertiary; §2 |
| header/hicon (bell, gear) + nbadge | public/index.html:179-183,1107-1108 | OT | 34px icon buttons, correct hover; .nbadge correct; aliases; radius 9 vs btn 7 | Mechanical rename; radius --radius-btn; §2, §20.7 |
| header/ninbox (notifications) | public/index.html:185-199 | OT | Shadow 0 24px 60px rgba(0,0,0,.55) hardcoded; .nitem.unread --accent-tint (correct); aliases | Shadow → var(--shadow-dropdown); rename aliases (--accent2 → --accent-soft/--accent-text per role); §2 |
| header/conndot | public/index.html:875-877,1106,3482 | OT | Flat 8px status dot, JS swaps ok/warn/err classes → --good/--warn/--danger aliases; no glow — correct | Rename to --success/--warning/--error; §2 |
| header/mbtn (mobile hamburger) | public/index.html:835,842,1102 | OT | ☰ text glyph button, border --line, --secondary; radius 6 vs 7 | Rename aliases, radius 7, stroke SVG icon; §20.1, §15 |
| taskbar/minbar-chips | public/index.html:700-704,2145-2165 | NC | .minchip shadow 0 8px 24px rgba(0,0,0,.4) dark-only; JS-injected inline icon color #5B9CF6 — off-palette, same in light | Shadow → var(--shadow-dropdown); #5B9CF6 → var(--accent-soft) (same fix as 645/2100/2891); rename aliases; §2 |

## index: dashboard — 0 compliant · 8 OT · 4 NC · 1 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| tokens-root | public/index.html:9-31 | NC | Legacy alias names + light values drift from canonical (see header screen rows); --accent-soft naming collision; dark aliases ARE value-equal | Rename to canonical names, correct light values per §2/§3.3; resolve accent-soft collision; underpins every dashboard family |
| kpi-accent-bars + action/tool icon tints (JS) | public/index.html:1697-1700 (const c + A/T/kpi fns), applied 1709-1731 | UN | 17 instances inject inline hardcoded dark hexes (#3B82F6 #8B5CF6 #06B6D4 #22C55E #F59E0B #60A5FA) into --kc/--qc, --qc-bg as `${color}1f`; stay dark in light mode | Inject var references (--kc:var(--purple) etc.); --qc-bg via 13%/10% tint tokens or color-mix; §5, §2 |
| next-step draft button (.np-draft) | public/index.html:534-535 | NC | Border rgba(59,130,246,.25) hardcoded; :hover color:#fff on 13% tint bg — unreadable in light; ad-hoc sizing | Tinted secondary button per §20: --accent-tint bg, --accent-border-active border, --accent-text text; hover darken tint; 32/36px height |
| next-step meta duplicate defs | public/index.html:531-533 vs 933-939 | NC | .np-mod/.np-title/.np-verify defined twice with conflicting styles (531 block is dead); .np-gen input is a 3rd form-control variant | Delete 531-533; keep §4 label style; align .np-gen input with §17 input tokens + focus glow |
| quick-action cards (.action) | public/index.html:502-509 | NC | Radius 11 vs card 10; :hover border-color:var(--qc) — colored border on hover (off-pattern, inherits UNTHEMED --qc); transition .15s | Radius 10; hover = --border-hover + --bg-elevated only; --transition-colors; §16/§20.4/§2.7 |
| kpi tiles (.kpis/.kpi/.v/.k) | public/index.html:495-500 | OT | Legacy vars only; pattern correct (border-only, mono numerals); transition .15s | Rename to canonical + --transition-colors; §2/§14/§2.7 |
| tools chip row (.tools/.tool/.ti) | public/index.html:511-515 | OT | Legacy vars; hover pattern OK; radius 9 non-token; icon tint inherits UNTHEMED --qc | Rename tokens; radius 7 (button-like chip §20.1); --transition-colors |
| dash cards (.dcard/h3/.cnt/.seeall) | public/index.html:516-524 (+995-996) | OT | Legacy vars; border-only card correct, mono counter correct; radius 11 vs 10; .stat.clk dead selector | Rename; radius 10; drop dead .stat; §2/§14 |
| dash list rows (.drow/.pill/.rt/.rmeta) | public/index.html:525-530, rows at 1701 | OT | Legacy vars; hover is text-color-only → --primary (should hover with --bg-tertiary surface; body elevating to primary skirts never-primary-body rule) | Rename; hover bg --bg-tertiary, keep text --text-secondary; §16, §4 |
| greeting header (.dash-head/h2/.subline/.lbl) | public/index.html:487-493, markup 1702-1706 | OT | Legacy vars only; pattern correct per §4 | Mechanical rename --primary→--text-primary, --muted→--text-muted; §4 |
| empty states (.dempty) | public/index.html:536, emitted 1701/1742-1743 | OT | --muted italic 12px — correct pattern, legacy name only | Rename --muted→--text-muted; §4 |
| dash theme-transition group | public/index.html:34 | OT | .2s ease vs 200ms ease-in; .stat dead | var(--transition-colors); drop .stat; §2.7 |
| kpi/action/tool transition literals | public/index.html:496,503,505,512 | OT | 4 rules use bare transition:.15s | Replace with var(--transition); §2.7 |

## index: chat surfaces (chat + buildprint chat) — 2 compliant · 11 OT · 13 NC · 1 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| theme-tokens/light-palette | public/index.html:23-30 | NC | Light values drift from spec across all surfaces/lines/text (see header screen); every chat surface inherits | Set light values to §2.1-2.4 spec pairs; light --elev = #FFFFFF + shadow (§2.1/§3.3) |
| theme-tokens/self-referential | public/index.html:19-20 | NC | Dark :root defines --code-fg and --prose as themselves → invalid/unset in dark; .msg.assistant .body (257) and .md pre code (428) silently fall back | Define real dark values: --prose ≈ --text-secondary #A6A6A6, --code-fg ~#D0D0D0/--text-primary; keep light pairs at 29-30 |
| legacy-alias-names | public/index.html:9-21 + chat selectors 247-479, 540-568 | OT | Entire chat scope on legacy names (value-equal); accent-soft/glow collision | Mechanical rename to §2 canonical names; untangle collision |
| resting-borders-use-border-hover | public/index.html:303,311,327,367,383,387,393,553,563 | NC | 9 components use --line2 (=--border-hover #333) as DEFAULT resting border | Resting = --border-default; inputs = --input-border #2A2A2A; reserve --border-hover for hover; §2.2 |
| bubbles/user-turn | public/index.html:254 | NC | Body text var(--primary) at 15px; radius 16 off scale | Body → --text-secondary (§2.4/§17); ~13px (§4); radius to scale or document bubble exception (§2.9) |
| bubbles/assistant-prose | public/index.html:256-257,446-461 | NC | Prose color var(--prose) undefined in dark; light #232323 ≈ text-primary for whole body; 15px vs 12-13px | Back --prose with --text-secondary both themes; if brighter prose wanted, add to design system explicitly |
| streaming-indicators | public/index.html:262-267,329 | OT | Caret --accent, dots --muted, live dot --accent — correct via aliases; ad-hoc animation timings | Rename aliases; keep pulse animations; §2.3/2.4 |
| error-text | public/index.html:268,556 | UN | Hardcoded #e8938b (2x) — no token match, no light pair; fails contrast on white | color: var(--error-soft) (#F87171 dark / #DC2626 light); §2.5 |
| agent-activity/work-blocks | public/index.html:270-297 | OT | Token-correct via aliases but running state hardcodes fallback var(--accent2,#60A5FA) (280,291); step hover uses --veil; chevron .18s/.15s | Drop literal fallbacks → --accent-soft; hover → --bg-tertiary; transitions → --transition 160ms; §2 |
| segmented/mode-switch (.seg2) | public/index.html:311-315 (+1178-1183, kb-toolbar) | NC | Inactive label --muted (spec --text-secondary) + transparent bg; active accent fill correct but #fff literal; .15s | §20.1: inactive = --bg-tertiary + --text-secondary; active = --accent + --white; --transition-colors |
| template-cards (.tcard) | public/index.html:317-324 | NC | Card bg --panel2 instead of --bg-secondary; hover swaps border to --accent + bg --elev (accent border on hover off-pattern) | Card = --bg-secondary + --border-default + radius 10; hover bg --bg-tertiary, border --border-hover; §20.4, §14 |
| composer/container+textarea | public/index.html:361-373,368,482 | NC | Resting border --line2 not --input-border; focus ring 3px --accent-tint (8%) not --accent-glow (13%); text --primary 15px; radius 16; .15s | --input-border → focus --accent + 3px --accent-glow; input text per §5 field spec; --transition tokens; §2.2/§14 |
| composer/buttons | public/index.html:374-380,387-390,1208 | OT | Send: flat accent OK but #fff + hover #2563EB literals; disabled opacity .4 vs .5; stop rests on --line3; ingest chip border --line2 | #fff → --white, #2563EB → --accent-hover; disabled per §14; stop resting --border-default; ingest = Chip Active (--accent-tint + --accent-border-active); §20.7 |
| buttons/retry-bar+msg-acts | public/index.html:382-385,400-403 | NC | Retry-bar hover swaps border to --accent; msg-acts hover to --line3 — both violate hover spec; .15s | §14: hover = bg --bg-tertiary/--bg-elevated + border --border-hover, never accent/active border; --transition 160ms |
| attachment-chips | public/index.html:391-399,463-469 | OT | Token-correct via aliases; .matt name uses --primary for non-heading text | Rename; chip name → --text-secondary; badge radius per §2.9 |
| code-blocks | public/index.html:19,29,426-428,457-458 | NC | --code-bg #0b0b0e off-palette; --code-fg undefined in dark; pre radius 11/10 mixed; inline code --accent2 | Code surface → --bg-primary #181818 or document code-bg token; define --code-fg dark; radius 10; §4, §2.9 |
| chat-markdown/links+tables | public/index.html:429-444,443,460-461 | OT | Links --accent2 (light ✓ AA); a[data-path] underline rgba(96,165,250,.4) literal; zebra/hover rows use --veil | rgba → color-mix on --accent-soft/--accent-border-active; rename aliases; --accent-text discipline for light; §2.3, §18 |
| hero/empty-state | public/index.html:405-410,1461-1462 | OT | hero-mark flat accent + #fff literal; hero body copy --muted (essential copy on muted); inline style var(--primary) | #fff → --white; hero-s → --text-secondary; keep flat accent; §2.5.1, §18 |
| queue-strip | public/index.html:299-306 | OT | Aliases only; .ql matches section-header spec; qchip border in shared row | Mechanical rename; §2 |
| bp-chat/messages+hero-chips | public/index.html:552-561 | OT | User msg accent-tint on aliases; .who label 9.5px in --accent2; asymmetric radius off scale | Rename; .who → 10.5px/700 --accent-text; radius per §2.9; §4 |
| bp-chat/status-dots-glow | public/index.html:548,567 | NC | box-shadow 0 0 8px/7px var(--good) glow on connection dots — glow banned | Drop box-shadow; dot = --success-soft fill only; §20.5, §2.7 |
| bp-chat/composer | public/index.html:562-564 | NC | Textarea border --line2 (not --input-border); focus accent border without 3px --accent-glow ring | --input-border resting → focus --accent + 0 0 0 3px --accent-glow; §2.2/§14 |
| motion/ad-hoc-transitions | public/index.html:277,293,312,318,348,366-368,374,383,400,402 | OT | .12s/.15s/.18s/.2s literals instead of tokens | Interaction → --transition 160ms; colors → --transition-colors 200ms ease-in; §2.8 |

## index: explorer + document popup — 11 compliant · 1 OT · 13 NC · 2 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| explorer window shell | public/index.html:591 | NC | .expl shadow 0 30px 80px rgba(0,0,0,.6) dark-constant; font-family:system-ui overrides Inter | --shadow-modal token per theme; font-family var(--sans); §2.7/§3.3, §4 |
| toolbar search input focus | public/index.html:614-615 | NC | :focus-within only bumps border to --line3 — no accent border, no glow ring | Border --accent + 0 0 0 3px --accent-tint ring (pattern at .tinput:238); §14 |
| folder icon color | public/index.html:645 (+2100,2162,2891 inline #5B9CF6) | NC | Folder glyph hardcoded #5B9CF6 — no token, 4 occurrences, constant across themes | Define --folder-icon (or --accent-soft/--accent2) both themes; replace all 4 literals; §2.3/§17 |
| upload flash keyframe | public/index.html:687-688 | NC | @keyframes upflash peaks at rgba(59,130,246,.28) — non-token accent alpha | Peak at var(--accent-glow) (13%) or a themed --accent-flash pair; §2.3/§17 |
| window controls (winctl) | public/index.html:690-699 | NC | Close-hover rgba(239,68,68,.15) hand-rolled error tint, never flips to light #DC2626; transitions 160ms ease-in-out vs 200ms ease-in for colors | --error-tint token per theme; transition-colors 200ms ease-in; §2.5.1/§2.8 |
| minimized window chips (#minBar .minchip) | public/index.html:700-704 | NC | Shadow 0 8px 24px rgba(0,0,0,.4) dark-constant | --shadow-dropdown token (flips to .08 in light); §2.7 |
| context menu (.expl-menu + submenu) | public/index.html:715-727 | NC | Shadow 0 16px 44px rgba(0,0,0,.5) x2 dark-constant; delete hover rgba(239,68,68,.15) hand-rolled | Shadow → --shadow-dropdown; delete tint → --error-tint; §2.7/§2.5.1/§6 |
| drag ghost (.expl-drag) | public/index.html:728 (+2518) | NC | Shadow 0 8px 24px rgba(0,0,0,.5) dark-constant (surfaces token-correct) | → --shadow-dropdown; §2.7 |
| hover file preview (filepeek) | public/index.html:730-757 | NC | Card shadow 0 18px 50px rgba(0,0,0,.55) dark-constant; .pk-md a color:#3B82F6 literal (741) won't darken in light | Shadow → --shadow-dropdown; link → var(--accent2) (#60A5FA dark / #1D4ED8 light); §2.7/§3.3 |
| document popup shell | public/index.html:759-769,2327-2334 | NC | dp-box shadow 0 30px 90px rgba(0,0,0,.6) dark-constant/non-token (scrim ok) | Box shadow → --shadow-modal; §5/§2.7 |
| docpop rendered md (dp-md) | public/index.html:771-784 (+19,428) | NC | Links #3B82F6 literal; hover fallback var(--accent-hover,#2563EB) references UNDEFINED var so literal is constant; --code-fg self-ref leaves .md pre code colorless in dark | Links → var(--accent2); define --accent-hover both themes; fix --code-fg/--prose to real values; §2.3/§3.3 |
| docpop code viewer + syntax highlight | public/index.html:785-786 | UN | pre.dp-code #D8D8D8 and .h-s #7EC699 / .h-n #E5C07B / .h-k #61AFEF dark-only literals — near-invisible on white | Convert to vars (--code-fg, --hl-str, --hl-num, --hl-kw) with darkened light pairs; §3.3/§17 |
| undo/upload toast (.utoast) | public/index.html:808-812 | NC | Shadow 0 10px 30px rgba(0,0,0,.4) dark-constant; action hover = filter:brightness(1.1) instead of accent-hover step | Shadow → --shadow-dropdown; hover → --accent-hover; §2.7/§2.3/§9 |
| properties popup (proppop) | public/index.html:813-827 | NC | pp-box shadow 0 24px 70px rgba(0,0,0,.55) dark-constant/non-token (rest tokenized) | Shadow → --shadow-modal; §5/§2.7 |
| file-type icon sheet (icons.js) | public/icons.js:5 | UN | SHEET '#2A2A2A', FOLD '#3D3D3D', LINE '#565656' dark-only artwork baked into every file icon; stays a dark slab on light | Emit fills from CSS vars (fill='var(--icon-sheet,#2A2A2A)') with light pairs, or record exception; §3.3/§16 |
| file-type badge colors (icons.js) | public/icons.js:8-12 | OT | Ext badge hexes mostly value-equal to tokens; '#EAB308' is the one off-palette stray | Read from shared palette map keyed to tokens (light variants darken per §2.5); pick a token for JS or record exception |

## index: settings + toasts + inbox + modals — 8 compliant · 2 OT · 12 NC · 2 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| root-tokens | public/index.html:9-31 | NC | Legacy alias names app-wide; light values drift; light --elev = brightness-based elevation; accent-soft collision | Rename to canonical + sync light values to §2/§3.3; light elevation = #FFFFFF + shadow; rename .13 tint to --accent-glow |
| modal-shell | public/index.html:202-204 | NC | Scrim rgba(0,0,0,.55) literal; box shadow 0 24px 60px rgba(0,0,0,.6) no light pairing; radius 14 vs modal 12 | --shadow-modal + --overlay tokens themed per §5; radius 12 per §14 |
| modal-nav | public/index.html:210-215 | OT | Active = --accent-soft bg (= canonical glow) + --primary, no border — correct pattern on repurposed alias names | Rename to --accent-glow bg; icon → --accent-soft dark / --accent-text light; §16/§2.7 |
| text-inputs (.tinput) | public/index.html:237-238 (+3547,3567,3570-3573) | NC | Rest border --line2 (#333 = border-hover) not --input-border #2A2A2A; focus ring 3px --accent-tint (.08) not --accent-glow (.13) | Rest → --input-border; focus → --accent border + 0 0 0 3px --accent-glow; §15 |
| buttons-mbtn2 | public/index.html:239-242 | NC | Radius 8 vs 7; primary hover var(--accent-hover,#2563EB) — var never defined, literal fallback carries it | Radius 7 per §20.1; define --accent-hover #2563EB in :root, drop fallback |
| selects (.sel) | public/index.html:156-159 (used at 3552,3557) | NC | Chevron data-URI stroke #6c6c78 (no token, can't swap for light); focus border only, no 3px ring | currentColor-driven SVG mask or two themed data-URIs; add 3px --accent-glow focus ring; §15 |
| range-slider | public/index.html:3554-3555 | NC | Unstyled native range — UA default blue track in both themes | Minimum accent-color:var(--accent) + color-scheme; ideal styled track --bg-tertiary / thumb --accent; §17 |
| toast | public/index.html:878-879 (JS 1317) | NC | Shadow 0 10px 30px rgba(0,0,0,.4) no light pairing; radius 11 off-scale; body text --primary at 13px | Shadow → --shadow-dropdown themed; radius 10; message text --text-secondary; §5, §4 |
| utoast-undo | public/index.html:809-812 (JS 2571-2572,2786-2793) | NC | Same hardcoded shadow; button hover filter:brightness(1.1) violates flat-accent rule | Hover → --accent-hover; themed --shadow-dropdown; radius 10; §20 |
| ninbox-shell | public/index.html:185-186 | NC | Popover shadow 0 24px 60px rgba(0,0,0,.55) unpaired for light | Shadow → --shadow-dropdown themed (rest correct); §5 |
| usage-chip (.uchip warn/crit) | public/index.html:162-168 | NC | Warn/crit border literals rgba(245,158,11,.35)/rgba(239,68,68,.4) — arbitrary alphas, no light pairing | Themed warning/error tint tokens (13% dark / 10% light) or color-mix; §2 |
| upop-shell | public/index.html:169-174 | NC | Shadow 0 24px 60px rgba(0,0,0,.6) unpaired for light | Shadow → --shadow-dropdown themed; §5 |
| usage-panel (.ucard/.enable) | public/index.html:893-910 | NC | .ucard radius 11 vs 10; .enable --grad alias, radius 6 vs 7, hover #2563EB literal | Card radius 10; button radius 7 + hover --accent-hover; --grad → --accent; §14, §20 |
| usage-bar-colors-js | public/index.html:3261 barColor() (inline at 3265,3307) | UN | 3 hardcoded '#EF4444'/'#F59E0B'/'#22C55E' in inline style — stay dark in light mode | Return 'var(--danger)'/'var(--warn)'/'var(--good)'; §2 |
| confirm-dialogs | public/index.html:1488,2804,3075 | UN | 3 destructive confirms use browser-native confirm() — no CRS styling, no theme, no danger button | In-app confirm modal on .modal-wrap/.modal-box with --error danger button; §14/§20 |
| motion-transitions | public/index.html:162,179,188,191,207,211,228-229,234,239 | OT | ~10 ad-hoc .12s/.15s/.18s durations | Swap to --transition 160ms + --transition-colors 200ms ease-in; §5 |

## index: kanban + list views — 3 compliant · 6 OT · 6 NC · 0 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| kanban-toolbar-container | public/index.html:336 | OT | Border-bottom legacy --line (value-equal) | Rename → --border-default; §2.2 |
| segmented-controls (.seg2 Board/List + Project/All) | public/index.html:311-315,340 (markup 1162-1170) | NC | Inactive label --muted (spec --text-secondary); inner radius 8 vs 7; transition .15s; track/active pattern itself correct | Inactive → --text-secondary, radius 7, --transition/--transition-colors; rename aliases; §20.1, §2.8, §2.9 |
| filter-search-input (.kb-search) | public/index.html:337-338 | NC | Border --line2 not --input-border; focus ring 3px --accent-tint (.08) not --accent-glow (.13); radius 8 vs 7; ~34px vs 36-38 | --input-border; focus 0 0 0 3px accent-glow; radius 7; 36px height; §2.2, §14, §2.9 |
| toolbar-file-count (.kb-count) | public/index.html:339,1171 (JS 1622) | OT | Legacy --muted + --mono (values match) | Rename --muted → --text-muted; keep mono for numbers; §2.4/§4 |
| kanban-column-shell (.kb-col) | public/index.html:343 | OT | bg --panel + border --line (value-equal); radius 12 (modal-scale) on card-level container | Rename; radius 12→10 (--radius-card); §2.1/§2.2/§2.9 |
| column-header (.kb-col-head/.kn) | public/index.html:344-345 | NC | .kn uppercase header 12px/700 vs spec 10.5-11px; legacy vars | font-size 11px; rename --primary/--line; §4, §2.4 |
| count-pills (.kc) | public/index.html:346,357 | OT | Legacy vars (value-equal); pill radius 999, mono numbers — pattern fine | Rename to --text-muted/--bg-tertiary/--border-hover (or --radius-pill 20); §2.4/§2.9/§4 |
| kanban/list-file-cards (.kb-card) | public/index.html:348-352 (JS 1616) | NC | Hover changes border to --accent (spec: bg change only) and promotes title --secondary → --primary; radius 9 vs 10; transition .12s | Hover: bg → --bg-elevated, drop border change (or --border-hover), drop .knm promotion; radius 10; token transitions; §14, §2.8, §2.9, §17 |
| extension-badges (.kbadge) | public/index.html:353 (JS 1616) | NC | 9.5px no 600 weight vs badge spec 10-11px/600; legacy vars | 10px/600; rename vars; neutral badge per §20.7, --radius-badge |
| empty/loading states (.kb-empty/.kb-loading) | public/index.html:354-355 (JS 1600,1624,1626,1628) | OT | Legacy --muted only; pattern matches §14 | Rename → --text-muted; §2.4/§14 |
| list-view-section-headers (.kb-sec-head) | public/index.html:356 (JS 1626) | OT | Legacy --muted; sizing matches §4 | Rename → --text-muted; §4 |
| motion/theme-crossfade coverage | public/index.html:34 (+312,337,348) | NC | Global 200ms color-transition allowlist omits every .kb-* element; .kb-card/.seg2 blanket .12s/.15s — theme switch snaps on the board | Add .kb-col,.kb-card,.kb-search,.kb-toolbar,.kbadge,.kc to --transition-colors rule; hover via --transition 160ms; §2.8 |

## map.html galaxy map — 1 compliant · 6 OT · 19 NC · 6 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| root-surface/border palette | public/map.html:8-9 | NC | --bg #0A0A0C --panel #141417 --panel2 #1C1C21 --line #26262C --line2 #35353D — bespoke blue-blacks, NOT token values; no --line3/--elev; cascades into every family below | Replace with canonical values or import tokens.css + alias; add light pairs via data-theme; §2 |
| root text vars | public/map.html:10 | OT | --primary/--secondary/--muted value-equal under legacy names, dark only | Rename to --text-* + light pairs; §3.3 |
| scrollbars | public/map.html:17-24 | OT | Hardcoded #333333/#3D3D3D/#141417 — value-equal but literal and dark-only | var(--border-hover)/var(--border-active)/var(--bg-secondary); §2 |
| brand header (.by) | public/map.html:28-33 | NC | Byline colored var(--c-skill) orange #F97316 — accent outside token palette | --text-muted or --accent-text; orange is not a system color; §5 |
| buttons/menu-btn | public/map.html:35-37,251-253 | NC | Hover border orange; .on = orange text + orange border (color+border combo); radius 6 vs 7 | Hover --border-hover; active = --accent-tint bg + --accent-text, no border change; radius 7; §20, §2.7 |
| panel/menu surface | public/map.html:39 | NC | rgba(20,20,23,.92) + backdrop-blur — hardcoded translucent near-black | --bg-elevated + --border-default + --shadow-dropdown (no blur-glass); §2 |
| inputs/search+focus | public/map.html:41-42,84-85,100-101,149-150,201-202 | NC | 5 input families: focus = border-color accent only, NO 3px glow ring; wrong bg values; dock input radius 12 / 15px font | Focus: --accent border + 0 0 0 3px --accent-glow; bg --bg-tertiary, border --input-border, radius 7; §16, §2.7 |
| segmented controls (.seg/.bseg) | public/map.html:44-47,79-80,259-261,285-302 | NC | ~10 groups: active = solid accent bg + accent border + #fff text (forbidden combo); idle text --muted | Active = --accent-tint bg + --accent-text, border unchanged (bg+text only); §20, active-state rule |
| sliders | public/map.html:49-50,303-309 | NC | range accent-color orange var(--c-skill); .val readout orange (3 sliders) | accent-color var(--accent); .val = --accent-text or --text-secondary + JetBrains Mono; §4, §17 |
| checkbox (.chk) | public/map.html:51-52,305 | UN | accent-color var(--accent) correct pattern but dark-only page | No pattern change; inherits fix once root tokenized + light pairs; §16 |
| secondary buttons | public/map.html:53-55,64-65,133-137,195 | UN | Correct secondary-button pattern on wrong-value dark-only vars | Retarget to --bg-tertiary/--border-default/--text-secondary, hover --border-hover; light pairs from tokens; §20 |
| bake button | public/map.html:56-57,311 | NC | Orange border + text, hover orange tint — off-palette CTA | Primary: --accent bg + #fff, hover --accent-hover; or outline --accent-text + --accent-tint hover; §20 |
| board drawer surface | public/map.html:60-70 (+228) | NC | Drawer rgba(16,16,19,.94)+blur; .bcol rgba(255,255,255,.025); .chead .dot 0 0 8px currentColor GLOW; .cnt rgba(255,255,255,.06); mobile embed #101013 | Drawer --bg-secondary + top border; columns --bg-tertiary + --border-default; drop glow; badge --na; §2.7, §2 |
| board tabs (.btabs) | public/map.html:81-83 | NC | .on = orange text + orange tint bg | Active = --accent-tint bg + --accent-text; §20, §5 |
| filter chips (.fc) | public/map.html:86-89,1321 | OT | .on uses var(--accent-soft, rgba .13) as BG (glow value under soft name) + accent border + primary text | Rename to var(--accent-tint) bg, text --accent-text, drop border change; §5, §20 |
| cards (bcard/icard/tile) | public/map.html:72-75,91-98,104-117 | NC | Cards --panel2 + dept-color left border (ok) but tile iframe #0f0f12 hardcoded (2x), .cap rgba(10,10,12,.88), radius 7/8 mixed | Card --bg-tertiary; iframe/cap → --bg-primary / --bg-elevated at .9; standardize radius; §2 |
| idea tag/priority colors | public/map.html:94,1298-1299 (JS-injected 1432,1437) | OT | .tag #60A5FA on rgba tint; IDEA_COLS + PRI hexes value-equal to tokens but hardcoded/injected | Read from CSS vars: --accent-soft/--accent-tint, --purple, --warning, --success, --error; §5 |
| hover preview (hpv) | public/map.html:119-125 | NC | bg #101014; shadow 0 18px 50px rgba(0,0,0,.6) bespoke; iframe #0f0f12; .hcap rgba(10,10,12,.9) | --bg-elevated + --border-hover + --shadow-modal; caps --bg-elevated; §2 |
| preview panel + md styles | public/map.html:128-166 | NC | pv rgba(14,14,17,.97)+blur; iframe #fff/#181818 literals; md code/link #60A5FA hardcoded (light needs #1D4ED8); pre #0b0b0e; mark ORANGE rgba(249,115,22,.35)+#fff; white-alpha fills; --tc/--sc fallbacks hardcoded | Surface --bg-elevated + --shadow-modal; links/code var(--accent-text); pre --bg-primary + --border-default; mark = --warning 13% tint; white-alphas → --bg-tertiary/--na; §2, §3.3, §5 |
| ref panel | public/map.html:169-184,314-317,708-726 | UN | Correct var(--error) usage but sits on hardcoded rgba(20,20,23,.92) surface, dark-only | Surface --bg-elevated + --shadow-dropdown; keep --error; light pairs from tokens; §2, §5 |
| tooltip | public/map.html:186-187,1208-1214 | UN | Correct tooltip shape, hardcoded dark surface rgba(20,20,23,.95) | --bg-elevated + --border-hover + --shadow-dropdown; §2 |
| hint text | public/map.html:188,318 | UN | --muted 10.5px helper — right role, dark-only var | var(--text-muted) once root tokenized; §3.3 |
| Ask-the-Brain dock | public/map.html:192-205,319-326,1579,1604 | NC | rgba(20,20,23,.94)+blur + bespoke shadow; radius 16; orange dot + orange hits highlight; Ask btn radius 12 + hover #2563EB hardcoded | Surface --bg-elevated + --shadow-modal, radius 12 or 10; dot/hits → --accent or --success; btn radius 7, hover var(--accent-hover); §2, §20, §5 |
| canvas background | public/map.html:971,1116 | NC | ctx.fillStyle '#0A0A0C' full-frame clear + center-node inner hex — wrong value vs --bg-primary #181818, breaks in light | Read getComputedStyle var --bg-primary per theme change (REF_ACCENT pattern at 499); §2 |
| canvas node palette | public/map.html:12-13,364-365,482,1406 (+1368,1402) | NC | MEMC 8 purples incl. off-token; COL skill/center ORANGE #F97316, routine YELLOW #EAB308, app #60A5FA — categorical colors outside status palette; injected into board dots | Map to token set: --purple/--purple-accent + tints, --warning routines, --accent-soft apps, --accent skills/center; expose as CSS vars read at draw time; §5 |
| canvas glows/nebulas/pulses | public/map.html:920-928,977-984,1066-1073,1093-1097 | NC | Radial-gradient glow sprites on every node + nebula fog + gradient comet tails + white pulse heads — glow/gradient outside exceptions | If galaxy art is sanctioned exception, document it; otherwise flatten: solid dots, token-color pulses, no radial glows; §2.7 |
| canvas decorative bg (stars/meteors/guides) | public/map.html:937,952,962,988-1017 | UN | Hex lattice white-alpha; stars #AEB8D8/#6E7690; meteors rgba(190,205,255); guides + ring labels hardcoded — invisible-on-light art | Derive from --text-muted/--border-default alphas + tokenized ring colors (--accent-soft/--warning/--purple/--accent); theme-aware redraw; §2, §5 |
| canvas labels/badges | public/map.html:1135-1149 | OT | Labels '#E0E0E0' / rgba(166,166,166) / white-alpha badge — values equal tokens but literal, dark-only | Read --text-primary/--text-secondary/--na via getComputedStyle; badge fill --na, stroke --border-active; §3.3 |
| canvas flash toast | public/map.html:1152-1156 | NC | Toast text fillStyle '#F97316' orange | --accent (info) or --success token; §5 |
| canvas app/routine node fills | public/map.html:1102-1107 | NC | App hex fill rgba(30,41,59,.9) slate-800 + glyph #DBEAFE blue-100; routine ring rgba(234,179,8,.16) yellow tint | App fill --bg-tertiary + --accent-soft glyph; routine → --warning at 13% tint; §5 |
| error fallback overlay | public/map.html:1615 | OT | JS-injected div with inline color:#A6A6A6 literal (= --text-secondary) | color:var(--text-secondary); §3.3 |

## tree.html progress tree — 1 compliant · 10 OT · 10 NC · 2 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| root-token-block | public/tree.html:8-16 | UN | Page-local dark-only palette, legacy names; missing input-border/disabled/glow/text/motion/shadow tokens; no light values, no data-theme | Replace with canonical paired tokens + [data-theme] light overrides per §2.10/§3.1; then rename all var() uses |
| body-base | public/tree.html:18 | OT | bg/color correct pattern via legacy names; base 14px vs body 12-13px | --bg-primary + --text-secondary; 13px per §4 |
| header (h1/.sub/.saved/a.back) | public/tree.html:20-24,107-108 | OT | Correct patterns via legacy names; letter-spacing -.02em vs -.03em | Rename; h1 letter-spacing -0.03em per §4 |
| summary-card | public/tree.html:25 | NC | Radius 12 on a card (card=10, 12 is modal-only); padding below §15's 18-24px | Radius 10, --bg-secondary + --border-default; §2.9, §15 |
| progress-bar+legend | public/tree.html:26-31 + JS COLOR :138, inline :169-171 | OT | Track/segments/dots via legacy names in CSS + JS inline backgrounds; not-started uses text token --muted as surface fill | Rename in CSS and JS COLOR map; --na for not-started fill per §2.5.1 |
| toolbar-filter-select+checkbox | public/tree.html:105,124-130 | NC | Select border --line vs --input-border; radius 8 vs 7; no focus ring; bare native checkbox | --input-border, radius 7, focus 3px --accent-glow; style checkbox per §20.2 |
| module-item-cards | public/tree.html:36-42 | NC | transition border-color .12s vs --transition-colors 200ms ease-in; pattern otherwise correct via legacy names | var(--transition-colors); rename to canonical border scale; keep no card shadow; §2.7/§2.8 |
| section-labels (.sec-label) | public/tree.html:35 | OT | Matches §4 section-header; legacy var; spacing .09em vs .1em | Rename --muted→--text-muted; letter-spacing 0.1em |
| grip/ord/caret row furniture | public/tree.html:43-48 | OT | Legacy names; caret transform .15s vs --transition; open caret --accent2 needs light pair | Rename to --text-muted/--accent-soft; var(--transition); light --accent-text; §2.8/§3.3 |
| badges (.sec-tag/.doc-tag) | public/tree.html:51-52 (+285,294) | NC | Radius 4 vs badge 5; .doc-tag border rgba(34,197,94,.4) literal (tint should be 13%) | Radius 5; --success + success-tint per §2.5.1/§20.7; no inline rgba per §17 |
| status-pills | public/tree.html:55-59 (:296) | NC | 4 variants: hardcoded rgba borders .4/.35 + hover .1 tints; .12s transition; roadmap text --accent2 needs light --accent-text | Status color + 13% tint tokens per §2.5/§2.5.1; var(--transition-colors); --accent-soft dark / --accent-text light; §3.3 |
| move-buttons (.mv button) | public/tree.html:61-64 (:290-293) | NC | 22x16px below 28px minimum; radius 5 vs 7; disabled opacity .25 vs 0.5 | 28px ghost icon-button per §20.1/§20.6, radius 7, disabled 0.5 per §14; rename vars |
| detail-panel-surface | public/tree.html:66 | UN | background:#1B1B1B literal matching NO token — breaks in light, violates §17 | --bg-primary (inset contrast) or --bg-tertiary per §2.1; never a literal |
| detail-section-headers (.dsec h4) | public/tree.html:69 | OT | Uppercase 10.5/700 ✓ but colored --accent2 — dark-only accent-as-text | --accent-soft with light pair --accent-text per §3.3, or --text-muted per §4 |
| pre-blocks (.dsec pre) | public/tree.html:71 | OT | Correct inset-code pattern, legacy names | Rename to --bg-primary/--border-default/--text-secondary; §2.1/§4 |
| mentions (.mention/.mline) | public/tree.html:72-74 | OT | Legacy names only | Rename to --text-primary/--text-muted/--border-hover |
| file-links (.filelinks a) | public/tree.html:75-77 | NC | Radius 6 vs 7; --accent2 text needs light pair; hover --elev + --primary; no transition token; no focus style | Radius 7; --accent-soft/--accent-text pair; hover --bg-elevated via --transition-colors; focus ring per §14 |
| buttons (.btn/.btn.primary) | public/tree.html:79-84 (:258-259,263) | NC | Radius 8 vs 7; hover #2563EB + color:#fff literals; .15s; disabled .55 vs 0.5; no focus ring, no :active | Radius 7; hover var(--accent-hover), active var(--accent-active); --transition-colors; disabled 0.5 + focus 3px --accent-glow; §14/§20.1 |
| textareas (.promptbox/.reqta) | public/tree.html:87-90 | NC | Radius 8 vs 7; border --line2 vs --input-border; focus border-only no glow ring; .reqta text --primary | Radius 7, --input-border, focus --accent + 3px --accent-glow; §14/§2.3 |
| checklist (.chk-state etc.) | public/tree.html:92-102 (:232) | NC | Tri-state checkbox with hardcoded rgba .4 borders; done should be fill + white check not colored outline; .chk-detail placeholder uses BORDER token --line3 as text; focus = dashed border swap, no ring | §20.2 checkbox spec (done fill --success + white check, partial --warning-tint); tints §2.5.1; placeholder --text-disabled; focus per §14 |
| empty/loading states (.empty) | public/tree.html:106 (:132,150,312) | OT | Matches §14 Empty; legacy var; Loading is plain text | Rename → --text-muted; optional skeleton rows per §14 |
| js-injected-inline-styles | public/tree.html:169-171,232,255,261,263,126 | OT | ~8 inline style attrs with legacy var names; legend count in Inter not JetBrains Mono | Move to classes with canonical tokens; counts JetBrains Mono 600 per §4 |

## wishlist.html + queue.html — 0 compliant · 4 OT · 16 NC · 1 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| page-theme/:root token block | wishlist.html:8-15 + queue.html:8-15 | UN | Two identical dark-only legacy blocks; no light pairs, no data-theme; Inter never declared | Replace with canonical paired block from §2.10 + data-theme; rename all legacy usages; §2, §3.1 |
| page shell/body typography | wishlist.html:17 + queue.html:17 | NC | System font stack, not Inter; base 14px vs 12-13px (pattern otherwise correct) | Declare Inter; body 13px --text-secondary on --bg-primary; §4 |
| page title h1 + .sub | wishlist.html:21-22 + queue.html:21-22 | NC | h1 20px/600/.2px vs 22-28px/700/-0.03em; .sub uses --muted for essential copy | Title 22px/700/-0.03em --text-primary; subtitle --text-secondary; §4, §18 |
| buttons/secondary (.hbtn, modal .bh, Refresh) | wishlist.html:26-28,86-87 + queue.html:24-25 | NC | Resting border --line2 with hover --line3 — border scale shifted one step; radius 8 vs 7; .15s (4 instances) | Default --border-default, hover --border-hover; radius 7; --transition-colors; §2.2/§2.8/§2.9/§14 |
| buttons/primary (Add, Run queue, Copy) | wishlist.html:35-36,88 + queue.html:26-27,37 | NC | Hover = filter:brightness(1.08) — brightens in both themes, violates hover-darkens-in-light; #fff literal; radius 8 vs 7 | Hover --accent-hover, active --accent-active, no brightness filter; radius 7; §2.3/§3.3/§14/§20.1 |
| inputs/selects/textarea (add forms) | wishlist.html:31-34 + queue.html:33-36 | NC | bg --panel vs field --bg-tertiary; border --line2 vs --input-border; focus = --line3 border only — no accent, no glow ring; radius 8 vs 7 (5 controls) | --bg-tertiary + --input-border; focus --accent + 3px --accent-glow; radius 7, height 36-38; §5/§14/§2.9 |
| section headers (.sechead + .cnt pill) | wishlist.html:39-43,169 + queue.html:39-41 | NC | 12px vs 10.5-11px; count pill not mono; Done header injects inline style color:var(--good) via JS | 10.5-11px/700, 0.1em, --text-muted; mono counts; replace JS inline style with class; §4, §17 |
| item cards (.item) | wishlist.html:45-48 + queue.html:42-44 | NC | Radius 11 vs 10; transition .12s; .item.done opacity .72 ad-hoc (border pattern correct) | Radius 10, --transition-colors; keep border-only elevation; §2.7-2.9 |
| status checkbox (.chk cycle) | wishlist.html:49-54 | NC | Done check color #0b1a0f dark-only literal on --good fill; border 1.6px --line3 vs --input-border; hover border --secondary (text token as border) | Checked check #fff per §20.2; box --input-border; --border-hover on hover; §2.2 |
| priority badges (.prio-*) | wishlist.html:57-61 | NC | rgba .15 tints vs 13% tokens; literal #F87171; rgba .3 borders untokenized | --error/--warning 13% tints + --error-soft/--warning text; tokenize borders; §2.5.1/§20.7 |
| inline-edit focus (.ititle/.idetail) | wishlist.html:62-67 | NC | Focus = 1px --line3 shadow + --panel2 bg instead of 3px --accent-glow ring (2 rules) | Focus ring 3px --accent-glow + accent border; §14 |
| row action icon buttons (wishlist .iacts) | wishlist.html:68-77 | NC | 26x22px vs 28px minimum; .12s; hidden-until-hover | 28px ghost, --transition-colors 200ms; §20.6/§2.8/§14 |
| row action glyph buttons (queue .iacts) | queue.html:56-58,100 | NC | Text glyphs ↑ ↓ ✕ instead of Feather icons; 26x22px; no transition token | Feather chevron-up/down/x stroke icons, 28px ghosts; §16/§20.6 |
| modal (.pm overlay + .box) | wishlist.html:80-89 | NC | Radius 14 vs 12; ad-hoc dark shadow; overlay untokenized; border --line2; title 14px vs 17px/700 | Radius 12, --shadow-modal (theme-paired), border --border-default, title 17px/700 --text-primary; §5/§2.7/§2.9 |
| modal model tag (.mtag) | wishlist.html:85 | OT | Legacy vars; badge pattern matches spec | Rename to --text-muted/--border-hover; §20.7 |
| toast | wishlist.html:93-94,137 | NC | Surface --elev + --line2 vs spec --bg-secondary + --border-active; dark-only shadow; .2s ease slide vs 420ms spring; 1.9s dismiss vs ~3.5s; text --primary | --bg-secondary, --border-active, shadow token, 420ms spring cubic-bezier(.16,1,.3,1), ~3.5s, title/message type split; §9 |
| empty states (.empty/.secempty) | wishlist.html:43,92 + queue.html:59 | OT | Legacy --muted, italic ghost text (3 instances) | Rename → --text-muted; optional CTA per §14 |
| queue banner (paused/running) | queue.html:28-31,91-96 | NC | rgba .4 borders untokenized; status text as body; emoji glyphs ⏸ ▶ via JS instead of icons; no bg tint | Warning/accent 13% tint bg + tokenized borders + --warning/--accent-soft text; Feather pause-circle/play; §2.5.1/§16/§20.7 |
| queue status chips (.st-*) | queue.html:45-50 | NC | Tints .15/.12 vs 13%; literal #F87171; rgba .3 borders; running mixes tint bg with hardcoded border | Back all five with status tokens + 13% tints per badge taxonomy; §2.5.1/§20.7 |
| meta/log mono text (.imeta/.ilog, pm pre) | queue.html:53-55 + wishlist.html:89 | OT | Legacy vars; mono ✓; weight 400 vs 600 for meta (minor) | Rename; meta weight 600; §4 |
| saved-state indicator (.saved) | wishlist.html:24-25,138 | OT | Legacy status vars for idle/ok/saving/err; pattern fine | Rename to --text-muted/--success/--warning/--error (or -soft for legibility); §2.5 |

## memory.html + activity.html — 1 compliant · 7 OT · 11 NC · 2 UN

| family | loc | verdict | issue | fix |
|---|---|---|---|---|
| root-tokens | memory.html:8-15 + activity.html:8-15 | UN | Duplicated per-page dark-only :root with legacy names; no light values, no data-theme | Replace with canonical tokens from design/tokens.css paired under :root[data-theme]; §2/§3.3 |
| typography/body | memory.html:17 + activity.html:17 | NC | System font stack, not Inter; base 14px vs 12-13px | Inter + 13px body; keep --text-secondary default; §4 |
| headings/subtitles (h1, .sub) | memory.html:21-22 + activity.html:22-23 | OT | Correct pattern via legacy names | Rename --primary→--text-primary, --muted→--text-muted; §4/§5 |
| buttons/secondary (.hbtn) | memory.html:24-26 + activity.html:25-27 | NC | Radius 8 vs 7; .15s shorthand (hover pattern itself OK; 2 instances per page) | Radius 7; var(--transition-colors); rename vars; §20.1/§2.7 |
| callouts (.tip/.note) | memory.html:28-29 + activity.html:66-67 | NC | Radius 9 vs card 10; legacy vars/transition (accent-bar pattern fine) | Radius 10; keep border-left --purple/--accent canonical, bg --bg-secondary; §20/§2 |
| mono/code text | memory.html:30 + activity.html:53 | UN | color:#DADADA hardcoded (2x) — invisible-on-white in light | var(--text-primary); bg --bg-tertiary, border --border-default; §4/§2 |
| inputs (add-row + search) | memory.html:33-37 + activity.html:30-34 | NC | Resting border --line2 vs --input-border; radius 8/9 vs 7; focus only shifts to --line3, no glow ring; memory inputs have no focus style at all | --input-border, radius 7; :focus/:focus-within → --accent + 0 0 0 3px --accent-glow; §16/§20 |
| buttons/primary (Add) | memory.html:38-40 | NC | Hover filter:brightness(1.08) — inverts in light; radius 8 vs 7; #fff literal | Hover --accent-hover, active --accent-active; radius 7; var(--transition-colors); §20.1 |
| section-headers (.cathead/.dayhead) | memory.html:43-45 + activity.html:41 | NC | .cathead 12px vs 10.5-11px; .dayhead sticky uses linear-gradient — gradient not allowed | 11px; solid var(--bg-primary) (or bottom border) for sticky; §4, §2 |
| cards (.mem entries) | memory.html:46-54 | OT | Correct card pattern (border-only, radius 10, no shadow) via legacy names + .12s | Rename; var(--transition-colors); §5/§14/§2.7 |
| empty-states | memory.html:56-57 + activity.html:63-64 | OT | Correct hierarchy via legacy names; 13.5/15px slightly above scale | Rename; nudge to 13/14px; §4/§17 |
| toast | memory.html:58-59 | NC | Shadow 0 10px 30px rgba(0,0,0,.4) dark-only; radius 11 non-step | var(--shadow-dropdown); radius 10; --bg-elevated + --border-hover; §2, §20 |
| links | activity.html:18 | OT | Global a color via legacy --accent2; light needs #1D4ED8 | color:var(--accent-text) (theme-aware); §2 |
| segmented/filter-chips (.chip) | activity.html:36-38 (+JS 129-136) | NC | Active combines bg + border-color + text — violates active = bg+text NO border rule | Active: --accent-tint bg + --accent-text, border stays resting --border-default; §15/§20 |
| rows/timeline (.row/.time) | activity.html:43-49 | OT | Correct pattern via legacy names; .12s | Rename; var(--transition-colors); JetBrains Mono for times per §4; §14 |
| badges/type-dots (JS-injected) | activity.html:50 + 102-116 (TYPES) + 182,185 | NC | 13 type styles inject hardcoded rgba tints as inline styles — untouchable by theme swap | Token classes (.type-chat{background:var(--accent-tint);color:var(--accent-text)} etc. at 13%/10% tints), swap inline styles for class names; §2, §14 |
| tags (.tag.sp/.br/.fail) | activity.html:55-58 (:175-177) | NC | Hardcoded border literals rgba(34,197,94,.3)/rgba(239,68,68,.35); .tag.br via legacy --accent2 | Borders → status tint tokens at 13%; .br → --accent-text; rename base vars; §2, §14 |
| buttons/icon-delete (.mem .del) | memory.html:52-54 | OT | Correct 28px icon button pattern; legacy names + .15s only | Rename; var(--transition-colors); §20.1 |
| buttons/rollback | activity.html:59-61 (:179) | NC | Radius 6 vs 7; ~22px below 28px minimum; .15s | Radius 7, 28px height, var(--transition-colors), --danger→--error; §20.1 |
| meta-badges (.src/.count) | activity.html:51,65 | OT | Correct pattern via legacy names; .src border --line2 vs resting --border-default | Rename --muted→--text-muted; .src border var(--border-default); §14/§4 |

---

## Phase 2 sub-phase plan

Ordered execution plan. Each sub-phase groups the rows above by family; the token-rename
groundwork (every `tokens/root-*` row + the light-value correction + accent-soft/glow
untangle + `--shadow-*`/`--transition*`/`--accent-hover` token definitions) is a
**prerequisite pass (2.0)** that most sub-phases assume.

1. **map-panels** — map.html DOM chrome: root-surface/border palette, root text vars, scrollbars, brand header, buttons/menu-btn, panel/menu surface, inputs/search+focus, segmented (.seg/.bseg), sliders, checkbox, secondary buttons, bake button, board drawer, board tabs, filter chips, cards (bcard/icard/tile), idea tag/priority colors, hover preview, preview panel + md, ref panel, tooltip, hint text, Ask-the-Brain dock, error fallback overlay.
2. **map-canvas** — canvas background, node palette, glows/nebulas/pulses (decision: sanction or flatten), decorative bg, labels/badges, flash toast, app/routine node fills — all via getComputedStyle var reads (REF pattern, map.html:499).
3. **header** — center-head, viewseg, ghost-buttons, select (.sel), usage-chip, usage-popover, hicon+nbadge, ninbox, conndot, mbtn; plus sidebar: side-rail, col-collapse, brand, account-card, tabs-segmented, side-set, newbtn, chats-list, files-tree, bp-conn, sidenav, layout/columns.
4. **buttons** — quick-action cards, np-draft, composer/buttons, retry-bar+msg-acts, mbtn2, usage-panel .enable, tree .btn/.mv/file-links, wishlist/queue primary+secondary+iacts, memory Add/.del, activity rollback, template-cards hover.
5. **inputs** — chat-search, composer textarea, bp-composer, .tinput, range-slider, .kb-search, explorer search focus, tree select/checkbox/textareas/checklist, wishlist/queue form controls + .chk + inline-edit focus, memory/activity inputs. Uniform rule: --input-border rest → --accent + 3px --accent-glow focus.
6. **menus** — expl context menu + submenu, ninbox shell, usage popover shell (upop), modal-nav, header selects' dropdown chrome. Shadow → --shadow-dropdown.
7. **modals** — modal-shell (settings), document popup shell, proppop, explorer window shell, wishlist .pm modal, confirm-dialogs (replace native confirm x3). Shadow → --shadow-modal, radius 12.
8. **toasts** — .toast, .utoast (both), wishlist toast, memory toast, map canvas flash toast. Shadow token, radius 10, --accent-hover action, spring timing per §9.
9. **chips** — taskbar minchips (+ #5B9CF6 literal), attachment-chips, queue-strip qchips, activity filter chips + type badges + tags, wishlist priority badges, queue status chips + banner, .kbadge, .kc pills, tree badges/status-pills, uchip status borders, map filter chips.
10. **tables** — chat-markdown links+tables, docpop md/code/csv, filepeek md, dash list rows, tree pre/mentions, meta/log mono text.
11. **kpi** — kpi tiles, kpi/action/tool JS tint injection (UNTHEMED c-map), tools chip row, dash cards, greeting header, empty states, next-step meta dupes, progress-bar+legend (tree).
12. **scrollbars/selection** — global scrollbar rename, map scrollbars, motion/transitions consolidation (all screens' .12/.15/.18s literals → --transition/--transition-colors), kanban theme-crossfade coverage, kb-card/selection hover rules.
13. **standalone-pages-theming** — replace :root blocks + wire data-theme on tree.html, wishlist.html, queue.html, memory.html, activity.html, map.html; body typography (Inter, 13px), h1/sub scale, links, icons.js sheet fills + badge map, docpop syntax-highlight vars, error-text #e8938b, mono #DADADA, detail-panel #1B1B1B.
14. **explorer-verify** — regression pass over the 11 compliant explorer families after token renames (toolbar buttons, breadcrumbs, tree/quick-access, rows/selection, rename mask, marquee, cursor, status bar, csv/image cards, hf-bar, JS geometry styles) + the explorer NC fixes (upflash, winctl, drag ghost, folder icon).
15. **prefs-verify** — settings modal end-to-end in both themes: switches, segmented (incl. Appearance toggle vs corrected light --elev), settings-rows, mstat, sound selects + range slider, theme persistence (?theme/localStorage), and confirm the light palette correction didn't invert any active states.
