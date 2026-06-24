# Negative Validation Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: probe malformed parameter handling, validator behavior, and feedback quality across enum and non-enum command families in the deployed UI.

Techniques and heuristics to use: negative testing, boundary analysis, equivalence partitioning, row-mode versus text-mode comparison, and repeatability checks for any suspect behavior.

Expected focus: malformed syntax, missing params, wrong-order bounds, enum-shape ambiguity, structured-parameter validation, and whether errors are visible, consistent, and actionable.

---
---
## 2026-06-24T17:51:00+01:00

- Intent: Probe structured domain validation for `date.between` in row mode, including missing required params, type misuse, and reversed bounds.
- Actions: Opened `generator.html`, switched the first schema row to `domain`, selected `date.between` via the method picker, set column name `createdAt`, opened the structured params editor, and exercised three negative cases: missing `from`, `from=abc,to=123`, and `from=1609459200000,to=1577836800000`.
- Observations: The deployed UI validates these cases immediately and specifically in row mode. Missing params show `Row 1: invalid domain params - Invalid keyword arguments: argument "from" is required`. Non-integer input shows `bare values are not allowed; wrap strings in quotes`, which is precise about the parser complaint but slightly indirect for an integer field because it does not explicitly say `expected integer`. Reversed bounds show `argument "from" must be less than or equal to argument "to"`. The structured editor keeps `Apply` disabled for the invalid cases, and the inline row status plus modal status stayed consistent in repeated checks.
- Screenshot: `screenshots/negative-validation-date-between-reversed-range.png`.

---
---
## 2026-06-24T17:53:30+01:00

- Intent: Sample text-mode validation and compare its feedback path against the row-mode `date.between` checks.
- Actions: Switched the schema editor to text mode and tried a single-line entry using `createdAt date.between(from=abc,to=123)`, then triggered Preview.
- Observations: This was an invalid text-mode setup because the editor placeholder expects alternating lines (`Column Name` then `rule`). The resulting message was generic rather than command-specific: `column createdAt date.between(from=abc,to=123) requires a data definition, use 'literal("")' for blank data`. I am not treating that as a product defect because the setup format was wrong, but it does show that text-mode feedback is easier to misread when the user collapses the two-line schema shape into one line. A clean same-command text-mode comparison remains deferred.

---
