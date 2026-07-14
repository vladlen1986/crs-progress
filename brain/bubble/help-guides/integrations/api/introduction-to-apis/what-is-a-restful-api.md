# What is a RESTful API?
> Source: https://manual.bubble.io/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers what it means that an API is RESTful and how a RESTful API call is structured

<details>

<summary>Help us improve this article</summary>

This article is part of a significant update to the Bubble manual and your feedback is critical to our efforts to continuously enhance our written documentation.\
\
We would greatly appreciate if you could take a moment to let us know your thoughts on the quality of it. Thank you for your support!\
\
[Give feedback on this article](https://docs.google.com/forms/d/e/1FAIpQLSfe7eaYVxkqTa_nn3QE6VObCxWB1hgh6sHUQGQ0Eit8JlAS7g/viewform?usp=pp_url\&entry.619913899=https://manual.bubble.io/help-guides/apis-connect-to-other-apps/introduction-to-apis/what-is-a-restful-api\&entry.80834677=What+is+a+RESTful+API?)

</details>

{% hint style="info" %}
This section covers a fairly technical topic on how the RESTful API architecture works. You may find it useful to learn more about the underlying mechanics, but if you want to skip directly to how API calls work in Bubble, follow the links below:\
\
Accepting incoming API Connections with the [Data API](/help-guides/integrations/api/the-bubble-api/the-data-api) and [Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
Setting up outgoing API requests with the [API Connector](/help-guides/integrations/api/the-api-connector) and [plugins](/help-guides/integrations/api/plugins-that-connect-to-apis).\
\
While reading about APIs you may also find our [API Glossary](/help-guides/integrations/api/api-glossary) useful.
{% endhint %}

RESTful APIs use the HTTP protocol to initiate a connection with a server and get a response.

<details>

<summary>What is the HTTP protocol?</summary>

Most internet users are familiar with the HTTP protocol. You see it as part of the URL of every website you visit.

But what is it exactly?

HTTP, or Hypertext Transfer Protocol, is a protocol: a set of rules that governs how data is shared between two systems to make sure both parties understand it. It would be difficult for two systems to communicate if they had no idea how to format the data: the HTTP protocol makes sure that they do.

Whenever you open up a website, your browser is actually making an API call to the web server that hosts the page, and the server responds by sending back the needed files (such as HTML and CSS).

Here's how the HTTP protocol works and the call is made:

1. A client (such as your web browser) sends a request to a server. The request contains information about what kind of action the client wants to take (such as requesting a webpage or sending data to be stored in a database) and it may also contain relevant information (such as the actual data you want to store).
2. The server receives the request and checks what kind of action the client wants to take and proceeds to process it. This might involve sending back a html file, looking for something in a database or running a workflow.
3. The server sends a response back to the client. The response usually includes a status code that indicates whether the request was successful or not, and it may also include additional data (such as the webpage the client requested).

So HTTP ensures that a client and a server are able to communicate with each other in a standardized way. While the protocol in itself is pretty simple, it makes up the foundation of the entire web.

</details>

## What is a RESTful API?

REST, or Representational State Transfer, is not actually a protocol, but more of a set of guidelines that define how a client and server should interact with each other. In other words, a developer can technically build an API to follow any kind of structure they want, but REST is a widely adopted style of architecting APIs that’s flexible, scalable and easy to understand.

This makes it easy for different systems to talk to each other as their developers prepare it to follow the same method of communicating. The RESTful style follows a few key principles:

* The client-servers are completely independent of each other and only communicate using the REST API.
* It’s stateless: this means that the server does not store any information about the client between requests. As such, each request is completely isolated and contains all the information needed for the request to be processed.
* It’s often cacheable, meaning that the client uses a cached response if the user requests the same data multiple times. This speeds up the client application and lightens the load on the server. Bubble automatically caches data instead of repeating a request, unless it needs to.
* RESTful API’s are often described as layered since the client doesn’t necessarily have direct access to the server, but can be separated by intermediaries such as a proxy to ensure the stability and security of the server

This may all sound very technical, but don’t worry: most of this is automatically taken care of and simply works.

Bubble automatically generates an interface in your app that adheres to the RESTful principles, making sure that both incoming and outgoing connections are compatible with thousands of external systems.

## What a RESTful API call looks like

As we’ve seen, an API request based on REST principles allows two software systems to communicate with each other in a way that both systems understand. Each request/response is made in complete isolation from each other, and the server receives all the information it needs to process the request in that request.

But what does the call actually look like? What kind of information is being transmitted?

A good thing about the RESTful architecture is that the data being transmitted in both directions is designed to be readable both by computers and humans. Each call consists of recognizable parts that each serve a specific purpose. The call is made using the HTTP protocol.

### The URL

You have probably heard the abbreviation URL, but you may not have thought much about what it means. In the context of APIs the abbreviation makes sense: **Universal Resource Locator**. In the earlier section, we talked about how a resource is a specific piece of data or functionality that can be accessed through the API. It follows that the URL is the way to find that resource. In other words, the URL points the client’s request towards the right resource on the server.

In Bubble’s Data API, endpoint URLs are automatically generated for each Data Type and API workflow you choose to expose.<br>

`https://myapp.bubbleapps.io/version-test/api/1.1/obj/datatypename`\
\
`https://myapp.bubbleapps.io/version-test/api/1.1/wf/workflowname`

This is the first part of a RESTful API request. This too makes sense: in order for the server to authenticate a client and check the client’s authorization to reach a specific resource, we need to know which resource they are trying to access.

### HTTP method

Now that we know which resource the client wants to access, we need to know what kind of action they want to perform. Remember that we discussed HTTP being a protocol: that means we have a set list of possible actions that we can ask of a server that is prepared to receive HTTP requests. The list of possible HTTP methods is longer than this, but the most common actions you’ll see are:

<table><thead><tr><th width="139">Action</th><th>Description</th></tr></thead><tbody><tr><td>GET</td><td>Retrieve data</td></tr><tr><td>POST</td><td>Create data</td></tr><tr><td>PUT</td><td>Replace data (empty values <a data-footnote-ref href="#user-content-fn-1">overwrite existing field</a>s)</td></tr><tr><td>PATCH</td><td>Partially update data (empty values <a data-footnote-ref href="#user-content-fn-2">do not overwrite existing fields</a>)</td></tr><tr><td>DELETE</td><td>Delete data</td></tr></tbody></table>

\
When your browser contacts a server such as [www.bubble.io](http://www.bubble.io) in order to load the webpage, it’s sending a GET request to the root URL of the domain. The bubble.io server has been set up to respond to such a request by responding with the necessary data to render the page in the browser, such as a HTML and CSS file.

In GET requests, the URL can sometimes contain parameters, such as the constraints for a search whereas in POST/PUT/PATCH/DELETE requests parameters are usually contained within the [body](#the-body).

<figure><img src="/files/rHDivLqz1Q9zB0eGg8bU" alt=""><figcaption><p>The GET HTTP Method is used to retrieve some data. Here illustrated as the HTTP method would be specified in Bubble's API Connector.</p></figcaption></figure>

As you may have guessed by now, the same thing happens with the other actions: your browser sends POST, PUT and DELETE actions to the Bubble server to tell it to create, modify and delete things in your database.

Now it’s starting to make sense why HTTP requests make up the foundation of the web: since every web browser and server speaks the language of HTTP actions to view, create, edit and delete data.

### The header

Every API request and response contains a header. This is where you’ll find what’s called *metadata* or information about the data being exchanged between the API and its clients. A lot of different data points can be included in the header, but the most common ones you’ll come across working with Bubble are content–type and authorization[^3].

The Content-type is used to specify the media type of the data being transmitted so that it can be properly interpreted and processed.

> For example, if a client is sending data to a server in the form of a [JSON object](#user-content-fn-4)[^4], it might include a Content-Type header with a value of ‘application/json’ to indicate that the data is in JSON format.

In our earlier example of fetching the bubble.io web page, the Content-type would have a value of ‘text/html’ to indicate that the client is expecting an HTML document in response to the request.

The authorization contains the information needed to authenticate the client sending the request. In the case of Bubble’s API, Bubble accepts what’s called a Bearer token. In an HTTP header, that line would look like this:<br>

`Authorization: Bearer <access-token>`<br>

Bearer simply means that the client is a bearer of the given token. The token is a kind of password that the client has to authenticate themselves, often referred to as an API key. An API call doesn’t have to include authorization: it’s only needed when the API is not public.

### The body

The body can contain additional data, such as the data being sent in a POST, PATCH or PUT request (GET requests also sometimes contain parameters in the body). After all, if you want to create or modify something in the database, you need to include the information that you want to store, such as a user’s email and name. The body is better suited than the URL to hold complex or larger volumes of data.

Here's an example of what the body of a POST call might look like. In this example we're creating a rentalunit with three parameters: a name, a number and an isRented boolean[^5]:

```json
{
  "unitname": "Unit A",
  "unitnumber": 3,
  "isRented": true
}
```

The information you see in this example is formatted in the JSON format.

<details>

<summary>What is the JSON format?</summary>

Bubble is built around the JSON format. This is a text-based format that is both easy for humans to read and write, and easy for machines to parse and generate. For example, let’s say we want to create a new user, we could include the following JSON-formatted text in the body:

```json
{
  "name": "John Doe",
  "age": 30,
  "isAdmin": true,
}

```

As you can see, JSON is easy to understand, but even so, Bubble will mostly generate it for you. But working with APIs you may find it useful to look at the body of the request and response to learn more about what is being transmitted.

</details>

<details>

<summary>What other formats can be used in the body?</summary>

The format of the body is not always in JSON. Remember that in our header we can specify what the format of the body should be, so it follows that it can be other formats as well. What kind of format a server expects depends on how the server is set up.

In the list below are some common formats. The most widely used format is JSON and you usually don’t need to specify any other format unless the external API documentation specifically instructs you to:\
\
**Form data:** is often used when submitting HTML forms. Form data is usually sent as key-value pairs, with the keys being the names of the form fields and the values being the data entered into the fields.

**XML (Extensible Markup Language)** is a markup language that is often used to transmit structured data.

**Multipart form data** is a format that is used to send large amounts of binary data, such as file uploads.

**Plain text:** The body of an HTTP request can also be plain text, which is useful for transmitting simple data or messages.

</details>

## The full request

Let’s imagine we’re building a system for keeping track of rental units, and we need to send an API call to the app to create a new rental unit. Putting together all the parts we’ve gone over the request may look something like this:

```
POST https://appname.bubbleapps.io/api/1.1/obj/rentalunit

Content-Type: application/json
Authorization: Bearer <access-token>

{
  "unitname": "Unit A",
  "unitnumber": 3,
  "isRented": true
}
```

In this example, the URL contains the resource we want to access (rentalunit), the HTTP method is POST, the headers include Content-Type and Authorization, and the body contains the data being sent to create a new rentalunit.

In the next sections we'll cover how you can set up incoming and outgoing requests with Bubble's different API tools.

{% content-ref url="/pages/qUKrZ46apgYpRMnPhwEQ" %}
[The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endcontent-ref %}

{% content-ref url="/pages/aHrCznvRmKoyVK3zfnIc" %}
[The API Connector](/help-guides/integrations/api/the-api-connector)
{% endcontent-ref %}

<br>

[^1]: If new data for specific fields is not included, those fields are overwritten with empty values, replacing the entire resource.

[^2]: Unlike PUT, which replaces the entire resource, PATCH only changes the fields that are provided in the request, leaving other fields untouched.

[^3]: *Authorization* is the process of determining **what** a client has access to when connecting to a server.\
    \
    Before authorization is done, the client must *authenticate* to prove **who** they are in order to determine what they should be given access to. This is what the *token* is for.

[^4]: JSON (JavaScript Object Notation) is a simple way to store and share information in a way that both computers and humans can understand. Think of it like a code version of a Bubble database Thing where you have a field (key) such as *first name* and its value (value) such as *John Doe.*\
    \
    Jump to section: [What is JSON?](#what-is-the-json-format)

[^5]: A boolean is a data type that can have two values: true or false.\
    \
    In Bubble, this is known as a yes/no field.
