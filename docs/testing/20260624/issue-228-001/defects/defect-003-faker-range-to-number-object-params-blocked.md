# Defect 003: `helpers.rangeToNumber` Object Params Are Exposed In UI Help But Blocked By Params Validation

## Summary

The deployed generator exposes `helpers.rangeToNumber` through the faker method picker and documents an object-shaped argument, but the structured params editor rejects that documented object form and disables `Apply`.

## Environment

- Deployed test environment: `https://eviltester.github.io/grid-table-editor/generator.html`
- Session date: `2026-06-24`

## Repeatability

Repeatable.

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the first schema row type to `faker`.
3. Open the method picker and select `helpers.rangeToNumber`.
4. Open the structured params editor.
5. Enter the documented object-shaped value `{ min: 1, max: 9 }` for `numberOrRange`.
6. Try to apply the params.
7. Open the in-product help for the selected command and compare the documented syntax.

## Expected Result

If the picker/help surface documents `helpers.rangeToNumber({ min: 1, max: 2 })`, the params editor should accept the same object shape or the help should clearly document a different supported syntax.

## Actual Result

- The structured params editor shows generated params based on the object shape.
- `Apply` remains disabled.
- The row reports `Unsafe faker rule syntax detected: requires complex argument parsing`.
- The in-product help still teaches the object-shaped syntax and describes the param type as `number | { min: number; max: number; }`.

## Evidence

- Screenshot: [ux-regression-faker-param-editor-invalid-object.png](../screenshots/ux-regression-faker-param-editor-invalid-object.png)
- Supporting log: [ux-regression-test-log.md](../ux-regression-test-log.md)

## Why This Matters

This is a direct workflow contradiction inside the deployed UI: a method is discoverable and documented in the picker/help flow, but the documented configuration path is blocked by the same UI’s validation rules.
