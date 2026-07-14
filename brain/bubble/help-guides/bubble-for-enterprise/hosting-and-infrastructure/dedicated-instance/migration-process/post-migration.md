# Post-migration
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process/post-migration · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A few days after the migration, we'll have another call to go over the different functionality you have access to in the dedicated editor experience. We’ll also use this time to answer any questions you may have after exploring your app on your dedicated server.

### To do

* [ ] **Log in to your dedicated server.**

  When the migration is done, we'll send you a link to log into your server. Before you can access your apps on the server, you need to go to that link and click “Login with Bubble.” If you don’t do this step, you'll see a “user not authorized” message when trying to access your app’s editor.<br>
* [ ] **Make sure your Bubble software is up to date.**

  Open up your app on the dedicated server and you'll see a new icon in the upper toolbar. This is your Dedicated Manager. If it’s blue, that means a new Bubble version is available. In this case, click on the icon and then click “Upgrade.” This update can take a few hours and your app may not perform as intended until this update is complete. Check out the “Dedicated Manager” section of this packet for more information.<br>
* [ ] **Reconnect any plugins that may have been disconnected.**

  You'll need to re-subscribe to any plugins that were on subscription licenses.<br>
* [ ] **Check your Sendgrid integration.**

  Sendgrid settings get disconnected during migration, and will need to be reconnected if you have a custom sendgrid key. You'll need to deploy to live to make sure those updated settings get pushed to the live version of your app.
