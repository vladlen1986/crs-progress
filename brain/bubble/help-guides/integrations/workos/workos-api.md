# WorkOS API
> Source: https://manual.bubble.io/help-guides/integrations/workos/workos-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
In configuring your app’s integration with WorkOS, you'll find that a big part of the setup happens within WorkOS itself. For up-to-date documentation on this process, be sure to refer to WorkOS documentation.

External page: [WorkOS Docs](https://workos.com/docs)
{% endhint %}

The WorkOS API plugin gives you tools for integrating advanced WorkOS functionalities into your app. This includes managing Single Sign-On (SSO) connections, efficient handling of organizational data, and offering capabilities to create, update, and manage organization profiles within your app.

Additionally, with [Directory Sync](#user-content-fn-1)[^1] features, you can keep user and group information in sync with your organizational directory. The plugin also supports generating [Admin Portal links](#user-content-fn-2)[^2] and validating webhooks[^3], aiding in secure and straightforward administration. The plugin lets you use these features without having to set them up in the API Connector.

Installing the plugin gives you access to the API calls listed below. In the workflow editor, you will find these actions under Plugins - WorkOS API. You can also search for WorkOS to find them quickly.

<figure><img src="https://lh7-us.googleusercontent.com/iFDPECPz8ryVt6bXqtzSNaV0_UqQpdm-9E0ar-rYX0KVHELUuRIcC80lepcKB02iIMAcbOzlNinZ7WpnffZ14SSc2I7k8OSHVkElwq2EXxi5HHtehshaz6jVVm89Nq0aV14csbJxEHEGrIQR_BFMVog" alt="" width="375"><figcaption><p>You will find all the WorkOS-related actions in the <em>Plugins</em> section of the action menu. You can also find them quickly by searching for <em>WorkOS</em>.</p></figcaption></figure>

## Actions

The following new actions are added to your app:

### SSO (Single Sign-On) API

* Get Connection: Retrieves details about a specific SSO connection.
* List Connections: Retrieves a list of SSO connections for your application.

### Organizations API

* Get Organization: Fetches information about a specific organization.
* List Organizations: Retrieves a list of organizations associated with your application.
* Create Organization: Allows you to create a new organization.
* Update An Organization: Updates the details of an existing organization.
* Delete Organization: Deletes an organization.

### Admin Portal API

* Generate A Portal Link: Generates a link to the WorkOS Admin Portal.

### Directory Sync API

* Get A Directory: Retrieves information about a specific directory.
* List Directories: Retrieves a list of directories associated with your application.
* Delete A Directory: Deletes a directory.
* Get A Directory User: Fetches details about a specific directory user.
* List Directory Users: Retrieves a list of users within a directory.
* Get A Directory Group: Fetches details about a specific directory group.
* List Directory Groups: Retrieves a list of groups within a directory.

### Webhooks

Validate Webhook: used to test webhooks.

## Other ways to learn

<details>

<summary>Articles</summary>

* **Article series:**[ Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)
  * **Article:** [The API Connector](/help-guides/integrations/api/the-api-connector)
  * **Article section:** [Webhooks](/help-guides/integrations/api/introduction-to-apis#webhooks)
* Article series: [WorkOS](/help-guides/integrations/workos) (introduction to WorkOS)

</details>

[^1]: Directory Sync is the process of synchronizing user and group data between an organization's directory (like Microsoft Active Directory or Google Workspace) and various applications.

    This ensures that user information, such as email addresses and job roles, stays up-to-date across different platforms.

[^2]: Each of your administrative end-users will have access to a unique Admin portal. This action generates a link with the corresponding parameters that takes the user to the correct dashboard.

[^3]: WorkOS employs webhooks to keep your application promptly informed about specific modifications in your connections.

    Each webhook needs to communicate with an API Workflow endpoint.\
    \
    Article section: [Introduction to APIs | Webhooks](/help-guides/integrations/api/introduction-to-apis#webhooks)
