# NV-002: Text schema `unknown()` is accepted as generated data instead of rejected

Severity: Low/Medium

Status: confirmed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence: `../logs/negative-validation-test-log.md`, `../support/negative-validation-observations.json`, `../screenshots/negative-14-text-unknown-busy.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Switch schema editing to text mode.
3. Enter a schema with column `Mystery` and rule `unknown()`.
4. Click Generate.

## Expected Result

A method-like unknown function call should be rejected with a clear validation message, or the docs should clearly state that unknown function-like text is intentionally treated as literal data.

## Actual Result

The schema generated a row with value `unknown`, making the malformed function-like call look accepted rather than invalid.

## Notes

This may be a parser ambiguity rather than a method-picker regression, but it matters because issue 230 surfaces richer method names and examples; malformed method-like text should not silently pass as generated data without clear intent.
