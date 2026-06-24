# Defect 003: Row-Mode Domain Params Behave Inconsistently Compared With Text Mode

## Summary

Equivalent malformed `date.between` input produces clear ordered-bounds validation in text mode, but row mode behaves inconsistently. Parenthesized params are not retained and produce a misleading missing-argument message, while non-parenthesized params are retained and produce the expected wrapping-format message.

## Surface

- `https://eviltester.github.io/grid-table-editor/generator.html`

## Why This Matters

- PR #234 explicitly added ordered-bounds validation across multiple command families.
- Text mode demonstrates that the validator is working.
- Row mode appears to have a separate params-entry/parsing issue that can hide the real validation result and confuse users.

## Repeatability

- Repeatable in the negative-validation lane for the tested `date.between` case.

## Reproduction

### Baseline Text-Mode Behavior

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch to text mode.
3. Enter a schema row using `date.between(from=1609459200000, to=1577836800000)`.
4. Generate data.

Observed baseline:

- `Row 1: invalid domain params - Invalid keyword arguments: argument "from" must be less than or equal to argument "to"`

### Row-Mode Behavior

1. Open a fresh `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Leave row mode active.
3. Change the first row type from `regex` to `domain`.
4. Select `date.between`.
5. In the params field, enter `(from=1609459200000, to=1577836800000)`.
6. Generate data.
7. Repeat with `from=1609459200000, to=1577836800000` without parentheses.

## Observed

- With parenthesized params:
  - the params field did not retain the typed value
  - the app reported `argument "from" is required`
- With non-parenthesized params:
  - the params field retained the typed value
  - the app reported `params should be wrapped in parentheses, e.g. (from=1609459200000, to=1577836800000).`

## Expected

- Row mode should preserve the entered params consistently and either:
  - pass them through to the ordered-bounds validator, producing the same reversed-bounds message as text mode, or
  - at minimum fail in a way that does not erase validly formatted input and replace it with a misleading missing-argument error

## Evidence

- Negative validation subagent log: [../negative-validation-test-log.md](../negative-validation-test-log.md)

## Notes For Investigation

- This may be a row-mode params parsing or state-retention issue rather than a validator bug.
- It is worth retesting on other validator-backed commands such as `number.int` and `finance.iban` to see whether the inconsistency is generic to row-mode params handling.
