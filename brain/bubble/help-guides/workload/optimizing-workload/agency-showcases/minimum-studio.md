# Minimum Studio
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/agency-showcases/minimum-studio · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

[Minimum Studio](https://minimum.studio/) reduced WU consumption from 6 million to 900K for a SaaS app that helped sales development teams improve their sales process.

## Optimization opportunity

When Minimum Studio was optimizing the SaaS app, they reviewed its app metrics to understand where workload units (WU) were being used. They realized there was an API call to an external data source that was always executed — even if the element was hidden. This meant API calls were running when they didn’t need to be, and fixing it would reduce WU consumption signficantly.

## Optimizations:

* **Review API calls:** Minimum Studio reduced the frequency of the API call so that it only occured when the element was visible. Instead of keeping the conditional on the API call, they adjusted the logic by adding a conditional to the element itself.
* **Migrate to workload-based plans:** Apps on workload-based pricing plans (as opposed legacy, capacity-based plans) separate frontend and backend server processing in order to prevent background tasks from degrading performance. Minimum Studio took advantage of these improvements by changing the app’s plan.
