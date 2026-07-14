# Navigation
> Source: https://manual.bubble.io/core-resources/actions/navigation · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions that instructs Bubble to navigate between pages and pause/cancel workflows

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

## Go to page ...

This action takes the user to another page and optionally defines which data to send to that page, if the destination page has a type of content. You can choose the page destination from static options (existing page names) or dynamic options (current page or dynamic page).

If the action is to go to the current page but statically specified and with different data to send, the content of the page will be updated without reloading the page. If the action is to go to the current page but dynamically specified, the data already sent to the page will be preserved. If the action is to go to the dynamic page, parameters will be cleared.\
\
If a change page action is the only action in a workflow that is triggered on page load, the redirection will happen on the server. Note that if a condition is applied on such an event, the redirection will happen on the server if the condition only involves the Current user and the Current page thing.

If the dynamic expression returns an empty value the action will redirect to the index page. If it returns a non-empty value that doesn’t match any page names, it will keep the user on the current page.

### Dynamic page name <a href="#dynamic-page-name" id="dynamic-page-name"></a>

If you want the page name to be dynamically specified, you can create a dynamic expression representing the page name here.

### Data to send

Choose the thing for the page content of the destination page. The type of this thing should be consistent with the page's type of content. If the type is inconsistent, the expression will be red. If the page doesn't have a type, you can send text instead to append a path to the URL.

### Send more parameters to the page

Additional data can be sent to the page. This can be a text, a number for a search, etc. This option defines the series of key/values to send. The way to use them in the destination page is by using the 'Get data from page URL' data source.

### Additional parameters

Define the key/values to send to the destination page.

{% hint style="warning" %}
Due to Bubble's internal logic, **avoid** using the following strings as **keys**:

* id
* debug\_mode
* resume
  {% endhint %}

### Send current page parameters

If there is any data stored in the page URL parameters when the page changes the parameters will be carried over to the destination page as well. These parameters will be overridden by any parameters with the same name added using the "Send more parameters to the page" option.

### Replace the entry in the browser history

When redirecting to the same page and updating the data to send, a new entry is added to the browser history. Check this box if you do not want the initial page included in the list.

User manual article section: [Understanding "Replace the entry in the browser history"](/help-guides/logic/navigation/multi-page-applications#understanding-replace-the-entry-in-the-browser-history)

### Open in new tab

Checking this will open the page in a new tab.

## Refresh the page

This action reloads the page. It is equivalent to the user hitting 'Refresh' in their browser.

{% hint style="warning" %}
**Note:** The *Refresh the page* action resets the current page context and interrupts any ongoing server-side calls tracking workflow progress. Due to potential timing discrepancies, it's recommended to avoid executing workflow steps immediately after this action, since they may fail to run.

Instead, position the *Refresh the page* action as the final step in your workflow, and then use the *Page is loaded* event to trigger any subsequent actions.
{% endhint %}

## Go to previous page

This action goes to the previous page in the browser history. It is equivalent to the user hitting 'Back' in their browser.

## Open an external website

This action opens another website.

### Open in new tab

Checking this will open the page in a new tab.

### Destination

Enter the URL to be opened. Enter a dynamic address using the 'Insert dynamic data' button.

## Add a pause before next action

This action pauses the workflow for the number of milliseconds entered. This is useful if you want to wait before animating an element, etc. This will have no impact on actions that happen on the server, like data modifications, sending emails, etc.

### Pause length (ms)

Enter the number of milliseconds the workflow should pause.

### Hide the status bar as the pause occurs

By default, the status bar is shown during this action. To hide it when the workflow pauses, check this box.

## Terminate this workflow

This action, if it runs, immediately ends the workflow. Useful in conjunction with an action condition... if the condition is false, the workflow will continue; if true, the workflow will end. If run in a custom workflow, will terminate that workflow, but not the parent workflow.

If this action is used with a custom event that returns data, this action will be converted to a return data action that both terminates the workflow and return data.

<details>

<summary>Video lesson</summary>

*

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
