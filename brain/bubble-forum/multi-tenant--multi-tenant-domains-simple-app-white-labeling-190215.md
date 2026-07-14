# Multi-tenant Domains - Simple app white labeling
> Source: https://forum.bubble.io/t/multi-tenant-domains-simple-app-white-labeling/190215 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 9 posts · topic: multi-tenant

## Original post (by @ambrose)

Add custom sub-domain or apex domains to your bubble app. Provide white labelling to customers and more.

Building a Saas application on bubble and want to offer custom domains to your users? With the Multi-Tenant Domain Plugin this is as easy as one Workflow Action.

Simply ask your user for their domain, add the workflow action “Multi-Tenant Domain - Create New Domain” to your workflow and specify the user input domain & user bubble app name, then save the returned “Domain Id” to the users account so you can delete later if needed. Then simply show the return DNS comment for the user to update their DNS settings. That’s it!

3 simple steps:

- 

Add the plugin to your bubble application.

- 

Set “Your bubble app” to your bubble apps app name. eg, multi-tenant-domain-demo (without .bubbleapps.io). Set the new domain to the domain your user provided.

- 

Save the returned site_id to a field for the current user. You’ll need this to update & delete later. Display the dns_setting_comment to your user for them to update their dns records.

***Ensure you store the returned “Domain Id” on creation. You will require this to delete the domain at a later date if needed.

***To update a users custom domain, just delete their existing and then create a new one.

***Go to Settings - Domain/Email & disable “Redirected all requests to the domain…” ONLY IF CUSTOM DOMAIN IS ENABLED.

***The connected domains will operate exactly as the standard domain. test.bubbleapps.io/examplepage (http://test.bubbleapps.io/examplepage) is the same for usercustomdomain.com/examplepage (http://usercustomdomain.com/examplepage) or userslug.yourcustomdomain.com/examplepage (http://userslug.yourcustomdomain.com/examplepage)

Plugin page - 
 (https://multi-tenant-domain-demo.bubbleapps.io/version-test)

## Reply by @ambrose (0 likes)

Hi @guskcoder,

This will handle all cookies apart from the bubble login cookies.

Cheers

## Reply by @guskcoder (0 likes)

ha yes so I can’t login to a redirected domain?

Do you have any solution for this?

## Reply by @ambrose (0 likes)

No, you will not be able to login to any bubble applications routed through the plugin’s engine.

Unfortunately no. There is not solution to the problem, you will find the exact same restriction with the other 2 available plugins as well.

## Reply by @iwakinomotoye (0 likes)

Sorry, I am still not quite sure if this plugin solves two of my major concern. Does this plugin allow you to be able to push updates to the white labelled apps? And I guess the white labelled apps have a seperate database since they are seperate apps, right?
