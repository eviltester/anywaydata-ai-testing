# Issue 246 Collated Logs And Defects

This file collates the full content of the main log, delegated lane logs, and defect files for PDF export.


***

# Collated File: issue-246-test-log.md

# Issue 246 Test Log

---
## 2026-06-25T15:20:00+01:00

- What you think you want to do and why

Start the issue #246 deployed-environment exploratory review by resolving the target issue, story, PR, test environment, and output folder. This establishes the scope before browser testing and delegation.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read GitHub issue `https://github.com/eviltester/grid-table-editor/issues/246`.
- Read story `https://github.com/eviltester/grid-table-editor/issues/226`.
- Read PR `https://github.com/eviltester/grid-table-editor/pull/231`.
- Created output folder `docs/testing/20260625/issue-246-001/` with `logs`, `support`, `screenshots`, and `defects` subfolders.
- Saved the issue prompt to `issue-246-session-goal-prompt.md`.
- Created delegated lane charters for command coverage, negative validation, docs consistency, UX regression, and responsive/accessibility review.

the observations and results that you make

- Issue #246 is open and requests a comprehensive multi-agent exploratory review of `https://eviltester.github.io/grid-table-editor/site/`.
- Story #226 is closed and asks that every command definition has usage examples and validators.
- PR #231 is merged and includes broad changes across command examples, validators, docs, help metadata, generator/app generation feedback, method picker, params editor, and schema validation.
- The review will use deployed pages only and will not run local build, package-manager, verify, or repo test commands.

---
## 2026-06-25T15:17:40+01:00

- What you think you want to do and why

Prove browser control before substantive testing, then run a small main-agent smoke across the deployed site, app, and generator so the session has direct runtime evidence independent of delegated lanes.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/site/` with Playwright CLI session `issue246-main`.
- Captured a snapshot of the deployed site home page.
- Clicked the `Docs` navigation link and verified navigation to `https://eviltester.github.io/grid-table-editor/site/docs/intro`.
- Captured screenshots:
  - `screenshots/main-proof-site-home.png`
  - `screenshots/main-proof-docs-after-click.png`
- Opened the site-linked app page `https://eviltester.github.io/grid-table-editor/site/app.html`.
- Clicked `Add Row`.
- Captured `screenshots/main-app-add-row-proof.png`.
- Opened `https://eviltester.github.io/grid-table-editor/generator.html`.
- Filled row mode schema:

  ```text
  Column Name: Status
  Field type: enum
  Value / Regex: Open,In Progress,Closed
  ```

- Clicked `Preview`.
- Captured `screenshots/main-generator-enum-preview-valid.png`.
- Wrote structured evidence to `support/main-proof-and-smoke-results.json`.

the observations and results that you make

- Browser access and interaction were confirmed.
- The site home page loaded with title `AnyWayData - Data Table Editor & Generator`.
- The Docs navigation link worked and landed on the About docs page.
- The app `Add Row` button changed the grid status to `Total rows: 1`.
- The generator enum preview produced CSV values from the expected set: `Open`, `In Progress`, and `Closed`.
- Two earlier generator attempts were invalid setup, not product defects: stale refs caused a partial row setup, and the app correctly showed required-value validation messages.

---
## 2026-06-25T16:20:00+01:00

- What you think you want to do and why

Integrate the five delegated lanes and classify the repeated findings into confirmed defects, suspicious behavior, and deferred coverage.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read all delegated logs under `logs/`.
- Reviewed support data and screenshots produced by the lanes.
- Created split defect files under `defects/`.
- Grouped repeated root-cause patterns where the same validation behavior appeared across several commands.

the observations and results that you make

- Positive command coverage is broadly healthy across domain commands, helper/faker commands, aliases, structured params, constrained params, CSV, and JSON output.
- The strongest functional defect pattern is invalid semantic params generating `**ERROR**` rows as data.
- The strongest accessibility defect pattern is critical ARIA grid structure failures in app/generator pages.
- Docs/help/runtime are mostly consistent for the sampled PR #231 highlights, especially `internet.httpMethod`, `location.cardinalDirection(abbreviated=true)`, and `helpers.mustache`.
- The deployed `/site/` app/generator shell has routing and mobile nav issues that should be triaged separately from command correctness.

---
## 2026-06-25T16:30:00+01:00

- What you think you want to do and why

Complete Loop 2 and Loop 3 consolidation by generating follow-up ideas from uncovered areas, executing the already delegated high-value checks, and deciding what remains deferred.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed Loop 2 ideas from command coverage and negative validation:
  - helper commands
  - helper aliases
  - removed command behavior
  - unknown command behavior
  - malformed params
  - docs/picker/runtime consistency
  - embedded Test Data UX
  - mobile nav focus
  - axe grid structure
  - docs contrast
- Reviewed Loop 3 ideas from command coverage and responsive/accessibility:
  - additional domain families
  - JSON output
  - semantic impossible params across command families
  - root vs `/site/` app/generator behavior
  - mobile settings panel geometry
  - landmark and heading checks
- Promoted repeatable findings into the main report.

the observations and results that you make

- Loop 2 and Loop 3 yielded meaningful new information, but by the end the repeated themes were stable.
- Further value is likely in implementation triage or exhaustive command-matrix automation, not another exploratory loop in this session.
- Deferred ideas are explicitly listed in the main report.

---
## 2026-06-25T16:38:00+01:00

- What you think you want to do and why

Perform the mandatory final review loop before generating PDFs and publishing the results.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed story #226 requirements.
- Reviewed PR #231 summary and changed surfaces.
- Reviewed accumulated logs, support files, screenshots, and defect files.
- Reviewed sampled command families, docs pages, examples tried, defects found, suspicious behavior, and coverage gaps.
- Updated `issue-246-test-report.md` with final coverage, findings, loop results, and recommendation.

the observations and results that you make

- The happy path for structured command examples and validators is strong across the sampled command families.
- The deployed app is not clean from a quality perspective because validation, responsive, and accessibility findings remain.
- Stopping is justified because all required lanes completed, multiple loops completed, the final review loop completed, and recent findings stabilized around known patterns rather than new categories.

---


***

# Collated File: logs/command-coverage-test-log.md

* * *
## 2026-06-25 15:14:00 +01:00

  * What you think you want to do and why

Start the delegated command coverage lane for issue #246 / story #226 / PR #231. I want to prove browser interaction against the deployed GitHub Pages environment before substantive testing, then derive coverage from PR changes and published docs/help rather than local code execution.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Read the existing session prompt at `docs/testing/20260625/issue-246-001/issue-246-session-goal-prompt.md`. Reviewed GitHub issue #246, story #226, and PR #231 metadata via GitHub/API. Confirmed PR #231 is closed and titled `Implement structured command usage examples and validators`; summary says it makes `usageExamples` the source of truth, adds contract tests for usage examples/validators/example execution, adds explicit validators, updates docs/help/fixtures, adds `internet.httpMethod`, and removes deprecated `image.urlLoremFlickr`. Confirmed changed-file inventory is very large: 791 files, including all domain docs under `docs-src/docs/040-test-data/domain/`, new keyword definition files for many domains, faker helper definitions, help/model UI files, validators, and docs generation scripts.

the observations and results that you make

Scope for this delegated lane: broad command coverage and example execution only. Coverage risks are the wide migration of command definitions, structured example rendering, runtime execution of documented examples, validator behavior, newly added `internet.httpMethod`, removed `image.urlLoremFlickr`, and consistency between deployed docs, app help, method picker, and generated data behavior. No app code, build, local test, or verify commands were run.

* * *
* * *
## 2026-06-25 15:18:00 +01:00

  * What you think you want to do and why

Prove deployed browser access before substantive testing, as required by issue #246, and save evidence that the page was interactive rather than merely fetched.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/` using Playwright MCP. The first navigation returned `net::ERR_CONNECTION_RESET`; retried immediately and the page loaded with title `AnyWayData - Data Table Editor & Generator`. Captured an accessibility snapshot showing the site header, `App`, `Docs`, `Blog`, `GitHub`, and dark/light theme toggle. Clicked the visible theme toggle button labelled `Switch between dark and light mode (currently dark mode)`.

Saved and visually verified screenshot evidence at `../screenshots/command-coverage-browser-proof.jpg`.

the observations and results that you make

Browser interaction is proven. After the click, the theme toggle label changed to `Switch between dark and light mode (currently light mode)`, showing a real state change in the deployed UI. The screenshot shows the live GitHub Pages test environment in light mode. The initial connection reset appears transient because the retry succeeded.

* * *
* * *
## 2026-06-25 15:36:00 +01:00

  * What you think you want to do and why

Run Loop 1 broad positive command coverage from changed docs examples. I want one schema that crosses multiple changed domain families, structured/constrained parameters, a newly added command, and multi-example docs surfaces, then compare deployed docs examples against actual generator preview output.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed deployed docs pages and extracted visible examples from:

- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/color/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/autoIncrement/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/`

Opened `https://eviltester.github.io/grid-table-editor/site/generator.html`, clicked `Edit as Text`, set rows and preview count to 3, and entered this schema:

```text
Email
internet.email(provider="example.com")
HTTPMethod
internet.httpMethod(commonOnly=true)
RGB
color.rgb(format="hex", includeAlpha=true)
Seq
autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)
Amount
finance.amount(max=10, min=1)
Alpha
string.alpha(length=5, casing="upper", exclude=["A","B","C"])
DateBetween
date.between(from=1577836800000, to=1609372800000)
ImageUrl
image.url(width=1)
```

Clicked `Generate Data`, then clicked `Preview`. Saved raw schema/output evidence to `../support/command-coverage-loop1-positive.json`.

the observations and results that you make

`Generate Data` reported `Download ready: generated-data.csv`. Preview produced 3 rows. Observed values matched the documented constraints:

- `internet.email(provider="example.com")` returned `@example.com` emails.
- newly added `internet.httpMethod(commonOnly=true)` returned common HTTP methods (`HEAD`, `DELETE`).
- `color.rgb(format="hex", includeAlpha=true)` returned 9-character hex colors such as `#0ecbeaa6`.
- `autoIncrement.sequence(...)` returned `filename001.txt`, `filename006.txt`, `filename011.txt`, showing stateful increment and zero-padding.
- `finance.amount(max=10, min=1)` returned decimal amounts within range.
- `string.alpha(length=5, casing="upper", exclude=["A","B","C"])` returned 5 uppercase letters with no A/B/C in sampled values.
- `date.between(...)` returned ISO dates within 2020.
- `image.url(width=1)` returned Picsum URLs containing `/1/<height>`.

No confirmed defect in this loop. Suspicious access condition: first navigation to several GitHub Pages URLs intermittently returned `ERR_CONNECTION_RESET`, but immediate retry succeeded.

* * *
* * *
## 2026-06-25 15:52:00 +01:00

  * What you think you want to do and why

Run Loop 2 focused on gaps from Loop 1: faker/helper commands, alias handling, canonical command names, and removed/deprecated commands. These are high-risk because PR #231 changed `usageExamples` and help metadata across nearly all command definitions.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Generated new test ideas from Loop 1 gaps and classified them:

1. execute-now: helper array element default example.
2. execute-now: helper array elements with object min/max parameter.
3. execute-now: helper string transform (`slugify`).
4. execute-now: helper symbol replacement (`replaceSymbols`).
5. execute-now: helper credit-card symbol replacement.
6. execute-now: helper array/object return (`shuffle`).
7. execute-now: helper object range (`rangeToNumber`).
8. execute-now: helper weighted array element with object array.
9. execute-now: helper templating (`mustache`).
10. execute-now: helper regex generation (`fromRegExp`).
11. execute-now: compare `helpers.*` and `faker.helpers.*` aliases.
12. execute-now: verify docs warning that `domain.helpers.*` is unsupported.
13. execute-now: verify canonical `awd.domain.internet.email(...)` execution.
14. execute-now: removed `image.urlLoremFlickr` behavior.

In `https://eviltester.github.io/grid-table-editor/site/generator.html`, replaced the schema text and clicked `Preview` with this helper schema:

```text
ArrayElement
helpers.arrayElement(["red", "green", "blue"])
ArrayElements
helpers.arrayElements(["red", "green", "blue"], { min: 1, max: 2 })
Slug
helpers.slugify("Hello world from AnyWayData")
ReplaceSymbols
helpers.replaceSymbols("Order-##??")
CCSymbols
helpers.replaceCreditCardSymbols("####-####-####-####")
Shuffle
helpers.shuffle(["a", "b", "c"], { inplace: false })
RangeNum
helpers.rangeToNumber({ min: 1, max: 10 })
Weighted
helpers.weightedArrayElement([{ weight: 5, value: "sunny" }, { weight: 2, value: "rainy" }, { weight: 1, value: "snowy" }])
Mustache
helpers.mustache("Hello {{name}}", { name: "Ada" })
FromRegExp
helpers.fromRegExp("[A-Z]{2}[0-9]{3}")
```

Saved raw helper output to `../support/command-coverage-loop2-helper-positive.json`.

Then tested alias/removed-command behavior using schemas containing `helpers.arrayElement(...)`, `faker.helpers.arrayElement(...)`, `domain.helpers.arrayElement(...)`, `awd.domain.internet.email(provider="example.com")`, `image.urlLoremFlickr`, `image.urlLoremFlickr()`, and `image.url(width=1)`. Saved evidence to:

- `../support/command-coverage-loop2-alias-validation.json`
- `../support/command-coverage-loop2-removed-command-message.json`
- `../support/command-coverage-loop2-alias-positive.json`
- screenshot: `../screenshots/command-coverage-removed-urlLoremFlickr-message.png`

the observations and results that you make

Helper commands executed successfully in preview:

- `helpers.arrayElement` returned one of red/green/blue.
- `helpers.arrayElements` returned JSON-like arrays of size 1-2.
- `helpers.slugify` returned `Hello-world-from-AnyWayData`.
- `helpers.replaceSymbols` returned strings like `Order-73WY`.
- `helpers.replaceCreditCardSymbols` returned formatted digit groups.
- `helpers.shuffle` returned shuffled arrays.
- `helpers.rangeToNumber` returned values inside 1-10.
- `helpers.weightedArrayElement` returned one of sunny/rainy/snowy.
- `helpers.mustache` returned `Hello Ada`.
- `helpers.fromRegExp` returned two uppercase letters plus three digits.

Alias checks:

- `helpers.arrayElement(...)` and `faker.helpers.arrayElement(...)` both executed.
- `awd.domain.internet.email(provider="example.com")` executed and returned `@example.com` values.
- `domain.helpers.arrayElement(...)` failed validation as expected, with message `helpers_not_supported_in_domain: helpers.* is faker-only; use faker.helpers.*`.

Suspicious behavior, repeatable: removed command `image.urlLoremFlickr` does not execute, which is good, but the validation message is misleading. `image.urlLoremFlickr` reports `Row 4: params should be wrapped in parentheses, e.g. (LoremFlickr).`; `image.urlLoremFlickr()` reports `Row 1: params should be wrapped in parentheses, e.g. (LoremFlickr().` This looks like the parser is treating removed `image.urlLoremFlickr` as `image.url` plus malformed params rather than reporting an unknown/removed command. This may be intentional parser behavior, but it is confusing enough to hand off as suspicious behavior.

* * *
* * *
## 2026-06-25 16:07:00 +01:00

  * What you think you want to do and why

Run Loop 3 / final review for this lane. I want to broaden command-family coverage beyond the high-risk internet/color/helper areas, include default no-parentheses calls, execute JSON output, and check whether recent loops are still producing materially new command behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Generated final review ideas and classifications:

1. execute-now: airline structured/constrained parameter example (`airline.seat(aircraftType="widebody")`).
2. execute-now: commerce price with all shown params.
3. execute-now: location numeric bounds.
4. execute-now: lorem default no-parentheses command.
5. execute-now: number bounded integer.
6. execute-now: person constrained parameter (`sex="female"`).
7. execute-now: system file-name extension parameter.
8. execute-now: vehicle default command.
9. execute-now: word length strategy/default behavior through a length-constrained noun.
10. execute-now: datatype enum array syntax.
11. execute-now: non-CSV output format with the same command set.
12. execute-now: generate file/download readiness after JSON command execution.
13. defer: exhaustive command-by-command sweep across every domain page; too broad for this delegated lane after representative coverage.
14. defer: deep negative validator matrix; covered by the separate negative-validation lane.
15. defer: full method picker UX; covered by UX/docs lanes, with this lane limited to command execution.

Extracted deployed docs snippets for `airline`, `commerce`, `location`, `lorem`, `number`, `person`, `system`, `vehicle`, `word`, and `datatype`; saved this docs extract to `../support/command-coverage-loop3-doc-extract.json`.

In `https://eviltester.github.io/grid-table-editor/site/generator.html`, entered this schema, changed Output Format to `JSON`, set rows/preview count to 2, clicked `Preview`, then clicked `Generate Data`:

```text
Seat
airline.seat(aircraftType="widebody")
Price
commerce.price(dec=2, max=10, min=1, symbol="$")
Latitude
location.latitude(max=10, min=1)
LoremWord
lorem.word
Int
number.int(max=10, min=1)
FirstName
person.firstName(sex="female")
FileName
system.commonFileName(extension="txt")
VIN
vehicle.vin
Noun
word.noun(length=5)
EnumValue
datatype.enum(values=["GET","POST","PUT","PATCH"])
```

Saved raw output to `../support/command-coverage-loop3-domain-json-positive.json`. Checked browser console messages after the loop.

the observations and results that you make

JSON preview produced two objects with expected command-family behavior:

- `airline.seat(aircraftType="widebody")` returned values like `47H`, `20D`.
- `commerce.price(...)` returned currency strings within the requested 1-10 range, e.g. `$5.65`, `$9.15`.
- `location.latitude(max=10, min=1)` returned numeric latitude values in range.
- `lorem.word` executed without parentheses and returned words.
- `number.int(max=10, min=1)` returned integers in range.
- `person.firstName(sex="female")` returned plausible first names.
- `system.commonFileName(extension="txt")` returned `.txt` filenames.
- `vehicle.vin` returned VIN-like strings.
- `word.noun(length=5)` returned five-letter nouns in the sample (`slide`, `alert`).
- `datatype.enum(values=["GET","POST","PUT","PATCH"])` returned one of the supplied values.

No confirmed execution defect found in Loop 3. Console after the full session showed no `error` messages. It did show generic browser issues (quirks mode, unlabeled/id-less form fields) and a repeated warning: `[@faker-js/faker]: faker.image.urlLoremFlickr() is deprecated since v10.1.0 and will be removed in v11.0.0. Please use faker.image.url() instead.` This appeared after the removed-command checks and supports the suspicious behavior note that deprecated `urlLoremFlickr` may still be touched internally even though it is removed from visible docs and does not successfully preview.

Stopping rationale for this lane: three loops were completed; coverage crossed 25+ command examples across domain commands, helper/faker commands, newly added, removed/deprecated, validator/structured params, default and parameterized docs examples, CSV and JSON output. The latest loop added breadth but did not reveal new execution failures, so further work is better routed to the negative-validation/docs/UX lanes or a full exhaustive command matrix.

* * *


***

# Collated File: logs/docs-consistency-test-log.md

---
## 2026-06-25T15:26:00+01:00

- What you think you want to do and why

Establish the delegated docs/help/content consistency lane for issue #246 before substantive deployed-site testing. The lane needs a clear oracle because the story and PR changed command help metadata, usage examples, validators, generated docs, method picker details, and deprecated command visibility.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created this log at `docs/testing/20260625/issue-246-001/logs/docs-consistency-test-log.md`. Reviewed the lane request and the GitHub context:

- Issue #246: `https://github.com/eviltester/grid-table-editor/issues/246`
- Story #226: `https://github.com/eviltester/grid-table-editor/issues/226`
- PR #231: `https://github.com/eviltester/grid-table-editor/pull/231`
- Deployed test environment: `https://eviltester.github.io/grid-table-editor/site/`

Captured the docs-consistency charter as: compare deployed site docs pages, app/generator help, method picker details, links, examples, and deprecated or renamed commands. Operating boundary: test only the deployed GitHub Pages environment and linked deployed app/docs pages under `https://eviltester.github.io/grid-table-editor/`; do not edit app code; do not run local build/test/verify commands.

Planned focused coverage areas:

1. Browser access proof and deployed page inventory.
2. Published docs pages changed by PR #231, especially domain command docs under `/site/docs/test-data/domain/...`.
3. Generator/app help and method picker details as the runtime help oracle.
4. Docs link destinations and nested `/site/` containment.
5. Examples, renamed split commands, and removed/deprecated commands such as `image.urlLoremFlickr`.

the observations and results that you make

PR #231 is merged and its summary says `usageExamples` should be the source of truth for keyword help metadata, validators were added, docs/help surfaces were updated, `internet.httpMethod` was added, and deprecated `image.urlLoremFlickr` was removed from commands/docs. Story #226 asks for every command definition to have at least one full usage example and validator, with multiple examples when parameters are involved. This lane will treat mismatches between published docs, app/generator help, method picker details, and actual deployed examples as defect candidates.

---
## 2026-06-25T15:34:00+01:00

- What you think you want to do and why

Prove that the deployed GitHub Pages environment can be opened and interacted with in a real browser before using it as the test oracle for docs/help consistency.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used Playwright CLI via `npx.cmd @playwright/cli` with session `docs246`. Opened `https://eviltester.github.io/grid-table-editor/site/`, captured a browser snapshot, and verified the page rendered the Docusaurus site with the `AnyWayData`, `App`, `Docs`, `Blog`, and `Use The Application` controls. Clicked the visible `Use The Application` link from the deployed site home page. Confirmed the active browser tab navigated to `https://eviltester.github.io/grid-table-editor/site/app.html`. Captured proof screenshot:

- `../screenshots/docs-consistency-browser-proof-app.png`

the observations and results that you make

Browser interaction is confirmed before substantive testing. The app opened successfully from the deployed site. The nested app snapshot also showed a docs/content consistency risk that deserves follow-up: the app's visible top nav contains `AnyWayData` linking to `/grid-table-editor/`, `Generator` linking to `/grid-table-editor/generator.html`, while `Docs` and `Blog` stay under `/grid-table-editor/site/...`. This may be intentional, but it mixes root and nested-site contexts from a page launched inside `/site/`.

---
## 2026-06-25T15:49:00+01:00

- What you think you want to do and why

Build a broad deployed docs inventory from the PR #231 changed surfaces so the lane can compare content consistency across docs pages rather than relying on a few manually opened pages.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created and ran `../support/docs-consistency-audit.mjs`, which fetched deployed GitHub Pages URLs only and wrote `../support/docs-consistency-page-audit.json`. The final retry fetched 40/40 pages successfully. Pages reviewed:

- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/app.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- domain docs under `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/` for `airline`, `animal`, `autoIncrement`, `book`, `color`, `commerce`, `company`, `database`, `datatype`, `date`, `finance`, `food`, `git`, `hacker`, `image`, `internet`, `literal`, `location`, `lorem`, `music`, `number`, `person`, `phone`, `science`, `string`, `system`, `vehicle`, and `word`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/`

Searched those pages for high-risk strings and examples: `image.urlLoremFlickr`, `urlLoremFlickr`, `internet.httpMethod`, `location.cardinalDirection(abbreviated`, `location.direction(abbreviated`, `helpers.mustache`, old `generate.html` references, `generator.html`, `anywaydata.com`, root `/grid-table-editor/generator.html`, and nested `/grid-table-editor/site/generator.html`.

the observations and results that you make

Positive consistency observations:

- `image.urlLoremFlickr` and `urlLoremFlickr` were not found in the 40-page deployed docs/app audit.
- `internet.httpMethod` was documented on `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/` with default, `commonOnly=true`, and `excludes="patch, TRACE"` examples.
- `location.cardinalDirection(abbreviated=true)` appears on both the domain overview page and location detail page, so this is intentionally documented on the current deployed content.
- No stale `generate.html` references were found. `generator.html` appears only in expected Web UI / test data generation / generate-to-file contexts.
- `helpers.mustache("Hello {{name}}", { name: "Ada" })` appears on `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/` as a direct faker example.

Potential mismatch / defect candidate:

- `https://eviltester.github.io/grid-table-editor/site/app.html` contains root-context top-nav links: `AnyWayData` -> `/grid-table-editor/` and `Generator` -> `/grid-table-editor/generator.html`, while `Docs` and `Blog` stay under `/grid-table-editor/site/...`.
- `https://eviltester.github.io/grid-table-editor/site/generator.html` contains root-context top-nav links: `AnyWayData` -> `/grid-table-editor/` and `App` -> `/grid-table-editor/app.html`, while `Docs` and `Blog` stay under `/grid-table-editor/site/...`.
- Evidence screenshots: `../screenshots/docs-consistency-site-app-nav-root-links.png` and `../screenshots/docs-consistency-site-generator-nav-root-links.png`.
- Defect candidate: nested deployed app/generator pages are entered from `/site/` but their visible app shell links can eject the user to root app pages with a different context. This is similar to prior nested-site routing risks and should be investigated if the intended deployed-docs model is that `/site/` pages stay inside `/site/`.

Follow-up risk, not filed as a defect from this lane:

- Many docs pages include `anywaydata.com` production URLs. That may be correct public documentation rather than a test-environment defect, but it can confuse a review user who starts from GitHub Pages. I did not classify it as a defect because the docs appear to be production-facing rather than environment-specific.

---
## 2026-06-25T15:58:00+01:00

- What you think you want to do and why

Compare the published docs content against the live generator method picker and executable preview examples for the highest-risk PR #231 content changes: new `internet.httpMethod`, `location.cardinalDirection` parameters, removed `image.urlLoremFlickr`, and faker helper examples.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/generator.html` in the live browser session. Changed the schema row type to `domain`, opened the method picker, and filtered for:

- `internet.httpMethod`
- `location.cardinalDirection`
- `image.urlLoremFlickr`

Captured screenshots:

- `../screenshots/docs-consistency-method-picker-httpmethod.png`
- `../screenshots/docs-consistency-method-picker-cardinaldirection.png`
- `../screenshots/docs-consistency-method-picker-urlLoremFlickr-absent.png`
- `../screenshots/docs-consistency-cardinaldirection-abbreviated-preview.png`

Executed `location.cardinalDirection(abbreviated=true)` in the deployed generator by selecting `location.cardinalDirection`, setting params to `(abbreviated=true)`, previewing 5 rows, and confirming the output contained abbreviated values such as `S` and `W`.

Opened a fresh `https://eviltester.github.io/grid-table-editor/site/generator.html` tab for the faker example. Changed the schema row type to `faker`, selected `helpers.mustache`, and used support snippet `../support/docs-consistency-fill-mustache-param.js` only to avoid CLI argument splitting for the exact object-literal params text. Filled params exactly as `("Hello {{name}}", { name: "Ada" })`, previewed 3 rows, and captured:

- `../screenshots/docs-consistency-helpers-mustache-exact-preview-2.png`

the observations and results that you make

Positive consistency observations:

- `internet.httpMethod` method picker details match the published internet domain docs. The picker shows parameter details for `commonOnly` and `excludes`, types `boolean` and `string`, and usage examples for `internet.httpMethod()`, `internet.httpMethod(commonOnly=true)`, and `internet.httpMethod(excludes="patch, TRACE")`.
- `location.cardinalDirection` method picker details match the published location/domain overview docs for `abbreviated=true`. Runtime preview also agrees: `(abbreviated=true)` generated abbreviated cardinal directions. This means the older `location.cardinalDirection(abbreviated=true)` mismatch is not present in this deployed state.
- `image.urlLoremFlickr` is absent from the docs audit and absent from the live method picker search. This matches PR #231's removal/deprecation note.
- The published `helpers.mustache("Hello {{name}}", { name: "Ada" })` example executes successfully in the deployed generator when entered exactly into the params field for `helpers.mustache`, producing `Hello Ada` rows. Earlier failed attempts were invalid test setup caused by command-line quoting, not app behavior.

Potential mismatch / suspicious behavior:

- Opening the picker from a `domain` row shows an `All` tab that includes `helpers.*` faker commands as well as domain commands. Each result is tagged `faker` or `domain`, and a dedicated `Faker` tab exists, so I did not file this as a defect. It is worth UX follow-up only if users expect the picker opened from a domain row to exclude faker helper commands entirely.

---
## 2026-06-25T16:05:00+01:00

- What you think you want to do and why

Close the delegated docs-consistency lane by summarizing pages reviewed, confirmed mismatches, defect candidates, and deferred areas for the main issue #246 report.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed the accumulated browser snapshots, screenshots, and `../support/docs-consistency-page-audit.json`. Rechecked that the lane stayed within deployed URLs under `https://eviltester.github.io/grid-table-editor/`, plus GitHub issue/PR context reads. Did not edit app code and did not run local build/test/verify commands.

the observations and results that you make

Coverage completed:

- Browser proof: deployed `/site/` opened and `Use The Application` clicked into `/site/app.html`.
- Deployed docs inventory: 40 pages fetched and inspected, including all currently linked domain pages in the deployed sidebar plus core generator/docs pages.
- Method picker consistency: sampled `internet.httpMethod`, `location.cardinalDirection`, `image.urlLoremFlickr`, and `helpers.mustache`.
- Executable docs examples: verified `location.cardinalDirection(abbreviated=true)` and `helpers.mustache("Hello {{name}}", { name: "Ada" })` through deployed generator preview.
- Removed command check: `image.urlLoremFlickr` absent from docs and picker.

Confirmed defect candidate:

1. Nested app/generator pages escape from `/site/` to root app surfaces through their top nav.
   - `https://eviltester.github.io/grid-table-editor/site/app.html`
   - `https://eviltester.github.io/grid-table-editor/site/generator.html`
   - Evidence: `../screenshots/docs-consistency-site-app-nav-root-links.png`, `../screenshots/docs-consistency-site-generator-nav-root-links.png`
   - Exact mismatch: nested app `AnyWayData` -> `/grid-table-editor/`, nested app `Generator` -> `/grid-table-editor/generator.html`; nested generator `AnyWayData` -> `/grid-table-editor/`, nested generator `App` -> `/grid-table-editor/app.html`. `Docs` and `Blog` remain under `/grid-table-editor/site/...`.
   - Severity suggestion: medium if `/site/` is intended to be a self-contained deployed review/docs context; low or intentional if root app pages are the canonical app surfaces.

Not defects from this lane:

- `internet.httpMethod` docs/help are consistent with picker details.
- `location.cardinalDirection(abbreviated=true)` docs/help/runtime are consistent on the current deployment.
- `helpers.mustache` object-literal example works when entered into the live params field.
- `image.urlLoremFlickr` appears removed from docs and picker.
- Generic domain help link `/site/docs/test-data/domain/domain-test-data` is valid.

Deferred / gaps:

- Did not execute every example from every domain page. The lane sampled high-risk examples and used the page audit to check broad content presence.
- Did not perform negative validation; that belongs to the negative-validation lane.
- Did not test root app/generator workflows beyond link/context comparison, because this lane focused on docs/help/content consistency.
- Did not classify production `anywaydata.com` docs links as defects without a product decision on whether GitHub Pages review docs should remain production-facing.


***

# Collated File: logs/negative-validation-test-log.md

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


***

# Collated File: logs/responsive-accessibility-test-log.md

# Responsive and Accessibility Test Log - Issue 246 Lane

Date: 2026-06-25

Lane: responsive/mobile and accessibility review for GitHub issue #246, story #226, PR #231.

Scope honored: deployed GitHub Pages only. No app code edits. No local build/test/verify. Evidence written only under this lane log, `screenshots/responsive-accessibility-*`, and `support/responsive-accessibility-*`.

## Environment and Tooling

- Target entrypoint: https://eviltester.github.io/grid-table-editor/site/
- Linked deployed app/docs pages under: https://eviltester.github.io/grid-table-editor/
- Browser automation: Playwright CLI via `npx.cmd --package @playwright/cli playwright-cli`.
- Playwright MCP and Chrome DevTools MCP were attempted, but each hit an attach/profile/bootstrap problem, so the reliable browser path was the CLI.
- Accessibility smoke check: axe-core 4.10.2 injected in the browser for deployed pages only.
- Viewports covered: desktop `1366x768`, tablet `768x1024`, mobile `390x844`, narrow mobile `320x640`.

## Browser Proof

Proof action completed at mobile viewport `390x844`:

1. Opened `https://eviltester.github.io/grid-table-editor/site/`.
2. Clicked the visible `Use The Application` CTA.
3. Confirmed navigation to `https://eviltester.github.io/grid-table-editor/site/app.html`.
4. Captured screenshot: `../screenshots/responsive-accessibility-proof-app-mobile.png`.
5. Captured support output: `../support/responsive-accessibility-proof-result.txt`.

## Pages Covered

- Site home: `https://eviltester.github.io/grid-table-editor/site/`
- Site app: `https://eviltester.github.io/grid-table-editor/site/app.html`
- Site generator: `https://eviltester.github.io/grid-table-editor/site/generator.html`
- Root linked app: `https://eviltester.github.io/grid-table-editor/app.html`
- Root linked generator: `https://eviltester.github.io/grid-table-editor/generator.html`
- Docs intro: `https://eviltester.github.io/grid-table-editor/site/docs/intro/`
- Docs generating category: `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data/`
- Docs generate-to-file: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- Docs faker data: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`

## Findings and Defect Candidates

### RA-01 - Medium - `/site/` app/generator mobile header overflows and creates offscreen keyboard focus

Status: confirmed candidate.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-app-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile-focus-after-tabs.png`

Observed:

- `app-site mobile` at `390x844`: document scroll width `454`; `Blog` nav link measured `x=390..422`, outside the viewport.
- `app-site narrow` at `320x640`: document scroll width `454`; nav remains wider than viewport.
- `generator-site mobile` at `390x844`: document scroll width `455`; `Blog` nav and settings panel overflow the viewport.
- Keyboard tab sequence on `app-site mobile`: tab 4 focuses `Blog` at `x=390..422`, `offscreen=true`.
- After keyboarding through the app page, the browser horizontally auto-scrolls the page; the focus screenshot shows the left edge of the app clipped while focus is on `Add Rows Below`.

Expected:

- Mobile nav should fit, wrap, or collapse without horizontal page scroll.
- Keyboard focus should never move to an offscreen/clipped nav item.
- Focusing controls should not horizontally scroll the app so other content disappears off the left edge.

### RA-02 - Medium - Generator export settings panel is positioned offscreen on mobile/narrow viewports

Status: confirmed candidate from DOM geometry and screenshots.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`

Evidence:

- `../support/responsive-accessibility-generator-controls.txt`
- `../support/responsive-accessibility-scan-results.txt`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-narrow.png`

Observed:

- On `generator-site mobile` at `390x844`, `.export-encoding-settings__panel` is visible at `x=269..519`, width `250`; the viewport ends at `x=390`.
- On `generator-site narrow` at `320x640`, the same panel is visible at `x=269..519`; most of it is beyond the viewport.
- On root `generator.html`, the page-level scroll width stays at viewport width, but the same panel geometry is still offscreen, which makes the clipped area harder to recover with horizontal scrolling.
- Visible child controls include `select` text `Line endings` at `x=282..506` and a checkbox label area at `x=282..506`.

Expected:

- The settings panel should open within the viewport or stack below the Settings control on small screens.
- Settings labels and fields should remain readable and operable without horizontal scrolling.

### RA-03 - High - App and generator data grids have critical ARIA structure violations

Status: confirmed candidate from axe-core smoke check.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`

Observed axe violations at `390x844`:

- `app-mobile`: `aria-required-children` on `#myGrid` and `.tabulator-header`; axe impact `critical`.
- `app-mobile`: `aria-required-parent` on `.tabulator-header-contents`; axe impact `critical`.
- `generator-mobile`: `aria-required-children` on `.ag-theme-alpine` and `.tabulator-header`; axe impact `critical`.
- `generator-mobile`: `aria-required-parent` on `.tabulator-header-contents`; axe impact `critical`.

Expected:

- Elements with `role="grid"`, `rowgroup`, and related grid descendants should satisfy required ARIA parent/child relationships, or avoid roles that do not match the generated Tabulator structure.

### RA-04 - Medium - App/generator summaries contain nested interactive controls

Status: confirmed candidate from axe-core smoke check and visible page structure.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`

Observed axe violations at `390x844`:

- `app-mobile`: `nested-interactive` on `.instructions > details > summary` and `details[data-role="test-data-details"] > summary`; axe impact `serious`.
- `generator-mobile`: `nested-interactive` on `.instructions > details > summary`; axe impact `serious`.
- The visible summaries include help controls next to the summary text, which can cause focus or announcement ambiguity for assistive technologies.

Expected:

- Interactive help controls should not be nested inside a `summary` element. Place help controls adjacent to the summary or restructure the disclosure header so each control has a distinct focus target.

### RA-05 - Medium - Docs active breadcrumb contrast fails WCAG AA threshold

Status: confirmed candidate from axe-core smoke check.

Affected pages sampled:

- `https://eviltester.github.io/grid-table-editor/site/docs/intro/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`

Observed:

- Axe reports `color-contrast` on `.breadcrumbs__item--active > .breadcrumbs__link`, impact `serious`.
- Contrast measured by axe: `4.07:1` for foreground `#2e8555` on background `#f2f2f2`; expected minimum `4.5:1` for the sampled text size.

Expected:

- Active breadcrumb text/pill state should meet at least WCAG 2.x AA contrast for normal text.

### RA-06 - Low - Site home skips from H1 to H3

Status: confirmed candidate from axe-core smoke check.

Affected page:

- `https://eviltester.github.io/grid-table-editor/site/`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-home-site-mobile.png`

Observed:

- Axe reports `heading-order` on the first feature heading `Easy to Use`, because the page moves from `h1` to `h3` without an intermediate `h2`.

Expected:

- Heading levels should follow a semantic sequence, e.g. page `h1`, section `h2`, then card/subsection `h3` if needed.

### RA-07 - Medium - App page lacks main landmark and H1

Status: confirmed candidate from axe-core smoke check.

Affected page:

- `https://eviltester.github.io/grid-table-editor/site/app.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`

Observed at `390x844`:

- Axe reports `landmark-one-main`, impact `moderate`: document does not have a main landmark.
- Axe reports `page-has-heading-one`, impact `moderate`: page does not contain a level-one heading.
- Axe also reports `region`, impact `moderate`, for top navigation/pageheading content not contained by landmarks.

Expected:

- The app page should expose a clear `main` landmark and a page-level heading so screen-reader users can orient themselves quickly.

## Non-Defect Notes / Coverage That Looked Healthy

- Docusaurus docs pages sampled at `390x844` and `320x640` did not show page-level horizontal overflow in the DOM scan.
- Docs mobile hamburger, breadcrumbs, and `On this page` control were reachable by keyboard in the sampled docs intro page.
- Site home mobile/narrow did not show horizontal document overflow; only the expected off-canvas skip link appears outside the viewport before focus.
- Root linked `app.html` and `generator.html` did not show the same top-nav horizontal scroll as `/site/app.html` and `/site/generator.html`, but the root generator still has the offscreen settings-panel geometry noted above.
- One transient `net::ERR_CONNECTION_RESET` occurred while loading docs generate-to-file at desktop in the broad scan, but later mobile/narrow loads of the same page succeeded. I did not file this as a defect candidate.

## Artifacts

Support data:

- `../support/responsive-accessibility-proof-result.txt`
- `../support/responsive-accessibility-link-discovery.txt`
- `../support/responsive-accessibility-generating-links.txt`
- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../support/responsive-accessibility-generator-controls.txt`
- `../support/responsive-accessibility-axe-results.txt`

Key screenshots:

- `../screenshots/responsive-accessibility-proof-app-mobile.png`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-app-site-narrow.png`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-narrow.png`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`
- `../screenshots/responsive-accessibility-home-site-mobile.png`


***

# Collated File: logs/ux-regression-test-log.md

# UX Regression Testing Lane Log

Scope: GitHub issue #246, story #226, PR #231. Deployed environment only: <https://eviltester.github.io/grid-table-editor/site/> plus linked deployed app/docs pages under <https://eviltester.github.io/grid-table-editor/>.

Charter: UX/usability and workflow regression in generator, method picker, params editor, help/details, app embedded Test Data flow, import/export or save/load surfaces visible in deployed app.

Constraints honored: no app code edits, no local build/test/verify commands, no commit or push. This lane writes only to this log, screenshots named `ux-regression-*`, and support files named `ux-regression-*`.

Techniques and heuristics: exploratory testing, risk-based testing from the PR changed surfaces, consistency/oracle checks between UI help and deployed docs, state/flow modeling for schema-row editing and embedded Test Data generation, negative UX observation where visible validation surfaces exist, responsive heuristics where workflow controls are involved.

---
## 2026-06-25 15:10 BST

- What I think I want to do and why

Establish the lane scope and prove that the deployed environment can be opened and interacted with in a browser before doing substantive UX regression testing. This is required by issue #246 and gives later observations a valid browser baseline.

Actions:

- Read GitHub issue #246, story #226, and PR #231 metadata via `gh` without editing code.
- Confirmed PR #231 is merged into `master`.
- Confirmed story #226 focused on structured command `usageExamples`, validators, docs/help rendering, method picker, params editor, and generator/runtime consumption of command metadata.
- Confirmed issue #246 requires deployed-only exploratory testing against `https://eviltester.github.io/grid-table-editor/site/`.

Observations and results:

- This delegated lane is intentionally narrower than the parent issue: UX/usability and workflow regression only.
- The highest-risk visible surfaces for this lane are schema row mode switching, method picker search/details/examples, params editing, docs/help links, preview generation, and the embedded Test Data flow.

---
## 2026-06-25 15:15 BST

- What I think I want to do and why

Prove that the deployed environment opens in a browser and accepts interaction before starting substantive UX regression testing.

Actions:

- Opened `https://eviltester.github.io/grid-table-editor/site/` with Playwright CLI.
- First navigation returned `net::ERR_CONNECTION_RESET`.
- Retried navigation in the same browser session; the site loaded with title `AnyWayData - Data Table Editor & Generator`.
- Captured a page snapshot and clicked the `Use The Application` link.
- The click command timed out while waiting for scheduled navigation completion, but the next snapshot confirmed the browser had navigated to `https://eviltester.github.io/grid-table-editor/site/app.html`.
- Waited for the app shell to finish loading. The status moved from `Please Wait, Loading Libraries...` to the live grid and Test Data panel.
- Captured and visually checked screenshot `../screenshots/ux-regression-browser-proof-app-loaded.png`.
- Read the browser console after app load.

Observations and results:

- Browser control is confirmed against the live deployed environment.
- The initial `ERR_CONNECTION_RESET` was not repeatable on immediate retry and did not block testing.
- The app-link click timeout appears to be a Playwright wait-state issue rather than a visible navigation failure, because the deployed app page loaded successfully.
- Console entries after app load: one favicon 404, one Tabulator initialization warning, and one `TODO: Create help for instructions-summary-title` log. No user-visible error was observed at this stage.

---
## 2026-06-25 15:16 BST

- What I think I want to do and why

Loop 1: exercise the highest-risk standalone generator path for PR #231: row mode, domain command selection, method picker details, params editor, docs link, and preview generation. This directly covers the structured examples/validators/help surface from story #226.

Actions:

- Navigated from the deployed app shell to `https://eviltester.github.io/grid-table-editor/generator.html`.
- Switched the default schema row from `regex` to `domain`.
- Opened the method picker with `Select domain command`.
- Filtered methods by `internet.httpMethod`.
- Observed details panel content:
  - Summary mentions the AnywayData-defined HTTP method pool.
  - Parameter Details lists `commonOnly` and `excludes`.
  - Parameter Types lists both params as optional.
  - Usage Examples show:
    - `internet.httpMethod()`
    - `internet.httpMethod(commonOnly=true)`
    - `internet.httpMethod(excludes="patch, TRACE")`
  - Documentation link targets `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`.
- Applied `internet.httpMethod` to the schema row.
- Filled column name `method`.
- Opened the params editor.
- In the params editor:
  - Set `commonOnly` to `True`.
  - Entered `head, delete` for `excludes`.
  - Observed generated params `(commonOnly=true,excludes="head, delete")`.
  - Applied the params to the row.
- Clicked standalone generator `Preview`.
- Captured screenshot `../screenshots/ux-regression-httpmethod-preview.png`.

Observations and results:

- The picker details matched the story/PR expectation for `internet.httpMethod` and used named-parameter domain form.
- The row-level docs link updated after command selection and pointed at the deployed `internet` docs page.
- The params editor wrote the expected params string to the row.
- Preview output generated only `GET`, `POST`, and `PUT`; this is consistent with `commonOnly=true` and excluding `HEAD` and `DELETE`.
- Candidate UX issue, repeatable: the params editor `Req` column exposes disabled checkbox labels such as `Required commonOnly` and `Required excludes` even when the picker details correctly mark the params as optional. This was also seen later for `string.symbol.length`. Severity: low. Impact: confusing language for optional params, especially for assistive-tech users or anyone reading the row text in the modal.

---
## 2026-06-25 15:19 BST

- What I think I want to do and why

Compare the picker/details information against deployed docs so that command help is not only internally coherent but also consistent with the published documentation users can open from the app.

Actions:

- Opened `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`.
- Confirmed page title `internet Domain | AnyWayData - Data Table Editor & Generator`.
- Jumped to the `internet.httpMethod` entry via the page table of contents.
- Extracted visible text from the live page around `internet.httpMethod`.

Observations and results:

- The deployed docs describe `internet.httpMethod` as an AnywayData direct implementation, matching the picker summary.
- Docs list `commonOnly` and `excludes` as `Required: no`, matching the picker details but contrasting with the params editor's `Required <param>` accessible labels.
- Docs examples match the picker examples:
  - `internet.httpMethod()`
  - `internet.httpMethod(commonOnly=true)`
  - `internet.httpMethod(excludes="patch, TRACE")`
- No docs-link defect found for the sampled `internet.httpMethod` path.

---
## 2026-06-25 15:20 BST

- What I think I want to do and why

Loop 2: sample additional command metadata shapes, including a symbol-heavy domain command and a Faker helper command, to look for rendering regressions in long descriptions, escaped characters, sample return values, and helper/domain distinction.

Actions:

- Reloaded `https://eviltester.github.io/grid-table-editor/generator.html` to start from a fresh default row.
- Switched row type to `domain`.
- Opened the method picker.
- Filtered to `string.symbol`.
- Observed picker details:
  - Long ASCII-symbol description rendered without breaking the picker layout.
  - Details show optional numeric `length`.
  - Examples show blank params and `(length=5)`.
  - Sample return value for the length example includes escaped punctuation.
- Applied `string.symbol`.
- Filled column name `symbol`.
- Opened params editor.
- Entered `5` for `length`.
- Observed generated params `(length=5)`.
- Applied params and clicked Preview.
- Reopened the picker from the selected command.
- Filtered to `helpers.mustache`.
- Observed helper details:
  - Row is tagged `faker`.
  - Schema shown as `faker.helpers.mustache()`.
  - Required params `text` and `data` are listed.
  - Example preserves object syntax: `helpers.mustache("Hello {{name}}", { name: "Ada" })`.
  - Docs link targets `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`.
- Opened the helper docs URL and confirmed it loads with title `Faker Helpers | AnyWayData - Data Table Editor & Generator`.

Observations and results:

- `string.symbol(length=5)` preview generated 10 visible five-character symbol values and did not break the output preview or grid preview.
- The method picker kept the current command details visible when reopened and allowed switching search to helper commands.
- The helper command remained clearly distinguished as `faker`; no domain/faker label confusion observed.
- The helper docs URL exists in the deployed docs.
- Candidate UX issue repeated: params editor `Req` column used disabled labels such as `Required length` for optional `string.symbol.length`, while the picker details correctly said `optional`. Severity: low.

---
## 2026-06-25 15:23 BST

- What I think I want to do and why

Loop 3: cover the embedded app Test Data and import/export surfaces visible in `app.html`, since these are separate from the standalone generator and can regress independently.

Actions:

- Opened `https://eviltester.github.io/grid-table-editor/site/app.html`.
- Added one row to the main grid.
- Double-clicked the empty cell and typed `alpha`.
- Pressed Enter to commit the edit.
- Clicked `Set Text From Grid`.
- Observed the Preview text editor value.
- Edited the Preview text editor to `~rename-me beta`.
- Observed that `Set Grid From Text` became enabled.
- Clicked `Set Grid From Text`.
- Opened Test Data help/section using the `Test Data` help button.
- In the embedded Test Data panel:
  - Filled schema column name `code`.
  - Filled regex value `[A-Z]{3}`.
  - Clicked Generate in `New Table` mode with `How Many?` set to `1`.
  - Retried after proving the regex field retained `[A-Z]{3}`.
- Captured screenshot `../screenshots/ux-regression-embedded-test-data-generate.png`.

Observations and results:

- Main grid row creation and cell edit worked; total rows changed to `1` and the grid cell showed `alpha`.
- `Set Text From Grid` produced preview text `"~rename-me" "alpha"`.
- Editing the preview text enabled `Set Grid From Text`.
- Importing the single-line text `~rename-me beta` treated it as a header-only table: the grid column changed to `~rename-me beta` and row count became `0`. This is a UX risk, not a confirmed defect, because the test data was not a complete table with header plus data row.
- Embedded Test Data panel expanded from the Test Data help/section control and exposed Generate, Grid to Enum Schema, How Many, New/Amend modes, row schema editor, load/save schema buttons, and managed schema history.
- First Generate attempt after filling `[A-Z]{3}` produced `Schema validation failed. Grid unchanged.` and the row reported `regex value is required`; on retry, after a snapshot proved `[A-Z]{3}` was visibly present in the field, Generate succeeded with `Generate complete. Grid updated.` and a one-row grid such as `MGY`.
- Suspicious behavior, not confirmed defect: embedded generator may be sensitive to field commit timing after programmatic or very fast entry into the regex field. It was not repeatably broken, because the same data succeeded after the value was visibly present. Severity if confirmed: medium; current status: follow-up risk.

---
## 2026-06-25 15:27 BST

- What I think I want to do and why

Final lane review: summarize coverage, identify defect candidates, and state what was not covered so the parent issue can merge this lane with other delegated testing.

Actions:

- Reviewed observations against the charter: generator, method picker, params editor, help/details, embedded Test Data flow, import/export surfaces, and save/load surfaces visible in deployed app.
- Verified screenshots were visually inspectable:
  - `../screenshots/ux-regression-browser-proof-app-loaded.png`
  - `../screenshots/ux-regression-httpmethod-preview.png`
  - `../screenshots/ux-regression-embedded-test-data-generate.png`

Observations and results:

- Confirmed working areas:
  - Deployed app and standalone generator loaded after one transient initial connection reset.
  - Method picker search and details worked for `internet.httpMethod`, `string.symbol`, and `helpers.mustache`.
  - Picker details and docs were consistent for sampled `internet.httpMethod`.
  - Params editor generated correct named params for `internet.httpMethod` and `string.symbol`.
  - Standalone preview generated constrained values for sampled commands.
  - Helper docs link for `helpers.mustache` loaded successfully.
  - Embedded Test Data panel generated data into the main grid after the regex value was visibly retained.
  - Import/export workspace converted grid data to text and enabled reverse import after text edits.
- Defect candidate 1, low severity, repeatable:
  - Params editor `Req` column accessible labels say `Required <param>` for optional params.
  - Seen with `internet.httpMethod.commonOnly`, `internet.httpMethod.excludes`, and `string.symbol.length`.
  - Picker/details and docs correctly say these params are optional, so the modal label is internally inconsistent.
- Suspicious behavior 1, follow-up risk:
  - Embedded Test Data Generate failed once immediately after filling regex value, then succeeded with the same data after the value was verified present.
  - Not enough repeatability to file as confirmed defect from this lane, but worth retesting manually with normal typing speed and keyboard blur.
- UX risk 1:
  - `Set Grid From Text` can convert a single-line edited text value into a header-only grid with `0` rows and no obvious warning. This may be expected parser behavior, but the workflow is easy to misunderstand.
- Not covered in this lane:
  - File chooser round trips for `Load Schema File` and `Save Schema File`, because they require download/upload handling and this lane was focused on visible UX/workflow regression.
  - Broad command family coverage; other delegated lanes should cover command breadth and negative validation.
  - Mobile/responsive behavior; another delegated lane owns that charter.

---


***

# Collated File: defects/issue-246-app-generator-grids-have-critical-aria-structure-violations.md

# App And Generator Grids Have Critical ARIA Structure Violations

## Severity

High

## Summary

Axe reports critical ARIA parent/child structure violations in the app and generator grid structures.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Viewport: `390x844`
- Tooling: axe-core 4.10.2 injected by the responsive/accessibility lane

## Expected Result

Elements with grid, rowgroup, row, and related ARIA roles should satisfy required parent/child relationships, or avoid roles that do not match the generated structure.

## Actual Result

Axe reports:

- `aria-required-children` on `#myGrid`, `.ag-theme-alpine`, and `.tabulator-header`.
- `aria-required-parent` on `.tabulator-header-contents`.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`

## Repeatability

Observed on both app and generator pages in the accessibility lane.


***

# Collated File: defects/issue-246-app-page-lacks-main-landmark-and-h1.md

# App Page Lacks Main Landmark And H1

## Severity

Medium

## Summary

The app page does not expose a main landmark or page-level `h1`, making orientation harder for screen-reader users.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/app.html
- Viewport: `390x844`
- Tooling: axe-core 4.10.2

## Expected Result

The app page should expose a clear `main` landmark and a page-level heading.

## Actual Result

Axe reports:

- `landmark-one-main`: document does not have a main landmark.
- `page-has-heading-one`: page does not contain a level-one heading.
- `region`: top navigation/pageheading content is not contained by landmarks.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`

## Repeatability

Observed on the deployed `/site/app.html` page.


***

# Collated File: defects/issue-246-docs-active-breadcrumb-contrast-fails-aa.md

# Docs Active Breadcrumb Contrast Fails WCAG AA

## Severity

Medium

## Summary

The active breadcrumb link state in sampled docs pages fails the WCAG AA contrast threshold for normal text.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/docs/intro/
  - https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/
- Tooling: axe-core 4.10.2

## Expected Result

Active breadcrumb text should meet at least 4.5:1 contrast for normal text.

## Actual Result

Axe reports `color-contrast` on `.breadcrumbs__item--active > .breadcrumbs__link` with measured contrast `4.07:1` for foreground `#2e8555` on background `#f2f2f2`.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`

## Repeatability

Observed on multiple sampled docs pages.


***

# Collated File: defects/issue-246-generator-settings-panel-offscreen-mobile.md

# Generator Settings Panel Opens Offscreen On Mobile

## Severity

Medium

## Summary

The generator export settings panel is positioned partly offscreen on mobile and narrow viewports.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/generator.html
  - https://eviltester.github.io/grid-table-editor/generator.html
- Viewports: `390x844` and `320x640`

## Expected Result

The settings panel should open within the viewport or stack below the trigger on small screens.

## Actual Result

The panel appears around `x=269..519` with a 250px width, extending beyond both 390px and 320px wide viewports. Child controls such as `Line endings` and checkbox label areas are also clipped.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-generator-controls.txt`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`

## Repeatability

Observed on both nested and root generator pages.


***

# Collated File: defects/issue-246-home-heading-order-skips-h2.md

# Site Home Heading Order Skips H2

## Severity

Low

## Summary

The site home page moves from the main `h1` directly to feature card `h3` headings.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/
- Tooling: axe-core 4.10.2

## Expected Result

Heading levels should follow a semantic sequence, such as `h1`, section `h2`, then card/subsection `h3`.

## Actual Result

Axe reports `heading-order` on the first feature heading `Easy to Use` because the page skips from `h1` to `h3`.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-home-site-mobile.png`

## Repeatability

Observed on the sampled site home page.


***

# Collated File: defects/issue-246-invalid-regex-generates-literalish-values.md

# Invalid Regex Generates Literal-Looking Values Without Warning

## Severity

Medium

## Summary

An invalid-looking regex rule `[abc` is accepted and generates repeated literal-ish values without a visible warning.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   value
   [abc
   ```

4. Click `Preview`.

## Expected Result

The app should either reject invalid regex syntax or clearly indicate that the input is being treated as literal text rather than regex generation syntax.

## Actual Result

Preview generates repeated `[abc`-style values with no visible warning.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-invalid-regex-generates-literalish-values.png`

## Repeatability

Repeated from a clean generator state by the negative-validation lane.


***

# Collated File: defects/issue-246-mobile-site-app-generator-nav-overflows.md

# Mobile `/site/` App And Generator Nav Overflows And Focuses Offscreen

## Severity

Medium

## Summary

On mobile and narrow viewports, `/site/app.html` and `/site/generator.html` have a header wider than the viewport, and keyboard focus can move to offscreen nav items.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Viewports: `390x844` and `320x640`

## Expected Result

The nav should fit, wrap, or collapse without horizontal page scrolling, and keyboard focus should remain visible.

## Actual Result

The document scroll width is around 454-455px on mobile viewports. The `Blog` nav item is outside the viewport, and tabbing can focus it offscreen. Later tabbing horizontally scrolls the app so the left edge of app content is clipped.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile-focus-after-tabs.png`

## Repeatability

Repeated on both app and generator nested `/site/` pages by the responsive/accessibility lane.


***

# Collated File: defects/issue-246-params-editor-req-labels-optional-params-as-required.md

# Params Editor Labels Optional Params As Required

## Severity

Low

## Summary

The params editor `Req` column exposes labels such as `Required commonOnly`, `Required excludes`, and `Required length` even when the picker details and docs mark those params as optional.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the generator.
2. Select a domain command such as `internet.httpMethod`.
3. Open the params editor.
4. Inspect the `Req` column labels.
5. Repeat with `string.symbol(length=5)`.

## Expected Result

Optional params should not be exposed as `Required <param>`. If the disabled checkbox indicates whether the param is required, the accessible label should not imply the optional param is currently required.

## Actual Result

The modal exposes labels like `Required commonOnly`, `Required excludes`, and `Required length` while docs and picker details say these params are optional.

## Evidence

- `../logs/ux-regression-test-log.md`
- `../screenshots/ux-regression-httpmethod-preview.png`

## Repeatability

Repeated with `internet.httpMethod` and `string.symbol`.


***

# Collated File: defects/issue-246-removed-url-lorem-flickr-has-misleading-feedback.md

# Removed `image.urlLoremFlickr` Has Misleading Feedback

## Severity

Medium

## Summary

The removed/deprecated `image.urlLoremFlickr` command is absent from docs and picker search, but text-schema use produces misleading parameter-wrapping feedback and may still trigger Faker deprecation warnings internally.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter either:

   ```text
   img
   image.urlLoremFlickr
   ```

   or:

   ```text
   img
   image.urlLoremFlickr()
   ```

4. Click `Preview`.

## Expected Result

The app should say the command is unknown, removed, or replaced by `image.url`.

## Actual Result

The app reports parameter-wrapping style messages such as `params should be wrapped in parentheses`, which implies the command exists but was called incorrectly. The command-coverage lane also observed repeated browser warnings for deprecated `faker.image.urlLoremFlickr()`.

## Evidence

- `../logs/command-coverage-test-log.md`
- `../logs/negative-validation-test-log.md`
- `../screenshots/command-coverage-removed-urlLoremFlickr-message.png`

## Repeatability

Repeated by both the command-coverage and negative-validation lanes.


***

# Collated File: defects/issue-246-semantic-invalid-params-generate-error-data.md

# Semantic Invalid Params Generate `**ERROR**` Rows Instead Of Validation Feedback

## Severity

High

## Summary

Several invalid semantic parameter combinations reach generation and produce literal `**ERROR**` data rows instead of being rejected with actionable schema validation feedback.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review
- Browser: Playwright CLI against deployed GitHub Pages

## Steps To Reproduce

Open the deployed generator, switch to text schema mode, and preview any of these schemas:

```text
method
internet.httpMethod(excludes="GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS,TRACE,CONNECT")
```

```text
v
autoIncrement.sequence(zeropadding=-1)
```

```text
v
autoIncrement.timestamp(type="centuries")
```

```text
v
string.fromCharacters(characters=[], length=4)
```

```text
v
number.float(multipleOf=0)
```

```text
v
finance.iban(countryCode="ZZ")
```

## Expected Result

The schema should fail before generation with an actionable validation message explaining the invalid parameter combination.

## Actual Result

Preview generation proceeds and produces `**ERROR**` as row data, with no visible validation message explaining the invalid semantic value or impossible candidate pool.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-http-method-exclude-all-errors.png`

## Repeatability

Repeated across multiple command families in the negative-validation lane.


***

# Collated File: defects/issue-246-site-app-generator-nav-escapes-site-context.md

# `/site/` App And Generator Nav Escapes The Site Context

## Severity

Medium

## Summary

When users enter the app or generator from the deployed `/site/` environment, the app shell nav mixes nested `/site/` links with root app/generator links.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 deployed review

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/site/`.
2. Click `Use The Application`.
3. Inspect the top nav on `/site/app.html`.
4. Open `/site/generator.html` and inspect the top nav.

## Expected Result

If `/site/` is the deployed review context, app/generator nav should keep users in that context or make context switching explicit.

## Actual Result

- `/site/app.html` has `AnyWayData` linking to `/grid-table-editor/` and `Generator` linking to `/grid-table-editor/generator.html`.
- `/site/generator.html` has `AnyWayData` linking to `/grid-table-editor/` and `App` linking to `/grid-table-editor/app.html`.
- `Docs` and `Blog` remain under `/grid-table-editor/site/...`.

## Evidence

- `../logs/docs-consistency-test-log.md`
- `../screenshots/docs-consistency-site-app-nav-root-links.png`
- `../screenshots/docs-consistency-site-generator-nav-root-links.png`

## Repeatability

Observed by the docs-consistency lane on both nested app surfaces.


***

# Collated File: defects/issue-246-summary-elements-contain-nested-interactive-controls.md

# Summary Elements Contain Nested Interactive Controls

## Severity

Medium

## Summary

App and generator disclosure summaries contain nested interactive controls, creating focus and announcement ambiguity.

## Environment

- Targets:
  - https://eviltester.github.io/grid-table-editor/site/app.html
  - https://eviltester.github.io/grid-table-editor/site/generator.html
- Tooling: axe-core 4.10.2

## Expected Result

Interactive help controls should not be nested inside a `summary` element.

## Actual Result

Axe reports `nested-interactive` for instructions and Test Data disclosure summaries. Visible summary headers include help controls next to summary text.

## Evidence

- `../logs/responsive-accessibility-test-log.md`
- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`

## Repeatability

Observed on both app and generator pages.


***

# Collated File: defects/issue-246-text-schema-unknown-command-falls-back-to-regex.md

# Text Schema Unknown Command Falls Back To Regex-Like Generation

## Severity

Medium

## Summary

In text-schema mode, command-like input such as `internet.notACommand` generates regex-like values instead of reporting that the domain command is unknown.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   bad
   internet.notACommand
   ```

4. Click `Preview`.

## Expected Result

Because the value looks like a domain command but is not in the command catalog, the app should show a clear unknown-command validation message.

## Actual Result

The app generates values such as `internet3notACommand`, `internet<notACommand`, and `internet_notACommand`.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-unknown-command-generates-regex.png`

## Repeatability

Repeated from a clean generator state by the negative-validation lane.


***

# Collated File: defects/issue-246-unclosed-domain-quote-reports-faker-validation.md

# Unclosed Domain Quote Reports Faker Validation

## Severity

Low

## Summary

A malformed domain command reports a faker validation failure, which gives the user the wrong mental model for the error.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   method
   internet.httpMethod(excludes="GET)
   ```

4. Click `Preview`.

## Expected Result

The error should identify a malformed domain command or unclosed string.

## Actual Result

The visible message says the method failed faker validation and mentions unsafe faker rule syntax.

## Evidence

- `../logs/negative-validation-test-log.md`

## Repeatability

Observed in the negative-validation lane.

