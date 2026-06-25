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
