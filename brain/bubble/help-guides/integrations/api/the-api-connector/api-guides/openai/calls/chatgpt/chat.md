# Chat
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt/chat · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="OpenAI documentation" %}
OpenAI’s documentation provides thorough information about both the authentication process and how to set up calls.

External page: [OpenAI API reference](https://platform.openai.com/docs/api-reference)
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

{% tab title="FAQ" %}
If you are running into issues, or have questions regarding the topic of this article, we have an FAQ section at the bottom of this article that answers many common questions.

Article section: [FAQ: OpenAI ChatGPT](#faq-openai-chatgpt)
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
To initializing and using calls from OpenAI, even for testing, you need to be on a paid OpenAI plan with billing correctly set up. You also need to [generate an API key](/help-guides/integrations/api/the-api-connector/api-guides/openai#setting-up-an-api-key) and [set up authentication](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication).
{% endhint %}

One of ChatGPT's core features is the *Chat*. This is essentially the API version of what you experience when you use OpenAI's own [ChatGPT platform](#user-content-fn-1)[^1]. When you send a request to OpenAI's server, it includes a message, and the server responds with a generated text.

> **Example:** If you send a request with the message "Hello", ChatGPT might reply "Hi there, how are you today?"

The request can contain more data to tailor the the response to what you need, such as, setting the [ChatGPT model](#user-content-fn-2)[^2], providing more context, and a log of the conversation so far.

If you visit the OpenAI's API reference for the chat object (listed at the top of the article), you can see an example of what a request may look like:

<figure><img src="/files/PD5gWZIRziYw67blI0u5" alt="" width="563"><figcaption><p>OpenAI provide an example of what a request might look like in their documentation. The authentication part is automated by the API Connector, and doesn't need to be included in every call.</p></figcaption></figure>

In the expandable box below, we go through each part of the request to explain what they do. While it's not essential to grasp every detail to set up the call, having an understanding of these elements can be beneficial. It helps you better comprehend the mechanics behind the process, ensuring you're more informed about how the API works and why certain steps are necessary.

<details>

<summary>The request step-by-step</summary>

* **Line: `curl https://api.openai.com/v1/chat/completions`**
  * **Part: curl**
  * **Description:** Curl is a tool for initiating calls in the [command line](#user-content-fn-3)[^3]. In Bubble, it's not needed for this process.<br>
  * **Part: `https://api.openai.com/v1/chat/completions`**\
    **Description:** This is the specific API endpoint[^4] we're trying to reach.
* **Line: `-H “Content-Type: application/json”`**
  * **Part: `-H`**
  * **Description:** This indicates that what follows is part of the *header* of the call.<br>
  * **Part: `Content-Type:`**
  * **Description:** Specifies the *format* of the response.<br>
  * **Part: `application/json`**
  * **Description:** Indicates the response format is *JSON*.

The section below is the authentication needed for the call. The API Connector simplifies this process by adding automatic authentication for each API service. This means authentication details are applied to every related call automatically. We've explained this feature in the Authentication article, so you don't need to add these details to each call you make in Bubble.

* **Line: `-H "Authorization: Bearer $OPENAI_API_KEY"`**
  * **Part: `-H`**
  * **Description:** Again, signifies header information in the call.
  * **Part: `Authorization: Bearer $OPENAI_API_KEY`**
  * **Description:** Authorizes the call using a [bearer token](#user-content-fn-5)[^5], where `$OPENAI_API_KEY` is replaced by your actual [API key](#user-content-fn-6)[^6]. This setup is already explained in the authentication chapter.

We cover the structure of the messages later in the article.

</details>

## Setting up the API call

### Importing the cURL

The API Connector in Bubble includes a feature that allows for the direct import of a cURL[^7] request. This tool can automatically configure the imported request to set up an API call correctly. Essentially, you can take the cURL command provided by a service like OpenAI, import it into Bubble's API Connector, and the relevant information will be appropriately mapped out and set up for use.

To import the cURL into Bubble, follow these steps:

#### 1. Copy the original request

First, visit the documentation link provided at the top of this article. There you will find the text in the screenshot above. In the top row, make sure it is set to *curl* before you copy the text by clicking the copy icon or selecting the text and clicking Ctrl/Cmd + C.

<figure><img src="/files/czdc9Pw65lqSxlpsdnaC" alt="" width="563"><figcaption><p>Click the <em>Copy</em> icon to copy the whole text.</p></figcaption></figure>

#### 2. Import the cURL request into the API Connector

Now, open up the API Connector in your Bubble app, and navigate to the API you set up. You will need to go through the steps outlined in the *Authentication* article before you set up the call, so that we can authenticate correctly.

<figure><img src="/files/8tGyJjyGDy0riyyNps9n" alt=""><figcaption><p>The <em>Import another call from cURL</em> lets you import the example call directly into the API Connector.</p></figcaption></figure>

Click the *Import another call from cURL* link, marked in red in the above screenshot. A popup will open, where you can paste the text from OpenAI's documentation:

<figure><img src="/files/ktqWvQAgfJfbnY9yHveg" alt="" width="375"><figcaption><p>Paste code from OpenAI's documentation into the cURL import popup.</p></figcaption></figure>

Before we can initialize[^8] the call, we need to edit a few details.

1. The call will automatically be given the name *cURL Call*. Give it a suitable name, such as *ChatGPT chat*. This doesn't affect the call, but makes it [easier to work](#user-content-fn-9)[^9] with in Bubble.
2. You'll see that the call includes the *Authorization* in the header. You can remove this line from the code, since the API Connector automatically handles header authorization in the API settings.\
   \
   To be specific, remove this line from the code:\
   `-H "Authorization: Bearer $OPENAI_API_KEY"`

### Initializing

After importing the cURL and removing the unnecessary call, you can initialize it.

When you click *Import*, the API Connector sends the call to OpenAI, which returns a response. Bubble will show you this response, and allow you to change the data type for each value. You don't need to change anything here.

<figure><img src="/files/waNsq5omRwEZ0GbOUl97" alt=""><figcaption><p>Bubble shows you each value returned by the API call. It will try to automatically recognize the data type of each value.</p></figcaption></figure>

### Adding parameters

The initialization process involves sending some necessary data to the API call. To start a chat, after all, we need to send something that the chat bot can respond to. As you prepare to use this functionality in your app, you'll need to set this up as a dynamic value, so that you or your users can insert the value that you want to send.

Below is a quick introduction to the different properties in this call. For a more in-depth guide, see OpenAI's own article linked below.

{% tabs %}
{% tab title="JSON" %}
Each property of the JSON consists of a key-value pair. For example, the first property has the key *model* and the value *gpt-3.5-turbo*.

```json
{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}
```

{% endtab %}

{% tab title="model" %}
`model`: determines which "version" of ChatGPT you want to use. You can read more about models in the article below.

External page: [ChatGPT API documentation](https://platform.openai.com/docs) | [Models](https://platform.openai.com/docs/models/models)
{% endtab %}

{% tab title="messages" %}
`messages:` is an array (list) of messages in the chat, both current and (optionally) historical. What this means is that each call to ChatGPT is considered in isolation. For ChatGPT to take the chat history into context, it must be sent along with the call.

* `role`: each message is assigned a role, to inform OpenAI of "who" the message comes from. There are three roles involved in a call:
* `content`: content contains the message that is sent to ChatGPT. In the code above, we can see the role `user` sending the content `"Hello!"`
  {% endtab %}
  {% endtabs %}

<details>

<summary>Understanding roles in ChatGPT</summary>

### <mark style="color:blue;">Request</mark>

#### System

The system role is "your app". It lets you add context or instructions to the call that helps ChatGPT understand how to responds. In the example above, the *system* tells OpenAI to "be a helpful assistant", which sets the tone of the conversation. Whatever content you send here is often not visible to the user.

`You are an expert on the solar system, and will talk about nothing else.`

#### User

This is the user of your app, and the "person" ChatGPT responds to. In many cases, your app's users will provide the content of these messages.

`Is Pluto a planet?`

### <mark style="color:blue;">Response</mark>

#### Assistant

The final role is not visible in the JSON properties above (as it's part of the response), but is any text that OpenAI has sent back as a response to the user's message. If you include messages from the assistant in the call, ChatGPT will consider it a part of earlier conversation and take in into account as context. Including the [chat history](#using-chat-history-in-a-call) is important to make ChatGPT give consistent, conversational responses that void repetition.

`No, Pluto is not a planet.`

</details>

#### Replacing static text with parameters

First, let's have another look at the `<body>` we sent over to OpenAI during initialization:

{% tabs %}
{% tab title="JSON (static parameters)" %}

```json
{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}
```

{% endtab %}
{% endtabs %}

Let's look at how the code changes, when we want to replace some static values with dynamic ones.

{% tabs %}
{% tab title="JSON (dynamic parameters)" %}

<pre class="language-json"><code class="lang-json">{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are an expert on <a data-footnote-ref href="#user-content-fn-10">&#x3C;subject></a> and will only answer questions about this subject."
        },
        {
            "role": "user",
            "content": "I want to learn about <a data-footnote-ref href="#user-content-fn-10">&#x3C;topic></a>."
        }
    ]
}
</code></pre>

{% endtab %}
{% endtabs %}

As you can see, we can place parameter wherever we want in the JSON body, by wrapping the name of the parameter in <>. Bubble will automatically mark the parameters in <mark style="color:green;">green</mark>*,* and set up fields for these parameters below the JSON field:

<figure><img src="/files/ZnGUhXLV5FoE9rA4lJTk" alt=""><figcaption></figcaption></figure>

To test that ChatGPT respects the instructions we provided in the `content` given by the `system` role, we purposely set the topic to *sunflowers,* a topic that contains the word *sun,* but is still unrelated to the solar system.

### Re-initalizing

Click *Reinitalize call* to run it one more time. In our case, OpenAI sent us this response:

{% tabs %}
{% tab title="JSON (response)" %}

```json
{
  "id": "CHAT_ID",
  "object": "chat.completion",
  "created": 1710161438,
  "model": "gpt-3.5-turbo-0125",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I can provide information about the astronomical object known as the sun, but sunflowers are actually flowering plants and are not related to the sun in space. Would you like to know about the sun instead?"
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 36,
    "completion_tokens": 40,
    "total_tokens": 76
  },
  "system_fingerprint": "SYSTEM-FINGERPRINT"
}
```

{% endtab %}
{% endtabs %}

As you can see in the response, ChatGPT sent the following message in return:

> `I can provide information about the astronomical object known as the sun, but sunflowers are actually flowering plants and are not related to the sun in space. Would you like to know about the sun instead?`

This shows that while ChatGPT understands the concept of sunflowers (meaning that its knowledge is not technically *restricted* only to the subject of the solar system), it will politely remind the user that the topic of conversation is restricted to the solar system. This means chat ChatGPT successfully received the message from both the `user` role and the `system` role.

## Dynamic parameters

Until this point, we have only sent ChatGPT static text directly from the API Connector's settings. Of course, for ChatGPT to really be useful, we need to replace these values with dynamic ones, such as user input or the results of [dynamic expressions](#user-content-fn-11)[^11].

This is what we've done so far:

* Set up parameters in the code by wrapping their key names in `<>`
* Added [static test values](#user-content-fn-12)[^12] in the API Connector
* Initialized the call

Now, let's look at how we can use these parameters in our app.

### The API Connector

To make sure that the API Connector accepts a dynamic parameter value, we need to change the [*Private*](#user-content-fn-13)[^13] setting on each of them to *unchecked.*

<figure><img src="/files/p7j00iRAfof12xs4gOoc" alt=""><figcaption><p>Setting <em>Private</em> to unchecked will open up the parameter to be dynamic, meaning that we can pass values from our app.</p></figcaption></figure>

### The design tab

Next, we'll start adding some elements to the page. In this example, we want the user to supply the chat messages, emulating ChatGPT's chat platform. Navigate to the [design tab](#user-content-fn-14)[^14] and add the following:

* An **input** where the user can type in a question
* A **button** to start the workflow that sends the message
* A **text element** to show the response

Our design looks like the below:

<figure><img src="/files/bsUBYzDt8mIyfiAEIZDJ" alt=""><figcaption><p>In this example, we have set a group's, <em>Type of content</em> to <em>text</em>, and set a temporary data source. When we get a response from the API, we'll populate the group with that text.</p></figcaption></figure>

### The workflow tab

#### Sending the request

Next, navigate to the [workflow tab](#user-content-fn-15)[^15]. First, we'll connect a workflow to be triggered by the *Send* button. To find the action that sends a chat message, search for the name you gave the API call in the API Connector.

In our case, we gave it the name *Send ChatGPT chat message:*

<figure><img src="/files/uEdLL5v8wVSs9Vc9hpwW" alt="" width="563"><figcaption><p>Note that Bubble constructs the name of the action from two sources: <strong>the name of the API</strong> in the API connector, and the <strong>name of the specific call</strong>. Giving them descriptive names help you search for and identify the right action in the workflow editor.</p></figcaption></figure>

Bubble will automatically [show the parameters](#user-content-fn-16)[^16] we set up, and we can use a dynamic expression to send the value in the input field:

<figure><img src="/files/uzKJGumsln9E0seaIAUy" alt="" width="563"><figcaption></figcaption></figure>

#### Receiving the response

When we initialized the call, Bubble learned what the response looks like. With that information, we can automatically offer a response in the same workflow that triggers the action. To do that, add a second action step to the workflow, and set it to *Display data in a group/popup*.

<figure><img src="/files/evf65526p2F0mp75C1fO" alt="" width="563"><figcaption><p>By using the <em>Result of step 1</em> data source, we can use the results of the API call in the next action.</p></figcaption></figure>

Remember that we set up a group called *Group response* with the content type *text*, and a text element that shows the parent group's text. That way, we can use the *Display data in a group/popup* action to send the message to the group, and set the text element's data source to parent group's text.

What we received was a neat response to the question we sent:

<figure><img src="/files/xK5ghMoMCQwRdBpRtob9" alt="" width="375"><figcaption></figcaption></figure>

## Save and view chat history

Our app so far can send a message to ChatGPT, and receive a response. We can see this response in a text element, as illustrated above. In some cases, this is enough. For example, if you simply want to be able to ask a simple question, and get a single response in return, you may not need to store the response at all.

However, you may want your users to be able to see a list of all the messages sent and received. To do that, we'll start leveraging the Bubble database in addition to the API.

### The data tab

{% hint style="warning" %}
Don't forget to set up privacy rules on your data types, in order to safeguard any sensitive information.

Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
{% endhint %}

#### Create a new data type to save chat data

In order for this to work, we first need to save the data. We'll store it in the database to make sure we can load it as needed. We will use a fairly simple database setup for this, but feel free to set it up in a way that makes sense for your app. We'll set up a data type with the following fields:

<table><thead><tr><th width="187">Data type</th><th width="144">Field name</th><th width="83">Type</th><th>Explanation</th></tr></thead><tbody><tr><td>ChatGPT Message</td><td></td><td></td><td></td></tr><tr><td></td><td>Message</td><td><code>text</code></td><td>The message sent by the <em>user</em> or the <em>assistant</em></td></tr></tbody></table>

In the data tab, our data type looks like this:

<figure><img src="/files/DDkqwmBdKLHdM9RSdt9E" alt="" width="375"><figcaption></figcaption></figure>

We will create *one message* for each message that goes to and from the API – in other words, we'll save both the request (the user's message) and the response (the assistant's message) in individual database things[^17].

### The workflow tab

#### Setting up the workflows to store messages

The workflow we set up will consist of three actions:

<figure><img src="/files/xxh6fBY5Z3Bq3XTSBZjE" alt=""><figcaption></figcaption></figure>

Let's look in more detail what each of the actions are doing. Each of the tabs below represents one of the actions in the screenshot:

{% tabs %}
{% tab title="Step 1" %}
**Save the user's message**

The first workflow creates a new thing of the Chat data type, and we store the **message** that the user wrote.

***

**Action type**

[Create a new thing](#user-content-fn-18)[^18]

***

**Fields**

Message = `Input Message's Value`
{% endtab %}

{% tab title="Step 2" %}
**Send the request to ChatGPT**

The second step is the actual **API call** that we set up in the API Connector. In the `subject`, we'll simply provide the static value "our solar system" in this example. As `topic`, we'll use the value of the input element we created earlier.

Keep in mind that *subject* and *topic* are dynamic parameters we [set up earlier](#adding-parameters) – they're not ChatGPT functions.

We'll reference the response from this step in [Step 3](#step-3).

***

**Action type**

[OpenAI - Send ChatGPT message](#user-content-fn-19)[^19]

***

**Parameters**

subject = our solar system

topic = [`Input chat message's`](#user-content-fn-20)[^20]`Input Chat message's value:`[`formatted as JSON-safe`](#user-content-fn-21)[^21]

***

#### Screenshot

<figure><img src="/files/egZELbGskTXsWnfg6osu" alt="" width="375"><figcaption><p>Click the image to enlarge.</p></figcaption></figure>
{% endtab %}

{% tab title="Step 3" %}
**Save ChatGPT's response**

In step 3, we're creating another Chat message to store the **response** from [Step 2](#step-2).

***

**Action type**

[Create a new thing](#user-content-fn-18)[^18]

***

**Fields**

Message = [`Result of step 2 (OpenAl - Send Cha... 's`](#user-content-fn-22)[^22] [`choices`](#user-content-fn-23)[^23] `:first item 's message content`

Message JSON: [`Result of step 2 (OpenAl - Send Cha... 's`](#user-content-fn-22)[^22] [`choices`](#user-content-fn-23)[^23] `:first item 's message` [`content`](#user-content-fn-24)[^24]`:`[`formatted as JSON-safe`](#user-content-fn-21)[^21]

***

<figure><img src="/files/rB76dRSUdNY6hKQoXXZI" alt="" width="375"><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

Go ahead and test[^25] the workflow by adding a message to the input we set up, and clicking the *Submit* button.

### Displaying the conversation

Now, to show the full conversation history to users:

1. Set up a repeating group.
2. Set its *Data source* to *Do a search for* *ChatGPT messages*.

In the Design tab, it will look something like this:

<figure><img src="/files/GlZZuXfzbuz6SjajdgNy" alt=""><figcaption></figcaption></figure>

If you want to [save conversations in threads](#how-can-i-make-sure-that-chat-history-only-shows-messages-that-belong-to-a-specific-conversation-as), or [only show messages connected to a specific user](#how-can-i-show-the-conversation-history-to-look-like-a-traditional-chat-like-whatsapp-or-imessage), you can set up the database and expressions to take that into account. Follow the links or scroll down to the FAQ section.

## Send chat history to ChatGPT

In the last steps, we set up a system for creating one *ChatGPT message* thing for every message that is sent by the user and and the assistant (ChatGPT). But the changes we made are still only visible in your app – ChatGPT is still oblivious to the previous messages that we've stored in the database.

One of the key features of ChatGPT is its ability to take previous messages from both the user and the assistant into account when generating a response.

> For example, if we asked the question "Is Pluto a planet", we could follow up with the question "How far is it from the sun?", and ChatGPT would use the context to understand that "it" refers to Pluto from the first message.

ChatGPT doesn't actually remember the chat history, but requires that you send the history along with every call if you want it to be considered when the response is generated. This is optional, and the expandable box below highlights some of the things you can consider before you decide to include it or not.

<details>

<summary>Do I have to send chat history?</summary>

Sending the chat history along with a ChatGPT request is **optional**. While it can be highly useful in some cases, it's not given that you should include it. The different scenarios and considerations below can help you decide.

**Sending no chat history**

If you want to send generic, isolated queries where context isn't needed, like asking for a standalone fact, joke or something else.

**Sending the last message only or selected messages**

If you're continuing a conversation but only need the last message or specific key messages for context, like following up on a specific query from earlier in the conversation.

**Sending the full chat history**

Ideal for ongoing discussions where previous context is crucial, such as a technical support chat where the issue evolves over time and each response builds on the previous interaction.

</details>

When we sent the first call to ChatGPT, we included the JSON object *messages.* We sent a total of two messages (one from the role *system* and one from the role *user*). Sending a chat history is essentially just about including the additional messages in the same list/array.

This is the original JSON we sent earlier:

{% tabs %}
{% tab title="JSON" %}

```json
{
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }

```

{% endtab %}
{% endtabs %}

Notice the [square brackets](#user-content-fn-26)[^26] after `"messages"`: and at the second bottom row. They denote the beginning and end of the messages object. Each object within this array is then enclosed in [curly brackets](#user-content-fn-27)[^27].

Let's extend that JSON code a bit to see what it would look like after some back and forth between the *user* and *assistant.* We're just looking at this as a en example for now; you don't need to do anything with the code.

{% tabs %}
{% tab title="JSON " %}

```json
{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "You are an expert on <subject> and will only answer questions about this subject.."
      },
      {
        "role": "user",
        "content": "Hello!"
      },
      {
        "role": "assistant",
        "content": "Hi! How can I help you today?"
      },
      {
        "role": "user",
        "content": "How many planets are there in our solar system?"
      },
      {
        "role": "assistant",
        "content": "There are eight planets in our solar system."
      }
    ]
}
```

{% endtab %}
{% endtabs %}

A few things worth noting:

* We're **not changing the structure of the JSON** in any way; we're simply adding more messages to the existing code, separated by a comma and wrapped in curly brackets. In essence, we're just **making the list longer**.
  * This means that **each message should look like this**:\
    `{"role": "user","content": "Your message here."},`
* The **message from&#x20;*****system*****&#x20;remains the same**, since this is the basic behavioural instruction we want ChatGPT to follow, and it shouldn't change within the same thread of conversation.
* We're choosing to send messages from **both the user, and the response from the assistant**, so that ChatGPT has access to the *entire* context. This will also help ChatGPT avoid repeating itself.

Now that we know how we want the JSON to look, we're going to make the necessary changes in our app to generate that JSON and include it in the call.

### The API Connector

First, we'll need to adjust the [parameters we set up earlier](#adding-parameters). The reason we're doing this, is that the original setup only supports sending *one* message, and now we want to send a JSON-formatted *list* of messages.

To do that, we're going to replace the entire value in the `messages` object with a dynamic parameter, except for the square brackets that mark the start and end of the array. You can call this parameter whatever you like, but in our example, we'll call it `message-list`*,* to make it clear that we're expecting an array:

{% tabs %}
{% tab title="JSON" %}

```json
{
    "model": "gpt-3.5-turbo",
    "messages" : [<message-list>]
}
```

{% endtab %}
{% endtabs %}

Note that the square brackets `[]` are part of the JSON, while the angle brackets `<>` instructs Bubble that we want to place a parameter within the code.

In the API Connector, the `Body` now looks like this:

<figure><img src="/files/fHTjpCO5HgSg2qHv05gJ" alt=""><figcaption><p>Bubble automatically updates your parameters. Don't forget to uncheck <em>Private</em> to make the <em><code>message-list</code></em> parameter dynamic.</p></figcaption></figure>

#### Reinitializing the call

Now, since the dynamic parameters have changed (we've removed *subject* and *topic* and replaced it with *message-list*), we need to re-initialize the call for Bubble to learn and update the parameters.

For this, we need to provide a test value in the *value* field that corresponds with the *message-list* key. For that, you can use the test code below:

{% tabs %}
{% tab title="JSON" %}

```json
{
        "role": "system",
        "content": "You are an expert on astronomy and will only answer questions about this subject."
    },
    {
        "role": "user",
        "content": "Hello!"
    },
    {
        "role": "assistant",
        "content": "Hi! How can I help you today?"
    },
    {
        "role": "user",
        "content": "How many planets are there in our solar system?"
    },
    {
        "role": "assistant",
        "content": "There are eight planets in our solar system."
}
```

{% endtab %}
{% endtabs %}

Then, click the *Reinitalize call* button to send it, and wait for the response. If successful, the new `message-list` parameter will have replaced the two old parameters. Let's head over to the workflow tab to check it.

### The data tab

Secondly, we'll need to make some additions to the *ChatGPT* data type. Let's first explore why.

Our purpose here is to send a list of previous messages to ChatGPT, including the new one. To do that, we need to supply ChatGPT with some simple metadata[^28] for it to understand details that are not visible in the chat message itself: the `role` of each message.

> By including the `role` in the message, we're letting ChatGPT know **who** sent **what**.

The `role` key-value-pair, as you may remember, is a part of the JSON, the common language that helps the API Connector to the ChatGPT API speak with each other. We're going to set up one more field on the *ChatGPT message* data type:

<table><thead><tr><th width="187">Data type</th><th width="144">Field name</th><th width="84">Type</th><th>Explanation</th></tr></thead><tbody><tr><td>ChatGPT Message</td><td></td><td></td><td></td></tr><tr><td></td><td>Message</td><td><code>text</code></td><td>The simple text message that your users see</td></tr><tr><td></td><td>Message JSON</td><td><code>text</code></td><td>The same text, formatted as JSON</td></tr></tbody></table>

The data type in the data tab should now look like this:

<figure><img src="/files/r5WTPFeudm0bsR9u3zLo" alt="" width="375"><figcaption><p>We've added one more field to store the JSON that holds the structure and metadata for each message.</p></figcaption></figure>

That's it for the data tab. Next, we'll edit the workflow and expressions to generate the JSON properly.

### The workflow tab

Returning to the workflow tab, we're going to make some changes to the workflows.

{% tabs %}
{% tab title="Step 1" %}
**Save the user's message**

The first workflow creates a new thing of the Chat data type, and we store the **message** that the user wrote.

In the Message JSON field we just created, we need to add a static text string in **front** of the dynamic value from the input field:

`{"role": "user", "content":`

You'll notice that we didn't close the curly bracket – that's because we need to add that **after** the dynamic content:

`}`

You can see what the entire field should look like under *Fields*:

***

**Action type**

[Create a new thing](#user-content-fn-18)[^18]

***

**Fields**

Message = `Input Message's Value`

**Message JSON =** `{"role": "user", "content":`**`Input Chat message's value:`**[**`formatted as JSON-safe`**](#user-content-fn-21)[^21]`}`

***

#### Screenshot

<figure><img src="/files/R83IoBR1oDXTFT1iP7zG" alt="" width="375"><figcaption><p>Click to enlarge.</p></figcaption></figure>
{% endtab %}

{% tab title="Step 2" %}
**Send the request to ChatGPT**

The second step is the actual **API call** that we set up in the API Connector. This time, we want to send the JSON that contains the messages, which is:

* each message wrapped in {}
* A key-value pair that specifies the *role.*
* A key-value pair that specifies the *message.*
  * Both of the above key-value pairs we've already saved in the *Message JSON* field on the *ChatGPT message* data type in Step 1 and Step 3.
* The final code should now reflect the structure in the [JSON we looked at earlier](#json-chat-message)

Keep in mind that *subject* and *topic* are dynamic parameters we [set up earlier](#adding-parameters) – they're not ChatGPT functions.

We'll reference the response from this step in [Step 3](#step-3).

***

**Action type**

[OpenAI - Send ChatGPT message](#user-content-fn-19)[^19]

***

**Parameters**

message-list = [Search for ChatGPT messages:](#user-content-fn-29)[^29] each item's message JSON[ join with ,](#user-content-fn-30)[^30]

***

#### Screenshot

<figure><img src="/files/Wfb7aLMTOS3g5JfikNXc" alt="" width="375"><figcaption><p>Click to enlarge.</p></figcaption></figure>
{% endtab %}

{% tab title="Step 3" %}
**Save ChatGPT's response**

In step 3, we're creating another Chat message to hold the **response** from [Step 2](#step-2). The change we're making in this step is similar, but keen in mind that we in step 3, we're saving the message from the *assistant* (ChatGPT). As such, we need to tweak the JSON a little bit to specify who is speaking:

**Before** the dynamic expression, we add:

`{"role": "assistant", "content": "`

And **after** the dynamic expression, we close the quote and curly bracket:

`"}`

***

**Action type**

[Create a new thing](#user-content-fn-18)[^18]

***

**Fields**

Message = [`Result of step 2 (OpenAl - Send Cha... 's`](#user-content-fn-22)[^22] [`choices`](#user-content-fn-23)[^23] `:first item 's message content`

Message JSON: `{"role": "assistant", "content":` "[**`Result of step 2 (OpenAl - Send Cha... 's`**](#user-content-fn-22)[^22] [**`choices`**](#user-content-fn-23)[^23] **`:first item 's message`** [**`content`**](#user-content-fn-24)[^24]**`:`**[**`formatted as JSON-safe`**](#user-content-fn-21)[^21]`"}`

***

#### Screenshot

<figure><img src="/files/9sAUIp3cmZki0odiB2Ch" alt="" width="375"><figcaption><p>Click to enlarge.</p></figcaption></figure>
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Before you test this workflow, you may need to delete ChatGPT database things already in your database, since they don't contain the JSON field we added in this section. This may lead to an error in the API, since we'll be
{% endhint %}

With that set up, you can test your app again. Click *Preview* and send the first chat message. Then, try sending another one to see how ChatGPT handles the context.

## FAQ: OpenAI ChatGPT

<details>

<summary>I am getting the error "You exceeded your current quota, please check your plan and billing details"</summary>

The cause of this error is most likely in your OpenAI settings, and can be displayed for a few different reasons. Please visit the article below in the OpenAI documentation to see a list of possible causes:

External page: [Error Code 429 | OpenAI Documentation](https://help.openai.com/en/articles/6891831-error-code-429-you-exceeded-your-current-quota-please-check-your-plan-and-billing-details)

</details>

<details>

<summary>I set up dynamic parameters in my call, but when I try using it in a workflow, Bubble doesn't show the parameters.</summary>

This may be because the parameters are to *private*. This is their default setting, and it hides the value of the parameter from your users. For it to be dynamic and usable in your app, you need to uncheck *Private* on each parameter in the call you want to send.

</details>

<details>

<summary>Bubble is showing some of the parameters I added, but not new ones</summary>

Keep in mind that for Bubble to show you the right parameters, you need to re-initialize the call for Bubble to learn the JSON and the response from the API.

To initialize a call, follow the [instructions](#initializing) earlier in this article.

</details>

<details>

<summary>When I add the call to an action, Bubble asks me to fill out <code>Content-type</code> on each call. Why is this necessary?</summary>

If you imported the call from a cURL, the *Content-type* is automatically added to each call. There are two ways you can stop Bubble from asking each time you set up an action:

* In the settings for the relevant call in the API Connector, locate the *Headers* section and the parameter with they key *Content-type*. Check the *Private* to change the parameter to non-dynamic and hidden.
* To apply the header automatically to all calls, you can move it from the call to the *Authorization* settings of the parent API provider. Locate the section called *Shared header for all calls*, and copy/paste the key and value there.

</details>

<details>

<summary>What is a "role" in ChatGPT?</summary>

The role specifies different parts of the conversation. In essence, "*who says what".* You can read a more detailed description [here](#understanding-roles-in-chatgpt).

</details>

<details>

<summary>What is a "token" in ChatGPT?</summary>

In the context of NLP (Natural Language Processing) as used in AI models like ChatGPT, tokens are essentially the basic elements of text, serving as the building blocks for these models to understand and interpret language. Each token represents a piece of textual data, making it easier for the model to analyze and process natural language efficiently.

Tokens are divided into different types:

1. **Word tokens**: Represent individual words.
2. **Punctuation tokens**: Represent punctuation marks like periods and exclamation marks.
3. **Number tokens**: Symbolize numbers, for instance, "100" or "2500".
4. **Special tokens**: Used for structure, such as marking sentence ends or indicating new paragraphs.

ChatGPT takes the message you send, and breaks it into tokens. This helps the model understand the meaning of the text and generate more accurate responses, as well as saving system resources.

By segmenting text into smaller parts or tokens, a model can more effectively learn and understand the statistical relationships between these tokens. This process is crucial in building a more accurate and efficient model for natural language processing, as it simplifies the complexities of language into manageable, analyzable elements.

For you as an app builder, knowing about tokens is useful, as it can help you do things like [setting a maximum response length](#can-i-set-the-length-of-the-response).

</details>

<details>

<summary>What does "hallucination" mean in ChatGPT?</summary>

Hallucinations is the term used to describe that LLMs can fabricate facts and present them in a convincing manner, even if they are incorrect. This is why OpenAI discourages trusting ChatGPT to always provide factually correct responses.

</details>

<details>

<summary>Can I control how creative or precise ChatGPT is? | What is <code>temperature</code>?</summary>

When studying the ChatGPT API documentation, you may have come across the `temperature` parameter. This is an optional parameter that tells ChatGPT how deterministic or random the response should be.

Temperature follows a range from 0 to 2, and supports decimals[^31]. The default value is 1.

⬆ a higher value means that the response will be more **random**. This can be useful for creative tasks, such as storytelling.

⬇ a lower value means the response will be more **deterministic and precise**. This is better for when you need correct factual responses. Keep in mind that ChatGPT can hallucinate[^32].

External page: [OpenAI API Reference](https://platform.openai.com/docs/api-reference/chat/create) | [Temperature](https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature)

</details>

<details>

<summary>Can I instruct ChatGPT to avoid repeating tokens? | What is <code>frequency_penalty</code>?</summary>

When studying the ChatGPT API documentation, you may have come across the frequency\_penalty parameter. This is an optional parameter that tells ChatGPT how strict it should be about repeating a certain [token](#what-is-a-token-in-chatgpt) in the response.

Frequency penalty requires a range from -2.0 and 2.0, and supports decimals[^31]. The default value is 0.

⬆ a higher value means that ChatGPT will **avoid repeating tokens** in the response, to avoid a repetitive text. Keep in mind that avoiding repetition is not always a good thing. For example, if you discuss the subject of "Bubble", you'll want ChatGPT to be able to repeat that token and stick to the subject.

⬇ a lower value means that ChatGPT will **not avoid repetition**, and will stick strictly to the subject being discussed. This can be used to increase the likelihood of repetition.

External page: [OpenAI API Reference](https://platform.openai.com/docs/api-reference/chat/create) | [Frequency penalty](https://platform.openai.com/docs/api-reference/chat/create)\
External page: [OpenAI API Reference](https://platform.openai.com/docs/api-reference/chat/create) | [Frequency penalty explainer](https://platform.openai.com/docs/guides/text-generation/frequency-and-presence-penalties)

</details>

<details>

<summary>Can I set the length of ChatGPT's response? | What is <code>max_tokens</code>?</summary>

Yes, ChatGPT supports setting a maximum number of [tokens](#what-is-a-token-in-chatgpt). In essence (although the actual calculation is a bit more complex, see previous link), this instructs ChatGPT to keep the number of words in a response to a set value.

The `max_tokens` parameter lets you assign a number value to the total number of tokens that can be generated in the chat completion.

**Keep in mind:**

* Tokens don't represent an actual word count – they also include things like spaces, punctuation and paragraph changes
* Setting a maximum number of tokens can help you control the cost of using the API, by avoiding overly lengthy responses

</details>

<details>

<summary>I can't see any chat messages in my repeating group</summary>

If the messages are not showing in the repeating group, try the following:

* Check the Data tab to see if the things have been successfully created
* Check the data source on the repeating group that it doesn't contain any errors or unnecessary constrains
* Check that the data is not hidden by [privacy rules](#user-content-fn-33)[^33]
* Check the [issue tracker](#user-content-fn-34)[^34] for any issues

</details>

<details>

<summary>How can I show the conversation history to look like a traditional chat (like WhatsApp or iMessage?</summary>

If you have set up repeating group to display all the chat messages, you may want to change the formatting of it to show in a visual way **who said what**.

You can format this in a few different ways, such as:

* Including a header in the message that shows the role of the "speaker"
* Assign different colors to the `assistant` and `user` roles
* Set alignment based on `role`, such as user messages on the right and assistant messages on the left

Whichever type of formatting you choose, you can solve this by **adding another field** to the *ChatGPT message* data type, **that includes the role of the "speaker"**.

This can be a text field that simply reflects the role parameter as they appear in the ChatGPT request and response, or you can use an [option set](#user-content-fn-35)[^35] with the two roles set up as separate options.

</details>

<details>

<summary>How can I make sure that chat history only shows messages that belong to a specific conversation, as opposed to all messages ever created?</summary>

You may want to save isolated conversations in your app. For example, you may want to separate the chat history between different users, so that one user only has access to their own chat history, or even that each user can keep track of multiple threads.

Keep in mind that ChatGPT doesn't save your conversations in a way that lets you load and display the conversation later – but you can easily set this up using the Bubble database and the *ChatGPT message* data type we created [earlier in this article](#the-workflow-editor).

#### **Separating messages by user**

To filter out messages created by the same user, you can **use Bubble's built-in&#x20;*****Created by*****&#x20;field**. Access the *Do a search for* data source in the repeating group you created, and **add a constraint:**

`Created by = Current user`

#### **Separating by conversations**

If you have used ChatGPT's own web app, you may be used to seeing chat history neatly organized into conversations that are stored permanently.

To do the same thing in Bubble, you can **add a new data type called&#x20;*****Conversation***, and **a new field to the&#x20;*****ChatGPT message*****&#x20;data type that links to the&#x20;*****Conversation*****&#x20;data type**. Save the conversation on each message, and finally set up a constraint on the repeating group that filters by the new field. In the example below, we're showing how you can use a dropdown to allow for conversation selection:

`Conversation = Dropdown Conversation's value`

</details>

[^1]: ChatGPT provides a user-friendly platform that acts like a "demo" space for interacting with the ChatGPT model.

    Here, you can familiarize yourself with how to craft prompts and understand the kind of responses you can expect.

    External page: [OpenAI Chat](https://chat.openai.com/)

[^2]: The ChatGPT model is the version of ChatGPT that you want to use, such as GPT 3.5 and GPT 4.

    A newer version may give a more sophisticated response, but may also require more time to process.

[^3]: A Command line is a terminal where you can send commands directly, such as Mac Terminal, Windows Command Prompt or a Unix/Linux terminal.

[^4]: An endpoint is a specific URL that your app can send requests to, to retrieve or manipulate data. It determines which resource we want to work with.

[^5]: The bearer token is a string that identifies who the client is. It serves as both username and password and is included in the header of the API request.

    The bearer token does not *contain* the username and password – they are entirely independent.

    Article: [API terminology](/help-guides/integrations/api/the-bubble-api/bubble-api-terminology)\
    Article: [Authenticating with OpenAI](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication)

[^6]: The API key is generated in the OpenAI platform.

    External page: [OpenAI platform](https://platform.openai.com/)

    Article: [Authenticating with OpenAI](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication)

[^7]: *cURL* is a tool for initiating calls in command line tools such as Mac/Windows/Unix Terminal.

    In Bubble, the cURL command itself is not needed for this process, but can be used to import new calls into the API Connector.

[^8]: Initializing means to send a test call to OpenAI, so that you and Bubble can see what a response looks like. This instructs Bubble what to expect when communicating with this particular endpoint.

[^9]: This will be the name you see when you use a call in your app's data sources and workflows.

[^10]: Parameter wrapped in <>.

[^11]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^12]: "Our solar system" and "sunflowers", that we included in the above examples.

[^13]: *Private* means that a parameter is not visible anywhere in your app (including its code base). This is used to keep sensitive information protected.

    In this context, we don't mind if the text is visible to the user. The data is still encrypted as soon as it leaves the user's device.

    Article: [API Connector Security](/help-guides/integrations/api/the-api-connector) | [Parameters](/help-guides/security/api-security/api-connector-security#parameters)

[^14]: The design tab is where you design the pages in your app, by dragging and dropping or drawing element directly on the canvas.

    Article: [The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)

[^15]: The *workflow tab* is where you set up triggers and actions to make your app react to user input and other criteria.

    Article: [The workflow tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/workflow-tab)

[^16]: If they are not showing, make sure you have unchecked *Private* on each parameter you want to be dynamic.

    Private parameters are not visible to your users, and as such cannot accept user input.

[^17]: A database thing is a single record in the database, such as one specific user.

    Article series: [The database](/help-guides/data/the-database)

[^18]: *Create a new thing* is an action that creates a new thing (database record) in the database.

    Reference: [Create a new thing](/core-resources/actions/data-things#create-a-new-thing)

    Article series: [The database](/help-guides/data/the-database)

[^19]: This label may change, depending on the name you gave it in the API connector.

[^20]: The name of the input may differ, depending on what you provided in the element's property editor.

[^21]: *Formatted as JSON-safe* sanitizes a text string, date, yes/no, or list of texts into a JSON-acceptable format by escaping characters that would otherwise break expected JSON formatting.

    Reference: [Formatted as JSON safe](/core-resources/data/operations-and-comparisons#formatted-as-json-safe)

[^22]: This references Step 2, where we made the API call to OpenAI.

[^23]: ChatGPT has the ability to send a list of several different responses. By default, it sends just one, but this is why we need to add the `:first item` operator to the `choices` data source.

    In essence, we are instructing Bubble to show the first item in the list of responses.

[^24]: *Content* is the parameter in OpenAI's response that contains the message from the *assistant role*.

[^25]: If you run into errors, see the FAQ section at the bottom of the article for suggestions.

    Article section: [FAQ](#faq-openai-chatgpt)

[^26]: These symbols:\
    \
    \[

    ]

[^27]: These symbols:\
    \
    {

    }

[^28]: Metadata essentially means *data about data.* In this context, the metadata is the `role`, while the data is the `message`.

[^29]: Do a search for

[^30]: The *Join with* operator takes a list of texts and creates one single string where each of the texts are separated by a specified character, such as a comma.

    Reference: [Join with](/core-resources/data/operations-and-comparisons#join-with)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^31]: Use the American (.) as opposed to the European (,) decimal point.

[^32]: *Hallucinations* is the term used to describe that LLMs can "make up" facts and present them in a convincing manner even if they are incorrect.

    This is why OpenAI discourages trusting ChatGPT to always provide factually correct responses.

[^33]: Privacy rules are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^34]: The *issue tracker* is the automatic debugging tool that shows errors in properties such as dynamic expressions.

    Article series: [Testing and debugging](/help-guides/maintaining-an-application/testing-an-application)

[^35]: Option sets let you set up different types of static options in a database-like structure, but without using the database. This is useful to store information like days of the week, marital status, colors, states, countries and other data that you want to load quickly and that's rarely updated.

    Article: [Option sets](/help-guides/data/static-data/option-sets)
