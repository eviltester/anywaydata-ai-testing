# Boolean Probability Out Of Range Is Accepted

## Summary

`datatype.boolean(probability=2)` and `datatype.boolean(probability=-0.1)` generate data despite the documented probability range of `0` to `1`.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/
- Deployment branch: `codex/228-improve-command-definition`
- Deployment commit: `a3b39ddcfe0f`
- Deployment build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

1. Open `generator.html`.
2. Click `Edit as Text`.
3. Enter either schema:

   ```text
   flag
   datatype.boolean(probability=2)
   ```

   ```text
   flag
   datatype.boolean(probability=-0.1)
   ```

4. Click `Preview`.
5. Repeat `probability=2` in `app.html` Test Data Generate.

## Expected Result

Values outside the documented `0` to `1` probability range should be rejected before generation with a visible validation message.

## Actual Result

- `probability=2` generated all `true`.
- `probability=-0.1` generated all `false`.
- App Generate reported success for `probability=2`.

## Evidence

Supporting raw evidence is in:

- `../negative-validation-matrix-results.json`
- `../negative-validation-recheck-results.json`
- `../negative-validation-app-sample-results.json`
- `negative-validation-defects.md`

## Repeatability

Repeated by the negative-validation subagent in generator Preview and sampled in the app flow.
