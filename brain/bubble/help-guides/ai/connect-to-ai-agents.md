# Connect to AI models
> Source: https://manual.bubble.io/help-guides/ai/connect-to-ai-agents · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Introduction

This section introduces how to connect your Bubble app to AI agents such as ChatGPT and Claude using the API Connector. The articles explain how these systems receive and return data, how to structure requests correctly, and how to handle different types of responses, including streaming. The goal is to help you set up reliable, efficient AI integrations that work smoothly with your app's existing workflows.

## What can AI providers do for my app?

Integrating AI providers into your Bubble app enables a wide range of functionality that would otherwise require complex logic or human input. These systems process language, generate content, make decisions, and analyze patterns in ways that are difficult to build manually. Depending on the use case, AI can enhance both the user experience and the efficiency of your workflows.

Some common examples include:

* **Conversational interfaces:** Build chatbots or virtual assistants that can respond to user input in natural language.
* **Text generation:** Automate copywriting, summaries, replies, or content suggestions based on input from users or your database.
* **Classification and tagging:** Automatically label or organize user-generated content such as reviews, messages, or support requests.
* **Search and retrieval:** Use semantic search to find relevant documents or database records based on a user’s query.
* **Decision support:** Provide intelligent suggestions or evaluations based on patterns in the input data.

These features can be added without changing your database structure or logic—AI acts as a layer that interprets or generates information as needed, often with just a few API calls.

## Integration guides

### ChatGPT

This guide shows you in detail how you can connect to OpenAI's different ChatGPT models using the API Connector. We'll cover how to authenticate with OpenAI and set up your first calls.

Article series: [Connecting to OpenAI using the API Connector](/help-guides/integrations/api/the-api-connector/api-guides/openai)

#### Streaming API

When connecting to external APIs, most responses follow a standard JSON format: your app sends a request, and the API returns all the data at once. Streaming APIs work differently. Instead of waiting for the full response, data is sent back in chunks as it becomes available. This is useful for situations where content is generated over time—like AI-generated text—allowing your app to start displaying results before the full response is complete.

Article: [Using the streaming API feature in the API Connector](/help-guides/integrations/api/the-api-connector/streaming-api)
