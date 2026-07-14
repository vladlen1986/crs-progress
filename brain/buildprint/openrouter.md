# OpenRouter
> Source: https://docs.buildprint.ai/openrouter-sssrw · Captured: 2026-07-14

OpenRouter is "an AI proxy that lets you route AI requests to any model provider and model with one billing account." Buildprint lets you connect your OpenRouter API key for pay-as-you-go model usage through your OpenRouter-managed account rather than Buildprint's billing.

Since Buildprint charges these models at cost, connecting your own OpenRouter API key primarily benefits those seeking compliance oversight and independent billing management.

## Creating an OpenRouter API key

1. Register with OpenRouter and fund your account with credit.
2. Generate an API key via https://openrouter.ai/workspaces/default/keys
3. Optionally configure a spending limit with periodic reset options.
4. Retrieve your key, which begins with the prefix `sk-or-...`

## Connecting OpenRouter to Buildprint

1. Access your Integrations page.
2. Select 'Connect' from the OpenRouter row.
3. Input your OpenRouter API key and confirm the connection.
4. After successful connection, choose any Buildprint model to utilize your OpenRouter API key.

> WARNING: "Any workspace / project member can chat using your OpenRouter connection. They cannot access the API key itself, so can only use it in Buildprint features."
