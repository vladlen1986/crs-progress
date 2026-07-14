# Tricks for queuing API workflows?
> Source: https://forum.bubble.io/t/tricks-for-queuing-api-workflows/299792 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 10 posts · topic: bulk-operations

## Original post (by @georgecollier)

Anyone got any tips for creating a queue of API workflows that run in sequence and not simultaneously? My current use case is using AI to generate sections of a document. The generation uses the content of the previous sections to prompt the generation of the current section.

Users can generate each section one by one, and they should be able to generate multiple at a time (so if they click generate on sections A, B, and C, section A will be generated, then section B, then section C, rather than just running the API workflow as soon as it’s scheduled.

A recursive workflow only really works when the user knows how many sections they want to generate when they kick it off - they can’t come back two minutes later and add more section generations to the queue.

Interested to hear anyone’s workarounds or solutions. I guess I’m looking for a way to put an API workflow queue in a funnel so that only one can run at a time and the next one in the queue will start when the previous one finishes. I’m thinking of something like a ‘Queue’ data type that is searched for and, if found, scheduled to run when the current API workflow is complete?

## Reply by @georgecollier (3 likes)

[image] hi_bubble:

> 

Have you found a solid working solution for this situation?

Actually, just today.

My use case is as follows:

- I have a file management system in my app.

- I have a trigger set up so that when a File’s Parent File is changed, various other lists are updated + hierarchies calculated.

- I have been adding a bulk move feature. That means that when I make changes to a list of Files to change their Parent File’s (i.e the folder they’re in), all the triggers run virtually simultaneously and some lists break due to race conditions.

So, I had to solve: how can I slow down the rate my DB trigger runs such that the actions don’t encounter race conditions?

High level overview: Have a queue data type, and a queue job option set. The queue job option set contains the amount of time that should be spaced between workflows of this type. In the trigger, schedule an API workflow to run at the Current date/time + (number of pending jobs * time to allow per job).

> 

- Queue Job data type is created when a trigger is ran, and before a workflow is scheduled. Creating a Queue Job means 'I want to do something ASAP, but for whatever reason, it needs to be slightly spaced out

[image]
CleanShot 2024-06-03 at 00.48.04@2x696×880 41.1 KB

[image]
CleanShot 2024-06-03 at 00.50.08@2x992×1064 58.3 KB

> 

- Schedule an API workflow to run at a certain point in the future based on the number of pending (complete = no) items in the queue.

That schedule date expression gets a count for the number of pending queue items, multiplies that count by an option set attribute that says how many seconds we should allow per workflow of this type (I set 2 seconds for this option).

[image]
CleanShot 2024-06-03 at 00.50.31@2x1292×1060 114 KB

[image]
CleanShot 2024-06-03 at 00.51.46@2x720×588 29.9 KB

If I set the queueTimeSeconds in my option set to 5 seconds, and there are 10 pending queue items, it’ll schedule to run in 50 seconds.

This isn’t foolproof - if the workflows d
…[trimmed]

## Reply by @redvivi (2 likes)

Had this use-case before.

I implemented a Queue data type with workflow ID and status. Haven’t come with a better solution yet.

## Reply by @boston85719 (2 likes)

[image] redvivi:

> 

Queue data type with workflow ID and status

Does Bubble provide both the workflow ID and status of the workflow as a value or did you need to just capture the workflow ID and create your own status? I’m wondering if Bubble is providing some kind of status value similar to a progress percentage.

@georgecollier you can do something similar to what you are thinking and what @redvivi said. I often use the term Processor for my data type that I use to track backend workflows. I would say for this use case you can have a data field on your Queue that is a list field of the backend workflows that are ‘to run’ and another field that is ‘completed’ plus a 3rd for ‘total workflows’, which the total workflows are all workflows triggered, the ‘to run’ has only those that are remaining, and the ‘completed’ has all that are finished, so that you can compare against the ‘total workflows’ to ensure all were ‘completed’, but the ‘to run’ will allow a user to continuously add more as they wish.

## Reply by @georgecollier (2 likes)

[image] nico.dicagno:

> 

I was assuming you’re saving the response of the APIs to the database

I am [image] Thanks for the ideas guys, good to know I’m down the right track and there’s lots of good points I can consider when implementing. Will report back with any pros and cons once done.

## Reply by @redvivi (1 likes)

[image] Matthew McGowan:

> 

Does Bubble provide both the workflow ID and status of the workflow as a value or did you need to just capture the workflow ID and create your own status?

Custom status.
