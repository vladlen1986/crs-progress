# 🔍 Omnisearch: Integrate Algolia, Typesense, and friends
> Source: https://forum.bubble.io/t/omnisearch-integrate-algolia-typesense-and-friends/317306 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 94 posts · topic: search

## Original post (by @zelus_pudding)

Announcing our formal marketplace launch! Previously in beta under the name Scious Search, Omnisearch is the most powerful and flexible way to integrate Algolia (https://algolia.com/), Typesense (https://cloud.typesense.org/bubble) and other (in the future) search providers. As a deep integration, it:

- Preserves privacy settings across all data types.

- Does not degrade or slow down as your database grows to millions of records.

- Saves a ton of WUs compared to Bubble’s native search and ZQ Fuzzy Search.

- Works with live, test, and other versions of your app.

- Avoid vendor lock-in. Easily switch search providers or use multiple at the same time!

Costs

Our Algolia integration is considerably cheaper than Bubble’s while offering more capabilities like privacy rule preservation, filtering, and syncing fields other than text. See full comparison below.

When it comes to choosing between Algolia and Typesense, both providers have their sweet spot. Since there are scenarios where Algolia is cheaper to use than Typesense and others where Typesense is much cheaper than Algolia, we built this cost calculator (https://plugins.scious.io/scious-search?section=calculator) to help you decide what’s right for you.
Get started

You can test drive our features here (https://plugins.scious.io/omnisearch), checkout our ecommerce templates (typesense (https://plugins.scious.io/omnisearch-ecommerce-typesense), algolia (https://plugins.scious.io/omnisearch-ecommerce-algolia)), and peruse the manual (https://docs.scious.io/scious-search/latest). Unlike your usual Bubble plugin, ours comes with:

- A 10 day free trial.

- App transferability. While our plugin can only be used by one Bubble app at a time, unlike regular plugins, a subscription to ours can be switched to other apps. So if you scrap an MVP and start another, you can reinstall our plugin at no added cost.

- Hands on support. Our annual subscription includes a half hour one-on-one support session for answering any integration questions.

If that sounds great, then grab an API key and get started (https://docs.scious.io/omnisearch/latest/getting-started)!

## Reply by @zelus_pudding (2 likes)

Omnisearch Feature Comparison

Feature
Omnisearch - Algolia
Omnisearch - Typesense
Native Algolia Integration
Algolia Search v2.0
Typesense Plugin

Supports non-public data fields.
●
●

●
●

Supports text fields
●
●
●
●
●

Supports number fields
●
●
●
●
●

Supports date fields
●
●

●
●

Supports range fields

Supports User data type
●
●

●
●

Supports custom data type fields
●
●

●
●

Supports one geographic address field per record
●
●

●
●

Supports more than one geographic address field per record

●

●

Automatic index creation

●

Easily create indices for all app environments
●
●
●

Change sort order of search results
●
●

●
●

Includes recommendation engine

Easily switch search engine providers
●
●

Search filters can span multiple data types / indices

Can pass advanced options to search engine provider
●
●

●

Works with any Bubble plan
●
●

●
●

Can transfer plugin license across apps
●
●

Plugin free trial
●
●

Requires creating records in the Bubble database
●
●
●

Preserves privacy rules
●
●

Update search engine index settings from the Bubble app
●
●

●
●

Create, update and delete items in search index
●
●
●
●
●

Return recent user searches

●

Facet values
●
●

●
●

Easily facet values
●
●

●

Filter results
●
●

●
●

Easily filter results
●
●

Search as you type (without bubble’s input change delay)
●
●

●

Return native Bubble thing in editor, making filtering easier
●
●

Debounce keystrokes (to help reduce search volume)
●
●

●

Sort search results by text field
●
●

●
●

Error proof pagination handling
●
●

Cache session search results (to help reduce search volume)

Geo filter by circle
●
●

●

Geo filter by polygon
●
●

## Reply by @tylerboodman (2 likes)

“Omnisearch” I like that [image]

## Reply by @zelus_pudding (2 likes)

Thank you! Yea, it’s a bit more descriptive than the last name [image]

## Reply by @zelus_pudding (2 likes)

Hey @mack2580, Omnisearch is finally available on the marketplace! We have an implementation of your faceting needs here (https://plugins.scious.io/omnisearch-ecommerce-typesense) (for pcpartspicker!) Lemme know what you think or if we can improve that template or the plugin for your purposes [image]

## Reply by @zelus_pudding (2 likes)

Pleased to report that our latest update `2.0.2` works with self hosted Typesense instances! To use, simply enter your typesense instance URL under `Typesense Host` in the plugin config page and enter your API key as usual. Cheers!
