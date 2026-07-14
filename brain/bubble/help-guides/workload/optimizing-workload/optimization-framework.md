# Optimization framework
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-framework · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## The workload optimization framework

Before we dive in, it’s worth keeping a few things in mind:

* Workload is what powers your app. As your app scales and becomes more successful, it’s expected that workload consumption will increase. This doesn’t mean your app is performing worse — it simply means it’s being used more!
* Optimizing for WU is one of many (competing) priorities you’ll face as you develop your app. The workload metric and tools are helpful to use when appropriate, but they don’t need to dominate your focus.
* Optimization is about fine-tuning for efficiency, not reducing it to a level where your users’ experience or application's abilities are negatively impacted.

Keep your users in mind throughout the whole process. The best apps deliver exceptional value to their users, and that takes some seamless collaboration between your app’s user interface and the server working its magic in the background.

To build or optimize an app, you need to continually make decisions. These involve examining specific WU activities and considering two questions:

1. Is this task consuming the expected amount of WU, or could my app benefit from optimization?
2. If yes, how do I go about optimizing it?

Since every app is unique, a simple one-size-fits-all optimization checklist wouldn’t be very useful. So we’ll take a more fundamental approach: All Bubble apps rely on a core set of tools, which means we can identify patterns that often indicate opportunities for optimization. That way, we can make well-informed decisions in a wide range of situations, not just a few isolated examples.

The the three components of the framework we'll use are:

### Complexity

Complexity refers to the process you use to achieve a certain goal. Are you reaching that goal as efficiently as possible, or could you achieve the same result with fewer steps and/or a more streamlined approach?

Examples that often lead to inefficiency:

* Searches with intricate constraints and structure
* Workflows that use more actions than necessary
* Nested expressions that are starting more processes than you may be aware of

Using the car analogy, excess complexity is like driving from point A to point B but taking unnecessary detours along the way.

### Volume

Volume is about being aware of the amount of data the server is returning when you give it a request.

Examples that often lead to inefficiency:

* Returning a bigger number of records from the database than you actually need
* Returning a larger volume of data in those records than you are using in the app

Using the car analogy, excess volume is like driving from point A to point B while hauling unnecessary cargo that doesn’t serve a purpose.

### Repetition

Repetition is about inspecting how frequently a given task is being performed on the server, and taking a critical look at whether that repetition is necessary.

Examples that often lead to inefficiency:

* Performing searches or running workflows every time the page loads
* Updating data at a high interval, when a lower interval could be sufficient
* Setting up user interfaces that require lots of data from the server, where small tweaks in the user interface could reduce WU consumption

Using the car analogy, excess repetition is like taking the same trip repeatedly when fewer trips would achieve the same results.

## Checklist and optimization categories

The next article in this series serves as both a checklist and a table of contents for the in-depth look at workload optimization.

Article series: [Optimization checklist](/help-guides/workload/optimizing-workload/optimization-checklist)
