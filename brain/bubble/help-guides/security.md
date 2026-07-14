# Security
> Source: https://manual.bubble.io/help-guides/security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Introduction to security

In this section, we'll dive into the topic of ensuring your app's safety and protecting your users' data. When it comes to security, Bubble's primary goal is to provide a solid foundation that follows industry best practices. Bubble as a platform doesn't reinvent the wheel; instead, we rely on proven methodologies to deliver tools that let you set up applications with security that's comparable to the world's major software providers.

As we discuss Bubble's security measures, it's important to remember that our platform's flexibility can be a double-edged sword. Bubble empowers you with the tools and options to create versatile applications; however, this also means that you bear the responsibility of using these tools correctly to guarantee a secure environment.

> Your app's security is ultimately in your hands, and it's crucial to understand and implement best practices while building your app to protect your users and their data.

Throughout this chapter, we'll explore the various aspects of Bubble's security and provide insights into how you can make the most of our platform's features to create a safe and secure application.

## Our shared security responsibility

Bubble operates within a "Platform-as-a-Service" (PaaS) architecture, where we serve as a facilitator for developing, deploying, and hosting web applications. We maintain a close collaboration with Amazon Web Services (AWS).

This structure means that there is a shared security responsibility between Bubble, AWS, and you as a user of the Bubble platform.

* **Bubble** commits to providing and maintaining the tools that our users need to keep their data and processes safe. This includes Bubble account security, data encryption at rest and in transit, user authentication, rigorous application-level safeguards, consistent service uptime, pen testing, logging, backups, and DDoS protection. Bubble is compliant with the SOC 2 Type II standard for security, and we have implemented measures designed to meet the standards of applicable data privacy laws, including the General Data Protection Regulation in the EU and the UK.
* **Amazon AWS** oversees aspects such as the physical infrastructure, hardware, network, and the integrity of the server environment.
* **Bubble** users are responsible for understanding and following our [terms](https://bubble.io/terms#!) and [acceptable use policy](https://bubble.io/acceptable-use-policy), maintaining secure account access, supplying precise and up-to-date information to Bubble, understanding and using Bubble’s settings and tools correctly, and reporting security issues to Bubble in a timely manner.

## What security means

When discussing app security, it's common to focus on malicious intent, such as hacking. However, when planning your security measures, it's essential to recognize that hackers represent just one aspect of potential security risks. There are several other equally important factors to consider:

#### **Database leaks**

Database leaks in this context means inadvertently leaking data to users who shouldn't have access to it. This is handled by setting proper [privacy rules](#user-content-fn-1)[^1] on all private data types.

#### Revealing data in the app code

Although Bubble is a no-code platform, the final app consists of HTML, CSS, JSON and Javascript that Bubble generates for you. Since these files are downloaded to the user's device, a tech-savvy user can look at them. If you have inadvertently placed sensitive data such as API keys in certain parts of your app, the user may be able to extract them.

We have a closer look at this potential vulnerability in our article on [Page security](/help-guides/security/page-security).

#### Unauthorized account access

Another potential vulnerability includes users gaining access to other users’ accounts. When planning your app to avoid this issue, you should make sure you have a secure sign-up and login process. You can also consider enforcing a password policy and two-factor authentication.

#### Improper app security settings

Bubble offers multiple settings on an *app level*, such as encrypting data in transit[^2] by use of [HTTPS (TLS)](#user-content-fn-3)[^3], protecting your [Development environment](#user-content-fn-4)[^4] with a username and password and controlling the access level of collaborators[^5].

We strongly recommend reviewing these settings thoroughly.

We explore this subject in more detail in our articles on [App security](/help-guides/security/app-security) and [Securing your Bubble account](/help-guides/security/bubble-account-security).

#### API calls

API calls can also open up for potential vulnerabilities if set up incorrectly. We go over this in detail in our article on [API security](/help-guides/security/api-security).

## Continue reading

<details>

<summary>Overview of Bubble's security features</summary>

This section gives an overview of the different security features that Bubble offers, along with links to learn more about each one.

Article: [Bubble's security features](/help-guides/security/bubbles-security-features)

</details>

<details>

<summary>Planning app security</summary>

This section looks at the importance of planning and what that means for privacy and security. We look at both how to think about your app's policy as a whole and what that means in terms of planning your database structure, user roles and pages.

Article: [Planning app security](/help-guides/security/planning-app-security)

</details>

<details>

<summary>Client-side and server-side</summary>

Bubble apps work as a result of ongoing communication between the user's device and Bubble's server. Understanding the difference between the two is an important part of your app's security.

Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

</details>

<details>

<summary>Bubble account security</summary>

Unauthorized access to your Bubble account is one of the biggest security breaches you can encounter, as it gives full access to both the app and data of all apps linked to your account. Consequently, Bubble offers powerful tools to secure it.

Article: [Bubble account security](/help-guides/security/bubble-account-security)

</details>

<details>

<summary>App security</summary>

This section covers the general security settings in your app.

Article: [App security](/help-guides/security/app-security)

</details>

<details>

<summary>Page security</summary>

This section covers the security on each of your pages and how to think about the data that is sent from the server to your user's device.

Article: [Page security](/help-guides/security/page-security)

</details>

<details>

<summary>Securing the database with Privacy Rules</summary>

Privacy Rules govern on the server which users have access to what data. Privacy Rules are needed to keep the data in your database safe and avoid accidental leaks.

Article: [Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules) (links to the [Data](/help-guides/data) section)

</details>

<details>

<summary>API security</summary>

Bubble offers a lot of flexibility to connect your app to other apps and systems through API calls. This section covers how to ensure both incoming and outbound connections are kept secure.

Article: [API security](/help-guides/security/api-security)

</details>

<details>

<summary>Bubble cookies</summary>

Bubble users cookies for authentication purposes and enable key functionality of the Bubble platform.

Article: [Bubble cookies](/help-guides/data/user-accounts/cookies-set-by-bubble) (links to the [Data](/help-guides/data) section)

</details>

[^1]: *Privacy Rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting data with Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^2]: *In transit* means that the data is being transferred or transmitted between two points, such as between the user's device and the Bubble server.\
    \
    During this process, the data is moving over the internet, making it potentially vulnerable to interception or tampering by malicious actors.

    As long as HTTPS is enabled, the traffic is safely encrypted.

[^3]: *HTTPS (Hypertext Transfer Protocol Secure)* is a secure version of HTTP.\
    \
    It adds an layer of encryption using TLS to the data exhanged between the client (your user's device) and the Bubble server.

    This ensures that the data can't be intercepted or tampered with by attackers when it's in transit.

    Article section: [What is HTTPS?](/help-guides/security/app-security#what-is-https)

[^4]: Your application consists of two separate environments: Development and Live.

    They exist in parallel so that you can keep developing the application without the live app changing. When changes in the Development environment are completed, you can push them to Live by deploying\[^6].\
    \
    Article: [Version control](/help-guides/maintaining-an-application/version-control)

[^5]: *Collaborators* are Bubble users that you invite into your application to edit the app or work with its data.\
    \
    Article: [Collaborators](/help-guides/maintaining-an-application/collaboration)
