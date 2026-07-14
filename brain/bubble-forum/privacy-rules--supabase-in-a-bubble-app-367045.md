# Supabase in a bubble app
> Source: https://forum.bubble.io/t/supabase-in-a-bubble-app/367045 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 18 posts · topic: privacy-rules

## Original post (by @mitchbaylis)

I’m running up to the limitations of the bubble database.

I want to do a polymorphic database query but that’s really not efficient in bubble.

The example:

“files”

files are linked to many different things in the app

the user uploads files to things

the user uploads files from an event and then tags them to other things in the database (inventory, contacts, venues)

the cleanest way to set this up would be a join table

“file_link”

file joined with thing tagged

but that fails when I try to do an AND search because I would need to do:

search for file_links that contain event

intersected with

search for file_links that contain contact

intersected with

search for file_links that contain album

I can’t use merged with because that equates to an OR

it’s possible but intersects are really slow on large datasets and there’s a good 10 intersects if the user wants to filter all at the same time. PLUS empty intersects have to be ignored somehow otherwise the result is null.

so my current setup is 1 data

“file_tag”

which has fields for contact, inventory etc

this fasciliates the search with AND and is efficient in bubble database

the problem now is that the user is confused between a file that is owned by the thing they are on VS a file that is tagged to the thing they are on but owned by something else (ie an event)

I could resolve it by creating a join when the file_tag is changed and then iterate through all the tag fields to create the file_tags and then also bulk delete the others that no longer exist… feels super janky and lots of WU

I talked to chatgpt about it and it strongly recommended integrating supabase to do the complex search queries because of bubbles database limitations. I would prefer to keep it all vanilla bubble but it feels like I may have to add supabase into the mix.

the WU cost of constantly deleting and adding the joins is quite heavy - often a user uploads hundreds of images then tags them to multiple things in bulk so 1 image can have a hundred tags

there are also other places where the bubble backend and database logic is really becoming tedious to workaround to do complex queries and calculations.

so my question is, has anyone added supabase into bubble to offload some of the heavy workload and queries? did it create more complication and issues or did it simplify things and reduce WU? did you keep simple data within bubble and just offload the heavy lifting parts - or did you do a full offload?

I’ve used supabase in a few weweb apps and it’s been incredible - a dream database by many measures. I’m just unsure about how well bubble plays with supabase given so much of bubbles pricing strategy is tied to WU fees.

## Reply by @Zeroic (2 likes)

I’ve built apps that have scaled to millions of users and WUs - all within Bubble. And while Bubble is an excellent full-stack tool, its backend definitely has limitations.

After building with Supabase for a while, I realised just how many compromises we were/are making in Bubble: we structure databases around workload constraints and privacy rule limitations, often at the expense of proper normalisation and best practices. That’s not how software is traditionally built.

Moving forward, I built a private plugin (that I’m extending to other builders) in order for me to build with both these platforms  -

- Full backend offload to Supabase - database, storage, and functions, primarily to simplify RLS/privacy rules and centralise control.

- Complex filters and logic are handled via Supabase RPCs, that call the DB functions written in SQL that take parameters (way cleaner and more performant).

- Searches are lightning fast, and I can control exactly what fields to return or set up views that power multiple frontend queries.

- Huge drop in WUs - especially for a B2B employee engagement platform and a recent AI agent startup that we’re doing for our clients. Supabase helps us stay within limits without compromising structure or speed.

That said, if your app is relatively straightforward or not extremely data-heavy, Bubble’s native DB can still be enough. The issue you mentioned (file tagging and ownership clarity) might be solvable within Bubble if that’s the only bottleneck.

But if you’re starting to notice more of these friction points, I’d strongly recommend doing a backend audit. In my experience, there’s only so much you can optimize inside Bubble before you hit diminishing returns - and at that point, Supabase opens up a whole new level of flexibility.

Let me know how it goes for you [image]

## Reply by @georgecollier (2 likes)

[image] Zeroic:

> 

Huge drop in WUs - especially for a B2B employee engagement platform and a recent AI agent startup that we’re doing for our clients. Supabase helps us stay within limits without compromising structure or speed.

Sure, but it costs maintainability, so clients come to people like me with a Supabase backend and we ends up moving it back into Bubble, and it ends up cheaper as fast development is worth way more

If you’re using Supabase, don’t use Bubble, I just don’t get why anyone using an external backend would use Bubble at all.

## Reply by @ihsanzainal84 (2 likes)

I agree with both points, keep things in Bubble as much as possible but consider external DBs when you hit Bubble’s limits.

For me those limits lie not in Bubble as a DB but how it interacts with the rest of my tech and requirements.

## Reply by @georgecollier (2 likes)

It is much easier to build a product entirely/almost entirely in Bubble than it is to build using Bubble and external APIs.

The expression composer is the best feature of Bubble. Requiring API Connector use / plugin use breaks that benefit.

[image] SignalThread:

> 

what major limitations would exist with Bubble as a front-end with Supabase?

You can technically do anything, but you’d be silly to. If you’re not using Bubble’s database, you’re not really using it as a backend, which means you’re using it as a front-end. And Bubble is a bad front end.

If you can build it natively using Bubble, do that.

If you need an external database, don’t use Bubble at all, because Bubble is a bad front-end, and WeWeb (https://www.weweb.io/) exists for this purpose. The only reason a smart dev would build on Bubble with an external backend for a new project is because they already know Bubble, even though it’s not the best tool for that job.

For existing projects, or very narrow use cases on a few tables, it’s a different question entirely.

## Reply by @mitchbaylis (1 likes)

Thanks for all the responses. I’ve decided to keep it vanilla bubble for now and just work around it.
