# Navigation actions in mobile apps
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/navigation-actions-in-mobile-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (13)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Navigation

* Article series: [Navigation](/help-guides/logic/navigation)
  * Article [Single-Page applications](/help-guides/logic/navigation/single-page-applications-spa)\
    This article covers how to set up navigation within the same page, by hiding and displaying sections as the user interacts with the app.
  * Article: [Multi-page applications](/help-guides/logic/navigation/multi-page-applications)\
    This article covers how to navigate between different pages.

***

#### URL parameters

URL parameters are strings of data that you can place in the URL of the user's browser. This allows you to store information temporarily and is frequently used for navigation, as it allows the user to click the browser *Back* button to return to the URL they came from.

* Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)

***

**Workflows and logic**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

Workflows is a part of the *Logic* series in the user manual:

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (4)" %}

#### Workflows

* Bubble Academy: [How to use *Terminate Workflow action*](https://youtu.be/_Dr-bFHDYh4)
* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
  {% endtab %}
  {% endtabs %}

## Add a pause before next action

This action pauses the workflow for a set number of milliseconds. Use it when you need a delay before animating an element, for example. The pause only affects client-side actions; it has no impact on server-side actions like data changes or sending emails.

### Pause length (ms)

The number of milliseconds the workflow should pause.

***

## Go to view

This action takes the user to another view.

### Navigation type

#### Stack

Stack navigation lets users move forward through a series of views, with each new view placed on top of the previous one. The original view stays active in the background, so navigating back returns the user to it with its content preserved.

**Target view**

Defines the view you want to navigate to.

**Reset navigation stack**

To prevent users from returning to the original view, enable the *Reset navigation stack* option, which clears the navigation history entirely and starts a "new stack".

{% hint style="warning" %}
Note that resetting the navigation stack removes it from memory entirely. Any data from the original view, such as form content, is no longer accessible, and any actions targeting that stack will fail.
{% endhint %}

#### Modal

A modal opens a view as a full-screen sheet over the current view. The modal can be closed by swiping down.

***

## Go to previous mobile view

This action takes the user to the previous view in the app's history.

***

## Go to tab

*The Go to tab* action functions similarly to the *Go to view* action, including the use of view properties. However, the target view must be associated with a tab. When navigating using the *Go to tab* action, the tab bar will automatically update to reflect the new tab.

### Target view

The view you want to navigate to. The view needs to be associated with a tab to show up in the list.

***

## Open an external website

This action navigates to an external URL.

### Destination

The URL to open.

### Open in new tab

When checked, the URL opens in a new browser tab.

***

## Signup/login with a web browser

Allows the user to sign up or log in using a web-based form.

### Destination

The page to redirect to, to sign up or log in.

### Stay logged in

Sets the time until the user is automatically logged out.

| Checkbox status | Logged in for... |
| --------------- | ---------------- |
| Checked         | 365 days         |
| Unchecked       | 24 hours         |

### Parameters

Allows you to add one or more URL parameters to the page defined in [*destination*](#destination-1)*.*

## Terminate this workflow

This action immediately ends the workflow when it runs. In most cases, this action will be used in combination with an action condition: if the condition is false, the workflow continues; if true, the workflow ends.

If used inside a custom workflow, only that custom workflow is terminated. The parent workflow continues. If used with a custom event that returns data, this action is converted to a *Return data* action that both returns data and terminates the workflow.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
