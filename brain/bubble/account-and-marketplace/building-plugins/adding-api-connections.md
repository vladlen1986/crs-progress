# Adding API Connections
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/adding-api-connections · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<details>

<summary>System hard limits</summary>

When creating plugins for Bubble, it's important to be mindful of the Bubble's hard system limits. These constraints for plugin development mirror those present in general Bubble development. The article below covers this subject:

Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

</details>

API calls are a way to get data from external services or trigger some actions on the service's end (send a message, charge a card, etc.). Usually (but not always), the first type of calls are going to be GET requests, while the second one is a POST. A call usually requires some authentication, so that the service identifies who is calling it (and may charge per call, etc.). You add such calls in the API Tab of the Plugin Editor. This is where you will define how the calls are authenticated, and which calls are used as data sources or as actions.

{% hint style="warning" %}
**Note:** If an API call takes longer than 150 seconds to complete, Bubble will automatically retry this call. This is relevant if you're handling actions like sending emails where it may take more than 150 seconds to receive confirmation back from the service that the action has been completed. This may result in additional emails being sent if confirmation has not been processed.
{% endhint %}

You can see an example of the implementation of call of the iTunes API [here](https://bubble.io/plugin_editor?id=1487181547537x364191731148390400\&tab=tabs-3).

Implementing API connections can be different based on the API. While most APIs follow a few standards, if you hit some issues, we recommend reaching out to the API provider, and asking for help on the forum.

![](/files/-M5sc6FQ_wufIV7QPBlz)

## Authentication

Designing the calls starts with the authentication method, which will sign the calls in Run-mode. Authentication can be done in several, standard, ways. Note that whenever you're building an API connection with some keys, you will need to enter some actual keys to test. These keys are only saved to help you work on your plugin. They will never get sent to users that use your plugins. Instead, they will have to enter their own API keys in the Plugins tab of the editor.

### No authentication

Nothing is added to call, or you are handling authentication with custom parameters and handlers. Note that we do not recommend handling authentication yourself, and instead use Bubble's built-in authentication system for a more secure connection.

### Private key in URL

A key is added in the URL, the key name can be modified in the editor.

![](/files/-M5smv8bNfrABPMIq1Cj)

### Private key in header

A key is added in the headers of all requests. It is very similar to the previous option. Very often, the header will look like `Authorization: KEY`, but you can customize the name `Authorization` if needed.

### HTTP Basic Auth

A username/password will be sent with each request, according to the HTTP Basic Auth protocol (see [this](https://en.wikipedia.org/wiki/Basic_access_authentication)).

![](/files/-M5sc6FUtzV5iRW9O6B7)

### Oauth2 Password Flow

A password and a user name is used to get a token (see [this](http://oauthlib.readthedocs.io/en/latest/oauth2/grants/password.html) for general information about this flow), that can expire and that is renewed automatically by your app. The token is returned when calling an endpoint that you'll need to fill in the Editor. The endpoint can be found in the API documentation. Search for 'token' or 'OAuth Bearer token' in the documentation.

![](/files/-M5smv8fsTaWEjQVBWon)

### Oauth2 Custom Token

This flow is similar to the Password flow, but lets you define the call that returns the token yourself, in case it's not following the standard approach covered above. The token will be added to calls as a Bearer Token and will automatically be renewed when necessary. Note that to function, the token should be returned as an object with two keys (at least), `access_token` and `expires_in` .

### Oauth2 User-Agent Flow

This flow is the way most services connect when you use the API on behalf of the user (Facebook, Pinterest, Google, etc.). It will let you have access to users data when using the API (such as a profile name for Facebook). Setting such a service up will involve a few steps, as you will need to authenticate with your own account to be able to make authenticated calls in edit mode and initialize calls.

You usually start by setting an 'app' with the service you want to authenticate with. This service will then provide after this is set up a Client ID and a Secret that your app will use to communicate with the service.

You first need to fill the few pieces information and endpoints that are needed to get the token and the user ID. This endpoint will be used to generate the token, and retrieve the identity of a user with the service. All this information will be found in the API documentation. When you look at such documentation, we recommend looking for the section without SDK, but the web/HTTP section of it).

* Scope: each Oauth2 provider will require you to enter a scope, that defines the level of permissions you are asking for from your users. It can be readonly, write, send-messages...
* Login Dialog redirect: this the URL that will take the user to the service to authorize your app (and maybe login first to the service). It often will look like `https://www.facebook.com/v2.8/dialog/oauth`
* Access token endpoint is the URL that is used server side to get from a temporary code to an access token. For Facebook, is is `https://graph.facebook.com/v2.8/oauth/access_token`.
* User profile endpoint is the URL you use, once authenticated, to retrieve the current user's profile. This will include an ID, and usually an email (except if the service doesn't provide the email via the API). For Facebook, such URL is `https://graph.facebook.com/v2.7/me` (the 'me' is a common pattern).. In some cases, if the ID isn't returned at the top level of the response to the previous URL, or has a different key than 'id', you can overwrite this in the two settings under the endpoint box.

Here is what authentication for Spotify looks like:

![](/files/-M5sc6FYA-Wzn7irAy3X)

In the case of Oauth2 User-Agent Flow, you'll need to authenticate yourself with your own personal account to be able to initialize the calls. A button will prompt you to go through the flow, and will save the token once you have gone through the process. Here again, your personal identity and credentials with the service will not be shared with users that use your plugin.

### JSON Web Token

Some services use this more advanced [protocol](https://jwt.io/) to handle scope and permissions. This is usually for enterprise-type services, like Box or Google Cloud. To authenticate with such a service, you will need to enter the scope, the email that is used to set up the service account and the endpoint that returns the token. You will also need to enter the private RSA key that the service is providing to set up the connection. Note that the key should be formatted as, including the '-----BEGIN RSA PRIVATE KEY-----' and '-----END RSA PRIVATE KEY-----'.

```javascript
-----BEGIN RSA PRIVATE KEY-----
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
................................................................
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-----END RSA PRIVATE KEY-----
```

## Shared Headers

If you need to add some shared headers to all calls, including the authenticating ones, you can define them in the following section. Note that the value you will set here can be 'hidden' or 'secret'. Hidden settings will be hardcoded by you, as the plugin builder, and plugin users will not fill this key. Most of the time, this is used for technical headers, like a content-type, etc. The secret type will prompt your plugin users to enter a key in the Plugins Tab.

## Defining the call endpoint

Once you have properly entered authentication information, you can start setting up your calls. You start by defining the request method, copy the endpoint that should be hit, and define the different parameters that the user will have to fill. Note that if you enter a part of the URL between \[ and ], the value in between will be a parameter.

Parameters can be of several types: public, hidden or secret.

* Public parameters will be modified by the user at the call level (that's for instance a term for query API call).
* Hidden parameters are for the plugin builder, and won't be exposed to the user that uses the plugin. For instance, it can be an encoding type, etc.
* Secret parameters are good for keys, etc. Users will enter these in the Plugins Tab of the editor.

![](/files/-M5sc6F_IMW5vOt91OY3)

Once a call is defined you need to initialize it to make it usable in Bubble. An API call can return five different types of data.

### JSON

This is the most typical case of a REST API, it returns an object with key and values. If you pick this type, you will be prompted to pick a data type of each key in a popup after initializing the call. When you initialize a call, Bubble makes the actual request, and analyze the returned data.

![](/files/-M5sc6FbfV9X3zBKH_pX)

### XML

Some APIs returns their response as XML. Often, this can be converted into a JSON object. If you are dealing with such an API, you can use XML and get data as a JSON object, and go through the flow described above. Note that not all XML responses can be converted as JSON. If Bubble fails to do so, an error message will be displayed.

### Image

Some APIs return the raw image as the response. It can be a URL that you can use in an `<img>` tag, for instance. In such a case, the API call in Bubble will return an image that can be used in an Image element, or as a page background.

### Text, Number

If the API returns a string or a number (without structuring this as a JSON object), you should pick this option.

Note that changing the types once an API is public can be non-backward compatible, so do this with caution and make sure to document this as a breaking change when you publish your plugin (see below).

### Date Range, Number Range

While these are Bubble data types, we do not support these data types for our API Connector. If you want to use the API Connector for date ranges or number ranges, a workaround is either to send dates/numbers as two separate fields or as a two-item list of dates/numbers and format them as ranges elsewhere in your app. If you want to use the API Connector to query range data from another Bubble app, we suggest using the [App Connector](/core-resources/bubble-made-plugins/bubble-app-connector) instead.
