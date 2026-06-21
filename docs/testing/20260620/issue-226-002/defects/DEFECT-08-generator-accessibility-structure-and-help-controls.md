# DEFECT-08: Generator Accessibility Structure And Help Controls Are Weaker Than The Docs Shell

## Summary

The generator shell lacks basic structural accessibility landmarks and uses weaker help-control semantics than the docs site.

Confirmed issues from the exploratory session:

- no `main`
- no `h1`
- no skip link
- some help triggers implemented as `span[role="button"]` instead of native buttons
- the top help trigger exposes content without updating `aria-expanded`

## Why This Matters

- The story outcome depends heavily on help/example discoverability.
- Accessibility regressions on the generator reduce usability for keyboard and assistive-technology users.
- The docs shell was observed to be better structured, so this is a meaningful parity gap.

## Environment

- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the deployed generator.
2. Inspect the page structure and heading/landmark model.
3. Inspect or interact with help triggers, especially the top `Show help` affordance.

## Expected Result

- The generator should expose baseline landmark and heading structure comparable to the docs shell.
- Interactive help controls should use strong, accurate semantics and reflect expanded state correctly.

## Actual Result

- `generator.html` lacks `main`, `h1`, and a skip link.
- Some help controls are `span[role="button"]`.
- The top help trigger shows content without updating `aria-expanded`.

## Evidence

- Responsive/accessibility log: [responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- generator page template/structure
- help-trigger component markup
- ARIA state management for expandable help content

## Investigation Questions

- Which help controls can be upgraded to native buttons without side effects?
- Why is `aria-expanded` not updating even when the content is shown?
- Can the generator reuse structural patterns already present in the docs shell?

## Fix Verification Ideas

- Re-check the generator page for `main`, `h1`, and skip link presence.
- Confirm help controls are keyboard-robust native controls where appropriate.
- Confirm `aria-expanded` tracks visible help state accurately.

