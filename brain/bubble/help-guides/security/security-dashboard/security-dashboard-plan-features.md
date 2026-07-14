# Security dashboard plan features
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/security-dashboard-plan-features · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble includes a variety of security checks designed to help keep your app secure. The specific security features available to you depend on your current subscription plan.

This article outlines which security features are included in each plan. For a more in-depth explanation of each feature, refer to the detailed descriptions provided at the bottom of the article (or follow the links in the tables below).

## Basic security checks

The security dashboard provides foundational security checks to safeguard your apps from common vulnerabilities. These checks, called “issues” in your dashboard, help identify essential risks and ensure a secure starting point. While the Starter plan includes only these basic checks, all other plans offer both basic and advanced security features for comprehensive protection.

{% hint style="warning" %}
Security checks marked with \* are not currently available for mobile apps.
{% endhint %}

| Feature                                                                                                                                                             | Starter | Growth | Team | Enterprise |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ---- | ---------- |
| [Missing privacy rules](/help-guides/security/security-dashboard/security-tests/issue-details#missing-privacy-rules)                                                | ✅       | ✅      | ✅    | ✅          |
| [Search privacy](/help-guides/security/security-dashboard/security-tests/issue-details#search-privacy)                                                              | ✅       | ✅      | ✅    | ✅          |
| [Constrainable fields](/help-guides/security/security-dashboard/security-tests/issue-details#constrainable-fields)                                                  | ✅       | ✅      | ✅    | ✅          |
| \* [Sensitive data exposed in workflows](/help-guides/security/security-dashboard/security-tests/issue-details#sensitive-data-exposed-in-workflows)                 | ✅       | ✅      | ✅    | ✅          |
| [Weak password policies](/help-guides/security/security-dashboard/security-tests/issue-details#weak-password-policies)                                              | ✅       | ✅      | ✅    | ✅          |
| [Unprotected test environments](/help-guides/security/security-dashboard/security-tests/issue-details#unprotected-test-environment)                                 | ✅       | ✅      | ✅    | ✅          |
| [Default username/password risks](/help-guides/security/security-dashboard/security-tests/issue-details#default-username-password-risks)                            | ✅       | ✅      | ✅    | ✅          |
| [Publicly accessible sensitive fields](/help-guides/security/security-dashboard/security-tests/issue-details#publicly-accessible-sensitive-fields)                  | ✅       | ✅      | ✅    | ✅          |
| [Unsafe API call configuration](/help-guides/security/security-dashboard/security-tests/issue-details#unsafe-api-call-configuration)                                | ✅       | ✅      | ✅    | ✅          |
| \* [Sensitive credentials or parameters exposed](/help-guides/security/security-dashboard/security-tests/issue-details#sensitive-credentials-or-parameters-exposed) | ✅       | ✅      | ✅    | ✅          |

## Advanced security checks

Advanced security checks are designed to detect more complex vulnerabilities and potential threats to your app’s infrastructure. While the security dashboard can detect these issues regardless of your plan, detailed information is limited unless your plan includes advanced checks.

<table><thead><tr><th width="156">Feature</th><th width="123">Starter</th><th>Growth</th><th>Team</th><th>Enterprise</th></tr></thead><tbody><tr><td>* <a href="/pages/xMPMAXlcGMYDBpgDTgYW#secure-page-protection">Secure page protection</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#database-exposure-risks">Database exposure risks</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>* <a href="/pages/xMPMAXlcGMYDBpgDTgYW#compromised-api-tokens">Compromised API tokens</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#unauthorized-collaborator-access">Unauthorized collaborator access</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#unsafe-google-maps-api-token">Unsafe Google Maps API token</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#sensitive-data-in-api-urls">Sensitive data in API URLs</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#unprotected-backend-workflow">Unprotected backend workflows</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>* <a href="/pages/xMPMAXlcGMYDBpgDTgYW#temporary-password-exploits">Temporary password exploits</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#insecure-api-documentation-swagger">Insecure API documentation (Swagger)</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>* <a href="/pages/xMPMAXlcGMYDBpgDTgYW#publicly-accessible-file-uploaders">Publicly accessible file uploaders</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>* <a href="/pages/xMPMAXlcGMYDBpgDTgYW#publicly-accessible-picture-uploaders">Publicly accessible picture uploaders</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><a href="/pages/xMPMAXlcGMYDBpgDTgYW#unrestricted-iframe-embedding">Unrestricted iFrame embedding</a></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr></tbody></table>
