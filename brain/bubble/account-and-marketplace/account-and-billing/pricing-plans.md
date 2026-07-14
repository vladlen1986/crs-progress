# Pricing and plans
> Source: https://manual.bubble.io/account-and-marketplace/account-and-billing/pricing-plans · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Bubble's pricing plans and how workload usage is calculated

Bubble offers flexible pricing plans that grow with your app. Whether you’re building for web, mobile, or both, plans are selected at the [*project level*](#user-content-fn-1)[^1], meaning one plan covers everything inside that project—including any web or mobile apps that share data[^2], workflows[^3], and infrastructure.

### Tiers

Each plan is available in one of four tiers, designed to meet different needs:

* **Starter** gives you everything you need to go live, including [custom domains](#user-content-fn-4)[^4], ability to deploy to the web or app stores, and [backend workflows](#user-content-fn-5)[^5].
* **Growth** adds more workload[^6], more live versions, and more control over how you develop and deploy.
* **Team** is designed for collaboration, higher app usage, and more advanced features.
* **Enterprise** offers custom infrastructure, advanced security, and scalability tailored to your organization.

### Plan types

There are three plan types:

* **Web only**: Designed for apps that run entirely in the browser
* **Mobile only**: Built for native mobile apps published to the app stores
* **Web + Mobile**: Supports both web and mobile apps in a single project with shared backend logic

If your apps are in separate projects, each project will need its own plan. If they’re in the same project, you’ll choose a single plan that covers both platforms.

{% hint style="success" %}
For the most up-to-date information on how mobile pricing works—including plan behavior, opt-in flows, and deadlines—see our [official announcement](https://bubble.io/blog/native-mobile-pricing-2025/) and [FAQ in the Bubble forum](https://forum.bubble.io/t/mobile-plan-opt-in-starts-september-2/379017).
{% endhint %}

### Choosing the right plan

The best plan depends on what you’re building and where you are in your development journey.

If your app is browser-based, a Web only plan is the right place to start. If you’re focused on building a native app and publishing it to app stores, choose a Mobile only plan. If you’re doing both—and especially if your web and mobile apps share data and workflows—go with a Web + Mobile plan. Then, consider your [tier](#tiers).

Let us know if you need help picking the right plan or want to compare options—we’re here to help.

#### Agency plan

If you’re an agency building apps for clients, the [Agency plan](#user-content-fn-7)[^7] gives you full access to both web and mobile features during development. When your project is ready to go live, just transfer it to a client plan to enable deployment and app store publishing.

## Trial

The 14-day free trial for Bubble's Starter plan offers new users an opportunity to explore the platform's features. This guide explains how you can activate the trial, its eligibility conditions, and key limitations, including alternatives if the trial period ends.

* The free trial is exclusively available for new apps created in Bubble.
* Once activated, users have 14 days to test the features of the Starter plan.
* If not canceled before the end of the trial, the subscription automatically transitions to a paid Starter plan.- Subscriptions in Bubble are managed on a per-app basis, meaning each app must have its own trial or paid plan.

### Starting a trial

Navigate to your app editor and go to Settings.

{% stepper %}
{% step %}

### Go to app settings

Open up the editor for the app you want to start the trial on, and go to *Settings – My plan.*
{% endstep %}

{% step %}

### Select the 2-week trial

Click *Change plan*, and select the option to start the 2-week trial.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**Note:** You must initiate this process within 10 days of creating a new app for the trial to be available.
{% endhint %}

{% hint style="warning" %}
During the activation process, Bubble will perform a $1 pre-authorization check on your credit card for validation purposes. This is a **temporary hold,** not a payment, and it will expire within 5-10 business days, depending on your bank.
{% endhint %}

## Pricing

All plan types are available in monthly or annual billing options. Prices are listed per month.

### Paid **annually**

| Plan    | Web only | Mobile only | Web + Mobile |
| ------- | -------- | ----------- | ------------ |
| Starter | $29      | $42         | $59          |
| Growth  | $119     | $169        | $209         |
| Team    | $349     | $449        | $549         |

### Paid monthly

| Plan    | Web only | Mobile only | Web + Mobile |
| ------- | -------- | ----------- | ------------ |
| Starter | $32      | $49         | $69          |
| Growth  | $134     | $199        | $249         |
| Team    | $399     | $529        | $649         |

## Mobile plans

### At what stage do I need a mobile plan?

If you have a live mobile app or are ready to deploy one to live, you need a mobile plan:

<table><thead><tr><th width="542.90625">Stage</th><th>Mobile plan needed?</th></tr></thead><tbody><tr><td>Building and testing a mobile app</td><td>No (free)</td></tr><tr><td>Deploy mobile app to live for testing on TestFlight and Google Play</td><td>Yes</td></tr><tr><td>Deploy mobile app to live</td><td>Yes</td></tr><tr><td>Publish mobile app to app stores</td><td>Yes</td></tr></tbody></table>

### Mobile features

Mobile plans support the full lifecycle of native app development and publishing. With a Mobile or Web + Mobile plan, you can:

* Create and test production ready app builds for iOS and Android
* Publish to the Apple App Store and Google Play Store.
* Use **multiple live mobile versions**, allowing you to submit new builds while keeping older versions running.
* Push [**OTA (over-the-air) updates**](#user-content-fn-8)[^8] to fix bugs and update static content—without resubmitting a new build[^9].

{% hint style="warning" %}
To keep a mobile app live and deployable, it must be on a paid Mobile or Web + Mobile plan. If you remove your mobile plan, any live versions will be paused until the plan is reinstated. After 14 days, a new build will be required.
{% endhint %}

### Build allotments

A build is the process of generating the files needed to publish[^10] your app to the Apple App Store or Google Play. Each plan includes a set number of builds, since this process involves a cost in platform resources.

You get extra builds within the first 3 months of your subscription date to help with your initial launch. After that, you can always upgrade to a higher plan to support more mature apps that require frequent updates.

{% hint style="info" %}
Failed builds and required builds due to Bubble native code updates we make don’t count against your limit.
{% endhint %}

<table data-full-width="false"><thead><tr><th width="382.265625">Mobile supported plan</th><th width="82.9453125">Free</th><th width="97.46484375">Starter</th><th width="105.64453125">Growth</th><th>Team</th></tr></thead><tbody><tr><td>Build allotments (first three months)</td><td>No</td><td>10</td><td>15</td><td>25</td></tr><tr><td>Build allotments (after three months)</td><td>No</td><td>5</td><td>10</td><td>20</td></tr></tbody></table>

{% hint style="warning" %}
If you are on the Enterprise plan, please reach out to your Account Manager.
{% endhint %}

### Multiple live versions

Bubble manages concurrent live versions of your mobile app on your behalf. This allows you to deploy new versions of your mobile app without worrying about backwards compatibility or breaking existing versions while a new version is under review.

Each plan supports a different number of live versions (see below). When you hit your limit, you’ll need to deprecate an older version or upgrade your plan. If you accidentally remove a version, you can reach out to support to recover it within 14 days.

<table data-full-width="false"><thead><tr><th width="314.77734375">Mobile supported plan</th><th width="83.19921875">Free</th><th width="101.953125">Starter</th><th width="109.95703125">Growth</th><th>Team</th></tr></thead><tbody><tr><td>Multiple live versions</td><td>No</td><td>3</td><td>5</td><td>8</td></tr></tbody></table>

{% hint style="warning" %}
If you are on the Enterprise plan, please reach out to your Account Manager.
{% endhint %}

## Plan management

You can manage your plan in the *Settings – My plan* tab of the Bubble editor. From there, you can:

* Upgrade or downgrade your current tier
* Switch between Web, Mobile, and Web + Mobile
* Change your billing cycle (monthly or annual)
* Cancel or adjust your plan as your needs evolve

### Moving from a web + mobile plan to web-only or mobile-only

To move from a Web + Mobile plan to a Web-only or Mobile-only plan, you’ll first need to downgrade the platform you no longer need to the Free plan. Then you can optionally choose to move to a different tier or stay on the same tier you were on before. By default, the project will switch to the plan type that supports only the app you chose to keep live, and it will remain on the same tier unless you make changes.

Free trials may be available depending on eligibility and platform. You can start a trial during onboarding or from the pricing page. If you change your plan during a trial, the trial will end immediately and billing for the new plan will begin.

## Workload units <a href="#workload-units" id="workload-units"></a>

Each plan includes a number of monthly workload units, which is shared across both platforms. In essence, workload is a measure of the work that Bubble does in order to power your application. Each time your app is tasked with processing an action – such as loading a page and querying your database – it contributes to your monthly workload consumption.

For example, as a user interacts with your app - opening it, navigating through it, and performing various tasks - a number of different things could take place:

* The app may need to retrieve data from a database to display on the screen
* It may need to run some workflows to complete the user's request and create
* Additional web requests might be made to third-party APIs to fetch or send data
* The server may need to process payments or authenticate user login credentials
* Images, videos, and other media may need to be uploaded

There are 12 different activity types that together make up the amount of work performed by Bubble to keep your app running. We track the total workload your app consumes over the course of one month, and then reset the count for each new month. Because every app is unique, workload is a use-case agnostic metric that enables you to scale your app based on actual consumption.

{% hint style="info" %}

### **Learn more about workload**

Workload represents the server resources needed to host, run, and scale apps built on Bubble. It aggregates how much server resources is needed for different processes. The amount of workload an app consumes is measured in **workload units (WU)**. Article: [What is workload?](https://manual.bubble.io/help-guides/workload)
{% endhint %}

### Workload tiers <a href="#workload-tiers" id="workload-tiers"></a>

Most apps can operate just fine on the workload units included in their plan, but if your app requires more workload than what is included in the Starter, Growth, or Team plan, you can purchase a workload tier to add additional units.

Workload tiers are usually not necessary until your app is launched to the public. For instance, a workload tier may become necessary when you begin to grow your user base, work on larger volumes of data running and/or frequently communicating with external APIs.

This way:

* Workload tiers are offered with volume discount, meaning you can lock in a number of units at low cost.
* There’s no need to upgrade your plan – for example, you could stay on the Starter plan if you don’t need any of the advanced features on the Growth or Team plans, and at the same time, you could add a workload tier to scale your app.

<figure><img src="/files/FkXdTPCSjZbfogJhnLNM" alt=""><figcaption></figcaption></figure>

### Overages <a href="#overages" id="overages"></a>

In addition to pre-purchasing workload, we allow apps to accrue flexible overages so that your app stays available if it exceeds its monthly workload allotment. Flexible overages are charged at a unit price applied to each additional 1000 workload units needed to cover the extra work required.

This way:

* You only pay for the actual consumption
* Your app can handle overages with no delays or outages
* There’s no need to upgrade your plan for spikes in workload. You can make an informed decision about upgrading when the time is right.

Flexible overages can be enabled and disabled at any time. To disable flexible overages, go to Settings - App plan and uncheck *Enable overages.*

#### **Overage notifications**

You will receive an email notification when your app has reached 75% of its available workload units, to give you ample time to evaluate your options, including upgrading your plan, buying a workload tier, or enabling or disabling flexible overages.

You will also receive an email notification when your app has reached 100% and overages will kick in.

#### Measuring workload <a href="#measuring-workload" id="measuring-workload"></a>

To help you understand and analyze workload, we provide analytics tools that give you insights into the various processes and activities that contribute.

Bubble's workload charts provide reports that offer a view of your app's total monthly workload, as well as the ability to drill into individual processes, down to specific searches, workflows, API requests and expressions.

While Bubble has you covered with flexible overages when heavy processing is needed, the best user experience and most cost-efficient operation will always come from building with performance in mind. We encourage you to use our workload reporting tools actively while designing and maintaining your app to identify areas for improvement.

{% hint style="info" %}
**How to use the App Metrics dashboard:** To learn more about how to use the App Metrics to drill down into your app’s workload activities, check out the article below: Article: [Using App Metrics](https://manual.bubble.io/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics)
{% endhint %}

## Add-ons <a href="#add-ons" id="add-ons"></a>

Regardless of its plan, you can also add add-ons that add functionality or extra resources to your app.

### **Plugins**

Plugins extend the functionality of your app by providing features and elements that go beyond Bubble’s core capabilities. Plugins can add new elements, actions, data sources and API connections and are made both by Bubble and by independent developers. Here's a breakdown of how plugins are priced:

* **Free:** Many plugins are offered for free
* **Monthly subscription:** some plugins require a monthly subscription
* **One-time payment:** some plugins require a one-time payment

Numerous paid plugins offer the option to pay a monthly subscription or a one-time payment. Note that certain plugins may rely on external API services that may incur additional costs beyond Bubble's pricing structure.

You can check out Bubble's plugin store in the link below:

[Plugin store](https://www.bubble.io/plugins)

### **File storage**

All plans include an amount of file storage space. However, if your app requires more than what is included in the plan, you can purchase additional storage.

Storage costs are $3 per month for 100 GB.

### Bandwidth <a href="#bandwidth" id="bandwidth"></a>

Each plan also comes with bandwidth, measured by the total monthly bandwidth used to serve your application over the internet.

| Plan    | Bandwidth |
| ------- | --------- |
| Free    | 1 GB      |
| Starter | 100 GB    |
| Growth  | 500 GB    |
| Team    | 1 TB      |
| Agency  | 1 GB      |

[^1]: Your plan applies to a single project (web, mobile, or web + mobile), not your entire account.

[^2]: Each project includes its own database, shared across both web and mobile apps within that project.

    Article series: [The database](/help-guides/data/the-database)

[^3]: Workflows define the logic of your app—what happens when a user clicks a button, submits a form, or triggers an event.

    Article series: [Workflows](/help-guides/logic/workflows)

[^4]: A custom domain is a personalized web address for your app (like `yourapp.com`) instead of the default `bubbleapps.io` URL.

    Article: [Connecting your app to a custom domain](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns)

[^5]: Backend workflows run behind the scenes on the server. They’re used for tasks like processing data, sending emails, or scheduling actions—without needing user interaction.

[^6]: Workload measures the resources your app uses—like running workflows, loading data, or making API calls. It's used to track usage across web and mobile apps.

    Article section: [Workload units](#workload-units)

[^7]: The Agency plan is designed for Bubble freelancers and agencies building apps for clients. It gives full access to web and mobile features during development, but live deployment and publishing require the app to be transferred to a client’s paid plan.

[^8]: Changes pushed to your app without submitting a new build to the app stores. Users see updates automatically when they reopen the app.

[^9]: A packaged version of your app prepared for submission to the Apple App Store or Google Play.

[^10]: For more information about publishing your app, see our in-depth article series on the subject.

    Article series: [Publishing a native mobile app](/help-guides/publishing-your-app#publishing-a-native-mobile-app)
