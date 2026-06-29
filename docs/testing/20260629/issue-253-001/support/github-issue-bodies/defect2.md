## Summary

The deployed app page at https://eviltester.github.io/grid-table-editor/site/app.html has no main landmark and no H1, making orientation harder for keyboard and assistive-technology users.

## Steps

1. Open https://eviltester.github.io/grid-table-editor/site/app.html.
2. Inspect the DOM or accessibility structure.
3. Check for main, [role=main], and h1.

## Observed

Repeated probes at desktop and mobile viewports found:

`	ext
main landmarks: 0
h1 elements: 0
`

## Expected

The app page should expose a main landmark and page-level heading for the primary editor surface.

## Evidence

- Defect report: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/defects/defect-002-app-missing-main-h1.md
- Screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-002-app-missing-main-h1-mobile.png
- Video: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/videos/defect-002-app-missing-main-h1.webm
