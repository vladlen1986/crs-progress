# Calls
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/openai/calls · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="OpenAI documentation" %}
OpenAI’s documentation provides thorough information about both the authentication process and how to set up calls.

External page: [OpenAI API reference](https://platform.openai.com/docs/api-reference) | [Authentication](https://platform.openai.com/docs/api-reference/authentication)
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

<details>

<summary>ChatGPT – Large Language Model</summary>

ChatGPT (Generative[^2] Pre-trained[^3] Transformer) is a [*Large Language Model (LLM)*](#user-content-fn-4)[^4] developed by OpenAI. It is a type of AI that has been trained to generate human-like text in response to a wide range of prompts and questions. ChatGPT is designed to understand and respond to natural language, and it can generate text that is both informative and creative.

Article series: [ChatGPT calls](/help-guides/integrations/api/the-api-connector/api-guides/openai/calls/chatgpt)

</details>

[^1]: Authentication is the process of determining *who* a client is, in order to check *what* they are authorized to access.

    \
    **OpenAI:**

    Article: [Authenticating with OpenAI](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication)

    **General articles:**\
    Article series: [API](/help-guides/integrations/api)

    Article section: [API Connector authentication](/help-guides/integrations/api/the-api-connector#authentication)

[^2]: *Generative AI* refers to a type of artificial intelligence that can generate new content based on its training and user input.

    It's capable of creating texts that were not explicitly programmed into it but are instead generated based on patterns it has learned from a large dataset.

[^3]: *Pre-trained* means that the AI has been trained with machine learning on existing data. In the case of ChatGPT, this includes vast sources of text that OpenAI have included in the training material.

[^4]: A *Large Language Model* is an advanced AI algorithm designed to understand, interpret, and generate human language.

    It's "large" because it's trained on massive datasets of text, allowing it to recognize and replicate complex linguistic patterns.
