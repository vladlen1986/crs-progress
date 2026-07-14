# REST API
> Source: https://docs.buildprint.ai/rest-api-crdvd · Captured: 2026-07-14

Buildprint offers a public REST API for initiating agents, transmitting follow-up messages, retrieving agent status, handling code reviews, executing automations, and managing project tests.

The API is in **beta** and subject to potential modifications.

## API reference

Complete API documentation: https://docs.buildprint.ai/api-reference (captured locally in [api-reference.md](api-reference.md)).

OpenAPI specification:

```text
GET /api/public/v1/openapi.json
```

## Create an API token

Workspace administrators generate REST API tokens from **Integrations > API**:

1. Select Create token.
2. Provide a token name.
3. Select all projects or specific projects.
4. Store the token securely.

The token displays only once.

## Authentication

Include the token as a bearer token:

```bash
curl https://api.buildprint.ai/api/public/v1/agents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

REST API tokens operate at the workspace level and may be restricted to particular projects.

## Available areas

Endpoints for:

- Agents
- Agent follow-up messages
- Code reviews
- Automations
- Tests
- Test groups
- Test runs
- Test users

Certain endpoints require Buildprint API access, Buildprint AI credits, connected provider credentials, or available agent concurrency.
