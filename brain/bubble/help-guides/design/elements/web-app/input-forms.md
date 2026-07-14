# Input forms
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Input forms. These are element that accept data input from a user such as text, numbers, dates, uploads and dynamic content.

Input forms are the elements that you use to collect information from your users. They can be used for a simple checkbox or combined into complex forms.

{% hint style="info" %}
The articles in this section cover Bubble's built-in input elements. There are also a wide range of plugins in the [plugin store](https://bubble.io/plugins) that offer new ways of accepting user input.
{% endhint %}

## Different kinds of input

User input can mean many things, and most applications accept a wide range of different categories of input from their users. Even single forms are usually made up of different types of inputs that makes it easy for your users to understand what kind of data they're asked to provide.

<figure><img src="/files/X0JLOEx4Tmcu2k0QsY5w" alt=""><figcaption><p>A simple signup form like the one above combines several different categories of input forms to make the UX easy for your users to understand and to prepare the data for processing – such as saving it in the database.</p></figcaption></figure>

### Text and numbers

Text and number inputs allow users to provide text ranging from short, [structured data](#user-content-fn-1)[^1] like an email address, an order number or a name to long, [unstructured data](#user-content-fn-2)[^2] like a blog post or product description. Text can be formatted (rich text) or unformatted (plain text).

Article: [Text and number elements](/help-guides/design/elements/web-app/input-forms/text-and-numbers)

### Dates and time

Date and time inputs allow users to provide date and time values. Some inputs let users type the information in, others are set up to let users pick a date from a calendar and a time from a timepicker.

Article: [Dates and time elements](/help-guides/design/elements/web-app/input-forms/dates-and-time)

### File uploads

File uploads are a third category of input that allows users to upload any kind of file to your application.

Article: [File uploads](/help-guides/design/elements/web-app/input-forms/file-uploads)

### Selection controls

Selection controls are input elements that let you set up pre-defined options for your users to select from. This allows you to restrict the available choices, ranging from simple yes/no answers to selecting preset text/numerical values and dynamic content from your app's database.

This includes:

* Checkboxes
* Radio buttons
* Dropdown lists

Article: [Selection control](/help-guides/design/elements/web-app/input-forms/selection-controls)

## Triggering a workflow when an input is changed

You can trigger a workflow whenever the value of a specific input form is changed.

## Input forms and security

With the `This input is disabled` property, you can disable an input form. Disabling an input makes it read-only in the UI, but it's not a secure way to prevent edits. Because it's handled client-side, users can still tamper with it. Use server-side protections like privacy rules, workflow conditions, or backend workflows to enforce security.

Article series: [Security](/help-guides/security)\
Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

<details>

<summary>Video lessons</summary>

* [How to trigger workflows from input changes](https://www.youtube.com/watch?v=mDEVJLujlkQ)

</details>

[^1]: *Structured data* is information that is organized in a consistent format. For example, a phone book would typically contain structured data like First name, last name and email.\
    \
    \&#xNAN;*Unstructured data* is data that is more inconsistent and often longer. Examples include news articles, blog posts and the contents of en email.

[^2]: *Unstructured data* is data that doesn't have a predictable format. Examples include news articles, blog posts and the contents of en email.

    \
    \&#xNAN;*Structured data* is information that is organized in a consistent format. For example, a phone book would typically contain structured data like First name, last name and email.
