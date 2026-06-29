# Negative Validation Findings

## Scope

Deployed-only negative validation lane for `eviltester/grid-table-editor` issue #253 and merged PR #285. PR #295 was checked through GitHub and was not resolvable in the target repository. Testing used:

- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- deployed docs pages linked from the site/generator

No local repo build, verify, test, or package-manager commands were run.

## Techniques

- Negative testing for malformed syntax, duplicate named params, unknown commands, invalid constrained params, and structured parameter inputs.
- Boundary analysis for `number.int` bounds and `autoIncrement.sequence` validators.
- Classification oracle checking: known invalid-param command vs unknown/malformed command.
- State transition checking: text schema mode to Schema UI mode.
- Docs/runtime consistency sampling from deployed docs pages.
- Screenshot evidence review for the highest-risk outcomes.

## Invalid Examples Tried

| Area | Example | Result |
| --- | --- | --- |
| Duplicate params | `number.int(min=1, min=2, max=3)` | Known command; stayed editable in Schema UI; row-level duplicate `min` validation shown. |
| Reversed bounds | `number.int(min=5, max=1)` | Known command; stayed editable in Schema UI; row-level min/max validation shown. |
| Malformed params | `number.int(min=1, max=3` | Known command; stayed editable in Schema UI; row-level params-wrapping validation shown. |
| Unknown command | `number.notARealCommand(min=1)` | Stayed in text mode; literal conversion prompt shown. |
| Invalid boolean-like bareword | `location.cardinalDirection(abbreviated=maybe)` | Known command; stayed editable in Schema UI; row-level bare-value validation shown. |
| Sequence zero step | `autoIncrement.sequence(step=0)` | Known command; stayed editable in Schema UI; row-level non-zero integer validation shown. |
| Sequence negative zero padding | `autoIncrement.sequence(zeropadding=-1)` | Known command; stayed editable in Schema UI; row-level `>= 0` validation shown. |
| Structured array edge | `string.fromCharacters(characters=[], length=4)` | Accepted and generated CSV. Suspicious only until a spec/docs oracle says empty array should fail. |
| Structured array malformed | `string.fromCharacters(characters=[abc, length=4)` | Known command; stayed editable in Schema UI; row-level bare-value validation shown. |

## Classification Behavior

Observed behavior matches the issue #253 target distinction:

- Known command with invalid params: can switch from text schema mode to Schema UI and shows row-level validation.
- Unknown command: remains in text mode and asks whether to convert invalid definitions to literal.
- Known command with params syntax problems: can switch into Schema UI and keeps the command/params visible for correction.

The exact issue example `number.int(min=1, min=2, max=3)` behaved correctly in the deployed generator.

## Literal Conversion Prompts

Prompt observed only for the deliberate unknown command:

```text
Bad
number.notARealCommand(min=1)
```

Prompt text:

```text
Convert invalid definitions?
Syntax errors are present that can not be edited in Schema UI.
Allow editing by converting invalid definitions to literal?
Yes No
```

No literal conversion prompt appeared for:

- duplicate params on `number.int`
- reversed min/max on `number.int`
- `autoIncrement.sequence(step=0)`
- `autoIncrement.sequence(zeropadding=-1)`
- invalid bareword value on `location.cardinalDirection`
- malformed array value on `string.fromCharacters`

## Results

- Issue #253 fix appears successful on the deployed generator for the exact duplicate-param example.
- PR #285 `autoIncrement.sequence` validation appears deployed: `step=0` and `zeropadding=-1` are rejected before generation and remain editable in Schema UI.
- Unknown command handling still protects Schema UI by prompting for conversion rather than silently treating the command as editable.
- Deployed docs pages confirm the sampled known command families:
  - number docs include `number.int`
  - auto-increment docs include `autoIncrement.sequence`
  - string docs include `string.fromCharacters`
  - location docs include `location.cardinalDirection`
- Brief app-surface check loaded `site/app.html`; detailed malformed-param probing stayed on the generator because it directly exposes the shared schema editor.

## Evidence

Primary screenshots:

- `../screenshots/negative-validation-number-int-duplicate-schema-ui.png`
- `../screenshots/negative-validation-unknown-command-clean-after-switch.png`
- `../screenshots/negative-validation-autoincrement-step-zero-after-switch.png`
- `../screenshots/negative-validation-autoincrement-negative-zeropadding-after-switch.png`
- `../screenshots/negative-validation-number-int-reversed-bounds-after-switch.png`
- `../screenshots/negative-validation-cardinaldirection-bareword-after-switch.png`
- `../screenshots/negative-validation-string-fromcharacters-malformed-array-after-switch.png`

Docs/app screenshots:

- `../screenshots/negative-validation-number-docs.png`
- `../screenshots/negative-validation-sequence-docs.png`
- `../screenshots/negative-validation-string-docs.png`
- `../screenshots/negative-validation-location-docs.png`
- `../screenshots/negative-validation-app-initial.png`

Detailed sequential log:

- `../logs/negative-validation-test-log.md`

## Defects And Suspicious Behavior

Confirmed repeatable defects: none found in this lane.

Suspicious behavior:

- `string.fromCharacters(characters=[], length=4)` generated successfully. This might be acceptable behavior, so it is not a candidate defect without a stronger product/spec oracle.
- `number.int(min=1, max=3` is technically malformed invocation syntax but was still made editable in Schema UI as a known `number.int` row. Given issue #253 explicitly allows valid commands with params syntax issues to move between editors, this was treated as acceptable rather than a defect.

## Candidate Defects

No `support/negative-validation-candidate-defects.md` file was created because I did not find a repeatable deployed-app defect.

## Deferred Ideas

- Compare equivalent invalid params in the app's embedded Test Data flow if a direct schema-editor entry path is identified there.
- Add more structured object params once a deployed docs example with object-shaped arguments is identified.
- Retest empty arrays for `string.fromCharacters` against source-level tests or product documentation if allowed in a future non-deployed-only pass.
- Sample duplicate named params on non-number commands, such as `location.cardinalDirection(abbreviated=true, abbreviated=false)` and `autoIncrement.sequence(step=1, step=2)`.
- Test malformed quoted strings such as `number.int(min="1)` and structured nested arrays with quoted values.
