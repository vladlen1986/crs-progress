# Custom events
> Source: https://manual.bubble.io/core-resources/events/custom-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events that can be triggered by other workflows.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:orange;">**intermediate-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (10)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Custom events**

* Article: [Custom events](/help-guides/logic/workflows/events/frontend-events/custom-events)

***

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

## Create a custom event...

Bubble allows custom workflows[^2] to reuse the same logic in more than one workflow.

* The *Create a custom event* event defines the workflow
* You can give a custom workflow a **name and a label**
  * The name is used then you trigger the custom event from another workflow
  * The label is what Bubble shows in the workflow editor
* You can **trigger** a custom event in two ways:
  * The [*Trigger a custom event*](/core-resources/actions/custom#trigger-a-custom-event) action
  * The [*Schedule a custom event*](/core-resources/actions/custom#schedule-a-custom-event) action

[User manual](/help-guides/logic/workflows/events/frontend-events/custom-events)

## Event name

Enter the name of the workflow[^2]. This name will be displayed in the list of custom events when you use the [*Trigger a custom event*](/core-resources/actions/custom#trigger-a-custom-event) *or* [*Schedule a custom event*](/core-resources/actions/custom#schedule-a-custom-event) actions

## Call parameters

### Parameters

You can include parameters when you trigger a custom event. These parameters first need to be defined on the custom event itself.

* **Name:** This field accepts any name you want to give the parameter.
* **Type:** This field determines what [data type](#user-content-fn-3)[^3] the parameter should expect, such as *User, text,* or *number.*
  * **Is a list/array**: if checked, the parameter will accept lists, such as multiple users or texts.
* **Optional:** if checked, the parameter will not be treated as required. If unchecked, the Bubble [issue tracker](#user-content-fn-4)[^4] will create an issue if you use the [*Trigger a custom event*](/core-resources/actions/custom#trigger-a-custom-event) *or* [*Schedule a custom event*](/core-resources/actions/custom#schedule-a-custom-event) actions without specifying the required parameters.

### Return values

If you intend for the custom workflow[^2] to provide a return value, such as the outcome of a calculation, specify the type and label for this new return value here.

* Return values can be any type of data, just like parameters.
* Use the [*Return data* action](/core-resources/actions/custom#return-data) in the custom workflow to return data.
  * Use conditions[^5] to specify whether the data should be returned.
* The workflow will **stop running** if it hits a valid[^6] *Return data* action.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)

[^3]: A *data type* is any type of data that Bubble can manage, such as data thing, a user, text, numbers and dates.

    Article: [Data](/help-guides/data) | [Types of data](/help-guides/data#types-of-data)

[^4]: The *issue tracker* is Bubble's built-in automatic debugger that tracks any errors in your app's elements, expressions and workflows.

    Article: [Tools](/help-guides/getting-started/navigating-the-bubble-editor/tools) | [The issue tracker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker)

[^5]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

    Article: [Conditions](/help-guides/logic/conditions)

[^6]: Valid in this context means that any condition on the action does not stop it from running.
