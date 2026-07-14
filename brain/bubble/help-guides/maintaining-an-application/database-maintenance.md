# Database maintenance
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers copying, restoring and running bulk operations on the database

{% hint style="info" %}
This section covers different ways in which you can maintain your database to keep it running efficiently. If you want to learn more about the database in general and how it works, you can check out our dedicated article series below.

Article series: [The database](/help-guides/data/the-database)
{% endhint %}

The database is the filing cabinet of your application, where all data is archived for storage. Just like a regular archive, it makes sense to keep it clean and up-to-date.

This is a good idea for a few reasons:

* **Performance:** The more unnecessary data you keep around, the bigger your database becomes. This means more data for Bubble to search through and overall can affect your performance
* **Privacy:** Removing unneeded data is good from a privacy perspective
* **Data integrity:** As you scale and grow your app, a clean database can help you with decision making, since you can confidently make decisions based on reliable data

This article series goes over a few different concepts that helps you maintain your database properly.

<details>

<summary>Copying the database</summary>

Copying the database means to clone the content of the development database into the live database or vice versa. This is a simple, automated operation in Bubble.

Article: Copying the database

</details>

<details>

<summary>Restoring database backups</summary>

Bubble keeps automated [point-in-time backups](#user-content-fn-1)[^1] that can be restored back to that state with a simple operation.

Article: [Restoring database backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

</details>

<details>

<summary>Running bulk operations</summary>

Bulk operations means to run a workflow on multiple things in your database in sequence. This helps you perform tasks that would be tedious to do manually, such as deleting and making changes to things.

Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations)

</details>

<details>

<summary>Related articles</summary>

* Article series: [The database](/help-guides/data/the-database)
* Article series: [Hosting and scaling](/help-guides/optimizing-an-application/hosting-and-scaling)

</details>

[^1]: *Point-in-time backup* means that for every change made to the database, a snapshot is saved.

    This snapshot can then be used later to restore the database to that exact point in time if something should go wrong.

    This is particularly useful for recovering data in the case of accidental deletion or changes.
