# Multiselect Dropdown
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/multiselect-dropdown · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Multiselect Dropdown plugin creates a new input form that allows users to select multiple items from a static or dynamic dropdown list of options.

## Multi dropdown input form

### Placeholder

When this element is empty, text will be displayed to prompt the user to enter something.

### Choices style

This dropdown prompts the user to choose one option from either static choices or dynamic data from the application database. In this dropdown menu, choose between Static choices or Dynamic choices.

### Choices (press Enter between each option)

This is the list of static choices offered to users. Enter one option per line and press Enter between each option.

#### Type of choices

This is the type of thing used by the element when Dynamic choices is chosen in the Choices style.

#### Choices source

Define the list of things to be used as options. It should be a list of things of type defined as the 'Type of choices.' It is either the result of a search or the content of a field that is a list.

### Default value

This is the default value displayed in the dropdown menu. It should be of the same type as the type of content defined in 'Type of choices.'

### Enable users to type new texts

This checkbox allows users to enter their own items into the list of selections if their desired selection isn't found by typing in the input field and hitting return when they are done. This option is only available when the [Choices style](#choices-style) is set to Static choices.

#### Allow tags containing spaces

This checkbox will set whether or not spaces are allowed in the new entry if the user is allowed to enter new items. If this checkbox is not selected and the user tries to add a space while typing, the text entered before the space will be removed.

### Maximum items

This optional number entry will limit the number of tags or items that can be selected by the user per input field.

## Setup

We can choose a type for our multi dropdown and select a list of options. A common use for this might be to select multiple tags for a single social media post, for example. In that case, we can do a search for tags as our choices source.

![](/files/-MZZCsVd4xqKqHc8riCz)

We will choose the "Name" field on the Tag data type as what we would like to display as our caption. Now when we preview the page and click into the multidropdown, we can choose from the tags existing in our database.

![](/files/-MZZD5BhgAv2coTCDAN-)

## FAQ

### **How can I use a multi dropdown to filter a repeating group?**

To do this, you might create a custom state which you set to the repeating group's data source. Then as the multi dropdown's value is changed, we can add to this state and by extension what results appear in our repeating group. You can find an example of this in a test application [here.](https://bubble.io/page?name=index\&id=filter-rg-multidropdown\&tab=tabs-2)

{% hint style="warning" %}
**Note:** Multi-dropdown input fields used in Group Focus or Floating Group containers may behave unexpectedly in rare scenarios.
{% endhint %}
