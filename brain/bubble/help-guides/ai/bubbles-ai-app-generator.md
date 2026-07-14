# Generate apps with AI
> Source: https://manual.bubble.io/help-guides/ai/bubbles-ai-app-generator · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Prompt guide

{% hint style="warning" %}
**Acceptable use:** Don’t submit prompts that violate our [Acceptable Use Policy](https://bubble.io/acceptable-use-policy). Prompts that are malicious, contain injections, or are too vague will be automatically rejected.
{% endhint %}

{% hint style="info" %}
Creating mobile apps with the AI App Generator is currently in beta.
{% endhint %}

Bring your app idea to life with a well-written prompt. Here’s how to craft a clear, detailed prompt that helps Bubble AI build what you have in mind. These guidelines apply whether you’re building a web app or a [native mobile app](#user-content-fn-1)[^1].

### **What to include**

* **App type and purpose** – What kind of app is it, and what problem does it solve?
* **Target users** – Who is this app for?
* **Core features** – What should users be able to do?
* **Visual style** – Any colors, mood, or design references to guide the look and feel

**Example structure**

{% code overflow="wrap" %}

```
"A [app type] for [target users] to [main purpose]. Users can [key features]. Style should be [visual preferences]."
```

{% endcode %}

## Effective Prompt Examples

### Web - Good Examples

#### Task Management App

{% code overflow="wrap" %}

```
A productivity app for small teams to track project tasks and deadlines. Team members can create tasks, assign them to colleagues, set due dates, and mark completion. Clean, minimalist design with blue and white colors.
```

{% endcode %}

#### Local Restaurant Finder

{% code overflow="wrap" %}

```
A discovery app for food lovers to find nearby restaurants and read reviews. Users can search by cuisine type, view restaurant details, see ratings, and save favorites. Modern design with warm colors and food photography.
```

{% endcode %}

#### Fitness tracker

{% code overflow="wrap" %}

```
A wellness app for fitness enthusiasts to log workouts and track progress. Users can record exercises, set goals, view workout history, and share achievements. Energetic design with bright green accents and dark mode support.
```

{% endcode %}

### Mobile - Good Examples

#### Lifestyle app

{% code overflow="wrap" %}

```
A meal planning app for busy families to organize weekly menus and discover recipes. Warm design with sage green and cream, food photography emphasis.
```

{% endcode %}

#### Productivity tracker

{% code overflow="wrap" %}

```
A time-blocking app for knowledge workers to schedule focused work sessions. Users can create time blocks, set focus timers with breaks, and track daily productivity patterns. Minimalist design with forest green and cream, calm aesthetic.
```

{% endcode %}

#### Social Media scheduler

{% code overflow="wrap" %}

```
A content scheduling app for creators and small businesses to plan posts across platforms. Modern design with coral and navy blue, influencer-focused style.
```

{% endcode %}

***

## ✅ Tips for better results

{% stepper %}
{% step %}

### Be specific about purpose

**Instead of:** "A business app"\
**Try:** "An invoice management app for freelancers"
{% endstep %}

{% step %}

### Define your users clearly

**Instead of:** "For everyone"\
**Try:** "For college students planning events"
{% endstep %}

{% step %}

### Give visual directions

**Instead of:** "Make it look good"\
**Try:** "Professional design with navy blue and gold, inspired by financial apps"
{% endstep %}

{% step %}

### Focus on core features first

**Instead of:** "Users can do everything they need"\
**Try:** "Users can create events, invite friends, and track RSVPs"
{% endstep %}
{% endstepper %}

## ❌ What to avoid

{% stepper %}
{% step %}

### Being too vague

"Make me a social app that's really cool and modern."
{% endstep %}

{% step %}

### Too detailed on layout

"Put the login button in the top right corner, make the sidebar exactly 250px wide, and use Helvetica font for all headers."
{% endstep %}

{% step %}

### Technical specifications

"Integrate with Stripe API, use PostgreSQL database, and implement OAuth authentication with Google and Facebook."
{% endstep %}
{% endstepper %}

## Style and design guidelines

There is some overlap between color and mood, but make sure you include both in your prompt.

### Color Preferences

* Be specific: "forest green and cream" vs. "green"
* Mention themes: "dark mode," "minimalist," "vibrant"
* Reference styles: "corporate professional," "playful startup"

### Mood and feel

* Professional and corporate
* Fun and playful
* Clean and minimalist
* Bold and modern
* Warm and friendly

## Limitations

Please note that the mobile app generator creates UI layouts, dynamic expressions, sample data and data types, but it does *not* generate workflows yet.

## FAQ

<details>

<summary>What is sample data?</summary>

Sample data refers to placeholder information that mimics real data and is used during the app-building process. Bubble AI generates sample data to help you visualize how your app will look and function once it’s populated with actual user information. For example, if your app includes a list of users or a gallery of products, Bubble AI might fill those areas with sample names or descriptions.

This temporary data is particularly useful for making sure your app works: testing and refining the design, workflows, and overall user experience before launching your app. Once you’re satisfied with the app’s structure, you can replace the sample data with live information or accept real data coming from your users. By including realistic sample data, Bubble ensures you can clearly see how your app will behave in a real-world scenario.

</details>

[^1]: There are currently some limitations when building mobile apps with the AI App Generator. See the section below for more information

    Section: [Limitations with generating a mobile app](#limitations-with-generating-a-mobile-app)
