# Workflow API endpoints
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-endpoints · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to identify the correct endpoint for a given API Workflow

<details>

<summary>Help us improve this article</summary>

This article is part of a significant update to the Bubble manual and your feedback is critical to our efforts to continuously enhance our written documentation.\
\
We would greatly appreciate if you could take a moment to let us know your thoughts on the quality of it. Thank you for your support!\
\
[Give feedback on this article](https://docs.google.com/forms/d/e/1FAIpQLSfe7eaYVxkqTa_nn3QE6VObCxWB1hgh6sHUQGQ0Eit8JlAS7g/viewform?usp=pp_url\&entry.619913899=https://manual.bubble.io/help-guides/apis-connect-to-other-apps/the-bubble-api/the-workflow-api/workflow-api-endpoints\&entry.80834677=Workflow+API+endpoints)

</details>

## The root URL

To find your application's Workflow API root URL, go to *Settings - API*.

<figure><img src="/files/JxCu3FHh7z9wbHxYn3um" alt=""><figcaption><p>As soon as you have activated the Workflow API Bubble will reveal the root URL.</p></figcaption></figure>

## Constructing the complete URL

{% hint style="info" %}
Keep in mind that each branch in your app (including custom branches) have a separate root URL. The Main branch always has the ID version-test.\
\
Remember to update the external call to reflect which branch you want to send the request to.
{% endhint %}

The complete endpoint URL consists of the root URL combined with the name of the Workflow you want to access.

<figure><img src="/files/c7aUrfeYq3k9eHeAjnBK" alt=""><figcaption></figcaption></figure>

For example, the URL of the API Workflow in the image above would be:

### No domain connected

```url
https://my-bubble-application.bubbleapps.io/version-test/api/1.1/wf/url-friendly-name
```

or for Live:

```
https://my-bubble-application.bubbleapps.io/api/1.1/wf/url-friendly-name
```

### Domain connected

```url
https://www.mydomain.com/version-test/api/1.1/wf/url-friendly-name
```

or for Live:

```
https://www.mydomain.com/api/1.1/wf/url-friendly-name
```
