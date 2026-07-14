# Github Integration
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/github-integration · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble integrates with GitHub so that you can save a version of your plugin in a repository, and can benefit from Git's version control features.

{% hint style="info" %}
The primary data store remains Bubble's servers, and what you have on GitHub is a **copy** of the plugin.
{% endhint %}

If you modify the code on Git (see below), you'll be able to fetch the latest commits to Bubble's storage.

## Connecting with GitHub

{% hint style="info" %}
This button will only be shown if you have already published a marketplace item or you are registered as a seller. If you are developing a free plugin, you won't be able to sync with Github until one of these conditions are met.
{% endhint %}

The first step is to link your Bubble and your GitHub accounts. If you have used GitHub to sign up, you're all set, but otherwise you can link your account in the [Account - Marketplace - settings](https://bubble.io/account/marketplace/settings) page (you first need to register as a seller on stripe in order to get access to the Marketplace - Settings tab).

<figure><img src="/files/w4lbzT11JEQ20rr07GF4" alt=""><figcaption></figcaption></figure>

Once this is done, you'll be able to use the GitHub section in the Version Tab of the plugin Editor.

## Synchronizing with GitHub

### First synchronization

The first time you hit 'Synchronize with GitHub', a new repository will be created in your GitHub account. Bubble will generate a repository name based on your plugin name you have defined in the General Tab. By default, Bubble will attempt to create a private repository. If you are not using a paid plan on GitHub, the operation will fail, and if you make your plugin Open Source, you will be able to create a public repo on the MIT license.

Note that if you delete the repository in GitHub, the connection will be reset and the next synchronization will be similar to the first synchronization. A new repository will be created.

### Subsequent synchronizations

Once the connection is set up, you will be able to regularly synchronize with GitHub. When a do so, a few situations can occur:

1. The version in Bubble's storage (the one in the Editor) is ahead of the current commit. This means you have modified the plugin in Bubble since your last synchronization, and haven't committed anything directly in GitHub. The newer version of the plugin will be pushed to Git with an automated commit message.
2. You have modified the plugin in GitHub (for instance pulling a change request, etc.) and haven't modified the version in Bubble. The new version will be fetched from GitHub and you'll be able to modify this one.
3. Both versions (in Bubble and GitHub) have been modified, with a new commit in GitHub, and this can successfully be merged with Bubble's version. The synchronization will merge and pull the latest version from GitHub to Bubble.
4. Both versions are modified, and there are some conflicts. The version in Bubble will not be modified, and a pull request will be created in your repo. You can then work on the merge, solve conflicts, pull into the master branch. Once you have done this, the next synchronization will fetch the conflict-free version to Bubble.

{% hint style="info" %}
**Tip:** If the linked Github repo is moved or deleted, that will confuse Bubble's plugin editor. If you find yourself unable to restore access, please reach out to our Success team, who will be happy to look into it for you.
{% endhint %}

## Forking plugins

One of the key benefits of integrating with GitHub is that you can now fork published open source plugins, provided the author is using GitHub as well. If that's the case, a button will appear to fork the plugin into your account. This will copy the plugin, fork the Git repository and synchronize the new plugin with the new repository. You can then work on your plugin normally, and use GitHub's native features in terms of forking when working with the author of the original plugin.

## Folder & code structure

When a plugin is synchronized with a git repository, the entire data is synchronized, in a structured manner. When you modify the plugin in GitHub (or in another code editor, or if you merge someone else's modifications), it is recommended to keep the structure identical. Here are the few key things about how a plugin's code and data is structured.

![](/files/-M5smvEB0NWPHCpapSzY)

### File formats

Data and code can be represented as JSON files, JavaScript files or HTML files. The HTML headers that are injected in the pages will be an HTML files, the code for the different elements' and actions' code will be in JavaScript. Everything else will be represented as a JSON file, and is what you can modify through Bubble's UI. Be careful when you modify JSON files, as some modifications can make the files not readable by Bubble.

### Folder structure

The folders tend to follow the architecture of the Plugin Editor. What you can find in the Shared Tech Tab is at the root level, while the API calls, the Elements and the Actions are in three separate folders. The API definition is one major JSON file, while the elements and actions are separated in sub folders.

### IDs

When you navigate the folders, you will notice a few keys in the JSON files that are unique ID (such as 'AED'). This applies to elements, parameters in APIs, etc. Please do not modify these entries, as they are used in users' apps to represent the different entries (on the other hand, you can modify captions, etc.)

### Personal data and credentials

When you are testing a plugin, in particular an API, you are using some credentials for testing purposes. This data will not be synchronized with GitHub.
