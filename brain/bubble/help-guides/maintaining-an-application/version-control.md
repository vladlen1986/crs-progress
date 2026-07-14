# Version control
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/version-control · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the version control system.

## Introduction

{% hint style="info" %}
The version control system introduces some new terminology. You may find our dedicated article on version control terminology useful while you are reading this article.

Article: [Version control terminology](/help-guides/maintaining-an-application/version-control/terminology)

If you are used to our legacy version control system, we also recommend reading our transitioning guide:\
Article: [Transitioning from the legacy version control](/help-guides/maintaining-an-application/version-control/transitioning)
{% endhint %}

{% hint style="info" %}
This is the long-form article on how Bubble's version control system works. For the short-form technical reference that lists all of version control's features, see this link:

Reference: [Version control](/core-resources/bubbles-interface/version-control-deployment)
{% endhint %}

<details>

<summary>Other ways to learn: Video (10)</summary>

We are also covering this subject with short-form video lessons.

[YouTube playlist](https://www.youtube.com/playlist?list=PLoNVJrdvQQYlCsgQJKsprzr0RCqSMPbxK)

1. [What is version control?](https://youtu.be/xuKtlZMfXnQ)
2. [Interface overview](https://youtu.be/tCNRhPs-UTc)
3. [Creating savepoints](https://youtu.be/NBqEOGeDszM)
4. [Deploying to live](https://youtu.be/mXHF2ott4r0)
5. [Creating custom branches](https://youtu.be/rH4a2VqyN_I)
6. [Merging custom branches](https://youtu.be/OqWnJhQBYh8)
7. [Resolving conflicts](https://youtu.be/ece8V74yltc)
8. [Syncing custom branches](https://youtu.be/WlQF4SLIRaU)
9. [Deleting custom branches](https://youtu.be/crz2iVyhBug)
10. [Using the hotfix branch](https://youtu.be/CweWwQjnATY)

**Join our Youtube community**

For more video lessons, check out our [Youtube channel](https://www.youtube.com/@BubbleIO).

</details>

<details>

<summary>Other ways to learn: Interactive tutorial (1)</summary>

Interactive tutorial: [Version control](https://app.arcade.software/share/zDJdMuKlIDPWveUqbXQf)

</details>

{% embed url="<https://www.youtube.com/watch?v=xuKtlZMfXnQ>" %}

By default, your application consists of two separate environments: Development and Live. They exist in parallel so that you can keep developing the application without the live app changing. When changes in the Development environment are completed, you can push them to Live by deploying[^1].

<figure><img src="/files/tGNzRkFyvKH1zexv36WR" alt=""><figcaption><p>Bubble automatically generates two environments in your app – one for Development and one for Live.</p></figcaption></figure>

The two environments are completely separate with two independent databases. The Live branch[^2] is read-only[^3], while the Development branches are all editable. After you deploy your app and have active users, the Development environment allows you to build and test new features, maintain your app, and test it without disturbing your users.

As your app starts to scale, it's important to keep track of all the changes and updates you make from there on. Perhaps you need to work on several bigger updates at once, such as two or more major new features being developed by separate teams.

Bubble's version control system lets you divide the development of your project into independent parts, so that you and other editors with access to the project can iterate on one part of the app without impacting other parts. This helps you simultaneously progress multiple streams of work and stay on top of the changes made as each goes from development to testing to deployment.

{% hint style="info" %}
Basic version control features are available on any Bubble app subscribed to a paid plan, with the full suite of capabilities unlocked on the higher-tier plans.

See and compare the different Bubble plans [here](https://bubble.io/pricing/compare) and the version control feature set [here](#branches).
{% endhint %}

## Environments and branches

### Environments

All deployed Bubble application consist of two different environments:

The **Development environment** allows you to develop and preview your app exactly as it will look when deployed. When testing changes in a branch in the Development environment, the Development database will get populated with test data, which you can view by going to the Data tab and toggling to the Development database.

The **Live environment** contains your live app, which is read-only. When users interact with your live app, the Live database will get populated with live data, which you can view by going to the Data tab and toggling to the Live database by clicking Switch to Live database.

<figure><img src="/files/6Q4HMeD370DB1JyugfLu" alt=""><figcaption><p>The Development and Live environments have separate databases.</p></figcaption></figure>

These two environments give you a safe and predictable way to continue development on your app, knowing that your live users will not notice any changes to the app or their data unless you specifically deploy those changes to Live.

### Branches

A branch is an independent iteration of your application that can be developed in isolation.

You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.

In each of the two environments (Development and Live), a new branch is automatically set up:

* The Live branch is the read-only, public branch of your app. It is part of the Live environment along with the Live database.
* The Main branch is where your app is developed and tested before being deployed. The Main branch exists in the Development environment.

This is the Basic version control setup, which is often sufficient for projects with a solo developer or smaller updates. It gives you full control over what your end-users experience.

<figure><img src="/files/7e65IAqFvfzdOo6Xcqyr" alt=""><figcaption></figcaption></figure>

Premium version control evolves the relationship between your two primary branches Main and Live. With Premium, you’ll unlock a variety of advanced branching capabilities that can empower you and your team with new ways to tackle and organize your project.

For example, with Premium comes the ability to create [custom branches](#user-content-fn-4)[^4] off of Main, to merge or sync branches as needed, and to create a special hotfix[^5] branch off of Live.

See the table below for more info on which app plans offer Basic vs. Premium version control.

<figure><img src="/files/kOfn1RgjOBt3kyDEIFn6" alt=""><figcaption></figcaption></figure>

### What's the difference between an environment and a branch?

To make the terminology clear, let's list the main differences:

#### Environments

* There are only ever two environments: Development and Live
* Environments have separate databases
* You cannot create or delete environments

#### Branches

* Branches exist in an environment
* There can only ever be one Live branch, but there can be multiple Development branches
* The Live branch has a database to itself, while all branches in the Development environment share one database
  * On higher-tier plans you also have a hotfix branch that branches off Live but uses the development database

## Accessing the version control system

{% embed url="<https://www.youtube.com/watch?v=tCNRhPs-UTc>" %}

You can open the version control panel by clicking on the branch icon near the top right, which shows the name of the current branch:

<figure><img src="/files/7HsnelwvITeYIWk5aRQY" alt=""><figcaption></figcaption></figure>

## Custom branches

With Basic version control, the Main branch is the only Development branch, so it is the only one you can make changes to; you build and test changes in the Main branch before deploying those changes to Live.

On higher-tier plans, you have access to Premium version control, which allows you to create custom branches to work on specific parts of the app in isolation. The total number of custom branches available depends on your app plan.

With the ability to create custom branches, we should think about Main differently. Before, Main was the only branch in which you could make changes, so you would edit and deploy all from the same branch. Now that you have the ability to create custom branches for your work, Main should be preserved solely for deployment.

In general, preserving your upper-most branch for deployment is best practice for keeping your project organized. For any new change or feature you wish to explore, you can create custom branches for each effort. The deeper down this hierarchy of custom branches you go, the more focused your building and testing becomes. And as you conclude your testing, you merge your changes back up the hierarchy until all the changes you want are integrated in Main and ready for deployment.

Think of the Main branch’s new role as a launching pad. By the time the rocket reaches this point, it should just be ready to fly.

### Branch name and unique ID

When you create a new branch, the name you provide will be used as a label in the version control dashboard. Bubble also generates a unique ID for the branch.

Note that:

* The name and unique ID of the branch are independent of each other and may not match
* The unique ID is permanent and will not be re-used even if you delete a branch
* The unique ID is visible in the URL when you preview your app after “version-\[ID] and in the URL of the Bubble editor after “version=\[ID]”
  * If you want to reference a specific branch by its URL, use the branch ID

### Creating a custom branch

Branches are organized in a tree-like structure, where branches form parent-child relationships. The first custom branch you create will clone the Main branch and become its child.

<figure><img src="/files/qmaGkb64InM0ust73ysU" alt=""><figcaption><p>In the example above the <em>new-feature</em> branch is a child of the Main branch.</p></figcaption></figure>

You can then continue to develop that child branch and see the two versions become different as they evolve in different directions.

Branches can stem off of other branches, creating parent-child relationships as many layers deep as you need. This gives a high degree of control over the development of your app as you can isolate every part of a project as you see fit.

## Merging branches

{% embed url="<https://www.youtube.com/watch?v=OqWnJhQBYh8>" %}

Merging branches allows you to add the changes you’ve made from one branch of your app to another. You can merge the changes from a child branch into a parent branch, from a parent branch into a child branch or from one sibling branch to another. Regardless of where you are in your hierarchy, merging takes changes created in one branch (the source branch) and integrates them into the other branch (the base branch).

It’s a powerful feature that ultimately saves you the hassle of copying and pasting every little change from one branch into another. And Bubble provides an intuitive step-by-step flow that walks you through the entire merge process.

Let’s look at an example where we merge the changes from a child to a parent branch:

### Step 1: Select branches

Before starting a merge, navigate to your base branch. Then, when you start a merge, the first step of the merge flow is to select the source branch that contains the changes you want to integrate. Bubble will create an automatic savepoint in the base branch before and after the merge is performed.

### Step 2: Review changes

The next step after you have selected which branches to merge is to preview and confirm the non-conflict-generating changes that will be made. Bubble will list these changes grouped by page:

<figure><img src="/files/YrVuCM8hap9nQxiiONnx" alt=""><figcaption></figcaption></figure>

In our example, we are merging changes from a branch called *pricing-change*, and Bubble notifies us that a change has been made.

Clicking on the change will take you directly to the parameter that has changed (except if the relevant element or workflow has been deleted):

<figure><img src="/files/urtEKhvSnRRY3sRVa7KA" alt=""><figcaption><p>By clicking on the change, Bubble takes you directly to the place where the change happened.</p></figcaption></figure>

This way you can review any non-conflict-generating changes between the two branches to stay on top of what your team has done, and confirm these changes before moving on to conflict resolution.

### Step 3: Resolve conflicts

Sometimes, a change is made to an element or workflow in one branch, and the same element or workflow is changed differently in another branch. Let's say we have set up a child branch of *pricing-page* called *button-design,* and we're experimenting with different button styles.

1\. In the base branch (button-design), the button has the color #0018CC (blue)

2\. In the source branch (pricing-page), the button has the color #229A44 (green)

If we want to merge branch 1 and branch 2, it would seem we have a conflict: which color should the button have?

Bubble recognizes conflicts like these and presents them to you in a list grouped by page . The left-hand column shows the base branch, and the right-hand column shows the source branch.

Each row has a checkbox that allows you to review what the change looks like in each branch.

In the animation below, you can see that by checking the boxes in each branch, you can review the conflicting changes.

<figure><img src="/files/q6dl5wyshHaLaTVQheA9" alt=""><figcaption><p>Reviewing conflicting changes in each version is easy and you can select which change you prefer to keep.</p></figcaption></figure>

If you check the box next to the branch itself you can automatically toggle all conflicts on that page to one branch. If you want to approve changes one-by-one you can use the checkboxes on each row. Each page in the list is collapsable.

After this, the merge is ready to be finalized. Click the *Confirm X choice and merge* button.

You will be asked a final time to confirm that you want to go ahead with the merge before Bubble initiates it. The merge can easily be undone using the cancel and exit merge button.

## Syncing from the Live and Main branch

If you have multiple teams working in different branches of your app, there can be instances where the Live branch is updated while some of the branches in the Development environment are still in development. This will also be the case when you deploy a hotfix branch to Live.

<figure><img src="/files/DcKbTjA7xC5KxzRA0Ulv" alt=""><figcaption></figcaption></figure>

In those cases it's best practice to merge the changes from the Live branch to the branch you are working in, to make sure that it's consistent with the live app. In the example above you'll see that Bubble gives you a warning that the current branch is out of sync with Live, and you can click the Sync button to update the branch you are currently working on.

## The hotfix branch

{% embed url="<https://www.youtube.com/watch?v=CweWwQjnATY>" %}

The hotfix branch is the *only* branch apart from Main that can be deployed directly to Live. The purpose of this branch, as the name suggests, is to address urgent issues that can be fixed quickly.

For example, let's you discover that the Submit button on an important customer contact form is not working and you need to fix it immediately, you can set up a hotfix branch, make the necessary change and deploy to live immediately.

This is useful since Main can sometimes contain changes that you're not ready to publish yet.

The hotfix branch has the following properties:

* You can only ever have **one** hotfix branch, and it only exists when you create one
* The hotfix branch is connected to the **development database**
* You can access other branches while a hotfix branch exists, but you cannot deploy from the Main branch
* When you merge from the hotfix branch to the Live branch, the hotfix branch is deleted

### Creating a hotfix branch

To create a hotfix branch, followe the instructions below:

<figure><img src="/files/M88uMfjD23AofmPPBoCh" alt=""><figcaption></figcaption></figure>

1. 1\. First, navigate to the Live environment

   2\. Click *Create a hotfix*

### Deploying the hotfix

Once you’ve made the necessary changes to your app, you'll be ready to deploy the hotfix branch to Live. To initiate this process, click on the 'Deploy to Live' button.<br>

<figure><img src="/files/qOpstWP0Drge7uGJ0aDi" alt=""><figcaption><p>The hotfix branch is displayed as a child to the Live branch.</p></figcaption></figure>

It's important to note that deploying a hotfix branch will cause any Development branches to become out of sync with Live. To ensure that everything is up to date, we recommend syncing any development branches with Live after the hotfix branch has been successfully deployed.

## Deleting branches

When branches are no longer needed, they can be deleted. This includes the hotfix branch if you want to remove it without deploying the changes to Live. We recommend that branches are short-lived and contain a minimal number of changes. Branches should be created, merged, and deleted with regular frequency

To delete it, follow the steps below:

1\. Activate the branch you want to delete

2\. Click the dropdown menu next to the branch name

3\. Click delete and confirm

## Savepoints

In any branch, you can create savepoints that create a snapshot of that branch at that specific point in time. A savepoint is created automatically when you:

* deploy to Live
* start a merge
* finish a merge
* cancel a merge
* import a branch over another
* right before you restore your branch

You can also create as many custom savepoints as you need in case you need to roll back changes you made in a specific branch.

<br>

<figure><img src="/files/vjJmiYbAglw23i8Vchhv" alt=""><figcaption></figcaption></figure>

To create a savepoint, open up the branch where you want to save it, click the History tab and then Create a savepoint. It’s also accessible in the top right corner menu of the branch panel. You will be asked to add a description to it, and we recommend providing some information about why it was created.

### Reset branch to Live

You can also reset a branch to Live. This will replace everything in the branch with a clone of the Live branch. This is useful if you need to start over on a branch but you have made changes to Main that you’re not ready to create a new branch from.

### Restore branch

A branch can be restored to a savepoint at any time if you need to revert your work. Savepoints are created automatically at given points, but you can also create as many manual savepoints as needed and restore the branch to that state. To restore a branch:

* Go to the History tab in the version control panel
* Check the radio box with the savepoint you want to restore
* Click Restore to this savepoint

{% hint style="info" %}
While the version control system takes care of all of the underlying mechanics of creating and managing different branches of your app, the structure in which you plan and carry this out is up to you as the app owner.

While you are free to set it up as you please, we have compiled a document which recommends best practices, especially for bigger teams:

Article: [Version control best practices](/help-guides/maintaining-an-application/version-control/best-practices)
{% endhint %}

## Changelog

The changelog feature provides a detailed, time-ordered view of all changes made within a branch of your app. It's designed to address common challenges in managing changes, debugging issues, and collaborating effectively. By offering a centralized history of modifications, the changelog streamlines workflows and supports a structured development process.

### Overview of the changelog

With the changelog, you can view every change made in your app during its retention window, including information about:

* **Who** made the change.
* **When** it happened.
* **What** changed.

Changes are categorized for clarity, covering aspects such as workflows, visual elements, and settings. This allows teams to easily track progress, resolve issues, and understand the impact of changes before merging or deploying.

### Accessing the changelog

To access the changelog, open up the Version Control panel by clicking on the currently open branch in the menu bar. Then, in the Version Control panel, click the *Changelog* tab.

<figure><img src="/files/3XnF8nFqYXJQKW7Ewv25" alt="" width="563"><figcaption><p>The changelog is available in its own tab in the Version Control panel.</p></figcaption></figure>

### Navigating and filtering changes

To make it easier to navigate complex projects, the Changelog includes smart filtering options. These allow you to narrow down changes by category, specific items, collaborators, or even the date and time a modification was made.

#### Filtering by change category

To filter by change category, click the funnel symbol in the changelog tab. A list of the different categories will be displayed.

<figure><img src="/files/E9olmDR5gDM4QY2HyLH2" alt="" width="375"><figcaption><p>To filter changes by category, click the funnel icon in the Changelog tab.</p></figcaption></figure>

After choosing a category, you can apply additional filters. For example, if you choose the *Workflow* category, you can filter by pages. If you choose the *Plugin* category, you can choose which plugin.

<figure><img src="/files/DKrWi6xdcFtyqTvPhcHO" alt="" width="375"><figcaption><p>By picking a category, you can further filter changes into relevant sub-categories. In this example, we can filter changes by a specific plugin</p></figcaption></figure>

In some cases, you can filter by a third option.

<figure><img src="/files/veN5UUedmy4wu6EC8X4V" alt="" width="375"><figcaption><p>In the example above, the <em>Workflow</em> category is selected, enabling additional filtering to pinpoint the specific <em>page</em> where the change occurred and identify the <em>workflow</em> that was modified.</p></figcaption></figure>

#### Filtering by date/time

You can also filter changes by date/time to see what happened within a specific timeframe.

<figure><img src="/files/rXOGlaBfalYs0QE82OQn" alt="" width="375"><figcaption><p>Click the calendar icon to filter the changelog by start and end time.</p></figcaption></figure>

#### Filtering by collaborator

Lastly, if you have collaborators in your app, you can filter the changes by who made it. Click the *Collaborators* dropdown to access the list of users with access to your app.

<figure><img src="/files/91up4LM2JjHGlpdNvRsr" alt="" width="375"><figcaption></figcaption></figure>

Additionally, you can hover over entries to view thumbnail previews of changes made in the editor canvas, giving you visual insight into your app's evolution. Clicking on any changelog entry takes you directly to the changed item in the app editor.

### Integration with savepoints

Savepoints, whether custom or system-generated, are fully integrated into the Changelog, giving you a chronological record of changes.

## Changelog retention window

The retention window (how far back you can investigate changes) depends on the plan your app is on.

<table><thead><tr><th width="200.7265625">Plan</th><th width="153.42578125">Retention window</th><th>Learn more</th></tr></thead><tbody><tr><td>Growth</td><td>14 days</td><td><a href="https://bubble.io/pricing">Plan details</a></td></tr><tr><td>Team</td><td>20 days</td><td><a href="https://bubble.io/pricing">Plan details</a></td></tr><tr><td>Enterprise (standard)</td><td>30 days</td><td><a href="/pages/djgPGL4Ddhqxhz1OORFE">Bubble for Enterprise</a></td></tr><tr><td>Enterprise (dedicated)</td><td>1 year</td><td><a href="/pages/djgPGL4Ddhqxhz1OORFE">Bubble for Enterprise</a> | <a href="/pages/ytKrUcUewMmbhY8pXqC3">Dedicated Instance</a></td></tr><tr><td>Agency</td><td>20 days</td><td><a href="/pages/-MUA_71JtNZxvnO_UTiR">Agency Plan</a></td></tr></tbody></table>

## More ways to learn

<details>

<summary>Version control video lessons</summary>

We also have a list of video lessons that take you through version control. You can also visit and subscribe to our [Youtube channel](https://www.youtube.com/bubbleio) for more lessons:

Video lessons: [Version contro](#other-ways-to-learn-video-10)l

</details>

<details>

<summary>Version control core reference</summary>

For the short-form technical reference that lists all of version control's features, see this link:

Reference: [Version control](/core-resources/bubbles-interface/version-control-deployment)

</details>

<details>

<summary>Legacy documentation</summary>

For the documentation on the legacy version control system, check out the resources below:

Article: [Version Control Manual](broken://pages/-MTkIpqXJeh-_-WM8Vmc) (legacy)\
Reference: [Version control ](broken://pages/-MUAadN-IznA2oAdL2UA)(legacy)

</details>

[^1]: To deploy a branch is to push changes to Live. Only the Main branch and the hotfix branches can be deployed to Live.

[^2]: A branch is an independent iteration of your application that can be developed in isolation.

    You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article section: [Environments and branches](#environments-and-branches)

[^3]: Read-only in this context means that you cannot make changes to the Live branches directly.\
    \
    The changes need to be made in one of the Development branches, and then *deployed* to Live.

[^4]: *Custom branches* are branches created under the Main branch. They are considered the *children* of the Main branch. A custom branch can also host its own child branches, allowing it to function as both a parent and child branch simultaneously.\
    \
    Article section: [Custom branches](#custom-branches)

    Reference: [Creating branches](/core-resources/bubbles-interface/version-control-deployment#create-a-new-branch)

[^5]: The hotfix branch is a special kind of branch that can branch off of Live. Only one hotfix branch can exist at a time. While a hotfix branch exists, Main cannot be deployed to Live.\
    \
    Article section: [The hotfix branch](#the-hotfix-branch)\
    Reference: [Creating a hotfix branch](/core-resources/bubbles-interface/version-control-deployment#create-a-hotfix)
