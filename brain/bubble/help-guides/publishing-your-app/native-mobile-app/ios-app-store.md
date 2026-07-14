# iOS App Store
> Source: https://manual.bubble.io/help-guides/publishing-your-app/native-mobile-app/ios-app-store · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Apple Developer Program

To build and publish an iOS app, you must enroll in the Apple Developer Program. You can sign up for an account [here](https://developer.apple.com/programs/).

{% hint style="warning" %}
**Annual fee:** Apple requires an annual payment of $99 to maintain your developer account. This fee is set and managed by Apple, independent of Bubble.
{% endhint %}

Once your Apple Developer account is set up, you must create and configure a project in [App Store Connect](https://appstoreconnect.apple.com/).

## What is App Store Connect?

App Store Connect is Apple’s platform for managing your iOS apps, this is where you can configure your app metadata, submit builds for review, track performance, and manage your account.

### Differences between Apple Developer and App Store Connect:<br>

* **Apple Developer** is the broader platform for developers, where you sign up for the Apple Developer Program (required to publish apps) and access tools like APIs, and developer documentation. It also includes Certificates, Identifiers & Profiles for app signing and provisioning.
* **App Store Connect** is the platform specifically used for managing and distributing apps on the App Store. It’s where you create app listings, upload builds, manage TestFlight testing, view analytics, and submit apps for review.

In other words, Apple Developer is where you prepare and sign your app, while App Store Connect is where you submit and manage it on the App Store.

Throughout this guide we will be setting up and utilizing both to connect our Mobile app, so please have them open in separate tabs.

{% hint style="info" %}
**Terminology guide:** Throughout this guide we use terminology specifically related to publishing apps in the iOS app store. Please see the article below for a comprehensive terminology table.

Article: [Native mobile app terminology](/help-guides/getting-started/building-for.../native-ios-and-android/native-mobile-app-terminology)
{% endhint %}

## Preparing

{% stepper %}
{% step %}

### Generate a Bundle ID for iOS

An identifier is a unique string used to distinguish your app from others within Apple's ecosystem. In iOS development, the most important identifier is the Bundle ID, which is required for app submission, provisioning, and integration with Apple services.

#### 1. Sign in to Apple Developer

Go to[ developer.apple.com](https://developer.apple.com) and log in to your account.

#### 2. Open Identifiers

Navigate to your account page <https://developer.apple.com/account> and click on Identifiers in the menu bar.

<figure><img src="/files/Y8BNgLSyl1mcOaz0eWhn" alt=""><figcaption></figcaption></figure>

#### 3. Create a new identifier

This is where we create the new identifier.

<figure><img src="/files/LPLTISYJ8olpjtw2abYF" alt=""><figcaption></figcaption></figure>

1. Click the + button to add a new identifier.
2. Choose App IDs as the identifier type and click Continue.
3. Select App then click Continue.

#### 4. Enter app details

Provide a description for the identifier that makes it easy to recognize which app you are setting it up for. Then, manually define your Bundle ID.

<figure><img src="/files/nRpN6SvUSnDrEKlE7z1h" alt=""><figcaption></figcaption></figure>

Choose one of the following formats:

* **Explicit Bundle ID** (e.g., com.yourcompany.yourappname) – used when you're registering one specific app.
* **Wildcard Bundle ID** (e.g., com.yourcompany.\*) – used when you want to register multiple apps that share the same base identifier.

{% hint style="warning" %}
**Note**: The Bundle ID must use only letters, numbers, hyphens (-), and periods (.) and follow the reverse-DNS format (e.g., com.yourcompany.yourapp).
{% endhint %}

Be sure to use descriptive names or wildcard Bundle IDs for easy management, especially if you plan to have multiple apps in the App Store.<br>

For example, for our individual app, we might use `com.bubble.workplacedemo`

{% hint style="warning" %}
Do NOT manually create a distribution certificate before building, as this can lead to conflicts that prevent the build to complete successfully. See more information in the expandable box below.
{% endhint %}

<details>

<summary>Managing Distribution Certificates for iOS Builds</summary>

When building a native iOS app with Bubble, it’s important to properly manage your Apple distribution certificates to ensure a smooth build process.

**Do not manually create a distribution certificate before building**

Bubble automatically generates a distribution certificate as part of the iOS build process. Manually creating one beforehand can lead to conflicts that prevent the build from completing successfully.

**Ensure you have an available distribution certificate slot**

Apple enforces a limit on the number of active distribution certificates allowed per account:

* **Apple Developer Program (Standard)**: Maximum of **3** active distribution certificates
* **Apple Developer Enterprise Program**: Maximum of **2** active distribution certificates

Bubble needs **one available certificate slot** to generate the necessary certificate for your build. If your account has already reached the maximum number of distribution certificates, you will need to **revoke an existing one** before initiating the build process.

**How to check and manage distribution certificates**

To review and manage your distribution certificates:

1. Sign in to your **Apple Developer Account** at [developer.apple.com](https://developer.apple.com).
2. Navigate to **Certificates, Identifiers & Profiles**.
3. Click on the **Certificates** tab.
4. Under **Type**, look for any existing **Apple Distribution** certificates.
5. If you have reached the limit, revoke an unused certificate to free up a slot for Bubble to create a new one.

</details>

#### 5. Confirm and register

Once you've reviewed your submission, click 'Register' to complete the process. You have now successfully created an identifier for your app with a Bundle ID.
{% endstep %}

{% step %}

### Create a private key / key ID

Creating a private key / key ID refers to generating a secure authentication key within App Store Connect.

This key is used to authorize API access for managing app-related tasks, such as submitting builds, managing users, and retrieving analytics.

The private key (`.p8` file) is a confidential credential, while the Key ID is an identifier associated with it.

{% hint style="warning" %}
Security: Treat your private key like a sensitive credential and store it securely. Also, keep a secure backup to avoid development interruptions.<br>
{% endhint %}

#### 1. Create a new API key

Navigate to <https://developer.apple.com/account> then click on *Users and Access*:

<figure><img src="/files/OQaTEftDoXVSnv9iCOOY" alt=""><figcaption></figcaption></figure>

Next, navigate to the *Integrations* sub-section, and find the *Keys* tab.

In App Store Connect, API keys can be created at either the team level (Team Key) or for individual accounts (Individual Key). A Team Key is used when multiple members need access to App Store Connect APIs, allowing team-wide authorization.

Only the Account Holder can generate and manage these keys, ensuring secure access control.

An Individual Key, on the other hand, is tied to a single developer’s account and is typically used when working independently.

However, if you’re part of an organization account, you may only have the option to generate a Team Key, as API access is managed centrally by the account owner.

Click *Generate API Key* where applicable

<figure><img src="/files/7FhAjHXgcP2MBNaNrHAc" alt=""><figcaption></figcaption></figure>

#### Assign admin access:

<figure><img src="/files/19kEoV2xAli43ZWYYdp6" alt=""><figcaption></figcaption></figure>

Provide admin access to the new API key.

{% hint style="warning" %}
Note: If using a team account, the account holder must approve the request to generate API keys.
{% endhint %}

#### Download and save the key

Download the `.p8`key file. You cannot download it again after leaving the page, so be sure to store it securely.

Copy Issuer and Key IDs

<figure><img src="/files/cD4fjxrQmqpoRFtcsHYk" alt=""><figcaption></figcaption></figure>

After creating the key, you will see an Issuer ID and Key ID. Keep these accessible for later use.

#### Upload private key (`.p8` key file)

<figure><img src="/files/qfeGHPhgpWP7IFY2VwbY" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Create a Project

<figure><img src="/files/eIz4HR2rPaOLtHq1CqnC" alt=""><figcaption></figcaption></figure>

In App Store Connect, a "project" typically refers to the bundle of your app’s code and settings that you manage and submit to the App Store. It's associated with your app's bundle ID and is linked to an App Store Connect app record, where you manage app metadata, builds, pricing, and distribution.

1. Go to[ App Store Connect](https://appstoreconnect.apple.com/) and log in with your developer account.
2. Click on My Apps and then click the + button to select New App.
3.

```
<figure><img src="../../../.gitbook/assets/new-app-ios-bubble@2x.png" alt=""><figcaption></figcaption></figure>
```

```
<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe9fTgPdy198E8kK-LFe_N7ubM4XtyZ2PkIaCQ2siYWTar46cGc8o0CL8VpauR6-jMFlS04k-pGRXQPTC9TyPzhj2CsvJdEdm_gZKgUkcnRQuB6YQXP05NS03CEYxR5xUgwuAMd?key=9h6Zyq3W2VREWBnTRVJivI2V" alt=""><figcaption></figcaption></figure>
```

4\.

```
<figure><img src="../../../.gitbook/assets/new-app-settings-ios-bubble@2x.png" alt=""><figcaption></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfFwiZ3Pxqm7aZZUe735h9x7mGTDYoiwkemzWrA4Vmf8oArA4L_CKbYauvAJiliAZKZxgSHxES5-I9QVAxEqOSciVtJ9f3s4wB4xuYjk8_llGFkkvPSINryPztnKcN1WOjyi31g?key=9h6Zyq3W2VREWBnTRVJivI2V" alt=""><figcaption></figcaption></figure>
```

5\. Enter app details:

1. **Name:** The name your app will display on the App Store.
2. **Primary Language:** Select the main language your app will support.
3. **Bundle ID:** Select the Bundle ID you previously created in Apple Developer.
4. **SKU:** A unique internal identifier for your app, which will not be displayed publicly. Click Create to finalize your app project.
   {% endstep %}

{% step %}

### Connect to App Store Connect

After setting up your project, Bubble will automatically deliver your build to App Store Connect when you deploy.

Make sure to securely save your Bundle ID and API keys, as they’re essential for submitting your app. With everything in place, you’ll be ready to launch your Bubble app on iOS and move forward with the App Store submission.
{% endstep %}

{% step %}

### Deploying

In Bubble, deploying your mobile app means generating the final packaged version of your app’s code and assets — this is known as a build.

When you deploy, Bubble takes care of everything for you behind the scenes: it generates the build file, configures app settings like icons and splash screens, and automatically sends the build to App Store Connect.

When generating a build in Bubble, you'll notice there are different build types, such as OTA (Over-the-Air) and New Build.

For your first deployment, you can only choose New Build, as this creates a fresh build record that can be used for TestFlight testing or App Store submission. OTA is typically used later in the development process for pushing minor updates during internal testing.

Once you’ve finished setting up your app and are ready to generate a build, click *Deploy*.

<figure><img src="/files/FNCs2pSw1YtqoofBbu7J" alt=""><figcaption></figcaption></figure>

Bubble will automatically package your app and submit the build to App Store Connect on your behalf.

The process can take up to 45 minutes, and occasionally, builds may fail. If that happens, you’ll receive an email with details about the error.

When the build is successfully uploaded, Bubble will send you a confirmation email.
{% endstep %}
{% endstepper %}

## Testing

TestFlight is Apple’s official beta testing platform that lets you distribute your iOS app to testers before it's released on the App Store. Testers install your app build through the TestFlight app, and use it like a regular app.

On TestFlight they can provide feedback or report bugs, helping you identify issues and improve the experience before launch.

### Using TestFlight

{% stepper %}
{% step %}

### Log in to App Store Connect

* Go to[ App Store Connect](https://appstoreconnect.apple.com/), click on My Apps, and select your app.
* Navigate to the TestFlight tab in the top menu.

Your build may take a few minutes to appear, as Apple needs to finish processing it (checking for basic compliance and compiling internal metadata). Apple will send you an email once it’s ready.

If you don’t see the build after some time:

* Refresh the page
* Check that the correct Bundle ID was used
* Confirm in Bubble that the build was submitted
  {% endstep %}

{% step %}

### Add testing information

Click on your new build, and fill out the required testing information:

* What to Test: Describe the features that need review or are new.
* Build Notes: Include known issues, what’s changed, or instructions.
* This information will be shown to testers in the TestFlight app and helps guide meaningful feedback.
  {% endstep %}

{% step %}

### Set up internal testing

Internal testers are members of your App Store Connect team who can test without needing approval from Apple.

{% hint style="info" %}
**Note for TestFlight setup:** Before your build becomes available for TestFlight testing, Apple will ask you to answer a compliance question about authentication and distribution in France. Unless your app uses a custom or non-standard authentication method, you can choose Standard Authentication to proceed.
{% endhint %}

To invite them:

1. Go to the Users and Access section in App Store Connect.
2. Ensure they have the appropriate role (usually “Developer” or “App Manager”).
3. Back in the TestFlight tab, assign internal testers to the build.

They’ll get an email with a link to download the app via the TestFlight app.
{% endstep %}

{% step %}

### Set up external testing (optional, but useful)

If you want people outside your team (like early users, beta testers, or clients) to try the app:

1. Go back to the TestFlight tab and choose “Add External Testers.”
2. You’ll need to submit your build for Beta App Review. This is a lighter review than a full App Store submission but still checks for basic functionality and compliance with Apple guidelines.
3. Once approved, you can:
   1. Invite individual testers via email
   2. Or generate a public TestFlight link to share broadly

You can manage testers in groups or individually, and track installs and activity from this panel.
{% endstep %}

{% step %}

### Monitor and Gather Feedback

Testers will download the TestFlight app and install your beta app from there. They can:

* Send feedback directly through TestFlight (including screenshots and written notes)
* Report crashes or issues
* Automatically provide session and usage data

You can view this data inside the TestFlight dashboard under your app’s build.
{% endstep %}

{% step %}

### Iterate and Re-Test

Based on tester feedback:

* You can make updates in Bubble
* Generate a new build or send OTA updates
* Submit again via Bubble to App Store Connect

Each new build will appear in the TestFlight tab, and you can re-invite testers or assign it to new ones. TestFlight supports multiple active builds, so you can test different versions if needed.

🎉 Your TestFlight is now ready!

This process helps you fine-tune your app with real users before going live. Once you’re confident in the stability and experience, you’re ready to move on to your Review and Submission process.
{% endstep %}
{% endstepper %}

## Review

### Submission process

Once your build is successfully uploaded to App Store Connect, the next step is to submit it for Apple’s App Review. This is a standard part of the iOS publishing process where Apple evaluates your app to ensure it meets their guidelines for performance, security, content, and functionality.

To start the review process, go to your app in App Store Connect, select the build you just uploaded, and submit it under the App Information > Version Release section. You’ll need to provide screenshots, a description, a support URL, and other required metadata before submitting.

<details>

<summary>Encryption compliance question</summary>

After your build is uploaded to App Store Connect and appears in TestFlight (even for internal testing), Apple will display a yellow warning next to the build number with a **Manage** button. Clicking this button will prompt you to answer a few required export compliance questions.

> **What type of encryption algorithm does your app use?**\
> **Answer: Option 4 – None of the above**

This answer is valid for most Bubble-built apps, as they rely on standard operating system encryption and do not use proprietary or non-standard encryption methods.\
\
If you’ve implemented your own encryption routines (e.g. using plugins or custom code), you may need to choose a different option. When in doubt, review Apple’s export compliance documentation or consult a legal advisor.

You will also be asked whether your app will be made available in **France**. This question relates to France's additional regulations for apps using encryption, and must be answered regardless of your app’s actual encryption usage.

</details>

Once submitted, the review typically takes anywhere from a few hours to a couple of days, though this can vary. You’ll be notified by email as soon as your app is approved or if any issues need to be resolved. Be sure to review Apple’s[ App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) to avoid common pitfalls.

### Resubmitting your app

Resubmitting a build can be a bit tricky. Follow these steps:

{% stepper %}
{% step %}

### Rebuild your app

Go to the Bubble editor and trigger a new build.
{% endstep %}

{% step %}

### **Wait for the build to complete**

Make sure the build finishes before moving on.
{% endstep %}

{% step %}

### **Delete the old build in App Store Connect**

1. Go to App Store Connect
2. Hover over the old build
3. Click the delete icon to remove it
   {% endstep %}

{% step %}

### **Find your new build**

Navigate to: *Apps → Your App → Distribution → Build Section → Build Table*
{% endstep %}

{% step %}

### **Select the new build and resubmit**

Choose the new build from the list and click Submit for Review.
{% endstep %}
{% endstepper %}

## Publish

### Releasing on iOS App Store

After your app passes Apple’s review, you’re ready to publish it to the App Store. You’ll have two options: manual release or automatic release. Manual gives you control over when the app goes live, while automatic releases it as soon as Apple approves it.

To publish manually, go to your app version in App Store Connect and click Release This Version when you're ready. If you choose automatic release during the review submission, your app will go live as soon as it's approved — no extra steps needed.

Once live, your app will be available to download via the App Store based on the availability settings (regions/countries) you selected. Congratulations — your Bubble app is officially published on iOS!

## Updates

Now that your app is live on the App Store, you’ll likely need to update it — whether for bug fixes, performance improvements, or new features. In Bubble, you have two main update paths: OTA (Over-the-Air) and New Builds — and it's important to understand how versions work in both contexts.

### Update Types: OTA vs New Build

#### **OTA (Over-the-Air) updates – quick changes**

* Ideal for minor bug fixes, text changes, and light UI tweaks.
* No need to re-submit to the App Store — these updates are pushed instantly.
* When you choose the OTA build type, Bubble deploys the update behind the scenes.
* Users automatically receive the update the next time they launch the app.

#### **New builds – major releases**

* Required for new features, structural changes, API modifications, or anything Apple needs to review.
* A New Build generates a fresh .ipa file, which Bubble sends to App Store Connect.
* You'll need to submit this build for review just like your original launch.
* Once approved, you can choose to release it manually or automatically.

### Versioning your app

Every time you create a New Build when you deploy, you’ll be prompted to pick a release type, which will create a version number (e.g., 1.1, 2.0).

* Stick with semantic versioning (MAJOR.MINOR.PATCH) to keep things organized.
* OTA updates typically don’t change your app version number — they apply to the existing version silently.

You can view and manage your version history in App Store Connect under your app’s "Activity" tab.

### Managing multiple live versions

Apple allows you to have multiple builds active for TestFlight, but only one live version of your app can be published on the App Store at a time.

However, you can:

* Release different builds to different tester groups using TestFlight (e.g., staging vs production builds).
* Keep older versions available via TestFlight while testing newer versions internally.
* Use versioning internally in Bubble to test changes on a dev version before deploying to production.

## Push notifications

{% hint style="warning" icon="lock" %}
Ensure that the file and ID mentioned in the guide below are stored securely. They should be considered sensitive data similar to login credentials and API keys.
{% endhint %}

### Enabling push notifications

The push notification capability needs to be enabled on your app's Bundle ID before you can send push notifications.

{% stepper %}
{% step %}

### Sign in

1. Sign in to your Apple Developer account at developer.apple.com.
2. Navigate to Certificates, IDs & Profiles and then Identifiers.
   {% endstep %}

{% step %}

### Select the relevant app

Select the relevant app in the list of identifiers.
{% endstep %}

{% step %}

### Enable push notifications

You will see a list of different capabilities. Scroll down to *Push Notifications* and check the checkbox to enable it.

**Do not click configure.** This step has you create unnecessary certificates. The APNS key replaces the need for these certificates.

<figure><img src="/files/7oMUIomjSP94GoXQKGVJ" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

### Getting your APNS key and key ID

{% stepper %}
{% step %}

### Sign in

1. Sign in to your Apple Developer account at developer.apple.com.
2. Navigate to Certificates, Identifiers & Profiles.
   {% endstep %}

{% step %}

### Create a new key

Under the Keys section, click the + button to create a new key.
{% endstep %}

{% step %}

### Name the key and select the service

Enter a name for your key and select the Apple Push Notifications service (APNs) capability.
{% endstep %}

{% step %}

### Configure & register

Click Configure and set the key to Sandbox and Production, then Save and Register.

<div><figure><img src="/files/rxuPMaT2o0A0wSw8RawO" alt=""><figcaption></figcaption></figure> <figure><img src="/files/aFIe7oRbTuDtc3G88UPK" alt=""><figcaption></figcaption></figure></div>
{% endstep %}

{% step %}

### Download your key file

Download your key file (`.p8`) immediately.

{% hint style="warning" %}
**Important:** this key can only be downloaded once. Store the key securely, as it is sensitive.
{% endhint %}

Make note of the following details:

1. **Key ID:** Displayed on the key configuration page.
2. **Private key:** The `.p8` file you downloaded.

Unlike the older certificate-based method, a single APNs key can be used across all your apps within your team

{% hint style="info" %}
Unlike the older certificate-based method, a single APNs key can be used across all your apps within your team.
{% endhint %}
{% endstep %}

{% step %}

### App settings

Enter the Key ID

* Open your Bubble app and go to the Settings – Mobile.
* Scroll to the Apple Push Notifications service section.
* Enter the APNs key ID into the field with the same name.
  {% endstep %}
  {% endstepper %}

Learn how to submit your app to the Google Play store [here](/help-guides/publishing-your-app/native-mobile-app/google-play-store).
