# Events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers events, which are the triggers that start a workflow

{% hint style="info" %}
Events can happen both in the **frontend** and **backend** parts of your app. If you are unfamiliar with this concept we recommend you first read our dedicated article on the subject:\
\
Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
{% endhint %}

All workflows are a collection of one or more actions that are triggered by an **event**. In other words, the event is the starting point that initiates the running of one or more actions in a workflow.

<figure><img src="/files/lEiCEH3GDGHvtsPUw58t" alt=""><figcaption></figcaption></figure>

As the diagram above illustrates, every workflow consists of these two steps, but how these steps work is highly flexible. This article will focus on the various conditions that can result in an event being triggered.

<figure><img src="/files/9iZ3y8TP8uzycssBE9dA" alt=""><figcaption><p>When you open a workflow in the workflow canvas, the event is displayed and you can add actions by clicking the <em>+</em> icon<em>.</em></p></figcaption></figure>

## Frontend and backend events

Frontend and backend events are different in one simple way: the former refers to events that are triggered on the user's device and the latter refers to events that are triggered on the server.

<figure><img src="/files/aP1HTe0gwcscTpj62Xkg" alt=""><figcaption><p>The <em>event</em> refers to what <em>triggers</em> a workflow. A workflow triggered on the user's device (frontend) can still lead to stuff happening on the server – but it <em>starts</em> on the device.</p></figcaption></figure>

### Frontend events

Frontend events are the triggers that happen on a **page.** It's often – but not always – initiated by a user. Frontend events will only trigger as long as the page is open. They are categorized into three categories:

* **Element events** - all events related to elements, such as one being clicked.
* **General events** - general events are triggered as soon as a general property of the app change, such as when a user logs in/out or a conditional dynamic expression becomes true.
* **Custom events** - custom events are events that can be triggered by another workflow, to avoid duplicating workflows that you use in multiple places

Frontend events can still lead to *actions* happening on the server – but the *event* (or trigger) happens on the page.

Article series: [Frontend events](/help-guides/logic/workflows/events/frontend-events)

### Backend events

Backend events are the triggers that happen on the **server**. They are the result of an event being scheduled, an event being set to repeat at a set interval, changes made in the database or an [API request](#user-content-fn-1)[^1] from an external app. Backend events will trigger regardless of whether a page is open.

* **General events** - general events are triggered by one of the following:
  * An [API request](#user-content-fn-2)[^2] coming from internally in your app or an external app
  * A recurring event that's scheduled to run at a specific time, and from there on on a specific interval, such as weekly
  * A [database trigger event](#user-content-fn-3)[^3], which triggers if a specific change is happening in the database
* **Custom events** - custom events are events that can be triggered by another workflow, to avoid duplicating workflows that you use in multiple places

Article: [Backend events](/help-guides/logic/workflows/events/backend-events)

[^1]: An API request is a message sent to your app to ask for specific information or perform a specific task.\
    \
    Article series: [APIs: Connecting to other apps](/help-guides/integrations/api)

[^2]: In this context, an API request is any request sent to trigger an API Workflow in your app. API Workflows are explained in more details in our section about the Workflow API.

    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: Database trigger events are a type of [backend events](#user-content-fn-4)\[^4] that trigger whenever some specific data in the database changes. What this means that whenever something is created, changed or deleted, the event will trigger.

    Article: [Database trigger event](/help-guides/logic/workflows/events/backend-events/database-trigger-events)
