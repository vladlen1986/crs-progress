# The Workflow API
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to use API workflows to allow external applications to execute workflows in your Bubble app.

## **What is the Workflow API?**

The Workflow API is the part of Bubble's [built-in API](#user-content-fn-1)[^1] that lets you set up workflows that can be triggered from an external application or system by sending an API request or by scheduling an API workflow in your app.

By constructing [API Workflows](#user-content-fn-2)[^2] just like you construct regular workflows on a page, you can make Bubble perform any kind of action or sequence of actions based on a request that can include parameters.

For example, let's imagine you have a customer contact form on a website that's not part of your Bubble application. By sending an API request from that platform that includes parameters like name, email and phone number, you can use an API Workflow to create a new lead or register a new user in your Bubble app.

API Workflows also lets your app respond to webhooks[^3] in other systems. For example, whenever a payment is made successfully in Stripe, you can set up a webhook in Stripe to trigger a workflow in your Bubble app so that any needed action can be taken immediately.

### What's the difference between API Workflows and Backend Workflows?

As you start working in the Backend Workflow section of Bubble you may find the two terms used in different contexts. While they are certainly related, they don't carry the exact same meaning:

* **Backend Workflows** encompass all the different events that you can add in the Backend Workflow editor:
  * API Workflows
  * Backend Triggers
  * Recurring Events
  * Custom Events
* **API Workflows** refer specifically to the Workflows that you add by using the *New API Workflow* command in the editor. They are referred to as API Workflows whether they are public[^4] or not.

<figure><img src="/files/W1n9Li9HQYVt3NHnFpJR" alt=""><figcaption><p>Backend Workflows is a collective term for all the different events you can create in the Backend Editor.</p></figcaption></figure>

## **Activating the Workflow API**

To activate API Workflows, go to Settings - API and check the *Enable Workflow API and Backend Workflow*. This exposes all workflows that have *Expose as a public workflow* checked.

This also reveals your application's Workflow API root URL.

<figure><img src="/files/JxCu3FHh7z9wbHxYn3um" alt=""><figcaption></figcaption></figure>

## **Accessing the backend workflow editor**

When the Workflow API has been enabled in your application’s settings, you can navigate to the virtual page *Backend workflows* by clicking the icon in the left-hand menu bar.

<figure><img src="/files/cBzsEo6W5J1tsH7TTBGL" alt=""><figcaption></figcaption></figure>

## Access level

In addition to user-based authentication, API workflows can also be restricted to *admin-only access*. This gives you more precise control over who is allowed to trigger sensitive workflows, such as administrative actions or data management operations.

<figure><img src="/files/U01jFxTTdCcuoRAiLOSx" alt=""><figcaption></figcaption></figure>

API workflow authentication is configured using the *Authentication* setting in the property editor. This setting determines what level of access is required to run the workflow and replaces the previous *This workflow can be run without authentication* checkbox with a clearer set of options:

* **None required**\
  The workflow can be triggered without authentication. This option is typically used for signup, login, or other public-facing workflows.
* **User and admin**\
  Any authenticated user can trigger the workflow. If access should be limited to specific users, this must be enforced using conditions, logic, or privacy rules within the workflow itself.
* **Admin only**\
  Only requests authenticated with an admin-level API key can trigger the workflow. Regular user authentication is not sufficient.

Existing API workflows continue to behave as before unless their authentication setting is changed.

Using the *Admin only* option is recommended for workflows that perform sensitive operations or should be accessible only to trusted systems or users with elevated permissions. This helps prevent unintended access and ensures tighter control over how and when critical workflows are executed.

You can find the authentication setting by selecting an API workflow and reviewing its properties in the editor.

## Continue reading

{% content-ref url="/pages/MPejx6hSBC2VNtdNxrQR" %}
[API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)
{% endcontent-ref %}

{% content-ref url="/pages/4vLfEynUyUKWLUsbVckG" %}
[Workflow API privacy rules](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules)
{% endcontent-ref %}

{% content-ref url="/pages/Ot0gk4QBuwDtwB5lrVaU" %}
[Workflow API endpoints](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-endpoints)
{% endcontent-ref %}

[^1]: The Bubble API lets you set up a platform to accept incoming API requests to access your database or to trigger workflows.\
    \
    Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)

[^2]: An API Workflow is a Workflow that you can choose to expose to external apps to be able to trigger.\
    \
    Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

[^3]: A webhook is a way for an app to provide other applications with real-time information. It allows one app to send data to another app when certain events happen.

[^4]: A public API Workflow refers to any API Workflow that has the *Expose as a public API flow* box checked.\
    \
    Article section: [Exposing an API Workflow](broken://pages/ASPrBtBQHndZ5vpaAQpm#exposing-api-workflows-for-external-use)
