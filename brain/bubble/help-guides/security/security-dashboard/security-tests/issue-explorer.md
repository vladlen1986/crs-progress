# Issue explorer
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/security-tests/issue-explorer · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
The Issues Explorer scans for various types of issues. Refer to the article below to see which security checks are included with each plan.

Article: [Security dashboard plan features](/help-guides/security/security-dashboard/security-dashboard-plan-features)
{% endhint %}

The Issues Explorer is the security dashboard's generated security report, displaying potential vulnerabilities in a detailed, line-by-line format. The report is organized in a table format with the following columns:

* **Type:** This column categorizes the type of vulnerability each row addresses, helping you quickly identify the nature of the issue.
* **Item:** This column specifies the exact part of your app to which the vulnerability applies, such as a particular data type or an app setting.
* **Severity:** This shows the security dashboard’s assessment of the vulnerability’s importance, rating each as low, medium, or high. This rating helps prioritize which vulnerabilities may require the most immediate attention.
* **Affected branches:** This shows the app branch(es) to which the issue applies.
* **Assigned:** This optional setting lets you designate a specific team member to investigate and address the issue.

### Filtering issues

At the top of the issue explorer, you’ll find different filters to help you narrow down specific issues that you’d want to focus on.

The following filters can be applied:

* **Location:** This lets you specify where in your app a category of issues occurs. For example, you can choose to show only issues related to APIs or the Database.
* **Branch:** This lets you filter issues by a specific branch
* **Assigned:** This lets you show only issues assigned to a specific user.
* **Filters:** This lets you assign more complex filters, such as whether or not an issue is resolved, its type, or its severity.

{% hint style="warning" %}
Note that changing the filters on this top row doesn’t change or resolve any issues, but only filters which are displayed in the list.
{% endhint %}

### Revealing issue details

Clicking on each row of the issues explorer reveals more information about that specific issue. This provides the following additional information:

**Actions**:

* **Ignore for 2 days:** this lets you exclude the issue from the current scan and scans within the next two days.
* **Ignore for 7 days:** this lets you exclude the issue from the current scan and scans within the next week.
* **Ignore forever:** this lets you exclude the issue from all future scans.
* **Issue description**: The issue description gives you a more in-depth explanation of what exactly the issue is about, and can point you towards a recommended fix See also [Issue details](/help-guides/security/security-dashboard/security-tests/issue-details).
* **History**: The history tab gives you a timeframe of when the issue was first revealed, what actions have been taken on it, and when it’s been resolved or reappeared.

## Test settings

### Privacy ratings

You can rate the privacy level of pages and data types to help the security dashboard identify which parts of your app—both pages and database content—should be treated as sensitive.

* Article: [Test settings](/help-guides/security/security-dashboard/security-tests/test-settings#pages)
* Article: [Test settings](/help-guides/security/security-dashboard/security-tests/test-settings#data-types)

### Configure versions

The Configure Versions setting controls which branches are included in security tests. By default, only the Live and Main branches are tested. To include other branches, make sure to update this setting.

Article: [Configure versions](#configure-versions)

## Issues

The Security Dashboard highlights a variety of issues related to your app’s security. For a detailed explanation of each issue—including what it means, what triggers it, and how to resolve it—refer to the [Issue details article](/help-guides/security/security-dashboard/security-tests/issue-details). To learn which security checks are available with each Bubble plan, see the [Security Dashboard Plan Features article](/help-guides/security/security-dashboard/security-dashboard-plan-features).
