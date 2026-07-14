# New security dashboard features: Issue prioritization and improved filtering
> Source: https://forum.bubble.io/t/new-security-dashboard-features-issue-prioritization-and-improved-filtering/390211 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: data-api

## Original post (by @lindsay.esterman)

Hey everyone!

Lindsay here, product manager on the Bubble team. I’m excited to share some updates we’re rolling out to the security dashboard that should make it easier to identify and prioritize the security issues that matter most for your apps.
What’s changing

We’ve redesigned the security dashboard with a focus on helping you quickly understand where to direct your attention. Here’s what’s new:

Priority view: The dashboard now categorizes security issues into high, medium, and low priority levels based on their potential impact and alignment with industry standards like the OWASP Top 10 (https://owasp.org/www-project-top-ten/). When you open the dashboard, you’ll immediately see a snapshot showing how many issues fall into each category, making it clear at a glance what needs your attention first.

- High-priority issues are the ones that could lead to significant data exposure or access control problems — think publicly accessible editors, exposed secret keys, or missing privacy rules on sensitive data.

- Medium-priority issues might include things like API calls not requiring authentication or sensitive endpoint URLs that are hardcoded.

- Low-priority items, while still worth addressing, typically have more limited impact, like weak password policies.

Resolved issues filter: We fixed the Resolved issues filter so that you’ll only see the issues you’ve truly resolved and can focus on what matters. This makes it easier for you or your team to track progress and review what you’ve taken care of, when fixes were executed, and what still requires your attention.

[image]
Screenshot 2026-01-21 at 4.58.46 PM2876×1738 262 KB
Why this matters

Security can feel overwhelming, especially if you’re maintaining multiple apps or working with a large team. These improvements are designed to make the security dashboard more actionable, giving you a clear look into exactly what needs to be solved first and what’s already been tackled.
How to access the security dashboard

Here’s how you can find the security dashboard:

- Shield icon in left sidebar: You’ll see a new shield icon in your editor’s left sidebar that takes you directly to the security dashboard.

- Security check button during deploy: Before you deploy, you’ll see a button to run a security check so you can catch issues before your app goes live.

What’s next

Looking ahead, we’re shifting our focus to scalability and performance. Our primary objectives for the next phase of security dashboard updates include reducing test timeouts and decreasing test duration, especially for larger applications. We’re also making remediation a more guided in-product experience. We’ll share more details on that work soon.

In the meantime, I’d love to hear your feedback on these dashboard improvements. Are the priority levels helpful? Is there anything else you’d like to see in future iterations? Let us know in the comments below.

— Lindsay and the Bubble team

## Reply by @randomanon (0 likes)

Nice! I do have one request:

The LLM model you’re using to scan the database/privacy rules is outdated and gave me a badly hallucinated summary of what was actually going on. Highly recommend you update the model to the new SOTA (GPT 5.2 High or something equivalent).

## Reply by @J805 (0 likes)

I hope you can bring back the error checker. This was extremely helpful to get a message when we have an error instead of relying on building out a notification system for each possible error. [image]
