# Events
> Source: https://manual.bubble.io/core-resources/events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events trigger workflows.

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

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Backend events

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
Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)\
Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)\
Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
{% endtab %}
{% endtabs %}

Events trigger workflows[^2].

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

They are classified into these types:

## Event types

### General events

General events are events that trigger a workflow automatically when a condition is true, such as:

* **User is logged in**\
  Triggers when the user is [logged in](#user-content-fn-3)[^3], or [logs in](#user-content-fn-4)[^4].\
  [Core reference](/core-resources/events/general-events#user-is-logged-in) | [Video](https://www.youtube.com/watch?v=TfaMZ8ZagyI)<br>
* **User is logged out**\
  Triggers when the user is [logged out](#user-content-fn-5)[^5], or when they [log out](#user-content-fn-6)[^6]\
  [Core reference](/core-resources/events/general-events#user-is-logged-out) | [Video](https://www.youtube.com/watch?v=7zIKYl6u1lk)<br>
* **Do when condition is true**\
  Triggers when the resulting value from a condition[^7] equals yes.\
  [Core reference](/core-resources/events/general-events#do-when-condition-is-true) | [Video](https://www.youtube.com/watch?v=6mqbQ37y32c)<br>
* **Page is loaded**\
  Triggers when the page is loaded, or whenever the *Go to page* action is used (even if it goes to the same page).\
  [Core reference](/core-resources/events/general-events#page-is-loaded) | [Video](https://www.youtube.com/watch?v=Dm8Kp0micic)<br>
* **Do every X seconds**\
  Triggers every X seconds, as specified in the event.\
  [Core reference](/core-resources/events/general-events#do-every-x-seconds) | [User manual](/help-guides/logic/workflows/events/frontend-events/recurring-workflows) | [Video](https://www.youtube.com/watch?v=AdB0V7LFe_g)<br>
* **An unhandled error occurs**\
  Triggers whenever any registered error occurs, regardless of what the error is.\
  [Core reference](/core-resources/events/general-events#an-unhandled-error-occurs) | [Video](https://www.youtube.com/watch?v=VC2_8yiTD44)

### Element events

Element events are events that are triggered when a user interacts with an element, such as clicking a button.

* **An element is clicked**\
  Triggers whenever an element is clicked by the user.\
  [Core reference](/core-resources/events/element-events#an-element-is-clicked) | [User manual](/help-guides/logic/workflows/events/frontend-events#example-button-click) | [Video](https://www.youtube.com/watch?v=CObRfZiAitY)<br>
* **An input's value is changed**\
  Triggers whenever an [input form](#user-content-fn-8)[^8] element's value is updated, such as when the user types something in a text input.\
  [Core reference](/core-resources/events/element-events#an-inputs-value-is-changed) | [User manual](/help-guides/logic/workflows/events/frontend-events#example-input-value-changed) | [Video](https://www.youtube.com/watch?v=mDEVJLujlkQ)<br>
* **A map's marker is clicked**\
  Triggers whenever the user clicks the marker in a Maps element.\
  [Core reference](/core-resources/events/element-events#a-maps-marker-is-clicked) | [Video](https://www.youtube.com/watch?v=474NiBb14iw)<br>
* **A popup is opened/closed**\
  Triggers whenever the user opens or closes a popup. Note that open/close are two separate events.\
  [Core reference](/core-resources/events/element-events#a-popup-is-opened) | [Video](https://www.youtube.com/watch?v=AhiJv3jYZEg)

### Custom events

Custom events are events that can be triggered from other events, allowing you to set up "modules" or "functions" that you can use in more than one workflow.

* **Custom events**\
  Can be triggered by an action[^9] in a separate workflow.\
  [Core reference](/core-resources/events/custom-events) | [User manual](/help-guides/logic/workflows/events/frontend-events/custom-events)<br>
* **Recurring event** (server-side[^10])\
  Triggers once on the server, and then at a specified interval.\
  [Core reference](/core-resources/actions/custom#recurring-event)<br>
* **Trigger a custom event when data changes** (client-side[^11] action)\
  Is set to trigger by an action, and then triggers a custom event on the first instance of a specified change in the database.\
  [Core reference](/core-resources/actions/custom#trigger-a-custom-event-when-data-changes)

### Trigger event

* **Database trigger event** (server-side[^10])\
  Triggers whenever a specific change happens in the database.\
  [Core reference](/core-resources/events/trigger-event) | [User manual](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows#database-trigger-events)

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)

[^3]: Bubble handles user accounts automatically, and this data source lets you know whether a user is logged in.

    Article: [User accounts](/help-guides/data/user-accounts)

[^4]: The *Log the user in* action instructs Bubble to log the current user in.

    Reference: [Log the user in](/core-resources/actions/account#log-the-user-in)\
    Reference: [Sign the user up](/core-resources/actions/account#sign-the-user-up)\
    Article: [User accounts](/help-guides/data/user-accounts)

[^5]: Bubble handles user accounts automatically, and this data source lets you know whether a user is logged out.

    Article: [User accounts](/help-guides/data/user-accounts)

[^6]: The *Log the user out* action instructs Bubble to log the current user out.

    Reference: [Log the user out](/core-resources/actions/account#log-the-user-out)\
    Reference: [Sign the user up](/core-resources/actions/account#sign-the-user-up)\
    Article: [User accounts](/help-guides/data/user-accounts)

[^7]: In this context *conditions* are dynamic expressions that result in a *yes* or *no* value. This value determines what's required for an event to trigger.

    Article: [Conditions](/help-guides/logic/conditions)

[^8]: *Input form* elements are the elements that accept some sort of user input, such as text, numbers and file uploads.

    Reference: [Input forms](/help-guides/design/elements#input-forms)\
    Article: [Input forms](/help-guides/design/elements/web-app/input-forms)

[^9]: The *Trigger a custom event* action will trigger a custom event immediately.

    Reference: [Trigger a custom event](/core-resources/actions/custom#trigger-a-custom-event)

[^10]: *Server-side* means that the workflow is processed on Bubble's server, and can run even if the user closes the page.\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^11]: *Client-side* means that the event is triggered on the user's device, and will only run as long as the browser tab remains open on the same page.\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)
