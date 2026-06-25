# UX Regression Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: assess workflow regression and usability across generator, method-picker, params editor, help, preview/generate loops, and related schema authoring flows in the current deployed environment.

Techniques and heuristics to use: exploratory testing, state/flow modeling, friction hunting, consistency checks, and repeatability checks for workflow interruptions.

Expected focus: discoverability, clarity of examples and errors, help interactions, picker-to-row insertion flows, params editing, preview/generate loops, and any workflow regressions caused by the shared metadata path or current helper changes.

---
## 2026-06-24T21:49:30.4021070+01:00

- Charter: assess UX and workflow friction on the deployed generator page with emphasis on help discoverability/wiring, params editing friction, and preview/generate workflow clarity.

Actions taken:
- Opened the deployed page in a live browser session and inspected the default generator state.
- Expanded the top-level instructions help and the schema help tooltip, then compared those affordances with the icon-only help triggers in the options and preview areas.
- Entered a simple row-mode schema (`username` with regex `[A-Z]{3}`), exercised `Preview`, and observed behavior both before and after completing the required regex value.
- Edited CSV params by changing the quote character, watched for dirty/apply state changes, applied the update, and compared the preview output before and after the change.
- Triggered `Generate Data` after previewing to confirm how the page communicates the handoff from preview validation to file generation.

Observations:
- Help is present in several places, but most triggers are repeated icon-only buttons with the same accessible name (`Show help` / `Show help for this option`), so the screen gives weak visual guidance about which help is overview help, section help, or option-specific help.
- The schema help tooltip is useful once opened, but it is hidden behind a small icon beside `Edit as Text`; the more actionable `Insert Example Schema` affordance appears only inside that tooltip, making onboarding help discoverable only after a successful hover/click detour.
- Preview can be triggered while the row schema is still invalid; instead of blocking clearly, the page showed a row-level validation error while the preview area continued to display placeholder output (`~rename-me`), which risks making stale or fallback output look like a valid result.
- Params editing adds an extra commit step through `Apply`; the button enables correctly after a field change, but the need to commit settings is easy to miss because the changed field, the disabled/enabled button, and the downstream preview result are separated across the panel.
- The preview-to-generate path works, but the transition is abrupt: `Generate Data` immediately downloads a file without reinforcing that it is using the currently configured schema/options, so users have to infer whether they are generating the same thing they just previewed.

---
