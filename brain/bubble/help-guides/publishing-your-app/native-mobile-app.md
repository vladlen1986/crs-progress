# Native mobile app
> Source: https://manual.bubble.io/help-guides/publishing-your-app/native-mobile-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Getting Started with Mobile App Publishing

Publishing a native mobile app is a bit different than publishing a web app. Deploying a web app through Bubble means clicking the Deploy button, while releasing a native mobile app requires additional steps involving third-party platforms: the Apple App Store and Google Play Store. Each store has its own setup processes, requirements, and guidelines that must be fulfilled independently of Bubble.

This guide covers each step you'll need to follow to successfully publish your native mobile app, including understanding essential terminology and navigating the approval processes for both the Apple App Store and Google Play Store.

## Overview of the publishing process

Turning your Bubble app into a native mobile experience involves several key steps, from building your app with Mobile views, to the initial setup for the App Store and Google Play Store, testing and finally submitting for approval.

To begin, we will get familiar with the differences between distributing on the web vs mobile, and how mobile publishing works step by step. You will be going back and forth between your app, and your store(s) of choice throughout this process, so keep your tabs organized as you begin.

First, with Mobile development, it’s important to recognize that *publishing* is **different** from deploying.

Publishing your app involves several steps:

1. Preparing necessary assets like icons, descriptions, screenshots, privacy policy, etc.
2. Configuring your Bubble app for mobile deployment
3. Registering developer accounts with Apple and or Google
4. Deploying to the app stores
5. Testing your build
6. Submitting your app for review
7. Publishing and making it available for users

## Understanding deployment for Mobile

Deploying and publishing are often used interchangeably, but they have distinct meanings.

Traditionally, deploying in a web context means pushing updates live from your main branch, making them instantly available to users. In mobile, this concept applies less directly because updates often require a new build. A **build** is a packaged version of your app that is required for submission to the App Store or Google Play Store that we will learn more about soon.

Over-the-Air (OTA) updates allow you to make some changes without a **full** app store resubmission, though most updates still require a new build file that must be published to the App Store or Google Play.

In short, deployment in mobile development is preparing your app for release. True availability happens only after it’s published.

## iOS vs. Android: Key Differences in Submission and Approval

When publishing a mobile app, it's important to be aware of the costs and differences between iOS and Android, especially regarding approval processes, developer accounts, and compliance requirements.

### Developer account requirements

To publish an app, you must sign up for a developer account for each platform:

* **Apple Developer Program:** Requires an annual fee of $99 and identity verification.
* **Google Play Console:** Requires a one-time registration fee of $25.

### Approval process: Apple vs. Google

Once signed up, and ready to submit, Apple and Google have distinct review and approval workflows:

* **Apple App Store:** Stricter guidelines with a manual review process, leading to longer approval times (typically 1–3 days, but may take longer if revisions are required).
* **Google Play Store:** Generally more lenient on design quality and content restrictions. Review includes both automated and manual steps, with approval timelines that are often similar to Apple’s.

### Key compliance requirements

Both platforms enforce specific policies to ensure apps meet security and content guidelines:

* **Privacy Policy**: A publicly accessible page detailing how user data is collected and used.
* **Permissions**: Apps must justify the use of sensitive data (e.g., location, camera, contacts).
* **Content Guidelines**: Apps must not include misleading content, harmful functionality, or policy violations.

By preparing for these requirements in advance, you can avoid common rejections, reduce delays, and ensure a smoother submission process.

## Understanding Builds, OTA Updates, and Live Versions for deployment

Here’s a key glossary of concepts to understand before signing up for a developer account. Familiarizing yourself with these will give you a solid foundation in mobile development and help you navigate the publishing process when you're ready to launch your app on the app store.

### What is a Build?

A build is a packaged version of your app that is required for submission to the App Store or Google Play Store.

Each build is assigned a version number, following a semantic format (e.g., 1.0.0 → 1.1.0 → 1.2.1).

<table><thead><tr><th width="132.37890625">Version Type</th><th width="137.2578125">Example</th><th width="280.04296875">Purpose</th><th>Requires App Store / Play Store Resubmission?</th></tr></thead><tbody><tr><td>Major</td><td>1.0.0 → 2.0.0</td><td>Significant updates, breaking changes, or major new features</td><td>Yes</td></tr><tr><td>Minor</td><td>1.0.0 → 1.1.0</td><td>Smaller feature additions or improvements that maintain compatibility</td><td>Yes</td></tr><tr><td>Patch</td><td>1.0.0 → 1.0.1</td><td>Bug fixes, security updates, or minor tweaks</td><td>Yes</td></tr></tbody></table>

Key facts about builds:

* Necessary for first-time app submission and for major updates.
* Each build requires App Store & Play Store approval before going live.
* Users must download a new build from the store to receive updates.

### How OTA (Over-the-Air) updates work

OTA updates allow you to deliver changes to the latest live version of your app without submitting a new build to the app store. These updates function similarly to web app deployments—users will see the changes the next time they open the app.

To reiterate OTA updates only are sent to the latest built version, even if that built version is not in the app store.

Key facts about OTA updates:

* Instant update: Users on the latest version get the update without needing to download anything and without the developer needing to submit a new version of the app.
  * Note: OTA updates, don’t have version numbers.
* Great for bug fixes and content changes that don’t require new native functionality.
* Unlimited OTA updates can be applied to the latest build.
* No resubmission needed to the App Store or Google Play.

### Differences between OTA updates and Builds

| Feature                | OTA Updates                                                                                           | Builds                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Approval Needed        | Typically deploys within 5-10 minutes                                                                 | Yes (App Store / Play Store)                            |
| User Download Required | No                                                                                                    | Yes                                                     |
| Use Case               | Bug fixes, content tweaks, minor UI improvements                                                      | Major updates, new features, important security updates |
| Deprecation            | Not automatically discontinued when multiple live versions are supported; must be deprecated manually | Older builds remain unless removed                      |

### What is a Live version?

A live version refers to the version of your app that users are currently running on their devices. Each live version is tied to a specific build (what’s installed from the App Store, Play Store, or distributed via testing tools like TestFlight), and is connected to a version of your app’s backend (the server-side logic and data).

**Key things to know:**

* A live version is always tied to a specific build of your app.
* OTA updates apply only to the latest built version, even if it hasn’t been submitted to the app store.
  * Bubble checks if the user's app is on a supported live version on app load.
* Users on older builds will not receive OTA updates unless they update to the latest build.
* When a user installs the app for the first time, or updates to a new build that includes an OTA, the OTA is applied immediately. This can add a small amount of time to the initial load (usually around one second), but it ensures that the user’s first experience with that build is seamless and doesn’t show the update screen.
* If a user is already running a build and an OTA update becomes available, the update downloads in the background when the app is opened and is applied the next time the user re-opens the app. If the live build has been deprecated, the user will see the update screen, prompting them to apply the OTA on the next re-open.
* Bubble supports multiple live builds running simultaneously, which means users on older builds can continue using your app without breaking — but you’ll need to manually manage and deprecate older versions over time.

#### Managing version support & deprecation

Supporting multiple versions ensures a smooth user experience, as not all users update their apps immediately.

#### Why support multiple builds?

Supporting multiple builds ensures a smoother experience for your users — especially since not everyone updates their app right away. Bubble allows multiple live builds to run in parallel, giving you more flexibility and control over how and when users receive updates.

* Users don’t update immediately: some users may stay on older builds for weeks (or longer), so it’s important that those builds continue to work correctly.
* Testing before release: you may want to roll out and test a new build (via TestFlight or internal testing) before making it widely available in the App Store or Play Store.
* OTA updates are build-specific: OTA updates only apply to the latest built version. If a user is on an older build, they won’t receive the update—so keeping older builds functional is essential.
* Smoother user experience: requiring users to download a new version for every update can cause friction. Supporting multiple builds lets you avoid that for minor updates or bug fixes.\
  App store delays: since store reviews can take time, keeping older builds live ensures your app remains usable while newer builds wait for approval.

Deprecation tip: While Bubble supports multiple live builds, older versions are not deprecated automatically. You’ll need to manually deprecate any versions you no longer want users to access.

#### Bubble’s Live version limits

Bubble limits the number of concurrent live versions you can support, meaning you must manage updates carefully.

#### Best practices for deprecating old builds

* Encourage updates: Use in-app messaging or push notifications to inform users of new builds.
* Gradually phase out older versions rather than forcing instant updates.

By understanding builds, OTA updates, and live version management, you can maintain a smooth deployment process and keep your app updated efficiently.

Now that you have a better understanding around Mobile publishing and deployment, it’s time to learn how to publish step by step to iOS and Android.

## Operating system compatibility

Our current version of React Native will support:<br>

* iOS devices running version 15.1 and later
* Android devices running version 12 and later.

Devices running unsupported OS versions are not guaranteed to work as expected.

Please be aware that certain native features may only be supported by later OS versions as well. The oldest supported version will be noted per feature in the documentation.

As we stay up to date with the latest versions, these versions are bound to change.
