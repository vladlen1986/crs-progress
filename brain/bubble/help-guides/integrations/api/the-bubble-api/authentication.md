# Authentication
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to authenticate clients that initiate a connection to your Bubble application.

{% hint style="info" %}
**Authentication** is the process of identifying **who** a client[^1] is in order to determine what resources[^2] they have access to your your application.
{% endhint %}

## Introduction

Both the [Data API](#user-content-fn-3)[^3] and the [Workflow API](#user-content-fn-4)[^4] can be set up to require the client to authenticate themselves in order for your app to determine what resources they are allowed to access. In simpler words, you can require all external systems that want to access your database and workflows to log in using a secret password.

<figure><img src="/files/oCZlIIkyP1nvgenu3XOl" alt=""><figcaption></figcaption></figure>

The article in the link below explains how the [*bearer token*](#user-content-fn-5)[^5] is used to authenticate a client, regardless of the method you choose (except if you use no authentication).

{% content-ref url="/pages/qVQrCNasyAQigdo9Xbbb" %}
[How to authenticate](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)
{% endcontent-ref %}

## Authentication methods

{% hint style="info" %}
You can set the access level for an **API workflow** using the **Authentication** setting. This determines whether the workflow can be accessible to everyone, to authenticated users and admins, or to admins only.

Article section: [API workflow access level](/help-guides/integrations/api/the-bubble-api/the-workflow-api#access-level)
{% endhint %}

There are three different levels of authentication that you can set up in Bubble, each with their own pros/cons and security ramifications. You can use the settings described [above](#access-level) to maintain precise control over which users or systems are allowed to access each workflow.

The articles below outline the three different authentication methods you can use:

{% content-ref url="/pages/rsXV8xr4MaHaHzTtpDZz" %}
[No authentication](/help-guides/integrations/api/the-bubble-api/authentication/no-authentication)
{% endcontent-ref %}

{% content-ref url="/pages/GDxZ1naAd3kTJnMtSG7K" %}
[As a user](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)
{% endcontent-ref %}

{% content-ref url="/pages/qeuXuXXBXWf8aK3ZAFf1" %}
[As an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)
{% endcontent-ref %}

[^1]: The *client* is the system that initiates an API Connection by sending a request, as opposed to the *server* who is the one to receive it and respond.

[^2]: An API resource is a specific item or service that is made available by the API and can be accessed via a unique endpoint.\
    \
    This can be a data type such as *Users* or a specific API Workflow.\
    \
    Article section: [What are resources?](/help-guides/integrations/api/introduction-to-apis#resource)

[^3]: The Data API can give external applications access to your app's database to read, create, edit and delete records.\
    \
    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
    Reference: [The Data API](/core-resources/api/the-bubble-api/the-data-api)

[^4]: The Workflow API lets you set up API workflows that can be triggered from outside of your own application without visiting any page.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)

[^5]: The bearer token is a string that identifies **who** the client is. It serves as both username and password and is included in the *header* of the API request.\
    \
    Article: [How to authenticate](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)
