# Workflows
> Source: https://manual.bubble.io/core-resources/workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

Bubble operates on a workflow-centric programming model. Workflows dictate the app's response to user interactions.

Each workflow consists of a triggering event and a subsequent sequence of actions. For instance, a workflow might be set up such that when the *Signup* button is clicked, it registers the user, dispatches an email, and then navigates to a different page.

Workflows are tied to individual pages within the app and can be managed under the *Workflow Tab*. If an action produces output, it can be referenced as 'Result of previous step.'

The following section details all the events and actions available within Bubble.

### Condition

There may be times when a workflow or action should only execute under certain conditions[^2]. This might be when a user is logged in, a checkbox is selected, or if the user's email belongs to a specific domain.

To cater to these scenarios, you can attach a condition to the event. Conditions consist of [dynamic expressions](#user-content-fn-3)[^3] that return a [*yes* or *no*](#user-content-fn-4)[^4]. For actions, if the condition is not satisfied, that specific action will be bypassed, but subsequent actions will continue, albeit without data from the skipped action.

{% hint style="warning" %}
**Note:** When creating a workflow involving Rich Text, be careful when also using the "Text/Button ... is pressed" conditional statement on the same Rich Text - the two can interfere. As a workaround, consider adding a transparent shape on top and making that the source of the on click workflows.
{% endhint %}

### Element

Choose the element that the event/action applies to.

### Workflow folder

Assign a workflow/event to a folder for clarity in the app. Create a new folder by selecting the 'Create a new folder…' entry at the bottom of this dropdown menu or from the Workflow folders section in the Palette.

{% hint style="success" %}
**Tip:** To display the workflow folders, from the Workflow Tab, click the arrow in the long vertical area to the right of the Tab section in the Palette.
{% endhint %}

### Event color

Select a color for the event. This organizes workflows when the app becomes more complex. This color only appears in Development mode.

### Add a breakpoint in debug mode

When using the debugger, instead of using the step-by-step mode for all workflows, specify specific events or actions that should pause. Checking this box allows this. This option has no effect on the app when the debugger isn't present. Similarly, when users are using the app, this will not be applied.

### Disable workflow

Occasionally, when debugging, you may want to disable a workflow without getting rid of it. This could allow you to test specific pieces of functionality without consequent workflows getting in the way, or to modify an existing workflow while keeping a copy of the version that is already working for future reference.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Conditions*, or *conditional* [*expressions*](#user-content-fn-5)\[^5]*,* let you set up mechanisms that check whether a specific question returns a *yes* or a *no* answer and then take an action, stop an action or make a change in your app in response.\ <br>

    User manual article: [Conditions](/help-guides/logic/conditions)

    User manual article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.\ <br>

    User manual article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: If you come from a programming background, this is Bubble's terminology for *true* or *false*.
