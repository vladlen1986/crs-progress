# Streaming API
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/streaming-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## What is a streaming API?

Streaming API is a method of transmitting data from a server to a client in real time, as the data becomes available, rather than waiting for the entire response to be prepared before sending it all at once. This approach contrasts with traditional request-response APIs, where the client sends a request and waits for the full response to be delivered in a single package.

{% embed url="<https://www.youtube.com/watch?v=Qu24Wq2de8w&t=7s>" %}
See Bubble Ambassador and User Manual writer Petter Amlie present the Streaming API feature.
{% endembed %}

With streaming, data is sent in small chunks (called data frames) over a persistent connection. This allows the client to start processing information immediately, improving perceived speed and responsiveness

### What does selecting stream mean in an API call?

When you select Stream from the list of data types in the API Connector in Bubble, you're telling Bubble how to handle the response it gets back from the API.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcLpk2iSxNhJ0CAnYNHP7ED9juc9UDAa8vBJqFv-yJxiTONUZ9Q8DfNCWdxGuq__CW82AIcNEaCCi9UQ0zZ9OMHZJT4GH-5ON1YPzF-d6Kin7aNfcPBOAdRfpMVR8lJEh128fbPFA?key=gbhkkPdaBXb9vIjQ6281DQIh" alt=""><figcaption></figcaption></figure>

From a technical perspective, you're not choosing a different protocol (it’s still typically HTTPS), but you're defining how Bubble should handle the response.

* Most APIs return a complete response all at once—typically in formats like JSON or XML. There's a request, and then a single response that ends the connection.
* A streaming API works differently. It sends back a single response that remains open, allowing the server to deliver data gradually in chunks as it becomes available. Once all data has been sent, the server closes the connection to signal completion.

## What is a streaming API used for

Streaming APIs are used in scenarios where it's useful or necessary to keep a connection open and receive data gradually over time, rather than all at once. For Bubble developers, one of the most common use cases involves integrating with large language models (LLMs) like OpenAI's ChatGPT.

With a traditional API response—such as one using JSON—the entire response is generated on the server and then sent to the client in a single package. This means the user doesn't see anything until the full message is ready, which can result in noticeable delays for complex or long responses.

Streaming changes that behavior. When streaming is enabled, the server starts sending parts of the response as soon as they’re ready. For example, with tools like ChatGPT or Claude, you might see the reply appear word by word or sentence by sentence, allowing users to follow along in real time as the model generates its output.

This approach improves perceived responsiveness and creates a more interactive user experience. While LLMs are a common use case today, streaming APIs are also widely used in other areas—such as financial market tickers, real-time analytics dashboards, and messaging bots—where timely, incremental data updates are essential.

## Setting up a streaming API

Before setting up a streaming API, make sure of the following:<br>

* Ensure that the API service you are connecting to (such as ChatGPT) supports a streaming API response
* Install the API Connector plugin
* Set up the relevant API authentication for the service you want to connect to
* Add your first API call

### Enabling a streaming API response

To instruct Bubble that the streaming API response will be streamed, set the data type to Stream:

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcLpk2iSxNhJ0CAnYNHP7ED9juc9UDAa8vBJqFv-yJxiTONUZ9Q8DfNCWdxGuq__CW82AIcNEaCCi9UQ0zZ9OMHZJT4GH-5ON1YPzF-d6Kin7aNfcPBOAdRfpMVR8lJEh128fbPFA?key=gbhkkPdaBXb9vIjQ6281DQIh)

It’s important to note that many API services require an explicit instruction to enable streaming. For example, OpenAI’s ChatGPT API will return a regular JSON response by default unless you include a specific parameter (such as "stream": true) in your request.

This means that for streaming to work correctly, both sides need to be configured appropriately: your Bubble app must be set up to handle a stream, and the external service must be told to send the streaming API response. If either side is not properly configured, the streaming API initialization process may fail.

In the example below, we’re sending a few parameters to ChatGPT to instruct it to return a streaming API response in the right way:

{% tabs %}
{% tab title="model" %}
This specifies which version of the language model you want to use (e.g. gpt-4, gpt-3.5-turbo).
{% endtab %}

{% tab title="messages" %}
This is the core of the request and represents the conversation history. It’s formatted as a list of message objects, where each object has two required fields:

* role: The [role](https://platform.openai.com/docs/guides/text?api-mode=responses#message-roles-and-instruction-following) of the message sender. Can be user, assistant, or system.
* content: The [message](https://platform.openai.com/docs/guides/text?api-mode=responses#message-formatting-with-markdown-and-xml) text itself.

#### Example:

```json
{
  "messages": [
    { "role": "user", "content": "Please write me a medium-length poem." }
  ]
}
```

This field tells the model what the user has said and, optionally, includes prior conversation history for context.
{% endtab %}

{% tab title="stream" %}
This boolean parameter enables streaming if set to true. When streaming is enabled:

* The response is returned as a series of partial chunks, rather than one complete response.
* This allows your app to display content in real time as the model generates it, improving perceived performance and user experience.

If stream is set to false or omitted, the model responds in a traditional, full-response format (JSON).
{% endtab %}

{% tab title="stream\_options" %}
This is an optional object that lets you modify the behavior of streaming API responses.

Currently, one available option is:

* include\_usage (boolean): If set to true, the final chunk in the stream will include token usage information, such as how many input and output tokens were consumed. This is useful for logging, usage tracking, or billing logic.

#### Example

```json
{
  "stream_options": {
    "include_usage": true
  }
}
```

**Note**: This parameter only applies when stream: true is set.
{% endtab %}
{% endtabs %}

## Setting response fields

When you initialize an API call that returns a streaming API response, you'll receive a series of events known as chunks. Each chunk contains one or more fields, with each field representing a key-value pair of data returned from the stream.

To use this data effectively, you need to define how your app should handle each of these fields.

#### Setting up streaming API response fields

{% hint style="warning" %}
When initializing a streaming API call, the full response must be received before the initialization process can complete. As a result, initialization may take longer than with a standard (non-streaming) API call.
{% endhint %}

After initializing the call, the first step is to create a unique response field for every field you want to reference in your app. This allows you to access and work with the incoming data as it arrives in real time. Let’s continue the scenario of working with ChatGPT, and assume that you want to reference the following data:

{% hint style="info" %}
**Important:** The text stream is where Bubble receives the incremental content generated by the model. For models like ChatGPT, this appears under `response.output.event.delta` when the call is initiated. Set this response to **Push as text stream** to map the incremental response correctly.
{% endhint %}

* Text stream - the incremental content generated by the model. When using streaming, this field updates continuously as each new token or word is returned by the model in real time.
* Input tokens - the number of tokens used in the request payload.
* Output tokens - The number of tokens generated in the response. This includes all tokens streamed or returned in the final output and helps you understand usage and billing impact.

To create new response field, follow these steps:

1. Initialize the call and wait for the Returned values popup to appear
2. Scroll down to Response fields
3. Click Add new field +
4. Give the response field a name, and select a data type

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcRvaifYF2bgyBDFe24bGmz7gqCZN52F7k0u1fU9UBWPTFzDPr7CW9hSAcZQZ18eYPWDitOT0mYOE9726W37HCneY8EnyBgJs4pX4SDIvSWMfHYfwOSkAcupjZ1bonckfgTSfHI?key=gbhkkPdaBXb9vIjQ6281DQIh" alt=""><figcaption></figcaption></figure>

Response fields support the following types:

<table><thead><tr><th width="140.14453125">Field name</th><th width="462.78515625">Description</th><th>Streamed</th></tr></thead><tbody><tr><td>Text stream</td><td>Incremental text content (e.g. the content being streamed)</td><td>Yes</td></tr><tr><td>Text</td><td>A regular text value</td><td>No</td></tr><tr><td>Number</td><td>A regular numerical value</td><td>No</td></tr><tr><td>Yes/no</td><td>A true/false value</td><td>No</td></tr></tbody></table>

## Using streaming APIs in workflows

Just like regular JSON API calls, streaming APIs can be used both as a data source and within workflows. However, due to the continuous nature of streaming APIs, there is an important difference in how data is referenced within workflows, especially when using the Result of step X data source.

When initiating a streaming API request within a workflow, Bubble behaves slightly differently on the client side versus the server side:

* **Client-side behavior:** The workflow action will appear as "finished" as soon as it begins receiving streamed data from the external API. This allows the workflow to move forward and execute subsequent actions immediately, provided these actions do not rely on the final, non-streamed values from the API request.
* **Server-side behavior:** On the server, the workflow action will remain active (blocking) until the streaming API has fully completed and the connection is closed.

For example, if you have a workflow set up like this:

* **Step 1:** Send request to ChatGPT (streaming)
* **Step 2:** Save the chat message (final text stream) in the database (result of step 1)

The following implications apply:

* Client-side actions that don't depend on the final API results can proceed without waiting for the stream to fully complete.
* If an action references the final non-streamed result of the streamed request, the workflow will pause until the streaming has fully completed.
* Server-side actions will always wait until the streamed API has fully completed, potentially delaying subsequent server-side operations.

Common use case:

* A frequent scenario is initiating a streamed API call (like ChatGPT), then immediately displaying the incoming streamed data to the user through Bubble's Display data action. This provides users a seamless and responsive experience as the streamed content arrives gradually.

## Streaming API data sources

Each response field you configure in the API initialization popup automatically becomes a data source in your app. If you use the field type Text stream, Bubble also creates a few additional underlying data sources to support the streaming functionality:

| Text stream | <p><br></p>  | <p><br></p> | <p><br></p>                                                                                                       |
| ----------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| <p><br></p> | text so far  | Text        | The text that has been generated so far. This value updates in real time as new data is received from the stream. |
| <p><br></p> | full text    | Text        | The full text. This value is only available after the streaming is done.                                          |
| <p><br></p> | Is done      | Yes/no      | Returns a yes if the stream is done.                                                                              |
| <p><br></p> | Is waiting   | Yes/no      | Returns a yes if Bubble is awaiting a response.                                                                   |
| <p><br></p> | Is streaming | Yes/no      | Returns a yes if the stream is ongoing.                                                                           |
