# Docs Consistency Test Log

## Charter

- Owner: subagent for docs/help/content consistency
- Goal: compare published docs, in-app help, visible examples, and runtime behavior for changed command families using the deployed test environment only
- Write scope: this file only
- Techniques and heuristics: documentation testing, oracle checking, consistency checking, exploratory comparison

---

## 2026-06-22T13:47:38.2027885+01:00

- Capture a partial but concrete comparison set before stopping: verify the visible help/doc links in the deployed environment, compare the published method-picker and faker docs against the live generator picker/runtime, and separate true inconsistencies from accepted out-of-scope differences.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in the deployed browser and reviewed the landing page cards plus build metadata for branch `233-test-env-consistency`
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` and reviewed the default row-mode schema editor, including the regex help link and the schema help affordances
- Opened `https://eviltester.github.io/grid-table-editor/app.html`, expanded the `Test Data` section, and opened the visible help tooltip for the section
- Fetched and reviewed published docs pages reachable from the deployed environment:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/method-picker-ui-spec`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- On the faker docs page, inspected the visible example block that includes `faker.location.cardinalDirection({ abbreviated: true })`
- Back in `generator.html`, changed the schema row source type from `regex` to `faker`
- Clicked the visible `Select faker command` control to open the live `Select schema method` dialog
- In the live picker dialog, used the `Filter methods` search box with `internet.httpMethod` and then with `cardinalDirection`
- With `cardinalDirection` still filtered, clicked the `location` category tab in the picker and reviewed the resulting method details and usage examples
- Verified the published docs navbar `App` link target by requesting `https://eviltester.github.io/grid-table-editor/site/app.html`

the observations and results that you make

- The deployed landing page and in-app help links that I checked are consistently routed to the nested testenv docs/app paths rather than an external production docs host
- The `Test Data` help tooltip in `app.html` links `Learn more` to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`, which is consistent with the testenv link-consistency goal
- The generator row-level regex help link points to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`, which is also consistent
- The published `Method Picker UI Spec` is clearly labeled as a spec, but the generator runtime also now exposes a real modal picker with search, category tabs, method details, parameter sections, and usage examples, so the generator side looks directionally aligned with the published design
- The live picker is concrete evidence that users can inspect examples in runtime for at least some command families; this is stronger than the older dropdown-only surface I first saw before opening the picker
- The strongest content inconsistency I found is in the published faker docs page: it visibly includes the direct faker example `faker.location.cardinalDirection({ abbreviated: true })`
- In the live generator picker, filtering `cardinalDirection` and choosing the `location` category surfaces the domain command `location.cardinalDirection`, with method details headed `location.cardinalDirection`, a canonical call shown as `awd.domain.location.cardinalDirection()`, and usage examples for `location.cardinalDirection`
- That means the published faker example is not aligned with the live picker’s preferred/exposed command surface for the same concept; this is the clearest candidate for stale example drift in the docs/help family I covered
- I did not confirm from runtime whether the direct faker `abbreviated` parameter example is still accepted when executed, only that it is still published in the docs while the picker/runtime oracles point users toward the domain command instead
- Searching the live picker for `internet.httpMethod` from the open faker-picker path did not immediately yield a selected method before I stopped; I consider that area only partially covered, not a confirmed defect
- The published docs navbar `App` link is not broken in this environment: `https://eviltester.github.io/grid-table-editor/site/app.html` returned a live app page
- I noticed non-visible page metadata on docs pages still points canonical/OG URLs at `https://anywaydata.com/...`, but I did not treat that as a finding for this lane because the issue focus is visible links/content consistency rather than metadata-only differences

---
## 2026-06-22T13:38:12.6884840+01:00

- Start the docs/help consistency session by connecting to the deployed test environment, then compare visible docs/help/examples against runtime behavior for the changed command families. I want the log to show the initial setup path and any tool constraints before deeper coverage.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Confirmed the allowed write target exists: `D:\github\anywaydata-ai-testing\docs\testing\20260622\issue-233-001\docs-consistency-test-log.md`
- Looked up prior memory for `grid-table-editor` issue `233`, docs/help consistency work, and earlier deployed-environment findings to focus this pass on visible links, usage examples, validators, and picker/help oracles
- Read the local skill instructions for `control-in-app-browser` and `playwright`
- Attempted to bootstrap the in-app browser runtime against the deployed test surface via `C:\Users\mr_ri\.codex\plugins\cache\openai-bundled\browser\26.616.41845\scripts\browser-client.mjs`
- The attempted browser connection did not reach the page because the runtime failed during setup before any navigation

the observations and results that you make

- The session is correctly constrained to append-only logging in this single file
- Prior context suggests the method picker/details panel is a high-value comparison surface for command/help drift, especially around structured usage examples and invalid parameters
- The in-app browser path was not usable in this session because setup failed with `codex/sandbox-state-meta: missing field sandboxPolicy`
- Because the failure happened before page access, I treated it as an environment/tooling problem rather than a product finding and prepared to continue with Playwright-based browser automation against the same deployed URLs

---
