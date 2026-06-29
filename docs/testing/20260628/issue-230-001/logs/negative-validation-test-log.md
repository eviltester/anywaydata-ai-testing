---
## 2026-06-28T13:55:56+01:00

- What you think you want to do and why

Run negative validation and malformed parameter testing against deployed generator/app/docs surfaces because PR #247 changed command parsing, schema validation, faker validators, helper validation, and invalid text-to-schema conversion.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used https://eviltester.github.io/grid-table-editor/site/generator.html and generator root route. Tested text-mode malformed command-like values (`person.notACommand`, `image.urlLoremFlickr`), malformed arrays, missing object properties, out-of-range values, explicit `literal(...)` and `regex(...)` wrappers, empty schema, invalid row-mode params, method-picker negative searches, documented invalid `domain.helpers.fake(...)`, and conversion from invalid text schema to Schema UI.

the observations and results that you make

No confirmed repeatable negative-validation defects were found. Unknown command-like text failed clearly rather than falling through. Removed `image.urlLoremFlickr` failed clearly. Bad helper arrays and semantic invalid ranges produced actionable messages. Explicit literal/regex wrappers behaved as intended. Text-to-schema conversion showed a confirmation and converted invalid rules to literal when accepted. Suspicious risks: malformed regex-like shorthand can silently become literal, and some validation messages appear in both summary and row-level status.

Techniques and heuristics used: negative testing, boundary analysis, parser fallback checking, equivalence partitioning, documentation testing, and state/flow modeling.

---
