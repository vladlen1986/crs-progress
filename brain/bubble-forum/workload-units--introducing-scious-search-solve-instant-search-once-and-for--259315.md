# 🔍 Introducing Scious Search: solve instant search once and for all
> Source: https://forum.bubble.io/t/introducing-scious-search-solve-instant-search-once-and-for-all/259315 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 82 posts · topic: workload-units

## Original post (by @zelus_pudding)

For years, instant search in Bubble has been a thorn. The official Algolia integration doesn’t preserve privacy rules, sorting results alphabetically is a pain, and sorting by options is impossible. The Algolia plugins suffer in similar ways and that’s all in addition to the cost of Algolia itself - which gets pricey. On the other side of the cost spectrum, free solutions like the fuzzy search plugin are one of the surest ways to lock a page searching 2,000 records (while now burning workload units).

Crafted from the scorched crucible of this pain and suffering, today I’m launching what I have designed and hope to be the most powerful yet cost effective search plugin for Bubblers: Scious Search (that’s “sci” like science and “us” like you and I ). Despite the name, it’s more like multiple plugins in one - allowing developers to quickly add Algolia (https://algolia.com/), Typesense (https://cloud.typesense.org/bubble), and [future] alternative search providers to Bubble apps. As a deep integration, we’ve made this in a way that:

- 
Preserves privacy settings across all data types.

- 
Does not degrade or slow down as your database grows to millions of records.

- 
Returns an actual bubble thing, which can be used like any native bubble data type within the editor.

- 
Works with live, test, and other versions of your app so you can test integrations before going live.

- Can save you money.

- Quite a bit more.

While the Algolia integration we provide is - we think - objectively better than available alternatives, the money saved by switching from Algolia to Typesense using our plugin can be substantial, with some of our users on track to save hundreds of dollars a year even after including our plugin’s annual cost. If you are a current Algolia user and are curious about saving money on your monthly search bill, check out our savings calculator here (https://plugins.scious.io/scious-search?section=calculator).

And speaking of costs, while I did not anticipate this, it turns out this plugin drastically reduces the number of Workload Units (WU) needed to perform instant searches (versus Bubble’s native “Do a search for” ability). Details in the comment below.

So for those interested, you can test drive our features here (https://plugins.scious.io/scious-search), checkout our ecommerce template here (https://plugins.scious.io/scious-search-ecommerce-typesense), and peruse the manual here (https://docs.scious.io/scious-search/latest).

Our plugin comes with:

- 
A 10 day free trial. Enough time to try out search providers before having to commit.

- 
App transferability. While our plugin can only be used by one Bubble app at a time, unlike regular plugins, a subscription to ours can be switched to other apps. So if you scrap an MVP and start another, you can reinstall our plugin at no added cost.

- 
Hands on support. Our annual subscription includes a half hour one-on-one support session for answering any integration questions.

Scious Search is
…[trimmed]

## Reply by @grottofilms (7 likes)

I’ve been using this plugin in beta for a month or so. I can tell you it has been really helpful for us at get-gigs.com (http://get-gigs.com), specifically for location based searches.  In particular, our users have geographic areas they are looking in and we need to match three or four of those geographic areas with other users’ three or four areas as well as general metropolitan areas (and add in another 30+ combinations of genres, keywords, etc). Previously I had multiple merged searches using a variety of methods and conditions. It was slow (especially the geographic stuff) and difficult to modify because of the complexity. Using typesense has allowed us to move our main gig-searching queries from eight conditional data sources and multiple “unique id is in” type searches to a single query that is generated in javascript based on a data type that gets updated and triggers a new search in typesense. I can’t speak to WU savings as I don’t have a full handle on it for us as yet. I will say that keeping the typesense db up to date should likely not be done through a data trigger, as I would’ve done previously.

Overall, this plugin has improved the user experience for searches and has allowed us to prototype and consider more complicated maps based functionality for our users. @zelus_pudding has been very responsive and helpful as I was learning the ins and outs of the typesense query nomenclature and also when I ran into a bug or two during development. Would recommend you give it a try if it meets your use case.

## Reply by @zelus_pudding (5 likes)

Webinars

Two things - folks interested in learning more about the plugin can ask questions below (of course) or join one of the following live webinars:

- EDITED check out our Webinar recording here.

Workload Unit impact

And of course, I promised a discussion on Workload Units.  It’s been interesting to see how lean our search solution is compared to using Bubble’s native search. To illustrate, note that our demo collectively has 9 search examples. Only two of those use Bubble’s native search. Those searches, which only sift through 3k records, makeup roughly 63% of our Workload Units for Fetching Data. In contrast, the 7  searches that use our plugin - one of which is searching over 250k records - make up less than 28% of WUs for Fetching Data. This works because our plugin only has to fetch individual records from our app database and avoids Bubble’s Search channel entirely.

This means that, if we replaced the two native search examples in our demo with Scious Search, we would reduce our App’s overall WU consumption by about 23%.

Below are screenshots for those wedges as of this writing but you can confirm these (moving numbers) in our editor here. By the way, this is my best interpretation of these numbers so someone please correct me if I’m wrong.

[image]
image717×349 18.4 KB

[image]
image728×341 17.8 KB

[image]
image715×341 15.7 KB

## Reply by @jeffrey.j.obrien (5 likes)

I have been using Scious Search in my app for 6 months now and its working incredible well. Some of our tables have >100k records. We were using Fuzzy search and it was taking 25 seconds to return a result.

Now, the search is lightening fast. Scious search returns results in a few milliseconds. The plugin also lets us sort data alphabetically and separate it by user using the privacy rules.

We sync to Typsense which is costing us about $10/m. The cost is negligible compared to the performance we now get.

I highly recommend Scious search for anyone looking to hold more than 2K records in their database.

## Reply by @erick2 (2 likes)

looks interesting, actually I’m currently developing a commercial directory on Bubble and this might be a very awesome solution. I’ll DM you in a couple of weeks to test it out.

## Reply by @keith (1 likes)

Congrats on getting this out , @zelus_pudding! Sounds pretty great. I bet @christo1 if you register for a session Zelus will send a replay link!
