# Main cluster dependencies
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/main-cluster-dependencies · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Dedicated instances run on dedicated application and database compute, which is isolated from other Bubble applications. The majority of potential user-facing downtime occurs at the application and database compute level, so this level of isolation provides a high level of protection from system-wide issues affecting Bubble apps on the main cluster.

That said, Dedicated instances do share Bubble’s overall infrastructure, and can be impacted by issues that occur in other parts of our infrastructure stack. The main dependencies Dedicated instances have on shared infrastructure are:

* Our DNS, CDN, and networking layer
* Real-time notifications
* Some aspects of using the Bubble editor, including logging in, along with searching for and installing plugins
* The debugger when previewing pages
* Logs, as displayed on the “Server Logs” tab of the editor
* Metrics, as displayed on the “App Metrics” tab of the editor
* Accessing test plugins in runmode
* File uploads
