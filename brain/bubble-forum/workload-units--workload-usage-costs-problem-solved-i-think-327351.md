# Workload Usage/Costs Problem - Solved (i think)
> Source: https://forum.bubble.io/t/workload-usage-costs-problem-solved-i-think/327351 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 11 posts · topic: workload-units

## Original post (by @nick.lockley)

So we have been having insanely high workload usage spikes over recent days whereby our daily workload usage went from around 2-4k units a day to 45k units per day & we simply couldn’t work out how to fix it or what was causing it as many of the units were used by data searches on site.

So we booked an hour with bubble coach @boston85719  (Matt) today and it’s the best thing we could have possibly done to address the issue.

Matt clearly has an in depth knowledge and experience of how Bubble workload usage is calculated and various methods to not only reduce the usage but to completely remove it from our usage/workload costs completely in many areas.

He went through our metrics in detail with us, helped us identify exactly what was causing the issue, then went through the site with us to identify what was causing the spikes. Immediately found several usage heavy/duplicated search expressions, some of which that had additional data searches within the consttraints which was clearly causing heavy usage.

He also showed us various methods to replace our previous expressions with ones that are less workload-intensive and I have gone from worrying that my app is not even scalable, to looking forward to things again.

Hat’s off to Matt on this one! Absolute legend.

Note, I will update this post with the new usage results in a day or so alongside the old results when we have tested the difference/outcome but already confident that it will be even less than it was prior to the recent spikes.

UPDATE: Here is a snapshot of the before and after results. We launched the updates at 18:10 and there’s a clear difference since. We also know exactly whats causing the usage since and thanks to matt also know how to remove that from the workload usage. Absolute RESULT [image] [image] [image] [image]

[image]
image1703×668 32.7 KB

Kindest Regards,

Nick & The BetterM2M Team

## Reply by @nick.lockley (5 likes)

Hi,

I would guess it differs greatly for different use cases and circumstances so your probably better off speaking to Matt. But nn my case it was data searches consuming most of my workload. In that scenario, you can find out which elements are running up the usage by going to settings in bubble - click “metrics” on the first page right above where your workload usage/% is shown.

From there filter it to the last 24 hours (or whatever period) and itl show you a pie chart of the breakdown of the usage. In my case most of the pie was data searches. So click on that slice of the pie and it then shows a new pie showing the exact breakdown of the data searches. The colour key on the right of the screen shows the highest % usage at the top then goes down to the least.

From there you can usually click on it again to go straight to that element in your app.

Methods that fixed my problem

Data searches within data searches and repeated searches for the same data/IDs.:

I had many data searches as my app shows a lot of dynamic content on the website. Many were doing searches and also had constraints in those searches that did additional searches (finding an ID for the constraint). Solution to this issue was to simply have a hidden floating group behind the page, this group does a single data search to find my “user/partner/dataset”, then instead of doing additional searches to find the ID I simply refer to that floating group to access the data it’s already retrieved. So now we only do that search once, not every time we need to use the data againn

Switching to option sets where possible:

Bubble doesn’t seem to charge for searching option sets. So things like my reviews and faq’s etc which before searched the database now simply pull from an option set which completely eliminated the workload cost/usage. I can also set attributes against my option sets to filter it if need be.

Search Inputs:

I have a search input which searches a database. we switched this to an optio
…[trimmed]

## Reply by @Jici (5 likes)

[image] nick.lockley:

> 

There’s a plugin called JSONator alligator or something that can store records in JSON or something then refer to that. We didn’t have time to cover that in the session sadly but it may be our route to completely removing even the most necessary and data heavy data searches.

This is kind of stuff that make nocode… no more no code… and this is a big issue from my point of view that Bubble need to care. In their own initial session about WU and how to “save” WU, this was the kind of example they give (and also to use external service like segment). What the point to use Bubble in this case?

## Reply by @Jici (5 likes)

By the way, thanks to share! this is very helpfull for all Bubblers. And a big thanks again for @boston85719

## Reply by @nick.lockley (4 likes)

No worries! This community has been so helpful over the last year. And yeah, honestly, the guys worth every penny and has been fundamentally useful to the growth of our platform. Had several sessions over the last 8 months and every one of them has fixed a problem we couldn’t fix. Recommend

## Reply by @boston85719 (4 likes)

[image] itsdoleey:

> 

The floating group concept has inspired me to try a few new strategies to reduce the number of calls.

This floating group approach is not really based on floating group. So the use of the floating group is to be able to get the elements it will hold out of sight of the user and out of the way so as to not affect responsiveness of the page. This is why the floating group is used as the container of the elements inside and is set to float beneath the page.

What is inside of the floating group, as I use it in all of my apps are plugin elements and other elements like repeating groups or groups that are not to be displayed but are used to store values that will be repeatedly referenced by other elements on the page that are displayed to the user.

So, for example, if there is a search that is needed multiple times on the page because there are multiple elements that need to display a value from the search, and the search is for a single item, create a group that is placed into the floating group. That group will have a data source that is the search. Then for each element on the page displayed to a user that needs a value from the data entry, the dynamic expression will reference the groups ‘thing’ rather than having to perform another search.

It is unclear via Bubble documentation whether or not we are getting charged WUs for each time the search is listed on the page, so it is not completely clear how much WU savings there are to be had with that approach. However, having spoken to Bubble support prior to the WU pricing introduction, I was told the same search used in multiple elements on the same page is actually only performed once, and those discussions were focused on page performance and speed, so it could be the case that Bubble is charging WUs for each time the same search is on the page, even though they may just be performing the search once. The reason I would believe it is possible we are charged for each time the same search is o
…[trimmed]
