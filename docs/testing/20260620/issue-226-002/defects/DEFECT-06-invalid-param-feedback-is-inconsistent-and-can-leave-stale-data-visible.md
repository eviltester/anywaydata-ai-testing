# DEFECT-06: Invalid-Parameter Feedback Is Inconsistent And Can Leave Stale Generated Data Visible

## Summary

Bad parameter inputs do not fail consistently. The deployed app showed three different failure modes:

- malformed regenerated output with no validation message
- generic `**ERROR**` output with weak or missing explanation
- explicit row-level validation while stale prior generated data remains visible

This makes it hard for users to tell what actually happened.

## Why This Matters

- Invalid-input handling is a core part of the amended validator work in PR #231.
- Users cannot distinguish â€œvalidator blocked this inputâ€ from â€œgeneration failed downstreamâ€ from â€œthe old data is still on screen.â€
- This is a high-value follow-up defect for another agent because it likely touches validators, UI messaging, and stale-data handling.

## Environment

- Deployed app/generator only: [app.html](https://eviltester.github.io/grid-table-editor/app.html)

## Reproduction Examples

The exploratory session observed all three failure modes with real inputs. Examples include:

1. `string.alpha(length=abc)`:
   - malformed generated output
   - no clear validation message
2. `string.alpha(casing="sideways")`:
   - `**ERROR**`
   - weak/generic explanation
3. `internet.protocol(secure=true)`:
   - row-level validation message appears
   - prior generated cell stays visible

## Expected Result

- Invalid inputs should fail in a consistent, understandable way.
- If generation is blocked, stale prior data should not remain deceptively visible as if it were current.

## Actual Result

- Different invalid inputs fail through different pathways with inconsistent user feedback.
- In at least one clear validator case, the old generated cell remained visible.

## Evidence

- Detailed negative pass: [negative-validation-test-log.md](../negative-validation-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- validator invocation path
- invalid-params UI messaging
- preview-grid refresh/clear behavior when validation blocks generation
- state carryover between one invalid case and the next

## Investigation Questions

- Which layer decides whether generation should proceed, be blocked, or render generic `**ERROR**`?
- When validation fails, should preview/grid be cleared, marked stale, or left untouched with explicit stale-state messaging?
- Are different command families bypassing a common validator contract?

## Fix Verification Ideas

- Re-run the exact invalid cases above.
- Confirm all of them fail through one coherent UX pattern.
- Verify no stale previous generated value remains visually misleading after a blocked regeneration.

