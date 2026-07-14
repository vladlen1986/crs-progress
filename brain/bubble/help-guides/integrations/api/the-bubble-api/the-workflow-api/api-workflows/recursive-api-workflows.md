# Recursive API workflows
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section describes what recursive workflows are and how to set them up

{% hint style="info" %}
In most scenarios, when using API workflows to process a list of things, *Schedule API workflow on a list* will be a more efficient method, both in terms of completion time and WU consumption. We generally recommend using *Schedule API workflow on a list,* for bulk processing, but there are cases where recursive workflows will give you more flexibility.

Article: [Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)
{% endhint %}

{% hint style="warning" %}
Using recursive workflows can potentially lead to infinite recursion, resulting in significant workload unit (WU) consumption. Starting on **July 1st, 2024**, Bubble will apply a default setting to terminate recursive workflow chains at 10 iterations for all new apps.

This means you need to either disable this feature or set a higher limit (recommended) if you plan to use recursion, or else any **recursive workflow chain will be terminated after 10 iterations.**

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)
{% endhint %}

<details>

<summary>Custom limits and hard limits on recursive workflows</summary>

You can set a custom limit on how many times a recursive workflow runs in a sequence ([Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection), see the box above). Some workflows also have a built-in system limit, depending on where they’re triggered from.

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)\
Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

</details>

API workflows can be set up to be recursive, meaning that they re-schedule themselves as part of the workflow. This is not a Bubble feature per sé but a method of combining Bubble’s backend features to solve specific problems.

By having an API workflow reschedule itself, you can open up for:

* Looping a workflow to perform processing on a list of things in sequence (as opposed to finishing each as fast as possible)
* Setting up workflows that automatically run at set or [flexible intervals](#user-content-fn-1)[^1]
* Setting up process where a workflows relies on data from a previous cycle of that workflow (by passing [dynamic parameters](#user-content-fn-2)[^2] to the next "cycle" of the workflow)

## **Processing a list of things**

Keeping in mind the points above, recursive workflows are a useful alternative to *Schedule API workflow on a list* in some cases.

For example; by using a recursive workflow, we can instruct Bubble to go over each item one by one and we can set up a customizable delay in-between each iteration if needed. This can be less than a second, or months/years in-between, depending on your needs.

Imagine that you have a list of items that you need to process one by one. You could use a recursive workflow to process the items.

1. First, set up an API Workflow with a parameter containing the data type you want to process. Make sure to check the *Is list/array* to tell Bubble that we are passing a list of things rather than a single record.\
   \
   For this example, we’ll call the parameter rentalunits and set the data type to Rental Units.<br>
2. Now add the action that you want to perform. For this example we’ll simply generate a random string for the name of the rental unit. Set the Thing to change to rentalunits:first item. This way we’ll make the change on the first item in the list.<br>
3. Now we’ll change the Unit name field by using the Calculate Randomstring feature<br>
4. Our next step is what makes this a recursive workflow. We’ll now use the Schedule API Workflow to make the workflow run again. Three points are important to include:<br>
   1. First, we schedule the workflow using the regular *Schedule API workflow* action.<br>
   2. Secondly, we need to pass the same list as was originally passed to the request, but remove the first item. This way we make sure that it goes on to work on the next item in the list in the upcoming loop.\
      \
      We do this by passing the parameter rentalunits:minus item:rentalunits:first item<br>
   3. Then, we need to add a condition that checks whether there is a next item. We do this by counting the number of items left after the first one has been removed: rentalunits:minus item:rentalunits:first item:count > 0.\
      \
      This condition makes sure that the workflow doesn’t loop forever but stops when the count is zero.

## **Running at intervals**

To set up a workflow to run at set or flexible intervals, you simply set the rescheduling action to user the *current date/time* + any value that you want in-between the cycles. For example, setting the schedule action to use the *current date/time + months:1* will ensure that the cycle runs exactly once every month from the time it is scheduled.

[^1]: Since each new cycle is set using the *Schedule API workflow* action, you can schedule it at any point in time in the future, or even dynamically change the time to fit specific needs.\
    \
    Article: [Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)\
    Reference: [Schedule API workflow](/core-resources/actions/custom#schedule-api-workflow)

[^2]: API workflows can accept parameters when they are scheduled. Paramters can contain every type of data, including custom data types.\
    \
    Article: [Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)\
    Reference: [Schedule API workflow](/core-resources/actions/custom#schedule-api-workflow)
