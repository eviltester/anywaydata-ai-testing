---
## 2026-06-21T18:47:00+01:00

- What you think you want to do and why

Establish the negative-validation charter before substantive testing so the session stays focused on malformed parameters, boundary values, invalid combinations, deprecated or removed commands that may still be accepted or exposed, validator behavior, structured parameter constraints, and feedback quality on the deployed environment only.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created this log file at `docs/testing/20260621/issue-233-002/negative-validation-test-log.md` before interacting substantively with the application. Defined the intended heuristics for the rest of the session: malformed syntax, missing required values, extra unexpected values, wrong separators, mixed valid and invalid parameter sets, numeric boundaries, empty strings, whitespace-only values, duplicated keys, contradictory options, deprecated command discovery via UI help/examples, and feedback-quality assessment based on actual click destinations, opened tabs, resulting URLs, and visible runtime behavior.

the observations and results that you make

The charter is in place before substantive testing. The planned oracle is live behavior in the deployed app at `https://eviltester.github.io/grid-table-editor/`, especially actual click destinations, opened tab URLs, and visible runtime responses rather than relying on static snapshot URL fields alone.

---
## 2026-06-21T18:53:00+01:00

- What you think you want to do and why

Establish a negative-testing baseline from the live app and published docs so malformed-parameter checks can be tied to representative documented examples rather than invented syntax.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/` and clicked the `Open app.html` card. Observed the actual destination URL change to `https://eviltester.github.io/grid-table-editor/app.html`. Expanded the `Test Data` section, switched the schema area from row mode to `Edit as Text`, and opened the published docs in a second tab for representative examples and migration notes:

- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/method-picker-ui-spec/`

Used the docs examples as seeds, then set schema text in the live app and clicked `Generate`. The first attempt used keyboard entry with `Enter` presses, then I switched to direct textarea value-setting because keyboard entry collapsed the content into a single-line visual rendering and was not trustworthy as an oracle for multiline schema validity. Confirmed a positive control with:

`FirstName`
`person.firstName()`

Then exercised a published domain quick example from the docs:

`FirstName`
`person.firstName()`
`Direction`
`location.cardinalDirection(abbreviated=true)`

the observations and results that you make

The positive control worked: after clicking `Generate`, the app showed `Generate complete. Grid updated.`, changed the grid header from `~rename-me` to `FirstName`, populated one row with a generated first name, and kept the URL on `https://eviltester.github.io/grid-table-editor/app.html`.

The published domain example did not work. The grid stayed unchanged, the toolbar showed `Schema validation failed. Grid unchanged.`, and the schema panel showed a specific row-level validation message: `Row 2: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`. This is repeatable and creates a strong docs/runtime mismatch because the live published domain docs page currently presents `location.cardinalDirection(abbreviated=true)` as a quick example.

The initial keyboard-entry attempt also showed a tooling-sensitive but still noteworthy workflow risk: pressing `Enter` while trying to compose multiline schema text did not yield a usable baseline and resulted in the app reporting `Schema validation failed. Grid unchanged.` until the schema was set more directly. I did not treat that as a product defect yet because the stronger product-facing signal is the stale docs example failing under real generation.

---
## 2026-06-21T18:56:00+01:00

- What you think you want to do and why

Probe deprecated command handling, direct faker example handling, structured-parameter rejection, and boundary-value behavior so I can see whether the validator blocks bad input early, degrades to generic errors, or leaks runtime failures into generated output.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

In the same live app session on `https://eviltester.github.io/grid-table-editor/app.html`, I replaced the schema text and clicked `Generate` for each of these cases:

1. Deprecated migration note case from the domain docs:
`Sentence`
`domain.helpers.fake("Hi")`

2. Supported faker helper path from the faker docs:
`Sentence`
`helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`

3. Direct faker example shape from the faker docs:
`Direction`
`faker.location.cardinalDirection({ abbreviated: true })`

4. Invalid numeric boundary ordering:
`Num`
`number.int(min=47, max=32)`

5. Exact numeric boundary:
`Num`
`number.int(min=32, max=32)`

6. Structured parameter with an unexpected extra keyword:
`IBAN`
`finance.iban(formatted=true, countryCode="GB", extra=true)`

After each generate action I checked the visible toolbar message, grid contents, row count, and any schema-panel validation message.

the observations and results that you make

`domain.helpers.fake("Hi")` was rejected. The app showed `Schema validation failed. Grid unchanged.` and did not update the prior grid content. I did not get a specific row-level explanation for this one in the visible schema panel, so the feedback quality was weaker than the stale `abbreviated=true` domain example.

`helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")` worked. The app showed `Generate complete. Grid updated.`, replaced the grid column with `Sentence`, and rendered a generated sentence such as `Hi, my name is Lynne McLaughlin!`. This confirms the migrated helper path is accepted in the deployed environment.

`faker.location.cardinalDirection({ abbreviated: true })` failed with only the generic `Schema validation failed. Grid unchanged.` message. I did not get an explanatory row-level error. This matters because the live faker docs still show the direct faker example with object-literal syntax, so a reader can easily be led into an input shape that fails without good guidance.

`number.int(min=47, max=32)` produced the most concerning runtime behavior in this pass. The app reported `Generate complete. Grid updated.` even though the generated grid cell value became `**ERROR**`. That means the malformed boundary combination was not blocked during validation and the success message was misleading. This is repeatable and is stronger than a simple validation miss because the UI claims success while surfacing an obvious error sentinel in the data grid.

`number.int(min=32, max=32)` worked and generated `32`, which is a useful control showing that the boundary family itself is wired up and that the bad `min > max` case is a combination problem rather than a blanket failure of numeric generation.

`finance.iban(formatted=true, countryCode="GB", extra=true)` failed with the generic `Schema validation failed. Grid unchanged.` message. Again, the rejection path did not expose a helpful row-level explanation in the visible schema panel, so structured-parameter feedback appears inconsistent: some invalid combinations get specific row diagnostics, while others collapse to a generic failure message.

Repeatability across this pass:

- stale domain docs example failure: repeatable
- deprecated `domain.helpers.*` rejection: repeatable
- valid `helpers.fake(...)` generation: repeatable in principle; observed once successfully
- reversed numeric bounds producing `**ERROR**` under a success banner: repeatable
- extra keyword rejection on `finance.iban(...)`: repeatable

---
## 2026-06-21T18:58:00+01:00

- What you think you want to do and why

Close the subagent pass by generating concrete follow-up ideas for broader coverage so the main agent can decide which additional negative or consistency checks should run immediately versus later.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed the live results already gathered from the deployed app and the docs pages opened during this session, then generated follow-up ideas targeted at malformed parameters, deprecated commands, docs/runtime mismatches, and validator-feedback consistency.

the observations and results that you make

New ideas for the main agent:

1. Execute-now: test `date.between(from=1659312000000, to=1577836800000)` to see whether reversed temporal bounds validate early, produce `**ERROR**`, or silently coerce.
2. Execute-now: test `finance.iban(formatted=false, countryCode="DE")` as a positive control against the docs example before adding malformed finance cases.
3. Execute-now: test duplicate keyword arguments such as `number.int(min=1, min=2, max=3)` to see whether duplicate names are rejected explicitly.
4. Execute-now: test wrong scalar type shapes such as `number.int(min="a", max="z")` for type-specific feedback quality.
5. Execute-now: test empty required values such as `finance.iban(formatted=true, countryCode=)` to see whether parse errors are clear or generic.
6. Execute-now: test trailing commas like `number.int(min=1, max=3,)` to check parser strictness and messaging.
7. Execute-now: test whitespace-heavy variants like `person.firstName( )` and `number.int( min = 32 , max = 32 )` to ensure benign formatting is accepted consistently.
8. Execute-now: switch back to row mode and compare whether the same malformed commands get better or worse feedback than text mode.
9. Execute-now: inspect whether the visible help or picker surfaces still expose the stale `abbreviated=true` example or other deprecated syntax inside the app, not just in published docs.
10. Execute-now: test whether `faker.helpers.fake(...)` is accepted in addition to bare `helpers.fake(...)`, since the docs discuss faker-prefixed helper usage.
11. Defer: search more domain pages for other named-argument examples that may have drifted from runtime validators.
12. Defer: test multi-column mixed validity where one rule is valid and one is invalid to see whether generation is all-or-nothing or partially updates.
13. Defer: test `How Many?` boundary values such as `0`, negative values, and very large values combined with malformed schemas to assess message prioritization.
14. Defer: test copy/export after a `**ERROR**` row is generated to see whether invalid runtime output can be propagated into downstream formats.
15. Defer: compare the same malformed cases on any other schema-editing surface mentioned in the method-picker spec to see whether validation consistency holds across surfaces.

The strongest findings to hand back are:

- a live published docs example fails with a precise validator error
- a deprecated command path is rejected while the migrated helper path succeeds
- some malformed structured parameters only get generic failure feedback
- reversed numeric bounds can escape validation and yield `**ERROR**` in the grid while the toolbar still claims generation completed successfully

---
## 2026-06-21T18:57:00+01:00

- What you think you want to do and why

Execute the Loop 2 follow-up checks to compare malformed temporal bounds, duplicate keyword handling, and row-mode versus text-mode feedback for the stale `location.cardinalDirection(abbreviated=true)` docs example.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Stayed on the deployed app at `https://eviltester.github.io/grid-table-editor/app.html` and used the existing `Test Data` schema editor only.

1. In text mode, set the schema to:
`Date`
`date.between(from=1659312000000, to=1577836800000)`
Then clicked `Generate`.

2. In text mode, replaced the schema with:
`Num`
`number.int(min=1, min=2, max=3)`
Then clicked `Generate`.

3. For row-mode versus text-mode comparison on the stale docs example:
- in text mode, set the schema to
`Direction`
`location.cardinalDirection(abbreviated=true)`
- clicked `Generate` and captured the visible feedback
- clicked `Edit as Schema` to switch the same invalid schema into row mode
- inspected the resulting row controls, selected command display, params field, and inline status message

the observations and results that you make

`date.between(from=1659312000000, to=1577836800000)` did not validate early. It behaved like the earlier reversed numeric range case: the toolbar reported `Generate complete. Grid updated.`, the grid column changed to `Date`, and the generated cell value became `**ERROR**`. This is a repeatable false-success pattern for reversed bounds in another command family, not just `number.int(...)`.

`number.int(min=1, min=2, max=3)` in text mode failed with the generic toolbar message `Schema validation failed. Grid unchanged.` and did not update the previous grid. Text mode did not expose a row-level explanation on its own.

Row-mode versus text-mode comparison for the stale docs example produced a clear feedback difference:

- Text mode for `location.cardinalDirection(abbreviated=true)` showed the generic toolbar error `Schema validation failed. Grid unchanged.` after clicking `Generate`.
- After switching the same invalid schema into row mode, the UI preserved the invalid command and parameters in structured controls:
  - column name `Direction`
  - source type `domain`
  - command `location.cardinalDirection`
  - params `(abbreviated=true)`
- Row mode also exposed a precise inline validation message:
  `Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`

The duplicate-keyword case also became more diagnosable in row mode. When the invalid text-mode schema was switched into row mode, the params field showed `(min=1, min=2, max=3)` and the inline status read:
`Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min"`

So the comparison outcome is consistent across at least two malformed-input families:

- text mode tends to collapse failures to the generic top-level `Schema validation failed. Grid unchanged.`
- row mode retains the invalid structure and surfaces a more actionable inline validator message naming the offending argument

This makes row mode the stronger diagnostic surface, but it also highlights a feedback-quality gap because users entering the same bad syntax in text mode receive much less specific guidance.

---
