# Pre-migration
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process/pre-migration · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article serves as a guide to getting started with the Enterprise plan after you've completed the upgrade. For a broader understanding of the Enterprise plan, we recommend exploring the introductory article series linked below:

Article: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)
{% endhint %}

The first step to having an Enterprise Dedicated plan is migrating your app and its data from the main cluster onto your dedicated server.

Before we get your apps moved onto your new dedicated server, we will have a call to discuss expectations for the process. We will also work with you to schedule a time for the migration to occur.

In order to ensure there's plenty of time to complete the migration with monitoring, we schedule them to start any time between 9:00am - 2:00pm ET Monday through Thursday.

### To do

* [ ] **Look through any database views you have.**

  All your data will still be there once your app is on your dedicated server, but any of the custom views you have set up won't get carried over. If there are any custom views that you are using often, make a note of what the constraints and visible fields are so that you can easily set it up again later.<br>
* [ ] **Check your API URLs.**

  If you are using the API URL that includes “bubbleapps.io,” for example appname.bubbleapps.io/api/1.1/wf/workflow, those urls won’t work any more once your app is on a dedicated server. The base url for an app on a dedicated server is different from the structure used for apps on the main cluster, so make sure to change any references to your app’s apis to reference your app’s custom domain, or if you don’t have a custom domain set up, make a note of where you are referencing that old url so that you can change it later.<br>
* [ ] **Consider moving paid plugins to perpetual licenses.**

  Plugins with perpetual licenses will continue to function as expected once you are migrated, but you'll need to resubscribe to any plugins that are on subscriptions once you are on your dedicated server.<br>
* [ ] **Check for “testing” plugins.**

  Testing plugins are plugins where your app is the test app for that plugin. You can tell if you have a test plugin if you see “(testing)” written next to the plugin name in the plugins tab. We recommend against using them in your live app even on the main cluster, but using them is especially dangerous on dedicated environments because it creates an increased level of dependency on the main cluster.\
  \
  If you have any that you are not using, please remove them from your app. If you are using any, considering publishing them and using the published version instead. A private license works well for this option.<br>
* [ ] **Consider wiping your database change history.**

  If you have a particularly large database, we may recommend that you wipe your database change history to limit the amount of data that needs to be transferred onto your dedicated server. This will allow us to make sure we can complete the migration in a single day. This process won’t delete any of your current data, but it will prevent you from doing point-in-time restorations of your database, so if you want to revert your database to a previous time that would no longer be possible.
