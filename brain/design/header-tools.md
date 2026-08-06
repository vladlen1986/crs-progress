# Header tool groups (Vlad, 2026-08-06)

Every tool that lived in the dashboard "Tools" strip moves into the HEADER as
grouped menus. Goal: one place for everything, discoverable on hover, quiet at
rest. Obeys brain/design/claude-code-spec.md — greyscale, 13px/12px, r6/r8,
menu shadow only.

## Groups (labels are sentence case, 13px)
- **Build** — Progress Tree · Prototypes · App Preview · Wishlist
- **Knowledge** — Memory · Playbook · Bubble data · Files
- **Ops** — Activity log · Task queue · Weekly digest · Ingest report · Cost
- **View** — the existing Chat / Map / Kanban / List segmented control (unchanged,
  stays a segment, not a menu)

## Trigger
- A header button per group: 13px label + 12px chevron, ink --cc-text-secondary,
  hover ink --cc-text-primary + fill --cc-bg-hover-canvas, radius 6, height 24.
- Opens on HOVER (150ms intent delay) and on CLICK/Enter/Space; closes on mouse
  leave (200ms grace so the pointer can travel), Esc, outside click, or blur.
- aria-haspopup="menu", aria-expanded, roving focus with ↑/↓, Home/End, Esc.

## Menu
- Popover: fill --cc-bg-panel, 1px --cc-border, radius 8, shadow --cc-shadow-menu
  (the ONLY shadow allowed), padding 4px, min-width 200px, 4px below the trigger.
- Items: 26px tall, radius 6, 13px --cc-text-body, 14px monochrome icon at
  --cc-text-muted, 10px gap; hover fill --cc-bg-hover-canvas + ink
  --cc-text-primary. No coloured icons, no emoji, no badges unless the item
  carries a real count (12px --cc-text-muted, right-aligned).
- Separator: 1px --cc-border-divider, 4px margins.

## Rules
- Keyboard reachable and screen-reader labelled; never hover-only.
- The dashboard Tools strip is REMOVED once the header carries the same actions —
  no duplicate navigation (design.md §17 forbids two competing places).
- Existing onclick handlers are reused verbatim; this is a relocation, not a
  rewrite of behaviour.
