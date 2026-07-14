# Zapier
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/zapier · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The [Zapier](http://zapier.com/) plugin lets you connect Bubble to 2,000+ other web services, like Google Sheets, Airtable, and more. Automated connections called Zaps, set up in minutes with no coding, can automate your day-to-day tasks and build workflows between apps that otherwise wouldn't be possible.

Each Zap has one app as the **trigger**, where your information comes from and which causes one or more **actions** in other apps, where your data gets sent automatically.

{% hint style="warning" %}
The Zapier plugin is currently incompatible with apps hosted on [dedicated servers](#user-content-fn-1)[^1]. We recommend using Zapier webhooks and API connections as an alternative to achieve the same automations.
{% endhint %}

## Trigger a zap

A workflow action in your Bubble application that you can run, for example, when a button is clicked.

### **Zapier trigger**

The name of your trigger, as defined in the Plugins tab.

### **Zap thing**

The thing to send to Zapier along with the zap. This should match the trigger type defined in the Plugins tab.

### **Webhook (legacy)**

Enter the URL of the zap, which is provided by Zapier

### **Make dates Google Sheets-compatible (legacy)**

Google sheet requires a specific formatting for dates. Check this box if the current zap uses Google Sheets

### **Initiate this webhook (legacy)**

Check this button to send a sample of data to Zapier. This helps because you are setting up the zap with their editor.

## Find a Bubble thing

A Zapier action that will search for the first thing in your database that matches a certain constraint.

## Create a Bubble thing

A Zapier action that will add a line item to your database for a particular data type.

## Modify a Bubble thing

A Zapier action that will change a field on a particular line item in your database, for example, changing the number field “Quantity” from 1 to 2. You will need the unique ID in order to specify the thing to change. Leaving fields empty will not delete existing fields on your Bubble thing.

## Kick off an API workflow

A Zapier action that will start a backend workflow that you specify.

## Setup <a href="#getting-started-with-zapier" id="getting-started-with-zapier"></a>

Sign up for a free [Zapier](https://zapier.com/apps/bubble/integrations) account, from there you can jump right in. To connect Bubble to Zapier:

1. Log in to your [Zapier account](https://zapier.com/sign-up) or create a new account.
2. Navigate to "My Apps" from the top menu bar.
3. Now click on "Connect a new account..." and search for “Bubble"
4. Use your credentials to connect your Bubble account to Zapier.
5. Once that's done you can start creating an automation! Use a pre-made Zap or create your own with the Zap Editor. Creating a Zap requires no coding knowledge and you'll be walked step-by-step through the setup.

### Set up in Bubble

![](https://lh5.googleusercontent.com/t7d6agl_IbMZ0HIC5L_CGFJAkIzPpIoGHxh4FoQpli3N3UKF10UfwXFxvF37fPEXKfGsPQ08FzxzSvFEsXWgnR3dLgRsW3bW98ZQIvwaEamgLjez2bdgB06uj51jFFtdDF5OW-PW)

Once you install the Zapier plugin in the Plugins tab of your application editor, you can click to “Add Zap trigger.” You can do this when you want your Bubble application to initiate a Zap. Enter a name for your trigger and select a data type from the “Trigger type” dropdown. You will see red text for “0 active Zaps”; as you create and turn on Zaps in Zapier, this will update. This Zap count is version-specific: when you are viewing the development version of your application, this count will be the number of Zaps in the development version, and likewise for live. If this Zap does not show as active, you will not be able to trigger it with a workflow action.

{% hint style="warning" %}
**Remember:** each data type that you want to interact with in Zapier needs to be enabled in your app's Data API to work. We also recommend checking *Use field display instead of ID for key names*.

Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
Reference: [The Data API](/core-resources/api/the-bubble-api/the-data-api)
{% endhint %}

Now in your *Settings* tab of your editor, go to the *API* section:

<figure><img src="/files/L279N1dQMCd0mluia4Hk" alt=""><figcaption></figcaption></figure>

1. Enable the Data API
2. Expose the data types that you want to work with Zapier. Remember to set up privacy rules for the data types.
3. Check the *Use field display instead of ID for key names* to avoid an issue causing a discrepancy between the test trigger data and live data within Zapier.

The Bubble API is accessible on paid plans, so your application will need to be on a paid plan in order to use the Zapier plugin.

### Set up in Zapier

### Bubble as a Zapier trigger

![](/files/-MUnV3S-rfa49BXRs1q7)

Now that we have our Zapier plugin installed and set up in our application, we need to create active Zaps for our application to trigger. Start by logging in and clicking the “Make a Zap” button. Give your Zap a name that will be easy to identify later, such as “Add Airtable record.”

For step 1, what Zapier calls the trigger, choose Bubble as your app. Select “Workflow Trigger Event” as the trigger, and click “Continue.” Choose your account and sign into Bubble, then select your account from the dropdown and click “Continue.”

Search for an App ID, such as “zapier-demo,” and select a version for the application, either development or a custom branch name. If you would like to use this Zap in the live version of your Bubble application, first build your Zap and set it up in your selected development version. Once you deploy your Bubble application to live, your new Zap will work in your live version.

Under Zap ID, search for the name of the Zap that you created in your Plugins tab, in our case, “Add Airtable record,” select it, and continue.

In the next step, click the button to “Test & review” your trigger. Zapier will tell you if there are any errors here, for example, if the Data API is not enabled. If you see sample data, the test has run successfully, and you are ready to set up your action.

This is when you choose the application outside of Bubble where you want something to take place. If we select Airtable, for example, we can fill out fields to create a new record using dynamic information from our Bubble application. We will test and review the action, and if successful, click to “Turn on Zap.”

![](https://lh6.googleusercontent.com/rcfhKCtzUGrVi6AHwbe0P9bwRFM5S_r_DecHtujtzIamDCpxYkjpTQVx0W9q3WJQBNwvwb1utrwp9vpPEr6L0Z6A9H6g5mP7eOQl1ewvZOAIojM_NbLxS-yQzNCzyY4yRU9UhIiN)

When we want to trigger this Zap on Bubble, we can add a workflow action to “Trigger a Zapier Zap,” and tell Bubble which Zap from our Plugins tab to trigger and which “Zap thing” we would like to send, for example, which user to add to Airtable.

After this point, if you turn off your Zap in Zapier to make further changes, you will need to redeploy your Bubble application to live for Zap to appear active in your plugins tab and work in the live version.

### Bubble as a Zapier action

Once you click to “Make a Zap,” choose the app that you want to affect your Bubble application. For step 2 and onward, the action that you want to take place in your Bubble application, select “Bubble.” You will see “Action Event” options to create, modify, or find Bubble things, or trigger an API workflow.

For any of these actions, you will need to choose your account, app ID, and version as listed above.

### Create

![](https://lh3.googleusercontent.com/-dBNq-eOWWzi8Nwj0UeKVpVLg_9viwivEQAT5k5lfmYr51A8v3klSIqcEJrCATthYXTuaf3i3cmECfyGfDcaPqEtOL3duj2OPjN0mtQC07MTxzcOf3IYFLYwMkNXQBLzp8WlKdte)

To create a Bubble thing, select its data type (must be exposed via the Data API) and click into the input for each field to dynamically select a value. For example, you might select an Airtable field for “Email” to map to a Bubble email field for the User type.

### Modify

![](https://lh5.googleusercontent.com/DYBAU2F-ef4a8iXkilZRE4CMqcDC0_s9zUQGZ-HdjsA_ubXiU8Dot9CpbkGofGOlBoLcy585yJFHnoKiqCnHyT3u1cWpTSO8aDRakHxa4tGdWqkiCMbS5N0W0QgoYd5k0K912Owa)

To modify a Bubble thing, select the data type and thing ID (its Bubble unique ID) for the item that you would like to modify. If you only specify one field to modify, such as “Name,” only the “Name” field will be updated, and the other fields will remain as they previously were within your database. For the technically inclined, this is because our plugin uses a PATCH rather than a PUT request for modifications.

### Find

![](https://lh6.googleusercontent.com/68fxR-4BwANENrLx0ourb8_wWBag4f47_3zrYaT3SnJ_SRq5KXT7HYi27IZNSp4ZTTE5lvABuHBkNoRwoZZLOHoIvLpjKOPZ9QFGAn74goYbRphz4hdPn0_WHmPlCV2MXVhM4WBB)

To find a Bubble thing, select its data type and then build an expression for your search similarly to how you would in Bubble, with a search field (“Slug”), constraint (“text contains”), and term (“exampleslug”). Note that if you are searching for users, you cannot search by the email field.![](https://lh5.googleusercontent.com/R0wkIkcENHWaKLbeQEtyQrOfJSf19dVGKFpcig3Tv7R_67vX274VpqIa3OqawkKMcGGUOhSj56kXX_0Qdg1oYvJbhbpWI-30z-88fUdRHLxHUb6nIU9ueVACC4K4jrT0iJ2LPhGt)

This will return the most recently modified item that matches your distinctions, rather than any item that matches in your database. If this step comes before a Modify action within Zapier, you can use this action to dynamically pull in the unique ID for the following step.

### Trigger an API Workflow

![](https://lh4.googleusercontent.com/uLoITtN6wWZ_Ewoj9A7kI0j8P3WnVRrxmZcxfhZGMqGibWc47PFtQupzQOWcMvTvgeVPsrNcyI7SBe0ilZRhWGy-SdZaoTtROyzQUE_ERUwRs-HXBtuQfDGJmewpIpCq526YdSDp)

To trigger an API workflow, select its name and specify any relevant parameters that you have defined in your backend workflows tab. Using API workflows can be helpful with the Zapier plugin when you are looking to reformat data returned from a Zap, for example, if you wish to format a row of numbers in Google Sheets as currency in Bubble, or when you wish to add or remove a single item from a list field rather than create or replace a list entirely.

After setting up your chosen action, you can click continue, then test and review your action in order to see an example of how it will work prior to turning it on.

## FAQ <a href="#faq" id="faq"></a>

### Can I use a newly created Bubble data type that does not have any entries yet in a Zapier action?

You can set this up in Zapier and select “Skip test” for the time being, but in order to perform real operations, you will need to have data entries for the appropriate type in your database.

### Can I use a data type that has the same name as a deleted type in my application?

If you have a data type called "Test," then you delete this type and create a second type called "Test," this will cause an error. Should you encounter this, it's possible to export the existing data type as a CSV and import it as a new type with a unique name.

### How does the Zapier plugin work with privacy rules?

Privacy rules are automatically handled based on your permissions for the application that you selected in Zapier. If you are an admin for that application, you will be able to run any action. If you are a collaborator with “View only” permissions for Data, for example, you will be able to “Find a Bubble thing” but not create or modify one.

### How are lists handled?

You can create a Bubble thing with a list field or modify a list field by replacing that list entirely using the Zapier plugin. The way to specify a list field is to add an item per input. For a list of numbers, you might add

100

200

45

92

so that these will each be added as a separate line item in Bubble. If you were to add this as 100,200,45,92 instead, the list field would contain “100,200,45,92” as its first item. The exception to this is lists of numeric ranges or date ranges. In this case, either of the setups would be valid.

### What about other applications that support their own column types such as Google Sheets or Airtable?

Some applications allow you to format fields as currency, dates, images, etc., which can affect how that information is sent to Bubble. If you are encountering unexpected behaviors for a certain formatted field, it may help to try sending the information as text. For example, our API sends images and files as their s3 URL, and our API requires you to pass a string field with the URL as well.

### **What if I see the message "The Zap you tried to trigger has no active zaps"?**

If you see this message, it may help to manually refresh your Bubble account within Zapier. First of all, while you are editing your Zap in Zapier, turn your Zap off. Next, go to your Apps tab in the Zapier dashboard and select "Bubble." Under "My Connections," you will see the account currently linked with Zapier.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-MTbq3gbndNzpDdMpCrf%2F-MTbrCZUGjauVTFMKYtc%2FScreen%20Shot%202021-02-15%20at%205.43.12%20PM.png?alt=media\&token=99d82f8d-0940-4c0a-bf63-faeee84f42db)

Click the three dots then "Reconnect" to refresh your Bubble account. Go back to your Zap, refresh the page, and set it up how you would like. Then, turn the Zap back on and check the Plugins panel in Bubble to see if that live Zap appears.

[^1]: A dedicated server is an option for Enterprise customers. See the guide below for more information.\
    \
    Article: [Dedicated instance](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance)\
    Article series: [Bubble for Enterprise](/help-guides/bubble-for-enterprise)
