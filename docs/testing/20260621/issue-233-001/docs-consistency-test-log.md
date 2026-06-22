---
## 2026-06-21 15:42 +01:00

- Set up the docs-consistency subagent log first so this lane can append deployed-environment-only evidence about published docs surfaces, in-app help links, nested-site routing, and stale-command visibility.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read the session goal prompt at `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the required scope, append-only structure, coverage expectations, and the rule to use only the deployed test environment at `https://eviltester.github.io/grid-table-editor/`.
- Read the existing command-coverage subagent log and an earlier docs-consistency log from the prior session to align this lane with the expected evidence style and focus on runtime help/docs parity.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/docs-consistency-test-log.md`.
- Confirmed this subagent will not run local repo verify, build, package, or test commands.
- Declared the docs-consistency scope for this lane:
  - published docs surfaces relevant to changed command/help families
  - app help and tooltip `Learn more` targets
  - method-picker `Open documentation` targets
  - representative sampling across domain, helper/faker, structured-parameter, validator-oriented, newly added, and removed/deprecated commands where practical
  - explicit notes about whether reviewed pages stay inside the nested-site `/site/` path

the observations and results that you make

- The highest-risk area for this lane is not only whether commands exist, but whether the deployed app consistently routes users to the nested GitHub Pages docs surface rather than root-relative or production-host docs that can drift.
- The main consistency oracles for this pass are:
  - help and tooltip links should land on working docs pages under `https://eviltester.github.io/grid-table-editor/site/` when they refer to owned docs
  - representative command examples in help and docs should still describe commands that exist in the live deployed picker
  - removed or deprecated commands should not remain visible in current help/docs surfaces without clear context

---

## 2026-06-21 15:43 +01:00

- Cross-check the deployed app and generator help surfaces against the nested `/site/` docs, with representative command-family sampling across newly added, helper/faker, structured-parameter, validator-oriented, and removed-command areas.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Started a dedicated Playwright CLI browser session named `issue233-docs-consistency` against `https://eviltester.github.io/grid-table-editor/`.
- Opened and reviewed these deployed runtime surfaces:
  - `https://eviltester.github.io/grid-table-editor/`
  - `https://eviltester.github.io/grid-table-editor/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
- In `app.html`, opened the `Test Data` help tooltip and inspected the exposed `Learn more` target.
- In `generator.html`, sampled the following help and docs-link surfaces:
  - `Data Generator Instructions` help tooltip
  - inline `Regex data help` link
  - inline `Domain data help` link
  - method-picker `Open documentation` links after filtering representative commands
- Opened the generator method picker and filtered for representative command families:
  - newly added: `internet.httpMethod`
  - helper/faker: `helpers.arrayElement`
  - structured-parameter: `helpers.rangeToNumber`
  - validator-oriented / constrained params: `string.alpha`
  - removed/deprecated: `image.urlLoremFlickr`
- For each sampled command, recorded the picker detail panel’s description, parameter structure, usage examples, and `Open documentation` target.
- Reviewed the corresponding published nested-site docs pages and checked whether they stayed within the deployed nested path:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image`
- Used runtime-link oracles plus direct page-content checks against the deployed nested docs to confirm whether sampled commands were present on those pages and whether removed command text still leaked.
- Techniques and heuristics used:
  - exploratory docs testing
  - risk-based sampling of changed help/docs seams
  - consistency-oracle checking between tooltip links, picker links, and nested docs pages
  - equivalence partitioning across command families rather than repeating one domain
  - stale-content probing for removed/deprecated commands
  - structured-parameter and validator-focused sampling to exercise the more error-prone example formats
- New ideas for the main agent:
  - `execute-now` Check whether the app-level `Instructions` tooltip also routes into `/site/` and not a root-relative or production-host docs URL.
  - `execute-now` Check whether `Schema` section help in `generator.html` still mixes external-host links with nested-site links.
  - `execute-now` Sample one more faker helper with object or callback-heavy params such as `helpers.multiple` for docs-example readability drift.
  - `execute-now` Sample one more image-domain command from the picker, then compare it with `/site/docs/test-data/domain/image` to confirm the image-page cleanup is broad, not just `urlLoremFlickr`.
  - `execute-now` Check whether any blog links exposed from current help surfaces also stay under `/grid-table-editor/site/blog` rather than `anywaydata.com/blog`.
  - `execute-now` Verify whether `domain.helpers.arrayElement(...)` and similar mixed-prefix examples still appear only in docs or are also surfaced anywhere in current runtime help.
  - `defer` Search more nested docs pages for older alias spellings like `internet.userName` to see whether alias cleanup is complete across the published site.
  - `defer` Compare nested `/site/` docs and production-host docs for the same sampled pages to quantify how much drift remains outside the deployed-owned docs surface.
  - `defer` Review mobile rendering of the sampled `/site/` docs pages to see whether long command examples or tables overflow on narrow viewports.
  - `defer` Verify whether footer and pagination links from sampled `/site/` docs pages always remain under `/grid-table-editor/site/`.
  - `defer` Check whether command-picker `Open documentation` links remain correct after switching the row type from `domain` to `faker` and back several times.
  - `defer` Sample one command whose docs page contains multiple examples with array/object literals, then try transferring one example directly into the params field to assess copy/paste clarity.

the observations and results that you make

- Confirmed good path rewrite in the main app tooltip:
  - In `app.html`, the `Test Data` tooltip `Learn more` link now points to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`.
  - This stays within the deployed nested-site path and did not show a GitHub Pages not-found outcome in the reviewed nested docs surface.
- Confirmed good path rewrite in the generator instructions tooltip:
  - In `generator.html`, the `Data Generator Instructions` tooltip exposed `Generate To File docs -> https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`.
  - This also stays within the nested-site path.
- Confirmed remaining mixed-host inconsistency inside the generator UI:
  - The inline `Regex data help` link points to `https://anywaydata.com/docs/test-data/regex-test-data`.
  - The inline `Domain data help` link points to `https://anywaydata.com/docs/test-data/domain/domain-test-data`.
  - Those two links do not stay inside the deployed nested-site path, even though the same deployed environment already exposes equivalent nested docs under `/grid-table-editor/site/docs/...`.
  - This is the strongest docs-consistency finding from this pass because users can move between nested-site-safe tooltip help and production-host inline help within the same screen.
- Confirmed good picker-to-nested-doc routing for sampled methods:
  - `internet.httpMethod -> /grid-table-editor/site/docs/test-data/domain/internet`
  - `helpers.arrayElement -> /grid-table-editor/site/docs/test-data/faker/helpers`
  - `helpers.rangeToNumber -> /grid-table-editor/site/docs/test-data/faker/helpers`
  - `string.alpha -> /grid-table-editor/site/docs/test-data/domain/string`
- Confirmed the sampled nested docs pages actually contain the sampled commands and examples:
  - `/site/docs/test-data/domain/internet` contains `internet.httpMethod` with the same core examples seen in the picker: default call, `commonOnly=true`, and `excludes="patch, TRACE"`.
  - `/site/docs/test-data/domain/string` contains `string.alpha` with examples for blank params, `length`, `casing`, and `exclude`, matching the live picker’s overall example set.
  - `/site/docs/test-data/faker/helpers` contains both `helpers.arrayElement` and `helpers.rangeToNumber`.
- Confirmed removed-command cleanup in both runtime and nested docs:
  - Filtering the live picker for `image.urlLoremFlickr` returned no methods and left the detail panel at `No method selected`.
  - The reviewed nested image docs page under `/site/docs/test-data/domain/image` included `image.urlPicsumPhotos` and other current image methods but did not expose `image.urlLoremFlickr`.
- Positive coverage note for the newly added command:
  - `internet.httpMethod` is not just present in the picker; its detail panel and the nested `/site` docs page are closely aligned on parameter names, allowed usage patterns, and example calls.
- Positive coverage note for validator-oriented examples:
  - `string.alpha` showed a strong match between picker examples and nested docs examples, including constrained param combinations such as `length=5`, `casing="upper"`, and `exclude=["A","B","C"]`.
- Potentially misleading example drift remains in the faker helper docs page:
  - The nested `/site/docs/test-data/faker/helpers` page still shows mixed invocation styles for helper examples, including `helpers.arrayElement(...)`, `faker.helpers.arrayElement(...)`, and `domain.helpers.arrayElement(...)`.
  - The picker presents `helpers.arrayElement` as the command name and `faker.helpers.arrayElement()` as the schema canonical form.
  - That multi-style documentation may be intentional, but it is still a consistency risk because `domain.helpers.arrayElement(...)` looks unlike the live picker command naming and may be harder for users to map back into the current UI.
- Coverage achieved in this pass:
  - app help/tooltip `Learn more` routing
  - generator help/tooltip routing
  - representative domain command docs-link parity
  - representative helper/faker command docs-link parity
  - structured-parameter example parity
  - validator/constrained-parameter example parity
  - removed/deprecated command cleanup in both runtime picker and nested docs
- Deferred from this pass:
  - deeper alias cleanup checks beyond the sampled pages
  - broader mobile docs rendering checks
  - broader blog-link checks outside the sampled help surfaces
  - direct execution of sampled examples in the generator output flow, since this lane focused on docs/help consistency rather than command-behavior verification

---
