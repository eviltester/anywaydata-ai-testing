# Summary Elements Contain Nested Interactive Controls

## Severity

Medium

## Summary

App and generator disclosure summaries contain nested interactive controls, creating focus and announcement ambiguity.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Tooling: axe-core 4.10.2

## Expected Result

Interactive help controls should not be nested inside a `summary` element.

## Actual Result

Axe reports `nested-interactive` for instructions and Test Data disclosure summaries. Visible summary headers include help controls next to summary text.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`

## Repeatability

Observed on both app and generator pages.
