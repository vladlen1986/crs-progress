# Versions
> Source: https://manual.bubble.io/core-resources/application-settings/versions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Bubble release tier

The Bubble platform is continuously advancing. On any given workday, multiple updates are rolled out, encompassing bug fixes, system enhancements, new features, and more. Every app operates on a specific "release tier," determining when it benefits from these updates to the Bubble framework.

### Immediate release (default)

By default, any such Bubble code rollout will get immediately applied to all Bubble apps - we call this **"immediate release"**.

Note that occasionally, a change in the Bubble platform will be labeled a breaking change from before, a situation which creates a new "Bubble engine version". This means that we are changing the behavior of an existing Bubble feature in a way that we think is an improvement (usually this is in the context of a bug fix), but because existing apps may be relying on the old behavior, we do not want to forcibly upgrade all apps to the new code.

In these situations, apps can control when this new particular behavior is applied via Settings > Versions. This way, you can upgrade Bubble version on your development version when convenient for you and test out the impact of that change. When your app on the new Bubble version looks good to you, you can deploy to live just like any other change to your app. In other words, upgrading the Bubble version of your development version does not automatically upgrade the Bubble version of your live version - you must deploy.

If an app is on an older Bubble version (i.e. any version that's not the latest one), it will still receive any code updates that are rolled out since the breaking change, just not the breaking change itself (or any future breaking changes).

### Scheduled release

Apps on the Professional plan and above can elect to receive Bubble engine updates a bit of time after they are rolled out. This setting is in Settings > Versions and is called **"scheduled release"**. On scheduled release, the app will not get Bubble engine updates immediately. Rather, apps on scheduled release will all get Bubble updates once a day (in the morning ET, though the exact time each day may vary), *only if* the Bubble codebase has not changed for a certain number of hours. This once-a-day update will contain all the platform updates since the last scheduled release. Note that some days, this release may not happen at all.

This feature can be useful for app creators that would rather not receive Bubble engine updates immediately because they want to reduce the risk of their app changing many times during a day.

Caveats and notes:

* In the event a code change is deemed very important (e.g. an urgent bug fix), the Bubble team still has the ability and right to roll out that specific code change immediately at any time, even for apps on scheduled release
* Certain infrastructure rollouts occur outside of this release system, i.e. could get rolled out at any time.
* If your app was on scheduled release and you switch it to immediate release, it will immediately get up to the most recent code release and immediately get all releases after that.
* If your app was on immediate release and you switch it to scheduled release, the platform for your app will shift to the last release that all scheduled release apps received, meaning your app may move *backwards* to a slightly older version of the codebase.
  * Please be cautious using very newly rolled out features if you intend to switch from scheduled to immediate release imminently.

### Enterprise plan dedicated instances

All dedicated instances are on a different release tier called **"dedicated release".** On the Enterprise plan, you have full control over when new Bubble code is applied to a given instance. Enterprise plan users will see a special icon towards the upper right of their editor to manage the Bubble engine version their instance is running.

Generally speaking, every morning there is a new dedicated release version available to choose, containing any Bubble engine updates from the day prior.

On the Enterprise plan, dedicated instances are not obligated to update their Bubble version. However, we strongly advise regular updates to ensure the dedicated instance leverages the most recent bug fixes, new features, and other improvements.

<details>

<summary>Related articles</summary>

You can read more about our Enterprise plan in the article series below. On the Plans and pricing page you can compare the different plans to each other. If you'd like to speak with a sales representative about the Enterprise plan, you can use the contact form below.

Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)\
Page: [Pricing and plans](https://bubble.io/pricing/compare)\
Page: [Contact sales](https://bubble.io/contact-sales#!)

</details>

## Available Bubble Engine versions and current version

Most Bubble platform updates are seamlessly rolled out to all Bubble apps, but occasionally there are platform updates that the Bubble team considers to be "breaking changes". These usually involve a change in existing functionality that users may have been relying on previously. A breaking change is not applied to apps automatically. Instead, app editors must elect to upgrade the Bubble engine version powering their app.

When doing so, note that you first upgrade the Bubble engine version for your app's development version, which then must be deployed in order for this to apply to your live app. Thus, if you upgrade in your development version but change your mind, you have the opportunity to revert back in your development version - as long as you have not deployed to live yet, your live version will not have been impacted. However, you will not have the option to revert to a previous Bubble engine version forever, only for a very short time window after you upgrade.

## Beta features

In this section, you can play with beta features that Bubble's considering releasing. To enable any beta feature, check the checkbox, and you can submit feedback to our Product team using the link in the last column.

For certain beta features, your app may be altered even after you turn off the feature. You can revert to the previous state of your app by using save points as we automatically create a save point whenever you toggle on such a feature (alternatively, you can manually adjust your app to its previous state). Note that the window for save points to which you can revert your app is limited to the window allotted by your plan. Since the save point is created after you turn on a feature, make sure to uncheck the checkbox once your app has been reverted.

{% hint style="danger" %}
**Warning:** Be aware that beta features are in ongoing development. They may have bugs or inconsistencies, and sometimes they may be discontinued or given lesser priority. We suggest first trying out these features separately before integrating them into broader areas of your app.

If you have questions about a beta feature, you can get in touch with the [Success](https://bubble.io/contact) team.
{% endhint %}
