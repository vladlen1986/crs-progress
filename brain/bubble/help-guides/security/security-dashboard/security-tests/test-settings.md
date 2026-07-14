# Test settings
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/security-tests/test-settings · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
**Running your first test:** if you are accessing the security dashboard for a specific app for the first time, you may need to run an initial test before you have access to all settings.
{% endhint %}

The security dashboard allows you to specify which parts of your app you want to focus on. The settings are divided into three fundamental components in Bubble: branches[^1], pages[^2], and [data types](#user-content-fn-3)[^3].

## Accessing security dashboard test settings

To access the settings, click the gear icon in the upper right corner of the security dashboard.

<figure><img src="/files/duWgqkahG1lg5kaNmLvZ" alt="" width="279"><figcaption></figcaption></figure>

## Test settings

{% hint style="info" %}
Settings applied in the *Test settings* popup also apply to automated tests.
{% endhint %}

### Selected branches

If you work across multiple branches[^1], you can choose which branch or branches the tests should run on.

Running a security test on just one branch helps you focus on the version of your app that actually matters right now—typically the branch that’s about to be merged or released. It reduces noise from in-progress work on other branches, makes results easier to interpret, and saves time and resources by scanning only branch or branches that are relevant for your next deployment.

<figure><img src="/files/5W3FspXyklPBlBqIFg9x" alt="" width="563"><figcaption><p>In the example above, the security test will only run on the main branch, and not on Live.</p></figcaption></figure>

To add or remove a branch, simply check or uncheck the box next to its name.

### Selected pages and data types

You can also select which page(s) and data type(s) are included in the test. If a page or data type is intentionally public, or doesn’t handle sensitive data, you can exclude it from the scan. This keeps the results meaningful, reduces false positives, and helps you concentrate on the areas that truly require protection.

#### Pages

To decide whether a page should be included in a security check, it helps to think in terms of public and private pages. Public pages—like a home page, a password-reset page, or a 404 page—are meant to be accessible without logging in, so scanning them for restricted access isn’t usually necessary.

Private pages, such as dashboards or any area that requires a login, should not be accessible to anyone who isn’t authorized. These are the pages that benefit most from security testing.

<div align="center"><figure><img src="/files/bjHfetciwkqD5nNW8JpW" alt="" width="563"><figcaption><p>In this example, only the private pages will be checked. Bubble’s AI has determined that the index, reset_pw, and 404 pages don’t need to be included, but you can override this by checking additional boxes if needed.</p></figcaption></figure></div>

To keep scans efficient and reduce false positives, you can uncheck pages that are intentionally public.

#### Data types

To decide which data types to include in a security check, consider whether they store information that should remain private or restricted. Data types containing sensitive or user-specific information—such as profiles, orders, messages, or internal records—should be treated as private. These are the types that benefit most from permission checks and secure privacy rules.

Some data types, however, are meant to be publicly accessible. For example, items displayed on a public landing page—such as blog posts, product listings, or marketing content—may not require strict privacy rules if they’re intended for anyone to view.

To keep your scan focused and avoid unnecessary warnings, you can exclude data types that are intentionally public. This helps the test concentrate on the data that truly requires protection.

[^1]: A branch is a separate copy of your app’s development version that you can use to build, test, or experiment without affecting the main development workflow. It lets you work safely in parallel and merge changes back when you’re ready.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)

[^2]: To read more about page security, see our dedicated article on the subject below:\
    \
    Article: [Page security](/help-guides/security/page-security)

    Article: [The page element](/help-guides/design/elements/web-app/the-page)

[^3]: To read more about database security, see our dedicated article on the subject below:\
    \
    Article: [Database security](/help-guides/data/the-database/protecting-data-with-privacy-rules)\
    Article: [The database](/help-guides/data/the-database)
