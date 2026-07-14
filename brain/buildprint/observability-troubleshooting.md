# Troubleshooting (Observability)
> Source: https://docs.buildprint.ai/troubleshooting-onqv1 · Captured: 2026-07-14 (verbatim .md)

Common issues with Buildprint logging and how to resolve them.

## I can't see any logs

If your logs view and explorer are empty, check the following:

- Logs may still be waitlisted: if the Logs page says you are on the waitlist, Buildprint has not enabled log streaming for this project yet.
- Collaborator is invited: make sure connect@getbuildprints.com is added as a collaborator on your Bubble app.
- Logs permission is enabled: the collaborator must have Logs permission in Bubble for the version Buildprint is syncing.
- Live logs are what the UI shows: the View and Explorer tabs currently focus on live logs.
- Low-traffic apps can take longer: for apps with low traffic, logs can take up to 3 hours to come through.

If you've checked the above and still see no logs, open Logs > Configuration and check for error banners. They usually explain the specific permission or sync issue.

## I can't see test version logs

The Logs View and Explorer currently show live logs. If your Configuration page includes version selection, test logs may be available for some log features, but the main log UI is focused on live logs.
