# Monthly Community Update -- March 2024
> Source: https://forum.bubble.io/t/monthly-community-update-march-2024/310590 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 35 posts · topic: data-api

## Original post (by @josh)

Hi all,

This is our March community update. You can read last month’s update here (https://forum.bubble.io/t/monthly-community-update-february-2024/305360). Sorry this is a couple days late, I was out sick last Friday!

Anyway, there are a number of updates, so let’s dive in. First off, we launched Bubble’s new Community Hub (http://bubble.io/community). This is something I am personally really excited by: BubbleCon last year was amazing, and this is a way of keeping that energy going all year round. The hub is designed to be a home base to help you connect with other users and find events online and in-person. I can’t wait for you all to check it out. Make sure to bookmark it, since we’ll be updating it often.

Also, we were honored to be named (https://bubble.io/blog/g2-award-2024/) a top development product in G2’s 2024 Best Software Awards! This award is based on authentic reviews from real users, so thank you from the bottom of our hearts for your support: as usual, Bubble’s success and progress is fueled by the intensely passionate community we have.
Changes we made this month

We just launched the brand-new Hire a Developer portal, previously known as the RFP portal. We heard feedback from users that the volume of bids was overwhelming, and from devs that match quality was poor. The new portal now includes more and better details, as well as a new matching system. This allows users to send requests to 3–5 of their best-fit agencies based on criteria like services offered, team size, budget, and more. If you’re thinking about hiring an agency to help build your app, check out this new blog post on writing a great RFP (https://bubble.io/blog/how-to-write-rfp/).

The template marketplace also got a refresh. We rolled out new categories for templates, including AI, SaaS, Chat, Real Estate, Booking, Finance, and Mobile. We added more sorting and clearer filters: most installed, highest rated, price, newest, and oldest. (If you’re a creator, you can update your templates to new categories anytime from your home page.)

Last week, we wrapped up a two-day sprint in which our engineering team released more than two dozen small but meaningful “quality of life” improvements to the editor! These were based on feedback from some of our most avid Bubble devs and include unlimited style variables, more customization for magic links, and speed enhancements to the property editor. While we did the building over two days, there was a lot of advanced preparation that went into identifying the changes to be made and scouting out all the design and technical challenges we’d need to solve, so kudos to the team on the hard work! We consider the push a big success, and hope to do more of these in the future.

Another change along those lines: Privacy rules can now appear as results for app searches on data sources, data fields, and options.

We also shipped a new app plan comparison page that does a better job highlighting the key differences between our paid pl
…[trimmed]

## Reply by @jayvee.nava (15 likes)

Hi Maggie, yes, you will be able to add a native mobile app to an existing web project. More details to come!

## Reply by @boston85719 (14 likes)

[image] ZubairLK:

> 

Any news on the performance enhancements?

I’m not sure if it’s just me but things have been feeling slower than usual lately…

Not just you, especially in the editor, things seem to be taking A LOT longer…the other day I counted 15 seconds between pressing design tab button to getting the design tab opened, although I have not consistently experienced that in the editor. Also, when working on a client app, I saw the loading of 6 data entries took about 5-6 seconds, which has been consistent in that app.

@josh any news on WU optimization features, especially the ability to specify which fields to return? This will be a game changer! Firstly, it will reduce the cost for returning data as we would be able to specify not to return built in fields or other custom fields that are irrelevant to the particular search/results display feature. Secondly, it would likely reduce the time to receive the data since, less data would be passed from server to client. Thirdly, it would dramatically reduce the overconsumption of WUs as we would no longer need to use secondary data types (meaning we no longer need another data type slimmed down only with the fields used for the search), as this elimination of the secondary data type would lead to the elimination of actions (consumption of WUs) for updating two data types anytime changes would be made or creating or deleting etc.

I think too, that it would lead to some newbies being able to better build their first apps, especially from a performance perspective as the reduced data transmission may mean some performance improvement in terms of load/display time.

Really hoping to see this come to fruition, or potentially allowing us to do this via API calls to our app, as it was for me personally the very first feature I thought needed to be added to the system when I first read about the WU pricing structure. [image] [image]

## Reply by @justin.hume (13 likes)

@josh

Thanks for the update. There is no mention on the new expression editor. Was development on that axed? It’s in a state of nearly unusable at the moment, the bugs are so frustrating. There was talk not too long ago of allowing copying and pasting of pieces of expressions, is that off the roadmap?

## Reply by @jasonh (7 likes)

@josh What do you mean by:

[image] josh:

> 

Privacy rules can now appear as results for app searches on data sources, data fields, and options.

I am hopping that I can finally determine the fields I would like to be returned for a data source, instead of having everything returned.

## Reply by @ZubairLK (6 likes)

Amazing update. Particularly excited about the visibility and change log among so many other things.

Any news on the performance enhancements?

I’m not sure if it’s just me but things have been feeling slower than usual lately…

Thanks

Zubair
