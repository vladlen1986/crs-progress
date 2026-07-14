# SOC 2 Type II
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/compliance/soc-2-type-ii · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Bubble and SOC 2 compliance

{% hint style="warning" %}
**Legal disclaimer:** This article is meant only to be educational content to help give you a start on these regulatory compliance matters and is strictly not intended to be legal advice. The information presented may not be applicable to your specific situation and may not reflect the most recent developments in this area.

Always consult a qualified legal professional for advice regarding specific regulatory compliance obligations relevant to your circumstances. Details about your speciﬁc idea, app or context could make a diﬀerence in how you approach these obligations.

Moreover, this article is meant to be an introductory- level guide and will not cover all the ﬁne details of these topics.
{% endhint %}

Bubble has put in place a comprehensive and robust security program to protect all data, including personal data, on your app from a possible data breach or other problem. A description of our security program can be found at: <https://bubble.io/security>. We also continually test our security to make sure it works as it’s supposed to.

## What is SOC 2?

SOC 2, short for Service Organization Control 2, is a set of standards that companies follow to manage and secure customer data. It's like a rulebook for handling information, especially when it comes to using a trusted Software as a Service (SaaS) provider like Bubble.

#### SOC 2 audits and trust principles

SOC 2 reports are issued by independent auditors who assess the effectiveness of an organization's controls according to the criteria established by the[ American Institute of Certified Public Accountants (AICPA)](https://us.aicpa.org/forthepublic).

SOC 2 audits are made in two different ways, Type I and Type II, each serving a different purpose:

1. **SOC 2 Type I:** This is like a snapshot of a company's systems and controls at a specific moment in time. It looks at how a company describes its controls and whether they are designed properly. Think of it as checking if all the locks in a house are in place. Type I is more about the planning and structure of the service than how it performs over time.
2. **SOC 2 Type II:** This audit is more thorough. It's like checking those locks over a period of time (3 months in Bubble’s case) to see if they actually work, day in and day out. A Type II report doesn't just look at the design of the controls, but also how they operate over a defined period. It digs into the nitty-gritty and makes sure everything is working as it should be.

These audits ultimately lead to a report, which requires that Bubble adheres to at least one of the SOC 2's Trust Principles:

* security
* availability
* integrity
* confidentiality
* privacy

## SOC 2 Type II report

### Is Bubble SOC 2 compliant?

Yes. Specifically, Bubble is compliant with the SOC 2 Type II standard for security. Bubble has undergone a thorough external audit process by the independent auditor, [Sensiba LLP](https://sensiba.com/solutions/risk-assurance/soc/), and demonstrated that we have effective controls in place to ensure the security of our platform over time.

Looking ahead, we may consider extending our compliance to cover other Trust Principles.

### Does that mean my Bubble app is also SOC 2 compliant?

Bubble's SOC 2 Type II report for security means that our platform itself meets the specific standards needed to be compliant. But when it comes to an individual app created using Bubble, the compliance doesn't automatically transfer over.

Think of Bubble like a set of tools in a workshop. We make sure the tools meet certain standards, but how someone uses those tools to build something is up to them. If a user wants their app to be SOC 2 compliant, they'll need to ensure that the way they design and operate the app meets the necessary trust principles and complete a separate audit.

#### What do I need to do to obtain a SOC 2 report?

Note: the following is a general guide for users looking to make their app compliant with SOC 2 standards while using Bubble. This is not legal or professional compliance advice, and the specific requirements can vary widely depending on factors like your industry, region, or the particular needs of your end users. It's always a good idea to consult a legal or secuity professional who understands your unique situation to ensure that you're meeting all the necessary requirements.

With that said, here's a general overview that might help you get started on your path to compliance.

1. **Understand the requirements:** First, figure out what compliance standards you need to meet. SOC 2 has specific trust principles, so understanding what they require will be your starting point. You may want to obtain a report in one or more of the trust principles.
2. **Assess your app:** Look at your app and identify where you might be handling sensitive information or where particular security measures need to be in place. Think of this like spotting the weak links in a chain.
3. **Implement controls:** Put measures in place to ensure that your app meets security standards. This might involve things like setting up privacy rules and server-side conditions to ensure data remains protected.
4. **Documentation:** Keep records of what you're doing to meet security standards. This is essential if you need to prove compliance later.
5. **Regular monitoring and testing:** Compliance isn't a one-time thing; you'll need to keep an eye on things and make sure your controls are working as they should be.
6. **Consider professional assistance:** Depending on your needs and the complexity of your app, you might want to consider hiring a professional who specializes in compliance. They can help you navigate specific requirements and make sure you're on the right track.
7. **Consider Bubble security assistance platforms:** Organizations like Flusk and ncScale can assist by checking for data leaks and safe authentication protocols, performing penetration tests, detecting inefficiencies, monitoring error logs, mapping dependencies, minimizing exposure, and more.
8. **Stay informed:** Compliance standards can change, so it's essential to keep up to date with the latest requirements

If you have questions about SOC 2 or want to learn more about Bubble’s Enterprise security, please [contact Sales](http://bubble.io/contact-sales).

## SOC 2 terminology

<table><thead><tr><th width="171">Term/phrase</th><th>Description</th></tr></thead><tbody><tr><td>SOC 2</td><td>System and Organization Controls 2, a framework for auditing and reporting on controls at a service organization with a focus on security, availability, and other areas.</td></tr><tr><td>Type I</td><td>A SOC 2 Type I report evaluates the design of a service organization's controls at a <em>specific point in time</em>.</td></tr><tr><td>Type II</td><td>A SOC 2 Type II report assesses the design and operational effectiveness of controls <em>over a designated review period.</em></td></tr><tr><td>AICPA</td><td>American Institute of Certified Public Accountants, the governing body that provides the SOC 2 framework.</td></tr><tr><td>Trust Principles</td><td>The five trust principles are Security, Availability, Processing Integrity, Confidentiality, and Privacy. They form the basis of the SOC 2 report.</td></tr><tr><td>Attestation Report</td><td>The final document provided by the auditors that outlines the effectiveness of the controls in meeting the trust principles.</td></tr><tr><td>Auditor</td><td>A qualified third-party entity that conducts the SOC 2 assessment.</td></tr><tr><td>Monitoring &#x26; Review</td><td>An ongoing process in which a service organization continually reviews and updates its controls to maintain SOC 2 compliance.</td></tr></tbody></table>
