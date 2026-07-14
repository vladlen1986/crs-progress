# The Data API
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Data API allows other systems to search for, read, create, modify and delete data in your application’s database via a RESTful interface.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (3)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles listed at the bottom of this page:

* [List of in-depth articles (3)](#other-ways-to-learn)
  {% endtab %}

{% tab title="Postman Collection" %}
Bubble offers a Postman[^2] collection. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endtab %}
{% endtabs %}

### Enabling the Data API

The Data API is disabled by default. To enable it, go to *Settings - API* and check the box 'This app exposes a Data API'. This allows you to select one-by-one which data types are exposed in the Data API.

### The Data API and privacy rules

Access to data is controlled by the privacy rules applied to that particular data type.

#### View all fields

If this box is checked, the client will be able to retrieve all the fields on all the things of a given data type. If you uncheck this box you can check which fields are returned one-by-one.

#### Find this in searches

If this box is checked, the client will be able to retrieve a list of things of a given data type, optionally using search constraints.

#### View attached files

If this box is checked, the client will be able to retrieve files saved to a given data type.

#### Allow auto-binding

This setting does not affect clients who access the database via the Data API.

### Data API Privacy Rules

Whenever the Data API is enabled for a database thing, three new options are available in that thing’s privacy rule:

* Create via API
* Modify via API
* Delete via API

These settings only apply to clients that access the database via the Data API. All three are disabled by default on existing privacy rules. They do not affect your application’s regular users or your API Workflows.

## Other ways to learn

### User manual articles

The Bubble manual gives extended information about Bubble's features and how to use them.

<details>

<summary>Introduction to APIs</summary>

This article series takes an in-depth look at what exactly an API is and how you can both set up an API in Bubble and connect to external APIs in different ways.

Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)\
Video: [Introduction to APIs](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)\
Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

</details>

<details>

<summary>Authenticating with the Bubble API</summary>

Authentication is the process of identifying **who** the client is in order to determine what they have access to.\
\
Article series: [The Bubble API and authentication](/help-guides/integrations/api/the-bubble-api/authentication)\
\
\
**Authentication types**\
The Bubble API lets clients authenticate in different ways:\
\
Article: [Accessing the Bubble API without authentication](/help-guides/integrations/api/the-bubble-api/authentication/no-authentication)\
Article: [Accessing the Bubble API authenticated as a User](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)\
Article: [Accessing the Bubble API authenticated as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)<br>

**How to set up authentication in the external system**\
The Bubble uses the bearer token method to authenticate clients.

Article: [How to set up authentication in an external app](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)

</details>

<details>

<summary>The Data API</summary>

The Data API lets you set up an API in your Bubble application that accepts **incoming** **requests** to search for, read, create, edit and delete entries in your database.\
\
Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

</details>

### Video lessons

<details>

<summary>Video lessons</summary>

* [Intro to APIs and the API Connector](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)
