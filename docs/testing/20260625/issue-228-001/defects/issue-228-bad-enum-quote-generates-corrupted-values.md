# Bad Enum Quote Generates Corrupted Values Instead Of Failing

## Summary

Malformed enum quote syntax is accepted in both generator Preview and app Generate. Instead of failing validation, the deployed app generates corrupted values such as `\\\"active` and may report generation success.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/
- Deployment branch: `codex/228-improve-command-definition`
- Deployment commit: `a3b39ddcfe0f`
- Deployment build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

Generator:

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Click `Edit as Text`.
3. Enter:

   ```text
   status
   datatype.enum(values="active,pending)
   ```

4. Click `Preview`.

App:

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Expand `Test Data`.
3. Use the text schema editor with the same schema.
4. Generate data.

## Expected Result

The malformed quote should be rejected before generation with a visible row-level error that identifies the unclosed quote or malformed `values` argument.

## Actual Result

- Generator Preview generated rows including corrupted value `\\\"active`.
- App Generate reported `Generate complete. Grid updated.` and populated values including `\\\"active`.

## Evidence

Supporting raw evidence is in:

- `../negative-validation-matrix-results.json`
- `../negative-validation-recheck-results.json`
- `../negative-validation-app-sample-results.json`
- `negative-validation-defects.md`

## Repeatability

Repeated by the negative-validation subagent from a clean generator tab and in the app flow.
