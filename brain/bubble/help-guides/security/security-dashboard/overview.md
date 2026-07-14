# Overview
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/overview · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The security dashboard offers a comprehensive suite of tools to audit and monitor your app. In this article, we’ll go over the available features, and link to more in-depth content for each section.

## Security

The security dashboard equips you with two different tools for performing tests on demand.

### Issues explorer

The Issues explorer runs a test across a range of different categories and ranks them by criticality. Each of the categories are explained in-depth in the sub-articles in this series.

Article: [The issues explorer](/help-guides/security/security-dashboard/security-tests/issue-explorer)

## Privacy rules checker

The privacy rules checker quickly shows which of your data types are publicly accessible.

Article: [The privacy rules checker](/help-guides/security/security-dashboard/security-tests/privacy-rules-checker)

## Automated tests

Automated tests enable you to run security tests automatically.

Article: [Automated tests](/help-guides/security/security-dashboard/security-tests/automated-tests)

## Resources

### Scheduled deployments

Bubble allows you to schedule deployments in advance, so your app is deployed automatically at a specific date and time. This is useful for coordinating releases or planning updates outside of working hours.

{% hint style="warning" %}
**Bubble deployments and issue checker:** Scheduled deployments will proceed even if there are unresolved issues in the editor. This means it's important to review and fix any issues before scheduling a deployment, as they won't block the process or trigger a warning automatically.
{% endhint %}

### Alerting

The **alerting** feature allows you to notify collaborators when key events occur in your app. You can send alerts via email or trigger a custom webhook when your app is deployed to the live environment

Use this feature to keep your team informed during deployment or when working across multiple .
