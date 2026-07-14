# Previewing a web app
> Source: https://manual.bubble.io/help-guides/previewing-your-app/previewing-a-web-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This section describes previewing **web apps**. If you're looking for documentation on previewing **native mobile apps**, see the article below:

Article: [Previewing a mobile app](/help-guides/previewing-your-app/previewing-a-mobile-app)
{% endhint %}

Bubble makes it easy to preview your web app while you build. Previewing lets you test functionality, check design changes, and make sure everything works the way you expect—before deploying your app to live users.

This article explains the different ways you can preview your web app from the Bubble editor.

## Preview modes

You can preview your app using the **Preview** button in the top-right corner of the editor. This opens a new browser tab showing your app’s development version. By default, your app loads in **normal preview mode**, but there are also additional safe preview modes available, which can help when debugging or isolating potential issues.

### 1. **Preview**

This is the standard way to test your app. It loads the full development version, including:

* All custom HTML
* All installed plugins
* All workflows and elements

Use this mode for general testing.

### 2. **Disable HTML**

This mode disables any custom HTML elements you've added through the HTML element or the page header.

Use this if you're experiencing rendering issues or suspect your custom code might be affecting the app.

### 3.**Disable plugins**

This mode disables all plugins, allowing you to test your app without third-party code. Use this if you think a plugin is causing a problem in your app.

### 4. **Safe preview – Disable HTML and plugins**

This mode disables both plugins and custom HTML. Use this if you're encountering persistent issues and want to isolate whether the problem is being caused by third-party code.

## How to access safe preview modes

1. Click the **Preview** button dropdown (downward arrow next to Preview).
2. Choose the mode you want to use:
   * Preview
   * Disable custom HTML
   * Disable plugins
   * Disable HTML & plugins

Each mode opens a new tab with the corresponding version of your app.

## Note on preview URLs

All preview modes load your app in the development version. The URL will include `version-test`, like so:

```
https://yourapp.bubbleapps.io/version-test
```

This version is separate from your live app and only reflects the latest changes in your editor.
