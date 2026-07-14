# IAP on Android devices
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/iap-on-android-devices · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Enabling in-app purchases

Start a build after enabling in-app purchases by clicking the button in this section.

Once the build is complete (this can take up to 30 minutes), go to *Google Play Console → App → Test and release → Testing → Internal testing*. Save the draft release that was automatically created when the build file was sent to the Play Console.

If you received a build success email but don’t see a draft release with the new build file, manually create a draft release and attach the build file provided in the email.

Click the button to verify that everything is properly connected.

### Handling billing notification events

Because in-app purchases are completed through Google’s interface, your app needs a way to detect when a user performs actions such as subscribing to or canceling a plan. Google Play Billing sends server-side notifications whenever these events occur. This step ensures your app’s backend is properly connected to Google Play Billing.

Click the link to open your Google Cloud permissions and add the following permission levels:

* *Pub/Sub-Admin*
* *Service Account User*

The *Manage permissions* option is located in the three-dot actions menu.

<figure><img src="/files/4WwuUlod8vPdujZNOv2d" alt=""><figcaption></figcaption></figure>

After adding the permissions, wait about 10 seconds. Then return to Bubble and click the button to automatically create a Pub/Sub configuration.

If this doesn’t work, make sure billing is enabled for your Google Cloud project and that the Pub/Sub API is enabled (step 3 in Google’s Pub/Sub documentation).

### Testing setup

{% stepper %}
{% step %}

### Copy the new pub/sub name

Then go to Google Play Console > Monetize with Play > Monetization setup > Enable notifications.
{% endstep %}

{% step %}

### Check the box

Check the box to *Enable real-time notifications* and paste in the *Topic Name.*

<figure><img src="/files/pDVAh9TcKlXHY4OcMiJE" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Send a test notification

Still in the Google Play Console: *Click Send a test notification.*
{% endstep %}

{% step %}

### Confirm

Return to Bubble and ensure a test notification has been successfully received.
{% endstep %}
{% endstepper %}

If you encounter an error, check *Google Play Console → Products → Pub/Sub* to find the Google in-app purchase subscription that was created.
