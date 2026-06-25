# Generator and app controls expose empty accessible names

## Summary

Chrome's accessibility tree exposes empty names for several important deployed controls in the generator and app pages. The confirmed empty-name controls include the generator schema field type combobox, generator table preview searchbox, and app grid searchbox.

## Environment

- URLs:
  - https://eviltester.github.io/grid-table-editor/generator.html
  - https://eviltester.github.io/grid-table-editor/app.html
- Date/time: 2026-06-25 00:13 Europe/London
- Viewport: mobile portrait, 360 x 740, device scale factor 2
- Browser: Chrome via DevTools Protocol with a temporary profile
- Related scope: issue #228 / PR #243 responsive and accessibility retest

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Inspect the Chrome accessibility tree for focusable controls.
3. Repeat on `https://eviltester.github.io/grid-table-editor/app.html`.
4. Compare control roles and accessible names.

## Expected Result

Focusable controls should expose meaningful accessible names that describe their purpose. Examples:

- The generator schema type combobox should communicate that it selects the field type or method.
- The generator preview grid searchbox should communicate that it filters/searches the preview table.
- The app grid searchbox should communicate that it filters/searches the table column/grid.

## Actual Result

Chrome accessibility tree returned these empty-name focusable controls:

```text
generator.html
- role=combobox, empty name, focusable=true, hasPopup=menu
- role=searchbox, empty name, focusable=true, editable=plaintext

app.html
- role=searchbox, empty name, focusable=true, editable=plaintext
```

The route sweep also found adjacent unlabeled DOM controls in the same areas, including schema row inputs that rely on placeholders and table/search controls with no programmatic name.

## Evidence

- Structured run data: `../responsive-accessibility-cdp-results.json`
- Generator mobile screenshot: `../screenshots/responsive-a11y-grid-table-editor-generator-html-mobile-portrait-360x740.png`
- App mobile screenshot: `../screenshots/responsive-a11y-grid-table-editor-app-html-mobile-portrait-360x740.png`

## Severity

Medium. These are focusable controls in core app/generator workflows, and empty accessible names make them difficult or impossible to understand with assistive technology.

## Notes

This finding is based on Chrome's accessibility tree, not only DOM heuristics.
