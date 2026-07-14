# Restoring database backups
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how you can copy the contents of your database, as well as restore it to a snapshot of what it looked like at a specific date and time

{% hint style="danger" %}
The actions described below can potentially rewrite all the contents of your database. Be careful when using these features, and double-check that your settings are correct before you go ahead. Copying and restoring large databases can take some time to finish.
{% endhint %}

## Restoring your database <a href="#restoring-your-database" id="restoring-your-database"></a>

### Point-in-time backups

Bubble uses a system called *point-in-time backup*, which means that for every change made to the database, a snapshot is saved. This snapshot can then be used later to restore the database to that exact point in time if something should go wrong. This is particularly useful for recovering data in the case of accidental deletion or changes.

Bubble backs up all your data types continuously, but you can choose to recover only specific data types.

{% hint style="info" %}
How far back in time you can recover your database depends on the Plan that you are on.
{% endhint %}

Restoring your data is done in the App Data section of the Data tab. First, navigate to the Data tab, and click the *Copy and restore database* link:

<figure><img src="/files/q6y9LXy6hGbvt2MVzrCS" alt=""><figcaption></figcaption></figure>

Bubble will open a popup that shows you the different options.

<figure><img src="/files/xuMZZ22tE7Gof0mbmNeq" alt=""><figcaption></figcaption></figure>

You first pick the version you want to restore (Development or Live), then a time and confirm. You can choose to restore all data types or only one.

{% hint style="warning" %}
Be cautious when you restore only one data type, as it can lead to data inconsistencies if some things are related. Sometimes it's better to still restore all to make sure that no relationships are lost.
{% endhint %}

You can set the time of the restoration down to the second, meaning that if you know the exact time that someting went wrong, you can restore it to just a few seconds before the incident Restore operations can take a few minutes to execute if your database is large.

You'll see a progress bar once you have started the process, and can close the popup and keep working on your app. It is safe to refresh the editor or close it once you have kicked off the process.
