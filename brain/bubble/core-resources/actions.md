# Actions
> Source: https://manual.bubble.io/core-resources/actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions are the tasks that Bubble performs. All actions are part of a workflow.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (10)" %}
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

#### The frontend and backend

Frontend actions are actions that are triggered by your user interacting with your app, and backend actions are a part of workflows that are triggered and processed on the server in its entirety (such as API workflows).

The article below explores this topic:

* Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)

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

Actions give life to the app. They save data, charge credit cards, sign the user up, send emails, connect to external services, show elements, etc.

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

This section covers all of the actions in the core library and their respective parameters.

<details>

<summary><a href="/pages/-MTujpDi_QfHSXO4aNgi"><mark style="color:blue;">Account</mark></a><mark style="color:blue;">:</mark> actions that manage user accounts</summary>

Account actions are actions that create and manage user accounts in your app.

[List of account-related actions](/core-resources/actions/account)<br>

If you are unfamiliar with how user accounts work in Bubble, you can explore the more in-depth article series below:

User manual article: [User accounts](/help-guides/data/user-accounts)

</details>

<details>

<summary><a href="/pages/-MTujrgFLiHe7MfwSBOF"><mark style="color:blue;">Navigation</mark></a><mark style="color:blue;">:</mark> navigating between pages and pausing/canceling workflows</summary>

Navigation actions are used to navigate between pages, send different kinds of data to those pages and to add delays or even terminate a workflow altogether.

[List of navigation actions](/core-resources/actions/navigation)

If you want to learn more about the different ways you can set up navigation and send data in Bubble, you can check out the more in-depth user manual article series below. This series also covers how you can set up both Single-Page Apps (SPA) and multi-page apps.

User manual article series: [Navigation](/help-guides/logic/navigation)

</details>

<details>

<summary><a href="/pages/-MTujs88N9W-2FUmQGag"><mark style="color:blue;">Data (things):</mark></a> creating, managing and deleting data in the database</summary>

Data actions work with your database to create, change and delete data.

[List of data actions](/core-resources/actions/data-things)

If you want to learn more about how the database ands its related actions work, you can check out the more in-depth user manual article series below:

User manual article series: [Data](/help-guides/data)

If you are new to app development, you may also be interested in learning more about how to structure your database. The two article series below give an introduction to database structuring, as well as a wide range of examples that cover different types of apps, written by expert Bubble developers:

User manual article series: [Database structure](/help-guides/getting-started/building-your-first-app/database-structure)\
User manual article series: [Examples of database structures for different types of apps](/help-guides/data/the-database/database-structure-by-app-type)

</details>

<details>

<summary><a href="/pages/-MTujs_XlNBh6doqP8Hq"><mark style="color:blue;">Email</mark></a><mark style="color:blue;">:</mark> sending emails and calendar requests</summary>

Email actions let you format and send emails as well as calendar appointment requests.

[List of email actions](/core-resources/actions/email)

Emailing in Bubble comes with some default settings, and the article below explains how you can customize those settings to suit your app's needs.

User manual article series: [Email settings](broken://pages/-MUUNYlJhe5tqMARhsWS)

</details>

<details>

<summary><a href="/pages/-MTujtGIOJdedMCus4eJ"><mark style="color:blue;">Element</mark></a><mark style="color:blue;">:</mark> actions related to the elements on your page</summary>

There are many ways in which you can use actions to work with your elements, such as (not an exhaustive list):

* Showing and hiding
* Animating
* Scrolling to their position
* Setting customs states
* Load data into containers
* Scroll repeating groups

[List of element-related actions](/core-resources/actions/element)

If you are unfamiliar with what elements are or would like to know more in-depth how they work and are organized into a hierarchy, you can explore the user manual article series below:

User manual article series: [Elements](/help-guides/design/elements)

</details>

<details>

<summary><a href="/pages/-MTukA_HU-ZaoIIBrsUO"><mark style="color:blue;">Custom</mark></a><mark style="color:blue;">:</mark> triggering custom events, recurring events and managing scheduled events</summary>

Using custom actions you can perform a lot of tasks related to how other events are triggered, such as:

* Scheduling or triggering a [custom event](#user-content-fn-2)[^2] with different parameters
* Scheduling or canceling [API workflows](#user-content-fn-3)[^3] (workflows that run server-side)
* Running recurring events (such as running a workflow every five seconds)

[List of custom actions](/core-resources/actions/custom)

</details>

## Other ways to learn

<details>

<summary>User manual articles</summary>

#### Actions

Actions are the tasks that are performed as part of a [workflow](/core-resources/workflows). They are triggered by an [event](/core-resources/events).

Article: [Actions](/help-guides/logic/workflows/actions)

#### Workflows

For a more in-depth look at how [workflows](/core-resources/workflows) work, check out the article series below. This covers how to combine [events](/core-resources/events) and actions to make your app respond to user interaction

Article series: [Workflows](/help-guides/logic/workflows)

#### Conditions

Conditions are used to determine whether a [workflow](/core-resources/workflows) or action should run or not, by checking whether something is true. The article below covers how they work.

Article: [Conditions](/help-guides/logic/conditions)

#### Dynamic expressions

Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows. If you are unfamiliar with this subject, we recommend reading through the guide below:

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)

</details>

<details>

<summary>Video lessons</summary>

* [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: A *custom event* is an event that can be re-used, and triggered with different parameters using an action.

    They can be scheduled to run in the future, as long as the user doesn't navigate away from the page.

    User manual article: [Custom events](/help-guides/logic/workflows/events/frontend-events/custom-events)

[^3]: *API workflows* are workflows that run server-side, meaning that they can run even if the user closes the page. They can be scheduled to run any point in the future.

    *User manual artices series:* [*The Workflow API*](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    \
    \
    \ <br>

    \
    \
    \
    \
    \
    \
    \
    \&#xNAN;*User manual article series:* [*Introduction to APIs*](/help-guides/integrations/api)
