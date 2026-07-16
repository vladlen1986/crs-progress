# Operating Buildprint via CLI + MCP — skip the paid web app

> How to build the CRS Bubble app entirely through the Buildprint **CLI** (+ optional **MCP**), driven by
> your own Claude, so you never pay for Buildprint web agent runtime. Grounded verbatim in the captured
> official docs under `brain/buildprint/` (cited inline). Companion: `crs-brain-operations.md` (the operating
> loop + CRS guardrails), `PROMPT-STANDARD.md` (how prompts are built).

---

## 0. The money thesis (confirmed by the docs)

- Buildprint plans: **Basic (free)**, Pro $49/mo, Team $249/mo, Enterprise. Metered on: members · projects ·
  logs allowance · **agent runtime** · agent concurrency. (`buildprint-paid-plans.md`)
- **Agent runtime = seconds of sandboxes running in Buildprint *web*. Only three features use sandboxes:
  chat, tests, and code reviews.** (`buildprint-paid-plans.md`)
- **Verbatim:** *"agents running on your own machine using Buildprint CLI/MCP will not use agent runtime."*
- ⇒ **Doing the work via the CLI, reasoned by your Claude, costs $0 Buildprint runtime.** You already pay
  Claude; the CLI just syncs/validates/applies locally and posts changes to Bubble's API. The web app's
  $50/20-hours only buys *their* cloud agents — which you skip.

**What still could cost / limit you (flag, not guess):**
- **Logs** have their own allowance (billed separately; "most users have no overages"). Reading logs via
  CLI/MCP draws on that, not runtime.
- **Buildprint tests + code reviews run in web sandboxes → they DO use runtime.** Verify locally with
  `buildprint login` + Agent Browser + `screenshot` (local) or manual checks instead, to stay off runtime.
- The **exact Basic (free) limits** (how many projects, log allowance, members) are in a pricing-page image
  the capture couldn't read — **verify on the pricing page** before assuming free covers everything. CRS is
  1 project / 1 member, which is the cheapest case.

---

## 1. What CLI vs MCP can and cannot do

| Capability | CLI | MCP | Notes |
|---|---|---|---|
| Clone a branch as editable files | ✅ `project clone` | — | each branch = a git worktree |
| Read/understand app structure | ✅ `summary`/`tree`/`context`/`find` | ✅ (via agent) | pages, RE, workflows, DTs, OS, styles, settings |
| Search Bubble **data** records | ✅ `data` (read) | ✅ search/fetch/aggregate | **READ-ONLY**; bypasses privacy rules (editor access) |
| Read server **logs** + workload usage | ❌ *(no CLI command)* | ✅ | **MCP or the web log dashboard only** — the CLI has no `logs` command. Draws on the logs allowance (not runtime); sensitive (emails/IDs) |
| Run Manual / API **automations** | ❌ *(no CLI command)* | ✅ | MCP-only from a Claude session |
| Manage log **monitors** | ❌ *(no CLI command)* | ✅ | MCP/web-only |
| **Edit** app structure (pages/WF/DT/OS/styles/settings/API-connector) | ✅ edit files → `apply` | ❌ *data tools can't edit* | MCP can *start agents* that edit (= web runtime) |
| Edit Bubble **database Things** | ❌ | ❌ | neither can create/modify/delete Things |
| Validate edits | ✅ `check` | — | the gate before `apply` |
| Push to Bubble | ✅ `apply` | — | requires a passing `check` (unless `--force-apply`) |
| Savepoints (Bubble restore points) | ✅ `savepoint create/list/restore` | — | goes through Bubble, per branch |
| Branches + merge | ✅ `branch`/`merge` | ✅ list branches | branching from **live is not allowed** |
| Security audit | ✅ `audit` | — | public DTs, public backend WFs, exposed uploaders, etc. |
| Tests / test users | ✅ `test-user`, browser `login`/`screenshot` (local) | ✅ manage | **web test *runs* use runtime** |
| Fetch private secrets | ✅ `secret` (explicit) | ❌ (filtered from snapshots) | you can pull them; don't paste them anywhere |
| Diff two branches | ✅ `changelog <a> <b>` | — | markdown or `--json` |

> **`buildprint data` discrepancy (flagged):** the CLI's own `--help` says *"Read **and write** Bubble
> database records,"* but `permissions-and-data-safety.md`, `connect-via-mcp.md`, and the agents doc all say
> Buildprint database tools are **read-only** ("cannot create, modify, or delete Things"). **Treat `data` as
> read-only** until you confirm otherwise; don't build a workflow that depends on writing Things via `data`.

---

## 2. Permissions (two layers — both must pass) (`permissions-and-data-safety.md`)

1. **Buildprint permission** — what *you* can do in Buildprint. Project roles: **Admin** (settings/invites),
   **Member** (Build mode), **Guest** (chat + Build in one project, for freelancers), **Read-only** (Plan-mode
   chat only).
2. **Bubble collaborator permission** — what Buildprint can actually do in Bubble, via the collaborator
   account **`connect@getbuildprints.com`**. Buildprint cannot exceed what that account is granted.

| To do this… | The `connect@getbuildprints.com` collaborator needs… |
|---|---|
| Inspect app structure | **App access** |
| Read-only database investigation | **Data access** |
| Log debugging | **Logs access** |
| Branch / version workflows | **Versions access** |
| Apply edits (`apply` / Build mode) | **Edit access** |

- **CLI token scope:** scoped to the projects chosen when the token was made — **but the CLI does NOT
  restrict branches/projects programmatically. It is YOUR responsibility to apply to the right place.** This
  is why the CRS rule "TEST branch only, never live" is a discipline, not a guardrail the tool enforces.

---

## 3. Plan mode vs Build mode → mapped to the CLI

Plan/Build is a **chat** concept ("every chat has an edit mode"). For a CLI-only workflow there is no toggle;
you just run read vs write commands. The mapping:

- **Plan mode (read, no edits)** ⇒ CLI: `sync` → `summary`/`tree`/`context`/`find` → `data` (read) →
  `audit`. (Server **logs** + workload usage are **MCP or web-dashboard only** — the CLI can't read them.)
  Use for: understanding the app, debugging, planning a change, reviewing risk. *Cannot apply edits.*
- **Build mode (edit)** ⇒ CLI: edit the shredded files → `check` → `apply`. Use for: actually implementing a
  feature. Requires Bubble collaborator **Edit access** + a non-read-only branch.

**Recommendation:** always do a Plan pass first (explore + audit + read the relevant DTs/workflows), decide
the change, **then** Build (savepoint → edit → check → apply). Never Build without the Plan pass — the CLI
happily applies to the wrong branch.

---

## 4. The workflow (per feature)

```bash
# 0. get on the right branch, fresh
cd ~/projects/crs-bubble/casinoreportingsystem/test
buildprint sync                      # ALWAYS first — pull latest Bubble snapshot
buildprint sync status               # confirm clean / merged

# 1. PLAN (read only)
buildprint summary                   # top-level surfaces
buildprint tree <page/reusable>      # UI structure
buildprint context <node>            # one node + its relationships
buildprint data '<query>'            # read records if needed (read-only)
buildprint audit                     # security scan

# 2. BUILD (one step at a time)
buildprint savepoint create "Before <step>"   # rollback point BEFORE the apply
#   …edit the shredded files for this ONE step…
buildprint check                     # must pass
buildprint apply                     # push this step to Bubble
#   if check/apply fails → fix, or `buildprint savepoint restore <ts>` then `buildprint sync`

# repeat savepoint → edit → check → apply per step. Then:
buildprint changelog live test       # readable diff before any cutover
```

- **Snapshots go stale:** if anyone edits in the Bubble editor after your last `sync`, your workspace is
  stale — `sync` again before continuing (`permissions-and-data-safety.md`).
- **`apply` refuses if out of sync** — it tells you to `sync` first; do NOT `--force-apply` around that.

---

## 5. First-session setup (once)

```bash
npm install -g buildprint                      # install (Node ≥18)
buildprint link <token>                        # Integrations → CLI → create token (a password; run in terminal)
buildprint quickstart                          # the agent playbook — read it once
buildprint project list                        # find the appId
buildprint project clone <appId> --branch test # editable Test worktree
# optional MCP (adds live data/logs/tests to a Claude session):
claude mcp add --transport http --header "Authorization: Bearer <MCP_TOKEN>" buildprint <ENDPOINT>
```

MCP token: Buildprint → **Integrations → MCP** → Create MCP server → copy endpoint + bearer token (shown
once). Revoke at Integrations → MCP → token menu → Revoke. (`connect-via-mcp.md`)

Bubble side: make sure `connect@getbuildprints.com` has App + Data + Logs + Versions + **Edit** access.

---

## 6. Most-used commands

`sync` · `sync status` · `summary` · `tree <t>` · `context <t>` · `find <ids>` · `data '<q>'` · `audit` ·
`savepoint create "…"` / `list` / `restore <ts>` · `check` · `apply` · `branch list <appId>` ·
`branch create "x" --from test` · `merge <from> <to>` · `changelog <a> <b>` · `schema "<q>"` ·
`guidelines get` · `secret` · `quickstart`.

---

## 7. Do NOT do this (safety)

- ❌ **Apply to `live`.** The CLI won't stop you (no branch restriction). Test/dev branch only; branching
  from live is disallowed by the CLI anyway.
- ❌ **`--force-apply` around a "not synced" error** — it can overwrite newer Bubble editor changes with
  stale local files. `sync` instead.
- ❌ **`sync --reset --confirm`** unless you intend to discard all local work.
- ❌ **Paste secrets** into chats, skill instructions, review comments, or files you ask an agent to edit.
  Buildprint filters secrets from snapshots; you re-expose them by pasting. Rotate if exposed.
- ❌ **Trust `data` results as privacy-filtered** — Buildprint DB access **bypasses privacy rules** (editor
  access). Treat every row as sensitive.
- ❌ **Assume the workspace is current** — someone editing in Bubble makes it stale; `sync` first.
- ❌ **Batch many changes into one `apply`** — one step per apply, savepoint before each (CRS rule).
- ❌ **Run Buildprint web *tests* / *code reviews* casually** — those use sandbox runtime (metered). Verify
  locally (Agent Browser `login` + `screenshot`, or manual) to stay free.
- ⚠️ Extra review for: privacy rules, data types, backend workflows, payments, auth, API Connector, and
  anything near production or user data (`permissions-and-data-safety.md`).

---

## 8. Not documented / verify before relying on
- Whether the **Basic (free)** plan permits unlimited `apply` and how many projects/logs it includes (image-
  only in the capture).
- Whether `buildprint data` can **write** Things (CLI help says yes; safety docs say read-only — assume no).
- Whether local Agent-Browser **tests** avoid runtime entirely, or only web-hosted test *runs* are metered.
