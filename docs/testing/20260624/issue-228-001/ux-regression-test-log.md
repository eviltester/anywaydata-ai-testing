# UX Regression Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: assess workflow regression and usability across generator, method-picker, help, params editing, and related schema authoring flows in the deployed environment.

Techniques and heuristics to use: exploratory testing, state/flow modeling, friction hunting, consistency checks, and repeatability checks for workflow interruptions.

Expected focus: discoverability, clarity of examples and errors, help interactions, picker-to-row insertion flows, params editing, preview/generate loops, and any workflow regressions caused by the shared metadata path.

---
---
## 2026-06-24 17:49:22 +01:00
- intent: Prove live browser access on the deployed issue-228 / PR-243 environment and scout the available UX surfaces before filing any regressions.
- actions: Opened `https://eviltester.github.io/grid-table-editor/` in a real browser session via Playwright CLI; confirmed the published branch/build metadata; followed the live `Open generator.html` entry point; captured the initial generator surface inventory including help affordances, schema editing controls, output settings, preview, and data-table preview.
- observations: Browser control works against the deployed environment. The landing page shows branch `codex/228-improve-command-definition`, commit `8382b9e1947b`, built `2026-06-24T16:07:45.755Z`. The generator surface loads with visible help triggers, schema row editing, output-format controls, preview controls, and nested docs/help links. No regression claimed from the scout pass.
---
## 2026-06-24 17:51:42 +01:00
- intent: Exercise the schema method picker and params editing flow for a non-trivial faker command, then verify whether the resulting rule can be previewed through the standard authoring loop.
- actions: Opened the top-level generator help and confirmed the contextual overview tooltip rendered; switched the first schema row from `regex` to `faker`; opened the method picker; selected `helpers.rangeToNumber`; filled the row column name as `count`; attempted a direct preview from the row-level params textbox; then opened the structured params editor and entered `{ min: 1, max: 9 }` for the required `numberOrRange` value.
- observations: The method picker itself is usable and exposes descriptions, parameter metadata, examples, and documentation links. The follow-on params workflow is broken for this object-typed faker helper: the inline params textbox did not visibly retain a typed object value before preview, the preview still generated large unrelated numeric-looking values, and the structured params editor produced `Generated params (numberOrRange={ min: 1, max: 9 })` but blocked Apply with `Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`. This makes a picker-exposed command effectively unconfigurable through the UI. Screenshot saved: `screenshots/ux-regression-faker-param-editor-invalid-object.png`.
---
## 2026-06-24 17:52:22 +01:00
- intent: Sanity-check the adjacent help surface for the selected faker command so the params failure can be compared against the guidance shown in-product.
- actions: Re-opened the generator state after cancelling the params dialog; used the selected command help affordance for `helpers.rangeToNumber`; inspected the rendered command tooltip content and its embedded example syntax.
- observations: The in-product help compounds the params-editor failure rather than explaining it. The tooltip explicitly presents the object form as valid example syntax (`helpers.rangeToNumber({ min: 1, max: 2 })`) and describes the param type as `number | { min: number; max: number; }`, which directly conflicts with the structured params editor refusing the same object shape as "unsafe faker rule syntax". This is a usability contradiction across method-picker help and params editing, not just a single validation message.
---
