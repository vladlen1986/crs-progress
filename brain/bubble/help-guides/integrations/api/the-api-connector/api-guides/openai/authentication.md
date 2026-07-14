# Authentication
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="OpenAI documentation" %}
OpenAI’s documentation provides thorough information about both the authentication process and how to set up calls.

External page: [OpenAI API reference](https://platform.openai.com/docs/api-reference) | [Authentication](https://platform.openai.com/docs/api-reference/authentication)
{% endtab %}

{% tab title="API Connector" %}
The API Connector is the plugin we'll use to authenticate and sell requests to ChatGPT. You can find our documentation for the API Connector plugin below.

Article: [The API Connector](/help-guides/integrations/api/the-api-connector)\
Article series: [APIs](/help-guides/integrations/api)\
\
Video: [Bubble Academy](https://bubble.io/academy) | [Intro to APIs & The API Connector](https://bubble.io/video/intro-to-apis--the-api-connector)
{% endtab %}

{% tab title="API glossary" %}
This article series includes several terms and expressions that are common in the broader tech field, particularly those used by API providers, which are not unique to Bubble. To understand these terms better, we recommend referring to our dedicated API glossary, which provides clear explanations for many of these technical concepts.

Article: [API Glossary](/help-guides/integrations/api/api-glossary)
{% endtab %}
{% endtabs %}

## API Connector settings

### The bearer token

OpenAI uses a [bearer token](#user-content-fn-1)[^1] to authenticate[^2]. Imagine that you are entering a restricted area, where a username and password is needed to enter. A token is essentially a ticket that authorizes you to access that area *without* the username and password. The ticket verifies both your identity, and ensures that they have permission to access the requested resources.

Transferring this metaphor to the app world, the token can be used to send requests to the API, without having to send the OpenAI username and password each time. This not only makes it easier, but it makes the whole process more secure. After all, a token can have specific permissions, and those permissions can be changed. The token can be revoked completely and a new one generated if it somehow ends up in the wrong hands. Also, if someone were to get access to your token, they won’t be able to log in to your OpenAI account with it – it only gives access to API calls.

<table><thead><tr><th width="151">Phrase</th><th>Meaning</th></tr></thead><tbody><tr><td>Bearer token</td><td>The method used for authenticating</td></tr><tr><td>API key</td><td>The token itself</td></tr></tbody></table>

### How did we determine that OpenAI uses a bearer token?

The bearer token is a common way to use secret API keys. You can confirm its use by checking the OpenAI API reference, in the Authentication section.

External page: [Authentication | OpenAI Reference](https://platform.openai.com/docs/api-reference/authentication)

On this page, we find the following. Take note of the Bearer in the code section at the bottom of the screenshot below:

<figure><img src="/files/V4UwmSZBWwRIYNEK2zek" alt=""><figcaption><p>This screenshot from OpenAI reveals that the <em>bearer token</em> authentication method is used.</p></figcaption></figure>

### Setting up the OpenAI bearer token in the API Connector

Ok, so OpenAI API uses a bearer token for authentication, and the token is the API key we just generated on the OpenAI platform. By authenticating with that specific API key, OpenAI not only knows who we are, but can use the Permissions we set on that API key to know what resources we are authorized to access.

The bearer token (API key) is included in the HTTP header of an API call. The header can be seen as the envelope for the call. It carries important details about the message being sent, but not the message itself. Including the API key in the header is a secure way to identify and authorize the sender of the request without exposing sensitive information directly in the message body.

<figure><img src="/files/JkgRKd6RnBQYL2LGoyCg" alt=""><figcaption><p>This screenshot from OpenAI also reveals that the bearer token should be included in the header of each call.</p></figcaption></figure>

Let’s return to the screenshot above again, and see what OpenAI says about what the header should look like.

What can we learn from this?

* OpenAI wants the authentication to be included in the **header** of the API call
* The OpenAI will expect a [**key-value pair**](#user-content-fn-3)[^3], structured as:
  * **Key**: Authorization
  * **Value**: [Bearer API\_KEY](#user-content-fn-4)[^4]

Let’s see how that looks in the API Connector:

<figure><img src="/files/MUWFM414eKl6YoHaEtu2" alt=""><figcaption></figcaption></figure>

To set up authentication in the header, follow these steps:

First, add a new API to the API Connector, and give it a suitable name, such as OpenAI. Then:

1. In the *Authentication* dropdown, choose *Private key in header*.
2. In the *Key name*, make sure it says *`Authorization`*.
3. In the *Key value* field, type in *`Bearer`*
4. After a space, insert the `API key` your generated earlier (replacing API\_KEY in the screenshot)

#### What did we just do?

The short process above means the following:

* In Step 1, we Instruct Bubble to include a private key token in the header of the call
  * Private means it’s encrypted, and not visible to your app’s users (even in the app’s JavaScript code)
* In step 2 and 3, we set up the key-value pair that matches the structure OpenAI expects:
  * The Key is called `Authorization`
  * The Value is `Bearer, [space]` and `your API key`

With that, we have translated OpenAI’s instructions into the language of the API Connector.

## Testing the authentication

The natural next step is to test that the authentication works. But to do this, we first need to set up a call. Without it, we don’t have an endpoint to send the request to.

Let's jump into setting up our first Call.

Article: [OpenAI Calls](/help-guides/integrations/api/the-api-connector/api-guides/openai/calls)

[^1]: The bearer token is a string that identifies who the client is. It serves as both username and password and is included in the header of the API request.

    The bearer token does not *contain* the username and password – they are entirely independent.

    Article: [API terminology](/help-guides/integrations/api/the-bubble-api/bubble-api-terminology)

[^2]: Authentication is the process of determining *who* a client is, in order to check *what* they are authorized to access.

    Article series: [API](/help-guides/integrations/api)

    Article section: [API Connector authentication](/help-guides/integrations/api/the-api-connector#authentication)

[^3]: A *key-value pair* is a fundamental concept where a *key*, a unique identifier, is associated with a *value*.

    In this context, the *key* is "Authurization" and its value is *Bearer API\_KEY.*

[^4]: The *Bearer* determines that the authentication is done with a bearer token. The API\_KEY is replaced by your actual API key. If that key was "123", the full string in this value would be "Bearer 123"
