---
## 2026-06-25T15:14:00+01:00

- What you think you want to do and why

Start the negative-validation delegated lane for issue #246, scoped to story #226 and merged PR #231. The lane focus is malformed command calls, boundary values, unknown params, unsafe syntax, regex/parser errors, and generator/app behavior in the deployed environment only.

Actions:
- Reviewed issue #246, story #226, and PR #231 via GitHub CLI metadata.
- Confirmed issue #246 requires deployed-environment exploratory testing, with negative validation as one delegated subagent lane.
- Confirmed story #226 expects every command definition to have structured `usageExamples` and validators, with examples using domain named-parameter form for domain-backed commands and helper syntax only for `helpers.*` commands.
- Confirmed PR #231 was merged and changed command definitions, help metadata, validators, parser/validation behavior, docs surfaces, method picker rendering, generator feedback, and custom behavior for commands including `internet.httpMethod` and the removal/replacement of `image.urlLoremFlickr` with `image.url`.
- Opened deployed test environment: https://eviltester.github.io/grid-table-editor/site/
- Browser-control proof used Playwright CLI session `negative-validation-246`.
- Captured page snapshot successfully and confirmed the deployed page title is `AnyWayData - Data Table Editor & Generator`.

Observations/results:
- Browser control is working against the deployed environment.
- The landing page loaded and exposed the App, Docs, and Blog links.
- A load-time console error was recorded for a third-party Google ads 403. This is environmental/noise for this lane unless it later interferes with app behavior.
- The first substantive probes will target deployed app command entry points and published docs/help pages, not local code or local test/build commands.

Techniques planned:
- Negative testing
- Boundary analysis
- Equivalence partitioning
- Parser/error-message probing
- Consistency/oracle checking between docs, help UI, and runtime behavior
- Repeatability checks from clean deployed page states

---
---
## 2026-06-25T15:23:06+01:00

- What you think you want to do and why

Run the first negative-validation matrix through the deployed generator text-schema editor. The goal is to compare valid baseline behavior with malformed domain calls, invalid named params, unsafe-looking syntax, deprecated commands, and malformed regex rules.

Actions:
- Used deployed page: https://eviltester.github.io/grid-table-editor/site/generator.html
- Switched the schema editor to `Edit as Text`.
- Created and ran support runner: `../support/negative-validation-probe-runner.js`.
- Used the preview action only; no local build/test/verify commands were run.
- Captured screenshots for the strongest visible candidates:
  - `../screenshots/negative-validation-unknown-command-generates-regex.png`
  - `../screenshots/negative-validation-invalid-regex-generates-literalish-values.png`

Exact schemas and observations:

1. Baseline domain command
   - Schema:
     ```text
     method
     internet.httpMethod
     ```
   - Expected: valid generated HTTP methods.
   - Observed: generated HTTP methods such as `CONNECT`, `POST`, `PUT`, `TRACE`, `OPTIONS`, `GET`.
   - Result: baseline passed.

2. Unknown domain-like command in text schema
   - Schema:
     ```text
     bad
     internet.notACommand
     ```
   - Expected: because this looks like a malformed/unknown command call, ideally a clear validation message instead of generated data.
   - Observed: generated values such as `internet3notACommand`, `internet<notACommand`, `internet_notACommand`.
   - Repeatability: repeated from clean generator state and screenshot captured.
   - Interpretation: defect candidate/risk. In text-schema mode this appears to fall back to regex generation because unrecognized rules are inferable as regex; row mode with explicit `domain` type does require a selected known command. This may be intended fallback behavior, but it is risky for typoed commands because the app silently generates plausible-looking data from a malformed command.

3. Unknown named param
   - Schema:
     ```text
     method
     internet.httpMethod(foo=true)
     ```
   - Expected: reject unknown param clearly.
   - Observed: preview cleared and visible message `method failed domain validation - Invalid keyword arguments: unknown named argument "foo"`.
   - Result: passed.

4. Bad boolean param
   - Schema:
     ```text
     method
     internet.httpMethod(commonOnly=maybe)
     ```
   - Expected: reject non-boolean value.
   - Observed: visible message `method failed domain validation - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`.
   - Result: acceptable, though message emphasizes parser syntax rather than boolean semantics.

5. Unclosed quote param
   - Schema:
     ```text
     method
     internet.httpMethod(excludes="GET)
     ```
   - Expected: parser error with recoverable feedback.
   - Observed: visible message `method failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`.
   - Result: defect candidate/risk. The malformed domain command is reported as a faker validation failure, which is misleading for a domain command.

6. Duplicate param
   - Schema:
     ```text
     method
     internet.httpMethod(commonOnly=true, commonOnly=false)
     ```
   - Expected: reject duplicate param or resolve consistently.
   - Observed: visible message `method failed domain validation - Invalid keyword arguments: duplicate named argument "commonOnly"`.
   - Result: passed.

7. Unsafe-looking string in param
   - Schema:
     ```text
     method
     internet.httpMethod(excludes="<script>alert(1)</script>")
     ```
   - Expected: no script execution and clear semantics.
   - Observed: no script execution, no visible error, generated normal HTTP methods. Since the excludes value does not match any methods, generation proceeds.
   - Result: passed from an injection-safety perspective; no console/runtime issue observed.

8. Deprecated/removed image command
   - Schema:
     ```text
     img
     image.urlLoremFlickr
     ```
   - Expected: clear unavailable/unknown command feedback, with replacement `image.url`.
   - Observed: visible message `Row 1: params should be wrapped in parentheses, e.g. (LoremFlickr).`
   - Result: defect candidate/risk. The command is removed per PR notes, but the feedback suggests a parameter formatting problem instead of saying the command is unknown/removed.

9. Replacement image command
   - Schema:
     ```text
     img
     image.url
     ```
   - Expected: generate URL-like values.
   - Observed: generated `https://picsum.photos/seed/...` URLs.
   - Result: passed.

10. Invalid regex parser input
    - Schema:
      ```text
      value
      [abc
      ```
    - Expected: invalid regex syntax should be rejected or clearly treated as literal if that is the intended contract.
    - Observed: generated repeated `[abc` values with no visible validation message.
    - Repeatability: repeated from clean generator state and screenshot captured.
    - Interpretation: defect candidate/risk. The docs describe regex strings being used to generate matching data, but this invalid-looking regex is accepted as literal-ish output with no warning.

11. Empty rule
    - Schema:
      ```text
      value
      ```
    - Expected: missing rule feedback.
    - Observed: visible message `column value requires a data definition, use 'literal("")' for blank data`.
    - Result: passed.

12. Faker-style syntax for domain target
    - Schema:
      ```text
      method
      faker.internet.httpMethod({ commonOnly: true })
      ```
    - Expected: reject because story #226 says domain-backed examples must stay in domain named-parameter form and faker-style invocation belongs only to helpers.
    - Observed: visible message `Row 1: invalid faker params - Invalid keyword arguments: argument "commonOnly" must be boolean, not object`.
    - Result: rejected, but message is somewhat indirect because it treats the rule as faker syntax.

Follow-up from row-mode repeat:
- In explicit row mode with field type `domain`, unknown command text could not be entered directly; the row showed `Row 1: domain command is required.` This makes the text-mode unknown-command behavior a cross-mode consistency risk rather than proof that the row-mode domain selector accepts unknown commands.
- In explicit row mode with selected `internet.httpMethod`, params `(foo=true)` produced `Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "foo"`, matching text-mode validation.
---
## 2026-06-25T15:23:06+01:00

- What you think you want to do and why

Probe boundary values in generator controls and the documented `internet.httpMethod` examples, because the PR introduced explicit validators and a custom HTTP method implementation with constrained parameters.

Actions:
- Created and ran support runners:
  - `../support/negative-validation-boundary-runner.js`
  - `../support/negative-validation-docs-extractor.js`
  - `../support/negative-validation-http-method-runner.js`
  - `../support/negative-validation-set-exclude-all.js`
- Reviewed deployed docs:
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image/
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/
- Captured screenshot:
  - `../screenshots/negative-validation-http-method-exclude-all-errors.png`
- A `Generate Data` boundary probe created a Playwright temporary download `.playwright-cli/generated-data.csv`; this was my test artifact outside the requested output scope, and I deleted it immediately after observation.

Docs observations:
- Internet docs list `internet.httpMethod`, note it is implemented directly by AnywayData, and show examples:
  - `internet.httpMethod()`
  - `internet.httpMethod(commonOnly=true)`
  - `internet.httpMethod(excludes="patch, TRACE")`
- Image docs show replacement command `image.url` and examples `image.url()`, `image.url(height=1)`, and `image.url(width=1)`.
- Domain overview says `helpers.*` is intentionally faker-only and not part of the domain abstraction.
- Regex docs explain regex strings generate matching data through RandExp, with no explicit warning observed for invalid regex-like strings that are treated as literal text.

Boundary/control observations:
- `Preview Items Count = 0`
  - Observed output was header-only CSV: `"method"`.
  - Result: acceptable if zero preview rows is intended; no defect.
- `Preview Items Count = -1`
  - Observed visible message: `Preview Items Count must be a number greater than or equal to 0.`
  - Result: passed.
- `Preview Items Count = abc`
  - Browser blocked fill into `input[type=number]`; previous `-1` validation remained visible.
  - Result: browser-level block, no app defect.
- `Generate Rows = 0`
  - Observed a generated CSV download with zero rows/header behavior, then deleted the temporary download.
  - Result: acceptable if zero-row file generation is intended.
- `Generate Rows = -1`
  - Observed visible message: `Generate Rows must be a number greater than or equal to 0.`
  - Result: passed.
- `Generate Rows = abc`
  - Browser blocked fill into `input[type=number]`; previous `-1` validation remained visible.
  - Result: browser-level block, no app defect.

HTTP method example and boundary observations:
- Schema:
  ```text
  method
  internet.httpMethod(commonOnly=true)
  ```
  - Observed values included `PUT`, `GET`, `DELETE`, `HEAD`.
  - Result: docs example generated constrained method values; passed.
- Schema:
  ```text
  method
  internet.httpMethod(excludes="patch, TRACE")
  ```
  - Observed values included `OPTIONS`, `GET`, `HEAD`, `CONNECT`, `PUT`, `DELETE`; no `PATCH` or `TRACE`.
  - Result: docs example passed, including case-insensitive excludes.
- Schema:
  ```text
  method
  internet.httpMethod(excludes="GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS,TRACE,CONNECT")
  ```
  - Expected: excluding all valid enum choices should be rejected up front or show clear feedback.
  - Observed: preview generated `**ERROR**` for every row with no visible validation message explaining the impossible parameter combination.
  - Repeatability: repeated and screenshot captured.
  - Result: confirmed defect candidate.
- Schema:
  ```text
  method
  internet.httpMethod(CommonOnly=true)
  ```
  - Observed: `method failed domain validation - Invalid keyword arguments: unknown named argument "CommonOnly"`.
  - Result: passed; param names are case-sensitive and feedback is clear.
- Schema:
  ```text
  method
  internet.httpMethod(commonOnly="true")
  ```
  - Observed: `method failed domain validation - Invalid keyword arguments: argument "commonOnly" must be boolean, not string`.
  - Result: passed.

Defect candidates from this lane so far:
- Candidate NV-1: Text-schema mode silently treats unknown command-like input such as `internet.notACommand` as regex and generates data instead of warning about an unknown command. Evidence: `../screenshots/negative-validation-unknown-command-generates-regex.png`.
- Candidate NV-2: Invalid-looking regex `[abc` generates repeated literal-ish values with no validation message. Evidence: `../screenshots/negative-validation-invalid-regex-generates-literalish-values.png`.
- Candidate NV-3: `internet.httpMethod` with an empty candidate pool generates `**ERROR**` rows instead of rejecting the parameter combination or explaining the failure. Evidence: `../screenshots/negative-validation-http-method-exclude-all-errors.png`.
- Candidate NV-4: Removed command `image.urlLoremFlickr` produces misleading parameter-wrapping feedback rather than unknown/removed command guidance.
- Candidate NV-5: Unclosed quote in `internet.httpMethod(excludes="GET)` reports `faker validation` for a domain command.
---
## 2026-06-25T15:25:10+01:00

- What you think you want to do and why

Broaden command-family sampling beyond `internet`, `image`, and regex. The risk from story #226/PR #231 is not just one command; validators and examples changed broadly across domain command families.

Actions:
- Reviewed deployed docs examples for:
  - `autoIncrement`
  - `string`
  - `number`
  - `date`
  - `finance`
- Created and ran support runners:
  - `../support/negative-validation-selected-docs-extractor.js`
  - `../support/negative-validation-broad-command-runner.js`
- Used only deployed docs/app pages under `https://eviltester.github.io/grid-table-editor/`.

Representative docs examples reviewed:
- `autoIncrement.sequence(start=10, step=5)`
- `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
- `autoIncrement.timestamp(type="seconds")`
- `string.alpha(length=5, casing="upper")`
- `string.fromCharacters(characters=["A", "B", "C"], length=4)`
- `string.uuid(version=7)`
- `number.int(max=10, min=1)`
- `number.float(multipleOf=0.5)`
- `date.between(from=1577836800000, to=1609372800000)`
- `finance.iban(countryCode="GB")`
- `finance.amount(max=10, min=1)`

Exact schemas and observations:

1. Valid auto increment baseline
   - Schema:
     ```text
     v
     autoIncrement.sequence(start=10, step=5)
     ```
   - Observed values: `10`, `15`, `20`, `25`, `30`, `35`, `40`, `45`, `50`, `55`.
   - Result: passed.

2. Negative zero padding
   - Schema:
     ```text
     v
     autoIncrement.sequence(zeropadding=-1)
     ```
   - Expected: reject negative zeropadding up front or normalize with clear semantics.
   - Observed: every generated preview row was `**ERROR**`; no explanatory validation message was visible beyond the generated error tokens.
   - Result: confirmed defect candidate, same pattern as `internet.httpMethod` empty pool.

3. Invalid timestamp type enum
   - Schema:
     ```text
     v
     autoIncrement.timestamp(type="centuries")
     ```
   - Expected: reject invalid enum value.
   - Observed: every generated preview row was `**ERROR**`; no explanatory validation message was visible.
   - Result: confirmed defect candidate.

4. Zero-length string
   - Schema:
     ```text
     v
     string.alpha(length=0)
     ```
   - Expected: accept empty strings or reject clearly.
   - Observed: generated empty string values.
   - Result: acceptable if zero length is intended; follow-up only if product expects min length 1.

5. Empty source characters
   - Schema:
     ```text
     v
     string.fromCharacters(characters=[], length=4)
     ```
   - Expected: reject empty character source.
   - Observed: every generated preview row was `**ERROR**`; no explanatory validation message was visible.
   - Result: confirmed defect candidate.

6. Invalid UUID version
   - Schema:
     ```text
     v
     string.uuid(version=99)
     ```
   - Expected: reject invalid enum/constrained value.
   - Observed: `v failed domain validation - Invalid keyword arguments: argument "version" must be 4 or 7, not integer`.
   - Result: passed.

7. Inverted integer range
   - Schema:
     ```text
     v
     number.int(max=1, min=10)
     ```
   - Expected: reject inverted range.
   - Observed: `v failed domain validation - Invalid keyword arguments: argument "min" must be less than or equal to argument "max"`.
   - Result: passed.

8. Zero multipleOf for float
   - Schema:
     ```text
     v
     number.float(multipleOf=0)
     ```
   - Expected: reject zero `multipleOf`.
   - Observed: every generated preview row was `**ERROR**`; no explanatory validation message was visible.
   - Result: confirmed defect candidate.

9. Inverted date range
   - Schema:
     ```text
     v
     date.between(from=1640995200000, to=1609459200000)
     ```
   - Expected: reject inverted range.
   - Observed: `v failed domain validation - Invalid keyword arguments: argument "from" must be less than or equal to argument "to"`.
   - Result: passed.

10. Invalid IBAN country
    - Schema:
      ```text
      v
      finance.iban(countryCode="ZZ")
      ```
    - Expected: reject invalid country code or explain unsupported generator value.
    - Observed: every generated preview row was `**ERROR**`; no explanatory validation message was visible.
    - Result: confirmed defect candidate.

11. Inverted amount range
    - Schema:
      ```text
      v
      finance.amount(max=1, min=10)
      ```
    - Expected: reject inverted range.
    - Observed: `v failed domain validation - Invalid keyword arguments: argument "min" must be less than or equal to argument "max"`.
    - Result: passed.

Pattern found:
- Validators catch many parser/type/range problems before generation:
  - unknown params
  - duplicate params
  - wrong boolean type
  - wrong UUID version
  - inverted numeric/date ranges
- Several semantic impossibility cases still reach runtime and generate `**ERROR**` data rows:
  - `internet.httpMethod` excluding every possible method
  - `autoIncrement.sequence(zeropadding=-1)`
  - `autoIncrement.timestamp(type="centuries")`
  - `string.fromCharacters(characters=[], length=4)`
  - `number.float(multipleOf=0)`
  - `finance.iban(countryCode="ZZ")`
- The repeated pattern suggests a validator coverage gap: runtime exceptions are being converted into output values instead of being surfaced as schema validation errors.

Final review ideas generated from the lane:
- execute-now: broaden beyond `internet` to validator-heavy docs pages. Done in this entry.
- execute-now: include at least one valid docs example as a control. Done with `autoIncrement.sequence` and `internet.httpMethod` examples.
- execute-now: test invalid enum values. Done with `autoIncrement.timestamp(type="centuries")` and `string.uuid(version=99)`.
- execute-now: test inverted numeric/date ranges. Done with `number.int`, `finance.amount`, and `date.between`.
- execute-now: test empty candidate pools. Done with `internet.httpMethod` full excludes and `string.fromCharacters(characters=[])`.
- execute-now: test output-control boundaries. Done with preview/generate counts.
- execute-now: compare replacement/deprecated command behavior. Done with `image.url` and `image.urlLoremFlickr`.
- defer: test every command family from the PR file list; this belongs to the command-coverage lane, not this negative-validation lane.
- defer: produce one defect file per candidate; issue #246 asks the main coordinator to split defects, while this delegated lane is scoped to this log.
- defer: run local unit examples/validators; explicitly out of scope because this lane is deployed-environment only.

Stopping rationale:
- This lane covered malformed command-like text, explicit domain param validation, unsafe-looking strings, deprecated command naming, regex/parser ambiguity, generator row/preview boundaries, docs-example controls, and validator-heavy command families.
- Recent testing repeated the same meaningful pattern (`**ERROR**` generated as data for semantic impossibility cases) rather than discovering a wholly new class.
- Remaining exhaustive command-family coverage is better handled by the command-coverage subagent because this lane has enough negative-validation evidence and exact schemas for follow-up.
---
