# Docs Consistency Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: compare published docs, in-app help, method-picker content, and live runtime behavior for command families exposed on the deployed branch.

Techniques and heuristics to use: documentation testing, consistency/oracle checking, stale-content hunting, and representative example execution.

Expected focus: docs links, examples, removed commands, missing commands, stale wording, and mismatches between what docs/help claim and what the deployed runtime actually accepts or produces.

---
## 2026-06-24T17:48:30.0000000+01:00

- Intent: prove browser access to the deployed branch and capture the live publication metadata before checking docs/help consistency.

Actions taken: opened `https://eviltester.github.io/grid-table-editor/` in a Playwright CLI session, captured the landing-page snapshot, and recorded the visible branch/commit/build metadata plus top-level links into the app, generator, Storybook, and nested `site/`.

Observations: the deployed landing page is live on branch `codex/228-improve-command-definition`, commit `8382b9e1947b`, built `2026-06-24T16:07:45.755Z`; the top-level page exposes the nested docs path as `./site/`; the browser session also reported one console error on load, which may be unrelated to the docs charter but is worth checking if it recurs inside help or docs surfaces.

---
## 2026-06-24T17:50:30.0000000+01:00

- Intent: compare published generating-data docs and in-app help links against the live nested app and generator surfaces.

Actions taken: reviewed `/site/docs/intro`, expanded the `Generating Data` docs sidebar, opened `Method Picker UI Spec`, `Faker Based Data`, and `Domain Test Data`, then opened `/site/app.html` and expanded the `Test Data` help tooltip and schema panel.

Observations: nested docs routing is healthy and all checked doc links resolved under `/grid-table-editor/site/...`; the in-app `Test Data` help tooltip links to `/site/docs/test-data/test-data-generation`; regex and domain row help icons point to `/site/docs/test-data/regex-test-data` and `/site/docs/test-data/domain/domain-test-data`; the published docs now explicitly separate curated `domain.*` usage from faker-only `helpers.*`, including the migration warning that `domain.helpers.fake("...")` is invalid.

---
## 2026-06-24T17:52:10.1157676+01:00

- Intent: compare the published method-picker docs/spec with the live runtime controls and execute at least one documented example in the deployed generator.

Actions taken: inspected the standalone `/generator.html` schema controls, inspected the nested `/site/app.html` test-data schema controls, ran a live regex example in the standalone generator (`Code` + regex `[A-Z]{3}`) and previewed generated output, then switched the same row to `domain` to inspect the available live command-selection control.

Observations: the live runtime does not match the published `Method Picker UI Spec` page yet; both the standalone generator and nested app still use inline controls rather than the shared modal picker described by the spec page, and no visible modal-picker entry point was present during this pass. The standalone generator still shows a plain type dropdown for `enum/literal/regex/domain/faker`; the nested app improves on that for `domain` by exposing a searchable command dropdown plus params field, but this is still not the documented modal with tabs/search/details. The regex example executed successfully and previewed CSV output with header `Code` and sample values such as `TNW`, `GCJ`, and `XLT`, which confirms the deployed generator still works for representative documented examples even while the picker-spec docs appear ahead of the live UI.

---
