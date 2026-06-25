# UX-001: Applying a method picker selection does not restore keyboard focus

Severity: Low to medium

Status: Defect candidate, repeatable in automated browser pass

Area: Method picker dialog, focus restoration, generator workflow

Evidence:

- Screenshot: `../screenshots/ux-regression-05-method-picker-search-httpmethod.png`
- State data: `../support/ux-regression-flow-results.json`, labels `selected-httpmethod-before-apply` and `after-apply-httpmethod`

Steps:

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Click `Select domain command`.
4. Search for `internet.httpMethod`.
5. Select `internet.httpMethod`.
6. Click `Apply`.

Observed:

The dialog closes and the row updates to `internet.httpMethod`, but focus moves to the document body. The captured state after apply was `activeTag: "BODY"` and `focusOnPickerButton: false`.

Expected:

After a modal apply action, focus should return to the invoking `internet.httpMethod` command picker button, matching the behavior observed for Escape, Cancel, and backdrop close.

Why this matters:

Keyboard users lose their position after applying a method and must rediscover where focus is. This is especially noticeable because the adjacent Cancel, Escape, and backdrop close paths do restore focus correctly.
