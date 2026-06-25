# Issue 230 Test Logs and Defects

This collates the full content of the main log, all subagent logs, and all defect markdown files for PDF export.

## Main Sequential Log

---
## 2026-06-25 22:32:40 +01:00

- What you think you want to do and why

Create the required dated/ordinal reporting folder and preserve the user goal prompt before any substantive testing. This keeps the test session auditable and satisfies the pre-testing artifact requirement.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created docs/testing/20260625/issue-230-001/ with logs, support, defects, and screenshots subfolders. Wrote the full session prompt to issue-230-session-goal-prompt.md. No application UI testing has been performed yet.

the observations and results that you make

The folder exists and the prompt artifact was written successfully. Next step is to prove browser control on https://eviltester.github.io/grid-table-editor/ using an MCP browser tool before substantial testing.

---
---
## 2026-06-25 22:33:14 +01:00

- What you think you want to do and why

Record the required browser-control proof and begin deriving the planning model from the live story/PR, because all substantive testing must be tied to the deployed environment and actual changed surface.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/ with Chrome DevTools MCP. Read the test environment landing content, which reported branch codex/230-method-picker-mvc, commit 04570e0e428d, built 2026-06-25T21:29:58.356Z. Clicked the visible Open app.html link, navigating to https://eviltester.github.io/grid-table-editor/app.html. Fetched GitHub API metadata for issue https://github.com/eviltester/grid-table-editor/issues/230 and PR https://github.com/eviltester/grid-table-editor/pull/247 into support/github-issue-230.json, support/github-pr-247.json, and support/github-pr-247-files.json.

the observations and results that you make

MCP browser control is available and can interact with the deployed test environment. The deployed test environment matches the PR head SHA reported by GitHub API: 04570e0e428dfe731cb489d97b5b804a5d7645c9. Issue 230 requests a MethodPickerDialogController + MethodPickerDialogView + createMethodPickerDialog component with Method Navigator, Method List, and Method Help Display subcomponents. PR 247 changes 21 files with 1689 additions and 795 deletions, so broad changed-surface planning is required before detailed execution.

---
---
## 2026-06-25 22:35:53 +01:00

- What you think you want to do and why

Complete the mandatory planning stage before substantive testing so the review is grounded in the story, PR, changed files, and live deployed command inventory.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed issue 230 and PR 247 metadata saved in support/. Opened https://eviltester.github.io/grid-table-editor/generator.html, changed the schema field source type to domain, clicked the visible Select domain command button, and inventoried the method picker dialog. Wrote the report planning sections: scope summary, risk analysis, changed-surface inventory, command coverage strategy, delegation map, Mermaid coverage diagram, and loop strategy.

the observations and results that you make

The live method picker opens as a component-backed dialog with Method Navigator, Method List, and Method Help Display surfaces. The dialog showed 36 tabs and 269 command tiles: 3 core commands, 252 domain commands, and 14 faker/helper commands. This confirms the broad command-definition and help-rendering surface is a primary coverage dimension even though the PR implementation files are concentrated around the method-picker components and compatibility wrapper.

---
---
## 2026-06-25 22:44:39 +01:00

- What you think you want to do and why

Complete Loop 1 reporting and execute Loop 2 focused rechecks from the initial gaps and subagent command/accessibility evidence.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed Galileo's command-coverage log and Erdos' responsive/accessibility log. In the deployed generator, executed Loop 2 ideas: commerce.price params via dialog, helpers.arrayElement params via dialog, enum/literal/regex via picker, datatype.enum search, no-match recovery, docs link href checks, and representative recent/search behavior. Saved support/loop2-focused-rechecks.json plus screenshots for commerce params, helper params, and core command picker flows. Created defect files AD-001, AD-002, and AD-003 under defects/.

the observations and results that you make

Loop 2 confirmed that commerce.price works correctly through the params dialog, but direct help-style params behave differently and appear ignored. helpers.arrayElement remains blocked through the params editor with unsafe/complex argument parsing errors despite the help example. Picker-applied literal generates output, but picker-applied enum and regex accept visible values and then produce no preview output; direct enum/regex rows generated output in Loop 1. datatype.enum search works in a focused retest. No-match search shows 'No methods match the current filter' and disables Apply, then recovers when a valid search is typed. Additional responsive/accessibility findings from Erdos were accepted as separate defect candidates.

---
---
## 2026-06-25 22:46:30 +01:00

- What you think you want to do and why

Perform the mandatory final review loop over story requirements, PR changes, accumulated logs, coverage model, command families, docs reviewed, examples tried, defects found, and remaining gaps.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed all six subagent logs plus support artifacts and defects. Generated 12 final-review ideas in support/final-review-executions.json. Classified 5 as execute-now and 7 as defer. Executed the in-scope deployed-browser checks: Apply focus restoration, Enter on a focused single result, background scroll while modal is open, top-level domain/faker help depth, and live-vs-Storybook docs-link bases. Added remaining negative-validation defect files NV-002 through NV-005.

the observations and results that you make

Final review reconfirmed Apply leaves focus on BODY rather than the picker trigger, Enter on a focused selected result leaves the dialog open and row command empty, PageDown scrolls the background page while the modal is open, domain/faker top-level help is much thinner than enum/literal/regex, and Storybook help links use production anywaydata.com while live generator links use the deployed GitHub Pages docs base. Deferred final-review ideas were broader exhaustive sweeps: all 269 commands, every helper params example, manual screen-reader testing, real mobile touch testing, constraints/pairwise matrix expansion, production-doc parity crawl, and multi-width visual regression.

---
---
## 2026-06-25 22:48:29 +01:00

- What you think you want to do and why

Package the completed exploratory review deliverables after the final review loop so the session has a readable report, collated evidence bundle, README, and PDF exports.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Wrote the final report to issue-230-test-report.md. Collated the full main log, all subagent logs, and all defect files into test-logs-and-defects.md. Created README.md with reading order. Generated issue-230-test-report.pdf and test-logs-and-defects.pdf using pandoc. No additional application UI interactions were performed in this packaging step.

the observations and results that you make

All required deliverables now exist under docs/testing/20260625/issue-230-001/. The final report includes the executive summary, planning summary, delegation summary, coverage model, loop summary, confirmed defects, risks, deferred ideas, gaps, screenshots, and recommendation. The collated PDF contains the complete logs and defect detail.

---


## Subagent Logs

### command-coverage-test-log.md

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Run a deployed-environment-only exploratory pass for command coverage and example execution. The goal is to sample the live method picker, actual schema insertion, generation behavior, visible command families, command help examples, parameter validators, and suspicious gaps without using local build/test/package-manager commands.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed app at https://eviltester.github.io/grid-table-editor/app.html and published GitHub PR metadata for https://github.com/eviltester/grid-table-editor/pull/247. Used Playwright/Chrome browser automation against the deployed page only. Did not run local verify/build/package-manager/repo test commands.

Opened the app, expanded the Test Data disclosure, identified the row-based schema editor, changed the first schema row between domain/faker/core command types, and used the visible Select domain command / Select faker command button to open the method picker. Captured live inventory to support/command-picker-live-inventory.json and support/command-coverage-results.json. Captured screenshots to screenshots/command-picker-domain-all-open.png and screenshots/command-picker-domain-inventory.png.

the observations and results that you make

The live picker exposed 36 tabs: All, Core, 32 domain category tabs, Faker, and Recently used. The initial All view exposed 269 command tiles. Sampled visible command families included core enum/literal/regex, domain families such as airline, commerce, datatype, internet, location, number, string, and Faker helpers such as helpers.arrayElement.

The picker help display rendered command summaries, schema names, parameter detail tables, parameter type tables, usage examples, return examples, and Open documentation links. The broad inventory did not show any separate deprecated/removed command group or visibly marked deprecated commands; only the current enum/literal/regex/domain/faker families appeared in row editing.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Prove actual insertion and execution for a simple domain command before testing more complex parameter cases. This distinguishes picker UI success from end-to-end generation success.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

On https://eviltester.github.io/grid-table-editor/app.html, expanded Test Data, selected row type domain, clicked Select domain command, searched for "city", selected location.city, read the help detail, clicked Apply, filled Column Name as city, set How Many to 3, and clicked Generate.

Data used:

- command: location.city
- column: city
- params: blank
- row count: 3

the observations and results that you make

Picker insertion worked. The row showed type domain, button text location.city, shadow select value location.city, params disabled with title "No documented params available".

Generation succeeded with "Generate complete. Grid updated.", "Total rows: 3", header city, and generated cells including North Laurence, Fort Linneamouth, and South Fabian in one run. This is a clean pass for no-param domain command insertion and execution.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Sample command help with multiple examples and constrained/structured parameters, because these are high-risk for mismatches between picker help, row params, validation, and generator execution.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Selected commerce.price via the method picker search. The help panel advertised multiple usage examples, including:

- Params field: (dec=2, max=10, min=1, symbol="$")
- Full call: commerce.price(dec=2, max=10, min=1, symbol="$")
- Also blank params and dec-only examples

First tried params without parentheses, min=10,max=20,dec=2, which produced "Schema validation failed. Grid unchanged." Then reran using help-style params exactly: (dec=2, max=20, min=10, symbol="$"), column price, row count 4.

the observations and results that you make

The help-style params allowed generation to complete, but the generated values did not reflect the requested min/max/symbol. Observed cells were 35.69, 426.99, 280.05, and 489.35: no "$" symbol and values outside 10-20. This is a defect candidate or at least suspicious behavior: the picker help says the params field syntax should constrain the result, but the generated output looked like defaults.

Evidence saved in support/command-coverage-valid-params-rerun.json.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Sample Faker/helper commands and required array parameters, because helpers.arrayElement has a required array and is an obvious real-world method picker use case.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Changed the row type to faker, clicked Select faker command, searched arrayElement, selected helpers.arrayElement, read the help, and clicked Apply. The picker inserted type faker, button text helpers.arrayElement, shadow select value helpers.arrayElement, and enabled the params editor.

Tried two params forms:

- array=["free","pro","enterprise"]
- exact help-style example adapted to values: (["free", "pro", "enterprise"])

Then filled column tier, set row count to 6, and clicked Generate.

the observations and results that you make

The first params form failed validation. The help-style params form also failed validation with: Row 1: invalid faker params - Invalid Faker API Call Cannot read properties of undefined (reading 'length'). This is a defect candidate because the picker help explicitly shows Params field: (["A", "B", "C"]) and Full call: helpers.arrayElement(["A", "B", "C"]), but using the equivalent params field in the live row did not generate data.

Deferred: retest through the params dialog itself, not just direct params input, to see whether the dialog serializes a different syntax.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Sample core commands through the new picker, especially since the picker includes Core even when opened from a domain row.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened the method picker from a domain row, searched enum, selected enum, clicked Apply, then filled column core_status and attempted to fill the visible Value / Regex field with alpha,beta,gamma before Generate.

Data used:

- command: enum
- column: core_status
- value: alpha,beta,gamma
- row count: 6

the observations and results that you make

Picker insertion changed the row type to enum and removed the command picker button, which is expected for core enum. Generation still failed with "Row 1: enum value is required." This may be invalid setup if the value field was not the right target after row-type transition, but it is suspicious because the visible row was filled after applying the core command and the error said no enum value reached validation.

Deferred: recheck core enum, literal, and regex in a manual browser pass with screenshots around the post-apply field state, then compare against typing those core rows without going through the picker.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Check search, recent commands, validators, and non-matching/visibility behavior to broaden coverage beyond happy-path selection.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used picker search terms city, price, arrayElement, datatype enum, and enum. After several Apply actions, opened the picker again and inspected the Recently used tab contents. Also sampled failed validation paths by intentionally using params without the help-required parentheses and by attempting required helper params.

the observations and results that you make

Search found location.city, commerce.price, helpers.arrayElement, and enum. A search for datatype.enum returned no selectable tile in one automated pass even though datatype appears as a domain tab and datatype.boolean/datatype.enum were visible in the shadow select inventory; this needs a focused retest before calling it a defect.

Recently used populated with enum, commerce.price, location.city, and helpers.arrayElement after those commands were applied. In the automation snapshot the recent tab's active class did not update before the immediate read, but the list content did update, so I am treating that as timing noise rather than a confirmed UI issue.

Validator behavior was useful but terse: invalid params resulted in "Schema validation failed. Grid unchanged." and row-specific messages for helper/core cases. No console/network diagnostics were used in this subagent lane.

---
## 2026-06-25 22:40:55 +01:00

- What you think you want to do and why

Record coverage, gaps, suspicious behavior, and follow-up ideas so the main exploratory review can combine this lane with other subagent lanes.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed saved support artifacts:

- support/command-picker-live-inventory.json
- support/command-coverage-results.json
- support/command-coverage-valid-params-rerun.json

Screenshots captured:

- screenshots/command-picker-domain-all-open.png
- screenshots/command-picker-domain-inventory.png

Sampled families:

- Core: enum via picker
- Domain no params: location.city
- Domain constrained params/multiple examples: commerce.price
- Domain structured params search attempt: datatype.enum
- Faker/helper required params: helpers.arrayElement
- Picker state: All, domain categories, Faker, Recently used, search, Apply

Deferred families:

- date.between / date.future structured dates
- number.int / number.float numeric boundaries
- internet.email / internet.password helpers with optional params
- string.uuid / string.fromCharacters
- regex and literal direct core rows
- params dialog UI serialization
- constraints textarea execution
- Generate Combinations / pairwise path
- text schema mode parity
- docs links from help panel

the observations and results that you make

Defect candidates / suspicious behavior:

1. commerce.price help-style params generated successfully but appeared ignored: no symbol and values outside min/max.
2. helpers.arrayElement help-style required array params failed with "Cannot read properties of undefined (reading 'length')".
3. enum selected through picker changed row type but generation still reported "enum value is required" after filling visible values.
4. datatype.enum search failed in one automated pass despite datatype command visibility elsewhere; needs retest.

Follow-up ideas:

1. Use the params dialog button for commerce.price and compare serialized params against direct typing.
2. Use the params dialog button for helpers.arrayElement and inspect whether it writes raw array, named array, or parenthesized syntax.
3. Retest commerce.price with each documented example exactly as shown: blank, dec-only, and full dec/max/min/symbol.
4. Retest commerce.price value ranges over 20+ generated rows to prove whether min/max are ignored or the first sample was stale/default.
5. Retest enum via picker with screenshots before Generate, then compare with selecting enum directly from the row type dropdown.
6. Retest literal and regex via picker from a domain row to see whether core type transitions preserve the value field.
7. Search datatype, boolean, and enum from both All and datatype tab to confirm whether search filtering or tab filtering hides datatype.enum incorrectly.
8. Check no-match search state: empty list text, Apply disabled state, Enter behavior, and recovery when clearing search.
9. Check / shortcut focus, Enter first-result selection, Escape cancel, close button, backdrop cancel, and focus return after each.
10. Check recent command ordering after duplicate selections and after reload/localStorage persistence.
11. Open documentation links from selected help entries and verify they match the command family and safe URL expectations.
12. Exercise date.between, number.int, internet.email, string.uuid, and helpers.fromRegExp with help examples.
13. Compare row GUI behavior with Edit as Text schema execution for the same commands.
14. Add a constraints pass using schema constraints with generated enum/domain values.
15. Sample removed/deprecated visibility against published docs or release notes to identify any commands that should no longer appear.

---


### docs-consistency-test-log.md

---
## 2026-06-25 23:06:00 +01:00

- What you think you want to do and why

Start the delegated docs/help/content consistency lane for issue #230. The PR is a MethodPickerDialog MVC refactor, so the high-risk documentation/content surface is not only published docs pages; it is also the live method picker help panel, Storybook docs/examples, and the generated docs links surfaced inside the dialog.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed the existing session context already saved under `docs/testing/20260625/issue-230-001/`:

- Issue #230: `https://github.com/eviltester/grid-table-editor/issues/230`
- PR #247: `https://github.com/eviltester/grid-table-editor/pull/247`
- Deployed environment: `https://eviltester.github.io/grid-table-editor/`
- Existing browser proof in `issue-230-test-log.md`: deployed environment reported branch `codex/230-method-picker-mvc`, commit `04570e0e428d`, built `2026-06-25T21:29:58.356Z`, then opened `https://eviltester.github.io/grid-table-editor/app.html`.
- PR changed-file inventory from `support/github-pr-247-files.json`.

Derived this docs-consistency charter from the user prompt and PR context:

- Compare app/generator method picker help, published docs, Storybook/docs surfaces, and practical runtime behavior where possible.
- Look for stale examples, misleading examples, missing help, removed commands still visible, new command/help items missing, unsafe/malformed documentation links, and pages reviewed.
- Stay on deployed/published surfaces only: GitHub Pages under `https://eviltester.github.io/grid-table-editor/` plus GitHub issue/PR pages and saved GitHub API artifacts.
- Do not run local verify/build/package-manager/repo test commands.

Techniques and heuristics selected:

- Consistency/oracle checking between live picker help, docs pages, Storybook docs, and runtime preview.
- Risk-based testing focused on changed method picker MVC files and help rendering utilities.
- Documentation testing for links, examples, stale terminology, and changed component names.
- State/flow modeling around tabs, search, selected method, help panel, docs link, and Apply behavior.
- Pairwise thinking across source type tabs (`core`, `domain`, `faker`, `recent`) and command families.
- Boundary/negative heuristics for empty search, no selected method, unsafe docs URLs, falsy examples, and parameter examples.

the observations and results that you make

Changed surfaces that matter to this lane:

- `apps/web/src/stories/method-picker-dialog.stories.js`: Storybook examples now use real method picker subcomponents and dialog.
- `packages/core-ui/js/gui_components/shared/method-picker-dialog/*`: new navigator, list, help display, dialog controller/view/utils.
- `packages/core-ui/js/gui_components/shared/test-data/ui/method-picker-modal.js`: compatibility service now delegates to the component dialog.
- `docs/frontend-component-architecture.md`, `docs/frontend-component-migration-plan.md`, `docs/frontend-legacy-ui-elimination-plan.md`: published/repo docs context for the component boundary, though not necessarily published to GitHub Pages.

Initial follow-up ideas to carry into loops:

1. Check whether deployed Storybook has a Method Picker Dialog page and whether its docs/examples match the PR claims.
2. Check whether live method picker help still exposes valid docs links for representative core, domain, and faker commands.
3. Compare `Parameter Details`, `Parameter Types`, usage examples, and return examples between app and generator pickers.
4. Search for stale text such as old modal terminology if Storybook/docs now present MVC component stories.
5. Verify that `recent` behavior is documented or at least self-explanatory in Storybook/help.
6. Check docs links opened from picker details for nested/root path safety.
7. Test help examples with falsy return values such as boolean/number-like commands if visible.
8. Check no-selection/empty-result help messaging for misleading copy.
9. Confirm removed/deprecated commands are not resurrected in the picker or docs search.
10. Review published docs pages for method picker/help references, not just command family pages.
11. Compare Storybook subcomponent stories (Navigator/List/Help Display/Dialog) if accessible.
12. Verify docs pages do not link to unsafe or malformed `javascript:`/blank docs URLs through rendered picker help.

---
---
## 2026-06-25 23:24:00 +01:00

- What you think you want to do and why

Run Loop 1 broad inventory across published docs and Storybook before narrowing into individual method help examples. This establishes which docs/help surfaces exist in the deployed environment and which pages should be treated as oracles for the picker help content.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used deployed/published surfaces only. Fetched and inspected these pages/metadata:

- `https://eviltester.github.io/grid-table-editor/storybook/index.json`
- `https://eviltester.github.io/grid-table-editor/storybook/project.json`
- `https://eviltester.github.io/grid-table-editor/storybook/?path=/docs/shared-method-picker-dialog--docs`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--navigator-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--list-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/commerce/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/location/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/`

Saved supporting data:

- `../support/docs-consistency-storybook-docs-audit.json`
- `../support/docs-consistency-storybook-story-inspection.json`
- `../support/docs-consistency-link-target-check.json`

Captured useful screenshots:

- `../screenshots/docs-consistency-storybook-method-picker-docs.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--help-display-with-usage.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--visual-always-open.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--navigator-default.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--list-default.png`

Storybook inventory found these Method Picker entries in the published index:

- `shared-method-picker-dialog--docs`
- `shared-method-picker-dialog--navigator-default`
- `shared-method-picker-dialog--list-default`
- `shared-method-picker-dialog--help-display-with-usage`
- `shared-method-picker-dialog--visual-always-open`
- `shared-method-picker-dialog--choose-faker-method`
- `shared-method-picker-dialog--filter-and-choose-domain-method`
- `shared-method-picker-dialog--cancel-method-selection`

the observations and results that you make

Positive observations:

- Published Storybook contains the expected Method Picker Dialog docs/stories from the changed story file.
- The Storybook story list names align with issue #230 subcomponents and flows: Navigator, List, Help Display, Visual dialog, choose/filter/cancel flows.
- Storybook iframe stories render actual method picker component content, not only placeholder docs.
- Published docs pages for sampled families resolve successfully: generating-data category, domain overview, commerce, datatype, internet, location, faker overview, and faker helpers.
- Sampled docs pages did not contain `href="javascript:` links in the fetched HTML.
- Sampled docs pages did not contain removed `image.urlLoremFlickr` / `urlLoremFlickr` text.

Storybook content observations:

- `Help Display With Usage` renders `internet.password` help with Parameter Details, Parameter Types, Usage Examples, return examples, and an `Open documentation` link.
- `Visual Always Open` renders tabs (`All`, `Core`, `commerce`, `internet`, `Faker`, `Recently used`), list entries, selected `helpers.arrayElement` help, and Apply/Cancel controls.
- `Navigator Default` renders the navigator tabs and action log text (`tab:core`).
- `List Default` renders representative list entries and action log text (`selected:commerce.price`).

Potential mismatch / defect candidate carried to Loop 2:

- Storybook method picker help links use `https://anywaydata.com/docs/...`, while the live deployed generator picker uses `https://eviltester.github.io/grid-table-editor/site/docs/...` for equivalent help links. Both targets resolve, but the link-base mismatch may matter in a deployed PR review environment.

Transient/tooling note:

- A rapid Storybook iframe batch hit one `net::ERR_CONNECTION_RESET`; retrying the same Storybook story URLs succeeded. I treated this as GitHub Pages/network flakiness, not an app defect.

---
---
## 2026-06-25 23:38:00 +01:00

- What you think you want to do and why

Run Loop 2 focused comparison between live method picker help, published docs examples, Storybook examples, and runtime behavior. The goal is to separate true content mismatches from acceptable example variation and invalid setup noise.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/generator.html` with installed Chrome through browser automation, staying on the deployed page. Captured initial proof screenshot:

- `../screenshots/docs-consistency-generator-open.png`

Changed the generator schema row type to `domain`, opened the live method picker, and captured:

- `../screenshots/docs-consistency-method-picker-domain-open.png`

Sampled live method picker help by searching and selecting these commands:

- `internet.password`
- `commerce.price`
- `helpers.arrayElement`
- `datatype.boolean`
- `internet.httpMethod`
- `image.urlLoremFlickr`

Saved extracted live help content and links to:

- `../support/docs-consistency-live-picker-samples.json`

Captured screenshots:

- `../screenshots/docs-consistency-live-picker-internet_password.png`
- `../screenshots/docs-consistency-live-picker-commerce_price.png`
- `../screenshots/docs-consistency-live-picker-helpers_arrayElement.png`
- `../screenshots/docs-consistency-live-picker-datatype_boolean.png`
- `../screenshots/docs-consistency-live-picker-internet_httpMethod.png`

Fetched docs snippets for the sampled commands and examples, saving:

- `../support/docs-consistency-doc-snippets.json`

Checked sampled live and Storybook docs link targets, saving:

- `../support/docs-consistency-link-target-check.json`

Executed a representative documented example through the deployed generator:

1. Selected `internet.httpMethod` from the method picker.
2. Applied the selection so the row command became `internet.httpMethod`.
3. Entered params exactly as `(excludes="patch, TRACE")`.
4. Initially clicked Preview with no column name and observed the valid validation message `Row 1: column name is required.`
5. Added column name `method`.
6. Clicked Preview again.
7. Captured `../screenshots/docs-consistency-httpmethod-runtime-preview-valid.png`.

Also opened `https://eviltester.github.io/grid-table-editor/app.html`, inspected the embedded schema panel, and attempted to open its method picker. The app page was inspected and screenshot captured:

- `../screenshots/docs-consistency-app-page-open.png`
- `../screenshots/docs-consistency-app-picker-attempt.png`

the observations and results that you make

Positive consistency observations:

- Live picker help for `internet.password`, `commerce.price`, `helpers.arrayElement`, `datatype.boolean`, and `internet.httpMethod` includes the expected sections: summary, schema/canonical call, Parameter Details, Parameter Types, Usage Examples, return examples where available, and `Open documentation`.
- Live picker docs links are valid deployed GitHub Pages links for sampled commands:
  - `internet.password` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
  - `commerce.price` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/commerce`
  - `helpers.arrayElement` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
  - `datatype.boolean` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype`
  - `internet.httpMethod` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
- Published docs snippets match the sampled picker help content for `internet.password`, `internet.httpMethod`, `commerce.price`, and `datatype.boolean` examples.
- `image.urlLoremFlickr` did not appear in the live picker search; clicking a tile for it timed out because no matching tile existed. This aligns with the removed/deprecated command expectation.
- The documented/runtime sample `internet.httpMethod(excludes="patch, TRACE")` produced CSV preview output after a required column name was supplied: `POST`, `PUT`, `GET`, and `CONNECT` appeared; `PATCH` and `TRACE` did not appear in the sample output.
- The initial blank preview was invalid setup, not product failure, because the page visibly reported `Row 1: column name is required.`
- Storybook `helpers.arrayElement` uses an `A/B/C` sample while published docs use `red/green/blue`; this appears to be harmless example variation rather than a stale or misleading example.

Potential mismatch / defect candidate:

- Created `../defects/docs-consistency-storybook-doc-link-base-mismatch-candidate.md` for the Storybook/live picker docs-link base mismatch. Storybook iframe examples link `Open documentation` to `https://anywaydata.com/docs/...`, while the live deployed generator picker links equivalent commands to `https://eviltester.github.io/grid-table-editor/site/docs/...`. Both target families resolve. Treat as low/medium only if Storybook is expected to stay inside the deployed PR review environment.

App page note / gap:

- `https://eviltester.github.io/grid-table-editor/app.html` contains an embedded schema panel, but the first Playwright select attempt targeted a hidden `Field type` select and timed out. A later DOM-level attempt changed the visible row to `domain`, but clicking the visible command picker button did not open a method picker modal in this headless run. Because this lane is docs/help focused and the generator picker is the practical working oracle, I logged this as a follow-up/gap rather than a confirmed docs defect.

---
---
## 2026-06-25 23:47:00 +01:00

- What you think you want to do and why

Perform the docs-consistency final review pass for handoff: verify artifacts exist, summarize coverage, classify new follow-up ideas, and stop once the remaining items are mostly broader regression/deep-sampling work rather than likely docs/content defects.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed this lane's accumulated log, support JSON, screenshots, and defect candidate file. Confirmed artifacts exist under the requested session folder:

- Log: `logs/docs-consistency-test-log.md`
- Support JSON: `support/docs-consistency-storybook-docs-audit.json`, `support/docs-consistency-storybook-story-inspection.json`, `support/docs-consistency-live-picker-samples.json`, `support/docs-consistency-doc-snippets.json`, `support/docs-consistency-link-target-check.json`
- Screenshots: generator open, method picker open, live picker command samples, Storybook Method Picker docs/stories, app inspection attempt, and `internet.httpMethod` runtime preview.
- Candidate defect: `defects/docs-consistency-storybook-doc-link-base-mismatch-candidate.md`

Classified additional follow-up ideas from final review:

1. execute-now - Confirm Storybook Method Picker entries exist in `storybook/index.json`. Completed in Loop 1.
2. execute-now - Render Storybook Help Display, Visual Dialog, Navigator, and List iframe stories. Completed in Loop 1.
3. execute-now - Validate sampled live picker docs links for domain, faker, and core-style commands. Completed in Loop 2.
4. execute-now - Check removed `image.urlLoremFlickr` is absent from picker/docs. Completed in Loop 2 and docs audit.
5. execute-now - Execute at least one documented parameterized example from picker/docs. Completed with `internet.httpMethod(excludes="patch, TRACE")`.
6. execute-now - Distinguish blank preview from app failure by checking validation state. Completed; missing column name was invalid setup.
7. execute-now - Compare Storybook and live picker docs-link bases. Completed and logged as a candidate.
8. defer - Deep-run every `commerce.price` parameter example and compare generated value constraints. Better suited to command coverage/negative validation lanes.
9. defer - Deep-run every `internet.password` parameter combination from docs. Better suited to command coverage/negative validation lanes.
10. defer - Audit every domain family docs link from the live picker, not just sampled families. Useful as a future crawl, but broad samples did not show a systemic broken-link pattern.
11. defer - Inspect app.html embedded schema picker with a headed browser to decide whether the headless non-opening attempt is a real app workflow issue. Better suited to UX/regression lane.
12. defer - Check whether Storybook docs page should contain richer prose beyond autogenerated story navigation. Product/docs decision needed.
13. defer - Compare production `anywaydata.com` docs content against GitHub Pages docs content for every sampled command. Current sampled targets resolved and key examples matched.
14. defer - Verify `Recently used` behavior has explicit documentation or tooltips. This is a UX/documentation enhancement rather than a confirmed inconsistency.
15. defer - Search all published docs HTML for stale old-modal wording such as `openMethodPickerModal`; initial page/content checks did not reveal user-visible stale Method Picker wording.

the observations and results that you make

Coverage completed:

- Published docs reviewed: generating-data category, domain overview, commerce, datatype, internet, location, faker overview, and faker helpers.
- Storybook surfaces reviewed: Method Picker docs entry plus Help Display, Visual Always Open, Navigator, and List stories.
- Live picker help sampled across core-ish/default (`enum` on open), domain (`internet.password`, `commerce.price`, `datatype.boolean`, `internet.httpMethod`), faker (`helpers.arrayElement`), new command (`internet.httpMethod`), and removed/deprecated command (`image.urlLoremFlickr`).
- Runtime behavior sampled with a published parameterized docs example: `internet.httpMethod(excludes="patch, TRACE")`.
- Link safety sampled for deployed docs links and Storybook links; no `javascript:` docs links found in sampled docs pages or rendered picker help.

Confirmed defect candidates:

1. Storybook/live picker docs-link base mismatch: `../defects/docs-consistency-storybook-doc-link-base-mismatch-candidate.md`. This is a candidate because both link target families resolve; severity depends on whether deployed Storybook should remain inside the PR GitHub Pages docs context.

Not defects from this lane:

- `internet.httpMethod` help/docs/runtime were consistent in the sampled deployed state.
- `commerce.price`, `internet.password`, and `datatype.boolean` picker help matched docs snippets for representative examples.
- `helpers.arrayElement` Storybook sample differs from published docs examples but remains valid-looking example variation.
- `image.urlLoremFlickr` was absent from sampled docs and live picker search.
- Blank preview after selecting `internet.httpMethod` was caused by missing column name; adding `method` produced valid preview output.

Stopping rationale:

The lane covered the requested docs/help/content consistency surfaces broadly enough for a subagent pass: published docs pages, Storybook docs/stories, live picker help, link targets, removed command visibility, and one practical runtime example. Remaining ideas are either deeper command execution sweeps or UX/accessibility investigations already covered by other session lanes.

---


### negative-validation-test-log.md

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


### responsive-accessibility-test-log.md

---
## 2026-06-25 22:44:00 +01:00

- What you think you want to do and why

Prove browser control against the deployed environment, then scout the changed method-picker surface before filing any accessibility or responsive issues.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/ with Chrome DevTools MCP after clearing stale automation-owned Chrome profile processes. Captured the landing page accessibility snapshot and screenshot screenshots/responsive-a11y-landing.png. Clicked Open app.html to https://eviltester.github.io/grid-table-editor/app.html and reviewed the app accessibility tree at desktop width. Switched Code and Code (Unit Test) import/export modes. Opened https://eviltester.github.io/grid-table-editor/generator.html, changed the first schema row Field type from regex to domain, then clicked Select domain command to open the live method picker.

the observations and results that you make

The landing page reports branch codex/230-method-picker-mvc, commit 04570e0e428d, built 2026-06-25T21:29:58.356Z. Browser interaction, snapshots, screenshots, resize, keyboard input, and browser-side DOM inspection all worked against the deployed pages. The app import/export flow does not expose the method picker in the exercised Code / Code (Unit Test) path, but it does expose option controls whose accessible names include neighboring help text such as "Show help for this option Use Quotes". The generator domain field exposes the live method-picker trigger as "Select domain command".

---
## 2026-06-25 22:45:00 +01:00

- What you think you want to do and why

Exercise the method-picker dialog in the integrated generator flow with keyboard-only interaction, visible focus, names/roles, escape/backdrop behavior, and selection application.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

With https://eviltester.github.io/grid-table-editor/generator.html open, clicked Select domain command. Captured screenshots/responsive-a11y-generator-method-picker-desktop.png. Read the accessibility snapshot for the dialog. Used Tab, Shift+Tab, slash, typed city, Enter, Escape, Apply, and a browser-side backdrop click event. Used browser-side DOM inspection to record role/name, active element, focusable order, scroll dimensions, and visible element counts.

the observations and results that you make

The dialog appears as dialog "Select schema method" modal. The search input is focused on open and is named "Filter methods". The close button is named "Close". The method list is exposed as region "Methods"; the help pane is exposed as complementary "Method details". Slash from a method tile returned focus to the search field. Typing city and pressing Enter selected location.city, with Apply enabled. Applying updated the generator trigger to "location.city" and changed the docs link to "Domain command help: location.city". Escape closed the dialog and restored focus to the trigger. Shift+Tab from the close button wrapped to Apply, and Tab from Apply wrapped to Close. A browser-side backdrop click removed the overlay and restored focus to the trigger. However, the dialog had 310 focusable controls in the desktop all-methods state, including 36 filter buttons and 269 method tiles, so a plain Tab user must traverse a very long sequence unless they know to use search/shortcuts.

---
## 2026-06-25 22:46:00 +01:00

- What you think you want to do and why

Check responsive/mobile layout and scroll containment for the method picker at desktop, tablet, and the narrowest Chrome DevTools width available in this profile.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Resized the deployed generator page to 1440x1000, 768x900, and the narrowest available Chrome DevTools content width, which was 500px wide despite requesting 390px. Captured screenshots/responsive-a11y-generator-method-picker-tablet.png and screenshots/responsive-a11y-generator-method-picker-mobile-390.png. Measured dialog, overlay, tabs, list, details, footer, document scroll width, and scroll heights in the browser. With the modal open at narrow width and focus in the search input, pressed PageDown and measured window.scrollY before and after. Captured screenshots/responsive-a11y-background-scroll-page-down.png after the background scroll.

the observations and results that you make

At desktop, the dialog was 1202x962 inside a 1440x1000 viewport; the method list and help pane were side-by-side and independently scrollable. At tablet, the dialog stacked list and detail vertically, remained horizontally contained, and document scrollWidth did not exceed clientWidth. At narrow/mobile width, the filter buttons wrapped into many rows and left only about 183px for the method list plus 183px for details, but the layout remained horizontally contained. The tab/filter rail is usable but dense. A confirmed scroll containment problem exists: body/document overflow remained visible, and PageDown with focus in the method-picker search moved window.scrollY from 0 to 290 while the modal stayed open. This means the underlying page can scroll behind the modal.

---
## 2026-06-25 22:47:00 +01:00

- What you think you want to do and why

Check contrast/readability and screen-reader names from snapshots for the highest-risk method-picker elements.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Computed foreground/background contrast in the browser for method-picker tabs, active tab, search input, method tiles, tile summaries, tile tags, Apply, Cancel, details text, and details code. Used the accessibility snapshots from generator/app/storybook to inspect roles and accessible names.

the observations and results that you make

Most text sampled above 4.5:1. The Apply button measured about 4.63:1, normal detail text 18.08:1, muted summaries/tags 8.01:1, and search input text 18.08:1. The method-picker tab/filter button text measured about 4.08:1 for rgb(31,111,235) on rgb(233,241,255) at 13.33px normal text, below the 4.5:1 target for normal-size text. Snapshot names for the core method-picker controls were generally good: dialog "Select schema method", searchbox "Filter methods", region "Methods", complementary "Method details", button "Close". Existing app/generator option controls still show polluted accessible names where adjacent help button text becomes part of checkbox/textbox names, for example checkbox "Show help for this option Use Quotes" and textbox "Show help for this option Quote Char".

---
## 2026-06-25 22:48:00 +01:00

- What you think you want to do and why

Use published Storybook to review the method-picker subcomponent stories because issue 230 explicitly requested story coverage for Method Navigator, Method List, Method Help Display, and the combined dialog.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/storybook/index.json directly and parsed method-picker entries from the published Storybook index. Navigated to https://eviltester.github.io/grid-table-editor/storybook/?path=/story/shared-method-picker-dialog--visual-always-open and then directly to https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story. Captured screenshots/responsive-a11y-storybook-method-picker.png and screenshots/responsive-a11y-storybook-iframe-mobile-500.png. Took accessibility snapshots and browser-side layout measurements.

the observations and results that you make

Published Storybook contains Shared/Method Picker Dialog entries for Docs, Navigator Default, List Default, Help Display With Usage, Visual Always Open, Choose Faker Method, Filter And Choose Domain Method, and Cancel Method Selection. The Visual Always Open story exposes the subcomponents in the accessibility tree: dialog "Choose Method", searchbox "Filter methods", filter buttons, region "Methods", complementary "Method details", Cancel, Apply, and a live "Method picker story log" status. In the direct iframe at 500px wide, the dialog measured x=20, y=-13, w=460, h=806, so the top of the dialog is clipped above the viewport. This was not reproduced in the integrated generator modal, where the dialog top stayed inside the viewport.

---
## 2026-06-25 22:49:00 +01:00

- What you think you want to do and why

Record defect candidates and follow-up ideas while separating confirmed observations from broader risks.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created defect-candidate notes under defects/ and summarized this lane in responsive-accessibility-summary.md. No local build, verify, package-manager, or repo test commands were run.

the observations and results that you make

Defect candidates:

1. Medium: Method picker does not lock background page scrolling. With the modal open and focus in Filter methods, PageDown moved window.scrollY from 0 to 290. Evidence: screenshots/responsive-a11y-background-scroll-page-down.png.
2. Medium/Low: Plain Tab order through the all-methods dialog is very long. The desktop all-methods state exposed 310 focusable controls, including every method tile. Search and slash reduce pain for informed users, but keyboard-only tab traversal is excessive.
3. Low: Method-picker filter buttons have below-target normal-text contrast. Computed ratio was about 4.08:1 for blue text on pale blue at 13.33px normal text.
4. Low: Direct Storybook iframe at 500px clips the dialog top at y=-13. Evidence: screenshots/responsive-a11y-storybook-iframe-mobile-500.png. Integrated generator modal did not reproduce this.
5. Low / broader app debt: app/generator export option accessible names include neighboring help text, e.g. "Show help for this option Use Quotes", which can make screen-reader announcements noisy.

Follow-up ideas:

1. Add deployed-browser coverage for body scroll lock while the method-picker modal is open, including PageDown, Space, wheel, touch scroll, and background scrollbar drag.
2. Consider a roving tabindex/listbox pattern for method tiles so only the active tile is tabbable while arrow keys move between methods.
3. Add a visible keyboard help affordance near the search field if slash and Enter are first-class shortcuts.
4. Add aria-current, aria-selected, or a tablist/listbox pattern if the filter buttons are intended to behave as tabs rather than simple filters.
5. Re-check method-picker filter chip contrast against WCAG 2.2 normal-text thresholds and darken the blue or lighten/differentiate the background.
6. Add a mobile Storybook viewport story or visual regression for Visual Always Open at 500px and 390px widths.
7. Test with actual mobile emulation/touch input where available, because this Chrome DevTools session could not shrink content below 500px.
8. Verify screen-reader announcement order in NVDA or VoiceOver for dialog title, focused search, selected method, details updates, and live status changes.
9. Add an automated accessibility snapshot assertion that the integrated generator modal exposes exactly one dialog, named search, Methods region, Method details complementary pane, Close, Cancel, and Apply.
10. Add regression coverage that Escape, backdrop click, Cancel, Close, and Apply all restore focus to the original trigger in generator and Storybook stories.
11. Separate help buttons from form labels in export options so checkbox/textbox accessible names are concise, e.g. "Use Quotes" instead of "Show help for this option Use Quotes".
12. Check whether the document behind the modal should be inert or aria-hidden while the modal is open, because snapshots still include the underlying generator/app controls before the modal subtree.
13. Add a reduced-results state test where a search like city produces one method and Enter selects it without requiring tile focus.
14. Add a recent-methods keyboard path test after applying a method to ensure Recently used is reachable, named clearly, and not empty-confusing.
15. Test docs links from Method Help Display in deployed Storybook and generator for same-origin versus production anywaydata.com targets and expected new-tab/current-tab behavior.


### storybook-component-parity-test-log.md

---
## 2026-06-25 22:42:09 +01:00

- What you think you want to do and why

Create a gap-coverage log for Storybook component parity around issue 230's Method Picker Dialog story request. The charter is narrower than the parent review: compare the deployed Storybook method-picker subcomponent stories with the live app/generator method picker, focusing on tabs, search, selection, help rendering, docs links, action logs, keyboard interactions, recent state, and cleanup/close behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used only deployed/published surfaces and GitHub Pages URLs. Did not run local verify, build, package-manager, or repo test commands. Browser control was through Playwright MCP and direct Playwright automation against system Chrome, with screenshots saved under `screenshots/`.

Opened `https://eviltester.github.io/grid-table-editor/` and confirmed the deployed review environment reports branch `codex/230-method-picker-mvc`, commit `04570e0e428d`, built `2026-06-25T21:29:58.356Z`. Opened `https://eviltester.github.io/grid-table-editor/app.html`, `https://eviltester.github.io/grid-table-editor/generator.html`, and `https://eviltester.github.io/grid-table-editor/storybook/index.html?path=/docs/shared-method-picker-dialog--docs`.

Identified the deployed Storybook coverage under `Shared / Method Picker Dialog`:

- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--navigator-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--list-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--choose-faker-method&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--filter-and-choose-domain-method&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--cancel-method-selection&viewMode=story`

Techniques and heuristics used:

- Story-to-live parity comparison: first map each Storybook subcomponent story, then compare its behavior with the live generator's real schema row method-picker.
- Component decomposition: checked navigator tabs, method list tiles, help panel, and combined dialog separately before combined flows.
- State transition testing: closed, open, search, select, apply, reopen, recent, and cancel/escape states.
- Accessibility-name heuristics: used role/name locators to expose differences between Storybook names and live app names.
- Data-realism heuristic: compared Storybook mock catalog size and method taxonomy to the live faker/domain catalog.
- Cleanup heuristic: after Apply, Cancel, and Escape, checked whether visible role dialogs remained.
- Link parity heuristic: compared Storybook docs links (`https://anywaydata.com/...`) with deployed live links (`https://eviltester.github.io/grid-table-editor/site/...`).
- Action-log heuristic: inspected the in-canvas Storybook action/result text after Apply and Escape.

Screenshots captured:

- Storybook subcomponent snapshots: `gap-shared-method-picker-dialog--navigator-default.png`, `gap-shared-method-picker-dialog--list-default.png`, `gap-shared-method-picker-dialog--help-display-with-usage.png`, `gap-shared-method-picker-dialog--visual-always-open.png`, `gap-shared-method-picker-dialog--choose-faker-method.png`, `gap-shared-method-picker-dialog--filter-and-choose-domain-method.png`, `gap-shared-method-picker-dialog--cancel-method-selection.png`
- Storybook interaction snapshots: `gap-story-choose-faker-open.png`, `gap-story-choose-faker-after-apply.png`, `gap-story-domain-filter-price.png`, `gap-story-domain-after-escape.png`
- Live generator snapshots: `gap-live-generator-initial.png`, `gap-live-generator-after-select-faker.png`, `gap-live-generator-after-select-domain.png`, `gap-live-faker-before-select-command-click.png`, `gap-live-faker-after-select-command-click.png`, `gap-live-faker-picker-search-password.png`, `gap-live-faker-picker-search-shuffle.png`, `gap-live-faker-picker-selected-shuffle.png`, `gap-live-faker-picker-after-scoped-apply-shuffle.png`, `gap-live-faker-picker-recent-after-shuffle.png`, `gap-live-faker-picker-after-recent-escape.png`

the observations and results that you make

Confirmed Storybook coverage exists for the issue-requested surface: Method Navigator, Method List, Method Help Display, and combined Method Picker Dialog stories are all deployed under `Shared / Method Picker Dialog`.

The Storybook navigator story renders tabs/categories (`All`, `Core`, `commerce`, `internet`, `Faker`, `Recently used`) and a search input with accessible name `Filter methods`. The live generator's faker picker renders a much larger catalog (`All`, `Core`, many faker namespaces, `Faker`, `Recently used`) after selecting `faker` in the field type and clicking `Select faker command`.

The Storybook list/help stories use a small mock method catalog with four items: `regex`, `helpers.arrayElement`, `internet.password`, and `commerce.price`. The live faker picker uses a larger real catalog; searching `shuffle` produces `helpers.shuffle`, help content, parameter table, usage example, and a deployed docs link. Searching `password` in live faker mode did not expose `internet.password`, while Storybook's combined faker story can select `internet.password`. This looks like a story-data parity gap rather than a live-app failure.

Storybook combined dialog uses visible title/accessibility label `Choose Method`. Live generator uses `Select schema method`. This is a parity mismatch in accessible naming and visible copy.

Storybook `Choose Faker Method` opens with focus in the `Filter methods` search input. Selecting `internet.password` and clicking dialog-scoped `Apply` closes the dialog and updates the story result text to `domain:internet.password`. The resulting selected prefix is suspicious for a story named "Choose Faker Method", because `internet.password` is shown as `domain` in the story result and help catalog.

Storybook `Filter And Choose Domain Method` supports search text `price`, narrows to `commerce.price`, renders the help panel, and Escape closes the dialog with the story result text `Cancelled`.

Live generator opens the picker from the schema row only after changing field type to `faker` or `domain`. Clicking `Select faker command` opens a modal labelled `Select schema method` and focuses the `Filter methods` input. Searching `shuffle` narrows to `helpers.shuffle`; selecting it enables the dialog Apply button and renders help content with schema `faker.helpers.shuffle()`, parameter details, usage examples, and docs link `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`.

Live Apply works when scoped to the dialog. After applying `helpers.shuffle`, the row opener text changes from `Select faker command` to `helpers.shuffle`, the params button becomes enabled as `Edit params for helpers.shuffle`, and the hidden shadow select value is `helpers.shuffle`.

Suspicious behavior / defect candidates:

- Storybook combined dialog label/copy does not match the live dialog label/copy: Storybook says `Choose Method`, live says `Select schema method`.
- Storybook method catalog is too small and possibly misleading for parity: `Choose Faker Method` selects `internet.password`, but the result is `domain:internet.password`, and the live faker picker did not find `internet.password` via `password` search.
- Live dialog has a visible generator options `Apply` button and a visible method-picker `Apply` button simultaneously; automation and assistive tech benefit from scoping, but duplicated visible button names can be ambiguous.
- Live Escape did not close the method picker after reopening the selected `helpers.shuffle` picker and switching to `Recently used`; the dialog remained visible in `gap-live-faker-picker-after-recent-escape.png`. Storybook Escape closed the domain story from `gap-story-domain-filter-price.png` to `gap-story-domain-after-escape.png`.
- After clicking a live method tile, focus was observed on `BODY` rather than remaining on the selected method tile or moving to the dialog Apply button. This may weaken keyboard recovery inside the modal.
- Live page keeps hidden confirm dialogs in the DOM with `role="dialog"`; robust tests and assistive tech queries must distinguish hidden confirm dialogs from the visible method picker.

Follow-up ideas:

1. Add a Storybook combined-dialog story that uses the real deployed generator faker catalog shape instead of the four-item mock list.
2. Add a Storybook story for the live title/copy variant `Select schema method` so the accessible name is covered.
3. Add a Storybook story for the schema-row integration path: field type changes to faker/domain, opener text updates, params button enables, and shadow select value updates.
4. Add a Storybook story for a selected method opener state (`helpers.shuffle`) and the `Recently used` tab.
5. Add a Storybook interaction check that Escape closes from every state: initial open, filtered list, selected tile, docs/help focused, and recent tab.
6. Add a Storybook keyboard test for Tab/Shift+Tab focus containment inside the dialog and focus return to the opener on close.
7. Add a Storybook action-log assertion for Apply payload shape, including whether `faker` versus `domain` prefixes match the selected method.
8. Add a story that uses live docs-base configuration so docs links can be compared between Storybook (`anywaydata.com`) and deployed review pages (`/grid-table-editor/site/...`).
9. Add a "no results" search story for live-like data, covering empty search results and disabled Apply behavior.
10. Add a story for parameter-bearing faker methods, verifying parameter table, usage examples, params button enablement, and selected method schema rendering.
11. Add an accessibility story/check for duplicate visible `Apply` buttons when the picker is embedded inside the generator page.
12. Add cleanup assertions that no visible method-picker role dialog remains after Apply, Cancel, close button, and Escape.
13. Add a story for hidden sibling dialogs already present in the page, because the live generator has hidden confirm dialogs alongside the method picker.
14. Add a category-scale story with many namespaces so tab wrapping, scrolling, search, and responsive behavior match the live large catalog.

---


### ux-regression-test-log.md

# UX Regression Testing Lane Log

Scope: GitHub issue #230 / PR #247 deployed environment review. Deployed environment only: <https://eviltester.github.io/grid-table-editor/> plus published app/help/docs pages under <https://eviltester.github.io/grid-table-editor/>.

Charter: UX/usability and workflow regression in the generator, method-picker, help, and related flows. Focus areas: dialog open/close/apply/cancel/backdrop/escape, search, tabs, recent methods, keyboard shortcuts `/` and Enter, focus restoration, selected command continuity, help panel readability, generator workflow after method selection, and app integration.

Constraints honored: no app code edits, no local build/test/verify commands, no package-manager/repo test commands. This lane writes only session artifacts under `docs/testing/20260625/issue-230-001/`.

Techniques and heuristics: exploratory testing, risk-based testing from the changed method-picker/story surfaces, state/flow modeling for picker dialogs and generator row workflows, consistency/oracle checks between visible picker help and published help/docs pages, keyboard accessibility heuristics, focus-management heuristics, modal/dialog behavior heuristics, negative UX observation for cancel/escape/backdrop cases, and workflow continuity testing across standalone generator and embedded app surfaces.

---
## 2026-06-25 22:40:00 +01:00

- What you think you want to do and why

Establish this delegated UX lane, mirror the session log structure from `issue-230-test-log.md`, and prove browser interaction against the deployed environment before substantive testing. This creates a clean evidence baseline for dialog and workflow observations.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Prepared `logs/ux-regression-test-log.md` under `docs/testing/20260625/issue-230-001/`. The planned surfaces are the deployed landing page, `app.html`, `generator.html`, method picker dialog, help/dialog content, and published docs/help links reachable from the live UI. Browser proof is next.

the observations and results that you make

The UX lane is scoped and ready. No substantive application testing has been performed yet in this lane.

---
## 2026-06-25 22:43:00 +01:00

- What you think you want to do and why

Prove browser control and capture a scout inventory before testing dialog and workflow regressions. This validates that later observations are from the deployed environment, not inferred from code or local tests.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened a dedicated headless Chrome session against `https://eviltester.github.io/grid-table-editor/`. Confirmed the landing page title `Grid Table Editor Test Environment`, captured the branch/commit/build card, clicked the visible `Open app.html` link, and confirmed navigation to `https://eviltester.github.io/grid-table-editor/app.html`. Then navigated to `https://eviltester.github.io/grid-table-editor/generator.html` and captured the initial generator surface. Saved support inventory to `support/ux-regression-scout.json`. Saved screenshots:

- `screenshots/ux-regression-00-browser-proof-landing.png`
- `screenshots/ux-regression-01-browser-proof-app-loaded.png`
- `screenshots/ux-regression-02-generator-initial.png`

the observations and results that you make

Browser control is confirmed and screenshots are visually inspectable. The landing page reports branch `codex/230-method-picker-mvc`, commit `04570e0e428d`, built `2026-06-25T21:29:58.356Z`. The app and standalone generator both loaded from published pages.

---
## 2026-06-25 23:01:00 +01:00

- What you think you want to do and why

Loop 1: exercise the method picker dialog mechanics from a clean standalone generator state. This targets the highest-risk MVC refactor surface: modal open/close, Escape, Cancel, backdrop, search filtering, Apply, and focus restoration.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed `https://eviltester.github.io/grid-table-editor/generator.html`. Changed the single schema row from `regex` to `domain`, clicked `Select domain command`, and captured `screenshots/ux-regression-04-method-picker-open-full.png`. Verified the picker opens as an overlay/modal headed `Select schema method`, with search focused, tab chips visible, list tiles on the left, details/help on the right, and Cancel/Apply footer actions.

Then searched `internet.httpMethod`, captured `screenshots/ux-regression-05-method-picker-search-httpmethod.png`, pressed `Enter` from the search field, canceled, reopened, selected `internet.httpMethod`, clicked outside the modal backdrop, reopened again, selected `internet.httpMethod`, and clicked `Apply`. State details were saved to `support/ux-regression-flow-results.json`.

the observations and results that you make

Working behavior:

- Opening the picker focuses the search input.
- Escape closes the picker and restores focus to `Select domain command`.
- Cancel closes the picker and restores focus to the command button.
- Backdrop click closes the picker and restores focus to the command button.
- Search for `internet.httpMethod` filters to one tile and updates the detail pane.
- Apply updates the row command to `internet.httpMethod`, enables the params edit button, and updates the row help/docs link to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`.

Defect candidate: Apply does not restore focus. After clicking `Apply`, the captured state was `activeTag: BODY`, `focusOnPickerButton: false`, while Escape/Cancel/backdrop all restored focus correctly. Wrote `defects/ux-001-apply-does-not-restore-focus.md`.

Defect candidate: `Enter` did not apply the single filtered selected result when focus was in the search field. The picker stayed open and the row command stayed empty. This was retested later with tile focus.

Suspicious UX behavior: the domain picker opens on the `All` tab with `enum` selected and details for `Enum()`, even though the row is in `domain` mode and the launcher says `Select domain command`. This may be intentional cross-mode discovery, but it is easy to read as a mismatched default.

---
## 2026-06-25 23:08:00 +01:00

- What you think you want to do and why

Loop 2: test continuity after a successful method selection, including recent methods, tab filtering, cancel behavior after selecting a different method, help/detail readability, docs consistency, generator preview, and embedded app integration.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Continued on `https://eviltester.github.io/grid-table-editor/generator.html` after applying `internet.httpMethod`. Filled column name `method`, set Generate Rows to `5`, clicked `Preview`, and captured `screenshots/ux-regression-06-generator-preview-httpmethod.png`.

Reopened the picker from the selected `internet.httpMethod` row. Checked selected-command continuity, clicked the `Recently used` tab, clicked the `string` tab, searched `string.symbol`, selected it, and captured `screenshots/ux-regression-07-method-picker-string-symbol-detail.png`. Canceled and confirmed the row stayed on `internet.httpMethod`. Reopened again, clicked the `Faker` tab, searched `helpers.mustache`, selected it for inspection only, captured `screenshots/ux-regression-08-method-picker-faker-helper-detail.png`, then canceled.

Checked the published docs page `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet` with an HTTP fetch from the workstation; it returned status `200` and contained `internet.httpMethod`.

For app integration, navigated to `https://eviltester.github.io/grid-table-editor/app.html`, opened the `Test Data` panel, selected `internet.httpMethod` through the embedded picker, set column `method`, set `How Many?` to `3`, clicked embedded `Generate`, and captured `screenshots/ux-regression-09-app-embedded-generator-httpmethod.png`.

the observations and results that you make

Working behavior:

- Standalone generator preview produced CSV output for `internet.httpMethod`, with output such as `"method"` and `"TRACE"`, and the Data Table Preview showed the `method` column.
- Reopening the picker preserved selected-command continuity: `internet.httpMethod` remained selected and the detail pane showed that method.
- `Recently used` populated with `internet.httpMethod` after apply.
- Selecting `string.symbol` and then canceling did not mutate the already applied `internet.httpMethod` row.
- `string.symbol` help remained readable despite punctuation-heavy content; parameter tables and examples remained visible.
- `helpers.mustache` on the `Faker` tab showed required `text` and `data` params and readable example content.
- The published internet domain docs page is present and contains `internet.httpMethod`.
- Embedded app integration worked: the app grid changed to a `method` column with 3 generated rows and the status message `Generate complete. Grid updated.`

Suspicious UX behavior: the picker allows navigation from a domain row to the `Faker` tab and shows faker helper details while the underlying row remains `domain` until Apply. I canceled rather than applying cross-source content. This may be intentional, but it deserves targeted follow-up because users may not understand whether Apply will switch source type or create an invalid domain row.

---
## 2026-06-25 23:14:00 +01:00

- What you think you want to do and why

Loop 3: explicitly cover keyboard shortcuts and generate follow-up ideas from uncovered edges before stopping the delegated UX lane. This closes the charter items for `/`, Enter, keyboard continuity, focus restoration, and additional exploratory ideas.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Ran a focused keyboard pass on `https://eviltester.github.io/grid-table-editor/generator.html`. Opened a domain picker, focused the first result tile, pressed `/`, then searched `internet.httpMethod`, focused the single result tile, pressed `Enter`, and captured `screenshots/ux-regression-10-keyboard-enter-after-tile-focus.png`. Keyboard state was saved to `support/ux-regression-keyboard-results.json`.

the observations and results that you make

Working behavior:

- `/` works as a search-focus shortcut when a result tile has focus. Focus moved back to the search input and did not insert `/` into the search value.

Defect candidate: `Enter` on a focused selected result tile does not apply the command. After pressing `Enter`, the dialog remained open, `internet.httpMethod` remained selected, and the row command stayed empty. This supports the earlier search-field Enter observation. Wrote `defects/ux-002-enter-does-not-apply-selected-method.md`.

Follow-up ideas generated from this lane:

1. Execute a manual keyboard-only picker journey: open, search, arrow through results, apply, edit params, preview, with no mouse.
2. Confirm whether Enter is intended to apply, select-only, or no-op, then align implementation and help text.
3. Test Apply focus restoration in embedded `app.html`, not only standalone `generator.html`.
4. Apply a Faker helper from a domain-row picker and verify whether source type changes, params remain valid, or generation fails.
5. Open a faker row picker and verify whether domain/core commands appear symmetrically and whether that is understandable.
6. Test long recent-method history after selecting more than 10 methods, including duplicates and source-family mixing.
7. Test search with punctuation and mixed case, for example `HTTP`, `http method`, `string.symbol`, `helpers.mustache`, and `mustache`.
8. Test no-results search copy, Escape behavior, and focus restoration from an empty result state.
9. Test tab overflow and horizontal layout at narrower desktop widths, especially the many domain-family chips.
10. Test whether the default selected `enum` on a domain picker can be applied accidentally and what happens to row source type.
11. Verify screen-reader semantics for the picker: modal name, selected result, selected tab, list count, and Apply disabled/enabled state.
12. Test docs links from picker details after selecting `internet.httpMethod`, `string.symbol`, and `helpers.mustache`, including new-tab focus behavior.
13. Test params editor launch immediately after Apply to confirm focus and command continuity across chained dialogs.
14. Test backdrop click after editing search and selecting a different command to ensure cancel semantics are always non-mutating.

Stopping note for this lane: the chartered UX surfaces were covered broadly enough for a delegated pass: open/close/apply/cancel/backdrop/Escape, search, tabs, recent methods, `/` and Enter, focus restoration, selected command continuity, help readability, generator workflow, and app integration. Remaining ideas are useful but fit follow-up or adjacent lanes.

---


## Defects

### AD-001-helper-arrayelement-params-unusable.md

# AD-001: helpers.arrayElement documented array params cannot be applied from the params editor

Severity: Medium

Status: confirmed repeatable in deployed test environment.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/repeat-checks-main-agent.json`, `../support/helper-arrayelement-comma-param.json`, `../support/loop2-focused-rechecks.json`
- Screenshots: `../screenshots/params-dialog-helpers-arrayelement.png`, `../screenshots/helper-arrayelement-comma-param.png`, `../screenshots/loop2-helper-arrayelement-param-dialog.png`

## Steps to Reproduce

1. Open the deployed generator.
2. In the first schema row, enter column name `Tier`.
3. Change field type to `faker`.
4. Click `Select faker command`.
5. Search for and apply `helpers.arrayElement`.
6. Click the row params/edit button.
7. Try the documented/help-style array examples, for example `(["free", "pro", "enterprise"])`, or a simple comma value `red,green,blue`.

## Expected Result

The params editor should accept a valid array value or clearly explain the exact supported syntax. Applying params should allow preview/generation to choose one of the supplied values.

## Actual Result

The params editor keeps Apply disabled and reports errors such as:

- `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`
- Direct/help-style params can also produce `Cannot read properties of undefined (reading 'length')`.

The picker help says `Params field: (["A", "B", "C"])` and `Full call: helpers.arrayElement(["A", "B", "C"])`, so the documented example appears unusable in the live row/params workflow.

## Notes

This blocks at least one required-params helper command from the method-picker-to-generator workflow and suggests structured helper params need focused review beyond this one command.


### AD-002-core-enum-regex-picker-preview-no-output.md

# AD-002: Picker-applied enum and regex rows accept visible values but preview produces no data

Severity: Medium

Status: confirmed repeatable for `enum` and `regex`; `literal` works through the same picker flow.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/enum-via-picker-repeat.json`, `../support/loop2-focused-rechecks.json`, `../support/loop1-command-runtime-matrix.json`
- Screenshots: `../screenshots/enum-via-picker-after-fill.png`, `../screenshots/loop2-core-enum-via-picker.png`, `../screenshots/loop2-core-regex-via-picker.png`

## Steps to Reproduce

1. Open the deployed generator.
2. In the first schema row, set field type to `domain` so the method picker trigger is visible.
3. Click `Select domain command`.
4. Search for `enum`, select the core `enum` tile, and click Apply.
5. Enter column name `Status` and visible value `alpha,beta,gamma`.
6. Click Preview.
7. Repeat with `regex` and visible value `[A-Z]{2}[0-9]{2}`.

## Expected Result

After applying a core command from the method picker and filling its visible value field, Preview should generate data just as direct row selection does.

## Actual Result

- For `enum`, the row initially continues to show `Row 1: enum value is required.` after the visible value is filled.
- Preview clears the schema error but produces no output.
- For `regex`, the same pattern occurs: visible value is present, prior required-value text is shown, Preview produces no output.
- A direct row-mode matrix where `enum`/`regex` are selected without the method picker generated valid output, and picker-applied `literal` also generated output.

## Notes

This looks specific to the core command transition through the new method picker path. It is important because the picker exposes Core commands in the All tab, so users can naturally select them from the dialog.


### AD-003-commerce-price-direct-help-params-ignored.md

# AD-003: Directly typed commerce.price help-style params are ignored while params-dialog values work

Severity: Low/Medium

Status: confirmed suspicious behavior; params dialog path works, direct params-field path does not appear equivalent.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html and https://eviltester.github.io/grid-table-editor/generator.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence files: `../support/command-coverage-valid-params-rerun.json`, `../support/loop2-focused-rechecks.json`
- Screenshot: `../screenshots/loop2-commerce-price-params-dialog.png`

## Steps to Reproduce

1. Select `commerce.price` from the method picker.
2. Use the help example syntax in the params field: `(dec=2, max=20, min=10, symbol="$")`.
3. Generate several rows.
4. Repeat by opening the params dialog and entering `dec=2`, `max=20`, `min=10`, `symbol=$` in the separate fields.

## Expected Result

The help-style params syntax and the params dialog should serialize to equivalent generation behavior, or the UI should clearly direct users to the params dialog and reject unsupported manual syntax.

## Actual Result

The direct help-style params path generated values outside the requested 10-20 range and omitted the `$` symbol, for example `35.69`, `426.99`, `280.05`, `489.35`.

The params dialog path generated expected values such as `$16.55`, `$18.09`, `$19.05`, `$17.75`, all within the configured range and with the symbol.

## Notes

This may be a row params parsing issue rather than a method picker component issue, but the new Method Help Display shows params examples prominently and users may copy them into the row params field.


### docs-consistency-storybook-doc-link-base-mismatch-candidate.md

# Candidate: Storybook method picker help links use production docs while live deployed picker uses GitHub Pages docs

## Summary

Published Storybook method picker examples link their `Open documentation` help links to `https://anywaydata.com/...`, while the live deployed generator method picker links equivalent commands to `https://eviltester.github.io/grid-table-editor/site/docs/...`.

This may be intentional if Storybook is production-facing, but it is inconsistent inside the deployed review environment and can send reviewers out of the test deployment while app/generator picker help stays within it.

## Environment

- Deployed app/generator: `https://eviltester.github.io/grid-table-editor/generator.html`
- Deployed Storybook: `https://eviltester.github.io/grid-table-editor/storybook/`
- PR: `https://github.com/eviltester/grid-table-editor/pull/247`
- Issue: `https://github.com/eviltester/grid-table-editor/issues/230`

## Evidence

Live deployed generator method picker samples:

- `internet.password` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
- `commerce.price` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/commerce`
- `helpers.arrayElement` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`

Storybook iframe samples:

- `shared-method-picker-dialog--help-display-with-usage` `Open documentation` link: `https://anywaydata.com/docs/test-data/domain/internet`
- `shared-method-picker-dialog--visual-always-open` `Open documentation` link: `https://anywaydata.com/docs/test-data/faker/helpers`

Supporting artifacts:

- `../support/docs-consistency-live-picker-samples.json`
- `../support/docs-consistency-storybook-story-inspection.json`
- `../support/docs-consistency-link-target-check.json`
- `../screenshots/docs-consistency-live-picker-internet_password.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--help-display-with-usage.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--visual-always-open.png`

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Open the method picker.
4. Search for and select `internet.password`.
5. Observe the `Open documentation` link uses the GitHub Pages `/grid-table-editor/site/docs/...` base.
6. Open `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story`.
7. Observe the `Open documentation` link uses the production `https://anywaydata.com/docs/...` base.

## Impact

Low to medium depending on intended behavior. If deployed Storybook is meant to mirror the deployed test environment, the link base mismatch weakens docs/help consistency and may hide branch-specific docs changes from reviewers. If Storybook is intentionally production-facing, classify this as accepted behavior and not a defect.

## Suggested follow-up

Decide whether Storybook stories should receive the same deployed docs base as the app/generator shell. If yes, update Storybook story setup or help-model docs URL normalization so `Open documentation` stays inside the GitHub Pages deployment during PR review.


### NV-002-text-schema-unknown-call-accepted.md

# NV-002: Text schema `unknown()` is accepted as generated data instead of rejected

Severity: Low/Medium

Status: confirmed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Test environment branch/commit: `codex/230-method-picker-mvc` / `04570e0e428d`
- Evidence: `../logs/negative-validation-test-log.md`, `../support/negative-validation-observations.json`, `../screenshots/negative-14-text-unknown-busy.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Switch schema editing to text mode.
3. Enter a schema with column `Mystery` and rule `unknown()`.
4. Click Generate.

## Expected Result

A method-like unknown function call should be rejected with a clear validation message, or the docs should clearly state that unknown function-like text is intentionally treated as literal data.

## Actual Result

The schema generated a row with value `unknown`, making the malformed function-like call look accepted rather than invalid.

## Notes

This may be a parser ambiguity rather than a method-picker regression, but it matters because issue 230 surfaces richer method names and examples; malformed method-like text should not silently pass as generated data without clear intent.


### NV-003-text-mode-generic-validation-message.md

# NV-003: Text-mode malformed schemas can show only a generic validation failure

Severity: Low

Status: observed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Evidence: `../logs/negative-validation-test-log.md`, `../screenshots/negative-13-text-empty-busy.png`, `../screenshots/negative-15-text-regex-busy.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Switch schema editing to text mode.
3. Try malformed or empty schemas such as empty text or `BadRegex` with `regex([A-Z`.
4. Click Generate.

## Expected Result

Text mode should provide line-specific or rule-specific validation comparable to row mode.

## Actual Result

Some text-mode failures only showed `Schema validation failed. Grid unchanged.` without the detailed row/line-level cause visible to the user.

## Notes

Row mode generally produced clearer messages for similar invalid input, so this is a consistency and debuggability issue.


### NV-004-domain-faker-top-level-help-thin.md

# NV-004: Top-level domain/faker help lacks params/examples compared with core command help

Severity: Low

Status: confirmed in negative-validation and final-review passes.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/generator.html and app Test Data panel
- Evidence: `../logs/negative-validation-test-log.md`, `../support/final-review-executions.json`, `../screenshots/negative-04-faker-help.png`

## Steps to Reproduce

1. Open the deployed generator or app Test Data panel.
2. In the schema row, rotate the field type through enum, literal, regex, domain, and faker.
3. Inspect the top-level help for each type.

## Expected Result

Domain and faker top-level help should orient users with at least the same level of params/example guidance as enum, literal, and regex, especially because domain/faker commands now open a rich method picker.

## Actual Result

Enum, literal, and regex help show schema params, parameter descriptions, and examples. Domain and faker help only show a short category description plus a Learn more link.

## Notes

The method picker gives detailed help after opening and selecting a command, so this is not a blocker. It is a discoverability/content consistency issue around the changed help surface.


### NV-005-malformed-faker-params-example-echo.md

# NV-005: Malformed faker params message can echo a malformed example

Severity: Low

Status: confirmed in negative-validation lane.

## Environment

- URL: https://eviltester.github.io/grid-table-editor/app.html
- Evidence: `../logs/negative-validation-test-log.md`, `../screenshots/negative-07-malformed-faker-params.png`

## Steps to Reproduce

1. Open the deployed app and expand Test Data.
2. Select `faker` and choose `helpers.arrayElement` from the method picker.
3. Enter malformed params such as `(["A","B"`.
4. Click Generate.

## Expected Result

The validation message should explain the expected wrapping/syntax without echoing an incomplete or confusing example.

## Actual Result

The UI showed: `params should be wrapped in parentheses, e.g. (["A","B").`

The echoed example is itself incomplete/malformed, which makes it harder for users to repair the input.


### RA-001-method-picker-background-scroll.md

# RA-001: Method Picker Allows Background Page Scroll

Severity: Medium

Environment: https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Steps:

1. Open generator.html.
2. Change the first schema row field type to domain.
3. Open the method picker from Select domain command.
4. Keep focus in the Filter methods search box.
5. Press PageDown.

Observed:

window.scrollY moved from 0 to 290 while the modal remained open. The modal stayed fixed, but the underlying page scrolled behind it.

Expected:

Background page scroll should be locked while the modal is open, or PageDown should be contained within the active modal/list region.

Evidence:

- screenshots/responsive-a11y-background-scroll-page-down.png
- logs/responsive-accessibility-test-log.md


### RA-002-method-picker-long-tab-order.md

# RA-002: Method Picker All-Methods State Has Excessive Tab Order

Severity: Medium/Low

Environment: https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

The desktop all-methods dialog exposed 310 focusable controls, including 36 filter buttons and 269 method tiles. Tab trapping worked, but a plain Tab user must traverse a very long sequence unless they already know to use search, slash, or filtering.

Expected:

The method list should consider roving tabindex, listbox/grid semantics, or another keyboard model where Tab moves across major regions/actions and arrow keys move within the method list.

Evidence:

- screenshots/responsive-a11y-generator-method-picker-desktop.png
- logs/responsive-accessibility-test-log.md


### RA-003-method-picker-filter-contrast.md

# RA-003: Method Picker Filter Button Text Contrast Is Below 4.5:1

Severity: Low

Environment: https://eviltester.github.io/grid-table-editor/generator.html and Storybook method-picker stories, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

Computed browser-side contrast for method-picker filter/tab button text was approximately 4.08:1 for rgb(31, 111, 235) text on rgb(233, 241, 255) background at 13.33px normal-weight text.

Expected:

Normal-size text should meet at least 4.5:1 contrast.

Evidence:

- screenshots/responsive-a11y-generator-method-picker-mobile-390.png
- logs/responsive-accessibility-test-log.md


### RA-004-storybook-iframe-mobile-clipping.md

# RA-004: Direct Storybook Method Picker Iframe Clips Dialog Top At 500px

Severity: Low

Environment: https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

At 500px content width, the direct Storybook iframe dialog measured x=20, y=-13, w=460, h=806, so the top of the dialog is clipped above the viewport. The integrated generator modal did not reproduce this and measured with a positive top offset.

Expected:

The direct Storybook story should keep the full dialog inside the viewport at narrow widths.

Evidence:

- screenshots/responsive-a11y-storybook-iframe-mobile-500.png
- logs/responsive-accessibility-test-log.md


### RA-005-option-accessible-name-pollution.md

# RA-005: Export Option Accessible Names Include Neighboring Help Text

Severity: Low / broader app accessibility debt

Environment: https://eviltester.github.io/grid-table-editor/app.html and https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

Accessibility snapshots show export option controls with names that include adjacent help-button text, for example checkbox "Show help for this option Use Quotes" and textbox "Show help for this option Quote Char".

Expected:

Option controls should have concise names such as "Use Quotes" and "Quote Char", while the neighboring help buttons should retain their own independent names.

Evidence:

- screenshots/responsive-a11y-app-mobile-500.png
- logs/responsive-accessibility-test-log.md


### ux-001-apply-does-not-restore-focus.md

# UX-001: Applying a method picker selection does not restore keyboard focus

Severity: Low to medium

Status: Defect candidate, repeatable in automated browser pass

Area: Method picker dialog, focus restoration, generator workflow

Evidence:

- Screenshot: `../screenshots/ux-regression-05-method-picker-search-httpmethod.png`
- State data: `../support/ux-regression-flow-results.json`, labels `selected-httpmethod-before-apply` and `after-apply-httpmethod`

Steps:

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Click `Select domain command`.
4. Search for `internet.httpMethod`.
5. Select `internet.httpMethod`.
6. Click `Apply`.

Observed:

The dialog closes and the row updates to `internet.httpMethod`, but focus moves to the document body. The captured state after apply was `activeTag: "BODY"` and `focusOnPickerButton: false`.

Expected:

After a modal apply action, focus should return to the invoking `internet.httpMethod` command picker button, matching the behavior observed for Escape, Cancel, and backdrop close.

Why this matters:

Keyboard users lose their position after applying a method and must rediscover where focus is. This is especially noticeable because the adjacent Cancel, Escape, and backdrop close paths do restore focus correctly.


### ux-002-enter-does-not-apply-selected-method.md

# UX-002: Enter does not apply the focused selected method in the picker

Severity: Low to medium

Status: Defect candidate, repeatable in automated browser pass

Area: Method picker dialog, keyboard shortcut, search results

Evidence:

- Screenshot: `../screenshots/ux-regression-10-keyboard-enter-after-tile-focus.png`
- State data: `../support/ux-regression-keyboard-results.json`, labels `enter-with-tile-focused-before-key` and `enter-with-tile-focused-after-key`

Steps:

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Click `Select domain command`.
4. Search for `internet.httpMethod`.
5. Focus the single visible result tile.
6. Press `Enter`.

Observed:

The focused tile remains focused, the dialog stays open, and the row remains `Select domain command` with an empty command value. A parallel check pressing `Enter` while the search input contained the single selected result also left the dialog open without applying the command.

Expected:

If Enter is intended as a picker shortcut, pressing Enter on a focused selected result should apply the selected method or otherwise activate the focused result in a clearly useful way. If Enter is intentionally not an apply shortcut, the UI should not rely on it as part of the picker keyboard workflow.

Why this matters:

Search narrows to a single selected result, but keyboard users still have to tab or move to `Apply`. This makes the advertised or expected search-plus-Enter workflow feel incomplete.

