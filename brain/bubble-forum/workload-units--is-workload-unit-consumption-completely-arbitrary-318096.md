# Is Workload unit consumption completely arbitrary?
> Source: https://forum.bubble.io/t/is-workload-unit-consumption-completely-arbitrary/318096 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 41 posts · topic: workload-units

## Original post (by @code-escapee)

Only recently did I experience significant overages on any Bubble app (because Bubble failed to notify us until 23 hours after the WU spike!).

Now that I have dug in, I can not seem to make sense of actual WU consumption for various events. Every time I try to match actions to costs in the WU chart (below), it simply does not compute.

So here’s one specific example. Bubble somehow attributed ~1M WU over a 90 minute period for… wait for it… [image] …  Setting a SLUG!!

I have seen some forum topics about how Slugs are higher WU than one would expect because there is a search for a unique value (I am not sure why Bubble has not bothered to add that to the WU chart), but no matter how hard I try, I can not figure out how setting ONE Slug can be more than 10 WU!

[image]
24-04-16 17_30_36-Explain & Send Screenshots_Desktop733×144 45.7 KB

Please explain how 10 WU is possible. Round up or overestimate any Activity you want, but how can we even get close? (this overcalculation resulted in 1M overage! in 90 minutes [ I can’t look back to any previous spikes as the logs crash every single time})

NOTE: The actual slug value is simply the slug of a single linked record (not a list) to which a text value from this record is appended, so there is no need to perform an actual search to obtain the actual slug text.

Here’s where I get stuck on my calculations:

- DB Search: .3 

- Item written to DB: .5
- 
**Total: .8**

Actual WU: 10.83

Overcharge percentage: ~1350%.

I'm trying to give Bubble the benefit of the doubt so please help me understand how it got anywhere near 10 WU!?

[image]
image768×1364 215 KB

## Reply by @dorilama (9 likes)

[image] chris.williamson1996:

> 

Over a year since update and notifications are still broken,

emails are not reliable for this kind of notification. even if bubble send them correctly at the right time the delivery time is not necessarely instant and depend on multiple factors not controlled by bubble or us. The notification should be sent to a webhook of our choice, so we can setup the best notification for our needs.

## Reply by @boston85719 (7 likes)

[image] stuart8:

> 

The main issue with WUs is that Bubble itself has no incentive to make the system work, it is all a funnel and that is a shame.

That seems to be the case. I’ve been trying to get @josh to reply for a few months now about what he stated when WUs were first introduced regarding a needed feature to allow us to isolate which data fields to return when performing a search since we are charged per character, that adds up, and for some of the built in fields we likely do not need for a search result display to users, we are getting charged for something we do not actually want.

[image] code-escapee:

> 

you can’t charge for something that isn’t listed in your chart of charges

Oh but they do that already.

From support staff below

> 

Our engineers have confirmed that data trigger checks, and their associated workload usage, are expected behavior. I’ve gone ahead and personally flagged to our Product team that this may not be clearly indicated in our documentation as you mentioned. We truly appreciate you flagging this to us as it helps us ensure that we are as user-transparent as possible!

> 

To answer your questions, the expected WU expenditure of a data trigger scan would be about 0.5 WU plus whatever WU is needed to evaluate the condition (e.g., if it queried some data to evaluate the condition, it will take additional WU). This data trigger scan will be done whenever changes are made to the database even if there is no database trigger change associated with the data type that was changed.

> 

My apologies, the amount should be 0.05, not 0.5 WU which was a typo on my part

So, there is no public disclosure on the cost sheet about a 0.05 WU consumption for a database trigger scan when we create, modify or delete a data type that doesn’t even have an associated database trigger event in the app.

If engineering is able to confirm that the charges incurred for database trigger scans is expected behavior, why do users need to submit bug report
…[trimmed]

## Reply by @chris.williamson1996 (4 likes)

[image] code-escapee:

> 

because Bubble failed to notify us until 23 hours after the WU spike!)

Over a year since update and notifications are still broken, 6 mo left until everyone is forced off legacy [image] if we don’t have some stability by then I’ll be forced to switch no code tools.

[image]
IMG_14111179×2556 365 KB

In terms of your issue

Did you file bug report? If not you’ll need to. Last two reports of WU issues I had took over 2 weeks to get answers, good luck [image]

Is there any chance that you’re running calculations to get slug value or referencing any other records to set slug? Is this front end or back end?

Also I’d assume on bubble side a slug is just a text value on the record, my only assumption as to why it cost so much is they don’t allow duplicates so it’s probably pulling all records in your DB to dupe check [image] thus costing 0.0015 per record pulled to dupe check. This is only a theory

When you get response from bubble please tag me [image]

## Reply by @stuart8 (4 likes)

Don’t worry, if you use enough of them, you’ll get a helpful Sales person in your inbox offering you ‘help’ which is really just, ‘pay us $40k+ for a dedicated plan’ and we don’t have to fix any of the WU things.

The main issue with WUs is that Bubble itself has no incentive to make the system work, it is all a funnel and that is a shame. It will be interesting to see what happens when the legacy plan deadline comes about but all of these horror stories of overages and non triggering warning emails don’t fill me with a ton of enthusiasm for the future.

## Reply by @chris.williamson1996 (4 likes)

Meanwhile all their major competitors are offering self hosting and code export options or at a minimum hosting that isn’t crashing multiple times per week [image]

7 years total in bubble and regardless of the massive improvements made this last year has been been the worst one yet because the core of their product is unstable.
