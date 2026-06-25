# NV-003: Text-mode malformed schemas can show only a generic validation failure

Severity: Low

Status: observed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Evidence: `../logs/negative-validation-test-log.md`, `../screenshots/negative-13-text-empty-busy.png`, `../screenshots/negative-15-text-regex-busy.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Switch schema editing to text mode.
3. Try malformed or empty schemas such as empty text or `BadRegex` with `regex([A-Z`.
4. Click Generate.

## Expected Result

Text mode should provide line-specific or rule-specific validation comparable to row mode.

## Actual Result

Some text-mode failures only showed `Schema validation failed. Grid unchanged.` without the detailed row/line-level cause visible to the user.

## Notes

Row mode generally produced clearer messages for similar invalid input, so this is a consistency and debuggability issue.
