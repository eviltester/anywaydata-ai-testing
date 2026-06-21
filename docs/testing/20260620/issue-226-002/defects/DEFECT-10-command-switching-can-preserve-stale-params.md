# DEFECT-10: Switching Commands Can Preserve Stale Params For The Previously Selected Command

## Summary

When switching commands in the generator row flow, the params field can retain stale params text from the previously selected command instead of clearing or reconciling it for the new command.

## Why This Matters

- This can contaminate example execution and lead users to think the new command is broken.
- It contributed materially to early false-failure interpretations in the exploratory session.
- Another agent investigating generator workflow regressions should treat this as a distinct state-management defect.

## Environment

- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the deployed generator.
2. Switch a row into a command mode that uses params.
3. Select a command with params, such as `autoIncrement.sequence`.
4. Enter meaningful params such as `(start=10, step=5)`.
5. Change the selected command to another command such as `string.alpha`.
6. Observe the params field.

## Expected Result

- The params field should either:
  - clear, or
  - adapt safely and obviously for the newly selected command.

## Actual Result

- The old params can remain in the field after the command switch.
- This creates misleading row state for the newly selected command.

## Evidence

- Main log early Loop 1 observations: [issue-226-second-session-test-log.md](../issue-226-second-session-test-log.md)
- UX regression log: [ux-regression-test-log.md](../ux-regression-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- row-state synchronization after command selection changes
- picker apply/close lifecycle
- params field state ownership in the generator UI

## Investigation Questions

- Is stale params text preserved intentionally for convenience, or is it accidental carryover?
- If intentionally preserved, should the UI mark it invalid or incompatible for the new command immediately?
- Does the same issue occur when switching between domain and faker commands?

## Fix Verification Ideas

- Re-run the command-switch flow with at least two command pairs.
- Confirm the new command starts from clean or clearly validated params state.
- Verify the change does not break the structured params dialog workflow.

