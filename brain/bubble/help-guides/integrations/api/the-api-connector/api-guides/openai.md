# OpenAI
> Source: https://manual.bubble.io/help-guides/integrations/api/the-api-connector/api-guides/openai · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<figure><picture><source srcset="/files/VcQmbbhlTkDyC8quBht0" media="(prefers-color-scheme: dark)"><img src="/files/VFZXorWCzNvFf8gyhEWb" alt="OpenAI logo" width="375"></picture><figcaption></figcaption></figure>

In this article series, we'll explore how you can connect to OpenAI using the API Connector. We recommend you start by reading this article to set up an account an API key, then move on to authentication and finally the call(s) you are looking for.

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

{% embed url="<https://www.youtube.com/watch?v=pDisVpv_Q6I>" %}
In this course, featuring instructor Gregory John, you'll learn how to create Social Rabbit, an AI application that transforms extensive blog posts into social media content tailored to specific platforms and tones.
{% endembed %}

## OpenAI API platform and documentation

The first thing we can extract from OpenAI’s API documentation is that they use API keys for authentication. This means you need to generate an API key through the OpenAI platform.

## Setting up an API key

The first thing you need to do if you haven’t already, is to create an account with OpenAI. This lets you set up API keys, set up billing and manage details about your account and the OpenAI tools you want to use.

External pages: [OpenAI platform](https://platform.openai.com/) | [Sign up/Log in](https://platform.openai.com/signup/)

After going through the required steps to sign up, navigate to the API keys section. This is where you will create new keys and manage those you have already created.

{% hint style="warning" %}
OpenAI maintains a strict secret API key policy that doesn’t allow you to see your API key after having seen it the first time. We strongly recommend that you store your API key in a secure environment, like a password manager.

To avoid API keys becoming visible in your app's code, you should only ever store the keys in the proper place in the API Connector.

Article: [API Security](/help-guides/security/api-security)
{% endhint %}

We recommend setting up a unique API key for each app where you want to use the API, so that you can control the permissions of each key tailored to each individual app. This also lets you replace the API key in the event of it being misplaced, without having to replace it in multiple apps.

### Permissions

The Permissions setting lets you control what a specific API key has access to. Permissions come in three levels:

<table><thead><tr><th width="201">Permission Level</th><th>Description</th></tr></thead><tbody><tr><td>All</td><td>Grants full permissions for the secret key. This is the default setting for new keys.</td></tr><tr><td>Restricted</td><td>Allows specific permissions (None, Read, Write) to be set for each endpoint, enabling customized access control.</td></tr><tr><td>Read only</td><td>Provides read permissions for all endpoints, but prohibits any write operations.</td></tr></tbody></table>

Each endpoint gives you access to a resource, and you can control the permissions an API key has to individual resources.

Now that we have the API key, we can set up the authentication in the API Connector.

## Authentication with OpenAI

The first part of setting up a connection to OpenAI, is to authenticate. Authentication is the process of letting the API know who you are (similar to logging in to an app), so that the API can determine what services you have authorization to use.

Article: [Authenticating with OpenAI](/help-guides/integrations/api/the-api-connector/api-guides/openai/authentication)

## Other ways to learn

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

Video: [Learn to Build an AI app with Bubble](https://www.youtube.com/watch?v=pDisVpv_Q6I)

In this course, featuring instructor Gregory John, you'll learn how to create Social Rabbit, an AI application that transforms extensive blog posts into social media content tailored to specific platforms and tones. For example, you could adapt a detailed article about the Tesla Cybertruck into a concise, inspirational post for x.com.

You'll use Bubble’s API connector to integrate with OpenAI, with a particular focus on constructing effective prompts. This includes generating high-quality images that align with the blog content you are adapting. Additionally, the course covers the essentials of crafting a seamless user experience within Bubble, particularly when handling the inherent delays in AI processing with services like OpenAI.

Whether you are beginning your journey in AI development or looking to enhance your skills, this course is designed to equip you with the practical knowledge to build AI-driven applications efficiently.

</details>
