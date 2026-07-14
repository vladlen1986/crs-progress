# Planning app security
> Source: https://manual.bubble.io/help-guides/security/planning-app-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section explores how you can work to establish a policy around privacy and security for your app

Every security and privacy measure that you choose to implement in your app starts with a decision, and these decisions are made from two different perspectives:

* **Required security** and privacy is the level of security and privacy that your app needs in order to stay compliant in the region(s) and sector(s) where your users come from. These are the legal requirements that govern how your app collects, stores, processes, and shares user data.<br>
* **Optional security and privacy** are all the measures you as an app owner take to further protect your users privacy. This is often based on:
  * Your user's expectations
  * Your communication and marketing (such as using privacy as a selling point)
  * Your own preferences and strategy

As part of your planning, you should have a general overview of how your app should be set up to work. This will not only make your development process smoother, as you know what data should be kept private and not, but also makes clear communication with your users easier, as you'll be thoroughly familiar with your app's policy.

#### User expectations

Your users will come to your app with a set of expectations that you should have in mind when you plan your app. For many applications, users will naturally expect their data to remain theirs - not visible to any other users, unless they choose to share it. They may also expect to be in control of privacy settings and be able to share some things but not all, and to set a default behavior.

For example, in a social media application, a user might expect that a draft to a public post is kept private and is not visible to anyone else before it is published. The same could be true for fitness trackers: a user may want the chance to share their latest workout with the world, but maybe not every workout.

By putting yourself in the shoes of the user before you structure your app, you can build the app on top of a foundation that respects their needs and puts them in control. You can also consider conducting user interviews to make sure that you are making decisions based on real-life preferences and concerns.

Furthermore, users expect transparency. This includes clarity about what data is being collected, why it's being collected, and how it's being used. Features such as a clear privacy policy, easily accessible user settings, and opt-in/out options for data collection practices can go a long way in meeting these expectations and building trust with your user base.

#### Communication and marketing

Secondly, privacy and security can be made part of your app's brand and communication. By letting your users know about your data collection and storage practices, you can consciously build trust and lower the threshold of signing up by giving a clear indication of your app's strategy and also being transparent about what the data is used for.

#### Your own preferences and strategy

How would you like your app to behave? What are your personal standards? Collecting and sharing user data isn't inherently a bad thing, but it warrants careful consideration before the development process begins. Are you aiming for strict user privacy, or do you plan to leverage it for various goals such as marketing, analytics, understanding user patterns, or revenue generation?

None of these are negative or unethical on their own, as long as you are transparent and responsible in its management. It's all about open communication with your users, letting them know what data you collect, how it's used, and why.

### Transparency and documentation

Managing user data is a responsibility, and shouldn't be taken lightly. Returning to our two perspectives from earlier, how you communicate your security and privacy policy is a mixture of legal requirements and communication strategy.

Some documents need to be in place for your app to comply with laws and regulations, but you can also choose to share more than what is required about how your app manages data.

### Frequently required documents

Many privacy and security legal frameworks across different industries and regions share a common requirement for documenting how your app handles data. In this section we'll highlight some of the common documents that need to be in place before your app accepts live users.

{% hint style="danger" %}
This list illustrates the types of documentation often required by numerous privacy and security frameworks. However, it is by no means comprehensive and should not be interpreted as legal advice.

You should always seek professional legal counsel to establish a compliance strategy tailored to your region and industry.
{% endhint %}

<table><thead><tr><th width="323">Document</th><th>Description</th></tr></thead><tbody><tr><td><strong>Privacy Policy</strong></td><td>A document that discloses how you collect, use, and manage personal data of users. Required by GDPR, CCPA, and many other laws worldwide.</td></tr><tr><td><strong>Terms of Service/Conditions</strong></td><td>The rules a user agrees to abide by in order to use your app. While not explicitly required for data protection regulations, it often details acceptable use, dispute resolution, and disclaimers for liability.</td></tr><tr><td><strong>Cookie Policy</strong></td><td>When you use cookies, especially for EU users, a Cookie Policy is needed to explain what cookies are in use, what data they track, and how users can control these cookies. Sometimes included within the Privacy Policy. You can read more about what kind of cookies Bubble uses by default in <a href="/pages/-MWazsRXSRguR2m8PH5O">this article</a>.</td></tr><tr><td><strong>Data Processing Agreement (DPA)</strong></td><td>If you use third-party vendors that process data on your behalf, GDPR requires a DPA between you and them. This agreement outlines the responsibilities and obligations of both parties with respect to data protection.</td></tr><tr><td><strong>Data Breach Notification Plan</strong></td><td>A plan to notify users (and relevant authorities) in the event of a data breach. This is a key requirement of GDPR, though it's not usually a public document.</td></tr><tr><td><strong>Children’s Privacy Policy</strong></td><td>If your web application targets children or processes children's data, regulations like COPPA in the US may require a specific policy.</td></tr></tbody></table>

## Planning your app's structure with security in mind

When discussing web app security, you'll often hear the term "privacy by design." In essence, this is a proactive approach to data protection, emphasizing the importance of building privacy and data protection measures into the development process from the very beginning.

It involves considering privacy concerns and risks throughout the entire product development phase and embedding security directly into the design and architecture of the system. The goal is to minimize privacy risks, protect user data, and ensure compliance with data protection regulations.

> Bubble is a fast platform to build on, but if you develop an app without taking security and privacy into account from the beginning, you can find yourself having to backtrack your work.

With the wide range of different apps being developed in Bubble, this guide will not attempt to describe a plan or best practice, but instead highlight the general points that are worth taking into consideration as you plan your app's security.

Some of these points may require that you get to know other sections of the Bubble manual before you start building – we recommend spending that time to know the basics of app security before you begin the development process.

### Determining your security needs

The first aspect to consider is the degree of security required for your app overall. While some apps may not need strict security measures, others require a strong emphasis on data protection and privacy.

What kind of app is yours? Will you only store public data in your database, or will you store data that needs to be kept securely private?

Remember to consider your users' expectations – even without explicitly stating that certain data is private, users will often assume that it is. Trying to put yourself in the shoes of your users and sometimes talking to potential users directly can help you work out a policy regarding privacy and security that matches their expectations.

### The principle of least privilege

The principle of least privilege is a fundamental security concept in software development, and it's no different when you're crafting apps in Bubble. The idea is straightforward: grant users only the access and rights they need to perform their tasks and nothing more. This principle applies to:

* App users
* API services (inbound[^1] and outbound[^2])
* Collaborators[^3]
* You and your team

In a bank, not every employee has the keys to the vault. A teller can access the cash drawer but doesn't have the authority to authorize large wire transfers. Conversely, the bank manager might have that authority but doesn't necessarily need access to every single safety deposit box.

Similarly, in a Bubble app, you'd want to ensure:

1. **Data Restrictions with privacy rules**: Ensure users can only view or modify data relevant to their role. If they're a regular user, they shouldn't be able to access admin-level data or configurations.
2. **Feature/page Access**: Tailor the user interface to display only the features and functionalities each user role requires. For example, a site moderator might see options to delete comments, while regular users don't. Logged-out users might not have access to specific pages.
3. **Workflow Permissions**: Ensure that only the necessary users can trigger specific workflows, especially ones that might change data.

This is an overarching principle that should guide your security planning.

> By following the principle of least privilege, you not only enhance security but also simplify user experience. It helps to prevent accidental changes and guards against potential misuse.

## What to plan for

The purpose of planning is to provide yourself with information that leads to better decisions. When you or your client has an idea for an app, it's usually on a conceptual level: in many cases it has the yin/yang relationship of **what** problem do I want to solve and **how** do I want to solve it. Together, the problem and solution make up the foundation of why the app was conceived in the first place.

Then, you sit down to build it.

These processes are very different, just like envisioning a great hotel is very different from drawing the architectural plans and breaking the first ground. Luckily, creating an app doesn't need the meticulous planning of constructing a building: Bubble's flexibility lets you experiment and generate ideas as you go along. The aim is to do the amount of planning needed to give your app a solid foundation, so as to save you work later.

Let's look at some different important points that are worth keeping in mind before you start to build:

### Database structure

The structure of your database is mainly set up to cater for the data types you need in your app: for example, if your app is managing Tasks and Projects, you will usually create these data types.

Though this practice is standard and expected, we recommend that you plan thoroughly for what kind of security is needed on these data types, as this may affect how you structure them in the database.

The purpose of these examples is not to encourage any kind of best practice or that the method outlined below is the only way to proceed: the point is to again emphasize the importance of planning. If you know exactly what your app is meant to behave, you can plan out your database structure to facilitate for the correct privacy rules and conditions.

Let's look at a few examples to illustrate:

**Task owner**

Let's say that you want to set up privacy rules that control the access to Tasks – only the user who created the Task should have access to view and make changes to it. An obvious way to solve this is to set up a privacy rule that uses the Created by field to control access to the task.

But what if you want to include a way to transfer ownership and assign tasks?

The Created by field is a non-editable built-in field that makes transfer of ownership difficult: in this scenario it makes sense to set up a separate field of type User (that could be called Owner) that you can later make changes to as needed.

**SaaS with multiple client organizations**

Let's say that you offered this project management tool to multiple client organizations that each have a group of team members working together: this could be a company with a list of employees for example.

In this case, each client must have their data completely siloed. What this means that is the data of one organization must never be visible to an employee that belongs to another organization (often called siloing).

What does this mean for your database? It means that all the data (users, tasks and projects in our example) need to include a field for that parent organization: in other words, Bubble needs to be able to check on each database thing which organization it belongs to, and restrict access if the organization of the project or task is not the same as the organization as the user who tries to access it.

**Full, partial or no sharing**

When you plan your database, another aspect worth planning for is how specific things will be shared. With any piece of data, you basically have three options:

* Sharing it with no-one
* Sharing it with selected groups or people
* Sharing it with everyone

The three points can of course overlap. Think of a document stored in a cloud service like Google Docs for example; they are normally shared with no-one, but Google offers flexible sharing where you can pick a select number of users, add one or more groups or set up a link that gives anyone with the URL access.

Sometimes, things are shared with different privileges, such as:

* Viewing, but not editing
* Viewing and commenting, but not editing
* Full editing rights
* Publish status

Some database things will also have a sort of lifecycle where its visibility is determined by where it is in that cycle

Let's look at some examples:

* A blog post or article could have a draft and published status that determines whether it can be viewed by other users than its author. It could also have a publish date that lets the author share it publicly after a specified date and time.
* An e-commerce product could similarly have a draft and publish status as well as a publish date. It could also have a status like sold out to hide it when it's no longer available.

### Pages

We recommend having a clear overview of what kind of content belongs on each Page in your app before you start building that page. The reason is simple: some pages are public, others are not, and by knowing in advance what category a page belongs to, it's easier to build it the right way from scratch.

You can read more about page security in general in our [article in Page Security](/help-guides/security/page-security).

### Saving data

#### Auto-binding

Auto-binding[^4] allows your users to instantly save changes to any input field where they have made changes, as soon as that field loses focus. This is not only a quick way to save changes, but it comes with the upside of being protected by [privacy rules](#user-content-fn-5)[^5] - by setting up the correct rules, a user will never be able to save changes to a thing or field to which they don't have access.

#### Workflows

The second alternative to saving data is to use workflows, often triggered by a user interaction such as a button click. Database changes made in workflows are not protected by privacy rules in the same way, and need server-side conditions to offer the same protection.

One method is not better than the other – they are purely a user interface decision where you should take into consideration what's right for your app. But by planning it in advance, you can decide whether to protect data by use of conditions in your workflows, or by using Privacy Rules.

### User roles

In many applications, you have different types of users, such as:

* Users being logged in or out
* Users with administrative privileges
* Users who create things and users who only read
* You and your team (sometimes called super admins)

There can be many more categories of course, depending on your app. User roles are often split into two parts:

* The role that the user has (such as admin, author and regular user)
* The permissions that come with that role (such as viewing specific things, making changes in the database, managing other users, etc)

Already we can see how important it is to understand the different roles in your app, as both your database and pages need to be designed around the permissions and restrictions on each role.

Here are some questions you can ask to help you set up that structure:

* What kind of roles does my app have? (remember to include the built-in role of being logged in or out)
* How do I separate the different user roles from each other? (for example, a user could have a yes/no field called admin or you could save different roles in an option set)
* What permissions and restrictions come with each role?
* How does that affect:
  * Privacy Rules
  * Database structure
  * Workflows
  * Conditions
  * Page access
* Do I and/or my team need a separate role and pages to manage the app and its data?

Depending on the nature of your app, this list can be irrelevant or not exhaustive enough, but it gives you an idea of what we mean by user roles: sometimes you need to restrict data by only allowing selected users access.

## Third-party security resources

{% hint style="warning" %}
Bubble is not responsible for the content, accuracy, or practices of third-party websites or services that are linked from our platform and website. We provide these links for your convenience. Always review the terms and conditions and privacy policies of any third-party websites or services that you visit.

Some third-party services we link to may be fee-based
{% endhint %}

### Tools

Bubble has a large and active community, and there are third-party tools in the ecosystem that can assess an app for known security weaknesses:

* [Flusk](https://www.flusk.eu/)[.eu](https://www.flusk.eu/)
* [Checkso Bubble security check by Tinkso](https://check.tinkso.com/)
* [ncScale](https://app.ncscale.io/registration)

### Books

* [The Ultimate Guide to Bubble Security](https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-security/) by Petter Amlie is a 300+ page book that covers planning, designing and developing secure Bubble applications, reviewed by Bubble's top engineers.
* [The 2023 Bubble Security Cheat Sheet](https://www.flusk.eu/bubble-security-cheat-sheet-2023-by-flusk) by Flusk is 80+ pages of concrete examples and in-depth Bubble reverse-engineering, reviewed by Bubble and improved with the help of 15+ recognized Bubble experts.

[^1]: *Inbound* API calls are requests sent **to** your app from an external app or service. They are communicating with the Bubble API to manage data in your database or execute workflows.\
    \
    Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)

[^2]: *Outbound* API calls are calls made **from** your Bubble app **to** an external app or service. They are made using the API Connector plugin.\
    \
    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)

[^3]: Every editor that you add to your app is known as a *collaborator*. They are connected to an app, and not to your account, meaning that if you have multiple Bubble projects, you can choose which one(s) to add one or more collaborators to.\
    \
    Article: [Collaborators](/help-guides/maintaining-an-application/collaboration)

[^4]: *Auto-binding* binds a specific input form (such as a text input element) to a specific field in the database, and automatically saves any changes made in the input to that field.\
    \
    Article section: [Auto-binding](/help-guides/data/the-database/creating-saving-and-deleting-data#auto-binding)

[^5]: Privacy Rules are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.\
    \
    Article: [Protecting data with Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
