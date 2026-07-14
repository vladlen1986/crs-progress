# Google Translate
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Use Bubble's API Connector to connect to Google's Translate API and automatically translate text strings in your app.

The API Connector is a powerful tool to connect to external applications and services.

In this article we'll look at how you can easily connect to [Google Cloud](https://cloud.google.com/) and use their [Translate service](https://cloud.google.com/translate/) to translate strings of text in your app.

<details>

<summary>Useful resources</summary>

**Setting up an API key with Google Cloud**\
For this guide you will need to set up an API key with Google Cloud. If you don't have an API key, you can follow the video tutorial in the link below to set one up:\
\
Video: [How to setup Google API keys](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate/how-to-setup-google-api-keys)\
\
\
**Activating the Google Cloud Translation API**\
You will also need to activate the Cloud Translation API in your Google Cloud dashboard. This guide shows you how to:\
\
Article: [Enabling a Google Cloud API](https://cloud.google.com/endpoints/docs/openapi/enable-api) \[external]\
\
\
**Google Cloud Translation Quickstart Guide**\
You may find the Google Cloud Translation Quickstart Guide useful as you go through this case.\
\
Article: [Google Cloud Translation Quickstart Guide](https://cloud.google.com/translate/docs/basic/translate-text-basic) \[external]<br>

</details>

## Authenticating

The first step to set up our API call is to ensure we have the proper authentication. From our Introduction to APIs article you'll remember that authentication is the process of identifying who the client[^1] is in order to determine what resources[^2] they should have access to.

First, you'll need to find your Google Cloud API key. You'll find this in your [Google Cloud dashboard](https://console.cloud.google.com/) (or set one up using our [video tutorial on how to set up Google Cloud API keys](/help-guides/integrations/api/the-api-connector/api-guides/case-google-translate/how-to-setup-google-api-keys)):

<figure><img src="/files/JdpUTzfzpjiRgWO6v34i" alt=""><figcaption><p>Log in to the Google dashboard to find your unique API key.</p></figcaption></figure>

{% hint style="danger" %}
API keys should be kept private to prevent unauthorized access and potential misuse of the associated API.
{% endhint %}

First, we will create a new API call by clicking the *Add another API* button in the API Connector settings. We can name the API *Google Cloud*, since this authentication covers all services that you have activated in the Cloud dashboard.

Now, let's study the [Google Cloud API documentation](https://cloud.google.com/docs/authentication/api-keys) to see what kind of authentication they require:

<figure><img src="/files/tUYC4c1YZTEofjckrr5z" alt=""><figcaption><p>Google tells us in their documentation that they accept passing the API key as a query parameter.</p></figcaption></figure>

As you can see in the illustration above, Google asks us to pass the API key as a query parameter, which means we include it as a parameter in the endpoint URL.

{% hint style="info" %}
Passing the API key in the URL is considered secure because the API key is routed through the Bubble server. This means that the API key is never visible to the users of your app. While in transit[^3], the key is encrypted with HTTPS encryption.
{% endhint %}

Returning to the API Connector settings, let's set it up as follows:

<figure><img src="/files/2oYf6ck8n9oQEVWJpOHh" alt=""><figcaption></figcaption></figure>

1. Open the *Authentication* dropdown to select the authentication method
2. Pick *Private key in URL*
3. Set the *Key name* to *key*. This is the name of the URL parameter Google is looking for.
4. Finally, paste your API key in the *Key value* field.

{% hint style="info" %}
Many API providers offer a test API key that let's you play around with the API without manipulating actual data. If you would like to use a test key in the *Development* version if your app, you can paste that key in the *Development key value* field visible in the screenshot above.\
\
Bubble will automatically use the test key for the development version and the live key for the live version.
{% endhint %}

That's all there is to it – we have now told Google **who** we are. When we authenticate with that API key, Google will proceed to check what we (the client) should have access to. Since we activated the Cloud Translation API, Google knows that we have access to that particular resource.

## Setting up the call

The next step is to set up the actuall call. The call we are looking for is one that lets us send a string of text, specify a language and then have Google return a translated version of the text we sent. Bubble will already have created an empty call called *API call.* Click the *expand* link on that call to expose its settings.

Again we need to consult the documentation. [Google's Cloud Translation Quickstart guide](https://cloud.google.com/translate/docs/basic/translate-text-basic) shows us an example with the endpoint[^4] and the [JSON-formatted ](#user-content-fn-5)[^5]parameters:

<figure><img src="/files/RSC8xcH9mnSpNpjy0lyu" alt=""><figcaption><p>Google's documentation offers a neat overview of the call we need.</p></figcaption></figure>

Now let's use this information to set up the call in the API Connector.

### The endpoint

First, we'll instruct the API Connector to seek out the resource we want to reach. As you can see in the screenshot above, Google spells it out for us in the header that says *HTTP method and URL*. This tells us that the [HTTP method](#user-content-fn-6)[^6] is *POST* and the URL is `https://translation.googleapis.com/language/translate/v2`

Let's look at what that looks like in the API Connector:

<figure><img src="/files/JWiUULfOumNRPg9b3ovh" alt=""><figcaption></figcaption></figure>

1. First, we'll set *Use as* to *Data*, since we want to use the response (the translated string) as a data source
2. Next, we'll set the Data type to JSON, since the documentation told us that this is the format Google prefers
3. We'll set the HTTP method to be POST, since we are initiating an action (translating text)
4. Finally, we paste the URL from the documentation.

We have now set up the necessary settings for the call, and constructed the endpoint by combining the HTTP method and the resource URL.

### The parameters

The next step is to set up the needed parameters. After all, an API call that translates text won't get us far if we don't tell it what text to translate and what language to translate it to!

Looking again at the documentation (the same screenshot as earlier) we can see that Cloud Translate asks for a few parameters:

* "q" = The string that we want to translate
* "source" = the language we are translating *from* (optional)
* *"*&#x74;arget" = the language we are translating *to*
* *"format"* = the format we want returned (text) (optional)

If we don't include a source language, Cloud Translate will try to recognize the language on its own. Let's set up the two required parameters: the string (q) and the target language (target). We'll also include a value that we can use to test that the call works:

<figure><img src="/files/VYLBlKM89huBVfYOxwT4" alt=""><figcaption><p>We need to include some sample data in the <em>Value</em> field to initialize the call. You can find the list of language abbreviations on <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">Wikipedia</a>.</p></figcaption></figure>

### Initializing the call

Initializing the call means that we run it once in order to get a response. Initializing serves two purposes:

* It lets us know whether the call was successful or not
* It provides us with a response that tells Bubble what the returned JSON data looks like. This in turn lets us set up the call as a data source, since Bubble knows its structure.

If everything is set up correctly, Bubble should display the following response. From here you can choose what fields to ignore, and what to include in the final call:

<figure><img src="/files/91Bdga6FgbTC2xinxlhp" alt=""><figcaption><p>After initializing, Bubble shows us the data that was returned from Google.</p></figcaption></figure>

If you click the *Show raw data* link you can see the JSON-formatted text that Google returned:

```json
{
    "data": {
        "translations": [
            {
                "translatedText": "Merci de traduire ceci",
                "detectedSourceLanguage": "en"
            }
        ]
    }
}
```

As you can see, the *translatedText* parameter returned the translated string, and the *detectedSourceLanguage* returned the language code of the source language.

## Using the call

Now that the call has been set up to be a data source and we have initalized it, we can start using it in our application and translate texts on the fly. To find the data source we created, we use the *Get data from external API* data source:

<figure><img src="/files/GdpfObtUYqRwgbVgB6ht" alt=""><figcaption></figcaption></figure>

That's how easily you can use the API Connector to set up an API call that you can then use around your app as a data source or an action.

[^1]: The *client* in an API call is the one that is making the request, as opposed to the *server* who is the one responding.\
    \
    In this example, your Bubble app is the *client* and Google Cloud is the *server.*

[^2]: A *resource* is a specific item or endpoint accessible through an API request.\
    \
    For example, the action that accepts a string of text and responds with a translated version of that text is a *resource* that Google Cloud offers.

[^3]: The process of transmitting data over a network.

[^4]: The API endpoint is the specific URL that your app can send requests to in order to reach a specific resource.

[^5]: JSON is a lightweight data interchange format typically used in Javascript. It uses human-readable text to transmit data objects that consist of attribute–value pairs and array data types.\
    \
    It is used both in incoming API Connections and outbound API Connections.\
    \
    Article section: [What is the JSON format?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-json-format)

[^6]: The HTTP method is the instruction for the server to indicate the desired action to be performed on the identified resource in the URL. (e.g. GET, POST, PUT, DELETE)\
    \
    Read more: [HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)
