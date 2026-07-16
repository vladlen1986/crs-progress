# CRS Brain — Improvement Wishlist

_Exported 2026-07-17 from `crs-brain/data/wishlist.json`_

Legend — Priority: P1 (high) · P2 (medium) | Status: idea · in-progress · done

---

## Bubble platform awareness

### 1. Daily Bubble forum check `P1` · in-progress
Once a day, scan the Bubble forum and update the brain's Bubble-forum documents (`brain/bubble/`) with anything new/relevant (plugins, gotchas, patterns, breaking changes). Append to a dated digest, not overwrite.

### 2. Track bubble.io/release-notes `P1` · in-progress
Watch bubble.io/release-notes; Bubble ships new features constantly and the brain must stay aware. When something lands that affects how CRS is built, record it in `brain/bubble/release-notes.md` and flag it if it changes a locked decision or unblocks a feature. Specific features Vlad flagged have their own items below.

### 3. Style swapping in conditions → dark/light theme `P1` · idea
Bubble recently added the ability to SWAP an element's whole style inside a conditional (instead of overriding each property one-by-one). This is the clean way to build the dark/light theme: define a full "Button - Dark" style with every property set, then swap to it in a condition when dark mode is on. IMPORTANT to Vlad. TODO: research exactly how it works on the release-notes page, document the theming pattern in the brain, and reconcile with the design-system theme approach. (The actual theme build is CRS product work → Progress Tree; this item is the brain learning + documenting the capability.)

### 4. Global expressions — research & document `P2` · idea
Bubble recently added "global expressions" — lots of community discussion, but Vlad hasn't confirmed how they work. TODO: research from release-notes/docs, write up what they are, when to use them, and whether they help CRS (reusable computed expressions across the app?). Document in the brain.

---

## App features / UX

### 5. Claude Code Prompt Generator for Wishlist items `P1` · done
In improvement wishlist I want to add a button on each task that will write me a full prompt for Claude Code that I can copy on click of a button — it will generate a proper prompt and copy it to the clipboard.

### 6. Add AI tools and capabilities that Claude Code has, and skills `P1` · done
_(no detail recorded)_

### 7. Galaxy map: real reference edges from CLAUDE.md / INDEX.md `P2` · idea
Today the map links every top-level folder to the CLAUDE.MD center decoratively (folder structure only). Make the edges REAL: parse `CLAUDE.md` and `brain/INDEX.md` (and optionally `decisions.md`) for file/folder references and draw routing edges (visually distinct from folder edges) to exactly what they cite. Then a missing line genuinely means the brain cannot route to that knowledge — which is how Vlad already reads the map. Origin: the data-node question on 2026-07-16 (the missing line was an id-collision bug, but the expectation it violated is the right design).

---

## Automation / agent behavior

### 8. Task loops with limit-aware auto-resume `P1` · idea
Use the full Claude subscription. Given several tasks, if the 5-hour usage limit is hit mid-run, detect it, read when it resets (from the usage/statusline data the app already captures), wait, then automatically continue the unfinished tasks. Needs a durable task queue + reset-time detection + a resumable run loop. Must still obey the Buildprint safety gate + plan → savepoint → apply → check.

### 9. Auto-check + fix Bubble.io-reported issues `P2` · idea
Periodically pull issues Bubble reports (Issue Checker / editor / logs) and, where safe, fix them via the Buildprint CLI + brain knowledge under the guardrails (test branch, savepoint per step, check before apply). Start read-only (report issues + proposed fixes) before ever auto-applying.

### 10. Smart model routing — save tokens, best model per task `P1` · done
Stop running Opus on everything. Auto-pick the cheapest capable model per task: Haiku 4.5 / Sonnet 5 (lower effort) for mechanical/bulk work (data selection, dedup, bulk creates, simple edits, prompt formatting), and Opus 4.8 + high reasoning effort ONLY for architecture, security, privacy-rule, and hard-reasoning work. A tiny Opus classifier pass can judge task complexity and route it. Goal: minimize tokens/cost while keeping quality.
