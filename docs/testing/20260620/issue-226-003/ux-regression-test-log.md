## 2026-06-20 23:25 +01:00

- Establish the UX/regression subagent charter so this lane can focus on generator workflow stability, method-picker interaction, and user-facing regressions across the changed help and command flows.

the actions you take

- Created the UX regression log for the third session.
- Reserved this log for picker workflow, params entry, preview sync, and history/state side-effect observations.

the observations and results that you make

- This lane should focus on the live workflow quality of the changed UI, especially where help/examples interact with command selection and preview generation.

## 2026-06-20 23:33 +01:00

- Exercise the deployed generator workflow against issue #226 / PR #231 with emphasis on method-picker search, detail-pane sync, params persistence, command switching, preview regeneration, and inline help so this lane can separate confirmed UX regressions from healthy changed-surface behavior.

the actions you take

- Opened the deployed test environment, then opened the linked PR and issue in separate browser tabs to keep the exploratory pass grounded in the current story and deployed branch context.
- Entered `generator.html` from the test environment and switched the starter schema row from `regex` to `domain`.
- Opened the method picker, filtered to `internet.httpMethod`, reviewed the detail pane, and confirmed the picker showed the richer summary, parameter tables, usage examples, and docs link for the selected command.
- Applied `internet.httpMethod`, set column name `method`, entered `(commonOnly=true, excludes="head, delete")`, and compared preview behavior before and after a blur-style commit using keyboard tab navigation.
- Reopened the picker, switched from `internet.httpMethod` to `string.symbol`, checked whether the old params were retained or cleared, then entered `(length=5)` and regenerated preview output.
- Triggered both the schema-area help affordance and the top-level generator instructions help affordance to verify that contextual help still opens and points at the expected docs.

the observations and results that you make

- Positive: the picker search/filter flow worked cleanly, the detail pane updated to the filtered command, and the deployed app exposed the structured examples/parameter metadata that this issue and PR were intended to improve.
- Positive: switching from `internet.httpMethod` to `string.symbol` cleared the old params instead of carrying incompatible values across commands, which reduces a likely regression risk in the generator workflow.
- Positive: after `string.symbol(length=5)` was committed and preview rerun, the preview grid showed five-character symbol strings, so command switching plus preview refresh worked on the deployed branch.
- Confirmed UX regression/quirk: typing `internet.httpMethod` params and immediately previewing did not honor the entered params until focus left the params field. Before blur, preview still produced methods outside the requested filtered set; after tabbing away from the field and previewing again, output changed to the expected constrained `GET/POST/PUT` pool. This makes params entry feel non-committal and is likely to mislead users who click Preview directly after typing.
- Positive: the top-level generator instructions help opened with a useful overview tooltip, and the command-specific help link updated when the selected command changed from `internet.httpMethod` to `string.symbol`.
- Minor UX concern: the schema-section help affordance opened a tooltip anchored around `Edit as Text`, which is helpful but more specific than the generic `Show help` label suggests; the trigger wording feels a little ambiguous even though the help itself is informative.
- Techniques and heuristics used in this pass: exploratory workflow testing, risk-based focus on changed metadata consumers, consistency checking between picker details and preview behavior, state-transition testing across command switches, and lightweight documentation/help validation through user-visible links and tooltips.
- Follow-up ideas: verify whether mouse-only click-away behaves the same as keyboard tab for param commit, check whether the same commit-on-blur behavior affects faker helper params, and consider clarifying the schema help trigger label if the current tooltip target is intentional.
