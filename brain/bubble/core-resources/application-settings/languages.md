# Languages
> Source: https://manual.bubble.io/core-resources/application-settings/languages · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Translating your app's text strings and error messages into different languages.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for all experience levels<mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (1)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Translating your app

* Article: [Translating your app's text strings](/help-guides/data/static-data/app-texts-translations)
  {% endtab %}
  {% endtabs %}

## General setting

### Application primary language

This is the primary language for the app. All messages that the app can send or display to users, such as 'This account doesn't exist.' will be translated. Customize these messages in the Languages section in the Settings Tab. Elements that are language-sensitive, such as a calendar element, will adjust automatically.

### Language field on the user type

To set a language for a given user, select the field that should contain that information. It should be a field of type text or an option set and should contain a string that matches one of the languages in the dropdown menu (as shown between the parentheses). If this is not the case or no field is set, the user's language will be the language contained in the 'lang' parameter of the URL. If this is not set, the app's primary language will be used. After changing this, users should refresh the page for the latest language texts to be included.

### Attribute for language field

If the field on the user type is an option set, this dropdown can be used to select the attribute on the option set to use for the user's language. The attribute should be of type text.

## Application texts & messages

### Export / Import translation configuration to CSV

To make handling bulk translations easier, you can export all app text translations in one or multiple languages to a CSV or import from a CSV. We recommend exporting as CSV to get the required format of the CSV for the import.

In the exported CSV, the first column is named "plugin\_name" - "CORE" refers to any app texts that come by default with every Bubble app, "USER TEXTS" refers to any app texts that you have created for this app, and other values correspond to plugins that have been installed in the app. The column "TEXT CODE" refers to the unique identifier of each app text. Any languages you've chosen to export or import will show up in separate columns, with the language code as the column header.

{% hint style="info" %}
**Tip:** If you export your app texts then want to import them into Excel or Google Sheets, [import](https://support.goteamup.com/en/articles/2977753-faq-when-opening-csv-file-all-data-appears-in-one-column) your CSV into the program rather than opening it. Then when you export your edits as a CSV, they will be the expected format to reimport to Bubble.
{% endhint %}

### Currently editing messages and texts for

This dropdown controls which language's app text translations show below. You can only edit one language's app texts at a time here; for bulk editing of multiple languages at once, use the [export / import feature](#export-import-translation-configuration-to-csv) described above.

### List of all application texts and messages

The subsequent sections of this sub-tab enumerate all the app texts: specific text segments displayed to the end-user that can be individually translated for app localization. For each app text, you'll typically see its origin.

*CORE* indicates default texts provided by Bubble, or it might display the name of a plugin. This is usually followed by a description of the text's purpose. The input field showcases the exact text that the user will see when accessing your app in that language.

{% hint style="danger" %}
**Known Issue: right-to-left (RTL)**

When displaying text in a right-to-left (RTL) format and applying certain operations or changes, the text might switch back to a left-to-right display.

If you're prioritizing RTL support, we recommend previewing your pages in run-mode to ensure they display correctly.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
