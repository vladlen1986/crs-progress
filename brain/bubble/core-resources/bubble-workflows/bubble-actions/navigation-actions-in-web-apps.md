# Navigation actions in web apps
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/navigation-actions-in-web-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

### Hide the status bar as the pause occurs

By default, the status bar is visible while the workflow is paused. Check this box to hide it during the pause.

***

## Go to page

This action takes the user to another page and optionally sends data to that page if the destination page has a type of content. The destination can be a static page name, the current page, or a dynamic page name.

### Destination

#### Static page

A page selected from the dropdown that shows all your app's pages. If you want to stay on the current page, but change the page thing, select the page in the dropdown. If you want to keep the page thing, but send URL parameters, you can use the [*Current page*](#current-page) option.

#### Dynamic page

A dynamic expression representing the destination page name, for cases where the destination should be determined at runtime. If the dynamic expression returns an empty value, the action redirects to the index page. If it returns a non-empty value that doesn't match any existing page name, the user stays on the current page.

#### Current page

Navigates the user to the page they are currently viewing. Keep the following in mind:

* This does not refresh the page, but stays on the current page
  * You can use it to update URL parameters
* Any *Page is loaded* events will still trigger, even if the page doesn't refresh
* The data already sent to the page (i.e. the page thing) is preserved

### Data to send

The thing to send to the destination page. Its type must match the page's type of content. If the page has no type of content, you can send text to append a path to the URL.

The *Data to send* property is only visible when you have selected a static page in the *Destination* property.

### Replace the entry in the browser history

When redirecting to the same page with updated data, a new entry is added to the browser history by default. Check this box to replace the current entry instead, so the initial page isn't added to the browser history.

### Open in new tab

When checked, the destination page opens in a new browser tab.

### Send current page parameters

When checked, any URL parameters present on the current page are carried over to the destination page. Parameters with the same key as those added in *Send more parameters to the page* are overridden by the new values.

### Parameters

Additional key-value pairs to pass to the destination page, readable via *Get data from page URL*. Click the + symbol to add a new parameter.

{% hint style="warning" %}
Don't use `id`, `debug_mode`, or `resume` as keys: these are reserved by Bubble's internal logic.
{% endhint %}

***

## Go to previous page

This action takes the user to the previous page in their browser history. It's equivalent to the user clicking *Back* in their browser.

***

## Open an external website

This action navigates to an external URL.

### Destination

The URL to open. Click the + symbol to build a dynamic URL.

### Open in new tab

When checked, the URL opens in a new browser tab.

***

## Refresh the page

This action reloads the current page. It's equivalent to the user clicking *Refresh* in their browser.

{% hint style="warning" %}
The *Refresh the page* action resets the current page context and interrupts any ongoing server-side calls tracking workflow progress. Avoid placing workflow steps immediately after this action, as they may not run due to timing issues.

Place *Refresh the page* as the last step in your workflow, then use the *Page is loaded* event to trigger any actions that should run after the refresh.
{% endhint %}

***

## Terminate this workflow

This action immediately ends the workflow when it runs. In most cases, this action will be used in combination with an action condition: if the condition is false, the workflow continues; if true, the workflow ends.

If used inside a custom workflow, only that custom workflow is terminated. The parent workflow continues. If used with a custom event that returns data, this action is converted to a *Return data* action that both returns data and terminates the workflow.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
