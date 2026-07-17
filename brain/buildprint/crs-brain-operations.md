# Operating Buildprint from CRS Brain

> How the CRS Brain assistant drives Buildprint directly via the CLI. Written 2026-07-14.
> The CLI is installed at `~/.local/bin/buildprint` (v4.2.6 as of 2026-07-17; auto-updates daily — as-shipped command/flag reference: `cli-help-reference.md`).
> CLI runs locally and consumes NO Buildprint agent runtime.

## Connection status

- [x] CLI installed (`buildprint --version`)
- [x] **Linked** (2026-07-14) — requires Vlad's one-time action: Buildprint → **Integrations → CLI** → create token → `buildprint link <token>`. The token is a password — never paste it into chat; run the link command yourself in Terminal.
- [x] App cloned: casinoreportingsystem Test branch → ~/projects/crs-bubble/casinoreportingsystem/test — after linking: `buildprint project clone <appId> --branch dev` (into a folder OUTSIDE this repo, e.g. `~/projects/crs-bubble/`)
- [ ] Optional MCP: Buildprint → Integrations → MCP → create server, then `claude mcp add --transport http --header "Authorization: Bearer <TOKEN>" buildprint <ENDPOINT>` (adds data search, logs, WU usage, automations, tests to every Claude session)

## The operating loop (Bubble-as-code)

```bash
buildprint sync                       # ALWAYS first — pull latest Bubble snapshot
# → PLAN the change as numbered steps, get Vlad's go-ahead, THEN per step:
buildprint savepoint "<step name>"    # rollback point BEFORE the apply
# …edit the shredded files for this ONE step…
buildprint check                      # validate — MUST pass; if it fails, fix (or `savepoint restore`)
buildprint apply                      # compile + push this step to Bubble
# …repeat savepoint → edit → check → apply for each step. One step per apply.
```

**Loop = plan once, then per step: savepoint → edit → check → apply.** A savepoint before every apply keeps each step independently rollback-able. (`check` gates `apply` — same order as CLAUDE.md and the official quickstart.)

**Before editing any surface, read the matching agent guideline** — Buildprint's own internal editing contracts (exact JSON schemas, `bp_layout`, expressions, security audits). All 29 are captured under [guidelines/](INDEX.md#cli-agent-guidelines-guidelines); live fetch: `buildprint guidelines get <path>`.

Key commands: `buildprint quickstart` (conventions) · `project list` / `branch list <appId>` ·
`sync status` (drift check without changes) · `changelog <a> <b>` (readable branch diff) ·
`audit` (6-check security scan: public DTs without privacy rules, public backend workflows,
exposed uploaders, temp-password leaks, missing redirects, secrets) · savepoints via git history.

## HARD GUARDRAILS (CRS project rules — decisions.md 2026-05-01, these override docs)

1. **dev/test branch ONLY. Never clone, edit, or apply the live branch.**
2. **Always `buildprint sync` before starting work** — editor edits are invisible until synced, and the next apply can clobber them.
3. **Savepoint before every apply; `buildprint check` must pass before every apply. One step per apply. NEVER use `--force-apply`, `--no-check`, or `sync --reset --confirm`** without Vlad explicitly approving in that same conversation.
4. **Show the plan first**: describe the exact files/entities to change and expected Bubble effect; get Vlad's go-ahead before the first `apply` of a session.
5. **After every applied change**: report what changed, then ingest the summary into brain/ (database.md / workflows.md / etc.) same session.
6. Schema changes must respect Pattern A: every business Data Type gets `company` + `property` fields and both-field privacy rules.
7. If anything looks off (stale branch, suspicious shrink, conflicts) — stop and surface it; never bulldoze.

## What this replaces / complements

- Replaces: pasting Claude-written prompts into the Buildprint web chat for routine schema/workflow edits.
- Complements: Buildprint web agents (still fine for big exploratory work); `buildprint audit` becomes a routine pre-session check.
- Database records: `buildprint data create/update/delete` DOES write Things immediately (confirmed v4.2.6 + agent guidelines; docs site is stale on this). **Test DB only; any live-DB write needs Vlad's explicit approval in that conversation.**
