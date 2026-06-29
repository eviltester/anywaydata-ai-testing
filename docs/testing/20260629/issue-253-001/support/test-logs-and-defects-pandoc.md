# Test Logs And Defects Collation

This file contains the full content of the session logs and split defect reports.

## Main Log


---
## 2026-06-29T22:05:52+01:00

- What you think you want to do and why

Prove that the deployed test environment can be opened and controlled in a browser before any substantive exploratory testing, because the session rules require browser interaction proof and all testing must use the deployed environment.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used Playwright MCP to navigate to https://eviltester.github.io/grid-table-editor/site/ and then https://eviltester.github.io/grid-table-editor/site/app.html. Waited for the app shell to finish loading and clicked the Add Row button in the data grid.

the observations and results that you make

The landing page loaded with title AnyWayData - Data Table Editor & Generator. The app page loaded with title Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData. After clicking Add Row, the grid displayed one row and the status changed to Total rows: 1. Browser control is proven using Playwright MCP.

---
---
## 2026-06-29T22:06:33+01:00

- What you think you want to do and why

Create the mandatory planning stage before substantive testing so the session is driven by the actual story and PR changes rather than ad hoc UI poking.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed issue #253 with gh issue view, attempted to resolve the user-supplied PR #295, confirmed it is not available in viltester/grid-table-editor, then resolved PR #285 as the merged PR that closes issue #253. Saved support/issue-253.json, support/pr-285.json, and support/pr-285.diff. Wrote the initial mandatory planning sections to issue-253-test-report.md.

the observations and results that you make

The changed surface is broader than issue #253 alone: text/schema command classification, utoIncrement.sequence validation, grid filter preservation after generated/bulk changes, and duplicate-column/grid coverage. Six delegated lanes are required: the five requested lanes plus a grid/filter and duplicate-column regression lane to cover PR-specific gaps.

---
---
## 2026-06-29T22:11:29+01:00

- What you think you want to do and why

Execute Loop 1 broad command sampling against the deployed generator to verify the central issue path and avoid stopping at the first suspected behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created and ran support/main-loop1-command-sampling.js using bundled Node plus Playwright with NODE_PATH pointed at the bundled pnpm module store. The script navigated to https://eviltester.github.io/grid-table-editor/generator.html for each case, opened text schema mode, filled representative schema examples, clicked Edit as Schema, recorded the resulting mode/status/dialogs, and saved screenshots under screenshots/. Cases included 
umber.int(min=1, min=2, max=3), 
umber.int(min=1, max=3), invalid range, utoIncrement.sequence(step=0), negative zeropadding, valid sequence, an unknown command, malformed syntax, regex-style text, and literal command.

the observations and results that you make

The repeated scripted run showed the issue #253 story path works in the deployed generator: 
umber.int(min=1, min=2, max=3) switched into Schema UI and displayed row-level validation duplicate named argument "min". Valid examples switched cleanly. utoIncrement.sequence invalid step=0 and negative zeropadding switched to Schema UI with clear row-level validation. Unknown command 
otAReal.command(value=1) stayed in text mode with unknown-command feedback. Evidence is in support/main-loop1-command-sampling.md and support/main-loop1-command-sampling.json.

---
---
## 2026-06-29T22:17:33+01:00

- What you think you want to do and why

Perform Loop 2 by reviewing Loop 1 evidence and completed subagent logs, generating new ideas from uncovered command families, validators, docs examples, and output formats, then executing all in-scope ideas.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed support/command-coverage-findings.md and support/negative-validation-findings.md. Generated 12 Loop 2 ideas in support/main-loop2-ideas.js: duplicate params on utoIncrement.sequence, duplicate params on location.cardinalDirection, malformed quotes, valid/malformed string.fromCharacters structured arrays, docs helper examples helpers.mustache and helpers.fake, person.fullName, unknown person.notACommand, JSON/Markdown output sweep, plus two deferred ideas. Ran the harness against https://eviltester.github.io/grid-table-editor/generator.html. A first attempt hit transient GitHub Pages connection reset and locator strictness, so reran with retry logic and exact Preview button locator.

the observations and results that you make

Loop 2 confirmed duplicate named parameters on utoIncrement.sequence and location.cardinalDirection remain editable in Schema UI with row-level validation. Valid structured arrays, helpers.mustache, helpers.fake, and person.fullName() generated successfully. Unknown person.notACommand() stayed in text mode with unknown-command feedback. JSON and Markdown output formats generated successfully for a mixed 
umber.int + utoIncrement.sequence schema. Deferred ideas: full combinatorial output-format sweep and source/spec oracle for empty arrays. Docs subagent found one repeatable docs defect: published Faker Helpers example helpers.uniqueArray(this.word.sample, 5) is rejected while helpers.uniqueArray(faker.word.sample, 5) works. Responsive/accessibility subagent found four repeatable candidate accessibility/responsive defects.

---
---
## 2026-06-29T22:23:17+01:00

- What you think you want to do and why

Perform Loop 3 by reviewing the new Loop 2 results and subagent candidate defects, then executing at least 10 new ideas focused on docs/runtime mismatch, accessibility, responsive touch targets, keyboard behavior, and control checks.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Generated 12 Loop 3 ideas in support/main-loop3-ideas.js. Executed 10 in-scope ideas against deployed URLs: rechecked the Faker Helpers docs/runtime helpers.uniqueArray(this.word.sample, 5) failure, performed the working helpers.uniqueArray(faker.word.sample, 5) control, scanned app/generator landmarks and H1s at desktop/mobile/narrow mobile, scanned mobile touch target sizes in app and generator, repeated method picker Tab sequence on mobile and desktop, and repeated generator schema row Tab sequence on desktop and mobile. Deferred two ideas: manual screen-reader confirmation and full cross-browser keyboard comparison.

the observations and results that you make

Loop 3 confirmed the docs/runtime mismatch: helpers.uniqueArray(this.word.sample, 5) fails while the nearby aker.word.sample form works. It confirmed app.html has no main landmark and no H1 at sampled viewports while generator has both. It confirmed app/generator have visible mobile controls below 24px. It reduced one candidate: the method picker Tab sequence moved from Filter methods through category controls in the main-agent repeat, so it is not packaged as a confirmed defect from this session. The schema row Tab sequence moved from Column Name to body and then row action buttons before field type/value, which remains a keyboard-order/usability defect but not the exact 'trapped on Column Name' symptom.

---
---
## 2026-06-29T22:28:59+01:00

- What you think you want to do and why

Perform the mandatory final review loop before generating PDFs, checking the story requirements, PR summary and changed files, accumulated logs, coverage model, sampled command families, docs reviewed, examples tried, defects found, and remaining gaps.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Generated 12 final-review ideas in support/final-review-ideas.js. Classified 10 as xecute-now and 2 as defer. Executed the in-scope ideas against deployed URLs: rechecked issue #253 exact example, rechecked unknown command distinction, rechecked valid padded utoIncrement.sequence, rechecked invalid step=0, checked app and generator console errors on load, checked the Faker Helpers docs page is reachable, checked defect videos exist and are non-empty, checked screenshots referenced by defect files exist, and checked all six subagent logs exist. Deferred production nywaydata.com comparison as out of deployed test environment scope and local source diff audit as contrary to the deployed-only/no-local-test rule.

the observations and results that you make

Final review confirmed 
umber.int(min=1, min=2, max=3) still switches to Schema UI with row-level duplicate-param validation. Unknown person.notACommand() remains text mode with unknown-command feedback. Valid padded utoIncrement.sequence generates expected filename values. Invalid step=0 remains row-level validation. App and generator loaded without console errors. Four defect videos are present and non-empty. Defect screenshot references are valid. All six subagent logs exist. Stopping is justified because broad story/PR coverage, three main loops, a final review loop, subagent coverage, and defect packaging are complete, and recent loops produced confirmation/refinement rather than new functional failures.

---

## Subagent Logs


### command-coverage-test-log.md

---
## 2026-06-29T22:16:00+01:00
'- What you think you want to do and why'
Confirm the current charter, remote issue/PR relationship, and artifact boundaries before testing so this lane stays deployed-only and does not repeat the already-opened PR #295 dead end.
actions
- Created/reused the requested lane folders under `docs/testing/20260629/issue-253-001/`.
- Checked existing session files and confirmed this lane will add `logs/command-coverage-test-log.md`, `support/command-coverage-findings.md`, and optional candidate-defect notes only.
- Queried GitHub with `gh` for issue #253, PR #285, and the user-supplied PR #295.
observations
- Issue #253 is closed and was closed by PR #285.
- PR #285 is merged as "Fix auto defect regressions"; it specifically mentions known commands with invalid params, schema/text switching, row-level validation, and `autoIncrement.sequence` validation.
- PR #295 could not be resolved as a pull request in `eviltester/grid-table-editor`.
- No local repo verify/build/test/package-manager commands were run.
---
## 2026-06-29T22:22:00+01:00
'- What you think you want to do and why'
Scout the deployed pages and harvest currently documented command examples so command coverage is grounded in advertised behavior and visible app controls.
actions
- Opened `https://eviltester.github.io/grid-table-editor/site/` and saved `screenshots/command-coverage-001-site-home.png`.
- Opened `https://eviltester.github.io/grid-table-editor/site/app.html` and saved initial/load screenshots.
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` and saved `screenshots/command-coverage-004-generator-loaded.png`.
- Visited deployed docs pages for schema definition, literal, faker, domain, auto-increment sequences, counterstrings, and regex.
- Saved harvested doc headings/code samples in `support/command-coverage-doc-examples.json`.
observations
- The home page exposes App and Docs links; the app page exposes grid/import/export controls; the generator page exposes row-mode schema editing, `Edit as Text`, generation options, preview, and output controls.
- The docs advertise schema shorthand, literal values, enum/regex/domain/faker commands, structured params such as `location.direction(abbreviated=true)`, helper calls such as `helpers.fake(...)`, counterstrings, and `autoIncrement.sequence(...)`.
- The `autoIncrement.sequence` docs describe `start`, `step`, `prefix`, `suffix`, and `zeropadding`.
---
## 2026-06-29T22:34:00+01:00
'- What you think you want to do and why'
Execute a broad schema-command matrix in the deployed generator to confirm valid examples generate data and invalid validators fail with command-aware messages rather than silent literals or generic errors.
actions
- Used the deployed generator text schema editor and Preview action.
- Ran 12 schema cases covering enum, regex, literal, inline schema examples, parameterized domain commands, structured params, faker/helper commands, counterstrings, valid `autoIncrement.sequence`, duplicate params, unknown commands, and invalid `autoIncrement.sequence` params.
- Saved detailed results to `support/command-coverage-matrix-results.json`.
- Saved screenshots for representative valid and invalid states under `screenshots/command-coverage-case-*.png`.
observations
- Valid enum/regex/literal examples generated CSV preview rows.
- Inline docs examples such as `Status: enum("Open","In Progress","Closed")` generated rows.
- Parameterized domain examples generated bounded/structured values, e.g. `number.int(min=32, max=47)`, `location.direction(abbreviated=true)`, and `finance.iban(formatted=true, countryCode="GB")`.
- Faker/helper examples generated composed fake strings, e.g. `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`.
- `autoIncrement.sequence()` and `autoIncrement.sequence(start=10, step=5)` generated `1,2,3` and `10,15,20` respectively.
- `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)` generated `filename001.txt`, `filename006.txt`, `filename011.txt`.
- Invalid duplicate params failed with `Invalid keyword arguments: duplicate named argument "min"`.
- `autoIncrement.sequence(step=0)` failed with `argument "step" must be a non-zero integer`.
- `autoIncrement.sequence(zeropadding=-1)` failed with `argument "zeropadding" must be greater than or equal to 0`.
- Unknown command `unknown.command(foo=1)` failed with `Unknown keyword: unknown.command`.
---
## 2026-06-29T22:40:00+01:00
'- What you think you want to do and why'
Verify the text-to-schema switching boundary for invalid known commands versus unknown commands because issue #253 was specifically about not converting known commands with bad params to literals.
actions
- Entered invalid schemas in text mode, then clicked `Edit as Schema`.
- Retested `number.int(min=1, min=2, max=3)`, `autoIncrement.sequence(step=0)`, `autoIncrement.sequence(zeropadding=-1)`, and `unknown.command(foo=1)`.
- Saved switch-boundary details to `support/command-coverage-switch-results.json`.
- Saved screenshots under `screenshots/command-coverage-switch-*.png`.
observations
- Known command with duplicate params switched to schema row mode as `domain` / `number.int` with params preserved and row-level validation.
- Known `autoIncrement.sequence(step=0)` switched to schema row mode as `domain` / `autoIncrement.sequence` with params preserved and row-level validation.
- Known `autoIncrement.sequence(zeropadding=-1)` switched to schema row mode as `domain` / `autoIncrement.sequence` with params preserved and row-level validation.
- Unknown `unknown.command(foo=1)` did not silently convert; it displayed the convert-invalid-definitions prompt, which is the expected boundary for unknown or malformed command definitions.
- No repeatable deployed defect was found in this command-coverage lane.
---

### docs-consistency-test-log.md

---
## 2026-06-29T22:16:00+01:00

- What you think you want to do and why

Establish the docs/help/content consistency lane for issue #253 and PR #285 before substantive deployed-site review. This lane needs to compare published docs and in-app help/examples against actual deployed app/generator behavior, especially the known-command invalid-parameter change and related command definition/example surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created this append-only lane log at `docs/testing/20260629/issue-253-001/logs/docs-consistency-test-log.md`. Reviewed remote GitHub context only:

- Issue #253: `https://github.com/eviltester/grid-table-editor/issues/253`
- User-supplied PR #295: not resolvable in `eviltester/grid-table-editor`
- Resolved PR #285: `https://github.com/eviltester/grid-table-editor/pull/285`, merged and closing issue #253
- Deployed environment: `https://eviltester.github.io/grid-table-editor/site/`

Planned focused coverage:

1. Browser proof and deployed page inventory across site/app/generator/docs.
2. Published docs/help pages around schema definition, domain commands, Faker commands, auto-increment sequences, and app/generator workflows.
3. Runtime comparison for examples related to known commands with invalid params, `autoIncrement.sequence`, `number.int`, and visible command picker/help details.
4. Removed/stale/misleading command examples and missing or thin documentation.
5. Candidate defect notes only under `support/docs-consistency-candidate-defects.md`; no final defect files from this lane.

the observations and results that you make

The docs lane oracle is the deployed GitHub Pages environment and linked deployed app/generator/docs pages. No local repo build, verify, test, or package-manager commands will be run.

---
## 2026-06-29T22:20:00+01:00

- What you think you want to do and why

Prove deployed browser control before using the live app and docs as the consistency oracle.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used Playwright automation with the installed Chrome executable to open `https://eviltester.github.io/grid-table-editor/site/`. Captured the deployed landing page, clicked the visible `Use The Application` link, waited for `https://eviltester.github.io/grid-table-editor/site/app.html`, then clicked the app `Add Row` button. Saved evidence:

- `support/docs-consistency-browser-proof.json`
- `screenshots/docs-consistency-001-site-home.png`
- `screenshots/docs-consistency-002-app-opened-from-site.png`
- `screenshots/docs-consistency-003-app-add-row-proof.png`

the observations and results that you make

Browser interaction is proven. The deployed home page title was `AnyWayData - Data Table Editor & Generator`. The app page title was `Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData`. After clicking `Add Row`, the app reported `Total rows: 1`.

---
## 2026-06-29T22:24:00+01:00

- What you think you want to do and why

Inventory the deployed docs/help pages that can describe or contradict the changed command/schema behavior in issue #253 and PR #285.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Fetched and rendered deployed pages only, then extracted page titles, headings, links, and code snippets. Pages reviewed included:

- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/autoIncrement`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/rest-api`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun`

Saved support artifacts:

- `support/docs-consistency-page-inventory.json`
- `support/docs-consistency-page-inventory.md`
- `support/docs-consistency-page-matches.json`
- `screenshots/docs-consistency-004-docs-inventory-last-page.png`

the observations and results that you make

The docs inventory found current examples for `number.int`, `autoIncrement.sequence`, and `helpers.mustache`. It did not find visible user-facing docs for `image.urlLoremFlickr`. The Faker Helpers docs still publish `helpers.uniqueArray(this.word.sample, 5)`, which required runtime comparison because previous command parsing changes make callback syntax a high-risk content area. The reviewed docs do not describe the issue #253 text-to-Schema-UI distinction directly; the runtime app/generator behavior is the oracle for that workflow.

---
## 2026-06-29T22:31:00+01:00

- What you think you want to do and why

Compare the issue #253 known-command invalid-params behavior against the contrasting unknown-command behavior in the deployed generator and app schema editor.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

In `https://eviltester.github.io/grid-table-editor/generator.html`, clicked `Edit as Text`, entered:

```text
Num
number.int(min=1, min=2, max=3)
```

Clicked `Edit as Schema`, then clicked `Preview`. Repeated the relevant text-to-schema switch on `https://eviltester.github.io/grid-table-editor/site/app.html` inside the `Test Data` schema editor. For the contrasting path, entered:

```text
Bad
person.notACommand()
```

Clicked `Edit as Schema` in the generator. Saved evidence:

- `support/docs-consistency-known-invalid-params.json`
- `support/docs-consistency-known-invalid-preview.json`
- `support/docs-consistency-unknown-command-switch.json`
- `support/docs-consistency-app-known-invalid-params.json`
- `screenshots/docs-consistency-006-known-invalid-text-mode.png`
- `screenshots/docs-consistency-007-known-invalid-schema-mode.png`
- `screenshots/docs-consistency-008-known-invalid-preview-error.png`
- `screenshots/docs-consistency-009-unknown-command-switch.png`
- `screenshots/docs-consistency-022-app-known-invalid-text-mode.png`
- `screenshots/docs-consistency-023-app-known-invalid-schema-mode.png`

the observations and results that you make

The deployed generator and app both preserved the issue #253 known command as an editable Schema UI row: column `Num`, source `domain`, command `number.int`, params `(min=1, min=2, max=3)`. No literal-conversion prompt appeared for this known command with invalid params. The row showed `invalid domain params - Invalid keyword arguments: duplicate named argument "min"`. In contrast, `person.notACommand()` stayed in text mode with `failed domain validation - Unknown keyword: person.notACommand` and displayed the `Convert invalid definitions?` prompt. This matches the intended distinction between known command/invalid params and unknown command.

---
## 2026-06-29T22:39:00+01:00

- What you think you want to do and why

Copy published examples into the deployed generator and compare their behavior with docs/help surfaces, especially command families touched by PR #285 and command-definition/example surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Tested these examples in the deployed generator preview:

- `Filename / autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
- `Build / autoIncrement.sequence(start=10, step=0)`
- `Build / autoIncrement.sequence(zeropadding=-1)`
- `Sentence / helpers.mustache("Hello {{name}}", { name: "Ada" })`
- `Words / helpers.uniqueArray(this.word.sample, 5)`
- `Words / helpers.uniqueArray(faker.word.sample, 5)`
- `Num / number.int(min=32, max=47)`

Opened the command picker/help surface for `number.int` and `autoIncrement.sequence`, searched for removed `urlLoremFlickr`, and captured app Test Data help/scout information. Saved evidence:

- `support/docs-consistency-autoincrement-runtime.json`
- `support/docs-consistency-runtime-examples.json`
- `support/docs-consistency-command-selection-surface.json`
- `support/docs-consistency-command-picker-number-int.json`
- `support/docs-consistency-picker-removed-current.json`
- `support/docs-consistency-app-help-scout.json`
- `screenshots/docs-consistency-010-autoincrement-valid.png`
- `screenshots/docs-consistency-011-autoincrement-step-zero.png`
- `screenshots/docs-consistency-012-autoincrement-negative-zeropadding.png`
- `screenshots/docs-consistency-013-helpers-mustache.png`
- `screenshots/docs-consistency-014-helpers-uniquearray-this-word.png`
- `screenshots/docs-consistency-015-helpers-uniquearray-faker-word.png`
- `screenshots/docs-consistency-016-number-int-valid.png`
- `screenshots/docs-consistency-017-command-selection-surface.png`
- `screenshots/docs-consistency-018-command-picker-number-int.png`
- `screenshots/docs-consistency-019-picker-urlLoremFlickr-absent.png`
- `screenshots/docs-consistency-020-picker-autoincrement-sequence.png`
- `screenshots/docs-consistency-021-app-test-data-scout.png`

the observations and results that you make

Consistent examples: documented `number.int(min=32, max=47)` generated values in range; documented `helpers.mustache("Hello {{name}}", { name: "Ada" })` generated `Hello Ada`; documented `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)` generated padded filenames such as `filename001.txt`, `filename006.txt`, and `filename011.txt`. PR-specific invalid examples produced useful validation: `step=0` reported `argument "step" must be a non-zero integer`; `zeropadding=-1` reported `argument "zeropadding" must be greater than or equal to 0`.

Mismatch: the published Faker Helpers example `helpers.uniqueArray(this.word.sample, 5)` was rejected with `Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`. The equivalent `helpers.uniqueArray(faker.word.sample, 5)` worked and generated arrays of five sampled words. The command picker did not show `urlLoremFlickr`; searching for it returned `No methods match the current filter`. The picker details for `number.int` and `autoIncrement.sequence` showed parameter details and usage examples consistent with the sampled runtime behavior.

---
## 2026-06-29T22:46:00+01:00

- What you think you want to do and why

Close the docs/help/content consistency lane by summarizing confirmed coverage, suspected content drift, missing/removed commands, and deferred follow-up ideas without creating final defect files.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Visually checked representative screenshots for the known invalid params state and the rejected `helpers.uniqueArray(this.word.sample, 5)` example. Wrote:

- `support/docs-consistency-findings.md`
- `support/docs-consistency-candidate-defects.md`

the observations and results that you make

Confirmed one repeatable candidate docs/content defect: Faker Helpers documents `helpers.uniqueArray(this.word.sample, 5)`, but the deployed generator rejects that exact example; `helpers.uniqueArray(faker.word.sample, 5)` works. No final defect files were created. Positive consistency: issue #253 text-to-Schema-UI behavior is fixed in both app and generator, `autoIncrement.sequence` docs/help/runtime agree for sampled examples and validators, `number.int` docs/help/runtime agree for sampled examples, and removed `urlLoremFlickr` was absent from reviewed user-facing docs and picker search.

---

### grid-filter-regression-test-log.md

---
## 2026-06-29T22:11:02+01:00

- What you think you want to do and why

Start the grid/filter and duplicate-column regression lane by scouting the deployed app surface and confirming the controls needed for PR #285's grid-specific risk areas. This lane needs to focus on active filter preservation after generated or bulk mutations, plus duplicate-column copy/export behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/app.html` in Chromium through Playwright Core using the deployed page only. Inspected visible controls, data roles, grid buttons, Test Data controls, schema text area, generation modes, duplicate-column header control, global filter input, and import/export preview controls. Saved `screenshots/grid-filter-regression-001-app-scout.png`.

the observations and results that you make

The deployed app exposes the required lane controls: global filter input, clear filters, generation modes `New Table`, `Amend Table`, and `Amend Selected`, the schema text editor, Tabulator header controls including `Duplicate column`, and CSV/text preview/copy controls. The Test Data panel starts collapsed, so subsequent steps explicitly open it before interacting with generation controls.

---
## 2026-06-29T22:18:06+01:00

- What you think you want to do and why

Exercise the PR #285 filter-preservation behavior with generated-data replacement and amendment, because the PR changed the Tabulator adapter to reapply active filters after bulk/generated mutations.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed app at `https://eviltester.github.io/grid-table-editor/site/app.html`. Opened the Test Data panel, switched the schema editor to text mode, and generated `CaseId` data with `autoIncrement.sequence`.

Workflow 1, new-table replacement:
- Generated 5 rows from `CaseId` / `autoIncrement.sequence(start=100,step=1)`.
- Applied global filter `202`, leaving no visible rows in the `100` through `104` dataset.
- Changed schema to `autoIncrement.sequence(start=200,step=1)`.
- Generated a new 5-row table while the `202` filter was still active.
- Cleared the filter afterward to inspect the full underlying dataset.

Workflow 2, amend-table mutation:
- Generated 2 rows from `CaseId` / `autoIncrement.sequence(start=2,step=1)`.
- Applied global filter `2`, leaving only the `2` row visible.
- Changed schema to `autoIncrement.sequence(start=100,step=1)`.
- Generated in `Amend Table` mode with row count `1` while the `2` filter was still active.
- Cleared the filter afterward to inspect the full underlying dataset.

Saved screenshots `grid-filter-regression-002-new-table-baseline.png` through `grid-filter-regression-008-clear-filter-after-amend.png` and structured observations in `support/grid-filter-regression-run.json`.

the observations and results that you make

Workflow 1 passed. Before replacement, filter `202` showed 0 visible rows from total rows 5. After the new-table replacement, the filter value remained `202`, total rows remained 5, and exactly one visible row, `202`, was shown. After clearing the filter, the full dataset was `200`, `201`, `202`, `203`, `204`.

Workflow 2 passed. Before amendment, filter `2` showed one visible row from total rows 2. After amendment, the filter value remained `2`, total rows stayed 2, and the visible row count changed to 0. After clearing the filter, the full dataset showed `100` and `3`, confirming the amended row no longer matched the active filter and the filter had been reapplied.

---
## 2026-06-29T22:19:50+01:00

- What you think you want to do and why

Cover the related duplicate-column/copy regression behavior from PR #285 and check nearby deployed app/generator/docs links without creating final defect files unless a repeatable defect is found.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed app at `https://eviltester.github.io/grid-table-editor/site/app.html`. Generated `CaseId` rows from `autoIncrement.sequence(start=10,step=1)`, used the header `Duplicate column` control, completed the naming dialog with `CaseIdCopy`, filtered the duplicated grid with global filter `11`, cleared filters, switched preview to CSV, accepted the `Set Text From Grid` confirmation, clicked `Copy`, and read browser clipboard text back through the automated browser context. Also opened `https://eviltester.github.io/grid-table-editor/generator.html` and `https://eviltester.github.io/grid-table-editor/site/docs/` as deployed link checks.

Saved screenshots `grid-filter-regression-009-duplicate-baseline.png` through `grid-filter-regression-014-docs-scout.png`. Saved structured run data to `support/grid-filter-regression-run.json`.

the observations and results that you make

Duplicate-column behavior passed. The duplicate action created `CaseIdCopy`; visible grid rows became `10/10`, `11/11`, and `12/12`. With global filter `11`, exactly one visible row remained and both duplicated values were `11`. CSV preview after clearing the filter contained headers `"CaseId","CaseIdCopy"` and all three copied rows. Clipboard readback matched the preview after normalizing line endings.

No page errors were captured. One Tabulator initialization warning and generic failed-resource console messages appeared; the only identified non-OK response in the final run was a 403 from a Google ad request on the docs page, so this was not treated as a grid/filter regression defect. The deployed generator and docs pages loaded for the scoped link check.

---

### negative-validation-test-log.md

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

### responsive-accessibility-test-log.md

---
## 2026-06-29T22:10:00+01:00

- What you think you want to do and why

Run a deployed-only responsive/mobile and accessibility review for issue #253 and merged PR #285, focusing on the app, generator, schema editor, method picker, help, and docs surfaces because the fix changed text-to-schema handling for known commands with invalid params and the user requested a dedicated responsive/accessibility lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed remote GitHub context with `gh`: issue #253 is closed, PR #285 is merged and closes issue #253, and PR #295 does not resolve in `eviltester/grid-table-editor`. Created this lane log plus support summary/candidate files under `docs/testing/20260629/issue-253-001/`. Browser work is constrained to deployed GitHub Pages URLs rooted at `https://eviltester.github.io/grid-table-editor/site/`.

the observations and results that you make

Issue #253 describes switching from text schema back to Schema UI when a known command has invalid params, using `number.int(min=1, min=2, max=3)` as the example. PR #285 summary says the expected fixed behavior is row-level validation in Schema UI rather than converting to literal. No local build/test/package-manager commands were run.

---
## 2026-06-29T22:18:00+01:00

- What you think you want to do and why

Prove browser interaction against the deployed environment and exercise the issue #253 schema switching path before broad responsive/accessibility scanning, because the lane should be grounded in the changed workflow rather than generic page inspection.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/` at `390x844`, captured `screenshots/responsive-accessibility-001-site-home-mobile.png`, clicked the visible `Use The Application` link, confirmed navigation to `https://eviltester.github.io/grid-table-editor/site/app.html`, and captured `screenshots/responsive-accessibility-002-app-mobile-after-cta.png`. Opened `https://eviltester.github.io/grid-table-editor/site/generator.html`, captured `screenshots/responsive-accessibility-003-generator-mobile-initial.png`, used `Edit as Text`, entered `Num\nnumber.int(min=1, min=2, max=3)`, clicked `Edit as Schema`, and saved screenshots `004` through `006`. Repeated the closer original flow at `1440x900`: row mode, set column `Num`, selected domain `number.int`, filled Params `(min=1, min=2, max=3)`, clicked `Edit as Text`, then `Edit as Schema`; saved screenshots `007` through `009` and support probes `support/responsive-accessibility-invalid-params-schema-probe.json` and `support/responsive-accessibility-invalid-params-row-text-row-probe.json`.

the observations and results that you make

Browser proof succeeded on deployed GitHub Pages. The direct text-mode entry showed a status `Num failed domain validation - Invalid keyword arguments: duplicate named argument "min"` and stayed visually in text mode after clicking `Edit as Schema`; this is suspicious but may not be the original setup. The row-mode-to-text-mode-to-row-mode repeat matched the PR #285 expectation: after clicking back to schema mode, the UI returned to row mode with `Column Name` = `Num`, field type `domain`, command `number.int`, Params `(min=1, min=2, max=3)`, and row-level status `Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min"`.

---
## 2026-06-29T22:32:00+01:00

- What you think you want to do and why

Run the responsive/mobile and accessibility lane across the public deployed surfaces and separate real layout/accessibility problems from invalid setup noise.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Sampled these deployed URLs at `1440x900`, `768x1024`, `390x844`, and `320x568`: `https://eviltester.github.io/grid-table-editor/site/`, `https://eviltester.github.io/grid-table-editor/site/app.html`, `https://eviltester.github.io/grid-table-editor/site/generator.html`, `https://eviltester.github.io/grid-table-editor/site/docs/intro/`, and `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`. Saved the broad scan as `support/responsive-accessibility-responsive-scan.json` and mobile screenshots under `screenshots/responsive-accessibility-*.png`. Also sampled `https://eviltester.github.io/grid-table-editor/site/docs/test-data/schema-definition/`, but it returned a GitHub Pages 404 and was discarded as an invalid guessed URL rather than filed.

the observations and results that you make

Home, app, generator, docs intro, and domain docs pages did not show page-level horizontal overflow at the sampled mobile/narrow widths after filtering expected offscreen skip links and scrollable docs code blocks. `site/app.html` still has no `main` landmark and no H1 at all sampled widths. App and generator controls remain dense on mobile: help icons are commonly `13x13`, schema inputs/selects are about `21px` tall, and many compact controls fall below 24px in at least one dimension. Docs pages generally expose H1/main landmarks and fit the viewport, with code examples scrolling inside their own blocks rather than forcing document-width overflow.

---
## 2026-06-29T22:42:00+01:00

- What you think you want to do and why

Target keyboard/focus behavior for the method picker and schema editor because those are the highest-risk accessibility surfaces in the issue #253 / PR #285 workflow.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

At `390x844` on `https://eviltester.github.io/grid-table-editor/site/generator.html`, changed the schema row field type to `domain`, clicked the `Select domain command` button, and saved `screenshots/responsive-accessibility-010-generator-mobile-method-picker-open.png` plus `support/responsive-accessibility-method-picker-mobile-probe.json`. Pressed Tab repeatedly in the open method picker using two automation paths and saved `support/responsive-accessibility-method-picker-tab-sequence.json` and `support/responsive-accessibility-method-picker-tab-sequence-repeat.json`. Pressed Escape and saved `support/responsive-accessibility-method-picker-after-escape.json` plus `screenshots/responsive-accessibility-011-generator-mobile-method-picker-after-escape.png`. Repeated schema row Tab order from `Column Name` on generator at `1440x900` and `390x844`, saved as `support/responsive-accessibility-generator-schema-tab-order.json`.

the observations and results that you make

The mobile method picker fits the viewport and exposes `role="dialog"` with `aria-modal="true"` and a labelled `Select schema method` dialog. The method list uses `role="listbox"` with `role="option"` children, which looks consistent with the prior ARIA-structure fix. Escape closed the dialog and returned focus to `Select domain command`. However, pressing Tab from `Filter methods` remained on the same input through repeated attempts in two passes. The generator schema row showed the same repeated keyboard blockage: pressing Tab from `Column Name` remained on `Column Name` through ten presses on both desktop and mobile, rather than moving to `Field type` or later row controls.

---

### ux-regression-test-log.md

---
## 2026-06-29T22:19:47+01:00
'- What you think you want to do and why'
Start the UX/usability lane for issue #253 / merged PR #285, preserve existing session artifacts, and keep the review deployed-only so the evidence reflects the public GitHub Pages environment rather than local code.
actions
- Confirmed issue #253 is closed and PR #285 is merged, closes issue #253, and includes the schema text-to-UI invalid-param fix plus related `autoIncrement.sequence` and grid/filter changes.
- Confirmed user-supplied PR #295 is not resolvable in `eviltester/grid-table-editor`.
- Reused `docs/testing/20260629/issue-253-001/` and created this lane log because `logs/ux-regression-test-log.md` was absent at lane start.
- Used browser automation against deployed URLs only:
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data/`
- Did not run local repo verify, build, test, package-manager, or app commands.
observations
- The public site and generator pages rendered from GitHub Pages after retrying through transient `ERR_CONNECTION_RESET`/resource-load noise.
- The app route and docs category route rendered directly from the deployed site.
- Existing command-coverage artifacts were already present; this lane added only UX-prefixed screenshots and support files.
---
## 2026-06-29T22:24:00+01:00
'- What you think you want to do and why'
Exercise the core issue workflow: a known command with invalid params should be able to move from text schema back into Schema UI without asking to convert to literal, while malformed or unknown commands should still be protected.
actions
- Opened `generator.html`, switched from Schema UI to `Edit as Text`, entered `Num` plus `number.int(min=1, min=2, max=3)`, then switched back to Schema UI.
- Repeated the same text-to-schema flow with `Seq` plus `autoIncrement.sequence(start=1, step=0)`.
- Repeated with unknown command text `Mystery` plus `notARealDomain.command(foo=1)`.
- Captured:
  - `screenshots/ux-regression-004-generator-loaded-for-text-mode.png`
  - `screenshots/ux-regression-005-edit-as-text-open-valid.png`
  - `screenshots/ux-regression-006-known-invalid-params-switch.png`
  - `screenshots/ux-regression-007-known-invalid-step-switch.png`
  - `screenshots/ux-regression-008-unknown-command-switch.png`
- Saved raw state in `support/ux-regression-schema-switch-results.json`.
observations
- `number.int(min=1, min=2, max=3)` switched into Schema UI as a domain row with command `number.int`, params `(min=1, min=2, max=3)`, and row-level validation: `invalid domain params - Invalid keyword arguments: duplicate named argument "min"`.
- `autoIncrement.sequence(start=1, step=0)` switched into Schema UI as a domain row with command `autoIncrement.sequence`, params `(start=1, step=0)`, and row-level validation: argument `step` must be a non-zero integer.
- Neither known-invalid command showed the literal-conversion dialog.
- The unknown command stayed in text mode and showed the `Convert invalid definitions?` dialog, which is the intended distinction from known-invalid params.
---
## 2026-06-29T22:31:00+01:00
'- What you think you want to do and why'
Check recovery and generation behavior after invalid-param validation so the fix does not leave users stuck or produce misleading output.
actions
- With `number.int(min=1, min=2, max=3)` in Schema UI, clicked `Preview`.
- Edited the params field directly to `(min=1, max=3)` and clicked `Preview` again.
- Captured:
  - `screenshots/ux-regression-009-invalid-before-preview.png`
  - `screenshots/ux-regression-010-invalid-preview-click.png`
  - `screenshots/ux-regression-011-recovered-valid-preview.png`
- Saved raw state in `support/ux-regression-workflow-results.json`.
observations
- Preview with invalid duplicate params kept the row-level schema error visible and did not generate output.
- After correcting params to `(min=1, max=3)`, the error cleared and preview generated a CSV preview plus table rows with values in the expected range.
- Error recovery was local and understandable: the user could edit the params field without returning to text mode or accepting literal conversion.
---
## 2026-06-29T22:38:00+01:00
'- What you think you want to do and why'
Cover method-picker and help affordances around schema editing because PR #285 changed classification paths that users reach through both text and UI workflows.
actions
- Started from a clean generator page.
- Named a column `Email`, changed field type to `domain`, opened `Select domain command`, inspected the method picker.
- Navigated within the picker to `internet.email`, selected it, and applied the method.
- Clicked a visible help affordance while the picker was open.
- Captured:
  - `screenshots/ux-regression-012-domain-row-ready.png`
  - `screenshots/ux-regression-013-method-picker-open.png`
  - `screenshots/ux-regression-014-method-picker-search-email.png`
  - `screenshots/ux-regression-015-method-picker-email-applied.png`
  - `screenshots/ux-regression-016-help-affordance-after-click.png`
observations
- The method picker opened in a modal with visible close, cancel, and apply controls.
- The picker showed method names, descriptions, schema snippets, parameter details, parameter required/optional status, examples, and an `Open documentation` link for the selected method.
- `internet.email` details were visible and showed optional parameters including `allowSpecialCharacters`, `firstName`, `lastName`, and `provider`.
- Scripted search input did not behave like real typing in this automation pass, so no defect is claimed from that signal.
---
## 2026-06-29T22:44:00+01:00
'- What you think you want to do and why'
Lightly check the deployed app and docs routes linked from the public site so this UX lane covers the deployed workflow surfaces around generator/schema editing.
actions
- Loaded the public site route and captured `screenshots/ux-regression-001-site-proof-retry.png`.
- Loaded the deployed app route directly and captured `screenshots/ux-regression-021-app-direct.png`.
- Loaded the docs generating-data category and captured `screenshots/ux-regression-022-docs-generating-data-category.png`.
- Saved route state in `support/ux-regression-app-docs-results.json`.
observations
- The app route rendered the grid editor with toolbar controls, filter, reset, test-data panel, import/export panel, preview controls, and output-format tabs.
- The docs generating-data category rendered current navigation for Test Data Generation, Data Grid Editable, Generate to File, Schema Definition, domain/faker data, and Auto Increment Sequences.
- A guessed docs URL for a data-generator page returned a GitHub Pages 404 and was not counted as a product defect because it was not a fetched link from the UI.
- A separate site/app click run produced unstyled output during transient resource-load trouble; direct route retry rendered correctly, so that unstyled run was not counted as a repeatable product defect.
---
## 2026-06-29T22:49:00+01:00
'- What you think you want to do and why'
Finalize the lane notes by classifying confirmed behavior, suspicious but non-defect observations, and deferred ideas without creating final defect files.
actions
- Reviewed screenshots and raw browser states from the UX lane.
- Wrote `support/ux-regression-findings.md`.
- Wrote `support/ux-regression-candidate-defects.md`.
observations
- No repeatable UX/workflow regression defect was confirmed in this lane.
- The issue #253 acceptance behavior appears fixed on the deployed generator: known commands with invalid params stay editable in Schema UI and show row-level errors, while unknown commands still get literal-conversion protection.
- Deferred deeper coverage includes real keystroke method-picker search, mobile/narrow viewport, and deeper app grid/filter mutation coverage.
---

## Defects


### defect-001-docs-helpers-uniquearray-this-word.md

# DEF-001 - Published Faker Helpers `helpers.uniqueArray(this.word.sample, 5)` example is rejected by deployed generator

Status: confirmed repeatable defect  
Severity: Medium  
Area: published docs / generator runtime consistency  
Affected docs URL: https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/  
Runtime URL: https://eviltester.github.io/grid-table-editor/generator.html

## Summary

The published Faker Helpers docs show `helpers.uniqueArray(this.word.sample, 5)` as an example, but the deployed generator rejects that syntax. A nearby equivalent using `faker.word.sample` works, which makes this a stale or misleading docs/runtime mismatch rather than a general helper failure.

## Steps To Reproduce

1. Open https://eviltester.github.io/grid-table-editor/generator.html.
2. Click `Edit as Text`.
3. Enter:

```text
Words
helpers.uniqueArray(this.word.sample, 5)
```

4. Click `Preview`.

## Observed Result

The generator displays:

```text
Words failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

## Expected Result

A published docs example should either execute successfully in the deployed generator or clearly state that it is not direct generator syntax. If `faker.word.sample` is the supported syntax, the docs should use that form.

## Repeatability

Repeated by the docs-consistency subagent and again in main Loop 3. Repeatable.

## Control Check

This similar schema works and generates arrays of sampled words:

```text
Words
helpers.uniqueArray(faker.word.sample, 5)
```

## Evidence

![Rejected docs example](screenshots/defect-001-docs-helpers-uniquearray-this-word.png)

![Working control example](screenshots/defect-001-control-helpers-uniquearray-faker-word.png)

Video: [defect-001-docs-helpers-uniquearray-this-word.webm](videos/defect-001-docs-helpers-uniquearray-this-word.webm)

Supporting data:

- `support/docs-consistency-runtime-examples.json`
- `support/main-loop3-ideas-results.json`

### defect-002-app-missing-main-h1.md

# DEF-002 - Deployed app page lacks a main landmark and H1

Status: confirmed repeatable defect  
Severity: Medium  
Area: accessibility / page structure  
Affected URL: https://eviltester.github.io/grid-table-editor/site/app.html

## Summary

The deployed app page exposes the editor UI but does not include a `main` landmark or an H1. This makes orientation harder for keyboard and assistive-technology users, especially because the editor surface is dense and has many controls.

## Steps To Reproduce

1. Open https://eviltester.github.io/grid-table-editor/site/app.html.
2. Inspect the DOM or accessibility structure.
3. Check for `main`, `[role="main"]`, and `h1` elements.
4. Repeat at desktop and mobile viewport sizes.

## Observed Result

DOM probes found:

```text
main landmarks: 0
h1 elements: 0
```

This repeated at `1440x900`, `390x844`, and `320x568`.

## Expected Result

The app page should expose a main landmark and a page-level heading so users can identify and jump to the primary editor content.

## Repeatability

Repeated by the responsive/accessibility subagent and main Loop 3. Repeatable.

## Evidence

![App page mobile view](screenshots/defect-002-app-missing-main-h1-mobile.png)

Video: [defect-002-app-missing-main-h1.webm](videos/defect-002-app-missing-main-h1.webm)

Supporting data:

- `support/responsive-accessibility-responsive-scan.json`
- `support/main-loop3-ideas-results.json`

### defect-003-sub-24px-touch-targets.md

# DEF-003 - App and generator mobile controls include sub-24px touch targets

Status: confirmed repeatable defect  
Severity: Medium  
Area: mobile usability / accessibility  
Affected URLs:

- https://eviltester.github.io/grid-table-editor/site/app.html
- https://eviltester.github.io/grid-table-editor/generator.html

## Summary

Mobile scans found multiple visible interactive controls below 24px in at least one dimension. Examples include 13x13 help icons, small docs links, and schema row inputs/selects around 19-21px high. These controls are difficult to operate reliably on touch devices and fall below the WCAG 2.2 target-size floor used as the review heuristic.

## Steps To Reproduce

1. Open the app or generator at a mobile viewport such as `390x844`.
2. Inspect visible interactive controls (`button`, `a`, `input`, `select`, `textarea`).
3. Measure their rendered bounding boxes.
4. Note controls with width or height below 24px.

## Observed Result

Examples from the deployed app/generator include:

- Help icons around `13x13`.
- Generator field type select around `312x19`.
- Schema row inputs around `320x21`.
- Several mobile nav/doc links under 24px high.

## Expected Result

Interactive controls should provide at least a 24px target area, and preferably larger touch-friendly targets in mobile layouts.

## Repeatability

Repeated by the responsive/accessibility subagent and main Loop 3. Repeatable.

## Evidence

Red outlines mark controls below 24px in at least one dimension.

![App small touch targets](screenshots/defect-003-app-sub-24px-touch-targets.png)

![Generator small touch targets](screenshots/defect-003-generator-sub-24px-touch-targets.png)

Video: [defect-003-sub-24px-touch-targets.webm](videos/defect-003-sub-24px-touch-targets.webm)

Supporting data:

- `support/responsive-accessibility-responsive-scan.json`
- `support/main-loop3-ideas-results.json`

### defect-004-schema-row-tab-order.md

# DEF-004 - Generator schema row keyboard order skips from Column Name to page/body and row action controls before Field Type

Status: confirmed repeatable defect  
Severity: Medium  
Area: keyboard usability / schema editor workflow  
Affected URL: https://eviltester.github.io/grid-table-editor/generator.html

## Summary

When keyboard focus starts in the first schema row `Column Name` field, pressing Tab does not move directly to the next logical data-entry field (`Field type`) or value/command controls. In the main-agent repeat, focus moved to the document body and then through row action buttons such as drag/reorder/insert/remove before reaching the core editing controls. This makes schema row entry inefficient and confusing for keyboard users.

## Steps To Reproduce

1. Open https://eviltester.github.io/grid-table-editor/generator.html.
2. Focus the first schema row `Column Name` input.
3. Press Tab repeatedly.
4. Observe the focused element after each Tab.
5. Repeat on desktop and mobile viewport sizes.

## Observed Result

Main Loop 3 focus sequence began:

```text
Column Name input
BODY
Drag field to reorder
Insert field after this row
Remove field
...
```

The responsive/accessibility subagent also reported repeated keyboard-order problems around the schema row.

## Expected Result

Tab should move through the row's primary editing controls in a predictable order, such as `Column Name` -> `Field type` -> command/value/params controls -> constraints/additional row controls. Row management controls can remain reachable, but should not interrupt the primary data-entry path immediately after the first field.

## Repeatability

Repeated by responsive/accessibility lane and main Loop 3, with main Loop 3 refining the symptom from a trap to a poor/non-intuitive tab order. Repeatable.

## Evidence

![Schema row tab order](screenshots/defect-004-schema-row-tab-order.png)

Video: [defect-004-schema-row-tab-order.webm](videos/defect-004-schema-row-tab-order.webm)

Supporting data:

- `support/responsive-accessibility-generator-schema-tab-order.json`
- `support/main-loop3-ideas-results.json`


