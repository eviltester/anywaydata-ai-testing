# AD-003: Directly typed commerce.price help-style params are ignored while params-dialog values work

Severity: Low/Medium

Status: confirmed suspicious behavior; params dialog path works, direct params-field path does not appear equivalent.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html and https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/command-coverage-valid-params-rerun.json`, `../support/loop2-focused-rechecks.json`
- Screenshot: `../screenshots/loop2-commerce-price-params-dialog.png`

## Steps to Reproduce

1. Select `commerce.price` from the method picker.
2. Use the help example syntax in the params field: `(dec=2, max=20, min=10, symbol="$")`.
3. Generate several rows.
4. Repeat by opening the params dialog and entering `dec=2`, `max=20`, `min=10`, `symbol=$` in the separate fields.

## Expected Result

The help-style params syntax and the params dialog should serialize to equivalent generation behavior, or the UI should clearly direct users to the params dialog and reject unsupported manual syntax.

## Actual Result

The direct help-style params path generated values outside the requested 10-20 range and omitted the `$` symbol, for example `35.69`, `426.99`, `280.05`, `489.35`.

The params dialog path generated expected values such as `$16.55`, `$18.09`, `$19.05`, `$17.75`, all within the configured range and with the symbol.

## Notes

This may be a row params parsing issue rather than a method picker component issue, but the new Method Help Display shows params examples prominently and users may copy them into the row params field.
