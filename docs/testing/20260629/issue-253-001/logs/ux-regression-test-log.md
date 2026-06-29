---
## 2026-06-29T22:19:47+01:00
'- What you think you want to do and why'
Start the UX/usability lane for issue #253 / merged PR #285, preserve existing session artifacts, and keep the review deployed-only so the evidence reflects the public GitHub Pages environment rather than local code.
actions
- Confirmed issue #253 is closed and PR #285 is merged, closes issue #253, and includes the schema text-to-UI invalid-param fix plus related `autoIncrement.sequence` and grid/filter changes.
- Confirmed user-supplied PR #295 is not resolvable in `eviltester/grid-table-editor`.
- Reused `docs/testing/20260629/issue-253-001/` and created this lane log because `logs/ux-regression-test-log.md` was absent at lane start.
- Used browser automation against deployed URLs only:
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data/`
- Did not run local repo verify, build, test, package-manager, or app commands.
observations
- The public site and generator pages rendered from GitHub Pages after retrying through transient `ERR_CONNECTION_RESET`/resource-load noise.
- The app route and docs category route rendered directly from the deployed site.
- Existing command-coverage artifacts were already present; this lane added only UX-prefixed screenshots and support files.
---
## 2026-06-29T22:24:00+01:00
'- What you think you want to do and why'
Exercise the core issue workflow: a known command with invalid params should be able to move from text schema back into Schema UI without asking to convert to literal, while malformed or unknown commands should still be protected.
actions
- Opened `generator.html`, switched from Schema UI to `Edit as Text`, entered `Num` plus `number.int(min=1, min=2, max=3)`, then switched back to Schema UI.
- Repeated the same text-to-schema flow with `Seq` plus `autoIncrement.sequence(start=1, step=0)`.
- Repeated with unknown command text `Mystery` plus `notARealDomain.command(foo=1)`.
- Captured:
  - `screenshots/ux-regression-004-generator-loaded-for-text-mode.png`
  - `screenshots/ux-regression-005-edit-as-text-open-valid.png`
  - `screenshots/ux-regression-006-known-invalid-params-switch.png`
  - `screenshots/ux-regression-007-known-invalid-step-switch.png`
  - `screenshots/ux-regression-008-unknown-command-switch.png`
- Saved raw state in `support/ux-regression-schema-switch-results.json`.
observations
- `number.int(min=1, min=2, max=3)` switched into Schema UI as a domain row with command `number.int`, params `(min=1, min=2, max=3)`, and row-level validation: `invalid domain params - Invalid keyword arguments: duplicate named argument "min"`.
- `autoIncrement.sequence(start=1, step=0)` switched into Schema UI as a domain row with command `autoIncrement.sequence`, params `(start=1, step=0)`, and row-level validation: argument `step` must be a non-zero integer.
- Neither known-invalid command showed the literal-conversion dialog.
- The unknown command stayed in text mode and showed the `Convert invalid definitions?` dialog, which is the intended distinction from known-invalid params.
---
## 2026-06-29T22:31:00+01:00
'- What you think you want to do and why'
Check recovery and generation behavior after invalid-param validation so the fix does not leave users stuck or produce misleading output.
actions
- With `number.int(min=1, min=2, max=3)` in Schema UI, clicked `Preview`.
- Edited the params field directly to `(min=1, max=3)` and clicked `Preview` again.
- Captured:
  - `screenshots/ux-regression-009-invalid-before-preview.png`
  - `screenshots/ux-regression-010-invalid-preview-click.png`
  - `screenshots/ux-regression-011-recovered-valid-preview.png`
- Saved raw state in `support/ux-regression-workflow-results.json`.
observations
- Preview with invalid duplicate params kept the row-level schema error visible and did not generate output.
- After correcting params to `(min=1, max=3)`, the error cleared and preview generated a CSV preview plus table rows with values in the expected range.
- Error recovery was local and understandable: the user could edit the params field without returning to text mode or accepting literal conversion.
---
## 2026-06-29T22:38:00+01:00
'- What you think you want to do and why'
Cover method-picker and help affordances around schema editing because PR #285 changed classification paths that users reach through both text and UI workflows.
actions
- Started from a clean generator page.
- Named a column `Email`, changed field type to `domain`, opened `Select domain command`, inspected the method picker.
- Navigated within the picker to `internet.email`, selected it, and applied the method.
- Clicked a visible help affordance while the picker was open.
- Captured:
  - `screenshots/ux-regression-012-domain-row-ready.png`
  - `screenshots/ux-regression-013-method-picker-open.png`
  - `screenshots/ux-regression-014-method-picker-search-email.png`
  - `screenshots/ux-regression-015-method-picker-email-applied.png`
  - `screenshots/ux-regression-016-help-affordance-after-click.png`
observations
- The method picker opened in a modal with visible close, cancel, and apply controls.
- The picker showed method names, descriptions, schema snippets, parameter details, parameter required/optional status, examples, and an `Open documentation` link for the selected method.
- `internet.email` details were visible and showed optional parameters including `allowSpecialCharacters`, `firstName`, `lastName`, and `provider`.
- Scripted search input did not behave like real typing in this automation pass, so no defect is claimed from that signal.
---
## 2026-06-29T22:44:00+01:00
'- What you think you want to do and why'
Lightly check the deployed app and docs routes linked from the public site so this UX lane covers the deployed workflow surfaces around generator/schema editing.
actions
- Loaded the public site route and captured `screenshots/ux-regression-001-site-proof-retry.png`.
- Loaded the deployed app route directly and captured `screenshots/ux-regression-021-app-direct.png`.
- Loaded the docs generating-data category and captured `screenshots/ux-regression-022-docs-generating-data-category.png`.
- Saved route state in `support/ux-regression-app-docs-results.json`.
observations
- The app route rendered the grid editor with toolbar controls, filter, reset, test-data panel, import/export panel, preview controls, and output-format tabs.
- The docs generating-data category rendered current navigation for Test Data Generation, Data Grid Editable, Generate to File, Schema Definition, domain/faker data, and Auto Increment Sequences.
- A guessed docs URL for a data-generator page returned a GitHub Pages 404 and was not counted as a product defect because it was not a fetched link from the UI.
- A separate site/app click run produced unstyled output during transient resource-load trouble; direct route retry rendered correctly, so that unstyled run was not counted as a repeatable product defect.
---
## 2026-06-29T22:49:00+01:00
'- What you think you want to do and why'
Finalize the lane notes by classifying confirmed behavior, suspicious but non-defect observations, and deferred ideas without creating final defect files.
actions
- Reviewed screenshots and raw browser states from the UX lane.
- Wrote `support/ux-regression-findings.md`.
- Wrote `support/ux-regression-candidate-defects.md`.
observations
- No repeatable UX/workflow regression defect was confirmed in this lane.
- The issue #253 acceptance behavior appears fixed on the deployed generator: known commands with invalid params stay editable in Schema UI and show row-level errors, while unknown commands still get literal-conversion protection.
- Deferred deeper coverage includes real keystroke method-picker search, mobile/narrow viewport, and deeper app grid/filter mutation coverage.
---
