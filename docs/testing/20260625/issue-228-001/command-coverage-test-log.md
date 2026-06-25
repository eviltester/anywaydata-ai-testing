# Command Coverage Test Log

## 2026-06-25T00:40:00+01:00 - Charter and Setup

Charter: deployed-environment exploratory QA retest for issue #228 / PR #243, focused on command coverage and example execution. Scope was broad positive sampling across domain command families, faker/helper commands, newly added/changed enum commands, commands with validators, structured/constrained parameters, default examples, parameterized examples, and commands with multiple docs/help examples.

Operating constraints followed: used only `https://eviltester.github.io/grid-table-editor/` and public deployed docs/pages. Did not run local verify, build, package-manager, or repo test commands. Did not edit app code.

Environment under test:

- URL: `https://eviltester.github.io/grid-table-editor/`
- Branch shown by deployed landing page: `codex/228-improve-command-definition`
- Commit shown by deployed landing page: `a3b39ddcfe0f`
- Build shown by deployed landing page: `2026-06-24T23:03:43.621Z`
- Browser automation: Playwright driving installed Chrome against deployed pages only.

Techniques and heuristics:

- Docs-as-oracle comparison: copy documented examples from public Docusaurus pages and execute through deployed generator preview.
- Risk-based sampling: prioritize commands touched by command-help/domain metadata refactor and enum work.
- Equivalence partitioning: cover defaults, named parameters, constrained numeric ranges, booleans, strings, enums, date windows, nested domain aliases, faker helpers, and auto-increment state.
- Positive broad sweep first, then isolate suspicious failures to avoid one bad command blocking unrelated coverage.
- Picker/help coverage: inspect live row-editor domain command select options for availability and absence/presence of changed commands.

## 2026-06-25T00:43:00+01:00 - Deployed App and Docs Discovery

Steps:

- Opened `https://eviltester.github.io/grid-table-editor/`.
- Opened `https://eviltester.github.io/grid-table-editor/generator.html`.
- Opened public docs pages under `https://eviltester.github.io/grid-table-editor/site/docs/`.
- Confirmed schema text format from `site/docs/test-data/Schema-Definition`.
- Confirmed domain catalog from `site/docs/test-data/domain/domain-test-data`.
- Read focused public docs pages for `datatype`, `person`, `location`, `finance`, `date`, `number`, `science`, `system`, `internet`, `commerce`, `autoIncrement`, and `faker-test-data`.

Observations:

- Generator page loaded as `Data Generator - AnyWayData`.
- Text-schema mode accepted two-line field definitions and compact inline `Name: values` definitions.
- Preview button generated visible CSV output in the `Output Preview` text area.
- Domain docs state that each domain page lists methods, arguments, and executable examples.

## 2026-06-25T00:48:00+01:00 - Smoke Schema Execution

Schema:

```text
Company
company.name
Regex Generated Field
[A-Z]{3,6}[0-9]{0,6}
```

Steps:

- Switched generator to `Edit as Text`.
- Entered the schema above.
- Clicked `Generate Data`, then used `Preview`.

Result:

- `Generate Data` reached `Download ready: generated-data.csv`.
- `Preview` produced CSV with company names and regex-matching values such as `GOMS49`, `GTXG875335`, and `WITH00922`.
- No validation errors observed.

## 2026-06-25T00:52:00+01:00 - Broad Positive Batch Sampling

Batch A - docs smoke, enums, literal, regex, compact inline enum values:

```text
Status
enum("Open","In Progress","Closed")
Build
literal(1.0.0)
Ticket Id
[A-Z]{3}-\d{4}
Browser: Chrome,Firefox,Safari
Theme: Light,Dark
```

Result:

- Passed.
- Output included `Status`, `Build`, `Ticket Id`, `Browser`, and `Theme`.
- Generated values stayed within expected enums, literal stayed `1.0.0`, ticket IDs matched the expected pattern, and compact inline `Browser`/`Theme` enum values generated correctly.
- `Generate Combinations` became available when enum-like fields were present.

Batch B - changed datatype enum/boolean commands:

```text
BoolDefault
datatype.boolean()
BoolProb
datatype.boolean(probability=0.5)
ApiStatus
datatype.enum(values="active,inactive,pending")
HttpMethod
datatype.enum(values="GET,POST,PUT,PATCH")
AliasEnum
enum("High","Medium","Low")
```

Result:

- Passed.
- Output included booleans as `true`/`false`.
- `datatype.enum` generated only configured values.
- `enum(...)` alias continued to generate only configured values.

Batch C - person/internet/location defaults and params:

```text
Bio
person.bio
FirstFemale
person.firstName(sex="female")
FullName
person.fullName
EmailAda
internet.email(firstName="Ada")
DisplayName
internet.displayName
Lang2
location.language.alpha2
DirectionAbbrev
location.cardinalDirection(abbreviated=true)
```

Result:

- Failed because of `location.cardinalDirection(abbreviated=true)`.
- Error: `Row 7: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`.
- Other commands in the batch were not judged from this combined run because the invalid command blocked preview.
- Follow-up isolation is recorded below.

Batch D - finance/commerce structured validators:

```text
IbanGB
finance.iban(formatted=true, countryCode="GB")
IbanDE
finance.iban(formatted=false, countryCode="DE")
Account5
finance.accountNumber(length=5)
AmountMax
finance.amount(max=100)
Isbn10
commerce.isbn(variant=10)
PriceBound
commerce.price(dec=2, max=10, min=1, symbol="$")
```

Result:

- Passed.
- `IbanGB` generated formatted GB IBAN strings with spaces.
- `IbanDE` generated unformatted DE IBAN strings.
- `Account5` generated five-digit strings.
- `AmountMax` stayed below `100`.
- `Isbn10` generated ISBN-10-style values.
- `PriceBound` generated `$`-prefixed values between `1` and `10`.

Batch E - date/number constrained params:

```text
DateBetween
date.between(from=1577836800000, to=1609372800000)
BirthAge
date.birthdate(refDate=1577836800000, max=69, min=16, mode="age")
IntRange
number.int(min=32, max=47)
BinaryRange
number.binary(max=10, min=1)
FloatFixed
number.float(min=1, max=5, fractionDigits=2)
```

Result:

- Passed.
- Dates stayed in plausible configured windows.
- `number.int` stayed within `32..47`.
- `number.float` produced two fractional digits and stayed within `1..5`.
- `number.binary` produced binary strings with values corresponding to the configured numeric range.

Batch F - science/system nested domain leaf commands:

```text
AtomicNum
science.chemicalElement.atomicNumber
ElementName
science.chemicalElement.name
UnitName
science.unit.name
UnitSymbol
science.unit.symbol
FileTxt
system.commonFileName(extension="txt")
CronYear
system.cron(includeYear=true)
```

Result:

- Passed.
- Output included atomic numbers, element names, unit names, unit symbols, `.txt` file names, and cron expressions.
- This covered newly surfaced nested domain leaf commands including `science.unit.name` and structured system parameters.

Batch G - faker/helper commands:

```text
FakeSentence
helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")
Mustache
helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
FakerDirection
faker.location.cardinalDirection({ abbreviated: true })
```

Result:

- Failed as a combined batch.
- Errors:
- `Row 2: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`
- `Row 3: invalid faker params - Invalid keyword arguments: too many positional arguments. Expected at most 0, received 1`
- Follow-up isolation showed `helpers.fake(...)` works, while the published `helpers.mustache(...)` and `faker.location.cardinalDirection({ abbreviated: true })` examples fail.

Batch H - autoIncrement corrected examples:

```text
Seq
autoIncrement.sequence(start=10, step=2)
SeqPad
autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)
CreatedAt
autoIncrement.timestamp(start="2026-06-12T12:39:23Z", step=1, type="seconds")
```

Result:

- Passed.
- `Seq` generated `10, 12, 14, ...`.
- `SeqPad` generated `filename001.txt`, `filename006.txt`, `filename011.txt`, etc.
- `CreatedAt` generated second-by-second timestamps from `2026-06-12T12:39:23Z`.

## 2026-06-25T01:03:00+01:00 - Suspicious Failure Isolation

Isolated `location.cardinalDirection(abbreviated=true)`:

```text
Direction
location.cardinalDirection(abbreviated=true)
```

Result:

- Failed.
- Error: `Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`.
- Public domain overview quick examples include `Direction` with `location.cardinalDirection(abbreviated=true)`.
- Public `location` domain page says `location.cardinalDirection` has no parameters.

Control using `location.direction(abbreviated=true)`:

```text
Direction
location.direction(abbreviated=true)
```

Result:

- Passed.
- Output contained abbreviated directions such as `SW`, `N`, `W`, `NW`, `SE`, and `E`.
- This suggests the overview quick example likely meant `location.direction(abbreviated=true)`.

Isolated `helpers.fake(...)`:

```text
Sentence
helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")
```

Result:

- Passed.
- Output contained sentences such as `Hi, my name is Marisa McLaughlin!`.

Isolated `helpers.mustache(...)`:

```text
Sentence
helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
```

Result:

- Failed.
- Error: `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`.
- This exact example appears on the public `Faker Based Data` docs page.

Isolated direct faker object-style example:

```text
Direction
faker.location.cardinalDirection({ abbreviated: true })
```

Result:

- Failed.
- Error: `Row 1: invalid faker params - Invalid keyword arguments: too many positional arguments. Expected at most 0, received 1`.
- This exact example appears on the public `Faker Based Data` docs page.

## 2026-06-25T01:10:00+01:00 - Picker and Help Coverage

Steps:

- Returned to grid schema mode.
- Changed the first row data type to `domain`.
- Inspected the live domain command picker.
- Saved screenshot: `docs/testing/20260625/issue-228-001/screenshots/command-coverage-domain-picker.png`.

Observed picker data:

- Domain picker has 253 options.
- Sample options include `airline.aircraftType`, `animal.*`, `autoIncrement.sequence`, `autoIncrement.timestamp`, `book.*`, `commerce.*`, `company.*`, `datatype.boolean`, `datatype.enum`, `date.*`, `finance.*`, `internet.*`, `location.*`, `number.*`, `person.*`, `science.*`, `string.*`, and `system.*`.
- Changed/high-risk commands visible in picker included `autoIncrement.sequence`, `autoIncrement.timestamp`, `datatype.boolean`, `datatype.enum`, `finance.iban`, `internet.httpMethod`, `location.cardinalDirection`, and `location.direction`.
- `helpers.*` was not present in the domain picker, consistent with domain docs saying `helpers.*` is intentionally faker-only.

Coverage:

- Domain picker availability: covered.
- Domain/faker split: covered at picker and runtime level.
- Multiple examples/help: covered via public docs pages and isolated execution.

## Findings

Confirmed defects:

- `DEFECT-command-docs-location-cardinaldirection-abbreviated.md`: public domain overview quick example uses `location.cardinalDirection(abbreviated=true)`, but deployed runtime rejects `abbreviated`; `location.direction(abbreviated=true)` works and the location domain detail page documents `location.cardinalDirection` as no-parameter.
- `DEFECT-faker-doc-examples-do-not-execute.md`: two public `Faker Based Data` direct examples fail in deployed generator: `helpers.mustache(...)` with callback object and `faker.location.cardinalDirection({ abbreviated: true })`.

Positive findings:

- Core schema text parsing works for two-line and compact inline forms.
- `enum(...)`, raw compact enum lists, `datatype.enum(values="...")`, and `datatype.boolean(...)` all generated valid sampled outputs.
- Structured/named validator examples for finance, commerce, date, number, system, and autoIncrement executed successfully.
- Nested command examples for science and system executed successfully.
- `helpers.fake(...)` executed successfully as a faker helper command.
- Domain picker contains broad command coverage and includes changed commands.

## Deferred Items

- Did not exhaust all 253 domain picker options.
- Did not execute every example from every domain page; sampled representative defaults and parameterized examples across high-risk families.
- Did not do negative validation beyond failures encountered naturally from published examples; that belongs to the negative-validation lane.
- Did not cross-check Storybook method picker stories; this lane focused on deployed generator and public docs/runtime execution.
- Did not inspect app code or local generated metadata by design.

## New Ideas

- Add a deployed-docs smoke harness that extracts public docs code blocks and runs them through the generator preview, tagging expected executable examples versus documentation-only snippets.
- Add a docs lint rule that flags object-literal faker examples if the deployed parser only supports named-argument syntax.
- Add a domain overview consistency check so quick examples are validated against each command page metadata.
- Add picker inventory snapshot comparison for PRs that change command metadata, with allowed/hidden command assertions such as `helpers.*` absent from domain picker.
- Add a lightweight example matrix for `datatype.enum` forms: raw compact list, `enum(...)`, `datatype.enum(values="...")`, quoted multi-word values, and HTTP method enum values.
- Add a visual separator/accessibility review of the preview table because concatenated visible table text is hard to read in automation output, though CSV output is correct.
