# ChatGPT
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
If you are new to the API Connector and/or APIs in general, we recommend that you that you start out reading our in-depth article series on these subjects:

Article series: [API](/help-guides/integrations/api)
{% endhint %}

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
{% endtabs %}

Having set up the authentication[^1], it's time to set up calls to start communicating with OpenAI's services.

In this article series, we’ll look into how you can set up a connection with OpenAI’s API, to use its text/image generation and speech/image recognition capabilities in your app.

## What is ChatGPT?

ChatGPT (Generative Pre-trained Transformer) is a large language model developed by OpenAI. It is a type of AI that has been trained to generate human-like text in response to a wide range of prompts and questions. ChatGPT is designed to understand and respond to natural language, and it can generate text that is both informative and creative.

Here are some of the key features of ChatGPT:

* Large language model: ChatGPT is one of the largest language models ever developed. This allows it to generate text that is coherent, informative, and creative.
* Generative: ChatGPT is a generative model, which means that it can create new text from scratch. This is in contrast to discriminative models, which can only classify or predict existing text.
* Conversational: ChatGPT is designed to be conversational, which means that it can engage in a dialogue with users. This makes it a more natural and user-friendly way to interact with AI.
* Multimodal: ChatGPT can generate text in response to a variety of input modalities, including text, images, and audio.

There are a wide range of different use cases for Bubble apps, such as summarizing texts, translating between different languages, answering questions, generating code and helping brainstorming everything from project ideas to marketing strategies and messages.

## Calls

<details>

<summary>Chat</summary>

Chat is essentially the API version of what you experience when you use OpenAI's own [ChatGPT platform](#user-content-fn-2)[^2]. When you send a request to OpenAI's server, it includes a message, and the server responds with a generated text.

Article: [Chat](/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt/chat)

</details>

[^1]: Authentication is the process of determining *who* a client is, in order to check *what* they are authorized to access.

    \
    **OpenAI:**

    Article: [Authenticating with OpenAI](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication)

    **General articles:**\
    Article series: [API](/help-guides/integrations/api)

    Article section: [API Connector authentication](/help-guides/integrations/api/the-api-connector#authentication)

[^2]: ChatGPT provides a user-friendly platform that acts like a "demo" space for interacting with the ChatGPT model.

    Here, you can familiarize yourself with how to craft prompts and understand the kind of responses you can expect.

    External page: [OpenAI Chat](https://chat.openai.com/)
