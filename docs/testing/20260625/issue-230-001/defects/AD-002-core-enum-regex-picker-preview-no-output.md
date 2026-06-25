# AD-002: Picker-applied enum and regex rows accept visible values but preview produces no data

Severity: Medium

Status: confirmed repeatable for `enum` and `regex`; `literal` works through the same picker flow.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/enum-via-picker-repeat.json`, `../support/loop2-focused-rechecks.json`, `../support/loop1-command-runtime-matrix.json`
- Screenshots: `../screenshots/enum-via-picker-after-fill.png`, `../screenshots/loop2-core-enum-via-picker.png`, `../screenshots/loop2-core-regex-via-picker.png`

## Steps to Reproduce

1. Open the deployed generator.
2. In the first schema row, set field type to `domain` so the method picker trigger is visible.
3. Click `Select domain command`.
4. Search for `enum`, select the core `enum` tile, and click Apply.
5. Enter column name `Status` and visible value `alpha,beta,gamma`.
6. Click Preview.
7. Repeat with `regex` and visible value `[A-Z]{2}[0-9]{2}`.

## Expected Result

After applying a core command from the method picker and filling its visible value field, Preview should generate data just as direct row selection does.

## Actual Result

- For `enum`, the row initially continues to show `Row 1: enum value is required.` after the visible value is filled.
- Preview clears the schema error but produces no output.
- For `regex`, the same pattern occurs: visible value is present, prior required-value text is shown, Preview produces no output.
- A direct row-mode matrix where `enum`/`regex` are selected without the method picker generated valid output, and picker-applied `literal` also generated output.

## Notes

This looks specific to the core command transition through the new method picker path. It is important because the picker exposes Core commands in the All tab, so users can naturally select them from the dialog.
