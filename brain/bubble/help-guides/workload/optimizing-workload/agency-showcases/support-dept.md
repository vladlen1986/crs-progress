# Support Dept
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/agency-showcases/support-dept · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

[Support Dept](https://supportdept.io/) reduced WU consumption by 90% by optimizing a bulk data operation: checking for errors across thousands of records.

## Optimization opportunity

When Support Dept originally built out this process, they used a recursive workflow to check for errors while uploading thousands of records. This workflow consumed up to 50,000 workload units for the various checks. It also took up to 30 minutes for larger uploads (1,000+ records).

## Optimizations:

* **Use schedule API workflow on a list (SAWOL) for bulk data operations:** After Bubble announced performance improvements to SAWOL, they decided to use that instead. Not only did this change reduce workload by 90%, they also reduced the time this process took by 95% in some cases. Instead of taking minutes, many processes started taking seconds.
