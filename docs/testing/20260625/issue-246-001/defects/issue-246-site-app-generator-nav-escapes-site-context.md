# `/site/` App And Generator Nav Escapes The Site Context

## Severity

Medium

## Summary

When users enter the app or generator from the deployed `/site/` environment, the app shell nav mixes nested `/site/` links with root app/generator links.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 deployed review

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/site/`.
2. Click `Use The Application`.
3. Inspect the top nav on `/site/app.html`.
4. Open `/site/generator.html` and inspect the top nav.

## Expected Result

If `/site/` is the deployed review context, app/generator nav should keep users in that context or make context switching explicit.

## Actual Result

- `/site/app.html` has `AnyWayData` linking to `/grid-table-editor/` and `Generator` linking to `/grid-table-editor/generator.html`.
- `/site/generator.html` has `AnyWayData` linking to `/grid-table-editor/` and `App` linking to `/grid-table-editor/app.html`.
- `Docs` and `Blog` remain under `/grid-table-editor/site/...`.

## Evidence

- `../logs/docs-consistency-test-log.md`
- `../screenshots/docs-consistency-site-app-nav-root-links.png`
- `../screenshots/docs-consistency-site-generator-nav-root-links.png`

## Repeatability

Observed by the docs-consistency lane on both nested app surfaces.
