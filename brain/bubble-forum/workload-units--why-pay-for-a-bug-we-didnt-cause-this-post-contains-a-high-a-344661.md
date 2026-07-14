# Why Pay for a Bug We Didn't Cause? This post contains a high amount of WU
> Source: https://forum.bubble.io/t/why-pay-for-a-bug-we-didnt-cause-this-post-contains-a-high-amount-of-wu/344661 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 48 posts · topic: workload-units

## Original post (by @eren)

Hello there,

The subject of this post is Bubble’s expectation that we should bear the entire cost of a bill resulting from a bug that was not created by us. A system where only the application owner pays for damages caused by bugs is an extremely unfair one.

I need to go into some detail, so this might be a bit long to read, but I can’t accurately explain the situation without mentioning the dates.

When we noticed the WU (Workload Unit) spike, @batuhanmerguz from our team began investigating the situation. Upon realizing that the WU consumption was due to a malfunctioning condition (we were describing this bug as data fetching, but then we realized that the condition was broken.), we created a bug report with a Loom video on September 6th.

[image]
image1102×171 45.8 KB

It was September 11th that it reached the relevant team (of course, we sent a follow up; otherwise, I’m not sure if it would have reached that day)

[image]
image1086×461 57 KB

On September 17, I took over the conversation from Batuhan and wrote the email below.

[image]
image1531×697 55.5 KB

The response we received was along the lines of “we’ll look into it,” but with one difference: they requested the editor link for the bug report. I was surprised because I had already sent the bug report number “2999” in the subject line of the email. They said they couldn’t find a number like that and stated it should be 6 digits long, among other things.

The reason I’m providing this detail is crucial: time is passing! Between emails and correspondences, our bill is continuously growing.

[image]
image853×403 53.7 KB

On the 19th of the month, I received an email from @Eram_BubbleSupport saying, “We’re already actively investigating, and we’ll add you to the CC list.” Yes, by this time, 13 days had passed before our application even entered the investigation phase.

Remember this follow-up; I had already mentioned my expectation regarding a refund. If the support team had responded to the email I shared above with something like, “We don’t issue refunds. If you know of a workaround, please apply it. Also, you can check our refund policy here,” we would have solved the problem on our own with a workaround and avoided paying an even higher bill.

In just these 10-11 days, while we were waiting for the bug report to reach the right people, we had already spent $400. In my opinion, even this much is abnormal.

Meanwhile, we didn’t apply any workaround and waited for the problem to be solved, because a condition wasn’t working properly. If a condition doesn’t work, how can I trust Bubble to develop applications?

In fact, I mentioned this while responding to @ihsanzainal84 here.

[image]Sudden WU Spike - My Customer is Being Overcharged (https://forum.bubble.io/t/sudden-wu-spike-my-customer-is-being-overcharged/338771/31)

> 

However, we are not applying these optimization techniques that come to mind. We are waiting for news from the Bubble team. Because we believe this is a bug related
…[trimmed]

## Reply by @Kayami (15 likes)

hey - definitely not aware that our icons plugin could even cause a problem like this, gonna check it out

im a bit confused how it could even do that, is it causing the rg to re-render more than needed and that is fetching data?

the plugin itself is just clientside js and no requests to any server besides loading the plugins once (which doesnt count towards WU)

so it has to be some sort of interaction that causes something to render more than needed? curious to get some info if possible [image]

i think a more general alert of ‘this page / element is consuming large amount of wu’ would probably help because if our plugin can cause something like this pretty much any plugin could.

and sorta related - now that icons in buttons are officially supported im just hoping custom icon sets will be released so we can deprecate the plugin in favor of a native solution.

## Reply by @lindsay_knowcode (11 likes)

I look forward to the time when plugins are presented in a way users can evaluate in a meaningful way.

## Reply by @boston85719 (9 likes)

Bubble shouldn’t be nickel and diming their existing user base, as it is, in every industry, cheaper to keep a client than it is to get a new client, same is likely true for employee retention as well. In that light, Bubble should be offering to allow you to pay exactly what Bubble pays for those same WUs and not the normal overage charges, or at least the lowest stated overage charge for any plan type regardless of what your plan type is.

They should also be doing more to ensure that 3rd party plugins comply with their code since they are taking a 25% commission on every sale of the plugin, they should have more skin in the game to ensure it is not just a ‘buyer beware’ situation, and as you have pointed out some very good ways that can be done.

This situation highlights a ‘best build practice’ in the WU era with hidden RGs…put a conditional onto the RG for when it is visible to have property to change be the datasource, and leave main data source empty. This would likely ensure that no matter what, you are only charged for returning data when it is absolutely necessary.

## Reply by @ihsanzainal84 (8 likes)

I don’t avoid third party plugins, i think it’s silly, but I am very particular about plugins if I cannot see source code. I mainly look out for shared headers, element headers and node resources.

If i cannot see source code then I’ll do more research on the plugin maker.

. What plugins have they made

. Do they have a support thread in the forum

. If yes, are they actively responding

I find that unpopular free plugins tend to be safer and better written.

## Reply by @georgecollier (7 likes)

[image] eren:

> 

However, if the WU consumption wasn’t caused by the user but by a 3rd party plugin, the overages should be refunded.

I think that’s pushing it. Updates Bubble push shouldn’t be breaking changes for existing plugins, but ultimately Bubble isn’t responsible for third party plugins. If a third party plugin you use causes more WU, that’s on you for using the plugin of your own free will. Else, does Bubble have to start refunding WU used for inefficient SSAs or fuzzy searches?

[image] eren:

> 

the developer is responsible for providing solutions to any problems.

For any plugin, this is not the case. The developer is responsible for nothing. Once you’ve bought it, you’re buying it as-is. Any future updates are, whether you like it or not, of the developer’s own goodwill.

It looks like this is not an issue with anything Minimum Studio did with the Heroicons plugin - rather, a change in Bubble’s code meant that Bubble began conflicting with the HeroIcons plugin. Whilst it’s annoying, it’s not really Bubble’s fault - their core responsibility is to the platform as is. They cannot test compatibility with every plugin on the platform.

[image] eren:

> 

Bubble’s expectation that we should bear the entire cost of a bill resulting from a bug that was not created by us. A system where only the application owner pays for damages caused by bugs is an extremely unfair one.

A bug that was also not Bubble’s responsibility as it was, even if Bubble made an update, caused by HeroIcons plugin. HeroIcons is made to be compatible with Bubble - not Bubble made to be compatible with HeroIcons.

So, my take on the whole thing is that yeah, it’s annoying, but this kind of thing is why using third party plugins is a risk we willingly take. Sure it’d be nice if using plugins came with some guarantees, but that’s only on Bubble for official Bubble plugins. They wouldn’t even intervene with plugins with thousands of downloads that expose API keys that the devs won’t even
…[trimmed]
