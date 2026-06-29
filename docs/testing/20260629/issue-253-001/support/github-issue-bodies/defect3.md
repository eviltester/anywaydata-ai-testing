## Summary

The deployed app and generator include visible mobile controls below 24px in at least one dimension, including help icons and schema row controls.

## Steps

1. Open the app or generator at a mobile viewport such as 390x844.
2. Inspect visible interactive controls.
3. Measure rendered bounding boxes.

## Observed

Examples include 13x13 help icons, schema row inputs around 21px high, and select controls around 19px high.

## Expected

Interactive controls should provide at least a 24px target area, preferably larger on touch-first mobile layouts.

## Evidence

- Defect report: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/defects/defect-003-sub-24px-touch-targets.md
- App screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-003-app-sub-24px-touch-targets.png
- Generator screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-003-generator-sub-24px-touch-targets.png
- Video: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/videos/defect-003-sub-24px-touch-targets.webm
