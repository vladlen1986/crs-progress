# API Glossary
> Source: https://manual.bubble.io/help-guides/integrations/api/api-glossary · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers widely used API terminology.

<details>

<summary>Authentication and authorization</summary>

**Authentication** is the process of verifying the identity of a client sending an API request (**who** the client is). For example, the Bubble API can be set up to require a bearer token to prove the identity of the client trying to connect. This process of providing the credentials and the server verifies them is the authentication process.\
\
**Authorization** is the process of determining **what** a client has access to after they have authenticated themselves. It is the mechanism by which an API can determine what a user or system is allowed to do once they have been authenticated. For example, after a client has authenticated themselves with the Bubble API, the API will check your app's Privacy API settings, privacy rules and other details to determine whether they have access to specific [resources](#resource).

**In short:** Authentication is the process of verifying **who** you are, while authorization is the process of verifying **what** you have access to.

**Other ways to learn:**

Article: [Authenticating with the Bubble API](/help-guides/integrations/api/the-bubble-api/authentication)\
Article: [Setting up Authentication in the API Connector](/help-guides/integrations/api/the-api-connector/authentication)\
Article: [The Data API and Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)\
Article: [The Workflow API and Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules)

</details>

<details>

<summary>API</summary>

API stands for *Application Programming Interface* and it is a set of protocols, routines, and tools for allowing different software systems to communicate with each other.

Imagine you're at a restaurant. You, the customer, want to order food, but you don't go into the kitchen yourself. Instead, you give your order to a waiter. The waiter then goes to the kitchen, gets your food, and brings it back to you.

In this scenario, the kitchen is like an external app or system (the server). You, wanting to get some data or service from this system, are the client. The waiter is like the API.

Just as the waiter takes your order to the kitchen and brings back your food, the API takes requests from one app (the client) to another (the server) and returns the needed response.

**Examples:**

1. **Data Retrieval:** Fetching data from a remote database, like getting weather updates from a weather service.
2. **Integration:** Connecting to different services, like integrating a payment gateway (e.g., PayPal or Stripe) into your app.
3. **Automation:** Performing tasks in other systems, like posting a social media post to LinkedIn or creating an appointment in Google Calendar.
4. **Enrichment:** Enhancing functionalities, like using a map API to display locations in your app.
5. **Authentication:** Verifying user identity and granting access using an authentication system like OAuth to log into your app through Google or Facebook credentials.

**Other ways to learn:**\
Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)\
Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

</details>

<details>

<summary>Client/Server</summary>

In the context of an API call, the **Client** is the one that initiates the call and the **server** is the one to respond.\
\
In the case of an **incoming** API request (The Data API or Workflow API) the system sending the request is the **client** and the Bubble server that hosts your app is the **server.**\
\
In the case of **outgoing** API request (The API Connector) your Bubble app is the **client** and the system you are connecting with is the **server**.\
\
**Other ways to learn:**\
Article: [The Client/Server relationship](/help-guides/integrations/api/introduction-to-apis#client-server-and-resource)

</details>

<details>

<summary>Endpoint</summary>

An endpoint is a specific URL that an application can send requests to, to retrieve or manipulate data.\
\
In the Bubble API, the endpoint is the URL that identifies a **data type** or a specific **API Workflow.** In outgoing requests made via the API Connector, the endpoint is the HTTP action and URL that you are pointing the call towards.\
\
**Other ways to learn:**

Article: [Data API endpoints](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-endpoints)\
Article: [Workflow API endpoints](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-endpoints)

</details>

<details>

<summary>HTTP Method / HTTP Verb</summary>

The HTTP method is the instruction for the server to indicate the desired action to be performed on the specified [resource](#resource) (e.g. GET, POST, PUT, DELETE).

* **GET:** Retrieves data from a server\
  (like viewing a webpage or getting a weather update).
* **POST:** Sends data to a server to create a new resource\
  (like adding a new calendar appointment to Google Calendar).
* **PUT:** Updates an existing resource with new data\
  (like changing the date of a calendar appointment in Google Calendar).
* **DELETE:** Removes a resource from the server.\
  (like deleting an appointment in Google Calendar)

**Other ways to learn:**

Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)\
Article section: [What is the HTTP method?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)\
Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

</details>

<details>

<summary>HTTP protocol</summary>

The HTTP protocol is the blueprint for how most data is exchanged between a client and a server. It defines how a request and response is formatted, so both systems understand each other.

**Other ways to learn:**

Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)\
Article section: [What is the HTTP method?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)\
Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

</details>

<details>

<summary>JSON</summary>

JSON is a lightweight data interchange format typically used in Javascript. It uses human-readable text to transmit data objects that consist of attribute–value pairs and array data types.\
\
It is commonly used both in incoming API Connections (the Data API and Workflow API) and outgoing API Connections (The API Connector).

#### **Example**

Below is an example of what JSON code may look like. In this example we're storing data about a user, and as you can see, it's easily readable both by humans and computers:

`{`

`"user": {`

`"id": "123456",`\
`"username": "johnDoe123",`\
`"email": "johndoe@email.com",`\
`"firstName": "John",`\
`"lastName": "Doe",`\
`"birthdate": "1990-01-01",`\
`"profilePictureUrl": "https://example.com/profiles/johnDoe123.jpg",`\
`"phone": "555-1234",`\
`"joinedDate": "2022-04-20"`

`}`

`}`\
\
**Further reading:**\
API glossary: [Object / JSON object](#object-json-object)\
Article section: [What is the JSON format?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-json-format)

</details>

<details>

<summary>Key-value pair</summary>

A key-value pair is a basic data structure where a 'key' (a unique identifier) is linked to a 'value' (the data). It's used in many programming languages, and in Bubble you can often come across it when you work with the [API Connector](#user-content-fn-1)[^1].

For example, in the [JSON](#json) code below, the text marked in bold are two key-value pairs:

* Key: "id" - value: "123456"
* Key: "username" - value: "johnDoe123"

`{`

`"user": {`

**`"id": "123456",`**\
\&#xNAN;**`"username": "johnDoe123",`**

`}`

`}`

</details>

<details>

<summary>Oauth2</summary>

OAuth2 is a protocol used by a server to determine a client's authorization. It lets a User grant an app (like your Bubble app) access to the resources stored in an external app without having to share their login credentials with the first app.\
\
Instead, the server that hosts the external app will issue a token that your app can use to access the User's resources. That way, subsequent requests can be made without the User having to authorize each one or share their credentials.\
\
**Examples:**

* A User wants to connect their social media account (such as Facebook or Twitter) to your Bubble-built social media management app in order to share posts automatically. The User grants your app access to their social media account using OAuth2, and your app is issued a token that it can use to post photos on behalf of the User.
* A User wants to be able to automatically add appoints to Google Calendar when a meeting is booked in your Bubble-built CRM. The User grants your app access to their Google account your app is issued a token that lets your app make changes to the User's calendar as needed.
* An enterprise clients wants to allow your app to access resources from their server without giving them actual login credentials. They use OAuth2 to issue a token to your app that you can use for subsequent calls.

</details>

<details>

<summary>Object / JSON Object</summary>

A JSON object is a way to structure data in a way that both computers and humans can easily understand. An object can consist of multiple **keys**, and each key has a **value**. This is often called a key-value pair.

In Bubble, consider the *User* data type as an example. When you examine a User in Bubble, you'll notice it consists of various built-in and custom fields like email, name, and phone number. These fields act as keys in a key-value pair, and the specific information for each user (their actual email address, name, and phone number) represents the values.

In JSON, a user object may look something like this:

`{`\
`"user": {`\
`"first_name": "Ana",`\
`"last_name": "Silva",`\
`"email": "ana.silva@example.com"`\
`}`\
`}`

As you can see, this is perfectly readable for a human, but the consistent structure also means computers can easily read it. The similarity to Bubble is not a coincidence – in fact, Bubble downloads data to the page in a JSON structure. This is why Bubble communicates with other apps and systems so easily – because JSON is a widely used format.

</details>

<details>

<summary>Payload</summary>

The payload refers to the data sent with the request. Depending on the [HTTP method](#http-method) used, the payload can be part of the request body (as in a POST, PUT, or PATCH request) or within the URL itself (as in a GET request with query parameters).

For most API interactions that involve the transmission of data (like creating a new user or updating a record), the payload carries the necessary information.

#### **Example:**

Imagine you're creating a new user in a system using an API. The API documentation specifies that the endpoint expects data like a username, email, and password. The payload for this API call might look something like this:

`{`

`"username": "johnDoe123",`\
`"email": "johndoe@email.com",`\
`"password": "securePassword123"`

`}`

In this example, the [JSON](#json) structure containing the username, email, and password is the payload. When making a POST request to the API endpoint, this payload would be included in the body of the request. The API server processes this payload and performs the necessary actions, such as creating the user in the database.

</details>

<details>

<summary>Resource</summary>

A resource is a specific data object or service that is made available by an API and can be accessed via a unique endpoint using methods such as GET, POST, PUT, and DELETE.\
\
For example, if you are trying to access data about a specific User in your Bubble app from an external application, the *User* endpoint can be considered a resource. The same can be said about a specific API Workflow.\
\
In other words, a resource represents a specific piece of information or functionality that an API can provide.\
\
**Other ways to learn:**\
Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

</details>

<details>

<summary>Request/Response</summary>

In an API call, the **request** is the data sent from the client to initiate the connection. It contains all the data needed to authenticate and instruct the server what the request is about.\
\
The **response** is the data sent back from the server to the client in response to the request.\
\
**Further reading:**

Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

</details>

<details>

<summary>RESTful</summary>

APIs that are RESTful mean that they are built on a set of architectural principles for building web services known as *Representational State Transfer (REST)*. Most commercial and public API services adhere to these principles.\
\
In short, this is a way to ensure that APIs that communicate with each other are compatible, or "speak the same language" if you will. Bubble's API and the API Connector is built around RESTful principles, which means it can connect to almost any web API.\
\
**Other ways to learn:**

Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

</details>

<details>

<summary>Token</summary>

A token is a string that identifies the client sending an API request.\
\
In the case of **incoming** requests (The Data API or Workflow API) the token is issued by Bubble.\
\
In the case of **outgoing** requests (The API Connector) the token is issued by the server you are connecting to.

#### How are tokens different from username/password?

A token is a unique, randomly generated string that confirms a user's session or authorization, usually given *after* the first login. It lets users access services without constantly inputting their username/password, enhancing security.

Think of it like this: If a user logs into your app using Facebook, they don't hand over their Facebook login details to your app. Instead, Facebook verifies their login and hands your app a token as proof. A key advantage is that tokens can be swiftly revoked, making them more secure and flexible compared to the traditional username/password method, which can be tedious to alter.\
\
**Other ways to learn:**\
Article sectio&#x6E;**:** [What is a bearer token?](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication#the-bearer-token)<br>

</details>

[^1]: The *API Connector* is a plugin that allows you to set up outbound API calls to external apps and services from your app.

    Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
