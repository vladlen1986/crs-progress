# Slack
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/slack · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Slack plugin can be used to interact with your Slack workspace from a Bubble app. You can log in with Slack, as well as dynamically post messages, set reminders, and more using Bubble workflows.

## Get Slack Bot Data

Retrieve data from Slack, such as your workspace’s team members or list of channels.

## **Post to channel as user**

### Channel ID

The identifier for your channel; you can find this in the channel’s URL, for example, [https://yourworkspacename.slack.com/archives/](https://bubble-app.slack.com/archives/GMUJK4DPT)channelID, where “channelID” is the ID.

### Message

The content for your post to the channel.

## Post to channel as bot

The identifier for your channel; you can find this in the channel’s URL, for example, [https://yourworkspacename.slack.com/archives/](https://bubble-app.slack.com/archives/GMUJK4DPT)channelID, where “channelID” is the ID.

### Message

The content for the bot’s post to the channel.

## Send a message as user

### Recipient User ID

The identifier for the user to receive the message; one option to find this by viewing the user’s profile, clicking “More,” then selecting the option to “Copy member ID.”

### Message

The content for your message to the user.

## Add a teammate to a Slack channel

### Channel ID

The identifier for your channel; you can find this in the channel’s URL, for example, [https://yourworkspacename.slack.com/archives/](https://bubble-app.slack.com/archives/GMUJK4DPT)channelID, where “channelID” is the ID.

### Teammate ID

The identifier for the user to receive the message; one option to find this by viewing the user’s profile, clicking “More,” then selecting the option to “Copy member ID.”

## Set a Slack reminder

### Reminder Text

Content of the reminder

### Reminder Time

When the reminder should be sent

## Setup

### **Create your Slack app**

Navigate to the [Slack API page](https://api.slack.com/) and log in with or sign up for a Slack workspace. Once you’ve successfully logged in, create a new Slack app. You can do this by clicking the “Your Apps” button in the upper right corner of the dashboard screen, then clicking “Create New App”.

### **Bubble plugin setup**

Install the Slack plugin in the Plugins tab of the Bubble editor.

![](/files/-MRtbywN1U_TqjgWRouf)

Return to your Slack app dashboard to find your Client ID and Client Secret. These credentials can be found on the main page of your Slack app dashboard, under the “Basic Settings” tab in the Slack menu.

![](/files/-MRtc1WrxIaNVFdhVsTH)

### **Workspace installation, Oauth Setup, & Scopes**

The next step will be to install your app in your Slack workspace and set up your Slack permissions scopes in your Slack app. Do this by navigating to the “OAuth & Permissions” tab in your Slack app dashboard.

![](/files/-MRtc53mq-2LQDOOfFvM)

You will need to set up at least one “permission scope” before installing your app. Setting up OAuth scopes will determine which data and actions your app will have access to. In order to use the Slack plugin most successfully, include all of the following user and bot scopes.

**For User scopes, include:**

![](/files/-MRtc9QpTLZUrXGezfV7)

**For Bot scopes, include:**

![](/files/-MRtcBpFr6H62dic3y0y)

Finally, set up redirect URLs in your Slack app. This should be the same redirect URL as the one you set up in the Plugins tab, whether you’ve opted to use the default or provided a custom redirect URL.

![](/files/-MRtcGpwSj-o91Okb6G_)

You’re all set up, and you should now be able to access your Slack workspace from your Bubble app!

### Slack Workspaces & Existing Accounts

If you wish to create a new user account with Slack OAuth, you can do so by using the “signup/login with a social network” workflow action and selecting Slack.

![](/files/-MRtcJiFcVtjAKkrLFGS)

You can also connect a Slack workspace with an existing Bubble app account. In order to do this, a user must **already be logged in**, then go through the OAuth flow with a Slack account that matches the email address they already signed up with. This will allow an existing user of your app to access their Slack workspace without creating a whole new account.

Users can also switch between Slack workspaces by doing this. If they are **already logged in** and then go through the OAuth workflow, they can select a different Slack workspace to connect to. After they go through the flow, their account will be associated with that new workspace.

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
