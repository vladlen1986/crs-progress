# Plans and billing
> Source: https://manual.bubble.io/account-and-marketplace/account-and-billing/pricing-plans/plans-and-billing · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to manage your plan, workloads, payments and invoices

{% hint style="info" %}
In the event of any discrepancies with this article, <https://bubble.io/pricing> and <https://bubble.io/terms> are the authoritative sources on the topics covered.
{% endhint %}

## Managing your plan

You can subscribe to a paid plan and manage the plan that you are on in the *Settings - My plan.*

Bubble's pricing structure comprises various plans, from the free tier to customized enterprise solutions. Each plan caters to different stages of your app's life cycle, providing progressively advanced tools for collaboration, data processing, log retention, and backups.

Each plan is connected to a single application, allowing you to work on multiple projects at different development stages. You have the option to pay monthly or annually, and you can switch between the two whenever you like.

### Modifying a plan

You can change your plan at any time during the period. When switching between paid plans, the features of the new plan become instantly available, and the cost is prorated. A credit for the unused days from the previous plan will be automatically applied to your Bubble account, and you'll be charged for the corresponding days on the new plan.

Both of these calculations – remaining time and unused time – will appear on your next Bubble invoice.

### Canceling a plan

You have the flexibility to cancel your plan at any point. Here are a few key points to remember:

* **Plans stay active through the end of the billing cycle:** Your plan will stay active through the end of your billing cycle, meaning your app will stay live (if you’ve already published it) and will consume workload units.
* **Workload consumption:** If overages[^1] are enabled on your application, you will be responsible for any overages accrued after canceling your application and before the end of your subscription period. To avoid overages, disable overages in Settings[^2].
* **Workload tiers:** you can't buy [workload tiers](#workload-tiers) after your plan is cancelled.

For cancellation, you can either use the [app editor settings](#canceling-a-plan-in-the-app-editor) page or our [AI-powered bot](#cancel-a-plan-through-the-bubble-support-bot) for assistance.

#### Canceling a plan in the app editor

To cancel a plan in your app's editor, follow these steps:

1. Navigate to the *Settings* tab, and the *My plan* sub-tab.
2. From there, you can cancel in one of two ways:
   1. Click *Cancel plan* on your current plan option.
3. Open your app’s editor, click on Settings, then on the My Plan tab. From there, you can cancel one of two ways:
   1. Click *Cancel pla*n on your current plan option.\
      ![](/files/I8PZeDcCsYnW2vn9Ardk)
   2. **OR** - Click on the *Change Plan* button, then click the *Select* button on the Free plan, fill out the required fields in the cancellation popup, and click on the button at the bottom of the popup to confirm.

#### Cancel a plan through the Bubble support bot

{% hint style="warning" %}
**Logged in:** ensure you are logged into the Bubble account that owns the app in question. This step is necessary for the chat bot to recognize the app and check that you are authorized to cancel it.
{% endhint %}

1. Make sure you're logged into your [bubble.io](https://bubble.io/) account, then open the bot by clicking on the conversation icon at the bottom right-hand side of any [bubble.io](https://bubble.io/) page. Look for this symbol:<br>

   <figure><img src="/files/EG8MD7EOBwtevzbHvXY6" alt="" width="85"><figcaption></figcaption></figure>
2. Ask to cancel your plan or subscription.
3. Follow the prompts from there to allow the bot to automatically cancel your subscription for you.

### Transferring a plan

When multiple users have admin privileges on an app, any of them can assume responsibility for the app's plan payments. If a transfer takes place, the new paying user's card will be charged immediately.

{% hint style="info" %}
The person you are transferring the app to must be a registered Bubble user prior to the transfer taking place.
{% endhint %}

To transfer an app:

1. Go to *Settings - Collaboration*
2. Under *Invite a user,* type in the email of the user you want to transfer to
3. Click the *Transfer* button

<figure><img src="/files/P5iQrWN2ebhF40cO4wZA" alt=""><figcaption></figcaption></figure>

## Free trial

The 14-day free trial for Bubble's Starter plan offers new users an opportunity to explore the platform's features. You can read more about free trials [here](/account-and-marketplace/account-and-billing/pricing-plans#trial).

When starting a trial, note the following:

* **Trial period:** The trial period starts immediately when the trial is activated, regardless of whether you've used the Bubble editor during that time.
* **Conversion to paid plan:** If not canceled before the end of the trial, the subscription automatically transitions to a paid Starter plan.
* **Refunds:** Bubble doesn't offer refunds for trial periods that have converted to a paid subscription, regardless of whether you've used the Bubble editor during that time. This is because paid plans allocate resources for the whole billing period, even when usage is low. You can read more about Bubble's refund policy [here](#refund-policy), and in our [terms](https://bubble.io/terms).
  * **Cancellation:** You can cancel the subscription at any point during the trial to prevent the first charge from occurring.

## Additional workload

{% hint style="info" %}
You can read more about the difference between Workload tiers and overages in our main pricing article.

Article: [Pricing plans](/account-and-marketplace/account-and-billing/pricing-plans)
{% endhint %}

### Workload tiers

If your app needs more workload than your current plan provides, you can purchase a workload tier for additional units. Reach out to our [Sales team](https://bubble.io/contact-sales) for custom pricing for apps with high workload unit consumption.

<figure><img src="/files/9FCrn0ADrbtKju1Pp8xu" alt=""><figcaption></figcaption></figure>

### Overages

In addition to pre-purchasing workload, we offer flexible overages, ensuring your app remains accessible even if it surpasses its monthly workload allotment. Flexible overages are charged at a unit price for each additional workload unit.

Flexible overages can be enabled or disabled at any time. To disable them, navigate to *Settings - App plan* and uncheck *Enable overages*.

## Payment

### Payment methods

Bubble accepts major credit and debit cards (see Stripe's [information](https://support.stripe.com/questions/which-cards-and-payment-types-can-i-accept-with-stripe) for more details)

* Visa
* MasterCard
* American Express
* JCB
* Discover
* Diners Club

### Invoices

You can find your invoices in the Account Page, where you also have the option to define your business name and address. If you update your business name or address, you can download an updated version of your invoices reflecting these changes.

You can also opt to have invoices emailed to your registered email address. Check *Email every invoice* to enable this.

<figure><img src="/files/qYJ3BZzJhpoah5qIXGHb" alt=""><figcaption></figcaption></figure>

### Declined payments

Bubble relies on an external service, Stripe, to process credit card transactions.

Declined payments can occur for several reasons:

* **Insufficient funds:** Make sure your card has enough balance to cover the transaction. Even small authorization charges, such as $1, can fail if funds are insufficient.
* **Incorrect payment details:** Double-check your card number, expiration date, CVV, and billing address.
* **Bank restrictions:** Your bank may block transactions for security reasons, especially international or online payments.
* **3D Secure (3DS) not enabled:** Some transactions require 3DS authentication to process successfully.
* **Regulatory restrictions:** For example, Indian users may face issues due to Reserve Bank of India (RBI) guidelines, which require additional approval for auto-renewable transactions.
* **Fraud protection systems:** Repeated failed attempts can trigger fraud detection systems, leading to automatic declines.

#### Resubscribing after a canceled subscription

If your Bubble subscription has been canceled, it’s not possible to retry manual payments for the previous subscription period. To continue using Bubble services, follow these steps:

1. **Resubscribe to Bubble:** Begin a new subscription for the desired plan.
2. **Proceed with payment:** After resubscribing, you can proceed to pay for the new subscription period.

This applies even if you had a canceled subscription due to past payment issues. The system requires you to start a fresh subscription to continue access.

#### Resolving blocks caused by failed card payments

* **Remove and re-add your credit card:** Log into your Bubble account and remove the existing card. Re-add the same card to trigger a $1 authorization charge, which clears the failed payment record.
* **Verify the authorization:** Make sure the $1 authorization charge succeeds to reset your card's status. Once verified, try subscribing or upgrading again.
* **Use a different payment method:** A new or different credit card can bypass restrictions tied to the original one.
* **Validate your card:** If you see errors after adding a card, make sure it's been validated.
* **Check for card type restrictions:** Prepaid and gift cards aren't accepted for recurring payments. Use a debit or credit card from a provider like Visa or Mastercard.

#### Contacting your bank

Contacting your bank is sometimes necessary to resolve authorization blocks. Inform them that the payment is for Bubble Group, Inc., and ensure your card supports international and recurring payments. Additionally, confirm with your bank that 3D Secure (3DS) is active on your card and enable online and international transactions if they are disabled.

If the transaction was declined with a specific code, such as '`do_not_honor`,' ask your bank to authorize the payment. If you continue to face issues, inquire about any fraud protection systems or restrictions that may be causing the decline and request their removal.

#### Special cases

Sometimes, blocks happen because of very specific circumstances:

* **Indian users and RBI regulations:** Due to RBI regulations, Indian users cannot activate free trials but can subscribe to the Starter plan after following the RBI process.
* **Stripe fraud system:** Declines may result from how Stripe and your bank’s fraud systems evaluate risk. Contact your bank to resolve flagged transactions.

### Refund policy

Bubble's general policy is that subscription plans and associated charges are non-refundable. Any paid month can't be refunded or credited back to your account, including charges from a free trial converting to a paid subscription.

#### Free trials

Note that 14-day free trials automatically convert to paid subscriptions unless canceled beforehand. Pre-authorization checks may occur, and cancellation is required to prevent unexpected charges, as outlined in our [Terms of Service](https://bubble.io/terms). For billing discrepancies, contact [Bubble Support](https://bubble.io/contact) promptly with all relevant details to help us review the request.

## Discounts

We extend a 30% discount for students, educators, and non-profits, applicable with appropriate documentation.

To get this activated on your account, please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team.

{% hint style="warning" %}
Discounts cannot be applied retroactively, cannot be applied to Enterprise plans, cannot be applied to workload tiers 3-4, and cannot be combined with other discounts such as Referral or Affiliate credits
{% endhint %}

[^1]: In addition to pre-purchasing workload, we allow apps to accrue flexible overages so that your app stays available if it exceeds its monthly workload allotment.\ <br>

    Article section: [Pricing and plans](/account-and-marketplace/account-and-billing/pricing-plans) | [Overages](/account-and-marketplace/account-and-billing/pricing-plans#overages)

[^2]: Go to *Settings - App plan* to change overage settings.

    Article section: [Pricing and plans](/account-and-marketplace/account-and-billing/pricing-plans) | [Overages](/account-and-marketplace/account-and-billing/pricing-plans#overages)
