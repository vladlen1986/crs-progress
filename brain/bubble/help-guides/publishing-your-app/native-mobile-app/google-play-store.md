# Google Play Store
> Source: https://manual.bubble.io/help-guides/publishing-your-app/native-mobile-app/google-play-store · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Setup

{% hint style="warning" %}
Please note that Bubble supports publishing only to the Play Store and does not support alternative Android app stores.
{% endhint %}

{% hint style="warning" %}
If you haven’t already, please read our guide on configuring global settings [here](/help-guides/publishing-your-app/native-mobile-app/global-native-mobile-settings).
{% endhint %}

### Creating app in Google Play Console

To publish your Mobile app on Google Play, sign up to a Google Play Console developer account.

<figure><img src="/files/BqJHRJCiy5s0x3Lgvidm" alt=""><figcaption></figcaption></figure>

Once you're logged in, you'll see an option on the Home screen to create a new app. Fill out the initial fields—don’t worry, you can always update this information later if needed.

#### Creating a Google Cloud Project

Your Google Play Console login is the same as your Google Play developer account. If you’ve used a Google API before (like Google Maps), you may already have a project in the Google Cloud Console.

However, it’s generally best to create a new project dedicated to your mobile app, especially if you're managing multiple apps or services.

### Google Play Console vs Google Cloud Console

#### Google Play Console

<figure><img src="/files/VJPoYZtgTrASno7WoCly" alt=""><figcaption><p>Google Play Console</p></figcaption></figure>

The Google Play Console is used for publishing your app to the Play Store. [Visit Google Play Console here.](https://play.google.com/console)<br>

<mark style="color:green;">**Do Use Play Console For:**</mark>

* Creating a new app listing (name, description, screenshots, etc.)
* Uploading your .aab file (Android App Bundle from Bubble)
* Managing app releases and production tracks (internal testing, production)
* Setting your app's pricing and distribution regions
* Viewing crash reports and store performance analytics
* Setting up privacy policies, app permissions, and content ratings<br>

<mark style="color:red;">**Don't Use Play Console For:**</mark>

* Managing API keys (e.g., Maps, Firebase, Google Sign-In)
* Enabling external APIs
* Handling Google Cloud billing

#### Google Cloud Console

<figure><img src="/files/phWiGSfL9p8eG7gB4pZa" alt=""><figcaption><p>Google Cloud Console</p></figcaption></figure>

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe6Sx29E8omZYyc5FDp4U_Pk2-vEHiGftBtbZNc7TxHlw1M1pHs8s8Mx2wNU6sqtKTI-XFnUqzGrv_DYUckwFzpa4vJw_pZ0CaVxAUna8rERxEmg1HwjutQ2IosXM3qQhkXM4J4GA?key=9h6Zyq3W2VREWBnTRVJivI2V" alt=""><figcaption></figcaption></figure>

Used for enabling Google APIs and services that your app might use. [Visit Google Cloud Console here.](https://console.cloud.google.com/)

<mark style="color:green;">**Use Cloud Console For:**</mark>

* Creating and managing API keys
* Enabling services like:
  * Google Maps
  * Google OAuth login
  * Firebase Authentication or Analytics
* Managing billing for paid API services
* Configuring IAM roles and security permissions for APIs

<mark style="color:red;">**Don't Use Cloud Console For:**</mark>

* Uploading app builds
* Creating Play Store listings
* Managing in-app purchases or pricing
* Monitoring app reviews or ratings

Check out the table below for a side-by-side breakdown to help you find what you need to prepare your app for publishing.

| Task                                                                          | Where?                                           | Notes                                                                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Create a new app listing                                                      | Google Play Console                              | This is where you register your app, upload your .aab file, and configure the store listing. |
| Create a project                                                              | Google Cloud Console                             | Good practice: create one project per app to keep API keys and services organized.           |
| Enable APIs like Maps, OAuth login, or FCM (Firebase Cloud Messaging)         | Google Cloud Console                             | Bubble may require API keys or Firebase files uploaded in the app’s Mobile settings.         |
| Set up screenshots, metadata, pricing                                         | Google Play Console                              | Live in the Play Store                                                                       |
| Generate your `.aab` app bundle                                               | Emailed to you during deploy                     | This is what you’ll upload to Google Play for your Android app build.                        |
| Generate a Keystore file                                                      | Your local machine (via terminal/command prompt) | Used to sign your app. Bubble guides you through this in their mobile setup.                 |
| Upload app assets, setup permissions, privacy policy, etc.                    | Google Play Console                              | Required for the app to pass review.                                                         |
| Upload Firebase files (`google-services.json` and `service-account-key.json`) | *Bubble Editor – Settings – Mobile*              | These files are generated in Firebase (which is part of Google Cloud).                       |

{% hint style="warning" %}
**Privacy policy:** If your app requests or collects any kind of user data (such as camera access), Android **requires you to link to a privacy policy**. This must be a publicly accessible URL. Failing to include this when setting up your app in the Google Play Console **can result in your app being rejected**. We recommend preparing your privacy policy and linking it during project setup.
{% endhint %}

#### Creating a new app in Google Play Console

To create a new app, open the Google Play Console and click “Create app”.

<figure><img src="/files/TJ8jN9zmfSWMmJPf0STg" alt=""><figcaption></figcaption></figure>

<figure><img src="/files/s3w3sDLMXBphhv0IIrIj" alt=""><figcaption></figcaption></figure>

This will create your app listing — where you'll manage everything from uploading builds to setting your app's title, description, pricing, and store visibility.

Follow the prompts to complete the app creation flow. Once done, you’ll be taken to your app dashboard.

<figure><img src="/files/ZTdHT2HYj4XoUVbLW9et" alt=""><figcaption></figcaption></figure>

#### Creating a new project in Google Cloud Console

In addition to the Play Console, you’ll also need a Google Cloud Console project. This is where you’ll generate the JSON key Bubble uses to upload your builds to Google Play automatically.

<figure><img src="/files/QxCLhEXYMcQug1DDkTNo" alt=""><figcaption></figcaption></figure>

We recommend creating a separate Cloud project for each app you publish. This helps you keep API credentials, billing, and permissions cleanly organized by app.

### Creating a Google Cloud Project: Personal vs. Organization Accounts

<figure><img src="/files/sPos59JZvM2kJysp5zOn" alt=""><figcaption></figcaption></figure>

When setting up your Google Cloud project (required for generating your JSON key), you may see an error like this:

"You do not have the required resourcemanager.projects.create permission to create projects in this location."

This usually means you're using a Google Workspace or company-managed account, and you don’t have the permission to create projects within that organization's folder.

#### Personal Google Account

* You can usually create Google Cloud projects without issues.
* You'll see “No organization” when choosing a location — this is totally fine.
* Ideal if you’re publishing as an individual developer or small team.

#### Google Workspace / Organization Account

* Project creation may be restricted by an administrator.
* You’ll need to request permission or have an admin:
  * Create the project for you, or
  * Assign you the Project Creator IAM role (resourcemanager.projects.create)

### Generating a JSON Key

A JSON key is required to allow Bubble to securely communicate with your Google Play Console on your behalf. Specifically, it enables Bubble to upload your Android app builds directly to your Play Store account without you needing to manually handle each file.

This key comes from a service account you create in your Google Cloud project, and it acts like a secure credential that Bubble uses to authenticate with Google’s APIs. Without this key, Bubble can’t push builds or automate updates — so it’s a critical step for streamlining your Android app deployment process.

{% stepper %}
{% step %}

### Log in and go to the right section

Go to *IAM & Admin – Service Accounts*.
{% endstep %}

{% step %}

### Create a new service account

<figure><img src="/files/XEIv2w7PuiABbbGz6LJh" alt=""><figcaption></figcaption></figure>

Make sure you're in the correct Google Cloud project by checking the Project ID.

Look for it in the light gray text inside the second input field (before .iam.gserviceaccount.com), or If it’s not correct, click the project picker in the top bar and switch to the right one.

<figure><img src="/files/ebIInGHsYHIvge7VqvCD" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Enter a Service account name

Enter a Service account name (e.g., bubble-deploy-access). After the account is created, copy the email address shown under the Service account ID — you’ll need it later.
{% endstep %}

{% step %}

### Generate JSON key

Then generate a JSON key for that service account and download it (This is what you’ll upload to Bubble so it can push builds to Google Play.)

<figure><img src="/files/Ikvqlwm9mKvBi0hRxEoR" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

### Granting access to your Google Play Console

After you've generated your JSON key, the next step is to give your service account access to the Google Play Console. Here’s how:

{% stepper %}
{% step %}

### Go to Google Play Console

Open the [Google Play Console](https://play.google.com/console/?hl=en) and go to *Users and permissions*.
{% endstep %}

{% step %}

### Invite new user(s)

Click *Invite new user*. Paste the service account email address you saved earlier into the *Email address* field.
{% endstep %}

{% step %}

### Set permissions

Click *Account permissions*. Select the permissions you want this account to have. For a smoother publishing process, we recommend choosing *Admin (all permissions)* — this ensures your app build can be sent directly to the Play Console.

Click *Invite user* to finish.
{% endstep %}
{% endstepper %}

#### Automatic builds to Google Play

**Important:** To allow automatic Android builds, please navigate to the Google Play Console and enable the Google Play Android Developer API. Please make sure to bring the email used in your service account setup. See image below.

<figure><img src="/files/X1dZRwrmm3GdomCcIi61" alt=""><figcaption><p>Navigate to <em>Enabled APIs &#x26; Services</em> and ensure Google Play Android Developer API is enabled.</p></figcaption></figure>

### Generating a Keystore

A keystore is a file that holds important security credentials, like cryptographic keys, used to sign your mobile app. This digital signature proves that your app comes from a trusted source and hasn't been altered.

Important: The keystore file is critical for future app updates. If it's lost, you won’t be able to push updates to your app on the Play Store. Be sure to store it somewhere secure and back it up.

Important: Please make sure you have Java installed on your machine when generating a keystore. You can install Java through [Homebrew](https://formulae.brew.sh/formula/openjdk). Download [Homebrew](https://brew.sh/) here if it’s not already installed.

#### Generating Your Keystore File

The keystore you generate in this step will later be used to fill out the Code signing key, Key alias, and Key password fields in the *Mobile settings* subtab of your app.

{% hint style="info" %}
Creating a keystore requires using your computer’s command line—Terminal on macOS or Command Prompt on Windows. It might look a bit intimidating, but it’s simpler than it seems!
{% endhint %}

Note: Open your command line interface:

* **macOS:** Open Terminal (found in Applications > Utilities).
* **Windows:** Open Command Prompt (search for cmd.exe).

Run the following command by pasting this into your terminal or command prompt:

{% code overflow="wrap" %}

```
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS
```

{% endcode %}

<figure><img src="/files/omB1JZifNy8juA86srn3" alt=""><figcaption></figcaption></figure>

Before you hit enter, make sure you customize `KEY_ALIAS` to match your app:

* Replace `KEY_ALIAS` with a memorable name (like `appname_keys`).
* Use your arrow keys to move the cursor.
* Do not use your mouse—it won’t work in the command line interface.
* Press Enter once you're ready to run the command.

#### Complete the Keystore Setup

After pressing Enter, the terminal will ask you for a password. When typing your password, you won’t see any characters appear on the screen. This is normal and is done for security purposes.

Next it will prompt you with a few questions (such as your name and organization) and ask you to create a password for your keystore.

<figure><img src="/files/K3KksFhACAfbTP5VzTYL" alt=""><figcaption></figcaption></figure>

* Press Enter after each response to move to the next question.
* Choose a password you’ll remember and write it down—you’ll need it later during the app signing process.

#### Finishing Up the Keystore

You may see a warning about migrating to a different keystore format—if so, just follow the on-screen instructions. You’ll need your keystore password to complete that step.

Once complete, your keystore file will be saved to your computer, typically in your user directory. It’s now ready to be uploaded to the Mobile settings page in Bubble.

{% hint style="warning" %}
**Moving the file:** If you want to move the file to another folder (like your Documents folder), you can use the following command:

```
mv KEYSTORE_OUTPUT_FILE.keystore Documents
```

\
Just replace `KEYSTORE_OUTPUT_FILE.keystore` with the actual filename, and Documents with your desired destination folder.
{% endhint %}

{% hint style="warning" %}
**Keystore backup:** Restoring your Android Keystore is critical if you lose access to it or if you only uploaded the signed app bundle and didn’t save the original Keystore file. Without the Keystore, you won’t be able to issue updates to your app on the Google Play Store, as the signing key is required to verify that new versions come from the same developer.

**To avoid issues, always download and securely store your Keystore file and related credentials in a safe location.**
{% endhint %}

#### Bubble Mobile Settings

<figure><img src="/files/DZAwA9I3lETdk8dcW4pt" alt=""><figcaption></figcaption></figure>

Now that you have created a project and generated a Keystore, fill out your Android Mobile settings in your Bubble app. Below is a table to help you understand how to map each field accordingly.

| Field                     | Description                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package Name              | <p>A unique ID for your app, equivalent to the iOS Bundle ID. so we recommend using the same value for both Bundle ID and Package name (<code>ex. com.yourcompany.yourappname</code>).<br></p><p>Note: The package name can include uppercase and lowercase letters, numbers, and underscores (\_). It's typically written in reverse-DNS format (such as <code>com.yourcompany.yourappname</code>).</p> |
| JSON Key                  | The JSON key is located in a file that will be uploaded to the Mobile settings subtab. You can generate this file by following[ these instructions](https://docs.fastlane.tools/actions/upload_to_play_store/). This will require using the Google Cloud Project that you set up earlier.                                                                                                                |
| Code signing key          | This is the file that was saved to your computer when you generated a[ keystore](https://docs.google.com/document/d/12YfT-qsBOuWVB1BcLYqx0TWjOtuYw5BWc8C7yPcYZ1I/edit#heading=h.fthxy0cmw1ea) in the previous[ article](https://manual.bubble.io/beta-features/native-mobile-apps/publishing/android-play-store).                                                                                        |
| Code signing key alias    | This is the name you set in the initial command when generating the[ keystore](https://docs.google.com/document/d/12YfT-qsBOuWVB1BcLYqx0TWjOtuYw5BWc8C7yPcYZ1I/edit#heading=h.fthxy0cmw1ea) (i.e. what you replaced `KEY_ALIAS` with). If you did not make any changes to the initial command, then this value will be key\_alias.                                                                       |
| Code signing key password | This is the password you used when generating the[ keystore](https://docs.google.com/document/d/12YfT-qsBOuWVB1BcLYqx0TWjOtuYw5BWc8C7yPcYZ1I/edit#heading=h.fthxy0cmw1ea).                                                                                                                                                                                                                               |

## Deploying

<figure><img src="/files/Jx8o7iwhN3vBun0U9GpZ" alt=""><figcaption></figcaption></figure>

Before submitting your app to the Google Play Store, you need to generate a build. In Bubble, this involves completing all required Mobile settings— uploading your keystore, setting your package name, and configuring Firebase fields for push notifications if you're using them.

Once everything is set up, you can click to deploy your app.

In doing so you will generate the .aab file (Android App Bundle) which will be sent to your email when the build is complete. This file is required by Google Play and will be the one you upload to your developer console.

Here is what happens next:

{% stepper %}
{% step %}

### Deploy Your App in Bubble

* Click *Deploy* from your Bubble editor.
* Your first deploy will *fail intentionally* — this triggers the system to generate your Android app bundle (`.aab`).
  {% endstep %}

{% step %}

### Check Your Email

* You’ll receive an email shortly after attempting deployment.
* It may mention updating — just click the link to download the `.aab` file.
  {% endstep %}

{% step %}

### Upload to Google Play Console

* Go to Google Play Console and create or select your app.
* Upload the `.aab` file under Release > Production > Create new release.
  {% endstep %}
  {% endstepper %}

#### Future Updates

After the first manual upload, future deployments will **automatically upload your** `.aab` to the Play Store (assuming you have activated the Google Developer API)

{% hint style="info" %}
**Enable services:** If you're using features like Google Maps, push notifications, or in-app purchases, make sure those services are fully enabled and configured in both Bubble and Firebase.
{% endhint %}

## Testing

<figure><img src="/files/YqgqzTDNwzgQj1QrV58D" alt=""><figcaption></figcaption></figure>

Before going live, it’s important to test your app across devices and user scenarios. The Google Play Console offers multiple testing tracks:

* Internal testing: Ideal for quick testing with your team (up to 100 testers).
* Closed testing: Invite specific users outside your team.
* Open testing: Share your app with anyone via a public link.
  * Please note for open testing, you will need to fill out the Store Listing information below (that you can find under the review step)

Upload your `.aab` file under the Testing section in the Play Console. You’ll be able to create a test release and invite users via email or opt-in link. Make sure to check key functionality, performance, responsiveness, and loading times across different Android devices.

This is also your best chance to get early feedback and catch any bugs or user experience issues before you submit the app for review.

## Reviewing

Once testing is complete and your app feels solid, it’s time to prep for Google’s review process. This step includes creating your Store Listing, which includes:

* App name and short description
* Full app description
* App category
* Screenshots and graphics
* Privacy policy URL

You’ll also be required to complete forms for your app’s content rating, target audience, and data safety practices.

Take your time here—ensure all details are accurate and in compliance with Google’s Developer Policies. Incorrect or incomplete information (especially regarding user data or permissions) can lead to delays or rejections. Once submitted, your app will enter the review queue, which usually takes a few business days (longer for first-time developers).

## Publishing

When your app is approved, it’s time to publish! In the Release > Production section of the Play Console, you can choose between two options:

* **Full rollout:** Instantly make your app available to all users.
* **Staged rollout:** Gradually release to a small percentage of users and monitor performance.

Staged rollouts are a smart choice if you want to catch any final issues at scale before releasing the app more broadly.

Once live, your app will appear in the Google Play Store and begin reaching users. After publishing, you’ll want to keep an eye on user reviews, crash reports, and usage metrics to track performance and user satisfaction.

## Updates

Mobile apps are rarely "done." Over time, you’ll want to publish updates to fix bugs, improve features, or respond to user feedback. The update process is very similar to your initial submission.

{% stepper %}
{% step %}

### Finish the changes

Make your planned changes in Bubble.
{% endstep %}

{% step %}

### Choose release type

To publish a new version, you can simply change the release type in the app settings. For smaller updates, consider using an OTA (Over-the-Air) update instead.
{% endstep %}

{% step %}

### Generate file

Generate a new `.aab` file.
{% endstep %}

{% step %}

### Upload

Upload it in the *Play Console under Release – Production*.
{% endstep %}

{% step %}

### Write release notes

Write clear release notes summarizing what’s new or improved.
{% endstep %}
{% endstepper %}

Even for minor changes, it’s best practice to test your new version before releasing it. For larger updates, consider another staged rollout.

### Push Notification Settings (Optional)

{% hint style="warning" %}
**Keep it secure:** The files you generate in this section grant access to Firebase services and should be treated like sensitive credentials—store them securely, just like API keys or login details.
{% endhint %}

#### What You’ll Need

Bubble supports Android push notifications using Firebase Cloud Messaging (FCM). To enable this, you’ll need to:

1. Generate and download your `google-services.json` file.
2. Generate and download your Firebase service account key.
3. Upload both files in the *Bubble Editor – Settings – Mobile* section.

#### Setting Up Firebase Console

{% stepper %}
{% step %}

### Get you JSON file

Get your `google-services.json` file

* Go to the Firebase Console and sign in.
* Click "Create a project" and follow the prompts.
* If asked, select a parent resource (like your Firebase organization).
* You may enable Google Analytics if you'd like—this is optional and not required for push notifications.
* Wait a few moments while the project is being created.

Once your project is ready:

* In the Project overview, click the Android icon where it says “Add an app to get started.”
* Enter your Android package name (this must match the bundle ID used in your app).
* (Optional) Add an App nickname—this won’t affect notifications.
* (Optional) Add your Debug signing certificate SHA-1—not required for push notifications.
* Click Register App.
* Click Download google-services.json and save the file in a secure location.
  {% endstep %}

{% step %}

### Get your Firebase service account key

* In the Firebase Console, go to Project Settings.
* Navigate to the Service Accounts tab.
* Click "Generate new private key" and confirm.
* Download the `.json` key file and save it securely.

<figure><img src="/files/cEhl6siBNIKgQ2WaQnPQ" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Upload Files to Bubble

* Open your Bubble app.
* Go to *Settings > Mobile*.
* In the Android settings section, scroll to Firebase Cloud Messaging (FCM).
* Upload your `google-services.json` file into the corresponding field.
  {% endstep %}

{% step %}

### Upload the Firebase service account key

* In the same Firebase Cloud Messaging (FCM) section of the Bubble editor,
* Upload your Firebase service account key (`.json`) into the Service account key field.
  {% endstep %}
  {% endstepper %}
