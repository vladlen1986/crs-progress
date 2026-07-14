# Dedicated instance
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

With the enterprise plan, you have the option to get maximum reliability with an isolated instance of Bubble that operates on a Bubble-managed AWS server.

One dedicated instance can host as many apps as you need.

## Get this article as a PDF

We also have information about dedicated instances in a downloadable PDF for easy and offline reading.

{% file src="/files/d8S8vapUxXvfWwGH4CFJ" %}

## What you get with a dedicated instance

### Hosting region

Specify the region where your server and data are located. Choose from Bubble’s growing list of AWS data center regions:

* Bahrain
* Calgary
* Cape Town
* Frankfurt
* Hong Kong
* Ireland
* London
* Mexico City
* Montreal
* Mumbai
* N. California
* N. Virginia
* Ohio
* Oregon
* Osaka
* Paris
* Seoul
* Singapore
* Stockholm
* Sydney
* São Paulo
* Tel Aviv
* Tokyo
* UAE
* Zurich

This capability isn't merely about speed; it's about complying with data sovereignty laws and ensuring that your data is stored in a region that aligns with your business requirements or regulations.

### Static IP

A dedicated instance provides your apps with a static IP[^1], ensuring a constant IP address. This allows for more reliable connections, seamless integration with other systems, and the ability to build robust security features centered around the IP address.

Article: [Technical specs](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs) | [Static IP address](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs#static-ip-address)

### Hosting configuration designed for scale

As your user base expands, our team is consistently monitoring your app's infrastructure to support seamless scaling. We're equipped and ready to make the necessary adjustments to your plan or server configuration to optimize performance, even for specific corner cases and processes.

Article: [Technical specs](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs)

### Global CDN[^2]

Through our partnership with Cloudflare[^3], Bubble offers a network of servers strategically located worldwide to provide fast and reliable content delivery to users, no matter where they're based. By storing cached versions of static resources like images, CSS, and JavaScript, CDNs minimize the distance between the user and the app's original server.

### Manage Bubble updates

Our shared server environments are continually updated with new features and security improvements. With the Enterprise plan, you decide when to update your server. This lets you test new features or changes in a controlled environment and roll them out on your own schedule.

Article: [The Editor Experience](#the-editor-experience) | [Dedicated Manager](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#dedicated-manager)

### Direct database access

Bubble offers read-only access to your PostgreSQL[^4] database. This feature paves the way for integrations with data warehousing and analytics tools such as Snowflake and BigQuery, enabling you to harness the full potential of your data.

Article: [Customizable Options](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/customizable-options) | [Direct Database Access](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/customizable-options#direct-database-access)

## Learn more

To learn more about how a dedicated instance can support the growth of your projects, keep reading the sections below:

<details>

<summary>The editor experience</summary>

The Bubble editor remains mostly the same as what you'e used to, but with a few key features and additions that help you manage your dedicated instance.

Article: [The editor experience](#the-editor-experience)

</details>

<details>

<summary>Server monitoring dashboard</summary>

You will be able to monitor the health of your servers in the Logs Tab of the Editor. This section displays CPU utilization and memory usage. We will proactively notify you if your usage reaches certain thresholds, and then we’ll work with you to upgrade your infrastructure as needed.

Article: [Monitoring dashboard](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#the-logs-tab)

</details>

<details>

<summary>Customizable options</summary>

On a dedicated instance, you get access to a range of customizable options:

* Direct Database Access
* Custom Cloudflare Integration
* Protecting Sub-App Features
* Backup Retention Setting
* Custom SQL Connector Limit
* Custom API List Limit

Article: [Customizable options](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/customizable-options)

</details>

<details>

<summary>Technical specs</summary>

This article describes the technical specs that come with your dedicated instance.

Article: [Technical specs](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs)

</details>

<details>

<summary>Extended multi-tier technical support</summary>

If you have questions about how best to build new functionality or why something in your app is behaving a certain way, the Technical Success Management team is here to help.

We also offer upgradeable support tiers, ranging from the included Core option to the Premium Plus option.

Article: [Technical support](/help-guides/bubble-for-enterprise/priority-support)

</details>

## Migration process

If you're in the process of preparing for your server migration, read our [dedicated server migration guide](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/migration-process) to stay on top of what you need to do before, during and after the migration.

[^1]: An *IP address* is a unique string of numbers separated by periods or colons that identifies each computer on a network like the internet.\
    \
    It works like a home address, allowing devices to locate and communicate with each other.

[^2]: A *Content Delivery Network (CDN)* is a system of distributed servers that delivers web content to users based on their geographic location, optimizing speed and performance.\
    \
    Bubble partners with Cloudflare to offer CDN capabilities.

[^3]: Cloudflare is a global network service that offers various security and performance features, including DDoS protection, CDN services, and more.\
    \
    External page: [Cloudflare](https://www.cloudflare.com/)

[^4]: *PostgreSQL* is an open-source relational database management system and makes up the foundation of your Bubble app's database.\
    \
    Article: [The database](/help-guides/data/the-database)
