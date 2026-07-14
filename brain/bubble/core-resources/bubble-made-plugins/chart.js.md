# Chart.js
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/chart.js · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Chart.js plugin adds a element that you can use to display a Line, Bar, Radar, Pie, or Doughnut chart.

## Line/Bar Chart

The Chart Element Plugin adds an element that displays numerical data in chart form. The data comes from the application database.

### Chart type

Select the type of chart to display. Choose from Line, Bar, Radar, Pie, and Doughnut.

### Type of data

Define the type of the list of things this chart will display. The type must have a field that is a number.

### Data source

This is the list to display in the chart. Typically, it will be the result of a search.

### Value expression

This field defines how to calculate the Y value of the chart. It will use one of the number fields of the current type of thing.

### Label expression

This field defines how to describe each data point. It will use one of the text fields of the current type of thing.

### Series 1 color

Select the line color for the first series of data.

### Series 1 fill color

Select the fill color for the first series of data.

### Show scale

Check this box to show a scale in the background of the chart.

### Scale line color

Select the line color for the background scale.

### Scale font color

Select the font color.

### Show grid

Check this box to show a grid in the background of the chart.

### Grid line color

Select the color for the grid lines.

### Show tooltips

Check this box to reveal the value of a data point when the user hovers over the point.

### Customize tooltip number formatting

Check this box to control how the numbers in the tooltips are formatted.

### Hide the label from the tooltips

Check this box to show only the tooltip value.

### Apply Bezier curve

When checked, the chart will smooth the chart lines following a Bezier curve.

### Rotation animation

When checked, the pie and doughnut charts will be animated when rendered.

### Fill the dataset with a color

Check this box to fill the chart.

### Number type

Select the type of number to use. Choose from Number, Currency, and Percentage.

### Decimal place

Enter the number of decimal places to use.

### Decimal separator

Select which symbol to use as the decimal separator. Choose from period '.' or comma ','.

### Thousand separator

Select which symbol to use as the thousand separator. Choose from period '.', space, and comma ','.

### Currency prefix

Pick here which symbol should be in front of the number.

### Use parentheses for negative numbers

Check this box to put parentheses around negative numbers.

## Setup

Draw a Line/Bar chart element on your page, then choose a chart type and type of data. For example, we might want to display our recent events, along with the number of people who attended.

![](https://lh5.googleusercontent.com/vB6Z5CJTaHQma_3kUVZfffubGepdzPbu-JtQG2XTgSnK8sAp3qe3ubj4FBlHLFa-V5Z-RuyJI8syySpKqBdgAIs5mzT7ZCnGN5BIKb2yrAxqv5az17Yz0xS5QcB4GlQomStpQVi1)

In this case, we can set our type of data to “Events” and search for our events. We can label our chart with the current point’s Name, a text field on our Event type, and set our value to the current point’s Attendees, a number field on our Event type.

![](https://lh5.googleusercontent.com/76kOwVXaKmyMF3xzdrhR8M5_AIWC1CwODBUYfaRCTTMZLIXIA_tePcxcGI12rbQIx8rxRWzukFeN2B-FXZft70NrwR_nHmEomyIOCTfCTYJpdQpPLBoBu9famOCuOj_ld4landh1)

## FAQ

### How can I display an aggregation?

If you use the “:group by” operator on your chart’s data source, then you can chart aggregations rather than a number field on the related data type, for example, a count, sum, or average.

Let’s say we have Events that span multiple days, and we want to chart the total number of attendees per event across those days. One option would be to search for events and group them by the event’s name.

![](https://lh6.googleusercontent.com/l_V86JYNh0a26wO-q9tMEONIFVZbas-SIcIAFjof0Jom9jhpXO_sYSaeDyczJ9sv54LNjV5Ftq9AgdEpRW93Sn6i0tiXi4bCwvhvn24Sme9I9GlbVGWpc3pCCA55Tq93qzEJlPM-)

Then we can choose to add a new aggregation. In this case, we will want “Sum” to calculate our total attendees, and we’ll select “Attendees” as the field to add up as well. Now that we have done this, our “Type of data” will automatically update to “Grouping.”

![](https://lh3.googleusercontent.com/QiReFiNkckxcCZ946U5IJ_kH_IduN42tXmPKOCkCsvUguxizwDJCgqKK8eCcAGt03zR8R3N91iy2gkNqvMZs51BzAZI6MF15UD0QYlW4fNaDRGMsc_pia70RwZk42tWvCVRBS_MW)

Now when we preview our application, we will see the sum of the attendees across several days rather than a total on an individual day.
