# Monthly Community Update - August 2020
> Source: https://forum.bubble.io/t/monthly-community-update-august-2020/104366 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 62 posts · topic: bulk-operations

## Original post (by @josh)

Hi all,

This is another in our series of monthly community updates (link to previous one (http://forum.bubble.io/t/monthly-community-update-july-2020/99872)).

This month was a mixture of wins and setbacks. We made some progress that we’re very excited about, but we’re also feeling acutely the tradeoff between shipping things fast and managing reliability, which is informing a number of our current priorities.

Changes we made this month

On the performance front, we had another big release, this time focused on our “Make change to a list of things…” and “Copy a list of things…” actions.  It involves better backend logic for batch processing, and accomplishes three things: 1) decreasing the amount of capacity these actions use, 2) decreasing the total time they take to run on the server, causing workflows to complete faster, and 3) paving the way for future performance improvements that will improve other data modification actions as well.  In terms of numbers, on a professional-plan benchmark app we use, copying 99 things went from 26.5 seconds to 6.0 seconds, and even more dramatically, now only uses 5% of the capacity it used to use.  We’re excited by the progress and look forward to more improvements in the future.

(Note that even with this change, we still recommend the “Make change to list of things…” action for working with small lists on the order of 1 - 100 items.  For large-scale data processing, we still recommend using recursive API workflows or the editor Bulk tool.)

The other very visible change this month was the release of our new homepage design!  We’re happy with how it came out, and are enjoying the change of scenery on the pages we visit every day. We’re still making changes to our other websites and assets (such as this forum) to bring them inline with the new look, and expect them to roll out over the next couple weeks.

On the educational front, we launched a 10 video Bubble Crash Course that’s perfect for new Bubblers looking to master the basics. We’re also continuing to see very high demand for our bootcamps (https://bubble.io/bootcamps), which we are very excited about.

Our community continues to amaze: we’ve published 20 new “App of the Day” blog posts (https://bubble.io/blog/tag/community/) featuring the incredible apps you are all building.

On the product front, we didn’t have too many releases this month (although we have a couple things we got close to release: see the “What we’re currently working on” section below).  We made a small improvement to the Bubble-built Segment plugin to support sending events to Segment from the server in addition to from the client, which is useful for high-importance one-off events that you want to guarantee make it to Segment. Sending from the client uses less capacity, but can get blocked or fall through depending on the user’s web browser or internet connectivity.

We’ve rolled out a new process for doing retrospective reviews on our customer success team. Every Wednesday, w
…[trimmed]

## Reply by @gregoryjohn (17 likes)

Excited about customisable URL’s! Thanks for listening to us on this front.

## Reply by @oleksiy (12 likes)

I’m really impressed how you guys doing your business. Each of this updates written with a deep respect to community, not like just a bullet points with a recent updates.

Thank you so much @josh for always being honest with us!

Regards,

Oleksiy

## Reply by @josh (7 likes)

[image] joe5:

> 

Without requesting screenshots of anything you all aren’t ready to show off, can we get more insight into what the new editor will provide functionality wise? An easier responsiveness editor? Element updates like dynamic width text?

The new editor is going to be mostly a change in layout and visual appearance: the fundamental paradigm of editing Bubble apps won’t change, and I don’t think it’ll break your UI kit.  We’re also working as a somewhat-parallel effort on changing the way we do responsive layouts: that’s still a little TBD on exactly how it works, but one of our goals is to preserve backwards compatibility with existing elements

## Reply by @joe5 (5 likes)

Love the unique URL work! Can’t wait to be able to make nucode.co/tool/bubble (http://nucode.co/tool/bubble) [image]

Also love hearing about progress on the new editor!

Without requesting screenshots of anything you all aren’t ready to show off, can we get more insight into what the new editor will provide functionality wise? An easier responsiveness editor? Element updates like dynamic width text?

We are building a large UI kit for Bubble (Smaal.co (http://Smaal.co)), and if we end up needing to change EVERYTHING after the new editor is out, just to keep up with a whole new editor/bubble design best practices, that’d be tough.

## Reply by @josh (4 likes)

[image] petter:

> 

This does not imply any kind of folder structure or other changes to the URL? This is basically a change to the Field for readable URL , am I reading you right?

That’s correct. We looked into doing a hierarchical folder structure, and decided that this project would be future-compatible with going in that direction, so this doesn’t box us out from adding that on later, but for this project, we’re just changing the way  Field for readable URL  works (we’re replacing it with a special field that guarantees uniqueness)
