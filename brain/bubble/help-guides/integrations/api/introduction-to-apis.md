# Introduction to APIs
> Source: https://manual.bubble.io/help-guides/integrations/api/introduction-to-apis · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In this section we will go over what an API is and how you can use it in your Bubble application.

{% hint style="info" %}
This chapter covers how RESTful APIs work in general. If you want to skip to the section where we cover Bubble’s API features, you can click the link below:

Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)\
\
Throughout the API section you may also find our [API Glossary](/help-guides/integrations/api/api-glossary) useful.
{% endhint %}

There are many different kinds of API calls but they mostly follow the same kind of pattern. The most simple definition of an API call can be summed up in two steps:

* The **client** will send a request to another system
* The **server** sends a response back.

## Introduction to APIs

{% embed url="<https://www.youtube.com/watch?t=745s&v=nO8PSqeJaWk>" %}
Our in-depth API course gives an introduction to what APIs are and how to use the [API Connector](/help-guides/integrations/api/the-api-connector)
{% endembed %}

When you want to connect your Bubble app to another application or data source, you use an API.

An API is a set of principles that allows two applications to speak a common language, allowing them to establish a connection securely and exchange information and trigger workflows. The technology has been around for several decades. going as far back as the 1960s and 1970s, when computer programs were first being developed for commercial use. While the technology and security has evolved since then, many of the basic principles still apply.

Bubble is set up to take care of a lot of the technical stuff for you. This lets you set up both incoming and outgoing connections securely and efficiently. Still, it can be useful to know what's going on under the hood to understand what the different settings and values in an API call mean.

## Example of API call in action:

> *Imagine you have built a travel planning software in Bubble that displays the weather forecast for a specific location at some time in the near future. In order to get the weather data, your app (the client) must send a request to the server of a weather service (the server). The server processes the request, retrieves the weather data, and sends it back to the app in a format that your app can understand. You take this data and display it in a user-friendly way. The whole process is usually finished in a few hundred milliseconds.*

APIs allow you to request specific information or execute commands within very specific constraints in the external application, but they don't provide access to how the application actually works. For example, contacting a weather service doesn’t give you any say over how the weather data is stored and processed – it only gives you a short piece of text data in response to your exact request. In other words, APIs provide a line of communication without revealing the inner workings of the external application.

<figure><img src="/files/nvevCFoq2Lg3iFR03iEX" alt=""><figcaption><p>Showing up-to-date weather predictions is one use case where your app would be likely to depend on an external API service to get accurate data.</p></figcaption></figure>

In a way, it’s like ordering food at a restaurant: the menu presents you with a static set of options and whatever you pick it will be prepared to you out of sight. You don’t have access to the kitchen and the chef gets to keep their secret recipe secret.

## Incoming and outgoing connections

Since two systems can communicate with each other, it follows that connections can go in both directions. This means that your Bubble app can connect to a third party, and that a third party can connect to your Bubble app.

We sort these two types of connection into two categories:

### Incoming connections

Incoming connections means that another system can initiate a connection and have your Bubble application:

* Send data back
* Make changes to your database (create, modify or delete one or more records)
* Run a specific [API Workflow](#user-content-fn-1)[^1]

Being able to share data and commands across apps opens up a world of possibilities where you can use different technologies and services together in creative ways.

> In many ways, the API standard is powering a big part of the web as we know it today.

When you activate the [Data API](#user-content-fn-2)[^2] or [Workflow API](#user-content-fn-3)[^3], Bubble automatically sets up your app to be ready to accept incoming connections, making it quick and easy to expose your application’s data to other systems in a secure and controlled way.

<details>

<summary>Setting up incoming connections to a Bubble app</summary>

To send data requests to a Bubble application, you activate and use the **Bubble API**. You can read our in-depth article on the Bubble API [here](/help-guides/integrations/api/the-bubble-api).

</details>

### Outgoing connections

Outgoing connections means that your application initiates a connection with another system to:

* Retrieve data from that system.
* Send data to that system.
* Access functionality or features provided by that system.

Using outgoing connections you can do things like:

* Fetch data like weather reports, stock prices, animated GIFs and social media profiles.
* Send data like adding a calendar event to Google Calendar, creating an invoice in Freshbooks or adding a new contact to HubSpot CRM.
* Signing the user in using an existing account in another system (such as Google, Facebook and LinkedIn).
* Start a workflow like sending an email with SendGrid, making a payment with Stripe or Paypal and sending an SMS with Twilio.

<details>

<summary>Making outgoing API requests from a Bubble app</summary>

There are two ways to make outgoing API requests from a Bubble application. You can use the [API Connector](/help-guides/integrations/api/the-api-connector) or you can browse for a [plugin](/help-guides/integrations/api/plugins-that-connect-to-apis) in our [plugin store](https://bubble.io/plugins#!).

</details>

## Client, server and resource

### Client and server

Whenever an API connection is established there are two parties involved: the client and the server. The client is the one that **sends the request**, and the server is the system that **responds**.

* If you are connecting to a third party using the [API Connecto](#user-content-fn-4)[^4]r or a plugin, your app is the **client**
* If another system is connecting to the [Bubble API](#user-content-fn-5)[^5] in your app, your app is the **server**

<div align="center"><figure><img src="/files/m9pzlLaIGxhIXJmUieMR" alt=""><figcaption><p>API calls consist of a request sent by the <em>client</em>, and a response sent back by the <em>server</em></p></figcaption></figure></div>

### Resource

A resource is a specific piece of data or functionality that can be accessed through the API. Many APIs expose multiple resources, which means that the client has to specify what resource they want to access. For example, a third-party system might connect to your Bubble application to fetch a list of users, create a new database record or start a workflow: each of these would be considered a resource that this client can access.

If your app is connecting to an external system like a CRM to create a contact, fetch a list of calendar events or send a customer email, each of those operations would also be a separate resource.

Resources are typically accessed through a specific URL that points to that resource. Bubble offers two kinds of resources, and URLs are generated automatically whenever a resource is set to be exposed in your app’s API:

* **Data types** in your database can be exposed to allow other systems to read, create, modify and delete records. Each of your exposed data types and each action (create, edit and delete) connected to that data type is a resource that can be accessed from the outside. This is done with the [Data API](#user-content-fn-6)[^6].
* **Workflows** can be exposed to allow other systems to trigger them. Each workflow that you set up and expose is a resource. This is done with the [Workflow API](#user-content-fn-7)[^7].

## Authentication and authorization

When we discuss APIs, we need to make a clear distinction between two similar-sounding words:

**Authentication** is the process of verifying the identity of the client that is trying to access the server. You can compare this to a passenger wanting to board an airplane. At some point the passenger will reach a security checkpoint where they have to present valid credentials to confirm their identity, usually in the form of a passport. In other words, authentication is about asking **who the client is.**

<figure><img src="/files/oCZlIIkyP1nvgenu3XOl" alt=""><figcaption><p>Authentication identifies <strong>who</strong> the client is and authorization determines <strong>what</strong> they should have access to.</p></figcaption></figure>

**Authorization** happens after authentication, and is the process of determining whether a client has the necessary permissions to perform a particular action or access a particular resource on the server. Returning to our airport example, after we know who the passenger is, we can determine whether they have access to board the plane and the VIP lounge. In other words, authorization is about asking **what the client is allowed to do**.

Whenever a third-party system attempts to connect to your app, you can use these two security processes to have complete and secure control over who can connect and what they can access. Whenever the connection goes the other way, your app may be asked to go through the same steps.

## Webhooks

Sometimes two applications need to exchange some sort of info in real-time – that is, when a specific event occurs in one app, another app should be notified of the event.

This kind of call is often called a *webhook*. Even if the term webhook is used, it's not technically different than any other API call, except that it's created with the specific purpose of being made when a specific event occurs.

### Webhook examples

* A payment gateway such as Stripe may inform your app whether a payment attempt was successful or not
* An inventory platform (such as Shopify's inventory module) may need to notify your app when the inventory of an item is running low or out
* A CRM may send a webhook whenever a new lead is created
* A booking platform like Calendly may send a notification whenever a new appointment is booked

As you can see from the examples, webhooks can be considered time-sensitive API Calls that keep systems in sync. Just like any other API Calls they can contain parameters that carry important information about the event about which they're reporting. For example, a payment webhook call from Stripe may contain information such as the sum captured, the payment ID and the customer ID.

<figure><img src="/files/fySltEV3fxlnFTtGYSDC" alt=""><figcaption><p>A <strong>webhook</strong> is an API Call that's made as a result of a specific event. For example, Stripe may send a webhook to your app to confirm that a payment was successful.</p></figcaption></figure>

Also just like other workflows, webhooks can connect to your Data API to make changes in the database or to the Workflow API to trigger a workflow in your app.

## Recap

We’ve covered how an an API is a common language for apps to be able to exchange information and give each other commands. You can set up your Bubble app to initiate outgoing connections to other systems, and you can offer an incoming connection for other systems to speak to your app.

By using online tools you have most likely already witnessed the use of a long list of APIs without knowing it: your local newspaper getting updated weather reports, sports statistics and showing Google maps, an eCommerce website accepting payments through Stripe, Paypal and Authorize.net and a social media marketing platform scheduling posts on Twitter, LinkedIn and Instagram are all examples of apps working together by use of APIs.

Bubble automates a lot of the work that goes on behind the scenes to make it easy and safe to make connections that go both ways.

In the next section we'll take a more in-depth look at what exactly a RESTful API is.

{% content-ref url="/pages/Ec5Rmh0W3XxxVfukBzPY" %}
[What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)
{% endcontent-ref %}

{% content-ref url="/pages/qUKrZ46apgYpRMnPhwEQ" %}
[The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endcontent-ref %}

{% content-ref url="/pages/aHrCznvRmKoyVK3zfnIc" %}
[The API Connector](/help-guides/integrations/api/the-api-connector)
{% endcontent-ref %}

[^1]: An API Workflow is a server-side workflow that you can set up to be triggerable from external apps.\
    \
    Article: [API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)\
    Reference: [API workflows](/core-resources/api/the-bubble-api/the-workflow-api)

[^2]: The Data API is Bubble's built-in API service that lets you configure your app to accept incoming connections to your app's database.\
    \
    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^3]: The Workflow API is Bubble's built in service that lets you configure your app's workflows to be triggered from an external application.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)

[^4]: The API Connector is Bubble's tool for setting up outgoing API calls.\
    \
    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)\
    Reference: [The API Connector](/core-resources/api/the-api-connector)

[^5]: The Bubble API is Bubble's built-in API service that lets you accept incoming connections to read/manipulate data and trigger API Workflows.\
    \
    Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)\
    Reference: [The Bubble API](/core-resources/api/the-bubble-api)

[^6]: The Data API is the part of Bubble's built-in API that can be set up to give external applications access to read and make changes to your app's database.\
    \
    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
    Reference: [The Data API](/core-resources/api/the-bubble-api/the-data-api)

[^7]: The Workflow API is the part of Bubble's built-in API that can be set up to give external applications access to trigger workflows in your app.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)
