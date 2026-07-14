# The API Connector
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Bubble's API Connector. The API Connector is used to make outbound connections to external applications and use it as a data source or trigger actions.

{% hint style="info" %}
This is our in-depth manual article on the API Connector.\
\
If you are familiar with APIs and want the shorter technical reference go to the [API Connector reference entry](/core-resources/api/the-api-connector). We also have a dedicated article covering [API Connector security](/help-guides/security/api-security/api-connector-security).
{% endhint %}

{% embed url="<https://www.youtube.com/watch?t=745s&v=nO8PSqeJaWk>" %}
Our long-form video course gives you an introduction to how APIs work and how to use the API Connector.
{% endembed %}

In the [Bubble API section](/help-guides/integrations/api/the-bubble-api) we covered API requests that are incoming – they are initiated by an outside system and Bubble takes some kind of action based on their credentials, endpoint and parameters.

In this section we’ll look at requests that are **outbound** – when your Bubble app sends a request to an external system. When you use the API Connector, your Bubble app is the *client* and the API service is the *server*. You can read more about the client/server relationship in our [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis).

Connecting to APIs means working with third-party platforms, each with their own formats and conventions. This guide can't cover every API in detail, but it gives you a framework and the understanding you'll need to approach any of them. Before setting up authentication and calls, take time to study the API provider's documentation thoroughly.

<figure><img src="/files/doPG6C6Ye9dfT1OFV7Bs" alt=""><figcaption><p>The API Connector handles calls that come <em><strong>from</strong></em> your Bubble app <em><strong>to</strong></em> another application.</p></figcaption></figure>

{% hint style="info" %}
**Plugins:** Bubble's plugin store offers thousands of plugins both made by Bubble and the community. Many plugins let you connect to well-known API services quickly and effortlessly without having to set it up in the API Connector.\
\
Link: [Plugin store](https://bubble.io/plugins)\
Article: [Plugins that connect to APIs](/help-guides/integrations/api/plugins-that-connect-to-apis)
{% endhint %}

## How the API Connector works

The API Connector lets you connect your Bubble app to almost any external API. You can set up headers, parameters, and a call body, and each call can be used as an action or as a data source in your app.

> The API Connector lets you set up **outbound API calls,** meaning calls **from** your app to a third party app or system.

This opens up a wide range of possibilities. You can pull live data from external services, such as weather forecasts, stock prices, exchange rates, or social media feeds. You can trigger actions on other platforms, like creating a customer in a CRM, sending a message through a chat service, or generating an invoice. You can also connect to AI services to generate text, analyze images, or translate content, and to payment providers to process transactions.

Anything a service exposes through its API is potentially reachable from your app, which means you can extend your app's capabilities far beyond Bubble's built-in features. By pointing the API Connector to different URLs, you can access specific resources[^1] offered by the API provider. Like incoming requests, these calls can either request data or trigger an action.

Structurally, they look the same as incoming requests: an [HTTP request](#user-content-fn-2)[^2] with a method[^3] such as GET, POST, PATCH, or DELETE.

### What the API Connector can do

The API Connector supports any service that exposes a JSON-based API. You can supply headers, parameters, and a call body, and the response is returned as structured data that Bubble can work with directly.

Each call you set up can be used in one of two ways:

* **As data:** the call returns information that can populate elements in your app. Calls configured this way appear in the *Get data from an external API* option when you click *Insert dynamic data*. For example, you can populate a repeating group with users, tasks or products from a third-party system.
* **As an action:** the call is triggered from a workflow, sending data to the external service or performing some operation on it. Action calls appear in the *API Connections* section of the workflow editor. For example, you can create a database record, communicate with an LLM or post to social media.

<figure><img src="/files/UG9gdU6gph79aodCqP1i" alt=""><figcaption><p>An API call set to <em>Action</em> will show up in the <em>API Connections submenu.</em></p></figcaption></figure>

### How calls are sent

All calls made through the API Connector are routed through Bubble's server by default. This keeps your API credentials, parameters, and other sensitive data secure, since none of it ever passes through the user's device.

It's possible to configure certain calls to run directly from the browser, but for security reasons this option is only available under specific conditions: the call must be public (no authentication), have no headers or private parameters, and be configured as a data call.

Read more in the box below about how to send calls directly from the browser:

<details>

<summary>Sending API calls directly from the browser</summary>

By default, API calls made through the API Connector are routed through Bubble's server, unless configured otherwise.

<figure><img src="/files/TlsF2ZoVq4Xm11bnepKi" alt=""><figcaption></figcaption></figure>

Checking this box allows the call to run directly from the browser instead. This option is only available in specific situations. The call must:

* Be public ([Authentication](/core-resources/api/the-api-connector/authentication) set to *None*)
* Have no [headers](/core-resources/api/the-api-connector/adding-calls#headers) or private [parameters](/core-resources/api/the-api-connector/adding-calls#parameters)
* Be configured as a data call.

For non-sensitive data that doesn't require authentication, such as public weather, map, or currency services, this method can slightly improve performance and reduce the risk of hitting third-party rate limits, since the call would otherwise be sent from Bubble's shared server IP address.

</details>

{% hint style="warning" %}
**Note:** API Connecter calls are by default sent from the Bubble server (for non-[dedicated](/help-guides/bubble-for-enterprise) Bubble apps) and thus susceptible to 3rd party API rate limiting since the rate limit is shared across all Bubble apps.

Consider [sending the call from the browser, when appropriate](/core-resources/api/the-api-connector/adding-calls#allow-call-to-run-directly-in-the-browser), if rate limiting is a concern.
{% endhint %}

{% hint style="warning" %}
Note that even though by default, API calls are made from the server, a *description* of the call is sent to the browser and are thus visible to a savvy user. This means that any sensitive parts of the call, especially secrets / tokens, should be in fields marked "Private".
{% endhint %}

## API Connector quick guide

Connecting your Bubble app to an external API involves a few clear steps. Each one builds on the last, and once you've gone through the process once, you'll find the pattern is similar across most services. This article walks through the workflow at a high level, with links to more detailed articles where relevant.

{% stepper %}
{% step %}

### Understand how API calls work

Before setting anything up, it helps to have a mental model of what's happening behind the scenes. An API call is a single, isolated exchange between two systems. Your Bubble app sends a request to the external service, the service processes it, and a response is returned. Once the response is received, the connection is closed. The next call starts fresh.

This means each call is self-contained. Your app doesn't maintain an open connection to the external service. Instead, every interaction is a brief, structured request and response.

Most API services follow a two-step pattern: first, your app proves who it is through authentication, then it sends individual calls to perform specific actions or retrieve specific data.
{% endstep %}

{% step %}

### Read the API provider's documentation

Every external API is different, and the provider's documentation is the authoritative source on how to connect to it. Before configuring anything in Bubble, take time to read through the documentation for the service you want to connect to. You'll typically be looking for:

* The authentication method the service uses, such as an API key, OAuth, or basic auth
* How to generate the credentials your app will use
* The base URL of the API and the available endpoints
* The HTTP method each endpoint expects, such as GET or POST
* The parameters and headers required for each call
* The structure and format of the response

If this is your first time working with APIs, the documentation can feel dense. Most providers follow similar conventions, so the second and third APIs you set up will feel much more familiar than the first.
{% endstep %}

{% step %}

### Create the API collection

In the API Connector, each external service is configured as a **collection**. Start by adding a new collection and giving it a name, typically the name of the provider, such as *Stripe*, *OpenAI*, or *Google Cloud*. This name is used throughout the editor to organize the calls you'll add later, so choose something easy to recognize.

The collection holds all the calls for that provider, along with any authentication or shared headers and parameters that apply to all of them.
{% endstep %}

{% step %}

### Set up authentication

Most APIs require some form of authentication to verify that your app has permission to access the service. Authentication is configured at the collection level, which means you only set it up once per provider. Once authentication is in place, every call in that collection automatically uses it.

The specific method depends on the provider. Common options include sending an API key in the request header, using basic auth with a username and password, or following an OAuth flow. The provider's documentation will tell you which method to use and how to generate the necessary credentials.

For a full walkthrough of authentication options, see [Authentication](/help-guides/integrations/api/the-api-connector/authentication).
{% endstep %}

{% step %}

### Add the calls

With the collection named and authentication configured, you can start adding individual calls. Each call represents a specific request to the API, such as fetching a list of records, creating a new item, or updating an existing one. You'll configure the HTTP method, the URL, any parameters or headers specific to that call, and decide whether the call is used as data or as an action.

For a detailed walkthrough of adding and configuring calls, see [Adding calls](/core-resources/api/the-api-connector/adding-calls).
{% endstep %}

{% step %}

### Test and initialize

Once a call is configured, it needs to be initialized before it can be used in your app. Initialization runs the call once and reads the response, so Bubble can understand the structure of the data being returned. This is what makes the call available in the editor.

Keep in mind that initialization is a real request to the API. If the call creates, updates, or deletes data on the external service, that change will actually happen. For calls with side effects, you may want to test against a sandbox or test environment if the provider offers one.
{% endstep %}

{% step %}

### Use the call in your app

After a call has been initialized, it's available throughout your app. Data calls appear in the *Get data from an external API* option when inserting dynamic data, while action calls appear in the workflow editor under *API Connections*. From here, the call behaves like any other data source or action in Bubble.
{% endstep %}
{% endstepper %}

## API Connector in-depth guide

The API Connector lets you connect to any service that exposes a JSON-based[^4], [RESTful web API](#user-content-fn-5)[^5]. You can use this to add API calls to fetch data from an external service, or post data to trigger some actions on the service's end.

### **Navigating to the API Connector**

The API Connector is a separate tab found in the left-hand navigation menu:

<figure><img src="/files/rpBS26Rk4LVYuilK9GfB" alt=""><figcaption></figcaption></figure>

### **External API documentation**

Every API provider works a little differently. The endpoints they expose, the way they handle authentication, the parameters they expect, and the structure of the responses they return are all specific to that provider. There's no universal standard you can rely on, which is why the provider's documentation is the single most important resource when setting up an API connection.

That said, most modern APIs follow similar conventions. Once you've set up one working connection, the next one is usually easier. You'll also find that API documentation tends to follow familiar patterns, which makes each new provider faster to read and understand.

<figure><img src="/files/qakXWwnFLZK6GrMVBkrq" alt=""><figcaption><p>API providers like Stripe offer detailed <a href="https://stripe.com/docs">documentation</a> on how to set up API connections.</p></figcaption></figure>

#### Why the documentation matters

The API Connector gives you the tools to make calls, but it can't tell you what to put in them. That information lives in the provider's documentation. Reading it first will save time, prevent guesswork, and help you avoid errors that can be hard to diagnose later. Most issues that come up when setting up an API connection trace back to a missed detail in the documentation, such as a misspelled parameter, the wrong HTTP method, or an authentication header sent in the wrong format.

If you're new to working with APIs, the documentation can feel dense and technical at first. Most providers follow similar conventions, though, and after working through one or two APIs you'll find that the patterns start to feel familiar. Reading API documentation is a skill that gets easier with practice.

#### Where to find the documentation

Most API providers publish their documentation on their own website, usually under a section called *Developers*, *API*, or *Docs*. A quick search for the provider's name followed by *API documentation* will typically lead you straight to it. Larger providers like Stripe, OpenAI, and Google have dedicated developer portals with comprehensive documentation, while smaller services may include their API reference inside their general help center.

If the service offers more than one API, make sure you're reading the documentation for the version you intend to use. APIs often go through major versions over time, and older versions may behave differently or be deprecated.

#### What to look for

When reading API documentation for the first time, focus on the information you'll need to configure the connection in Bubble. This usually includes:

* **Authentication.** How does the provider verify who you are? Look for whether they use an API key, OAuth, basic auth, or another method. The documentation will explain how to generate credentials and where to include them in your requests.
* **Base URL.** Every API has a base URL that all endpoints build on, such as `https://api.example.com/v1`. This is the foundation of every call you'll make.
* **Endpoints.** Each endpoint represents a specific resource or action. Documentation usually lists endpoints by what they do, such as *Create a customer* or *List all orders*. Each one will have its own URL path and HTTP method.
* **HTTP methods.** Endpoints specify which method to use: GET for retrieving data, POST for creating, PATCH or PUT for updating, and DELETE for removing. Using the wrong method is one of the most common reasons a call fails.
* **Required and optional parameters.** Most endpoints accept parameters that shape the request. The documentation will list which ones are required, which are optional, what type of data each expects, and where to include them (header, URL, or body).
* **Request format.** Some APIs expect parameters in the URL as query strings, while others expect them in a JSON body. The documentation will specify the format, and often includes example requests you can use as a reference.
* **Response format.** Look at the structure of the response the API returns. This tells you what data you'll have access to in Bubble after the call runs. Most APIs return JSON, and the documentation will usually include an example response showing every field.
* **Rate limits.** Many APIs limit how many calls you can make in a given time period. The documentation will specify these limits and explain what happens when you exceed them, such as receiving an HTTP 429 error.
* **Error codes.** API providers use standard HTTP status codes, but they often add their own error codes or messages for specific situations. Knowing where to find these in the documentation will save time when troubleshooting.

#### Testing and sandbox environments

Many providers offer a sandbox or test environment where you can make calls without affecting real data. Stripe, for example, provides separate test API keys that work against a sandboxed version of their service. Check the documentation to see whether a sandbox is available, especially if your calls will create, update, or delete data. Testing against a sandbox lets you initialize calls in Bubble and experiment with parameters without worrying about side effects.

#### Tips for reading documentation effectively

Start with the introduction or *Getting started* section, if one exists. This usually gives an overview of the API's structure, authentication method, and common patterns. With that foundation in place, the rest of the documentation will be easier to navigate.

Look for code samples. Most providers include example requests in formats like cURL, JavaScript, or Python. You don't need to know these languages to benefit from the examples. They show you exactly how the request should be structured, which translates directly to what you'll configure in the API Connector.

Bookmark the pages you reference often. When setting up multiple calls for the same provider, you'll likely return to the same endpoint references repeatedly.

Keep the provider's documentation open in a separate tab while you work in Bubble. Switching back and forth is much faster than trying to memorize the details.

If this is your first time working with APIs, the documentation may seem fairly technical at first, but you’ll find that with the RESTful API style most providers follow a similar standard.

#### Test accounts

Many API providers such as Stripe offer a demo account that you can use to test your API calls without making any actual changes (or payments in the case of Stripe). Check whether the service you want to connect to offers this kind of testing environment to be able to properly test all your calls with no risk.

### External developer dashboard

Most API providers offer a developer dashboard, sometimes called an API portal, developer console, or account portal. This is where you manage everything related to your account with the provider, including the credentials your Bubble app will use to authenticate.

#### What the dashboard is for

The exact features vary by provider, but most dashboards let you:

* **Generate and manage API keys.** Create new keys, view existing ones, and revoke keys you no longer need.
* **Set permissions and scopes.** Restrict what each key can do, such as read-only access or access to specific resources.
* **Monitor usage.** See how many calls your app has made, which endpoints are being used, and any errors that have occurred.
* **Configure rate limits and quotas.** Some providers let you adjust limits or request increases through the dashboard.
* **Manage billing.** View costs, set spending limits, and add or change payment methods for paid APIs.
* **Switch between environments.** Access separate dashboards or modes for development and production credentials.
* **Set up webhooks.** Configure endpoints in your app that the provider can send incoming requests to.

#### Why it matters

Anything you configure in the API Connector relies on credentials and settings that originate in the developer dashboard. If a call fails, the dashboard is often the first place to check. You can usually see whether the key is still valid, whether the call hit a rate limit, or whether the provider returned a specific error.

The dashboard is also where you'll generate the credentials you need for setting up authentication in Bubble. Treat it as the source of truth for everything tied to your account with the provider.

#### A note on terminology

Providers use different names for this part of their service. Stripe calls it the Dashboard, Google has the Cloud Console, OpenAI uses Platform, and others use names like Developer Portal or Account Settings. They all serve a similar purpose, but where to find them and what they include varies. The provider's documentation will usually link to the dashboard from the introduction or *Getting started* section.

### API collections

Each API you add through the API Connector comes from a provider; the company or service that exposes the API. For example, OpenAI and Anthropic provide LLM endpoints, Stripe provides payment services, and Google and Facebook provide authentication services.

Each of these providers are usually added as an **API Collection**. API collections serve two purposes:

* **Sorting:** Sorting multiple calls from the same provider in a folder
* **Shared authentication:** Setting up authentication on the provider level, so you set it up once and apply it across all the calls in that collection.

In most cases, authentication is configured at the provider level and applies to all endpoints from that provider. For example, you only need to set up authentication for Stripe once to access all of their endpoints. Each provider you connect to is listed as an API collection in the sidebar on the left. Click on a collection to see its list of calls.

<figure><img src="/files/WYtWnrnYFc3Pv609Wye7" alt=""><figcaption></figcaption></figure>

#### **Naming an API collection**

Clicking *+ New* adds a new collection and prompts you to give it a name — typically the name of the provider, such as Stripe, Google Cloud, or OpenWeatherMap.

<figure><img src="/files/92cEXUoDLftt2epyoDCz" alt="" width="304"><figcaption><p>After adding a new API collection, give it a name that identifies the provider.</p></figcaption></figure>

The name is used throughout the editor to organize the API calls you add to the collection, so choose something that makes them easy to identify later.

{% hint style="danger" %}
The API name becomes part of your application’s client-side code and should not contain any sensitive information.
{% endhint %}

### **Authentication**

As we covered in our general guide on how APIs work, many API services will require authentication[^6]. This is the process of identifying **who** the client is in order to determine **what resources** it should have access to.

### Authentication methods

There are many different ways to authenticate. Most API providers will have documentation available online that specifies their authentication method and many require you to generate a unique API token.

{% hint style="info" %}
The list below represents the most common authentication types. You can read more about each type in the article below:\
\
Article: [Authenticating with the API Connector](/help-guides/integrations/api/the-api-connector/authentication)
{% endhint %}

<table><thead><tr><th width="259">Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#none-or-self-handled">None or self-handled</a></td><td>No authentication required, or authentication set up manually.<br><mark style="color:orange;">⚠️ (see security note</mark> <a href="#security-risk-with-api-connector-configuration"><mark style="color:orange;">below</mark></a><mark style="color:orange;">)</mark></td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#private-key-in-url">Private key in URL</a></td><td>The private key is included as a parameter in the URL.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#private-key-in-header">Private key in header</a></td><td>The private key is included as an HTTP header in the request.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#http-basic-auth">HTTP Basic Auth</a></td><td>The client sends username and password in plain text.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#oauth2-password-flow">OAuth2 Password Flow</a></td><td>The client sends username and password and receives an access token in return.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#oauth2-user-agent-flow">OAuth2 User-Agent Flow</a></td><td>Similar to OAuth2 Password Flow, but uses a third-party login page instead.<br><mark style="color:orange;">⚠️ (see security note</mark> <a href="#security-risk-with-api-connector-configuration"><mark style="color:orange;">below</mark></a><mark style="color:orange;">)</mark></td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#oauth2-custom-token">OAuth2 Custom Token</a></td><td>The client sends a custom token to the server for verification.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#json-web-token-jwt">JSON Web Token (JWT)</a></td><td>The client sends a JSON web token to the server for verification.</td></tr><tr><td><a href="/pages/Ffb0AEmEdQzN6myqiLzg#client-side-ssl-certificate">Client-side SSL certificate</a></td><td>The client presents a SSL certificate to the server for verification.</td></tr></tbody></table>

<details>

<summary><mark style="color:orange;">⚠️</mark> Privacy considerations when using the API Connector as data</summary>

#### Scenario

When configuring API calls in the API Connector as Data (i.e. “Use as: Data”\ <img src="/files/Gg2rZHMJRDyUl6Nubcdq" alt="" data-size="line"> ) there is a potential security risk if the Authentication method is set to either:

* `None or self-handled`
* `OAuth2 User-Agent Flow`

…and the API relies on private keys or other sensitive parameters passed as query strings or body parameters.

#### Behavior to be aware of:

In these configurations, Bubble does not enforce privacy rules or validate these requests against the current database state. As a result, sensitive data may be exposed or become accessible to users who should not have access. We suggest the configuration below to ensure stronger control over access.

**Recommended solution:**\
To mitigate this risk, do not only pass private keys as parameters. Instead, use the `Private key in header` authentication method in the API Connector. This ensures:

* The key is securely stored and only sent from the server.
* Bubble’s server-side logic handles the call and can enforce privacy rules.

</details>

### **API tokens and security**

{% hint style="warning" %}
We recommend learning how to set up the API Connector in a secure way. If you want to learn more about this, check out our dedicated article on API Connector security.

Article: [API Connector security](/help-guides/security/api-security)
{% endhint %}

If you're new to working with APIs, it's worth emphasizing the importance of keeping your API tokens secret. API tokens serve the same basic function as a username and password: they identify who's making the request (authentication) and grant access to specific resources (authorization).

But they offer a few advantages that make them better suited to machine-to-machine communication.

**They can be easily generated and revoked.** Unlike a username and password, which are typically tied to a specific person, API tokens can be created and revoked on demand. If a token is compromised or no longer needed, it can be invalidated immediately without affecting the rest of your account. Many providers also let you generate multiple tokens with different permissions, so you can scope each one to a specific app or use case.

**They are more secure.** Tokens are typically long, random strings that are far harder to guess or brute-force than a human-chosen password. Many providers also let you rotate tokens regularly, which limits the damage if one is exposed.

**They are easier to work with.** Tokens don't require special handling like a password might, such as prompting for input or managing user sessions. This makes them well suited to automated processes and integrations.

That said, a token is only as secure as the person managing it. Tokens for sensitive services like Stripe, payment processors, or anything tied to user data should be treated with the same care as a master password.

A few best practices to keep in mind:

* Never store tokens in option sets, on-page elements, or workflow inputs, since these are visible in your app's client-side source code.
* Configure tokens directly in the API Connector with the field marked as *Private*. This keeps them on the server.
* Rotate tokens periodically, especially after team changes or any suspected security incident.
* Use the most restrictive permissions the provider offers. If a token only needs read access, don't grant it write access.
* If a token is ever exposed, revoke it immediately and generate a new one.
* Remember the collaborators can see your API connector configuration. Consider removing your live token while you have a collaborator working in your app, and insert it again after removing them.
* Outside of Bubble, we recommend storing tokens in an encrypted password manager. Avoid storing it in plaintext in documents, notes or in hand-writing. Do not share tokens in an email, direct message or with an LLM.

### Shared headers

Shared headers are headers that apply to every call within a collection. Once added to the collection's shared headers section, they're automatically included with every request, so you don't need to repeat them on each individual call.

Shared headers are useful when the same value needs to accompany every call to the provider. The most common use case is authentication. For example, if a provider requires an `Authorization` header with a bearer token on every request, adding it as a shared header means it's applied automatically across all calls in the collection.

Another common example is the `Content-Type` header, which tells the provider how the request body is formatted. If every call to the API sends JSON, setting `Content-Type: application/json` as a shared header saves you from configuring it on each call individually.

#### When to use shared headers

Use shared headers for any header that:

* Applies to all calls in the collection
* Doesn't change between calls
* Is required by the provider

If a header is only relevant to one or two specific calls, it's better to add it directly to those calls rather than including it as a shared header.

{% hint style="info" %}
There's no functional difference between sending a header from one place or the other. The choice comes down to organization and avoiding repetition.
{% endhint %}

### Shared parameters

Shared parameters work the same way as shared headers, but they're added to the body of the request rather than the header. Once configured at the collection level, they're automatically included in every call within that collection.

Shared parameters are static, meaning their values are set once and don't change between calls. Because they can't be assigned dynamically from the editor, they're kept on the server and never exposed to the client. This makes them well suited to storing values you want to apply across all calls without revealing in your app's source code.

#### **When to use shared parameters**

Use shared parameters for any value that:

* Applies to all calls in the collection
* Doesn't change between calls
* Belongs in the request body rather than the header

If a parameter is only relevant to specific calls, or if it needs to be assigned dynamically, add it at the call level instead.

### **Adding calls**

Now that we have 1) given our API service a descriptive name and 2) authenticated as a client (if necessary) it’s time to add the actual calls.

<figure><img src="/files/8Nz3kPwKR43V1PYViK6v" alt="" width="350"><figcaption></figcaption></figure>

Give the call a descriptive name that works together with the provider name to identify what it does. For example, a provider named *Stripe* and a call named *Create payment*. Then use the *Use as* dropdown to tell Bubble how this call will be used.

#### Use as

The *Use as* dropdown lets you select whether to use that particular API call as a data source or an action:

<figure><img src="/files/t4coFyw6otZaKYTSFHTJ" alt="" width="405"><figcaption><p><em>Use as</em> instructs Bubble to use the call as a data source, or an action.</p></figcaption></figure>

#### Data

Selecting *Use as data* tells Bubble to treat the API call as a data source, used for retrieving data to display in your app. Calls configured this way are available as *Get data from an external API* in the data source dropdown.

<figure><img src="/files/2ac76c6qn491WDeGCIrQ" alt=""><figcaption><p>In this example, <em>Get data from an external API</em> is selected as the data source to populate a repeating group with results from an API call.</p></figcaption></figure>

#### Action

Use as action makes the API call available as an action in your Workflow editor. You will find API action calls in the workflow editor under *API Connections*.

<figure><img src="/files/NJDIDVpkq7xC28NoQym4" alt=""><figcaption></figcaption></figure>

### **The HTTP method**

When a call is made to a specific resource[^7], we need to specify an [HTTP method](#user-content-fn-8)[^8] that tells the server what kind of action we want to initiate. The five most used HTTP methods are:

<table data-header-hidden><thead><tr><th width="134"></th><th></th></tr></thead><tbody><tr><td><strong>Action</strong></td><td><strong>Description</strong></td></tr><tr><td>GET</td><td>Retrieve data</td></tr><tr><td>POST</td><td>Create data</td></tr><tr><td>PUT</td><td>Update data</td></tr><tr><td>PATCH</td><td>Replace data</td></tr><tr><td>DELETE</td><td>Delete data</td></tr></tbody></table>

HTTP methods are sometimes called *HTTP verbs*. Generally they are used as illustrated in the table above, but to find the correct HTTP method for the resource you want to access, check the API providers documentation.

<figure><img src="/files/5tYoAtVD8B99NIE3b1VW" alt="" width="539"><figcaption></figcaption></figure>

#### HTTP method examples

The examples below illustrate how HTTP methods would be used in a few different scenarios. Let's say you are connecting to a CRM and want to interact with users stored in that system. Different HTTP methods would be needed for the server to understand your request:

<table><thead><tr><th width="289.32421875">Resource</th><th>HTTP method</th></tr></thead><tbody><tr><td>Send a list of users</td><td>GET</td></tr><tr><td>Send info about one user</td><td>GET</td></tr><tr><td>Create a new user</td><td>POST</td></tr><tr><td>Make changes to a user</td><td>PUT</td></tr><tr><td>Replace a user</td><td>PATCH</td></tr><tr><td>Delete a user</td><td>DELETE</td></tr></tbody></table>

### **The API endpoint**

In our [general article on APIs](/help-guides/integrations/api/introduction-to-apis) we explored how a [RESTful API](#user-content-fn-9)[^9] call uses a URL to identify a specific resource. Every API call you make targets an endpoint, and the endpoint determines what the call does.

You can think of an endpoint as an address. Just as a street address points to a specific building, an endpoint points to a specific resource on the provider's server. Different endpoints handle different parts of the service.

#### The structure of an endpoint

An endpoint is made up of two parts:

* **The HTTP method**, such as GET, POST, PATCH, or DELETE, which tells the server what kind of action you want to perform.
* **The URL**, which identifies the resource the action applies to.

Together, the method and the URL form a unique endpoint that defines a specific request. The same URL can support multiple endpoints depending on the method used. For example, a GET request to `/users` might return a list of users, while a POST request to `/users` might create a new one. The URL is the same, but the method changes what the call does.

#### Finding the right endpoint

Each API provider documents the endpoints they offer, usually grouped by resource type. For example, a payment provider might have endpoints for customers, charges, subscriptions, and refunds. The documentation will list the URL, the HTTP method, and the parameters each endpoint expects.

When setting up a call in Bubble, you'll typically copy the endpoint URL from the provider's documentation and configure the matching HTTP method in the API Connector.

#### Base URLs

Most APIs use a base URL that all endpoints build on. For example, if the base URL is `https://api.example.com/v1`, then the full URL for a *List users* endpoint might be `https://api.example.com/v1/users`. The base URL stays the same across all endpoints, while the path after it changes depending on the resource.

Some providers version their APIs in the base URL, such as `/v1` or `/v2`. This lets them introduce changes without breaking existing integrations. Always check the documentation to make sure you're using the version the provider recommends.

<figure><img src="/files/Uc9KtgOGg7i1UAnYkSaz" alt="" width="563"><figcaption></figcaption></figure>

### Initializing a call

Once a call is configured in the API Connector, it needs to be initialized before it can be used in your app. Initialization is a one-time step that sends a real request to the provider and reads the response. Until a call is initialized, it won't appear in the editor as a data source or action.

{% hint style="danger" icon="lock" %}
The test data that you enter in the *value* field of a parameter, is visible in your app's code unless the *Private* box is ticked. You should remove any sensitive data from this field before you deploy.
{% endhint %}

#### What initialization does

Initialization serves three purposes:

* **It verifies the call works.** Running the call confirms that the URL, HTTP method, headers, parameters, and authentication are all configured correctly. If anything is wrong, the provider returns an error that helps pinpoint the issue.
* **It reads the response structure.** Bubble inspects the JSON returned by the provider and uses it to map the available fields. This is what makes the data accessible in the editor through dynamic expressions.
* **It registers the call in your app.** After initialization, the call becomes available as a data source or workflow action, depending on how it's configured.

{% hint style="warning" %}
**Initialization sends a real request:** Initialization isn't a simulation. The call runs against the live API, which means any side effects happen for real. If the call creates a record, the record is created. If it deletes data, the data is deleted. For calls that modify or remove data, this is something to be mindful of, especially when working against a production environment.

If the provider offers a sandbox or test environment, use it during initialization to avoid affecting real data.
{% endhint %}

#### Handling required parameters

Some calls require parameters with a non-empty value. To initialize these calls, set a temporary placeholder value, run the initialization, and then clear the placeholder. The call will remain initialized even after the value is removed.

{% hint style="warning" icon="lock" %}
**Test values:** Test values entered in parameter fields are visible in your app's source code unless the parameter is marked as *Private*. Always remove sensitive test data before deploying.
{% endhint %}

#### When to re-initialize

If you change the structure of a call, such as adding or removing parameters or modifying the response format on the provider's side, you'll need to re-initialize the call so Bubble can read the updated response. Re-initialization works the same way as the first run and sends another live request to the provider.

#### Reading the response

After a successful initialization, the API Connector displays the response from the provider. You can view it as structured data, which shows the fields Bubble has identified, or as raw output, which shows the unprocessed JSON. Reviewing the response is a good way to confirm that the data you expect is being returned and that the structure matches what you'll need in your app.

#### Automatic JSON Parsing

When you initialize a call, Bubble reads the response and walks its full structure, including nested objects and arrays, creating a typed field for each value. This now extends to JSON that arrives as text. When a field contains a valid JSON string, Bubble detects it, parses it, and exposes the fields inside it, the same way it handles JSON that was returned natively.

This is most useful when connecting to AI providers. LLM APIs such as OpenAI and Anthropic commonly return their structured output as a JSON string nested inside the response, usually in the response's `choices`' first item's `message`'s `content`. Bubble now parses that string and exposes the fields inside it (for example `property_type`, `estimated_price`, a list of `features`, and a nested `location` object) directly on the original call.

{% hint style="info" %}
**In previous versions:** A field containing a JSON string was only available as plain text. To read the values inside it, you had to send the string to a second API call pointed back at your own app, return it verbatim, and initialize that call so the API Connector could detect the shape. That workaround is no longer necessary.
{% endhint %}

**The JSON field type**

Each field in the response has a type dropdown that tells Bubble how to interpret the value. JSON is now an option in that dropdown.

* For new calls and when you re-initialize, a field whose value is valid JSON defaults to the JSON type, and its nested fields are exposed automatically.
* Existing calls are not affected. Each field keeps its current type until you re-initialize the call or change the dropdown yourself.
* Switching a field to text returns the raw, unparsed JSON string. Switching a text field that contains valid JSON to `JSON` parses it and exposes the nested fields.

#### Choosing which fields to include

Every field Bubble detects, including the nested fields inside a parsed JSON value, is included by default. Use the checkbox next to a field to exclude any you do not need. Excluding fields keeps the expression menus focused on the data you actually use and does not change the underlying response.

{% hint style="info" %}
This checkbox replaces the older option for ignoring a field that previously lived in the type dropdown.
{% endhint %}

#### Raw body text

When you initialize a call, the API Connector shows both the structured response and the raw body text returned by the provider. The raw body text is the unprocessed response, exactly as the provider sent it, before Bubble parses it into fields you can reference in dynamic expressions.

**Why the raw response is useful**

The structured view shows the data Bubble has identified and mapped, which is what you'll typically use when building your app. The raw view is useful in a few specific situations:

* **Troubleshooting unexpected results.** If a field isn't appearing where you expect, or a value looks wrong, the raw response shows exactly what the provider returned. This makes it easier to spot mismatches between the documentation and the actual response.
* **Inspecting nested or complex structures.** Some responses include deeply nested objects or arrays that aren't fully captured in the structured view. The raw response shows the complete structure, which can help you understand what's available.
* **Verifying response format.** If you're working with a provider whose response varies depending on the request, the raw response lets you confirm what's being returned in each case.

#### Setting up a manual call response

{% hint style="warning" %}
**Advanced feature:** A manual response is only a placeholder. It tells Bubble what to expect, but doesn't reflect what the API will actually return. Make sure the structure matches the real response, and re-initialize the call with a live request before using it in production.
{% endhint %}

Sometimes you'll want to test a call without actually sending a request to the provider, or define a sample response manually instead of relying on initialization. The API Connector supports this by letting you provide a manual response for the call.

Manual responses are useful in a few specific situations:

* **The endpoint isn't available yet.** You may want to start building against an API before the provider has finished implementing the endpoint, or before your access has been approved.
* **The call has side effects you want to avoid.** For calls that create, update, or delete data, a manual response lets you initialize the call without affecting the provider's system.
* **You're working with a paid API.** Some calls cost money to run, and a manual response lets you set up the call structure without incurring charges during development.

Instead of sending a real request, you paste a sample response that matches the structure of what the API will return. Bubble reads the sample, maps the available fields, and makes the call available in the editor just as if it had been initialized normally.

The sample should match the actual API response as closely as possible. If fields are missing or named differently, the call won't behave correctly when the live response comes in.

Once the API is available and you're ready to use real data, re-initialize the call with a real request. The API Connector updates the response structure with the live data, and the call behaves like any other initialized call from that point on.

<details>

<summary>Case: Setting up Google Translate in the API Connector</summary>

To have a closer look at how the API Connector works in practice, you can check out our guide on how to connect to Google Cloud to utilize the Cloud Translation API.\
\
Article: [Case: Connecting to Google Translate with the API Connector](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate)

</details>

## FAQ: API Connector

<details>

<summary>What is the API Connector?</summary>

The API Connector is a built-in tool in Bubble that lets your app communicate with external services through their APIs. It's used to fetch data from outside sources, trigger actions on other platforms, or both.

</details>

<details>

<summary>What kinds of APIs can I connect to?</summary>

The API Connector works with any service that exposes a JSON-based, RESTful API. This covers the vast majority of modern APIs, including payment services, AI platforms, CRMs, communication tools, weather services, and more.

</details>

<details>

<summary>Do I need a plugin to connect to an external service?</summary>

Not necessarily. The API Connector lets you connect to almost any external API directly, without a plugin. That said, Bubble's plugin store includes plugins for many popular services that handle the setup for you. If a plugin exists for the service you want to use, it can save time. The API Connector is the right choice when no plugin exists, when you need full control over the configuration, or when you need to access endpoints not covered by an existing plugin.

</details>

<details>

<summary>Should I use a plugin or set up the API Connector manually?</summary>

If a plugin already exists for the service you want to connect to, it's usually faster to use it. Plugins handle authentication and call setup for you. Use the API Connector when no plugin exists, when you need full control over the call's configuration, or when you need to access endpoints not covered by an existing plugin.

</details>

<details>

<summary>Where do I find the information I need to set up an API call?</summary>

In the API provider's official documentation. Each provider documents their available endpoints, the HTTP method to use, required parameters and headers, authentication method, and the structure of the response. Reading the documentation first will save time and prevent confusion later.

See more in the [Read the API provider's documentation](#read-the-api-providers-documentation) section above.

</details>

<details>

<summary>What's the difference between using a call as data and as an action?</summary>

A call set to *Use as data* returns information that can populate elements in your app, such as a list of records or a single value. It appears under *Get data from an external API* in the data source dropdown.

A call set to *Use as action* is triggered from a workflow to perform an operation on the external service, such as creating a record or sending a message. It appears in the workflow editor under *API Connections*.

</details>

<details>

<summary>How are API calls processed?</summary>

By default, all API calls made through the API Connector are routed through Bubble's server. This keeps your API credentials, parameters, and other sensitive data secure, since none of it passes through the user's device. Certain calls can be configured to run directly from the browser, but only under specific conditions.

</details>

<details>

<summary>Why do I need to initialize a call?</summary>

Initialization runs the call once so Bubble can read the response and understand the structure of the data being returned. This is required before the call can be used in your app. It also confirms the call works and surfaces any error messages from the provider.

</details>

<details>

<summary>Does initialization make a real request?</summary>

Yes. Initialization sends an actual request to the external service. If the call creates, updates, or deletes data, that change will happen on the provider's side. For calls with side effects, consider using a test or sandbox environment if the provider offers one.

</details>

<details>

<summary>How do I keep API keys and tokens secure?</summary>

Treat API keys as sensitive credentials. Configure them directly in the API Connector, which keeps them on the server and out of your app's source code. Never store API keys in option sets, on-page elements, or workflow inputs, since these are visible in the client-side code.

</details>

<details>

<summary>What's the difference between a header and a parameter?</summary>

Headers carry metadata about the request, such as the content type or authentication credentials. Parameters carry the actual data being sent or used to identify a resource. The provider's documentation will specify which information belongs where.

</details>

<details>

<summary>When should I use shared headers and shared parameters?</summary>

Use shared headers and parameters when the same information needs to be included in every call within a collection. This saves you from configuring the same fields repeatedly. Authentication tokens and content type headers are common examples.

</details>

<details>

<summary>What does the Private checkbox do?</summary>

When *Private* is checked, the parameter is kept on the server and never exposed to the client. The value is sent directly from Bubble's server to the API. Use this for any sensitive information, such as API keys or secret tokens, and for any value that shouldn't be visible in your app's source code.

</details>

<details>

<summary>Can I test calls without using real data?</summary>

Many API providers offer sandbox or test environments where you can make calls without affecting real data. Stripe, for example, provides a separate set of test API keys for development. Check the provider's documentation to see whether a sandbox is available.

</details>

<details>

<summary>What if my API call returns an error?</summary>

Common causes include an invalid or expired authentication token, a missing required parameter, an incorrect endpoint URL, or test data left in a parameter field. The response usually includes an error message from the provider with details about what went wrong. Reviewing the provider's documentation alongside the error message is the fastest way to identify the issue.

</details>

<details>

<summary>Can I use the same API across multiple Bubble apps?</summary>

Each app maintains its own API Connector configuration. Collections, authentication, and calls don't carry between apps, so you'll need to set them up separately in each app that uses the API. Note that you can copy/paste collections and calls across apps on the same account.

</details>

<details>

<summary>What happens if the external service is down?</summary>

If the external API is unavailable, your call will fail and return an error. Workflows that depend on the call won't complete successfully. For critical functionality, consider building error handling into your workflows to handle these cases gracefully, such as showing a fallback message or retrying after a delay.

</details>

<details>

<summary>Does the provider know my calls are coming from Bubble?</summary>

The provider sees the request as coming from Bubble's server, since that's where the call originates. The request includes standard HTTP headers, but the provider has no special way to identify that the call was made from a Bubble app. Check the provider's terms of service if you have specific concerns about how they identify or rate-limit traffic.

</details>

<details>

<summary>How do I receive incoming requests from an external service?</summary>

The API Connector handles outbound calls only. To receive incoming requests, such as webhooks from an external service, use Bubble's Workflow API. This lets you create endpoints that external services can call to trigger backend workflows in your app.

</details>

<details>

<summary>Can I see what data is being sent and received?</summary>

Yes. When you initialize a call, Bubble shows the response from the server, including both structured and raw data. For ongoing debugging, the browser's developer tools and your provider's API logs are useful for inspecting what's being sent and received.

</details>

<details>

<summary>Are there limits on how many API calls I can make?</summary>

Bubble doesn't impose hard limits on the number of API calls you can make, but each call consumes workload. The external provider may also have rate limits on their end. Check the provider's documentation for their specific limits, and design workflows to stay within them.

</details>

<details>

<summary>Can I set up webhooks to receive data from external services?</summary>

The API Connector handles outbound calls only. To receive incoming requests from external services, use Bubble's [Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api). This lets you create endpoints that external services can call to trigger workflows in your app.

</details>

[^1]: A resource is a specific piece of data or functionality that can be accessed through the API.\
    \
    Article section: [What are resources?](/help-guides/integrations/api/introduction-to-apis#resource)

[^2]: An HTTP request is the technical term for the protocol that is being used in an API call.

    The HTTP protocol is used to ensure that the client and the server are communicating in the same "language" so that the call is successful.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)\
    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^3]: The HTTP method (sometimes called HTTP verb) is the instruction that tells the server what action to take. It is a part of the endpoint of every RESTful API call.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

    Article section: [The HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)

[^4]: JSON is a lightweight data interchange format typically used in Javascript. It uses human-readable text to transmit data objects that consist of attribute–value pairs and array data types.\
    \
    It is used both in incoming API Connections and outbound API Connections (The API Connector).\
    \
    Article section: [What is the JSON format?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-json-format)<br>

[^5]: REST, or Representational State Transfer, is not actually a protocol, but more of a set of guidelines that define how a client and server should interact with each other.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

[^6]: Authentication is the process of identifying **who** a client is in order to determine what resources they should be given access to.\
    \
    Article: [Authentication in the API Connector](broken://pages/PxwRJnjJUYOKeSq3y7Kb)

[^7]: A resource is a specific piece of data or a service that's made available by an API and can be accessed via a unique endpoint or URL using methods such as GET, POST, PUT, and DELETE.

[^8]: The HTTP method is sent along with an API request to instruct the server on **what** actions we want to take.\
    \
    It is part of the HTTP protocol.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)\
    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)\
    Article section: [The HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)

[^9]: REST, or Representational State Transfer, is a way to structure API Calls to make sure they are compatible with other systems using the same architecture.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)
