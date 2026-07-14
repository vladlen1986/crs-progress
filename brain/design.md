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

## Pending

- [ ] Ingest design changes here only as pointers/rule updates; token edits go to design/tokens.css directly.
