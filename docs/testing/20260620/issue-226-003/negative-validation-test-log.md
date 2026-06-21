## 2026-06-20 23:25 +01:00

- Establish the negative-validation subagent charter so this lane can focus on malformed parameters, invalid combinations, and validator feedback behavior without overlapping the broad positive-path coverage lane.

the actions you take

- Created the negative validation log for the third session.
- Reserved this log for malformed-input probes, validator behavior checks, and bad-state feedback observations.

the observations and results that you make

- This lane should concentrate on error handling, stale-output behavior, and message quality rather than on broad command-family sampling.

## 2026-06-20 23:31 +01:00

- Probe the deployed generator for negative validation gaps and recovery behavior by comparing blank input, malformed input, invalid state combinations, boundary values, and text-mode parsing against the resulting grid state and feedback messages.

the actions you take

- Opened the deployed app at `https://eviltester.github.io/grid-table-editor/app.html`, expanded the Test Data panel, and worked only through user-facing controls in the generator and schema editor.
- Tried `Generate` with the default blank schema row to confirm baseline required-field validation before adding any valid values.
- Entered column name `badregex` with `regex` still selected and left the value blank, then generated to check whether the row editor enforces a required data definition for regex rules.
- Kept `regex` selected, entered malformed value `[` and generated to check whether invalid regex syntax is rejected or surfaced with validator feedback.
- Switched to `literal`, left the existing row in place, set `Amend Selected` with no grid row selected, and generated to probe invalid mode/state handling and stale-grid behavior.
- Left the schema valid, switched back to `New Table`, set `How Many?` to `0`, and generated to check boundary validation and whether the prior output stayed visible after failure.
- Corrected the row-editor inputs to `literal(ok)` with row count `1` and generated again to confirm recovery without a reload.
- Switched to `Edit as Text`, tried one-line schema text entries `badregex regex([)` and `badregex literal(ok2)`, then generated to observe parser feedback quality and whether text-mode validation explained the actual format problem.
- Used exploratory testing, risk-based targeting, equivalence partitioning, boundary analysis, negative testing, state/flow thinking, oracle checking, stale-output checks, and recovery checks throughout the pass.

the observations and results that you make

- Baseline validation worked for the completely blank row: the app showed `Schema validation failed. Grid unchanged.` plus row-level feedback `Row 1: column name is required.` and kept the grid at `Total rows: 0`.
- After only the column name was provided, the row editor no longer required a regex value. Generating with `regex` selected and a blank value succeeded, created column `badregex`, and inserted one row with an empty cell. This looks like a validator gap if regex rules are supposed to require an example/definition rather than silently allowing blank output.
- Malformed regex syntax also passed in the row editor. With `regex` selected and value `[`, the app reported `Generate complete. Grid updated.` and inserted literal output `[` into the grid instead of flagging invalid regex syntax. That is the strongest negative-validation concern from this pass because the UI appears to accept a broken rule and treats it like usable data.
- Invalid state handling for `Amend Selected` was clearer: with no selected grid rows, the app blocked generation, preserved the existing row output, and surfaced both a toolbar message `No selected rows to amend.` and row-level feedback `No rows selected.` This is a good stale-output behavior because failure did not wipe prior data.
- Boundary validation for `How Many? = 0` also blocked generation and kept the prior grid contents visible. The paired messages were `Invalid row count.` and `Enter how many rows to generate.` Message quality here was understandable, although the dual-message pattern is slightly repetitive.
- Recovery in the row editor worked cleanly. After the invalid count failure, correcting the inputs to a valid literal rule and row count `1` succeeded immediately and replaced the stale `[` row with `ok` without requiring a refresh.
- Text-mode validation behaved differently from row-editor validation and the feedback was misleading. Both `badregex regex([)` and `badregex literal(ok2)` failed with `Schema validation failed. Grid unchanged.` plus `column badregex ... requires a data definition, use 'literal(\"\")' for blank data`, which did not explain that the one-line format itself was wrong. The message reads like a missing-data problem rather than a parsing/formatting problem, so recovery guidance is weak for text-mode mistakes.
- The session shows an inconsistency risk between editing modes: row-editor validation allowed blank and malformed regex-style inputs to generate data, while text mode rejected compact one-line command text with a message that did not clearly describe the real issue.
- Follow-up ideas: probe `domain` and `faker` rows for the same blank/malformed acceptance pattern, compare text-mode help against the actual accepted multiline format, test whether malformed validators still leak into saved schema history, and check whether generated help/examples promise stricter validation than the deployed row editor currently enforces.
