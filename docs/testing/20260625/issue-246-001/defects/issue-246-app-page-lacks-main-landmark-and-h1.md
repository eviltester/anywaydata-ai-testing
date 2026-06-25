# App Page Lacks Main Landmark And H1

## Severity

Medium

## Summary

The app page does not expose a main landmark or page-level `h1`, making orientation harder for screen-reader users.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/app.html
- Viewport: `390x844`
- Tooling: axe-core 4.10.2

## Expected Result

The app page should expose a clear `main` landmark and a page-level heading.

## Actual Result

Axe reports:

- `landmark-one-main`: document does not have a main landmark.
- `page-has-heading-one`: page does not contain a level-one heading.
- `region`: top navigation/pageheading content is not contained by landmarks.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`

## Repeatability

Observed on the deployed `/site/app.html` page.
