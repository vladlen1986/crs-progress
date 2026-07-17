# Privacy Rules
> Source: `buildprint guidelines get security/privacy-rules` · Captured: 2026-07-17 (verbatim)

Use this path when auditing Bubble data access. In the CLI worktree, privacy rules live inside data-type files rather than behind a JSON-read API.

## Where to look

- Data types live under `data_types/<type>/type.json`.
- Privacy rules are part of the type definition for that data type.
- Start with the relevant type file, then expand to related workflows if the rule is bypassed or depended on elsewhere.

## What to audit

- Broad read access (`view all`, broad field visibility, permissive search access).
- Rules that allow enumeration through searches.
- Auto-binding or Data API permissions that grant writes too broadly.
- Backend workflows or actions that intentionally bypass privacy checks.

## Practical workflow

1. Read the relevant `data_types/.../type.json` file.
2. Translate internal field keys to friendly labels before explaining risk.
3. Search the worktree for workflows that mention privacy bypass or touch the same type.
4. Pair the rule review with `security/bubble` if the question is broader than one type.
