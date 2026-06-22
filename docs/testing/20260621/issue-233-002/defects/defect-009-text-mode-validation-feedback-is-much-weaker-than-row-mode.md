# Defect 009: Text-mode validation feedback is much weaker than row mode for the same invalid schema

## Summary

The same malformed schema receives materially weaker feedback in text mode than in row mode. Text mode often collapses to the generic `Schema validation failed. Grid unchanged.` message, while row mode preserves the invalid values and surfaces specific inline validator messages.

## Environment

- App under test: `https://eviltester.github.io/grid-table-editor/app.html`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Switch the schema editor to text mode.
3. Enter either of these invalid examples:

```text
Direction
location.cardinalDirection(abbreviated=true)
```

or

```text
Num
number.int(min=1, min=2, max=3)
```

4. Click `Generate` and note the message.
5. Switch the same invalid schema into row mode.
6. Observe the row-level feedback.

## Expected

Users should receive similarly actionable validation feedback regardless of whether they entered the schema in text mode or row mode.

## Actual

- In text mode, the app only shows the generic toolbar message `Schema validation failed. Grid unchanged.`
- In row mode, the app preserves the bad command/params and shows specific inline errors such as:
  - `Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`
  - `Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min"`

## Repeatability

- Repeatable

## Evidence

- Supporting log: [../negative-validation-test-log.md](../negative-validation-test-log.md)

## Notes

- This makes row mode the better diagnostic surface, but it leaves text-mode users with much weaker guidance while debugging docs-sourced examples and malformed input.
