# Custom domain and DNS
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

When an app is created, Bubble uses the name you provide to generate a unique URL where you can run [both the development and live branches](#user-content-fn-1)[^1] of your app. For example, if your app has the name `my-bubble-application`, Bubble generates the URLs below:

{% tabs %}
{% tab title="Live" %}

```url
https://my-bubble-application.bubbleapps.io
```

{% endtab %}

{% tab title="Development" %}

```python
https://my-bubble-application.bubbleapps.io/version-test/
```

{% endtab %}
{% endtabs %}

## What does it mean to connect to a custom domain?

{% hint style="info" %}
Each individual app can only be connected to **one** domain or subdomain. If you need to use multiple domains or subdomains, consider utilizing the sub-app feature.

Article: [Sub-apps](/help-guides/optimizing-an-application/sub-apps)
{% endhint %}

Setting up a custom web domain means configuring your app to be accessed through a specific domain name that you've chosen, rather than the default address provided by Bubble. This involves registering a unique domain name (like `www.my-custom-domain.com`) and then linking it to your website. In that sense, the domain makes up the "root" of all your app's URL's.

{% tabs %}
{% tab title="Live" %}

```url
https://www.my-custom-domain.com
```

{% endtab %}

{% tab title="Development" %}
{% code overflow="wrap" %}

```
https://www.my-custom-domain.com/version-test/
```

{% endcode %}
{% endtab %}
{% endtabs %}

Connecting to a custom domain means to customize your site’s URL, making it more recognizable and often more professional-looking, reflecting your brand or the app's purpose more accurately.

## Quick guide: setting up a custom domain

Setting up a custom domain is done in three steps:

{% stepper %}
{% step %}

### Register the domain

The [first step](#step-1-register-the-domain) is to buy the domain you want, and register it with a registrar[^2].
{% endstep %}

{% step %}

### Add the domain in Bubble

Then, you [add that domain](#step-2-add-the-domain-in-bubble) (such as `www.example.com`) in the Bubble editor.
{% endstep %}

{% step %}

### Change DNS settings

After registering the domain in Bubble, we will provide you with DNS settings that you need to [register with your registrar](#step-3.-change-the-dns-settings).
{% endstep %}
{% endstepper %}

### `Example.com` versus `www.example.com`

Most apps and websites are expected to load regardless of whether the user types in `example.com` or `www.example.com` as the URL. For SEO purposes, Bubble automatically redirects one to the other, depending on which one you entered as your app's custom domain.

For example:

| Your custom URL                           | User types                | Redirects to              |
| ----------------------------------------- | ------------------------- | ------------------------- |
| example.com                               | <https://www.example.com> | <https://example.com>     |
| [www.example.com](http://www.example.com) | <https://example.com>     | <https://www.example.com> |

## In-depth guide: setting up a custom domain

{% hint style="info" %}
Many registrars also offer hosting, meaning that they'll show you a price for the domain, and for a hosting period (typically a year or more). Since Bubble apps are hosted on Bubble's server, you don't need to purchase hosting as well. Make sure you only pay for the domain.
{% endhint %}

{% hint style="warning" %}
Using a domain that incorporates the term `bubble`, such as [www.bubbleagency.com](http://www.bubbleagency.com/), is not permitted for a custom domain in Bubble. This is because it violates our terms of service. Custom domains must avoid using 'bubble' to maintain compliance with our guidelines.

Page: [Terms of service](https://bubble.io/terms)
{% endhint %}

### Step 1: Register the domain

Domains are purchased from a company known as a domain registrar. Once it has been purchased, it becomes your unique identifier on the web, and no one can register the same domain as you. Many domains are registered for the first time, but there's also a market for buying existing domains that ranges from a few US dollars to several million.

<details>

<summary>Domain registrars</summary>

Registrars are accredited entities that manage the reservation of domain names. There are many different providers and in the list below you'll find some of the biggest ones:

1. GoDaddy - [https://www.godaddy.com](https://www.godaddy.com/)
2. Namecheap - [https://www.namecheap.com](https://www.namecheap.com/)
3. Bluehost - [https://www.bluehost.com](https://www.bluehost.com/)
4. HostGator - [https://www.hostgator.com](https://www.hostgator.com/)
5. Google Domains - [https://domains.google](https://domains.google/)
6. DreamHost - [https://www.dreamhost.com](https://www.dreamhost.com/)
7. 1&1 IONOS - [https://www.ionos.com](https://www.ionos.com/)
8. Network Solutions - [https://www.networksolutions.com](https://www.networksolutions.com/)
9. Dynadot - [https://www.dynadot.com](https://www.dynadot.com/)
10. Register.com - [https://www.register.com](https://www.register.com/)

*<mark style="color:red;">Bubble is not responsible for the content, accuracy, or practices of third-party websites or services that are linked from our platform and website. We provide these links for your convenience. Always review the terms and conditions and privacy policies of any third-party websites or services that you visit.</mark>*

</details>

Users access your app by typing its domain into their browser's address bar. Think of it as the digital equivalent of your physical address — it's how people find you on the internet.

### Step 2: Add the domain in Bubble

It doesn't matter which registrar you have used when you want to configure it in Bubble, as long as you have access to make changes to the [domain's DNS settings](#user-content-fn-3)[^3].

To set up the domain with your app, do the following:

{% stepper %}
{% step %}

### Open domain settings

Navigate to the *Settings* tab and *Domain and email* section.
{% endstep %}

{% step %}

### Enter the name

Enter the domain you purchased in [step 1](#step-1-register-the-domain), in the *Domain name* input field.
{% endstep %}

{% step %}

### Confirm

Click *Set up this domain.*
{% endstep %}
{% endstepper %}

When you've completed these steps, Bubble will show you the DNS records that you need for step 3. Typically, they look something like this:

{% hint style="warning" %}
**Do not use the IP addresses below** – they are only meant as an illustration. Use the IP addresses that Bubble provides in the Domain subtab.
{% endhint %}

<table><thead><tr><th width="99">Type</th><th width="126">Name</th><th>Value</th></tr></thead><tbody><tr><td>A</td><td></td><td>104.16.36.105</td></tr><tr><td>A</td><td></td><td>104.16.42.105</td></tr><tr><td>A</td><td></td><td>104.19.240.93</td></tr><tr><td>A</td><td></td><td>104.19.241.93</td></tr><tr><td>A</td><td>www</td><td>104.16.36.105</td></tr><tr><td>A</td><td>www</td><td>104.16.42.105</td></tr><tr><td>A</td><td>www</td><td>104.19.240.93</td></tr><tr><td>A</td><td>www</td><td>104.19.241.93</td></tr></tbody></table>

This table outlines the DNS A record configurations with their respective types, names, and values.

<details>

<summary>What are "Type A" records?</summary>

**A records**, or **Address Records**, are a fundamental part of DNS (Domain Name System).

They map a domain name to its corresponding IP address, which is a numerical label assigned to each device on a network. This mapping allows users to access websites using familiar domain names (like [www.example.com](http://www.example.com/)) rather than numeric IP addresses. A records are essential for directing internet traffic and making the web user-friendly.

</details>

<details>

<summary>Why are there so many similar records?</summary>

#### Multiple IP addresses

Having multiple IP address values for a domain in DNS settings provides redundancy and load balancing:

* **Redundancy** ensures that if one server (or IP address) becomes unavailable, others can take over, maintaining the accessibility of your app.
* **Load balancing** distributes traffic across several servers, improving app performance and reducing the chance of overloading a single server.

This setup enhances the reliability and efficiency of hosting your app. You only need to set the DNS records once.

#### Domain prefix

In the example above, you'll see that we link to four different records two times (one blank and one with www). This means that both `https://my-app.com` and `https://www.my-app.com` will properly redirect to your app.

</details>

### Step 3. Change the DNS settings

{% hint style="info" %}
Navigating this process can get somewhat technical, as the interface varies between registrars. If you need some guidance, it’s a good idea to contact your registrar’s customer support. Also, feel free to seek advice on the [forum](https://forum.bubble.io/), as there’s a good chance another user has experience with the same registrar and can offer helpful insights.
{% endhint %}

After obtaining the DNS details, there's no need to make any more adjustments within Bubble. Your next steps should be carried out in the domain registrar service where your domain is managed.

{% stepper %}
{% step %}

### Log in to the registrar's dashboard

These steps are performend in the registrar's dashboard, not in Bubble's settings.
{% endstep %}

{% step %}

### Navigate to to DNS settings

Look for the *DNS settings* or *DNS Zone File* within your registrar’s dashboard.
{% endstep %}

{% step %}

### Remove empty A records

In this section, remove any existing [A records](#what-are-type-a-records) that have an empty name ('') or `www.` Note that [some registrars use '@' as a placeholder for an empty domain](#user-content-fn-4)[^4].
{% endstep %}

{% step %}

### Enter the records Bubble provided

Replace them with the records provided earlier. Proceed by adding the records accordingly
{% endstep %}
{% endstepper %}

### Propagating the changes

After setting up the DNS records, the new settings need to propagate across the internet. **This can take up to 24 hours**, but usually you should see some results after 2-4 hours, and sometimes faster.

<details>

<summary>Why do DNS settings need time to propagate?</summary>

For those new to the concept, let's talk about why DNS settings need time to propagate.

DNS stands for Domain Name System, which is essentially the phonebook of the internet. It's a system that translates human-friendly domain names like "bubble.io" into IP addresses like "192.0.2.1" that computers use to communicate with each other.

To make this process fast, DNS information isn't fetched fresh every time someone visits a site. Instead, networks, internet providers, and even your own device store cached copies of recent lookups. When you type a domain into your browser, your computer usually checks one of these caches first before reaching out across the internet.

When you update your DNS settings, this change needs to be reflected in all those local copies (DNS servers). This process is known as *propagation*.

However, since these copies are not all updated instantly (they refresh at different intervals), it takes time for them all to catch up with the change. This is why you might not see your website immediately after you've made changes to its DNS settings, and why sometimes your friend in another country can see the changes sooner or later than you can.

Typically, DNS propagation can take anywhere from a few minutes to 48 hours, depending on various factors including the settings of the DNS servers and how often they are set to update their records.

The propagation process is up to the registrar, and cannot be affected by Bubble.

</details>

## Checking the DNS settings

Bubble lets you check the success of the operation below the records, and you can check the process by clicking on the *Check my settings* button. If you encounter an error, it could indicate that the records have not been configured correctly, or that the changes have not yet propagated through the system. See our [FAQ below](#faq-domain-and-dns) for possible solutions to common errors.

<figure><img src="/files/4Mut1n9OjGOWN3l05eIl" alt=""><figcaption></figcaption></figure>

As soon as a domain is properly configured, all requests to yourapp.bubbleapps.io will automatically be redirected to yourdomain.com. This applies to both the Live and Development anvironment.

## Setting up a subdomain

<details>

<summary>What is a subdomain?</summary>

Imagine a website being like an office building, and the domain name is the building's address. A subdomain is like a specific department or section within that building, with its own unique identifier.

In more technical terms, a domain is the main web address you use to reach a website (like bubble.io). A subdomain is an additional part added to the front of the domain, separated by a dot. For instance, support.yourapp.com could be the subdomain for the customer support section of your main app located on yourapp.com.

This way, you can organize different parts of the app (like having separate areas for blog posts, customer support, legal documentation and product pages), all while still being connected to the main domain.

</details>

If you already are using a domain and would like to use a subdomain to point to your Bubble app (for instance, app.yourapp.com). The steps are mostly identical to the above, with just a few changes:

{% stepper %}
{% step %}

### Register the domain

When you purchase a domain name, you gain the rights to create subdomains within it, and you don't need to buy these subdomains separately.

Subdomains, like `blog.example.com` or `shop.example.com`, are part of the main domain (`example.com`) and can be set up directly through your domain registrar's website.
{% endstep %}

{% step %}

### Add the domain in Bubble

Instead of adding the main domain ( such as `www.example.com`), you enter the URL that includes the subdomain (such as `app.example.com` or `dashboard.example.com).`
{% endstep %}

{% step %}

### Change the DNS settings

After registering the subdomain in Bubble, we will provide you with DNS settings that you need to register with your registrar. Registering them is done in the same way as [described earlier](#step-3.-change-the-dns-settings), but note that the DNS records will be different.
{% endstep %}
{% endstepper %}

## Changing/removing a domain

If you need to change your domain, you first need to remove the current domain. Clicking on 'delete this domain name' will terminate the connection between the application and the domain.

Note that your domain will still point to Bubble's server until you remove the DNS records in the registrar service. A Bubble page will be displayed with a message indicating there is no app linked to this domain. Once you have removed the domain, you can add a new domain as described above.

{% hint style="info" %}
**Browser cache:** Note that if you remove a domain and want to use an appname.bubbleapps.io domain as initially happens, you may have to clear the browser cache, as the redirection is usually cached at the browser level.
{% endhint %}

#### Will a domain change affect uploaded file URLs and dynamic URL expressions?

In short, no.

* **Uploaded files** are stored on S3, rather than the domain directly. The URL remains the same evein if you set, change or disable a custom domain.
* **URL expressions** automatically update to reflect your app's current domain. However, if you have hard-coded your app's domain somewhere, you will need to update it. We recommend using the `This URL` or `Website home URL` data sources instead of manually typing in a domain, to ensure it remains consistent.

## SSL encryption (HTTPS)

{% hint style="info" %}
For all apps created after **October 2019**, TLS is mandatory, and this setting cannot be changed.
{% endhint %}

TLS and SSL are encryption protocols that keep data secure while it's being sent between systems. All apps hosted on Bubble use TLS automatically, and this can't be turned off.

This means any data traveling between the user's device and Bubble's servers, along with related services, is encrypted in transit. Even if a third party were to intercept it, the contents can't be read.

<details>

<summary>What is TLS and SSL?</summary>

*TLS (Transport Layer Security)* and *SSL (Secure Sockets Layer)* are cryptographic protocols designed to provide secure communication over a computer network, such as between the Bubble server and the devices of you and your users.

TLS is the newer version of SSL and offers enhanced security features, but SSL as a term is still often used interchangeably with 'TLS' in everyday language. In practice, SSL is considered deprecated today, and Bubble uses TLS for all connections.

This encryption is applied both to your app and to the Bubble editor, making data secure while it's in transit between the server and device.

</details>

## FAQ: Domain and DNS

<details>

<summary>What is a custom domain?</summary>

A custom domain is your own web address, such as `yourapp.com`, used in place of Bubble's default `yourappname.bubbleapps.io` URL. A custom domain gives your app a professional, branded appearance.

</details>

<details>

<summary>Do I need a paid plan to use a custom domain?</summary>

Yes. Custom domains are available on Bubble's paid plans. The free plan uses the default `bubbleapps.io` subdomain only. See the [pricing page](https://bubble.io/pricing) for current plan details.

</details>

<details>

<summary>Do I have to buy a domain through Bubble?</summary>

No. You purchase the domain separately from a registrar such as GoDaddy, Namecheap, or Google Domains, then point it to Bubble through DNS settings.

</details>

<details>

<summary>Where do I configure my custom domain in Bubble?</summary>

In the *Settings* tab of the editor, under *Domain & Email*. Enter your domain name there and follow the prompts to connect it.

See more in our [guide](#quick-guide-setting-up-a-custom-domain).

</details>

<details>

<summary>How long does it take for a custom domain to start working?</summary>

DNS changes can take anywhere from a few minutes to 48 hours to propagate. In most cases, the domain becomes accessible within a few hours. Note that the timing can vary based on on your device, IP and geographic location.

</details>

<details>

<summary>Why does DNS propagation take time?</summary>

Networks, internet providers, and devices store cached copies of recent DNS lookups to make domain resolution fast. When you make a DNS change, the new information has to wait for those cached copies to expire before it's picked up. This is what causes the delay.

DNS propagation is handled by third parties, and is outside of Bubble's control.

</details>

<details>

<summary>Does Bubble provide an SSL certificate?</summary>

Yes. Bubble automatically provisions and renews an SSL certificate for your custom domain, so your app is served over HTTPS without manual configuration.

</details>

<details>

<summary>Why are my users are getting "This Connection is Not Secure" errors?</summary>

Cloudflare has not validated your domain yet.

If you click on "Advanced" and then look at the certificate details, and the certificate is of the form `ssl123456.cloudflare.net`, your DNS entry is pointing to the correct place, but Cloudflare has not validated your domain yet. Please wait an hour and check again.

</details>

<details>

<summary>How long does it take for my domain to move to Cloudflare?</summary>

Two minutes to several hours, depending on how long your DNS records take to update.

The moment you register your custom domain with Bubble and Cloudflare, your domain is registered with both services. In order for it to work correctly, Cloudflare needs to validate that your DNS entries point to their servers.

When you update your DNS records (adding, removing, or renaming a record), the length of time they stay available is determined by the record's **TTL** (time-to-live) value.

Let's say you change a record at your registrar, and that record has a TTL of 1 hour. After 1 hour, you can be certain that **that** server is reporting your new record to the internet. However, there are many name servers on the internet, and all of them will need to have your most up-to-date record. **On average**, you can expect your records to be broadcast across the internet within twice the length of your TTL. So if your TTL is 1 hour, expect your record to be everywhere after 2 hours.

Once your record has been updated everywhere, Cloudflare will be able to verify that you own the domain, and your app will become active.

</details>

<details>

<summary>How do I know my site is working on Cloudflare?</summary>

There are several tools.

The first, to check to see if your domain records have propagated, is the [Google DNS lookup tool](https://toolbox.googleapps.com/apps/dig/).

When you've changed your domain records, you can go to the A record tab to check to see if your A record has propagated.

```
mywebpage.us. 299 IN A 104.19.241.93
mywebpage.us. 299 IN A 104.19.240.93
```

You can also take advantage of a service like [What's my DNS](https://www.whatsmydns.net), which tests your custom domain from many locations all over the world. It's not uncommon to see a few blank entries on this page; what you're looking for is any records that return an error (red X) or different results than you are expecting.

Cloudflare serves a page on a certain route on every site hosted on their domain at `/cdn-cgi/trace`. You can see bubble's page at [bubble.io/cdn-cgi/trace](http://bubble.io/cdn-cgi/trace); replace 'bubble.io' with your own custom domain (once it loads) to see if it's working.

The output should look somewhat like this:

```
fl=xxxxx
h=bubble.io
ip=xxx.xxx.xxx.xxx
ts=1572657558.41
visit_scheme=http
uag=Mozilla/5.0 [...]
colo=EWR
http=http/1.1
loc=US
tls=off
sni=off
warp=off
```

</details>

<details>

<summary>I am a legacy customer; what should I do to temporarily disable Cloudflare?</summary>

If you're having problems that you think might be caused by Cloudflare, you can temporarily disable Cloudflare by changing your DNS records from `A 104.xxx.xxx.xxx` to the A record you were previously assigned.

When you've identified what the problem was and are ready to turn Cloudflare back on, delete the A record and replace it with the A records Bubble provides.

</details>

<details>

<summary>Can I use a subdomain instead of a root domain?</summary>

Yes. You can connect a subdomain such as `app.yourapp.com` or `dashboard.yourapp.com`. The DNS records to configure are shown in the Bubble editor.

</details>

<details>

<summary>I'm getting 1001 errors.</summary>

Verify your A records, wait two hours, and check again.

Cloudflare has to verify that your A records are pointing to Bubble's IPs. If you're sure your A records are correct, Cloudflare will schedule a re-check of your records for several days (starting at 1 minute intervals, increasing to a maximum of 2 hours between checks). If, after 2 hours, your site is still showing 1001 errors, go to Bubble, delete your custom domain, wait one minute, and re-create it.

</details>

<details>

<summary>I am getting 1014 errors</summary>

If you're using Cloudflare for DNS, turn off proxying.

The most common cause of 1014 errors is when you're using Cloudflare for DNS, and you're using an "orange cloud" (proxy) setting. Click the orange cloud to turn off proxying (resulting in a grey cloud).

</details>

<details>

<summary>I'm getting 525 errors on my site.</summary>

Wait an hour and check again.

If you are a legacy customer who wasn't using SSL prior to switching over to Cloudflare, some of Bubble's servers won't have your updated certificate available to them. A 525 error happens when the Origin Server (where your app is hosted on Bubble) serves non-secure content (http) to a server that is expecting secure content (https).

We refresh your SSL and certificate settings on all servers once per hour, so if you've recently changed your settings wait and try again.

</details>

<details>

<summary>I've followed all the instructions here, and I still get "This Connection is Not Secure."</summary>

It's possible that we cannot issue SSL certificates on your domain. You will have to remove your CAA record and try again.

Go to the Google DNS lookup tool's [CAA tab](https://toolbox.googleapps.com/apps/dig/#CAA/) and check to see if your bare domain (e.g. `example.com`) has a CAA record. A CAA record restricts which certificate providers can issue certificates for your domain. (Only about 1% of Bubble apps have a CAA record.)

For instance, when you look up `google.com` with this tool, you can see the following record:

```
id 61662
opcode QUERY
rcode NOERROR
flags QR RD RA
;QUESTION
google.com. IN CAA
;ANSWER
google.com. 21599 IN CAA 0 issue "pki.goog"
;AUTHORITY
;ADDITIONAL
```

This means that *only* `pki.goog` is allowed to issue certificates for sites across the `google.com` domain.

SSL Certificate issuance is a critical part of making your site work on Bubble and Cloudflare, so if you find a CAA record, delete it. Your site should begin working in a matter of minutes.

</details>

<details>

<summary>Can I use multiple custom domains with the same app?</summary>

Each Bubble app supports one primary custom domain. To use additional domains, you can set up redirects through your domain registrar or DNS provider.

</details>

<details>

<summary>What happens to the default bubbleapps.io URL after I set up a custom domain?</summary>

The default URL continues to work alongside your custom domain.

</details>

<details>

<summary>Can I send emails from my custom domain?</summary>

Yes. Once a custom domain is set up, you can configure email sender addresses in the *Domain & Email* section of the *Settings* tab. Emails can then be sent from addresses such as `support@yourdomain.com` instead of the default Bubble address.

</details>

<details>

<summary>What if my domain isn't working after I set it up?</summary>

Common causes include DNS records that haven't propagated yet, incorrect values, or conflicting records left over from a previous setup. A tool like [dnschecker.org](https://dnschecker.org) can help you confirm that the records are pointing to the correct values. If the issue continues, contact your registrar or Bubble's Success team.

</details>

<details>

<summary>Can I change or remove my custom domain later?</summary>

Yes. You can update or remove your custom domain at any time in the *Domain & Email* section of the *Settings* tab. Changes take effect once DNS updates have propagated.

</details>

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to set up a custom domain](https://www.youtube.com/watch?v=vGk6nfq41L4)

</details>

<details>

<summary>Relevant articles</summary>

[What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

Since the loading of a web page is technically one or more API calls between the server and device, this section on APIs covers the technical basics of what's going on in during a requests and response.

</details>

[^1]: In Bubble, you have the flexibility to run your app in two distinct environments: Development and Live.

    The Development environment serves as a sandbox, allowing you to make changes and preview your app without affecting the live version.

    The Live environment is what your end-users interact with.

    Notably, each environment has its own separate database, ensuring that data in development does not mix with live data.

    For enhanced collaboration among teams, Bubble offers the ability to create additional custom branches.

    Learn more about this feature in the following article:

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)

[^2]: A registrar in this context is a company or organization accredited by the Internet Corporation for Assigned Names and Numbers (ICANN) or a national country code top-level domain (ccTLD) authority to register and manage domain names.

    Registrars provide services to the public that allow them to purchase and register domain names.

[^3]: A DNS server is like a phone book for the internet. It translates website names that we humans understand (like [www.bubble.io](http://www.bubble.io)) into numbers (called IP addresses) that computers understand, so your computer can find and connect to the right website.\
    \
    This is how your user's browsers finds its way to the Bubble server when they type in the URL of your app.\
    \
    In the context of your registrar, the DNS settings are needed to instruct the name server that the selected domain should lead to your Bubble app.

[^4]: This means that the '@' symbol is used instead of a blank space to refer to the root domain.

    For example:\
    Name: ""

    Value: 104.16.36.10\
    \
    Would instead be set up as:\
    Name: "@"

    Value: 104.16.36.10
