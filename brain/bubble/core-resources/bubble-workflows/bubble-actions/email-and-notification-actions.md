# Email and notification actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/email-and-notification-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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
Due to rate limiting on the default shared email address, a **maximum of 50 recipients** can be specified per email. If your app needs to exceed this limit, you can connect your own SendGrid account in the *Domain & Email* section of the *Settings* tab.
{% endhint %}

## Request push notification permissions

Native mobile actions, such as sending push notifications, are described in the article below.

{% content-ref url="/pages/QRdUg8x1O9U43N5cFkKQ" %}
[Native mobile](/core-resources/bubble-workflows/bubble-actions/native-mobile-actions)
{% endcontent-ref %}

## Send email

This action sends an email from your app. If no custom domain has been set up, the email is sent from `[your-appname]-no-reply@bubbleapps.io`. Once a custom domain is configured, you can define a custom sender address. Manage these settings in the *Domain & Email* section of the *Settings* tab.

{% hint style="info" %}
A custom domain must be set up before customizing email behavior. Custom domains are available on Personal plans and above.
{% endhint %}

### **To**

The email address to send to. To send to multiple recipients at once, define a list of email addresses and use the *join* operator with a comma as the separator — for example, `email_1@bubble.io, email_2@bubble.io`.

### **Specify a different reply-to address**

Check this box to specify a reply-to address that's different from the sender address.

#### **Reply to**

The reply-to address to use.

### **Sender name**

The name to display as the sender, instead of the email address.

### **Cc**

The email addresses to CC on the email.

### **Bcc**

The email addresses to BCC on the email.

### **Subject**

The subject line of the email.

### **Body**

The body of the email. Use *Insert dynamic data* to include dynamic content.

### **Do not apply a SendGrid template**

If you've defined a SendGrid template ID in the *Domain & Email* section of the *Settings* tab, check this box to skip that template for this action.

{% hint style="info" %}
This option is only available when a custom domain is set up in the *Domain & Email* section of the *Settings* tab.
{% endhint %}

### **Unsubscribe group ID**

The SendGrid unsubscribe group ID to associate with this email. When set, an unsubscribe link is added to the bottom of the email.

### **Attachments**

Files to attach to the email. The total size of all attachments must be under 19 MB.

{% hint style="info" %}
Only files stored in your app's Bubble file storage are supported as attachments. Files hosted elsewhere, such as on Box, can't be attached.
{% endhint %}

## Send meeting request by email

This action sends a meeting request that calendar apps such as Gmail, Outlook, and iCal can interpret as a calendar event.

### **To**

The email address to send the meeting request to.

### **Sender name**

The name to display as the sender, instead of the email address.

### **Organizer**

The email address of the event organizer. This maps to the `ORGANIZER` property in the iCalendar format.

### **Start time**

The start time of the meeting. Must be of type date.

### **Set a length instead of an end time**

Check this box to define the meeting duration in minutes instead of specifying an end time.

#### **Length (minutes)**

The duration of the meeting in minutes. Must be of type number.

### **End time**

The end time of the meeting. Must be of type date. Replaced by *Length (minutes)* when *Set a length instead of an end time* is checked.

### **Summary**

The summary text to display in the calendar event.

### **Description**

The description of the calendar event.

### **Location**

The location of the event. Must be of type text.

### **Sequence**

The revision sequence number of the calendar component. This maps to the `SEQUENCE` property in the iCalendar format.

### **Method**

The iCalendar object method associated with the calendar object. This maps to the `METHOD` property in the iCalendar format.

### **UID**

The persistent, globally unique identifier for the calendar object. This maps to the `UID` property in the iCalendar format.

### **Status**

The overall status or confirmation for the calendar component. This maps to the `STATUS` property in the iCalendar format.

### **Change the body of the email**

Check this box to customize the body of the email that accompanies the meeting request.

#### **Body**

The body of the email sent with the meeting request attached. Can be static text or dynamic data.

### **Do not apply a SendGrid template**

If you've defined a SendGrid template ID in the *Domain & Email* section of the *Settings* tab, check this box to skip that template for this action.

{% hint style="info" %}
This option is only available when a custom domain is set up in the *Domain & Email* section of the *Settings* tab.
{% endhint %}

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

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
