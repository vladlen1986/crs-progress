# Connect via MCP
> Source: https://docs.buildprint.ai/connect-via-mcp-rw0bm · Captured: 2026-07-14

Buildprint MCP lets supported AI clients call Buildprint tools for your Bubble apps.

MCP clients can search data, inspect logs, list projects and branches, run automations, manage tests and monitors, search Buildprint docs, and start Buildprint agents where enabled.

## Before you start

- Connect your Bubble app to Buildprint.
- Complete collaborator and ownership verification.
- Use an AI client that supports HTTP MCP servers.
- "Treat the bearer token as a secret."

## Create an MCP server

1. In Buildprint, go to **Integrations > MCP**.
2. Click Create MCP server.
3. Choose all projects or selected projects.
4. Click Create MCP server.
5. Copy the MCP endpoint and bearer token.

The bearer token is shown only once. Do not share it or commit it to a repository.

The endpoint identifies the Buildprint MCP server. The bearer token controls who can use it and which projects it can access.

## Install in Cursor

Use the Add to Cursor button shown after creating the MCP server, or add an HTTP MCP server using the endpoint and bearer token.

## Install in Claude Code

Run the command shown in Buildprint. It follows this shape:

```bash
claude mcp add --transport http --header "Authorization: Bearer YOUR_BEARER_TOKEN" buildprint YOUR_MCP_ENDPOINT
```

Restart Claude Code if the server does not appear immediately.

## Install in other clients

If your client asks for JSON config, use:

```json
{
  "mcpServers": {
    "buildprint": {
      "type": "http",
      "url": "YOUR_MCP_ENDPOINT",
      "headers": {
        "Authorization": "Bearer YOUR_BEARER_TOKEN"
      }
    }
  }
}
```

## What MCP can do

Buildprint MCP includes tools for:

- Listing Buildprint projects.
- Searching Buildprint docs.
- Searching, fetching, and aggregating Bubble data records.
- Reading Bubble server logs and workload usage.
- Listing Bubble branches.
- Running Manual / API automations.
- Creating and managing tests, test groups, test users, and test runs.
- Creating and managing log monitors.
- Starting Buildprint agents where enabled.

## Editing and safety

MCP data tools cannot edit Bubble database records.

"MCP servers do not grant unlimited editing by themselves." Any agent that edits still depends on the request, user permissions, project permissions, branch permissions, and Bubble collaborator permissions.

## Revoke access

To remove access, go to Agent > Integrations > MCP, open the token menu, and click Revoke. Create a new MCP server if you need a replacement token.
