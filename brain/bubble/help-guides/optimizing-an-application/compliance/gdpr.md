# GDPR
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/compliance/gdpr · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The General Data Protection Regulation

{% hint style="danger" %}
**Legal disclaimer:** This article series is meant only to be educational content to help give you a start on these regulatory compliance matters and is strictly not intended to be legal advice. The information presented may not be applicable to your specific situation and may not reflect the most recent developments in this area.

Always consult a qualified legal professional for advice regarding specific regulatory compliance obligations relevant to your circumstances. Details about your speciﬁc idea, app or context could make a diﬀerence in how you approach these obligations.

Moreover, this article is meant to be an introductory- level guide and will not cover all the ﬁne details of these topics.
{% endhint %}

## What is the GDPR?

The General Data Protection Regulation (GDPR) is a data protection and privacy regulation established and enforced by the European Union (EU). Implemented in May 2018, the GDPR prescribes how individual’s personal data can be collected and used, including the options websites must offer users regarding their personal data. The GDPR was implemented in the United Kingdom after it left the EU.

GDPR represents a major milestone in tech regulation history, as it applies not only to companies based in the EU but also to companies with users in the EU. Given that many Bubble apps cater to a global audience, it's possible that your app may be subject to these regulations, even if your company and/or server are situated outside the EU.

GDPR applies to tech companies handling personal data in a commercial context. It requires websites to provide notice of personal data collection, usage, and sharing, establish a legal basis for data processing, and respect individual’s rights to access, portability, and deletion of their personal data, for example.

{% hint style="info" %}
If you're interested in learning more about Bubble and GDPR, we recommend checking out our dedicated blog post that delves deeper into various aspects of GDPR regulations.

Blog post: [Bubble GDPR intro guide](https://bubble.io/blog/bubble-gdpr/)

At the bottom of this page is a [GDPR terminology table](#gdpr-terminology).
{% endhint %}

## Is Bubble GDPR compliant?

Bubble takes the protection of personal data seriously. We have implemented measures designed to meet the requirements of the GDPR (and other applicable data privacy laws).

However, this does not mean however that your app built on Bubble is automatically compliant. To use the GDPR terminology, you are likely a Data Controller for personal data on your app (and Bubble is a Data Processor and our processors are Sub-processors to you).

What this means is that the tools you use (including your Data Processors and Sub-processors) must comply with the GDPR (which is a big step toward your own compliance), but you still have to set up each individual app and documentation in the right way in order for it to be compliant with the GDPR.

> You can take advantage of Bubble’s capabilities to help meet your GDPR obligations.

## Do I have to have a server in the EU to be compliant?

No, you do not necessarily have to use an EU-based server to host the personal data to be GDPR compliant. However, the GDPR imposes rules on transferring to or accessing personal data from outside the European Union. If your app processes personal data of EU residents and stores it on a non-EU server, you must ensure that the data transfer is in compliance with the GDPR.

### Standard contractual clauses

Under the GDPR, transferring personal data from the EU to countries with lower data protection standards is restricted. To overcome this, the EU has developed Standard Contractual Clauses (SCCs), which are pre-approved sets of contractual provisions designed to ensure that personal data transferred outside of the EU is adequately protected and meets the GDPR requirements.

> After the European Court of Justice (ECJ) ruled that Privacy Shield was not a permissible transfer mechanism, Bubble incorporated the Standard Contractual Clauses into its DPAs.

When using SCCs, you agree to follow specific rules and principles regarding the processing and protection of personal data. This helps ensure that the personal data of EU residents is treated with the same level of care and protection as it would be within the EU.

As a Bubble developer, incorporating SCCs into your data processing agreements with your customers and service providers can be an essential step in becoming GDPR compliant. By doing so, you provide assurances that the personal data of your EU users is being handled securely and responsibly in compliance with the GDPR, regardless of where your server is located.

Bubble serves as a data processor for your company when you deploy your app and end-users sign up for an account on your app, which might be one of several processors you opt to use (an analytics platform like Google Analytics or payment gateway like Stripe are examples of other data processors you may choose to use). It’s important to note that even if Bubble and other processors you work with have made efforts to adhere to GDPR (such as Bubble entering into Data Processing Agreements (DPAs) with its processors, who act as your sub-processors), you are still responsible for ensuring your Bubble app is GDPR-compliant.

Bubble has implemented the SCCs into its DPAs with its customers and its processors (your sub-processors). In addition, starting in July 2023, the new EU-US Data Privacy Framework and Swiss-US Data Privacy Framework, the third iteration of a joint EU-US and Swiss-US programs to enable personal data transfers from the EU and Switzerland to the US, became operational. As a participating company in the prior EU-US and Swiss-US Privacy Shield Frameworks, Bubble is “grandfathered”’ into the new EU-US and Swiss-US Data Privacy Frameworks and will apply the updated Data Privacy Framework Principles, but we will continue to use the SCCs in our DPAs as extra protection.

A frequent inquiry we receive at Bubble is along the lines of” “If you only implemented X, wouldn’t that make you GDPR-compliant?” An example of this is users asking if having an EU data center by itself would guarantee GDPR compliance for Bubble and Bubble apps.

Based on our understanding, the answer is no – merely storing data in an EU data center doesn’t meet all the necessary requirements for GDPR compliance. Similarly, subscribing to Bubble’s Enterprise plan and requesting your own EU-based dedicated Bubble servers is not enough to achieve full compliance with GDPR.

## What must I do for my app to be compliant?

{% hint style="warning" %}
While the following list provides a suggested starting point for planning your app’s compliance, it shouldn’t be regarded as all-inclusive or specific to your app.

Ultimately, ensuring your app’s compliance is *your* responsibility as the developer, and you should seek the guidance of qualified legal counsel and other professionals to assist you in this process.
{% endhint %}

1. **Understand the GDPR’s scope:** Determine if the GDPR applies to your app. If your app collects, stores, or processes personal data from EU residents, even if your company is located outside the EU, you must comply with the GDPR.
2. **Establish a legal basis for processing data:** Ensure that your app has a legal basis for processing personal data, such as user consent, contract necessity, or a legitimate interest.
3. **Provide notice and obtain consent:** Create a clear and transparent privacy notice, explaining what personal data your app collects, how it’s used, and with whom it’s shared. Where necessary, obtain explicit, affirmative consent from users before collecting their data. Ensure that users can easily withdraw their consent at any time.
4. **Implement privacy by design:** Incorporate privacy considerations into your app’s design from the outset. Use privacy rules and conditions to protect user data and limit data collection to only what’s necessary.
5. **Respect user rights:** Ensure that your app allows users to exercise their rights under the GDPR, including the right to: - access – rectify – erase – restrict processing – port … their personal data.
6. **Set up data breach notifications:** Develop a process for detecting and reporting data breaches within no more than 72 hours to the relevant supervisory authority, as required by the GDPR.
7. **Manage third-party relationships:** If your app uses plugins or third-party services (such as APIs or external databases) that process personal data, make sure they are GDPR compliant and enter into an appropriate DPAs with them.
8. **Set up privacy rules:** Configure privacy rules in Bubble to restrict access to personal data (especially “sensitive” personal data to ensure users access the data they need to and are authorized to see. ’
9. **Publish a privacy policy:** Draft and publish a comprehensive privacy policy that explains your app's data processing practices, user rights, and contact information for privacy-related inquiries.

## GDPR terminology

<table><thead><tr><th width="266">Term/phrase</th><th>Definition</th></tr></thead><tbody><tr><td>Consent</td><td>Unambiguous and affirmative user agreement for the collection and processing their personal data for specific purposes within your app.</td></tr><tr><td>Data breach</td><td>A security incident leading to unauthorized access, use or alteration of personal data collected by your app.</td></tr><tr><td>Data controller</td><td>The entity (or entities) that determines the purposes and means of processing personal data. App developers are likely data controllers.</td></tr><tr><td>Data Processing Agreement</td><td>A contract between a data controller and a data processor outlining responsibilities and obligations for processing personal and GDPR compliance for your app.</td></tr><tr><td>Data processor</td><td>Third-party service provider you use in your app for processing personal data, such as analytics, payments, or emails. Bubble is likely a data processor to you for your app.</td></tr><tr><td>Data Protection Officer</td><td>A designated person responsible for ensuring GDPR compliance for your app. May be required for certain apps.</td></tr><tr><td>Data subject rights</td><td>Rights granted to users by the GDPR, such as accessing, rectifying, or erasing their personal data collected and processed by your app.</td></tr><tr><td>Legal basis</td><td>The legal reason for processing personal data in your app, such as user consent contractual necessity or a legitimate interest.</td></tr><tr><td>Personal data</td><td>Any information relating to an identified or identifiable individual collected through your app.</td></tr><tr><td>Privacy by design</td><td>Integrating data protection and data “minimization” measures in the development and operation of your app from the very beginning.</td></tr><tr><td>Processing</td><td>Any operation or set of operations which is performed on personal data, such as collection, recording, use, storage, adaptation or alteration, retrieval, disclosure, dissemination, combination, erasure or destruction.</td></tr><tr><td>Restricted data transfer</td><td>Restrictions on transferring personal data collected by your app from the EU to countries outside the EU, unless certain protections are in place.</td></tr><tr><td>Sub-processor</td><td>A data processor that handles personal data on behalf of another processor you use in your app.</td></tr></tbody></table>
