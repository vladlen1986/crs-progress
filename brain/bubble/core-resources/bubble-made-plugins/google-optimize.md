# Google Optimize
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/google-optimize · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

***Note:** As of December 2020, we're investigating issues when using the Google Optimize plugin in conjunction with Bubble's Google Analytics plugin, we think due to changes Google made in their recent major update of GA.*

Bubble has built a plugin with Google Optimize to enable you, as the app creator, to run A/B tests (randomized split tests) on your Bubble app.

An A/B test is great when you have a clear action you want your users to achieve, and you're deciding between two slightly different experiences in your app to try to get your users to accomplish that action. For example:

* You have two different possible versions of a landing page, and you want to see which one leads to higher rates of users signing up
* You have three different sets of copy for your home page, and you want to see which one leads to more users clicking a certain button
* You want to see if showing a popup after a user logs in will increase the likelihood of that user purchasing something

There are many online resources explaining the principles of A/B testing and what makes for a good vs. bad test - it's a very helpful tool for data-driven decision making!

Note: there are other third party A/B testing tools out there. These generally will not work smoothly with Bubble apps because of how Bubble renders your app's pages - essentially, our Javascript will interfere with the testing tool's Javascript. That's why we created this plugin, which allows you to design A/B tests within the Bubble editor, and to have them run on your app without any problems!

## Get Google Optimize Experiment Group

This data source is a number that indicates which control or variant group the current user is in. "When Get Google Optimize Experiment Group is 0" means the user is in the control, usually the original experience you had. "When Get Google Optimize Experiment Group is 1" means the first variant you have, "...is 2" means the second variant (if there is a second variant), etc.

## Set Google Optimize Experiment On This Page

This action is necessary to "mark" a user as part of an experiment and thus as somebody who should be counted as part of the experiment's analytics. Even if this action is not used, the user will still be assigned to an experimental group and thus may see the variant - they just will not be counted in the analysis in Google Analytics.

## Setup

### What you'll need

* Sign up for a Google Analytics account
* Sign up for a Google Optimize account - Optimize is part of the same suite of products as Google Analytics, and has a generous free tier
* Have your app connected to either (1) Google Analytics, OR (2) Segment with Google Analytics as a destination - these tools help you capture data about user activity, which is what's needed to measure the impact of your test; Bubble offers free Bubble-made plugins for GA and Segment
* Have a Bubble app that's on the current **Professional tier or above** (see our [Pricing](https://bubble.io/pricing) page)

### If you're using Segment

To use Segment with Google Optimize, in your Segment settings for Google Analytics, set Connection Mode to **Device Mode** (this is important! Currently we do not support Cloud Mode with Google Optimize.)

On the same page, further down, you need to provide your Optimize [Container ID](https://support.google.com/optimize/answer/6211939#container):

![https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYhE2QUrZ9VwfYPWU7%2Fgopt\_3.jpg?alt=media\&token=8dc4fbd7-900d-49e7-9193-e458933d934c](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYhE2QUrZ9VwfYPWU7%2Fgopt_3.jpg?alt=media\&token=8dc4fbd7-900d-49e7-9193-e458933d934c)

You can find your Optimize Container ID on your homescreen at [optimize.google.com](http://optimize.google.com). (Note: pre-April container IDs will start with "GTM", post-April will start with "OPT")

### Setting up the Google Optimize plugin

1.Install the Google Optimize Plugin in the Bubble editor via the Plugins tab, as with any other plugin. Once installed, you should see this settings page for the plugin:

Optimize plugin settings

![https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYgwwns7rp9aKwkoLa%2Fgopt\_1.jpg?alt=media\&token=628025a9-9f99-4e97-84c8-715e6dc003d2](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYgwwns7rp9aKwkoLa%2Fgopt_1.jpg?alt=media\&token=628025a9-9f99-4e97-84c8-715e6dc003d2)

You will need to provide your Optimize [container ID](https://support.google.com/optimize/answer/6211939#container), found on [optimize.google.com](http://optimize.google.com)

After creating an experiment in Optimize, you will copy the Experiment ID and the number of variants into the appropriate fields here as well. (See below)

(Note: pre-April container IDs will start with "GTM", post-April will start with "OPT")

### Setting up an experiment in Google Optimize

These steps are done in [Google Optimize](https://optimize.google.com/)

When you first set up Google Optimize, you will be linking it up to your Google Analytics account.

Follow the Optimize flow to create a "server side" experiment. The general steps are [here](https://developers.google.com/optimize/devguides/experiments#create-an-experiment), but a summary is:

1. [Create an experiment in Optimize](https://developers.google.com/optimize/devguides/experiments#create-an-experiment)
2. [Set experiment objectives](https://developers.google.com/optimize/devguides/experiments#set-experiment-objectives)
3. [Set experiment targeting](https://developers.google.com/optimize/devguides/experiments#set-experiment-targeting)
4. [Create variants](https://developers.google.com/optimize/devguides/experiments#create-variants)
5. [Start the experiment](https://developers.google.com/optimize/devguides/experiments#start-the-experiment)
6. [Get the experiment ID](https://developers.google.com/optimize/devguides/experiments#get-the-experiment-id)

### A few important notes

* Set the editor page to **"SERVER-SIDE"** (or whatever else, it doesn't really matter but it should not match an actual url on your app)
  * You might see a warning that this doesn't match URL targeting rules, but this is safe to ignore
* Note the number of variants, and note that the original (the "control" in the experiment) counts as a variant. I.e. if you have the control and one other design to test, that would be 2 variants. This number goes into the Plugins tab in the settings for Google Optimize
* You can rename the variants in Google Optimize however you wish; the Bubble editor does not refer to them
* Audience targeting no longer has any affect from the optimize UI

Before you start the experiment, you have to set the Objective(s), which are the quantitative goals the experiment will look at to measure the success of the variants. You can either:

1. Choose from list: this will only give you access to Google’s default objectives (bounces, pageviews, session duration)
2. Create custom: this will give you access to events you’ve identified and sent to GA, possibly through Segment (this gives you much more control over the different behaviors you wish to measure / influence)
   1. If you've already sent Segment / GA custom events in the past, you should be able to find the option to have Event Action equal 'your\_event\_name'

When these components are all ready, make sure to **start the experiment**!

### **Designing an experiment in the Bubble editor**

Your experiment will likely be measuring some kind of custom event you send to Segment. As a brief introduction, if you have the Segment plugin set up, you'll be able to use the "Track an event with Segment" workflow action in the Bubble Editor.

For example, if you want a click on a button called "Conversion Event!" on page A to log an event called "user\_did\_a\_thing", you'd set it up like this:

Logging a custom event with Segment via a workflow

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYhJ1WwsIALZxv-uDq%2Fgopt_4.jpg?alt=media\&token=12ca7763-a487-4e52-a401-c15f91e6641b)

If you check in the Segment interface, you should see this event in the "Debugger" pretty immediately.

If you check in the Google Optimize objectives page, you should see this event name pop up in the dropdown list of known custom events.

### **Important step: telling Optimize to pay attention to a user**

The Optimize plugin does **not** automatically assume that every user who visits your app is part of the experiment. Rather, you must tell Optimize when a user should be considered as participating in an experiment!

(Why this way: imagine you have an experiment running only on the logged-in dashboard of your Bubble app. In this case, you might have lots of users visiting your landing page, but most of these users won't be logged in. Thus, to get accurate numbers, you only want to run the experiment on users who visit the page and are logged in.)

To tell Optimize that a user should be considered for an experiment, you must run the workflow action "Set Google Optimize experiment on this page" when relevant. In many cases, you'll probably run this action "When page is loaded", although you could create more complex logic.

You can find the action within the "Analytics" category.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYhQ-mla3Um4X8bfrD%2Fgopt_5.png?alt=media\&token=69ada8db-2c81-4920-b6ba-cd856e95cc71)

You can think of this action as initiating all the rest of the Google Optimize logic. If this action is on a page, then a user visiting that page will be randomly assigned into a variant; these assignments are sticky, meaning if the user leaves and later comes back to that page, they will be in the same variant as before.

### **To create different variant behavior**

To design the different experiences you want to test, you'll be relying on conditional statements that effectively say something like "if the user is in experimental group 1, show this element".

To create behaviors that differ based on variants, use the datasource "Get data from an external API" and select "Get Google Optimize Experiment Group", and use that as a condition in workflows, element conditions, etc.

* "When Get Google Optimize Experiment Group is 0" means the control, usually the original experience you had
* "When Get Google Optimize Experiment Group is 1" means the first variant you have
* (etc. for experiments with more variants)

For example, on an element's condition tab, you might have a button where the control is that it's rotated 45 degrees, but in the first variant, you want the background color to be yellow:

Using the group assignment in conditions

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MEYgEWkEfthhj4p-G5b%2F-MEYhSjruLJXSyUnHuw3%2Fgopt_6.png?alt=media\&token=8788579e-1af3-4767-ab79-d7038ca304b6)

You will usually be defining both the control and variant behavior. Make sure you preview your app to see if the variants are what you want! (Hint: to more fully preview a variant, you can add more clauses to the conditions to temporarily force the entire statement to be true or false, e.g. "When group is 0 or Current User is Current User" will always be true, and "When group is 0 or Current User is not Current User" will always be false).

After you've started your experiment in Google Optimize and you roll out your changes, the experiment is running! The Google Optimize / GA interface is not quite real-time, but if you have users going through your experiment, you should start seeing an indication of this in the Google Optimize interface.

## FAQ

* Because Google Optimize records data about the experiment in Google Analytics, results are not available in real time, i.e. they are usually several hours delayed
* If no data is showing up in Google Analytics pertaining to an experiment, make sure you're using the "Set Google Optimize Experiment On This Page" action
