# Facebook
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/facebook · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This is the short-form, technical reference for the Facebook plugin. For a more in-depth explanation of the plugin and how it works, see our User Manual article below:

Article: [The Facebook plugin](/help-guides/data/user-accounts/authentication-plugins/facebook-plugin)
{% endhint %}

Let users log in with their Facebook accounts, and fetch their Facebook profile data.

## Facebook Like

This element displays a Facebook like button on the page.

### Link to like

This is the link of the page you want users to like.

### Action

Choose from Like and Recommend for the verb.

### Color Scheme

Choose from Light and Dark for the color scheme.

### Layout

Choose from the Facebook layout options, Standard, Button\_count, Button, and Box\_count.

### Share button

Check this box to display a share button.

### Show faces

Check this box to show faces of the friends who liked the page.

## Facebook Page

This element displays a Facebook Page Plugin for a Facebook page.

### Page link

This is the link of the page you want the element to display.

### Hide page cover

Check this box to hide the cover of the page and make the element smaller.

### Show faces

Check this box to show the faces of the people who like the page.

### Show posts

Check this box to display the latest posts of the page.

## Send Facebook Message

This action enables users to send a Facebook message through a Facebook popup.

### Link

This is the link you want the user to share by default. It can be changed in this popup, per Facebook's policy.

### Facebook user

This is the user you want users to send the message to. It should be the Facebook profile of the user and is accessible if the designated user also signed up with Facebook through the app.

## Setup

### App ID / API Key

Once you create an app in your [Facebook developer account, ](https://developers.facebook.com/)open the Basic section of your app's settings to copy and paste its App ID into this field.

### App Secret

In your Facebook developer account, copy your app's secret from its Basic settings and paste here.

### Scope

Choose from "Simple" or "With friends" permissions. "Simple" will give you access to the user's name, email, and profile picture, for example, and "With friends" will additionally give you access to the user's list of friends. The latter option requires approval by Facebook.

### Include user profile URL

This setting requires app approval by Facebook.

### Use a generic redirect URL

Check this box to use the suggested redirect URL (recommended). This is the URL that Facebook will redirect to when authenticating a user.

### App ID / API Key - dev

Optionally enter a development API Key. When your app is in development (version-test), Bubble will use this key.

### App Secret - dev

Optionally enter a development App Secret. When your app is in development (version-test), Bubble will use this key.

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
