# Negative Validation Test Log

## 2026-06-25T00:11:29+01:00

### Charter

Subagent retest for issue #228 / PR #243 on the deployed environment only:

- Target: https://eviltester.github.io/grid-table-editor/
- Branch observed on test environment: `codex/228-improve-command-definition`
- Commit observed on test environment: `a3b39ddcfe0f`
- Build observed on test environment: `2026-06-24T23:03:43.621Z`
- Focus: negative validation and malformed parameter testing.
- In scope: invalid enum syntax, empty enum values, malformed named values params, bad quotes, stray commas, unknown commands, disallowed helper commands, invalid numeric/probability/date constraints, and usefulness/consistency of validation and error messages in generator/app flows.
- Out of scope: local verify/build/package-manager/repo test commands and app code edits.

### Techniques And Heuristics

- Deployed-environment exploratory testing with browser automation.
- Positive-anchor then mutation testing: first confirmed a documented valid `datatype.enum(values="active,inactive,pending")` schema, then mutated one dimension at a time.
- Equivalence partitioning around empty, missing, malformed, unknown, and boundary/out-of-range parameter values.
- Boundary analysis for `probability`, `multipleOf`, and date `days`.
- Cross-surface consistency sampling between standalone `generator.html` Preview and main `app.html` Test Data Generate.
- Error-message usefulness review: checked whether invalid input failed early with actionable validation, silently failed, generated corrupted data, or emitted generic `**ERROR**`.
- Recheck loop: repeated likely defects from a fresh generator tab before filing.

### Browser Proof And Setup

1. Opened `https://eviltester.github.io/grid-table-editor/`.
2. Confirmed build metadata showed branch `codex/228-improve-command-definition`, commit `a3b39ddcfe0f`, built `2026-06-24T23:03:43.621Z`.
3. Clicked `Open generator.html`.
4. Confirmed the generator page loaded with schema editor, `Generate Data`, and `Preview` controls.
5. Captured initial generator screenshot:
   - `screenshots/negative-validation-generator-initial.png`
6. Used published docs pages as public references:
   - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype`
   - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date`
   - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`
7. A guessed docs URL, `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain-test-data`, returned 404; treated as a bad lookup, not an app finding.

### Generator Baseline

Test data:

```txt
status
datatype.enum(values="active,inactive,pending")
```

Steps:

1. Opened `generator.html`.
2. Switched to `Edit as Text`.
3. Entered the schema above.
4. Used Preview with a small row count.

Observation:

- Preview generated only expected enum values: `active`, `inactive`, and `pending`.
- No validation errors appeared.
- This was used as the positive anchor for invalid mutations.

### Generator Negative Matrix

Raw observed matrix output was saved to:

- `negative-validation-matrix-results.json`

Clean recheck output for likely defects was saved to:

- `negative-validation-recheck-results.json`

Test data and observations:

| Area | Test data | Generator observation |
| --- | --- | --- |
| Empty enum values | `datatype.enum(values="")` | Preview produced no output and no visible validation message on two runs. |
| Missing enum values arg | `datatype.enum()` | Preview produced no output and no visible validation message on two runs. |
| Stray middle enum comma | `datatype.enum(values="active,,pending")` | Validation failed with `Row 1: invalid enum value - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`. Failure was visible, but message did not specifically explain empty enum values or stray comma. |
| Leading enum comma | `datatype.enum(values=",active,pending")` | Same visible error as stray comma. |
| Trailing enum comma | `datatype.enum(values="active,pending,")` | Same visible error as stray comma. |
| Bad enum quote | `datatype.enum(values="active,pending)` | Generated data successfully, including corrupted value `\\\"active`, with no validation error. Rechecked from a clean tab. |
| Unknown enum named arg | `datatype.enum(valuez="active,pending")` | Generated data successfully rather than rejecting unknown `valuez`. Initial run produced `valuez=active` and `pending`; clean recheck produced `pending` values only. No validation error appeared. |
| Unquoted named values | `datatype.enum(values=active,pending)` | Generated `active` and `pending`; treated as permissive behavior rather than a defect because public docs mention unquoted `enum active,inactive,pending` authoring. |
| Raw comma empty middle | `active,,pending` | Treated as literal/regex-like value and generated `active,,pending`; not filed because text schema type inference may intentionally treat this as non-enum without explicit enum syntax. |
| Unknown command | `datatype.noSuchCommand()` | Generated regex-like values such as `datatypeYnoSuchCommand`; not filed from text-mode alone because unknown untyped rule appears to fall through to regex inference. Should be retested in an explicitly domain-typed row-mode path later. |
| Disallowed helper attempt | `helpers.arrayElement(values="active,pending")` | Correctly failed with visible message: `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`. |
| Probability > 1 | `datatype.boolean(probability=2)` | Generated `true` values and no validation error on two runs, despite public docs saying probability is between 0 and 1. |
| Probability < 0 | `datatype.boolean(probability=-0.1)` | Generated `false` values and no validation error on two runs, despite public docs saying probability is between 0 and 1. |
| Probability text | `datatype.boolean(probability=abc)` | Correctly failed visibly as invalid domain params, though the message focused on bare values rather than numeric probability. |
| Number min > max | `number.int(min=10,max=1)` | Correctly failed with actionable message: `argument "min" must be less than or equal to argument "max"`. |
| Number multipleOf zero | `number.int(min=1,max=10,multipleOf=0)` | Generated rows containing `**ERROR**` with no validation message on two runs. |
| Number max text | `number.int(max=abc)` | Correctly failed visibly as invalid domain params, though the message focused on bare values rather than numeric max. |
| Date negative days | `date.recent(days=-7)` | Generated rows containing `**ERROR**` with no validation message on two runs. |
| Date refDate text | `date.soon(refDate=notadate)` | Correctly failed visibly as invalid domain params, though the message focused on bare values rather than refDate. |

### Main App Sample

Raw app sample output was saved to:

- `negative-validation-app-sample-results.json`

Steps:

1. Opened `https://eviltester.github.io/grid-table-editor/app.html?negative-app-sample=1`.
2. Expanded `Test Data`.
3. Switched schema editor to `Edit as Text`.
4. Ran a small targeted sample through the app `Generate` flow.

App observations:

| Test data | App observation |
| --- | --- |
| `datatype.enum(values="active,inactive")` | Baseline passed; grid updated with four expected enum rows. |
| `datatype.enum(values="")` | App showed `Generate failed. Check console for details.` and left previous grid data visible. This is a visible failure, but the message is not actionable. |
| `datatype.enum(values="active,pending)` | App showed `Generate complete. Grid updated.` and generated corrupted `\\\"active` values. |
| `datatype.boolean(probability=2)` | App showed `Generate complete. Grid updated.` and generated all `true`. |
| `number.int(min=1,max=10,multipleOf=0)` | App showed `Generate complete. Grid updated.` and populated the grid with `**ERROR**` rows. |

Screenshot captured:

- `screenshots/negative-validation-app-multipleof-zero-error-success.png`

### Confirmed Findings

Confirmed defect file:

- `defects/negative-validation-defects.md`

Summary:

- Malformed enum quote is accepted in both generator Preview and app Generate, producing corrupted values while reporting success/no error.
- `datatype.boolean(probability=2)` and `datatype.boolean(probability=-0.1)` are accepted despite the documented 0 to 1 range.
- `number.int(multipleOf=0)` produces `**ERROR**` output while app reports successful generation.
- `date.recent(days=-7)` produces `**ERROR**` output in generator Preview instead of a validation message.
- Empty/missing enum values are inconsistent: generator Preview silently produces no output/no visible error, while app Generate fails with only `Check console for details`.
- Unknown enum named arg `valuez` is accepted rather than rejected, producing output with no validation error.

### Validation/Error Message Quality Notes

- Strong messages observed:
  - `argument "min" must be less than or equal to argument "max"` is specific and actionable.
  - The disallowed helper command produced a clear unsafe/complex parsing error.
- Weak or inconsistent messages observed:
  - Stray comma enum cases fail, but the message says bare values are not allowed; it does not directly mention empty enum values or stray commas.
  - Non-numeric bare values fail, but messages focus on quoting rather than the expected numeric parameter type.
  - App failures that say `Check console for details` are less useful than row-level schema validation messages.
  - `**ERROR**` rows are not useful as user-facing validation feedback and can be mistaken for generated data.

### Coverage

Covered:

- Standalone generator text schema mode.
- Main app Test Data text schema mode.
- Public datatype/date/number docs pages for parameter names and examples.
- Valid enum baseline.
- Enum empty/missing/stray-comma/leading-comma/trailing-comma/bad-quote/unknown-named-arg/unquoted-named-list/raw-comma-list.
- Unknown command in untyped text schema mode.
- Disallowed helper command attempt.
- Boolean probability above range, below range, and non-numeric.
- Number `min > max`, `multipleOf=0`, and non-numeric max.
- Date negative days and non-numeric refDate.

Not covered:

- Full row-mode parameter editor modal for every invalid parameter.
- Explicitly domain-typed row-mode unknown command, because text-mode inference may intentionally treat unknown untyped rules as regex.
- Storybook surfaces.
- Mobile/responsive behavior for validation messages.
- Console stack trace analysis; app message asked users to check console, but this charter focused on visible validation usefulness.

### Deferred Items

- Retest unknown commands in row mode with explicit `domain` and `faker` type selections so regex fallback cannot mask unknown command validation.
- Exercise the parameter editor modal directly for enum `values`, boolean `probability`, number `multipleOf`, and date `days`.
- Check whether `Generate Data` file creation has the same failures as Preview, because this pass prioritized Preview and app grid generation.
- Add accessibility-focused checks for whether validation messages receive focus or are announced after failed generation.
- Compare docs examples with in-app help examples for the same invalid/boundary params.

### New Ideas

- Add a small negative examples section to docs for enum values, probability ranges, and numeric constraints.
- Normalize empty enum error wording across empty values, missing values arg, leading comma, middle comma, and trailing comma.
- Treat `**ERROR**` as a failed generation state and block success messages until the underlying row-level cause is surfaced.
- Validate `multipleOf > 0` before calling the generator.
- Validate `date.recent(days)` and `date.soon(days)` as non-negative integers before calling faker.
- Validate boolean `probability` range inclusively as `0 <= probability <= 1`.
- Reject unknown named args for commands with documented parameter lists.
- Distinguish "bare value needs quotes" from "expected number" and "unknown parameter" errors.
- Preserve previous grid/output only with a clear "generation failed; previous data retained" message.
- Add shared validation tests that assert generator Preview and app Generate report the same error for the same schema.
- Add a compact UI affordance near schema text mode showing row number and offending rule when validation fails.
- Consider replacing `Check console for details` with a visible expandable detail panel in the app.
