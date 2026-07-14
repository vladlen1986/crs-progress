# As an admin
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to authenticate API clients making incoming requests with full administrative access using a Bubble API token.

## What is token authentication?

**Token authentication** means that the client[^1] making a request is authenticating using a token that has been generated under Settings - API using the *Generate a new API token* button.

This gives the client unrestricted access to the database.

{% hint style="warning" %}
Token authentication gives the client the broadest possible access to your database and API workflows. It should be used with caution.
{% endhint %}

{% hint style="info" %}
You can set the access level for an **API workflow** using the **Authentication** setting. This determines whether the workflow can be accessible to everyone, to authenticated users and admins, or to admins only.

Article section: [API workflow access level](/help-guides/integrations/api/the-bubble-api/the-workflow-api#access-level)
{% endhint %}

## How to set up admin authentication

To set up admin authentication, navigate to *Settings - API* and scroll down to the button that says *Generate a new API token:*

<figure><img src="/files/ROFyXjm70ICIyEPlzf7r" alt=""><figcaption></figcaption></figure>

When you click the button, Bubble will generate a unique, cryptographically secure 32-character string that serves as the token for any API requests that you want to make. You can create multiple tokens if you have more than one external system connecting to your application. We recommend creating one token per system so that you can revoke them one-by-one if needed.

The token is the same in all versions of your app, but any changes made to it (including creating and deleting a token) needs to be deployed in order to update.

## What privileges does admin authentication give?

In principle, it gives the same privileges as an admin would get in the Bubble editor, which means there are no limitations to what you can search for, view, create, edit and delete in the database, and you can run all API workflows.

There are a few exceptions:

* In the Data API, only data types that you have [exposed in the Data API settings](#user-content-fn-2)[^2] will be accessible
* In the Workflow API, only Workflows that have the [*Expose as a public API workflow*](#user-content-fn-3)[^3] box checked will be accessible

## Labelling admin authentication

Each token you create can have its own label to be easily identifiable. We recommend giving each one a label that clearly indicates what the token is used for. The label does not affect the functioning of the token in any way and is not visible to the client or in your application's client-side code.

<figure><img src="/files/NSUsJoRwK0zGzPyPT26d" alt=""><figcaption></figcaption></figure>

## Revoking an admin authentication token

To revoke a token, scroll to the relevant token and click the delete icon in the upper right corner.

* There is no warning message – the token is deleted by a single click
* You cannot undo this action
* The change does not apply to your Live version until you deploy

<figure><img src="/files/Gt9XQH7dcydLwdLx1Ggr" alt=""><figcaption></figcaption></figure>

## How long is the token valid?

An admin token is valid until it is [revoked](#revoking-an-admin-authentication-token).

[^1]: The *client* is the one that is making a request in an API call, as opposed to the *server* who is the one to respond.\
    \
    In the case of the Bubble API, the external system is the *client* and your Bubble app is the *server*.\
    \
    Article section: [The Client/Server relationship](/help-guides/integrations/api/introduction-to-apis#client-and-server)

[^2]: The Data API lets you select which Data Types to expose. You can change these settings in the Bubble editor under *Settings - API.*\
    \
    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^3]: You can choose to expose an API Workflow to be triggered from external applications and systems by checking the *Expose as a public API workflow* box on each specific API Workflow.\
    \
    Article: [Creating API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)\
    Article section: Exposing API Workflows
