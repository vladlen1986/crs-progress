# The Data API
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-data-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the Data API, which lets you set up your application to accept incoming requests to read, create, edit and delete records in your database.

The Data API is Bubble’s automated way of providing external systems access to your app’s database. It allows one-click creation of a RESTful[^1] interface to some or all of your application's data. You can let a client read, modify, and delete individual data items, search for data using a flexible query language, and create and bulk upload new things

You can grant [full admin access](#user-content-fn-2)[^2] to the database and allow another system to be able to freely make changes (even in bulk) or you can exert [exact contro](#user-content-fn-3)[^3]l over what data types they can access and what kind of actions they can take. Since the Data API in theory can give any external system complete control over your database, it’s important to learn how to set it up in a secure way.

Remember that Bubble offers strong security, but we don’t enforce it – because we want to allow flexibility you are free to set up your Data API to be as open or closed as you prefer. This is why it’s important to learn how different decisions affect security so you can make informed decisions that suit your project.

## **Activating the Data API**

You’ll find the Data API by navigating to Settings - API. To make sure that no one can access your database unless you want them to, the Data API is disabled by default. To enable it, check the Enable Data API checkbox.

<figure><img src="/files/EX5JcjBVFbRQmkBWUEOW" alt=""><figcaption></figcaption></figure>

As soon as you have the Data API enabled, you’ll see a list of all your data types along with a second checkbox: this is where you select which data types to expose in the API

{% hint style="danger" %}
Only activate the Data Types that you want to expose in the Data API.
{% endhint %}

Keep in mind the following:

* Unchecked data types are **not** available in the Data API regardless of how the user authenticates
* Checked data types are exposed, but adhere to the privacy rules in combination with the client’s authentication

{% content-ref url="/pages/KCt0jmX2enl2wRiQbufQ" %}
[Data API privacy rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)
{% endcontent-ref %}

{% content-ref url="/pages/GPjctojDAx4tGAlHmceG" %}
[Data API endpoints](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-endpoints)
{% endcontent-ref %}

{% content-ref url="/pages/d3U16LFw7yw4LHqypMLr" %}
[Data API requests](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests)
{% endcontent-ref %}

<details>

<summary>Data API security checklist</summary>

This section covers Data API security in a short checklist, allowing you to plan and set up secure connections with external clients.

Article: [Data API security](/help-guides/security/api-security/data-api-security)

</details>

<details>

<summary>Core reference entries about the Data API</summary>

Our core reference section contains short-form technical instructions that you may find useful when you're working with the Data API:\
\
Reference: [The Data API](/core-resources/api/the-bubble-api/the-data-api)\
Reference: [List of Data API requests](/core-resources/api/the-bubble-api/the-data-api/data-api-requests)\
Reference: [Constructing the Data API endpoints](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints)

</details>

[^1]: REST, or Representational State Transfer, is not actually a protocol, but more of a set of guidelines that define how a client and server should interact with each other.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

[^2]: Granting full access to your database from an external app or system is done by using an *admin token* when the client is authenticating with your API.\
    \
    Article: [Authenticating as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)

[^3]: Using *User authentication* in combination with Privacy Rules gives you a highly granular and secure way to protect sensitive data in your database when you use the Data API.\
    \
    Article: [Data API Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)\
    Article: [General Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)\
    Article: [Authenticating a client as a User](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)
