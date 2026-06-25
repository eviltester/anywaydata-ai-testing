# Negative Validation Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: probe malformed parameter handling, validator behavior, and feedback quality across enum and non-enum command families in the current deployed UI.

Techniques and heuristics to use: negative testing, boundary analysis, equivalence partitioning, row-mode versus text-mode comparison, and repeatability checks for suspect behavior.

Expected focus: malformed syntax, missing params, wrong-order bounds, enum-shape ambiguity, structured-parameter validation, and whether errors are visible, consistent, and actionable.

---
## 2026-06-24T21:39:03.4201226+01:00

- I want to narrow onto the highest-signal malformed-input checks in the deployed generator so we can confirm whether validation is consistent between inline row editing, help text, and the structured params modal.

Using Playwright CLI only against `https://eviltester.github.io/grid-table-editor/generator.html`, I first exercised malformed enum and regex transitions in a clean session. I entered column name `repeatcase`, left command type as `regex`, set `Value / Regex` to `(`, and confirmed the row-level message `Row 1: invalid regex value - SyntaxError: Invalid regular expression: /(/: Unterminated group`. I then changed the command type from `regex` to `enum` without changing the value and observed the row still displayed the regex-specific error while the field now showed `Enum data help`. I repeated this in a second clean session and saw the same stale error state again. In the main negative-validation session I also checked enum syntax guidance via the inline help tooltip. The tooltip said unquoted comma-separated values such as `active,inactive,pending` are valid, and that documented example did preview successfully. A malformed enum string `active,,pending` did raise an error, but the message was `invalid enum value - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`, which does not point to the empty enum entry and does not match the documented unquoted syntax guidance.

I then focused on `faker.helpers.rangeToNumber` because the help text and changed surfaces emphasize structured params. I selected `helpers.rangeToNumber`, reviewed the inline help tooltip, and tried malformed params in both the row editor and the structured params modal. Inline params without parentheses, `{ min: 5 }`, produced a helpful row message: `params should be wrapped in parentheses, e.g. ({ min: 5 }).` But inline params with missing required content, `({ min: 5 })`, did not show a row validation error and Preview generated unrelated 16-digit values rather than a bounded number result; I captured this state in `screenshots/negative-range-to-number-missing-max-preview.png`. Opening the structured params modal for the same command showed stricter validation: the modal displayed `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`, disabled Apply, and preserved generated params text. I also changed the modal value to `{ min: 5, max: 2 }` to probe wrong-order bounds; the modal continued to block Apply with the same generic invalid-faker-params message, so wrong-order bounds are blocked in the structured editor but the message is not specific about the min/max ordering problem.

The observations and results were: `regex -> enum` stale validation messaging is repeatable and likely a real defect because the validator message no longer matches the selected command family; malformed enum syntax is detected, but the message is misleading because it suggests quoting rather than identifying the empty enum slot; inline `helpers.rangeToNumber` validation is weaker than structured-modal validation because `({ min: 5 })` reaches Preview and produces implausible 16-digit output instead of a bounded number or a clear error; and structured params validation is present for missing/wrong-order bounds, but the message is generic enough that a user would not know whether the issue is missing `max`, reversed bounds, or unsupported object syntax.

---
