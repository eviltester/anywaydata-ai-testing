# Command Coverage Findings

## Scope

- Target: deployed environment only.
- Entry points used: `https://eviltester.github.io/grid-table-editor/site/`, deployed `app.html`, deployed `generator.html`, and deployed docs links from the site.
- Remote context: issue #253 is closed by merged PR #285. PR #295 is not resolvable in `eviltester/grid-table-editor`.
- Local repo verification/build/test/package-manager commands were not run.

## Techniques

- Browser-driven exploratory testing against the deployed GitHub Pages site.
- Deployed-doc example harvesting from schema, literal, regex, domain, faker, counterstring, and auto-increment docs.
- Text-schema entry followed by Preview execution for valid and invalid command examples.
- Text-to-schema switching checks for known invalid commands versus unknown command definitions.
- Screenshot evidence for representative command states and validator boundaries.

## Command Families Sampled

| Family | Exact examples tried | Result |
| --- | --- | --- |
| Known valid enum/regex/literal | `enum("Open","In Progress","Closed")`; `regex([A-Z]{3}-\d{4})`; `literal(UAT)` | Generated CSV preview rows with expected enum values, ticket-like regex values, and literal `UAT`. |
| Docs/help inline syntax | `Status: enum("Open","In Progress","Closed")`; `Ticket Id: regex([A-Z]{3}-\d{4})` | Generated CSV preview rows from inline schema syntax. |
| Parameterized domain | `number.int(min=32, max=47)`; `location.direction(abbreviated=true)`; `finance.iban(formatted=true, countryCode="GB")` | Generated bounded integers, abbreviated directions, and formatted GB IBAN values. |
| Structured params | `date.between(from=1577836800000, to=1659312000000)` | Generated ISO date/time values in the expected broad range. |
| Faker/helper/domain | `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`; `person.firstName()` | Generated composed names and first names. |
| Helper/domain counterstrings | `string.counterString(5, 12)`; `string.counterString(12, 12, "#")` | Generated variable counterstrings and fixed `#`-delimited counterstrings. |
| `autoIncrement.sequence` valid default/start/step | `autoIncrement.sequence()`; `autoIncrement.sequence(start=10, step=5)` | Generated `1,2,3` and `10,15,20`. |
| `autoIncrement.sequence` prefix/suffix/padding | `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)` | Generated `filename001.txt`, `filename006.txt`, `filename011.txt`. |
| Validator: duplicate param | `number.int(min=1, min=2, max=3)` | Preview blocked with `Invalid keyword arguments: duplicate named argument "min"`. Switching to schema UI preserved a `domain` / `number.int` row and row-level validation. |
| Validator: zero step | `autoIncrement.sequence(step=0)` | Preview blocked with `argument "step" must be a non-zero integer`. Switching to schema UI preserved a `domain` / `autoIncrement.sequence` row and row-level validation. |
| Validator: negative zero padding | `autoIncrement.sequence(zeropadding=-1)` | Preview blocked with `argument "zeropadding" must be greater than or equal to 0`. Switching to schema UI preserved a `domain` / `autoIncrement.sequence` row and row-level validation. |
| Unknown command boundary | `unknown.command(foo=1)` | Preview blocked with `Unknown keyword: unknown.command`; switching to schema UI displayed the convert-invalid-definitions prompt rather than silently converting. |

## Evidence

- Deployed docs examples: `support/command-coverage-doc-examples.json`
- Matrix results: `support/command-coverage-matrix-results.json`
- Text-to-schema switch results: `support/command-coverage-switch-results.json`
- Issue example screenshot: `screenshots/command-coverage-006-issue-253-invalid-param-schema-ui.png`
- Auto-increment zero-step screenshot: `screenshots/command-coverage-switch-known-autoincrement-step-zero.png`
- Auto-increment padding output screenshot: `screenshots/command-coverage-case-valid-autoincrement-padding.png`
- Unknown-command prompt screenshot: `screenshots/command-coverage-switch-unknown-command.png`

## Defects Or Suspicious Behavior

No repeatable deployed defect was found in this command-coverage lane, so no candidate defect file was created.

Minor observation: the DOM still exposes some hidden/supporting schema text fields while row mode is visible, so automated row-mode detection should use visible controls/screenshots instead of the mere presence of `textarea[aria-label="Schema text"]`. This did not affect the user-visible behavior under test.

## Deferred Ideas

- Add a longer output-format sweep for the same schema matrix across JSON, JSONL, XML, Markdown, SQL, and code/unit-test formats.
- Add generated-data amendment/filter persistence checks from PR #285 as a separate lane because this lane focused on command examples and schema validation.
- Sample more domain families from the full command list, especially finance, internet, string, date, and nested helper/mustache calls.
