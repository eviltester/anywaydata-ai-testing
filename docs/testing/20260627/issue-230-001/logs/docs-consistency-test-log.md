---
## 2026-06-27T10:12:43+01:00

- What you think you want to do and why

Begin the docs/help/content consistency subagent pass for issue #230 / PR #247 using only the deployed and published pages. I want to prove browser access first, then compare published docs, app help, method-picker details, examples, parameter tables, stale/removed command visibility, and runtime behavior where practical.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Prepared to use the deployed pages only:
- https://eviltester.github.io/grid-table-editor/site/
- https://eviltester.github.io/grid-table-editor/site/docs
- https://eviltester.github.io/grid-table-editor/site/app.html
- https://eviltester.github.io/grid-table-editor/site/generator.html
- docs links exposed by the method picker

Charter:
- Review published docs relevant to schema definitions and faker commands.
- Review app instructions/help and method-picker help display.
- Check parameter tables, usage examples, return examples, docs links, stale examples, misleading examples, removed commands still documented/visible, new commands missing from docs/help.
- Compare docs examples against actual deployed runtime behavior where practical.
- Capture screenshots with `docs-consistency-` prefixes where useful.
- Return docs/pages reviewed, examples compared, inconsistencies, gaps, and at least 5 new test ideas.

Techniques and heuristics planned: exploratory testing, risk-based testing, consistency/oracle checking, documentation testing, example-based testing, negative/removed-command spot checks, boundary-oriented checks for schema docs and command parameter tables, and link/navigation checks.

the observations and results that you make

The subagent log did not already exist, so this is the first append-only entry for the docs-consistency lane. The session folder already existed with the main prompt, main log, main report, and standard subfolders.

---
## 2026-06-27T10:15:10+01:00

- What you think you want to do and why

Prove deployed browser access and scout the allowed docs/app/generator pages before making content judgments. I want a route/link/content inventory and screenshots so later observations can be traced back to the public deployment rather than assumptions.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used a Playwright-driven Chrome support script saved as `../support/docs-consistency-scout.mjs`.

Visited:
- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/docs`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Captured screenshots:
- `../screenshots/docs-consistency-site-scout.png`
- `../screenshots/docs-consistency-docs-scout.png`
- `../screenshots/docs-consistency-app-html-scout.png`
- `../screenshots/docs-consistency-generator-html-scout.png`
- `../screenshots/docs-consistency-browser-proof-clicked-link.png`

Interaction proof: from the home page, clicked the first visible nav/content link matching `generator|app|docs`. The clicked link text was `App`, and the page navigated successfully.

Saved inventory data to `../support/docs-consistency-scout-inventory.json`.

the observations and results that you make

Browser automation was able to open and interact with the deployed environment.

Important route observation: `https://eviltester.github.io/grid-table-editor/site/docs` returned a GitHub Pages 404. The home/app/generator navigation uses `https://eviltester.github.io/grid-table-editor/site/docs/intro`, which works, but the docs root listed in this charter does not load docs.

The deployed generator and app pages expose many docs links for editing data, data formats, generator workflows, and test-data pages. The generator page includes visible schema controls, field type choices `enum`, `literal`, `regex`, `domain`, `faker`, a `Show help` control, row count/output format controls, preview output, and data table preview.

---
## 2026-06-27T10:21:40+01:00

- What you think you want to do and why

Follow the real published docs structure rather than guessed URLs, then compare representative docs examples against deployed runtime behavior. I also want to inspect method-picker help/docs links because issue #230 / PR #247 changed a large command/help surface.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used `../support/docs-consistency-deep-dive.mjs` to crawl relevant public pages and generator help states. Initial guessed URLs under `/site/docs/generating-data/...` returned 404, so I treated those as non-defect notes unless linked from the UI. The canonical docs came from `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data`.

Reviewed canonical docs pages with `../support/docs-consistency-canonical-check.mjs`:
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/literal-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/pairwise-testing`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/n-wise-testing`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/counterstrings`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences`
- `https://eviltester.github.io/grid-table-editor/site/docs/videos/faker-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`

Screenshots captured for relevant docs/helper surfaces include:
- `../screenshots/docs-consistency-docs-intro.png`
- `../screenshots/docs-consistency-docs-test-data-schema-definition-canonical.png`
- `../screenshots/docs-consistency-docs-test-data-faker-test-data-canonical.png`
- `../screenshots/docs-consistency-faker-helpers-docs.png`

Compared these docs-derived runtime examples using `../support/docs-consistency-example-runtime-visible-editor.mjs`:

1. Mixed schema/docs examples:

```text
Customer Name
person.fullName
Email
internet.email()
Greeting
helpers.mustache("Hello {{name}}", { name: "Ada" })
Order Ref
[A-Z]{3}-[0-9]{6}
Counter
string.counterString(15)
Build
autoIncrement.sequence(start=10, step=5)
```

2. Faker helper example:

```text
Sentence
helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")
```

3. Domain parameter examples:

```text
Direction
location.cardinalDirection(abbreviated=true)
Date
date.between(from=1577836800000, to=1659312000000)
Num
number.int(min=32, max=47)
```

For method-picker/help checks, selected `faker` as the field type and sampled `helpers.mustache`, `helpers.fake`, `helpers.rangeToNumber`, and `helpers.weightedArrayElement`. Then used `../support/docs-consistency-picker-detail.mjs` with column name `Greeting`, command `helpers.mustache`, and params `"Hello {{name}}", { name: "Ada" }`.

the observations and results that you make

Canonical docs pages reviewed above all returned HTTP 200. The valid docs structure for generation content is `/site/docs/test-data/...`, with `/site/docs/category/generating-data` as the category page.

The docs examples sampled were consistent with runtime behavior:
- `helpers.mustache("Hello {{name}}", { name: "Ada" })` generated `Hello Ada`.
- `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")` generated names in the documented sentence shape.
- `person.fullName` and `internet.email()` generated plausible names/emails.
- Raw regex `[A-Z]{3}-[0-9]{6}` was accepted and normalized to `regex([A-Z]{3}-[0-9]{6})` in the schema text after preview.
- `string.counterString(15)` generated `*3*5*7*9*12*15*`.
- `autoIncrement.sequence(start=10, step=5)` generated 10, 15, 20, etc.
- `location.cardinalDirection(abbreviated=true)` generated abbreviated directions such as `W`, `E`, `S`, `N`.
- `date.between(from=1577836800000, to=1659312000000)` generated dates inside the expected 2020-2022 range.
- `number.int(min=32, max=47)` generated values inside that range.

Method picker observations:
- Faker helper commands are visible after selecting field type `faker`.
- A selected helper exposes a command-specific docs link: `Faker command help: helpers.mustache` to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`.
- The Faker Helpers page is live and documents common helpers, including `helpers.mustache`, `helpers.fake`, `helpers.rangeToNumber`, and `helpers.weightedArrayElement`.
- Entering helper params without outer parentheses in the UI params field produced the hidden schema text `helpers.mustache("Hello {{name}}", { name: "Ada" })`, which matches the docs and executed successfully in the text editor.

No removed/deprecated `urlLoremFlickr` reference was found in the canonical docs, helper docs, picker detail, or runtime output captured by this lane.

Suspicious/non-defect notes:
- Directly guessed legacy-looking docs paths such as `/site/docs/generating-data/using-faker` and `/site/docs/schema` returned 404, but I did not find those linked from the current UI/category pages during this pass.
- Clicking unrelated icon buttons during the picker-detail exploration can create validation text such as params needing parentheses; this was not treated as a defect because the normal params entry produced a valid hidden schema and runtime output.

---
## 2026-06-27T10:28:07+01:00

- What you think you want to do and why

Split the repeatable docs-root 404 into a defect artifact with evidence, then close the docs-consistency lane with findings, coverage, gaps, and fresh follow-up ideas for the main agent.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Repeated the confirmed route issue by opening:

`https://eviltester.github.io/grid-table-editor/site/docs`

Used `../support/docs-consistency-record-defect-video.mjs` to capture a screenshot and video.

Created defect file:
- `../defects/docs-consistency-site-docs-404.md`

Evidence:
- `../screenshots/docs-consistency-defect-site-docs-404.png`
- `../videos/docs-consistency-site-docs-404.webm`

Final support files from this lane:
- `../support/docs-consistency-scout.mjs`
- `../support/docs-consistency-scout-inventory.json`
- `../support/docs-consistency-deep-dive.mjs`
- `../support/docs-consistency-deep-dive.json`
- `../support/docs-consistency-canonical-check.mjs`
- `../support/docs-consistency-canonical-check.json`
- `../support/docs-consistency-example-runtime.mjs`
- `../support/docs-consistency-example-runtime.json`
- `../support/docs-consistency-example-runtime-visible-editor.mjs`
- `../support/docs-consistency-example-runtime-visible-editor.json`
- `../support/docs-consistency-picker-detail.mjs`
- `../support/docs-consistency-picker-detail.json`
- `../support/docs-consistency-faker-helpers-doc.json`
- `../support/docs-consistency-record-defect-video.mjs`

the observations and results that you make

Confirmed defect:
- `/site/docs` returns a GitHub Pages 404 instead of redirecting/loading a docs landing page. This is repeatable and has screenshot/video evidence.

Docs/pages reviewed:
- Home, app, generator, docs root, docs intro, generating-data category, schema definition, test data generation, data grid editable, generate to file, regex/literal/pairwise/n-wise/domain/faker/counterstring/auto-increment docs, Faker Helpers, and Faker video docs.

Examples compared:
- Mixed schema using domain, faker helper, regex, counterstring, and auto-increment docs examples.
- Direct `helpers.fake` docs example.
- Domain parameter examples for location/date/number.
- Method-picker helper commands and the command-specific helper docs link.

Inconsistencies/gaps:
- Confirmed: `/site/docs` route 404.
- Gap: this lane did not exhaustively execute every helper method from the Faker Helpers page; it sampled common/template/parameterized helper methods.
- Gap: this lane did not exhaustively click every domain subpage under the 28-item domain category; it checked the domain overview and representative domain examples.
- Gap: this lane did not treat unlinked guessed 404 routes as defects; the main agent may decide whether historical route redirects are in scope.
- Gap: no accessibility or mobile-specific documentation checks were performed here; that belongs to the responsive/accessibility lane.

New test ideas for the main loop:
1. Execute every Faker Helpers page example, especially `helpers.arrayElements`, `helpers.shuffle`, `helpers.uniqueArray`, `helpers.weightedArrayElement`, `helpers.maybe`, and `helpers.multiple`.
2. Open the `Faker command help` link for several picker commands and confirm each one lands on the specific relevant docs section, not just the generic helpers page.
3. Compare picker command list against the Faker Helpers page headings and identify commands present in one surface but absent in the other.
4. Check whether the command-specific help icon should include an accessible visible label or tooltip text for sighted keyboard users.
5. Test the parameter editor button directly with valid and invalid helper params to confirm it guides users toward the docs-compatible syntax.
6. Check whether `/site/docs` should redirect to `/site/docs/intro` or `/site/docs/category/generating-data` and whether other category roots behave consistently with trailing slash/no slash.
7. Crawl all docs links exposed from the generator page and assert they return HTTP 200, because many links are hidden inside help popovers.
8. Compare schema examples from docs with app.html text editor mode, not only generator.html.
9. Check whether docs mention 1000 generated rows while preview displays 10 rows by default, and whether that distinction is clear enough.
10. Confirm removed/deprecated faker/domain commands through the picker list, docs search, and actual runtime error messages, not just text search.

Stopping note for this subagent lane: coverage is adequate for the docs/help/content consistency charter because the lane reviewed the key published docs surfaces, compared representative examples against runtime, verified method-picker helper docs linkage, checked stale-command visibility for the named removed command risk, and split the only repeatable content defect found into `/defects`.

---
---
## 2026-06-27T10:32:07.9809003+01:00

- What you think you want to do and why

Summarize the docs/help/content consistency lane from deployed-only evidence because the initial lane log only recorded the charter while the support folder contains the executed browser/documentation checks. The goal is to identify docs pages reviewed, examples compared, inconsistencies, and follow-up ideas for the main report.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed site and generated support files only. Reviewed structured evidence from support/docs-consistency-scout-inventory.json, support/docs-consistency-canonical-check.json, support/docs-consistency-deep-dive.json, support/docs-consistency-example-runtime.json, support/docs-consistency-example-runtime-visible-editor.json, and screenshots with docs-consistency- prefixes. Published pages checked included: site home, app.html, generator.html, docs intro, category/generating-data, test-data/test-data-generation, test-data/data-grid-editable, test-data/generate-to-file, test-data/Schema-Definition, test-data/regex-test-data, test-data/literal-test-data, test-data/pairwise-testing, test-data/n-wise-testing, test-data/domain/domain-test-data, test-data/faker-test-data, test-data/counterstrings, test-data/auto-increment-sequences, and videos/faker-test-data. Guessed legacy routes under /site/docs/generating-data/... and /site/docs/schema returned 404 and were recorded as discovery misses, not used as authoritative docs.

Compared runtime examples in the deployed generator using schema text mode: mixed doc examples with person.fullName, internet.email(), helpers.mustache("Hello {{name}}", { name: "Ada" }), regex([A-Z]{3}-[0-9]{6}), string.counterString(15), and autoIncrement.sequence(start=10, step=5); faker helper example helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!"); domain parameter examples location.cardinalDirection(abbreviated=true), date.between(from=1577836800000, to=1659312000000), and number.int(min=32, max=47). Checked method-picker detail/help surfaces for helpers.mustache, helpers.fake, helpers.rangeToNumber, and helpers.weightedArrayElement via support/docs-consistency-example-runtime.json and screenshots.

the observations and results that you make

The canonical docs pages relevant to the changed command families returned HTTP 200 and exposed updated test-data, schema, regex, literal, domain, faker, counterstring, and auto-increment surfaces. The deployed generator successfully generated output for the mixed docs examples, faker helper example, and domain parameter examples with no visible status errors in support/docs-consistency-example-runtime-visible-editor.json. The generator normalized a bare regex line [A-Z]{3}-[0-9]{6} into regex([A-Z]{3}-[0-9]{6}) in visible schema text, which agrees with the PR theme of making explicit regex form visible.

Docs consistency risks/gaps: some intuitive old/guessed docs routes under /site/docs/generating-data/... and /site/docs/schema now 404, so external stale links could be an issue even though current canonical navigation works. The row-mode params field requires parenthesized params such as (["A","B"]) while text-mode full calls use helpers.arrayElement(["A","B"]); this distinction is important and should remain clear in docs/help. The docs/runtime checks did not prove every changed command family; they sampled representative docs examples across core, domain, faker helpers, regex, literal, counterstring, and autoIncrement. New ideas: link-check docs pages from every method-picker Open documentation link; compare row-mode params documentation against text-mode full-call examples; test docs examples in JSON and Markdown output formats; check whether old generating-data routes need redirects; verify every helper with multiple examples from docs; inspect whether removed image/lorem commands are absent from docs and help.

---

