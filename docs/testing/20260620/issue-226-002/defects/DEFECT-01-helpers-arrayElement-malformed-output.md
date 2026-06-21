# DEFECT-01: `helpers.arrayElement` Generates Malformed Output Instead Of Returning An Array Member

## Summary

The deployed generator produced malformed strings like `helpersmarrayElementC` and `helpers#arrayElementB` when executing `helpers.arrayElement(["A", "B", "C"])` in faker mode. It did not return one member of the supplied array.

## Why This Matters

- This is a genuine runtime defect in a changed helper-command surface.
- It undermines trust in the amended command-definition/example work because the published example does not execute correctly.
- It affects a helper command family, which is important because the story scope was broad and not limited to domain commands.

## Environment

- Deployed test environment only: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Session artifacts: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Reproduction

1. Open the deployed generator.
2. In the starter row, set the source type to `faker`.
3. Open the faker command picker.
4. Select `helpers.arrayElement`.
5. Apply the command to the row.
6. Set the column name to `pick`.
7. Enter params as `(["A", "B", "C"])`.
8. Click `Preview`.

## Expected Result

- Each generated value should be exactly one of `A`, `B`, or `C`.
- Output preview and preview grid should contain only those supplied values.

## Actual Result

- The generated values were malformed strings such as:
  - `helpersmarrayElementC`
  - `helpersbarrayElementA`
  - `helpers#arrayElementB`
  - `helpers3arrayElement,`
- The supplied array members were not returned cleanly.

## Evidence

- Main report finding: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)
- Main log final-review retest entry: [issue-226-second-session-test-log.md](../issue-226-second-session-test-log.md)
- Screenshot: [helpers-arrayElement-malformed-output.png](../helpers-arrayElement-malformed-output.png)

## Likely Investigation Areas

- `packages/core/js/faker/faker-helper-keyword-definitions.js`
- command-help/example parsing for helper commands
- any runtime parser/adaptation layer that translates helper params from the split UI into actual faker helper invocation
- picker/help metadata for helper commands, especially array-shaped arguments

## Investigation Questions

- Is the array argument being serialized into a string and then tokenized incorrectly?
- Is the helper runtime path treating the example text as literal text rather than parsed data?
- Does the same failure happen for other array-based helper commands such as `helpers.arrayElements` or `helpers.shuffle`?
- Does the structured params dialog behave differently from direct textbox entry for this helper?

## Fix Verification Ideas

- Re-run the exact repro above.
- Add at least one additional sample with longer arrays, e.g. `(["red", "green", "blue"])`.
- Confirm both output preview and preview grid contain only supplied members.
- Spot-check a second helper command with array input to ensure the fix is not overly specific.

