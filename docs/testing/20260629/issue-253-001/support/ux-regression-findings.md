# UX Regression Lane Findings

Session: issue-253-001  
Lane: UX/usability and workflow regression  
Date: 2026-06-29  
Target: deployed public environment only

## Scope

Reviewed the deployed AnyWayData public site, generator, app, and docs surfaces related to issue #253 and merged PR #285.

Primary story risk: known commands with invalid params should move from text schema back into Schema UI with row-level validation instead of prompting the user to convert to literal. Unknown or malformed commands should still be protected by the literal-conversion decision flow.

## Techniques

- Charter-based exploratory testing against the public deployment.
- Issue-story workflow testing for text schema to Schema UI switching.
- Negative validation around duplicate params, invalid known params, and unknown commands.
- Recovery testing from invalid params to valid params.
- Method-picker affordance and help-content inspection.
- Light deployed route checks for site, app, and docs surfaces.
- Screenshot-backed observation with raw DOM/state capture.

## Workflows Covered

- Public site route renders and links to app/generator/docs surfaces.
- Generator Schema UI to text schema switching and back.
- Known invalid domain params:
  - `number.int(min=1, min=2, max=3)`
  - `autoIncrement.sequence(start=1, step=0)`
- Unknown command handling:
  - `notARealDomain.command(foo=1)`
- Preview behavior with invalid params, then valid-param recovery.
- Method picker open/select/apply flow using `internet.email`.
- Method-picker details/help affordances and visible docs link.
- App route smoke coverage for grid/editor/test-data panels.
- Docs generating-data category coverage for generator/schema documentation entry points.

## Exact Steps And Results

1. Opened `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Clicked `Edit as Text`.
3. Entered:

```text
Num
number.int(min=1, min=2, max=3)
```

4. Clicked `Edit as Schema`.
5. Result: switched into Schema UI, retained command `number.int`, retained params `(min=1, min=2, max=3)`, and showed row-level validation: `duplicate named argument "min"`. No literal conversion dialog appeared.

6. Repeated with:

```text
Seq
autoIncrement.sequence(start=1, step=0)
```

7. Result: switched into Schema UI, retained command `autoIncrement.sequence`, retained params `(start=1, step=0)`, and showed row-level validation that `step` must be a non-zero integer. No literal conversion dialog appeared.

8. Repeated with:

```text
Mystery
notARealDomain.command(foo=1)
```

9. Result: stayed in text mode and showed `Convert invalid definitions?`, asking whether to convert invalid definitions to literal. This matches the expected distinction for unknown commands.

10. Clicked `Preview` while duplicate `number.int` params were invalid.
11. Result: row-level error stayed visible and no generated output appeared.

12. Edited params to `(min=1, max=3)` and clicked `Preview`.
13. Result: row error cleared; CSV and table preview generated values in range.

14. Started a clean generator page, named a column `Email`, changed type to `domain`, and opened `Select domain command`.
15. Result: method picker opened with command list, detail panel, examples, parameter table, close/cancel/apply controls, and `Open documentation`.

16. Selected/applied `internet.email`.
17. Result: method details were visible in the picker. Scripted search was inconclusive and not treated as a defect.

18. Opened `site/app.html`.
19. Result: app grid/editor route rendered with toolbar, filter, test-data, import/export, preview, and output-format tabs.

20. Opened `site/docs/category/generating-data/`.
21. Result: docs category rendered generating-data entry points including Test Data Generation, Data Grid Editable, Generate to File, Schema Definition, Domain Test Data, Faker Based Data, and Auto Increment Sequences.

## Defects Or Suspicious Behavior

No repeatable deployed UX/workflow regression defect was confirmed in this lane.

Suspicious but not filed:

- GitHub Pages sometimes returned `ERR_CONNECTION_RESET` or transient unstyled output during automation. Direct route retries rendered correctly, so this was treated as environment/resource-load noise rather than a product defect.
- A scripted method-picker search attempt did not update the field like real keystrokes would. Because the automation did not prove user-equivalent typing, no defect is claimed.
- A guessed docs URL returned 404. It was not a clicked/fetched UI link, so it is not counted as a product defect.

## Deferred Ideas

- Re-run method-picker search with real keyboard events in a visible browser session and verify typed filtering, keyboard selection, Enter, Escape, and focus return.
- Exercise the params modal for optional and required params using real clicks/typing, including Cancel, Escape, Apply, and validation message focus.
- Run a narrow/mobile viewport pass over schema text switching, method picker, and conversion dialog.
- Do a deeper app grid/filter mutation pass tied to the broader PR #285 filter-preservation changes.
- Open method-picker `Open documentation` links from selected commands and compare the command examples with current generator behavior.

## Evidence

- `screenshots/ux-regression-001-site-proof-retry.png`
- `screenshots/ux-regression-004-generator-loaded-for-text-mode.png`
- `screenshots/ux-regression-005-edit-as-text-open-valid.png`
- `screenshots/ux-regression-006-known-invalid-params-switch.png`
- `screenshots/ux-regression-007-known-invalid-step-switch.png`
- `screenshots/ux-regression-008-unknown-command-switch.png`
- `screenshots/ux-regression-010-invalid-preview-click.png`
- `screenshots/ux-regression-011-recovered-valid-preview.png`
- `screenshots/ux-regression-013-method-picker-open.png`
- `screenshots/ux-regression-015-method-picker-email-applied.png`
- `screenshots/ux-regression-021-app-direct.png`
- `screenshots/ux-regression-022-docs-generating-data-category.png`
- `support/ux-regression-schema-switch-results.json`
- `support/ux-regression-workflow-results.json`
- `support/ux-regression-app-docs-results.json`
