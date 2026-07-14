# Workflow tab
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/workflow-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article provides a general overview of the Workflow tab. For a deeper dive into how the workflow editor functions and how to build with it effectively, we recommend exploring the article series linked below.

Article series: [Workflows](/help-guides/logic/workflows)
{% endhint %}

The workflow[^1] tab is where you set up events and actions to instruct Bubble what to do as the user interacts with your app, such as what happens when a button is clicked.

<figure><img src="/files/aeFo41sXEibLZKEYuQOA" alt=""><figcaption></figcaption></figure>

A workflow is a combination of an *event* (which triggers the workflow) and one or more *actions* (which tells Bubble what to do when that event occurs). For example, the click of a button (event) can lead to creating a new thing in the database (action).

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

Workflows are displayed as squares, and clicking one will display the actions within that workflow.

Article series: [Workflows](/help-guides/logic/workflows)

## Workflow inspector

Whenever you select an event or an action, the workflow inspector will be displayed. This shows the relevant settings for the object you have selected.

<figure><img src="/files/ezrf6keXfV1sxchVWFR7" alt=""><figcaption></figcaption></figure>

In the above example we have selected a [*Go to page*](#user-content-fn-2)[^2] action, and the workflow inspector shows the relevant settings available for this action. In this case, this step in the workflow (marked as *Step 2*) will send the user to the index page.

## Other ways to learn

<details>

<summary>Related articles</summary>

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

</details>

<details>

<summary>Core reference</summary>

* [The workflow tab](/core-resources/bubbles-interface/workflow-tab)
* [List of events](/core-resources/events)
* [List of actions](/core-resources/actions)

</details>

[^1]: A *workflow* is the combination of an *event* that triggers one or more *actions*.\
    \
    They are how you instruct Bubble to respond to what the user does.

    \
    Article: [Workflows](/help-guides/logic/workflows)

[^2]: The *Go to page* action redirects the user, along with relevant data, to a specific page in your app.

    Reference: [Go to page action](/core-resources/actions/navigation#go-to-page)
