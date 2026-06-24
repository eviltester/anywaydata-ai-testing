# Negative Validation Test Log

## Charter

- Owner: subagent for negative validation and malformed parameter testing
- Goal: probe invalid inputs, reversed bounds, malformed parameters, and row-mode vs text-mode validation behavior using the deployed test environment only
- Write scope: this file only
- Techniques and heuristics: negative testing, boundary analysis, equivalence partitioning, state comparison, consistency checking

---
## 2026-06-22T13:46:10+01:00

- What you think you want to do and why

Probe malformed domain commands and stale helper examples in the deployed generator so I can compare text-mode validation against row-mode validation, check reversed ordered bounds, invalid validators, duplicate keywords, and confirm whether docs examples that look stale are rejected clearly by the live app.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used Chrome DevTools browser tooling against `https://eviltester.github.io/grid-table-editor/generator.html` and the deployed docs pages under `https://eviltester.github.io/grid-table-editor/site/docs/test-data/`.

Reviewed deployed docs/examples by opening:

- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/location/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/`

Extracted deployed examples from the docs surface to drive negative checks, including:

- `date.between(from=1577836800000, to=1609372800000)`
- `finance.iban(countryCode="GB")`
- `finance.iban(formatted=true)`
- `location.cardinalDirection(abbreviated=true)`
- `number.int(max=10, min=1)`
- `domain.helpers.arrayElement(["red", "green", "blue"])`

Ran text-mode generator checks by opening `generator.html`, clicking `Edit as Text`, setting the schema text area content, and clicking `Generate Data` for each case:

- `Date` / `date.between(from=1609459200000, to=1577836800000)`
- `Num` / `number.int(max=5, min=10)`
- `Dir` / `location.cardinalDirection(abbreviated=maybe)`
- `Colors` / `domain.helpers.arrayElement(["red", "green", "blue"])`
- `IBAN` / `finance.iban(formatted=true, formatted=false)`
- `IBAN` / `finance.iban(countryCode="ZZZ")`

Also compared row-mode behavior on a fresh `generator.html` page:

- changed the first row type from `regex` to `domain`
- observed the row UI changed from a free-text command field to a domain-command picker plus `Params e.g. (10)` input
- selected `date.between`
- tried params as `(from=1609459200000, to=1577836800000)`
- tried params as `from=1609459200000, to=1577836800000`
- clicked `Generate Data` after each variant

the observations and results that you make

Text-mode validation was specific and repeatable for several malformed command cases:

- `date.between(from=1609459200000, to=1577836800000)` returned `Row 1: invalid domain params - Invalid keyword arguments: argument "from" must be less than or equal to argument "to"`. Repeatable.
- `number.int(max=5, min=10)` returned `Row 1: invalid domain params - Invalid keyword arguments: argument "min" must be less than or equal to argument "max"`. Repeatable.
- `location.cardinalDirection(abbreviated=maybe)` returned `Row 1: invalid domain params - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`. Repeatable.
- `finance.iban(formatted=true, formatted=false)` returned `Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "formatted"`. Repeatable.

The deployed docs/helper mismatch is real enough to flag for follow-up:

- the deployed Faker Helpers docs surface still exposes `domain.helpers.arrayElement(["red", "green", "blue"])`
- the live generator rejects it with `Row 1: helpers.* is faker-only; use faker.helpers.* Row 1: unknown domain command "domain.helpers.arrayElement".`
- this is repeatable and looks like a stale/unsafe example even though nearby docs text says helpers are faker-only

Row-mode vs text-mode behavior differed in a potentially confusing way for the same date case:

- text mode accepted the full command syntax and produced the specific reversed-bounds validation message
- row mode splits command selection from params entry, and `date.between` params handling was inconsistent
- when params were entered as `(from=1609459200000, to=1577836800000)`, the params field did not retain the value and the app reported `Row 1: invalid domain params - Invalid keyword arguments: argument "from" is required`
- when params were entered as `from=1609459200000, to=1577836800000`, the field retained the text and the app reported `Row 1: params should be wrapped in parentheses, e.g. (from=1609459200000, to=1577836800000).`
- this suggests the row-mode params input/parser path is not behaving the same way as text mode for equivalent malformed data, and the odd clearing of the parenthesized input is worth follow-up

One finance edge case stayed suspicious rather than clearly validated:

- `finance.iban(countryCode="ZZZ")` did not show a validation message
- I also did not observe generated preview data appearing in the text preview or grid preview after pressing `Generate Data`
- because the browser session was interrupted before I could chase that further, I am treating this as incomplete coverage rather than a confirmed defect

Additional environmental note:

- the Playwright MCP path was not required because Chrome DevTools browser tooling worked
- the dedicated Playwright MCP navigation path had earlier startup issues, so I stayed on the working non-Playwright browser path as instructed

---
