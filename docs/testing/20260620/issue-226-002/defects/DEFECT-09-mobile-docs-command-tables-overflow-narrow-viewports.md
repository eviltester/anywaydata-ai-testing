# DEFECT-09: Mobile Docs Command Tables Overflow Narrow Viewports

## Summary

Dense command-reference tables on published docs pages overflow their containers on narrow mobile widths and require awkward horizontal scrolling.

## Why This Matters

- The PR invested heavily in examples and docs richness.
- If dense argument/reference tables are hard to use on phones, the expanded docs value is reduced.

## Environment

- Published docs pages, especially [site/docs/test-data/domain/string](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string)
- Narrow widths sampled during testing:
  - `390x844`
  - `320x568`

## Reproduction

1. Open a dense command-reference docs page such as `site/docs/test-data/domain/string`.
2. Resize to a narrow mobile viewport, e.g. `390px` or `320px` width.
3. Inspect argument/reference tables.

## Expected Result

- Tables should remain readable within the mobile experience with minimal awkward horizontal scrolling.

## Actual Result

- Dense tables overflow their containers significantly and require repeated horizontal scrolling.
- Sampled sizes during the session:
  - around `366px` to `466px` wide inside a `343px` container at `390px` width
  - around `366px` to `466px` wide inside a `273px` container at `320px` width

## Evidence

- Responsive/accessibility log: [responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs table styling and responsive treatment
- long-code/example column behavior on mobile
- docs theme/table wrappers for overflow handling

## Investigation Questions

- Should parameter tables collapse, stack, or offer a different mobile presentation?
- Are only certain docs pages affected, or is this a general command-table styling issue?

## Fix Verification Ideas

- Re-check `string` and at least one other dense domain page at `390px` and `320px`.
- Confirm the resulting experience is materially easier to read and navigate on narrow screens.

