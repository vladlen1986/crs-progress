# Connector Platforms
> Source: https://forum.bubble.io/t/connector-platforms/303828 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 2 posts · topic: multi-tenant

## Original post (by @chris.e.daly)

There is a trend going on right now in the rise of “connector” platforms.  Fivetran, UseParagon, Dataddo - all offer a single connector to their API that then gives users access to multiple API’s.

For example, we might connect Fivetran to our app, and our customers could use Fivetran (white labeled) to connect their Google Analytics, Shopfiy, Facebook Ads, Google Ads, and Klaviyo installs to our app.   We make one connection to the connector, and then users can connect a variety of apps.

If you are building a SaaS mutli-tenant platform, these tools can accelerate adoption by solving the problem in Bubble of having to create multiple connections at a user level using the API Connector.

If you are building a course platform, you could have users connect their MailChimp and Google Analytics to your platform to send emails and then push data to GA4 or Looker.

I have not found them in the Plugin Library - but these seem like the ideal partners for Bubble and a game changer for building mutl-tenant SaaS with integrations available out of the gate.

Thoughts?

## Reply by @lola (1 likes)

There are also unified APIs which is a similar concept. A connection to any of the major ones should be possible through the API connector.

I know some bubblers who use unified.to (https://unified.to/) for example.

Lola
