# App texts (translations)
> Source: https://manual.bubble.io/help-guides/data/static-data/app-texts-translations · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to translate your app into multiple languages

App texts, short for *Application texts and messages* is a sort of database for text strings that you can use around your app. It can be used for a single language, but Bubble also lets you translate all the strings into different languages to offer your users a multilingual app.

Application texts are a part of Bubble's *static data* features. This means that they are not dynamic, like the database, and that the app needs to be redeployed every time something changes. As such, they are not meant to store long strings of text like articles and product descriptions, but shorter content like headers, menu options and button labels.

{% hint style="warning" %}
Application texts become part of your application's codebase and is downloaded to every user on page load. You should never use these strings to store sensitive information.
{% endhint %}

## Assigning application texts

Application texts can be used in any expression, meaning that it can be assigned to any element property that accepts dynamic texts: this includes text elements, labels on buttons and checkboxes, text input fields, tooltips an many other places.

<figure><img src="/files/wrd0gDKfoUDlHFj8LMGo" alt=""><figcaption></figcaption></figure>

The editor will show the text *App text (\[name])* and the app will show the string you have saved in the app text editor in the currently active language.

<figure><img src="/files/u2tcWZ0VRbpSHZh20Zjr" alt=""><figcaption><p>Application texts can be used in any dynamic expression. In the screenshot above we're using an app text called <em>My input</em> as the placeholder for a text input element.</p></figcaption></figure>

This also means you can use them in workflows, element conditions and any other place where you can insert a dynamic expression. In the example above, we have selected *App text* as the data source, and *My input* as the operator: this is the ID of the particular string we want to show, which means it needs to be created first.

## Editing application texts

To access the application text editor, go to *Settings - Languages.* Under *General settings* you will find your app's default language and the field on the user that determines the user's language preference (more on that below).

Under *Application texts and messages* you will find all the custom text strings that you have added (if any) as well as Bubble's core texts.

The left column is the ID of the text. In the example from earlier, the ID of the text was *My input*. We'll find this ID and

<figure><img src="/files/kVZxEEOFdoVeOm2CiWKP" alt=""><figcaption><p>The strings ID is on the left side, and the string that will be displayed to your users is on the right. Click the image to enlarge.</p></figcaption></figure>

### Core texts

The core texts are the text strings that Bubble includes by default. You can change their string, but they can't be deleted and their ID remains static. These strings cover different error/informational messages connected to Bubble's core functionality. These built-in texts are already translated into all the available languages.

### Element strings

Some elements and plugins also add text strings that become available at the bottom of the list. For example, the multi-file uploader plugin adds standard texts such as *Cancel upload* and *Remove file*.

## Exporting and importing translations

Bubble also lets you export all the language strings to a CSV file and then re-import the file after having made the needed adjustments to it. This way you can efficiently invite other users to translate the strings without giving them access to the Bubble editor.

1. Click the *Export* button and download the CSV file that Bubble generates
2. Make the needed adjustments to the file, but make sure that no text ID's are changed and that the columns remain exactly as they were when you downloaded the file
3. Click the *Import* button and select the finished file.

{% hint style="warning" %}
Importing a CSV file will overwrite all strings, even if the cell in the CSV file is left empty. If you want to keep a string as it was upon export, make sure it remains in the file.
{% endhint %}

## How Bubble determines the language

Bubble determines the app's current language based on the following hierarchy:

1. The "lang" parameter in the URL if it is set
2. The current user's language if the field exists and is it's value is valid
3. The application primary language
4. English

## Adding multiple languages

Application texts are set up for multiple languages, and uses the [IETF language tag](#user-content-fn-1)[^1] language codes to identify each language and dialect.

### Setting the main language

The main language is the language that is used by Bubble to run your app when no language setting is set. This language will be used to define the messages that your application can send and show to users and change how location-sensitive elements behave.

For instance, it will impact how dates are formatted in the Date Input element and the Calendar element or the map element's captions.

### Setting the language field on the User

Users in Bubble don't have a language setting field built in, but lets you set one up if you need it. The name of the field is not important, but the field must return a valid IETF language tag to work – in other words, the field must contain a text that matches one of the abbreviations in the dropdown.

<figure><img src="/files/Nzlteh9U2tk84YaCT6lz" alt=""><figcaption><p>The language field on the user must return one of language codes in the language dropdown, such as fr_fr.</p></figcaption></figure>

When you have set up the field, you assign that field to control the user's language setting with the dropdown *Language field on the user type*. Select the field you set up, and Bubble will automatically respond to the value in the field to display strings in the user's language.

<figure><img src="/files/YuWcfsWR7SoulzYWLNlS" alt=""><figcaption><p>In this example we have created a field called <em>Language</em> of type <em>text.</em> This particular user has the code ar_ar, which means they have selected Arabic as their language.</p></figcaption></figure>

If the field is empty, Bubble will default to the language set in the *Application primary language* dropdown.

### Setting the language with a URL parameter

The application language can also be set in the URL, by using the lang query string parameter. This means adding `lang=code` to the URL, where `code` is the standardized language code, i.e. the one found in Settings > Language (most, but not all, of these codes have the format of two characters, underscore, two characters).

For instance, using Russian in your app would be done by hitting this URL `https://myapp.com?lang=ru_ru`.

## FAQ: Application text

#### If a text string is not translated into the active language, what will Bubble display?

If the user has selected a language and a string on the page has not been translated into that language, the text *(no translation)* will be displayed instead. Bubble's error console in the bottom right corner of the debugger will also flag a warning when you preview the page.

#### What happens if the language field on the user is empty?

If you have set a field on the user to be a language field and that field is empty or returns an invalid language code, Bubble will default to the language set in the *Application primary language* dropdown.

#### How do application strings affect performance?

The application strings you add become part of your applications JavaScript source code files. This means that they are downloaded to every user that opens up any of your pages.

For performance reasons, Bubble only downloads the text in the language that the user has selected – this is why changing the language on the user requires a page load so that the updated JavaScript file can be generated and downloaded.

Application strings are no more performance-taxing than placing the string directly on the element; if they are used in multiple places they are more lightweight, since they only need to be stored once. Even if you don't plan to translate your app it can be useful to maintain all your strings in one place.

#### Do Application texts support right-to-left writing (RTL)?

Yes, Application texts support RTL languages such as Arabic, Hebrew and Urdu. Note that you may need to tweak your app design if you plan to switch between LTR and RTL languages, so we recommend testing your application in both languages.

{% hint style="danger" %}
**Known Issue: right-to-left (RTL)**

When displaying text in a right-to-left (RTL) format and applying certain operations or changes, the text might switch back to a left-to-right display.

If you're prioritizing RTL support, we recommend previewing your pages in run-mode to ensure they display correctly.
{% endhint %}

#### I have made changes to app texts, why are the changes not visible in the live app?

If you can't see the changes you've made, please check the following:

* Changes in app texts are visible as follows:
  * Development: after the page is refreshed
  * Live: after the app has been deployed and page has been refreshed
* Check that you are viewing the app in the same language as the string you have changed
* Check that the *Saving* indicator next to the edit menu is showing *Saved* to confirm that the change has been synced to the Bubble server. If not, please check your internet connection.

## App texts in native mobile apps

## App texts (translated text strings)

The [app text feature](#user-content-fn-2)[^2] is supported in native mobile apps, allowing you to localize content based on the device’s language settings.

{% hint style="info" %}
On web apps, Bubble normally determines which language to display using a `language` field on the User data type. In mobile apps, this behavior differs: the app references the [**primary language set on the user’s device.**](#user-content-fn-3)[^3]
{% endhint %}

#### How it works

When a mobile app launches, Bubble compares the device’s primary language to the list of **supported languages** defined in your app’s mobile settings. If a match is found, the corresponding App Text translations are used. If not, the app will display content in the **primary app language**.

You can manage supported languages under the Mobile settings section of your app:

<figure><img src="/files/czimGqs1XNnbyb9TlPBh" alt=""><figcaption><p>You can add languages and dialects in the <em>Settings –</em> <em>Supported languages</em> section of your app.</p></figcaption></figure>

#### Supported languages and dialects

Some languages have regional variations, known as dialects. For example:

* `fr-FR` (French – France)
* `fr-CA` (French – Canada)
* `fr-BE` (French – Belgium)

Bubble supports setting specific dialects for each supported language. However, a user’s device might only report a [base language](#user-content-fn-4)[^4] code such as `fr` without a region-specific code. To handle this, Bubble includes a [**fallback language**](#user-content-fn-5)[^5] setting that determines which dialect to use if the device only provides a base language.

**Example**

If you support `fr-CA` and `fr-BE`, and a user’s device reports only `fr`, Bubble will use the fallback dialect you’ve specified—such as `fr-CA`—to display translated App Text.

#### Behavior summary

* Mobile apps use the [device’s **primary language**](#user-content-fn-3)[^3] rather than a user-defined setting.
* If the device language **matches a supported dialect**, that translation is shown.
* If it matches a **base language only**, Bubble uses the **fallback dialect** you’ve defined.
* If no match is found, the app defaults to its **primary language**.

#### Updating your app

* If you add supported languages, these can be included in an [over-the-air (OTA) update](#user-content-fn-6)[^6].
* For the translations defined in the system-level prompts (like permissions messages), a new build is required, as these values are [compiled into the native binary](#user-content-fn-7)[^7].

[^1]: IETF language tag is a list of language codes widely used on the internet.\
    \
    It combines different standards such as ISO 639 to to distinguish language variants such as British English (en\_gb) and American English (en\_us).<br>

    IETF (the Internet Engineering Task Force) is an organization that works to create voluntary standards for the internet.<br>

[^2]: The *app text* feature lets you set up static strings for your app in different languages.

    Article: [App texts](/help-guides/data/static-data/app-texts-translations)

[^3]: The top language set in the user’s device settings. This is the language the operating system uses for menus, apps, and system messages.

[^4]: The general form of a language without any regional variation—such as "fr" for French, without specifying a dialect like "fr-FR" (French – France) or "fr-CA" (French – Canada).

[^5]: A backup language used when the device’s language matches a base language (like "fr") but not any of the specific dialects you've added (like "fr-CA" or "fr-FR").

[^6]: An update that can be pushed to users without requiring a new build or app store approval. Changes take effect automatically the next time the app is opened.

    Article: [Publishing your app in iOS App Store](/help-guides/publishing-your-app/native-mobile-app/ios-app-store#ota-over-the-air-updates-quick-changes)

[^7]: This text is included directly in the app’s packaged code, meaning it can’t be changed without creating a new build and resubmitting it to the app stores.
