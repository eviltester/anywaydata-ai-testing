# UX Regression Test Log

## Charter

- Owner: subagent for UX, workflow, and regression behavior
- Goal: exercise generator, method picker, help popups, tooltip interaction, and related flows affected by PR #234 using the deployed test environment only
- Write scope: this file only
- Techniques and heuristics: exploratory workflow testing, state/flow modeling, usability heuristics, regression comparison

---
## 2026-06-22T13:45:33.1145836+01:00

- What you think you want to do and why

Continue the deployed-only UX regression pass against `https://eviltester.github.io/grid-table-editor/` and focus on the generator workflow, faker/domain method picker, params editor, preview/help affordances, and the PR #234 expectation that only one tippy/help popup should stay open at a time. Capture enough evidence to either finish the lane or return a reliable partial result if browser tooling blocks deeper exploration.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/` in a real browser session and confirmed the landing page build metadata showed branch `233-test-env-consistency`, commit `ec1b8db43eb9`, built `2026-06-22T12:16:58.547Z`. Followed the `Open generator.html` link into `https://eviltester.github.io/grid-table-editor/generator.html`. On the generator page, changed the first schema row type from the default regex row to `faker`, then opened the method picker from `Select faker command`. Verified the picker rendered category chips, a filter box, a method list, and a details pane with schema example, parameter tables, usage examples, and docs link for `helpers.arrayElement`. Re-opened the picker and switched the category to `internet`, then selected `internet.httpMethod` and applied it so the row changed to `domain` with `internet.httpMethod` selected. Filled the column name with `method` to keep the row valid enough for downstream interactions. Opened the params editor path for `internet.httpMethod` and inspected the dialog content through the live page DOM when the accessibility snapshot truncated it; confirmed it showed `Edit Params`, the full command `awd.domain.internet.httpMethod`, parameter controls for `commonOnly` and `excludes`, and generated params text `(commonOnly=false)`. For tooltip/help behavior, clicked multiple help triggers in sequence while checking visible tippy content in the DOM: `Data Generator Instructions` help, schema section help, and other help affordances around generator/options/preview. After each click, checked visible `[data-tippy-root]` elements and their text content to see whether a new help popup replaced the old one or stacked with it. Also attempted to continue via non-Playwright browser tooling after the user asked to reserve Playwright for fallback: Chrome DevTools reported the profile browser was already running and Playwright MCP failed to attach cleanly, so deeper follow-through stayed on the already-collected deployed evidence instead of waiting on tool recovery.

the observations and results that you make

The deployed environment is live and the generator workflow surfaces affected by PR #234 are present and usable. The method picker is a strong regression oracle here: it rendered smoothly, switching from faker helpers to domain/internet commands without obvious UI breakage, and the details pane showed command descriptions, schema examples, parameter metadata, usage examples, and documentation links as expected. The `internet.httpMethod` path specifically looks healthy at selection time: applying the picker changed the row into the expected domain command state, enabled the params editor button, and the params editor dialog opened with the expected command-specific configuration content. The clearest regression result is the tippy/help behavior: sequential help clicks produced exactly one visible tippy popup at a time in the DOM, with the later click replacing the earlier popup content rather than leaving multiple visible tippies stacked. Concretely, `Data Generator Instructions` help showed one visible popup with overview text, then schema help showed one visible popup with schema/edit-text guidance instead of two simultaneous popups. That supports the "only one tippy open" expectation for the exercised generator help flows. I did not finish a full preview-generation assertion after applying `internet.httpMethod`, and I did not complete deeper coverage of preview help, file-generation help, or docs-link navigation because the alternate browser attachment paths were blocked and I chose to preserve time by returning a grounded partial rather than spending the lane on tool recovery. One additional note from initial page open: the test environment landing page reported one console error on load, but this session did not isolate or characterize that error.

---
