# CRS Brain — Master Index

**Read this file first, always.** It maps every knowledge domain to its file.
One fact = one home. Files below LINK to existing authoritative docs — they never duplicate them.

| Domain | File | What's inside |
|---|---|---|
| Database schema | [database.md](database.md) | Every Data Type: as-built vs spec-only, field notes, tenancy compliance |
| Option Sets | [option-sets.md](option-sets.md) | Every OS: as-built (Bubble) vs spec-only, entry counts, quirks |
| Security & privacy | [security.md](security.md) | Pattern A privacy rules per DT: built / pending / gaps |
| Backend workflows | [workflows.md](workflows.md) | Every workflow & "magic button": name, trigger, module, where in Bubble |
| Migrations | [migrations.md](migrations.md) | What's migrated, what's pending, HOW each migration runs, order, risks |
| Design system | [design.md](design.md) | Pointer → design/tokens.css, design/design.md (source of truth stays there) |
| Change history | [changelog.md](changelog.md) | Append-only: every ingest, date + summary |
| Buildprint manual | [buildprint/INDEX.md](buildprint/INDEX.md) | Scraped official docs — how Buildprint works: modes, agents, prompts, troubleshooting |

## Authoritative sources elsewhere (do NOT restate here)

| Topic | Source of truth |
|---|---|
| Architecture & product decisions | ../decisions.md (append-only) |
| Project facts, rules, conventions | ../CLAUDE.md |
| Module list (46) & sections (7) | ../data/CRS_Module_OptionSets.xlsx |
| Full module specs | ../specs/CRS_Blueprint.html (source: ../scripts/) |
| Design tokens / CSS | ../design/tokens.css, ../design/design.md |
| Pricing | ../pricing/tiers.md |

## Retrieval rules (for Claude)

1. Question about **schema/fields** → database.md. **Option sets** → option-sets.md.
   **Privacy rules** → security.md. **Workflows/buttons** → workflows.md.
   **"What do I migrate next / how"** → migrations.md. **Buildprint how-to** → buildprint/INDEX.md.
2. Every brain file uses the same skeleton: **Current state / Pending / Where in Bubble / Links** — jump to the section, don't read whole files.
3. If a fact isn't in brain/ or its linked sources, say so — never guess.

## Ingest rules (for Claude, on "Ingest to Brain")

1. Read the attached report fully.
2. Route each fact to exactly ONE brain file (per table above). Decisions → tell user to append to decisions.md, don't do it silently.
3. Update `Current state` / `Pending` sections; move completed items down, never delete history silently.
4. Append one dated entry to changelog.md summarizing the ingest.
5. Reply with a short "what I updated" list — file by file.
