# Defect 05: Adjacent Help Tooltips Can Block Nearby Help Actions

## Summary

Inside the params/editor help workflow, an open field-level tooltip can intercept pointer interaction and prevent the nearby command-level help icon from being clicked until the first tooltip is dismissed.

## Repeatability

Repeatable in the sampled UX pass.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Choose a command with params-editor help, such as `helpers.arrayElement`.
3. Open the params editor.
4. Open the field-level tooltip for the required `array` param.
5. Without dismissing that tooltip, try to click the adjacent command-level help icon.
6. Observe that the click does not immediately reach the adjacent help target because the visible tooltip intercepts pointer interaction.

## Expected

Adjacent help affordances should remain usable, or the interaction model should make the required dismissal step obvious.

## Actual

One help overlay blocks another nearby help action in the same workflow.

## Why This Matters

- It slows down exploratory reading of parameter help.
- It makes the help system feel sticky or unreliable.
- It adds friction in exactly the part of the UI where users need cross-referencing between field help and command help.

## Supporting Evidence

- [ux-regression-test-log.md](../ux-regression-test-log.md)

## Notes For Investigation

- This is a UX regression/risk rather than the primary story miss, but it was reproducible and visible in the changed help-flow area.
