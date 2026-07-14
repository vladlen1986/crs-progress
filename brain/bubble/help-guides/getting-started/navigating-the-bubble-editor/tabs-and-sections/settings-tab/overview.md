# Overview
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/overview · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## My plan

### My plan

Shows the current subscription plan for the app, including plan name, price, and a short description. Lists key inclusions such as workload units, file storage, app editor count, server log hours, and development version. Includes a button to change plans and links to learn more about plans and pricing.

### Workload

Displays how many [workload units](#user-content-fn-1)[^1] have been used during the current billing cycle, along with the total monthly allocation. Shows whether overages are enabled or disabled. Includes options to change the plan or upgrade for more workload, and a link to view usage metrics.

### Storage

Indicates the percentage and amount of file storage currently in use out of the total allocation. Includes options to change the plan or upgrade for more storage, and a button to view file storage details.

### Plugins

Lists the total number of plugins installed in the app, along with the name, publisher, and license type for each. Includes a button to manage plugins.

## General

### Privacy and security

This section controls who can access and edit your app. It includes settings for application rights, password protection, two-factor authentication, and additional security options like iframe rendering and file upload restrictions. Some features in this section require a Growth plan to deploy.

#### Password protection

Allows you to enter a username and password that must be entered before your app can be viewed in run-time. Can be applied only to your Development environment, or to both Development and Live. We highly recommend keeping your Development environment password protected with a unique username and password.

#### Two-factor authentication

Allows you to enable two-factor authentication for users logging in to your app.

### General appearance

Customize basic visual elements of your app, including the favicon, progress bar color, and the loading spinner color used in repeating groups.

<details>

<summary>Favicon and progress bar/spinner colors</summary>

{% hint style="info" %}
A **favicon**, short for "favorite icon", is a small image that represents your app.

It's the little icon you see in the browser tab next to the title of the page, and it also often appears in bookmarks, browser history, and on shortcuts if you save a website to your home screen on a mobile device.
{% endhint %}

## Setting a favicon

To assign a favicon to your app, first navigate to *Settings - General* and scroll to the *General appearance* header.

Directly underneath you will find the *Favicon* settings, which allows you to upload an image to be used as the favicon. The favicon should be a square image, and keep in mind that:

* Favicons should be in PNG or JPG format. SVG is not supported by all browsers.
* It may be viewed as small as 16x16 pixels: small details such as text may be lost
* Some browsers have a dark mode: darker favicons may become hard to see against a dark background

## Changing the color of the progress bar and spinner

The progress bar is the loading bar at the top of the page when Bubble performs certain tasks such as writing to the database. The *spinner* is the spinning icon visible when data is loading, such as when Bubble is fetching data for a repeating group.

The color of both of these can be changed by navigating to *Settings - General* and scroll to the *General appearance* header. There you will find the two settings:

* Progress bar color
* Repeating group spinner

{% hint style="info" %}
To efficiently maintain colors and consistency across your app, we recommend using Color variables. This can even be applied to app-wide settings such as the progress bar and spinner. You can read more about color variables in the article below.

Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)
{% endhint %}

</details>

### General services API keys

Add API keys for services Bubble integrates with, such as Google Geocode and Google Maps. These keys are required when using a custom domain.

### Algolia

Enable Algolia search in your app. This feature requires a Growth plan to activate.

### iOS appearance

Manage how your app appears on iOS devices. Upload startup images for different screen sizes and configure behavior such as hiding the Safari UI or disabling zoom gestures.

### Custom fonts

Add custom fonts to your app by specifying a font name and linking to a CSS file path. Each font weight must be added individually. External resources like FontLibrary are supported.

### Design import

Redirects you to the Figma-to-Bubble design converter, which replaces the previous in-editor design import tool.

### App file management

Remove unused items to keep your app lightweight and improve performance. Tools are available to optimize the application and clean up app changes history.

### Importing and exporting

Export or import the full app configuration, including pages, workflows, and settings. These options require a Growth plan to use.

### Advanced options

Enable additional settings like timezone overrides for date and time inputs or page-level behavior controls. You can also expose the option to add an ID attribute to HTML elements, which is helpful for applying custom CSS or targeting elements with JavaScript.

<details>

<summary>Exposing the HTML element ID attribute</summary>

Exposing the ID attribute for elements in Bubble is useful for a number of different reasons. For example, you can use it to apply custom style or binding Javascript code to specific elements. Some plugins also require that you identify an element using the ID attribute.

### Enabling and setting the ID attribute

Exposing an ID attribute on elements is disabled by default, but can be enabled by:

1. Navigating to *Settings - General*, scrolling to the *Advanced options* header and checking the *Expose the option to add an ID attribute to* [*HTML elements*](#user-content-fn-2)[^2] checkbox
2. Then, navigate to the element to which you want to apply an ID, open up its property editor and scroll to the bottom of the *Appearance* tab. See the illustration below:

<figure><img src="/files/y7zQUEhGmHDcPvPSKY5A" alt=""><figcaption></figcaption></figure>

### Formatting an ID

When formatting an ID, it's useful to stick to a few rules to ensure compatability with different technologies and browsers:

1. **Uniqueness**: The ID must be unique within a page. You can use dynamic content in the ID Attribute, such as including the index of a the cell of a repeating group.
2. **Start with a Letter**: It should start with a letter (uppercase or lowercase) followed by any combination of letters, digits, hyphens, underscores, colons, and periods.
3. **No Spaces**: It should not contain any spaces.
4. **Case Sensitivity**: IDs are case-sensitive. For instance, `elementID` and `elementid` would be considered different IDs.
5. **Avoid Special Characters**: Though some special characters like hyphens and underscores are allowed, it's generally a good practice to keep IDs alphanumeric to avoid any unexpected behavior in different browsers or technologies.

Lastly, whenever you reference an ID, keep in mind that the ID string matches exactly with the one assigned to the element. Since IDs are case-sensitive, even a slight variation in case or an extra space can cause the reference to fail. We recommend copy-pasting the ID to make sure it matches.

</details>

#### Show parentheses in dynamic expressions in editor

When enabled, this feature visually clarifies the order of operations in dynamic expressions by automatically inserting parentheses. For example, an expression like:\
\
`Current Page’s Width + 2 * 3`\
\
will display as:\
\
`(Current Page’s Width + 2) * 3`\
\
This helps you understand how the expression will be evaluated at runtime.

Expression parentheses are especially helpful for:

* Advanced users working with complex or nested expressions
* New users learning how Bubble handles expression logic

In addition to improving readability, this feature makes it easier to insert, move, or modify parts of your expression. Enabling parentheses in dynamic expressions can also unlock expression structures that aren’t otherwise possible. In some cases, parentheses are required to construct more advanced logic, especially when chaining multiple operators or formatting steps together.

<figure><img src="/files/vcT70GzYghWk2ZL9Wvnn" alt=""><figcaption><p>In this example, with parentheses <strong>disabled</strong>, you can’t add the <code>trimmed</code> modifier because Bubble treats the expression as a single, linear chain and doesn’t allow that additional operation at this point.</p></figcaption></figure>

<figure><img src="/files/oDC9PZbiaCvegflGoXJB" alt=""><figcaption><p>With parentheses <strong>enabled</strong>, Bubble evaluates the grouped part of an expression first and treats the result as a standalone value. This makes it possible to apply additional operators and modifiers that aren’t available in a single, linear expression.</p></figcaption></figure>

For example, certain combinations of modifiers, such as applying both `trimmed` and `lowercase` to the same value, may only be achievable when parentheses are enabled. By allowing you to explicitly group parts of an expression, parentheses give you finer control over evaluation order and make it possible to build more complex expressions that would otherwise be out of reach.

## API

### Public API endpoints

Manage access to your app’s APIs and backend workflows. You can enable the Workflow API, Data API, and choose whether to hide the Swagger documentation. Deployment of these features requires the Growth plan.

Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)

### Infinite recursion protection

Set limits on how many times a workflow can schedule itself (recursively) to prevent accidental infinite loops. Limits can be set separately for development and live environments. If a workflow exceeds the limit, it is automatically stopped.

Article:[ Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)\
Article: [Recursive workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

### 3rd party OAuth / SAML access

Configure login redirects for OAuth or SAML-based authentication. Use this section to add and manage third-party apps for SSO.

### Discourse SSO

Set up single sign-on with Discourse forums. You can enter the base URL, SSO secret, and optional flags for account setup behavior. You’ll also need to deploy your app and enable SSO in Discourse’s settings using the provided Bubble API URL.

### Advanced

Download your app’s public [JSON web key](#user-content-fn-3)[^3] for use in external authentication or verification workflows.

## Collaboration

### Users editing this app

Manage who can collaborate on your app and control the level of access each user has. You can set permissions for app editing, data access, log viewing, and limit access to only the development version. Admin rights can also be toggled per user.

### Invite a user

Invite collaborators by entering their email address. You can choose to invite them or transfer app ownership. This section also includes an option to show other users’ cursors while they edit the app in real time. A Growth plan is required to deploy with collaborators.

Article: [Collaborators](/help-guides/maintaining-an-application/collaboration)

## Languages

### General settings

Set the primary language for your app and optionally connect a language field on the user type to support language-specific experiences.

### Application texts and messages

Manage the static text content used throughout your app, such as system messages or labels. You can create new texts, edit existing ones, and export or import translations using CSV files. This section also supports multi-language configurations based on your selected language.

Article: [Translating your app](/help-guides/data/static-data/app-texts-translations)

## Sub apps

### Sub applications

Create sub apps that inherit functionality from your main app. You can optionally copy the database from the main app when creating a sub app. This feature is useful for managing white-labeled apps or app instances for different clients. Requires the Team plan.

### Push to sub applications

Push updates from your main app to existing sub apps. This helps keep all sub applications in sync with your latest changes. This feature also requires the Team plan.

Article: [Sub applications](/help-guides/optimizing-an-application/sub-apps)

## Versions

### Bubble release tier

Controls how your app receives updates to the Bubble platform. You can choose a release tier (e.g., immediate or delayed) depending on how quickly you want to adopt platform changes. This feature requires the Growth plan.

### Available Bubble Engine versions and current version

Shows which Bubble Engine version your app is currently using, along with available updates. You can review version details and choose to upgrade when you're ready. This helps you manage stability and take advantage of engine improvements.

### Beta features

{% hint style="warning" %}
**Note:** Beta features are experimental and may be changed or removed at any time.
{% endhint %}

Allows you to enable features that are still in development and not yet part of a stable release. These features can be toggled on or off at any time, but must be deployed to use in the Live version. You can also provide feedback or report issues directly.

## Notifications

#### Manage your notifications

Set up custom alerts to monitor your app’s workload usage. Notifications help you stay informed and take action before hitting usage limits. Use the *Create notification* button to get started.

[^1]: Workload units measure the computing resources your app uses, such as running workflows, processing actions, and database requests.

    Article series: [Workload](/help-guides/workload)

[^2]: HTML elements in this context is not to be confused by the Bubble HTML element type.\
    \
    In the context of ID attributes, HTML element refers to *any* element placed on the page, and the ID is a part of the HTML code that helps your browser render the page.

[^3]: The app’s public JSON key is used to verify signed data from your app, such as authentication tokens, in external systems.
