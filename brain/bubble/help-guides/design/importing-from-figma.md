# Importing from Figma
> Source: https://manual.bubble.io/help-guides/design/importing-from-figma · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This tool is not affiliated with, endorsed by, or sponsored by Figma.
{% endhint %}

Bubble's free Figma converter lets you convert your Figma designs into responsive, pixel-accurate Bubble elements in just a few clicks:

## **Quick start**

* **Select your Figma design**\
  Use the [plugin](https://www.figma.com/community/plugin/1319011724054438539/figma-to-bubble-io-converter) to choose the design you want to convert. Bubble supports Figma files with up to 1,000 elements. For best results, use [Auto Layout](#user-content-fn-1)[^1].
* **Copy from the Chrome extension**\
  After submitting your design through the plugin, use the [Bubble to Figma Chrome Extension](https://chromewebstore.google.com/detail/deezign/mbofgadpoeclogccaclfpdpnclommnmi?hl=en-US\&utm_source=ext_sidebar\&pli=1) to copy it.
* **Paste into your Bubble editor**\
  Drop your design straight into your Bubble app — no need to rebuild from scratch. Note that Figma doesn't have element definitions for [buttons](/core-resources/elements/visual-elements#button), [inputs](/core-resources/elements/input-forms#input), [multiline inputs](/core-resources/elements/input-forms#multiline-input), and [dropdowns](/core-resources/elements/input-forms#dropdown). These can be converted using the [Buttons/input tab](broken://pages/yZc2Q8rOj31VtyxBCWR5).

***

## Installing the Chrome extension and Figma plugin

### Chrome extension

[Download Chrome extension](https://chromewebstore.google.com/detail/deezign/mbofgadpoeclogccaclfpdpnclommnmi?hl=en-US\&utm_source=ext_sidebar\&pli=1)

Once you install the extension, you’ll be able to launch it directly inside any of your Bubble editors. It only works in the editor, so we recommend [pinning](https://support.google.com/chrome/a/answer/11190170?hl=en) it to your browser for easy access.

### Figma plugin

[Install Figma plugin](https://www.figma.com/community/plugin/1319011724054438539/figma-to-bubble-io-converter)

After downloading the Figma plugin, you can access it via Figma’s Dev Mode under the “Plugins” tab. You’ll be prompted to enter a token — you’ll receive this in the next step below.

## Using the extension and plugin

* **After installing both the Chrome extension and the Figma plugin**, go to <http://bubble.io/figma-to-bubble> to get your access token.
* **Paste your token into the Figma plugin**, and you’re ready to go. Open the plugin in Dev Mode, click on a Figma element you want to convert, and hit Convert. Then, head to your Bubble editor, open the Chrome extension, select the converted element, and paste it into your app.

The converter works best with Figma elements that use [Auto Layout](#user-content-fn-1)[^1]. Introduced in 2020, Auto Layout has become the standard for designing responsive interfaces in Figma.

Fixed layout designs will still convert, but the plugin will translate them based on the available Figma properties.

[^1]: Auto Layout in Figma lets you build designs that adjust spacing, alignment, and sizing automatically—making them flexible and responsive.

    It follows the same layout logic as Bubble’s responsive engine, which leads to the best conversion results.\
    \
    Article: [Figma Auto Layout](broken://pages/WOd3Ef7Yy6xHQurldiho)
