# AI page designer
> Source: https://manual.bubble.io/help-guides/ai/ai-page-designer · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This beta feature is not yet available on [dedicated instances](#user-content-fn-1)[^1].
{% endhint %}

Welcome to the beta testing program for the AI page designer feature!

We’re excited to bring you this first step in how we plan to implement artificial intelligence into the app creation process. Our goal is to help Bubble users develop great-looking, efficient apps using conversational prompts. We believe this is the future of app development and aligns with our core mission of making app development accessible to everyone.

Please note that this page design feature is part of a larger body of work still in development so it is not considered complete or final. Your feedback is crucial in helping us refine and improve. Thank you for your participation and support!

## Prompt guide

If you have worked with AI tools such as ChatGPT and MidJourney, you will be familiar with the concept of a *prompt*. A prompt is essentially a text that instructs the AI on what you want it to generate, providing important keywords and a framework within which to work.

### Length

We recommend a length of about 1-2 sentences.

### Variables

A prompt, in principle, gives you the freedom to type whatever descriptions you want, and our AI will make sense of it to generate the desired output. We recommend working with specific variables that our engine can use to identify the key elements in the prompts. This approach ensures that the AI understands your instructions more clearly and delivers more accurate results.

Variables are not set in stone, but we encourage you to adopt a mindset where your prompt gravitates around the most important keywords. The list below is not exhaustive or required but can help you get ideas on how to structure your prompt:

* \[Page type]
* \[App type]
* \[Target audience]
* \[Dark mode or no?]
* \[User Goal]
* \[Primary Color]
* \[Emotion]
* \[Image type]
  * We recommend starting with photographic images.
  * See the full list of image types below.
* \[Font description]

### Image types

#### Image types

These are examples of image styles that you can call out in your prompt:

* 3d-model
* Analog-film
* Anime
* Cinematic
* Comic-book
* Digital-art
* Enhance
* Fantasy-art
* Isometric
* Line-art
* Low-poly
* Modeling-compound
* Neon-punk
* Origami
* Photographic
* Pixel-art
* Tile-texture

### Limitations

* Color schemes that involve more than one color will not work.
* The landing page is the most customizable page— other pages such a dashboard, marketplace, and social media feed have less color and photography.
* Bubble AI will prevent any prompt generations that violate our content guidelines.
* We do not yet have the ability to create any set of features from scratch. Our pages are defined at the page level, not component or feature level.

## Example prompts

### Example 1

{% code overflow="wrap" %}

```
A [landing page] for a [dog walking marketplace] for [college students] who want to [make money and save time for walking their dogs]. The page should be [green], evoke emotions of [friendliness, relaxation, and convenience], use [photographic] images, and a [funky] font.
```

{% endcode %}

### Example 2

{% code overflow="wrap" %}

```
A [dashboard] for a [fitness tracking app] aimed at [busy professionals] who want to [monitor their health efficiently]. The page should be [blue], evoke emotions of [motivation and clarity], use [digital-art] images, and a [modern] font.
```

{% endcode %}

### Example 3

{% code overflow="wrap" %}

```
A [social media feed] for a [travel blog] targeting [adventure enthusiasts] who want to [share and discover new destinations]. The page should be [orange], evoke emotions of [excitement and exploration], use [cinematic] images, and a [bold] font.
```

{% endcode %}

[^1]: A dedicated instance means your Bubble app is on the Enterprise plan and runs on its own dedicated server infrastructure, rather than sharing resources with other apps.

    \
    Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)
