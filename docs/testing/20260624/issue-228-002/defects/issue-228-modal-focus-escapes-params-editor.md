# Params Editor Dialog Does Not Trap Keyboard Focus At Mobile Width

## Summary

In the deployed generator at `https://eviltester.github.io/grid-table-editor/generator.html`, the `Edit Params` dialog for `faker.helpers.rangeToNumber` does not keep keyboard focus inside the modal. After focus reaches `Cancel`, pressing `Tab` moves focus out of the dialog and back into background page content.

This is a confirmed, repeatable accessibility defect because keyboard users can leave the modal unintentionally while it remains open.

## Environment

- Story: issue `#228`
- PR under review: `#243`
- Deployed build observed on landing page:
  - Branch: `codex/228-improve-command-definition`
  - Commit: `fb9e8e2049e1`
  - Built: `2026-06-24T20:13:50.037Z`
- Viewport used for this pass: `390x844`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, change the source type to `faker`.
3. Select faker command `helpers.rangeToNumber`.
4. Activate `Edit params for helpers.rangeToNumber`.
5. Confirm the dialog `Edit params for faker.helpers.rangeToNumber` opens and focus starts in `numberOrRange value`.
6. Press `Tab` once.
7. Press `Tab` again.

## Actual Result

- First `Tab` moves focus to `Cancel`.
- Second `Tab` moves focus out of the dialog to the page `BODY`.
- Further `Tab` presses continue through background page controls such as `Skip to main content` and `Data Generator Instructions` while the dialog is still open.

## Expected Result

Keyboard focus should remain trapped within the open modal dialog until the dialog is dismissed or applied. `Tab` and `Shift+Tab` should cycle through the dialog controls only.

## Evidence

- Modal screenshot: ![Params editor dialog at 390px width](../screenshots/rangeToNumber-params-modal-390w.png)
- Supporting responsive pass screenshot: ![Generator page at 390px width](../screenshots/generator-390w-full.png)

## Focus Sequence Observed

Starting with focus in `numberOrRange value`:

1. `Tab` -> `Cancel`
2. `Tab` -> page `BODY`
3. `Tab` -> `Skip to main content`
4. `Tab` -> `Data Generator Instructions`

## Notes For Investigation

- The dialog is exposed as a dialog in the accessibility tree, and initial focus placement is good.
- The failure appears to be missing or incomplete focus-trap behavior rather than missing labels.
- Because the PR changed param-editing surfaces, this is worth checking across other command-param dialogs, not only `helpers.rangeToNumber`.
