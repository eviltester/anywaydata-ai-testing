---
## 2026-06-27T10:14:18.9912421+01:00

- What you think you want to do and why

Start the Storybook/component parity gap lane for issue #230 / PR #247. This lane exists to check whether deployed Storybook or equivalent component examples are available for the Method Navigator, Method List, Method Help Display, and combined Method Picker Dialog, and to compare any component-level behavior against the deployed application behavior without running local verify/build/test commands.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created or opened the lane log at logs/storybook-component-parity-test-log.md under docs/testing/20260627/issue-230-001/. Will use only deployed/published environments: primary app https://eviltester.github.io/grid-table-editor/site/ plus any deployed Storybook/testenv pages discoverable from the PR/test environment. Planned screenshot prefix: storybook-component-parity-.

the observations and results that you make

Lane started. Techniques planned: deployed-surface discovery, component/app parity checking, consistency/oracle checking between Storybook examples and real app behavior, exploratory workflow testing, keyboard/focus heuristics, docs-link/help example consistency checks, and gap-based idea generation.

---
---
## 2026-06-27T10:23:04.0567438+01:00

- What you think you want to do and why

Complete the Storybook/component parity lane by proving deployed browser interaction, discovering deployed Storybook/component surfaces, comparing Method Picker Dialog Storybook examples with the real generator compatibility picker, and recording repeatable evidence and follow-up ideas for the main review. I need to determine whether a replicable defect should be raised or whether this lane only contributes parity gaps and risks.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Attempted Chrome DevTools MCP and Playwright MCP first; both were unavailable in this desktop session due to the Chrome profile lock / invalid Playwright MCP connection issue already seen by another lane. Installed a support-only playwright-core runner under support/browser-runner/ and used it only for deployed browser interaction, not project tests/builds. Created and ran support/storybook-component-parity-lane.js, then additional deployed-only browser checks saved to support/storybook-component-parity-generator-type-switch.json, support/storybook-component-parity-generator-picker-flow.json, and support/storybook-component-parity-interactive-story-clicks.json.

Opened and interacted with:
- https://eviltester.github.io/grid-table-editor/site/
- https://eviltester.github.io/grid-table-editor/site/app.html
- https://eviltester.github.io/grid-table-editor/site/generator.html
- https://eviltester.github.io/grid-table-editor/storybook/
- https://eviltester.github.io/grid-table-editor/storybook/index.html
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--navigator-default&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--list-default&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--choose-faker-method&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--filter-and-choose-domain-method&viewMode=story
- https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--cancel-method-selection&viewMode=story

Discovery probes showed deployed Storybook exists at /storybook/ and /storybook/index.html; /storybook-static/, /site/storybook/, /testenv/storybook/, and /testenv/storybook/index.html returned 404. Pulled https://eviltester.github.io/grid-table-editor/storybook/index.json into support/storybook-index.json and confirmed seven Method Picker Dialog entries: Navigator Default, List Default, Help Display With Usage, Visual Always Open, Choose Faker Method, Filter And Choose Domain Method, and Cancel Method Selection.

In generator.html, changed the first schema row type selector from egex to aker; clicked Select faker command; searched rrayElement; inspected the method list/help pane; selected helpers.arrayElement; captured screenshots/storybook-component-parity-generator-faker-picker-arrayelement.png and screenshots/storybook-component-parity-generator-faker-picker-arrayelement-selected.png. Then switched the row type to domain; clicked Select domain command; searched internet; inspected the full internet-domain list and help/docs link; captured screenshots/storybook-component-parity-generator-domain-picker-internet.png. In Storybook, opened the combined and interactive Method Picker stories, searched rrayElement and internet where search was available, clicked Open method picker in the choose/filter/cancel stories, and captured screenshots with the required storybook-component-parity- prefix.

Techniques and heuristics used: deployed-surface discovery, exploratory testing, component/app parity checking, consistency/oracle checking between Storybook and generator runtime surfaces, state/flow modeling for type-switch -> picker-open -> search -> select, documentation-link checking, and representativeness/risk analysis of fixture data versus production command taxonomy.

the observations and results that you make

Browser interaction with the deployed app and Storybook was confirmed via the support Playwright runner after MCP access was blocked. Direct pp.html and generator.html loaded correctly. The app home Use The Application scripted click did not change the URL in the headless pass, but direct app URL navigation worked and this lane did not treat that as a defect.

The deployed generator compatibility picker is available after changing the schema row type to aker or domain. It opens as Select schema method, has search, many category chips, method list, method help display, Open documentation, Cancel, and Apply. The helpers.arrayElement help in the generator matched the Storybook combined dialog for schema aker.helpers.arrayElement(), required rray parameter, usage example, full call helpers.arrayElement(["A", "B", "C"]), and return example. The domain/internet search showed the real generator has a broad command taxonomy and many internet commands such as internet.httpMethod, internet.httpStatusCode, internet.email, internet.password, etc.

The deployed Storybook Method Picker Dialog stories are present and interactive. Navigator Default, List Default, Help Display With Usage, Visual Always Open, Choose Faker Method, Filter And Choose Domain Method, and Cancel Method Selection all loaded. The interactive stories initially show a compact result/control state and open the dialog when Open method picker is clicked. The combined Visual Always Open story matches the generator at the component behavior level for search/list/help/apply/cancel rendering.

The main parity gap is representativeness: Storybook's visible picker fixture mostly shows a compact taxonomy (All, Core, commerce, internet, Faker, Recently used) and a small list (egex, helpers.arrayElement, internet.password, commerce.price), while the deployed generator picker shows the full taxonomy including airline, airplane, airport, animal, autoIncrement, book, chemicalElement, color, company, database, datatype, date, finance, food, git, hacker, image, language, literal, location, lorem, music, number, person, phone, string, system, unit, vehicle, and word. This is a coverage/representativeness gap, not a confirmed broken defect from this lane. A smaller parity difference is title/context copy: Storybook says Choose Method; the deployed generator compatibility picker says Select schema method.

No replicable defect was filed by this lane. Evidence and summary were saved in support/storybook-component-parity-summary.md. New ideas passed back: compare the full generator category list against command metadata; apply helpers.arrayElement(["A","B","C"]) from the generator picker and verify params/runtime output; apply internet.httpMethod(commonOnly=true) and compare with help/docs; follow Open documentation for helpers.arrayElement from generator and Storybook; repeat the picker flow in the embedded pp.html Test Data panel; add or verify a full-taxonomy Storybook story; add a schema-row compatibility Storybook story for Select faker command / Select domain command; add a story that switches from regex to faker and applies a command; test long category rows at small widths; add parity checks proving Storybook examples use the same help model as the deployed generator picker.

---
---
## 2026-06-27T10:23:21.3950525+01:00

- What you think you want to do and why

Append a correction note for the previous log entry because the PowerShell append command interpreted Markdown backticks as escape markers. The prior entry remains append-only and unmodified, but a few literal terms rendered with control characters; this correction preserves the intended evidence wording.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed the tail of logs/storybook-component-parity-test-log.md after appending the final lane entry. No browser actions were needed for this correction. The intended terms in the previous entry were: regex, faker, arrayElement, app.html, faker.helpers.arrayElement(), array parameter, and the compact fixture list regex, helpers.arrayElement, internet.password, commerce.price.

the observations and results that you make

The lane evidence remains valid; the issue was only log formatting caused by PowerShell escaping. The clean summary is available in support/storybook-component-parity-summary.md, and the structured evidence files in support/ contain the uncorrupted observed values.

---
