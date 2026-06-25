# Inline `helpers.rangeToNumber` With Missing `max` Still Reaches Preview And Generates Output

## Summary

Inline params for `faker.helpers.rangeToNumber` are validated less strictly than the structured params modal. The inline form `({ min: 5 })` is accepted far enough to reach Preview and generate implausible 16-digit output values instead of failing validation or requiring the missing `max`.

This is a repeatable row-vs-modal validation inconsistency on a changed helper surface.

## Environment

- Story: issue `#228`
- PR under review: `#243`
- Deployed build observed on landing page:
  - Branch: `codex/228-improve-command-definition`
  - Commit: `fb9e8e2049e1`
  - Built: `2026-06-24T20:13:50.037Z`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, change the type to `faker`.
3. Choose faker command `helpers.rangeToNumber`.
4. Enter inline params `({ min: 5 })`.
5. Trigger `Preview`.

## Actual Result

- No clear row-level validation error blocks preview for the missing `max`.
- Preview generates unrelated large numeric values rather than a bounded result or a targeted validation failure.

## Expected Result

The row should reject missing required bounds consistently, or at minimum produce a specific validation message that `max` is missing before preview is allowed.

## Evidence

- Preview state with missing `max`: ![Missing max still generated output](../screenshots/negative-range-to-number-missing-max-preview.png)

## Cross-Surface Comparison

- The structured params modal for the same command is stricter: it blocks Apply for missing or reversed bounds.
- However, the modal message is generic and does not clearly say whether the problem is missing `max` or `min > max`.

## Notes For Investigation

- This may share a root cause with the changed `range-to-number` keyword definition and params-editor surface in the current PR head.
- The implausible 16-digit values suggest fallback or misparsed behavior rather than a correct bounded-number interpretation.
