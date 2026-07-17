# OS-grade overhaul — judgment calls

> Decisions made where `brain/design/CRS-design-system.md` is silent or conflicts with the run prompt. The design system doc is the judge (autonomy contract §1). Reviewed by Vlad once at the end of the run.

| # | What | Where | Call | Why |
|---|---|---|---|---|
| 1 | "Approved literals §2.11" cited by the run prompt does not exist in the doc | all sweeps | Treat as the approved-literal set: `--white` text on accent/status fills, the §2.6 module-status-tag hexes, §20.7's noted rgba badge fills *until* re-tokenized, and shadow/tint rgba values inside the §2.10 block itself. Everything else must be a token. | Nearest doc anchors: §2.5.1 utility colors, §2.6 tag tables, §20.7 app-drift note. |
| 2 | Run prompt says modal widths "420/440/520" | modals sweep | Doc §5 says width 380–460px typical — doc wins; existing modals normalize into that range (settings modal may exceed as a full workspace modal — logged as its own call if kept). | Autonomy contract: the design system is the judge, not the prompt's from-memory numbers. |
| 3 | Run prompt says input focus = "accent @55% border — no glow rings" | inputs sweep | Doc §2.2/§5/§14: focus = `--input-border`→accent + 3px `--accent-glow` ring. Doc wins. `--accent-border-active` (the 55% rgba) stays for *selected chips/selection borders* per §2.3. | §14 defines Focused = 3px glow ring explicitly. |
