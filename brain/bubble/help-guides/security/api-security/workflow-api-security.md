# Workflow API security
> Source: https://manual.bubble.io/help-guides/security/api-security/workflow-api-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security related to the Workflow API.

{% hint style="info" %}
This article covers the **security** aspects of using the Bubble Workflow API specifically. If you want to learn more about the Bubble Workflow API in general, you can check out the articles below:

Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endhint %}

The Workflow API allows external apps and systems to trigger specific workflows within your Bubble app. It provides a set of endpoints to initiate predefined sequences of actions or events in your app from outside sources. Naturally, opening up for external systems to activate workflows in your app can introduce potential vulnerabilities, so it's essential to learn how to use it correctly.

In this article, we'll explore how to set up API workflows that are secure.

## Guiding principles in Workflow API security

### The principle of least privilege

As discussed in various sections of our Security article series, the principle of least privilege remains important when working with the Workflow API. In this segment, we'll delve into methods and strategies to ensure adherence to this principle when setting up workflows that can be reached from outside of your own app.

> In a bank, not every employee has the keys to the vault. A teller can access the cash drawer but doesn't have the authority to authorize large wire transfers. Conversely, the bank manager might have that authority but doesn't necessarily need access to every single safety deposit box.

### Authentication and authorization

If you are reading this article series in order, you'll remember that we've talked extensively about authentication and authorization.

<figure><img src="/files/oCZlIIkyP1nvgenu3XOl" alt=""><figcaption><p>Authentication identifies <strong>who</strong> the client is and authorization determines <strong>what</strong> they should have access to.</p></figcaption></figure>

With the Data API, we explored how the **what** is basically the database; the data types, fields and operations that a specific user can access. The Workflow API is essentially the same, except that instead of protecting data, we're protecting workflows.

We'll still use the same mindset when planning our security: every client that wants to trigger workflows in your app need to go through the two steps of determining **who** they are, and **what** they have access to.

## Authentication

When an API workflow is created, Bubble automatically generates a unique endpoint[^1] to trigger it, such as:

```url
https://my-bubble-application.bubbleapps.io/version-test/api/1.1/wf/my-workflow
```

If the workflow required no authentication, knowing this URL would be enough for any actor (malicious or not) to trigger the workflow as many times as they want. Let's first talk about a few different reasons why you should be careful with that approach:

* Running an API workflow spends server resource, just like other workflows in your app
  * If an API is repeatedly triggered, it can increase your workload[^2] consumption
  * If left completely unchecked and continuously running, the Bubble has safeguards in place to ensure your app doesn't spend too much server resources: this can lead to your app slowing down or even stopping completely
* Running API workflows can potentially make a lot of changes in your database – by requiring authentication, you are adding one more potential safeguard on top of privacy rules and conditions in that workflow (we'll get back to this point later in the article)

While you are free to set up your API workflows as you see fit, we generally recommend that you always require authentication to run it.

Just like with the Data API, the access level of an API workflow can be split into three categories:

* No clients have access to any API workflows (the Workflow API is disabled or all API workflows are unexposed)
* Some clients have access to selected API workflows (the Workflow API is enabled, but requires authentication)
* Everyone has access (the Workflow API is enabled, and no API workflows require authentication)

### No one has access

The first scenario is that no client, whatever their credentials, have access to any API workflows at all. There are two ways to do this:

#### Disabling the Workflow API

The first way is to disable the Workflow API altogether under *Settings - API*.

<figure><img src="/files/QDdFPD9RUwSdtAor6wwP" alt=""><figcaption></figcaption></figure>

This ensures that you don't have any Workflow API endpoints exposed at all, and nothing can be triggered from outside of your app. However, this also means that Bubble's backend editor will be disabled altogether, meaning that you cannot set up any internal API Workflows.

#### Disabling individual workflows

The second option is to keep the Workflow API enabled, but set every API Workflow that you create to be non-exposed. This means that the API workflow can be triggered internally in your app, but it will not have any endpoint that can be triggered from the outside.

<figure><img src="/files/oHqASlCawK1nAGJVBJCR" alt=""><figcaption><p>Using the <em>Expose as a public API workflow</em> setting allows you to cut an individual API workflow off from external apps and systems.</p></figcaption></figure>

Using this method gives you access to the backend editor and all of its features, but requires that you are careful with the settings on each individual API workflow.

### Some clients have access to selected API workflows

The second option is to require authentication and open up for selected API Workflows to be triggered from outside of your own app.

#### Authentication

Authenticating clients to give them access to API workflows can be done in a few different ways. We go over this in detail in the article below:

Article: [The Bubble API: Authentication methods](/help-guides/integrations/api/the-bubble-api/authentication)

#### Exposing selected API workflows

Having set up the authentication, we can then proceed to set up which API workflows we want to expose.

{% hint style="warning" %}
API workflows are set to be exposed automatically when created – keep in mind that in this step you are *disabling* those you don't want to expose, and not the other way around.
{% endhint %}

To disable API workflows that you don't want exposed, uncheck the *Expose as a public API workflow* setting. This removes the endpoint of that workflow entirely, making it impossible to trigger regardless of authentication.

<figure><img src="/files/oHqASlCawK1nAGJVBJCR" alt=""><figcaption><p>Using the <em>Expose as a public API workflow</em> setting allows you to cut an individual API workflow off from external apps and systems.</p></figcaption></figure>

This way, only selected clients can run API workflows, and only selected workflows can be executed regardless of who the client is.

### Everyone has access

The final option is to open up API workflows to be triggered by anyone, without having to authenticate at all. Generally, we don't recommend this, as this opens up for potential misuse.\
\
To open up API workflows to be triggered without any authentication, check the Expose as a public API workflow box as illustrated above and set the Authentication dropdown to None required. Optionally, you can check the last box (Ignore privacy rules when running the workflow) to give the broadest possible access to your data as well.<br>

New Property Editor (Beta):

<figure><img src="/files/KMKRXflOoLOa7kdgRfPF" alt=""><figcaption></figcaption></figure>

Property Editor:\ <br>

<figure><img src="/files/jjDos5IKp700GZRnjmBV" alt=""><figcaption></figcaption></figure>

## Authorization

With the Data API, authorization is generally linked to data – what a client can see and make changes to. With the Workflow API, the picture becomes slightly more complex: since we are dealing with workflows, there are two more ways you can fine-tune your authorization for each individual client:

* [**Data**](#user-content-fn-3)[^3] (which can be protected with [privacy rules](#user-content-fn-4)[^4])
* [**Conditions**](#user-content-fn-5)[^5] (which can set further restrictions on the workflow or individual action steps inside that workflow)

<figure><img src="/files/HoGKqBdjnUgji6v8NHzp" alt=""><figcaption><p>An API workflow can go through multiple steps of authorization as illustrated above. Click the image to enlarge.</p></figcaption></figure>

In the schematic illustration above, we can see the potential route a Workflow API request could take in terms of authorization.

First, Bubble determines who the client is (authentication), and then proceeds to check whether the client is allowed to run the workflow at all (Authorization 1). Then, the flow can potentially introduce two more authorization steps (illustrated as Authorization 2): a *condition* could stop the client from running the whole workflow or one or more of its actions, and *privacy rules* could limit the client's access to *find* data to make changes to.

Let's look at how this could look in the editor:

<figure><img src="/files/AB57eXY7JF2kZmu8fKFL" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

1. The API workflow may require authentication/authorization to run
2. The *List of things to change* may produce a limited result because privacy rules protect some or all records from being found in a search
3. The *Only when* conditional expression may prohibit the client from running the workflow, even if they are authenticated.

### Data (privacy rules)

{% hint style="info" %}
If you are unfamiliar with privacy rules, we highly recommend reading the articles below to get an understanding of how they work.

Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)\
Article: [Workflow API privacy rules](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules)
{% endhint %}

After having set up the authentication method you want to use, you then need to authorize those clients to access data *within* the action steps in that workflow. This understanding is important to take in as you plan your security, or you may get unexpected results.

Let's look at an example to illustrate:

#### Adding some information to a list of users

Let's imagine that we have a Bubble app with 100 users. As we start exploring how to work with an external system through the Bubble API, we realize we need to add some data to all of those users. Essentially, we want to make a change to all of them.

We decide to set up an API Workflow to do that job, and we open up for external access so that this can be triggered from the external app.

<figure><img src="/files/4f492MMX2trfeG5TNNuz" alt=""><figcaption><p>In the case of this API workflow we are in principle going through <em>two</em> rounds of authorization: first that the client is authorized to execute the workflow. and then which users they are able to search for.</p></figcaption></figure>

Here's where the *workflow versus data* point becomes interesting. In this case, we are only authenticating once, but in principle we are going through *two* rounds of authorization:

1. Is the client allowed to run this workflow?
2. **Is the client allowed to&#x20;*****search for these users?***

With this example, you can see why this could sometimes generate an unexpected result: while the client *does* have access to execute the workflow, they may not be able to actually search through all the users in the database.

Why is that? Because that data is protected by **privacy rules**, and the client does not match the needed credentials to download all of them. The unexpected result in this case might be that only a portion (or none) of the users were changed, as privacy rules stopped the client from finding them.

{% hint style="warning" %}
With the Data API, you can set specific privacy rules such as *Modify via API, Create via API* and so forth. Note that these settings **apply to the Data API specifically**; they do **not** affect an API workflow's ability to perform those operations.
{% endhint %}

#### Overriding privacy rules

If you want to give the broadest possible access level to your data, an API workflow can be set up to ignore privacy rules altogether. Again, we generally caution against using this method as it gives free access to *all* data in your database regardless of the privacy rules set.

<figure><img src="/files/jjDos5IKp700GZRnjmBV" alt=""><figcaption></figcaption></figure>

Still, there are many scenarios where this is useful: just make sure you understand the implications of the setting.

### Conditions

{% hint style="info" %}
If you are unfamiliar with conditional expressions, we highly recommend reading the article below to get an understanding of how they work.

Article: [Conditions](/help-guides/logic/conditions)\
Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
{% endhint %}

In this second step of authorization you would likely be more deliberate about its implementation: conditions.

Conditions can be added to the workflow itself or to any of its action steps and the result would be the same. Bubble will check the condition against the client trying to execute the workflow, adding another layer of authorization.

{% hint style="warning" %}
Keep in mind that privacy rules can also influence conditions. For instance, if a condition depends on a database search to validate, it may not yield the expected results if the results are constrained by privacy rules.
{% endhint %}

<figure><img src="/files/FIEA7cq8Lomk4OMD17Yj" alt=""><figcaption></figcaption></figure>

In the example above, we've further restricted one of the actions in the API workflow by adding a condition that checks whether the current user (the authenticated client running the API workflow) as a field called *Admin* set to *yes*. If this returns a no, the step will not run.

## Workflow API security checklist

* **Keep the principle of least access in mind** ([link](#the-principle-of-least-privilege))
* **Decide who has access (authentication)**\
  First, decide who has access to the data API:
  * No one ([link](#no-one-has-access))
  * Selected clients and workflows ([link](#some-clients-have-access-to-selected-api-workflows))
  * All clients ([link](#the-principle-of-least-privilege))
* **Decide what they have access to (authorization)**
  * Enable only the API workflows you want to expose ([link](#some-clients-have-access-to-selected-api-workflows))
  * Use privacy rules to control what data the workflow can find ([link](#data-privacy-rules))
  * Use conditions to apply more fine-grained authorization ([link](#conditions))

[^1]: An *API endpoint* is a specific URL or URI (Uniform Resource Identifier) where an API can be accessed to perform a particular action.\
    \
    In the context of API workflows, its endpoint is the full URL leading to that resource (the workflow to run).\
    \
    You can learn more about this in the article series below:\
    \
    Article series: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

[^2]: *Workload* is a measurement of 12 different activity types that together make up the total amount of work performed by Bubble to keep your app running. It's a core element of Bubble's pricing plans.\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

[^3]: In this context, we are talking about data stored in your database specifically.

[^4]: *Privacy rules* are rules that instruct the server to only send data to the browser or write to the database if certain conditions are met.\
    \
    Article: [Privacy rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)

[^5]: Conditions, or conditional expressions\[^6], let you set up mechanisms that check whether a specific question returns a *yes* or a *no* answer and then take an action, stop an action or make a change in your app in response.

    Article: [Conditions](/help-guides/logic/conditions)
