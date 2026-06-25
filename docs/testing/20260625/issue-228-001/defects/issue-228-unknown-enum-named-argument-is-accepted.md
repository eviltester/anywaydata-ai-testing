# Unknown Enum Named Argument Is Accepted

## Summary

`datatype.enum` accepts an unknown named argument `valuez` instead of rejecting it. Generation proceeds without a visible validation error.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Deployment branch: `codex/228-improve-command-definition`
- Deployment commit: `a3b39ddcfe0f`
- Deployment build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

1. Open `generator.html`.
2. Click `Edit as Text`.
3. Enter:

   ```text
   status
   datatype.enum(valuez="active,pending")
   ```

4. Click `Preview`.

## Expected Result

The command should reject `valuez` as an unknown argument and show an actionable message such as `Unknown argument "valuez"; expected "values"`.

## Actual Result

Generation proceeds with no visible validation error. The subagent observed output in both the initial matrix and clean recheck.

## Evidence

Supporting raw evidence is in:

- `../negative-validation-matrix-results.json`
- `../negative-validation-recheck-results.json`
- `negative-validation-defects.md`

## Repeatability

Repeated by the negative-validation subagent in generator Preview.
