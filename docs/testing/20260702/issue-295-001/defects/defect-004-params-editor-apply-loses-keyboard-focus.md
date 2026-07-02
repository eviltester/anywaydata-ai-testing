# Defect 004: Params editor `Apply` closes dialog and leaves keyboard focus on `<body>`

## Summary

After applying enum params from the params editor, keyboard focus is lost to `<body>` instead of returning to the invoking `Edit params for ...` button. `Escape` and `Cancel` return focus correctly, so the problem appears specific to `Apply`.

## Environment

- Deployed URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, set field type to `domain`.
3. Select `person.firstName`.
4. Open `Edit params for person.firstName`.
5. Keyboard path: focus `sex value`, choose `female`, Tab to `Apply`, press Enter.

Repeated with:

- `person.firstName`
- `location.countryCode`
- `finance.bitcoinAddress`

## Expected

After `Apply`, focus should return to the invoking params button or another predictable control in the schema row.

## Actual

The dialog closes and params are applied, but `document.activeElement` becomes `<body>`.

Contrast behavior:

- `Escape` closes the dialog and returns focus to the invoking params button.
- `Cancel` closes the dialog and returns focus to the invoking params button.

## Evidence

![Apply focus lost to body](../screenshots/defect-004-apply-focus-body.png)

Local-only video: `../videos/defect-004-params-apply-focus-body.webm`

## Notes

This affects keyboard and assistive-technology workflow after the new enum dropdown editing flow.
