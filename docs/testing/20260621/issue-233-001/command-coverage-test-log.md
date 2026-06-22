---
## 2026-06-21 15:40 +01:00

- Set up the command-coverage subagent log first so the later exploratory passes can be appended in the required format and stay clearly scoped to representative command-family help/docs/runtime-link coverage in the deployed test environment only.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read the session goal prompt at `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the required scope, log structure, and coverage expectations for this subagent.
- Read the current main session log and report to align this subagent with the story focus on runtime docs/blog URL rewriting and help tooltip HTML rewriting.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/command-coverage-test-log.md`.
- Confirmed the test target is the deployed environment only at `https://eviltester.github.io/grid-table-editor/`.
- Confirmed `npx` is available so a dedicated Playwright CLI session can be used for the deployed-environment checks without running local repo verify, build, package, or test commands.
- Declared the command-coverage scope for this subagent:
  - broad representative sampling across command families
  - emphasis on app help, generator help, example/help flows, and runtime docs-link behavior
  - explicit notes on sampled families, deferred families, and heuristics used

the observations and results that you make

- The PR surface is narrow in code terms but broad in user-facing reach because the link rewriting is cross-cutting across help content and runtime-owned docs/blog links.
- This subagent should bias toward breadth of command-family sampling rather than deep single-command generation verification.
- The most relevant oracle for this lane is consistency:
  - help tooltip content should surface the expected examples or help affordances
  - `Learn more` and related docs links should stay inside `https://eviltester.github.io/grid-table-editor/site/` when they point to owned docs
  - representative command families should not leak production-site or root-relative docs/blog paths in the deployed test environment

---
## 2026-06-21 15:43 +01:00

- Sample representative command/help families across generator, app, and nested docs so this subagent can confirm whether link rewriting is consistent by surface, by command family, and by example style rather than stopping at a single stale link.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened the deployed generator at `https://eviltester.github.io/grid-table-editor/generator.html`.
- Used the schema row source-type selector in the generator to inspect family help affordances for:
  - `domain`
  - `faker`
- In `domain` mode:
  - opened the command picker and confirmed the UI exposes a broad domain inventory including examples such as `date.between`, `finance.iban`, `number.int`, `person.fullName`, `internet.email`, and `chemicalElement.*`.
  - observed the visible help icon target labelled `Domain data help`.
- In `faker` mode:
  - opened the command picker and sampled representative helper-oriented commands including `helpers.arrayElements`, `helpers.fake`, `helpers.fromRegExp`, `helpers.multiple`, and `helpers.uniqueArray`.
  - observed the visible help icon target labelled `Faker data help`.
- Opened generator output/help flows and sampled tooltip rewriting:
  - clicked `Show file generation help`
  - clicked the output `Options` help for default `CSV`
  - changed output format to `JUnit5 Kotlin`
  - re-opened output `Options` help for the unit-test output family
- Opened nested docs pages directly under the deployed site:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`
- On the domain docs page, reviewed representative examples and migration notes for:
  - domain examples: `person.firstName()`, `person.lastName()`, `internet.email()`, `location.streetAddress()`
  - structured-parameter examples: `location.cardinalDirection(abbreviated=true)`, `date.between(from=1577836800000, to=1659312000000)`, `finance.iban(formatted=true, countryCode="GB")`, `finance.iban(formatted=false, countryCode="DE")`, `number.int(min=32, max=47)`
  - removed/deprecated guidance: `domain.helpers.fake("...")` marked as invalid, with migration guidance to `faker.helpers.fake("...")` or `helpers.fake("...")`
- On the faker docs page, reviewed representative direct faker/helper examples:
  - `helpers.mustache("I found {{count}} instances.", { count: () => \`${this.number.int()}\` })`
  - `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `faker.location.cardinalDirection({ abbreviated: true })`
- On the schema definition page, reviewed validator-oriented and constrained-schema examples:
  - `enum("Open","In Progress","Closed")`
  - inline enum form `Browser: Chrome,Firefox,Safari`
  - regex form `[A-Z]{3}-\\d{4}`
  - deterministic domain/structured example `autoIncrement.timestamp(start="2026-06-12T12:39:23Z", step=1, type="seconds")`
  - constraint syntax `IF [Priority] = "High" THEN [Status] = "Open";`
  - alternative terminator `ENDIF`
- Probed one candidate UI-vs-docs inventory mismatch by visiting:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement`
- Cross-checked the deployed app surface at `https://eviltester.github.io/grid-table-editor/app.html` and inspected the visible selected-family help affordance for the default regex family.

the observations and results that you make

- Confirmed defect pattern: visible family help links in the deployed app/generator still leak to the production site instead of the nested testenv docs.
  - Generator `Domain data help` points to `https://anywaydata.com/docs/test-data/domain/domain-test-data`
  - Generator `Faker data help` points to `https://anywaydata.com/docs/test-data/faker-test-data`
  - App visible `Regex data help` points to `https://anywaydata.com/docs/test-data/regex-test-data`
- Confirmed contrasting non-defect pattern: several tooltip-based owned-doc links are correctly rewritten into the nested testenv docs path.
  - Generator `Generate To File docs` tooltip link resolved to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
  - Generator CSV options tooltip links resolved to:
    - `https://eviltester.github.io/grid-table-editor/site/docs/data-formats/csv/csv`
    - `https://eviltester.github.io/grid-table-editor/site/docs/data-formats/csv/options`
  - Generator `JUnit5 Kotlin` unit-test options tooltip link resolved to `https://eviltester.github.io/grid-table-editor/site/docs/data-formats/unit-test-code/options`
- Confirmed the nested docs site itself is largely routed correctly once entered through `/site/docs/...`.
  - Main docs nav links, sidebar links, breadcrumb links, and page-to-page next/previous links on the sampled docs pages stayed under `/grid-table-editor/site/...`
- Confirmed broad representative family coverage for this subagent:
  - domain family sampled in UI help and nested docs
  - faker/helper family sampled in UI help and nested docs
  - removed/deprecated pattern sampled from nested docs migration guidance
  - validator-oriented and constrained-schema patterns sampled from schema definition docs
  - structured-parameter commands sampled from domain and schema-definition docs
  - multiple-example docs pages sampled from both domain and faker pages
  - app-vs-generator cross-surface help behavior sampled through regex in `app.html` and domain/faker in `generator.html`
  - newer/expanded unit-test output family sampled through `JUnit5 Kotlin` options help
- Confirmed a likely docs/content mismatch worth follow-up:
  - the generator domain picker exposes `chemicalElement.*` commands
  - direct visit to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement` returned GitHub Pages `Page not found`
  - this suggests at least one exposed domain family may not have a matching nested docs page, or its route/name differs from the UI inventory
- Working interpretation for this lane:
  - the PR appears to have fixed some runtime tooltip rewriting paths
  - but the visible family help entrypoints for command families remain stale on at least the sampled app/generator surfaces
  - this is a cross-surface consistency issue, not an isolated single-command defect
- Techniques and heuristics used in this pass:
  - risk-based sampling across surfaces most likely touched by runtime link rewriting
  - consistency/oracle checking between UI help entrypoints and nested published docs
  - representative equivalence partitioning across command families rather than brute-force command execution
  - migration-note mining in docs to cover removed/deprecated behavior without drifting into broad code inspection
  - mismatch hunting between UI command inventories and nested docs page availability
- Deferred families and gaps from this subagent lane:
  - literal and enum family-specific help entrypoints were not separately opened because the stronger cross-family stale-link pattern was already repeatable on regex/domain/faker and time was better spent on docs-oracle comparisons
  - malformed parameter execution and constraint-breaking examples were deferred to the negative-validation subagent
  - full data-generation runtime validation for sampled commands was deferred because this lane is scoped to help/docs/runtime-link behavior, not generation correctness
  - broad page-by-page docs inventory reconciliation for every domain listed in the picker was deferred after proving the `chemicalElement` mismatch path
- New ideas for the main agent:
  - 1. Execute-now: compare `literal` and `enum` visible help links in both `app.html` and `generator.html` to see whether the stale-link leak affects all five source families or only the docs-backed ones.
  - 2. Execute-now: inspect `site/app.html` separately from root `app.html` because the docs navbar opens that version and it may have different rewrite behavior.
  - 3. Execute-now: test whether clicking the stale `Domain data help`, `Faker data help`, and `Regex data help` links actually leaves the GitHub Pages environment in the browser, not just in raw href values.
  - 4. Execute-now: compare generator family help hrefs against the method-picker/docs routes to determine whether they should target category pages, overview pages, or command-specific pages.
  - 5. Execute-now: sample another exposed-but-suspect domain such as `language`, `unit`, or `science` to see whether the `chemicalElement` docs mismatch is isolated or systemic.
  - 6. Execute-now: inspect the `Method Picker UI Spec` docs page to see whether the docs describe the same domain/faker inventories and naming conventions shown in the deployed picker.
  - 7. Execute-now: test `Show help for this option` on several unit-test output options such as `Framework`, `Suite Name`, and `Data Source Strategy` to confirm option-level nested links also rewrite correctly.
  - 8. Execute-now: inspect `Generate To File` and `Pairwise Testing` links from multiple tooltips/pages because earlier broad DOM inspection suggested those may exist in both corrected and stale forms depending on surface.
  - 9. Defer: build a docs-inventory matrix that maps picker families/commands to nested docs page availability, starting with domain families and faker helpers.
  - 10. Defer: sample video/tutorial pages linked from faker docs to ensure embedded and related links do not regress to non-nested docs routes.
  - 11. Defer: test copied examples from the domain/faker/schema-definition docs in the generator text editor to see whether doc examples still execute as documented in the deployed environment.
  - 12. Defer: compare the nested docs `App` navbar target `site/app.html` with the root landing-page `app.html` flow for help-link parity, keyboard focus behavior, and tab-opening consistency.

---
