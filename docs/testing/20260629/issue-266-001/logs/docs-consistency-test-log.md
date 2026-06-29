# Docs/help/content consistency test log

Session: issue-266-001
Lane: subagent C - docs/help/content consistency
Target: https://eviltester.github.io/grid-table-editor/site/
Date: 2026-06-29

## Charter

Inspect changed docs/help surfaces relevant to PR #247 method picker, PR #243 command definitions/enum/datatype, and issue #266 app.html grid/test-data interplay. Compare published docs examples against app/generator runtime where practical. Record pages reviewed, examples tried, stale/misleading/missing docs, removed commands still visible, new commands missing from docs/help, techniques/heuristics, suspected defects, and at least 5 follow-up ideas. Save support artifacts under `support/` prefixed `docs-consistency-`. Do not create defect files.

## Guardrails

- Deployed-only review: published site pages under `https://eviltester.github.io/grid-table-editor/site/`.
- No local build/test/package commands.
- Findings here are suspected docs/content defects or follow-up risks for the main agent to confirm.

---

## 2026-06-29 docs/help/content consistency pass

### Scope and setup

- Used only the published deployed site and published deployed assets reached from it:
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html` as linked by the deployed app page.
- Did not run local build, test, package, or repo application commands.
- Browser automation: Playwright through installed Chrome, targeting deployed URLs only.
- Support artifacts saved under `docs/testing/20260629/issue-266-001/support/` with `docs-consistency-` prefix.

### Pages reviewed

- Landing/app/docs entry: `/site/`, `/site/app.html`, `/generator.html`.
- Main docs: `/site/docs/intro`, `/site/docs/category/generating-data`.
- Generation docs: `/site/docs/test-data/test-data-generation`, `/site/docs/test-data/data-grid-editable`, `/site/docs/test-data/generate-to-file`, `/site/docs/test-data/Schema-Definition`, `/site/docs/test-data/faker-test-data`, `/site/docs/test-data/faker/helpers`, `/site/docs/test-data/domain/domain-test-data`, `/site/docs/test-data/counterstrings`, `/site/docs/test-data/auto-increment-sequences`, `/site/docs/test-data/pairwise-testing`, `/site/docs/test-data/n-wise-testing`.
- Interface docs: `/site/docs/interfaces-and-deployment/web-ui`, `/site/docs/interfaces-and-deployment/rest-api`, `/site/docs/interfaces-and-deployment/cli-node-and-bun`.

### Runtime examples tried

- `Status / enum("Open","In Progress","Closed")`: preview generated CSV values.
- Compact inline schema `Browser: Chrome,Firefox,Safari` and `Theme: Light,Dark`: preview generated CSV values.
- `datatype.enum(active,inactive,pending)`: rejected with `Invalid keyword arguments: bare values are not allowed; wrap strings in quotes`.
- Documented `datatype.enum(csv="active,inactive,pending")`: preview generated CSV values.
- Documented `awd.datatype.enum(csv="active,inactive,pending")`: preview generated CSV values.
- `internet.httpMethod(commonOnly=true)`: preview generated CSV values including common HTTP verbs.
- Deployed catalog example `helpers.uniqueArray(["red", "green", "blue"], 2)`: preview generated JSON with stringified arrays.
- Callback form `helpers.uniqueArray(faker.word.sample, 3)`: preview generated JSON with stringified arrays.
- Published Faker Helpers docs example `helpers.uniqueArray(this.word.sample, 5)`: rejected with unsafe/complex argument parsing validation.
- `image.urlLoremFlickr()`: rejected as unknown keyword.
- `person.notACommand()`: rejected as unknown keyword, matching the Schema Definition docs' command-like validation note.
- Constraint example with `Priority` and `Status`: preview respected the documented `High -> Open` rule in the sampled output.
- App grid/test-data interplay: imported CSV through the deployed app text preview, opened Test Data, ran `Grid to Enum Schema`, confirmed modal, and captured schema:
  - `Browser enum("Chrome","Firefox")`
  - `Device enum("Desktop","Mobile","Tablet")`
  - `Theme enum("Light","Dark")`

### Content consistency observations

- The core Schema Definition examples tested were consistent with generator runtime: basic enum, compact inline enum, unknown command-like validation, and the sampled constraint example behaved as documented.
- The Data Grid Editable `Grid to Enum Schema` description matched deployed app behavior after completing the modal confirmation. The visible schema grid shows comma values without quotes, while the captured text schema uses quoted `enum(...)` values; this looks acceptable, but it is worth documenting if users rely on text copy/paste.
- The PR #243 `datatype.enum` docs are accurate where they show the `csv="..."` keyword form. Bare positional values are rejected. Follow-up: confirm the method picker/params editor always inserts or suggests the valid `csv="..."` form for `datatype.enum`, because the generic params placeholder is `Params e.g. (10)` and could encourage invalid bare params.
- Published Faker Helpers docs include `helpers.uniqueArray(this.word.sample, 5)`, but deployed generator validation rejected that exact example. The equivalent callback form `helpers.uniqueArray(faker.word.sample, 3)` worked. Suspected docs defect: update the docs example from `this.word.sample` to the supported `faker.word.sample` form or document the supported callback syntax.
- No user-facing docs/help page reviewed referenced `image.urlLoremFlickr`. The deployed domain picker list contained `image.url` and `image.urlPicsumPhotos`, and the typed legacy command was rejected as unknown. The deployed minified vendor bundle still contains `urlLoremFlickr`, but I treated that as bundled Faker internals, not user-visible docs/content drift.
- I did not find a docs page that names or explains the PR #247 method picker explicitly. The app/generator UI exposes command picker controls for domain/faker schema rows, but docs mostly describe command text and links to Faker/domain pages. Suspected docs gap: add a short "using the method picker" section with screenshots or usage notes.
- REST/CLI docs were reviewed for schema language references, but no deployed runtime comparison was attempted because the charter was deployed browser pages only and no local API/CLI commands were allowed.

### Removed/new command visibility notes

- Removed/stale command check: `image.urlLoremFlickr` was not visible in reviewed docs or the inspected domain picker list; typed use is rejected with a clear unknown keyword message.
- New/current command check: domain picker includes `datatype.boolean`, `datatype.enum`, `internet.httpMethod`, `internet.httpStatusCode`, `image.url`, `image.urlPicsumPhotos`, and many other current commands. Docs cover some of these by family, but method-picker-specific help is thin.
- Faker Helpers docs cover helpers commands, but at least one example uses callback syntax that runtime rejects.

### Techniques and heuristics used

- Crawled deployed docs links from published HTML and selected pages around generation, schema definitions, domain/faker helpers, app grid behavior, and interfaces.
- Compared docs examples against deployed generator preview output instead of local code or tests.
- Used the deployed app's own navigation to include `/grid-table-editor/generator.html`.
- Treated generated/download-ready and preview output separately; preview output was used for actual example comparison.
- Rechecked suspicious examples with exact published syntax before recording them as suspected docs drift.
- Separated user-visible docs/help drift from strings present only inside bundled/minified runtime chunks.

### Suspected defects for main-agent confirmation

- `docs/test-data/faker/helpers` documents `helpers.uniqueArray(this.word.sample, 5)`, but deployed generator rejects that exact schema as unsafe/complex argument parsing. `helpers.uniqueArray(faker.word.sample, 3)` works.
- Method picker/help docs appear incomplete: no reviewed docs page explicitly introduces the method picker UI or explains how to choose commands/params from it.
- `datatype.enum` UX/docs handoff needs confirmation: documented `csv="..."` forms work, but bare params fail and the visible params placeholder is generic. Confirm whether selecting `datatype.enum` via the picker suggests/creates valid params.

### Follow-up ideas

1. Add a docs section showing the method picker workflow in both `app.html` and `generator.html`, including source type selection, command search, params editor, and preview.
2. Update Faker Helpers callback examples to use supported runtime syntax, especially `helpers.uniqueArray(faker.word.sample, 5)`.
3. Add a small docs table for `datatype.enum` showing valid `csv="..."`, `values=[...]` if supported, and invalid bare values.
4. Add a Grid to Enum Schema note explaining the confirmation modal and the max-enum-size option.
5. Add a docs example that round-trips imported CSV -> Grid to Enum Schema -> Generate/Generate Combinations in `app.html`.
6. Add a removed/deprecated command note for image URL commands: prefer `image.url` or `image.urlPicsumPhotos`; `image.urlLoremFlickr` is not accepted.
7. Add docs examples for `internet.httpMethod(commonOnly=true)` because it is visible in the domain picker and worked in runtime.
8. Add a "preview vs generate/download" note in Generate to File docs so users know Preview fills the output area while Generate Data prepares a download.

### Support artifacts

- `docs-consistency-page-inventory.json` and `.md`: page inventory, headings, links, excerpts, and code snippets.
- `docs-consistency-site*.png`, `docs-consistency-generator-html.png`, `docs-consistency-site-app-html.png`: page screenshots from the deployed scout.
- `docs-consistency-runtime-results.json` and `.md`: runtime examples and preview/error evidence.
- `docs-consistency-runtime-*.png`: screenshots for individual runtime examples.
- `docs-consistency-app-grid-check.json` and `.md`: app grid/test-data interplay check and captured enum schema.
- `docs-consistency-app-after-load-sample-data.png`, `docs-consistency-app-grid-to-enum-schema.png`: app flow screenshots.
- `docs-consistency-method-picker-domain-controls.png`: domain picker UI after selecting the `domain` source type.

---
