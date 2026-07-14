# General
> Source: https://manual.bubble.io/core-resources/application-settings/general · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

General Bubble settings.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for all experience levels<mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (7)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### The Bubble editor

* Article series: [The Bubble editor](/help-guides/getting-started/navigating-the-bubble-editor)
  * Article: [The Settings tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab)
  * Article: [Setting up a custom domain](broken://pages/Sfb2EVgX6WfgYIibQCNa)

***

#### Translating your app

* Article: [Translating your app's text strings](/help-guides/data/static-data/app-texts-translations)

***

#### Collaborations and version control

* Article: [Managing collaborators](/help-guides/maintaining-an-application/collaboration)\
  You can invite Bubble builders into your app as collaborators[^2] and tweak their [access levels](#user-content-fn-3)[^3] to facilitate collaboration.
* Article series: [Version control](/help-guides/maintaining-an-application/version-control)\
  Version control lets you set up separate environments where different builders/teams can add features and fix bugs in isolation.

***

#### APIs

APIs let you connect to third-party external apps and systems, or invite other apps and systems to access your app's database and workflows.

* Article series: [APIs](/help-guides/integrations/api)

***

#### App security

This article series explores how to set up your app securely to protect the privacy of your users and other sensitive data.

* Article series: [App security](/help-guides/security/app-security)
* Article: [Protecting your database with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
  {% endtab %}
  {% endtabs %}

{% hint style="info" %}
**Tip:** Deploy your application to live for changes in your Settings tab to take effect.
{% endhint %}

## Privacy & Security

### Application rights

Define who can see and modify the app. Choose from Private app, Everyone can view, and Everyone can edit. This can be useful when you need help from other users, through the forum for instance. This setting does not apply to the owner of the app.

Important: Making the app private will not prevent people from seeing it on the web in Live mode. To prevent unauthorized users, apply a username and password.

### Grant Bubble data access to troubleshoot your app

{% hint style="warning" %}
**Security note:** the permissions you grant with this setting enables access for both the Development and Live databases.
{% endhint %}

Select a value in this dropdown to grant Bubble employees different levels of access to your app's data, helping them troubleshoot issues for you.

If the setting is **enabled:**

* **View only:** Bubble employees can view data in your app, but they cannot make any changes to the database records.<br>
* **View and run as:** Bubble employees can view data and run the app as a user to understand the user experience, but they cannot edit any database records.<br>
* **View and edit:** Bubble employees can
  * view data
  * run the app as a user
  * make changes to the database records

If the setting is **disabled (no permissions)**:

* Bubble employees will not have access to the *Data – App data* tab and cannot see/edit database records in any of your app's databases
* Bubble employees will still be able to view and edit the app
* Bubble employees will be able to see any app data exposed in app preview or the deployed, live app
* Bubble employees will be able to see data that is exposed in the [**logs**](#user-content-fn-4)[^4]

Only app admins will have the authority to change this setting. Bubble employees do not have access to change it.

### Limit access to this app with a username and password

Check this box to protect your page. When checked, you can define a username and password that restricts access to the page. The concept of username and password is completely different and separate from the concept of a user in the app.

### Username

When the app is protected, users are prompted to enter a username and password. Define the username here.

### Password

When the app is protected, users are prompted to enter a username and password. Define the password here.

### Do not apply password for live

Check this box to only apply the password protection to the Development or custom version of your application but not the Live version.

### Define a password policy

Check this box to require users to follow certain conditions when defining their password, increasing security.

### Password minimum length

Define the minimal length for the password.

### Require a number

Check this box to require users to include at least one number in their password.

### Require a capital letter

Check this box to require users to include at least one capitalized letter in their password.

### Require a non-alphanumeric character

Check this box to require users to include at least one non-alphanumeric character in their password.

<details>

<summary>Non-alphanumeric characters</summary>

Non-alphanumeric characters are any characters that are not Latin letters, non-accented letters, spaces, colons, or digits.

#### Regex

Any character that matches this regular expression is considered a non-alphanumeric character:

`[^a-zA-Z\d\s:]`

</details>

### Redirect users who haven't changed their password

When a user's password isn't valid, they can be redirected to a page to update it. Select the page to send them to. This page should offer update credentials functionality. If this setting is empty, users will not be redirected.

### Activate two-factor authentication

Check this box if you want your users to be able to use 2-factor authentication to log in to your app. This means users will need to use an app on their phones (Google Authenticator or Authy, for instance) to generate a one-time temporary token to login. This offers higher security to your application. Note that you need to be on a Production plan to use this.

### Application name to display in 2FA app

You can enter here the name of the application you want to be displayed in Google Authenticator or Authy.

### Redirect users to check their temporary token

When users have activated two-factor authentication, they will need to enter a one-time token to log in. There should be a special page in your app with a Check 2FA token action to prompt users to enter their code. You have to define here which page contains this workflow.

### Allow to render the app in an frame/iframe (X-Frame-Options)

It is a best practice in terms of security to prevent other websites to load your application in an iframe. We recommend keeping the DENY option, but if your app requires being loaded in iframes, you can pick 'Allow all iframes'. Note that this can have consequences on your application's security.

### Make new data types private by default with a privacy rule placeholder

{% hint style="danger" %}
**Note:** Beginning in April 2021, this setting is no longer visible to new apps or to apps that did not have this setting on. Instead, Bubble introduced a new public / private choice at the point of data type creation (see [here](https://manual.bubble.io/core-resources/bubbles-interface/data-tab#make-this-data-type-private)). Any previously existing apps that had this setting turned on will continue to have the setting in effect as before, though if they turn the setting off, they will lose the ability to turn it back on.
{% endhint %}

As you add more data types to your app, it is good to have them private by default (with privacy rules). That way, you will avoid exposing data that shouldn't be visible to every users until you have thought through the privacy rules that should apply to that type. When you check this box, a placeholder rule will be added to each new type so that data isn't visible until you've defined the rules. We recommend checking this box once your app is live in production.

### Do not set cookies on new visitors by default

Bubble sets cookies in the browsers of users who visit Bubble-built apps, in order to remember who the user is, and communicate information to the user's web browser necessary for displaying the page.\
\
By default, when a user visits a Bubble app without logging in, we assign them a temporary user account. This lets you use the "Make Changes to Current User" action to store data about the user, which then gets transferred to their permanent user account if they subsequently sign up for your app.\
\
Many websites, in order to protect their users' privacy and comply with regulations, are adopting a policy of asking users for consent before setting any cookies in the user's web browser. This option is designed to assist with that.\
\
When you select "Do not set cookies on new visitors by default", Bubble will not create temporary user accounts in the database for visitors who are not logged in, and will not set cookies. Bubble will only set cookies when one of two things happen: 1) you call the "Opt-in to Cookies" action, which will create a temporary user object in the database, or 2) the user signs up or logs into your app, which requires cookies.\
\
When using this option, it is your responsibility to inform the user that your app uses cookies in order to provide the app's functionality, and to call the "Opt-in to Cookies" action or a sign up action only once the user has indicated their consent.\
\
(You may also choose to enable this option purely for performance reasons, since displaying a web page to a new visitor will generally be slightly faster and less capacity-intensive if we don't create a new temporary user).\
\
We also provide an action "Opt-out from cookies" that you can use to give the user the ability to retract their consent. Calling this action will wipe all Bubble cookies from the user's browser. Note that logging into Bubble requires cookies to function properly, so calling this on a logged in user is not recommended; instead, to support the case of a user leaving your app, delete their account.\
\
When a user who has not yet opted in to cookies interacts with your app, you may still use the "Make Changes to Current User" option to store information. However, this information will not be stored on Bubble's web servers, and if the user closes their browser window, the information will be permanently lost. On opt-in or sign up, any data stored in this way will be transferred to the new temporary or permanent user that gets created.\
\
Note that this setting only controls cookies set by Bubble as part of its core functionality. Bubble plugins may still set cookies. We are exposing the ability to check whether or not the user has opted in to cookies to plugin developers, and encourage them to make sure their plugin complies with the user's settings, but we don't have the means to enforce this. Please test your app to ensure that it is not setting any cookies that you want to avoid adding.\
\
Turning on this setting will not affect anyone who has already visited your app: temporary users created for those visitors will continue to exist, as will the cookies we use to remember them. Using this setting will prevent any iframe (using the HTML element or Video element) from using cookies, so some third-party websites (like Vimeo) embedded this way may stop working when users haven't consented to cookies, as they may mandate cookies in order to work.

### Search privacy mode

Controls how Bubble enforces privacy rules on search constraints for the current application branch. A search constraint can reveal information about a field even when that field is hidden from view, and this setting determines how tightly that's restricted.

* **Off:** Search constraints are not restricted. Any field can be used as a constraint regardless of its view permission.
* **Automatic:** Constraints defined on the app's pages are allowed. Constraints that aren't defined in the app, including those sent through the Data API, require explicit constraint permission in the type's privacy rules.
* **Strict:** All constraints require explicit constraint permission in the type's privacy rules.

## General appearance

### Favicon

The favicon is the icon displayed next to the title of the page in the browser's tab. Upload any image, preferably a square PNG file.

{% hint style="info" %}
**Note:** For anti-tracking reasons, Safari does not support SVG favicons. Please consider using a png file instead.
{% endhint %}

### Progress bar color

When a workflow is running, a 2-pixel-high status bar may appear at the top of the screen. Select the color of the bar here.

### Repeating group spinner color

When data is being loaded in a repeating group, if it takes a few moments for the data to appear, a spinner is shown. Select the color for the spinner or make it invisible by making it transparent.

### Remove Bubble mention in console

If you are on a paid Plan, you can opt to remove 'This web application is entirely built without code on Bubble (<https://bubble.io>)' by checking this box.

## iOS appearance

### Hide Safari UI component

Check this box to hide the toolbar of Safari on an iPhone/iPad. This gives a more native experience for users, but it makes navigating the Web more difficult when in the app.

### Prevent the user from zooming

Check this box to prevent users from zooming on their phones with their fingers. This gives a more native experience for users. Note that this setting does not apply to Safari.

### Icon for home screen (60 x 60 pixels)

On the iPhone, users have an icon on their home screen to a specific website. Upload an icon to use in this situation. This gives a more native experience for users.

### iPhone 5 startup image (640 x 1096 pixels)

When the app takes time to load, you can force Safari to display an image until the app is fully loaded. Upload an image to use in this situation.

Note: This is for the iPhone 5.

### iPad startup image (portrait, 1536 x 2008 pixels)

When the app takes time to load, you can force Safari to display an image until the app is fully loaded. Upload an image to use in this situation.

Note: This is for the iPad in portrait mode.

### iPad startup image (landscape, 1496 x 2048 pixels)

When the app takes time to load, you can force Safari to display an image until the app is fully loaded. Upload an image to use in this situation.

Note: This is for the iPad in landscape mode.

## Custom fonts

You can add a custom font to the app. Enter the font family name as defined in the CSS file and the URL to the CSS file. It could be, for instance, 'FantasqueSansMonoRegular' and '<https://fontlibrary.org/face/fantasque-sans-mono>.' Make sure the CSS file exists and that the font family names are correct, otherwise the font will not display. Once added, the font will be at the top of the list in the dropdown menu. Each font weight must be added separately.

## Advanced options

### Enable timezone override controls

Opens up a setting to control the timezone by which your app is parsing date-times for

* date-time inputs
* the page
* backend workflows

Note that this is an advanced feature.

### Expose the option to add an ID attribute to HTML elements

If you need to specify some IDs on some elements on the page, you can check this box. A field will be shown at the very bottom of the Property Editor. See the [Unique ID property](/core-resources/elements/shared-properties#id-attribute-advanced) for more details and usage warnings.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Any Bubble user that you invite to view and/or edit your app and/or database is considered a *collaborator*.

[^3]: You can control what each individual collaborator has access to.

[^4]: Bubble offers server *logs*, to capture various interactions and activities within the platform. These logs are invaluable for monitoring, troubleshooting, and ensuring your application's security and performance.

    Article: [The Logs tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/logs-tab)
