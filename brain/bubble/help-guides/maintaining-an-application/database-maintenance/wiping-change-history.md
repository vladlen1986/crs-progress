# Wiping change history
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/wiping-change-history · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="danger" %}
**NOTE:** Wiping your change history is permanent and cannot be undone. This action deletes all database backups, and you will no longer be able to restore your database to any prior state. By proceeding, you acknowledge that you understand the consequences and accept responsibility for this action.
{% endhint %}

Bubble allows you to clear your database change history. This article will delve into the implications of this action and weigh its advantages and drawbacks.

## What does it mean to wipe the change history

The databases (Development and Live) in your app are both continually backed up for every change that you make (often called real-time backup). This allows you to revert the database to any specific moment in the past, right down to the exact second. The length in time you can go back depends on the plan you are on.

The change history represents the records from these backups. By erasing this history, you forfeit the option to restore your database to any previous state. Once wiped, the real-time backups resume, setting your earliest possible restore point to the moment immediately after the wipe.

## Why would you want to wipe the change history?

In the majority of cases, there is no reason to erase these backups. They are there to make sure that in the case that you have any reason to revert your database to a previous state, you can do so quickly and without having to export or import any data.

With that said, there are a few scenarios where you may consider this option:

* If you have data that you are completely comfortable erasing; for example, you may have test data in one or both of your databases that you want to erase forever
* Clearing the change history might slightly improve your database's performance due to reduced data. However, this potential minor speed boost must be balanced against the significant downside of losing your backup history. Though there might be a marginal benefit for extensive databases, we typically advise against erasing the change history solely for performance gains.
* If your app is on the Enterprise plan, clearing database history can save storage space
* If you wish to permanently remove data, purging the database history is essential to ensure the data cannot be restored by rolling back to a previous state.

## How to wipe the database change history

To wipe the database change history, follow these steps:

1. Go to [*Data*](#user-content-fn-1)[^1] *- App data* in the Bubble editor
2. **Make sure** you have the correct database (development/live) selected using the *Switch to live database/Switch to development database* in the upper right corner of the *App data* section.
3. Click *Copy and restore database*
4. In the bottom part of the popup, follow the on-screen instructions and click *Confirm*
5. Wiping the change history can take a few minutes, depending on the size of your database

## FAQ: Wiping the database change history

#### Will wiping change history affect both databases?

Wiping your database change history will affect the database you are currently viewing in the *App data* section. See the [instructions above](#how-to-wipe-the-database-change-history) for how to switch between the two.

#### I accidentally wiped the change history – is there any way to get it back?

No, this action is permanent and cannot be undone. Before proceeding, confirm that you have the correct database selected and that you understand the consequences.

#### Does wiping the change history disable the continuous backups?

No. Continuous backups resume immediately after the wipe.You will be able to restore to any point after the wipe, but not before.

#### Can I select what data to purge? I.e. only erase data of a specific data type?

No, wiping the database change history will affect all data types in that database.

[^1]: The *Data tab* is where you view and manage your app's database, files and option sets.

    Reference: [The data tab](/core-resources/bubbles-interface/data-tab)
