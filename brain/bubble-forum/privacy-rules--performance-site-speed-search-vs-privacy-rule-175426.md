# Performance & Site Speed: Search vs. Privacy Rule
> Source: https://forum.bubble.io/t/performance-site-speed-search-vs-privacy-rule/175426 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 7 posts · topic: privacy-rules

## Original post (by @brian)

I know there are a couple questions about Search vs. Filter speed and performance, but I’m wondering about the difference between “Do A Search For” vs. a Privacy Setting when it comes to site speed and performance only (the privacy win is obvious).

Our case is that we have database objects including Businesses and Events.  We have thousands of businesses and hundreds of thousands of events.

Our current DB structure is that each Event has a Business field, among others.  To fetch a list of Events for any Business, we “Do a search for” Events where Business=BusinessX, but I’m considering a change in architecture where the Business is attached to a user and Events can only be seen by users with the same Business.

My question is this: is there a site speed and performance difference between these two options?  In “Do a search for…” are all events from all businesses pulled down to the page first and then filtered to show only the constraints? Or does the DB only deliver to the page Events that fit that search?  If the page gets all events, it seems like there should be a performance benefit to the Privacy route, which would only allow the DB to deliver Events from one specific business.

Has anyone looked into this before?

## Reply by @brian (4 likes)

Putting a bow on this one for anyone who’s following along or reading this in the future - I posed this to Bubble support and here’s what came back.

“After asking around on the team, it seems that there wouldn’t be a significant performance gain between the two options because we compile privacy rules into constraints before sending to the database.”

So it looks like the answer is no because the end result is the same, the privacy rule is added on as a search constraint before sending to the server so it appears the search as delivered to the server would be the same in the two scenarios.

## Reply by @lindsay_knowcode (3 likes)

One thing to add would be that privacy rules restrict the columns that come back to the browser, so if you have very wide tables, and only need a few columns, privacy rules can reduce the network payload (and consequently browser memory etc)

At least that is my understanding. Just something to consider beyond query optimisations.

## Reply by @brian (1 likes)

Thanks @ankur1 - my understanding was similar to yours, but what I’m missing is the detail.  If we assume there are two ways of doing this with only one constraint, I’m wondering if more, less or the same data is searched and/or sent to the page in either of the following scenarios:

- “Do a Search For” Events where Business=BusinessX

- Setting Privacy to only pull Business X’s events and then run “Do a Search For” with no constraint.

In my understanding both constraints are server side, but I’m wondering if both send the same amount of data back to the page.

## Reply by @brian (1 likes)

Awesome - thanks @lindsay_knowcode. I’ve been trying to find ways to “skinny down” on columns with privacy rules, but this would give me even more incentive.

Best,

Brian

## Reply by @ankur1 (0 likes)

Okay. Consider Privacy rules as the extra search condition added on top of those you already have.

and “Do Search For” happens on the server-side. If you add the condition, then the bubble will return the filtered list not the complete list and then apply the if conditions.

Hope it solves your all doubts.
