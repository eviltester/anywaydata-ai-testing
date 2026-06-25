# NV-005: Malformed faker params message can echo a malformed example

Severity: Low

Status: confirmed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Evidence: `../logs/negative-validation-test-log.md`, `../screenshots/negative-07-malformed-faker-params.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Select `faker` and choose `helpers.arrayElement` from the method picker.
3. Enter malformed params such as `(["A","B"`.
4. Click Generate.

## Expected Result

The validation message should explain the expected wrapping/syntax without echoing an incomplete or confusing example.

## Actual Result

The UI showed: `params should be wrapped in parentheses, e.g. (["A","B").`

The echoed example is itself incomplete/malformed, which makes it harder for users to repair the input.
