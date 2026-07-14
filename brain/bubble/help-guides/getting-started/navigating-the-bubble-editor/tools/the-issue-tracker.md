# The Issue Checker
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tools/the-issue-tracker · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Issue Checker helps identify and resolve problems in your application. When you're building your app, Bubble automatically checks for inconsistencies and errors, and lists the results in the Issue Checker tool.

## Accessing the issue checker

The search tool is a part of Bubble's toolbar and is accessed by clicking the issue counter. Note that if there are no issues, the counter will not be visible.

<figure><img src="/files/mEYSYmZ5bT8bnazNW89A" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

## How the issue checker works

The Issue Checker can flag a variety of issues, from missing data sources to invalid actions in workflows. For example, if you set up text element with a dynamic expression, and that expression is not returning a text value, the Issue Checker would flag this as an issue.

<figure><img src="/files/2dqwWrRcWD3rTeWudtac" alt=""><figcaption></figcaption></figure>

The Issue Checker dynamically monitors your app for potential errors or problems. As you make modifications, it automatically updates to highlight any new issues or clear out those that have been resolved. This real-time feedback ensures that you can address any potential problems immediately, helping to maintain the integrity and functionality of your application.

{% hint style="warning" %}
**Note:** some issues, especially those that involve intricate calculations or dependencies, might take a bit longer to be detected and displayed. In some cases, the issue(s) might not appear until you navigate to the specific page in the editor where they exist. Always ensure you thoroughly review each page of your app before you deploy to make sure all issues are caught.
{% endhint %}

You cannot deploy your app to Live if there are issues. We recommend keeping the number of issues to a minimum at all times, preferably at zero.

## Disabling the Issue Checker

The Issue Checker can be completely disabled by adding a URL parameter in the URL of the Bubble editor.

```url
&issues_off=true
```

The full URL of the editor would then look something like the below:

{% code overflow="wrap" %}

```url
https://bubble.io/page?type=page&name=index&id=my-bubble-application&tab=tabs-2&issues_off=true
```

{% endcode %}

{% hint style="warning" %}
We generally discourage disabling the Issue Checker, as it's important to keep the number of issues in your app at zero. Additionally, disabling the Issue Checker lets you deploy the app even with potential issues, which can lead to a live app not functioning properly.
{% endhint %}

{% hint style="danger" %}
**The issue checker and API workflow names:** There’s a known limitation in the issue checker for backend workflows. If an issue is flagged for a **missing API workflow name**, it may not clear immediately after you update the name. To refresh the issue checker in these cases, switch away from the backend workflows tab and then return to it, or **refresh the page** entirely. This ensures the issue checker is using the most up-to-date backend workflow information.
{% endhint %}
