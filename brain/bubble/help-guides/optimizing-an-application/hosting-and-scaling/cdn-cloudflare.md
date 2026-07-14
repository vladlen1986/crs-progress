# CDN (Cloudflare)
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/hosting-and-scaling/cdn-cloudflare · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<figure><img src="/files/ZKD0CRzLqZBon7J4GEOy" alt="" width="188"><figcaption></figcaption></figure>

Cloudflare is one of the leading content delivery network (CDN) providers in the world. At its core, a CDN is a network of servers strategically located around the globe to deliver web content to users more quickly and efficiently. Bubble uses Cloudflare's CDN to enhance the performance of Bubble-built applications. But how do these two technologies work together? Let’s break it down.

## **How a CDN works**

Before delving into how the CDN operates, it's essential to understand the traditional web hosting model. Without a CDN, your Bubble app would reside on a single server in one geographic location. Users from all around the world would send requests to this central server. As you can imagine, the farther away the user is from this server, the longer it takes for data to travel, leading to potential latency issues.

Enter Cloudflare. When Bubble employs Cloudflare’s CDN, your application’s static content (like images, uploaded files, and JavaScript files) is cached (or saved) across Cloudflare's extensive network of servers around the world. When a user accesses your Bubble app, Cloudflare determines the nearest server to that user and serves the cached content from that location.

While static content can be cached, dynamic content (like data in the database) is not. This means that any interaction you have with the database in your app still happens on Bubble's server.

## **Benefits beyond speed**

Beyond speed improvements, Cloudflare offers other advantages:

* **Security**: Cloudflare acts as a protective shield, absorbing malicious traffic and mitigating DDoS[^1] attacks before they reach your app.
* **Uptime**: Cloudflare’s vast network means that even if one server faces issues, another can take its place, ensuring more consistent uptime.
* **SSL**: Cloudflare provides SSL encryption, ensuring that data between the user and server remains secure.

## **Integration with Bubble**

The integration with Cloudflare is seamless and automated. Bubble handles the complexities behind the scenes, meaning that you can focus on building without diving deep into networking intricacies.

## Customizing Cloudflare

On the Enterprise plan, we offer customization of the Cloudflare settings for your app. To learn more, get in touch with Sales.

Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)\
Page: [Contact Bubble sales](https://bubble.io/contact-sales#!)

[^1]: A DDoS (Distributed Denial of Service) attack is a malicious attempt to disrupt the normal traffic of a targeted server by overwhelming it with a flood of internet traffic from multiple compromised sources, rendering the service slow or unavailable to legitimate users.
