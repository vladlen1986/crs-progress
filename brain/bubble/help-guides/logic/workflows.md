# Workflows
> Source: https://manual.bubble.io/help-guides/logic/workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section explores workflows — the driving force that powers your app and brings its functionality to life.

{% embed url="<https://youtu.be/jx01hwKhXVQ>" %}

Workflows are the engine of your application – they are how you instruct Bubble to respond to what the user does, such as clicking a button, with a set of actions that can do anything from hiding/showing or animating things on the page to making changes in the database and make external API calls.

{% hint style="info" %}
**Best practice:** Bubble automatically assigns names to workflows when they are created. However, it's recommended to give your workflows custom, descriptive names. This practice makes it easier to identify, organize, and search for them later.
{% endhint %}

A *workflow* is the combination of an *event* that triggers one or more *actions*.

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

## Events

An event is anything that tells a workflow to run, such as:

* A button being clicked
* An input's value being changed
* A condition being true
* A user logging in or out
* Changes in the database

Events can run on a page, or they can be triggered server-side[^1] (which doesn't require that a user has a page open).

Article series: [Events](/help-guides/logic/workflows/events)

## Actions

Actions are the operations that take place when a workflow is triggered by an event. You can place as many actions as you need inside one workflow. Actions can do things like:

* Creating, updating and deleting things in your database
* Hiding, showing and animating elements on the page
* Creating user accounts and logging users in/out
* Sending emails
* Navigating to a different page
* Loading data
* Using plugins, such as making a payment

This is not an exhaustive list, but as you can see, the actions in a workflow is how you make your app respond to a user's actions or changes in conditions.

Article: [Actions](/help-guides/logic/workflows/actions)

## The workflow canvas

{% embed url="<https://youtu.be/nbMdh3TExsA>" %}

The workflow canvas is structured to help you stay focused by letting you work on one workflow at a time. Workflows are arranged vertically, starting with the event at the top, followed by a sequential list of actions beneath it.

<figure><img src="/files/S1tSLvhPipqk5gtkEhjj" alt=""><figcaption></figcaption></figure>

Each action category is marked with a unique icon on the left, making it easy to quickly identify specific actions in your workflow. In the example above, the user icon reflects that the action belongs to the *Account* action categor&#x79;*.*

Next to the icon is the action label, which is customizable in the property editor of that action. Underneath you will see any condition placed on the action.

## Organizing workflows

{% embed url="<https://youtu.be/2H07G-MfQcM>" %}

Workflows in the workflow editor can be categorized in two ways for easier navigation: by creating folders and adding colors to workflows. There are no rules or best practices on how to best organize your workflows, but we recommend giving some thought as to how you can combine colors with folders to efficiently navigate pages with a lot of workflows.

### Colors <a href="#colors" id="colors"></a>

Each workflow you add can be given one of the following colors:

* Gray (default)
* Blue
* Red
* Green
* Orange
* Purple
* Cyan
* Brown

<figure><img src="/files/Df255ROWcIholxVCvTE5" alt=""><figcaption></figcaption></figure>

### Folders

{% embed url="<https://youtu.be/Rza2JW2lmR0>" %}

You can also organize workflows into folders, available in the left-hand menu of the workflow canvas. Each folder can be given a custom name. To add a new workflow to a specific folder, you can hover the folder and click the *+* symbol that appears. Workflows can also be dragged/dropped between folders.

By default, all workflows are placed in the *Uncategorized* folder. In the example below, we have created a custom folder and named it *Buttons*.

<figure><img src="/files/cpTr7wU3zcsHAUGwwFTk" alt=""><figcaption></figcaption></figure>

Each folder name is followed by the number of workflows within that specific folder.

## Searching for workflows

The toolbar allows you to quickly search for workflows. You can search for events, actions and conditions by typing their name/description:

<figure><img src="/files/l8GZePcbNt4RD4h4mpxn" alt=""><figcaption></figcaption></figure>

## Sharing workflows

You can share a specific workflow’s unique URL by copying it directly from the browser’s address bar while the workflow is open. This feature is helpful for keeping detailed notes[^2] (by including the URL to a specific workflow in the notes) or sharing a direct link to the workflow with team members for collaboration[^3].

## Compact mode

Compact mode displays workflows in smaller rectangles, enabling more steps to fit on the screen at once. Events and actions are left-aligned and utilize a larger portion of the screen width to present information clearly.

### Enabling compact mode

To switch between compact and normal view, click the icons in the upper-right corner of the workflow canvas:

<figure><img src="/files/ARs0GYZp1LsV58BvnjuY" alt=""><figcaption></figcaption></figure>

## Show conditions

In the list/grid of workflows, you can select to see *Conditions* on the workflow level:

<figure><img src="/files/XyVns6qLPWLnvfvljhL9" alt=""><figcaption></figcaption></figure>

To enable this, click the settings icon and select *Show Conditions*.

<figure><img src="/files/J95Xel6q070PWTSe4J8h" alt=""><figcaption></figcaption></figure>

## Grid view

In the left-hand menu bar, you can select to see workflows arranged in a grid instead of a list. To enable grid mode, click the settings icon and select *Grid view.*

<figure><img src="/files/T8Q7GAqHkJmqSYV7ORCv" alt=""><figcaption><p><em>Grid view</em> lets you view your workflows in a grid instead of a list.</p></figcaption></figure>

## Errors in workflows

Workflows can hit errors in different scenarios. For example:

* A user tries to log in using the wrong credentials
* A user tries to sign up using an email that already exists in the database
* A credit card payment fails because the card is declined

If a workflow runs into an error, it will stop running on the action where the error happened. Any previous actions will not be reverted.

{% hint style="info" %}
Note that the errors we are discussing in this section are related to system errors, and not to errors that are flagged by Bubble's issue tracker.
{% endhint %}

### Handling errors

Bubble's default way to communicate most errors is to show the error in the browser's standard message popup. You can instruct Bubble to handle errors on specific elements or more broadly on a page by using two different events. The links below point to guides for each type:

#### An element has an error running a workflow

This event will catch errors that happen related to a specific element. For example, if a *Log in* button connected to a workflow containing the *Log the user in* action generates an error, the error will be connect to that button.

Article section: [Using the *An element has an error running a workflow* event](/help-guides/logic/workflows/events/frontend-events#example-catching-errors)

#### An unhandled error occurs

This event will catch errors more broadly: any error on the page will trigger it unless it's caught by another error event.

Video tutorial: [How to use the Unhandled Error Occurs event](https://www.youtube.com/watch?v=VC2_8yiTD44)

## Workflow timeouts

In rare instances, workflows can [time out](#user-content-fn-4)[^4], generally indicating that the server has been overwhelmed with tasks that it cannot complete within a five-minute window. Bubble may also halt processing to preserve system stability, or timeouts may occur due to technical issues like lost server connections.

Timeouts are more likely with [highly complex workflows](#user-content-fn-5)[^5] or those processing large volumes of data. For instance, operations like *Make changes to a list of things* are efficient for up to 1,000 records but may slow down or time out beyond that number. For handling lists approaching or exceeding 10,000 records, it's highly recommended to use backend operations better suited for large data volumes.

If you want to learn more about bulk operations, you can have a look at the article below:

Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations)

We also explore optimizing your app for performance and workload[^6] in the article below. This can be helpful if you plan to work with large amounts of data or particularly demanding server processes:

Article series: [Optimizing for workload](/help-guides/workload)

[^1]: *Server-side* describes things that happen on Bubble's server, as opposed to on the user's device.

[^2]: Bubble allows you to attach notes to different components in your app.

    Article: [The note editor](/help-guides/getting-started/navigating-the-bubble-editor/tools/notes)

[^3]: You can add collaborators to your app to work together as a team.

    Article: [Collaborators](/help-guides/maintaining-an-application/collaboration)

[^4]: *Timeouts* occur when tasks exceed their maximum allowed execution time and need to be stopped to maintain system stability.

    This premature stopping can result in incomplete processes and, in worst cases, corrupted data.

    Though rare, timeouts are a potential issue in any programming environment, not just in Bubble.

[^5]: Highly complex in this context generally means operations that involve the database.

    For instance, database searches that have complex advanced filters that require Bubble to examine each row.

    This can significantly increase the operation's complexity and demand on system resources.

[^6]: *Workload* is the overall metric that measures how much work the server has to do to power your app.

    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)\
    Article series: [Optimizing for workload](/help-guides/workload)
