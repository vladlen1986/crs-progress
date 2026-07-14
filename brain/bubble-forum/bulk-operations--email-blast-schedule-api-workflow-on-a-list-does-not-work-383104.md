# Email Blast Schedule Api Workflow on a list does not work
> Source: https://forum.bubble.io/t/email-blast-schedule-api-workflow-on-a-list-does-not-work/383104 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: bulk-operations

## Original post (by @usinelachine)

Hello I have emulated the workflow on this video https://youtu.be/LLYaNHmt6_Y (https://youtu.be/LLYaNHmt6_Y) to make an email blast but I can’t seem to activate my workflow. This is my system

Btw note that “Courriel” means email.

[image]
image1920×1080 249 KB

[image]
image1920×1080 243 KB

[image]
image1920×1080 198 KB

so it does see the list to send but then nothing happens, the workflow does not seem to be triggered.

What am i doing wrong?

## Reply by @rico.trevisan (0 likes)

Things I would check:

- do you have the email keys setup properly? Can you send 1 email to 1 recipient?

- are the backend workflows not paused?

- also, could your `on a list` workflow be incorrect? I think you’re looping over the list of email – ok – but then on each pass you’re trying to send the entire list again.

[image]
CleanShot 2025-10-14 at 17.25.47@2x1328×1354 173 KB

## Reply by @usinelachine (0 likes)

Hello, I have added this

[image]
image1920×1080 250 KB

but so far, it does not work

## Reply by @usinelachine (0 likes)

SOLVED - omg so the email does not send if you DON’T put an object….

QUESTION : now the Email Blasts is sending 1 email per adress but sometimes the same email adress is repeated many times. Any tips how to curated the list of duplicates?

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
