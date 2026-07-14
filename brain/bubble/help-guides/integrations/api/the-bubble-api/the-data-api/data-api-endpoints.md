# Data API endpoints
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-endpoints · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to identify the correct endpoint when using the Bubble Data API.

<details>

<summary>Help us improve this article</summary>

This article is part of a significant update to the Bubble manual and your feedback is critical to our efforts to continuously enhance our written documentation.\
\
We would greatly appreciate if you could take a moment to let us know your thoughts on the quality of it. Thank you for your support!\
\
[Give feedback on this article](https://docs.google.com/forms/d/e/1FAIpQLSfe7eaYVxkqTa_nn3QE6VObCxWB1hgh6sHUQGQ0Eit8JlAS7g/viewform?usp=pp_url\&entry.619913899=https://manual.bubble.io/help-guides/apis-connect-to-other-apps/the-bubble-api/the-data-api/data-api-endpoints\&entry.80834677=Data+API+endpoints)

</details>

## Introduction

Remember our [lesson from earlier](/help-guides/integrations/api/introduction-to-apis#resource) when we explored that whenever a client sends an API request, they are attempting to reach a specific resource. The URL, short for Universal Resource Locator, shows the way to this resource.

Bubble automatically generates a URL – known as an endpoint – for each data type you activate in the Data API. By using this URL in an API request, a client will reach the correct data type – the resource.

## Root URL

The URL consists of a root URL that’s unique for every version of every app you create but remains the same for all data types. As soon as you have activated the Data API, Bubble will reveal your app's root URL in the API settings:

<figure><img src="/files/O4EIFzPsGeYf55MQHajP" alt=""><figcaption><p>When you activate the Data API, Bubble reveals the root url of your application.</p></figcaption></figure>

That URL is structured like this:

### No custom domain

<table><thead><tr><th width="197">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development (Main branch)</strong></td><td>https://myapp.bubbleapps.io/version-test/api/1.1/obj</td></tr><tr><td><p><strong>Development</strong></p><p><strong>(custom branch)</strong></p></td><td>https://myapp.bubbleapps.io/<strong>[branch-id]</strong>/api/1.1/obj</td></tr><tr><td><strong>Live</strong></td><td>https://myapp.bubbleapps.io/api/1.1/obj</td></tr></tbody></table>

### Custom domain

If you have connected your app to a custom domain, the URL will look like this:

<table><thead><tr><th width="204">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong><br><strong>(Main branch)</strong></td><td>https://mydomain.com/version-test/api/1.1/obj</td></tr><tr><td><p><strong>Development</strong></p><p><strong>(custom branch)</strong></p></td><td>https://mydomain.com/<strong>[branch-id]</strong>/api/1.1/obj</td></tr><tr><td><strong>Live</strong></td><td>https://mydomain.com/api/1.1/obj</td></tr></tbody></table>

As you can see, the root URL points the client towards your app’s API and obj (object) means we want to interact with objects (data records) in the database.

What’s missing?

## The Data Type URL

The final piece of the puzzle is to let the server know which data type we want to access. For that we need to include the name of the data type. Data type names in the Data API are the same as what you named them in the Bubble database editor, except it needs to be formatted in the following way:

* Remove spaces
* Use lowercase letters

For example, the following data type names would need to be formatted as the following:

<table data-header-hidden><thead><tr><th width="185">Data type name</th><th>Correct Data API formatting</th></tr></thead><tbody><tr><td><strong>Data Type name</strong></td><td><strong>Correct Data API formatting</strong></td></tr><tr><td>Rental Unit</td><td>rentalunit</td></tr><tr><td>Sports Team</td><td>sportsteam</td></tr><tr><td>Cake Recipe</td><td>cakerecipe</td></tr></tbody></table>

{% hint style="warning" %}
Make sure to always use **unique** Data Type names.

\
If two or more Data Types share the same name, the Data API will return the first one it finds, which may lead to unexpected behavior.
{% endhint %}

If we want to access the Rental Unit data type, the full endpoint URL would look like this:

### No custom domain

<table><thead><tr><th width="189">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong><br><strong>(Main branch)</strong></td><td>https://myapp.bubbleapps.io/version-test/api/1.1/obj/<strong>rentalunit</strong></td></tr><tr><td><strong>Development</strong><br><strong>(custom branch)</strong></td><td>https://myapp.bubbleapps.io/<strong>branch-id</strong>/api/1.1/obj/<strong>rentalunit</strong></td></tr><tr><td><strong>Live</strong></td><td>https://myapp.bubbleapps.io/api/1.1/obj/<strong>rentalunit</strong></td></tr></tbody></table>

### Custom domain

<table><thead><tr><th width="197">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong><br><strong>(Main branch)</strong></td><td>https://myapp.bubbleapps.io/version-test/api/1.1/obj/<strong>rentalunit</strong></td></tr><tr><td><strong>Development</strong><br><strong>(custom branch)</strong></td><td>https://myapp.bubbleapps.io/<strong>branch-id</strong>/api/1.1/obj/<strong>rentalunit</strong></td></tr><tr><td><strong>Live</strong></td><td>https://myapp.bubbleapps.io/api/1.1/obj/<strong>rentalunit</strong></td></tr></tbody></table>

## The HTTP Action

To complete an endpoint, we need to know both the URL to the resource we want to access, and the [HTTP method](#user-content-fn-1)[^1] (GET, PUT, POST, DELETE) that determines what we want to do with that data type.

<table data-header-hidden><thead><tr><th width="135"></th><th></th></tr></thead><tbody><tr><td>Action</td><td>Description</td></tr><tr><td>GET</td><td>Retrieve data</td></tr><tr><td>POST</td><td>Create data</td></tr><tr><td>PUT</td><td>Update data</td></tr><tr><td>PATCH</td><td>Replace data</td></tr><tr><td>DELETE</td><td>Delete data</td></tr></tbody></table>

{% hint style="info" %}
The table above shows the most common HTTP methods used in an API call.\
\
To learn more about what an HTTP method is from a more technical perspective, check out our guide on [How RESTful APIs work](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api) and [HTTP methods](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method) specifically.
{% endhint %}

Next we will look at how to set up some common [requests](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests).

[^1]: The HTTP method is the instruction for the server to indicate the desired action to be performed on the identified resource.
