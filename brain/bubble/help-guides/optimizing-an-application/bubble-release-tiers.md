# Bubble release tiers
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/bubble-release-tiers · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Bubble engine is evolving all the time - on a typical workday, we'll have multiple code rollouts representing any combination of bug fixes, infrastructure improvements, new features, and more.

Every app is on a particular "release tier", which corresponds to when it receives these code rollouts to the Bubble engine.

## Immediate release (default)

By default, any such Bubble code rollout will get immediately applied to all Bubble apps - we call this **"immediate release"**.

Note that occasionally, a change in the Bubble platform will be labeled a breaking change from before, a situation which creates a new "Bubble engine version". This means that we are changing the behavior of an existing Bubble feature in a way that we think is an improvement (usually this is in the context of a bug fix), but because existing apps may be relying on the old behavior, we do not want to forcibly upgrade all apps to the new code.

In these situations, apps can control when this new particular behavior is applied via *Settings > Versions*. This way, you can upgrade Bubble version on your development version when convenient for you and test out the impact of that change. When your app on the new Bubble version looks good to you, you can deploy to live just like any other change to your app. In other words, upgrading the Bubble version of your development version does not automatically upgrade the Bubble version of your live version - you must deploy.

If an app is on an older Bubble version (i.e. any version that's not the latest one), it will still receive any code updates that are rolled out since the breaking change, just not the breaking change itself (or any future breaking changes).

## Scheduled release

Apps on the Growth plan and above can elect to receive Bubble engine updates a bit of time after they are rolled out. This setting is in Settings > Versions and is called **"scheduled release"**. On scheduled release, the app will not get Bubble engine updates immediately.

Rather, apps on scheduled release will all get Bubble updates once a day (in the morning ET, though the exact time each day may vary), *only if* the Bubble codebase has not changed for a certain number of hours. This once-a-day update will contain all the platform updates since the last scheduled release. Note that some days, this release may not happen at all.

This feature can be useful for app creators that would rather not receive Bubble engine updates immediately because they want to reduce the risk of their app changing many times during a day.

Caveats and notes:

* In the event a code change is deemed very important (e.g. an urgent bug fix), the Bubble team still has the ability and right to roll out that specific code change immediately at any time, even for apps on scheduled release
* Certain infrastructure rollouts occur outside of this release system, i.e. could get rolled out at any time.
* If your app was on scheduled release and you switch it to immediate release, it will immediately get up to the most recent code release and immediately get all releases after that.
* If your app was on immediate release and you switch it to scheduled release, the platform for your app will shift to the last release that all scheduled release apps received, meaning your app may move *backwards* to a slightly older version of the codebase.
  * Please be cautious using very newly rolled out features if you intend to switch from scheduled to immediate release imminently.

## Dedicated release

All apps on the Enterprise plan with dedicated hardware are on a different release tier called **"dedicated release".** In fact, dedicated instances have full control over when new Bubble code is applied to their instance. Dedicated users will see a special icon towards the upper right of their editor to manage the Bubble engine version their instance is running.

Generally speaking, every morning there is a new dedicated release version available to choose, containing any Bubble engine updates from the day prior.

Dedicated instances do not have to upgrade Bubble version at any time, though we highly recommend that such updates happen often, so that the dedicated instance can benefit from the latest bug fixes, new features, etc.

Note: this is only available for apps on an Enterprise - Dedicated plan. Apps on the Enterprise - Standard plan have access to Immediate and Scheduled release (above).
