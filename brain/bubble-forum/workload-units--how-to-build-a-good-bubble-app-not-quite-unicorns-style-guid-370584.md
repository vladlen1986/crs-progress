# How To Build A Good Bubble App (Not Quite Unicorns Style Guide & Development Philosophy)
> Source: https://forum.bubble.io/t/how-to-build-a-good-bubble-app-not-quite-unicorns-style-guide-development-philosophy/370584 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 35 posts · topic: workload-units

## Original post (by @georgecollier)

Not Quite Unicorns Style Guide & Development Philosophy

This guide details an approach to building Bubble apps followed by Not Quite Unicorns, the youngest Gold tier Bubble agency.

> 

[image] A version of this exists on a Google doc which you may find more readable: 

- 

- 
- 
- 

- 
- 
- 

- 
- 
- 

- 
- 
- 

- 
- 
- 

- 
- 
- 

- 
- 
- ````

- 
- 

- 
- 

 (https://notquiteunicorns.xyz/secure)
[image]

- 
- 
- 

- 
- 
- 
- 

[image]

- 
- 

- 
- 

[image]

[image]

[image]

[image]

## Reply by @ihsanzainal84 (5 likes)

Very great tips here! Especially regarding Reusable element properties and custom events. Lots of builders think having 1000 actions in one workflow with giant conditionals is a mark of success or something. What it is, is a badge of shame.

I appreciate all of your work, but this is where I’ll have to put on my gloves /s
States

[image] georgecollier:

> 
Against custom states

We do not recommend using custom states at all. There are a few reasons for this:

- They are functionally inferior to group variables, as they cannot be set dynamically in an elegant way

- They are not as visible as group variables in the editor

In almost all cases, anything a custom state can do, a hidden variable can do better. One notable exception is passing data between reusables.

Firstly, if i were to replace states with groups I’ll have tons of group and RG elements pointlessly rendered on frontend.

Secondly, states were designed to be used in workflows. States in Bubble are “absolute” as you cannot accidentally change their values anywhere but with a WF action.

State lists are also static in nature, so it gives you absolute control of the data you load. Not everything is about WU, data control helps UX.

[image] georgecollier:

> 

They are functionally inferior to group variables, as they cannot be set dynamically in an elegant way

They serve very different purposes and should not be viewed as competing functions. I too use group variables for dynamic data but again, not everything needs to be dynamic.
Popups to Store Variables

I lean more towards floating groups as I’ve had issues with using popups to store my states and plugins.
External databases should not be used with Bubble*

[image] georgecollier:

> 

If your project requires an external database, it should not be built on Bubble. Bubble is a bad front end and is clunky to integrate with external back ends. You are better off using a tool like WeWeb, which is purpose built for this use case and is objectively a bette
…[trimmed]

## Reply by @marlon1 (3 likes)

[image] georgecollier:

> 

Good examples
Bad examples

Invoice
DT_Invoice

Invitation
user_invitation

User Role
OS - User Role

Product
ProductID

Billing Account
stripeBillingAccount

Hey @georgecollier , I’m with you on 99.8% of your best practices! The only difference is that I prefer using snake style for naming data types (e.g., `Billing_Account`) — I find it makes things more straightforward if the table ever needs to be exposed via the Bubble Data API.

As for option sets, I like to prefix them with `OS` to make them easier to identify and locate within the app. In my experience, it doesn’t cause any harm and adds a bit of clarity.

Appreciate you sharing all this great material!

## Reply by @stela.vas (2 likes)

Thanks for sharing these strategies, George!

I couldn’t agree more about building with maintainability in mind, it is crucial. No app is ever truly “done,” right? Being intentional with naming conventions, both in groups and the database, makes a big difference in the long run. In my opinion, though, taking just a few extra seconds to name groups pays off in terms of organization.

On reusable elements and custom events : they are most definitely our friends! I’ve worked on a few apps that were already up and running, and it gets tricky when you run into multiple groups or popups that could have been a single reusable. It often means updating the same change in three different places instead of just one. Plus, working with parameters in reusables is such a smooth experience! I use those a lot.

The part about hidden variables vs. custom states really caught my attention. I usually use custom states for things that need quick responses on the front end, like filters, or for values that will be saved later in the workflow, but not as actual data sources. I’ll definitely dig into the document you shared, thanks a lot for including that!

Also, the backend is definitely our ally. So many actions can run asynchronously, and handling them in backend workflows not only improves organization, but can also boosts security! And thanks bubble for the update on API workflows not being createt with the “expose as a public API workflow” checked by default anymore.

One thing I’d add, with the new workflow tab, folders are more essential than ever, especially in SPAs. Navigating through unorganized (or worse, absent) folders can be a real challenge.

All in all, great content, really appreciate you putting this together. Lots of good food for thought!

## Reply by @ihsanzainal84 (2 likes)

[image] georgecollier:

> 

I think my issue is more with people building apps for clients and not being open about the fact that better options exist other than Bubble if using an external DB. If you’re like, yeah Bubble is fine with external DB, tool X is better, but we only work with Bubble then the client gets that info and can make a decision. But I don’t know why people are offering to build new Bubble apps that are solely Supabase/Xano backends - like, just use code, or a purpose built front-end tool like WeWeb.

I see your point. It’s probably because I am uninformed. I have the privilege of running a profitable business that does not involve tinkering with apps built by others and actively avoid doing so.

I do agree that it’s always good practice to see how far you can keep to native Bubble before moving to using/building plugins, custom code or external services.

## Reply by @randomanon (2 likes)

Very nice writeup! I do like 90% of this. Especially agree with the WU bit. I know hidden variables are technically a bit more flexible than custom states and I do use them sometimes but custom states just feel lighter to me (placebo) so I tend to use them more often than not. But the “set state” action is completely interchangeable with “display data.”

[image] georgecollier:

> 

All popups should be reusable elements. Each popup should have a custom event to open and a custom event to close. Closing the popup simply hides it.

Opening the popup uses the custom event to take any parameters that the popup requires or can optionally take. It then displays those inside hidden variables inside the popup as desired. Then it shows the popup.

I use a custom state to set the “type” of popup and then reference that in conditionals, slightly clunkier but same general concept.

[image] georgecollier:

> 

The default ‘Creator’ field should never be used

Very hot take but assuming:

- Functionally there will NEVER be a reason to “let someone see” the information

- It’s sensitive

I see Creator being hardcoded as a feature, not a bug. It means there can never be an improperly set up workflow condition that will ever allow it to be changed. I do see how this can be a problem for many use cases though.

Also custom events are the most underrated part of Bubble, especially being able to return stuff conditionally. It is essentially if/then branching. I like using them as the very first step of a BE workflow for validation purposes since they’re guaranteed to run before everything else.

[image] ihsanzainal84:

> 

I do agree that some builders don’t actually need to use an external database but there is nothing wrong with stacking an external database. I built my own tech stack to support my apps and technically I can not use Bubble but I am more than happy with how Bubble integrates. It’s only clunky if the implementation itself is bad.

It’s just adds a bunch of API calls ri
…[trimmed]
