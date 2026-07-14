# Introduction to logging
> Source: https://docs.buildprint.ai/introduction-to-logging-r1sfq · Captured: 2026-07-14 (verbatim .md)

Buildprint captures server logs from your Bubble app and gives you tools to search, visualize, and alert on them. Instead of scrolling through Bubble's built-in log viewer, you get filtering, time-series charts, log detail views, and automated monitors.

Logs are currently on a waitlist due to high demand. Buildprint will enable apps as capacity opens up.

## How it works

Buildprint fetches Bubble server logs and makes them searchable inside the Logs area.

The sync runs continuously. For high-traffic apps, logs typically arrive within a few minutes. For low-traffic apps, logs can take up to 3 hours to come through because Buildprint spaces out fetches to reduce load on Bubble's systems.

The Logs View and Explorer currently focus on your app's live logs. Some projects may also show configuration for additional versions.

## What you get

- View: time-series charts for workload units, action duration, unique users, workflows, errors, and error rate.
- Explorer: search and filter individual log entries by time range, log type, text, user email, or thing ID.
- Monitors: set up automated alerts that trigger when log patterns match conditions you define.

## Enabling logs

If logs are not enabled for your project yet:

1. Open your project.
2. Go to Logs > View.
3. Join the logs waitlist.

Once Buildprint enables logs for your project, the View, Explorer, Monitors, and Configuration tabs become available.

## Requirements

Your Bubble collaborator account, connect@getbuildprints.com, must have Logs permission in Bubble for the version you want Buildprint to sync. If Buildprint encounters a permissions error, the Configuration page shows an error banner with instructions to fix it.
