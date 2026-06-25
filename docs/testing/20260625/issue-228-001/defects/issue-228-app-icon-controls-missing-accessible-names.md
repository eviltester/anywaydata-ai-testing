# App embedded icon-only controls lack accessible names

## Severity

Medium

## Area

`app.html` embedded instructions, test-data schema, stored-schema, and import/export controls.

## Environment

Deployed target: <https://eviltester.github.io/grid-table-editor/app.html>

Date observed: 2026-06-25

## Summary

Several enabled icon-only controls on `app.html` have no visible text, `aria-label`, or `title`. They appear as compact icon buttons visually, but their accessible name is empty. This makes the controls difficult or impossible to identify for screen reader users and increases keyboard-discovery friction.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Inspect the compact icon buttons in the instructions/test-data/import-export areas.
3. Expand `Test Data`.
4. Generate rows from a schema to enable stored-schema actions.
5. Inspect enabled `button[data-role]` controls for visible text, `aria-label`, and `title`.

## Expected

Every icon-only actionable button has a programmatic accessible name, for example via `aria-label` or `title`, matching the user action.

## Actual

The following visible enabled buttons were observed with empty visible text, no `aria-label`, and no `title`:

```json
[
  { "role": "instructions-action-button", "disabled": false },
  { "role": "stored-schemas-save-as", "disabled": false },
  { "role": "stored-schemas-recover-draft", "disabled": false },
  { "role": "stored-schemas-load-last-used", "disabled": false },
  { "role": "stored-schemas-clear-last-used", "disabled": false },
  { "role": "download-button", "disabled": false }
]
```

Additional compact buttons such as embedded schema load/save file buttons were also observed as icon-only without names during the initial app-page control scout.

## Functional Control Check

The embedded test-data workflow itself worked after expanding `Test Data`:

1. Filled schema `Status`, `enum`, `Open,Closed`.
2. Generated three rows.
3. Confirmed `Total rows: 3` and grid header `Status`.
4. Used grid-to-text and text-to-grid roundtrip successfully.

This defect is therefore about accessible naming and discoverability rather than broken generation.

## Evidence

- `../screenshots/app-initial.png`
- `../screenshots/app-generate-new-table.png`
- `../screenshots/app-grid-text-roundtrip.png`

## Impact

Recent accessibility fixes may not cover the compact app-embedded controls. Screen reader users can encounter unnamed buttons, and sighted keyboard users get little contextual feedback beyond icons.

