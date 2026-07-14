# Publishing your app
> Source: https://manual.bubble.io/help-guides/publishing-your-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

**First of all, if you’ve reached the point where you’re ready to publish your app—congratulations! 🎉**<br>

Whether you generated your app using AI and refined it in the editor, or built it from scratch on your own, launching to a live audience is an exciting milestone. In this article, we’ll cover some key points to keep in mind as you prepare to welcome real users into your app.

## The Development and Live environments

Before publishing your app, it’s important to understand the difference between the Development and Live environments. You’re likely already familiar with the Development environment, where you can preview and test your app privately—away from public users.

However, to ensure a smooth launch, we recommend reviewing the checklist below to prepare for the key differences between your app’s test environment and what your users will experience in Live.

<details>

<summary>✅ <strong>Checklist:</strong> Preparing your app for live users</summary>

#### **Databases**

**Separate databases:**\
The Development and Live environments each have their own independent database. Any data you’ve created while testing—such as users, test records, or custom data types—will **not** automatically appear in the Live version. When you publish your app, the Live database will start empty unless you’ve manually added or copied data into it. Make sure to account for this if your app depends on preloaded data.

**Copying data:**\
If your Live app needs access to data you've created in Development, consider using the **Copy and restore database** feature to migrate specific data types from Development to Live.

**Erasing test data:**\
If you've previously added test data to your Live database (manually or through testing), review and delete any information that shouldn’t be visible to end users before launching.

***

#### **Security**

**Security matters in Live:**\
In Development, it's easy to overlook security because you're the only one using the app. But once you invite real users to interact with your app, you need to ensure their data is properly protected with privacy rules and secure workflows.

**Review the security guide:**\
The User Manual includes a [full article series on app security](/help-guides/security). We recommend reviewing it thoroughly before launch to ensure your app meets best practices.

**Set up privacy rules:**\
[Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules) are the foundation of your app’s data security. Make sure you’ve created clear, effective rules for all data types and fields that may contain sensitive or personal information.

**Run a security audit:**\
Use Bubble’s built-in [security audit tools](/help-guides/security/security-dashboard) to run an audit of your app. This tool can help uncover common misconfigurations.

**Update preview credentials:**\
Bubble includes [built-in password protection for the Development environment](/core-resources/application-settings/general#limit-access-to-this-app-with-a-username-and-password). Before launching, make sure your preview credentials use a secure, unique username and password that only you (or your team) can access.

**Set editor access rights:**\
You can choose whether your app editor is public or private. Before going l[ive, make sure your editor is set to private](/core-resources/application-settings/general#application-rights) so that only invited collaborators can view and edit the app.

**Remove unused collaborators:**\
If you've invited [collaborators](/help-guides/maintaining-an-application/collaboration) during development who no longer need access, review your app’s collaborator list and remove anyone who shouldn’t have ongoing editing permissions. This helps reduce risk and keeps your workspace organized.

***

#### **Design and responsiveness**

**Preview your app on different screen sizes:**\
Before going live, test your app on a variety of devices and screen sizes to make sure everything displays correctly. Use Bubble’s responsive engine to adjust layouts as needed.

**Check mobile usability:**\
If your app is intended for mobile users, make sure that buttons, text inputs, and other interactive elements are easy to use on smaller screens.

**Test edge cases and empty states:**\
Ensure your app handles empty or unusual data gracefully—for example, how does it behave when a repeating group has no results?

***

#### **Workflows and functionality**

**Review workflows for unexpected behavior:**\
Go through all critical workflows (e.g. sign-up, payments, navigation) to make sure they behave as expected and that there are no missing steps or conditions.

**Check conditions and navigation rules:**\
Test any conditionals that show/hide elements or navigate users to different pages. Make sure users see the right views based on their role, status, or data.

**Verify redirects and page protections:**\
Ensure users can't manually access pages they shouldn't. Use page redirects and conditional logic to prevent unauthorized access. Read more about page security [here](/help-guides/security/page-security).

***

#### **Performance and optimization**

**Remove unused elements and plugins:**\
Clean up elements, styles, workflows, and plugins you’re not using. This helps reduce app load time and clutter.

**Test load time and responsiveness:**\
Open your app on a fresh browser or device and see how quickly it loads. If performance is slow, look into optimizing data searches and page design.

**Limit heavy searches or nested elements:**\
Minimize searches inside repeating groups or conditions that run on every page load. These can impact performance, especially for users with slower connections.

***

#### **Legal and compliance**

**Set up a privacy policy and terms of service:**\
If you’re collecting user data, most regions require a clear privacy policy. Include links to these in your app’s footer or sign-up/login screens.

**Comply with data protection regulations:**\
Ensure your app meets basic requirements for handling personal data securely—especially if serving users in regions with strict regulations (e.g. GDPR, CCPA).

***

#### **Final checks**

**Use the issue checker:**\
Bubble’s issue checker will alert you to common setup problems before going live. Run it and resolve any outstanding issues.

**Test sign-up, login, and password reset flows:**\
Make sure these flows are not only working but also protected with security best practices like rate limiting and proper validations.

**Add test users and test all roles:**\
If your app has different user roles (admin, regular user, etc.), test each one to make sure the experience is correct and secure for all cases.

</details>

## Web and native mobile app publishing

Bubble supports building apps for the web, as well as native mobile apps that can be published to the iOS App Store and Google Play Store. All of this is managed from a single editor, with a shared database and unified workflow logic.

You can choose to build and publish your app for the web, iOS, Android—or any combination of the three. Each platform follows its own publishing process. Web apps are deployed directly from the Bubble editor, while publishing to iOS and Android involves additional steps handled through Apple and Google’s respective systems.

The guides below provide a step-by-step walkthrough for publishing your app on all supported platforms. Before proceeding, we recommend reviewing the [checklist above](#checklist-preparing-your-app-for-live-users) to ensure your app is fully prepared for live users.

<details>

<summary>💻 Publishing a web app</summary>

#### [Deploying your web app](/help-guides/publishing-your-app/deploying-your-app)

Publishing a web app is essentially done with the click of a button, and makes your app available to live users within seconds.

</details>

<details>

<summary>📱 Publishing a native mobile app</summary>

Publishing the native mobile version of your app involves a few additional steps compared to web deployment. You’ll first need to configure your app’s general mobile settings, and then follow the platform-specific publishing steps for iOS and Android.

***

#### [**Overview**](/help-guides/publishing-your-app/native-mobile-app)

This introductory article provides an overview of the process for publishing your app to the various app stores. We recommend starting here before moving on to the detailed step-by-step guides.

***

#### [**Global native mobile settings**](/help-guides/publishing-your-app/native-mobile-app/global-native-mobile-settings)

Start by reviewing and configuring the general mobile settings for your app. These apply to both iOS and Android and should be completed before moving on to platform-specific steps.

***

#### [**iOS App Store**](/help-guides/publishing-your-app/native-mobile-app/ios-app-store)

This guide walks you through the full process of publishing your app to [Apple’s App Store](https://www.apple.com/app-store/). It includes important steps related to Apple’s ecosystem—such as developer account setup, certificates, and App Store Connect—which may involve additional requirements and fees outside of Bubble’s control.

<figure><img src="/files/FNjccWi8wRRUQK0UYPOR" alt="" width="188"><figcaption></figcaption></figure>

***

#### [**Google Play Store**](/help-guides/publishing-your-app/native-mobile-app/google-play-store)

This guide covers the steps required to publish your app on the [Google Play Store](https://play.google.com/). Like iOS, the Android publishing process includes steps managed through Google's platform, some of which may also include external fees and configuration.

<figure><img src="/files/OGxwEELg2n5HGxKpvpCm" alt="" width="188"><figcaption></figcaption></figure>

***

#### [**FAQ**](/help-guides/publishing-your-app/native-mobile-app/publishing-faq)

We’ve compiled a set of frequently asked questions to help you navigate the mobile publishing process. If you run into issues or are unsure about a particular step, this resource is a great place to start.

</details>
