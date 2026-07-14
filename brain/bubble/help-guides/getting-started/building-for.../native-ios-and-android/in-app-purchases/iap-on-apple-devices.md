# IAP on Apple devices
> Source: https://manual.bubble.io/help-guides/getting-started/building-for.../native-ios-and-android/in-app-purchases/iap-on-apple-devices · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Enabling in-app purchases

To enable in-app purchases for Apple, fill in the required fields in the *Settings* tab.

### Private key

The private key must be generated in App Store Connect.

{% stepper %}
{% step %}

### Navigate to the right section

Go to *App Store Connect → Users and Access → Integrations → In-App Purchase*.
{% endstep %}

{% step %}

### Create a new key

Click the *+ symbol* to create a new key.
{% endstep %}

{% step %}

### Download key file

Download the key file and upload it in the Settings tab.<br>
{% endstep %}
{% endstepper %}

<figure><img src="/files/Entbit8YVRgWsHi65wIO" alt=""><figcaption></figcaption></figure>

If you’re part of an Apple Enterprise developer account, a specific permission level is required to create this key. If you don’t have access, contact your company administrator.

### Key ID

Copy the Key ID generated in the previous step and paste it into the **Key ID** field in the Settings tab.

### App Apple ID

The App Apple ID must also be generated in App Store Connect.

{% stepper %}
{% step %}

### Navigate to the right section

Go to *App Store Connect → Apps → Distribution → General → App Information → General Information*.
{% endstep %}

{% step %}

### Copy the Apple ID

Copy the *Apple ID* and paste it into the *Settings* tab.

<figure><img src="/files/hlWidkMGto6NxDW2FD48" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Confirm

Once all fields are filled in, click *Validate* to confirm that everything is connected correctly.
{% endstep %}
{% endstepper %}

## Handling billing notification events

Because in-app purchases are completed through Apple’s interface, your app needs a way to detect when a user performs actions such as subscribing to or canceling a plan. Apple StoreKit sends server-side billing notifications whenever these events occur. This step ensures your app’s backend is correctly connected to Apple’s billing system.

Click *Connect billing notification events*. This automatically registers the correct endpoint URL for your app with Apple StoreKit.

It can take up to five minutes for Apple to update and recognize the new endpoint.

If you encounter an error, confirm that your API key has admin access. See [this article](/help-guides/publishing-your-app/native-mobile-app/ios-app-store#id-1-create-a-new-api-key) for instructions.

## Testing setup

{% stepper %}
{% step %}

### Send test notification

Click *Send test notification*. Make sure at least five minutes have passed since connecting the billing notification events.
{% endstep %}

{% step %}

### Confirm

Check that the notification has been successfully received.
{% endstep %}
{% endstepper %}

If an error occurs, check *App Store Connect → Apps → App Information → App Store Server Notifications*.
