# Security checklist
> Source: https://manual.bubble.io/help-guides/security/security-checklist · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
Before reading this article, keep in mind that a checklist can’t cover all possible security scenarios or threats. Consider it a useful starting point but remember that your app is a unique project that may warrant additional security measures not covered here.

We recommend reading our in-depth guides, continuing to educate yourself on Bubble app security best practices and get in touch with our [Success team](https://bubble.io/contact) if you have any questions. Ensuring the security of your app is ultimately your responsibility, but we will do our best to provide you with the resources you need.
{% endhint %}

In this section we will cover many of the typical points that need to be checked and re-checked as your app goes through the first and continued deployments.

## Planning

* [ ] Plan the different parts of your security structure before you start building:
  * [ ] [Data types](#user-content-fn-1)[^1]
  * [ ] Pages[^2]
  * [ ] [User roles](#user-content-fn-3)[^3]

## Bubble account security

* [ ] Use a [strong password](#user-content-fn-4)[^4]
* [ ] Enable [two-factor authentication (2FA)](#user-content-fn-5)[^5]
* [ ] Create and maintain a password and 2FA policy for all collaborators[^6]

## App access security

* [ ] Don’t give collaborators more access than they need
* [ ] Remove collaborators that no longer need access
* [ ] Maintain a policy for access to the live database

## Database

* [ ] Add [privacy rules](#user-content-fn-7)[^7] to all private data types
* [ ] Use *Only when* conditions to protect data from unauthorized editing in workflows or use auto-binding in combination with privacy rules
* [ ] Be mindful of who has access if you copy your Live database to Development

## Page security

* [ ] Don’t store sensitive data in page elements[^8] and workflows[^9]
* [ ] Be mindful of other details that are visible in [Bubble’s Javascript files](#user-content-fn-10)[^10]
  * [ ] Name of pages
  * [ ] Name of data types and default values
  * [ ] Information stored in the [API Connector](#user-content-fn-11)
  * [ ] Names and attributes of [Option sets](#user-content-fn-12)
  * [ ] Names and strings saved in [application texts](#user-content-fn-13)
  * [ ] Use the [App optimizer](#user-content-fn-14) to remove deleted data from the code
* [ ] Don’t store sensitive data in [URL parameters](#user-content-fn-11)[^11]

## Plugins and custom headers

* [ ] Plugins and custom headers may affect security – make sure they come from a trusted source

[^1]: *Data types* are the different types of data that you store in the database. *User* is a built in type, but you can create as many custom types as you need.

    Article series: [The database](/help-guides/data/the-database)

[^2]: The *page* is the canvas on which you place [input elements](#user-content-fn-16)\[^16], text, images, icons, videos and everything else that your users need to make use of your application.\
    \
    Article: [The Page](/help-guides/design/elements/web-app/the-page)

[^3]: User roles is not actually a Bubble feature, but a way to think about how you separate different users from each other in terms of access level. For example, a user with an *admin* role can have broader access level than regular users.

[^4]: Passwords should be unique, long and complex. See the article below for advice on how to generate strong passwords.\
    \
    Article section: [Passwords](/help-guides/security/bubble-account-security#password)

[^5]: *2FA,* or *Two-Factor Authentication*, is a security measure requiring two forms of verification before granting access. In Bubble it requires both a password and a one-time code from a third-party code generator.

    Article: [Bubble account security](/help-guides/security/bubble-account-security)

[^6]: Every editor that you add to your app is known as a *collaborator.*

    [Article: Collaborators](/help-guides/maintaining-an-application/collaboration)

[^7]: *Privacy Rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users. They are applied server-side.\
    \
    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^8]: *Elements* are the building blocks that make up your application's user interface, such as input forms, buttons, icons and images.\
    \
    Article: [Elements](/help-guides/design/elements)

[^9]: *Workflows* are the engine of your application – they are how you instruct Bubble to respond to what the user does, such as clicking a button. They consist of a *trigger* and a set of *actions*.

    Article: [Workflows](/help-guides/logic/workflows)

[^10]: When a page is loaded, the browser downloads a connection of Javascript files. This is what makes your app work. From a security perspective, these files can reveal information about your app.\
    \
    Article: [Page security](/help-guides/security/page-security)

[^11]: A *URL parameter* is a piece of information that you place in the browser's URL. They follow a key-value-pair structure and can hold many different types of data.\
    \
    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)
