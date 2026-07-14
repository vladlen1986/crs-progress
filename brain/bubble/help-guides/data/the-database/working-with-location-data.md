# Working with location data
> Source: https://manual.bubble.io/help-guides/data/the-database/working-with-location-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Maps and geolocation features in Bubble rely on Google APIs. Once your app uses your own domain, it will require your own Google API keys in the Settings > General > "General services API Keys" section. This guide covers how to obtain your own keys.

{% hint style="info" %}
**Tip:** The Google API gets used for timezones as well as geographic addresses, so if you're using "Current user's timezone" or addresses anywhere in your app, go ahead and update these keys.
{% endhint %}

***Note:*** In May 2020, Google changed its APIs to split off timezone capabilities (previously part of a bundle of Geocode capabilities) into its own API. This means you will have to add the Time Zone API to the capabilities of your app when registering it with Google.

{% embed url="<https://youtu.be/ouGT55o68ho>" %}
Our Academy tutorial on how to set up Google API keys
{% endembed %}

## Set up your app in Google Developers Console <a href="#set-up-your-app-in-google-developers-console" id="set-up-your-app-in-google-developers-console"></a>

You first need to set up your account in the Google Developers Console - this tells Google about your app and is how Google will know which APIs your app is allowed to invoke.

Visit the console [here](https://console.developers.google.com/). You will have to log in; you may also have to provide billing details, which is a requirement from Google.

First, create a "project" in Google that corresponds to your Bubble app; your interface may look something like this:

<figure><img src="/files/JatANvsz1FQc4IFgP49u" alt=""><figcaption></figcaption></figure>

Then, with that project active (i.e. name showing in the topbar), click on the menu icon in the upper left > APIs & Services > Library:

<figure><img src="/files/c1wzkQdQSmGAMyfVTZz0" alt=""><figcaption></figcaption></figure>

In the Library, search for the following APIs and "Enable" each one:

* Geocoding API
* Places API
* Geolocation API
* Maps JavaScript API
* Time Zone API

## Create and set up your new keys <a href="#create-and-set-up-your-new-keys" id="create-and-set-up-your-new-keys"></a>

Click on **Credentials** in the left-hand sidebar.

Create an API key by clicking the **+ Create Credentials** button and selecting **API key**.

**Creating a Client Key:**

Rename this key to **Client** and select the following API restrictions:

1. Geocoding API
2. Places API
3. Geolocation API
4. Maps JavaScript API
5. Time Zone API
6. (Optional) Places API (New)

Add HTTP referrer website restrictions to the Client key as well. This can follow the format:

* `*.appname.bubbleapps.io/*`
* `appname.bubbleapps.io/*`
* `http://appname.bubbleapps.io/*`
* `www.appname.bubbleapps.io/*`
* `http://www.appname.bubbleapps.io/*`
* `https://appname.bubbleapps.io/*`
* `https://www.appname.bubbleapps.io/*`

If you're using a custom domain:

* `*.yourdomain.com/*`
* `yourdomain.com/*`
* `http://yourdomain.com/*`
* `www.yourdomain.com/*`
* `https://yourdomain.com/*`
* `https://www.yourdomain.com/*`

And for a subdomain:

* `*.subapp.yourdomain.com/*`
* `subapp.yourdomain.com/*`
* `http://subapp.yourdomain.com/*`
* `www.subapp.yourdomain.com/*`
* `https://subapp.yourdomain.com/*`
* `https://www.subapp.yourdomain.com/*`

Click **Create**.

Create a **second** API key by clicking the **+ Create Credentials** button and selecting **API key**.

**Creating a Server Key:**

Rename this key to **Server** and select the following API restrictions:

1. Geocoding API
2. Places API
3. Geolocation API
4. Maps JavaScript API
5. Time Zone API
6. (Optional) Places API (New)

Click **Create**.

Your keys should now be ready to be used! In your Bubble editor, navigate to **General > General services > API Keys**.

Copy and paste the **Client** API key into your editor in the **Google Maps API key** field.

<figure><img src="/files/ymef2ObPcYzeRHIxVVAH" alt=""><figcaption></figcaption></figure>

Copy and paste the **Server** API key into your editor under **Google Geocode API key**.

<figure><img src="/files/OaspbTqBgVyokwFJuULf" alt=""><figcaption></figcaption></figure>

<details>

<summary>Video lesson</summary>

* [How to set up your Google API key](https://youtu.be/ouGT55o68ho)

</details>

## Further notes on the Google side <a href="#further-notes-on-the-google-side" id="further-notes-on-the-google-side"></a>

* The generic instructions provided by Google for setting up an API key are [here](https://developers.google.com/maps/documentation/javascript/get-api-key) for Maps and [here](https://developers.google.com/maps/documentation/geocoding/get-api-key) for Geocode; the instructions on this Manual page are accurate as of January 2020, but as Google updates their interface, please refer to their official documentation as needed
* In order to use these APIs, you may need to set up a billing account with Google Cloud and connect your Google project with that billing account
* Note that changes in a Google project configuration can take a minute or so to propagate and take effect

{% hint style="warning" %}
Watch out

Because Bubble uses the Google Maps API, there are some inconsistencies in Google Maps data that will reflect in the app. For example, for some (non-US) addresses, the "city' field is actually the name of the neighborhood / area. To help mitigate this, try adding a Map element (even a hidden one) that takes as its value the value from a SearchBox input - the Map will place the pin correctly, and then its "center" might yield more accurate data about that location.
{% endhint %}

## Other ways to learn

<details>

<summary>Video lesson</summary>

* [How to set up your Google API key](https://youtu.be/ouGT55o68ho)

</details>
