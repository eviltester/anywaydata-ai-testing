# DEFECT-02: Published Full-Command Examples Do Not Map Cleanly To The Split Picker-Plus-Params UI

## Summary

Published docs and picker examples frequently present full invocation strings such as `autoIncrement.sequence(start=10, step=5)` and `literal.value(value="Pending")`, while the live row-mode workflow splits command selection from params entry. A user must infer that the command should be selected separately and only the params belong in the params box.

## Why This Matters

- The story goal was not only â€œexamples existâ€ but that examples help users use commands correctly.
- This mismatch creates false failure signals and real usability friction.
- Earlier runtime-failure conclusions were partially corrected only after retesting with the split UI used as intended.

## Environment

- Deployed test environment: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Published docs under [site/docs](https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data)

## Reproduction

1. Open a published command docs page, for example:
   - `autoIncrement.sequence`
   - `finance.pin`
   - `literal.value`
   - `string.alpha`
2. Read a published example formatted as a full invocation string.
3. Open the deployed generator in row mode.
4. Select the relevant source type and command.
5. Attempt to follow the documentation literally rather than infering the split workflow.

## Expected Result

- Published examples should either:
  - map directly into the live UI, or
  - clearly explain how to translate a full invocation into the split command-picker and params-entry workflow.

## Actual Result

- Examples are present, but the translation into the live UI is implicit.
- A user can easily paste or mentally model the full invocation incorrectly.
- Several earlier suspicious failures in the exploratory session turned out to be workflow/format mismatch rather than true generator-runtime failure.

## Evidence

- Docs consistency findings: [docs-consistency-test-log.md](../docs-consistency-test-log.md)
- Main log final-review correction: [issue-226-second-session-test-log.md](../issue-226-second-session-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs generation in `docs-src/docs/040-test-data/domain/*`
- command help metadata generation
- picker/help rendering that shows examples
- any docs/help spec that defines canonical example format

## Investigation Questions

- Should docs be rewritten to show separate â€œcommandâ€ and â€œparamsâ€ examples for row mode?
- Should the UI accept a pasted full-command example and split it automatically?
- Is there already a text-mode surface where the full-command examples are correct and clearer?

## Fix Verification Ideas

- Choose 3 representative examples from different families.
- Confirm a reviewer can follow them in row mode without extra undocumented inference.
- Verify picker examples and published docs use a consistent, explicit format.

