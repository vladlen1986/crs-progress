# Custom events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/frontend-events/custom-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Custom events. They are events that can be triggered by other workflows to avoid duplicating workflows, as well as triggered inside a reusable element.

{% hint style="info" %}
This article covers frontend Custom events – there are also custom events available in the backend.
{% endhint %}

Custom events are events that can only be triggered by using the *Trigger a custom event* action. In other words, they have to be triggered by another workflow. They can accept parameters that can be referenced in the action steps inside of the workflow.

You can trigger custom events that are on the same page, or inside of a reusable element that's directly placed on the page you are currently working on by using the *Trigger a custom event from a reusable element* action.

## What are custom events for?

Custom events have several useful usages:

#### Avoid repeating work

Since custom events can be called from anywhere on the page, you can avoid having to duplicate workflows.

For example, let's say you have an application that handles documents; you have one *Save* menu option under *File - Save*, and another as an icon in a toolbar. The two do exactly the same thing; they save the contents of a input field to the database.

Instead of using two identical workflows to save the document, you can place the actions needed to save it in a custom event, and trigger that workflow from both places.

#### Returning data

You can also return data with custom events. For example, you can:

* Check something in the database or an external service
* Make calculations
* Generate dynamic data
* Validate forms

#### Maintain consistency and prepare for future changes

Custom events also help you standardize things that happen in your application. Let's say for example that you use a [popup container](#user-content-fn-1)[^1] to show messages to your users such as *The changes have been saved.* By using a custom event to show that popup, you can ensure that it looks and behaves the same no matter what the message is. Should you later decide to move away from a popup and instead use an [Alert element](#user-content-fn-2)[^2] you can make that change in just one workflow and it will be replaced all across the page.

#### Control the order of operations in a workflow

Custom events give you a more fine-grained control over the order of operations in a workflow.

Article section: [The order in which actions are triggered](/help-guides/logic/workflows/actions#the-order-in-which-actions-are-triggered)\
Video: [Understanding workflow execution rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)

## Creating a custom event

To create a custom event, first navigate to the *Workflow* *editor*, and click *Click here to add an event... .* From the dropdown menu, pick *Custom* and *Create a new custom event.*

<figure><img src="/files/lRQkyXW6MdpYNZlz5ncC" alt=""><figcaption></figcaption></figure>

### Parameters

1. First, we give the event a *name*. The name doesn't affect how it works, but it's useful to make it descriptive and easy to recognize
2. Then, we'll set up two parameters by clicking the *Add a new parameter* button. Parameters let you pass any kind of data to the workflow, and use that information in actions inside of that workflow.
   1. First, we'll pass a user: that is the user who's name we want to change
   2. Then, we'll pass a text: this is the new name that the user will be given

Now we have a custom event that accepts two things: a user and a text. Let's reference those in an action:

<figure><img src="/files/pkUBqbu4r7BYpnAVo3oj" alt=""><figcaption></figcaption></figure>

We'll add a *Make changes to a thing* action.

{% hint style="warning" %}
Make sure to use the *Make changes to a thing* action, and not the *Make changes to current user actions*, since we will be using a parameter to determine *which* user to make changes to.
{% endhint %}

In the *thing to change* we choose *user,* which is the name we gave the first parameter. Then we pick the *Name* field on the user, and set it to *text*, which is the name of the second parameter.

<figure><img src="/files/G8ycBYZ6WZxhoK7yWPts" alt=""><figcaption></figcaption></figure>

This way, we have set up a custom event that can change the name of *any* user by asking for it as a parameter. By setting up custom events for key workflows in your app, you can make sure they work consistently and are not duplicated across your app.

### Return values

You can also set up a custom event to return one or more values of a specific data type. Let's expand our user example. Instead of changing the user's name, we want to start a subscription[^3] via the[ Stripe plugin](#user-content-fn-4)[^4]. The result can be successful, or not succesful, depending on the user's payment credentials, and we want to return the result after the actions in the custom event are finished running.

#### Adding the return values

First, select the custom event. The event properties will be displayed. Under return values, we'll include two points:

<table><thead><tr><th width="163">Value name</th><th width="120">Data type</th><th>Purpose</th></tr></thead><tbody><tr><td>Success</td><td>yes/no</td><td>Return whether the subscription was successfully started</td></tr><tr><td>Error code</td><td>text</td><td>If not, we want to return the error code from Stripe</td></tr></tbody></table>

We'll set it up as in the screenshot below:

<figure><img src="/files/2APzuEWRJ4QfbWd1HYj3" alt=""><figcaption></figcaption></figure>

A few things are worth noting in the image above:

* We are still sending a *user* parameter, to instruct the custom event to start the subscription on a specific user
* Return values are created under the *Return values* header – not to be confused with parameters
* We have set the subscription value as *required,* since we'll always return a yes or no
* The error message is set to *optional,* since we only need to return a value if the subscription is unsuccessful

#### Setting up the actions

{% hint style="info" %}
If you want to replicate this specific custom event, you will need to install the Stripe plugin from the plugin store.
{% endhint %}

Now, let's set up the actions that will attempt to start a subscription.

<figure><img src="/files/0PBKCF5UL6Bidk808MQZ" alt=""><figcaption></figcaption></figure>

1. First, we'll use the *Subscribe user to a plan* action to start the subscription on the *user* provided in the parameters.
2. In step 2, we use the *return data* action to send data back.
3. We'll leave the *Error message* return value blank, since this action will only run if the subscription is successful
4. We are using the *Only when* field to only send *yes* if Stripe returns the status *active*. This step terminates the workflow – any steps *after* this will not run if the *Only when* returns yes.

With that set up, we are returning a *yes* to the original workflow that triggered the custom event. Now let's look at Step 3, which runs if the subscription was *not* successful.

<figure><img src="/files/5QU31T4R13bJV5z3W97q" alt=""><figcaption></figcaption></figure>

1. First, we're return a *no* instead of a *yes*
2. This time, we'll also return the error message. The Stripe plugin (which connects to the Stripe API) returns a field called *status* which lets us know whether is was successful or not.
3. If that field does *not* contain the text *active*, then the subscription failed – Stripe will return a string to let us know what went wrong.

{% hint style="warning" %}
Keep in mind that whenever a *return data* action runs (and is not stopped by a condition), the workflow stops running. In other words, **any subsequent steps will not trigger**, similar to the *Terminate a workflow* action.
{% endhint %}

#### Using the returned data

The data will be "returned" to the original workflow. Let's have a look at how you access that data:

<figure><img src="/files/jj1rdtBSC5iXurLVlyM0" alt=""><figcaption></figcaption></figure>

In the first step we're triggering the event (see more about this in the section below). We're not returning any data until the next step.

<figure><img src="/files/2rQxdDwLlnKv3DrH2eyj" alt=""><figcaption></figcaption></figure>

1. We're using the *Show message in Alert* action to show the error message to the user. Note that you need to place an *Alert* element on the page before this action is available.
2. In the custom message, we'll use the *Result of step 1* data source. Step 1 in this case was the triggering of the custom event, so this lets us access the returned data.
3. In the third step, we're checking whether an error was generated.

In a real-life example, you may take more action than this, but this illustrates how you can use custom events to perform a series of actions and return dynamic data based on those actions.

## Running a custom event

### Triggering

A custom event can be triggered instantly by using the *Trigger a custom event* action.

<figure><img src="/files/jeLlBCqaYcKMMuMZwX5J" alt=""><figcaption></figcaption></figure>

#### Trigger a workflow in a reusable element

By placing a custom event inside of a reusable element, that workflow can be triggered from the parent of that reusable element. For example, if you have a page called *index* and you place a reusable element called *popup-message* on that page, you can trigger any custom event inside of *popup-message* from the index page (and any other page where you place the reusable element).

{% hint style="info" %}
**Note:** Triggering custom workflows works only in one direction: from the parent page to the child reusable element.
{% endhint %}

### Scheduling

A custom event can also be scheduled to run at a specific time by using the *Schedule a Custom event* action and providing a number of seconds of delay before the event should trigger.

{% hint style="info" %}
Scheduling a custom event is a client-side action, and consequently it will not run if the page is closed. If you want to schedule a workflow to run even if the user has closed the app, you can use server-side API workflows:

Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

Article: Scheduling [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)
{% endhint %}

#### Is there a difference between triggering a custom event and scheduling a custom event to occur with a 0 second delay?

Yes, there is.

Let's say you have a parent workflow that has some actions, then a "Trigger a custom event" action, then some more actions. When the parent runs that Trigger action, the parent will pause and wait for the custom event to complete before running the actions that come after it. This is convenient in part because the custom event will be able to see the context of what happened in the actions before it in the parent workflow.

In contrast, if you schedule the custom event to occur with delay 0, that custom event could end up running in parallel to the rest of the parent workflow.

#### How are custom events executed?

Whenever a custom event is triggered inside of another workflow, the workflow will stop at that point, run the custom event until it is completed, and then move on to the next action in the "parent" workflow. You can use this to control some aspects of how workflows are triggered. You can read more about how workflows are triggered in the link below.

Article section: [The order in which actions are triggered](/help-guides/logic/workflows/actions#the-order-in-which-actions-are-triggered)

## FAQ: Custom events

#### I get the [Issue Checker](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker) error "This workflow must end with a unconditional 'Return Data' action"

You will get this error when one or more of the *Return data* parameters are required (not set to optional) and the workflow does not have a *Return data* action, without a condition, as its last step. When a return data field is *required,* the workflow has to return something.

There are two ways to solve this:

* Add an unconditional action as the last step of the workflow, and return whatever data you need to
* Change the *Return data* parameter to be optional. This way a condition is accepted.

#### Can I loop a custom event?

Custom events cannot be looped, and as such a custom event cannot trigger itself. If you want to repeat a workflow more than once on a list of things, you can consider using [Schedule API workflow on a list](#user-content-fn-5)[^5], and set up an [API workflow](#user-content-fn-6)[^6] that completes the action.

[^1]: The *Popup* container type is a a group that is displayed above all other elements and is centered on the screen regardless of the scrolling position of the page.\
    \
    Article: [Popups](/help-guides/design/elements/web-app/containers/popups)\
    Reference: [Popups](/core-resources/elements/containers#popup)

[^2]: The *Alert* element is used to quickly flash a text message on the screen.\
    \
    Reference: [Alert](/core-resources/elements/visual-elements#alert)

[^3]: The Stripe plugin lets you set up subscriptions. Stripe will automatically handle regular payments.

    Reference: [The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

[^4]: The Stripe plugin is a Bubble-made plugin that lets you connect to the payment gateway Stripe. This lets you accept payments, start subscriptions, etc.

    Reference: [The Stripe plugin](/core-resources/bubble-made-plugins/stripe)

[^5]: *Schedule API workflow on a list* runs an API workflow once per item in a provided list of things. For example, if you want to make a dynamic change to five users, you can schedule the API workflow a list of those five users.\
    \
    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Article: [Schedule API Workflow on a list](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)

[^6]: *API workflows* are workflows that run fully on Bubble's server. They can be triggered, scheduled or executed from an external app/system via an API request.\
    \
    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)
