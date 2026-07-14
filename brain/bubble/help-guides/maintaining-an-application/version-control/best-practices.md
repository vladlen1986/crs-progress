# Best practices: Version control
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/version-control/best-practices · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers best practices for using the version control feature with one or more teams

## Use the Main branch as a launching pad

Your Main branch[^1] is the only branch you can deploy[^2] to Live (except for the [hotfix branch](#user-content-fn-3)[^3]) and you should keep this in mind as you organize Main's child branches.

What this means is that changes and experimentation should always be completed in full in a child branch and then merged up through the hierarchy until it reaches the Main branch.

At that point it should be safe to delete the child branches and there should be no development work done in the Main branch. This means that the Main branch should always be the "polished" last branch of your app that's ready to be deployed.

## Merge changes from parent to child first

Whenever you want to merge[^4] changes from a child branch to a parent branch, we recommend that you first merge changes from the parent branch into the child branch. This is because it's lower risk to test that everything works well in the child branch before you then merge the changes up the hierarchy into the parent branch. The same holds true when you are merging a custom branch into the Main branch. Use the Sync with Main shortcut to add all changes from Main into the custom branch first.

In other words:

1. First merge the changes from the parent to the child
2. Do the necessary testing in the child branch
3. Then merge the changes from the child to the parent

## Keep the branch tree clean and organized

{% embed url="<https://www.youtube.com/watch?v=crz2iVyhBug>" %}

Whenever a branch has served its purpose (the development is done and the changes have been merged up the hierarchy) you should delete[^5] the branch to keep your branch tree updated. Keeping around unnecessary branches makes the tree disorganized and it's easy to lose sight of why the branch was created in the first place, whether it has been merged upward already and whether it's safe to delete.

You can always create a new branch as needed, so there's no need to keep around the old ones.

[^1]: A branch is an independent iteration of your application that can be developed in isolation.

    You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article section: [Environments and branches](#environments-and-branches)

[^2]: To deploy a branch is to push changes to Live. Only the Main branch and the hotfix branches can be deployed to Live.

[^3]: The hotfix branch is the only branch apart from Main that can be merged directly to Live. The purpose of this branch, as the name suggests, is to address urgent issues that can be fixed quickly.\
    \
    Article section: [The hotifx branch](/help-guides/maintaining-an-application/version-control#the-hotfix-branch)

[^4]: To merge is the process of integrating changes from the source branch into the base branch.

    Article section: [Merging branches](/help-guides/maintaining-an-application/version-control#merging-branches)

    Reference: [Merging branches](/core-resources/bubbles-interface/version-control-deployment#merge-changes-from-another-branch)

[^5]: Deleting a branch will remove it from the branch tree. You can only delete custom branches and the hotfix branch.\
    \
    The Main branch cannot be deleted.
