# Privacy rules checker
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/security-tests/privacy-rules-checker · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
The privacy rules checker runs a thorough analysis of your entire database. Depending on the size of your database, the process can take a few minutes to complete
{% endhint %}

{% hint style="warning" %}
**Note: Privacy rules checks require data**\
To accurately check whether data is visible, the app must contain entries in the relevant data types. Make sure the data types you're testing include sample data so the visibility check can return meaningful results.
{% endhint %}

This dedicated test reviews all data types within an app (and version) to identify which fields are publicly accessible. It checks each data type for potential information leaks, highlighting any fields that are accessible without restrictions for your review. This allows you to inspect and adjust [privacy rules](#user-content-fn-1)[^1] as needed to secure the data.

[^1]: *Privacy Rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
