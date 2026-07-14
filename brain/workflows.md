# Backend Workflows & "Magic Buttons"

> Every workflow that exists in Bubble gets a row here: what triggers it, what it does, which module owns it, where to find it. This is the file that answers "where is that button / workflow?"

## Current state (as-built on dev branch)

- ⚠️ **No workflows confirmed built yet in the new architecture.** Casino Settings session lists all four of its workflows as pending.
- The legacy live app (pre-rebuild) has existing backend workflows powering Reporting/Tasks/RFI — **not yet inventoried**. First Buildprint Plan-mode inventory should capture: name, trigger type, steps, DTs touched → ingest here.

## Workflow tracker

| Workflow | Trigger | Module | Status | Where in Bubble |
|---|---|---|---|---|
| Save Company | Button (Casino Settings → Identity card) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Save Property | Button (Properties tab) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Add Property | Button (Properties tab) | Casino Settings | ❌ pending | RE_CasinoSettings |
| Logo upload | File uploader | Casino Settings | ❌ pending | RE_CasinoSettings |
| ActivityLog write | Schedule API Workflow (async) | System Activity Log | spec | Backend workflows — polymorphic subject_type/subject_id (locked architecture) |
| Numbering (reports/RFI/tasks/warnings) | On create | cross-module | spec | Counter DT, keyed (company, date), atomic increment |
| Legacy workflows (Reporting, Tasks, RFI, …) | various | legacy live app | ❓ to inventory | Backend workflows tab, live branch |

## Conventions

- Async writes (audit log, notifications) go through **Schedule API Workflow** — never inline on user actions.
- Workflow edits happen via **Buildprint Build mode**, dev branch only, Claude-written prompts, review plan before approving (decisions.md 2026-05-01).
- UI elements follow naming: `#PP - Name` popups, `#GR - Name` reusables, `#FG - Name` floating groups — workflows live with their element.

## Pending

- [ ] Build 4 Casino Settings workflows (current session priority per decisions.md 2026-05-02)
- [ ] Buildprint inventory of ALL legacy backend workflows → fill tracker
- [ ] Spec ActivityLog async writer when System Activity Log is rebuilt

## Links

- Audit architecture: ../CLAUDE.md (locked decisions #7) · ../specs/CRS_Blueprint.html
- Buildprint rules & prompt patterns: ../decisions.md 2026-05-01
