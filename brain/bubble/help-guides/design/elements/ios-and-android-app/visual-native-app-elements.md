# Visual elements
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/visual-native-app-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

### WebView

The Web View element allows you to display one of your app’s pages inside an element within your mobile app. You can set its responsive behavior just like any other element, ensuring it adapts well to different screen sizes.

<figure><img src="/files/OGFnDgz3OlP2qU63cvkU" alt=""><figcaption></figcaption></figure>

Keep in mind that users won’t be able to navigate to other pages while using the Web View, so it’s important to design the page with all necessary content on a single page. The Web View element is limited to displaying pages from your own app, meaning external URLs cannot be used.

{% hint style="warning" %}
The Web View element currently does not work in the web preview— it only functions properly in the BubbleGo app.
{% endhint %}

#### Disable zoom

The *Disable Zooming* property in the Webview and Scrollable View elements prevents users from using the pinch-to-zoom gesture to zoom in or out. This setting is enabled by default.

<figure><img src="/files/WJt6v70TeSujAJUKMpdg" alt="" width="375"><figcaption></figcaption></figure>

It helps improve the user experience, particularly for apps that rely heavily on webviews, where unintended zooming can cause a disruptive interface. If you want to allow zooming, you can disable this setting in the element's properties.
