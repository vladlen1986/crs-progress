# Authentication
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This reference entry covers how to authenticate with  the Bubble Data API

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

* Article: [How to set up authentication in an external app](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)

Bubble also supports other ways to authenticate incoming requests:

* Article: [Accessing the Bubble API without authentication](/help-guides/integrations/api/the-bubble-api/authentication/no-authentication)
* Article: [Accessing the Bubble API authenticated as a User](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)
* Article: [Accessing the Bubble API authenticated as an admin](/help-guides/integrations/api/the-bubble-api/authentication/as-an-admin)
  {% endtab %}

{% tab title="Postman Collection" %}
Bubble offers a Postman[^2] collection. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endtab %}
{% endtabs %}

## Authenticating as an admin

Using an API Token gives a client full administrator access to your database. This means that privacy rules are ignored and the client gets the same access level that an admin gets in the Bubble editor.

To generate an API token go to Settings - API and click the ‘Generate a new API token’ button. This will generate a 32-character token consisting of a combination of numbers and letters. To use the token in an API request, include it in the Authorization header of the request as a bearer token:

```
Authorization: Bearer <token>
```

### **API token label**

The API Token Label field lets you give each API Token a descriptive name. The label is visible only in the Bubble editor and does not affect the Data API in any way.

### **Private key**

This is the 32-character token used by the client to authenticate.

### **Regenerate private key**

Clicking this button will generate a new API token using the same label. Note that the new token will replace the old one. If you want to create an additional new token, use the ‘Generate a new API token’ button instead.

## Authenticating as a user

Authenticating as a User gives a client access to your database with the same privileges as that User has, as defined in the privacy rules.

To authenticate as a User, set up an API Workflow with a ‘Log the User in’ action. Bubble will return a token in the JSON that can be used for subsequent calls.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)
