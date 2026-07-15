# Building for...
> Source: https://manual.bubble.io/help-guides/getting-started/building-for · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A native mobile app and a web app are not fundamentally different. They both offer the user a visual interface built on top of a foundation of workflows and a database. The primary difference lies in how they are delivered to the user.

A web app runs within a browser, relying on HTML, CSS, and JavaScript, and is accessed via a URL. A native mobile app, on the other hand, runs directly on a mobile device's operating system, allowing for deeper integration with device-specific features such as cameras, push notifications, and biometric authentication.

If you come from a non-technical background, and especially if you have no experience developing apps for Android and iOS, the difference between a web app and a native mobile app might not be entirely clear.

Before diving into how to build native mobile apps, let’s first explore the key differences between these two types.

### Web applications

As we've explored, a web app is a set of code files made up of HTML, JavaScript, and CSS, which all modern web browsers can interpret, display, and interact with. In short, this means a web app operates within a web browser and cannot run independently of it.

There are many advantages to this approach. Although web browsers are developed by different companies and can have slight variations in behavior, they are all designed to maintain full compatibility with a standard set of programming languages like HTML, CSS, and JavaScript. This ensures that web apps created on platforms like Bubble can run consistently across a wide range of devices and operating systems, whether on a desktop, tablet, or smartphone.

Additionally, because web browsers are universally available and regularly updated to meet evolving standards, you don’t need to worry about platform-specific requirements. Your app can be accessed by anyone with a browser, without the need for users to download or install anything. This makes it easier to reach a broader audience while maintaining consistent functionality across various environments.

This approach also simplifies deployment and updates since changes to your app are immediately available to all users without requiring them to manually update anything on their end.

Bubble includes an advanced responsive editor that lets you design pages that automatically adjust to different devices and screen sizes. This ensures that your app’s pages look great and function smoothly whether viewed on a large desktop monitor or a small mobile screen. By adapting layouts and element sizes based on the user’s device, you can deliver a consistent, optimized experience across all platforms.

This approach makes a responsively designed Bubble app just as available on a mobile device as on a desktop computer, but from the perspective of a mobile device user, it comes with a few limitations that a native mobile app does not.

### Native mobile applications

Unlike web applications that run inside a browser, native mobile applications are specifically designed to run directly on a mobile device’s operating system, such as Android or iOS. This allows them to fully integrate with the [device’s hardware and software features, such as GPS, camera, and push notifications](#user-content-fn-1)[^1].

Native apps offer a few key advantages. They can be installed directly from the Apple App Store or Android Play Store without relying on a third-party service, and they don’t rely on a web browser to function. They can leverage platform-specific features and design standards, giving users an experience that feels more integrated with their device. For example, native mobile apps can take full advantage of gestures, system-level navigation, and native UI components that users are already familiar with.

The two methods of development are by no means mutually exclusive; in fact, many of today’s most popular web applications offer both a web version that users can access through any browser on any device, and a native mobile app specifically built to be downloaded in one or both app stores and leverage the features of a mobile device.

You can get started with mobile development using the resources below:

Article series: [Building for native iOS and Android](/help-guides/getting-started/building-for/native-ios-and-android)\
Article: [Mobile app quick start guide](/help-guides/getting-started/building-for/native-ios-and-android/mobile-app-quick-start-guide)

#### Cross-platform compatibility

Building and maintaining native apps traditionally requires building separate versions for each platform (iOS and Android), which can be time-consuming and costly. Bubble’s Native Mobile App Editor aims to bridge that gap, allowing you to build native apps using Bubble’s visual tools, while maintaining the ability to deploy your app to both major platforms.

## Learn more about building for web and native mobile

To learn more about the differences between the two, keep reading this article series:

{% content-ref url="/pages/qjpk9D8O5tZqZnOI1t6M" %}
[Web](/help-guides/getting-started/building-for/web)
{% endcontent-ref %}

{% content-ref url="/pages/EVWy0mSe4tjmyf8ejh8Y" %}
[Native iOS and Android](/help-guides/getting-started/building-for/native-ios-and-android)
{% endcontent-ref %}

### Web wrappers and PWAs

There are various third-party and custom code solutions that allow you to publish a Bubble app to one or both app stores. Many of these options, including plugins and services, enable access to on-device features like biometrics[^2], file storage, the camera[^3], and contacts[^4]. These solutions work by “wrapping” your web app in a native container, making it distributable through app stores while still relying on web technologies. Essentially, web wrappers function like a “full-screen browser,” masking the fact that the app is running on web technology in the background.

Progressive Web Apps (PWAs) are another alternative that lets users add your app to their home screen, but PWAs have more limited access to native device features compared to fully native apps.

Both of these solutions have been around for years and currently power many successful Bubble apps in the app stores. However, they come with certain limitations. While they can offer access to native features and provide a way to distribute your app on iOS and Android, they may not fully match the performance, seamless user experience, or deeper device integration that a fully native app can provide. They also rely on third-party solutions (services and/or plugins) and/or custom code to work.

[^1]: These features are known as on-device resources. Read more in the core reference section below:\
    \
    Reference: [On-device resources](/core-resources/on-device-resources)

[^2]: In this context, *biometrics* refers to allowing users to log in using their device's biometric methods, such as fingerprint or face recognition.

[^3]: The *camera* in this scenario means access to the on-device camera of a phone or tablet.

[^4]: *Contacts* in this scenario means to have access to the contact list (or phone book) stored on the device.
