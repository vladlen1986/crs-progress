# OpenRouter
> Source: https://docs.buildprint.ai/openrouter-sssrw · Captured: 2026-07-14 (verbatim .md)

OpenRouter is an AI proxy that lets you route AI requests to any model provider and model with one billing account. Buildprint lets you connect your OpenRouter API key to use your OpenRouter-managed account for pay-as-you-go Buildprint models, rather than Buildprint billing.

Buildprint charges pay-as-you-go models at cost, so using your own OpenRouter API key is primarily useful for compliance and self managed billing.

## Creating an OpenRouter API key

1. Sign up to OpenRouter and add some credit to your account.
2. Create an API key at [https://openrouter.ai/workspaces/default/keys](https://openrouter.ai/workspaces/default/keys)
3. You can optionally set a spend limit, which can optionally reset after a set period of time.
4. Copy your key (starts with `sk-or-...`)

## Connecting OpenRouter to Buildprint

1. Navigate to your Integrations page.
2. Click 'Connect' on the OpenRouter row.

![Image](https://static.ferndesk.com/user-images/file_01KNVN2J5S7P703HAA2SD9YHQF.png)

3. Paste your OpenRouter API key and click connect.

![Image](https://static.ferndesk.com/user-images/file_01KNVN35BGS6MZB67HANBK76MD.png)

4. Once connected successfully, select any Buildprint model to use your OpenRouter API key.

![Image](https://static.ferndesk.com/user-images/file_01KNVN4K3WZFBJS569PTM9TV6R.png)

> [!WARNING]
> Any workspace / project member can chat using your OpenRouter connection. They cannot access the API key itself, so can only use it in Buildprint features.
