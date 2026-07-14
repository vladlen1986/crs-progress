# How Buildprint works
> Source: https://docs.buildprint.ai/how-buildprint-works-ds53k · Captured: 2026-07-14 (verbatim .md)

Buildprint connects AI tools to your Bubble app so they can inspect, debug, test, document, and, when you allow it, make app-structure changes.

Buildprint does not replace Bubble. Bubble stays the source of truth for your app, branches, database, logs, and editor changes. Buildprint gives agents a safer way to understand and work with that app.

## What Buildprint can access

After you connect a Bubble app, Buildprint can help agents work with:

- **App understanding and editing:** pages, elements, reusable elements, workflows, backend workflows, data types, option sets, styles, settings, and branches.
- **Logs:** Bubble server logs when log sync is enabled.
- **Database access:** read-only searches, fetches, and aggregate queries.
- **Buildprint tools:** tests, automations, monitors, reviews, branches, and version history.

Buildprint cannot edit records in your Bubble database. Database access is only used for investigation and debugging.

## How setup works

A typical setup looks like this:

1. Create a Buildprint project for your Bubble app.
2. Invite `connect@getbuildprints.com` as a Bubble collaborator.
3. Verify ownership and collaborator permissions.
4. Sync the Bubble branch you want Buildprint to understand.
5. Use Buildprint chat, MCP, CLI, or REST API tools to inspect the app, test behavior, or request changes.

When you sync a branch, Buildprint stores a snapshot of that branch's app structure. Agents use that snapshot to reason about your app without pulling the whole Bubble editor state every time.

Database records are different. Buildprint does not store your Bubble database as project state. Records are fetched only when you request them through read-only tools.

## Credentials and safety

Connected AI provider credentials are user-specific and encrypted before storage.

Private API Connector values and private plugin secrets are not exposed to Buildprint agents. Buildprint also cannot go beyond the Bubble collaborator permissions you grant.

Buildprint is read-only by default. Build mode can make app-structure changes only when editing is enabled and the relevant Buildprint, branch, and Bubble permissions allow it.

You should still review and test important AI-generated changes before relying on them.

## Key concepts

**Workspace:** your team space in Buildprint.

**Project:** a connected Bubble app.

**Branch:** a Bubble app version, such as test, live, or a feature branch.

**Version snapshot: **a synced point-in-time view of one Bubble branch.

**MCP server:** a public MCP server that lets external AI clients use Buildprint tools.

**Agent:** an AI task that can investigate, test, document, or, when allowed, edit your Bubble app.

## What Buildprint does not do

Buildprint does not:

- Automatically modify your live app without edit permissions.
- Replace Bubble version control, savepoints, or manual testing.
- Store a copy of your Bubble database as Buildprint state.
- Expose private API Connector values or plugin secrets to agents.
