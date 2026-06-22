# Defect 004: Invalid numeric bounds report success but generate `**ERROR**`

## Summary

The deployed app accepts `number.int(min=47, max=32)`, reports `Generate complete. Grid updated.`, and then writes `**ERROR**` into the generated grid cell instead of failing validation up front.

## Environment

- App under test: `https://eviltester.github.io/grid-table-editor/app.html`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Switch the schema editor to text mode.
3. Enter:

```text
Num
number.int(min=47, max=32)
```

4. Click `Generate`.
5. Observe the toolbar status and resulting grid cell value.

## Expected

The invalid `min > max` combination should be rejected during validation with a clear error, and the app should not report successful generation.

## Actual

- Toolbar message: `Generate complete. Grid updated.`
- Generated grid value: `**ERROR**`

## Repeatability

- Repeatable

## Evidence

- Supporting log: [../negative-validation-test-log.md](../negative-validation-test-log.md)

## Notes

- Control case `number.int(min=32, max=32)` generated `32`, so the defect is the bad-boundary combination escaping validation, not a complete failure of the command family.
- A follow-up negative pass found the same false-success pattern for `date.between(from=1659312000000, to=1577836800000)`, which suggests a broader reversed-bounds validation gap across at least two command families.
