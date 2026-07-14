# Custom fonts
> Source: https://manual.bubble.io/help-guides/design/variables-and-styles/using-custom-fonts · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble uses [Google Web Fonts](https://fonts.google.com/) for text types. This is a big library of open-source fonts that can be freely used, and the font files are stored on a Google server. Your easiest option when designing in Bubble is to use one of the fonts available in this library.

{% hint style="info" %}
The Google Web Fonts library is so widely used that there's a fair chance the fonts you use are already cached in the browser of many of your users. In essence, this means another website has already loaded the font for you, and the user doesn't need to download it again.

This leads to a faster page load and a smaller total page size.&#x20;
{% endhint %}

Sometimes you'll want to install your own font. For example, you might need the design to follow a style guide for a particular brand and use a commercial font that they've licensed.

This guide shows you how to install a custom font in your app. Once a font is installed, it appears at the top of the list in the font dropdown, and it works the same way on both web and native mobile apps.

## Installing a custom font

You'll find the custom font section in the *Settings* tab, under *General*. This is where you add new fonts and remove ones you no longer need. Keeping fonts that aren't used in your app will slow down page load, so we recommend keeping only the fonts your pages actually use.

To add a font, upload the font file itself. Bubble accepts .ttf and .otf files. You don't need to write any CSS or host the font anywhere: upload the file and Bubble takes care of the rest.

<figure><img src="/files/d9VNSqzDPtaNIB5F7Fu9" alt="Upload button for installing custom fonts to your Bubble app" width="494"><figcaption><p>You can upload a single font file, multiple files or a whole folder for a font family.</p></figcaption></figure>

A font family usually comes as several files, one for each weight and style (for example, Inter-Regular.ttf, Inter-Bold.ttf, and Inter-Italic.ttf). You can upload them in a single step.

You have a few options:

* A single file on its own
* Several files at once
* A whole folder for a font family

Bubble reads each file, recognizes the font family it belongs to along with its weight and style, and groups the files under one family. Once uploaded, the family is available everywhere you choose a font: on elements, in styles, and in style variables. The weight dropdown for that family only offers the weights you've uploaded.

{% hint style="info" icon="mobile" %}
A font uploaded this way renders the same on your web app and your native mobile app, from a single upload. There's no separate step for mobile.&#x20;
{% endhint %}

## Moving from CSS-linked fonts (legacy)

Previously, you added a custom font by entering the path to a CSS file that referenced the font. Fonts you've already added that way will keep working on the web with no change.

Two things to know:

* You can no longer add a new font through a CSS file link. New fonts are added by uploading the font file, as described above.
* CSS-linked fonts don't render in native mobile apps. Only uploaded font files do.

To bring an existing CSS-linked font to mobile, or to move fully onto the upload method, upload the .ttf or .otf files for that family using the steps above, then remove the old CSS link.

{% hint style="info" %}
**Note on special characters:** This applies to the legacy CSS-link method only. Special characters in fonts aren't added automatically and will default to Times. You can add them manually when adding your custom font as a `<link>`. For example, if you're adding the following Google Webfont to your Bubble app:

{% code overflow="wrap" %}

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700" rel="stylesheet">
```

{% endcode %}

We recommend adding a second link with any special characters you'd like to include, using the `&text=` parameter:

{% code overflow="wrap" %}

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&text=%E2%86%90%E2%86%92%E2%86%96%E2%86%97%E2%86%98%E2%9C%93" rel="stylesheet">
```

{% endcode %}
{% endhint %}
