# Site Home Heading Order Skips H2

## Severity

Low

## Summary

The site home page moves from the main `h1` directly to feature card `h3` headings.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/
- Tooling: axe-core 4.10.2

## Expected Result

Heading levels should follow a semantic sequence, such as `h1`, section `h2`, then card/subsection `h3`.

## Actual Result

Axe reports `heading-order` on the first feature heading `Easy to Use` because the page skips from `h1` to `h3`.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-home-site-mobile.png`

## Repeatability

Observed on the sampled site home page.
