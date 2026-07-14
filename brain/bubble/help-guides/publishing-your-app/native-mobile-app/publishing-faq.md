# Publishing FAQ
> Source: https://manual.bubble.io/help-guides/publishing-your-app/native-mobile-app/publishing-faq · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## iOS (Apple App Store) FAQ

<details>

<summary>How do I get started with submitting my Bubble Mobile app to the App Store?</summary>

Start by reading the[ Bubble Mobile documentation](broken://pages/a15eAr6NLeD4KM3Gyx9j). You’ll need an active Apple Developer account and to upload the required certificate and provisioning files through the Bubble interface. Bubble handles the rest of the build process for you.

</details>

<details>

<summary>How do I generate the certificates required for iOS submission?</summary>

Use your Apple Developer account to generate the .p8 key. Follow Bubble's documentation to upload them correctly.

</details>

<details>

<summary>How long does it take to publish to the App Store once everything is set up?</summary>

Once your files are uploaded and settings are configured, it can take about 45 minutes to generate the build, upload it to TestFlight, and submit it for review.

</details>

<details>

<summary>Can I update my iOS app without resubmitting it to the App Store every time?</summary>

Yes. If you're only changing content inside your Bubble app (text, workflows, UI), those updates happen instantly and don’t require a rebuild. You only need to resubmit if you're changing the native shell—such as the app icon, splash screen, or plugins.

</details>

<details>

<summary>What are common issues users face when submitting to iOS?</summary>

Several users have run into challenges during their iOS submission process. Here are the most common ones:

#### App metadata errors:

Apple has strict requirements for what needs to be included in your App Store listing. Users have encountered rejections due to:

* Missing or improperly sized screenshots.
* Incomplete descriptions or keywords.
* Mismatched app names or bundle identifiers.
* Choosing an incorrect app category or age rating.

#### Certificate and key setup confusion:

While Bubble streamlines most of the native build process, you still need to manually generate and upload:

* A `.p8` key from Apple (App Store Connect API key).
* Associated App ID and bundle identifier.
* Apple Developer Team ID. Users often get stuck if any of these values are incorrect or missing during the setup.

#### Misunderstanding the Update Process:

It's common to assume that any change to your Bubble app requires a new app submission. However:

* **Web-based changes** (like UI edits or logic updates inside Bubble) do not require resubmission.
* **Native changes** (like splash screen, icons, or plugin settings) do require generating a new build and re-submitting through App Store Connect.

#### Waiting for Apple Review:

After submission, there is often a 1–3 day waiting period for Apple to approve your app (or longer if it’s your first submission). Users sometimes mistake this delay for a technical issue.

#### Unexpected Rejections:

Apple may reject your app for reasons that aren’t clearly explained. Common rejection reasons include:

#### Privacy policy issues.

* Unsupported content.
* Incomplete functionality (e.g., submitting a shell without full content).

</details>

***

## Android (Google Play Store) FAQ

<details>

<summary>Is Android publishing supported by Bubble Mobile?</summary>

Yes, you can publish directly to the Google Play Store. Bubble handles the build generation and provides an AAB (Android App Bundle) file that you can upload to Google Play.

</details>

<details>

<summary>Can I submit to other Android stores (like the Amazon Appstore)?</summary>

Not officially. Right now, Bubble only supports publishing to the Google Play Store.

</details>

<details>

<summary>What steps are involved in submitting to Google Play?</summary>

1. Set up a[ Google Play Developer account](https://play.google.com/console/about/).
2. Use Bubble to generate the Android build and download the `.aab` file.
3. Upload your build to the Google Play Console.
4. Complete the store listing (title, description, screenshots, privacy policy, etc.).
5. Submit for review.

</details>

<details>

<summary>Do I need to resubmit the Android app for every Bubble change?</summary>

No. Just like iOS, if your updates are within the Bubble editor (like text, logic, or layout changes), you don’t need to rebuild. Only changes to the native build require a new submission.

</details>

<details>

<summary>What are common issues users face when submitting to Google Play?</summary>

While Android submissions tend to be more forgiving than iOS, there are still several common pitfalls Bubble users have run into:

#### Incorrect Keystore Setup:

When generating the app build in Bubble, you need to download and securely store your keystore file. Common issues include:

* Misplacing the keystore or password (you can't update the app without it).
* Uploading a build signed with a different keystore (Google will reject it).
* Confusion around which signing method to choose (Bubble signs it, but you may opt into Google Play App Signing).
* Java is not installed

#### Store Listing Rejections:

Google requires a full store listing before publishing, and apps can be rejected or delayed if anything is missing or unclear. Frequent issues include:

* No privacy policy listed (especially for apps with data input or login).
* Missing or inappropriate screenshots.
* Generic or incomplete app descriptions.

#### Permissions Disclosure Problems:

If your app uses sensitive permissions (like location, camera, or file access), Google Play requires clear justification and explanation in the store listing. Apps without this are often rejected.

#### Policy Violations:

Google has strict policies around content, ads, and functionality. Users have run into issues where:

* Placeholder content or "coming soon" pages trigger rejection.
* Your app links to websites that aren't mobile-friendly or that violate Google’s policies.
* Apps require login but don’t offer a test account for reviewers.

#### APK vs AAB Confusion:

Bubble exports your app as an AAB (Android App Bundle) — the current required format for Google Play. Some users mistakenly expect an APK and run into trouble trying to upload it.

Misunderstanding the Update Process:

* Like with iOS, many assume any Bubble change means a new app submission. In reality:
* Web-based changes inside Bubble (design, workflows, content) update instantly without needing a new app build.
* Native build changes (icons, splash screen, plugin updates) do require generating a new build and uploading to Google Play again.

</details>

## Common Publishing Setup Errors

<details>

<summary>Developer account setup</summary>

To publish your app to the Apple App Store or Google Play Store, you need to set up developer accounts outside of Bubble:

**Apple App Store**\
Enroll in the Apple Developer Program. This requires identity verification and an annual membership fee.\
Ensure that your Apple account has the appropriate permissions—*Administrator* or *Account Holder*—as this may be required for key-based authentication to work correctly.

**Google Play Store**\
Create a Google Play Console account. You'll use this to manage your app’s presence on the Play Store.

**Permissions and access tips**

* Double-check that your **Key ID** and **Private Key** are connected to the correct Apple account and have the right permissions.
* *Note*: Using a key tied to a user with only developer permissions (instead of admin) can cause build issues

</details>

<details>

<summary>Common configuration issues in the Bubble editor</summary>

Even small formatting issues in your mobile settings can cause build failures. Here are some of the most common ones to check:

* **App Scheme**\
  Make sure the App Scheme is defined and doesn’t end with `://`. This value should be lowercase and alphanumeric (plus hyphens and periods if needed).
* **Whitespace issues**\
  Extra spaces in your app’s mobile settings can lead to build errors. Double-check all fields for trailing or unintended spaces.
* **Keystore alias (Android)**\
  This must be written in all lowercase letters.
* **Bundle ID**\
  Your Bundle ID must follow reverse domain format: `com.yourcompany.yourappname`.
* **Device-specific settings**\
  Ensure all required fields for iOS and Android builds are properly filled out—especially any that relate to native permissions or identifiers.
* **iOS Private Key**\
  When pasting your private key into the editor, include the full key contents, including the headers and footers.\
  \
  For example:

  ```
  -----BEGIN PRIVATE KEY-----
  [key content]
  -----END PRIVATE KEY-----
  ```

</details>

<details>

<summary>External issues outside Bubble</summary>

Some issues may relate to your external configuration or app history:

* You're attempting to deploy to an **existing app** on the App Store that previously included support for iPads or used a custom wrapper.
* You've **deleted a required distribution certificate or key** from your Apple Developer account. If so, a new certificate will need to be created and uploaded in the Bubble editor.

</details>
