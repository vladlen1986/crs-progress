# REST API
> Source: https://docs.buildprint.ai/rest-api-crdvd · Captured: 2026-07-14 (verbatim .md)

Buildprint has a public REST API for starting agents, sending follow-up messages, reading agent status, managing code reviews, running automations, and working with Buildprint project tests.

The API is available during beta and may change.

## API reference

View the full API reference at:

https://docs.buildprint.ai/api-reference

OpenAPI is also available at:

```text
GET /api/public/v1/openapi.json
```

## Create an API token

Workspace admins can create REST API tokens from **Integrations > API**.

1. Click Create token.
2. Enter a token name.
3. Choose all projects or selected projects.
4. Copy the token.

The token is shown only once. Store it securely.

## Authentication

Send the token as a bearer token:

```bash
curl https://api.buildprint.ai/api/public/v1/agents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

REST API tokens are workspace-scoped and can be limited to selected projects.

## Available areas

The REST API includes endpoints for:

- Agents.
- Agent follow-up messages.
- Code reviews.
- Automations.
- Tests.
- Test groups.
- Test runs.
- Test users.

Some endpoints require Buildprint API access, Buildprint AI credits, connected provider credentials, or available agent concurrency.
