# [Feature Enhancement] Schedule 100k Workflows with Schedule API Workflow on a List
> Source: https://forum.bubble.io/t/feature-enhancement-schedule-100k-workflows-with-schedule-api-workflow-on-a-list/314892 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 69 posts · topic: bulk-operations

## Original post (by @steven.harrington)

Hi everyone,

I’m Steve, a product manager here at Bubble focused on helping you scale your apps. I’m excited to share that the Schedule API Workflow on a List action can now schedule up to 100K workflows, making this a robust, native option for completing bulk operations. This update builds on previously announced improvements to reliability and performance and represents an important step in strengthening Bubble’s capabilities as an enterprise-grade platform where you can scale confidently.

Note: If your app is on a legacy plan, you will need to upgrade your plan to unlock these improvements.

Schedule API workflows with confidence

A few months ago, we announced enhancements that increased the number of workflows that could be scheduled with Schedule API Workflow on a List. But we know we left a critical question unanswered: exactly how many workflows could be scheduled?

This question was difficult to answer because the limit could vary dramatically depending on the memory available at any given time and the parameters of the workflow being scheduled. To eliminate the resulting ambiguity, our engineering team made changes to batch the tasks being scheduled and clear the cache along the way. This allows us to avoid hitting a memory limit and significantly reduces the variability around the number of workflows that can be scheduled. Now we can reliably schedule 100K workflows irrespective of external conditions or the specifics of the workflow parameters.

If your app is on a dedicated server (available on the Enterprise plan (http://bubble.io/pricing)), you will be able to schedule at least 100K workflows — and in many cases, multiples of that. There is no explicit limit since the capabilities can vary based on your instance’s configuration. Please reach out to your Technical Success team if you have questions about your unique instance.

Capitalize on performance and reliability at scale — by default

The enhancements we’ve made over the past few months have helped us significantly speed up scheduling and execution of backend workflows for bulk use cases. At the same time, we’ve improved workflow reliability and protected performance for your app’s frontend users during processing.

With this foundation in place, we’ve updated the default (empty state) interval for Schedule API Workflow on a List to schedule workflows at a much higher frequency. If you’re using the default interval, you’ll see a significant difference in how quickly a given set of workflows completes. Existing actions with intervals that have been set manually won’t be modified automatically, but you can update them easily in the Bubble editor.

Here are results from benchmark tests for simple bulk operations using Schedule API Workflow on a List to execute 100K workflows compared to scheduling them recursively:

Schedule API Workflow on a List
Recursive

Delete 100K things
20–25 min
6–7 hrs

Copy 100K things
60 min
10 hrs

Modify 100K things
75 min
12 hrs

WU for scheduling
…[trimmed]

## Reply by @lindsay_knowcode (13 likes)

So do read this correctly?

… where previously advice would have been to use recursive workflows to process lengthy lists (I have had this recommended by Bubble support)

… now “Schedule … on a List…” is a magnitude faster and cheaper? (and now considered reliable)

Have I read this right?

## Reply by @eli (12 likes)

[image] steven.harrington:

> 

If your app is on a dedicated server (available on the Enterprise plan  (http://bubble.io/pricing)), you will be able to schedule at least 100K workflows — and in many cases, multiples of that.

Steve, does Bubble handle any type of throttling of these workflows if you begin to max out capacity or is everything scheduled out immediately with no control over when they are run regardless of capacity usage?

Additionally, one of the biggest issues with ‘Schedule on a list’ has been the lack of insight into what actually happened to any individual workflow. Did it error or not run? We simply don’t know.

Has there been any improvement on this front or can we be 100% certain that if we schedule 100k workflows they will run.

## Reply by @aj11 (10 likes)

This is not an issue with the release of this feature.

You’re running into a race condition where all the workflows are editing the list at the same time (“add” is misleading because the action it’s still editing the whole list via API). The only reason you did not run into this issue before was that the performance was just slow enough that the workflows ran with enough time between them not to conflict with each other.

To solve this, you either need to enforce an interval long enough to eliminate the race condition (make the workflow on a list intentionally and predictably slower), or you need to set up something that waits until all items are created, then sets the list one time in the end.

I’ve accomplished this before by adding a “last item” parameter, with the logic “If This Item is List of Item’s Last Item”. Then, in the workflow, just add a step to schedule a final workflow or custom event a second later to set the list based on a search. I would have it schedule it out a second (as another workflow or customer event), as opposed to just setting the list in the last workflow, as there still might not have been enough time by the last workflow for all items to appear in a search.

The irony here, is that this new release is literally so good it’s causing issues. The only way to avoid this would have been not to make the improvement. It’s an unfortunate but unavoidable problem that would never have been caught with any amount of prior testing.

## Reply by @TipLister (7 likes)

great, this is nice.

do i understand correctly that you have reduced WUs so that the action “create a thing” or “make changes to a thing” is 5x cheaper than it used to be when we bulk schedule?

or is the WU cost you write the cost of 1 scheduled wflow?

this makes a big difference because 50k modify actions are too WU expensive to currently run on bubble and i just do them on xano. i would do them on bubble if they were cheaper, it is just the WU markup is too high.
