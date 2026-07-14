# Full Calendar
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/full-calendar · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Add a calendar element to your application and display events from your database.

## Calendar

The Full Calendar Plugin creates an element that displays a daily/weekly/monthly calendar on the page and displays events based on the application database.

### Type of events

These are the type of things that will be used to display events.

### Data source

This is the list of things that should be displayed by the calendar element. Typically, it is a result from a search.

### Start time field

Define which field contains the start time. For example, a type of thing could be 'Booking,' and the field will be 'Start time.' This field should be of type date.

### End time field

This field is similar to the start time field but is optional. The default value of 30 minutes is used if this field is left blank

### All day field (yes/no)

To support all-day events, enter a yes/no field from the event that contains this information.

{% hint style="info" %}
**Tip:** If you set this field to "yes," calendar events will display as ending 1 day before their end date. For example, an end date of August 19 will display as August 18 on the calendar element. Check out[ the Full Calendar library](https://fullcalendar.io/docs/event-parsing) for more information.
{% endhint %}

### Event caption

Enter an expression that defines how to describe each event. It should rely on the current event.

### Enable modification through dragging (start/end)

Check this box to enable users to modify events by dragging them on the calendar. This will trigger a modification of the thing on the server, changing both the start and end times. Set up relevant privacy rules to enable users to do this.

### Enable modification through resizing (end)

Check this box to enable users to modify event lengths by dragging the end on the calendar. This will trigger a modification of the thing on the server, changing the end times. Set up relevant privacy rules to enable users to do this.

{% hint style="info" %}
**Note:** This is only possible if you use the end field.
{% endhint %}

### Date to display at first

Enter the date to show on page load when the element is displayed. If not set, the calendar shows the current date.

### Available views

Use this option to restrict the views users can access with the toolbar buttons. Choose from Day - month - week, Month only, Week only, and Day only.

### Include Saturday/Sunday columns

If unchecked, Saturdays and Sundays are hidden.

### Starting day

Use this field to define whether the week starts on Sunday or Monday.

### Event and days are selectable

If this box is checked, users will be able to select an event or empty day. The colors change when selected.

### Use a dynamic color for each event

Check this box to display the different events in different colors. In this case, colors should be saved in the database. This is for display purposes only.

### Event color

Select the color for an unselected event. This property does not apply when the event color is dynamic.

### Event color field

Select the field of the database that contains the color for a given thing/event. It should be stored as an HEX color code in the application database.

### Selected event color

Select the color to be applied to an event when it is selected by the user.

### Selected day color

Select the color to be applied to an empty day when the user selects it and when days/events are selectable.

### Current day color

Select the color to be applied to the current day.

## A calendar's event is clicked

This event is triggered when the user clicks on an event in the calendar. Refer to the current event that was just clicked using the expression 'This calendar's current event.'

## A calendar's day is clicked

This event is triggered when the user clicks on a day in the calendar. You can refer to the current day that was just clicked using the expression 'This calendar's current day.' You can also retrieve the events for this day with the expression 'This calendar's current day's events.'

## Setup

You might use this plugin to display upcoming events. To do so, you can specify the start and end times as they are saved in your database, in our case, "Start and end." We will want to display the event's name, so we set the caption as "Current event's name."

![](/files/-MZYuFZK-PPYvznNUO61)

In this example, we selected "Day only" as our view, so in runmode, we will see a single day its event spanning from 10 AM to 2:30 PM.

![](/files/-MZYuJLUH33U-EnxM6bV)
