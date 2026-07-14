# Infinite recursion protection
> Source: https://manual.bubble.io/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Infinite Recursion Protection helps prevent runaway recursive workflows from causing large, accidental spikes in workload or CPU consumption.\
\
This feature allows you to set an app-level limit on workflow “depth”, which is the number of times workflows schedule themselves (direct recursion) or another workflow (indirect recursion) consecutively. Any workflow that is scheduled beyond the maximum depth you set will be terminated automatically. While workflow-level constraints on scheduling remain the primary method for managing recursion, this feature creates a backstop for the entire app.

## How it works

You can now set a maximum depth for your entire app. If any workflow exceeds this limit, it will automatically stop. When a workflow is terminated it's captured in the server logs under Workflow errors and an automated email notification is sent to the app admins.

Note that we limit these notifications to once per day, so there may be additional terminations occurring. To check, you can review the Workflow errors in your server logs.

**Getting started:**

1. Find the feature in the **API subtab** under **Settings.**
2. If you're not using recursive workflows, we recommend starting with the default limit of 10.
3. If you are using recursive workflows, set a limit that accommodates your longest intentional recursive chain.

**As of July 1, 2024**, all new Bubble apps will have this feature enabled with a default limit of 10. Apps created before July 1 won't have any limit applied automatically, but you can enable it any time.

<figure><img src="/files/WCrA0A0E8KlwVi8Ezz4o" alt=""><figcaption></figcaption></figure>

To cover this more in-depth, we’ll introduce a few new phrases:

## Terminology

### Recursive workflows

Recursive workflows in Bubble involve one or more API workflows scheduling themselves to run again, typically over a list of database items.

There are two types of recursive workflows:

* Direct recursive workflow: An API workflow that runs through a list of actions, and then schedules itself at the end
* Indirect recursive workflow: A set of two or more API workflows that schedule each other in a circular fashion

Either type of recursive workflow has the potential to lead to a scenario where a misconfigured constraint or scheduling logic results in the workflow chain running indefinitely. They require carefully set conditions to avoid creating infinite recursions.

Mitigating the impact of unintentionally ending up in this scenario is what infinite recursion protection is for.

### Workflow Chain

A workflow chain refers to the entire sequence of workflows triggered by a common root workflow or any part within it. It can be a straight line of workflows (like a single API workflow that schedules itself), but doesn’t have to be: at any point, a workflow can trigger multiple other workflows, forming a workflow chain that includes all of them.

This can include simple chains with just a few processes or more complex ones, like the examples shown in the diagram.

### Depth

Depth represents the total number of workflows in the direct scheduling sequence from a given workflow back to the root workflow. In a simple case of direct recursion like in our example, the maximum depth can be equal to the total number of workflows in the chain. However, in other cases a single workflow may schedule multiple other workflows, which would each be assigned the same depth. In this case, the total number of workflows in the workflow chain is not equal to the maximum depth.

Think of it like family generations: your parents are one generation before you, and your grandparents are two generations before you. While you may have siblings, aunts, uncles, and cousins, they do not change your generation.

The illustration below shows how works in different scenarios.

### Depth limit

The depth limit refers to the total depth you allow for an individual chain of workflows to go to. Since each workflow is assigned a depth number, a depth limit enables you to instruct Bubble to stop the process at a specified number. This prevents the chain from continuing indefinitely.

## Understanding workflow depth

Workflow depth applies whenever a workflow schedules other workflows, regardless of whether it's a single workflow scheduling itself repeatedly, or a collection of workflows that are being scheduled in a cascading fashion. To illustrate how this depth level is determined for workflows in your app, we can evaluate some example workflow chains below:\ <br>

<figure><img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXd5QbBA0o96An_wgnIDtjUe-CuD2eOZJ_ZNiyMgWDvl9TtjwAT16LqBF3u8xW0By3WDfYcD3Lf-vL9C9rSf4eXonJ1OcGJwnhC0daomf6-Px8I5L3xSH6WNAymLfEekZJj5PcNMp4P9g0oZeM7-V8cMGFuF?key=J0ms4LS5wIkro0Y4rlqu4A" alt=""><figcaption></figcaption></figure>

Note that each box in the diagram represents a workflow; an arrow indicates a workflow scheduling another workflow

In the example, we are assuming a depth limit of 10, resulting in the following:

* The Direct Recursion Example would result in creating 10 things before hitting the depth limit
* The Complex Direct Recursion Example would result in creating 8 things because the first iteration of the direct recursion workflow for creating things didn’t start until a depth of 3
* The Indirect Recursion Example has two workflows that both include an action to schedule the other; this workflow chain would result in creating 5 things because a thing is only created every other level of depth (when the ‘create\_thing’ workflow runs) until it reaches the limit of 10
* The Schedule API Workflow on a List Example would successfully create 1000 things; this is because all 1000 ‘create\_thing’ workflow runs are scheduled by the same root workflow and therefore all have the same depth of 1

## Setting the right depth limit

{% hint style="info" %}
Many apps don’t use recursive workflows, and if that’s the case, you can simply leave the setting at the default of 10, as there are vanishingly few examples of non-recursive workflows getting to depths of 10 or higher.
{% endhint %}

If you use recursive workflows, we recommend setting a buffer above the longest expected chain. Predicting the number of times a recursive chain will run can be imprecise, but the key to protecting yourself from infinite recursion is to have some (any!) limit in place to prevent them from running infinitely.

Recursive workflows are often used for bulk operations, and canceling one midway can be difficult to correct, especially with live data. Therefore, if you are unsure about what value to set, it’s safer to go higher. The tradeoff is that as the limit is increased, any accidental recursive workflow chains will be terminated later than they would have if the setting was lower. However, WU consumption from accidents will still be significantly less than it would have been otherwise, so the protection is still valuable even at a high limit.

Remember, we offer different depth limit settings for development and live environments. Misconfigured recursive workflows often occur during testing, and restoring a test database after an early cancellation is generally easier in the Development environment.

Let’s have a look at a few different scenarios, and how you can approach setting a depth limit for each one:

## Examples:

### Scenario 1:

Your longest recursive workflow schedules itself iteratively until it has processed all items on a list. In this case, depth is equal to the number of items on the list because there is one workflow run for every item. Therefore, the maximum depth in this setting should be greater than the longest list that you expect it to process.

#### Example:

Your longest recursive chain is a recursive workflow that iterates over a list of things and processes each item, where the list is typically around 500 things; we would recommend setting the limit at 1,000 or higher.

### Scenario 2:

You build a pair of API workflows in a modular way in order to accomplish different aspects of an operation. To implement the full operation over a list, you’ve configured your workflows to schedule each other in a circular pattern as they iterate through the list. Because there would be two workflow runs for each item on the list, if this was your longest chain then you’d configure your depth setting based on 2x the longest list that you expect it to process.

#### Example:

Let's say the list of things to process with this pair of circular workflows is around 500. Since there are two workflow runs per item, the typical depth is around 1,000. In this case, we would recommend you set the limit at 5,000 or higher.<br>
