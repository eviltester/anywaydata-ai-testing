---
## 2026-06-25 22:34:05 +01:00

- What you think you want to do and why

Prove deployed-browser control for the negative-validation lane and inventory the live surfaces before testing. The charter is focused on method picker help examples, schema entry, malformed/empty params, invalid enum/literal/regex/domain/faker calls, validators, constrained values, quote/comma/parenthesis handling, and recovery after errors.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/ in installed Chrome through Playwright, captured screenshots/negative-00-landing.png, and confirmed the deployed test environment reports branch codex/230-method-picker-mvc, commit 04570e0e428d, built 2026-06-25T21:29:58.356Z. Clicked the visible Open app.html link to https://eviltester.github.io/grid-table-editor/app.html, captured screenshots/negative-01-app-initial.png, then opened the Test Data disclosure and captured screenshots/negative-02-test-data-open.png. Used DOM inspection only against the deployed page to identify data-role controls: generate-button, schema-mode-toggle, schema-textbox, schema-constraints-textbox, schema-add-field, method-picker controls, row name/type/value/command/params inputs, and Generate/Grid to Enum Schema actions.

the observations and results that you make

Browser control was proven against the deployed environment, and the Test Data panel was reachable from app.html. The schema surface starts in row mode with one regex row, has selectable source types enum/literal/regex/domain/faker, exposes method-picker command buttons for domain/faker types, and includes a text-schema mode plus constraints editor. A landing-page 404 console message and normal app startup logs were observed, but no page errors occurred during scout.

---
## 2026-06-25 22:36:20 +01:00

- What you think you want to do and why

Exercise method picker help examples first because issue 230 changed the method picker MVC/help surface and negative testing needs a baseline for what examples and parameter guidance the user sees before entering bad data.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

On https://eviltester.github.io/grid-table-editor/app.html, with Test Data open, clicked the row help link for Regex data help and captured screenshots/negative-03-regex-help-click.png. Rotated the row type selector through enum, literal, regex, domain, and faker. For each source type, clicked the visible help icon/link and read the rendered help text plus the data-help-text attribute. Captured screenshots/negative-04-faker-help.png after the faker help pass.

Data used:
- enum
- literal
- regex
- domain
- faker

the observations and results that you make

Enum, literal, and regex help each showed schema params and examples. Domain help only showed "Domain commands provide a controlled interface for data generation" plus Learn more. Faker help only showed "Faker commands generate realistic random values such as names, addresses, and dates" plus Learn more. This is not a functional blocker because the picker itself contains details/examples after opening, but it is a content-consistency defect candidate: the top-level domain/faker help lacks the params/examples pattern used by enum/literal/regex.

---
## 2026-06-25 22:37:35 +01:00

- What you think you want to do and why

Use the method picker to select a command with required params, then test empty and malformed params. This probes the picker-to-schema handoff and validates that bad params are blocked without corrupting the grid.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

On https://eviltester.github.io/grid-table-editor/app.html, changed the row type to faker and clicked Select faker command. The method picker opened; captured screenshots/negative-05-method-picker-open.png. Confirmed the dialog contains navigator tabs, search, method list, detail panel, parameter tables, usage examples, Open documentation, Cancel, and Apply. Left helpers.arrayElement selected and clicked Apply. Entered column name BadParam and tested Generate with these params:
- empty params
- malformed params: `(["A","B"`
- wrong-type params: `("A")`
- valid recovery params: `(["A","B","C"])`

Captured screenshots/negative-06-empty-required-params.png, screenshots/negative-07-malformed-faker-params.png, and screenshots/negative-08-valid-params-recovery.png.

the observations and results that you make

Empty required params were blocked and the grid stayed at Total rows: 0, but the row-level validation text exposed an internal implementation error: `Row 1: invalid faker params - Invalid Faker API Call Cannot read properties of undefined (reading 'length')`. This is a defect candidate because users should see a required-params/array-specific message rather than a JavaScript property access failure. Malformed params were blocked with `Row 1: params should be wrapped in parentheses, e.g. (["A","B").`; that message is understandable enough but the example/echo is malformed and may confuse users. Valid params recovered cleanly: the grid generated one row and Total rows became 1.

---
## 2026-06-25 22:39:10 +01:00

- What you think you want to do and why

Probe row-mode schema validators for empty params and malformed enum/literal/regex/domain/faker configurations. The goal is to find whether invalid calls fail cleanly and whether normal generation still recovers afterward.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Started each case by reloading https://eviltester.github.io/grid-table-editor/app.html, opening Test Data, entering row-mode data, clicking Generate, and reading visible status/row validation. Tested:
- `EnumEmpty`, enum, empty value
- `EnumQuotes`, enum, `"A,B",C`
- `LiteralEmpty`, literal, empty value
- `RegexBad`, regex, `[A-Z`
- `RegexParen`, regex, `(abc`
- `DomainNone`, domain, no command
- `FakerNone`, faker, no command
- domain command option inventory after selecting domain

For timing-sensitive valid cases, repeated with longer waits and captured screenshots/negative-09-enum-simple-stuck.png, screenshots/negative-10-literal-empty-stuck.png, and screenshots/negative-11-enum-quoted-row-count.png.

the observations and results that you make

Row-mode validators generally behaved well. Empty enum showed `Row 1: enum value is required.` Missing domain/faker commands showed `Row 1: domain command is required.` and `Row 1: faker command is required.` Invalid regex values were blocked with specific syntax details for unterminated character classes and groups. Empty literal, simple enum, and quoted-comma enum initially looked slow, but longer waits showed successful recovery and Total rows: 1, so I am not treating those as defects. No page errors occurred.

---
## 2026-06-25 22:41:05 +01:00

- What you think you want to do and why

Switch to text schema mode and test malformed schema entry, invalid method-like syntax, malformed regex/domain/faker calls, and quote/comma/parenthesis handling. This covers the same invalid data class through the alternative entry path.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

For each case, loaded https://eviltester.github.io/grid-table-editor/app.html, opened Test Data, clicked Edit as Text, filled the Schema text textarea, clicked Generate, and waited for visible status. Tested:
- empty schema text
- `OnlyColumn`
- `Mystery` + `unknown()`
- `EmptyEnum` + `enum`
- `BadRegex` + `regex([A-Z`
- `BadFaker` + `faker.helpers.arrayElement()`
- `BadDomain` + `domain.nope()`
- `QuotedEnum` + `enum "A,B",C`

Captured screenshots/negative-12-text-mode-last-case.png, screenshots/negative-13-text-empty-busy.png, screenshots/negative-14-text-unknown-busy.png, and screenshots/negative-15-text-regex-busy.png while rechecking long waits.

the observations and results that you make

Text mode eventually recovered from slow-looking invalid cases, so no permanent busy-button defect was confirmed. However, several failures only reported the generic banner `Schema validation failed. Grid unchanged.` with no visible field/line-specific validation details, unlike row mode. `Mystery` / `unknown()` generated a row with value `unknown` instead of treating `unknown()` as an invalid method-like call. This is a defect candidate or at least a parser ambiguity: a malformed function call can be silently treated as generated literal-ish data. `QuotedEnum` / `enum "A,B",C` was blocked with `QuotedEnum failed domain validation - Invalid keyword invocation: unexpected trailing content`; the phrase "domain validation" for an enum line is suspicious/error-message polish.

---
## 2026-06-25 22:42:30 +01:00

- What you think you want to do and why

Test constrained values and behavior after constraint errors, because constraint parsing combines column references, quotes, values, and line-number reporting.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

On https://eviltester.github.io/grid-table-editor/app.html, opened Test Data, configured two row-mode enum fields:
- `Age`, enum, `minor,adult`
- `Work`, enum, `School,Office`

Opened Schema Constraints and tested these constraints with Generate:
- `IF [Nope] = "minor" THEN [Work] = "School" ENDIF`
- `IF [Age] = "minor" THEN [Missing] = "School" ENDIF`
- `IF [Age] = "minor" THEN [Work] = "School"`
- `IF [Age] = "minor" THEN [Work] = "School" ENDIF`

Captured screenshots/negative-16-constraint-valid-recovery.png after the valid recovery case.

the observations and results that you make

Constraint validation behaved well. Unknown source and target columns were blocked with specific `Line 6: unknown constraint parameter [...]` messages. The missing ENDIF case was blocked with `Line 6: Constraint must terminate with ";" or ENDIF.` The valid constraint recovered cleanly, generated one row, updated Total rows to 1, and the constraints summary changed to Schema Constraints (1). No page errors occurred.

---
## 2026-06-25 22:43:42 +01:00

- What you think you want to do and why

Summarize defect candidates, suspicious behavior, coverage notes, and follow-up ideas while the exact deployed evidence is fresh.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed the negative-* screenshots, page states, visible validation messages, and console/page-error state from the deployed browser session. Wrote support/negative-validation-observations.json with a compact artifact/case summary.

the observations and results that you make

Defect candidates:
- Medium: Empty required params for `faker.helpers.arrayElement` expose internal JS text: `Cannot read properties of undefined (reading 'length')` instead of a user-facing required array/params message. Evidence: screenshots/negative-06-empty-required-params.png.
- Low/Medium: Text schema `Mystery` / `unknown()` is accepted and generates value `unknown`, which looks like a malformed method call being treated as literal-ish data rather than rejected. Evidence: screenshots/negative-14-text-unknown-busy.png after long wait.
- Low: Text-mode invalid schema failures such as empty schema and malformed regex can show only the generic `Schema validation failed. Grid unchanged.` without the detailed row/line-level message that row mode provides. Evidence: screenshots/negative-13-text-empty-busy.png and screenshots/negative-15-text-regex-busy.png.
- Low: Top-level domain/faker help lacks params/examples while enum/literal/regex help includes them. Evidence: screenshots/negative-04-faker-help.png and method help inventory in support/negative-validation-observations.json.
- Low: Malformed faker params message can echo an incomplete example/input: `params should be wrapped in parentheses, e.g. (["A","B").` Evidence: screenshots/negative-07-malformed-faker-params.png.

Suspicious but not filed as confirmed defects:
- Simple enum, quoted-comma enum, and empty literal looked stuck during short waits, but all completed with longer waits. This suggests async generation can be slow but did not prove a failure in this pass.
- `enum "A,B",C` in text mode reports `failed domain validation`, which may be an imprecise shared-parser error label rather than a functional defect.

Follow-up ideas:
- Add a direct regression for empty required params on helpers.arrayElement and assert no raw JavaScript exception text reaches the UI.
- Test every faker helper with required params left blank to find other internal exception leaks.
- Test method picker Apply for domain commands with required params, optional params, and no params.
- Add parser tests for text-schema unknown function syntax like `unknown()`, `faker.nope()`, `domain.nope()`, `literal()`, and bare `unknown`.
- Decide whether text schema should allow unknown bare tokens as literal values, and document/validate the difference between `unknown` and `unknown()`.
- Improve text-mode validation detail parity with row mode for malformed regex and empty schema.
- Add negative tests for params with nested arrays/objects, escaped quotes, closing parentheses inside strings, and trailing commas.
- Add UI validation for malformed params examples so error text never displays an incomplete "e.g." sample.
- Add coverage for enum values containing commas, quotes, and parentheses through both row mode and text mode.
- Add long-running/busy-state assertions around Generate so validation failures always clear aria-busy and disabled state.
- Test constraints with escaped quotes, comma-containing enum values, numeric comparisons, multiple IF blocks, and semicolon-separated constraints.
- Test recovery by fixing a bad text-mode schema in place without reloading, then generating successfully.
- Test keyboard-only method picker negative flows: search no-match, Escape, Cancel, Apply without selection, and focus return.
- Compare app.html and generator.html behavior for the same malformed schema inputs.

---
