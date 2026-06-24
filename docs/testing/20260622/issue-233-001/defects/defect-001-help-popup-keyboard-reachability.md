# Defect 001: Help Popup Links And Buttons Are Not Keyboard Reachable

## Summary

Shared help popups on the deployed `app.html` and `generator.html` surfaces can display focusable content such as docs links or action buttons, but keyboard focus does not move into the popup after opening it. Pressing `Tab` moves focus back into the main page flow and the popup dismisses, making the popup content effectively mouse-dependent.

## Surfaces

- `https://eviltester.github.io/grid-table-editor/app.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- likely shared help-popup behavior across related flows because both surfaces reproduce the issue

## Why This Matters

- Issue comments explicitly called out keyboard reachability of help-popup links as needing investigation.
- The current behavior prevents keyboard-only users from reaching visible help links and buttons.
- This is an accessibility problem on shared help affordances, not just a cosmetic UX issue.

## Repeatability

- Repeatable on the deployed environment in this session.
- Reproduced in both `app.html` and `generator.html`.

## Reproduction

### Case A: `app.html` top Instructions popup

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Use keyboard navigation to focus the top `Instructions` help button.
3. Activate the help button to open the popup.
4. Press `Tab`.

### Case B: `app.html` Import/Export format help popup

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Focus and activate the Import/Export format help popup.
3. Observe that the popup visually contains the `Data Formats docs` link.
4. Press `Tab`.

### Case C: `generator.html` file-generation help popup

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Focus and activate `Show file generation help`.
3. Observe that the popup visually contains the `Generate To File docs` link.
4. Press `Tab`.

## Observed

- Case A: focus moved to `Add Row` in the main toolbar instead of into the popup's own interactive content.
- Case B: focus moved to the main-page `Markdown` format link and the popup dismissed, so the popup's `Data Formats docs` link was not keyboard reachable.
- Case C: focus moved to `Generate Data` and the popup closed, so the popup's `Generate To File docs` link was not keyboard reachable.

## Expected

- After opening a help popup that contains focusable content, keyboard focus should move into the popup or at minimum allow tabbing into the popup content before dismissal.
- Visible popup links and buttons should be reachable and operable using keyboard-only interaction.

## Evidence

- Responsive/accessibility subagent log: [../responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)
- Main log summary: [../issue-233-test-log.md](../issue-233-test-log.md)

## Notes For Investigation

- This likely lives in the shared help/tippy interaction layer rather than a single page implementation.
- The PR already changed tooltip behavior to keep only one tippy open; keyboard focus management may need a companion fix in the same shared seam.
