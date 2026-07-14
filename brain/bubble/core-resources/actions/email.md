# Email and notifications
> Source: https://manual.bubble.io/core-resources/actions/email · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions that send emails.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Email

Emailing in Bubble comes with some default settings, and the article below explains how you can customize those settings to suit your app's needs.

* Article: [Email settings](broken://pages/-MUUNYlJhe5tqMARhsWS)

***

#### External documentation

Bubble uses [Sendgrid](https://www.sendgrid.com) as the built-in email provider. You can find SendGrid's official documentation in the link below.

* External page: [Twilio SendGrid Knowledge Center](https://docs.sendgrid.com/)

***

**Workflows and logic**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

Workflows is a part of the *Logic* series in the user manual:

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (5)" %}

#### Email

* Getting started with Bubble: [Password reset](https://www.youtube.com/watch?v=djbQ1-iXIGI)

#### Workflows

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic](https://www.youtube.com/watch?v=e-vhoR48QdY)
  {% endtab %}
  {% endtabs %}

{% hint style="warning" %}
**Note:** Due to rate limiting from Sendgrid on the default shared email address, a maximum of 50 recipients can be specified per email. If you need more than this limit for your app, consider creating your own Sendgrid account as outlined [here](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app#domain-and-email).
{% endhint %}

## Send email

This action sends an email from the app. If a domain name has not been setup yet, the email will come from \[your-appname]<-no-reply@bubbleapps.io>. When a domain name is set, the email will come from <what_you_want@your_domain.com>. Customize this email in the Domain & Email section in the Settings Tab.

{% hint style="info" %}
**Note:** A domain name must be set up before customizing email behavior. Custom domains are available on Starter plans or higher.
{% endhint %}

### To

Specify the email to send the email to. It can either be 'Current user's email' or the content of an input. Send more than one email at once by defining a list of emails and using the 'join' property with a comma ','. For example, <email_1@bubble.io>, <email_2@bubble.io>.

### Specify a different reply-to address

Check this box to specify a different reply-to address.

### Reply to

Enter the reply-to address. For example, it can be 'Current user's email.'

### Sender name

Instead of showing the email address, format the name of the sender by entering the name here.

### Cc

Define the email addresses to cc the email to.

### Bcc

Define the email addresses to bcc the email to.

### Subject

Define the subject of the email.

### Body

Define the body of the email. Use 'Insert dynamic data' to make the content dynamic.

### Do not apply a Sendgrid template

When using Sendgrid to send emails, you can define a template ID in the Domain & Email section in the Settings Tab. Check this box, and no template will be used for the current action.

{% hint style="info" %}
**Note:** This option is available when a domain name is set up in the Domain & Email section in the Settings Tab.
{% endhint %}

### Attachments

You can attach files to the emails you send, provided the total size is smaller than 19 MB.

{% hint style="info" %}
At this time, only files stored on your app's Bubble file storage are supported as email attachments. File stored elsewhere, such as on Box, will not be available as an email attachment.
{% endhint %}

### Unsubscribe\_group\_id

Enter the unsubscribe group ID here. It will add an unsubscribe link at the bottom of the email.

## Send meeting request by email

This action sends a meeting request that is interpreted as such by Gmail, Outlook, iCal, etc.

### To

Enter the email to send the email to. It can either be 'Current user's email' or the content of an input, etc.

### Sender name

Instead of showing the email address, format the name of the sender by entering the name here.

### Organizer

Enter the email address of the organizer of the event (ORGANIZER property of the event in the iCalendar format)

### Sequence

Define the revision sequence number of the calendar component within a sequence of revisions (SEQUENCE property of the event in the iCalendar format).

### Method

Define the iCalendar object method associated with the calendar object (METHOD property of the event in the iCalendar format).

### UID

Define the UID of the meeting. This property specifies the persistent, globally unique identifier for the iCalendar object (UID property of the event in the iCalendar format).

### Status

Define the overall status or confirmation for the calendar component (STATUS property of the event in the iCalendar format).

### Start time

Define the starting time of the event/meeting. It should be of type date.

### Set a length instead of an end time

Check this box to set a length instead of an ending time.

### End time

Define the ending time of the event/meeting. It should be of type date.

### Length (minutes)

Define the length in minutes of the meeting. It should be of type number.

### Summary

Enter a summary to be shown in the calendar.

### Description

Enter the description of the event.

### Location

Enter the location of the event. It should be of type text.

### Change the body of the email

Check this box to customize the body of the email.

### Body

Enter the body of the email with the meeting as an attachment. This can be static text or dynamic data.

### Do not apply a Sendgrid template

When using Sendgrid to send emails, you can define a template ID in the Domain & Email section in the Settings Tab. Check this box, and no template will be used for the current action.

Note: This option is available when a domain name is set up in the Domain & Email section in the Settings Tab.

## Send push notification

Sends a push notification to a selected list of devices.

### Title

The title of the push notification.

### Subtitle

The subtitle of the push notification.

### Body

The body text of the push notification.

### On tap, navigate to

A dropdown listing all views in your app. Selecting a view enables the remaining destination fields. The default value is the existing behavior prior to this feature - navigating to the root view.

### Overlay

After selecting a destination view, you can choose a sheet or floating group on that view to present as an overlay after navigation. The dropdown is filtered to overlay-type elements on the selected view. If the view has no sheets or floating groups, this field is disabled.

{% hint style="info" %}
**Note**: selecting an overlay to open will override any conditionals on that overlay container that would otherwise hide it.
{% endhint %}

### Navigation type

Appears when the destination is not a tab view. Controls how the view is presented:

* **Stack:** pushed onto the navigation stack (standard drill-down).
* **Modal:** presented modally over the current context.

If the destination is a tab view, this field is hidden — the app switches to that tab directly.

### Base view

Appears when navigation type is Stack or Modal. Defines what the back button navigates to when the user arrives from a push notification (where there is no prior navigation history).

* Lists all views except the destination view. Defaults to the app's root view.
* When set, the app constructs a synthetic stack: \[base view] → \[destination view], so the back button leads to the base view rather than closing the app.
* If left empty, the back button navigates to the root view.

### View parameters

If the selected destination or base view has view properties, a parameter section appears with a field for each property. Values can be static or dynamic expressions, consistent with how view properties work elsewhere in the workflow editor.

## Other ways to learn

<details>

<summary>User manual articles</summary>

Emailing in Bubble comes with some default settings, and the article below explains how you can customize those settings to suit your app's needs.

User manual article series: [Email settings](broken://pages/-MUUNYlJhe5tqMARhsWS)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
