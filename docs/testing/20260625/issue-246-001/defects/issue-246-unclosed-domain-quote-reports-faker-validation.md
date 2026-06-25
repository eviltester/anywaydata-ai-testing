# Unclosed Domain Quote Reports Faker Validation

## Severity

Low

## Summary

A malformed domain command reports a faker validation failure, which gives the user the wrong mental model for the error.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   method
   internet.httpMethod(excludes="GET)
   ```

4. Click `Preview`.

## Expected Result

The error should identify a malformed domain command or unclosed string.

## Actual Result

The visible message says the method failed faker validation and mentions unsafe faker rule syntax.

## Evidence

- `../logs/negative-validation-test-log.md`

## Repeatability

Observed in the negative-validation lane.
