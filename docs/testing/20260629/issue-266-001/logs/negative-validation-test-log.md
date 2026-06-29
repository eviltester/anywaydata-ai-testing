# Negative Validation Test Log - Subagent B

Session: issue-266-001 deployed-only exploratory review  
Lane: negative validation and malformed parameter testing  
Tester: subagent B  
Date: 2026-06-29  
Target scope: `https://eviltester.github.io/grid-table-editor/site/app.html`, `https://eviltester.github.io/grid-table-editor/site/generator.html`, and public docs pages under `/site/docs/`  
Local commands avoided: no local build, test, package, or repo verification commands were run.

## Charter

Test malformed schema rows, invalid parameter values, unknown command-like text, structured parameter edge cases, invalid enum/datatype/autoIncrement/faker helper examples, invalid row counts if exposed, and behavior of validation/error messages in `app.html` and `generator.html`.

## Techniques and Heuristics

- Started with browser proof on deployed `app.html`: opened the public page, toggled theme, captured screenshot.
- Used accessibility snapshots to map visible controls before interacting.
- Used public docs pages only to learn valid syntax: Schema Definition, Faker Based Data, Domain Test Data, Auto Increment Sequences, Literal Data, Pairwise Testing.
- Used a valid generator baseline before negative data: `Status enum("Open","Closed")` plus `Ticket regex([A-Z]{3}-\d{4})`.
- Partitioned invalid examples by parser layer: text schema shape, enum/datatype syntax, domain/faker params, helper syntax, auto-increment params, constraints, row counts, and import text.
- Repeated suspicious results through visible DevTools fill/click paths after a scripted matrix, because the schema editor has both textarea and structured-row state.
- Treated console-only errors as weaker user-facing evidence unless the UI also showed a message.

## Supporting Artifacts

- `support/negative-validation-app-browser-proof-dark-theme.png`
- `support/negative-validation-app-controls.json`
- `support/negative-validation-app-initial-snapshot.txt`
- `support/negative-validation-generator-initial-snapshot.txt`
- `support/negative-validation-generator-controls.json`
- `support/negative-validation-doc-extracts.json`
- `support/negative-validation-generator-matrix-results.json`
- `support/negative-validation-generator-matrix-summary.json`
- `support/negative-validation-generator-onlycolumn-error.png`
- `support/negative-validation-generator-autoincrement-step-zero-error-rows.png`
- `support/negative-validation-generator-autoincrement-negative-zeropadding-error-rows.png`
- `support/negative-validation-constraint-valid-direct-repeat.json`
- `support/negative-validation-app-invalid-json-no-visible-error.png`
- `support/negative-validation-app-invalid-json-console.txt`

## Generator Baseline

Input:

```text
Status
enum("Open","Closed")
Ticket
regex([A-Z]{3}-\d{4})
```

Observation: Preview generated 10 CSV rows with Status values and Ticket values like `HAN-9835`, confirming schema text mode, Preview, and output capture worked.

## Schema Row Shape Tests

Input:

```text
OnlyColumn
```

First scripted matrix pass looked stale, so I repeated using visible `Schema text` fill and Preview click. Repeat result was good: the app showed a schema validation message:

```text
column OnlyColumn requires a data definition, use 'literal("")' for blank data
```

Output Preview stayed blank. Artifact: `negative-validation-generator-onlycolumn-error.png`.

Input:

```text

enum("A","B")
```

Matrix path was inconclusive because direct textarea state did not mimic visible input for malformed row-shape cases. Follow-up should repeat via normal fill if this exact case matters.

Input:

```text
Priority:
```

Same caveat as above. Do not treat the scripted stale-output row as a confirmed product issue.

## Enum and Datatype Validation

Input:

```text
EmptyEnum
enum()
```

Observation: blocked with visible validation:

```text
EmptyEnum failed domain validation - Unknown keyword: enum
```

Note: the message blocks generation, but "Unknown keyword: enum" may be less helpful than "enum requires values".

Input:

```text
BadEnum
enum("A","B)
```

Observation: blocked with visible validation:

```text
BadEnum failed domain validation - Invalid keyword arguments: unbalanced expression
```

Input:

```text
Dt
datatype.enum(csv="")
```

Observation: blocked with visible validation:

```text
Dt failed domain validation - Invalid keyword arguments: argument "values" is required
```

Input:

```text
Dt
datatype.notAThing(csv="A,B")
```

Observation: blocked with visible validation:

```text
Dt failed domain validation - Unknown keyword: datatype.notAThing
```

## Unknown Command-Like Text

Input:

```text
Danger
DROP TABLE users; --
Status
enum("Open","Closed")
```

Observation: generated as inert literal data, e.g. `"DROP TABLE users; --","Open"`. No visible error. This appears acceptable because docs support literal data without wrapper syntax.

Input:

```text
Script
<script>alert("x")</script>
Status
enum("Open","Closed")
```

Observation: generated as literal CSV text, escaped in the output preview as `"<script>alert""x""</script>"`. No script execution observed during preview.

## Structured Parameter Edge Cases

Input:

```text
Direction
location.cardinalDirection(abbreviated=maybe)
```

Observation: blocked with visible validation:

```text
Direction failed domain validation - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes
```

Input:

```text
N
number.int(min=10, max=1)
```

Observation: blocked with visible validation:

```text
N failed domain validation - Invalid keyword arguments: argument "min" must be less than or equal to argument "max"
```

Input:

```text
N
number.int(min="one", max=5)
```

Observation: blocked with visible validation:

```text
N failed domain validation - Invalid keyword arguments: argument "min" must be number, not string
```

Input:

```text
D
date.between(from=1659312000000, to=1577836800000)
```

Observation: blocked with visible validation:

```text
D failed domain validation - Invalid keyword arguments: argument "from" must be less than or equal to argument "to"
```

Input:

```text
D
date.between(from="abc", to="def")
```

Observation: blocked with visible validation:

```text
D failed domain validation - Invalid keyword arguments: argument "from" must be integer, not string
```

## Faker Helper Edge Cases

Input:

```text
Bad
domain.helpers.fake("{{person.firstName}}")
```

Observation: blocked with visible validation aligned with docs:

```text
Bad failed domain validation - helpers_not_supported_in_domain: helpers.* is faker-only; use faker.helpers.*
```

Input:

```text
Sentence
helpers.mustache("Hello {{name}}", { name: })
```

Observation: blocked with visible validation:

```text
Sentence failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

Input:

```text
Sentence
helpers.fake("{{person.firstName}")
```

Observation: generated literal-looking output rows containing `{{person.firstName}`. No visible error. This may be acceptable because the malformed template is still just string input, but follow-up should clarify expected helper semantics.

## Auto-Increment Edge Cases

Input:

```text
Id
autoIncrement.sequence(step=0)
```

Repeated using visible fill and Preview. Observation: Preview generated header plus 10 rows of:

```text
**ERROR**
```

No visible validation message explained why. Suspected defect candidate: invalid `step=0` should be blocked with a validation message instead of generating error sentinel values. Artifact: `negative-validation-generator-autoincrement-step-zero-error-rows.png`.

Input:

```text
Id
autoIncrement.sequence(zeropadding=-1)
```

Repeated using visible fill and Preview. Observation: Preview generated header plus 10 rows of:

```text
**ERROR**
```

No visible validation message explained why. Suspected defect candidate: invalid negative zero padding should be blocked with a validation message instead of generating error sentinel values. Artifact: `negative-validation-generator-autoincrement-negative-zeropadding-error-rows.png`.

Input:

```text
Id
autoIncrement.sequence(start="abc", step=2)
```

Observation: blocked with visible validation:

```text
Id failed domain validation - Invalid keyword arguments: argument "start" must be integer, not string
```

Input:

```text
Id
autoIncrement.sequence(step=-1)
```

Observation: generated descending sequence `1, 0, -1, -2...`. This may be valid unless docs intend positive-only steps. Marked as open expectation question, not a suspected defect.

## Regex Edge Case

Input:

```text
Code
regex([A-Z]{3)
```

Observation from matrix: generated strings like `O{3`, `C{3`, `M{3`. This might be parser interpretation rather than an invalid regex error because the unclosed class changes how the string is parsed. Follow-up should compare against intended regex validation rules before filing.

## Constraint Validation

Valid control:

```text
Priority
enum("High","Low")
Status
enum("Open","Closed")

IF [Priority] = "High" THEN [Status] = "Open";
```

Observation: valid constraint applied; all sampled `High` rows had `Open` status. Artifact: `negative-validation-constraint-valid-direct-repeat.json`.

Malformed operator:

```text
Priority
enum("High","Low")
Status
enum("Open","Closed")

IF [Priority] ~~ "High" THEN [Status] = "Open";
```

Observation: blocked with visible line-numbered validation:

```text
Line 6: Unexpected token "~".
```

Unknown field:

```text
Priority
enum("High","Low")
Status
enum("Open","Closed")

IF [Missing] = "High" THEN [Status] = "Open";
```

Observation: blocked with visible line-numbered validation:

```text
Line 6: unknown constraint parameter [Missing].
```

## Generator Row Count Edge Cases

Preview Items Count:

- `0`: accepted; output preview contained only the CSV header `"Status"`.
- `-1`: blocked with `Preview Items Count must be a number greater than or equal to 0.`
- `51`: blocked with `Preview Items Count must be less than or equal to 50.`
- `abc`: input emptied and was blocked with `Preview Items Count must be a number greater than or equal to 0.`

Generate Rows:

- `-1`: blocked with `Generate Rows must be a number greater than or equal to 0.`
- `0`: allowed and reported `Download ready: generated-data.csv`.

Open expectation question: `Generate Rows = 0` may be intended for header-only downloads, but should be confirmed.

## App Import and Row Count Tests

Invalid JSON import on `app.html`:

Selected JSON tab, filled Preview text editor with:

```json
[{"name":"Ada",]
```

Clicked `Set Grid From Text`.

Observation: grid stayed at `Total rows: 0` and the editor still showed the invalid JSON. No visible error message appeared in the app. DevTools console recorded:

```text
Failed importing preview text SyntaxError: Expected double-quoted property name in JSON at position 15 (line 1 column 16)
```

Suspected defect candidate: invalid import text should surface a visible validation/error message, not only a console error. Artifact: `negative-validation-app-invalid-json-no-visible-error.png`.

`app.html` preview row count:

- Entering `0` clamped the spinbutton to `1` after `Set Text From Grid`.
- Entering `51` clamped the spinbutton to `50` after `Set Text From Grid`.

Observation: app row-count control enforces visible min/max and did not show an error. This looks healthy.

## Suspected Defects for Main-Agent Confirmation

1. `generator.html`: `autoIncrement.sequence(step=0)` generates `**ERROR**` rows with no visible validation message.
2. `generator.html`: `autoIncrement.sequence(zeropadding=-1)` generates `**ERROR**` rows with no visible validation message.
3. `app.html`: malformed JSON import logs a console error but does not show a visible validation message to the user.

## Coverage Notes

- Covered both `app.html` and `generator.html` on the deployed `/site/` surface.
- Covered public docs references for syntax/expectations without reading local source.
- Covered text schema mode more deeply than structured row mode.
- Covered preview output more deeply than direct file download contents.
- Covered CSV output format for generator validation; did not cross-check every export format.
- Covered constraints through text-mode schema input.
- Captured screenshots for repeatable suspected defects and representative healthy validation.

## Gaps and Caveats

- The scripted matrix used direct DOM value setting and produced stale results for some malformed row-shape cases. Those cases were not treated as defects unless repeated through visible fill/click.
- Did not create defect files per instruction.
- Did not inspect downloaded `generated-data.csv` for the `Generate Rows = 0` case.
- Did not perform local source, build, package, or test commands.
- Did not exhaustively test every faker helper or domain method; sampled representative invalid examples.
- Did not test mobile/responsive behavior; outside this lane.

## Follow-Up Ideas

1. Confirm whether `autoIncrement.sequence(step=0)` should be rejected at schema-validation time and add a targeted validation message if so.
2. Confirm whether `autoIncrement.sequence(zeropadding=-1)` should be rejected with a message such as `zeropadding must be greater than or equal to 0`.
3. Add visible import error feedback in `app.html` for JSON, JSONL, CSV, XML, and Markdown parser failures, not just console logging.
4. Test `Generate Rows = 0` download contents to decide whether header-only output is intentional or should be blocked.
5. Repeat malformed regex expectations with docs/source owner input: decide whether `regex([A-Z]{3)` should be accepted as literal-ish regex behavior or rejected as malformed.
6. Expand faker helper negative tests for arrays, nested objects, escaped quotes, trailing commas, and unsupported helper namespaces.
7. Add a cross-format generator pass for the same invalid schema cases under JSON, SQL, XML, and HTML output formats to check whether error sentinels leak differently.
8. Test schema file load with malformed schema JSON/text to check if file-import errors are more visible than textarea import errors.
9. Verify whether row-count spinbuttons should expose consistent minimums across `app.html` Preview rows and `generator.html` Preview Items Count.
