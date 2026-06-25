# Empty Or Missing Enum Values Have Weak Feedback

## Summary

Empty or missing enum values produce inconsistent and weak feedback across generator and app flows.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/
- Deployment branch: `codex/228-improve-command-definition`
- Deployment commit: `a3b39ddcfe0f`
- Deployment build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

Generator:

1. Open `generator.html`.
2. Click `Edit as Text`.
3. Enter either:

   ```text
   status
   datatype.enum(values="")
   ```

   ```text
   status
   datatype.enum()
   ```

4. Click `Preview`.

App:

1. Open `app.html`.
2. Expand `Test Data`.
3. Generate with `datatype.enum(values="")`.

## Expected Result

Both generator and app should show a visible, actionable validation message, such as `Row 1: datatype.enum requires at least one non-empty value`.

## Actual Result

- Generator Preview produced no output and no visible validation message.
- App Generate reported only `Generate failed. Check console for details.` and retained previous grid data.

## Evidence

Supporting raw evidence is in:

- `../negative-validation-matrix-results.json`
- `../negative-validation-recheck-results.json`
- `../negative-validation-app-sample-results.json`
- `negative-validation-defects.md`

## Repeatability

Repeated by the negative-validation subagent in generator Preview and sampled in the app flow.
