# Design — Pointer File

> Design facts live in `../design/` — source of truth stays there. This file only tells you where to look and what's locked. **Do not restate token values here.**

| Need | Go to |
|---|---|
| Token values (colors, radii, spacing, motion) | ../design/tokens.css |
| Plain-text token reference | ../design/Styles.txt |
| Rules, reasoning, locked design decisions | ../design/design.md |
| Component showcase | ../design/CRS_UI_Kit.html |
| Sidebar / Coming Soon patterns | ../demos/CRS_Canvas.html · ../demos/CRS_Coming_Soon.html |

## Locked design rules (from CLAUDE.md — enforcement checklist)

- Default body text = `--text-secondary` (#A6A6A6), NOT primary. Primary reserved for headings/key info.
- Active states: bg + text color change only — never bg + border + text together.
- No `line-through` on completed items.
- Cards: border only, no shadow (`--shadow-card: none`).
- Sidebar: 256px, sections collapsed by default, one RG per section.
- Never hard-code colors — tokens only.

## As-built in Bubble (2026-07-15 inventory — pointers only)

- `design_system` page (`pages/bpeelt`): live component-gallery sandbox, 209 demo workflows (toggle/set-state/theme switch). Non-production tooling — keep as the in-app UI-kit reference.
- Supporting option sets: `OS - Design System Nav Item` (36 entries), `OS - UI Kit Menu` (15), `OS - Control Size` (5: 28–48px), `OS - Avatar Size`, `OS - Color` (12 + color_code attr).
- Bubble styles live in the workspace `styles/` folder (not yet inventoried in detail).

## Pending

- [ ] Ingest design changes here only as pointers/rule updates; token edits go to design/tokens.css directly.
- [ ] Verify Bubble `styles/` folder matches design/tokens.css (not yet audited).
