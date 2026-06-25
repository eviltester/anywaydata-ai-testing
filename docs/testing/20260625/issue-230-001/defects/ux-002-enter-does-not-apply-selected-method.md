# UX-002: Enter does not apply the focused selected method in the picker

Severity: Low to medium

Status: Defect candidate, repeatable in automated browser pass

Area: Method picker dialog, keyboard shortcut, search results

Evidence:

- Screenshot: `../screenshots/ux-regression-10-keyboard-enter-after-tile-focus.png`
- State data: `../support/ux-regression-keyboard-results.json`, labels `enter-with-tile-focused-before-key` and `enter-with-tile-focused-after-key`

Steps:

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Click `Select domain command`.
4. Search for `internet.httpMethod`.
5. Focus the single visible result tile.
6. Press `Enter`.

Observed:

The focused tile remains focused, the dialog stays open, and the row remains `Select domain command` with an empty command value. A parallel check pressing `Enter` while the search input contained the single selected result also left the dialog open without applying the command.

Expected:

If Enter is intended as a picker shortcut, pressing Enter on a focused selected result should apply the selected method or otherwise activate the focused result in a clearly useful way. If Enter is intentionally not an apply shortcut, the UI should not rely on it as part of the picker keyboard workflow.

Why this matters:

Search narrows to a single selected result, but keyboard users still have to tab or move to `Apply`. This makes the advertised or expected search-plus-Enter workflow feel incomplete.
