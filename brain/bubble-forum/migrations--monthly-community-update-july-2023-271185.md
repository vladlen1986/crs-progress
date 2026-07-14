# Monthly Community Update -- July 2023
> Source: https://forum.bubble.io/t/monthly-community-update-july-2023/271185 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 31 posts · topic: migrations

## Original post (by @josh)

Hi all,

This is our July community update! Read last month’s update here (http://forum.bubble.io/t/monthly-community-update-june-2023/265678).

We shipped a number of small platform improvements this month (detailed below), but the most exciting changes here at Bubble were those shared at our inaugural Bubble Developer Summit. Last week, we celebrated our community of professional Bubble Developers and announced the launch of several new programs, including the long-awaited Bubble Developer Certification (https://bubble.io/blog/developer-certification/), agency tiers to help folks sort through the agency directory (https://bubble.io/agencies), and more. You can watch a replay or read a recap of the event here (https://bubble.io/blog/developer-summit-2023/).

Over the course of June, we welcomed ten new teammates and six interns!

- Steve, joining us as a lead product manager

- Aster, Kyle, and Merlin, joining us as experienced software engineers

- Jason, joining as a software engineer

- Henry, Eduara, and Riya, joining our success team

- Jayvee, joining us as our director of community

- Anthony, joining as a senior accountant

- Rania, Harry, Nevil, Kelly, Karly, and LJ, joining us as interns.

If you’d like to join us, check out our careers page here (https://bubble.io/careers). As always, we highly encourage community members with solid Bubble skills and a love for helping people to join us as Technical Product Support Specialists (https://bubble.io/job?jid=5590930002).

Finally, before I dive in, just a quick note to say that I’d love to hear any feedback you have on these monthly community posts. Leave a reply and let me know what else you might like to see me cover in the future.

Changes we made this month

We released Bubble Version 23 (http://forum.bubble.io/t/upgrade-to-bubble-version-23-privacy-rules-tweak/264611), which includes tweaks to privacy rules that give you more control over the data your end-users see. Previously, there were certain situations when constructing expressions of the form “X’s Y’s Z” where users could see field Z based on a privacy rule given them access to X; they now also need explicit access to Y.

Last month, I mentioned we’d launched a public alpha for v4 of our API, which upgrades to Node 18 (AWS is planning to deprecate Node 14). That version is now officially released. If you manage a plugin that uses server-side actions, you’ll be required to migrate to v4 by January 4, 2023. (Here’s an update guide the team put together.)

Those connecting a login service using the OAuth 2.0 User-Agent flow can now add parameters (including optional ones) to the login redirect URL. This makes it possible to connect to some additional services that were previously incompatible with our API Connector.

We released three small improvements to editor usability:

- Previously, any time you uploaded a static image, Bubble defaulted to an aspect ratio of 1x1. Now, we’ll automatically set the aspect ratio (http://forum.bu
…[trimmed]

## Reply by @boston85719 (10 likes)

[image] josh:

> 

Editor stability

We’ve made a number of improvements and bug fixes to the editor over the last month, and we’re no longer receiving nearly as many reports of the editor being unusably buggy. That said, overall editor memory usage is still very much on our radar — we highly encourage checking out the experimental features mentioned above to get a preview of what we’re working on there. And we’re continuing to work on how we QA new features going out the door to avoid introducing too many new bugs, as well as circling back and fixing all the bugs and quality-of-life issues that users have reported.

I will go out on a limb here and say the reason for the reduction in the number of bug reports of the editor being unusably buggy is not because of improvements and fixes, but because of exhaustion of developers having to report so many that we have had to give up a lot of the times.

I’m in a live/recorded build right now and have had to submit 3 bug reports regarding the popup element. 1 is for the editor and 2 for run mode. I decided I had to come here and post this as I’ve seen numerous other bugs in the editor that I just don’t want to take the time to submit a bug report about them, especially when it is not rewarded in anyway by Bubble.

Where is the BUG BOUNTY!?

## Reply by @boston85719 (5 likes)

[image] josh:

> 

but the most exciting changes here at Bubble were those shared at our inaugural Bubble Developer Summit. Last week, we celebrated our community of professional Bubble Developers and announced the launch of several new programs, including the long-awaited Bubble Developer Certification  (https://bubble.io/blog/developer-certification/), agency tiers to help folks sort through the agency directory  (https://bubble.io/agencies)

Could you please let us know when the Agency Tier system will on the Agency Page have an explanation of what the Tiers Gold, Silver and Bronze actually mean and how a potential client can use them to guide their decision on which agency they should be interested in exploring working with. At the moment, I assume most potential clients see the Tier names of Gold, Silver and Bronze reflective of the same concept that most developers have expressed which is that Gold implies best, Silver is second and Bronze is last.

Also, if there is any chance that Bubble will backtrack on the tier naming convention and use something that might be more reflective of the Agency as those tiers are actually assessing them which is simply based on Size, so that a potential client can come to the agency page and say, I am not interested in working with an ‘Enterprise’ Agency, I want to work with a ‘Boutique’ Agency as they may be more interested in working with an agency that is led by a single developer.

Additionally, I would love if Bubble could speak to the AI that they are generating and how Bubble anticipates the implementation of the AI either replacing Bubble Developers or allowing Bubble Developers to work with it. As AI is hugely disruptive to livelihoods already, and is expected to continue to be so, it would be great to get some inside information on what to expect from the Bubble AI in terms of its’ impacts on Developers, Educators and others who have created a livelihood on Bubble. It would be heart wrenching to not have any forward 
…[trimmed]

## Reply by @ZubairLK (4 likes)

[image] josh:

> 

Finally, before I dive in, just a quick note to say that I’d love to hear any feedback you have on these monthly community posts.

LOVE THEM! Please keep them coming!

The more info the better [image]

Especially around product roadmap and what is on your minds.

[image] josh:

> 

We’ve seen more and more users migrate to the new plans,

I had a question on this. The new WU plan is supposed to be faster. But I don’t really know/can’t really test it without upgrading my app. Is there a way to temporarily upgrade an app to the new WU plan for like 3 hours. Similar to the capacity upgrade button.

This will let us test a few apps on personal plans to see the impact, before we are comfortable pulling the trigger on them to upgrade

[image] josh:

> 

Adding properties to reusable elements

This was super exciting!

[image] josh:

> 

Page load performance: We are midway through a project to radically reduce the time it takes to navigate between pages.

Nice!

No mention of loops on this update?

Thanks

Zubair

[image] (https://www.azkytech.com/)[image] (https://www.azkytech.com/)

## Reply by @paterson.damian (4 likes)

Thanks for the update @josh ! Always love reading through them and keeping us informed as to what’s on the roadmap/near term focus.

[image] josh:

> 

We know optimizing WU is still top of mind for many of you. We just started a private beta for some updates to the App Metrics tab . They’re designed to make understanding WU consumption more straightforward via changes like better drilldowns into workflows and the ability to drill down per-minute for the last couple of days.

It would be great if there was a way to see consumption by user by period of time (hour/day/week/month) as this would then allow us to do a diagnostic into the root cause of WUs consumed. Currently it is difficult how an actual user consumes WUs and as such if is difficult to make data based decisions on optimisation changes.

Keep up the good work and looking forward to seeing the upcoming changes that are in development!

## Reply by @lasse (4 likes)

[image] paterson.damian:

> 

It would be great if there was a way to see consumption by user by period of time (hour/day/week/month)

Agreed. With the cards Bubble have dealt us with the new pricing model, we need full transparency into where every single WU is coming from, including any given user within any given time frame. Ideally being able to set up rules around that too, so that a user will never be able to consume WU beyond a certain amount within a set time frame.
