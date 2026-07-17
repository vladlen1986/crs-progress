# Connect Codex/Claude/Gemini subscription
> Source: https://docs.buildprint.ai/connect-codex-claude-gemini-subscription-jx3bk · Captured: 2026-07-14 (verbatim .md)

After connecting your Bubble app, you can optionally connect your own Claude, ChatGPT/Codex, or Gemini subscription.

Provider connections are user-specific. Other workspace members need to connect their own provider credentials, use Buildprint models, or use a workspace OpenRouter key if one is configured.

> [!TIP]
> Our recommended integration is ChatGPT/Codex with GPT 5.5. GPT 5.5 demonstrates the best performance on Buildprint editing tasks, and offers the most generous rate limits.

![Image](https://static.ferndesk.com/user-images/file_01KSAQF2Z7B95G7HGNF81WXMRA.jpg)

## Connect Claude

1. In Buildprint, go to **Integrations > AI Providers**.
2. Click Connect on the Claude row.
3. Complete the Claude authentication popup.
4. Copy the authorization code shown after authentication.
5. Paste it into Buildprint and click Connect.

> [!WARNING]
> Buildprint integration with Claude uses Claude Code in a remote agent sandbox. From June 15th, this will only draw usage from your subscription's 'Extra usage' pool. To use Claude Code with your subscription rate limits, use the [**Buildprint CLI**](https://docs.buildprint.ai/cli/installation-and-authentication-iwixh).

## Connect ChatGPT with Codex

Install Codex CLI:

```bash
npm install -g @openai/codex
```

Then sign in:

```bash
codex login
```

Print your local Codex auth file.

macOS or Linux:

```bash
cat ~/.codex/auth.json
```

Windows PowerShell:

```powershell
Get-Content $HOME\.codex\auth.json
```

Then:

1. In Buildprint, go to **Integrations > AI Providers**.
2. Click Connect on the OpenAI / Codex row.
3. Paste the full auth.json contents.
4. Click Connect.

## Connect Gemini

Install Gemini CLI:

```bash
npm install -g @google/gemini-cli
```

Start Gemini:

```bash
gemini
```

Inside Gemini, run:

```text
/auth
```

Then:

1. Choose Sign in with Google.
2. Restart the CLI by pressing R.
3. Print the cached credentials.

```bash
cat ~/.gemini/oauth_creds.json
```

1. In Buildprint, go to **Integrations > AI Providers**.
2. Click Connect on the Google / Gemini row.
3. Paste the credential JSON.
4. Click Connect.

Most personal Google accounts do not need a Google Cloud project ID. If you use a company, school, Google Workspace, or Gemini Code Assist account that requires one, enter the Google Cloud project ID in the optional field.

## Connecting Cursor

You can connect your Cursor account using an API key. 

1. Visit [https://cursor.com/dashboard/integrations](https://cursor.com/dashboard/integrations)
2. In the **User API Keys** section click "Add"
3. Copy the API key
4. Click "Connect" in **Integrations > AI Providers** in Buildprint.
5. Paste your API key

## Troubleshooting

- **Claude code rejected:** paste the complete authorization code from the callback page.
- **OpenAI invalid format:** paste the complete ~/.codex/auth.json contents.
- **Gemini invalid format:** paste the complete ~/.gemini/oauth_creds.json contents.
- **Expired credentials:** run the provider login flow again and reconnect.
- **Popup blocked:** allow popups for Buildprint, then try again.
