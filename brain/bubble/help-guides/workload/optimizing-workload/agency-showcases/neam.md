# Neam
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/agency-showcases/neam · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

[Neam ](https://neam.co/)helped a media and entertainment community platform reduce WU consumption by 400%. One of the key optimizations they made was improving the page-load speed by optimizing database searches.

## Optimization opportunity

When Neam reviewed their client’s app metrics, they found a process that was overly complex, highly repetitive, and ultimately impacting a high volume of data: Whenever the app needed to load data on a page, it was searching through the large database across the server-side and client-side.

## Optimizations:

* **Restructure the relational database so the app had to search through a smaller dataset:** For example, they split a ”project” data table into two separate but linked tables: ”project” and “project detail.” This allowed us to search on the main (project) data type and offload media-heavy data into the related or linked data type (project detail) that wasn’t needed in the initial search results.
* **Use option sets for drop-downs:** Rather than relying on database calls, they turned common drop-down categories (e.g., statuses, types of projects) into option sets. <

  Add server-side filtering: By adding server-side filtering, the app improved search efficiency by offloading some processing away from the front-end.
