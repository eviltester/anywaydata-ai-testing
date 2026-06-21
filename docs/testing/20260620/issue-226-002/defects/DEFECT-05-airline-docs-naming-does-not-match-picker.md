# DEFECT-05: Published Airline Docs Naming Does Not Match Live Picker Naming

## Summary

The published airline docs use aggregate/nested naming such as `airline.airline`, `airline.airplane`, `airline.airport`, `airline.airline.iataCode`, and `airline.airline.name`, while the live picker exposes flattened names like `airline.iataCode`, `airline.name`, `airplane.iataTypeCode`, and `airport.iataCode`.

## Why This Matters

- Users cannot reliably map docs entries to picker entries.
- This weakens discoverability and makes broad example-following harder than it should be.
- The PR heavily changed help/docs metadata, so naming consistency is important.

## Environment

- Published docs page: [site/docs/test-data/domain/airline](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/airline)
- Live picker: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the published airline docs page.
2. Note the names used in page sections, tables of contents, and examples.
3. Open the deployed generator and switch a row to `domain`.
4. Open the command picker and inspect airline/airplane/airport entries.

## Expected Result

- Published docs naming should match the names a user sees in the live picker closely enough that the mapping is obvious.

## Actual Result

- The published naming model and the live picker naming model do not line up cleanly.

## Evidence

- Docs consistency log: [docs-consistency-test-log.md](../docs-consistency-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- airline docs source markdown
- keyword-definition naming strategy
- command-help metadata generation for display names
- picker grouping/display rules

## Investigation Questions

- Is the docs surface intentionally more hierarchical while the picker is intentionally flatter?
- If yes, where should the mapping explanation live?
- If not, which naming convention should be treated as canonical?

## Fix Verification Ideas

- Compare docs and picker after the change for airline, airplane, and airport entries.
- Ask whether a first-time reviewer can locate a docs command in the picker without guesswork.

