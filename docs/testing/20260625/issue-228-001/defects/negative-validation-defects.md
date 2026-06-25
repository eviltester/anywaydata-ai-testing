# Negative Validation Defects

## Summary

Several malformed or invalid schema rules are accepted, silently fail, or generate `**ERROR**` data instead of producing useful validation messages. The affected behavior was observed on the deployed PR #243 test environment only.

- Environment: https://eviltester.github.io/grid-table-editor/
- Branch: `codex/228-improve-command-definition`
- Commit: `a3b39ddcfe0f`
- Build: `2026-06-24T23:03:43.621Z`
- Evidence files:
  - `../negative-validation-matrix-results.json`
  - `../negative-validation-recheck-results.json`
  - `../negative-validation-app-sample-results.json`
  - `../screenshots/negative-validation-app-multipleof-zero-error-success.png`

## Confirmed Behaviors

### 1. Bad enum quote generates corrupted values instead of failing

Schema:

```txt
status
datatype.enum(values="active,pending)
```

Generator Preview:

- Generated rows such as `\\\"active` and `pending`.
- No visible validation error appeared.

Main app Generate:

- Reported `Generate complete. Grid updated.`
- Updated the grid with values including `\\\"active`.

Expected:

- The malformed quote should be rejected before generation with a visible row-level error that identifies the unclosed quote or malformed `values` argument.

### 2. Unknown enum named argument is accepted

Schema:

```txt
status
datatype.enum(valuez="active,pending")
```

Generator Preview:

- Generated data with no visible validation error.
- Initial matrix produced values including `valuez=active` and `pending`; clean recheck produced `pending` values.

Expected:

- Unknown named argument `valuez` should be rejected for `datatype.enum`, with a message such as `Unknown argument "valuez"; expected "values"`.

### 3. Boolean probability accepts values outside documented range

Schemas:

```txt
flag
datatype.boolean(probability=2)
```

```txt
flag
datatype.boolean(probability=-0.1)
```

Generator Preview:

- `probability=2` generated all `true`.
- `probability=-0.1` generated all `false`.
- No visible validation error appeared.

Main app Generate:

- `probability=2` reported `Generate complete. Grid updated.` and generated all `true`.

Expected:

- Values outside the documented `0` to `1` probability range should be rejected before generation.

### 4. Invalid numeric/date constraints generate `**ERROR**` rows

Schemas:

```txt
n
number.int(min=1,max=10,multipleOf=0)
```

```txt
d
date.recent(days=-7)
```

Generator Preview:

- Both rules generated `**ERROR**` rows with no visible validation message.

Main app Generate:

- `number.int(min=1,max=10,multipleOf=0)` reported `Generate complete. Grid updated.` and inserted `**ERROR**` rows into the grid.

Expected:

- Invalid constraints should fail validation before generation.
- The app should not report success when generated rows contain internal `**ERROR**` placeholders.

### 5. Empty or missing enum values have inconsistent/weak feedback

Schemas:

```txt
status
datatype.enum(values="")
```

```txt
status
datatype.enum()
```

Generator Preview:

- Produced no output.
- No visible validation error appeared.

Main app Generate for `values=""`:

- Reported `Generate failed. Check console for details.`
- Left the previous grid data visible.

Expected:

- Both generator and app should show a visible, actionable validation message, e.g. `Row 1: datatype.enum requires at least one non-empty value`.

## Severity

Medium.

Rationale: core generation flows remain available, but malformed schemas can produce corrupted data, successful-looking `**ERROR**` output, or non-actionable failures across the generator/app flows touched by PR #243 validation work.

## Notes

Some invalid inputs did produce useful validation messages and are not filed as defects here:

- `number.int(min=10,max=1)` correctly reported that `min` must be less than or equal to `max`.
- `helpers.arrayElement(values="active,pending")` correctly failed as unsafe/complex faker syntax.
- Stray enum commas failed visibly, though the wording could be improved.
