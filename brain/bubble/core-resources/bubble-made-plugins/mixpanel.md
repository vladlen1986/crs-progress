# Mixpanel
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/mixpanel · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Mixpanel Plugin lets you track your user's activity in the app. The snippet is automatically added to the pages when you install the plugin, so **do not** add it yourself because Mixpanel will fail if the snippet is added more than once.

## Send an event to Mixpanel

This action sends an event to Mixpanel to track what's going on with the app. You can send specific values to Mixpanel with this action. You must create an account with Mixpanel and enter the keys in the Plugins Tab.

### Event name

Select the name of the event to send. Select an existing one or create a new one.

### Additional values

Define more key/values to send more data to Mixpanel, such as age, gender, etc.

## Send the user to Mixpanel

This action registers the user with Mixpanel. In this case, all of the events triggered by this user are gathered under one unique user in Mixpanel.

### User name or id

Choose how to identify the user on Mixpanel's dashboard. Their email is a good choice.

### Additional values

Define more key/values to send more data to Mixpanel, such as age, gender, etc.

## Send a user charge to Mixpanel

This specific action sends a dollar charge attached to a specific user to leverage Mixpanel's revenue analytics.

### Charge amount

Enter the amount of the charge to track.

### Additional values

Define more key/values to send more data to Mixpanel, such as age, gender, etc.

## Delete the current user from Mixpanel

This action deletes the current user from the Mixpanel database.

## Setup

After installing the Mixpanel plugin from the plugins gallery, you will be prompted to enter different keys from Mixpanel.

[Here's](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings) an article from Mixpanel on where to find the necessary keys. You should copy and paste these into the settings for the plugin in the Plugins tab, and you can decide whether to use the same or different keys for your app's development vs. live versions.

(Note that in many cases you don't need to fill in the "API Key" field in the plugin's settings. It's worth testing out the plugin with just the Token and API Secret to see if that's sufficient for you.)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
