# Bubble's security features
> Source: https://manual.bubble.io/help-guides/security/bubbles-security-features · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This article provides a general overview of the different security features Bubble as a platform offers.

{% hint style="warning" %}
**Note:** Should there be any inconsistencies between the content provided below and Bubble's official [terms of use](https://bubble.io/terms) or other policy documents, the terms and provisions specified in Bubble's official documents shall take precedence and prevail. Always refer to Bubble's official legal documents for definitive guidance.
{% endhint %}

## Bubble’s security features

### Account access

Bubble provides robust security measures for your account, including industry-leading authentication methods, two-factor authentication (2FA), and Single Sign-On (SSO) capabilities.

Article: [Bubble account security](/help-guides/security/bubble-account-security)

### Privacy rules

With Bubble's privacy rules, you can set specific conditions on who can search for, view, and modify data. By applying these rules, you make sure that sensitive information remains protected and accessible only to the intended users, safeguarding the integrity and confidentiality of your data.

Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

### Secure file hosting

Bubble's secure file hosting ensures that all your uploaded files, such as images, documents, or other media, are stored safely. These files can also be protected with privacy rules to prevent unauthorized access, making sure only you and permitted users can view or interact with them.

Article: [Files](/help-guides/data/files)

### Workflow conditions

Workflow conditions in Bubble's editor give you the power to set particular criteria under which a certain action or workflow will operate. This means specific actions within your app will only run if your set conditions are met.

Article: [Conditions](/help-guides/logic/conditions)

### User authentication

Bubble's user authentication mechanism facilitates the verification of your end-users identity according to the most up-to-date security standards. By employing robust account creation and sign-in procedures and combining it with other security tools such as privacy rules and conditions, you have a high degree of control over who can access what in your app.\
\
Article: [User authentication](/help-guides/data/user-accounts)

### Advanced DDoS protection

Bubble uses [Cloudflare](https://www.cloudflare.com/) and an in-house DDoS[^1] (Distributed Denial of Service) protection system to monitor, track, and block even the most granular attacks so that your Bubble applications remain resistant to malicious disruption attempts.

### HTTPS encryption

Bubble employs HTTPS encryption to ensure all data transmitted between your browser and Bubble's servers is encrypted.

Article section: [What is the HTTPS protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)?

### API authentication

With Bubble's Data API and Workflow API authentication, you're assured that any external requests to your Bubble applications are both authenticated and authorized. By setting up secure tokens or specific authentication methods, you maintain control over who has the ability to access your app's data and initiate workflows.

Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

### Server logs

Bubble offers server logs, to capture various interactions and activities within the platform. These logs are invaluable for monitoring, troubleshooting, and ensuring your application's security and performance.

### App preview

By default, Bubble's apps require a username and password to preview.

### Security dashboard

Bubble offers a robust security reporting and monitoring solution to enhance app safety. This tool simplifies the task of identifying and addressing vulnerabilities within your application by providing automated analyses of your app’s configurations and design choices. It empowers you to detect potential risks and implement measures to protect your app effectively.

With more than 20 key security checks, the security dashboard ensures your sensitive data is safeguarded, while helping you maintain application integrity. For a deeper dive into how it works and how it can strengthen your app’s security, explore the full overview.

Article series: [Bubble's security dashboard](/help-guides/security/security-dashboard)

[^1]: A *DDoS attack*, or *Distributed Denial of Service attack*, is an attempt to overwhelm a website or app with excessive traffic from multiple sources, rendering it unavailable.
