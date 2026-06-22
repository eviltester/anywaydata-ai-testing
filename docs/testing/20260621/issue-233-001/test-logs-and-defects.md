# Test Logs And Defects

This file collates the detailed session evidence and defect reports for issue #233 / PR #234.

## issue-233-test-log.md

Source: [issue-233-test-log.md](issue-233-test-log.md)

---
## 2026-06-21 15:33 +01:00

- Set up the issue 233 exploratory review structure first so the session has the required prompt copy, dated output folder, planning artifacts, and proof that browser interaction works before substantive testing begins.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the user goal and confirmed the required output root is `docs/testing/20260621/issue-233-001/`.
- Created the session folder plus `defects/` and `screenshots/`.
- Re-read the issue at `https://github.com/eviltester/grid-table-editor/issues/233`.
- Re-read the PR at `https://github.com/eviltester/grid-table-editor/pull/234`.
- Pulled a lightweight local copy of PR branch `233-test-env-consistency` for diff inspection only, without running repo verify or test commands.
- Derived the changed files from the PR:
  - `apps/web/src/tests/jest/testenv-root-page-links.test.js`
  - `packages/core-ui/js/gui_components/shared/test-data/help/runtime-docs-url.js`
  - `packages/core-ui/js/help/help-tooltips.js`
  - `packages/core-ui/src/tests/shared/runtime-docs-url.test.js`
  - `packages/core-ui/src/tests/utils/help-tooltips.test.js`
  - `scripts/create-testenv.mjs`
- Confirmed `pandoc` is available for the required final PDF export.

the observations and results that you make

- The story is tightly focused on test-environment link consistency rather than general command-generation correctness.
- The PR changed runtime link rewriting in three important seams:
  - root test-environment page links
  - runtime docs/blog URL resolution
  - inline help tooltip HTML rewriting
- Even though the code change is narrow, the risk surface is broad because tooltip and docs-link rewriting can affect many command families and multiple app surfaces.
- The session needs broad command-family sampling, but the sampling should focus on help/docs/runtime-link behavior rather than trying to treat this as a pure data-generation feature review.

---
## 2026-06-21 15:34 +01:00

- Prove the deployed test environment can be opened and interacted with in a real browser before starting substantive exploratory passes.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Attempted to connect through the in-app browser bridge first, following the browser skill instructions.
- Hit a session-level tool failure during browser bootstrap before the browser session was established.
- Switched to the allowed Playwright MCP path instead of stopping.
- Opened `https://eviltester.github.io/grid-table-editor/` in a headed Playwright session.
- Captured a fresh snapshot of the root page.
- Clicked `Open app.html` from the test environment landing page and confirmed navigation into the deployed application.

the observations and results that you make

- Browser interaction is confirmed for this session via Playwright.
- The deployed root page is live and interactive.
- The landing page already reflects the PR intent by showing `site/` instead of `anywaydata.com` as the prominent nested-site destination.
- Navigation into `app.html` worked, so substantive deployed-environment testing can proceed.

---
## 2026-06-21 15:35 +01:00

- Lock in the planning model and delegation map before substantial testing so the rest of the session can run in explicit loops with distinct coverage ownership.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the changed-file diff in detail to identify affected seams and likely blind spots.
- Mapped the mandatory subagent charters from the prompt onto the actual PR surface.
- Identified an extra gap area beyond the five required charters: cross-surface root-page and nested-site routing consistency outside command help tooltips.
- Began writing the main report with scope, risk analysis, changed-surface inventory, coverage strategy, delegation map, coverage diagram, and loop strategy.

the observations and results that you make

- The PR risk is not that one command family changed incorrectly; it is that global link rewriting may behave differently across command help, inline HTML help, docs pages, and top-level testenv entry points.
- The strongest likely defect classes are:
  - missed root-path variants such as `/docs`, `docs`, `/blog`, or `blog`
  - stale production links surviving in the test environment
  - inconsistent behavior between `app.html`, `generator.html`, and other shipped pages
  - inconsistencies between tooltip `Learn more` links and published nested-site docs
  - regressions that appear only on narrow/mobile layouts or for keyboard users
- This session should use multiple loops even if the first loop finds defects quickly, because the change is intentionally cross-cutting.

---
## 2026-06-21 15:38 +01:00

- Start Loop 1 live coverage in the deployed generator so the session can quickly confirm whether production-link leakage still exists in obvious user-facing help surfaces before the broader delegated passes finish.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/generator.html` in the active Playwright session.
- Captured a fresh snapshot of the default generator state.
- Inspected the first visible row and its adjacent help affordances without changing the starter schema.
- Observed the visible `Regex data help` link rendered beside the default `regex` row.
- Clicked `Regex data help`.
- Listed browser tabs after the click to verify the actual destination URL.
- Captured a supporting screenshot at `screenshots/main-generator-regex-help-anywaydata.png`.

the observations and results that you make

- Confirmed live production-link leakage in the deployed test environment: the visible `Regex data help` link on `generator.html` points to `https://anywaydata.com/docs/test-data/regex-test-data/`.
- The click opened a new browser tab on `anywaydata.com`, so this is not just stale text or a hidden attribute issue; it is a real navigation path.
- This appears to be a high-confidence story miss because issue #233 explicitly requires test-environment URLs to stop using `anywaydata.com`.
- The finding also suggests the PR may have improved some rewritten tooltip/root-page paths while leaving other direct help-link surfaces untouched.

---
## 2026-06-21 15:50 +01:00

- Consolidate Loop 1 now that all delegated lanes have completed, so the session can distinguish the dominant failure patterns from the clean positive controls before generating the next wave of targeted ideas.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read and integrated:
  - `command-coverage-test-log.md`
  - `negative-validation-test-log.md`
  - `docs-consistency-test-log.md`
  - `ux-regression-test-log.md`
  - `responsive-accessibility-test-log.md`
  - `cross-surface-root-links-test-log.md`
- Compared the delegated coverage against the actual PR seams:
  - build-time root page rewriting
  - runtime tooltip HTML rewriting
  - direct visible family-help links
  - nested `/site/` parity
- Grouped the Loop 1 evidence into positive controls, confirmed defects, and softer follow-up risks.

the observations and results that you make

- Strong positive controls:
  - root landing page links are largely correct
  - sampled tooltip-based docs links often rewrite correctly into `/grid-table-editor/site/docs/...`
  - nested `/site/docs/...` and `/site/blog` pages are healthy and usable
  - `combinatorial.html` and `webmcp.html` stayed clean in the sampled pass
- Strong confirmed failure patterns:
  - visible family-help links still leak to `anywaydata.com`
  - root-relative `/docs/...` links still escape to `https://eviltester.github.io/docs/...` and 404
  - repo-relative `docs/...` links still resolve to `https://eviltester.github.io/grid-table-editor/docs/...` and 404
  - root and nested `/site/` surfaces still disagree in how fully they rewrite owned links
  - `chemicalElement.*` appears in the live picker but the sampled nested docs route 404s
- Secondary but repeatable UX issue:
  - adjacent help overlays can block clicks on nearby help controls in the params workflow
- Loop 1 conclusion:
  - the PR improved some important seams, but the story is not met because the deployed environment still exposes multiple stale or broken owned-link families.

---
## 2026-06-21 15:52 +01:00

- Run Loop 2 as a targeted expansion pass so the session can check whether the mixed-link problem is isolated to root pages only or also survives in the nested `/site/` versions and the writer-schema surface.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Generated 10 Loop 2 ideas and classified them:
  - `execute-now`:
    1. verify `site/generator.html` default `Regex data help`
    2. verify `site/app.html` still shows row-level regex help leakage after expanding `Test Data`
    3. verify `site/app.html` nested docs/blog nav remains a positive control
    4. verify `site/app.html` still has the broken root-relative docs class
    5. verify `writer-schema.html` repeats the shared schema-editor help leak
    6. verify the `chemicalElement` nested docs route still 404s
  - `defer`:
    7. exhaustively sample every source family (`enum`, `literal`, `domain`, `faker`) as separate row-link defects
    8. deep-check Storybook non-default pages
    9. audit every article-body production URL inside nested docs content
    10. map every live picker family against docs-route availability
- Executed the six `execute-now` ideas using a mix of Playwright and direct deployed-URL checks.
- Opened and inspected:
  - `https://eviltester.github.io/grid-table-editor/site/generator.html`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/writer-schema.html`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement`
- Expanded `Test Data` on `site/app.html` and inspected the shared schema row.

the observations and results that you make

- `site/generator.html` still exposes `Regex data help -> https://anywaydata.com/docs/test-data/regex-test-data`.
- `site/app.html` still exposes row-level `Regex data help -> https://anywaydata.com/docs/test-data/regex-test-data` even though the page lives under `/site/`.
- `site/app.html` top nav remains a positive control with `Docs -> docs/intro` and `Blog -> blog`, which resolve correctly in the nested context.
- `writer-schema.html` repeats the same row-level `Regex data help` production-host leak through the shared schema editor.
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement` still returns GitHub Pages `Page not found`.
- Loop 2 conclusion:
  - the stale family-help problem is not confined to root pages; it survives in nested `/site/` app/generator variants and in the writer-schema surface.

---
## 2026-06-21 15:54 +01:00

- Run Loop 3 as a parity-and-contrast pass so the session can verify whether the same page can simultaneously contain correctly rewritten tooltip links and still-broken visible family-help links.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Generated 10 Loop 3 ideas and classified them:
  - `execute-now`:
    1. compare `site/generator.html` top tooltip help versus row-level regex help
    2. compare `site/app.html` `Test Data` tooltip versus row-level regex help
    3. re-check `writer-schema.html` shared schema row leak in live UI
    4. compare root versus nested generator behavior on the same default regex row
    5. compare root versus nested app behavior on the same shared schema row
  - `defer`:
    6. keyboard-specific reproduction of tooltip interception
    7. full mobile-width retest at narrower breakpoints
    8. non-default Storybook story docs audit
    9. broader blog-link search inside docs article bodies
    10. family-by-family docs inventory matrix beyond `chemicalElement`
- Opened `https://eviltester.github.io/grid-table-editor/site/generator.html` and expanded `Data Generator Instructions`.
- Captured the resulting tooltip content and link target.
- Opened `https://eviltester.github.io/grid-table-editor/site/app.html`, expanded `Test Data`, and opened its tooltip.
- Rechecked `writer-schema.html` and its shared schema row.

the observations and results that you make

- `site/generator.html` confirms the strongest same-page contrast in the session:
  - top tooltip `Generate To File docs` rewrites correctly to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
  - row-level `Regex data help` on the same page still points to `https://anywaydata.com/docs/test-data/regex-test-data`
- `site/app.html` shows the same split:
  - the `Test Data` tooltip `Learn more` link rewrites correctly to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
  - the visible shared-schema row still shows `Regex data help` pointing to `https://anywaydata.com/docs/test-data/regex-test-data`
- `writer-schema.html` again exposes the same stale row-level help link via the shared schema component.
- Loop 3 conclusion:
  - this is not a generic “nothing rewrites” failure; it is a seam-specific parity defect where tooltip-driven help is often fixed while direct visible family-help links are not.

---
## 2026-06-21 15:56 +01:00

- Perform the mandatory final review loop over the story, PR, accumulated logs, coverage model, sampled families, docs reviewed, examples tried, defects found, and remaining gaps before generating the final report and PDF.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Re-read:
  - issue `#233`
  - PR `#234`
  - the main log
  - the main report draft
  - all six delegated logs
  - the drafted defect files
- Generated 10 final-review ideas and classified them:
  - `execute-now`:
    1. re-check a known clean surface as a stop-control (`combinatorial.html`)
    2. re-check root `app.html` live state before finalizing scope
    3. confirm the nested `/site/` tooltip-vs-row split remains the dominant defect class
    4. confirm stop scope should stay on owned docs/help routing rather than article-body example URLs
  - `defer`:
    5. exhaustive family-link census for every visible row type
    6. all nested docs article-body production URL audit
    7. deeper Storybook story-by-story pass
    8. full keyboard/screen-reader audit of the app shell
    9. route-by-route inventory diff for all domain docs pages
    10. broader blog-post content audit
- Executed the four `execute-now` ideas by:
  - reopening `app.html`
  - reopening `combinatorial.html`
  - comparing the latest root/nested generator and app evidence
  - explicitly separating runtime-owned help/link failures from documentary production examples embedded in article prose

the observations and results that you make

- `combinatorial.html` stayed clean again, which strengthens the conclusion that the deployment is partially fixed rather than globally broken.
- The final review did not introduce a new failure class; it reinforced the same dominant classes:
  - stale production-host family-help links
  - broken `/docs/...` and `docs/...` owned links
  - parity gaps between root, nested, tooltip, and visible-link seams
  - missing nested docs coverage for at least `chemicalElement.*`
- The remaining deferred ideas are useful but no longer necessary to justify the recommendation.
- Stopping is justified because:
  - broad coverage was achieved across command-family help surfaces, docs surfaces, workflow areas, mobile/accessibility, and cross-surface routing
  - multiple explicit loops were completed
  - recent loops mostly sharpened the same repeatable defect classes rather than revealing new ones
  - the evidence is strong enough to support investigator-ready defect reports and a clear acceptability recommendation


## command-coverage-test-log.md

Source: [command-coverage-test-log.md](command-coverage-test-log.md)

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


## negative-validation-test-log.md

Source: [negative-validation-test-log.md](negative-validation-test-log.md)

---
## 2026-06-21 15:35 +01:00

- Establish the negative-validation subagent setup first so the deployed-only pass stays append-only, targets the PR #234 link-consistency risk, and uses a dedicated Playwright CLI session from the start.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the issue #233 / PR #234 session prompt and confirmed this subagent owns only `negative-validation-test-log.md`.
- Confirmed the allowed target is the deployed test environment at `https://eviltester.github.io/grid-table-editor/` only.
- Confirmed the dedicated browser session name will be `issue233-negative-validation`.
- Confirmed the writable evidence area for any screenshots is `docs/testing/20260621/issue-233-001/screenshots/`.
- Prepared to focus on malformed or root-relative docs/blog paths, stale production links, inconsistent variants across app/help/docs surfaces, broken or surprising navigation outcomes, and command-help `Learn more` failures.
- Prepared to sample representative command/help flows rather than one isolated command family, with emphasis on negative and edge routing cases.

the observations and results that you make

- The changed surface is small in code terms but broad in runtime reach because help-tooltip and docs URL rewriting can affect many commands and multiple shipped pages.
- This subagent should treat link destinations and navigation outcomes as the primary oracle, with command selection used mainly to reach varied help surfaces.

---
## 2026-06-21 15:42 +01:00

- Run a substantive negative pass against deployed link consistency so I can prove which link variants work, which fail with 404s, which still leak to production, and whether command-help routing is consistent across app, generator, docs, and method-picker surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in a dedicated Playwright CLI session named `issue233-negative-validation`.
- Confirmed the positive-control root page links exposed `./site/`, `./app.html`, and `./generator.html`.
- Clicked `Open app.html` on the root page and inspected the deployed app at `https://eviltester.github.io/grid-table-editor/app.html`.
- Enumerated docs/blog-style anchors from the live `app.html` DOM and sampled the actual href families surfaced by the deployed UI:
  - nested-site positive links such as `https://eviltester.github.io/grid-table-editor/site/docs/intro` and `https://eviltester.github.io/grid-table-editor/site/blog`
  - root-relative links such as `https://eviltester.github.io/docs/editing-data/text-editing`
  - repo-relative links such as `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
  - stale production links such as `https://anywaydata.com/docs/test-data/generate-to-file`
- Opened those sampled URLs in separate tabs to classify outcomes:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
  - `https://eviltester.github.io/docs/editing-data/text-editing`
  - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
  - `https://anywaydata.com/docs/test-data/generate-to-file`
  - `https://eviltester.github.io/grid-table-editor/site/blog`
- Captured screenshots for the negative navigation outcomes:
  - `screenshots/negative-validation-root-relative-docs-404.png`
  - `screenshots/negative-validation-repo-relative-docs-404.png`
  - `screenshots/negative-validation-stale-production-docs.png`
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` and repeated the link audit on the standalone generator.
- Verified the generator top nav still exposes the positive nested-site links `./site/docs/intro` and `./site/blog`.
- Sampled the generator row-level help affordances in multiple command-help states:
  - default `regex` row with `Regex data help`
  - switched the row type combobox from `regex` to `domain`
  - opened the domain method picker with `Select domain command`
  - selected representative command-detail samples from different changed families inside the picker:
    - `finance.pin`
    - `helpers.slugify`
- Recorded the actual docs/help URLs exposed by those generator surfaces:
  - family-level help icons:
    - `Regex data help` -> `https://anywaydata.com/docs/test-data/regex-test-data`
    - `Domain data help` -> `https://anywaydata.com/docs/test-data/domain/domain-test-data`
  - command-detail docs links inside the method picker:
    - `finance.pin` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance`
    - `helpers.slugify` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
- Tried to click the visible `Domain data help` icon while the method-picker overlay was open.
- Observed the click fail because the overlay tab strip intercepted pointer events before the stale help link could be activated directly.
- Techniques and heuristics used:
  - exploratory testing focused on navigation behavior
  - negative testing of malformed/root-relative/repo-relative/prod-target link variants
  - consistency/oracle checking across root page, app, generator, docs, and blog surfaces
  - representative command-family sampling (`regex`, `domain`, `finance`, `faker/helpers`)
  - positive controls first, then broken-path and stale-link follow-up
  - repeatability checks using direct URL opens after DOM inspection

the observations and results that you make

- Positive control passed on the root page and nested-site shell:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro/` opened successfully with title `About | AnyWayData - Data Table Editor & Generator`.
  - `https://eviltester.github.io/grid-table-editor/site/blog/` opened successfully with title `Blog | AnyWayData - Data Table Editor & Generator`.
- Root-relative docs links are still broken in the deployed app/generator surfaces:
  - `https://eviltester.github.io/docs/editing-data/text-editing` opened `Page not found · GitHub Pages`.
  - This confirms `/docs/...` style links still escape the repo subpath and land on the wrong GitHub Pages host path.
- Repo-relative docs links are also still broken when they omit the nested `site/` segment:
  - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options` opened `Page not found · GitHub Pages`.
  - This is a different failure mode from root-relative links because it stays under `/grid-table-editor/` but still misses the nested-site mount point.
- Stale production docs links remain visible in the deployed test environment:
  - `https://anywaydata.com/docs/test-data/generate-to-file/` opened a live production docs page instead of staying inside the deployed review environment.
  - This makes the test environment navigation inconsistent and can hide testenv-only differences by silently switching the user to production content.
- The app and generator both expose mixed link variants at the same time rather than a single consistent routing strategy:
  - good nested-site links for top-level Docs/Blog navigation
  - broken root-relative `/docs/...`
  - broken repo-relative `docs/...`
  - stale production `https://anywaydata.com/docs/...`
- Generator command-help routing is internally inconsistent:
  - command-level `Open documentation` links for sampled commands were rewritten correctly to nested-site URLs under `/grid-table-editor/site/docs/...`
  - nearby family-level help icons for the same overall workflow still pointed to `https://anywaydata.com/docs/...`
  - this was reproduced across two different command/help areas:
    - domain sample `finance.pin`
    - faker/helper sample `helpers.slugify`
- The method-picker UI adds its own navigation/usability edge case:
  - the visible `Domain data help` anchor could not be clicked directly while the overlay was open because overlay content intercepted pointer events
  - even ignoring the stale destination, the activation path is fragile in-context
- Repeatability is strong for the main negative findings:
  - the 404 outcomes are deterministic for both sampled broken URL classes
  - the stale production-link outcome is deterministic
  - the command-level versus family-level inconsistency reproduced across multiple representative command families

---


## docs-consistency-test-log.md

Source: [docs-consistency-test-log.md](docs-consistency-test-log.md)

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


## ux-regression-test-log.md

Source: [ux-regression-test-log.md](ux-regression-test-log.md)

---
## 2026-06-21 15:48 +01:00

- Establish the UX/regression subagent charter and setup so this lane can focus on deployed-environment usability, help discoverability, method-picker workflow, and link-following behavior before substantive exploratory testing starts.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read the session goal prompt at `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the required scope, append-only log format, and coverage expectations for this subagent.
- Read a prior UX regression subagent log from `docs/testing/20260620/issue-226-003/ux-regression-test-log.md` to mirror the established reporting structure and level of detail.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/ux-regression-test-log.md`.
- Confirmed the test target is the deployed environment only at `https://eviltester.github.io/grid-table-editor/` and that local repo verify/build/package/test commands are out of scope.
- Confirmed the planned browser automation approach is a dedicated Playwright CLI session named `issue233-ux`, with screenshots allowed only under `docs/testing/20260621/issue-233-001/screenshots/` using a clear `ux-` prefix if evidence is needed.
- Declared the UX/regression scope for this subagent:
  - generator workflow and method-picker usability
  - help tooltip discoverability and readability
  - `Learn more` and related link-following behavior in the deployed test environment
  - command families with structured parameters, validators, multiple examples, and helper/faker content where practical
  - friction, blocked interactions, wording confusion, state surprises, and regressions introduced by docs/blog link rewriting

the observations and results that you make

- This lane should favor realistic user workflow coverage over deep single-command correctness checks, because the story risk is broad UX friction across help metadata consumers and rewritten docs/blog links.
- The strongest oracles for this pass are cross-surface consistency and followability: users should be able to discover help, understand it, move from picker/help to docs smoothly, and return to the app without confusing state loss.
- A dedicated session name and append-only log will keep this subagent evidence isolated from the parallel command, validation, docs, and accessibility lanes.

---

## 2026-06-21 15:44 +01:00

- Exercise the deployed generator and app UX against representative regex, domain, and faker/helper help flows so this lane can confirm whether users can discover, understand, and follow rewritten docs links smoothly without workflow confusion.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in the dedicated Playwright CLI session `issue233-ux`, then navigated into `generator.html`.
- In `generator.html`, opened the default regex help flow and confirmed the inline help tooltip for `Regex` exposed a rewritten `Learn more` URL under `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`.
- Switched the generator schema row from `regex` to `domain`, opened the method picker, filtered to `internet.httpMethod`, and reviewed the details panel for structured parameter guidance, parameter tables, and multiple usage examples.
- Followed the picker `Open documentation` link for `internet.httpMethod` and confirmed it opened the nested deployed docs page at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/` in a separate tab while preserving the generator state in the original tab.
- Stayed on the generator workflow and changed the selected method from a domain command to the faker helper command `helpers.arrayElement` via the method picker, then applied it to the row to observe whether the row type, help affordances, and params editing controls updated coherently.
- Opened the params editor for `helpers.arrayElement`, opened the field-level help tooltip for the required `array` param, and checked whether the generated-params feedback made the required input obvious before any value was entered.
- Attempted to click the command-level params-editor help icon while the field-level tooltip was still visible to see whether adjacent help affordances remain usable during realistic exploratory reading.
- Opened a separate `app.html` tab, expanded the `Test Data` panel help, and followed the `Learn more` link exposed by the top-level tooltip to confirm it resolved into the nested docs build at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation/`.
- In `app.html`, opened the schema-section help tooltip to inspect whether the generic `Show help` affordance still reads naturally after the content/link rewriting.

the observations and results that you make

- Positive: the rewritten help/docs links that I exercised all resolved into the nested deployed docs site rather than leaking users back to the production root. Confirmed examples include:
  - generator regex tooltip -> `/site/docs/test-data/regex-test-data`
  - method-picker docs link for `internet.httpMethod` -> `/site/docs/test-data/domain/internet/`
  - app Test Data help `Learn more` -> `/site/docs/test-data/test-data-generation/`
- Positive: the domain method-picker workflow is materially richer and discoverable. Filtering to `internet.httpMethod` produced a focused result list, and the details pane exposed structured parameter descriptions, parameter types, and multiple examples without requiring the user to leave the dialog first.
- Positive: following picker/docs links was state-safe in the tested cases. Opening documentation created or reused a docs tab while leaving the generator tab and its modal/dialog state intact, which supports compare-and-return workflows.
- Positive: switching from a domain command to a faker helper command through the picker updated the row type and contextual help affordances coherently. After applying `helpers.arrayElement`, the row showed a faker-specific help link and a params-editor entry point that matched the selected command.
- Positive: the params editor for `helpers.arrayElement` makes required input expectations clear. The field-level tooltip states that `array` is required, and the dialog status message explicitly says a value must be added before applying.
- Confirmed UX friction: once the field-level tooltip for `array` was open inside the params editor, clicking the nearby command-level help icon timed out because the visible tooltip intercepted pointer events. In practice this means users reading one help bubble can get briefly stuck when trying to open adjacent help without first dismissing the existing tooltip.
- Minor UX concern: in the app schema section, the generic `Show help` button opens an `Edit as Text`-specific tooltip with an `Insert Example Schema` action. The content is useful, but the trigger label feels broader than the actual topic, so users may not expect schema-mode-specific guidance from that affordance.
- Minor workflow surprise: immediately after applying `helpers.arrayElement` to an otherwise blank row, the row-level validation message `Row 1: column name is required.` appears. The message is valid, but it competes visually with command-selection and params-discovery work before the user has finished setting up the row.
- Coverage in this pass:
  - surfaces: deployed landing page, `generator.html`, `app.html`, nested docs pages under `/site/docs/...`
  - command families: regex, domain/internet, faker/helpers
  - interaction types: top-level help tooltip, schema help tooltip, method-picker filtering/details, docs-link following, params-editor help, tab-return workflow
- Techniques and heuristics used in this pass: exploratory workflow testing, risk-based testing around rewritten help/docs consumers, consistency checking across picker/help/docs surfaces, state-transition testing while switching command families, documentation testing through live link-following, and friction hunting around adjacent help controls.
- Follow-up ideas for the main agent:
  - Execute now candidate: verify whether the params-editor tooltip interception also affects keyboard users or only pointer interactions.
  - Execute now candidate: compare domain commands with more complex structured params such as `date.between` or `number.int` to see whether the params editor remains readable when multiple fields are required.
  - Execute now candidate: confirm whether helper docs links such as `helpers.arrayElement` open the correct nested `/site/docs/test-data/faker/helpers` page when followed directly from the row help icon.
  - Execute now candidate: test whether the custom docs target window name (`anywaydatadocs`) causes confusing tab reuse when moving between multiple docs links from different surfaces.
  - Execute now candidate: sample a command with validator-heavy exclusions such as `internet.httpMethod(excludes=...)` and check whether the picker examples map cleanly into params-editor affordances.
  - Execute now candidate: check whether closing a reused docs tab and reopening help/docs links from the app still behaves predictably or leaves the user with no obvious feedback.
  - Defer candidate: test mobile-width behavior for the params editor help bubbles and docs tabs if the responsive lane has not already covered it.
  - Defer candidate: inspect whether screen-reader labels for command-help icons differentiate top-level help, field help, and command help clearly enough in the params editor.
  - Execute now candidate: compare the generator `Data Generator Instructions` help flow with the app `Instructions` help flow to see whether both use similarly followable nested docs targets.
  - Execute now candidate: try the `Insert Example Schema` action from the schema help tooltip to confirm it does not create surprising state loss in an in-progress row workflow.
  - Execute now candidate: verify whether regex help and domain/faker help use consistent tab-opening behavior or mix same-tab and new-tab navigation in a way that feels inconsistent.
  - Defer candidate: inspect blog-oriented links reachable from docs pages to make sure cross-surface navigation back into the nested blog stays equally safe after the rewrite.

---


## responsive-accessibility-test-log.md

Source: [responsive-accessibility-test-log.md](responsive-accessibility-test-log.md)

---
## 2026-06-21 15:36 +01:00

- Set up the responsive/accessibility subagent log first so the deployed-environment-only pass can capture narrow-width behavior, keyboard access, focus handling, visible labels, and corrected docs-link usability in one append-only place.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the required log structure, the deployed-environment-only rule, and the specific responsive/mobile plus accessibility focus for this subagent.
- Read same-day subagent logs to mirror the required append-only entry format and align this lane with the broader issue #233 / PR #234 story about runtime docs/blog link rewriting.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/responsive-accessibility-test-log.md`.
- Confirmed this lane will use only `https://eviltester.github.io/grid-table-editor/` and will not run local repo verify, build, package, or test commands.
- Declared the responsive/accessibility scope for this lane:
  - root pages and generator/help flows
  - tooltip and docs navigation on smaller screens
  - representative nested-site docs pages
  - keyboardability, focus movement, visible labels, landmark structure, and corrected-link usability on mobile widths
- Declared the working heuristics for this lane:
  - exploratory testing
  - risk-based testing
  - accessibility heuristics
  - responsive testing heuristics
  - documentation testing
  - consistency/oracle checking across app and nested-site docs

the observations and results that you make

- The highest-risk user outcome for this lane is not only whether links point to the right nested-site path, but whether those corrected links remain discoverable and usable on cramped screens and under keyboard-style navigation.
- This lane should compare the relatively structured Docusaurus docs pages with the more application-like generator surface, because issue #233 changes cross-cutting link behavior while those surfaces likely have different accessibility baselines.

---
## 2026-06-21 15:43 +01:00

- Probe the deployed root page, `app.html`, and `generator.html` at phone width first because responsive shell behavior and baseline accessibility structure determine whether the corrected docs/help links are even reachable on smaller screens.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Used Playwright against the deployed site only with a dedicated session label `issue233-responsive`.
- Opened `https://eviltester.github.io/grid-table-editor/` and confirmed the landing page rendered at `390x844` with a top-level `main`, `h1`, and card-style links for `app.html`, `generator.html`, `combinatorial.html`, `webmcp.html`, `writer-schema.html`, `storybook`, and `site/`.
- Opened `https://eviltester.github.io/grid-table-editor/app.html` at `390x844` and inspected the mobile snapshot for landmarks, headings, help affordances, filter controls, grid controls, and text-preview/export controls.
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` at `390x844` and inspected the mobile snapshot for skip-link behavior, heading/landmark structure, schema controls, preview controls, output-format controls, and help affordances.
- Drove keyboard-only entry on `generator.html`:
  - pressed `Tab` once to confirm first focus
  - pressed `Enter` on the skip link
  - pressed additional `Tab`s to observe where focus moved next in the generator shell
- Used accessibility heuristics around focus order, landmark presence, control naming, icon-button labeling, and keyboard discoverability, plus responsive heuristics around cramped vertical stacking and whether major controls stayed reachable on phone width.

the observations and results that you make

- The landing page is in comparatively good baseline shape for mobile accessibility:
  - it exposes `main`
  - it exposes an `h1`
  - the card links remain readable and individually focusable at `390px` width
- `generator.html` is also in materially better baseline shape than older sessions:
  - there is a visible skip link
  - there is a `main` region named `Data Generator`
  - there is an `h1`
  - major icon-only buttons now expose accessible names such as `Show help`, `Load Schema File`, `Save Schema File`, `Move up`, and `Move down`
- The generator keyboard entry sequence started well but was not completely smooth:
  - first `Tab` correctly landed on `Skip to main content`
  - `Enter` updated the URL to `#generator-main-content`
  - the next `Tab` appeared to move focus onto the broader `Data Generator Instructions` group rather than cleanly to the next obvious interactive control
  - a following `Tab` then reached the `Show help` button
  - this is not a hard failure, but it is a focus-order rough edge worth follow-up because the focus target after skip-link activation is not especially clear from the mobile state
- `app.html` remains noticeably weaker than the landing page and generator for baseline accessibility structure:
  - no skip link was visible in the mobile snapshot
  - no `main` landmark was exposed in the snapshot
  - no page `h1` was exposed in the snapshot
  - the page opens directly into dense controls and a grid-heavy surface, which increases orientation cost for keyboard and screen-reader users
- On `app.html`, many controls are at least named, but the mobile surface is still very dense:
  - toolbar actions, grid header actions, and output-format tabs stay present
  - help affordances remain small icon buttons mixed into crowded rows
  - this makes the page usable but high-effort on narrow screens compared with the generator and docs shells

---
## 2026-06-21 15:43 +01:00

- Follow the most issue-relevant help and docs paths next, because issue #233 / PR #234 is specifically about link rewriting consistency and this subagent needs to verify whether those links are still reachable and usable under mobile and keyboard-oriented conditions.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- On `https://eviltester.github.io/grid-table-editor/generator.html` at `390x844`, opened the top `Data Generator Instructions` help affordance and inspected the resulting tooltip content and link target.
- Verified the opened tooltip exposed a docs link labeled `Generate To File docs`.
- Activated that tooltip link and confirmed it opened a new tab to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/`.
- Switched into the newly opened docs tab and reviewed the resulting mobile docs page structure.
- On the same generator mobile layout, activated the row-level `Regex data help` link and inspected the opened tab target.
- On `https://eviltester.github.io/grid-table-editor/app.html` at `390x844`, expanded the inline `Instructions` help content and inspected whether the help remained readable and whether it depended on tiny or weakly labelled controls.
- Used consistency/oracle heuristics here:
  - corrected docs links should stay inside the nested-site test environment when they refer to owned docs
  - help content should remain reachable by pointer and keyboard on phone width
  - corrected links should still open into a usable mobile docs page rather than a broken or hidden destination

the observations and results that you make

- Positive result: the generator top-level tooltip help link is correctly rewritten for the test environment.
  - The tooltip opened on mobile without collapsing the page.
  - The `Generate To File docs` link pointed to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`.
  - Activating it opened a usable nested-site docs tab.
- Negative result: not all generator help/docs links are corrected yet.
  - The row-level `Regex data help` link still pointed to `https://anywaydata.com/docs/test-data/regex-test-data`.
  - Activating it opened a production-host tab instead of the GitHub Pages nested-site docs path.
  - This is directly relevant to issue #233 and is easy to hit on mobile because the link sits inline in the default first schema row.
- The difference between the corrected top tooltip link and the uncorrected row-level help link suggests link rewriting is still inconsistent across help-entry types, even though both are reachable from the same deployed generator screen.
- `app.html` inline instructions are readable when expanded, but they append a long block of list content above the dense app surface rather than moving focus into a structured dialog or tooltip.
  - That is workable on mobile, but it is a lower-quality help experience than the generator tooltip and nested docs flow.
  - The expanded instructions also include several external links and references, so link-density rises quickly once the instructions are opened.

---
## 2026-06-21 15:43 +01:00

- Check representative nested-site docs pages last so the responsive/accessibility pass covers both the corrected landing destinations and the higher-density reference pages that users may actually land on after following help links.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/` in the mobile-sized docs tab created from the generator tooltip and inspected navigation, breadcrumbs, article structure, and content density.
- Opened `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string` at `390x844`.
- Checked mobile keyboard entry on that page by pressing `Tab` once and observing the initial focus target.
- Reviewed the mobile snapshot for:
  - top-nav discoverability
  - mobile nav toggle availability
  - `On this page` affordance availability
  - heading structure
  - representative command reference tables and code examples
- Captured page-width evidence on the `string` domain docs page:
  - `window.innerWidth = 390`
  - `document.documentElement.scrollWidth = 390`
- Used responsive heuristics on long docs content:
  - whether the page itself overflowed horizontally
  - whether reference tables and code examples still appeared navigable
  - whether mobile docs navigation remained available without losing the article heading and breadcrumbs

the observations and results that you make

- The nested docs shell is the strongest of the tested surfaces for baseline mobile accessibility:
  - skip link present
  - `main` present
  - `h1` present
  - mobile nav toggle exposed
  - `On this page` control exposed
  - breadcrumbs preserved
- Keyboard entry on the `string` domain page behaved cleanly at the start:
  - first `Tab` landed on `Skip to main content`
  - this is a better keyboard entry point than `app.html`
- The `string` domain page did not show page-level horizontal overflow at `390px` width because `scrollWidth` matched `innerWidth`.
  - That suggests the current docs shell contains the page itself better than earlier narrow-width docs defects.
- Even without page-level overflow, the command-reference pages remain cognitively heavy on mobile:
  - long sequences of headings, arg tables, examples, and copy buttons create a very long tab path
  - repeated copy controls and wrap toggles increase focus stops substantially
  - this is probably acceptable for reference material, but it still adds practical friction for keyboard users on small screens
- The `Generate to File` docs destination opened from generator help is usable on smaller screens, but the page content still contains production-environment examples such as `https://anywaydata.com/generate.html`.
  - That may be intentional documentation content rather than a runtime-link bug, but it is still worth noting because users entering from the test environment can be bounced mentally from nested-site navigation back to production-host examples inside the article body.
- Overall responsive/accessibility risk ranking from this pass:
  - strongest: nested-site docs pages
  - middle: root landing page and generator shell
  - weakest: `app.html` mobile shell because of missing obvious landmark structure and dense control packing

---


## cross-surface-root-links-test-log.md

Source: [cross-surface-root-links-test-log.md](cross-surface-root-links-test-log.md)

---
## 2026-06-21 15:55 +01:00

- Record an administrative correction so the file stays append-only while making the timing trace explicit for the main agent.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the current log after appending the substantive cross-surface entry.
- Noted that the earlier setup block with timestamp `2026-06-21 15:49 +01:00` now appears after the substantive `2026-06-21 15:44 +01:00` block in file order.
- Chose not to rewrite or reorder prior content because this session requires append-only logging.

the observations and results that you make

- Interpret the timestamps rather than file-position alone for chronology:
  - the `15:49` block is the setup/context entry for this lane
  - the `15:44` block contains the substantive deployed-environment observations gathered afterward and written as the main evidence entry
- No testing evidence changed as a result of this correction; this is only a traceability note for the main agent.

---
## 2026-06-21 15:44 +01:00

- Execute a broad cross-surface deployed-site pass to compare root pages against nested `/site/` pages, confirm whether suspicious link patterns are actually broken or merely inconsistent, and record concrete navigation destinations outside the command-help tooltip lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in a dedicated Playwright CLI browser session named `issue233-cross-surface`.
- Extracted the root landing page anchors and confirmed the top-level launch surface exposes these direct destinations:
  - `https://eviltester.github.io/grid-table-editor/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/combinatorial.html`
  - `https://eviltester.github.io/grid-table-editor/webmcp.html`
  - `https://eviltester.github.io/grid-table-editor/writer-schema.html`
  - `https://eviltester.github.io/grid-table-editor/storybook/index.html`
  - `https://eviltester.github.io/grid-table-editor/site/`
- Navigated directly to each named surface and used browser-side DOM inspection to count and sample anchors matching these risk patterns:
  - stale `anywaydata.com` destinations
  - root-relative `href` values starting `/docs` or `/blog`
  - relative `href` values starting `docs/` or `blog`
  - nested-site destinations containing `/site/`
- Checked `app.html` at `https://eviltester.github.io/grid-table-editor/app.html`.
  - Observed nav links `Docs -> https://eviltester.github.io/grid-table-editor/site/docs/intro` and `Blog -> https://eviltester.github.io/grid-table-editor/site/blog`.
  - Sampled in-page content links and found mixed destination styles on the same page:
    - root-relative leak example: raw `/docs/editing-data/text-editing` resolved to `https://eviltester.github.io/docs/editing-data/text-editing`
    - relative docs example: raw `docs/editing-data/import-from-file` resolved to `https://eviltester.github.io/grid-table-editor/docs/editing-data/import-from-file`
    - stale external docs example: `https://anywaydata.com/docs/category/data-formats`
- Checked `generator.html` at `https://eviltester.github.io/grid-table-editor/generator.html`.
  - Recorded counts:
    - `anywaydata.com` links: 43
    - root-relative `/docs` or `/blog` links: 24
    - relative `docs/` or `blog` links: 210
    - nested `/site/` links: 2
  - Sampled representative destinations:
    - `https://anywaydata.com/docs/test-data/generate-to-file`
    - `https://eviltester.github.io/docs/editing-data/text-editing`
    - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- Checked `combinatorial.html` at `https://eviltester.github.io/grid-table-editor/combinatorial.html`.
  - Recorded counts:
    - `anywaydata.com` links: 0
    - root-relative `/docs` or `/blog` links: 0
    - relative `docs/` or `blog` links: 0
    - nested `/site/` links: 2
  - Observed only the expected nav destinations:
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `https://eviltester.github.io/grid-table-editor/site/blog`
- Checked `webmcp.html` at `https://eviltester.github.io/grid-table-editor/webmcp.html`.
  - Recorded counts:
    - `anywaydata.com` links: 0
    - root-relative `/docs` or `/blog` links: 0
    - relative `docs/` or `blog` links: 0
    - nested `/site/` links: 2
  - Observed only the expected nav destinations:
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `https://eviltester.github.io/grid-table-editor/site/blog`
- Checked `writer-schema.html` at `https://eviltester.github.io/grid-table-editor/writer-schema.html`.
  - Recorded counts:
    - `anywaydata.com` links: 8
    - root-relative `/docs` or `/blog` links: 4
    - relative `docs/` or `blog` links: 35
    - nested `/site/` links: 0
  - Sampled representative destinations:
    - `https://anywaydata.com/docs/test-data/regex-test-data`
    - `https://eviltester.github.io/docs/editing-data/text-editing`
    - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
- Checked `storybook/index.html`, which redirected to `https://eviltester.github.io/grid-table-editor/storybook/index.html?path=/docs/pages-app-page--docs`.
  - Observed no matching `anywaydata.com`, `/docs`, `/blog`, or `/site/` anchor set on that default docs view.
- Checked the nested site landing page at `https://eviltester.github.io/grid-table-editor/site/`.
  - Observed consistent nested-site routing examples:
    - `AnyWayData -> https://eviltester.github.io/grid-table-editor/site/`
    - `App -> https://eviltester.github.io/grid-table-editor/site/app.html`
    - `Docs -> https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `Blog -> https://eviltester.github.io/grid-table-editor/site/blog`
- Navigated to nested docs and blog pages to compare nested-site rewriting:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
  - `https://eviltester.github.io/grid-table-editor/site/blog`
  - On both pages, observed links stayed inside the `/grid-table-editor/site/...` space and did not expose sampled stale `anywaydata.com`, root `/docs`, or root `/blog` leaks.
- Validated actual destinations rather than relying only on href sampling:
  - Navigated to `https://eviltester.github.io/grid-table-editor/docs/editing-data/text-editing` after seeing it generated from root-surface relative docs links.
  - Observed destination result: `Page not found · GitHub Pages` with visible `404 File not found`.
  - Navigated to `https://eviltester.github.io/grid-table-editor/site/app.html` from the nested-site route family.
  - Observed destination result: working app page with title `Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData`.
  - Navigated to `https://anywaydata.com/docs/test-data/generate-to-file` from the stale-link family.
  - Observed destination result: live external docs page titled `Generate to File | AnyWayData - Data Table Editor & Generator`.
- Inspected `https://eviltester.github.io/grid-table-editor/site/app.html` separately to compare it with root `app.html`.
  - Recorded counts:
    - `anywaydata.com` links: 57
    - root-relative `/docs` or `/blog` links: 33
    - relative `docs/` or `blog` links: 281
    - nested `/site/` links: 296
  - Observed an important rewrite difference:
    - on `/site/app.html`, relative `docs/...` links resolve correctly to `https://eviltester.github.io/grid-table-editor/site/docs/...`
    - but root-relative `/docs/...` links still escape to `https://eviltester.github.io/docs/...`
- Applied these techniques and heuristics during the pass:
  - exploratory testing across named surfaces
  - risk-based sampling of link families most likely to break under base-path rewriting
  - consistency/oracle checking between root and nested-site versions of similar surfaces
  - documentation-link testing by following sampled destinations
  - state-flow discipline by keeping one dedicated browser session and re-running suspect navigations sequentially when concurrent navigation caused session-race noise

the observations and results that you make

- Confirmed defect pattern: root-surface pages `app.html`, `generator.html`, and `writer-schema.html` still expose mixed link families, including:
  - stale external `anywaydata.com` docs links
  - root-relative `/docs/...` links that escape to `https://eviltester.github.io/docs/...`
  - relative `docs/...` links that resolve to `https://eviltester.github.io/grid-table-editor/docs/...` instead of the nested `/site/docs/...` area
- Confirmed broken destination, not just inconsistent markup:
  - `https://eviltester.github.io/grid-table-editor/docs/editing-data/text-editing` returns a GitHub Pages `404 File not found` page.
- Confirmed parity gap between surfaces:
  - `combinatorial.html` and `webmcp.html` present only the expected nested-site docs/blog nav.
  - `app.html`, `generator.html`, and `writer-schema.html` expose much noisier mixed link rewriting.
  - nested `site/docs/intro` and `site/blog` stay consistently inside `/grid-table-editor/site/...`.
- Confirmed a second parity gap inside the app surface itself:
  - nested `site/app.html` rewrites relative `docs/...` links into working `/site/docs/...` destinations,
  - but even the nested version still leaks root-relative `/docs/...` links to `https://eviltester.github.io/docs/...`.
- The stale `anywaydata.com` links are not broken in the narrow availability sense because the external pages load, but they are inconsistent with the deployed test-environment routing model and create cross-surface drift.
- Storybook did not expose the same sampled link families on its default docs view during this pass, so this lane did not confirm a Storybook-specific root-link regression.

---
## 2026-06-21 15:49 +01:00

- Set up the cross-surface root-link consistency subagent log first so the later deployed-environment checks can be appended in the required format and stay clearly scoped to root pages, nested-site pages, and cross-page link rewriting outside the command-help tooltip lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read the session goal prompt at `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the append-only log structure, deployed-environment-only constraint, and the need to focus on exploratory evidence rather than local repo verification.
- Read sibling subagent logs to mirror the required entry structure and align this lane with the session focus on URL rewriting, nested-site routing, and user-visible parity problems.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/cross-surface-root-links-test-log.md`.
- Confirmed the test target for this lane is only the deployed environment at `https://eviltester.github.io/grid-table-editor/`.
- Declared the cross-surface scope for this lane:
  - the root landing page
  - `app.html`
  - `generator.html`
  - `combinatorial.html`
  - `webmcp.html`
  - `writer-schema.html`
  - storybook
  - the nested `/site/` landing and docs pages as reachable from the deployed environment
- Declared the main cross-surface checks for this lane:
  - stale `anywaydata.com` links
  - broken root-relative `/docs` or `/blog` links
  - inconsistent nested-site rewriting between root pages and `/site/` pages
  - parity gaps where one surface routes correctly and another leaks an outdated host or path
- Confirmed this subagent will use a dedicated Playwright CLI session name `issue233-cross-surface` and will only write to the owned log file plus the owned screenshots folder if screenshots become useful.

the observations and results that you make

- The highest-risk areas for this lane are the transitions between root pages and nested `/site/` pages, because link rewriting can appear correct in one surface while failing in another due to different base-path assumptions.
- The strongest consistency oracles for this lane are:
  - links to owned docs should resolve under `https://eviltester.github.io/grid-table-editor/site/` when launched from the deployed environment
  - links should not leak stale `https://anywaydata.com/...` destinations unless intentionally external
  - links should not point to root-relative `/docs` or `/blog` paths that would escape the GitHub Pages nested site
  - equivalent navigation affordances on different pages should resolve to comparable destinations

---


## defects\defect-01-family-help-links-leak-to-production.md

Source: [defects\defect-01-family-help-links-leak-to-production.md](defects\defect-01-family-help-links-leak-to-production.md)

# Defect 01: Family Help Links Still Leak To Production

## Summary

The deployed test environment still exposes family-level help links that navigate to `https://anywaydata.com/...` instead of staying inside the nested GitHub Pages docs under `https://eviltester.github.io/grid-table-editor/site/...`.

This is a direct miss against issue #233 because users can leave the test environment from default, visible help entrypoints in `app.html`, `generator.html`, `site/app.html`, `site/generator.html`, and `writer-schema.html`.

## Repeatability

Repeatable.

## Surfaces Confirmed

- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/writer-schema.html`

## Representative Examples

- `Regex data help` -> `https://anywaydata.com/docs/test-data/regex-test-data`
- `Domain data help` -> `https://anywaydata.com/docs/test-data/domain/domain-test-data`
- `Faker data help` -> `https://anywaydata.com/docs/test-data/faker-test-data`

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Observe the default first schema row.
3. Inspect or activate the visible `Regex data help` link.
4. Observe that it targets `https://anywaydata.com/docs/test-data/regex-test-data`.
5. Repeat on `https://eviltester.github.io/grid-table-editor/site/generator.html`.
6. Open `https://eviltester.github.io/grid-table-editor/site/app.html`.
7. Expand `Test Data`.
8. Observe the visible row-level `Regex data help` link.
9. Open `https://eviltester.github.io/grid-table-editor/writer-schema.html`.
10. Observe the visible row-level `Regex data help` link in the shared schema editor.

## Expected

Owned help/docs links in the deployed test environment should stay inside the nested testenv docs path, for example under `https://eviltester.github.io/grid-table-editor/site/docs/...`.

## Actual

Visible family-level help entrypoints still target production-host docs on `anywaydata.com`.

## Why This Matters

- It breaks the core story expectation for testenv URL consistency.
- It mixes production and testenv content inside the same workflow.
- It can hide testenv-only differences because users are silently switched to production docs.
- It is easy to hit because the regex family help is visible by default.

## Supporting Evidence

- Main screenshot:
  ![Generator regex help leak](../screenshots/main-generator-regex-help-anywaydata.png)
- Related negative-pass screenshot:
  ![Stale production docs navigation](../screenshots/negative-validation-stale-production-docs.png)
- Supporting logs:
  - [issue-233-test-log.md](../issue-233-test-log.md)
  - [command-coverage-test-log.md](../command-coverage-test-log.md)
  - [negative-validation-test-log.md](../negative-validation-test-log.md)
  - [cross-surface-root-links-test-log.md](../cross-surface-root-links-test-log.md)

## Notes For Investigation

- Tooltip-based links were often rewritten correctly in the same session.
- The likely seam is that family-level visible help links are not going through the same runtime/build-time rewrite path as tooltip HTML links.


## defects\defect-02-root-and-repo-relative-docs-links-404.md

Source: [defects\defect-02-root-and-repo-relative-docs-links-404.md](defects\defect-02-root-and-repo-relative-docs-links-404.md)

# Defect 02: Root And Repo-Relative Docs Links Still 404

## Summary

The deployed test environment still exposes owned docs links that resolve to broken GitHub Pages URLs because they omit the nested `/site/` mount point.

Two broken classes were confirmed:

- root-relative `/docs/...` links that escape to `https://eviltester.github.io/docs/...`
- repo-relative `docs/...` links that resolve to `https://eviltester.github.io/grid-table-editor/docs/...`

## Repeatability

Repeatable.

## Representative Broken Destinations

- `https://eviltester.github.io/docs/editing-data/text-editing`
- `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/app.html` or `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Inspect or follow owned docs links that are rendered as `/docs/...` or `docs/...`.
3. Open the resulting destination URL.
4. Observe that GitHub Pages returns a `404 File not found` page instead of nested-site docs.

## Expected

Owned docs links should resolve under `https://eviltester.github.io/grid-table-editor/site/docs/...`.

## Actual

Broken root-relative and repo-relative links resolve outside the nested docs mount and land on GitHub Pages 404 pages.

## Why This Matters

- It creates hard failures, not just cosmetic inconsistency.
- It affects user trust because some help/docs links work while others fail.
- It makes the deployment look partially broken even when the nested docs site itself is healthy.

## Supporting Evidence

- Root-relative 404:
  ![Root-relative docs 404](../screenshots/negative-validation-root-relative-docs-404.png)
- Repo-relative 404:
  ![Repo-relative docs 404](../screenshots/negative-validation-repo-relative-docs-404.png)
- Supporting logs:
  - [negative-validation-test-log.md](../negative-validation-test-log.md)
  - [cross-surface-root-links-test-log.md](../cross-surface-root-links-test-log.md)

## Notes For Investigation

- The nested `/site/` shell itself worked as a positive control.
- The problem is not that the docs build is unavailable; it is that some link-generation paths still omit `/site/`.


## defects\defect-03-root-vs-site-surface-link-parity-gap.md

Source: [defects\defect-03-root-vs-site-surface-link-parity-gap.md](defects\defect-03-root-vs-site-surface-link-parity-gap.md)

# Defect 03: Root And Nested `/site/` Surfaces Still Disagree

## Summary

The deployment does not present one consistent routing model across equivalent surfaces. Some links are correctly rewritten on root pages or nested `/site/` pages, but related links on the same or sibling pages are still stale or broken.

## Repeatability

Repeatable.

## Confirmed Contrasts

- Root `app.html` and root `generator.html` expose a mix of:
  - correct nested `/site/docs/...` and `/site/blog`
  - stale `anywaydata.com` docs links
  - broken `/docs/...` links
  - broken `docs/...` links
- `combinatorial.html` and `webmcp.html` stayed clean in the sampled pass.
- `site/app.html` and `site/generator.html` improve some relative `docs/...` links because they run under `/site/`, but they still leak root-relative `/docs/...` links and row-level `Regex data help` production links.

## Reproduction

1. Compare `https://eviltester.github.io/grid-table-editor/generator.html` with `https://eviltester.github.io/grid-table-editor/site/generator.html`.
2. On both pages, inspect:
   - top docs/blog navigation
   - top tooltip help
   - row-level `Regex data help`
3. Observe that top tooltip/docs flows can be nested-site-safe while row-level family help still leaks to production.
4. Compare `https://eviltester.github.io/grid-table-editor/app.html` with `https://eviltester.github.io/grid-table-editor/site/app.html`.
5. Observe that nested pages partially fix relative links while root-relative `/docs/...` leaks remain.

## Expected

Equivalent surfaces should use the same effective routing strategy for owned docs and blog content.

## Actual

The deployment presents mixed routing behaviors depending on which page and which help-entry type is used.

## Why This Matters

- Users get inconsistent outcomes from visually similar help actions.
- Test results become harder to reason about because some flows silently leave the testenv while others stay inside it.
- It suggests the fix is only partial across different rendering seams.

## Supporting Evidence

- [cross-surface-root-links-test-log.md](../cross-surface-root-links-test-log.md)
- [command-coverage-test-log.md](../command-coverage-test-log.md)
- [docs-consistency-test-log.md](../docs-consistency-test-log.md)

## Notes For Investigation

- This defect is broader than one stale link. It points to multiple rewrite seams:
  - build-time root page rewriting
  - runtime tooltip HTML rewriting
  - direct visible help-link generation
  - nested `/site/` relative-link resolution


## defects\defect-04-chemicalelement-docs-page-missing.md

Source: [defects\defect-04-chemicalelement-docs-page-missing.md](defects\defect-04-chemicalelement-docs-page-missing.md)

# Defect 04: `chemicalElement.*` Is Exposed In UI But Nested Docs Page 404s

## Summary

The deployed generator command inventory exposed `chemicalElement.*` in the live domain picker, but the expected nested docs page route `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement` returned GitHub Pages `Page not found`.

## Repeatability

Repeatable.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch the row type to `domain`.
3. Open the method picker.
4. Observe that the live picker exposes `chemicalElement.*`.
5. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement`.
6. Observe that GitHub Pages returns a `Page not found` response.

## Expected

If a command family is exposed in the live picker and is expected to have docs coverage in the nested site, the nested docs route should exist and be reachable.

## Actual

The sampled nested route 404s.

## Why This Matters

- It weakens help/docs completeness even where routing itself is correct.
- It may leave a visible live command family without a matching nested docs target.
- It can create confusion for users if the picker inventory and docs inventory disagree.

## Supporting Evidence

- [command-coverage-test-log.md](../command-coverage-test-log.md)
- [issue-233-test-log.md](../issue-233-test-log.md)

## Notes For Investigation

- This may be a true missing docs page, a route/name mismatch, or a docs taxonomy change that the picker/help surfaces do not match.


## defects\defect-05-adjacent-help-tooltips-block-clicks.md

Source: [defects\defect-05-adjacent-help-tooltips-block-clicks.md](defects\defect-05-adjacent-help-tooltips-block-clicks.md)

# Defect 05: Adjacent Help Tooltips Can Block Nearby Help Actions

## Summary

Inside the params/editor help workflow, an open field-level tooltip can intercept pointer interaction and prevent the nearby command-level help icon from being clicked until the first tooltip is dismissed.

## Repeatability

Repeatable in the sampled UX pass.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Choose a command with params-editor help, such as `helpers.arrayElement`.
3. Open the params editor.
4. Open the field-level tooltip for the required `array` param.
5. Without dismissing that tooltip, try to click the adjacent command-level help icon.
6. Observe that the click does not immediately reach the adjacent help target because the visible tooltip intercepts pointer interaction.

## Expected

Adjacent help affordances should remain usable, or the interaction model should make the required dismissal step obvious.

## Actual

One help overlay blocks another nearby help action in the same workflow.

## Why This Matters

- It slows down exploratory reading of parameter help.
- It makes the help system feel sticky or unreliable.
- It adds friction in exactly the part of the UI where users need cross-referencing between field help and command help.

## Supporting Evidence

- [ux-regression-test-log.md](../ux-regression-test-log.md)

## Notes For Investigation

- This is a UX regression/risk rather than the primary story miss, but it was reproducible and visible in the changed help-flow area.


