# Workflows (PE beta)
> Source: https://manual.bubble.io/core-resources/bubble-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (9)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### **Logic**

Workflows is a part of the *Logic* series user manual series.

* Article series: Logic
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### API workflows

API workflows are workflows that run entirely on the server, can be scheduled to run at a later time and can be triggered from an external app or system using an API call.

* Article series: [Integrations](/help-guides/integrations)
  * Article series: [API](/help-guides/integrations/api)\
    This article series covers all aspects of inbound and outbound API calls in Bubble.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (3)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element)[The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)\
Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)\
Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This is the short-form technical core reference entry for workflows. If you are unfamiliar with how workflows work we recommend exploring the article series below to learn more:

User manual article series: [Workflows](/help-guides/logic/workflows)
{% endhint %}

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

Workflows are how your app responds to events. Each workflow starts with a triggering event, such as a button click, followed by a sequence of actions that run in order.

```
Example:
Event → Action(s)
Button click → Create a new database thing
```

Workflows are managed in the *Workflow* tab and are scoped to individual pages. The sections below cover all available events and actions.

## The workflow tree

The workflow tree displays all workflows on the current page. Each entry represents a workflow event and the actions that run when that event occurs.

By default, workflows are organized into folders. New workflows are placed in the *Uncategorized* folder unless you move them into another folder. Each folder can be expanded or collapsed to show or hide the workflows it contains. The number next to a folder indicates how many workflows are inside it.

Selecting a workflow in the tree opens it in the editor. From there, you can view or modify the event, its conditions, and the actions that run when it triggers.

### Workflow tree filter/view settings

The workflow tree includes several display and organization options available from the settings menu.

<figure><img src="/files/BJwt0ucgeW58HGIicOOm" alt=""><figcaption><p>Click the <em>Filter/view</em> icon to access the settings.</p></figcaption></figure>

### Folders

Folders can be used to organize workflows in the workflow tree. You can create folders to group related workflows together, for example by feature or by section of a page.

Folders are only used for organization within the editor. They do not affect how workflows run, the order in which they execute, or what users see in the app.

{% hint style="info" %}
The workflow editor settings let you group workflows by event type, such as *An element is clicked* or *Page is loaded*. Keep this in mind when organizing workflows into folders, since grouping by event type already provides a quick way to navigate and locate workflows.
{% endhint %}

#### By Folder / By Event Type

Controls how workflows are grouped in the tree.

* **By Folder** organizes workflows according to folders you create.
* **By Event Type** groups workflows based on their event category, such as *Page is loaded*, *An element is clicked*, or *Custom event*.

#### Show Conditions

Displays any [conditions](#condition) attached to events directly in the workflow tree. This can help you quickly identify workflows that only run when certain conditions are met.

<figure><img src="/files/jsheEcd18Jg90yyBwVJL" alt=""><figcaption><p>Enabling <em>Show Conditions</em> displays any conditions attached to events directly in the workflow tree. In the screenshot, the right-hand side shows the corresponding conditional expression for the event.</p></figcaption></figure>

**List View / Grid View**\
Changes how workflows are displayed in the editor area.

* **List View** displays workflows in a vertical list.
* **Grid View** displays workflows in a grid layout, which can make it easier to scan workflows on pages with many events.

## General properties

Event and workflow comes with a set of general properties, i.e. properties that are not event- or action-specific.

| Property                       | Description                                                                                    | Link                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Add a breakpoint in debug mode | Stops a workflow at the selected event or action when the workflow runs in preview mode.       | [The workflow property editor](/core-resources/bubble-workflows/the-workflow-property-editor#add-a-breakpoint-in-debug-mode) |
| Only when                      | A condition that determines whether the event or action runs, defined as a dynamic expression. | [The workflow property editor](/core-resources/bubble-workflows/the-workflow-property-editor#only-when-conditions)           |
| Notes                          | Lets you assign internal notes to a specific event or action.                                  | [The workflow property editor](/core-resources/bubble-workflows/the-workflow-property-editor#notes)                          |

## Frontend events

Frontend events are events that are triggered from a page or view, often as the result of a user action.

| Category       | Description                                                                                                                                                                                               | Link                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| General events | General events are triggered upon specific conditions not necessarily initiated by the user interacting with an element, such as when the page loads, a user logs in/out or a specific condition is true. | [General events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties) |
| Element events | Element events are events that are triggered by an element, such as when an element is clicked or its value changes.                                                                                      | [Element events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties) |
| Custom events  | Custom events can be triggered by other workflows and reused in multiple places.                                                                                                                          | [Custom events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties)   |

## Backend events

Backend events are events that are triggered server-side (in the backend). They can run independently of pages and views.

| Event               | Description                                                                                                                                                                                                                                                                        | Link                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| API workflow        | API workflows are workflows that run on the server rather than in the browser. Unlike regular workflows, they aren't tied to a page or a user session, which means they can run in the background, be scheduled for a future time, or be triggered from outside your app entirely. | <p><a data-mention href="/pages/QT2BQ2gOa929o0uTqX6U">/pages/QT2BQ2gOa929o0uTqX6U</a><br>(Workflow API section)</p>              |
| A thing is modified | Triggers when a change happens in the database, regardless of source.                                                                                                                                                                                                              | [A thing is modified](/core-resources/bubble-workflows/bubble-events/backend-event-properties/trigger-event-a-thing-is-modified) |
| Recurring event     | Recurring events can be triggered or scheduled and will then run at a specified interval.                                                                                                                                                                                          | [Recurring event](/core-resources/bubble-workflows/bubble-events/backend-event-properties/recurring-event-properties)            |

## Bubble-made plugin events (web)

| Event category            | Description                               | Link                                                                                                  |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Bubble-made plugin events | Events related to plugins made by Bubble. | [Bubble-made plugin events](/core-resources/bubble-workflows/bubble-events/bubble-made-plugin-events) |

<table><thead><tr><th>Category</th><th width="126.203125">Web/mobile</th><th>Description</th><th>Link</th></tr></thead><tbody><tr><td>Account</td><td>Both</td><td>Actions related to user accounts.</td><td><a data-mention href="/pages/AtvmSLbVgKj4M2V2Pzpj">/pages/AtvmSLbVgKj4M2V2Pzpj</a></td></tr><tr><td>Navigation</td><td>Web</td><td>Actions related to web-specific navigation.</td><td><a data-mention href="/pages/fysfjGRIZUomTIC13Pp5">/pages/fysfjGRIZUomTIC13Pp5</a></td></tr><tr><td>Navigation</td><td>Mobile</td><td>Actions related to mobile-specific navigation.</td><td><a data-mention href="/pages/HFHHWwmIBgp0R1ftC4zk">/pages/HFHHWwmIBgp0R1ftC4zk</a></td></tr><tr><td>Data (things)</td><td>Both</td><td>Actions related to the database.</td><td><a data-mention href="/pages/oqiw0tFEKQv4w810mb2e">/pages/oqiw0tFEKQv4w810mb2e</a></td></tr><tr><td>Elements</td><td>Both</td><td>Actions related to elements.</td><td><a data-mention href="/pages/jBFRRz2u1brrkN2NclGa">/pages/jBFRRz2u1brrkN2NclGa</a></td></tr><tr><td>Email and notifications</td><td>Both</td><td>Actions related to sending emails and push notifications.</td><td><a data-mention href="/pages/2U66sb2WW4UpSaCxY9Yr">/pages/2U66sb2WW4UpSaCxY9Yr</a></td></tr><tr><td>Native mobile actions</td><td>Mobile</td><td>Mobile-specific actions</td><td><a data-mention href="/pages/QRdUg8x1O9U43N5cFkKQ">/pages/QRdUg8x1O9U43N5cFkKQ</a></td></tr><tr><td>Custom actions</td><td>Both</td><td>Actions related to triggering/scheduling custom events and reacting to database changes.</td><td><a data-mention href="/pages/cMxR69cKAafTkeQPf4YN">/pages/cMxR69cKAafTkeQPf4YN</a></td></tr><tr><td>Bubble-made plugin actions</td><td>Web</td><td>Actions related to plugins made by Bubble.</td><td><a data-mention href="/pages/DWuM09YMLrc47ca8It7y">/pages/DWuM09YMLrc47ca8It7y</a></td></tr><tr><td>In-app purchase actions</td><td>Mobile</td><td>Actions related to mobile in-app purchase actions (iOS and Android)</td><td><a data-mention href="/pages/43yY6ZbnnwBEV0deP2aB">/pages/43yY6ZbnnwBEV0deP2aB</a></td></tr></tbody></table>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
