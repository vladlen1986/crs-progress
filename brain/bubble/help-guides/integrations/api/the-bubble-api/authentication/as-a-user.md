# As a user
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/authentication/as-a-user · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to authenticate an API client as a user logged in to your application, allowing you to protect your data with privacy rules

## What is User authentication?

**User authentication** means that the client[^1] making the request is authenticating as a user, which means that Bubble can determine what they are authorized to access using [privacy rules](#user-content-fn-2)[^2], just like regular app users.

This is the method that offers the highest level of security and flexibility since it allows you to provide different privacy rules based on who the client is.

{% hint style="info" %}
You can set the access level for an **API workflow** using the **Authentication** setting. This determines whether the workflow can be accessible to everyone, to authenticated users and admins, or to admins only.

Article section: [API workflow access level](/help-guides/integrations/api/the-bubble-api/the-workflow-api#access-level)
{% endhint %}

## How to set up User authentication

In principle, logging a client in as a user happens in the same way that you log in a regular user in your app, except that the action needs to happens in an [API workflow](#user-content-fn-3)[^3]. When you log in a user, Bubble can return a token that can be used to authenticate in subsequent calls.

1. Create an API Workflow with a fitting name such as `generate-api-token`
2. Use the *Log the User in* action or *Sign the user up* action to log in or create a new user. For the *Log the User in* action you will need to provide an email and a password.
3. If successful, Bubble will automatically respond with a token that can be used as a [bearer token](#user-content-fn-4)[^4] in subsequent call.

<figure><img src="/files/G5YaOP0H8AvSyUCwOmEI" alt=""><figcaption><p>If you log a user in with an action in an API Workflow, Bubble will respond with a token that can be used to authenticate the client in subsequent requests. In the example above we are accepting the email and password as parameters in the API Workflow.</p></figcaption></figure>

## How long is the token valid?

{% hint style="warning" %}
**Note:** Tokens that remain unused expire after 30 days, even if their total validity period is longer. If the token is used within the 30-day window, its validity is automatically extended by 30 days, up to its maximum duration.

To prevent the token from expiring, you can send a simple no-op[^5] workflow request to the API to keep it active.
{% endhint %}

The token has two different validities depending on your settings.

### Without 2-factor authentication

* ***Keep the user logged*****&#x20;in set to&#x20;*****yes*****:** the token has a validity of **12 months**
* ***Keep the user logged*****&#x20;in set to&#x20;*****no:*** the token has a validity of **24 hours**

### **With 2-factor authentication**

* ***Keep the user logged*****&#x20;in set to&#x20;*****yes*****:** the token has a validity of **1 month**
* ***Keep the user logged*****&#x20;in set to&#x20;*****no:*** the token has a validity of **24 hours**

### Revoking a token

There are two ways to revoke a token after it has been generated:

* You can call a [*Log the User*](/core-resources/actions/account#log-the-user-out) *out* action from the client that uses the relevant token
* You can use the [*Log out other user's sessions*](/core-resources/actions/account#log-out-other-users-sessions) to sign a User out from every session except for the one they are running the workflow from

## Restricting a client's privileges

There are two ways to restrict the access level and privileges of a client that's using a user token:

* **Privacy rules:** your main level of protection is setting up privacy rules that match the User that is signed in and control their access to find, read, create, edit and delete data through the API.
* **Conditions**: on API Workflows you can set up conditions that restrict the triggering of the workflow based on fields saved on the User. This will apply to clients who are sending a request with a user authentication token.

[^1]: The *client* is the one that is making a request in an API call, as opposed to the *server* who is the one to respond.\
    \
    In the case of the Bubble API, the external system is the *client* and your Bubble app is the *server*.<br>

    Article: [The client/server relationship](/help-guides/integrations/api/introduction-to-apis#client-and-server)

[^2]: Privacy Rules are server-side rules that govern **who** has access to **what** in your database.\
    \
    In the context of APIs, Privacy Rules are applied to API requests depending on how the client has authenticated.\
    \
    Article: [Data API Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)\
    Article: [Workflow API Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules)

[^3]: An API workflow is a server-side workflow that can be exposed to be triggered from an external app through an API call.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Article [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

[^4]: A *bearer token* is a type of access token used to authenticate API requests.

    It is included in the request header (typically as `Authorization: Bearer <token>`).

    Any request that includes a valid bearer token is treated as authenticated, meaning the token itself grants access without requiring additional credentials.

[^5]: An API call that performs no meaningful action and does not modify any data.
