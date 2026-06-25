# Mobile `/site/` App And Generator Nav Overflows And Focuses Offscreen

## Severity

Medium

## Summary

On mobile and narrow viewports, `/site/app.html` and `/site/generator.html` have a header wider than the viewport, and keyboard focus can move to offscreen nav items.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Viewports: `390x844` and `320x640`

## Expected Result

The nav should fit, wrap, or collapse without horizontal page scrolling, and keyboard focus should remain visible.

## Actual Result

The document scroll width is around 454-455px on mobile viewports. The `Blog` nav item is outside the viewport, and tabbing can focus it offscreen. Later tabbing horizontally scrolls the app so the left edge of app content is clipped.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile-focus-after-tabs.png`

## Repeatability

Repeated on both app and generator nested `/site/` pages by the responsive/accessibility lane.
