# CRS Brain — Improvements Wishlist

> Managed in the app (**Wishlist** page). This file is generated from `data/wishlist.json` — edits here are overwritten on the next save in the app.

Status key: `[ ]` idea · `[~]` in progress · `[x]` done · `(P1/P2/P3)` priority.

---

## Bubble platform awareness

- [ ] **(P1)** **Daily Bubble forum check**
  Once a day, scan the Bubble forum and update the brain's Bubble-forum documents (brain/bubble/) with anything new/relevant (plugins, gotchas, patterns, breaking changes). Append to a dated digest, not overwrite.
- [ ] **(P1)** **Track bubble.io/release-notes**
  Watch bubble.io/release-notes; Bubble ships new features constantly and the brain must stay aware. When something lands that affects how CRS is built, record it in brain/bubble/release-notes.md and flag it if it changes a locked decision or unblocks a feature. Specific features Vlad flagged have their own items below.
- [ ] **(P1)** **Style swapping in conditions -> dark/light theme**
  Bubble recently added the ability to SWAP an element's whole style inside a conditional (instead of overriding each property one-by-one). This is the clean way to build the dark/light theme: define a full "Button - Dark" style with every property set, then swap to it in a condition when dark mode is on. IMPORTANT to Vlad. TODO: research exactly how it works on the release-notes page, document the theming pattern in the brain, and reconcile with the design-system theme approach. (The actual theme build is CRS product work -> Progress Tree; this item is the brain learning + documenting the capability.)
- [ ] **(P2)** **Global expressions - research & document**
  Bubble recently added "global expressions" - lots of community discussion, but Vlad hasn't confirmed how they work. TODO: research from release-notes/docs, write up what they are, when to use them, and whether they help CRS (reusable computed expressions across the app?). Document in the brain.

## App features / UX

- [ ] **(P1)** **Claude Code Prompt Generator for Whishlist items**
  In improvement whishlist i wan to add button on each task that will write me full prompt for claude code that i can copy on click of a button it will generate proper prompt and will copy it to the clipboard
- [ ] **(P1)** **Add AI TOOLS AND CAPABILITIES THAT CLAUDE CODE HAVE AND SKILLS**

## Automation / agent behavior

- [ ] **(P1)** **Task loops with limit-aware auto-resume**
  Use the full Claude subscription. Given several tasks, if the 5-hour usage limit is hit mid-run, detect it, read when it resets (from the usage/statusline data the app already captures), wait, then automatically continue the unfinished tasks. Needs a durable task queue + reset-time detection + a resumable run loop. Must still obey the Buildprint safety gate + plan -> savepoint -> apply -> check.
- [ ] **(P2)** **Auto-check + fix Bubble.io-reported issues**
  Periodically pull issues Bubble reports (Issue Checker / editor / logs) and, where safe, fix them via the Buildprint CLI + brain knowledge under the guardrails (test branch, savepoint per step, check before apply). Start read-only (report issues + proposed fixes) before ever auto-applying.
- [ ] **(P1)** **Smart model routing - save tokens, best model per task**
  Stop running Opus on everything. Auto-pick the cheapest capable model per task: Haiku 4.5 / Sonnet 5 (lower effort) for mechanical/bulk work (data selection, dedup, bulk creates, simple edits, prompt formatting), and Opus 4.8 + high reasoning effort ONLY for architecture, security, privacy-rule, and hard-reasoning work. A tiny Opus classifier pass can judge task complexity and route it. Goal: minimize tokens/cost while keeping quality.

---

## Done

_(nothing shipped yet)_

