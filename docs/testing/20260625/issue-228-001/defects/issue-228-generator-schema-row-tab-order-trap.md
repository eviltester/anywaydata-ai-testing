# Generator schema row tab order traps focus before method/value controls

## Summary

On the deployed PR #243 build, keyboard users cannot reliably tab through the generator schema row. From the `Column Name` input, `Tab` moves focus to `body`, then back to the row action buttons and the same `Column Name` input, repeatedly. Focus does not advance to the field type picker, the value/regex input, schema constraints, or generation controls.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Date/time: 2026-06-25 00:13 Europe/London
- Viewport: mobile portrait, 360 x 740, device scale factor 2
- Browser: Chrome via DevTools Protocol with a temporary profile
- Related scope: issue #228 / PR #243 responsive and accessibility retest

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Use a 360 x 740 mobile viewport.
3. Focus the schema row `Column Name` text input.
4. Press `Tab` repeatedly.

## Expected Result

Focus should move forward through the schema row controls in page order, including the field type picker, the value/regex input, schema constraints, Add Field, stored schema controls, and then the generation controls.

## Actual Result

Focus cycles back through the row action buttons and the same column-name field. The confirmed trace from a clean page was:

```text
start: input text "Column Name"
Tab 1: body
Tab 2: button "Drag field to reorder"
Tab 3: button "Insert field after this row"
Tab 4: button "Remove field"
Tab 5: input text "Column Name"
Tab 6: body
Tab 7: button "Drag field to reorder"
Tab 8: button "Insert field after this row"
```

## Evidence

- Structured run data: `../responsive-accessibility-cdp-results.json`
- Screenshot after the targeted tab-order recheck: `../screenshots/responsive-a11y-generator-tab-after-column-name.png`
- Baseline mobile generator screenshot: `../screenshots/responsive-a11y-grid-table-editor-generator-html-mobile-portrait-360x740.png`

## Severity

Medium. This blocks keyboard-only access to important generator schema controls and is directly tied to the PR's accessibility and picker-related risk areas.

## Notes

The same repeating pattern appeared in the broader desktop and mobile tab traces captured during the route sweep.
