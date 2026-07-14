# Conditional formatting
> Source: https://manual.bubble.io/core-resources/elements/conditional-formatting · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (14)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Conditional expressions and formatting

* [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
  Dynamic expressions are formulas used to create conditions.
* [Conditions](/help-guides/logic/conditions)\
  How to use dynamic expressions to set up conditions.

***

#### Design

Article series focusing on design in general, explaining terminology and offering resources to help you set up a user-friendly, good looking design.

* Article series: [Design](/help-guides/design)
  * Article: [Responsive design](/help-guides/design/responsive-design)\
    Building pages that work on all devices, such as a laptop and a phone.

**The design tab**\
In this article we cover the different tools available in the design tab.

* Article: ´[The design tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab)
* Article: [The element inspector](/help-guides/getting-started/navigating-the-bubble-editor/tools#key-features)\
  The tool you use to set responsive properties.

***

**Elements**\
In this article series, we cover how to work with different element types:

* Article series:[ Elements](/help-guides/design/elements)
  * Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)
  * Article: [The page](/help-guides/design/elements/web-app/the-page)
  * Article series: [Container elements](/help-guides/design/elements/web-app/containers) (elements that contain other elements)
  * Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements) (elements like text, buttons, icons and images)
  * Article series: [Input forms](/help-guides/design/elements/web-app/input-forms) (elements that accept input, such as text and file uploads)

***

**Previewing your app**

In this section about how to [preview your app](#user-content-fn-2)[^2] in the development environment.

Article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
{% endtab %}

{% tab title="Videos (1 playlist)" %}
Bubble Academy: [Element videos](https://www.youtube.com/@BubbleIO/search?query=element) (list of videos related to elements)
{% endtab %}
{% endtabs %}

## Conditions

You can control how page elements behave and appear under certain circumstances. Define these conditions and the properties to be altered in the Conditional Formatting section in the Property Editor. States are applied in the order listed. If two states are active and modify the same property, the state listed last is the one used.

{% hint style="warning" %}
**Note:** With conditionals, you can create your own input validation, e.g. "This button should not be clickable until the input is at least 3 characters long". Some of these validations are not evaluated on each keystroke, but rather after the user pauses for a second.
{% endhint %}

### **When**

A condition defines when the properties should change. A condition can be about the element itself, e.g., when a button is hovered or clicked or be based on a more complex expression, such as when the user is logged in. Build this expression one condition at a time. As this condition should return yes or no, it will be red until the condition is valid.

### **Select a property to change when true**

Select which properties to modify from this dropdown menu when the element meets the condition.

### **Move up**

Clicking this button moves the condition up by one. The condition originally above the current condition will be moved down one.

### **Move down**

Clicking this moves the condition down by one. The condition originally below the current condition will be moved up by one.

### **Remove condition**

Clicking this removes the condition from the current element.

### **On/Off**

This button turns the condition on or off in the editor, so that you can preview what different states of the condition look like. The default is off.

### **Can have the slug value**

This operation tests if the argument is a valid slug value for the Thing. A valid slug value is both unique and correctly formatted with only lowercase letters, digits, and hyphens.

### **Cannot have the slug value**

This operation tests if the argument is an invalid slug value for the Thing. An invalid slug value is anything that isn’t made up of only lowercase letters, digits, and hyphens or that is not unique.

## Transitions

For a smoother effect, transitions change an element's properties over time. For example, define a transition so the background color changes over 500 milliseconds. When the color changes, the element's color will change gradually over 500 milliseconds instead of at one time.

{% hint style="warning" %}
**Note:** Transitions are not applied to gradient backgrounds.
{% endhint %}

### **Duration**

Length of the transition in milliseconds.

### **Transition timing dropdown**

This parameter determines how the intermediate values of the transition are calculated. Choose from several curves.

### **Select a property to define a new transition**

From the dropdown menu, select the property to apply the transition to.

### **Remove the transition**

Click the trash icon to remove the transition. The property will change instantaneously instead of gradually.

## Other ways to learn

<details>

<summary>User manual articles</summary>

#### Dynamic expressions

To set up conditions, you'll need to know your way around dynamic expressions. The article below covers this topic in-depth:

Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

#### Conditions

If you'd like a more extensive tutorial on how conditions work, you may also be interested in reading the user manual article below:

Article: [Conditions](/help-guides/logic/dynamic-expressions)

</details>

<details>

<summary>Video lessons</summary>

* [How to build expressions](https://www.youtube.com/watch?v=mrh8OV79snk)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)
