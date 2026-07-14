# Creating and managing projects
> Source: https://manual.bubble.io/help-guides/getting-started/creating-and-managing-projects · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to create, manage and delete projects connected to your Bubble account

## Creating projects

To create a new projects, go to the [*Projects* section](https://bubble.io/home/projects) of your Bubble account and click the *Create new project* button in the upper right corner.

<figure><img src="/files/5rBphoWRI8GVwt9Q8Dny" alt=""><figcaption></figcaption></figure>

You will be asked to give your project a name and whether you want to create a project from a template.

{% hint style="info" %}
To build an project from a template, you first need to add one or more templates from the [Template marketplace](https://bubble.io/templates) to your account. You can then select a template from the Create project dropdown.
{% endhint %}

### Projects names

When you give your project a name (such as my-bubble-application), that name is reserved and a unique URL is generated. The name is held and used by Bubble for indexing purposes, which means:

* The **name cannot be changed** after it's set
* The **name cannot be reused** in another project by you or anyone else, even after the project is deleted

The project name is visible in your project's default URL, such as:

`https://my-bubble-application.bubbleapps.io`

Once you are on a [custom domain](#user-content-fn-1)[^1], the project name is no longer visible anywhere in your live project.

### What is created?

Everything needed to start building your project is automatically set up when you create a new project:

* Your project gets a **unique URL** based on the name you gave it
* The **default pages** are set up, such as index and 404 pages.
* **Two databases** (one for Development and one for Live)
* Any **template** you selected (if any) is automatically applied

### Onboarding

If you are new to Bubble or want a repeat of the basics, you may find our onboarding tools useful. The onboarding wizard is available whenever you create a new project.

## Managing projects

### Project plans

Each project is connected to a pricing plan of your choice, to ensure that you can work on multiple projects that are in different stages of its life cycle, growth and requirements. You can read more about the plans in our [Account and Billing](/account-and-marketplace/account-and-billing) section.

### Deleting a projects

If you no longer need a project, you can delete it completely from your account.

#### Implications of deleting a project

{% hint style="danger" %}
It's very important that you understand the implications of deleting a project before going through with it. Please read the section below carefully.
{% endhint %}

* Once a project is deleted, it cannot be recovered, even by the Bubble team.
* The project's name[^2] is locked even after it's deleted – don't delete an project in an attempt to free up the name (the project name is only visible to your users in your project's default URL).
* Ensure the app ID is entered exactly as it appears, including all lowercase letters and hyphens
* It is not possible to delete only the mobile portion of an app while retaining the web app.
* All details related to your project are deleted without exceptions (including the databases).

#### How do delete a project

To delete a project, first locate it in the [*Projects* section](https://bubble.io/home/projects) of your Bubble account. Make sure you are logged in first.

Click the relevant project to reveal the sidebar, and then click the menu icon to reveal the project options. Click *Delete project.*

<figure><img src="/files/0ua0dXUjK1RZcPhDc5xD" alt=""><figcaption></figcaption></figure>

After clicking the *Delete project* option you will be asked a security question to confirm the process. Deleting the projects can take up to a few minutes, depending on its complexity and the size of its database.

<figure><img src="/files/1IUJApcS0T5PMESA0ZM0" alt=""><figcaption></figcaption></figure>

#### Who can delete a project?

Only administrators can delete a project. If you cannot see the *Delete project* button, it means you don't have the sufficient access level to delete it.

### Duplicating a project

You can also make an exact copy of a a project. To duplicate a project, first locate it in the [Projects section](https://bubble.io/home/projects) of your Bubble account. Make sure you are logged in first.

Click the project to display the right-hand side menu, and then click the menu option to reveal the projects options:

<figure><img src="/files/Gt99FV5gjQveiJKJlvDo" alt=""><figcaption></figcaption></figure>

You will be asked to give the duplicate project a name, and whether to copy the content of the database as well.

{% hint style="danger" %}
Copying the database can have implications for the privacy of your project's users: keep in mind that both the Development and Live databases are copied, potentially including sensitive data.
{% endhint %}

{% hint style="warning" %}
If you decide not to copy the database, you will not be able to do so later without manually exporting and importing it. We recommend giving careful thought as to include it or not.
{% endhint %}

#### Who can duplicate a project?

Only administrators can duplicate a project. If you cannot see the *Duplicate project* option, it means you don't have the sufficient access level to delete it.

## Collaboration

If you are added to a project as a collaborator[^3], you will also see it in your list of projects. The same is true for anyone that you add as a collaborator to one of your projects.

You can read more about Collaboration in our [dedicated article](/help-guides/maintaining-an-application/collaboration).

## The agency plan

The agency plan is made for developers and teams that build projects for others, and grants broader access to collaboration across multiple projects.

See our article on [Building projects for others](/account-and-marketplace/account-and-billing/building-apps-for-others) for more information on the agency plan.

## Relevant articles

<details>

<summary>Canceling your Bubble plan</summary>

If you want to cancel your Bubble plan/subscription, follow the steps in the article below:

Article section: [Account and Billing](/account-and-marketplace/account-and-billing) | [Canceling your Bubble plan](/account-and-marketplace/account-and-billing/pricing-plans/plans-and-billing#canceling-a-plan)

</details>

[^1]: The *domain* is the address or URL through which internet users can access a website. It's a human-readable form of an IP address. It makes up the root URL for your Bubble app.\
    \
    For example, the Bubble website domain is <http://www.bubble.io.\\>
    \
    Article: [Custom domain and DNS](broken://pages/Sfb2EVgX6WfgYIibQCNa)

[^2]: You can read more about your app's name here:\
    \
    Article section: [App names](#app-names)

[^3]: A *collaborator* is any Bubble developer that you invite to your app using the Collaboration feature.

    Article: [Collaboration](/help-guides/maintaining-an-application/collaboration)
