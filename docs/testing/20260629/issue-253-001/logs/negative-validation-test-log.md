# Negative Validation Test Log

## Charter

- Owner: negative validation and malformed parameter testing lane
- Goal: probe duplicate params, unknown commands, malformed syntax, invalid constrained params, literal conversion prompts, `autoIncrement.sequence` edge cases, and structured params for deployed issue #253 / PR #285 review
- Write scope: this file plus `support/negative-validation-findings.md`; candidate defects only if repeatable
- Techniques and heuristics: negative testing, boundary analysis, equivalence partitioning, parser/oracle comparison, state transition checking, docs/runtime consistency checking

---
## 2026-06-29T22:05:52+01:00

- What you think you want to do and why

Resolve the issue/PR context and prove browser access before detailed negative validation, because the user supplied PR #295 but the deployed review should be tied to the PR that actually closes issue #253.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Used `gh issue view 253 --repo eviltester/grid-table-editor` and `gh pr view 285 --repo eviltester/grid-table-editor`.
- Tried `gh pr view 295 --repo eviltester/grid-table-editor` and confirmed GitHub could not resolve that PR number.
- Used the deployed environment only:
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - docs pages linked from the deployed generator/app/site
- Opened the deployed generator in browser automation and switched from row mode to text schema mode with the `Edit as Text` button.

the observations and results that you make

- Issue #253 is closed and PR #285 is merged; PR #285 closes issue #253.
- PR #295 is not resolvable in `eviltester/grid-table-editor`.
- Browser access and deployed generator interaction are working.
- This lane focuses on command classification and validation behavior, not local code, local builds, or local tests.

---
## 2026-06-29T22:09:48+01:00

- What you think you want to do and why

Start with the exact issue example so the lane has a direct oracle for the fixed behavior: a known command with invalid params should move from text mode back into Schema UI without being treated as an unknown or malformed command requiring literal conversion.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/generator.html`.
- Clicked `Edit as Text`.
- Entered:

```text
Num
number.int(min=1, min=2, max=3)
```

- Clicked `Generate Data`.
- Clicked `Edit as Schema`.
- Captured screenshots:
  - `screenshots/negative-validation-number-int-duplicate-generate.png`
  - `screenshots/negative-validation-number-int-duplicate-schema-ui.png`

the observations and results that you make

- Text-mode generation reported: `Num failed domain validation - Invalid keyword arguments: duplicate named argument "min"`.
- Switching to Schema UI did not show the literal conversion prompt.
- Schema UI retained one domain row:
  - Column Name: `Num`
  - Field type: `domain`
  - Command: `number.int`
  - Params: `(min=1, min=2, max=3)`
- Row-mode validation reported: `Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min"`.
- Classification behavior matched the expected issue #253 fix for the exact duplicate-param example.

---
## 2026-06-29T22:10:25+01:00

- What you think you want to do and why

Contrast the issue example against malformed syntax, unknown command names, and known commands with invalid constrained params so I can see whether the deployed app separates "known command with bad params" from "unknown or unsafe to edit in Schema UI".

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

For each case, I reloaded `https://eviltester.github.io/grid-table-editor/generator.html`, clicked `Edit as Text`, entered the schema, clicked `Generate Data`, then clicked `Edit as Schema` and captured text/generate/switch screenshots.

Invalid examples tried:

- Malformed params syntax:

```text
BadSyntax
number.int(min=1, max=3
```

- Reversed numeric bounds:

```text
Num
number.int(min=5, max=1)
```

- `autoIncrement.sequence` zero step:

```text
Seq
autoIncrement.sequence(step=0)
```

- `autoIncrement.sequence` negative zero padding:

```text
Seq
autoIncrement.sequence(zeropadding=-1)
```

- Unknown command:

```text
Bad
number.notARealCommand(min=1)
```

- Invalid bareword boolean-like value:

```text
Dir
location.cardinalDirection(abbreviated=maybe)
```

- Structured array param accepted/edge case:

```text
Chars
string.fromCharacters(characters=[], length=4)
```

- Structured array param malformed:

```text
Chars
string.fromCharacters(characters=[abc, length=4)
```

the observations and results that you make

- `number.int(min=5, max=1)` stayed editable as `number.int` in Schema UI and showed row validation: `argument "min" must be less than or equal to argument "max"`.
- `autoIncrement.sequence(step=0)` stayed editable as `autoIncrement.sequence` in Schema UI and showed row validation: `argument "step" must be a non-zero integer`.
- `autoIncrement.sequence(zeropadding=-1)` stayed editable as `autoIncrement.sequence` in Schema UI and showed row validation: `argument "zeropadding" must be greater than or equal to 0`.
- `location.cardinalDirection(abbreviated=maybe)` stayed editable as `location.cardinalDirection` in Schema UI and showed row validation: `bare values are not allowed; wrap strings in quotes`.
- `number.notARealCommand(min=1)` stayed in text mode and showed the literal conversion dialog: `Convert invalid definitions? Syntax errors are present that can not be edited in Schema UI. Allow editing by converting invalid definitions to literal? Yes No`.
- `number.int(min=1, max=3` switched into Schema UI as known `number.int` and showed row validation: `params should be wrapped in parentheses, e.g. (min=1, max=3).`
- `string.fromCharacters(characters=[abc, length=4)` switched into Schema UI as known `string.fromCharacters` and showed row validation: `bare values are not allowed; wrap strings in quotes`.
- `string.fromCharacters(characters=[], length=4)` was accepted and generated a download-ready CSV. I did not classify this as a defect because the deployed docs show array params for string commands, and I did not find a specific deployed oracle saying an empty array must be rejected.

---
## 2026-06-29T22:11:10+01:00

- What you think you want to do and why

Use the deployed docs pages as lightweight oracles for which commands are known and current, especially commands used in invalid-param probes.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened and captured screenshots from:

- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/location`

Captured screenshots:

- `screenshots/negative-validation-number-docs.png`
- `screenshots/negative-validation-sequence-docs.png`
- `screenshots/negative-validation-string-docs.png`
- `screenshots/negative-validation-location-docs.png`

the observations and results that you make

- The deployed number docs identify `number.int` as a known command family.
- The deployed auto-increment docs identify `autoIncrement.sequence` and examples including `step` and `zeropadding`.
- The deployed string docs identify `string.fromCharacters` and show array-shaped params on nearby string commands.
- The deployed location docs identify `location.cardinalDirection(abbreviated=true)`.
- These docs checks support the classification that the invalid examples above used known commands except the deliberate unknown command `number.notARealCommand`.

---
## 2026-06-29T22:12:05+01:00

- What you think you want to do and why

Check the deployed app surface briefly because PR #285 touched shared schema editor behavior and app/generator sync tests, while keeping the main negative-validation evidence on the generator where schema editing is directly available.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/site/app.html`.
- Captured `screenshots/negative-validation-app-initial.png`.
- Inspected the visible app surface and Test Data area.

the observations and results that you make

- The deployed app loaded and exposed the table editor plus import/export-oriented Test Data panel in the current visible state.
- I did not force the detailed malformed-param cases through the app because the generator exposes the shared schema editor directly and gave clear evidence for the issue #253 classification behavior.
- No app-specific negative-validation defect was raised from this brief cross-surface check.

---
## 2026-06-29T22:13:00+01:00

- What you think you want to do and why

Review the evidence and decide whether any repeatable candidate defect should be written under `support/negative-validation-candidate-defects.md`.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Visually checked key screenshots:
  - `screenshots/negative-validation-number-int-duplicate-schema-ui.png`
  - `screenshots/negative-validation-unknown-command-clean-after-switch.png`
  - `screenshots/negative-validation-autoincrement-step-zero-after-switch.png`
- Compared observed behavior against issue #253 and PR #285 expectations.

the observations and results that you make

- No repeatable deployed-app defect was found in this negative-validation lane.
- The strongest result is positive: known invalid-param commands are allowed into Schema UI with row-level validation, while the unknown command still triggers a literal conversion prompt.
- Suspicious but not defect-classified: `string.fromCharacters(characters=[], length=4)` generated successfully. This may be valid behavior; it needs a product/spec oracle before being treated as a bug.
- Because no repeatable defect was found, I did not create a candidate defect file.
