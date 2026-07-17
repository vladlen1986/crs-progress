# Bubble Performance Manual — *The Ultimate Guide to Bubble Performance*

> **Author:** Petter Amlie · **Revision 3** · 227 pages · sold via Gumroad.
> Extracted verbatim from the PDF into markdown (chapters below). The original
> **[PDF](the-ultimate-guide-to-bubble-performance-rev3.pdf)** is the authoritative source — if the text
> reflow ever looks garbled (flattened tables, merged sub-headings), check the PDF page cited in each file's header comment.
>
> This is **third-party expert guidance**, not official Bubble docs. When it conflicts with the
> official manual ([../bubble/INDEX.md](../bubble/INDEX.md)), prefer the official manual for platform
> *facts* (WU costs, limits) and treat this book as the authority for *build technique*.
> CRS project decisions in `../../decisions.md` / `../CLAUDE.md` override generic advice.

## Chapters (verbatim, one file per chapter)

| File | PDF pp. | What's inside |
|---|---|---|
| [00-front-matter-and-intro.md](00-front-matter-and-intro.md) | 1–22 | How to read the book; concepts & definitions (performance, capacity, server/client-side, responsiveness); best practices vs tools; "What is an app?" |
| [01-what-performance-is.md](01-what-performance-is.md) | 23–34 | Perceived vs actual performance; developer-perceived performance; **performance is a feature** |
| [02-knowing-the-platform.md](02-knowing-the-platform.md) | 35–68 | Bubble plans (investing in performance vs capacity); research phase; capacity dilemma; RAM/CPU/download vs device; **Bubble's performance limitations**; how the DB works + **indexing**; **how a page is loaded** (load sequence, repaints, workflow priority, client- vs server-side operators) |
| [03-building-the-page.md](03-building-the-page.md) | 69–102 | RAM & download size (engine, images, fonts, icon packs, plugins, CSS); measuring size via the **waterfall chart**; identifying searches; SPA vs MPA; **rendering lists** (info on Thing vs Sub-Thing, the **Repeating Group trap**, full vs partial load, hiding-by-default, lazy loading); CPU usage; paint flashing; frame rate |
| [04-building-the-database.md](04-building-the-database.md) | 103–157 | What slows the DB (download size, complexity); **record size**; planning & structuring; **the Data-Type process** (data concept, data weight, satellite/search/content/link/merged types); worked scenarios (CRM, Travel app); **searching efficiently** (more constraints, duplicate searches, `:filtered`, nested structures); lists vs searches (which is faster); **Option Sets for performance** |
| [05-building-workflows.md](05-building-workflows.md) | 158–204 | Front- vs back-end workflows; client- vs server-side actions; what slows workflows; **action response design** (immediate / delayed / future); action sequence order; background triggering; **spacing out workflows & process spreading**; DRY (custom events, reusable elements); **recursive vs schedule-on-a-list**; **backend triggers** (keep data in sync, delete complex data); communicating clearly to the user |
| [06-workload-wu.md](06-workload-wu.md) | 205–225 | **What Workload (WU) is** and the cost model |
| [07-conclusion.md](07-conclusion.md) | 226–227 | "A war of a thousand battles"; performance is a feature |

## Quick routing — "where's the advice on…?"

- **Slow list / Repeating Group** → 03 (the RG trap, full vs partial load, hiding-by-default, lazy loading) + 04 (nested structures in RGs)
- **Slow search** → 04 (more constraints, duplicate searches, `:filtered`, lists-as-saved-searches, lists vs searches)
- **Big page / long download** → 03 (engine, images, fonts, plugins, CSS; waterfall chart)
- **Data model / how to structure a Data Type** → 04 (data concept, data weight, satellite/search/content types, merged types, worked scenarios)
- **Slow / janky workflow, UI freeze** → 05 (client vs server actions, action response design, process spreading, background triggering)
- **Recurring / bulk backend jobs** → 05 (recursive vs schedule-on-a-list, backend triggers, deleting complex data)
- **Indexing / why is my search slow at scale** → 02 (how Bubble indexes, structured vs unstructured data)
- **Page load order / why does X run before Y** → 02 (page load sequence, workflow-priority tables, client vs server operators)
- **Workload / WU cost** → 06 (this book) + official manual [../bubble/INDEX.md](../bubble/INDEX.md) for current WU numbers
- **Option Sets to speed things up** → 04 (replace DB entries, menus/privileges in one OS, OS as message popup)

## CRS relevance

Directly load-bearing for CRS at scale (46 modules, multi-tenant + multi-property, hybrid search):
the **Repeating Group trap** and **searching efficiently** chapters apply to every module's list views,
and **process spreading / recursive workflows / backend triggers** apply to the async `ActivityLog` audit
write and any bulk migration. Apply the scale test ("what breaks at 50 tenants / 5M records") against
chapters 03–05 when building.
