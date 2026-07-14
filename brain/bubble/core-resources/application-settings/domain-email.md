# Domain / email
> Source: https://manual.bubble.io/core-resources/application-settings/domain-email · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for all experience levels<mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (4)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### The Bubble editor

* Article: [Setting up a custom domain](broken://pages/Sfb2EVgX6WfgYIibQCNa)
* Article series: [The Bubble editor](/help-guides/getting-started/navigating-the-bubble-editor)
  * Article: [The Settings tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab)

***

#### Sending emails

* Article series: [Email](broken://pages/-MUUNYlJhe5tqMARhsWS)
  {% endtab %}

{% tab title="Videos (1)" %}

* [Setting up a custom domain](https://www.youtube.com/watch?v=vGk6nfq41L4)
  {% endtab %}
  {% endtabs %}

## Domain setting

### Use CloudFlare

If you set your app to use a domain before October 2019, you can check this box to toggle CloudFlare on or off.

Enabling CloudFlare requires changing DNS entries at your domain registrar, and may incur a few minutes downtime.

If you use a bare domain (of the form mydomain.com, as opposed to [www.mydomain.com](http://www.mydomain.com) or app.mydomain.com) and you wish to keep your existing domain record, ensure your registrar supports ALIAS or ANAME records, or bare domain CNAME records, **before** toggling this checkbox.

## Email settings

### Sendgrid key

Enter your [Sendgrid](https://app.sendgrid.com/) key to send emails from your domain. If you do not add your key, emails will be sent from \[your-appname]<-no-reply@bubbleapps.io>. Generate your key at <https://app.sendgrid.com/settings/api_keys>. Make sure the key has the Send Mail permission. After you enter a key, click "Check Sendgrid key" to receive a test email.

### Sendgrid Template ID

Sendgrid allows you to define templates to use when sending emails. When you build a template, add the template ID here, and it will be applied to all emails sent by the app. This is compatible with legacy and dynamic Sendgrid templates.

Bubble currently allows you to replace the body of the email with the template style only for [legacy Sendgrid templates](https://sendgrid.com/templates). Templates should contain a single "<%body%>" (without the quotes) field, which will be replaced by the content of the email defined in your actions.

Note: This is optional. Without a template, the email will be exactly what you typed in the Body field.

### Admin email

When the app sends an email, it uses a generic email with your domain name, "<admin@your_domain.com>".

{% hint style="info" %}
**Tip:** Because of Sendgrid's security measures, the email "<admin@your_domain.com>" has to be verified in your Sendgrid dashboard, otherwise the validation won't work. You can find their verification requirements [here.](https://sendgrid.com/docs/for-developers/sending-email/sender-identity/)
{% endhint %}

Note: This option is only available to users with a paid Bubble plan and domain.

### Sender name

Define here the name you want to display when you send an email, which will appear email clients show as "My Name" . When the sender name is defined at the action level, this sender name will be used.

### Redirect all requests to the domain

When the app has a domain, it will be accessible both at appname.bubbleapps.io and yourdomain.com. To redirect all appname.bubbleapps.io to yourdomain.com, for SEO purposes for instance, check this box.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
