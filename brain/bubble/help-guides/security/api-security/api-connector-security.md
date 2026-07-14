# API Connector security
> Source: https://manual.bubble.io/help-guides/security/api-security/api-connector-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security related to the API Connector plugin.

{% hint style="info" %}
This article covers the **security** aspects of using the API Connector plugin specifically. If you want to learn more about the API Connector in general, you can check out the articles below:

Article: [The API Connector](/help-guides/integrations/api/the-api-connector)\
Article series: [API](/help-guides/integrations/api)
{% endhint %}

The API Connector is Bubble-made plugin used to make [outbound API calls](#user-content-fn-1)[^1] to external apps and systems. The API Connector is designed to automatically manage many security aspects and defaults to strict security settings to prevent unintentional vulnerabilities.

Still, as with any other area of app development, it's essential for you, the app developer, to ensure the API connector is configured securely and to familiarize yourself with best practices in this domain.

## Handling API keys

{% hint style="info" %}
In this section, when we say "API keys," we're talking about all generated tokens used for authentication. This includes not just traditional API keys, but also OAuth tokens, JWTs (JSON Web Tokens), secret access codes, and other authentication credentials.
{% endhint %}

Many services that you connect to using the API connector will generate one or more API keys that you use to authenticate[^2] your requests.

<figure><img src="/files/oCZlIIkyP1nvgenu3XOl" alt=""><figcaption><p>Authentication identifies <strong>who</strong> the client is and authorization determines <strong>what</strong> they should have access to.</p></figcaption></figure>

API keys are unique strings of letters and numbers that act like a password or a digital handshake between applications. They grant access to specific functionalities and data within an API service, allowing your app to talk to that system seamlessly.

> Just as you wouldn't want to leave your home key under a doormat for anyone to find, it's crucial to keep your API keys hidden and secure.

If they are exposed, malicious actors can misuse them, potentially leading to unauthorized access, data breaches, or unexpected charges if the API has associated costs.

By ensuring API keys remain private, you're safeguarding the relevant API connection.

Some ground rules for handling API keys in Bubble:

#### **API keys should never be stored in places that can be revealed in your app's source code, such as:**

❌ Option sets\
❌ In on-page workflows, elements and dynamic expressions\
❌ In app texts (translation strings)\
❌ In custom states\
❌ In URL parameters\
❌ In the names and/or labels of your workflows, elements, pages, data types/fields and option sets\
❌ In the default values of your data type fields

#### **API keys should not be shared with anyone outside of your team - do not share it in places such as:**

❌ Chat channels\
❌ Forum posts\
❌ Social media posts\
❌ Screenshots

API keys should be handled like you would handle the passwords of your most important logins.

## Parameters

#### **What are parameters?**

Parameters in an API call are essentially pieces of information you send along with the call to either request specific data or provide some context. If the recipient recognizes the parameters, they can then tailor the response to fit your requirements. For example, if you're calling an API to get weather information, a parameter might be the city or postal code. If you are calling an API to create a new user in an external app, parameters might be the email address and name of that user.

**Where are parameters included?**

Parameters can be placed in various parts of an API call:

1. **URL Parameters**: Often seen in the URL itself after a "?" symbol. For example, `api.website.com/data`**`?city=NewYork`**.
2. **Header Parameters**: Included in the request header, often used for authentication or specifying content type.
3. **Body Parameters**: Used in POST requests, where data is sent in the request body. Useful for sending more complex data like JSON objects.

**Why set them to private in the API Connector?**

In the API Connector, setting parameters to "private" removes it from your app's code files and makes it inaccessible to end-users. This is possible because API calls by default are routed through Bubble's server. This allows us to store the parameter only on the server and include it as needed when the call is made.

<figure><img src="/files/R8UBrsniOakzXuulTu4c" alt="" width="551"><figcaption><p>Checking <em>Private</em> keeps the parameter on the server, hiding it from end users. When the call is made, the parameter is sent from Bubble's server directly to the API.</p></figcaption></figure>

This is particularly important for sensitive info. For example, you wouldn't want to accidentally expose an API key or confidential data. Keeping parameters private ensures they remain a secret between your app and the API.

#### Making URL parameters private

In the example above, we've ensured that a parameter in the *Header* is private. But what about parameters that you include in the URL? Just like header and body parameters, they too can be set to private. But before that, they need to be parameterized.

Let's first look at an <mark style="color:red;">**insecure**</mark> parameter included in the URL:

<figure><img src="/files/OCbSTCn4sLinw1B8aL1a" alt="" width="563"><figcaption></figcaption></figure>

The information above would be visible in your app's code file on the user's device. In many cases there is nothing wrong with this, but in the example above, we have included some sensitive information: an API key.So how do we hide it?

Note the text on the right-hand side of the URL input form that says *(use \[] for params)*. This tells us that we can use brackets to turn a string of text in the URL into a parameter, that can then be set to *private.* Let's see what a more <mark style="color:green;">**secure**</mark> way to send the parameter would look like:

<figure><img src="/files/sDKP8Nvtn9z8PCgkcpwO" alt="" width="563"><figcaption></figcaption></figure>

In the example above, we wrapped the URL parameter inside of brackets, and Bubble automatically creates a parameter below with an input field for both the key and the value. This allows us to set the parameter to *private* keeping it hidden from the app's users.

You can set up more than one bracket in each URL, and even turn the whole URL into a private parameter if you prefer to even keep that hidden.

## API call structure and security

{% hint style="info" %}
This section gives a brief introduction to how API calls work. If you want to learn more about how API requests and responses are structured, as well as the HTTP protocol, you may be interested in reading our extended section on how APIs work.

Article series: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)
{% endhint %}

An API call happens in two stages: there's the **request** and the **response.** In the case of the API Connector (making *outbound* calls), your Bubble app (the **client**) is always the one making the request, and the server you are communicating with (the **server**) is sending the response. The entire process is transferred via the [HTTP protocol](#user-content-fn-3)[^3] (and in most cases encrypted with SSL/TLS), just like when you load a web page.

To learn more about the different *parts* of a request, we recommend the article listed above. In the table below, we've listed the short-form explanation for each, along with common security recommendations:

<table><thead><tr><th width="136">Part</th><th width="211">Purpose</th><th>Security Considerations</th><th>Recommendations</th></tr></thead><tbody><tr><td><a data-footnote-ref href="#user-content-fn-4">Header</a></td><td>Contains <a data-footnote-ref href="#user-content-fn-5"><em>metadata</em></a> for the API call</td><td>Can reveal information about the request, e.g., <a data-footnote-ref href="#user-content-fn-6">content type</a></td><td>Avoid sensitive info in custom headers</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-7">Body</a></td><td>Contains the main <em>content</em> of the request/response</td><td>Transmits the actual data, which can be sensitive</td><td>Avoid including information that the API server doesn't need.</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-8">Method</a></td><td>Indicates the <em>type</em> of request (e.g., GET, POST)</td><td>Certain methods (e.g., POST, PUT) may change data on the server</td><td>Use the appropriate method for the task; Avoid using methods that change data unless necessary</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-9">URL</a></td><td>Specifies the endpoint and sometimes parameters</td><td>Parameters can expose sensitive information if not set to private</td><td>Use the <a data-footnote-ref href="#user-content-fn-10"><em>private</em> setting</a> to mark parameters as private<br>Avoid placing sensitive info directly in the URL</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-11">Parameters</a></td><td>Details for specific queries or actions</td><td>Can be crucial for data operations</td><td>Make sure parameters don't leak sensitive data<br>Use <em>private</em> when necessary</td></tr></tbody></table>

#### Don't send the server more data than is needed

Keep in mind that while the information in a call may be encrypted with TLS[^12] while in transit, the receiver of the request (the server) will decrypt all the data included in it. While most API services can be trusted to handle that information securely, it's still best practice to not include more information than is needed. That's why our recommendations above encourage you to follow that practice.

This is in line with [the principle of least privilege](#user-content-fn-13)[^13].

## Default parameter values

To enable a specific API call, you need to initialize[^14] it. If the call includes parameters, you need to assign a [default value](#user-content-fn-15)[^15] to these parameters that Bubble can use when the initialization is done. The default parameters become part of your app's code base, and can be viewed on the device of the user.

* Do not store sensitive information in this field
* If you prefer the value to not show up anywhere, you can delete its content after the initialization is done

<figure><img src="/files/CRUsoUoLxjmAukw3DERw" alt=""><figcaption><p>Sometimes you'll need to include one or more parameters when you initialize a call. You can remove these values after it has been initalized to avoid them being visible anywhere in your app's code.</p></figcaption></figure>

## External API dashboard settings and features

When using the API Connector, many of the settings you will use with that API are not set on Bubble's side, but in the dashboard of the API provider. To maintain secure connections, it's important to go over these settings and ensure they are properly set up. Settings are sometimes connected to one specific API key, meaning that you can use different keys with different settings to maintain flexible security.

Note that the different settings and features available in each API service can vary.

### Limit Permissions

Many API services offer settings for limiting the permissions of a call, such as which applications can use the key or which API services the key can call. We recommend setting permissions to the strictest possible setting that lets you successfully run the call you need.

### **Rate Limits**

Many providers have [rate limits](#user-content-fn-16)[^16], or allow you to set your own rate limits in order to maintain an expected volume of calls or stay within a budget. Learn how to set and view rate limits set by the API you're connecting to. This prevents overwhelming the server, overspending your budget and potential IP blacklisting.

### Get to know audit logs and analytics

Many API services keep detailed logs of every request and response that goes through their platform using your authentication. Learning to use the audit logs helps you stay on top of all the data that is exchanged, as well as debugging errors. Logs and analytics can also help you identify unusual patterns that might indicate malicious activity or potential vulnerabilities.

## FAQ: API Connector

#### What should I do if I misplace an API token?

If an API token somehow ends up in the wrong place, we strongly recommend immediately logging into the relevant API service and disabling it. With most services you can then generate a new one, making the old API key useless.

[^1]: *Outbound API calls* means that the request is coming ***from*** your Bubble app ***to*** an external API service, as opposed to an inbound API call.

[^2]: *Authentication* is the process of verifying the identity of the client that is trying to access the server. You can compare this to a passenger wanting to board an airplane. At some point the passenger will reach a security checkpoint where they have to present valid credentials to confirm their identity, usually in the form of a passport.\
    \
    In other words, authentication is about asking *who the client is***.**\
    \
    Article section: [Authentication and authorization](/help-guides/integrations/api/introduction-to-apis#authentication-and-authorization)\
    Article series: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)

[^3]: HTTP, or Hypertext Transfer Protocol, is a protocol: a set of rules that governs how data is shared between two systems to make sure both parties understand it.\
    \
    Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^4]: Metadata for the API call. It often includes info like authentication tokens and the content type. Think of it as the envelope details when sending a letter.

[^5]: Data that provides information about other data.\
    \
    In API calls, metadata provides context and additional details about the content in the body, helping systems process it correctly. For example, it's used to tell the server who the sender is and what kind of data to expect (text, a file, etc).

[^6]: In API calls, consider the content type as the language or format in which you choose to communicate. Just as you might select a language (English, Spanish, etc.) for a verbal conversation, the content type specifies the format (like JSON or XML) for the data you're sending or expecting to receive.\
    \
    It ensures both parties (the sender and the receiver) are on the same page, understanding the data being exchanged.

[^7]: The main content of the request or response. If you're sending data to a server or receiving it, this is where that data lives. In our letter analogy, it's the written content inside the envelope.

[^8]: The *HTTP Method* tells the server what action to take on the specified resource. For example, a GET method retrieves data, while a POST method sends data.\
    \
    Article section: [The HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)\
    Article: [What is the HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^9]: The web address or endpoint you're sending the request to. It's the destination of our hypothetical letter.\
    \
    The URL can (but doesn't have to) include parameters.

[^10]: To set URL parameters as private, they first need to be parameterized. The above section covers this:\
    \
    Article section: [Making URL parameters private](#making-url-parameters-private)

[^11]: Specific criteria or filters in your request. If you're asking a database for user data but only want users from New York, "city=New York" could be a parameter. Imagine it as special instructions you give when sending a package.

[^12]: TLS (Transport Layer Security) converts data into a secret code while it travels between your web browser and a server. This keeps the info safe from eavesdroppers, ensuring the communication remain private and secure.\
    \
    TLS is essentially a more up-to-date version of the older SSL encryption.

[^13]: *The principle of least privilege* means giving just enough access needed for a task and nothing more.\
    \
    Article section: [The principle of least privilege](/help-guides/security/api-security#the-principle-of-least-privilege)

[^14]: *Initializing* an API call means to send a request to the external app or service to verify that it is working.\
    \
    This serves two purposes: 1) to ensure that you are getting a successful response, and 2) for Bubble to learn what the response looks like.

[^15]: The *default value* is simply the value you provide during initialization to test that it is recognizable by the external app or system.

[^16]: *API rate limits* specify how many requests your app can send to a given API within a given time frame, such as per minute/day/month.
