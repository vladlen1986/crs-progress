# Ionic Elements
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/ionic-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Ionic is a library of elements that are built specifically for mobile experiences in native apps.

## Ionic Icon

The Ionic Elements Plugin creates an element to display an icon from the Ionicon Library.

### Icon

Click this button to open the icon library and select an icon. Search for words to refine the list.

### Icon color

Select the color to apply to the icon.

### Start/Edit workflow

Click this button to create a new workflow triggered by this element. The type of event depends on the element and is generally the most common event.

For example, buttons will create a 'When this element is clicked...' event. If a workflow already exists, this takes you to the existing workflow in the Workflow Tab. To create a different type of event or create a second event, go to the Workflow Tab and click the 'Click here to add an event...' button.

### This element isn't clickable

When checked, the element will not trigger a workflow when clicked nor will the user's cursor change to a pointer when they hover over the element. In addition, the item will display according to any specified conditional formatting for the 'isn't clickable' state.

This can be used to stop a user from moving forward in a flow until some condition is true. For example, we might disable a specific action until the user is logged in. 'This input should not be empty' can also be used to prevent the user from clicking.

## Ionic Toggle

The Ionic Elements Plugin creates an element that is an iPhone-like toggle that returns yes/no. Use this when you want to create a mobile experience but have the app run on both mobile and desktop devices. It's part of the Ionic framework.

### Preset status

Define the initial value of the toggle. Choose from Checked, Unchecked, and Dynamic.

### Dynamic status

This option is only visible if Preset status is set to Dynamic. Specifying a dynamic yes/no value determines whether this element starts in an on or off state.

When the dynamic value changes, e.g., the user modifies data that the dynamic status field references, the checkbox will change to reflect the new value. This continues until the user clicks on the element and changes the state, in which case the state will be determined by their selection rather than by a dynamic value.

### This checkbox should be checked

When checked, the workflows that use the content of the toggle will not run until the toggle is set to yes. Use this, for instance, to force users to accept terms of services when they sign up.

### Component color

Select a color from the Ionic color library. Choose from Light, Stable, Positive, Calm, Assertive, Balanced, Energized, Royal, and Dark.

## Ionic Checkbox

The Ionic Elements Plugin creates an element that is an iPhone-like checkbox that returns yes/no. Use this when you want to create a mobile experience but have the app run on both mobile and desktop devices. It's part of the Ionic framework.

### Preset status

Define the initial value of the checkbox. Choose from Checked, Unchecked, and Dynamic.

### Dynamic status

This option is only visible if Preset status is set to Dynamic. Specifying a dynamic yes/no value determines whether this element starts in an on or off state.

When the dynamic value changes, e.g., the user modifies data that the dynamic status field references, the checkbox will change to reflect the new value. This continues until the user clicks on the element and changes the state, in which case the state will be determined by their selection rather than by a dynamic value.

### This checkbox should be checked

When checked, the workflows that use the content of the checkbox will not run until the toggle is set to yes. Use this, for instance, to force users to accept terms of services when they sign up.

### Component color

Select a color from the Ionic color library. Choose from Light, Stable, Positive, Calm, Assertive, Balanced, Energized, Royal, and Dark.

## Ionic Range

The Ionic Elements Plugin creates an element that is similar to the Slider Input but has an iOS8 look and feel. It returns a number. Use this when you want to create a mobile experience but have the app run on both mobile and desktop devices. It's part of the Ionic framework.

### Min value

Enter the minimum value for the slider.

### Max value

Enter the maximum value for the slider.

### Step

This number represents how much one increment should modify the slider's value.

### Initial content

This field defines the initial value. If the content is dynamic, the type should be a number.

### Track color

Select a color from the Ionic color library. Choose from Light, Stable, Positive, Calm, Assertive, Balanced, Energized, Royal, and Dark.

## Setup

You can use the Ionic Elements similarly to how you would use Bubble's built-in icon elements and checkboxes. For example, you might select an icon to display different statuses for a parent group's task: overdue, due soon, or done.

![](/files/-MZZ5VeVaqYbXbXEqkiy)

Then we can add a condition to make an icon visible when that parent group's status matches the one for our Ionic icon.

![](/files/-MZZ5ZIX3Nq2Jbt1aCc0)

When we preview the application, if the parent's group task has a status of "Done," then we will be able to see the green checkmarks.

![](/files/-MZZ5c5GJmi8I2a7XYf7)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
