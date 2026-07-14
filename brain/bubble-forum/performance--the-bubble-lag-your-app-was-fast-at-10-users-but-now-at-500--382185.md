# The "Bubble Lag": Your app was fast at 10 users, but now at 500, it's crawling. The fix isn't upgrading your plan; it's optimizing your searches
> Source: https://forum.bubble.io/t/the-bubble-lag-your-app-was-fast-at-10-users-but-now-at-500-its-crawling-the-fix-isnt-upgrading-your-plan-its-optimizing-your-searches/382185 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 6 posts · topic: performance

## Original post (by @felixitysite)

The “Bubble Lag”: Your app was fast at 10 users, but now at 500, it’s crawling. The fix isn’t upgrading your plan; it’s optimizing your searches.

The single biggest killer of Bubble performance is inefficient data fetching. Every time a user loads a page, your app asks the database a series of questions (searches). Asking the wrong questions is what burns your workload and slows everything down.

The Founder’s 3-Point Performance Checklist: 1. Avoid Client-Side Filtering (The “Don’t Waste Data” Rule): Never pull a massive list of data, and then use the filtered operator in an element. Instead, apply all constraints (filters) directly inside the Do a search for… statement. This forces the database to send only the data you actually need. 2. Never Search Inside a Repeating Group: If a Repeating Group (RG) has to run a Do a search for… for every cell, your app dies. Calculate that data once in a Custom State or in a Backend Workflow and reference the state in the RG. 3. Minimize Count & Sum: Operations like count and sum over large data sets are very expensive. If you need a running total (e.g., total sales), create a separate field on the Parent Data Type and use a lightweight Backend Workflow to update that field immediately after a transaction. Read the single field, don’t calculate the mass of data.

Following this checklist can often solve 90% of common speed issues, turning a sluggish app into a fast one, without spending a dollar more on capacity.

Which of these is causing the most lag in your app right now? Tell me your biggest performance headache! [image]

#Bubbleio #SaaSPerformance #NoCodeHacks #ScalingStartups #WorkloadUnits

[image]
Linkedin post day 2  (B)1024×1024 74.3 KB

## Reply by @georgecollier (0 likes)

[image] felixitysite:

> 

Minimize Count & Sum: Operations like count and sum over large data sets are very expensive.

Mmmmm that’s not really true. An aggregate search like this is cheaper in terms of WU than a search that returns results! The response time is pretty reasonable in Bubble and you’ll only start to notice slow downs when the data set you’re querying over to sum is 500k+ rows.

[image] felixitysite:

> 

. Avoid Client-Side Filtering (The “Don’t Waste Data” Rule): Never pull a massive list of data, and then use the filtered operator in an element. Instead, apply all constraints (filters) directly inside the Do a search for… statement

This one is also misleading.

`:filtered` is server-side. You’re right that advanced filters are client side, and it is advanced filters which you should avoid in most cases.

## Reply by @ahmed.elkaffas (0 likes)

[image] felixitysite:

> 

- Avoid Client-Side Filtering (The “Don’t Waste Data” Rule): Never pull a massive list of data, and then use the filtered operator in an element. Instead, apply all constraints (filters) directly inside the Do a search for… statement.

This is not accurate. Even the filtered operator is executed on Server-Side not on Client-Side. However, the filtered “Advanced” is the one that executes Client-Side and thus it affects the performance

## Reply by @ahmed.elkaffas (0 likes)

[image] felixitysite:

> 

- Minimize Count & Sum: Operations like count and sum over large data sets are very expensive. If you need a running total (e.g., total sales), create a separate field on the Parent Data Type and use a lightweight Backend Workflow to update that field immediately after a transaction. Read the single field, don’t calculate the mass of data.

Well I believe this applies if you would like to sort by (total sales) because it’s not possible to sort a column by “Sum & Count“; otherwise I don’t see any problem using Count & Sum.

It’s worth mentioning also that keeping the field updated requires knowing everywhere in the application which could affect the (total sales) field whether by adding or subtracting the value

## Reply by @glyons (0 likes)

The fix is moving off bubble - you’ll never achieve speeds like AWS offers in this environment

## Reply by @asked111 (0 likes)

In the recent q&a session, Emmanuel said that the team is working on database operations so that users do not need to resort to 3rd party solutions such as supabase - this imo is great news and I am hopeful for this.

Database speed and Page load speed/SEO are the absolute fundamentals imo and if bubble can improve these it will continue to have a bright future. [image][image][image]
