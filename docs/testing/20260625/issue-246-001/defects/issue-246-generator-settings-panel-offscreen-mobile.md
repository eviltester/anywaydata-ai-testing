# Generator Settings Panel Opens Offscreen On Mobile

## Severity

Medium

## Summary

The generator export settings panel is positioned partly offscreen on mobile and narrow viewports.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/generator.html
  - https://eviltester.github.io/grid-table-editor/generator.html
- Viewports: `390x844` and `320x640`

## Expected Result

The settings panel should open within the viewport or stack below the trigger on small screens.

## Actual Result

The panel appears around `x=269..519` with a 250px width, extending beyond both 390px and 320px wide viewports. Child controls such as `Line endings` and checkbox label areas are also clipped.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-generator-controls.txt`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`

## Repeatability

Observed on both nested and root generator pages.
