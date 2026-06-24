# Enum Cross-Surface Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: trace enum behavior across row mode, text mode, domain-command usage, preview/generation, and export-oriented surfaces in the deployed branch.

Techniques and heuristics to use: state/flow modeling, positive and negative sampling, normalization/oracle checking, and repeatability checks across multiple enum spellings and syntactic shapes.

Expected focus: `enum(...)`, `enum value1,value2`, `datatype.enum(...)`, `awd.datatype.enum(...)`, displayed versus saved syntax, cross-surface parity between app and generator, and any export/rendering regressions tied to enum normalization.

---
## 2026-06-24T17:48:06.2114860+01:00

- Intent: prepare the deployed-only enum cross-surface session, capture prior expectations, and confirm the browser route before interacting with the live app.

Actions:
- Read the existing charter block in this owned log to preserve the requested scope.
- Checked prior memory for issue #228 enum/domain cleanup and prior deployed exploratory browser work.
- Confirmed Playwright skill instructions and verified that `npx` is available for live browser automation.
- Checked the screenshots folder so new captures can follow the required `enum-cross-surface-` naming pattern.

Observations:
- Prior implementation notes indicate internal normalization should favor `datatype.enum(...)` while public schema text should round-trip as `enum(...)`.
- Prior deployed-browser notes favor Playwright over Chrome DevTools for reliable interaction with `https://eviltester.github.io/grid-table-editor/`.
- The screenshots folder already contains earlier browser-proof images; new captures should use the `enum-cross-surface-` prefix to stay distinct.

---
## 2026-06-24T17:52:12.3792894+01:00

- Intent: prove live access to the deployed issue #228 / PR #243 environment, confirm the exact published build, and inventory the app and generator surfaces most relevant to enum behavior.

Actions:
- Opened `https://eviltester.github.io/grid-table-editor/` with Playwright CLI using a dedicated `enum228` session after browser MCP attach paths proved unreliable.
- Captured the live landing-page snapshot and verified the published branch, commit, and build timestamp.
- Opened `app.html` and `generator.html` in separate tabs and captured accessibility snapshots of each surface.
- Inspected the app export/preview region and the generator schema editor, preview region, and output-format controls for enum-relevant entry points.

Observations:
- Live browser access is proven against the deployed site; the test-environment landing page reported branch `codex/228-improve-command-definition`, commit `8382b9e1947b`, built `2026-06-24T16:07:45.755Z`.
- The generator exposes direct schema row editing plus a text-mode toggle, which made it the fastest surface for live enum syntax checks.
- The app surface clearly exposes Test Data options plus export-oriented preview links (Markdown, CSV, Delimited, JSON, JSONL, XML, SQL, Code, Gherkin, HTML, ASCII), but I did not complete a full app-side enum authoring flow before wrap-up.
- Chrome/DevTools-style MCP attach remained flaky because of an already-running browser profile; Playwright CLI was the dependable route for this deployed-only pass.

---
## 2026-06-24T17:52:12.3792894+01:00

- Intent: trace enum behavior in the generator across row mode and text mode, establish a working baseline, and sample shorthand syntax acceptance.

Actions:
- In generator row mode, filled `Column Name = color`, changed the rule type from `regex` to `enum`, and entered `red,green,blue` in the value field.
- Ran `Preview` and inspected both the text preview and the data-table preview.
- Switched the same schema from row mode into text mode with `Edit as Text` and recorded the rendered schema text.
- Captured a screenshot of the working generator text-mode baseline and copied it into the owned screenshots folder as `enum-cross-surface-generator-text-baseline.png`.
- Replaced the text-mode schema with the shorthand variant `color enum red,green,blue` and ran `Preview` again to see whether the no-parentheses form would parse.

Observations:
- Row mode with `enum` plus comma-separated values worked in the deployed generator: preview rows were limited to the supplied set (`red`, `green`, `blue`) and the output preview populated successfully.
- When the same working row-mode schema was opened in text mode, the public text representation rendered as `color enum(red,green,blue)`.
- This is consistent with the expected public-facing normalization toward `enum(...)` rather than exposing an internal `datatype.enum(...)` form in text mode.
- The shorthand text variant `color enum red,green,blue` did not parse in this surface. The live error was `column color enum red,green,blue requires a data definition, use 'literal("")' for blank data`, and preview output was cleared.
- Because of time, I did not finish practical live checks for `datatype.enum(...)` or `awd.datatype.enum(...)`, nor did I complete export-format switching or app-side enum authoring before wrap-up.

---
