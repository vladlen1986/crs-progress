# Bubble API terminology
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/bubble-api-terminology · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the specific Bubble-related terminology concerning APIs

As we've seen in the articles so far in our [Introduction to APIs series](/help-guides/integrations/api/introduction-to-apis), working with APIs you come across a comprehensive terminology that was not invented by Bubble but has been around for years or decades. You can find a list of some these in our [API Glossary](/help-guides/integrations/api/api-glossary).

Bubble also introduces its own terminology to describe different parts of its API. To new users they may seem confusing and sometimes overlapping at first and this article will go in-depth in the different terms we use.

## Quick reference

<table><thead><tr><th width="188.33333333333331"></th><th></th></tr></thead><tbody><tr><td>Bubble API</td><td>Umbrella term for the Data API and Workflow API</td></tr><tr><td>Data API</td><td>The part of the Bubble API that deals with direct requests to the database</td></tr><tr><td>Workflow API</td><td>The part of the Bubble API that deals with requests to trigger API workflows</td></tr><tr><td>API Workflow</td><td>The workflow itself that you create and manage in the backend editor</td></tr><tr><td>Backend workflow</td><td>Umbrella term for the different workflows available in the backend editor (API Workflow, Database Trigger, Recurring event and Custom event)</td></tr></tbody></table>

## What is the Bubble API?

The term Bubble API describes the full suite of API capabilities that Bubble can offer to other applications. In other words, any **incoming** connection to your application is connecting to the Bubble API.

<figure><img src="/files/6Mvuf6sp0utup7X0HYxX" alt=""><figcaption><p>Whenever a call reaches the Bubble API it is routed to the Workflow API or the Data API depending on the instructions in the request</p></figcaption></figure>

You can see the Bubble API as an umbrella term for the Data API and Workflow API.

### Why is the API Connector not considered a part of the Bubble API?

The API Connector, which is used to establish **outgoing** connections to other applications is as such not a part of the Bubble API. We can illustrate the reason for this with an example moving outside of Bubble:

Let's say you are initiating a connection with a Weather API to get updated weather information. That Weather API service may also use one or more APIs in order to function: for example, it could be using the Google Maps API to convert an address into map coordinates. That information, while it helps them deliver a better service, is completely irrelevant to you. As such, it's not a part of their API – it would not be presented in their API documentation and you would never know that it was involved in responding to your request.

The same is true for Bubble whenever there's an incoming request: whether your app uses the API Connector to connect to other parties in order to complete a request is irrelevant to the third-party making the request. They simply want to connect to the Bubble API to get a response and what goes on behind the scene is hidden from them.

## What is the Data API?

<figure><img src="/files/sEj6IHjuMpz30kKejPdg" alt=""><figcaption></figcaption></figure>

The Data API is the part of the Bubble API that deals with direct access to the database. This allows a third party to send commands directly to your app's database and get a response it can recognize in return.

If you open up for it, this lets an external application:

* Search for and read records in your database
* Create new records
* Make changes to records
* Delete records

Of course this all doesn't happen unrestricted: as we'll see in later sections you have full control over what information and commands they have access to.

### How are these database operations different from workflows?

In Bubble's terminology, a *workflow* is the combination of an *event* and a set of *actions* that should be run as a result of that event. That techie-sounding description is what happens whenever you design something in the workflow editor:

<figure><img src="/files/7j9vCqLD7cpAOJ1L7qn9" alt=""><figcaption><p>A workflow can perform any set of Bubble actions. In the example above we're making changes to a User, creating a new database Thing and then sending an email.</p></figcaption></figure>

### If the Workflow API can make changes in the database, why do I need the Data API?

There are several reasons for why direct access to the database makes sense to use in most cases where you are working with data:

#### It's already set up

The Data API is set up to respond to different queries in a format that other APIs will recognize. It has built-in:

* Search for single records and get its data
* Search for records by criteria and get their data in a paginated format
* Create new Things
* Bulk create new Things
* Delete Things
* Change Things

All of this is possible without spending any time setting up a single workflow.

#### It's secure

The Data API gives you granular control over the security of your database:

* By requiring [**authentication**](#user-content-fn-1)[^1] you can determine which client[^2] is making the query, to...
* [**authorize**](#user-content-fn-3)[^3] that client to perform certain actions
  * Find Things
    * Hide and show specific fields
  * Create Things
  * Modify Things
  * Delete Things

Since this is all controlled in one central place – your app's Privacy Rules – you can apply restrictions to a wide set of clients and circumstances in one central dashboard.

<figure><img src="/files/OfWflLziZoHBQFlDX4wP" alt=""><figcaption><p>Using Privacy Rules you have a high level of control over the actions that a client accessing your database can make.</p></figcaption></figure>

### When should I use the Data API?

Whenever you want to give a specific app flexible access to your database. Let's go over a few examples to say when the Data API would be the more practical and secure API method:

**Case 1: Customer signup to lead**

Let's say you have built a CRM for your company in Bubble, but your website is in a different framework such as Wordpress. Each time a potential client signs up using the contact form on your website, you would like to create a lead in your CRM.

By setting up Wordpress to send an API request to the Bubble Data API, you can create a new lead in the Bubble database using the [Create a Thing Data API request](/core-resources/api/the-bubble-api/the-data-api/data-api-requests#create-a-thing).

**Case 2: Project hours info to invoice**

This time, let's imagine you have built a project management in Bubble, but the invoices are handled by a separate accounting app. By opening up your database to that accounting app they can get an up-to-date list of work hour logs whenever they need to generate an invoice.

In short, whenever you need to read or update information in the database and all the parameters needed are available when the request is sent, the Data API is usually the better choice.

## What is the Workflow API?

<figure><img src="/files/grf6WHkJyDOQepfgt85T" alt=""><figcaption></figcaption></figure>

As we explored in our last definition, the Workflow API allows external applications to trigger an [**API workflow**](#user-content-fn-4)[^4] in your app by [sending a request](#user-content-fn-5)[^5]. A workflow can perform any set of actions that you need to perform.

Let's re-visit our example from earlier:

<figure><img src="/files/7j9vCqLD7cpAOJ1L7qn9" alt=""><figcaption><p>Anything built in the workflow editor is known simply as a workflow - hence the name Workflow API</p></figcaption></figure>

In contrast to the Data API, the Workflow API can perform all sorts of actions with or without involving the database. Just like with workflows on your pages, you can set up a sequence of steps, each with unique conditions to determine whether to execute or not.

You can see the Workflow API in the same way as a user visiting a page in your app: they can click a button (make a request) that instructs your app to perform one or more actions that are run in sequence.

### If the Data API can make changes in the database, why do I need the Workflow API?

While workflows *can* perform database operations, a database operation is not necessarily performed by a workflow. There are many reasons for choosing the Workflow API over the Data API:

#### It can perform actions not related to the database

API Workflows can run any kind of [server-side actions](#user-content-fn-6)[^6] that Bubble (including plugins) can offer, such as sending emails, resetting passwords, submitting API calls and lots more.

#### It can perform a sequence of actions

Workflows often consist of more than one action that can be run in sequence, and each step can if needed rely on a previous step. The Data API will simply perform the requested action and respond with a preset response whereas the Workflow API gives full flexibility as to what kind of unlimited number actions you want to take.

A Workflow can also trigger other workflows in your app.

#### It can return a customized response

The Data API sends a response back in a format that's recognized by many other systems, but if you need to customize what the response to a call looks like, you can use the Workflow API to set it up.

### When should I use the Workflow API?

In short, whenever you need more flexibility in how data is manipulated, or when you need the API call to lead to executing actions that are not related to the database.

**Case 1: Follow-up steps**

Even when making changes in the database *is* what you're looking for, the Workflow API can be the right choice. For instance, an app may need to:

* Create a new Thing
* Count all Things of the same type
* Send an email to an address specified in the request with the total count

In this case we are working with the database, but since we also want to perform a few specific actions that rely on the first step it would make sense to set this one up in the Workflow API.

It might look something like this:

<figure><img src="/files/F4AJ33Rbc4KpnHVrJo5f" alt=""><figcaption><p>While you could use the Data API to Create the Thing, any subsequent action would need to be set up in an API Workflow.</p></figcaption></figure>

**Case 2: Using complex conditions**

In scenarios where you rely on conditions[^7] in order to determine whether an action should be performed the Workflow API also comes in handy. Let's say your app needs to:

* Create a new Thing
  * But *only* if today is a Friday and a maximum of 3 Things have been created today

A condition like that would involve checking the current day of the week and count the number of Things created today – this complex condition wouldn't be possible to set up in Privacy Rules and would need an API Workflow where you could place the condition in the *Only when* field.

<figure><img src="/files/JNJqI36JxTeSEDeR2jv4" alt=""><figcaption><p>If creating this new Thing relies on a condition like the above, you can move from the Data API to the Workflow API to get the desired result.</p></figcaption></figure>

We could provide a lot of different examples, but the important point is that the Data API is used only to read/manipulate data and send a preformatted response, and the Workflow API is used to trigger a workflow that can be set up to run any actions you want.

### Why is it sometimes called Workflow API and other times API Workflow?

While these two terms are indeed closely related, they mean different things.

The **Workflow API** is the part of the Bubble API that handles workflows.

<figure><img src="/files/gAaA4j77zmswJ0rFNj58" alt=""><figcaption><p>The Workflow API is the umbrella term for the part of the Bubble API that handles API Workflows.</p></figcaption></figure>

An **API Workflow** is the workflow itself that you set up in the backend workflow editor.

As such the Workflow API consists of API Workflows, and API Workflows are part of Bubble's Workflow API.

## The backend workflow editor

Bubble's [backend workflow editor](#user-content-fn-8)[^8] is the section of the Bubble editor where you create and manage backend workflows.

### What's the difference between backend workflows and API workflows?

Backend workflows is the umbrella term for any type of workflow you can create in the backend editor.

<figure><img src="/files/hgGJnLjP37RLVPwMvbat" alt=""><figcaption><p>Backend workflows offer four different kinds of events. API Workflows belong to the Workflow API while the rest are internal tools that serve other purposes. What they all have in common is that they run server-side.</p></figcaption></figure>

These are server-side workflows, meaning that they can run on the Bubble server without anyone visiting one of your app's pages. This includes, but is not limited to, API Workflows.

<figure><img src="/files/AnGer68p0EXKBVqZqL9R" alt=""><figcaption><p><em>Backend workflows</em> is the umbrella term for the workflows you add in Bubble's backend editor. API Workflows is one of them.</p></figcaption></figure>

[^1]: Authentication is the process of determining **who** a client is in order to determine what resources they should be given access to.

[^2]: The *client* is the one making an API call, as opposed to the *server*, who is the one to receive it and respond.\
    \
    Article section: [The client/server relationship](/help-guides/integrations/api/introduction-to-apis#client-and-server)

[^3]: *Authorization* is the process of determining **what** resources a client has access to after they have been authenticated.

[^4]: An API Workflow is a special kind of workflow that you find in Bubble's backend workflow editor.\
    \
    Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

[^5]: Sending a request in this context means that an external app is sending an API call to your app in order to perform some kind of action and get a response.

[^6]: Server-side actions in this context means actions that can be completed on Bubble's server, as opposed to client-side workflows that are used to perform actions related to a Bubble page.

[^7]: Conditions in the context of a workflow means that you can set up rules that govern whether a workflow or action is to run or not. Bubble will check this rule every time your app attempts to run it.

[^8]: You can read more about accessing the backend workflow editor in the link below:\
    \
    Article section: [Accessing the backend workflow editor](/help-guides/integrations/api/the-bubble-api/the-workflow-api#accessing-the-backend-workflow-editor)
