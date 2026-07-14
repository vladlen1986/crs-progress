# U can save money while building with Bubbleio
> Source: https://forum.bubble.io/t/u-can-save-money-while-building-with-bubbleio/378558 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 13 posts · topic: performance

## Original post (by @SAIDER1)

Hello bubbleio devs, this is a 3 min reading subject that will change the way u use Repeating Groups.

Let me first explain something :

What are work units in Bubble?

Bubble charges work units (WUs) for every server-side action that processes or transfers data.

These WUs are not about how many workflows you run, but how much data Bubble has to fetch, process, and send.

Examples of actions that consume WUs:

Database queries (Do a Search for…)

Filtering / sorting data on the server

Loading large listsHow Repeating Groups consume WUs

Repeating Groups (RGs) are data-bound components. When you set an RG’s data source to something like:

Do a search for Products: filtered

this is what happens:

Initial load — Bubble queries your database and sends the first batch of results to the browser.

[image] WUs consumed here.

Scrolling or pagination — If your RG uses “Ext. vertical scrolling” or you navigate to a different page of results, Bubble runs another database query to get the next set.

[image] WUs consumed again.

Filtering / sorting — Even if the filter is small (e.g., only “Category = Books”), Bubble re-runs the search on the server side.

[image] WUs consumed again.

Dynamic updates — If your page setup re-triggers the search (e.g., when an input changes), Bubble starts over, fetching from the DB again.

[image] WUs consumed again.

[image] The more times your RG’s “Do a search for…” runs, the more WUs you use — especially if the list is large.

The key problem

If your page setup:

Calls the database multiple times for the same list, or

Modifies the RG’s data source dynamically (triggering new queries),

…you’ll burn WUs unnecessarily, slow down page performance, and increase Bubble hosting costs.

How Turbo In-Memory Data Manager Solves This?

Instead of letting your RG directly query the database every time, the plugin changes the flow:

Normal Bubble flow (high WU cost):

UI Action → Database Query → Bubble Server → Browser

(UI Action) → Database Query → Bubble Server → Browser

(repeats every time you scroll, filter, or edit)

Plugin flow (optimized WU cost):

Page Load → Database Query (once) → Store in Plugin’s In-Memory State → Browser

UI Actions → Modify In-Memory Data (no DB call) → Instant Update

How it works step-by-step:

Load once

On page load, the plugin takes your database list (via “Source” property) and stores it in exposed states.

This initial fetch uses WUs only once.

Keep in-memory

The plugin holds the list inside the browser memory, not in Bubble’s server memory.

You can read from these states as much as you want — zero WU cost.

Modify without re-querying

Add, delete, or update rows in memory.

Bubble doesn’t hit the database again.

Save only when needed

When you’re ready to commit changes, you run a workflow to save everything in one go.

This means one write batch instead of many scattered writes.

See plugin page (https://turboinmomory.bubbleapps.io/version-test/turbo_inmomory_data_plugin)

Editor

Ge
…[trimmed]

## Reply by @boston85719 (8 likes)

[image] ihsanzainal84:

> 

Data Jedi by @boston85719 has more tangible WU savings.

Thanks @net-tt for pointing out the cost. It is a bit of a different plugin as Data Jedi (https://forum.bubble.io/t/new-plugin-data-jedi/367590) doesn’t do just one thing, and in fact, it works in a very, very different way than Turbo Data Faker.

I normally would not post about my plugin on the showcase page of another developers plugin, but since it has been used as a comparison and the post about the cost of my plugin marked as a solution to this thread, I figured, I need to publicly address the differences.

Firstly, plugins are Services. We need to pick our service providers carefully. I’ve been building on Bubble for 7.5 years and I created Data Jedi after I mastered Bubble itself. So, Data Jedi comes pre-built with all the little things that a Bubble developer would love from a plugin. A simple example there is event triggers when data changes, conditional actions using yes/no fields instead of checkboxes and a whole host of other goodies that come with extensive knowledge of how Bubble apps are built and how to expand the functionality of things with simple tweaks. Plus, the extended history of my career and continuous contributions to the community can help demonstrate a difference in service provider, which as in most services, may come with a higher price tag.

Additionally, Data Jedi is not a plugin that does just one thing, as in saves WUs on data fetch or client side manipulation. It is a beast, getting added to and updated by a professional developer who builds apps with it himself daily. It currently has 23 Elements, 17 Actions, and 4 API calls.

[image]
Screen Shot 2025-08-15 at 9.59.41 AM192×587 18.5 KB

[image]
Screen Shot 2025-08-15 at 9.59.32 AM188×653 17.9 KB

Not only does it have these, but these elements and actions allow users to communicate across the entire app, not just between pages/reusables that have the elements on them, which means, users can create
…[trimmed]

## Reply by @Jici (5 likes)

What I’m reading here sound more like someone that doesn’t really understand correctly how WU work in Bubble. First… it’s called WorkLOAD and not work unit.

Two Filtering and sorting doesn’t cost more WU. In fact, filtering on server-side can save WU.

Scrolling and pagination can also save WU by not loading data that is not needed at first. While your plugin will load the entire data leading to cost more WU if the user doesn’t scroll  or stop to scroll fast.

As for:

[image] SAIDER1:

> 

Dynamic updates — If your page setup re-triggers the search (e.g., when an input changes), Bubble starts over, fetching from the DB again.

This can be easily solve with native Bubble state function an Set state. No need for a plugin for that. And doing this, we can also do the filtering on this list on client-side instead of fetching data again. Again, no need for a plugin for that.

So maybe your plugin can, in some case, save WU… but you should demonstrate this clearly. But also what is different VS using a state (and we should pay for your plugin).

## Reply by @ihsanzainal84 (5 likes)

Unless you’ve discovered a way to mimic Bubble’s call to an app’s DB within a plugin, this plugin is extremely niche. A builder will still need to initiate a workflow to update records. There’s also the matter of loss of progress if a user is editing in bulk.

Not a diss on the effort put into your plugin cause I did try to build a similar plugin in the past. Eventually I realized the WU saved is so minimal versus a UX that forces a “Save” action on the user before updating a record.

If I as a builder have to go through additional effort to save WU dealing with bulk records, then Data Jedi  by @boston85719 has more tangible WU savings. Since it forces working with raw JSON values and involves using cheap (WU) API calls. It would also be easier to implement a browser storage solution for session progress too, since I can key value the JSON to a record’s UID.

## Reply by @senecadatabase (3 likes)

Sounds like you have a plan.

I’ve always found it easier to build for big usage from the beginning than to try and rebuild later. It seems to save a lot of headaches.

I build with the thought of 10,000 daily users…it’s just a number I feel is fairly safe. Maybe it’s overkill for some apps, and maybe conservative for a lot of others.

Either way, good luck with your projects.

## Reply by @ihsanzainal84 (2 likes)

That’s the unfortunate downside IMO too.

That said though, plugin developers have the right to charge what they feel is worth their effort. Still I disagree with a lot of prices for a lot of plugins because i can gauge how much effort they take to build. It’s especially abhorrent in the mobile native plugins marketplace since it’s monopolized by the few who are testing the native plugin builder.
