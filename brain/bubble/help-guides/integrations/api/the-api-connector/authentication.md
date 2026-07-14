# Authentication
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/authentication · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the different authentication methods the API Connector offers.

{% hint style="info" %}
**Authentication** is the process of identifying **who** a client[^1] is in order to determine what resources[^2] they have access to on the server.
{% endhint %}

## Authentication

The first part of connecting to an external API is to authenticate (unless you are connecting to a public API that doesn't require authentication).

This can in many ways be compared to logging into an app – by providing a username and password you authenticate with that app and the app can proceed to determine what kind of resources you should be given access to.

<figure><img src="/files/6y9dGt8AM7HL5UXKQVRf" alt=""><figcaption><p>Before granting access to a resource, many API providers will require that you authenticate.</p></figcaption></figure>

An API call works in the same way in principle: by providing some authentication you are letting the server know **who** you are so that it can respond with the appropriate data. As we explored in our article on [what RESTful APIs are](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api), each and every API call are completely independent of each other – in other words, you must authenticate for *every* call that you make. The server does not "remember" who you are, but verifies the identity of the client in every request.

This is why we first need to add the authentication to any API provider in the API Connector; this way Bubble can automatically send the correct authentication along with every call, so that you only need to set it once.

## API tokens

An API token or API key is a string of characters that identifies your app to an external service and grants it permission to make API calls. Think of it as a key: when you include the token with a request, the service uses it to confirm who you are and what you're allowed to do.

API tokens serve the same basic purpose as a username and password, but they're designed for machine-to-machine communication. They're typically long, random strings that are hard to guess, easy to generate and revoke, and can often be scoped to specific permissions, such as read-only access or access to a particular part of the service.

Each token is issued by the API provider and tied to your account. Some providers offer a single token per account, while others let you generate multiple tokens with different permissions, so you can use a separate one for each app or environment. If a token is exposed or no longer needed, it can be revoked at any time without affecting your account as a whole.

{% hint style="warning" %}
API keys are considered sensitive data and should never be shared with anyone. Treat it like you would a username and password.\
\
Do not store API keys in Option Sets, page elements or on-page workflows as they will become visible in the client-side code of your application.\
\
If you suspect that someone has access to one of your API keys, most API providers will let you generate a new one.
{% endhint %}

### API key security

The API Connector is built to keep your credentials out of the user's browser. API keys that you add to the correct fields in the API Connector are not visible to your app's users or other Bubble users. They are stored in an encrypted state on Bubble's server. By default, all calls are routed through Bubble's server, which means your API keys and other sensitive values are never sent to the client. The user's browser only ever sees the data it needs to display, never the credentials used to fetch it.

RESTful API calls are sent from the server using the [HTTP protocol](#user-content-fn-3)[^3], the same protocol that web browsers use to load websites. In modern systems, these calls are encrypted in transit[^4] using HTTPS[^5], which protects the contents of the request and response from being intercepted or read by anyone on the network between the Bubble server and the API server.

This server-side routing is the main reason the API Connector is the recommended place to store and use API keys in your app. Several built-in safeguards work together to keep credentials secure:

* **Authentication is configured at the collection level.** Tokens and other credentials are stored once and used across all calls in the collection, without ever being passed through the client.
* **Private parameters stay on the server.** Any parameter marked as *Private* is added to the request from Bubble's server, not the browser.

### Development keys and live keys

Many API providers issue two separate sets of credentials: one for development and testing, and one for production use. Keeping these environments separate is a standard practice that helps you build and test safely without affecting real users or real data.

#### What each set is for

**Development keys** are tied to a sandbox or test environment provided by the service. Calls made with development keys don't affect real data or trigger real transactions. For example, Stripe's test keys let you simulate payments and customer creation without actually charging cards.

**Live keys** are tied to the production environment, where every call has real consequences. A payment processed with live keys charges a real card, an email sent with live keys reaches a real inbox, and a record created with live keys appears in your actual account data.

#### Using both in your Bubble app

Bubble apps have separate development and live environments, which makes it natural to use a matching pair of keys. In many scenarios, It's best practice to use these keys as intended: in many scenarios, Bubble lets you add each of the keys to the development and live version of your app and will automatically use the correct key depending on which version you are running.

<figure><img src="/files/3FWBTGKVw25o1UMmFc9C" alt="" width="563"><figcaption></figcaption></figure>

**Things to keep in mind**

* **Never use live keys in development.** It's easy to forget which keys are in use and accidentally trigger real transactions or send real messages during testing. Use development keys whenever you're building or experimenting.
* **Treat live keys with extra care.** Live keys have direct access to real data, real money, and real users. They should be rotated regularly and revoked immediately if exposed.
* **Confirm which keys are active before deploying.** Before pushing changes to your live environment, double-check that the live keys are configured correctly. Going live with development keys will cause calls to fail in production.

{% hint style="info" %}
In this article we use multiple fairly technical terms to explain how the different authentication methods work. You may find our [API Glossary](/help-guides/integrations/api/api-glossary) useful if there are words or terms you're unfamiliar with.\
\
If you are new to API's you may also find our [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis) and [What are RESTful APIs](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api) articles useful.
{% endhint %}

## Authentication methods

Authentication is how an API verifies who's making a request. When your Bubble app sends a call to an external service, the service needs some way to confirm that the request is coming from an authorized source and to determine what that source is allowed to do.

Different providers use different authentication methods, and the right method for your app depends entirely on what the provider supports. Some services use a single API key sent with every request, while others rely on more involved flows that exchange credentials for short-lived access tokens. None of these methods are inherently better than the others. They're designed for different use cases and trade off simplicity, flexibility, and security in different ways.

The API Connector supports the most common authentication methods used across modern APIs. The provider's documentation will tell you which method to use and how to generate the credentials your app needs.

This section covers each authentication method the API Connector supports, what it looks like in practice, and when you might encounter it.

The different authentication methods are visible in the dropdown next to the API name:

<figure><img src="/files/ukAHsNaQHoJD04CAFld2" alt="" width="379"><figcaption></figcaption></figure>

### None or self-handled

The *None or self-handled* option indicates that no authentication is configured at the collection level. This is used for APIs that don't require authentication at all, or for cases where you want to handle authentication manually on each individual call.

#### When you'll encounter it

This option is useful in two main scenarios:

* **Public APIs.** Some APIs don't require authentication, such as open data services, public weather APIs, or read-only endpoints that return general information. In these cases, no credentials are needed and the API can be called directly.
* **Custom authentication setups.** Some APIs use authentication methods that don't fit any of the predefined options, or require credentials to be assembled dynamically. In these cases, you can leave authentication set to *None* and configure the necessary headers or parameters on each call individually.

#### Setting it up in the API Connector

To use this option, select *None or self-handled* from the *Authentication* dropdown in the collection's settings. No additional fields appear, since no authentication is configured at this level.

If the API requires credentials, you'll need to add them as headers or parameters on each call. Mark any sensitive values as *Private* to keep them on the server.

{% hint style="warning" icon="lock" %}
We recommend using built-in authentication methods to avoid the risk of accidentally exposing your API keys or other data. Bubble's built-in authentication system is designed to keep your data and connections secure.
{% endhint %}

### Private key in header

The *Private key in header* method authenticates requests by including a key in the request header. The provider reads the header on each call to verify the request.

#### How it works

The key is sent as part of the HTTP headers, typically in an `Authorization` header. Many APIs expect the key to be prefixed with a scheme such as `Bearer`, followed by the actual key value.

{% code overflow="wrap" %}

```
Authorization: Bearer <token>
```

{% endcode %}

{% hint style="info" %}
The actual key name in the example above can look different depending on the API provider.\
\
Consult their documentation to find the right formatting for their particular setup.
{% endhint %}

Sending the key in the header rather than the URL is generally more secure, since headers aren't logged in the same way URLs sometimes are. This is the recommended method for most modern APIs that use a single key for authentication. Bubble routes both methods through the server, minimizing the risk.

#### When you'll encounter it

This method is widely used across modern APIs. Most services that issue an API key or bearer token expect it to be sent in the `Authorization` header. Examples include OpenAI, Stripe, SendGrid, and many others.

#### Setting it up in the API Connector

To configure *Private key in header*, select it from the *Authentication* dropdown in the collection's settings. The following fields will appear:

<table><thead><tr><th width="224.1796875">Field</th><th>Description</th></tr></thead><tbody><tr><td>Key name</td><td>The name of the header used to send the key. Most providers use <code>Authorization</code>, but check the documentation for the exact value.</td></tr><tr><td>Private key</td><td>The key value used to authenticate against the provider. If the provider expects a prefix such as <code>Bearer</code>, include it before the key, separated by a space.</td></tr><tr><td>Development key value</td><td>An optional key used in your development environment, if the provider issues separate credentials.</td></tr></tbody></table>

Once configured, the API Connector adds the header to every call in the collection automatically.

### Private key in URL

{% hint style="warning" %}
Including the [private key in the header](#private-key-in-header) is a more secure method compared to embedding it in the URL. For enhanced security in your transactions, we recommend opting for the[ Private Key in Header](#private-key-in-header) method whenever possible.
{% endhint %}

The *Private key in URL* method authenticates requests by including a key as a parameter in the URL itself. The provider checks the key in the query string to verify the request and determine what it's allowed to do.

#### How it works

The key is appended to the URL of each request, typically as a query parameter such as `?api_key=your_key_here`. The provider reads the key from the URL and uses it to authenticate the call.

{% code overflow="wrap" %}

```url
GET https://myapp.bubbleapps.io/version-test/api/1.1/obj/datatype/UID?private-key=<your-key-here>
```

{% endcode %}

This method is one of the simplest authentication options, but because the key appears in the URL, it can be logged by servers, proxies, or browser history if exposed to the client. Bubble automatically routes the call through the server to minimize this risk.

#### When you'll encounter it

This method is common with simpler APIs, public-facing data services, and APIs where a single key is used to identify the entire account. It's often used by weather services, geocoding APIs, and other read-only data providers.

#### Setting it up in the API Connector

To configure *Private key in URL*, select it from the *Authentication* dropdown in the collection's settings. The following fields will appear:

<table><thead><tr><th width="251.62890625">Field</th><th>Description</th></tr></thead><tbody><tr><td>Key name</td><td>The name of the URL parameter used to send the key. The exact name comes from the provider's documentation, such as <code>api_key</code> or <code>token</code>.</td></tr><tr><td>Private key</td><td>The key value used to authenticate against the provider.</td></tr><tr><td>Development key value</td><td>An optional key used in your development environment, if the provider issues separate credentials.</td></tr></tbody></table>

Once configured, the API Connector appends the key to the URL of every call in the collection automatically.

### HTTP Basic Auth

HTTP Basic Auth is one of the simplest authentication methods. The client sends a username and password with every request, encoded as part of the request header. The server checks the credentials against its own records and allows or denies the request based on the result.

<figure><img src="/files/Y4yX6hEALCmPeGIUx5ur" alt="" width="563"><figcaption></figcaption></figure>

#### How it works

With Basic Auth, the username and password are combined into a single string, encoded in base64, and sent in the `Authorization` header of every request. The format looks like:

```
Authorization: Basic <base64-encoded credentials>
```

For example:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Despite the encoding, base64 is not encryption. Anyone who intercepts the request can decode the credentials, which is why Basic Auth should only be used over HTTPS. The encryption provided by HTTPS is what keeps the credentials safe in transit. Bubble maintains HTTPS automatically.

#### When you'll encounter it

Basic Auth is common with older APIs, internal services, and some lightweight integrations. It's straightforward to implement and doesn't require token exchanges or redirects, which makes it appealing for simple use cases.

Most modern public APIs have moved to token-based authentication for added flexibility and security, but Basic Auth remains widely supported and is still the right choice for many services.

#### Setting it up in the API Connector

To configure HTTP Basic Auth, select *HTTP Basic Auth* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

| Field    | Description                                          |
| -------- | ---------------------------------------------------- |
| Username | The username used to authenticate with the provider. |
| Password | The password used to authenticate with the provider. |

The exact values come from the provider, typically as part of setting up API access for your account. Once configured, the API Connector encodes and sends the credentials with every call in the collection automatically.

#### Things to keep in mind

* Both the username and password are stored on Bubble's server and never exposed to the client.
* Some providers issue an API key that's used in place of the username or password. Check the provider's documentation to see how their credentials are formatted.

### Oauth2 Password Flow

The OAuth2 Password Flow is an authentication method where the client exchanges a username and password directly for an access token. Once the token is issued, it's used for all subsequent requests instead of the original credentials.

#### How it works

The flow is straightforward compared to other OAuth2 methods. The client sends the user's username and password to the provider's token endpoint, along with credentials identifying the app itself. If the credentials are valid, the provider returns an access token that the client uses for future requests.

The typical sequence looks like this:

1. The client sends the username, password, and app credentials to the provider's token endpoint.
2. The provider validates the credentials and returns an access token.
3. The client includes the access token with each subsequent API call.

Unlike the User-Agent Flow, this method doesn't involve redirecting the user to the provider's login page. The credentials are passed directly through the API, which is why it's typically used in trusted environments where the app and the service share a close relationship.

#### When you'll encounter it

This flow is most common with internal APIs or services where the app is trusted enough to handle user credentials directly. It's also used in some legacy systems and APIs that haven't adopted more modern OAuth flows.

The OAuth2 Password Flow has fallen out of favor for public-facing integrations because it requires the app to handle the user's password directly, which is generally less secure than redirect-based flows. Most modern public APIs use the User-Agent Flow or other authorization code flows instead.

{% hint style="info" %}
You can read more about the mechanics of this authentication type in the [OAuthLib documentation](https://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html).
{% endhint %}

#### How secure is this method?

From a technical perspective it's safe to send a username and password via an encrypted HTTPS request. Still, this method should be used with some caution since any time you share a username and password with a third party you are opening up to potential misuse and must place your trust in that third party to maintain their security in the exchange.

<figure><img src="/files/L2XHrx1fA4VV5r55rcNw" alt="" width="563"><figcaption></figcaption></figure>

#### Setting it up in the API Connector

To configure OAuth2 Password Flow, select *OAuth2 Password Flow* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

| Field                 | Description                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Username              | The username used to authenticate against the provider's token endpoint.                                               |
| Password              | The password used to authenticate against the provider's token endpoint.                                               |
| Token endpoint (POST) | The URL the API Connector sends the credentials to in order to receive an access token. The request is sent as a POST. |

The exact values for each field come from the provider's documentation. Once configured, the API Connector exchanges the credentials for an access token automatically and includes it with every call in the collection.

### Oauth2 Custom Token

The OAuth2 Custom Token method is a flexible authentication option that lets you build a custom token request when the provider doesn't fit one of the standard OAuth2 flows. Instead of following a predefined pattern, you define the exact request that the API Connector sends to retrieve the access token.

#### How it works

Some providers implement OAuth2 in ways that don't match the standard flows. They might expect a different request format, custom headers, or a specific JSON body structure when requesting a token. The custom token method gives you full control over how that request is made, so you can match whatever the provider requires.

Once the access token is received, it's used for all subsequent calls in the collection, the same way it is with other OAuth2 methods.

#### When you'll encounter it

This method is most useful when working with providers whose token request doesn't fit the User-Agent Flow or Password Flow. It's also helpful when integrating with internal APIs or services that have their own conventions for token issuance.

If the provider's documentation describes a token request that doesn't match any of the standard OAuth2 patterns, the Custom Token method is usually the right choice.

#### Setting it up in the API Connector

To configure OAuth2 Custom Token, select *OAuth2 Custom Token* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

<table><thead><tr><th width="237.15234375">Field</th><th>Description</th></tr></thead><tbody><tr><td>Token endpoint (POST)</td><td>The URL the API Connector sends the token request to. The request is sent as a POST.</td></tr><tr><td>Token call headers</td><td>Custom headers to include with the token request. Click <em>Add header</em> to add a key and value pair.</td></tr><tr><td>Body</td><td>The body of the token request, formatted as a JSON object. Use <code>&#x3C;></code> to insert dynamic values.</td></tr></tbody></table>

The exact values for each field come from the provider's documentation. Once configured, the API Connector sends the custom request to retrieve the access token and includes the resulting token with every call in the collection.

### Oauth2 User-Agent Flow

{% hint style="info" %}
Setting up the Oauth2 User-Agent Flow can be a bit complicated if you are not familiar with APIs. There are many plugins that can set up the connection for you without having to go through the API Connector.\
\
Article: [Finding API-related plugins](/help-guides/integrations/api/plugins-that-connect-to-apis)
{% endhint %}

The OAuth2 User-Agent Flow is an authentication method used when a user needs to grant your app permission to act on their behalf with an external service. Unlike methods that authenticate the app itself, this flow authenticates an **individual user** and returns an access token tied to that user's account.

#### How it works

The flow is built around redirecting the user to the provider's login page, where they sign in and approve the requested permissions. Once they approve, the provider redirects them back to your app with an access token. Your app then uses that token to make calls on the user's behalf.

The typical sequence looks like this:

1. The user clicks a button in your app to connect their account with the external service.
2. They're redirected to the provider's login page.
3. After signing in, they're shown a permissions screen describing what your app is asking to do.
4. If they approve, the provider redirects them back to your app with an access token.
5. Your app stores the token and uses it to make calls on the user's behalf.

#### When you'll encounter it

This flow is common with services that hold user-specific data, such as social media platforms, calendar services, email providers, and cloud storage tools. It's the standard way for apps to access data tied to a specific user without ever handling that user's password.

For example, an app that integrates with Google Calendar would use this flow to let each user connect their own calendar, rather than using a single shared account.

<details>

<summary>Terms used in the external Oauth2 API documentation</summary>

When you check the external documentation for instructions on how to set up the Oauth2 User-Agent Flow with that provider, you'll often come across the following terminology:

* **Resource Owner**: The resource owner refers to the User of your app. Since your app is asking for access to the resources belonging to that User specifically, it follows that they are described as the owner.
* **Resource or Authorization Server:** this refers to the server that manages authorization and the server that hosts the resource. They can sometimes be the same, but not always.
* **Client**: the client is the app that is requesting access to the resource: your Bubble app.

You'll find more API-related terms in our [API Glossary](/help-guides/integrations/api/api-glossary).

</details>

#### Setting it up in the API Connector

To configure OAuth2 User-Agent Flow, select *OAuth2 User-Agent Flow* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

<table><thead><tr><th width="266.6015625">Field</th><th>Description</th></tr></thead><tbody><tr><td>App ID</td><td>The client identifier issued by the provider for your live environment.</td></tr><tr><td>App Secret</td><td>The client secret issued by the provider for your live environment.</td></tr><tr><td>Dev. App ID</td><td>An optional client identifier used in your development environment, if the provider issues separate credentials.</td></tr><tr><td>Dev. secret</td><td>An optional client secret used in your development environment.</td></tr><tr><td>Scope</td><td>The permissions your app is requesting, as defined by the provider. Multiple scopes are typically separated by spaces or commas, depending on the provider's documentation.</td></tr><tr><td>Authentication goes in the header</td><td>When checked, the authentication credentials are sent in the request header instead of in the body. Check the provider's documentation for the expected format.</td></tr><tr><td>Token name</td><td>The name of the field in the provider's response that contains the access token. Defaults to <code>access_token</code>, which works for most providers.</td></tr><tr><td>Token is returned as querystring</td><td>When checked, indicates that the provider returns the access token in the URL query string rather than the response body.</td></tr><tr><td>Requesting an access token uses Basic Auth</td><td>When checked, the API Connector uses Basic Authentication when requesting the access token.</td></tr><tr><td>Add access_type=offline (Google APIs)</td><td>When checked, adds the <code>access_type=offline</code> parameter to the request. This is specific to Google APIs and is used to receive a refresh token alongside the access token.</td></tr><tr><td>Use a generic redirect URL</td><td>When checked, uses a generic redirect URL for the OAuth flow instead of an app-specific one.</td></tr><tr><td>Login dialog redirect</td><td>The URL the user is redirected to in order to log in and approve permissions. Use square brackets to insert dynamic parameters, such as <code>[client_id]</code>.</td></tr><tr><td>Access token endpoint</td><td>The URL the API Connector uses to exchange the authorization response for an access token.</td></tr><tr><td>User profile endpoint</td><td>The URL used to retrieve the user's profile information after authentication.</td></tr><tr><td>User ID key path</td><td>The key in the user profile response that contains the user's unique identifier. Defaults to <code>id</code>.</td></tr><tr><td>User email key path</td><td>The key in the user profile response that contains the user's email address. Defaults to <code>email</code>.</td></tr></tbody></table>

The exact values for each field come from the provider's documentation, typically as part of registering your app with the service.

**Scope**

The Scope setting determines the level of permissions you are asking for from the external server. Scope settings and how they are specified can vary from provider to provider, so the entries in the list below should be considered examples to illustrate what the scope setting is for:

<table><thead><tr><th width="230">Scope example</th><th>Description</th></tr></thead><tbody><tr><td>admin</td><td>Full administrative access to make changes to a User's resources</td></tr><tr><td>email</td><td>Access to the User's email address.</td></tr><tr><td>profile</td><td>Access to the User's basic profile information such as name, email and profile picture.</td></tr><tr><td>read or readonly</td><td>Permission to read but not modify a user's resources.</td></tr><tr><td>write or readwrite</td><td>Permission to read and modify a user's resources.</td></tr></tbody></table>

Scope parameters are usually separated by a space as in the example below:

```
readonly email
```

{% hint style="warning" %}
Accessing a third-party User profile often means accessing that User's personal information. To respect the User's privacy and minimize the risk of personal data being misused or mishandled, it's important to only request the minimum level of access necessary for your app to work.
{% endhint %}

**Your app's credentials**

The Oauth2 User-Agent Flow involves first authenticating your app as the client[^6] making the request. While these settings can vary depending on the API provider, the most widely used method is to provide two keys for authentication:

<table><thead><tr><th width="157.33333333333331">Key</th><th width="372">Description</th><th></th></tr></thead><tbody><tr><td>Client ID</td><td>This string identifies <strong>who</strong> you are (as the client), which lets the server proceed in determining what you should be given access to.</td><td>The client ID is not considered sensitive data.</td></tr><tr><td>Client secret</td><td>This string is used to cryptographically sign the token request and prove that the request is authentic (since only your app would have that key)</td><td>The client secret key should be kept secret and should not be shared or exposed in any way</td></tr></tbody></table>

Using App ID and App Secret together provides a secure way for the API provider to identify the client (your app) and ensure that it is who it claims to be – all without exposing the two keys to your app's Users.

The two keys are usually generated in the settings of the API provider.

<figure><img src="/files/SyzvqYOPJzvt39jQUU8e" alt=""><figcaption><p>This is what an OAuth2 connection to a Spotify user profile might look like.</p></figcaption></figure>

**Testing the connection**

After configuring the fields, the API Connector requires you to authenticate at least once in run mode before the connection can be used. To do this:

1. Set up a login workflow in your app that triggers the OAuth flow.
2. Preview your app with `debug_mode=true` in the URL.
3. Run the login workflow and complete the authentication with the provider.

Once the access token is received, the connection is marked as valid and calls can be set up against it.

### JSON Web Token (JWT)

A JSON Web Token, or JWT, is a compact, signed token that carries information about the client making the request. Unlike a simple API key, which is just a random string, a JWT is a structured piece of data that includes claims about who the client is, what it's allowed to do, and how long the token is valid.

**How it works**

A JWT is made up of three parts, separated by dots:

* **The header**, which describes the type of token and the signing algorithm used.
* **The payload**, which contains the claims, such as the user's identifier, the issuer, and the expiration time.
* **The signature**, which is generated using a secret key and used to verify that the token hasn't been tampered with.

When the client sends a request, it includes the JWT, typically in the `Authorization` header. The server verifies the signature to confirm the token is valid, reads the claims, and decides whether to allow the request.

Because the token is signed, the server doesn't need to look it up in a database. The information needed to authorize the request is contained in the token itself.

#### **When you'll encounter it**

JWTs are commonly used by services that need to encode user-specific information into the token, such as APIs tied to authenticated user sessions. They're also widely used in modern identity providers and microservice architectures.

If the provider uses JWTs, their documentation will explain how to generate the token, what claims to include, and which signing algorithm to use. JWTs often have a limited lifespan, so check the provider's documentation to see how long tokens remain valid and whether they need to be regenerated periodically.

#### JWT formatting

When using JWT authentication, the token is sent in the `Authorization` header of the request. Most providers expect the token to be prefixed with `Bearer` and a single space, followed by the JWT itself.

The header value should usually follow this format:

```json
Authorization: Bearer <your_jwt_here>
```

For example:

{% code overflow="wrap" %}

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

{% endcode %}

#### Setting it up in the API Connector

To configure JWT authentication, select *JSON Web Token* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

* **Scope.** The scope of access being requested, as defined by the provider. This tells the API what your app is asking permission to do.
* **Iss (account email).** The issuer of the token, typically the email address of the service account associated with the credentials.
* **Access token endpoint.** The URL the API Connector uses to exchange the JWT for an access token. This is provided by the API service.
* **Private key.** The RSA private key used to sign the token. Paste the full key, including the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.\
  \
  Below is a random example, but note that real RSA private keys can be longer:

{% code overflow="wrap" %}

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL
MNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN
OPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP
QRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR
STUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST
UVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV
WXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX
YZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12
-----END RSA PRIVATE KEY-----
```

{% endcode %}

#### Things to keep in mind

* The space between `Bearer` and the token is required. Without it, the provider won't be able to parse the header correctly.
* JWTs are case-sensitive. Copy the token exactly as the provider issues it.
* Most JWTs have an expiration time built into the token's payload. Once expired, the token will no longer be accepted, and you'll need to generate a new one.
* Always check the provider's documentation for the exact header format. Some providers use a different scheme, such as `Token` or `JWT` instead of `Bearer`.

### Client-side SSL certificate

Client-side SSL certificate authentication uses a digital certificate to verify the identity of the client making the request. Instead of sending a token or password, the client presents a certificate that the server checks against a list of trusted certificates. If the certificate is valid and trusted, the request is allowed.

#### How it works

In a standard HTTPS connection, the server presents a certificate to prove its identity to the client. With client-side SSL, the process works in both directions: the client also presents a certificate to prove its identity to the server. This creates a two-way trust relationship.

The certificate is typically issued by a certificate authority or generated by the provider, and it's tied to your account or organization. As long as the certificate is valid, the client is authenticated without needing to send any additional credentials with each request.

#### When you'll encounter it

Client-side SSL certificates are most common with enterprise and financial APIs where strong identity verification is required. Banks, payment networks, healthcare systems, and government services often use this method because it offers a high level of security and doesn't rely on credentials that can be intercepted or guessed.

If a provider uses client-side SSL, their documentation will explain how to generate or request a certificate and how to configure it for use.

#### Setting it up in the API Connector

To configure client-side SSL certificate authentication, select *Client-side SSL certificate* from the *Authentication* dropdown in the collection's settings. The following fields will appear:

* **Certificate file content.** The contents of the SSL certificate file issued by the provider. Paste the full certificate, including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines.
* **Key file content.** The contents of the private key file that pairs with the certificate. Paste the full key, including its header and footer lines, such as `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`.

Both values come from the provider, typically as part of setting up API access for your account. Once configured, Bubble's server presents the certificate and key during each request, authenticating the call without exposing either value to the client.

## FAQ: API Connector authentication

<details>

<summary>What does authentication do in the API Connector?</summary>

Authentication is how the API Connector proves to an external service that your app is allowed to make calls to it. Most APIs require some form of authentication, and the provider determines which method to use. The API Connector applies the configured authentication automatically to every call in the collection.

</details>

<details>

<summary>How do I know which authentication method to use?</summary>

The API provider's documentation specifies which method to use. Look for a section labeled *Authentication*, *API keys*, or *Getting started*. Most modern APIs use either a private key in the header or one of the OAuth2 flows.

</details>

<details>

<summary>What's the difference between a private key in the URL and a private key in the header?</summary>

Both methods send a key to authenticate the request, but the placement is different. A key in the URL is appended as a query parameter, such as `?api_key=...`. A key in the header is sent as part of the request's HTTP headers, typically in `Authorization`. Headers are generally preferred because they're not logged in the same way URLs can be.

</details>

<details>

<summary>What's the difference between the OAuth2 flows?</summary>

Each flow handles authentication in a different way:

* **Password Flow** exchanges a username and password directly for an access token. Used in trusted environments.
* **User-Agent Flow** redirects the user to the provider's login page to grant your app permission. Used when the app acts on behalf of a user.
* **Custom Token** lets you define a custom token request for providers whose flow doesn't fit the standard options.

The provider's documentation will indicate which flow to use.

</details>

<details>

<summary>When should I use *None or self-handled*?</summary>

Use this option when the API doesn't require authentication, or when you need to handle authentication manually on each call. It's also useful when working with custom authentication setups that don't fit any of the predefined methods.

</details>

<details>

<summary>What is a JSON Web Token (JWT) and when would I use it?</summary>

A JWT is a signed, structured token that carries claims about the client making the request. JWTs are commonly used by APIs that need to encode user-specific information into the token, or by services that issue short-lived access tokens. The provider will specify whether JWT authentication is required.

</details>

<details>

<summary>What is client-side SSL certificate authentication?</summary>

This method uses a digital certificate to verify the identity of the client. It's most common with enterprise APIs, financial services, and government systems where strong identity verification is required. The provider issues the certificate and private key, which are configured in the API Connector.

</details>

<details>

<summary>What's the difference between the live key and the development key?</summary>

Some providers issue separate credentials for development and production environments. The development key is used while building and testing your app, while the live key is used in your live environment. Configuring both lets the API Connector use the correct key automatically based on which Bubble environment is running.

</details>

<details>

<summary>How do I keep my authentication credentials secure?</summary>

Configure credentials directly in the API Connector's authentication settings. The API Connector keeps them on the server, so they're never exposed to the client. Avoid storing credentials in option sets, on-page elements, or workflow inputs, since those are visible in your app's source code.

Keep in mind that app collaborators can see your API keys.

</details>

<details>

<summary>Why is my authentication failing after it worked before?</summary>

Common causes include an expired or rotated token, a revoked API key, a changed account password, or a provider updating their authentication requirements. Check the provider's dashboard to confirm the credentials are still valid, and review their documentation for any recent changes.

</details>

<details>

<summary>Do I need to authenticate again every time my app starts?</summary>

For most methods, no. Once configured, the API Connector handles authentication automatically with every call. OAuth2 User-Agent Flow is an exception, since each user authenticates individually through their own login. Normally, providers issue tokens that expire periodically and need to be refreshed.

If the user opens your app on a new device, a new token needs to be issued for that device.

</details>

<details>

<summary>Can I use different authentication for different calls in the same collection?</summary>

Authentication is configured at the collection level, so all calls in a collection use the same method. If you need different authentication for different calls, set them up in separate collections.

</details>

<details>

<summary>What happens if the provider changes their authentication method?</summary>

If a provider updates their authentication requirements, you may need to reconfigure the authentication settings in the collection. Check the provider's release notes or developer documentation for guidance, and update the settings to match the new format.

</details>

<details>

<summary>Can I test authentication without making real API calls?</summary>

Many providers offer a sandbox or test environment with separate credentials. Use these credentials during development to test authentication and call setup without affecting real data. Check the provider's documentation for their sandbox options.

For payment APIs, test environments are especially common, allowing you to process simulated payments with a test card. Payment providers may also reject or flag small and/or repeated payments performed in their live environment. We recommend performing tests in the provider's test/sandbox environment.

If they don't offer a test environment, keep in mind that initializing a call is not a simulated test. Real data is processed.

</details>

<details>

<summary>What happens to test data from initialization calls?</summary>

There are a few things to keep in mind when you are testing authentication and calls with test data:

* **Format:** The test data needs to be properly formatted for the API to recognize.
* **Processing is not simulated:** An initialization call performs the operation you request, potentially affecting real data. We recommend using a test environment, and being careful when running tests within a live environment.
* **Test data is visible in your app's source code:** Keep in mind that test data is visible in your app's source code. Be mindful of what you place in test fields, and consider removing it after the call has been initialized, and before you deploy your app.

</details>

[^1]: The *client* is the system that initiates an API Connection by sending a request, as opposed to the *server* who is the one to receive it and respond.

[^2]: An API resource is a specific item or service that is made available by the API and can be accessed via a unique endpoint.\
    \
    This can be a data type such as *Users* or a specific API Workflow.\
    \
    Article section: [What are resources?](/help-guides/integrations/api/introduction-to-apis#resource)

[^3]: HTTP is a set of rules that governs how data is shared between two apps to make sure both parties understand it.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)\
    Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^4]: *In transit* refers to data while it's being sent between two systems, as opposed to *at rest*, which describes data stored on a server.

[^5]: The *S* in HTTP stands for *secure*. HTTPS ensures security by encrypting the data sent between the client and the server.\
    \
    This encryption is provided by the Transport Layer Security (TLS).\
    \
    Most modern APIs require this encryption, and Bubble handles it automatically.

[^6]: The *client* in an API request is the one to make the request, as opposed to the *server* who is the one to receive it and respond.
