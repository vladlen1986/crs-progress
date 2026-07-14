# Google
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/google · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This is the short-form, technical reference for the Google plugin. For a more in-depth explanation of the plugin and how it works, see our User Manual article below:

Article: [The Google plugin](/help-guides/data/user-accounts/authentication-plugins/google-plugin)
{% endhint %}

{% hint style="info" %}
This reference entry describes the main Google plugin, used to authenticate (create an account and logging in) a user in your app. For other specific Google features, we have dedicated reference entries as listed below:

Reference: [Google Analytics](/core-resources/bubble-made-plugins/google-analytics)\
Reference [Google Optimize](/core-resources/bubble-made-plugins/google-optimize)\
Reference: [Google Places](/core-resources/bubble-made-plugins/google-places)
{% endhint %}

The Google plugin lets your app's end-users authenticate with Google to sign up and log in to your app.

## Settings

The plugin settings allow you to specify your App ID and App Secret token.

* **App ID:** this string identifies your application with Google.
* **Secret key:** this key is used to authenticate your app's access to Google. This key should be kept strictly confidential.

### Development tokens

You can also add development tokens as provided by Google, to test the API without it affecting live data. The information added here will automatically be used when you preview your app in the Development environment.

## Actions

The plugin adds a new action to the Bubble editor that lets your end-users sign in and log in to your app using their Google account. These two processes are contained within one action:

`Account - Signup/login with a social network`

Bubble will automatically create a new account or log in an existing account, depending on whether the end-user already has a Google-authenticated account set up with your app.

## Data sources

The Google plugin adds five new data sources to your app. Note that all of these data sources are connected to the *Current User*. This means that they are accessed by using the *Current User* data source, and then appending the source you wish to reach, such as:

`Current User's Google's First name`

The following data sources are added to the User data type:

* ID: the unique ID of the user in Google's system
* Email: the user's email address registered with Google\
  The email will also automatically be saved in the *Current user's email* field
* First name
* Last name
* Profile picture
