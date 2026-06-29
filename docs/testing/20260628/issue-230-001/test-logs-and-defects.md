# Collated Test Logs and Defects

This file contains the full main log, subagent logs, and defect files for the issue #230 / PR #247 deployed exploratory review.

## Main Sequential Log

---
---
## 2026-06-28T14:17:00+01:00

- What you think you want to do and why

Perform the mandatory final review loop, package the deliverables, tidy evidence, export PDFs, and publish the GitHub testing issue/subissues. This is the stopping check: verify that story/PR scope, changed surfaces, logs, command-family sampling, docs coverage, examples, defects, and remaining gaps are represented before finishing.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed issue #230, PR #247 metadata, changed-file inventory, accumulated main/subagent logs, confirmed defect files, sampled command-family coverage, docs reviewed, examples tried, videos, screenshots, and remaining gaps. Generated and classified at least 10 additional final-review ideas in the report; executed the in-scope items around final defect replay, Storybook reachability, science command normalization, screenshot reference cleanup, artifact collation, and PDF export. Generated issue-230-test-report.pdf and test-logs-and-defects.pdf with pandoc, then rendered first pages through MiKTeX Poppler tools for a visual sanity check. Confirmed the screenshots folder contains only images referenced by Markdown. Created GitHub parent issue https://github.com/eviltester/grid-table-editor/issues/254 and six defect subissues https://github.com/eviltester/grid-table-editor/issues/255 through https://github.com/eviltester/grid-table-editor/issues/260, all attached as subissues using GitHub GraphQL addSubIssue.

the observations and results that you make

The final review did not reveal a new high-impact defect class beyond the six repeatable defects already recorded. Coverage is broad enough for this deployed-only review because the session sampled explicit commands, many domain/faker/helper families, validators, structured params, removed/deprecated commands, default and parameterized examples, docs/help consistency, method-picker workflows, params editor, Storybook reachability, mobile, and accessibility. Stopping is justified because later loops refined evidence and classification rather than producing materially new risk areas. PDFs exist and render; the GitHub tracking issue and subissues are published.

---
## 2026-06-28T13:45:41+01:00

- What you think you want to do and why

Start the deployed-only exploratory review for grid-table-editor issue #230 and PR #247. First prove browser control against the deployed environment, create the required dated ordinal artifact folder, save the session prompt, retrieve current GitHub story/PR context, and prepare the multi-agent planning artifacts before substantive testing begins.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/site/ using Chrome DevTools MCP, captured an accessibility snapshot, clicked the visible "Use The Application" link, and confirmed navigation to https://eviltester.github.io/grid-table-editor/site/app.html. Navigated to https://eviltester.github.io/grid-table-editor/generator.html and saved screenshots/browser-proof-generator.png. Created docs/testing/20260628/issue-230-001/ with logs, support, screenshots, defects, and videos subfolders. Fetched live GitHub issue #230, PR #247 metadata, changed file list, and patch into support files using gh for planning only.

the observations and results that you make

Browser interaction is available and live: the deployed site opened, controls were visible in the a11y snapshot, the click navigated to the app page, and the generator page loaded with schema editor, generate options, preview controls, and a test-environment banner. Current PR #247 is open with head codex/230-method-picker-mvc at e3e91c98fde5348924e45c3eea4843ba04e0ffce, 91 changed files, 4163 additions, and 965 deletions, so today's plan must be derived from the current diff rather than prior memory.

---
---
## 2026-06-28T14:08:02+01:00

- What you think you want to do and why

Complete Loops 1, 2, and 3 coverage updates after broad command, docs, negative validation, mobile/accessibility, and Storybook checks. The goal is to continue beyond first defects and demonstrate broad command-family sampling.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Loop 1 covered browser proof, current PR/issue inventory, method picker inventory, helper example execution, docs pages, raw regex docs example repeat, explicit regex/enum/literal/domain/faker examples, negative validation, picker search/apply, params editor, mobile method picker, and Lighthouse snapshot. Loop 2 generated new ideas from gaps and executed date.between, finance.iban, internet.emoji, datatype.enum, helpers.shuffle, helpers.replaceCreditCardSymbols, helpers.weightedArrayElement, JSON/Generate Data variation, and docs-link checks. Loop 3 generated more ideas and executed Storybook route discovery, Storybook open/inspect, science docs/picker/runtime normalization, and final defect replay videos. All testing used deployed or published URLs only.

the observations and results that you make

Supported command execution was broadly healthy across sampled domain and helper families. Negative validation was materially improved for unknown command-like text and bad params. Confirmed repeatable defects were concentrated in docs/runtime mismatches, accessibility/help labeling, and command-name consistency rather than basic generation. Storybook is deployed at https://eviltester.github.io/grid-table-editor/storybook/. Videos were saved for all six confirmed defects.

---


## Subagent Logs

### command-coverage-test-log.md

---
## 2026-06-28T13:31:00+01:00

- What you think you want to do and why

Run command coverage and example execution against deployed generator, method picker, and published docs because PR #247 changed command metadata, parser/help, faker validation, and method-picker MVC.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/generator.html. Proved browser access. Opened the Method Picker from a faker row. Inventoried tabs, helper commands, domain command count, help detail, docs links, and runtime generation examples. Tested representative commands through deployed Preview, including person, internet, number, location, commerce, string, helpers.arrayElement, helpers.arrayElements, helpers.rangeToNumber, helpers.slugify, helpers.uniqueArray, helpers.fromRegExp, helpers.replaceSymbols, helpers.weightedArrayElement, helpers.multiple, and removed image.urlLoremFlickr. Reviewed published docs for schema, regex, faker helpers, domain overview, number, person, and internet.

the observations and results that you make

Broad positive command execution looked healthy for sampled supported commands. Negative helper array validation and removed command validation were clear. Repeatable docs/runtime defects were found for Faker Helper docs examples using `this.word.sample` and `() => this.person.firstName()`, which the deployed validator rejects as unsafe/complex while alternative `faker.word.sample` syntax works. Picker search by command and parameter worked, and docs links for sampled commands resolved.

Techniques and heuristics used: exploratory testing, command-surface inventory, risk-based testing, docs/runtime consistency, negative validation, and representative sampling.

---


### docs-consistency-test-log.md

---
## 2026-06-28T13:46:00+01:00

- What you think you want to do and why

Start lane 3 as the docs/help/content consistency subagent. The charter is to use only deployed and published surfaces for issue #230 / PR #247, prove deployed browser interaction before testing, then compare published docs, app help, generator help, method picker exposed content, docs links, and practical runtime examples where feasible.

Actions:

- Read current PR/story context from GitHub published API/pages:
  - Story: https://github.com/eviltester/grid-table-editor/issues/230
  - PR: https://github.com/eviltester/grid-table-editor/pull/247
  - PR files API: https://api.github.com/repos/eviltester/grid-table-editor/pulls/247/files?per_page=100
- Confirmed current story title: "turn the method picker into a real MethodPickerDialog MVC".
- Confirmed current PR title: "[codex] Implement method picker MVC".
- Confirmed current PR head from API: branch `codex/230-method-picker-mvc`, SHA `e3e91c98fde5348924e45c3eea4843ba04e0ffce`.
- Confirmed the current PR is broader than the earlier memory snapshot: 91 changed files, 4163 additions, 965 deletions.
- Noted lane-relevant changed surfaces:
  - `docs-src/docs/040-test-data/018-Schema-Definition.md`
  - `docs-src/docs/index.md`
  - method picker MVC/controller/view files under `packages/core-ui/js/gui_components/shared/method-picker-dialog/`
  - shared schema definition and schema row mapper files
  - help model builder and command spec parser files
  - generator schema sync/runtime files
  - faker command runner and faker validator files
  - faker command definitions and helper keyword definitions
  - responsive layout and schema edit browser tests

Observations and results:

- Issue #230 asks for a componentized MethodPickerDialog with Method Navigator, Method List, and Method Help Display, plus component-level tests and Storybook entries.
- Lane 3 coverage therefore focuses on whether the deployed app and published docs present a consistent command/help model after the MVC split.
- Techniques selected:
  - documentation testing
  - consistency/oracle checking
  - risk-based testing from changed files
  - exploratory testing
  - state/flow modeling across app help, picker inventory, docs pages, and runtime examples
  - negative/stale content heuristics for removed/deprecated command forms

---
## 2026-06-28T13:48:00+01:00

- What you think you want to do and why

Prove that I can open the deployed test environment in a browser and interact with the app before any substantive lane testing, as required.

Actions:

- Opened deployed test environment:
  - https://eviltester.github.io/grid-table-editor/site/
- Observed home page title and H1:
  - Title: `AnyWayData - Data Table Editor & Generator`
  - H1: `AnyWayData - Data Table Editor & Generator`
- Used the visible `Use The Application` link to navigate into:
  - https://eviltester.github.io/grid-table-editor/site/app.html
- Waited for libraries to load and inspected visible controls.
- Confirmed app loaded with grid/import/export/generator controls, including:
  - `Show help`
  - `Add Row`
  - `Generate`
  - `Generate Combinations`
  - `Grid to Enum Schema`
  - schema row editor controls
  - output format docs/help links

Observations and results:

- Browser interaction was proven on the deployed site before lane testing.
- The app is available at `/site/app.html`.
- App navigation also exposes root routes such as `/grid-table-editor/generator.html`; later route identity checks showed both root and `/site/` app/generator routes are currently live, so this is not a broken-link defect.

---
## 2026-06-28T13:50:00+01:00

- What you think you want to do and why

Inventory deployed app help links and compare them against the changed docs/help surface. The goal is to catch stale docs links, missing docs links, and help text that no longer matches the picker/runtime model.

Actions:

- Extracted `data-help-text` and help links from the deployed app and generator surfaces.
- App help links and examples sampled:
  - Generate help links to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`.
  - N-wise generation help links to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/n-wise-testing`.
  - Domain data help links to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`.
  - Domain help examples in app: `person.fullName()`, `number.int(1,10)`, `internet.email()`.
  - Grid to enum schema help has descriptive text but no docs link.
- Checked representative route/link identities:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
  - https://eviltester.github.io/grid-table-editor/generator.html
- Checked HTTP status for representative docs/help links:
  - `/site/docs/test-data/test-data-generation` -> 200
  - `/site/docs/test-data/n-wise-testing` -> 200
  - `/site/docs/test-data/domain/domain-test-data` -> 200
  - `/site/docs/test-data/domain/science` -> 200
  - `/site/docs/test-data/domain/number` -> 200
  - `/site/docs/test-data/faker/helpers` -> 200
  - `/site/docs/test-data/Schema-Definition` -> 200

Observations and results:

- No broken representative docs links found.
- `/site/generator.html` and `/generator.html` both resolve to a live `Data Generator - AnyWayData` page.
- `/site/app.html` and `/app.html` both resolve to the editor app, though the root `/app.html` identity text starts directly in app content and does not show the same header text as `/site/app.html` in the sampled viewport.
- Grid-to-enum schema help has no docs link. This may be intentional, but it is a content gap if that feature is expected to be discoverable from the same help system as Generate and N-wise Generate.

---
## 2026-06-28T13:51:30+01:00

- What you think you want to do and why

Compare published docs and app command inventories for changed command families. The PR changed command definitions, command help metadata, schema parsing/validation, and method picker MVC, so stale or mismatched docs are high risk.

Actions:

- Opened published Domain Test Data docs:
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data
- Reviewed domain overview content and quick examples:
  - `person.firstName()`
  - `person.lastName()`
  - `internet.email()`
  - `location.streetAddress()`
  - `location.cardinalDirection(abbreviated=true)`
  - `date.between(from=1577836800000, to=1659312000000)`
  - `finance.iban(formatted=true, countryCode="GB")`
  - `number.int(min=32, max=47)`
- Extracted deployed generator command inventories by switching the schema row field type on the deployed generator page:
  - Domain command count: 252 options.
  - Faker command count: 14 options.
- Sampled domain picker options:
  - `airline.aircraftType`
  - `animal.bear`
  - `autoIncrement.sequence`
  - `book.author`
  - `chemicalElement.atomicNumber`
  - `chemicalElement.name`
  - `chemicalElement.symbol`
  - `number.int`
  - `person.fullName`
  - `unit.name`
  - `unit.symbol`
- Sampled faker picker options:
  - `helpers.arrayElement`
  - `helpers.arrayElements`
  - `helpers.fake`
  - `helpers.fromRegExp`
  - `helpers.maybe`
  - `helpers.multiple`
  - `helpers.mustache`
  - `helpers.rangeToNumber`
  - `helpers.replaceCreditCardSymbols`
  - `helpers.replaceSymbols`
  - `helpers.shuffle`
  - `helpers.slugify`
  - `helpers.uniqueArray`
  - `helpers.weightedArrayElement`

Observations and results:

- The Domain Test Data overview says `helpers.*` is intentionally faker-only and not part of the domain abstraction. This matches the app picker split: no `helpers.*` commands were found in the domain picker, while 14 `helpers.*` commands were found in the faker picker.
- The Domain Test Data docs list a `science` domain in navigation and link to a live `science Domain` page.
- The deployed app domain picker has no `science.*` options.
- The deployed app instead exposes the science-like commands as top-level `chemicalElement.*` and `unit.*` domain commands.

---
## 2026-06-28T13:52:30+01:00

- What you think you want to do and why

Investigate the `science` domain mismatch to decide whether it is a concrete docs/help consistency defect or just a naming nuance.

Actions:

- Opened the published science domain docs:
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/science
- Recorded visible docs examples:
  - `science.chemicalElement.atomicNumber`
  - `science.chemicalElement.name`
  - `science.chemicalElement.symbol`
  - `science.unit.name`
  - `science.unit.symbol`
- Compared these to the deployed domain picker inventory:
  - no options containing `science`
  - present top-level options:
    - `chemicalElement.atomicNumber`
    - `chemicalElement.name`
    - `chemicalElement.symbol`
    - `unit.name`
    - `unit.symbol`
- Attempted practical runtime checks in deployed app/generator text/schema flows. App row controls and text mode were intermittently difficult to manipulate through the in-app browser, so I did not treat runtime output as conclusive for this specific mismatch.

Observations and results:

- Confirmed docs-vs-picker mismatch:
  - Published docs advertise `science.*` command examples.
  - Deployed picker offers equivalent command families without the `science.` prefix.
- This is a replicable content consistency issue because it can be reproduced by comparing the live docs page to the live picker inventory.
- Suggested defect title:
  - `Published science domain docs use science.* commands that are absent from the deployed method picker`
- Suggested severity:
  - Medium for docs/help consistency. Users copying documented `science.*` examples may not find them in the picker and may not know to use `chemicalElement.*` or `unit.*`.
- Follow-up owner:
  - Main agent should decide whether to create a defect file. Lane 3 considers this confirmed as a docs/help consistency defect.

---
## 2026-06-28T13:53:15+01:00

- What you think you want to do and why

Check validator/parameter docs consistency for a representative structured command because the PR changed schema parsing, validation, params editor, and command help metadata.

Actions:

- On the deployed generator page, switched schema row field type to `domain`.
- Selected `number.int` from the deployed picker shadow select.
- Extracted app help metadata for `number.int`.
- Opened published number domain docs:
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number
- Compared app help to docs.

Observations and results:

- App help for `number.int` links to `/site/docs/test-data/domain/number`.
- App help text names canonical call `awd.domain.number.int`.
- App help shows call shape `awd.domain.number.int(min?, max?, multipleOf?)`.
- App help shows schema params field as `(min, max, multipleOf)`.
- App params field placeholder is positional: `Params e.g. (10)`.
- Published docs list named examples such as:
  - `number.int()`
  - `number.int(max=10, min=1)`
  - `number.int(max=5)`
  - `number.int(multipleOf=1)`
- The docs and app agree on parameters, but they use different mental models:
  - Docs examples are named-call style.
  - Row editor params help is positional tuple style.
- This is not a confirmed defect from lane 3, but it is a usability/content risk. Users may copy named docs examples into the row editor params field and expect it to work, while the app help suggests positional params.

---
## 2026-06-28T13:53:45+01:00

- What you think you want to do and why

Review published faker helper docs against the faker picker inventory because helpers are a primary changed command family and the docs explicitly separate faker helpers from the domain abstraction.

Actions:

- Opened published Faker Helpers docs:
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers
- Compared docs examples and headings to deployed faker picker inventory.
- Docs common examples include:
  - `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `helpers.mustache("Hello {{name}}", { name: "Ada" })`
  - `helpers.fromRegExp("[A-Z]{2}[0-9]{3}")`
- Docs Helper Methods headings include:
  - `helpers.arrayElement`
  - `helpers.arrayElements`
  - `helpers.slugify`
  - `helpers.replaceSymbols`
  - `helpers.replaceCreditCardSymbols`
  - `helpers.shuffle`
  - `helpers.uniqueArray`
  - `helpers.weightedArrayElement`
  - `helpers.rangeToNumber`
  - `helpers.maybe`
  - `helpers.multiple`
- Deployed faker picker inventory includes all of the above plus:
  - `helpers.fake`
  - `helpers.fromRegExp`
  - `helpers.mustache`

Observations and results:

- No faker helper command was found in the picker that is completely absent from the docs page; the three extra picker commands are documented as common examples.
- Content gap: `helpers.fake`, `helpers.mustache`, and `helpers.fromRegExp` are selectable methods but are not listed in the `Helper Methods` section. This may make the docs look incomplete when compared to the picker.
- The docs explicitly say `domain.helpers.arrayElement(...)` is invalid and will fail with `helpers_not_supported_in_domain`; this aligns with the deployed picker split.
- Potential follow-up: decide whether the Helper Methods section should list all selectable helper methods, not just the subset after the common examples.

---
## 2026-06-28T13:54:00+01:00

- What you think you want to do and why

Close the lane with summary, gaps, and recommendations for the main agent.

Actions:

- Reviewed collected evidence against the lane charter:
  - published docs
  - app help
  - generator help
  - method picker exposed inventory
  - details/help metadata for `number.int`
  - docs links and route identity
- Classified findings.

Observations and results:

- Confirmed defect candidate:
  - Published `science Domain` docs show `science.*` examples, but deployed picker has no `science.*` commands and instead exposes `chemicalElement.*` and `unit.*`.
- Suspicious/content-risk items:
  - Grid-to-enum schema help has no docs link while adjacent Generate/N-wise actions do have docs links.
  - `number.int` docs use named-call examples while row-editor params help/placeholder uses positional params; this may be confusing when copying docs examples into the app.
  - Faker Helpers docs show `helpers.fake`, `helpers.mustache`, and `helpers.fromRegExp` as examples, but not as method-section entries even though they are selectable picker methods.
- Healthy/covered observations:
  - Representative docs/help links resolved with HTTP 200 and loaded expected page identities.
  - Domain/faker split for `helpers.*` is consistent across docs and picker inventory.
  - `number.int` app help links to the correct number domain docs and exposes documented params.
  - App/generator root and `/site/` routes both loaded live deployed pages.

Lane 3 coverage performed:

- Docs pages reviewed:
  - `/site/docs/test-data/test-data-generation`
  - `/site/docs/test-data/n-wise-testing`
  - `/site/docs/test-data/domain/domain-test-data`
  - `/site/docs/test-data/domain/science`
  - `/site/docs/test-data/domain/number`
  - `/site/docs/test-data/faker/helpers`
  - `/site/docs/test-data/Schema-Definition`
- App/generator help surfaces reviewed:
  - app `Generate` help
  - app `Generate Combinations` help
  - app `Grid to Enum Schema` help
  - shared schema domain help
  - generator row editor domain/faker picker inventory
  - `number.int` help/details metadata
- Command families sampled:
  - domain overview
  - domain `number`
  - science-like chemical/unit commands
  - faker `helpers`
  - generate/n-wise/grid-to-enum action help

Gaps and deferred ideas:

- Runtime output comparison for docs examples was only partially attempted. The deployed UI accepted some interactions, but row/text schema controls were difficult to manipulate reliably through this in-app browser session; another lane with a different browser automation surface may be able to execute more examples end to end.
- I did not exhaustively compare all 252 domain picker commands to all domain docs pages.
- I did not open Storybook component docs/stories; this lane was limited to deployed app/docs surfaces and the published Storybook URL was not provided in the prompt.
- I did not verify the parameter editor modal UI by opening it; I inspected exposed metadata and button state for `number.int`.
- I did not generate screenshots because the main evidence was textual docs/picker inventory. A screenshot would be useful if the main agent creates a defect file for the `science` mismatch.

Recommendation:

- Create one defect from lane 3 for the `science.*` docs mismatch.
- Track the grid-to-enum docs link gap, named-vs-positional params ambiguity, and faker helper method-section incompleteness as suspicious content risks unless later lanes reproduce them as user-visible failures.

---


### negative-validation-test-log.md

---
## 2026-06-28T13:55:56+01:00

- What you think you want to do and why

Run negative validation and malformed parameter testing against deployed generator/app/docs surfaces because PR #247 changed command parsing, schema validation, faker validators, helper validation, and invalid text-to-schema conversion.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used https://eviltester.github.io/grid-table-editor/site/generator.html and generator root route. Tested text-mode malformed command-like values (`person.notACommand`, `image.urlLoremFlickr`), malformed arrays, missing object properties, out-of-range values, explicit `literal(...)` and `regex(...)` wrappers, empty schema, invalid row-mode params, method-picker negative searches, documented invalid `domain.helpers.fake(...)`, and conversion from invalid text schema to Schema UI.

the observations and results that you make

No confirmed repeatable negative-validation defects were found. Unknown command-like text failed clearly rather than falling through. Removed `image.urlLoremFlickr` failed clearly. Bad helper arrays and semantic invalid ranges produced actionable messages. Explicit literal/regex wrappers behaved as intended. Text-to-schema conversion showed a confirmation and converted invalid rules to literal when accepted. Suspicious risks: malformed regex-like shorthand can silently become literal, and some validation messages appear in both summary and row-level status.

Techniques and heuristics used: negative testing, boundary analysis, parser fallback checking, equivalence partitioning, documentation testing, and state/flow modeling.

---


### responsive-accessibility-test-log.md

---
## 2026-06-28T14:22:00+01:00

- What you think you want to do and why

Run responsive/mobile and accessibility review for the deployed generator and Method Picker Dialog because PR #247 changed modal/list/help component structure and responsive tests.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Delegated responsive/accessibility lane was spawned and asked to wrap up. Main-agent overlapping coverage emulated 390x844 mobile viewport, opened deployed generator, opened Method Picker Dialog, captured mobile screenshots, and ran a Chrome DevTools Lighthouse snapshot against the mobile picker state. Evidence saved in screenshots and support/lighthouse-mobile-picker.

the observations and results that you make

The mobile picker opened and was usable, but dense. Lighthouse accessibility score was 87 with failures including method-picker heading order and a `section.method-picker-list` with `role=listbox`, plus broader preview-grid ARIA issues. The params editor also exposes disabled optional checkboxes with accessible labels beginning `Required ...`, contradicting optional parameter metadata.

---


### storybook-parity-test-log.md

---
## 2026-06-28T14:24:00+01:00

- What you think you want to do and why

Check Storybook/component parity because PR #247 adds MethodPickerDialog stories and splits navigator, list, and help display into components.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Delegated Storybook parity lane was spawned and asked to wrap up. Main-agent overlapping coverage checked deployed Storybook routes. `https://eviltester.github.io/grid-table-editor/storybook/` and `/storybook/index.html` returned 200; `/site/storybook/` returned 404. Opened Storybook and confirmed the sidebar includes `Method Picker Dialog` and related app/generator/schema stories. The Storybook app page story exposed the same schema row controls inside the preview iframe.

the observations and results that you make

Storybook is deployed and discoverable at the root `/storybook/` path. Method Picker Dialog story group is present. No confirmed Storybook-specific defect was found in the main-agent fallback pass. Deeper story-level parity was deferred because the delegated lane did not return before packaging.

---


### ux-regression-test-log.md

---
## 2026-06-28T14:20:00+01:00

- What you think you want to do and why

Run UX/usability and workflow regression coverage for generator, method picker, params editor, help, app integration, and related flows.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Delegated UX lane was spawned with this charter and asked to wrap up. Main-agent overlapping coverage opened generator, switched row types, opened/cancelled/applied the Method Picker, searched by command and parameter, applied `internet.email`, opened the params editor, generated `(provider="example.com")`, previewed generated data, checked text-mode schema normalization, and opened Storybook app composition.

the observations and results that you make

Primary flows worked: picker apply changed row type correctly, params editor generated params, documented provider example generated `@example.com` values, and text-mode normalized several rule forms. UX risks: dense mobile picker, silent normalization of docs examples, and Output Preview staying empty while Data Table Preview is populated in several generator flows.

---


## Defects

# Defect 001 - Raw regex shorthand with comma quantifiers is parsed as enum values

Severity: Medium

Status: Confirmed repeatable

## Summary

A raw regex shorthand copied from published docs, `[A-Z]{3,6}[0-9]{0,6}`, is not treated as a regex. In deployed generator text mode it is normalized as an enum split at commas inside the regex quantifiers, producing malformed values such as company names suffixed with `6}` or `6}[0-9]{0`.

## Environment

- Deployed URL: https://eviltester.github.io/grid-table-editor/generator.html
- Story: https://github.com/eviltester/grid-table-editor/issues/230
- PR: https://github.com/eviltester/grid-table-editor/pull/247

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Company
company.name
Regex Generated Field
[A-Z]{3,6}[0-9]{0,6}
```

4. Set preview count to 5.
5. Click `Preview`.

## Expected Result

The second field should generate strings matching the regex, e.g. 3-6 uppercase letters optionally followed by 0-6 digits.

## Actual Result

The regex rule is normalized to an enum-like rule and generated values contain fragments split around regex quantifier commas.

## Evidence

- Screenshot: `../screenshots/defect-001-raw-regex-input.png`
- Screenshot: `../screenshots/defect-001-raw-regex-after.png`
- Video: `../videos/defect-001-raw-regex-comma-quantifier.webm`
- Support data: `../support/defect-001-repeat-evidence.json`

## Notes for Fix Agent

Schema docs state raw regex patterns are accepted when text does not look command-like. The parser should not split raw regex quantifier commas as enum separators, or docs should require explicit `regex(...)` for comma quantifiers.


# Defect 002 - Params editor labels optional parameters as Required in accessibility tree

Severity: Medium

Status: Confirmed repeatable

## Summary

The params editor for commands such as `internet.email` displays optional parameters, but the disabled checkbox accessible names say `Required allowSpecialCharacters`, `Required firstName`, `Required lastName`, and `Required provider`.

## Steps to Reproduce

1. Open https://eviltester.github.io/grid-table-editor/generator.html.
2. Set a row to `domain`.
3. Open the Method Picker and select `internet.email`.
4. Click `Edit params for internet.email`.
5. Inspect the params editor accessibility snapshot or screen-reader labels.

## Expected Result

Optional parameters should not be announced as required. Disabled indicators should have labels that reflect optional status or should be hidden from assistive tech if purely visual.

## Actual Result

Optional parameter controls are announced with labels beginning `Required ...`, contradicting the visible optional metadata and help model.

## Evidence

- Screenshot: `../screenshots/defect-002-params-optional-required-label.png`
- Video: `../videos/defect-002-params-optional-required-label.webm`

## Notes for Fix Agent

Update params editor labeling so the Req column and accessibility names use actual required state. This is likely in the shared params editor/modal component.


# Defect 003 - Faker Helpers docs uniqueArray example using this.word.sample fails in runtime

Severity: Medium

Status: Confirmed repeatable

## Summary

The published Faker Helpers docs include `helpers.uniqueArray(this.word.sample, 5)`, but the deployed generator rejects that syntax as unsafe/complex. The equivalent `helpers.uniqueArray(faker.word.sample, 5)` succeeds.

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Words
helpers.uniqueArray(this.word.sample, 5)
```

4. Click `Preview`.

## Expected Result

The documented example should generate an array of unique words, or docs should show the supported syntax.

## Actual Result

The deployed app rejects the example and does not generate rows.

## Evidence

- Video: `../videos/defect-003-helpers-unique-this-doc-example.webm`
- Related docs: https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers

## Notes for Fix Agent

Either support the documented `this.word.sample` syntax in safe helper parsing or update docs/examples to the deployed-supported `faker.word.sample` form.


# Defect 004 - Faker Helpers docs multiple arrow callback example fails in runtime

Severity: Medium

Status: Confirmed repeatable

## Summary

The published Faker Helpers docs include `helpers.multiple(() => this.person.firstName(), { count: 3 })`, but the deployed generator rejects the arrow callback syntax as unsafe/complex.

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Names
helpers.multiple(() => this.person.firstName(), { count: 3 })
```

4. Click `Preview`.

## Expected Result

The documented example should generate an array of three first names, or the docs should show syntax supported by the deployed parser.

## Actual Result

The example fails validation and does not generate rows.

## Evidence

- Video: `../videos/defect-004-helpers-multiple-this-arrow-doc-example.webm`
- Related docs: https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers

## Notes for Fix Agent

This may be an intentional parser safety restriction. If so, docs should avoid arrow callbacks and `this.*` examples that cannot execute in the deployed generator.


# Defect 005 - Science docs and picker/help use inconsistent command names

Severity: Low

Status: Confirmed repeatable

## Summary

The published science domain docs and picker help show canonical/full calls using `science.chemicalElement.*` and `science.unit.*`, while the selectable picker commands and normalized schema text use `chemicalElement.*` and `unit.*` without the `science.` prefix. Runtime normalizes the docs form and generates data, so this is a docs/help naming consistency defect rather than a hard generation failure.

## Steps to Reproduce

1. Open https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/science/.
2. Observe examples such as `science.chemicalElement.name` and canonical `awd.domain.science.chemicalElement.name`.
3. Open the deployed generator and search the Method Picker for `science`.
4. Observe selectable commands such as `chemicalElement.name`, while help details still show `science.chemicalElement.name` as the full call.
5. Paste `science.chemicalElement.name` in text schema and preview.

## Expected Result

Docs, picker command names, help details, and normalized schema text should use one consistent command spelling, or clearly explain aliases.

## Actual Result

The user sees both `science.chemicalElement.name` and `chemicalElement.name` for the same concept. Text mode normalizes the documented form to the picker form.

## Evidence

- Screenshot: `../screenshots/defect-005-science-docs.png`
- Video: `../videos/defect-005-science-command-normalization.webm`
- Support data: `../support/defect-science-docs-evidence.json`
- Support data: `../support/science-runtime-compare.json`

## Notes for Fix Agent

Decide whether `science.` is an alias or obsolete namespace. Then align docs, picker tile command names, full-call examples, and normalization behavior.


# Defect 006 - Method picker listbox uses incompatible ARIA structure

Severity: Medium

Status: Confirmed repeatable by Lighthouse snapshot

## Summary

The Method Picker Dialog list surface uses a `section.method-picker-list` with `role=listbox`. Lighthouse/axe reports the role is inappropriate for the element and contributes to an ill-formed accessibility tree. This area was changed by the MethodPickerDialog MVC work.

## Steps to Reproduce

1. Open the deployed generator.
2. Set a row to `domain` or `faker`.
3. Open the Method Picker Dialog.
4. Run an accessibility snapshot/audit on the current page.

## Expected Result

The Method Picker List should expose valid listbox/options semantics with required ARIA parent/child relationships.

## Actual Result

Lighthouse reports an accessibility-tree failure for `section.method-picker-list` with `role=listbox`, stating that the ARIA role should be appropriate for the element.

## Evidence

- Screenshot: `../screenshots/loop1-mobile-method-picker.png`
- Video: `../videos/defect-006-method-picker-aria-listbox-mobile.webm`
- Lighthouse report: `../support/lighthouse-mobile-picker/report.html`
- Lighthouse JSON: `../support/lighthouse-mobile-picker/report.json`

## Notes for Fix Agent

Inspect the Method List view markup. Consider using a `div` or `ul` with valid listbox semantics and ensure options are direct/valid children per ARIA expectations.

