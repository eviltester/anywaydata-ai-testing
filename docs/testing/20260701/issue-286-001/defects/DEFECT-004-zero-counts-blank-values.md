# DEFECT-004: zero count or length parameters generate blank values with success status

## Summary

Zero-valued count/length parameters can generate blank cells while the app reports successful generation. This can silently create missing data when a parameter should probably be rejected or explicitly documented as allowed.

## Environment

- Deployed app: https://eviltester.github.io/grid-table-editor/site/app.html
- Date tested: 2026-07-01

## Steps To Reproduce

1. Open the deployed app.
2. Expand `Test Data`.
3. Switch to schema text mode.
4. Enter this schema:

```text
sha
git.commitSha(length=0)
words
word.words(count=0)
```

5. Set row count to 5.
6. Click `Generate`.

## Expected Result

Zero-length/count values should be rejected, warned about, or clearly documented if blank generation is intentional.

## Actual Result

Generation completes successfully and the grid contains blank cell values for both commands.

## Evidence

![zero counts create blank values](../screenshots/defect-zero-counts-blank-values.png)

Local-only replication video: `../videos/defect-zero-counts-blank-values.webm`

Supporting data: `../support/final-review-execute-now-results.json`, `../support/main-loop3-execute-now-results.json`

## Repeatability

Repeatable in Loop 3 and the final review loop.
