# Transitioning from the legacy version control
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/version-control/transitioning · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section includes tips for transitioning from the legacy to the new version control system

{% hint style="info" %}
The new version control system introduces new terminology. We have compiled a list of the terminology of the new system, as well as the terms that are no longer used:

Article: [Version control terminology](/help-guides/maintaining-an-application/version-control/terminology)
{% endhint %}

{% hint style="info" %}
The transition process described below is only relevant to existing apps with multiple development versions. If version-test is your only development version, your app will automatically be upgraded to the new version control system, and version-test will become the Main branch
{% endhint %}

The [legacy version control system](#user-content-fn-1)[^1] had a linear approach to managing application changes, allowing separate versions to be created and worked on in isolation. However, this method had its limitations, especially when it came to collaboration and managing the development of major new features.

The new branch-based system offers a more flexible, powerful, and collaborative approach to managing app development.

This article guide will give you an overview of how to transition from the old Bubble version control system to the new system. Throughout the guide, we will discuss key concepts, such as branches[^2], merging[^3], and managing conflicts[^4], and provide step-by-step instructions to help you get started with the new system.

## Upgrading to the new version control

If you have at least one custom version in the legacy version control system, you will be asked to opt-in to the new system.

{% hint style="warning" %}
**Note:** The upgrade to the new version control system is permanent and cannot be undone.
{% endhint %}

You will find the button to upgrade when you click the current version control menu bar link in the upper right corner of the Bubble editor:

<figure><img src="/files/1CXdFAU23WcB4KdepyCg" alt=""><figcaption></figcaption></figure>

## General advice

### Versions are now *branches*

A key aspect of the new version control system is that what used to be called *versions* are now called *branches*. This new terminology better describes how the system works, as we have moved away from the linear systems of separate versions into a parent-child based "tree" of branches that can be added and removed as needed.

This helps you work not only on new features, but it allows you to further separate development on those features into child branches that can later be merged upwards into the parent.

### No data or ongoing work will be deleted when you make the transition

Before we dive into the process of transitioning to the new branch-based system, it's important to clarify that the new system is compatible with any existing versions you have. In other words, you will not lose your versions when you choose to activate the new version control system.

It may still be useful to clean out your versions ahead of upgrading and to get to know our [recommended best practices](/help-guides/maintaining-an-application/version-control/best-practices). This helps you get a clean start and set up a structure that makes sense for your team.

## Transition scenarios

We’ll now cover two different scenarios that require slightly different steps to getting up and running smoothly.

### Scenario 1: Your app is on an Agency Plan, Professional Plan, Production Plan, or Dedicated Plan and your last deploy to Live was made from *version-test*

When you turn on new version control, you’ll notice the brand new UX and that version-test is now the Main branch.

* Any custom versions you created previously will show up below the Main branch.
* Any in-progress work remains undisturbed
* The new **Main branch** (formerly the *development version* or *version-test*) is the only branch that can be deployed[^5] to Live. The [hotfix branch](#user-content-fn-6)[^6] can also be deployed, but they are meant for quick bug only fixes in the Live environment and block other development work until the hotfix is deployed or deleted.

If your last deploy to Live was made in the **development version** (a.k.a. version-test), and no changes were made in development since that deploy, you should be able to proceed as usual as your Main branch is up to date with Live.

If your last deploy to Live was made in version-test, and there is in-progress work since the last deploy that you want to save, create a new branch off of Main.

This new branch will be a mirror image of the old development version. You can then reset your Main branch to match Live by using the “Reset to Live” feature in the *More actions* dropdown in the top right of the version control panel. This will ensure that Main is a carbon copy of the Live branch so that any future deploys will proceed smoothly. Then, when you are ready, you can merge any changes into Main and deploy those changes to Live.

### Scenario 2: Your app is on an Agency Plan, Professional Plan, Production Plan, or Dedicated Plan and Your last deploy to Live was made from a *custom version*

When you turn on new version control, you’ll notice the brand new UX and your development version will automatically turn into the Main branch. Any custom versions you created previously will show up as branches below the Main branch.

* Any in progress work remains undisturbed
* The **Main branch** is the only branch that can be deployed to Live. Hotfix branches can also be deployed, but they are meant for quick bug fixes in the Live environment and block other development work until the hotfix is deployed or deleted

If your last deploy was made in a **custom version**, there is a good chance that version-test does not have the same changes that Live has - which will be required to deploy anything to Live in the future. Since version-test is now Main, and Main is the only branch that can be deployed to Live, you’ll want to move some things around to adjust to this new flow.

* If there is any in-progress work in version-test (now Main) that you want to save, create a new branch off of Main. This new branch will be a mirror image of the old development version.
* Navigate to the Main branch and reset the Main branch to match Live by using the “Reset to Live” feature in the More actions dropdown in the top right of the version control panel. This will ensure that Main is a carbon copy of the Live branch so that any future deploys will proceed smoothly.
* For any work in a custom branch that is ready to be deployed, first sync that custom branch with Main (using the button in that branch’s version control panel) to make sure that branch is up to date with Main/Live and then merge that branch into Main. When the branch has been merged, you can deploy Main to Live.
* For any new work, create a custom branch off of Main and use that new branch for any development work. When you are ready to merge that work and deploy to live, sync that custom branch with Main (using the button in that branch’s version control panel) to make sure that branch is up to date with Main/Live and then merge that branch into Main. When the branch has been merged, you can deploy Main to Live.

{% hint style="info" %}
Good luck with the transition! To further get to know the new version control system, we recommend reading our introductory article and study the new terminology.

Article: [Version control](/help-guides/maintaining-an-application/version-control)

Article: [Version control terminology](/help-guides/maintaining-an-application/version-control/terminology) (direct link: [legacy terms that have been updated](/help-guides/maintaining-an-application/version-control/terminology#legacy-terminology-and-replacements))

Article: [Legacy version control documentation](broken://pages/-MTkIpqXJeh-_-WM8Vmc)
{% endhint %}

[^1]: The legacy version control system is an older system that has been replaced by the current one.\
    \
    Legacy documentation:\
    Article: [Version control](broken://pages/-MTkIpqXJeh-_-WM8Vmc)

    Reference: [Version control](broken://pages/-MUAadN-IznA2oAdL2UA)

[^2]: A branch is an independent iteration of your application that can be developed in isolation.

    You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article section: [Environments and branches](#environments-and-branches)

[^3]: To merge is the process of integrating changes from the source branch into the base branch.

    Article section: [Merging branches](/help-guides/maintaining-an-application/version-control#merging-branches)

    Reference: [Merging branches](/core-resources/bubbles-interface/version-control-deployment#merge-changes-from-another-branch)

[^4]: Conflicts arise during the merge process when the base branch and the source branch each changed the same thing (in different ways) since the last time the two branches were in sync.\
    \
    To resolve conflicts that arise during the merge process, you must select which change to favor.\
    \
    Article section: [Merging branches](/help-guides/maintaining-an-application/version-control#merging-branches)

    Reference: [Merging two branches](/core-resources/bubbles-interface/version-control-deployment#merge-changes-from-another-branch)

    Video lesson: [Resolving conflicts](https://youtu.be/ece8V74yltc)

[^5]: To deploy a branch is to push changes to Live. Only the Main branch and the hotfix branches can be deployed to Live.

[^6]: The hotfix branch is the only branch apart from Main that can be merged directly to Live. The purpose of this branch, as the name suggests, is to address urgent issues that can be fixed quickly.\
    \
    Article section: [The hotifx branch](/help-guides/maintaining-an-application/version-control#the-hotfix-branch)
