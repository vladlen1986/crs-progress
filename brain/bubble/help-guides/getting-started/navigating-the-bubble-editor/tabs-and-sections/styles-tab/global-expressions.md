# Global expressions
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/styles-tab/global-expressions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Global expressions let you build a dynamic expression once and reuse it anywhere in your app. They  give you a single source of truth for any expression that would otherwise be duplicated across multiple pages, workflows, or elements.

{% hint style="info" %}
Global expressions are available in the **new property editor only**. If you set up a global expression in the new property editor, and then switch to the old editor, they will still work, but cannot be edited until you switch back.
{% endhint %}

You can find global expressions in *Global – Global expressions.*

### How they work

{% hint style="info" %}
Global expressions have access to **global data sources**, meaning data sources that are available anywhere in your app, such as `Do a search for`, `Get an option` and `Current user`.

Context-specific data sources such as `This element`, `This page` and `Get data from page URL` are currently not available.
{% endhint %}

When you create a global expression, you build a dynamic expression the same way you would anywhere else in Bubble. Once saved, the expression becomes available throughout your app and can be referenced anywhere a dynamic expression is used.

If you need to change the expression later, you only change it in one place. The update applies automatically everywhere the global expression is referenced.

<figure><img src="/files/7huzISke3UsECIE6oUMK" alt=""><figcaption></figcaption></figure>

### Parameters

Global expressions can accept parameters, which let you customize the expression each time it's used.

The structure works like this: you set up the core logic of the expression once, with any constraints or values that are always the same. Then, when you reference the expression elsewhere in your app, you can supply additional values through parameters. This makes the same global expression usable across different contexts without having to rebuild the underlying logic.

For example, a global expression set up as a search with a few base constraints can accept additional constraints as parameters wherever it's used. The core query stays consistent, while each use can refine it for its specific context.

### Using global expressions in a dynamic expression

Any global expression you set, creates a new data source carrying the name you give it, and this data source can be inserted into any dynamic expression in your app. To insert a global expression, select *Use global expression*, and select the expression you want to use. Then, populate the parameters.

### When to use a global expression

Global expressions are most useful when the same logic appears in multiple places. Common examples include permission checks, date calculations, status checks, formatted strings, and pricing calculations.

If an expression only appears once in your app, there's no need to make it global. The benefit comes from centralizing logic that would otherwise be duplicated.

### Benefits

Using global expressions gives you a few practical advantages:

* **One place to make changes.** Updating an expression that's used in many parts of your app becomes a single edit instead of a hunt through the editor.
* **A single source of truth.** Everywhere the expression is used reflects the same logic, which reduces the risk of subtle inconsistencies between similar expressions.
* **Cleaner expressions throughout your app.** Long or complex expressions can be replaced with a named reference, making workflows and elements easier to read.
