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
