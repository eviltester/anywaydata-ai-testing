# AD-001: helpers.arrayElement documented array params cannot be applied from the params editor

Severity: Medium

Status: confirmed repeatable in deployed test environment.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/repeat-checks-main-agent.json`, `../support/helper-arrayelement-comma-param.json`, `../support/loop2-focused-rechecks.json`
- Screenshots: `../screenshots/params-dialog-helpers-arrayelement.png`, `../screenshots/helper-arrayelement-comma-param.png`, `../screenshots/loop2-helper-arrayelement-param-dialog.png`

## Steps to Reproduce

1. Open the deployed generator.
2. In the first schema row, enter column name `Tier`.
3. Change field type to `faker`.
4. Click `Select faker command`.
5. Search for and apply `helpers.arrayElement`.
6. Click the row params/edit button.
7. Try the documented/help-style array examples, for example `(["free", "pro", "enterprise"])`, or a simple comma value `red,green,blue`.

## Expected Result

The params editor should accept a valid array value or clearly explain the exact supported syntax. Applying params should allow preview/generation to choose one of the supplied values.

## Actual Result

The params editor keeps Apply disabled and reports errors such as:

- `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`
- Direct/help-style params can also produce `Cannot read properties of undefined (reading 'length')`.

The picker help says `Params field: (["A", "B", "C"])` and `Full call: helpers.arrayElement(["A", "B", "C"])`, so the documented example appears unusable in the live row/params workflow.

## Notes

This blocks at least one required-params helper command from the method-picker-to-generator workflow and suggests structured helper params need focused review beyond this one command.
