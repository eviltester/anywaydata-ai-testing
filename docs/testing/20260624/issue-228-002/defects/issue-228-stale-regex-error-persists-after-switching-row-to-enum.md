# Regex Validation Error Persists After Switching The Row Type To `enum`

## Summary

If a row starts in `regex` with invalid input and is then switched to `enum`, the old regex-specific validation error remains visible even though the row type and help link have changed.

This is a confirmed, repeatable stale-validation defect that can mislead users about which rule family is currently failing.

## Environment

- Story: issue `#228`
- PR under review: `#243`
- Deployed build observed on landing page:
  - Branch: `codex/228-improve-command-definition`
  - Commit: `fb9e8e2049e1`
  - Built: `2026-06-24T20:13:50.037Z`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, keep the type as `regex`.
3. Enter a malformed regex value: `(`.
4. Confirm the row shows a regex error such as `invalid regex value`.
5. Change the row type from `regex` to `enum` without changing the field contents.

## Actual Result

- The row now shows enum-specific UI such as `Enum data help`.
- The old regex-specific error remains visible on the row.

## Expected Result

Changing the row type should clear or recompute validation so the visible error matches the currently selected command family.

## Evidence

- Supporting screenshot from the negative-validation pass: ![Invalid regex state used in the stale-validation reproduction](../screenshots/negative-invalid-regex.png)

## Repeatability

- Reproduced twice in clean Playwright CLI sessions by the negative-validation lane.

## Notes For Investigation

- The defect looks like stale validation state surviving a rule-type change rather than a parser failure in `enum`.
- Because issue `#228` touches shared command-definition and help wiring, stale cross-family validation state is especially relevant.
