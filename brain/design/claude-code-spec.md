# Claude Code Desktop — 1:1 design spec for the CRS Brain app

Source of truth for the BRAIN APP's UI (2026-08-06, Vlad). Where this and any
app CSS disagree, this wins. The CRS PRODUCT design system (design/tokens.css,
brain/design/CRS-design-system.md §2.10) is unaffected — it still governs the
Bubble app and every prototype.

## PRIME DIRECTIVE
The app is NOT orange. It is a warm near-black greyscale UI.
Clay #D97757 appears ONLY on the Claude spark glyph / thinking spinner.
No orange backgrounds, borders, headings, buttons, active states, focus rings
or links. Selection/hover/active = a lighter neutral grey surface, never a hue.
Hue is semantic only, at text scale: green added, red removed, yellow
permission, blue links/file refs, purple auto-accept.
Flat: no gradients, glows, coloured shadows, glassmorphism. Elevation is a
2-5% lightness step. Every neutral is warm (R>=G>=B, R-B between 0 and 3).

## SURFACES  sidebar #1D1D1C · canvas #20201F · panel #262626 · card #2F2F2F
composer #2C2C2A · subtle #292928 · control #313131 · control-strong #393938
selected #343433 · segment-track #2A2A29 · segment-thumb #40403F
hover #262625 · hover-canvas #2A2A29

## BORDERS  panel #373737 · sidebar #3B3B39 · composer #3D3D3B · segment #474746
divider #343433 · soft rgba(255,255,255,.06) · hairline rgba(255,255,255,.10)
focus ring rgba(255,255,255,.22) — never coloured

## INK  primary #E8E6E1 · body #C3C2B7 · secondary #939393 · muted #7F7F7F
faint #5F5F5C · placeholder #727272

## SEMANTIC  +#32D74B  −#FF2C56  warning #DB9300  permission #E7BD15 on #37321E
link #6DA7EC · info #4782C8 · purple #AF87FF · plan #48968C
diff add #4EBA65 on rgba(76,195,138,.14) · del #FF6B80 on rgba(255,90,90,.12)

## TYPE — only two sizes
13px/20px body, nav, titles, buttons, composer · 12px/16px meta, headers,
pills, timestamps · bold runs 600 (never 700+) · inline code 12.5px mono
Reasoning/"thinking" text is ITALIC 13px #7F7F7F — a signature of the UI.
Section headers: 12px sentence case, no uppercase, no letter-spacing.
Letter-spacing 0 everywhere. Font: Segoe UI Variable Text stack, never Inter.

## RADII  4 code · 6 chip/row/button/segment-thumb · 8 card/panel/track ·
10 composer/git bar · 50% only avatars and status dots

## METRICS  titlebar 36 · sidebar 370 (pad-x 8) · nav row h26 pitch28 ·
content max-w 768 centred · panel 512 inset 8 · composer 44 · button 24 ·
pill 20 · scrollbar 6 · 4px spacing grid · paragraph gap 20

## STATE MATRIX
nav row: transparent/#939393 · hover #262625 · active #2F2F2F ·
selected #343433 + #E8E6E1 · focus 1px rgba(255,255,255,.22) inset
button: #313131/#C3C2B7 · hover #393938 · active #2A2A29 · disabled #5F5F5C
icon button: transparent/#7F7F7F · hover rgba(255,255,255,.06) r4
card: #2F2F2F no border · composer: #2C2C2A + #3D3D3B, focus border .20 white
link: #6DA7EC, underline on hover

## MOTION  fast 60ms linear (hover fills) · base 200ms cubic-bezier(.32,.72,0,1)
Nothing bounces, nothing scales, no translateY lifts. Honour reduced-motion.

## SHADOWS  only menus/popovers: 0 12px 40px rgba(0,0,0,.45). Cards, buttons,
inputs and panels have none.

## TELLS TO DESTROY
rounded-xl/2xl/full on cards & buttons · uppercase tracking-wider headers ·
shadow-lg on cards · 16px body copy · pure #000 or cool slate backgrounds ·
coloured focus rings · gradient headers · emoji as icons · chrome icons >=20px ·
font-weight 700 · a border on every card
