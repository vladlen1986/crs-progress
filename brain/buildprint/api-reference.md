# API Reference (REST)
> Source: https://docs.buildprint.ai/api-reference (all endpoint pages; parameters generated from the official OpenAPI schema at https://api.buildprint.ai/api/public/v1/openapi.json) · Captured: 2026-07-14

OpenAPI: **Buildprint Public API 1.0.0**. The public REST API is in **beta**; endpoints are available but subject to change.

## Getting started

Base URL:

```
https://api.buildprint.ai/api/public/v1
```

Retrieve the OpenAPI schema:

```bash
curl https://api.buildprint.ai/api/public/v1/openapi.json
```

### Creating a token

1. A workspace admin navigates to Agent > Integrations > API
2. Generate a REST API token with a descriptive identifier
3. Securely store the returned `bp_` token (displayed once only)
4. Include the token in requests as `Authorization: Bearer bp_...`

Tokens support workspace-wide or project-specific scoping. Tokens restrict access to a single workspace and verified projects only; revocation immediately halts future requests.

### Quick start example

```bash
BASE_URL="https://api.buildprint.ai/api/public/v1"
TOKEN="bp_your_workspace_token"

curl --request POST "$BASE_URL/agents" \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "appId": "your-bubble-app-id",
    "prompt": "Inspect the checkout flow and tell me why the webhook retry path fails.",
    "model": "buildprint-gpt-5.3-codex"
  }'

curl --request GET "$BASE_URL/agents/<agentId>" \
  --header "Authorization: Bearer $TOKEN"
```

### Models & execution

- Buildprint-hosted models use workspace credits; provider models require active user credentials.
- Reasoning effort options: none, low, medium (default), high.
- Permissions: read_only (default), allow_edits.

### Status values

- `queued` — accepted, awaiting execution
- `running` — actively executing
- `completed` — successfully finished
- `error` — terminated with error

### Completion webhooks

Agent and code review requests accept `completionWebhookUrl`. Upon terminal state, Buildprint sends a JSON payload (non-2xx responses trigger retries).

### Common errors

- 401 Unauthorized
- 402 api_access_required
- 402 insufficient_paid_credits
- 400 user_email_required
- 403 user_not_workspace_member
- 403 missing_provider_credentials

## Automations

### GET /automations

**List automations**

Returns automations configured for the requested app, including whether each one can be run through the Manual / API trigger.

Parameters:

- `appId` (query, string) **(required)** — App ID.

Responses:

- **200** — Automations found
  - `automations` (array of object) **(required)** — Automations configured for the requested app.
    - `id` (string) **(required)** — Automation ID.
    - `projectId` (string) **(required)** — Project ID that owns the automation.
    - `name` (string) **(required)** — Automation name.
    - `enabled` (boolean) **(required)** — Whether the automation is currently enabled.
    - `triggerKind` (enum: `manual` \| `live_deployed` \| `branch_merged` \| `branch_created` \| `branch_removed` \| `cron`) **(required)** — Configured automation trigger kind.
    - `triggerDescription` (string) **(required)** — Human-readable trigger summary.
    - `actionKinds` (array of enum: `run_tests` \| `deploy_agent` \| `send_message` \| `send_webhook`) **(required)** — Action kinds configured on the automation, in order.
    - `canRunManually` (boolean) **(required)** — Whether this automation can be run through the Manual / API trigger.
    - `createdByName` (string or null) **(required)** — Display name of the user who created the automation.
    - `createdAt` (number) **(required)** — Creation time in unix milliseconds.
    - `updatedAt` (number) **(required)** — Last update time in unix milliseconds.
    - `lastRunAt` (number or null) **(required)** — Most recent execution time in unix milliseconds, if the automation has run.
    - `lastRunError` (string or null) **(required)** — Last recorded execution error, if any.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /automations/{automationId}/run

**Run automation**

Queues a manual automation run. Only automations configured with the Manual / API trigger can be run through this endpoint.

Parameters:

- `automationId` (path, string) **(required)** — Automation ID.

Responses:

- **202** — Automation run queued
  - `automationId` (string) **(required)** — Automation ID that was queued.
  - `status` (string) **(required)** — Queued execution status.
  - `queuedAt` (number) **(required)** — Time the execution was queued in unix milliseconds.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

## Agents

### POST /agents

**Start an agent run**

Starts a workspace-scoped agent conversation for the specified Bubble app and immediately queues the initial prompt.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
- `prompt` (string) **(required)** — User prompt to send to the model.
- `model` (enum: `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna`) **(required)** — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
- `reasoningEffort` (enum: `none` \| `low` \| `medium` \| `high`) — Requested reasoning effort for the selected model.
- `permission` (enum: `read_only` \| `allow_edits`) — Whether the run can only inspect the app or is also allowed to make edits.
- `permittedBranches` (array of string) — Branches the run is allowed to access when branch restrictions apply.
- `completionWebhookUrl` (string) — Webhook URL Buildprint will call when the run completes.
- `userEmail` (string) — Email of the Buildprint user whose provider credentials should be used.

Responses:

- **202** — Agent accepted
  - `agentId` (string) **(required)** — Opaque identifier for the linked agent conversation.
  - `kind` (string) **(required)** — Discriminator describing the kind of object returned.
  - `status` (enum: `queued` \| `running` \| `completed` \| `error`) **(required)** — Current high-level lifecycle state for the asynchronous run.
  - `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
  - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — Payment required (insufficient credits or API access)
- **403** — User not a workspace member or missing provider credentials
- **409** — The workspace has reached its concurrent agent limit

### GET /agents/{agentId}

**Get agent status and recent history**

Returns the current state, lifecycle metadata, and recent conversation history for a REST-created agent run.

Parameters:

- `agentId` (path, string) **(required)** — Identifier of the agent conversation to retrieve.
- `historyLimit` (query, integer) — Maximum number of recent history items to return. Defaults to 100 and caps at 500.

Responses:

- **200** — Agent found
  - `agentId` (string) **(required)** — Opaque identifier for the linked agent conversation.
  - `kind` (enum: `agent` \| `code_review`) **(required)** — Type of REST API resource represented by the response.
  - `status` (enum: `queued` \| `running` \| `completed` \| `error`) **(required)** — Current high-level lifecycle state for the asynchronous run.
  - `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
  - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
  - `projectName` (string) **(required)** — Human-readable name of the workspace project.
  - `reviewId` (string or null) **(required)** — Opaque identifier for the code review.
  - `model` (enum: `claude-opus-4.6` \| `claude-opus-4.7` \| `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-4.6` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `openai-gpt-5.4` \| `openai-gpt-5.3-codex` \| `openai-gpt-5.2` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna` \| `buildprint-gpt-5.5` \| `buildprint-gpt-5.4` \| `buildprint-gpt-5.3-codex` \| `buildprint-claude-sonnet-4.6` \| `buildprint-claude-sonnet-5` \| `buildprint-qwen-3.6-plus-free` \| `buildprint-gemini-3-flash-preview` \| `buildprint-glm-5` \| `buildprint-minimax-m2.7` \| `buildprint-mimo-v2-omni` \| `buildprint-kimi-k2.6` \| `buildprint-kimi-k2.5`) **(required)** — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
  - `reasoningEffort` (enum: `none` \| `low` \| `medium` \| `high` or null) **(required)** — Requested reasoning effort for the selected model.
  - `permission` (enum: `read_only` \| `allow_edits`) **(required)** — Whether the run can only inspect the app or is also allowed to make edits.
  - `permittedBranches` (array of string) **(required)** — Branches the run is allowed to access when branch restrictions apply.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
  - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
  - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
  - `lastError` (string or null) **(required)** — Last error message recorded for the run.
  - `history` (array of object) **(required)** — Recent conversation history for the run.
    - `id` (string) **(required)** — Unique identifier for the history message.
    - `sequence` (number) **(required)** — Conversation sequence number for the message.
    - `role` (enum: `user` \| `assistant` \| `thinking` \| `tool` \| `system` \| `error`) **(required)** — Normalized role for the history message.
    - `content` (string or null) **(required)** — Message content when the message carries textual content.
    - `toolName` (string or null) **(required)** — Tool name associated with the message when the message represents tool activity.
    - `toolParameters` (object or null) **(required)** — Structured tool arguments when the message represents a tool call.
    - `attachments` (array of object or object) **(required)** — Files and linked issues attached to the message.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the message was created.
  - `lifecycle` (object) **(required)** — Lifecycle summary for the linked agent conversation.
    - `conversationState` (enum: `draft` \| `ready` \| `running_turn` \| `errored` \| `archived`) **(required)** — Internal lifecycle state of the linked conversation.
    - `sandboxState` (enum: `none` \| `provisioning` \| `booting` \| `online` \| `paused` \| `dead`) **(required)** — Current lifecycle state of the sandbox used by the run.
    - `queuedTurnCount` (number) **(required)** — Number of turns still queued to run.
    - `lastLifecycleEventAt` (number or null) **(required)** — Unix timestamp in milliseconds for the most recent lifecycle event.
- **401** — Unauthorized
- **404** — Agent not found

### POST /agents/{agentId}/messages

**Send a follow-up message to an existing agent conversation**

Appends a follow-up prompt to an existing REST-created agent run and can update the run's edit permission or branch scope.

Parameters:

- `agentId` (path, string) **(required)** — Identifier of the agent conversation to continue.

Request body (required):

- `prompt` (string) **(required)** — User prompt to send to the model.
- `permission` (enum: `read_only` \| `allow_edits`) — Whether the run can only inspect the app or is also allowed to make edits.
- `permittedBranches` (array of string) — Branches the run is allowed to access when branch restrictions apply.
- `completionWebhookUrl` (string) — Webhook URL Buildprint will call when the run completes.

Responses:

- **202** — Follow-up accepted
  - `agentId` (string) **(required)** — Opaque identifier for the linked agent conversation.
  - `kind` (string) **(required)** — Discriminator describing the kind of object returned.
  - `status` (enum: `queued` \| `running` \| `completed` \| `error`) **(required)** — Current high-level lifecycle state for the asynchronous run.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — Payment required (insufficient credits or API access)
- **403** — User not a workspace member or missing provider credentials
- **404** — Agent not found
- **409** — Follow-up could not be accepted because the conversation kind is unsupported or the concurrent agent limit was reached

## Code Reviews

### GET /code-reviews

**List code reviews**

Returns all code reviews for one app, grouped into open, merged, and closed status buckets. Within each bucket, the most recently created reviews appear first.

Parameters:

- `appId` (query, string) **(required)** — Bubble app ID for the project whose code reviews should be listed.
- `limit` (query, integer) — Maximum number of reviews to return in each status bucket.

Responses:

- **200** — Code reviews found
  - `open` (array of object) **(required)** — Open code reviews for the app.
    - `sequence` (number) **(required)** — Human-readable sequence number for the review within the project.
    - `mergeId` (string) **(required)** — Stable merge identifier for the review.
    - `status` (enum: `open` \| `merged` \| `closed`) **(required)** — Current review status.
    - `title` (string or null) **(required)** — Review title.
    - `description` (string or null) **(required)** — Optional review description provided at creation time.
    - `fromVersion` (string) **(required)** — Source branch or version being reviewed.
    - `toVersion` (string) **(required)** — Target branch or version being compared against.
    - `fromVersionLabel` (string or null) **(required)** — Display label for the source branch or version.
    - `toVersionLabel` (string or null) **(required)** — Display label for the target branch or version.
    - `requestedByName` (string or null) **(required)** — Display name of the user who requested the review.
    - `requestedByEmail` (string or null) **(required)** — Email of the user who requested the review.
    - `requestedByImage` (string or null) **(required)** — Avatar URL for the user who requested the review.
    - `linearIssueId` (string or null) **(required)** — Linked Linear issue ID when one is associated.
    - `linearIssueIdentifier` (string or null) **(required)** — Linked Linear issue identifier when one is associated.
    - `provider` (enum: `claude` \| `openai` \| `gemini` \| `opencode` \| `cursor`) **(required)** — Provider backing the selected model.
    - `model` (enum: `claude-opus-4.6` \| `claude-opus-4.7` \| `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-4.6` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `openai-gpt-5.4` \| `openai-gpt-5.3-codex` \| `openai-gpt-5.2` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna` \| `buildprint-gpt-5.5` \| `buildprint-gpt-5.4` \| `buildprint-gpt-5.3-codex` \| `buildprint-claude-sonnet-4.6` \| `buildprint-claude-sonnet-5` \| `buildprint-qwen-3.6-plus-free` \| `buildprint-gemini-3-flash-preview` \| `buildprint-glm-5` \| `buildprint-minimax-m2.7` \| `buildprint-mimo-v2-omni` \| `buildprint-kimi-k2.6` \| `buildprint-kimi-k2.5`) **(required)** — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the review was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the review was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review completed.
    - `mergedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review was marked merged.
    - `closedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review was closed without merging.
    - `conversationStatus` (enum: `draft` \| `ready` \| `running_turn` \| `errored` \| `archived` or null) **(required)** — Current lifecycle state of the linked agent conversation.
    - `conversationErrorCode` (string or null) **(required)** — Internal error code from the linked conversation when one exists.
    - `id` (string) **(required)** — Opaque identifier for the code review.
  - `merged` (array of object) **(required)** — Merged code reviews for the app.
  - `closed` (array of object) **(required)** — Closed code reviews for the app that were not merged.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /code-reviews

**Create a code review run**

Creates a code review between two Bubble versions and starts the linked review agent conversation.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
- `fromVersion` (string) **(required)** — Source branch or version name used by the request.
- `toVersion` (string) **(required)** — Target branch or version name used by the request.
- `model` (enum: `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna`) — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
- `title` (string) — Short human-readable title for the resource.
- `description` (string) — Human-readable description for the resource.
- `focusAreas` (string) — Extra review guidance describing what the reviewer should focus on.
- `completionWebhookUrl` (string) — Webhook URL Buildprint will call when the run completes.
- `userEmail` (string) — Email of the Buildprint user whose provider credentials should be used.

Responses:

- **202** — Code review accepted
  - `reviewId` (string) **(required)** — Opaque identifier for the code review.
  - `agentId` (string) **(required)** — Opaque identifier for the linked agent conversation.
  - `kind` (string) **(required)** — Discriminator describing the kind of object returned.
  - `status` (enum: `queued` \| `running` \| `completed` \| `error`) **(required)** — Current high-level lifecycle state for the asynchronous run.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — Payment required (insufficient credits or API access)
- **403** — User not a workspace member or missing provider credentials
- **409** — The workspace has reached its concurrent agent limit

### GET /code-reviews/{reviewId}

**Get a code review and linked agent state**

Returns review metadata, grouped findings, discussion comments, and linked agent state for a REST-created code review.

Parameters:

- `reviewId` (path, string) **(required)** — Identifier of the code review to retrieve.
- `historyLimit` (query, integer) — Maximum number of recent history items to return. Defaults to 100 and caps at 500.

Responses:

- **200** — Code review found
  - `reviewId` (string) **(required)** — Opaque identifier for the code review.
  - `review` (object) **(required)** — Summary metadata for the code review.
    - `sequence` (number) **(required)** — Human-readable sequence number for the review within the project.
    - `mergeId` (string) **(required)** — Stable merge identifier for the review.
    - `status` (enum: `open` \| `merged` \| `closed`) **(required)** — Current review status.
    - `title` (string or null) **(required)** — Review title.
    - `description` (string or null) **(required)** — Optional review description provided at creation time.
    - `fromVersion` (string) **(required)** — Source branch or version being reviewed.
    - `toVersion` (string) **(required)** — Target branch or version being compared against.
    - `fromVersionLabel` (string or null) **(required)** — Display label for the source branch or version.
    - `toVersionLabel` (string or null) **(required)** — Display label for the target branch or version.
    - `requestedByName` (string or null) **(required)** — Display name of the user who requested the review.
    - `requestedByEmail` (string or null) **(required)** — Email of the user who requested the review.
    - `requestedByImage` (string or null) **(required)** — Avatar URL for the user who requested the review.
    - `linearIssueId` (string or null) **(required)** — Linked Linear issue ID when one is associated.
    - `linearIssueIdentifier` (string or null) **(required)** — Linked Linear issue identifier when one is associated.
    - `provider` (enum: `claude` \| `openai` \| `gemini` \| `opencode` \| `cursor`) **(required)** — Provider backing the selected model.
    - `model` (enum: `claude-opus-4.6` \| `claude-opus-4.7` \| `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-4.6` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `openai-gpt-5.4` \| `openai-gpt-5.3-codex` \| `openai-gpt-5.2` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna` \| `buildprint-gpt-5.5` \| `buildprint-gpt-5.4` \| `buildprint-gpt-5.3-codex` \| `buildprint-claude-sonnet-4.6` \| `buildprint-claude-sonnet-5` \| `buildprint-qwen-3.6-plus-free` \| `buildprint-gemini-3-flash-preview` \| `buildprint-glm-5` \| `buildprint-minimax-m2.7` \| `buildprint-mimo-v2-omni` \| `buildprint-kimi-k2.6` \| `buildprint-kimi-k2.5`) **(required)** — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the review was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the review was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review completed.
    - `mergedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review was marked merged.
    - `closedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the review was closed without merging.
    - `conversationStatus` (enum: `draft` \| `ready` \| `running_turn` \| `errored` \| `archived` or null) **(required)** — Current lifecycle state of the linked agent conversation.
    - `conversationErrorCode` (string or null) **(required)** — Internal error code from the linked conversation when one exists.
  - `changes` (array of object) **(required)** — Change findings attached to the review.
    - `id` (string) **(required)** — Unique identifier for the review element.
    - `type` (enum: `change` \| `comment` \| `test`) **(required)** — Category of review element.
    - `title` (string) **(required)** — Short title shown for the review element.
    - `description` (string) **(required)** — Detailed explanation of the change, comment, or test.
    - `priority` (enum: `high` \| `medium` \| `low` or null) **(required)** — Priority assigned to the element when one exists.
    - `state` (enum: `open` \| `completed`) **(required)** — Whether the element still needs attention.
    - `createdBy` (enum: `ai` \| `user`) **(required)** — Whether the element was created by AI or by a user.
    - `createdByEmail` (string or null) **(required)** — Email of the user who created the element when available.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the element was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the element was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the element was completed, if it was completed.
  - `comments` (array of object) **(required)** — Comment findings attached to the review.
    - `id` (string) **(required)** — Unique identifier for the review element.
    - `type` (enum: `change` \| `comment` \| `test`) **(required)** — Category of review element.
    - `title` (string) **(required)** — Short title shown for the review element.
    - `description` (string) **(required)** — Detailed explanation of the change, comment, or test.
    - `priority` (enum: `high` \| `medium` \| `low` or null) **(required)** — Priority assigned to the element when one exists.
    - `state` (enum: `open` \| `completed`) **(required)** — Whether the element still needs attention.
    - `createdBy` (enum: `ai` \| `user`) **(required)** — Whether the element was created by AI or by a user.
    - `createdByEmail` (string or null) **(required)** — Email of the user who created the element when available.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the element was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the element was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the element was completed, if it was completed.
  - `tests` (array of object) **(required)** — Test findings attached to the review.
    - `id` (string) **(required)** — Unique identifier for the review element.
    - `type` (enum: `change` \| `comment` \| `test`) **(required)** — Category of review element.
    - `title` (string) **(required)** — Short title shown for the review element.
    - `description` (string) **(required)** — Detailed explanation of the change, comment, or test.
    - `priority` (enum: `high` \| `medium` \| `low` or null) **(required)** — Priority assigned to the element when one exists.
    - `state` (enum: `open` \| `completed`) **(required)** — Whether the element still needs attention.
    - `createdBy` (enum: `ai` \| `user`) **(required)** — Whether the element was created by AI or by a user.
    - `createdByEmail` (string or null) **(required)** — Email of the user who created the element when available.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the element was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the element was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the element was completed, if it was completed.
  - `reviewComments` (array of object) **(required)** — Threaded discussion comments attached to the review.
    - `id` (string) **(required)** — Unique identifier for the review comment.
    - `parentId` (string or null) **(required)** — Parent comment identifier when this comment is part of a thread.
    - `authorName` (string or null) **(required)** — Display name of the comment author.
    - `authorEmail` (string or null) **(required)** — Email address of the comment author.
    - `authorImage` (string or null) **(required)** — Avatar URL for the comment author.
    - `body` (string or null) **(required)** — Comment body text, or null if the comment has been deleted.
    - `imageUrls` (array of string) **(required)** — Images attached to the comment.
    - `isDeleted` (boolean) **(required)** — Whether the comment has been deleted.
    - `editedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the comment was last edited.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the comment was created.
  - `agent` (object) **(required)** — Linked agent state for the review conversation.
    - `agentId` (string) **(required)** — Opaque identifier for the linked agent conversation.
    - `kind` (enum: `agent` \| `code_review`) **(required)** — Type of REST API resource represented by the response.
    - `status` (enum: `queued` \| `running` \| `completed` \| `error`) **(required)** — Current high-level lifecycle state for the asynchronous run.
    - `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
    - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
    - `projectName` (string) **(required)** — Human-readable name of the workspace project.
    - `model` (enum: `claude-opus-4.6` \| `claude-opus-4.7` \| `claude-fable-5` \| `claude-opus-4.8` \| `claude-sonnet-4.6` \| `claude-sonnet-5` \| `openai-gpt-5.6-sol` \| `openai-gpt-5.6-terra` \| `openai-gpt-5.6-luna` \| `openai-gpt-5.5` \| `openai-gpt-5.4` \| `openai-gpt-5.3-codex` \| `openai-gpt-5.2` \| `cursor-composer-2.5` \| `cursor-composer-2.5-fast` \| `buildprint-gpt-5.6-sol` \| `buildprint-gpt-5.6-terra` \| `buildprint-gpt-5.6-luna` \| `buildprint-gpt-5.5` \| `buildprint-gpt-5.4` \| `buildprint-gpt-5.3-codex` \| `buildprint-claude-sonnet-4.6` \| `buildprint-claude-sonnet-5` \| `buildprint-qwen-3.6-plus-free` \| `buildprint-gemini-3-flash-preview` \| `buildprint-glm-5` \| `buildprint-minimax-m2.7` \| `buildprint-mimo-v2-omni` \| `buildprint-kimi-k2.6` \| `buildprint-kimi-k2.5`) **(required)** — Available models: - `claude-fable-5`: Fable 5 (Anthropic) - `claude-opus-4.8`: Opus 4.8 (Anthropic) - `claude-sonnet-5`: Sonnet 5 (Anthropic) - `openai-gpt-5.6-sol`: GPT 5.6 Sol (OpenAI) - `openai-gpt-5.6-terra`: GPT 5.6 Terra (OpenAI) - `openai-gpt-5.6-luna`: GPT 5.6 Luna (OpenAI) - `openai-gpt-5.5`: GPT 5.5 (OpenAI) - `cursor-composer-2.5`: Composer 2.5 (Cursor) - `cursor-composer-2.5-fast`: Composer 2.5 Fast (Cursor) - `buildprint-gpt-5.6-sol`: GPT 5.6 Sol (Buildprint) - `buildprint-gpt-5.6-terra`: GPT 5.6 Terra (Buildprint) - `buildprint-gpt-5.6-luna`: GPT 5.6 Luna (Buildprint)
    - `reasoningEffort` (enum: `none` \| `low` \| `medium` \| `high` or null) **(required)** — Requested reasoning effort for the selected model.
    - `permission` (enum: `read_only` \| `allow_edits`) **(required)** — Whether the run can only inspect the app or is also allowed to make edits.
    - `permittedBranches` (array of string) **(required)** — Branches the run is allowed to access when branch restrictions apply.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
    - `lastError` (string or null) **(required)** — Last error message recorded for the run.
    - `history` (array of object) **(required)** — Recent conversation history for the run.
    - `lifecycle` (object) **(required)** — Lifecycle summary for the linked agent conversation.
- **401** — Unauthorized
- **404** — Code review not found

## Tests

### GET /tests

**List project tests**

Returns all active tests and components for the app.

Parameters:

- `appId` (query, string) **(required)** — App ID.

Responses:

- **200** — Tests found
  - `tests` (array of object) **(required)** — Tests and components for the app.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `name` (string) **(required)** — Human-readable name for the resource.
    - `description` (string or null) **(required)** — Human-readable description for the resource.
    - `isComponent` (boolean) **(required)** — Whether the test definition is reusable as a component step in other tests.
    - `viewportPreset` (enum: `desktop` \| `tablet` \| `mobile` or null) **(required)** — Viewport preset Buildprint should apply when running the test.
    - `liveTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against live data.
    - `testVersionTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against test data.
    - `timeoutMinutes` (number or null) **(required)** — Default timeout in minutes for runnable tests.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /tests

**Create project test**

Creates a test or component.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
- `name` (string) **(required)** — Name of the test or reusable component.
- `description` (string or null) — Optional description.
- `isComponent` (boolean) — Whether the definition should be created or updated as a reusable component.
- `liveTestUserId` (string or null) — Optional test user assigned to live runs.
- `testVersionTestUserId` (string or null) — Optional test user assigned to test-version runs.
- `viewportPreset` (enum: `desktop` \| `tablet` \| `mobile` or null) — Optional viewport preset for runnable tests.
- `timeoutMinutes` (integer) — Default timeout in minutes for runs of this test.
- `graphStartX` (number) — Start node canvas center x position.
- `graphStartY` (number) — Start node canvas center y position.
- `steps` (array of object) **(required)** — Ordered steps that define the test or reusable component.
  - `stepType` (enum: `test` \| `condition` \| `component`) **(required)** — Node type. Components reference a reusable component definition. Default: `test`.
  - `componentId` (string) — Required when `stepType` is `component`.
  - `instruction` (string) — Instruction the agent should carry out for test steps.
  - `details` (string or null) — Optional detail. For condition steps this is the condition text.
  - `tips` (string or null) — Optional durable guidance for future test runners, such as fast selectors, reliable waits, or gotchas for this step.
  - `onFailure` (enum: `stop` \| `continue`) **(required)** — Whether the run should stop or continue if this step fails. Default: `stop`.
  - `graphNodeKey` (string) — Stable canvas node key. Omit to create a linear default graph.
  - `parentGraphNodeKey` (string or null) — Parent canvas node key, `start`, or null for a disconnected draft node.
  - `parentConditionOutcome` (enum: `met` \| `not_met` or null) — Required when the parent canvas node is a condition.
  - `layoutX` (number) — Canvas center x position.
  - `layoutY` (number) — Canvas center y position.

Responses:

- **201** — Test created
  - `testId` (string) **(required)** — Opaque identifier for the project test definition.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### GET /tests/{testId}

**Get project test**

Returns a test or component.

Parameters:

- `testId` (path, string) **(required)** — Test ID.

Responses:

- **200** — Test found
  - `id` (string) **(required)** — Opaque identifier for this resource.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
  - `name` (string) **(required)** — Human-readable name for the resource.
  - `description` (string or null) **(required)** — Human-readable description for the resource.
  - `isComponent` (boolean) **(required)** — Whether the test definition is reusable as a component step in other tests.
  - `viewportPreset` (enum: `desktop` \| `tablet` \| `mobile` or null) **(required)** — Viewport preset Buildprint should apply when running the test.
  - `liveTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against live data.
  - `testVersionTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against test data.
  - `timeoutMinutes` (number or null) **(required)** — Default timeout in minutes for runnable tests.
  - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
  - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
  - `archivedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource was archived, if archived.
  - `graphStartX` (number) **(required)** — Canvas x coordinate for the Start node.
  - `graphStartY` (number) **(required)** — Canvas y coordinate for the Start node.
  - `steps` (array of object or object) **(required)** — Ordered steps for the test or component.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### PUT /tests/{testId}

**Update project test**

Updates a test or component.

Parameters:

- `testId` (path, string) **(required)** — Test ID.

Request body (required):

- `name` (string) **(required)** — Name of the test or reusable component.
- `description` (string or null) — Optional description.
- `isComponent` (boolean) **(required)** — Whether the test definition is reusable as a component step in other tests.
- `viewportPreset` (enum: `desktop` \| `tablet` \| `mobile` or null) — Optional viewport preset for runnable tests.
- `liveTestUserId` (string or null) — Optional test user assigned to live runs.
- `testVersionTestUserId` (string or null) — Optional test user assigned to test-version runs.
- `timeoutMinutes` (integer) — Default timeout in minutes for runs of this test.
- `graphStartX` (number) — Start node canvas center x position.
- `graphStartY` (number) — Start node canvas center y position.
- `steps` (array of object) **(required)** — Ordered steps for the test.
  - `stepType` (enum: `test` \| `condition` \| `component`) **(required)** — Node type. Components reference a reusable component definition. Default: `test`.
  - `componentId` (string) — Required when `stepType` is `component`.
  - `instruction` (string) — Instruction the agent should carry out for test steps.
  - `details` (string or null) — Optional detail. For condition steps this is the condition text.
  - `tips` (string or null) — Optional durable guidance for future test runners, such as fast selectors, reliable waits, or gotchas for this step.
  - `onFailure` (enum: `stop` \| `continue`) **(required)** — Whether the run should stop or continue if this step fails. Default: `stop`.
  - `graphNodeKey` (string) — Stable canvas node key. Omit to create a linear default graph.
  - `parentGraphNodeKey` (string or null) — Parent canvas node key, `start`, or null for a disconnected draft node.
  - `parentConditionOutcome` (enum: `met` \| `not_met` or null) — Required when the parent canvas node is a condition.
  - `layoutX` (number) — Canvas center x position.
  - `layoutY` (number) — Canvas center y position.

Responses:

- **200** — Test updated
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found
- **409** — Update conflict

### DELETE /tests/{testId}

**Delete project test**

Deletes a project test or component.

Parameters:

- `testId` (path, string) **(required)** — Test ID.

Responses:

- **200** — Test archived
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found
- **409** — Archive conflict

## Test Groups

### GET /test-groups

**List test groups**

Returns all active test groups for the app.

Parameters:

- `appId` (query, string) **(required)** — App ID.

Responses:

- **200** — Groups found
  - `groups` (array of object) **(required)** — Test groups for the app.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `name` (string) **(required)** — Human-readable name for the resource.
    - `description` (string or null) **(required)** — Human-readable description for the resource.
    - `testCount` (number) **(required)** — Number of tests currently in the group.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /test-groups

**Create a test group**

Creates a test group.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
- `name` (string) **(required)** — Group name.
- `description` (string or null) — Optional description.
- `testIds` (array of string) — Test/component IDs to include in the group.

Responses:

- **201** — Group created
  - `groupId` (string) **(required)** — Opaque identifier for the project test group.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### GET /test-groups/{groupId}

**Get a test group**

Returns a test group.

Parameters:

- `groupId` (path, string) **(required)** — Group ID.

Responses:

- **200** — Group found
  - `id` (string) **(required)** — Opaque identifier for this resource.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
  - `name` (string) **(required)** — Human-readable name for the resource.
  - `description` (string or null) **(required)** — Human-readable description for the resource.
  - `testCount` (number) **(required)** — Number of tests currently in the group.
  - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
  - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
  - `archivedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource was archived, if archived.
  - `members` (array of object) **(required)** — Tests and components in the group.
    - `testId` (string) **(required)** — Opaque identifier for the project test definition.
    - `isComponent` (boolean) **(required)** — Whether the test definition is reusable as a component step in other tests.
    - `name` (string) **(required)** — Human-readable name for the resource.
    - `description` (string or null) **(required)** — Human-readable description for the resource.
    - `liveTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against live data.
    - `testVersionTestUserId` (string or null) **(required)** — Project test user assigned when the test runs against test data.
    - `updatedAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was last updated.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### PUT /test-groups/{groupId}

**Update a test group**

Updates a test group.

Parameters:

- `groupId` (path, string) **(required)** — Group ID.

Request body (required):

- `name` (string) **(required)** — Group name.
- `description` (string or null) — Optional description.
- `testIds` (array of string) **(required)** — Test/component IDs for the group.

Responses:

- **200** — Group updated
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### DELETE /test-groups/{groupId}

**Delete test group**

Deletes a test group.

Parameters:

- `groupId` (path, string) **(required)** — Group ID.

Responses:

- **200** — Group deleted
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

## Test Runs

### POST /test-runs

**Start test run**

Starts a test run.

Request body (required):

- `testId` (string) **(required)** — Opaque identifier for the project test definition.
- `branchId` (string) **(required)** — Bubble branch ID or display label.
- `model` (string) — Optional model override for the run.

Responses:

- **201** — Run started
  - `runId` (string) **(required)** — Opaque identifier for the project test run.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found
- **409** — The workspace has reached its concurrent agent limit

### GET /test-runs/{runId}

**Get a test run**

Returns a test run.

Parameters:

- `runId` (path, string) **(required)** — Run ID.

Responses:

- **200** — Run found
  - `run` (object) **(required)** — Detailed state for the test run.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `projectId` (string) **(required)** — Opaque identifier for the workspace project.
    - `testId` (string) **(required)** — Opaque identifier for the project test definition.
    - `conversationId` (string) **(required)** — Opaque identifier for the underlying AI conversation.
    - `status` (enum: `queued` \| `running` \| `passed` \| `warning` \| `error` \| `canceled`) **(required)** — Current lifecycle status for the resource.
    - `branchCacheId` (string or null) **(required)** — Opaque identifier for the cached branch record when one is available.
    - `branchId` (string) **(required)** — Branch identifier or slug used for the run.
    - `branchDisplay` (string) **(required)** — Human-readable branch name used for the run.
    - `model` (string or null) **(required)** — Model identifier used for the run.
    - `environment` (enum: `test` \| `live`) **(required)** — Bubble environment used by the run.
    - `summary` (string or null) **(required)** — Summary text produced for the run.
    - `testName` (string) **(required)** — Human-readable name of the test.
    - `groupRunId` (string or null) **(required)** — Opaque identifier for the grouped project test run.
    - `startedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource started running.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
    - `timeoutMinutes` (number or null) **(required)** — Timeout in minutes for this run.
    - `appBaseUrl` (string or null) **(required)** — Base URL of the Bubble app used for the run when available.
    - `bubbleAppName` (string or null) **(required)** — Bubble app ID for the run when available.
    - `assignedTestUser` (object or null) **(required)** — Detailed test-user assignment for the run.
    - `counts` (object) **(required)** — Aggregate counts for child or step statuses.
    - `nextPendingStepId` (string or null) **(required)** — Identifier of the first ready pending step, if one exists.
    - `readyStepIds` (array of string) **(required)** — Executable step IDs ready to run now.
    - `artifacts` (array of object) **(required)** — Artifacts captured for the run or step.
  - `test` (object or null) **(required)** — Test definition snapshot associated with the run, if it still exists.
  - `steps` (array of object) **(required)** — Ordered step results captured for the run.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `position` (number) **(required)** — Zero-based position of the item within its ordered collection.
    - `order` (number) **(required)** — Left-to-right depth-first execution display order.
    - `graphNodeKey` (string) **(required)** — Canvas node key this executable step belongs to.
    - `parentGraphNodeKey` (string or null) **(required)** — Parent canvas node key, or null when disconnected.
    - `layoutX` (number) **(required)** — Canvas x coordinate for the owning node.
    - `layoutY` (number) **(required)** — Canvas y coordinate for the owning node.
    - `dependsOnStepIds` (array of string) **(required)** — Executable step IDs that must finish before this step is ready.
    - `sourceKind` (enum: `step` \| `component`) **(required)** — Whether the run step originated from a direct step or a component.
    - `sourceTestStepId` (string or null) **(required)** — Source test definition step ID.
    - `sourceComponentId` (string or null) **(required)** — Component test identifier that produced the run step when applicable.
    - `sourceComponentName` (string or null) **(required)** — Component test name that produced the run step when applicable.
    - `sourceComponentStepId` (string or null) **(required)** — Source step ID inside a reusable component, if applicable.
    - `stepType` (enum: `test` \| `condition`) **(required)** — Whether this is a test or condition step.
    - `parentConditionOutcome` (enum: `met` \| `not_met` or null) **(required)** — Condition outcome required by this executable dependency edge.
    - `conditionResult` (enum: `met` \| `not_met` or null) **(required)** — Condition outcome chosen when this condition step completed.
    - `instruction` (string) **(required)** — Instruction for the step.
    - `details` (string or null) **(required)** — Optional extra detail for the step.
    - `tips` (string or null) **(required)** — Optional durable guidance for future test runners, such as fast selectors, reliable waits, or gotchas for this step.
    - `onFailure` (enum: `stop` \| `continue`) **(required)** — Whether a run should stop immediately or continue when this step fails.
    - `status` (enum: `pending` \| `passed` \| `warning` \| `error` \| `cancelled` \| `skipped`) **(required)** — Current lifecycle status for the resource.
    - `comment` (string or null) **(required)** — Operator comment recorded for the step result.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
    - `artifacts` (array of object) **(required)** — Artifacts captured for the run or step.
  - `graph` (object) **(required)** — Canvas graph for rendering the test run, including aggregate component nodes.
    - `start` (object) **(required)** — Start node layout for the run graph.
    - `nodes` (array of object) **(required)** — Canvas nodes in display order.
    - `edges` (array of object) **(required)** — Canvas edges derived from node parent keys.
    - `tree` (object) **(required)** — Run graph tree rooted at Start.
    - `readyStepIds` (array of string) **(required)** — Executable step IDs ready to run now.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /test-group-runs

**Start test group run**

Starts a test group run.

Request body (required):

- `groupId` (string) **(required)** — Opaque identifier for the project test group.
- `branchId` (string) **(required)** — Bubble branch ID or display label.
- `model` (string) — Optional model override for the run.

Responses:

- **201** — Group run started
  - `groupRunId` (string) **(required)** — Opaque identifier for the grouped project test run.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found
- **409** — The workspace has reached its concurrent agent limit

### GET /test-group-runs/{groupRunId}

**Get test group run**

Returns a test group run.

Parameters:

- `groupRunId` (path, string) **(required)** — Test group run ID.

Responses:

- **200** — Group run found
  - `run` (object) **(required)** — Detailed state for the grouped run.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `groupId` (string) **(required)** — Opaque identifier for the project test group.
    - `groupName` (string) **(required)** — Human-readable name of the project test group.
    - `status` (enum: `queued` \| `running` \| `passed` \| `warning` \| `error` \| `canceled`) **(required)** — Current lifecycle status for the resource.
    - `branchCacheId` (string or null) **(required)** — Opaque identifier for the cached branch record when one is available.
    - `branchId` (string or null) **(required)** — Branch identifier or slug used for the run.
    - `branchDisplay` (string or null) **(required)** — Human-readable branch name used for the run.
    - `model` (string or null) **(required)** — Model identifier used for the run.
    - `environment` (enum: `test` \| `live`) **(required)** — Bubble environment used by the run.
    - `startedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource started running.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
    - `counts` (object) **(required)** — Aggregate counts for child or step statuses.
  - `childRuns` (array of object) **(required)** — Child test runs launched as part of the grouped run.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `testId` (string) **(required)** — Opaque identifier for the project test definition.
    - `testName` (string) **(required)** — Human-readable name of the test.
    - `status` (enum: `queued` \| `running` \| `passed` \| `warning` \| `error` \| `canceled`) **(required)** — Current lifecycle status for the resource.
    - `branchCacheId` (string or null) **(required)** — Opaque identifier for the cached branch record when one is available.
    - `branchId` (string or null) **(required)** — Branch identifier or slug used for the run.
    - `branchDisplay` (string or null) **(required)** — Human-readable branch name used for the run.
    - `model` (string or null) **(required)** — Model identifier used for the run.
    - `environment` (enum: `test` \| `live`) **(required)** — Bubble environment used by the run.
    - `startedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource started running.
    - `completedAt` (number or null) **(required)** — Unix timestamp in milliseconds when the resource completed.
    - `assignedTestUserName` (string or null) **(required)** — Name of the test user assigned to the run, when one is assigned.
    - `groupRunId` (string or null) **(required)** — Opaque identifier for the grouped project test run.
    - `groupName` (string) **(required)** — Human-readable name of the project test group.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

## Test Users

### GET /test-users

**List test users**

Returns all test users for the app.

Parameters:

- `appId` (query, string) **(required)** — App ID.

Responses:

- **200** — Test users found
  - `testUsers` (array of object) **(required)** — Test users for the app.
    - `id` (string) **(required)** — Opaque identifier for this resource.
    - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
    - `name` (string) **(required)** — Human-readable name for the resource.
    - `description` (string or null) **(required)** — Human-readable description for the resource.
    - `email` (string or null) **(required)** — Email address associated with the resource.
    - `database` (enum: `test` \| `live`) **(required)** — Which Bubble database the credential should use.
    - `isDisabled` (boolean) **(required)** — Whether the test user is disabled.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### POST /test-users

**Create test user**

Creates a test user.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the workspace project this request targets.
- `name` (string) **(required)** — Test user name.
- `description` (string or null) — Optional description.
- `email` (string or null) — Optional login email.
- `password` (string or null) — Optional password for visible login steps. Omit it when tests should start authenticated with Buildprint CLI login.
- `database` (enum: `test` \| `live`) **(required)** — Which Bubble database this test user should target.

Responses:

- **201** — Test user created
  - `testUserId` (string) **(required)** — Opaque identifier for the project test user.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### GET /test-users/{testUserId}

**Get test user**

Returns a test user.

Parameters:

- `testUserId` (path, string) **(required)** — Test user ID.

Responses:

- **200** — Test user found
  - `id` (string) **(required)** — Opaque identifier for this resource.
  - `createdAt` (number) **(required)** — Unix timestamp in milliseconds when the resource was created.
  - `name` (string) **(required)** — Human-readable name for the resource.
  - `description` (string or null) **(required)** — Human-readable description for the resource.
  - `email` (string or null) **(required)** — Email address associated with the resource.
  - `database` (enum: `test` \| `live`) **(required)** — Which Bubble database the credential should use.
  - `isDisabled` (boolean) **(required)** — Whether the test user is disabled.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### PUT /test-users/{testUserId}

**Update test user**

Updates a test user.

Parameters:

- `testUserId` (path, string) **(required)** — Test user ID.

Request body (required):

- `name` (string) **(required)** — Test user name.
- `description` (string or null) — Optional description.
- `email` (string or null) — Optional login email.
- `password` (string or null) — Optional password for visible login steps. Omit it when tests should start authenticated with Buildprint CLI login.
- `database` (enum: `test` \| `live`) **(required)** — Which Bubble database this test user should target.
- `isDisabled` (boolean) **(required)** — Whether the test user is disabled.

Responses:

- **200** — Test user updated
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

### DELETE /test-users/{testUserId}

**Delete test user**

Deletes a test user.

Parameters:

- `testUserId` (path, string) **(required)** — Test user ID.

Responses:

- **200** — Test user deleted
  - `ok` (boolean) **(required)** — Always true for a successful mutation response.
- **401** — Unauthorized
- **402** — API access is not available on the current workspace plan
- **404** — Requested resource was not found

## Versions

(These three endpoints appear in the docs API Reference tree but not yet in the published OpenAPI schema; captured from the endpoint doc pages.)

### GET /versions

**List synced versions**

Lists completed Buildprint synced versions for a specific Bubble branch, ordered by sync time descending, with lifecycle tracking and pagination. "Use `list_bubble_branches` in MCP when you need the live Bubble branch tree."

Parameters:

- `appId` (query, string) **(required)** — Bubble app ID for the project.
- `version` (query, string) **(required)** — Bubble branch selector (branch ID or display label).
- `cursor` (query, string) — Pagination cursor from previous response.
- `limit` (query, integer) — Maximum results to return.
- `syncedAfter` (query, string) — Lower bound for sync time (ISO timestamp).
- `syncedBefore` (query, string) — Upper bound for sync time (ISO timestamp).

Responses:

- **200** — Versions found
  - `versions` (array of object)
    - `versionId` (string) — Buildprint synced version ID.
    - `version` (string) — Canonical Bubble branch ID.
    - `versionDisplay` (string) — Human-readable branch label.
    - `stage` (enum: `pending` \| `stored` \| `indexing` \| `completed` \| `failed`)
    - `syncSource` (enum: `manual` \| `automatic`)
    - `lastChange` (number) — Bubble change sequence.
    - `createdAtMs`, `createdAt` — timestamps.
    - `syncedAtMs`, `syncedAt` — timestamps (nullable).
    - `completedAtMs`, `completedAt` — compatibility aliases.
    - `errorMessage` (string, nullable)
    - `fileSha256` (string) — Export checksum.
    - `fileSizeBytes` (number) — Compressed size.
  - `nextCursor` (string, nullable) — Pagination cursor for next page.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access unavailable on current plan
- **404** — Resource not found

### GET /versions/status

**Get sync status**

Returns the current sync status for an exact Buildprint synced version ID.

Parameters:

- `appId` (query, string) **(required)** — Bubble app ID for the project.
- `versionId` (query, string) **(required)** — Exact Buildprint synced version ID.

```bash
curl --request GET \
  --url 'https://api.buildprint.ai/api/public/v1/versions/status' \
  --header 'Authorization: Bearer YOUR_SECRET_TOKEN'
```

Responses:

- **200** — Success
  - `ok` (boolean) **(required)** — Always true when request accepted.
  - `status` (enum: `in_progress` \| `completed` \| `failed`) **(required)** — High-level status.
  - `stage` (enum: `pending` \| `stored` \| `indexing` \| `completed` \| `failed`) **(required)** — Lifecycle stage.
  - `versionId` (string) **(required)** — Buildprint synced version ID.
  - `version` (string) **(required)** — Canonical Bubble branch ID synced.
  - `appVersion` (string) **(required)** — Alias for compatibility.
  - `message` (string) **(required)** — Human-readable status guidance.
  - `error` (string) — Failure message (present when failed).
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access unavailable on current plan
- **404** — Resource not found

### POST /versions/sync

**Sync a version**

Schedules a sync for a Bubble branch and waits briefly for completion. Returns HTTP 200 when the sync completed or failed during the wait window, and HTTP 202 when still running. For ongoing syncs, poll with `GET /api/public/v1/versions/status?appId=...&versionId=...`.

Request body (required):

- `appId` (string) **(required)** — Bubble app ID for the project to sync.
- `version` (string) **(required)** — Bubble branch selector (accepts branch ID or display label).

Responses (200 and 202 share the same fields):

- **200** — Sync completed or failed during wait window
- **202** — Sync still in progress; polling required
  - `ok` (boolean) **(required)** — Always true when request accepted.
  - `status` (enum: `in_progress` \| `completed` \| `failed`) **(required)**
  - `stage` (enum: `pending` \| `stored` \| `indexing` \| `completed` \| `failed`) **(required)**
  - `versionId` (string) **(required)** — Buildprint synced version ID created.
  - `version` (string) **(required)** — Canonical Bubble branch ID synced.
  - `appVersion` (string) **(required)** — Alias of version for compatibility.
  - `message` (string) **(required)** — Human-readable status guidance.
  - `error` (string) — Failure message when status is `failed`.
- **400** — Invalid request
- **401** — Unauthorized
- **402** — API access unavailable on current workspace plan
- **404** — Requested resource not found
