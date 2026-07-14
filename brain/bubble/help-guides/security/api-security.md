# API security
> Source: https://manual.bubble.io/help-guides/security/api-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security related to incoming and outgoing API calls

{% hint style="info" %}
This article covers API security specifically. If you want to learn more about Bubble's API capabilities in general, check out our article series below:

Article series: [API](/help-guides/integrations/api)
{% endhint %}

Setting up connections with other applications and services is one of Bubble's core strengths, and gives you a lot of freedom in making outbound requests as well as accepting incoming ones.

Generally, Bubble's API tools (being among the more complex parts of Bubble development) are set up to handle security automatically and default to strict settings to reduce the risk of accidentally setting up vulnerabilities.

In this article series, we'll have a look at what you can do as a developer to make sure both your inbound and outbound connections are secure.

## The principle of least privilege

In the section [Planning app security](/help-guides/security/planning-app-security), we introduced the principle of least privilege. This is also an important guideline when setting up API connections.

The principle of least privilege is all about ensuring that each individual or system gets just the right amount of access needed to perform its specific task, and not an inch more. When diving into the Bubble API Connector and Bubble API, think of this as a guiding principle.

For instance, if an API call is designed to simply fetch or read data, it shouldn't have the power to change or delete that data. By sticking to this "just-enough" approach, you're making sure that you're not unintentionally opening up potential security risks. It’s a straightforward but crucial step in maintaining the integrity and safety of your app and its data.

<details>

<summary>API Connector security</summary>

The API Connector is used to send outbound API requests to third-party apps or systems. The article below outlines the secure way of setting it up. If you are unfamiliar with the API Connector you may also be interested in reading our general article on the subject (bottom link).

Article: [API Connector security](/help-guides/security/api-security/api-connector-security)\
Article: [Using the API Connector](/help-guides/integrations/api/the-api-connector)

</details>

<details>

<summary>Data API security</summary>

The Data API is part of the Bubble API, and gives you a way to share the data in your database securely with another app or system.

Article: [Data API Security](/help-guides/security/api-security/data-api-security)\
Article series: [Using the Data API](/help-guides/integrations/api/the-bubble-api/the-data-api) (links to Integrations section)\
Article: [Data API Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) (links to Integrations section)

</details>

<details>

<summary>Workflow API security</summary>

The Workflow API is the second part of the Bubble API, and gives you way to trigger API workflows from another app or system.

Article: [Workflow API security](/help-guides/security/api-security/workflow-api-security)\
Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api) (links to Integrations section)

</details>

## Other ways to learn

<details>

<summary>Video lessons</summary>

Tutorials

* [Intro to APIs and the API Connector](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* [Setting up Google API keys](https://www.youtube.com/watch?v=ouGT55o68ho)

Webinars:

* [Bubble Webinar 2 - The API Connector](https://www.youtube.com/watch?v=DXsL4FjAhd8)
* [Bubble Webinar 4 - API Workflows](https://www.youtube.com/watch?v=zoPCX34Y8Io\&t=63s)

</details>

<details>

<summary>Articles</summary>

**User manual:**

* Article series: [API](/help-guides/integrations/api)
  * Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)
  * Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
  * Article series: [The API Connector](/help-guides/security/api-security/api-connector-security)

**Core reference:**

* Core reference: [API](/core-resources/api)

</details>
