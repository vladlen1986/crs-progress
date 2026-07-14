# API
> Source: https://manual.bubble.io/help-guides/integrations/api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Unlock the power of APIs in your Bubble application

{% hint style="info" %}
The [Bubble API](/help-guides/integrations/api/the-bubble-api), including both the Data API and Workflow API, is only available on **paid plans**. See the [pricing page](https://bubble.io/pricing) for more information about our plans.

The [API Connector](/help-guides/integrations/api/the-api-connector) is available on all plans.
{% endhint %}

One of Bubble's most powerful features is its ability to connect to other applications on the web. By using what's called an API connection, your application can fetch data and execute commands in external software systems and vice versa.

<figure><img src="/files/QvqqzF2bXsNcJqoU9hfY" alt="Bubble API connections illustration"><figcaption><p>APIs let you connect to other applications and vice versa.</p></figcaption></figure>

## Introduction to APIs

In [this section](/help-guides/integrations/api/introduction-to-apis) we'll cover how APIs work in general. This is a fairly technical section that takes an in-depth look at the underlying structure and mechanics of a [RESTful API call](#user-content-fn-1)[^1].

The information in this section is not needed for you to set up incoming and outgoing API requests in Bubble, but by knowing the basics you may find it easier to understand external API documentation and Bubble's settings.

{% hint style="warning" %}
Bubble is a highly flexible platform. This means that while we offer robust API security features, we don't enforce their utilization. It is essential to possess an understanding of the fundamental principles of API management, such as authentication[^2] and authorization[^3], in order to effectively secure one's implementation of the platform.
{% endhint %}

Throughout reading this guide you may find it useful to check our [API Glossary](/help-guides/integrations/api/api-glossary) if there are terms and definitions you are unsure about.

## Getting started

If you are unfamiliar with how APIs work, we recommend starting with our introductory articles. The rest of the manual and reference entries will be easier to follow with an understanding of the basic principles:

While there are an abundance of different services you can connect to via an API, most of the follow the same basic architecture called **REST**.

{% content-ref url="/pages/SvTUzKhkueDh2ZxizViM" %}
[Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)
{% endcontent-ref %}

{% content-ref url="/pages/Ec5Rmh0W3XxxVfukBzPY" %}
[What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)
{% endcontent-ref %}

{% content-ref url="/pages/0hwfp6f65g3QOddJEOp2" %}
[API Glossary](/help-guides/integrations/api/api-glossary)
{% endcontent-ref %}

##

## The Bubble API manual

In [this section](/help-guides/integrations/api/the-bubble-api) we cover the different API tools that Bubble offers. An API is either **incoming** or **outgoing**.

An **incoming** **request** means that an external system is initiating a connection with your Bubble application to read/manipulate data or start a workflow. This is handled by the Bubble API.

<figure><img src="/files/TuoeQt5SijIhIEYGX1yM" alt=""><figcaption></figcaption></figure>

An **outgoing request** means that your application initiates a connection with an external system to work with data or execute an action. This is handled by the API Connector.

<figure><img src="/files/doPG6C6Ye9dfT1OFV7Bs" alt=""><figcaption></figcaption></figure>

<details>

<summary>Incoming Connections (The Data API and API Workflows)</summary>

Incoming requests are calls that are initiated by an external system, such as another app. They are split into two different tools:

* **The Data API** allows other applications to connect to your app's database to read, create, edit and delete data\
  Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)<br>
* **API Workflows** allow other applications to execute workflows in your application remotely\
  Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

</details>

<details>

<summary>Outgoing Connections (The API Connector and plugins)</summary>

Outgoing connections mean that your Bubble application initiates a connection with an external system to work with data or execeute an action. This is handled by two different tools in Bubble:

* **The API Connector** allows you to establish an API Connection with any third-party app or system that adheres to the [RESTful](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api) architecture.\
  Article: [The API Connector](/help-guides/integrations/api/the-api-connector)<br>
* **Plugins** are extensions that can be installed in your Bubble application to serve different functions. Many plugins allow you to easily connect to different well-known APIs without having to set it up in the API Connector.\
  Article: [Plugins that connect to APIs](/help-guides/integrations/api/plugins-that-connect-to-apis)

</details>

<details>

<summary>API technical reference</summary>

If you are already familiar with how APIs work and want to see our technical reference, go here.\
\
Section: [API reference docs](/core-resources/api)

</details>

## Other ways to learn:

<details>

<summary>Video lessons</summary>

Tutorials

* [Intro to APIs and the API Connector](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* [Setting up Google API keys](https://www.youtube.com/watch?v=ouGT55o68ho)

Webinars:

* [Bubble Webinar 2 - The API Connector](https://www.youtube.com/watch?v=DXsL4FjAhd8)
* [Bubble Webinar 4 - API Workflows](https://www.youtube.com/watch?v=zoPCX34Y8Io\&t=63s)

</details>

[^1]: REST, or Representational State Transfer, is not actually a protocol, but more of a set of guidelines that define how a client and server should interact with each other.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

[^2]: Authentication is the process of determining **who** a client is when an API request is received.

[^3]: Authorization is the process of determining **what** an API client has access to after authentication has taken place.
