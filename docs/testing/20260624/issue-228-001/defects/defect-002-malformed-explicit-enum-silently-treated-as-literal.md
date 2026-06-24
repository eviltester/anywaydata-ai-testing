# Defect 002: Malformed Explicit Enum Syntax Is Silently Treated As Literal Output

## Summary

When the schema text contains malformed explicit enum syntax such as `datatype.enum(unclosed`, the deployed generator does not surface a validation error. Instead, preview generation succeeds and emits the malformed text literally as generated data.

## Environment

- Deployed test environment: `https://eviltester.github.io/grid-table-editor/generator.html`
- Session date: `2026-06-24`
- Output format used during confirmation: `MARKDOWN`

## Repeatability

Repeatable.

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch the schema editor to text mode.
3. Set the output format to `MARKDOWN` or leave it on any previewable format.
4. Enter this schema text:

```text
Method
datatype.enum(unclosed
```

5. Click `Preview`.

## Expected Result

The generator should reject malformed explicit enum syntax and show a validation or parsing error instead of generating data.

## Actual Result

Preview succeeds and outputs the literal string `datatype.enum(unclosed` repeatedly as generated values for the `Method` column.

## Evidence

- Row-to-text round-trip screenshot for the valid baseline: [main-loop3-row-to-text-roundtrip.png](../screenshots/main-loop3-row-to-text-roundtrip.png)
- The malformed case was captured in the generator preview state during Loop 3, where the output preview showed repeated literal values:
  - `datatype.enum(unclosed`
  - `datatype.enum(unclosed`
  - `datatype.enum(unclosed`

## Why This Matters

PR `#243` explicitly refactors enum handling through shared parsing and normalization. Accepting malformed explicit enum syntax as literal text hides a real authoring mistake, defeats validator expectations, and can silently leak invalid schema intent into generated outputs.
