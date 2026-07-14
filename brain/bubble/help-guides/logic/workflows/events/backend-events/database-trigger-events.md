# Database trigger events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/backend-events/database-trigger-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers database trigger events, which are events that trigger whenever some specific data in the database changes

Database trigger events are a type of [backend events](#user-content-fn-1)[^1] that trigger whenever some specific data in the database changes. What this means is that whenever something is created, changed or deleted, the event will trigger.

By combining this event with a dynamic expression, you can specify exactly what *kind* of change you want the event to be watching.

## Creating a database trigger event

### Creating the event

We'll use the following example in this walkthrough: we want to set up a trigger that watches for whenever any *user* changes their email address and perform an action whenever that happens.

Database trigger events are a part of Bubble' backend[^2], which means that the first step in setting them up is to [navigate to the backend editor](#user-content-fn-3)[^3]. From there, you click *the +* symbol to add a workflow, and select *A thing is modified* *event.*

<figure><img src="/files/UL4pGg3LdutBsBMgJPdE" alt=""><figcaption></figcaption></figure>

As soon as the database trigger event has been created, Bubble will display the settings for that event:

<figure><img src="/files/MyjQOkvDuE5WXCuRK28J" alt=""><figcaption></figcaption></figure>

In the *Type* field, we need to pick what data type we want the event to be watching. Since we want the event to trigger whenever a user changes their email, we'll set it to *User.*

### Building the expression

The next step is to build the [dynamic expression](#user-content-fn-4)[^4]; this is the part that tells Bubble what *kind* of change we want the event to respond to.

While structurally similar to expressions used elsewhere, expressions used in database trigger events are different in that they only give you access to two [data sources](#user-content-fn-5)[^5]:

* Thing before change
* Thing after change

In our example, the two data sources would represent the following data:

* The user **before** the data in the database was changed
* The user **after** the data in the database was changed

In other words; the event is responding to a *change* on the user, and it gives us access to the user in question both before and after that change has taken place – all in the same workflow. What does that mean to our expression? It means that we can compare[^6] two values: one from before the user was changed, and one from after.

This is how we build the expression to tell Bubble what kind of data to watch: by checking if the email saved on the user *before* the change is the same as the user *after* the change: If not, the workflow triggers.

This is what the expression should look like:

<figure><img src="/files/aqSxl7bOWlqqhIhMt936" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

In this expression, the *User before change/User after change* are both data sources, *email* are operators and *is not* is the comparison.

## Understanding database trigger events

### The event technically always runs – but the expression might stop it

Database trigger events look at *any* change to a data type, and triggers the event if one takes place. Bubble then checks the *Only when* expression and stops the rest of the workflow from running if it returns a negative value (*no*).

This is useful to know for a couple of reasons:

* A database trigger event *without* an *Only when* expression will run on every single change made to that data type
* Setting up a lot of database trigger events without any conditions for running can end up spending more capacity than you intended – exercise care when using and use expressions to stop unneeded workflows from running

### Limitations of database trigger Events

Database trigger events come with some built-in limitations:

#### They run with full administrative privileges

Although you can use "Current User" to see which user, if any, initiated the workflow that changed the thing, trigger workflows run with full administrative privileges and privacy roles are not applied while the trigger is running, so any searches performed during the workflow will return all results, not just the results the current user is allowed to see.

#### One database trigger event will not trigger a second one, or itself

If a database trigger has an action that makes changes to a thing, that change will not trigger a second trigger event (including the same trigger event). This could lead to an eternal loop of triggers. If you want to ensure that workflows started by a database trigger events *do* trigger secondary events, you can move the actions into an API workflow and schedule that workflow from the trigger workflow.

#### Making changes to the same thing multiple times in the same workflow will only trigger the event once

If you have a workflow that contains multiple actions that should trigger the event, it will only fire *once* for that workflow.

[^1]: *Backend events* are the triggers that happen on Bubble's server, as opposed to events that trigger on a page in your app.\
    \
    Article series: [Backend events](/help-guides/logic/workflows/events/backend-events)

[^2]: The *backend* is where you can create events and worklows that run exclusively on Bubble's server, as opposed to on a page. This is also where you manage your app's Workflow API that lets external apps send workflow requests to your app.\
    \
    Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)\
    Article series: [Backend events](/help-guides/logic/workflows/events/backend-events)\
    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: The backend editor is visible in the Bubble editor's page navigator after you have activated the Workflow API.\
    \
    Article section: [Accessing the backend editor](/help-guides/logic/the-frontend-and-backend#accessing-the-backend-editor)

[^4]: Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^5]: A *data source* is any place from which Bubble can retrieve data, such as the current user or a database search.\
    \
    Article: Dynamic expressions

[^6]: A *Comparison* is the part of an expression (along with the data source and operator) that lets us compare two different values against each other in different ways.\
    \
    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Reference: [Operators and comparisons](/core-resources/data/operations-and-comparisons)
