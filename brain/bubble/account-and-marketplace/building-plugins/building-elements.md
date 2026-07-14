# Building Elements
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/building-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<details>

<summary>System hard limits</summary>

When creating plugins for Bubble, it's important to be mindful of the Bubble's hard system limits. These constraints for plugin development mirror those present in general Bubble development. The article below covers this subject:

Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

</details>

Building elements is one of the main possibilities that Bubble Plugins offer. Using Javascript, you can create a new User Experience for the end user, while letting the plugin users leverage the visual editor to add the element to their app's pages, display dynamic data, etc.

Building an element requires you to be familiar with how elements work in Bubble, the different type of fields that can be filled for them, etc. Note that building elements require some Javascript and web development knowledge. We recommend asking for help on the forum if you need guidance when building a new plugin. You can see a simple implementation [here](https://bubble.io/plugin_editor?id=1487181547537x364191731148390400\&tab=tabs-4).

(Note: different parts of the plugin will have different character limits depending on where they show up in the UI. Be sure to preview your plugin before publishing to make sure everything looks as desired.)

## Adding elements to a plugin

A plugin can offer any number of elements. You add a new element by clicking on the 'Add a new element button', and you navigate among elements by clicking on the relevant element (or subsection) in the left panel.

![](/files/-M5sc4iMDX90_MkyHaHz)

## Testing a plugin

Elements should be tested in the Editor and in run mode. Testing will happen in edit-mode, to see how the Property Editor renders, and mostly in run mode when you'll test your code. You test a plugin by adding an app to your plugin, and then clicking on the test button. If the plugin is not already installed in your test app, the plugin will be added to it. It's a good habit to keep the test app opened, clicking on the 'Go to test app' button will refresh the existing tab and fetch the latest version of your plugin.

![](/files/-M5sc4iPOSltjPmhjayp)

## Building the element

### Defining general properties

The first thing you need to do when you're building an element is define the Edit Mode properties that will control how the element behaves in the editor. In particular, you'll need to pick a name, a category, an icon and an image placeholder (running the element code in the editor isn't possible, so you should have an image that represents your element).

Once this is done, you'll start picking the properties that apply to the element and define the fields the user will have to fill when using the element in their app. First, you have the option to use Bubble standard properties for simple CSS options. You'll be able to pick background properties, dimensions, borders, etc. that will be applied to the outer div. These properties are optional, it is possible to build an element without relying on them (except position and size: if you want the element to be resizable, you'll need to pick the 'Resizable' option)

![](/files/-M5sc4iRdhfJxcYnbUQn)

{% hint style="warning" %}
**Note**: When loading fonts from a source other than Google Webfonts, the library Bubble uses will append the font\_face property with the suffix `:::custom` rather than the font family name.
{% endhint %}

### Defining fields

The next section is where you define fields. A field is a property the user will fill in the Property Editor. A field is defined by a name, a caption, and an editor type.

You have several choices for the editor type:

* **Static Text, Static Number:** simple input where users will type something
* **Checkbox:** checkbox that will return true/false in run-mode
* **Color:** this will show a color picker, and the value will be the RGBA code of the color-stop
* **Dropdown:** this is useful if you want to offer your users a set of options. You'll need to enter the different options separated by commas in the following input
* **Static Image:** this will enable the user to upload an image.
* **Dynamic value:** this will show users a control where they'll be able to define a dynamic expression, using the Bubble Composer. You'll need to define which type of data should be expected by the control in the editor (text, number, address, etc.). The data may also be a list if you check the relevant box.
* **App Type:** this is a specific case, where you need users to define the type of data that will be used by your element. For instance, for a map element, you'll probably want a field which will be 'Type of markers', and users will pick one of their types. Once you have defined such a field, you'll be able to define some fields that prompt the user to pick a field within that type. For instance, for a map, you'll need user to define which field of the type actually contains the address. As you'll need to know the data type of the field, you can restrict the field types so that it only shows addresses, for instance.

![](/files/-M5smtkrjWCHoPCQIJUK)

A field can be optional (and hence won't be marked as missing in the Property Editor), and 'In style'. If that box is checked, when users define a style in the Bubble Editor for your element, the field will be included. Typically, colors and other styling options will be in styles, while data sources won't.

### Defining states

States lets you expose some data from your elements to other elements and actions in the Application Editor. For instance, an input can have a value, a map can have a 'selected marker', etc. While your code will be responsible to keep the state with the relevant value, you need to declare the different states you want to expose. For each state, you'll need to define the data type so that Bubble knows how to interpret the value in the Editor.

![](/files/-M5smtkt3B25kwhKr0ph)

{% hint style="warning" %}
States defined in plugin elements run some initialization code which is evaluated with ALL dynamic properties for that element. If you have a conditional plugin-defined (non-Bubble) property that depends on that element's own value, it will create a circular dependency error.

Until a (breaking) fix is released, this error can be avoided by instead initializing the plugin element state in the Element's init code, for example: `instance.publishState(state_id, initial_value)`
{% endhint %}

### Events and actions

Events and Actions are the way your element can trigger a workflow and be modified by the user's workflows.

Events can be triggered by your element. In order for your elements to trigger a workflow, like a click on it, for instance, you'll need to declare the different events your element can trigger so that Bubble can populate the relevant list in the Workflow Tab. Your code will then be responsible for triggering the event (see below).

Lastly, elements can have some actions that are applied to them. For instance, reset a map to hide all markers, etc. Here again, the actual action will be defined in Javascript, but you'll need to define the action names, and the different fields that will apply to it. The field definition is similar to the fields of the element.<br>

![](/files/-M5sc4iXxuDUE2k2K18H)

### Code

Once these different pieces of information are defined, you can get into the code of your elements. That's what you do at the bottom of the editor. For each function, you'll see a code editor and contextual documentation that shows the different objects you'll be able to access in the functions. In particular, the `instance` object will represent the element, while the`context` object will give you access to utilities, such as the current user, a function to upload files, etc.

An element is defined by a few functions. The `initialize` function gets called as soon as the element is visible on the page. It will be run only once per instance. The `update` function will be run as soon as one of the element properties changes. This function can be run many times, and your code should be tracking what changes to avoid unnecessary operations. Actions are represented by a run action. See more details below for details regarding data [loading and asynchronous vs synchronous code](/account-and-marketplace/building-plugins/loading-data).

When testing your functions, you'll be able to add a debugger point so that the execution stops when you run it with the debugger on (and the web inspector open). This will let you run your custom code click-by-click.

![](/files/-M5sc4iZX11AyaRsjHvU)
