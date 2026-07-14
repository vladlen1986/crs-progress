# Deployment and version control
> Source: https://manual.bubble.io/core-resources/bubbles-interface/version-control-deployment · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **intermediate-to-advanced-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (2)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Deploying your app

This article covers the process of deploying your app to live users.

* Article: [Deploying your app](/help-guides/publishing-your-app/deploying-your-app)

#### Version control

Version control a tool that allows you to set up multiple isolated development environments. This enables individuals or teams to concurrently work on various features or fixes, ensuring that each person's work remains undisturbed by others. It's an effective way to manage multiple tasks simultaneously in a collaborative setting.

Article series: [Version control](/help-guides/maintaining-an-application/version-control)
{% endtab %}

{% tab title="Videos (11)" %}

#### Video lessons on deployment

Video tutorial: [Deploying to Live](https://www.youtube.com/watch?v=mXHF2ott4r0)

#### Video lessons on version control:

Video tutorial: [Introducing New Version Control](https://www.youtube.com/watch?v=07DkhNbPi6I)\
Video tutorial: [What is Version Control?](https://www.youtube.com/watch?v=xuKtlZMfXnQ\&t=10s)\
Video tutorial: [Interface Overview](https://www.youtube.com/watch?v=tCNRhPs-UTc)\
Video tutorial: [Using Version Control | Bubble Tutorials](https://www.youtube.com/watch?v=xuKtlZMfXnQ\&list=PLoNVJrdvQQYlCsgQJKsprzr0RCqSMPbxK\&pp=iAQB)\
Video tutorial: [Creating Custom Branches](https://www.youtube.com/watch?v=rH4a2VqyN_I)\
Video tutorial: [Resolving Conflicts](https://www.youtube.com/watch?v=ece8V74yltc\&t=5s)\
Video tutorial: [Creating Savepoints](https://www.youtube.com/watch?v=NBqEOGeDszM\&t=52s)\
Video tutorial: [Syncing Custom Branches](https://www.youtube.com/watch?v=WlQF4SLIRaU)\
Video tutorial: [Deleting Custom Branches](https://www.youtube.com/watch?v=crz2iVyhBug)\
Video tutorial: [Using the Hotfix Branch](https://www.youtube.com/watch?v=CweWwQjnATY\&t=1s)<br>
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This is the short-form technical reference entry describing version control. If you are looking for more in-depth and long-form content on how it works, you may be interested in reading the [version control manual](/help-guides/maintaining-an-application/version-control).
{% endhint %}

{% hint style="info" %}
If you are transitioning to the new version control in an app that currently has at least one custom branch, we recommend reading our [version control transition guide](/help-guides/maintaining-an-application/version-control/transitioning).
{% endhint %}

Version control provides distinct Development and Live environments that exist in parallel, enabling continuous application development without affecting the live application. This system also facilitates the creation of customized branches to segregate projects and divide them into more manageable components.

## Selecting environments

To select an environment, click on the Live option or choose one of the available branches listed under the Development section in the branch tree.

## Live environment

### Live branch

The live branch is your live site on the web. It cannot be edited directly.

### Create a hotfix

This will create a hotfix[^2] branch to make urgent updates to your application. The hotfix branch is connected to the Development database. While a hotfix branch exists, deployment[^3] from Main will be blocked. You'll be prompted for a confirmation before the branch is created..

### Hotfix branch

#### Create savepoint <a href="#create-savepoint-hotfix" id="create-savepoint-hotfix"></a>

Create Savepoint lets you capture a snapshot of the current state of the hotfix branch. You can include a description to identify the save point later.

#### Deploy to Live <a href="#deploy-to-live-hotfix" id="deploy-to-live-hotfix"></a>

This will deploy the changes you have in hotfix to Live. You'll be prompted for a confirmation before the process starts where you can provide a description for the deployment. Once it has been deployed, the hotfix branch will be deleted and a savepoint will be created automatically with the description you provided.

#### Reset to Live <a href="#reset-to-live-hotfix" id="reset-to-live-hotfix"></a>

Click to reset the hotfix branch to match Live. You will retain savepoints and can restore to a savepoint or custom date/time at any time after resetting to undo it. You will be prompted for a confirmation before the process starts.

#### Delete

This will delete the hotfix branch. You will be prompted for a written confirmation before the branch is deleted.

## Development environment

### The Main branch

The Main branch is where your app is developed and tested before being deployed.

### Load a branch

To load a branch, click it in the branch tree.

### Create a new branch

Any branch that you created under the Main branch is known as a custom branch. Select the branch that you want to be the parent of the new branch and click the Create a new branch button. You will be prompted for a name and description. The new branch will be created as a child branch to the currently selected branch.

Next to the create button you will see a count of the remaining custom branch spots you have available in your current plan.

If you have created the maximum number of branches available in your plan, the Create new branch button will instead say Upgrade to add more branches.

### Edit description

This option in the more options dropdown lets you edit the description of the currently selected branch.

### Deploy to Live

This will deploy the changes you have in the Main branch to Live. You'll be prompted for a confirmation before the process starts where you can provide a description for the deployment. A savepoint will be created automatically with the description you provided.

### Sync with Main

This lets you merge[^4] changes from Main into the currently selected branch. You will be prompted for a confirmation before the process starts. Clicking Continue will refresh the page and you will be able to review non-conflicting changes and resolve conflicts before confirming the merge.

Click Cancel merge in the bottom right corner of the screen to cancel the process at any point.

### Sync with Live

This lets you merge changes from Live into the currently selected branch. You will be prompted for a confirmation before the process starts. Clicking Continue will refresh the page and you will be able to review non-conflicting changes and resolve conflicts before confirming the merge.

Click Cancel merge in the bottom right corner of the screen to cancel the process at any point.

### Reset to Live

Click to reset the currently selected branch to match Live. You will retain savepoints and can restore to a savepoint or custom date/time at any time after resetting to undo it. You will be prompted for a confirmation before the process starts.

### Delete <a href="#delete" id="delete"></a>

This will delete the currently selected branch. You will be prompted for a written confirmation before the branch is deleted. This option is not available on the Main branch.

### Merge changes from another branch

This will merge[^4] the changes from another branch into the currently selected branch. The process is split into four steps. Clicking Merge changes from another branch will open the merge dashboard where the available branches in your app are listed. Selecting a branch and Clicking Continue will refresh the page and you will be able to review non-conflicting changes and resolve conflicts before confirming the merge.<br>

Click Cancel merge in the bottom right corner of the screen to cancel the process at any point.<br>

## Savepoints

### Create savepoint

Create Savepoint lets you capture a snapshot of the current state of the current active branch. You can include a description to identify the save point later.

### Restore savepoint

If you've saved one or more savepoints, you can pick one from the list and click "Restore to this Savepoint" to begin the process. You'll be prompted for a final confirmation before the process starts, and the page will refresh automatically once the restoration is finished. A new savepoint will automatically be created.

### Restore to custom date and time

To restore the branch to its state at a specific date and time, click Custom date and time and provide a date and time. Then click "Restore to this custom date and time" to begin the process. You'll be prompted for a final confirmation before the process starts, and the page will refresh automatically once the restoration is finished. A new savepoint will automatically be created.

## Warning messages

### Your branch is out of sync with Live

This warning will be displayed when Live contains changes that the currently selected branch does not have. Click Sync or choose Sync with live from the more options to [sync with Live](#sync-with-live).<br>

## Other ways to learn

<details>

<summary>User manual articles and video lessons</summary>

In the version control manual you'll find more in-depth articles explaining how version control works:

Article: [Version control](/help-guides/maintaining-an-application/version-control)

We also have a list of video lessons that take you through version control. You can also visit and subscribe to our [Youtube channel](https://www.youtube.com/bubbleio) for more lessons:

Video lessons: [Version control](/help-guides/maintaining-an-application/version-control#other-ways-to-learn-video-10)

</details>

<details>

<summary>Legacy documentation</summary>

For the documentation on the legacy version control system, check out the resources below:

Article: [Version Control Manual](broken://pages/-MTkIpqXJeh-_-WM8Vmc) (legacy)\
Reference: [Version control ](broken://pages/-MUAadN-IznA2oAdL2UA)(legacy)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: The hotfix branch is the only branch apart from Main that can be merged directly to Live. The purpose of this branch, as the name suggests, is to address urgent issues that can be fixed quickly.\
    \
    Article section: [The hotfix branch](/help-guides/maintaining-an-application/version-control#the-hotfix-branch)

[^3]: To deploy a branch is to push changes to Live. Only the Main branch and the hotfix branches can be deployed to Live.

[^4]: To *merge* is the process of adding changes from a source branch into the base branch.

    Article section: [Merging branches](/help-guides/maintaining-an-application/version-control#merging-branches)
