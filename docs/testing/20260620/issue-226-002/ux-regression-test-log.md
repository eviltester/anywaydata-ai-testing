## 2026-06-20 17:23 +01:00

- Establish the UX/regression subagent charter so generator workflows, method-picker behavior, help affordances, and related usability regressions are covered.

the actions you take

- Created the UX regression subagent log.
- Reserved this log for flow-level generator behavior, method-picker usability, selection, application, and help-link workflow observations.

the observations and results that you make

- The PR changed help metadata and picker rendering, so workflow regressions are plausible even when command definitions themselves look correct.

## 2026-06-20 17:09 +01:00

- Exercise the deployed generatorâ€™s highest-risk UX/regression paths around source-type switching, method-picker lifecycle, params persistence, preview behavior, help affordances, and stored-history side effects because PR #231 changed help metadata, picker rendering, and command-definition workflows broadly.

the actions you take

- Opened the deployed test environment and reached the generator through the published site path only.
- Exercised the generator row workflow in row mode rather than local code or repo commands.
- Switched the schema row into domain-command mode and confirmed the row exposed the domain picker trigger, domain help link, params input, and params-edit affordance.
- Opened the method-picker modal, inspected its visible structure, and confirmed the picker exposed filter input, category chips, close/cancel/apply controls, and domain-family groupings including `internet`.
- Interacted with the picker lifecycle and category area, then closed the picker to observe whether command/params state remained stable.
- Inspected the post-picker schema row state, managed-stored-schema area, and preview controls.
- Ran Preview and waited for the preview area to settle to distinguish loading/transient behavior from a persistent regression.
- Cross-checked visible help affordances on the same deployed surface, including command help, preview help, and file-generation help entry points.

the observations and results that you make

- The method-picker modal does open and exposes the expected UX primitives: filter field, domain-family chips, close/cancel/apply controls, and a broad command catalog surface.
- Regression finding: after the picker lifecycle, the row state mutated unexpectedly. The row surfaced `Edit params for literal.value` while the params field held `(length=5, casing="upper")`, which does not match a clean domain-command selection flow and suggests command-switch/picker-close state corruption.
- Regression finding: the same workflow also surfaced a stronger mismatch earlier in-row, where a domain row carried `string.alpha(length=5, casing="upper")` in the params field instead of a clean command-selection-plus-params split.
- Regression finding: preview did not resolve to generated data or an explicit validation error. After triggering Preview and waiting an additional 2.5 seconds, the visible preview grid still showed repeated `Pending`, which looks like a stuck preview state rather than a completed render.
- Regression finding: stored-history state changed without an explicit save-style user intent. The â€œLast Usedâ€ area populated a timestamped entry (`last used - 2026-06-20T17:09:41.607Z`) and enabled `Load` / `Clear Last Used`, which creates a real risk of accidental history pollution from exploratory or half-complete edits.
- UX risk: the picker interactions provided weak visible confirmation for selection state during this run; the most obvious feedback arrived only after closing, and that feedback appeared incorrect.
- Good signal: help affordances are broadly present on the deployed surface for schema help, domain help, preview help, and file-generation help, so the PRâ€™s help-surface expansion is visible in the product.
- Good signal with caveat: the picker surface itself is richer and more discoverable than a bare command list, but the lifecycle/state-handling regressions make the richer UI hard to trust.
