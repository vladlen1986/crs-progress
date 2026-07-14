# The API Connector
> Source: https://manual.bubble.io/core-resources/api/the-api-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The API Connector allows you to set up connections to external APIs from your Bubble application.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### The API Connector

* Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
  * Article: [Authentication](/help-guides/integrations/api/the-api-connector/authentication)
  * Article: [API Connector security](/help-guides/security/api-security/api-connector-security)

***

#### Cases

* Article: Case: [Connecting to OpenAI/ChatGPT](/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt)
* Article: Case: [Connecting with Google Translate](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate)

***

#### APIs

* Article series: [APIs](/help-guides/integrations/api)\
  This article series covers how APIs work in general, and the different steps that take place when two computer systems communicate.
  {% endtab %}

{% tab title="Videos (2)" %}

* [Intro to APIs & the API Connector | Bubble Crash-Course](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* [Bubble Webinar 2 - The API Connector](https://www.youtube.com/watch?v=DXsL4FjAhd8\&t=2s)
  {% endtab %}
  {% endtabs %}

{% hint style="info" %}
This is the short-form technical reference to the API Connector. For a more in-depth look at the API Connector and authentication methods, see the article series below:

Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
{% endhint %}

The API Connector is a built-in feature that lets your Bubble app connect to external APIs. It's used to fetch data from outside services, trigger actions on external platforms, or both.

Each external service is configured as a collection, which holds the authentication settings and individual calls for that provider.

***

## API Collections

The *API Collections* panel on the left side of the API Connector lists all the collections in your app. Each collection groups together the authentication settings and calls for a single provider.

### + New

Adds a new API collection.

### Search

Searches across collections and calls by name.

### Settings

Opens the API Connector settings, where you can configure global options.

***

## Collection settings

Each collection has its own configuration, applied to all calls within it.

### Collection name

The name of the collection. Used throughout the editor to organize calls. Typically matches the name of the provider.

{% hint style="warning" %}
The collection name is included in your app's client-side source code. Don't include sensitive information in the name.
{% endhint %}

### Authentication

The authentication method used by the provider. Configured once per collection and applied to all calls within it. For details on authentication options, see [Authentication](/core-resources/api/the-api-connector/authentication).

### Shared headers for all calls

Headers added in this section are included with every call in the collection.

#### Add a shared header

Adds a new shared header. Each header consists of a key and a value.

### Shared parameters for all calls

Parameters added in this section are included with every call in the collection. Shared parameters are static and kept on the server.

#### Add a shared parameter

Adds a new shared parameter. Each parameter consists of a key and a value.

### Add notes

Adds internal notes to the collection. Notes are visible only in the editor.

***

## Continue reading

{% content-ref url="/pages/4XcyN8Pjg6ffrmAODDmU" %}
[Authentication](/core-resources/api/the-api-connector/authentication)
{% endcontent-ref %}

{% content-ref url="/pages/1ZpPwnqjTBIkN8XGyF4n" %}
[Adding calls](/core-resources/api/the-api-connector/adding-calls)
{% endcontent-ref %}

## Things to note

{% hint style="info" %}
The API Connector currently does not support non-utf8 encodings.

All API calls return bytes of data, which must be interpreted by clients like Bubble servers or your internet browser. The oldest, and most popular encoding standard, is called ASCII, for easily translating these bytes into text characters. As a part of this standard, the most widespread encoding format for special characters is 'UTF-8'.

Because 'UTF-8' is so widely adopted, Bubble does not support any other text encodings.
{% endhint %}

{% hint style="warning" %}
**Note:** When using the API Connector or App Connector, parameters currently cannot be a 'raw' list of Bubble Things, e.g. a dynamic statement that results in a List of Things.

This is because a raw list of Bubble Things is not rendered in the kind of text formatting that API endpoints expect. One workaround for this is to use the ":join with" operator on the list of Bubble Things to turn it into a format accepted by the API endpoint (this is likely a format like \["first thing", "second thing"]).
{% endhint %}

## Other ways to learn

<details>

<summary>User manual articles</summary>

* Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
  * Article: [Authentication](/help-guides/integrations/api/the-api-connector/authentication)
  * Article: [API Connector security](/help-guides/security/api-security/api-connector-security)
* Article: Case: [Connecting with Google Translate](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate)

</details>

<details>

<summary>Video lessons</summary>

* [Intro to APIs & the API Connector](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* [How to Setup Google API Keys](https://www.youtube.com/watch?v=ouGT55o68ho)
* Webinar: [The API Connector](https://www.youtube.com/watch?v=DXsL4FjAhd8\&t=2s)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
