# YouTube
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/youtube · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Let users login with their YouTube accounts and fetch a list of videos they've uploaded.

## Signup/login with a social network

This workflow step allows you to integrate the YouTube authentication event when registering a new user, or logging in an existing user.

### OAuth provider - YouTube

Allows the Bubble editor to verify the correct social platform to login/signup the user.

## Current user’s YouTube

When adding dynamic data, this operator allows you to fetch and display content from a user’s connected YouTube account.

### YouTube video’s ID

The unique ID of a YouTube video.

### YouTube video’s title

The title displayed on the public YouTube video.

### YouTube video’s description

The description field of a YouTube Video.

### YouTube video’s thumbnail URL

The image file destination URL storing the thumbnail image.

## Setup

### Configuring your API

Once you’ve installed the YouTube plugin, you’ll need to create an OAuth credential within your [Google Developer Console](https://console.cloud.google.com/apis/credentials). Within your application project, select the ‘create credentials’ button, then choose the ‘OAuth client ID’ option.<br>

![](https://lh3.googleusercontent.com/8712nIe_aupSuBuJWcOfMQkB8fYUGRjpsJzJpSUUMP2pBucrVgPQczlVXVxZHq5lQg9FsKmak33f6ajlxl1uZucaBJzxwiWD_jz0CzQm_fatG-o-apo_Q_gz3uvj6MZGUKsc2FjJ=s0)

From here, you’ll need to configure your application settings, as well as add a relevant redirect URI.

The URI value will be the link to the page in your application that a user will be redirected to once their account is validated.<br>

![](https://lh4.googleusercontent.com/x0bQPc0PnlRl8BfUftUp9RkMqNGBos97yFgGqt8vS-pBwiMGVNzbbtFpB8DKzg4NCEoTmRi36drThWAzrvXOvGfvNUTSfLWruUF1lA4xcfta2IvrwZjmYklqy-5GXOwHM51caKGO=s0)

Note: It’s also possible to enable a generic redirect URL within the Bubble plugin settings itself.<br>

![](https://lh5.googleusercontent.com/G3JA5z2a8fKvAle-ecK2pkQtuzzD9MMMaq4w--TqLOf0J9BqnDcf8bhnLZrFJYGaTldYv-YQfMvg9ljSC0EbFT1C0cVOptNifBIBeOoOfIdTOloFl7FzScI3Pl1VNWmwi0sMtOyo=s0)

After saving your OAuth configurations, copy both the client ID and client secret key into their relevant fields within your YouTube plugin.

For reference:

* The YouTube secret key will be added to the ‘App secret’ field of your plugin settings.
* The YouTube client ID will be added into the ‘App ID/App API’ of your plugin.

![](https://lh3.googleusercontent.com/vhpOJ6q5D12j-aDcXnc3YIDwDAFF3OfpdUjjHRvIv1YdkkKnaVE2Z_DdeZUR7RW_elfnjqREJ3yrt7sYdZgF3yMAsn1U6L8aYb8DTXmhqqpZ5-gbqLDTol6uwGkW4xaipdFKBeE7=s0)

### Logging a user in through YouTube

After configuring your OAuth credentials, you can now use the ‘signup/login with social network’ step within a workflow. From the event dropdown menu, you’ll see an option to select the YouTube OAuth provider. This event can be added to an element like a login button.<br>

![](https://lh5.googleusercontent.com/irtO0Z2zQgDcMF3zXQ8R8q0V6oL9DT_CjgKdWH3NqSuQKr3rGMo2hU1BvXtsfTEwrk8tn8Z3kwMoWPa0sbTKysAeEQaqdXeImWqMeiatiSQYcoFQPCrkYvAozCXUFl8-8OMTpbWN=s0)

After a user clicks this button, they’ll be redirected to a Google portal where they can verify their account, then be redirected back to the destination URI of your application.

Now, you can choose to display videos from a user’s YouTube account. If you’d like to display a list of a user’s videos within a repeating group, configure the type of content to be ‘YouTube video’, then set the data source to be the ‘current user’s YouTube videos’.<br>

![](https://lh4.googleusercontent.com/0elEaQ-3OHSyU2dnqa6OKb5PSvL53qvYgA1qVy5w7s6auutOYikc80J1_mrNJjbnYtvzn00xYR1WqkHTXUgkfxb4gvdMpkfvnInIDD79dSNupNuRV09vx6G5XSscHdyIUzTdJHEo=s0)

Within each repeating group cell, you can then display data about each video by selecting the ‘current cell’s YouTube video’s’ operator.<br>

![](https://lh5.googleusercontent.com/HmDCyOH9ZfWa4vUBTaIq0xo0xgxV9St6SKWqBizKxsmTi5X06TmVOC9eFxZX9jsdO4hRJ58Rtr9Dzh7zdv1a7VhC89Yb1kS-rFLdiXWlOlUVWvB6QblUJ1OfEbAzY4ofTYI4W0gK=s0)

## FAQ

### When testing my YouTube OAuth experience, it says I don’t have permission to login through the application account.

Before testing your application in development, you’ll need to provide access to a test user by whitelisting their email in your console settings [here](https://console.cloud.google.com/apis/credentials/consent)<br>

![](https://lh4.googleusercontent.com/TiRo2VvPdFMSoYJ3X00qdavV4nmzLDTQuksVh8_Hl9WeoyaF5DTmc0UwNWgRu0IILqy8RWCl3VyNoB_1TNqhsmbe3SKkCavSMWn-yDvHnQc0C4fZ0v41fbcnfbPz0a88ZpfmjvoD=s0)

### When testing my OAuth login, I keep receiving a ‘Error 400: redirect\_uri\_mismatch’ message. What’s causing this to occur?

When testing your application in development mode, you’ll need to verify that the login page matches the exact same value as the redirect URI you added in your OAuth credentials.

For example, your redirect URI might be configured as: <https://your-app-name.bubbleapps.io/version-test/login> - but by default, the Bubble page preview will add an additional string for the debugger: <https://your-app-name.bubbleapps.io/version-test/login?debug_mode=true>.

Simply remove the additional debugger URL string to resolve this error.<br>
