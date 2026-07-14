# Adding calls
> Source: https://manual.bubble.io/core-resources/api/the-api-connector/adding-calls · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

After authentication is set up, you can add as many calls as you need to the API provider.

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
This is the short-form technical reference to the API Connector. For a more in-depth look at the API Connector and authentication methods, see the article series below:

Article series: [The API Connector](/help-guides/integrations/api/the-api-connector)
{% endhint %}

## Call name

Choose a name for this call. It must be unique because no two API calls can have the same name.

## Use as

Select from Data or Action to determine how this call will be used in Bubble. Data calls appear in the 'Get data from an external API' dropdown menu and Action calls appear in the Plugins section of the Actions dropdown menu.

## Delete call

This deletes the API call.

{% hint style="danger" %}
**Warning:** Deleting an API call is permanent and cannot be undone.
{% endhint %}

## Method

This is the [HTTP verb](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method). The most common are GET, POST, PUT, PATCH, and DELETE.

## URL

This is the call's URL. It is not client safe, meaning the value is **not** sent to the user's browser when the call is made.

## Body

This is the call's body. It is client safe, meaning values are sent to the user's browser when the call is made.

## Headers

Click to add and configure a new HTTP header to this specific call. Check the *Private* box to stop the information in the header to be visible client-side. Check the *Optional* box to set up this specific key to be optional.

## Body type

Select here the body type of the request. Most requests will send a JSON body, but for more advanced usage (such as uploading a file), you can use a Form-data or Raw body.

{% hint style="info" %}
**Note:** If you are using a Raw (plain text) body, be sure to include a 'Content-Type' header that specifies the format you are using so that it can be parsed properly by the API you are calling.
{% endhint %}

## Parameters

Click to add and configure a new call parameter. Parameters are not sent to the client by default, but they will be if you enable the Client-safe checkbox.

Default values for an API connector call (or plugin) behave differently if they are optional or mandatory. Optional default values are placeholders that aren't passed to a call unless they're changed to something else in the app. Mandatory default values are actual default values.

### Allow blank

Check this box to prevent a parameter default value used for initialization from being sent to the client or workflow inputs.

{% hint style="info" %}
Default values for an API connector call behave differently if they are optional or mandatory.\
\
**Optional** default values are placeholders that aren't passed to a call unless they're changed to something else in the app.\
\
**Mandatory** default values are actual default values.
{% endhint %}

## Include errors in response & allow workflow actions to continue

Check this box to handle API call response errors yourself. When this box is checked, Bubble will allow workflows or actions to continue when an api call error is returned and expose the error object for use in a dynamic expression. There are 4 parameters that are available as a part of the error object: error's status code (number), error's status message (text), error's body (text), and error's has returned error (yes/no).

{% hint style="info" %}
**Note:** If you check or un-check this option after initializing the call, you will need to re-initialize as this option changes the format of the response.
{% endhint %}

## Capture response headers

When the parameters are detected from an initialization request, you can include the request headers in the detected data if some important data is in them.

Some API calls in the API Connector can run directly from the user's browser instead of Bubble's servers. This can improve performance and avoid shared rate limits imposed by some external APIs.

## Make the call directly in the browser

### When this is available

This option appears as a checkbox in the API Connector, but only when:

* The call has no headers
* All parameters are private
* There are no shared headers or parameters

If these conditions aren’t met, the checkbox won’t appear and the call will run through Bubble as usual.

### What to know

* Only data calls can use this feature — actions and initialization still run through Bubble.
* Useful for public or read-only APIs.
* Each user's browser sends the request, reducing server load and potential rate limit issues.

{% hint style="info" %}
**Native mobile apps:** This option in the API Connector only applies to web apps. This feature is not supported in native mobile apps.
{% endhint %}

## Allow call to run directly in the browser where applicable <a href="#allow-call-to-run-directly-in-the-browser" id="allow-call-to-run-directly-in-the-browser"></a>

Check this box to allow this API call to run directly from the browser, rather than Bubble's server.

This option will only available in certain situations. More specifically, this option is only available for public API calls ([Authentication](/core-resources/api/the-api-connector/authentication) is set to None) with no [Headers](#headers) or private [Parameters](#parameters). In addition, the call must be used as a [data call](#use-as). *Support for Use as Action is coming soon.*

The biggest benefit of using this option, on top of performance, is that your API call will not count against API call quotas across all of Bubble, lessening the risk of accidental rate limiting by a 3rd party API.

{% hint style="warning" %}
**Note:** Due to the nature of this type of client-side (from the browser) API call, it will only be sent from the browser if it doesn't require interaction with the server. For example, using the API call response as a data source.

If this option is selected, but the API call is included in a workflow that involves the server (i.e. making changes to a Data type), the API will revert to being sent from the server.
{% endhint %}

{% hint style="warning" %}
Whenever an API call is made from the browser, information related to that call can be intercepted on the client side. That means you should be cautious exposing sensitive information (e.g. API keys) in these calls.\
\
If you are unsure of the potential risk of sending data to the browser we recommend not activating this setting.
{% endhint %}

## Initialize call

{% hint style="warning" %}
When initializing a call, you should use only sample or non-sensitive data in the parameters. Any data entered during this step becomes part of the API schema, which is included in your app’s source code and could potentially be accessed by others.
{% endhint %}

Every call needs to be initialized before it can be used in your app. Initialization is done for two reasons:

* To confirm that the call was successful
* Bubble uses the response to recognize the data being returned by the server

During initialization, Bubble inspects the response and creates a typed field for each value, including the fields inside nested objects and arrays. If a field contains a valid JSON string, Bubble parses it and exposes the fields inside it as well. See [Response fields](#response-fields) for how to set field types and choose which fields to include.

{% hint style="warning" %}
Take caution when utilizing initialization API calls as they may produce actual outcomes, including the modification of live data. Be mindful of what kind of results the initial call may produce prior to executing it.
{% endhint %}

To initialize an API call with mandatory parameters and no obvious default, you can set a default as an example, click to “Initialize,” then unset the default or select [Allow blank](/core-resources/bubble-made-plugins/api-connector#allow-blank).

### Response fields

After a call is initialized, Bubble lists the fields it detected in the response. Each field has a type and an include checkbox.

#### Field type

The type dropdown sets how Bubble interprets a value (text, number, yes/no, date, and so on). JSON is one of the available types.

* A field whose value is valid JSON defaults to the JSON type on new calls and on re-initialization. Its nested fields are exposed automatically.
* Set a field to text to return the raw JSON string instead of the parsed fields.
* Existing calls keep their current field types until you re-initialize or change the dropdown. There is no call-level toggle.

#### Including and excluding fields

All detected fields, including nested fields inside a parsed JSON value, are included by default. Uncheck a field to exclude it from the response.

{% hint style="info" %}
**Note:** Changing field types or re-initializing changes the shape of the data the call returns. Re-initialize after changing the structure of a call so Bubble reads the updated response.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
