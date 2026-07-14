# Inconsistencies in "Add to List" Actions Within Scheduled API Workflow on a List of Things
> Source: https://forum.bubble.io/t/inconsistencies-in-add-to-list-actions-within-scheduled-api-workflow-on-a-list-of-things/317238 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 6 posts · topic: bulk-operations

## Original post (by @hsieh.poyen)

Hello Bubble Community,

I am facing challenges with data consistency when using the “scheduled API workflow on a list of things” feature, specifically when attempting to modify lists (e.g., adding chapters to a storybook). Although each chapter is individually created in the database without issues, when it comes to adding these chapters to the respective storybook’s list of chapters, not all entries are successfully added. For instance, in a scenario where I expect 15 chapters to be added, sometimes only a fraction of them appear in the storybook’s list.

The issue appears to be mitigated when I increase the “interval (seconds)” in the scheduled API workflow settings, suggesting a timing or concurrency problem. Below are the detailed steps to reproduce this issue, including the specific action that frequently fails due to what appears to be a race condition:

Steps to Reproduce:

- Create two data types: `Storybook` and `Chapter`. Ensure `Storybook` includes a field that is a list of `Chapter`s.

- Develop an API workflow that accomplishes two main tasks:

- Creates a `Chapter` based on input (e.g., text content).

- Makes a change to a `Storybook` to add the newly created `Chapter` to the storybook’s `chapters list`.

- Schedule this API workflow on a list of things (texts representing the chapters’ contents), initially setting a minimal interval (seconds).

- Notice that not all `Chapter` items are added to the `Storybook`’s list upon execution. When the interval (seconds) is significantly increased, a higher success rate in chapters being added is observed.

Troubleshooting Steps:

- Adjusting the interval between each call in the scheduled API workflow has been my primary strategy for addressing this issue. The longer the interval, the more successful the “add to list” actions seem to be, reinforcing the theory of a timing-related problem.

Hypothesis:

- The close succession of scheduled API workflow calls might be leading to an override of the current `Storybook`’s `chapters list` variable. This is likely because the “add to list” action completes slower than the rate at which the workflows are scheduled, causing the next call to begin before the previous one has fully updated the list.

Proposed Solution:

- Implementing an option for the “scheduled API workflow on a list of things” to execute synchronously could address this issue by ensuring that each operation within the workflow is fully completed before the next begins. This change would greatly improve data integrity and consistency for operations involving list modifications.

I would greatly appreciate any insights into potential workarounds, solutions, or practices within Bubble.io (http://Bubble.io) that could help maintain data consistency in similar scenarios.

Thank you for your time and assistance.

## Reply by @georgecollier (2 likes)

Race conditions, set time interval of scheduled workflows that each modify the same list to at last 2 seconds. As far as I can tell, this used to schedule them one per second when left blank.
  

    

    [image]
    [Feature Enhancement] Schedule 100k Workflows with Schedule API Workflow on a List New features
  
  
> 
    This is not an issue with the release of this feature. 
You’re running into a race condition where all the workflows are editing the list at the same time (“add” is misleading because the action it’s still editing the whole list via API). The only reason you did not run into this issue before was that the performance was just slow enough that the workflows ran with enough time between them not to conflict with each other. 
To solve this, you either need to enforce an interval long enough to elim…

## Reply by @hsieh.poyen (1 likes)

Thank you for the prompt reply! The 2 second or even longer (like 30) doesn’t solve the issue. When it gets up to 60 second apart, yes it solves the issue but the wait is too long for adding 20 items etc.

The solution I eventually use is to create a recursive API call so the next thing to add to the list always comes after the previous action was done.

I luckily found how to do this by going through the link you provide. Thanks a lot!

In summary, I would recommend anyone experiencing this issue set up a recursive workflow and it will be done in seconds.

## Reply by @msgiblin (0 likes)

I ran into the same issue, and I accomplished it by doing a count of the things created, and waiting until that matched the count of things that were scheduled, and when those values matched, it then adds all of those items to the thing in one action.

## Reply by @rakanali.rk (0 likes)

Hello, @hsieh.poyen , can you please show us the screenshot of workflow how to do that?

## Reply by @vnihoul77 (0 likes)

Any plans on fixing this issue? [image] [image]

@lindsay.esterman @payam.azadi
