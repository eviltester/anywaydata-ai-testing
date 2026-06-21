# DEFECT-04 Params Preview Requires Blur

## Problem

Typed params are not always honored when the user clicks `Preview` immediately after editing; the field may need to lose focus first.

## Environment

- Deployed generator
- Observed in UX pass with `internet.httpMethod`

## Reproduction

1. Open the deployed generator.
2. Select `internet.httpMethod`.
3. Enter params such as `(commonOnly=true, excludes="head, delete")`.
4. Click `Preview` immediately.
5. Then tab away from the params field and click `Preview` again.

## Expected

Preview should respect the latest typed params immediately.

## Actual

The first preview can ignore the typed params until the field loses focus, after which preview output changes to the expected constrained method set.

## Evidence

- [ux-regression-test-log.md](../ux-regression-test-log.md)
- [issue-226-third-session-test-report.md](../issue-226-third-session-test-report.md)

## Follow-Up

- Compare mouse click-away versus keyboard blur behavior.
- Test whether the same commit-on-blur quirk affects other command families and helper commands.
