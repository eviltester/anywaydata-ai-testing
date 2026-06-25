# Invalid Regex Generates Literal-Looking Values Without Warning

## Severity

Medium

## Summary

An invalid-looking regex rule `[abc` is accepted and generates repeated literal-ish values without a visible warning.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   value
   [abc
   ```

4. Click `Preview`.

## Expected Result

The app should either reject invalid regex syntax or clearly indicate that the input is being treated as literal text rather than regex generation syntax.

## Actual Result

Preview generates repeated `[abc`-style values with no visible warning.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-invalid-regex-generates-literalish-values.png`

## Repeatability

Repeated from a clean generator state by the negative-validation lane.
