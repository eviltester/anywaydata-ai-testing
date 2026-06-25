# Docs Active Breadcrumb Contrast Fails WCAG AA

## Severity

Medium

## Summary

The active breadcrumb link state in sampled docs pages fails the WCAG AA contrast threshold for normal text.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/docs/intro/
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/
- Tooling: axe-core 4.10.2

## Expected Result

Active breadcrumb text should meet at least 4.5:1 contrast for normal text.

## Actual Result

Axe reports `color-contrast` on `.breadcrumbs__item--active > .breadcrumbs__link` with measured contrast `4.07:1` for foreground `#2e8555` on background `#f2f2f2`.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`

## Repeatability

Observed on multiple sampled docs pages.
