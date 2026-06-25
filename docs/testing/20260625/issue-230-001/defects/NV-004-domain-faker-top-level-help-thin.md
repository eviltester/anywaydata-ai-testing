# NV-004: Top-level domain/faker help lacks params/examples compared with core command help

Severity: Low

Status: confirmed in negative-validation and final-review passes.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html and app Test Data panel
- Evidence: `../logs/negative-validation-test-log.md`, `../support/final-review-executions.json`, `../screenshots/negative-04-faker-help.png`

## Steps to Reproduce

1. Open the deployed generator or app Test Data panel.
2. In the schema row, rotate the field type through enum, literal, regex, domain, and faker.
3. Inspect the top-level help for each type.

## Expected Result

Domain and faker top-level help should orient users with at least the same level of params/example guidance as enum, literal, and regex, especially because domain/faker commands now open a rich method picker.

## Actual Result

Enum, literal, and regex help show schema params, parameter descriptions, and examples. Domain and faker help only show a short category description plus a Learn more link.

## Notes

The method picker gives detailed help after opening and selecting a command, so this is not a blocker. It is a discoverability/content consistency issue around the changed help surface.
