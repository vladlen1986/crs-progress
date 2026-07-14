# Terminology: Version control
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/version-control/terminology · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section contains terminology related to the version control system

{% hint style="info" %}
This page contains short descriptions of the version control terminology. For a more comprehensive guide on version control works or the core reference of all the available features, see the links below:

Article: [Version control](/help-guides/maintaining-an-application/version-control)

Reference: [Version control](/core-resources/bubbles-interface/version-control-deployment)
{% endhint %}

The terminology used by Bubble's version control system may not be immediately apparent or easy to grasp at first. This article contains a list of the different terms used and may be helpful as you get to know how the system works.

At the bottom of the page you will find [terminology that has changed](#legacy-terminology-and-replacements) from the legacy system.

## Terminology

<table><thead><tr><th width="251">Term</th><th>Definition</th></tr></thead><tbody><tr><td>base branch</td><td>The branch that you want to merge changes into</td></tr><tr><td>branch tree</td><td>The visualization that shows you where a branch came from and how it relates to other branches</td></tr><tr><td>child branch</td><td>A branch that has a parent branch; a child branch can also be a parent branch</td></tr><tr><td>conflict</td><td>Conflicts arise during the merge process when the base branch and the source branch each changed the same thing (in different ways) since the last time the two branches were in sync</td></tr><tr><td>conflict resolution</td><td>Conflict resolution is the process of resolving conflicts. The conflict resolution window organizes conflicts by page and gives you the option to resolve all conflicts in favor of one branch on a page-by-page basis.</td></tr><tr><td>custom branch</td><td>Apps on the <a href="https://bubble.io/pricing/compare">higher plans</a> can have one or more custom branches</td></tr><tr><td>deploy, deployment</td><td>To deploy a branch is to push changes to Live. Only the Main branch and the hotfix branches can be deployed to Live.</td></tr><tr><td>Development environment</td><td>The development environment contains Main, any custom branches, and hotfix branch</td></tr><tr><td>environment</td><td>Environments contain branches. There are two environments: live and development. The environment is defined by the database that it uses (i.e., the live environment uses the live database, while the development environment uses the development database).</td></tr><tr><td>hotfix branch</td><td>The hotfix branch is the only branch that can branch off of Live. Only one hotfix branch can exist at a time. While a hotfix branch exists, Main cannot be deployed to Live. Hotfix is available on <a href="https://bubble.io/pricing/compare">higher plans</a>.</td></tr><tr><td>in sync</td><td>When two branches are in sync, there are no conflicts that would be generated from merging the two branches</td></tr><tr><td>Live</td><td>Live is the version of your app that lives on the internet for users to interact with</td></tr><tr><td>Live environment</td><td>The live environment contains Live</td></tr><tr><td>Main branch</td><td>All apps have a Main branch. Main is the only branch that can be deployed to Live (aside from hotfix). Main sits at the very top of the branch tree hierarchy.</td></tr><tr><td>merge, merging</td><td>The process of integrating changes from the source branch into the base branch</td></tr><tr><td>parent branch</td><td>A branch that has child branches branching off of it; a parent branch can also be a child branch</td></tr><tr><td>resolve conflicts</td><td>To resolve conflicts that arise during the merge process, you must select which change to favor</td></tr><tr><td>restore</td><td>To restore is to return to a past version of a branch by using the savepoint feature or by entering a custom date/time</td></tr><tr><td>savepoint</td><td>Savepoints are automatically created in the base branch when you deploy to Live, start a merge, finish a merge, cancel a merge, or right before you restore your branch.<br>Custom savepoints are savepoints that you can manually create at any time.</td></tr><tr><td>savepoint retention window</td><td>An app’s savepoint retention window dictates how far back you can restore any one of your branches</td></tr><tr><td>source branch</td><td>Refers to the branch that is the source of changes that you want to merge into the base branch</td></tr><tr><td>sync</td><td>To sync two branches is to merge them for the purposes of bringing changes in Live or Main into the base branch</td></tr><tr><td>to branch, branching</td><td>To create a branch off of another branch</td></tr><tr><td>version control</td><td>The system for tracking and managing changes to your app.</td></tr></tbody></table>

## Legacy terminology and replacements

If you have been using Bubble for some time you may be familiar with the existing terminology that surrounded the previous version control. The following terms have been removed or replaced

| Term                                       | Definition          |
| ------------------------------------------ | ------------------- |
| Adding changes from one version to another | Now "merging"       |
| Development                                | Now "Main branch"   |
| live version                               | Now "Live"          |
| custom version                             | Now "custom branch" |
