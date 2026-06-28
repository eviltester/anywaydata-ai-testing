---
## 2026-06-27 00:00 BST

- What you think you want to do and why

Start the negative-validation and malformed-parameter lane for issue #230 / PR #247. I want to prove the deployed test environment is reachable and interactable before relying on any app behavior, then focus on validators, malformed schema/runtime inputs, removed/deprecated command handling, and parameter editor required/optional behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened the deployed test environment at https://eviltester.github.io/grid-table-editor/site/ using Playwright browser automation. Captured the live accessibility snapshot for the landing page. Clicked the visible "Use The Application" link, which navigated to https://eviltester.github.io/grid-table-editor/site/app.html. No local verify, build, package-manager, or repo test commands were run.

the observations and results that you make

The deployed environment opened successfully. The landing page title was "AnyWayData - Data Table Editor & Generator", and clicking "Use The Application" loaded the deployed app page. This confirms browser interaction is available for the negative-validation lane. The app page exposes navigation to "Generator", which will be the next target surface for malformed command and parameter testing.

---
## 2026-06-27 10:23:52 +01:00

- What you think you want to do and why

Exercise malformed schema/runtime definitions through the deployed generator text-mode schema editor. I want coverage across valid baselines, helper structured params, unknown command-like input, removed/deprecated commands, invalid boolean/number validators, malformed enum/regex/literal forms, and plain text fallback. Techniques used: exploratory testing, risk-based testing, equivalence partitioning, boundary analysis, negative testing, consistency/oracle checking, and repeat-from-clean-state checks for suspicious cases.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used only the deployed generator at https://eviltester.github.io/grid-table-editor/generator.html. Opened the page with Playwright CLI browser automation, toggled the Schema panel to "Edit as Text", set Preview Items Count to 3, and executed the support runner in `support/negative-validation-run-code.mjs`. The runner saved structured evidence to `support/negative-validation-results.json` and screenshots under `screenshots/` with `negative-validation-` prefixes. I also checked the published regex docs page at https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data returned HTTP 200; the guessed schema-definition route `/site/docs/test-data/schema-definition` returned 404, so I did not use that guessed URL as an oracle.

Test data used:

- Baseline: `id: regex([A-Z]{3})`
- Valid helper: `value: helpers.arrayElement(["red","blue"])`
- Missing helper value: `value: helpers.arrayElement()`
- Empty helper array: `value: helpers.arrayElement([])`
- Non-array helper string: `value: helpers.arrayElement("red")`
- Non-array helper object: `value: helpers.arrayElement({ color: 'red' })`
- Unknown command-like text: `value: internet.notACommand(commonOnly=true)`
- Removed/deprecated command: `value: image.urlLoremFlickr()`
- Invalid boolean: `value: internet.httpMethod(commonOnly="banana")`
- Invalid number: `value: number.int({ min: "one", max: 5 })`
- Invalid enum forms: `value: enum()` and `value: enum(red, blue`
- Invalid regex: `value: regex([A-Z)`
- Empty literal form: `value: literal()`
- Unknown plain text: `value: notACommandLikeValue`

For suspicious results I repeated the case from a clean page state and saved the repeat screenshot.

the observations and results that you make

The baseline regex and valid `helpers.arrayElement(["red","blue"])` cases generated expected output, establishing the schema parser and preview generator were working.

Most malformed helper and validator cases were blocked with useful messages and no output:

- `helpers.arrayElement()` reported that an array argument is required.
- `helpers.arrayElement([])` reported "Cannot get value from empty dataset."
- `helpers.arrayElement("red")` and `helpers.arrayElement({ color: 'red' })` reported that an array argument is required.
- `internet.httpMethod(commonOnly="banana")` reported `commonOnly` must be boolean, not string.
- `number.int({ min: "one", max: 5 })` reported `min` must be number, not string.
- `regex([A-Z)` reported an unterminated character class.
- `enum()` was blocked, but the message was `Unknown keyword: enum`, which is worth comparing with docs/expected syntax because `enum` is a core field type.

Repeatable finding candidate 1: unknown command-like input is silently treated as regex-like data rather than blocked. `value: internet.notACommand(commonOnly=true)` generated output such as `internet%notACommandcommonOnly=true`, then repeated from a clean state and generated similar randomized values. The app also displayed the schema as if it had been wrapped into a regex form. Evidence: `screenshots/negative-validation-unknown-domain-command.png` and `screenshots/negative-validation-unknown-domain-command-repeat.png`.

Repeatable finding candidate 2: the removed/deprecated command probe `value: image.urlLoremFlickr()` did not generate output, but it was rewritten/displayed as `image.url(LoremFlickr())` and reported `Row 1: params should be wrapped in parentheses, e.g. (LoremFlickr().` on both the initial run and clean repeat. Console warnings also indicated Faker deprecation for `faker.image.urlLoremFlickr()`. The user-facing message looks misleading because it points at parenthesis wrapping rather than removed/deprecated command use. Evidence: `screenshots/negative-validation-removed-image-command.png` and `screenshots/negative-validation-removed-image-command-repeat.png`.

Suspicious behavior: `value: literal()` generated blank values with no validation message and displayed as `literal("")`. This may be an intentional shorthand for blank literal output, but it deserves docs/help comparison because unknown plain text separately recommends `literal("")` for blank data. Evidence: `screenshots/negative-validation-invalid-literal-missing.png` and `screenshots/negative-validation-invalid-literal-missing-repeat.png`.

Suspicious behavior: `value: notACommandLikeValue` was blocked, but the message `requires a data definition, use 'literal("")' for blank data` does not directly explain unknown bare text. This may be acceptable, but could be clearer. Evidence: `screenshots/negative-validation-unknown-plain-text.png` and repeat screenshot.

---
## 2026-06-27 10:23:52 +01:00

- What you think you want to do and why

Cover the row-mode params editor and required/optional behavior for a high-risk structured helper, `helpers.arrayElement`. I want to avoid mistaking row-mode syntax requirements for semantic validation defects, so I will test both unwrapped and parenthesized params values.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used only https://eviltester.github.io/grid-table-editor/generator.html. Opened a clean generator page, filled Column Name as `arr`, selected Field type `faker`, selected command `helpers.arrayElement`, inspected the command and params inputs, attempted to open the edit-params dialog, and saved a screenshot to `screenshots/negative-validation-params-editor-arrayelement-dialog.png`. Then I previewed these params values through the row-mode Params field:

- empty string
- `[]`
- `([])`
- `"red"`
- `("red")`
- `{ color: 'red' }`
- `({ color: 'red' })`
- `["red","blue"]`
- `(["red","blue"])`

Structured evidence was saved to `support/negative-validation-params-results.json`.

the observations and results that you make

The row-mode command select value was `helpers.arrayElement`, and the params input had aria-label `Params` and value `""`. Both the command select and params input had `required=false` at the HTML attribute level, even though the row showed validation when command or params were missing. I am treating this as an implementation detail/suspicious accessibility or form-semantics risk, not a confirmed defect in this lane.

The row-mode Params field expects the entire parameter list to be wrapped in parentheses:

- Empty params were blocked with `helpers.arrayElement requires an array argument`.
- Unwrapped `[]`, `"red"`, `{ color: 'red' }`, and `["red","blue"]` were blocked with `params should be wrapped in parentheses`.
- Wrapped `([])` reached semantic validation and was blocked as an empty dataset.
- Wrapped `("red")` and `({ color: 'red' })` reached semantic validation and were blocked because an array argument is required.
- Wrapped `(["red","blue"])` generated expected output.

This gives the main agent a clean distinction: direct schema text accepts full command calls such as `helpers.arrayElement(["red","blue"])`, while row-mode Params requires only the parenthesized argument list, e.g. `(["red","blue"])`.

Additional test ideas for the main loop:

- Execute the same unknown-command fallback test for multiple families: `person.notACommand()`, `commerce.notACommand()`, `date.notACommand()`, and `helpers.notACommand()`.
- Compare unknown command-like fallback between row mode and text mode; row mode may classify the same text differently.
- Check whether the method picker search can select or still show deprecated `image.urlLoremFlickr`.
- Test `image.url()` with valid modern params to separate deprecated-command handling from image command family behavior.
- Test validators with boolean `true`, `false`, `1`, `0`, `null`, and omitted values for commands that document booleans.
- Test structured object validators with extra keys, missing required keys, null values, and nested arrays.
- Test numeric boundary values for `number.int({ min, max })`, including `min > max`, equal min/max, negative ranges, decimals, and very large numbers.
- Test enum syntax using the documented row-mode enum field rather than direct `enum()` function style to clarify whether `Unknown keyword: enum` is expected.
- Test whether `literal()` and `literal("")` are documented as equivalent; if not, decide whether accepting `literal()` is a defect or benign shorthand.
- Test whether validation messages are announced through accessible status regions and whether duplicate messages appear after repeated previews.
- Test params editor dialog keyboard behavior and required/optional indicators for commands with multiple documented params, such as `helpers.mustache`.
- Test malformed regex values that are syntactically valid regex but expensive or surprising, such as nested quantifiers, huge ranges, and escaped delimiters.

---
