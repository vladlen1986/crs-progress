# API
> Source: https://manual.bubble.io/core-resources/application-settings/api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for all experience levels<mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (2)" %}
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
  {% endtab %}
  {% endtabs %}

## Public API endpoints

### Enable Workflow API and backend workflows

Check this box if you want the app to expose an API that you or other developers/services can access to run API workflows. In addition to API workflows (which can be used for scheduled workflows), there are two other types of backend workflows: recurring events and database change trigger events. Unchecking this box will disable the API endpoint. It will not stop backend workflows from running. You can pause the scheduler in the Logs tab to stop these workflows from running.

### Enable Data API

Check this box if you want the app to expose an API that you or other developers/services can access to read or write the app data directly. When checked, select which types to expose as an API in the options that display.

### Use field display instead of ID for key names

GET API calls or Return Data actions can either return data with the keys being a fixed ID or use the display defined for the field in the Data Types section in the Data Tab. Choose this setting here.

### Hide Swagger API documentation access

Check this box if you want the app to hide the automatically generated Swagger API documentation that you or other developers/services can access. See the [Swagger Specification](/help-guides/integrations/api/the-bubble-api#swagger-specification) section for more details.

{% hint style="warning" %}
Warning

Hiding this may break some Bubble App Connector features.
{% endhint %}

## 3rd Party OAuth / SAML Access

If the app exposes an OAuth2 protocol, meaning users can log in to other websites using their credentials with the app, you must define the page they get redirected to once they authenticate. Select the page here.

* When your Bubble app is used as an OAuth provider, a GET call is made to:\
  \
  `https://[Your-App- URL]/version-test/api/1.1/oauth/authorize`\
  \
  with the client\_id and redirect\_uri as parameters.
* When this is successful, a parameter, "code", is sent back in the URL, to the external service
* Next, the external service must execute a POST call to:\
  \
  `https://[Your-App-URL]/version- test/api/1.1/oauth/access_token`\
  \
  with parameters: "client\_id", "client\_secret", "redirect\_uri", and "code". This is known as the token endpoint.
* Lastly, the app will respond with "access\_token", "expires\_in", and "uid" parameters that the external site can store for the user.
  * The access\_token is used in future calls to the Bubble app from the user within the external app (until expiry)
* Refreshing the token: In the POST body, set grant\_type to "refresh\_code" and send the refresh token as the refresh\_token received previously. You will need to include the same client\_id and client\_secret used when getting the token in the first place.

## Discourse SSO

For apps on the Growth plan and above, the Bubble app can be used as a single sign-on (SSO) provider for a Discourse forum.

For more information and set-up instructions on the Discourse side, please see [this article](https://meta.discourse.org/t/discourseconnect-official-single-sign-on-for-discourse-sso/13045).

### Discourse base URL

This is the URL for your Discourse forum, where you want your app's end-users to be able to log into with their app username and password.

### Discourse SSO secret

This is a token generated from Discourse.

### Suppress welcome message flag

If this checkbox is not checked, any user logging in via your app into your Discourse forum will receive Discourse's welcome email.

### Require activation flag

Checking this setting will have Discourse send email verification emails to any user who creates an account via SSO. This is generally recommended by Discourse.

### Default avatar when creating the account

If this is set, all new users created via SSO in your Discourse forum will have this image as their initial avatar.

## Advanced

### Download public JSON web key

Certain custom integrations with other web services will require the "public JSON web key" of your Bubble app. This is where you can download it.

## Other ways to learn

<details>

<summary>User manual articles</summary>

#### The API tab

For a more in-depth and explanatory of the API section of Bubble's settings, see the article below:

Article: [The API tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab#api)

#### APIs

APIs are a broad topic and among the more complex of Bubble's features. If you are new to the subject we recommend reading our extensive guide to APIs:

* Article series: [API](/help-guides/integrations/api)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Any Bubble user that you invite to view and/or edit your app and/or database is considered a *collaborator*.

[^3]: You can control what each individual collaborator has access to.
