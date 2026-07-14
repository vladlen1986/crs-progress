# Bulk operation methods compared
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/bulk-operations/bulk-operation-methods-compared · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This article compares the two methods for large bulk operations.

In this article, we’ll explore the two most common methods for scheduling bulk database operations in your app. The two methods are somewhat similar, but from a technical perspective they behave differently, and have different use cases.

{% hint style="info" %}
This article focuses on performing bulk operations **in your app**, as opposed to in the Bubble editor. If you want to perform bulk operations from the Bubble database editor, check the article below:

Article: [The bulk operations feature](/help-guides/maintaining-an-application/database-maintenance/bulk-operations#the-bulk-operation-feature)
{% endhint %}

## Introduction

Before we go into the details of each method, we’ll start by defining what we mean by a bulk operation in this context, and give a quick overview of what the two methods are.

{% hint style="info" %}
Throughout this article, we'll sometimes refer to the *Schedule API workflow on a list* method as ***SAWOL***.
{% endhint %}

### What do we mean by bulk operations?

In the context of this article, a bulk operation refers to executing a workflow for each item in a list. For instance, if you have a list of 5,000 users and need to update a specific field in the user data type for all of them, you'd run the workflow 5,000 times, once for each user, to apply the necessary change. The purpose is to automate repetitive tasks across a large number of records.

> Both methods will be scheduled and executed [**server-side**](#user-content-fn-1)[^1] **as** [API workflows](#user-content-fn-2)[^2].

## The two methods in short

### Schedule API workflow on a list

The Schedule API workflow on a list action is a single action that instructs Bubble to run a given API workflow once for each thing in a list. If you use this method to schedule an API workflow on 5,000 things, Bubble will schedule the workflow as 5,000 separate API workflows that run independently of each other. One workflow does not wait for another to finish. Bubble will work its way through the list as fast as it can. If you set a delay in-between each workflow, Bubble will still schedule all the workflows in one operation, but add the specified delay to the schedule time. For example, let’s assume the following scenario:

* The current time is exactly 12:00:00 am
* You use Schedule API workflow on a list of 5,000 users
* The first API workflow should run immediately
* You define a delay of 1 second
* The actual workflow takes 0.2 seconds to finish

Bubble will do the following:

* Schedule the first workflow at 12:00:00
* Schedule the second workflow at 12:00:01
* Schedule the third workflow at 12:00:02
* And so forth

Regardless of how long the first workflow takes to complete, the second workflow will start at the assigned time. As such, the workflows are not looping, but scheduled for a definite time in the future.

Furthermore, in cases where your app is rate-limiting the number of workflows running at any given time (e.g. you have many backend workflows scheduled for the same time), workflows may not run until there are resources available, in which case it will start after its scheduled time.

So even with an interval, there is no guarantee that the workflows will run one at a time, or in order. As such, this method should be used only in cases where the workflows are independent. See the sections below for more details.

### Recursive workflows

{% hint style="warning" %}
Using recursive workflows can potentially lead to infinite recursion, resulting in significant workload unit (WU) consumption. Starting on **July 1st, 2024**, Bubble will apply a default setting to terminate recursive workflow chains at 10 iterations for all new apps.

This means you need to either disable this feature or set a higher limit (recommended) if you plan to use recursion, or else any **recursive workflow chain will be terminated after 10 iterations.**

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)
{% endhint %}

Recursive workflows behave a bit differently. Instead of scheduling a list of workflows, you are technically scheduling just one workflow on one thing, and this workflow contains an action that re-schedules the workflow.

Let’s assume the same scenario as above:

* The current time is exactly 12:00:00 am
* You use Schedule API workflow, and include a list parameter of 5,000 users
* The first API workflow should run immediately
* You define a delay of 1 second in the rescheduling action
* The actual workflow takes 0.2 seconds to finish
* The Schedule API workflow action takes 0.1 second to finish

Bubble will do the following:

* Schedule the first workflow at 12:00:00
* Schedule the next workflow 1 second after the first workflow has finished: 12:00:01:03
* Schedule the second workflow 1 second after the second workflow has finished: 12:00:02:06

As you can see, the time each workflow takes to finish, and the time it takes to schedule a new iteration, is added to the total time of the bulk operation. In other words, recursive workflows are slower, but you can ensure that no workflow runs before the prior workflow is done.

The short difference between the two, then, is that Schedule API workflow on a list runs in parallel, while recursive workflows run sequentially.

### Comparison table

|                                             | SAWOL                                    | Recursive workflow                         |
| ------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| **Processing**                              | Runs in parallel                         | Can run sequentially                       |
| [**Workload**](#user-content-fn-3)[^3]      | Spends less workload                     | Spends more workload                       |
| **Performance**                             | Faster                                   | Slower                                     |
| **Actions needed to run**                   | One                                      | Same number as items in the processed list |
| **Reliability**                             | Will always attempt to run all workflows | May stop if an error is hit                |
| [**Runaway loops**](#user-content-fn-4)[^4] | Do not happen                            | Can happen                                 |
| **Iteration timing**                        | Static                                   | Dynamic[^5]                                |

## Which method should I use?

Now that we know the basic difference between the two methods, let’s dig deeper into which method you should use.

### Workload and performance

First, we’ll have a look at how the two methods differ from the perspective of:

* [**Workload**](#user-content-fn-3)[^3]: how much workload is needed to finish
* **Performance**: how long the process takes to finish

An informal benchmark test using Schedule API Workflow on a List to execute 100K workflows compared to scheduling them recursively, gave the results below:<br>

| Task                             | SAWOL                          | Recursive workflow         |
| -------------------------------- | ------------------------------ | -------------------------- |
| Delete 100K things               | 20–25 min                      | 6–7 hrs                    |
| Copy 100K things                 | 60 min                         | 10 hrs                     |
| Modify 100K things               | 75 min                         | 12 hrs                     |
| WU for scheduling 100K workflows | \~12,000 (\~0.12 per workflow) | 70,000 (0.70 per workflow) |

Numbers can differ substantially, based on what your workflow does, but as the general trend shows, Schedule API Workflow on a list is a more performant and workload-friendly operation.

There are a few reasons why:

#### Performance

When using *Schedule API workflow on a list*, the completion time is generally shorter because Bubble is capable of running multiple workflows concurrently. This means if you have Workflow 1, 2, and 3, Bubble can process them all at the same time, aiming to complete the task as quickly as possible. This parallel execution helps in speeding up the processing.

Secondly, using the *SAWOL* action will schedule all the workflows in one operation, whereas a recursive workflow will schedule each workflow separately. In other words, Schedule API workflow on a list is one action, while a recursive workflow (using our earlier examples of a list of 5,000 things) is 5,000 actions. Scheduling an API workflow is a fast process, but noticeable when multiplied by a long list of things such as 5,000.

#### Workload

Recursive workflows consume more server resources in two main ways.

* Reschedule action: Firstly, they need that extra action to reschedule themselves, using additional server capacity.<br>
* Conditions: Secondly, each cycle typically requires a conditional check to prevent infinite looping, further increasing server load. Each of these factors contributes cumulatively to the total workload on the server.

Improperly configured recursive workflows can unexpectedly use up your allocated workload units, possibly exhausting them in a single operation. This risk arises if the condition meant to halt the indefinite looping of the workflow is absent or incorrectly set up. Without a properly functioning stopping condition, the workflow may continue until it has consumed all available workload units

### Parallel versus sequential processing

As we touched upon earlier, Schedule API workflow on a list runs the workflows in parallel when possible. That doesn’t mean that all 5,000 run simultaneously, but generally that Bubble will not make any attempts to stop them from overlapping. This in turn means that even if you specify an interval (such as 1 second) between the workflows, they might still overlap if the prior workflow takes some time to finish. On longer lists, this is more likely to occur. As a result, setting an interval can stop workflows from overlapping, but there’s no guarantee.

Recursive workflows, on the other hand, can be guaranteed to run in sequence, since the action that schedules the next cycle is often the last action in the recursive workflow. That means the workflow first runs through the action steps, and the next cycle will not start until it’s scheduled.

While this can take longer and spend more server resources, it can be useful in scenarios where you want to avoid any overlap. We can illustrate this with a few examples:

#### Example 1: Race conditions

A race condition is a term often used in software development to describe when two or more processes access shared data and try to change it simultaneously. For example, if two Bubble workflows try to make changes to the same thing at the same time, the metaphor implies that those two processes are “racing” against each other to make the change, which can affect the outcome. This can lead to unexpected behavior, where it’s difficult or even impossible to predict which process will finish first.

If you are using *Schedule API workflow on a list*, and the workflow involves making changes not only to each individual thing in the list, but also to one thing that’s shared across more than one workflow, you may not get the expected result, since the order of execution is not guaranteed.

To avoid this, you can use a recursive workflow to run the operation sequentially, or, if possible, make the change to the shared thing only when all the workflows in the list have finished.

#### Example 2: depending on data from prior step

Sometimes, you’ll need to send a dynamic parameter along with the next scheduled API call. In cases where this parameter relies on information from the current cycle, you’ll need to be sure that the data is generated before the next iteration.

Consequently, you can’t schedule the workflows in one operation, but will need to schedule them one by one recursively. While this can be necessary and useful in some scenarios, finding a workaround that doesn’t force you to send unique parameters for each iteration can have a big effect on the performance and workload consumption of the process.

#### Example 3: Tracking the progress

With Schedule API workflow on a list, it’s difficult to predict or confirm when a process is done, as there is no guarantee on order of execution and the workflows are all independent.

A recursive workflow gives you more flexibility to track the ongoing process, or to know when it’s finished. Typically the iteration number is passed as a parameter to a recursive workflow and decremented in each subsequent call to schedule the next one. This allows you to include actions in the workflow with conditionals that reference where the workflow is in the current sequence. This can be useful to show the progress visually on-screen, start a workflow when the process is done or communicate to the user (such as sending an email) when it’s finished.

### Setting a dynamic timestamp on each iteration

Recursive workflows are not only used for bulk processing, but can also be used to perform a specific task at a given interval or time. For example, you may want to run a workflow at a dynamic time, such as the fifth day in every new month; by using a recursive workflow, you can have the workflow dynamically schedule itself to run again at a future time, potentially continuing this pattern indefinitely. This capability allows for flexible and precise timing in automating tasks.

Let’s say you’re using a workflow to schedule a regular email to users. By default, it's sent every month, but you may offer your users to change that schedule, such as setting a bi-monthly mail instead.

1. If you use *Schedule API workflow on a list*, you will have to schedule each iteration on a set, unchanging schedule
2. If the user changes their schedule setting, a recursive workflow can easily adapt to the new pattern

This is just one example to show that recursive scheduling can help you experiment more freely with dynamic patterns in execution. You could also have the time of the next iteration be based on data generated in the current iteration, keeping it truly dynamic.

### Reliability

With *Schedule API workflow on a list* scheduling all workflows in one operation, they are guaranteed to run. A recursive workflow relies on the rescheduling action, and as such, can technically fail to move on to the next iteration. If one iteration stops, all upcoming iterations stop. This is not a bad thing in all scenarios – after all, if a workflow hits an error, you may want it to stop rather than to continue the work on all the things in the list. But if it's important that the workflow finishes, *SAWOL* will provide a slightly higher level of reliability.

When using *SAWOL*, all workflows are queued in a single operation, ensuring completion. In contrast, recursive workflows, depending on rescheduling actions, can occasionally fail to proceed to the next iteration due to various reasons. While this is rare, but not impossible, and there are a few reasons as to why it can happen:

* excessive server resource consumption may cause timeouts, halting the rescheduling action
* If one rescheduling action stops, it disrupts the entire cycle.
* Server outages or errors can prevent the reschedule action from executing

The longer the list and timeframe of the full operation, the bigger statistical chance of an error is, making Schedule API workflow on a list a safer action. In cases of server errors, this workflow type simply pauses and then resumes once server resources become available again.

## The workflow scheduler

The [API workflow scheduler](#user-content-fn-6)[^6] is Bubble’s built-in tool for keeping an eye on scheduled workflows. This tool allows you to see a list of scheduled workflow within a given timeframe, and take actions such as pausing or deleting them.

This process is more easily controlled with the Schedule API workflow on a list action, since it will simply list all the scheduled actions as soon as that action has completed. Recursive workflows, on the other hand, are “invisible” until scheduled. That is, Bubble doesn’t know that they will be scheduled until each iteration actually is.

This can make them more complicated to handle in the API workflow scheduler; by the time you have canceled one scheduled workflow, it may already have scheduled the next iteration, forcing you to update your search.

[^1]: *Server-side* workflows are scheduled and executed entirely on the Bubble server. They can run even if the user closes the page.

    Article: [The frontend and the backend](/help-guides/logic/the-frontend-and-backend)

[^2]: *API workflows* are server-side workflows that you can schedule/trigger in your application and/or expose to be triggered from an external application or system through an API request.

    Article series: [The workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: *Workload* is the calculated metric of all the work the Bubble server needs to do to power your app.

    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

    Article series: [Optimizing for workload](/help-guides/workload)

[^4]: *Runaway loops* means loops that have no valid criteria for when to stop running. They can keep running indefinitely, exhausting workload.

[^5]: Recursive workflow can assign a dynamic time as each new iteration is scheduled. As such it offers more flexibility.

    Section: [Dynamic timestamps](#setting-a-dynamic-timestamp-on-each-iteration)

[^6]: The *API workflow scheduler* shows the current list of all scheduled API workflows, and let you pause and terminate workflows as needed.

    Article: [The API workflow scheduler](/help-guides/maintaining-an-application/scheduler)
