# Data API privacy rules
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the Privacy Rules settings for the Data API

## **The Data API and privacy rules**

Access to a specific data type through the Data API is controlled by the [privacy rules](#user-content-fn-1)[^1] applied to that type, except if the client is using a [Bubble API token](#user-content-fn-2)[^2] to authenticate[^3] (in which case the client[^4] will be granted full admin access and privacy rules are disregarded).

{% hint style="warning" %}
If a client is accessing the Data API [as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin) (authenticating with a Bubble API token) all privacy rules will be disregarded. If you want to use privacy rules to control access to the Data API, use [user authentication](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user) instead.
{% endhint %}

<figure><img src="/files/PU801MpGFyrziwCgYvgx" alt=""><figcaption><p>Privacy Rules serve as a secure filter to stop unauthorized access to your app's database.</p></figcaption></figure>

## How privacy rules affect the Data API

The different checkboxes in a given privacy rule affect the Data API in the following way:

### Regular privacy rules

#### View all fields

If this box is checked, the client will be able to retrieve all the fields on all the things of a given data type. If you uncheck this box you can check which fields are returned one-by-one.

#### **Constrainable fields**

This setting controls whether a field can be used as a search constraint. It's particularly important for the Data API, because its searches can't be detected as page-defined. Whether it affects Data API requests depends on the [search privacy mode](/core-resources/application-settings/general#search-privacy-mode) in your app.

In automatic mode, Bubble allows constraints that match a search defined on one of your app's pages. A Data API call never has that page context, so this detection always comes up empty and the request falls back to your privacy rules. In strict mode, every constraint is checked against your privacy rules regardless of where it comes from.

The practical result is the same in both modes: a field used as a constraint in a Data API search has to be allowed by your privacy rules. A field with its constraint permission enabled is allowed; a field you haven't set follows its View all fields permission. If the constraint isn't allowed, it won't be applied to the search.

#### Find this in searches

If this box is checked, the client will be able to retrieve a list of things of a given data type, optionally using search constraints. If it’s left unchecked, the client will be unable to search for the data type.

#### View attached files

If this box is checked, the client will be able to retrieve files saved to a given data type.

#### Allow auto-binding

This setting does not affect clients who access the database via the Data API.

### Data API-specific privacy rules

<figure><img src="/files/Dp4LCtpyWcZdheLwKrap" alt="Data API privacy rules"><figcaption><p>Activating the Data API for a specific Thing activates three new settings in the Privacy Rules of that Thing.</p></figcaption></figure>

Whenever the Data API is enabled for a database Thing, three new options are available in that Thing’s Privacy Rule:

* Create via API
* Modify via API
* Delete via API

All three are unchecked by default to avoid accidentally giving editing access.

If these boxes are left unchecked, an API client matching this Privacy Rule will not be able to create, make changes to or delete any data on that data type through the Data API.

{% hint style="warning" %}
The Data API-specific Privacy Rules *only* apply to clients that access the database via the Data API. They do not affect your application's regular users or your API Workflows.
{% endhint %}

[^1]: Privacy Rules are the server-side settings that you apply to each Data Type in your database to control who has access to read and make changes to that data.

[^2]: A Bubble API token is a specific way to authenticate a client in order to give them full admin access to your database.\
    \
    Article: [Authenticating a client as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)

[^3]: Authentication is the process of identifying **who** a client is in order to proceed with authorization, which is the process of determining what resources the client should have access to.

    Article: [Authentication](/help-guides/integrations/api/the-bubble-api/authentication)

[^4]: The *client* is the one to send an API request, as opposed to the *server* who is the one to receive it and respond.\
    \
    Article section: [The client/server relationship](/help-guides/integrations/api/introduction-to-apis#client-and-server)
