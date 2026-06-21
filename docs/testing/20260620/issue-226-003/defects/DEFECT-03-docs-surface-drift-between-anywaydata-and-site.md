# DEFECT-03 Docs Surface Drift Between AnywayData And Embedded Site Docs

## Problem

The deployed app routes users to two docs surfaces that do not agree, with stale content still visible on `anywaydata.com` compared with the embedded `/site` docs and live picker.

## Environment

- Deployed app and generator
- `https://anywaydata.com/...`
- `https://eviltester.github.io/grid-table-editor/site/...`

## Reproduction

1. Open the deployed generator and inspect picker docs for `internet.httpMethod` and `internet.username`.
2. Open the embedded `/site` docs for the same family.
3. Open the corresponding `anywaydata.com` internet docs page.

## Expected

Both public docs surfaces should reflect the same current command names and examples.

## Actual

- The embedded `/site` docs and live picker reflect the current `internet.httpMethod` and `internet.username` surfaces.
- The sampled `anywaydata.com` internet docs still expose stale `internet.userName` content and older example formatting.

## Evidence

- [docs-consistency-test-log.md](../docs-consistency-test-log.md)
- [issue-226-third-session-test-report.md](../issue-226-third-session-test-report.md)

## Follow-Up

- Audit additional command families to determine whether the drift is broad or concentrated in specific docs pages.
