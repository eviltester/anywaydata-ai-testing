---
## 2026-07-02T23:47:58+01:00

- What you think you want to do and why

Start the UX/usability and workflow regression lane for issue #295 / PR #305, keeping this lane deployed-only and focused on the generator, method picker, help, schema editor, params editor, and related flows. The reason is that enum params now need to be discoverable and editable from the schema UI without regressing existing non-enum params.

actions

Confirmed the output folder exists at docs/testing/20260702/issue-295-001/. Confirmed this lane owns logs/ux-regression-test-log.md. Reviewed the session prompt, existing main log, and sibling lane setup enough to avoid duplicating setup work. Reconfirmed the local git hook path is .githooks. I will not run local verify/build/package-manager/repo test commands and will not edit app code.

Techniques planned: exploratory testing, risk-based testing, state/flow modeling, consistency/oracle checking against visible help and docs, keyboard heuristics where practical, and regression sampling for existing non-enum params.

observations

Existing setup already proved the deployed site can be opened and clicked. This lane will add fresh browser proof within the UX flow itself, then test: method picker to params editor, dropdown selection, applying params back to schema rows, preview/generate, help open/close, keyboard navigation, and non-enum params such as boolean/string/numeric/object-like inputs.
---
---
## 2026-07-02T23:51:01+01:00

- What you think you want to do and why

Prove the main issue #295 story path in the deployed generator before looking for regressions: use the method picker to choose an enum-param command, open the params editor, select an enum value from a dropdown, apply it back to the row, then preview and generate.

actions

Opened https://eviltester.github.io/grid-table-editor/site/, clicked Use The Application, then clicked the deployed app Generator link to https://eviltester.github.io/grid-table-editor/generator.html.

On the generator row, changed Field type from egex to domain, opened Select domain command, filtered methods with location.countryCode, reviewed the method details panel showing ariant as optional num, and used Enter to apply location.countryCode. Filled Column Name with country. Opened Edit params for location.countryCode, selected lpha-3 from the ariant value enum dropdown, confirmed generated params showed (variant="alpha-3"), and clicked Apply. Set Preview Items Count and Generate Rows to 5, clicked Preview, then clicked Generate Data.

observations

The deployed generator exposed ariant value as a real dropdown with Unset, lpha-2, lpha-3, and 
umeric. Applying the params editor wrote (variant="alpha-3") back into the row. Preview output was CSV with five 3-letter country codes: SJM, NLD, BIH, BGD, ASM. Generate Data reported Download ready: generated-data.csv and left the same generated preview visible. This is a pass for the core enum-param workflow.
---
---
## 2026-07-02T23:51:14+01:00

- What you think you want to do and why

Correct the previous UX lane log entry in append-only form because PowerShell interpreted Markdown backticks as escape sequences and mangled several words. The test result itself is unchanged.

actions

Clean restatement of the previous entry: opened https://eviltester.github.io/grid-table-editor/site/, clicked Use The Application, then clicked the deployed app Generator link to https://eviltester.github.io/grid-table-editor/generator.html.

On the generator row, changed Field type from regex to domain, opened Select domain command, filtered methods with location.countryCode, reviewed the method details panel showing variant as optional enum, and used Enter to apply location.countryCode. Filled Column Name with country. Opened Edit params for location.countryCode, selected alpha-3 from the variant value enum dropdown, confirmed generated params showed (variant="alpha-3"), and clicked Apply. Set Preview Items Count and Generate Rows to 5, clicked Preview, then clicked Generate Data.

observations

The deployed generator exposed variant value as a real dropdown with Unset, alpha-2, alpha-3, and numeric. Applying the params editor wrote (variant="alpha-3") back into the row. Preview output was CSV with five 3-letter country codes: SJM, NLD, BIH, BGD, ASM. Generate Data reported Download ready: generated-data.csv and left the same generated preview visible. This is a pass for the core enum-param workflow.
---
---
## 2026-07-02T23:57:21+01:00

- What you think you want to do and why

Broaden the UX regression pass beyond the first happy path: check additional enum params, a numeric-looking enum, existing non-enum params, schema text-mode round-trip, help open/close behavior, and keyboard behavior where practical. Also record suspected defects and follow-up ideas from this lane.

actions

Tested `person.firstName` through the deployed method picker. Opened the current command button, filtered `person.firstName`, observed method details showing `sex` as optional enum, clicked the filtered option, then used the picker `Apply` button. Opened `Edit params for person.firstName`, opened the inline `sex` help tooltip, selected `male` from the `sex value` dropdown, applied `(sex="male")`, set the column name to `first_name`, and clicked `Preview`.

Tested `string.uuid` through the deployed method picker. Filtered `string.uuid`, observed method details showing `version` as optional enum and `refDate` as `string|number|date`, applied the command, opened params, selected `7` from the `version value` dropdown, confirmed generated params `(version=7)`, applied, named the column `uuid_v7`, and previewed.

Tested non-enum params on `string.uuid`: reopened params, entered `2026-06-18T00:00:00.000Z` into `refDate value`, observed generated params `(version=7,refDate=2026-06-18T00:00:00.000Z)`, then entered the same value with quotes as `"2026-06-18T00:00:00.000Z"`, applied `(version=7,refDate="2026-06-18T00:00:00.000Z")`, and previewed successfully. Saved screenshot evidence of the unquoted invalid modal state at `../screenshots/ux-regression-refdate-unquoted-param-invalid.png`.

Repeated the raw `refDate` issue in a fresh deployed generator tab: changed field type to `domain`, selected `string.uuid` from the picker, opened params, selected `version=7`, entered raw `2026-06-18T00:00:00.000Z`, applied the generated bare params, and clicked `Preview`.

Tested non-enum numeric/string params on `autoIncrement.sequence`: selected the method, opened params, set `start value` to `10`, `step value` to `5`, `prefix value` to `ID-`, and `zeropadding value` to `3`. Confirmed generated params `(start=10,step=5,prefix="ID-",zeropadding=3)`, applied, named the column `seq`, and previewed. Toggled `Edit as Text`, verified the schema text was `seq` followed by `autoIncrement.sequence(start=10,step=5,prefix="ID-",zeropadding=3)`, then toggled back with `Edit as Schema` and verified the row restored the same command and params.

Tested help open/close behavior: clicked the `Data Generator Instructions` help icon, observed the `Generator Screen Overview` tooltip, clicked the same help icon again, pressed Escape, and clicked elsewhere on the page. Saved screenshot evidence at `../screenshots/ux-regression-help-tooltip-sticky.png`. Also observed similar behavior in the params editor: opening the `sex` row help worked, clicking the same `Show help` control did not collapse it, and pressing Escape closed the whole params dialog rather than just the tooltip.

Keyboard notes: pressing Enter in the method picker search/filter after narrowing to `location.countryCode` applied the selected method and closed the picker. Escape in the params editor closed the editor dialog, not just the active tooltip.

observations

Passing coverage:

- `location.countryCode` enum workflow passed end to end: picker details exposed `variant`, params editor rendered `Unset`, `alpha-2`, `alpha-3`, `numeric`, Apply wrote `(variant="alpha-3")`, Preview generated 3-letter country codes, and Generate Data reported `Download ready: generated-data.csv`.
- `person.firstName` enum workflow passed: picker details exposed `sex`, params editor rendered `Unset`, `female`, `male`, Apply wrote `(sex="male")`, and Preview generated male first-name samples: `Emerson`, `Orlando`, `Giovanny`, `Kieran`, `Nick`.
- `string.uuid` numeric-looking enum workflow passed: params editor rendered `version` choices `Unset`, `4`, `7`, generated raw `(version=7)`, and Preview generated v7-looking UUID values.
- `autoIncrement.sequence` non-enum numeric/string params passed: integers stayed raw, the plain string prefix was auto-quoted as `prefix="ID-"`, Preview generated `ID-010`, `ID-015`, `ID-020`, `ID-025`, `ID-030`, and row/text schema mode round-tripped the params.
- The method picker selection model is usable: click selects an option for review, picker `Apply` commits it, and Enter also applies the current filtered selection. I do not consider the click-only behavior a defect because the picker has an explicit Apply action.

Suspected defects / repeatable UX issues:

1. `string.uuid` params editor serializes `refDate` as a bare value when the user enters an ISO date without quotes. Exact repeat steps: fresh deployed generator at `https://eviltester.github.io/grid-table-editor/generator.html`; change first row field type to `domain`; open `Select domain command`; filter `string.uuid`; click `Apply`; open `Edit params for string.uuid`; select `version value` = `7`; enter `2026-06-18T00:00:00.000Z` in `refDate value`; observe generated params `(version=7,refDate=2026-06-18T00:00:00.000Z)`; click `Apply`; click `Preview`. Result: Preview fails and status shows `Row 1: invalid domain params - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`. Expected UX: for a text/date-like params editor field, either auto-quote the value like plain `string` params do, require/guide quote entry before Apply, or prevent applying a known invalid bare string. Evidence: `../screenshots/ux-regression-refdate-unquoted-param-invalid.png`; fresh repeat also produced the row-level preview error. Workaround: type quotes manually as `"2026-06-18T00:00:00.000Z"`, which generates `(version=7,refDate="2026-06-18T00:00:00.000Z")` and previews successfully.

2. Help tooltips can become sticky with no obvious close path. Exact steps: on the deployed generator page, click the `Data Generator Instructions` help icon; observe the `Generator Screen Overview` tooltip; click the same help icon again; press Escape; click elsewhere on the page. Result: tooltip remains visible. Evidence: `../screenshots/ux-regression-help-tooltip-sticky.png`. Related observation: in the params editor, the `sex` row help tooltip opened, the same `Show help` control did not collapse it, and Escape closed the whole params dialog instead of just dismissing the tooltip. Expected UX: repeat-click, Escape, outside click, or a visible close affordance should dismiss help without forcing the user out of the current editor.

Follow-up test ideas from this lane:

1. execute-now - completed: Repeat raw `string.uuid(refDate=...)` from a fresh deployed generator tab to confirm the bare-value issue is repeatable.
2. execute-now - completed: Verify the quoted `refDate` workaround previews successfully, separating editor serialization from generator runtime behavior.
3. execute-now - completed: Compare a plain `string` param (`autoIncrement.sequence prefix`) against the `string|number|date` union param to see whether auto-quoting is type-specific.
4. execute-now - completed: Test schema row to text mode and back after params editor changes to catch row/text round-trip regressions.
5. execute-now - completed: Try repeat-click, Escape, and outside-click dismissal on the generator help tooltip.
6. defer: Test other union-typed params, especially params whose type string includes `string|number`, `date`, `array`, or object-like unions, to find whether bare serialization is broader than `string.uuid.refDate`.
7. defer: Run a keyboard-only method picker pass: Tab into picker, type filter, arrow through results, apply/cancel, and confirm focus returns to the row control.
8. defer: Test params editor Cancel after changing enum and non-enum values to confirm row params are unchanged.
9. defer: Test multiple-row schemas with one enum-param row and one non-enum-param row, then reorder rows and preview.
10. defer: Test stored schema history after saving/loading rows with enum params and quoted string params.
11. defer: Test method help links from `location.countryCode`, `person.firstName`, `string.uuid`, and `autoIncrement.sequence` for correct docs navigation and return path.
12. defer: Test generated data with Output Format changed away from CSV after enum params are applied, especially JSON and Markdown.
13. defer: Test params editor behavior at a narrow/mobile viewport where tooltip close behavior and modal table layout may be harder to use.
14. defer: Test commands with multiple enum params, if present, to verify generated param ordering and mixed unset/selected dropdown behavior.
15. defer: Test legacy free-text `Params` field manual edits after using the params editor, including whether reopening the editor parses manually quoted values back into the right controls.
---
