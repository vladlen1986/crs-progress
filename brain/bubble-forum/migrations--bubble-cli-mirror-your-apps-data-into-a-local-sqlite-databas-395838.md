# Bubble CLI — mirror your app's data into a local SQLite database
> Source: https://forum.bubble.io/t/bubble-cli-mirror-your-apps-data-into-a-local-sqlite-database/395838 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 2 posts · topic: migrations

## Original post (by @moabe.leite)

[image]
image504×193 1.81 KB

Hey everyone,

I built a small command-line tool that mirrors a Bubble app’s data into a local SQLite database via the Data API. Sharing it here in case it’s useful — and to get feedback from anyone who tries it.

What it does

You point it at a Bubble app, run `bubble scan`, and it pulls your types and fields from the `/meta` endpoint. Then `bubble pull` downloads the records into a SQLite file sitting next to your project. From there you can query it with anything that speaks SQL — DB Browser, DBeaver, a Python notebook, Metabase, whatever.

A few things it handles

- 

Schema discovery with a fallback: if `/meta` doesn’t return types (older apps, certain configs), it samples a record per type and infers the fields.

- 

Two sync modes — full re-fetch or incremental (only records with `Modified Date` newer than the last sync).

- 

Schema diff on every scan, so you see which types/fields were added or removed since last run.

- 

Per-folder projects — config lives in `bubble.json`, so you can keep multiple apps side by side without them stepping on each other.

- 

Interactive menu when you run `bubble` with no args, plus scriptable subcommands for cron/CI.

- 

Bilingual UI (English / Português), auto-detected from your locale.

Use cases I had in mind

- 

Local backups of production data without paying for a separate backup service.

- 

Ad-hoc analytics — JOINs, GROUP BYs and window functions that aren’t really practical inside Bubble’s search.

- 

Feeding data into BI tools, notebooks, or downstream pipelines.

- 

Snapshotting before risky migrations.

Install

```
pipx install git+https://github.com/moabe-br-2019/bubble_cli.git
bubble init
bubble scan
bubble pull --all

```

Requires Python 3.10+ and a Data API key from your app’s Settings → API. Each type you want to sync needs “Expose for Data API” turned on.

Repo: https://github.com/moabe-br-2019/bubble_cli (https://github.com/moabe-br-2019/bubble_cli)

Looking for feedback on

- 

Edge cases in the schema inference — apps with unusual field types, option sets, nested data, etc.

- 

Whether the incremental cursor (`Modified Date > last_sync_at`) holds up well on larger datasets.

- 

Anything you’d expect a tool like this to do that it currently doesn’t.

If you give it a try, issues and PRs are very welcome on the repo. Happy to answer questions here too.
