# The native mobile debugger
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/testing-an-application/the-native-mobile-debugger · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Overview

The Mobile Debugger lets you inspect and debug your mobile app directly in Web Preview. It includes tools for checking workflows, viewing element properties, identifying runtime issues, and testing your layout across different device sizes. The debugger appears as a persistent panel on the right side of the preview and stays visible as you interact with your app.

## Features

#### Workflow debugging

Run workflows in Normal, Step-by-Step, or Slow mode to see how actions execute in real time. You can trace each step, monitor values, and catch unexpected behavior. You can also add breakpoints in the workflow editor to pause execution at a specific action and inspect it at the moment it runs.

#### Inspector mode

Hover over elements in your mobile app to see their properties, conditional states, and dynamic values. This makes it easy to identify why something is or isn’t displaying as expected.

#### Error and warning monitoring

A floating panel in the debugger displays runtime errors, resource limits, and other relevant warnings. This helps you quickly spot and resolve issues during development.

#### Device preview toggle

Switch between common mobile screen sizes to test how your app appears across different devices. This is helpful for identifying layout issues and testing responsive behavior.\
\
Persistent debugger panel\
The debugger stays docked to the right side of the screen during Web Preview, so you can inspect and interact with your app at the same time. It updates automatically as you navigate or trigger events.\ <br>

### How to use it

1. Open your mobile app in Web Preview from the Bubble editor.
2. Click the debugger symbol in the upper left corner of the web preview,

   <figure><img src="/files/AJYXLOZlEaEDChkDQTZw" alt=""><figcaption></figcaption></figure>
3. The debugger panel appears on the right-hand side.<br>
4. Interact with your app and use the debugger controls to inspect elements, run workflows, and monitor errors.

<br>

<figure><img src="/files/fucEtihMTeThyEtEn0NU" alt=""><figcaption><p><strong>Debugging workflows</strong> allows you to inspect actions as they are triggered in your app.</p></figcaption></figure>

<figure><img src="/files/SZ2d9nzrkkjQWxjX6tYj" alt=""><figcaption><p><strong>Inspecting elements</strong> lets you view the details of individual elements in your app.</p></figcaption></figure>

## Notes

* The Mobile Debugger is only available for apps built using the mobile editor.
* It functions only in Web Preview and is not currently available in live mobile environments.

The Disable Zooming property is enabled by default to prevent unintended pinch-to-zoom behavior during debugging. This can be turned off in the element’s settings if needed.
