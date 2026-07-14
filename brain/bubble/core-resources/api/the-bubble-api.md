# The Bubble API
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Data API allows other systems to search for, read, create, modify and delete data in your application’s database via a RESTful interface.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (4)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles listed at the bottom of this page:

* [List of in-depth articles (4)](#other-ways-to-learn)
  {% endtab %}

{% tab title="Videos (2)" %}

* Bubble Academy: [Intro to APIs and the API Connector](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* Webinar: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)
  {% endtab %}

{% tab title="Postman Collection" %}
Bubble offers a Postman[^2] collection. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endtab %}
{% endtabs %}

## Sections

<details>

<summary><a href="/pages/kU5he9ow8m53J7P1ws74">The Data API:</a> give external apps and systems secure access to your database</summary>

The Data API allows other systems to search for, read, create, modify and delete data in your application’s database via a RESTful interface.

[The Data API](/core-resources/api/the-bubble-api/the-data-api)

</details>

<details>

<summary><a href="/pages/QT2BQ2gOa929o0uTqX6U">The workflow API:</a> allows external applications to execute workflows in your app</summary>

</details>

## Sending data

Frequently, you want to send data/parameters with the calls. They can either be in the URL in a stringified, URL-encoded way, usually for GET, or in the body of the request, usually for POST. When you send data with a request, Bubble validates it and makes sure it has the correct format. Here are four particular cases:\
\
1\) **Geographic addresses:** This data should be sent as a string '33 Nassau Avenue, Brooklyn, NY 11222,' and Bubble will use the Google Map API to encode it as an address with a latitude and longitude. You can also send them as an object.\
\
`{`\
`address: String`\
`lat: Number`\
`lng: Number`\
`}`\
\
where latitude and longitude **or** address is mandatory.\
\
2\) **Dates:** Send a date as a string or timestamp. For example, 'Wed Jan 13 2016,' '01/13/2016,' 'Wed Jan 13 2016 16:45:09 GMT-0500 (EST),' or '1453398788637.'\
\
3\) **Files and Images:** When a parameter is a file or image, you have two ways to define the content in the request. You can submit a string, which should be the URL of the file/image hosted on a storage service, or you can provide the raw data and the API call will upload the content to Bubble's hosting services. In the later case, the value provided should be a JSON object as follows:\
\
`{`\
`filename: String`\
`contents: Base64-encoded binary data`\
`private: Boolean`\
`attach_to: String`\
`}`\
\
where:\
– `filename` is the file name. Optional, but recommended to get the file type.\
– `contents` is the base64-encoded binary data of the file. Required.\
– `private` is a boolean, true/false, that defines whether the file is protected and attached to an object in the database. Optional.\
– `attach_to` is the unique ID of who/which thing owns the file. Required if private is true.\
\
If there is an ambiguity in processing the data sent, Bubble returns a 400 error, 'INVALID\_DATA.'\
\
4\) **Things:** If a parameter is a thing, e.g., an entry in the application database, or a list of things, you can send it using the ID of the thing. When such a request is made, the API will retrieve the thing with that ID and validate the type. It should be the type defined at the parameter level for a workflow, for instance. If a thing isn't found or not of the right type, Bubble returns a 400 error, 'INVALID\_DATA'.

## Bubble API response

Bubble's API generates data in the JSON format. If you use the Workflow API, the *Return data from API* action permits specification of the data returned by the call. You will find a more detailed description of API response in our [Data API request](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests) and [Returning data fro the workflow API request](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows#returning-data-from-the-api-workflow) articles.

### Returning a login token

Using a *Sign up* or *Log the user in* action in your workflow generates a response that includes a user\_id, token, and expires value. These facilitate the authentication of ensuing calls as the user who has just registered or logged in.

### Success and error codes

A 200 code, potentially accompanied by some data, signifies the success of calls, whereas unsuccessful calls produce an error code.

## Rate limiting

Please see our [hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits#bubble-api-requests) article for details on rate-limiting.

## API Versions

A new version is introduced when a non backward compatible change is deployed. The current API version of 1.1 was introduced on January 19, 2017.\
\
– **Version 1.1:** Values are returned as Javascript objects when possible in API responses. In particular, dates are returned as `2016-11-11T19:14:46.517Z` instead of a timestamp, and geographic addresses are returned as a JSON object. Introduced on January 19, 2017.\
\
`location = {`\
`address: "Les Ferreys, 14130, France"`\
`lat: 49.19959`\
`lng: 0.19707`\
`}`\
\
– **Version 1.0:** The first release. Introduced in January 2016.\
\
You can send values for addresses either as an address string or object, which should be similar to the output format. When submitting, only lat/lng or an address is required.

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

<details>

<summary>The Workflow API</summary>

The Data API lets you set up an API in your Bubble application that accepts **incoming** **requests** to trigger workflows.\
\
Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)
