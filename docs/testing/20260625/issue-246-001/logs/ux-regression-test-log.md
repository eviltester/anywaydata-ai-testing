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
