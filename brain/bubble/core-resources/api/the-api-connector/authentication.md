# Authentication
> Source: https://manual.bubble.io/core-resources/api/the-api-connector/authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The API Connector supports a range of different authentication methods.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### The API Connector

* Article: [API Connector authentication methods](/help-guides/integrations/api/the-api-connector/authentication)
* Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
  * Article: [Authentication](/help-guides/integrations/api/the-api-connector/authentication)
  * Article: [API Connector security](/help-guides/security/api-security/api-connector-security)

***

#### Cases

* Article: Case: [Connecting to OpenAI/ChatGPT](/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt)
* Article: Case: [Connecting with Google Translate](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate)

***

#### APIs

* Article series: [APIs](/help-guides/integrations/api)\
  This article series covers how APIs work in general, and the different steps that take place when two computer systems communicate.
  {% endtab %}

{% tab title="Videos (2)" %}

* [Intro to APIs & the API Connector | Bubble Crash-Course](https://www.youtube.com/watch?v=nO8PSqeJaWk\&t=745s)
* [Bubble Webinar 2 - The API Connector](https://www.youtube.com/watch?v=DXsL4FjAhd8\&t=2s)
* [How to Setup Google API Keys](https://www.youtube.com/watch?v=ouGT55o68ho)
  {% endtab %}
  {% endtabs %}

{% hint style="info" %}
For a more in-depth look at the different authentication methods in the API Connector, see the User Manual article below:

Article: [API Connector Authentication Methods](/help-guides/integrations/api/the-api-connector/authentication)
{% endhint %}

### Authentication methods

There are many different ways to authenticate. Most API providers will have documentation available online that specifies their authentication method and many require you to generate a unique API token. The *Authentication* dropdown in a collection's settings determines how the API Connector authenticates with the provider. The right method depends entirely on what the provider supports, so consult the provider's documentation before configuring this section.

The API Connector supports the following authentication methods:

<table data-header-hidden><thead><tr><th width="259">Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="#none-or-self-handled">None or self-handled</a></td><td>No authentication required</td></tr><tr><td><a href="#private-key-in-url">Private key in URL</a></td><td>The private key is included as a parameter in the URL</td></tr><tr><td><a href="#private-key-in-header">Private key in header</a></td><td>The private key is included as an HTTP header in the request</td></tr><tr><td><a href="#http-basic-auth">HTTP Basic Auth</a></td><td>The username and password is sent in plain text</td></tr><tr><td><a href="#oauth2-password-flow">OAuth2 Password Flow</a></td><td>The username and password is sent and receives an access token in return</td></tr><tr><td><a href="#oauth2-user-agent-flow">OAuth2 User-Agent Flow</a></td><td>Similar to OAuth2 Password Flow, but for user-agents</td></tr><tr><td><a href="#oauth2-custom-token">OAuth2 Custom Token</a></td><td>Thr custom token is sent to the server for verification</td></tr><tr><td><a href="#json-web-token">JSON Web Token (JWT)</a></td><td>A JSON web tokenis sent to the server for verification</td></tr><tr><td><a href="#client-side-ssl-certificate">Client-side SSL certificate</a></td><td>Your app presents a SSL certificate to the server for verification</td></tr></tbody></table>

***

## None or self-handled

No authentication is configured at the collection level. Use this for APIs that don't require authentication, or when authentication needs to be handled manually on each call.

No fields appear when this option is selected. Any credentials required by the provider must be added as headers or parameters on individual calls.

{% hint style="warning" %}
When using this option with calls configured as *Use as data*, take extra care to mark sensitive parameters as *Private*. Otherwise, those values may be exposed to the client.
{% endhint %}

***

## Private key in URL

Authenticates requests by including a key as a parameter in the URL.

### Key name

The name of the URL parameter used to send the key. Common values include `api_key` or `token`, depending on the provider.

### Private key

The key value used to authenticate against the provider.

### Development key value

An optional key used in your development environment, if the provider issues separate credentials.

***

## Private key in header

Authenticates requests by including a key in the request header.

### Key name

The name of the header used to send the key. Most providers use `Authorization`.

### Private key

The key value used to authenticate against the provider. If the provider expects a prefix such as `Bearer`, include it before the key, separated by a space.

### Development key value

An optional key used in your development environment, if the provider issues separate credentials.

***

## HTTP Basic Auth

Authenticates requests by sending a username and password with each call, encoded in the `Authorization` header.

### Username

The username used to authenticate against the provider.

### Password

The password used to authenticate against the provider.

***

## OAuth2 Password Flow

Exchanges a username and password directly for an access token, which is then used for all subsequent calls.

### Username

The username used to authenticate against the provider's token endpoint.

### Password

The password used to authenticate against the provider's token endpoint.

### Token endpoint (POST)

The URL the API Connector sends the credentials to in order to receive an access token.

***

## OAuth2 User-Agent Flow

Redirects the user to the provider's login page to grant your app permission, then exchanges the response for an access token tied to that user.

### App ID

The client identifier issued by the provider for your live environment.

### App Secret

The client secret issued by the provider for your live environment.

### Dev. App ID

An optional client identifier used in your development environment, if the provider issues separate credentials.

### Dev. secret

An optional client secret used in your development environment.

### Scope

The permissions your app is requesting, as defined by the provider. Multiple scopes are typically separated by spaces or commas, depending on the provider's documentation.

### Authentication goes in the header

When checked, the authentication credentials are sent in the request header instead of in the body.

### Token name

The name of the field in the provider's response that contains the access token. Defaults to `access_token`.

### Token is returned as querystring

When checked, indicates that the provider returns the access token in the URL query string rather than the response body.

### Requesting an access token uses Basic Auth

When checked, the API Connector uses Basic Authentication when requesting the access token.

### Add access\_type=offline (Google APIs)

When checked, adds the `access_type=offline` parameter to the request. Used with Google APIs to receive a refresh token alongside the access token.

### Use a generic redirect URL

When checked, uses a generic redirect URL for the OAuth flow instead of an app-specific one.

### Login dialog redirect

The URL the user is redirected to in order to log in and approve permissions. Use `[]` to insert dynamic parameters.

### Access token endpoint

The URL the API Connector uses to exchange the authorization response for an access token.

### User profile endpoint

The URL used to retrieve the user's profile information after authentication.

### User ID key path

The key in the user profile response that contains the user's unique identifier. Defaults to `id`.

### User email key path

The key in the user profile response that contains the user's email address. Defaults to `email`.

{% hint style="warning" %}
After configuring this method, the connection must be tested in run mode before it can be used. Set up a login workflow, preview your app with `debug_mode=true` in the URL, and complete authentication with the provider. Don't include a *Go to page* action in the workflow used to authenticate.
{% endhint %}

***

## OAuth2 Custom Token

A flexible OAuth2 method for providers whose token request doesn't fit the standard flows. Gives you full control over the token request.

### Token endpoint (POST)

The URL the API Connector sends the token request to.

### Token call headers

Custom headers to include with the token request. Click *Add header* to add a key and value pair.

### Body

The body of the token request, formatted as a JSON object. Use `<>` to insert dynamic values.

***

## JSON Web Token

Authenticates using a signed JWT, exchanged with the provider for an access token.

### Scope

The scope of access being requested, as defined by the provider.

### Iss (account email)

The issuer of the token, typically the email address of the service account associated with the credentials.

### Access token endpoint

The URL the API Connector uses to exchange the JWT for an access token.

### Private key

The RSA private key used to sign the token. Paste the full key, including the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.

***

## Client-side SSL certificate

Authenticates by presenting a digital certificate to the provider, which the provider checks against trusted certificates.

### Certificate file content

The contents of the SSL certificate file issued by the provider. Paste the full certificate, including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.

### Key file content

The contents of the private key file that pairs with the certificate. Paste the full key, including its header and footer lines.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
