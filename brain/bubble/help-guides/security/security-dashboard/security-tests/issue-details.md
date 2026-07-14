# Issue details
> Source: https://manual.bubble.io/help-guides/security/security-dashboard/security-tests/issue-details · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Issue Explorer in the security dashboard provides a detailed list of potential security vulnerabilities in your app. In this section, we’ll break down each issue, offer suggested solutions, and provide further reading to guide you in addressing them effectively.

{% hint style="info" %}
You can see a short-form table of these issues, as well as the required permissions needed to evaluate them, in the article section below:

Article section: [The Issues Explorer issue list](/help-guides/security/security-dashboard/security-tests/issue-explorer#issues)
{% endhint %}

## Compromised API tokens

{% tabs %}
{% tab title="Overview" %}
Bubble API Tokens are 32-character keys used to authenticate API calls with your Bubble app. They serve as a way to verify whether a requester has permission to access resources and workflows in your app.

A Bubble API token grants the bearer full administrative access to your app, equivalent to the level of access you have as the app builder. This means any client with the API code can

* Read, delete or edit all your database and data types
* Trigger all publicly exposed API Workflows
* Override all privacy rules

#### Purpose

This issue is flagged to highlight the presence of an API token in your app and to remind you of the extensive access it grants. This ensures you can make an informed decision about whether to retain or remove the token based on your app’s security needs.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* You have at least one API token in your app.
  {% endtab %}

{% tab title="Solution" %}
Bubble API tokens grant broad access to your app and its data, but their use isn’t inherently wrong. The purpose of this issue is to help you evaluate whether this level of access is necessary or if you can configure an alternative setup that limits access while still meeting your app’s requirements.

#### Solutions

* **Remove:** if the API key is not in use, we recommend removing it.
* **Change authentication method**: The Bubble API token is just one way to give access to data and workflows. By using more restrictive methods, you can set the access level up to respect privacy rules and conditions (essentially querying your app as a user, instead of with full administrative privileges). The article series below covers this in-depth:

#### Learn more

* Article series: [Bubble API Authentication](/help-guides/integrations/api/the-bubble-api/authentication)
  {% endtab %}
  {% endtabs %}

## Constrainable fields

{% tabs %}
{% tab title="Overview" %}
When *Find this in searches* is enabled on a custom or *Everyone else* privacy rule, you can decide whether each field is viewable and whether it can be used as a constraint in searches.

Keep in mind that a field being non-viewable doesn't fully protect it. An attacker can still repeatedly run searches with carefully chosen constraints and piece together sensitive values from the results, even without ever seeing the field directly.

#### Purpose

This issue flags scenarios where *Find this in searches* is enabled, *View* is disabled, and *Constraint* is enabled. The reason this combination is flagged is that even though users can't see the field directly, they can still use it as a constraint in searches. By running repeated searches with different constraint values, an attacker can deduce the underlying data, effectively reconstructing the field one piece at a time.
{% endtab %}

{% tab title="Trigger" %}
This check flags any sensitive fields where *Find this in searches* is enabled, *View* is disabled, and *Constraint* is enabled.
{% endtab %}

{% tab title="Solution" %}

#### Before you make changes

When *Filter* is unchecked for a field on a privacy rule, any search using that field as a constraint returns zero results for users subject to that rule. This applies to repeating groups, nested searches, and any other expression that references the field as a constraint.

As a result, the same search can work correctly for some user roles and silently return nothing for others. The steps below help you identify which searches are affected before you make any changes.

#### When it's safe to disable *Constrain*

* **When the privacy rules is unrelated to searches in your app:** If none of the searches returned by the app search tool depend on the rule in question, unchecking *Filter* won't break anything.\
  \
  For example, suppose your app has a privacy rule that applies to logged-out users, with *Constrain* enabled on the *email* field. If only logged-in users ever need to search by email, you can safely uncheck *Constrain* on the logged-out rule, since the search isn't relevant to those users anyway.
* **The results are only used in contexts that ignore privacy rules.** If the search results are only used in backend workflows that ignore privacy rules, database triggers, or custom backend workflows triggered by endpoints that ignore privacy rules, you can uncheck *Constraint* without affecting them.

#### When the privacy rule *is* related to your searches

If the rule does relate to searches, you have two options:

1. **Leave the configuration as-is** **and accept the risk**. An attacker *may* be able to apply clever constraints across repeated searches and piece together fields you consider sensitive.
2. **Refactor your database schema** so the vulnerable field doesn't contain sensitive data in the first place.

#### Finding the right balance

Searching by constraints is a natural part of how many apps work, and this issue shouldn't be treated as a hard rule to avoid at all costs. There's some risk that users can combine multiple searches with different constraints to infer information about data they can't see directly. Whether that's a meaningful concern depends on your specific app, the sensitivity of the data, and how realistic the attack scenario is in practice.
{% endtab %}
{% endtabs %}

## Database exposure risks

{% tabs %}
{% tab title="Overview" %}
Even with privacy rules in place, data “leaks” can occur if the rules are not properly configured. Various scenarios can lead to unintentional exposure of data, and while these might seem like rare corner cases, they are more common than you might expect.

This issue serves as a warning that the security check was able to access data marked as sensitive while logged out, highlighting a potential gap in your app’s privacy configuration. It is not directly based on checking your privacy rules but rather on identifying exposed data during a logged-out state.

#### Purpose

The purpose of flagging this issue is to indicate that a non-logged-in user may have access to data marked as sensitive, potentially exposing information that should be protected.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* This issue indicates that a data type marked as sensitive has been accessed by Bubble's security check while logged out, suggesting a potential vulnerability in your app’s privacy settings.
  {% endtab %}

{% tab title="Solution" %}
This issue highlights that sensitive data is accessible to non-logged-in users, but it is not tied to any specific privacy rule misconfiguration. While we provide potential solutions in this section, it’s important to note that not all scenarios may be covered. We strongly recommend reviewing our comprehensive guide on privacy rules to help identify and resolve the issue.

#### Possible causes

* **Privacy rules that are always true:** be mindful of privacy rules that always return a true value. To illustrate with a very basic example `Current user is current user` would always return a true value.
* **Not taking empty values into account:** Many privacy rules function by comparing a field on a data type to a field on the user. For instance, you might create a rule like `This Task’s Company is Current User’s Company`. This ensures that only tasks belonging to the current user’s company are accessible.

  However, for non-logged-in users, the `Company` field on the user is empty. If there are tasks in your database where the `Company` field is also empty, those tasks may become accessible to non-logged-in users (or logged-in users with an empty `Company` field). While this scenario should ideally never occur, it’s good practice to add an additional safeguard to your dynamic expression. For example:<br>

  `This Task’s Company is Current User’s Company and Current User’s Company is not empty`.<br>

  This extra step ensures that tasks are only accessible when the user has a valid company assigned, reducing the risk of unintended exposure.
* **Not checking if the user is logged in**: To add an additional layer of security, you can also check that the current user is actually logged in. Expanding on the example above, the privacy rule may look like this:\
  \
  `This Task’s Company is Current User’s Company and Current User’s Company is not empty and current user is logged in`.

#### Troubleshooting

* **Data leaks only appear in one version of my app:**
  * Privacy rules differ between the development and live versions of your app. To ensure consistency, you need to deploy your app to make the test version live and synchronize the privacy rules.
  * Additionally, discrepancies between the databases in the live and test environments can affect Bubble's ability to identify issues. For example, if your test version has an empty database, Bubble cannot detect potential data leaks and will not flag this as an issue. It’s important to verify both versions to ensure your privacy rules and data are correctly aligned.
* **My issue is still not resolved. What can I do?**\
  If the Data Leak issue persists even after synchronizing your privacy rules and deploying the app, here are a few additional steps you can take to resolve it:
  * Run a fresh security test from the security dashboard
  * To verify the data and have a visual overview of the data leaking from your app, we suggest running a Privacy Rules Checker test from the security dashboard.
  * Advanced; If you still can't find the solution to your problem, you can duplicate your app (including database content) and open the Data API to see the leaking data and troubleshoot more easily.

#### Learn more

To learn more about how privacy rules, check out the article below:

Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
{% endtab %}
{% endtabs %}

## Default username/password risks

{% tabs %}
{% tab title="Overview" %}
Bubble allows you to secure the test version of your app (commonly called version-test) with a username and password. However, if you use the default credentials, there is a risk that someone could gain unauthorized access to the test version simply by guessing them.

The default username and password is `username` and `password`.

#### Purpose

The purpose of flagging this issue is to remind you to change the default and set your own unique credentials instead.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* The test version username and password of your app is set to `username` and `password`.
  {% endtab %}

{% tab title="Solution" %}
To solve this issue, do the following:

* Navigate to *Setting - General.*
* Look for *Limit access to this app in run mode with a username and password,* under *Privacy & Security*
* Set a unique set of credentials
  {% endtab %}
  {% endtabs %}

## Unrestricted iFrame embedding

{% tabs %}
{% tab title="Overview" %}
Allowing your app to be rendered as an iframe introduces several security vulnerabilities because it exposes your application to manipulation by external websites. Here’s a breakdown of the potential risks:

**Clickjacking**

* **What it is:** An attacker embeds your app in an iframe on their website, overlaying it with invisible elements or misleading content. Users may unknowingly interact with your app, such as clicking buttons or submitting forms, without realizing the consequences.
* **Impact:** This can result in unauthorized actions, such as granting permissions, transferring funds, or exposing sensitive information.

**Phishing**

* **What it is:** By embedding your app in an iframe, an attacker can create a page that mimics your app and tricks users into entering sensitive information, like login credentials.
* **Impact:** Users may believe they are interacting with your app, unknowingly providing their data to malicious actors.

**Malware Distribution**

* **What it is:** An attacker uses an iframe to deliver malicious scripts or downloads through your app, leveraging the trust users place in your platform.
* **Impact:** This can infect users’ devices, compromise their security, and damage your app’s reputation.

**Content Manipulation**

* **What it is:** When your app is embedded as an iframe, attackers can manipulate the surrounding content to misrepresent your app or context.
* **Impact:** This can lead to misinformation or defamation, harming user trust.

**Session Hijacking**

* **What it is:** Attackers may use iframe embedding in combination with other vulnerabilities to capture session cookies or tokens.
* **Impact:** This can give attackers unauthorized access to user accounts or sensitive data.

#### Purpose

The purpose of flagging this issue is to inform you that your app currently allows rendering as an iframe, which could expose it to vulnerabilities like the ones outlined above.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* The *Allow to render the app in a frame/iframe (X-Frame-Options)* option is enabled in your app's settings
  {% endtab %}

{% tab title="Solution" %}
Similar to other potential vulnerabilities, allowing iFrame rendering is not inherently harmful. However, if you are not actively using this feature or are unsure of its purpose, we recommend disabling it to minimize the risk of vulnerabilities like those outlined in the overview.

#### Solution

* Navigate to *Settings - General*
* Scroll to the option *Allow to render the app in a frame/iframe (X-Frame-Options)*
* Set it to *Block all frames*
  {% endtab %}
  {% endtabs %}

## Missing privacy rules

{% tabs %}
{% tab title="Overview" %}
If a specific data type is not meant to be public, you need to define privacy rules to protect it. Bubble automatically identifies data types that don't have privacy rules set up, based on:

* Fields that are defined as sensitive by Bubble's prediction model, or
* Field that have been manually set to sensitive by you

You can read more about how to set field sensitivity in the article below:

Article: [Test settings](/help-guides/security/security-dashboard/security-tests/test-settings)

#### Purpose

The purpose of flagging this issue is to identify data types that have sensitive fields, but are not protected by privacy rules.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* A sensitive data type has no privacy rules defined
  * A data type is considered sensitive if it has been marked as such either by Bubble's prediction model or through manual designation.

You can read more about how to manually mark data types in the article below:

Article: [Database rating](broken://pages/rmBQxQM1dcSb236Mmwji)
{% endtab %}

{% tab title="Solution" %}
We strongly recommend setting up privacy rules for all sensitive data types.

#### Solution 1: Set up privacy rules

* Navigate to *Data – Privacy*
* Locate the relevant data type
* Define one or more privacy rules

#### Solution 2: Change the rating of the data type

* You can update the rating of the data type to inform the security dashboard that it does not contain sensitive information. See the article below for more information about how to change database ratings.

#### Learn more

To learn more about how to protect your database with privacy rules, see the article below:

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

To learn more about how to mark data types as safe/sensitive:

* Article: [Database ratings](broken://pages/rmBQxQM1dcSb236Mmwji)
  {% endtab %}
  {% endtabs %}

## Public Bubble editor issue

{% tabs %}
{% tab title="Overview" %}
Bubble provides the option to open your app editor to other users, allowing them to view and/or edit your application. This feature can be helpful for showcasing the editor publicly or collaborating with others to resolve specific issues.

However, granting open access to your app editor poses a significant security risk. It provides unrestricted access to all aspects of your app, including sensitive data, workflows, and settings, which can expose your app to potential vulnerabilities or misuse.

#### Purpose

The purpose of flagging this issue is to make you aware that your app is currently allowing anyone to view and/or edit the app.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* The *Define who can see and modify the app editor* setting in your app's general settings is **not** set to *Private app.*
  {% endtab %}

{% tab title="Solution" %}
We strongly advice to use this setting with caution, since it gives a very broad access level to *all* users who know the URL of your app.

#### Solution

* Go to *Settings - General*
* Locate the *Define who can see and modify the app editor* setting under *Privacy & Security.*
* Set it to *Private app.*

If you want to collaborate with other users in your app without opening the editor up for anyone, you can consider using the Collaborator features instead (see below).

#### Learn more

To learn more about how you can collaborate with other users when building your app, see the article below:

* Article: [Collaboration](/help-guides/maintaining-an-application/collaboration)
  {% endtab %}
  {% endtabs %}

## Publicly accessible file uploaders

{% tabs %}
{% tab title="Overview" %}
Just like the data in your database, uploaded files can be secured using privacy rules. These rules ensure that even if someone obtains the file’s URL, they cannot access the file unless the privacy rules explicitly grant them permission.

This rule needs to be set both in the privacy rules, and the relevant file uploader element, making it easier to miss.

#### Purpose

This issue is flagged to inform you that one or more file uploaders in your app are currently set to upload files without the protection of privacy rules, potentially leaving them accessible to unauthorized users.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* One or more file uploader elements in your app don't have the *Make this file private* box checked.
  {% endtab %}

{% tab title="Solution" %}
If a file uploader element is intended to upload private files, follow these steps to ensure the files are properly secured:

* Locate the element in the *Design* tab of the Bubble editor.
* Having selected the element, locate the *Make this file private* setting in the property editor and make sure the box is checked.

Note that you need to set up your privacy rules to make sure that only the right users have access to the file. You can read more about this in the article listed below.

#### Learn more

To learn more about how to set up privacy rules, including protecting uploaded files, see the article below:

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
  {% endtab %}
  {% endtabs %}

## Publicly accessible picture uploaders

{% tabs %}
{% tab title="Overview" %}
Just like the data in your database, uploaded images can be secured using privacy rules. These rules ensure that even if someone obtains the file’s URL, they cannot access the file unless the privacy rules explicitly grant them permission.

This rule needs to be set both in the privacy rules, and the relevant picture uploader element, making it easier to miss.

#### Purpose

This issue is flagged to inform you that one or more picture uploaders in your app are currently set to upload files without the protection of privacy rules, potentially leaving them accessible to unauthorized users.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* One or more picture uploader elements in your app don't have the *Make this file private* box checked.
  {% endtab %}

{% tab title="Solution" %}
If a file uploader element is intended to upload private files, follow these steps to ensure the files are properly secured:

* Locate the element in the *Design* tab of the Bubble editor.
* Having selected the element, locate the *Make this file private* setting in the property editor and make sure the box is checked.

Note that you need to set up your privacy rules to make sure that only the right users have access to the file. You can read more about this in the article listed below.

#### Learn more

To learn more about how to set up privacy rules, including protecting uploaded files, see the article below:

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
  {% endtab %}
  {% endtabs %}

## Publicly accessible sensitive fields

{% tabs %}
{% tab title="Overview" %}
Privacy rules consist of two types of rules:

* **Dynamic rules:** these are the rules that you set up using dynamic expressions. Each rule grants access to one or more users, based on field stored on the relevant data type, and/or the user.
* **Everyone else:** the *everyone else* rule defines what everyone who don't match any of the dynamic rules should have access to.

Privacy rules operate in a way where the most “permissive” rule takes precedence over others. This means that if the everyone else rule grants access to sensitive data in searches or fields, that data will be accessible to everyone, even if more restrictive dynamic rules are in place.

#### Purpose

This issue is flagged to highlight any instances where the *Everyone else* rule is set to allow users to *View all fields*. This setting could unintentionally expose sensitive data to unauthorized users, bypassing the more restrictive privacy rules you may have configured.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* A database contains at least one sensitive field.
* The *Everyone else* privacy rule for this database allows to *See all fields.*
  {% endtab %}

{% tab title="Solution" %}
We strongly recommend setting up privacy rules for all sensitive data types.

#### Solution 1: Edit your privacy rules

* Navigate to *Data – Privacy*
* Locate the relevant data type
* make the necessary changes to the *Everyone else* rule

#### Solution 2: Change the rating of the data type

* You can update the rating of the data type to inform Bubble's security dashboard that it does not contain sensitive information. See the article below for more information about how to change database ratings.

#### Learn more

To learn more about how to protect your database with privacy rules, see the article below:

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

To learn more about how to mark data types as safe/sensitive:

* Article: [Test settings](/help-guides/security/security-dashboard/security-tests/test-settings)
  {% endtab %}
  {% endtabs %}

## Search privacy

{% tabs %}
{% tab title="Overview" %}
*Search privacy* is a branch-level application setting that controls how constraint permissions are enforced in privacy rules. Three modes are available:

1. **Strict:** The recommended setting, offering the highest level of security and control.
2. **Automatic:** A convenience and compatibility mode intended for apps where constraint permissions haven't been explicitly set.
3. **Off:** Reserved for troubleshooting and testing.

Core reference: [Search privacy modes](/core-resources/application-settings/general#search-privacy-mode)

### Purpose

This security check is meant to highlight any instances where the search privacy is not set to *Strict*. When this is the case, there may be fields in your app that are unintentionally [constrainable](/help-guides/data/the-database/protecting-data-with-privacy-rules#search-privacy-modes).
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* The search privacy setting in one or more of your branches is set to *Automatic* or *Off*.
  {% endtab %}

{% tab title="Solution" %}

#### Solution 1: Setting search mode to *strict*

* Go to *Settings – General* and find the *Search privacy* setting.
* Choose the S*trict* option.
* Then, run a new scan on the Security Dashboard.
  * Follow the instructions [here](#constrainable-fields) for any constrainable field vulnerabilities that are flagged as a result of enabling this more secure setting.

#### Solution 2: Ignore the issue

If you're just testing your app or intentionally keeping your search privacy setting on *Automatic* or *Off*, you can ignore this issue in the Security Dashboard:

* Find the *Search privacy* issue in the list.
* Click the three dots and select one of the *Ignore* options.

{% hint style="warning" icon="lock" %}
Keep in mind that once the issue is ignored, Bubble won't flag it again.
{% endhint %}

#### Learn more

To learn more about how to protect data with privacy rules and the search privacy setting, see the articles below:

User Manual: [Privacy Rules ](/help-guides/data/the-database/protecting-data-with-privacy-rules)| [Constrainable fields](/help-guides/data/the-database/protecting-data-with-privacy-rules#search-privacy-modes)
{% endtab %}
{% endtabs %}

## Secure page protection

{% tabs %}
{% tab title="Overview" %}
Bubble currently evaluates pages in two ways:

* **Public:** pages that can be accessed by anyone
* **Sensitive:** pages that can only be accessed by logged-in users

If a page is sensitive, it should contain an action that uses server-side redirection to redirect users to a different page, such as a front page or 404 page.

#### Purpose

The purpose of flagging this issue is to identify sensitive pages that don't have a proper redirect action.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* A sensitive page has no 302 redirect action
  * A page is considered sensitive if it has been marked as such either by Bubble's prediction model or through manual designation.

You can read more about how to evaluate specific pages in the article below:

Article: [Test settings | Selected pages and data types](/help-guides/security/security-dashboard/security-tests/test-settings#selected-pages-and-data-types)
{% endtab %}

{% tab title="Solution" %}
We strongly recommend setting up a server-side redirect action on all pages that contain sensitive information.

#### Solution 1: Set up a server-side redirect

* Navigate to the relevant page in the Bubble editor.
  * Add a *Page is loaded* or *User is logged out* event.
    * Set up a single *Go to page* action that sends the user to another page.
      * Add a condition that checks whether the user is logged in on that action if needed
  * If you add *any other actions*, the redirect will happen on the client side. To keep it server-side, the Go to page action must be the only action in the workflow.
  * If you add conditions [not directly tied to the current user](#user-content-fn-1)[^1]—like `Current user’s Role’s Admin is yes`, where *Role* is a separate data type—the redirect will happen on the client side. To keep it server-side, use conditions based only on the current user, such as `Current user is logged in` or `Current user’s admin is yes`.

#### Solution 2: Change the rating of the page

* You can update the rating of the page to inform Bubble that it does not contain sensitive information. See the article below for more information about how to change page ratings.

#### Learn more

To learn more about page security, read the article below:

* Article: [Page security](/help-guides/security/page-security)

To learn more about how to mark data types as safe/sensitive:

* Article: [Page ratings](broken://pages/9LRc9FfA18iJNrf0SmRG)
  {% endtab %}
  {% endtabs %}

## Sensitive data exposed in workflows

{% tabs %}
{% tab title="Overview" %}
The [*Login*](#user-content-fn-2)[^2] action enables users to access your app by entering their email and password, typically through a login form where the user submits their credentials. However, Bubble also provides the option to pre-fill this data using static values, allowing you to specify the email, password, or both directly within the action.

This can lead to two vulnerabilities:

* **Unauthorized access:** If the credentials (email and/or password) are hardcoded into the action, someone could potentially gain access to another user’s account, as the credentials are pre-filled in part or whole.
* **Data exposure:** The static credentials entered in the action are stored in your app’s code, making them visible and potentially accessible to anyone who inspects the app’s code, posing a significant security risk.

#### Purpose

This issue is flagged to notify you that one or more *Login* actions in your app have credentials pre-filled. This setup may pose a security risk, as it could potentially lead to unauthorized access or expose sensitive information.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* You have at least one action in your app where one or both of the login credentials are pre-filled with static values.
  {% endtab %}

{% tab title="Solution" %}
We strongly recommend against pre-filling login credentials in your app, as this practice can introduce significant security vulnerabilities, as outlined in the overview. Instead, allow users to enable the “Remember me” option, which securely stores their email in a cookie on their device after they log out. While there may be specific edge cases where pre-filling is considered, it’s generally unnecessary and poses avoidable risks.

#### Solution

* **Remove the pre-filled data:** get the login credentials from dynamic values entered in [text input elements](#user-content-fn-3)[^3].
* **Remember the email:** consider enabling Bubble's built-in *Remember the email* feature. This functionality stores the user’s email in a cookie on their device, ensuring the email field is automatically pre-filled in the login form when they revisit the page on the same device—even if they have logged out.

#### Learn more

* Article series: [User accounts](/help-guides/data/user-accounts)
* Core reference: [The *Log the user in* action](/core-resources/actions/account#log-the-user-in)
* Core reference: [The input element](/core-resources/elements/input-forms#input)
  {% endtab %}
  {% endtabs %}

## Sensitive data in API URLs

{% tabs %}
{% tab title="Overview" %}
By default, the endpoints specified in your API calls are not private and can be accessed by anyone who knows their location.

This may not pose a significant risk when working with third-party services that require additional authentication to access data. However, it can become a security concern when calling an endpoint that does not require authentication, as it may expose sensitive information or functionality.

Bubble leverages AI to identify API endpoints that may be sensitive. However, it’s a good practice to review all URL endpoints in your app, even those not flagged by Bubble, to ensure they don’t inadvertently expose sensitive information or functionality.

#### Purpose

The purpose of flagging this issue is to make you aware that Bubble's AI model has identified at least one URL endpoint that can be made more secure by hiding it.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* Bubble's AI model has detected at least one potentially sensitive URL endpoint that is not concealed within a parameter.
  {% endtab %}

{% tab title="Solution" %}
There are two different solutions to this issue:

#### Solution 1: Hide the URL

To secure the URLs in your API calls, you can implement a workaround by defining the endpoint URL as a private parameter within the API call. This approach conceals the URL and helps to keep it private, reducing the risk of exposure.

Here's an example:

**Before:**

In this example, we already have a parameter set up (`param1`), but the URL is not concealed.

<figure><img src="/files/PVd0JkbFsCBrlNrbBolB" alt=""><figcaption></figcaption></figure>

**After:**

By replacing the URL with a parameter (in this case we've called it `URL`), you can store the URL as a hidden parameter instead. Make sure to check *Private* to hide the parameter. This way, it will not show up in your app's codebase.

<figure><img src="/files/5RQGpolYy62WcTHk0Ks7" alt=""><figcaption></figcaption></figure>

#### Solution 2: Ignore the issue

If you don't consider the URL sensitive, you can click the *Ignore* button in the Issue explorer to not see it again.
{% endtab %}
{% endtabs %}

## Insecure API documentation (Swagger)

{% tabs %}
{% tab title="Overview" %}
Activating the Bubble API allows external systems to interact with your application through various queries. Swagger provides a way for your API to describe itself automatically, enabling other systems to understand its structure and available queries.

While the Swagger file is not inherently a security vulnerability, hiding it is a form of obfuscation. Obfuscating the Swagger file can make it slightly more challenging for an unauthorized user to identify and access your API endpoints, adding an extra layer of complexity for potential intruders.

Article section: [What is the Swagger specification?](/help-guides/integrations/api/the-bubble-api#what-is-the-swagger-specification)
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* The Data API and/or Workflow API is enabled in your app
* The *Hide Swagger API documentation access* is disabled
  {% endtab %}

{% tab title="Solution" %}
Like we mentioned in the overview, the Swagger documentation is not in itself a security vulnerability, but leaving it visible makes it easier for a potential intruder to identify your API endpoints.

If you have no use for it, or are unsure about what it does, we recommend hiding it.

#### Solution

* Navigate to *Settings - API.*
* Under *Public API endpoints*, check *Hide Swagger API documentation access.*

#### Learn more

To learn more about the Swagger documentation and what it's for, read the article section below:

Article section: [What is the Swagger specification?](/help-guides/integrations/api/the-bubble-api#what-is-the-swagger-specification)

To learn more about the Bubble API in general, check out the article series on that subject:

Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endtab %}
{% endtabs %}

## Temporary password exploits

{% tabs %}
{% tab title="Overview" %}
The [*Assign a temp password to a user*](#user-content-fn-4)[^4] action allows you to generate a new password for a user, enabling them to log in to their account and update it with a personal, unique password. However, if this action is executed client-side, there is a risk that the randomly generated password will be visible in the *Network* tab of your browser's *Developer Tools.*

#### Purpose

The purpose of flagging this issue is to highlight instances in your app where a randomly generated string is being used in conjunction with the Assign a Temporary Password to a User action. This setup could potentially expose the temporary password to unauthorized access, increasing the risk of it being intercepted or stolen.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* You have a client-side [*Assign a temp password to a user*](#user-content-fn-4)[^4] action in your app
  {% endtab %}

{% tab title="Solution" %}
This action should in most scenarios be executed server-side, using the backend workflow editor. This ensures that the password is generated on the server (as opposed to on the user's device), and does not become visible in the browser's developer tools.

#### Solution

* Move the *Assign a temp password to a user* action to the backend workflow editor (as an API workflow)
* When a new temp password is needed, call that API workflow from the frontend.

#### Learn more

To learn more about how to set up API workflows, see the article series below:

Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)
{% endtab %}
{% endtabs %}

## Unprotected test environment

{% hint style="warning" %}
This issue only appears if you are on a paid plan, as the free plan doesn't support password protecting version-test.
{% endhint %}

{% tabs %}
{% tab title="Overview" %}
Bubble provides two distinct environments for your app: Test and Live. The Test environment is designed for previewing and testing your app during development, allowing you to experiment and refine features. The Live environment is what your end-users interact with — it represents your fully deployed and operational app.

The test version of your app can be password protected, and we strongly recommend doing this.

#### Purpose

This issue is flagged to inform you that the test version of your app is not password protected, allowing anyone with the URL to access it.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* You are on a paid plan.
* The version-test version of your app is not password protected.
  {% endtab %}

{% tab title="Solution" %}
We strongly recommend always password-protecting your test version, to make sure that no one can access it without authenticating.

#### Solution

* Navigate to *Settings - General.*
* Locate *Limit access to this app in run mode with a username and password* under *Privacy & security*, and check the box
* Provide a username and password different from the default `username` and `password`.
  {% endtab %}
  {% endtabs %}

## Unauthorized collaborator access

{% tabs %}
{% tab title="Overview" %}
Bubble allows you to add collaborators to your app, enabling efficient teamwork and problem-solving during development. However, retaining collaborators indefinitely can pose a security risk.

Bubble's security dashboard helps mitigate this risk by informing you of unauthorized collaborators and asking you to ignore the notice or remove them from your app. This ensures you maintain control over who has access to your app over time.

#### Purpose

The purpose of flagging this issue is to identify non-approved collaborators that still have access to your app.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* One or more collaborators that have not been approved in the security dashboard have access to your app.
  {% endtab %}

{% tab title="Solution" %}
There are two ways to fix this issue:

#### Solution 1: Ignore the issue

* Open up the security dashboard.
* Find the *Unauthorized collaborator access* issue.
* Click the three dots and select *Ignore forever*.

Keep in mind that once ignored, Bubble will no longer flag this issue for that user. Therefore, it's important to only ignore this notice for collaborators you trust and intend to keep involved with your app long-term.

#### Solution 2: Remove the collaborator(s)

If there's no reason for the collaborator to have access to your app anymore, you can remove them.

* In Bubble, navigate to *Settings - Collaboration*.
* Locate the collaborator(s) you want to remove.
* Click *remove* at the right-hand side of the collaborator row.
  {% endtab %}
  {% endtabs %}

## Unsafe API call configuration

{% tabs %}
{% tab title="Overview" %}
How you set up authentication in the API Connector is important for keeping your external API calls secure. When an API call is set to `Use as: Data` and uses certain authentication methods, there’s a risk that sensitive information could be exposed.

If the authentication method is set to `None, self-handled`, or `OAuth2 User-Agent Flow`, the call skips Bubble’s server-side validation and privacy rules. That means data like private keys, API secrets, or other sensitive details passed in query strings or body fields could be accessible to users who shouldn’t see them.

#### Purpose

This issue is flagged to identify API Connector configurations where Bubble does not enforce privacy rules or validate requests against the current database state. In these configurations, sensitive data may be exposed or become accessible to users who should not have access. The goal is to ensure stronger control over access by using secure authentication methods.
{% endtab %}

{% tab title="Trigger" %}

#### This issue will be triggered if:

The authentication method is one of the following:

* `None or self-handled`
* `OAuth2 User-Agent Flow`

and

* An API call is set to `Use as: Data`
  {% endtab %}

{% tab title="Solution" %}
To protect your API authentication setup, follow these recommendations:

#### Use private key in header authentication

Switch to the `Private key in header` method. This ensures:

* The key is stored securely and only sent from the server
* Bubble’s server-side logic enforces privacy rules
* Sensitive information isn’t exposed on the client side

#### Review how you pass sensitive parameters

If you need to keep the current authentication method, avoid passing private keys or sensitive data as query strings or body parameters. Use headers or server-side workflows instead.

#### Add server-side validation

Set up server-side workflows that check incoming requests against your database and privacy rules before making the external API call. This helps prevent unauthorized access.
{% endtab %}
{% endtabs %}

## Unsafe Google Maps API token

{% tabs %}
{% tab title="Overview" %}
To integrate Google Maps into your Bubble app, you’ll need to input a Google Maps API key into the Bubble editor. Keep in mind that this API key is publicly accessible, which means it could potentially be discovered and misused by unauthorized individuals.

#### Purpose

The purpose of flagging this issue is to notify you that your Google Maps API key is not restricted to your app’s domain, which leaves it vulnerable to potential misuse by unauthorized parties.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* You have a Google Maps API key that is not restricted to your app's domain.

Bubble performs this test by locating your API key, and sending a request from a different server. If the request goes through, the API key is vulnerable for misuse, and the issue is flagged.
{% endtab %}

{% tab title="Solution" %}
This issue is a bit differerent from most security dashboard issues, as it's not fixed in the Bubble editor, but in your Google Cloud Console settings.

#### Solution

* Open up [Google Cloud Console](https://console.cloud.google.com/)
* Navigate to *APIs and Services* and then *Credentials* ([direct link](https://console.cloud.google.com/apis/credentials) if you're logged in).
* Click on the API key you want to restrict<br>

  <figure><img src="/files/UAmrYDB3oKpXlXANTX52" alt=""><figcaption></figcaption></figure>
* Under *Set an application restriction*, choose *Websites.*\
  ![](/files/SvuItai67cWC5EGmjC1B)
* Then, enter these 4 values, assuming “myapp” is your App ID (see here for instructions on finding your App ID) and “mydomain” is your application domain.\
  \
  Be sure to add each URL twice: once for the live version and once with ‘version-test’ to allow requests from your test environment as well.\ <br>

  <figure><img src="/files/hOIiIalutZddTRERDp6B" alt=""><figcaption></figcaption></figure>
* Click *Save.*
  {% endtab %}
  {% endtabs %}

## Sensitive credentials or parameters exposed

{% tabs %}
{% tab title="Overview" %}
This issue is flagged when a secret key or sensitive parameter is accessible in a public-facing or client-side context.

Sensitive values — such as secret keys, API keys, access tokens, or API parameters containing confidential data — should not appear in page code, client-side workflows, or publicly accessible configuration fields. If exposed, they may be discovered and misused by unauthorized parties.

{% hint style="warning" icon="lock" %}
In some cases, integrations may continue functioning normally even when sensitive values are publicly accessible.
{% endhint %}

#### **Purpose**

This check helps prevent unauthorized access, service abuse, and data exposure by identifying sensitive values visible in the browser or other client-accessible locations.Exposed credentials or parameters may allow unauthorized parties to:

* Access third-party services
* Read or modify protected data
* Abuse API usage limits
* Generate unexpected charges
* Compromise payment systems or integrations

Even if your app appears to function correctly, exposed sensitive values represent a significant security risk. Sensitive data should only be handled in secure, server-side contexts. When stored in protected plugin fields, marked as private in the API Connector, or used exclusively in backend workflows, these values are not sent to the client and cannot be inspected via browser developer tools.
{% endtab %}

{% tab title="Trigger" %}
This issue may be triggered when Bubble detects a value resembling a secret or sensitive parameter in a client-visible location. Common scenarios include:

1. **Secret key in a public plugin field**
2. For example, entering a Stripe secret key into a field intended for public values (such as *Client ID* or *Publishable Key*), making it accessible in the client.
3. **Public API Connector parameter that appears sensitive**
4. If an API parameter is not marked as private, its value may be exposed in the browser. When such a parameter contains sensitive data, it indicates a potential security issue.
5. **Sensitive value in client-side code**
6. Sensitive data may be detected in locations such as:
   * Page source
   * Run mode inspector
   * Element properties
   * Client-side workflows
   * Data sources
   * Public API calls
   * Initialization values in API calls

Values in these locations can be extracted through browser developer tools or network inspection.

{% hint style="warning" %}
**Please note:** This check relies on automated detection methods and **may not identify all instances of exposed sensitive data**. Some cases may go undetected depending on how values are structured, named, or used.

Always review your app manually to ensure that no sensitive credentials or parameters are publicly accessible.
{% endhint %}
{% endtab %}

{% tab title="Solution" %}

#### Solution

**1. Rotate exposed credentials**

If a secret key or credential has been exposed, **generate a new one** with the service provider and **revoke or disable the compromised key**. This is especially critical for services like Stripe.

**2. Store sensitive values securely**

Ensure all sensitive data is kept in protected, server-side contexts:

* Use designated secret key fields in plugins
* Avoid placing secrets in public fields such as *Client ID* or *Publishable Key*
* Mark sensitive API Connector parameters as private

**3. Move logic to backend workflows**

For dynamic credentials (e.g., per user or request):

* Perform API calls in backend workflows
* Ensure credentials are never initialized or referenced in the browser

**4. Remove client-side exposure**

Eliminate sensitive values from:

* Page elements
* Option sets
* Custom states
* Client-side expressions
* URL or query parameters
* API initialization values

**5. Rescan your app**

* After applying fixes, rescan your app in the Security Dashboard to confirm the issue has been resolved.
  {% endtab %}
  {% endtabs %}

## Unprotected backend workflow

{% tabs %}
{% tab title="Overview" %}
The Bubble API allows you to set up API workflows that can be triggered either by your app or external clients, such as other systems or applications. However, if an API workflow is configured to run without requiring authentication, it can be executed by anyone who knows the endpoint. This can create a potential security vulnerability, as unauthorized entities could exploit it to interact with your app.

#### Purpose

The purpose of flagging this issue is to notify you that one or more of your API workflows have the *This workflow can be run without authentication* option enabled. This setting allows anyone with the endpoint URL to execute the workflow, potentially exposing your app to unauthorized access.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* One or more of your API workflows have the *This workflow can be run without authentication* option enabled
  {% endtab %}

{% tab title="Solution" %}
There are two ways to solve this issue:

#### Solution 1: Enable authentication on the workflow

If the workflow doesn't need to be executable without authentication, you can disable this option.

* Navigate to the backend workflow editor.
* Locate the API workflow.
* Uncheck *This workflow can be run without authentication.*

Note that some requests, such as webhooks, may still need to be able to access the workflow. If so, use the method below.

#### Solution 2: Set up a private Bubble API key

If a client needs to access the workflow but cannot log in as a regular user (such as for webhooks), consider securing the workflow by requiring a Bubble API key. This adds an additional layer of security while allowing external systems to interact with your app.

* Navigate to *Settings - API*. You will see a button called "Create a new API Token".
* Click it and give the API key a descriptive name (such as the name of the webhook client, e.g. "Stripe").
* You will now see your private key generated randomly by Bubble.
* Add this key to the endpoint that the webhook needs to access, such as:\
  `https://yourappid.bubbleapps.io/version-live/api/1.1/wf/your-endpoint?api_token=XXX`\
  \
  (where XXX represents the code you just generated)<br>
* Uncheck *This workflow can be run without authentication.*
  {% endtab %}
  {% endtabs %}

## Weak password policies

{% tabs %}
{% tab title="Overview" %}
Bubble allows you to set a password policy in your app, that forces all users to use a password that:

* Have a minimum length (specified as number of characters)
* Require at least one number
* Require at least one capital letter
* Require at least one non-alphanumeric character

These four options can be configured independently, allowing you to require any combination of them, from just one to all. Not enabling this feature allows users to set weak passwords, such as common dictionary words or names, which can be potentially guessed or brute-forced by malicious actors.

#### Purpose

The purpose of flagging this issue is to make you aware that your app currently doesn't have a password policy set.
{% endtab %}

{% tab title="Trigger" %}
This issue will be triggered if:

* None of the password policy options in your app's settings have been set

Note that it will only trigger when all options are empty. In other words, it can still be worth looking over your password policy eve if Bubble is not flagging the issue.
{% endtab %}

{% tab title="Solution" %}
We recommend implementing a password policy for all apps that handle sensitive information, as users often choose short, easily guessed passwords, such as common dictionary words or names.

#### Solution

* Navigate to *Settings - General.*
* Scroll to *Define a password policy* under *Privacy & Security.*
* Set a password policy

We recommend setting a password policy that requires a minimum of 8 characters, including at least one number, one uppercase letter, and one special character.
{% endtab %}
{% endtabs %}

[^1]: Because current user data loads with the page, conditions using **Current user’s \[field]** trigger a server-side (302) redirect. Adding deeper conditions like **Current user’s company’s name** requires extra queries, causing a client-side redirect and potentially exposing some page data.

[^2]: The *login* action lets your users log in to your app using their email and a password as credentials.

    Reference: [The login action](/core-resources/actions/account#log-the-user-in)

    Article series: [User accounts](/help-guides/data/user-accounts)

[^3]: The input element is a single-line text field where users can enter text, which can then be used dynamically in your app. For login forms, input elements are commonly used to collect user credentials, such as email and password, enabling secure access to your app.\
    \
    Reference: [The input element](/core-resources/elements/input-forms#input)

[^4]: *Assign a temp password to a user* action allows you to generate a new password for a user, enabling them to log in to their account and update it with a personal, unique password.

    Reference: [Assign a temp password to a user](/core-resources/actions/account#assign-a-temp-password-to-a-user)
