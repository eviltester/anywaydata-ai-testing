# Defect 005: Mobile params editor opens with enum value controls off-screen

## Summary

On narrow/mobile widths, the params editor opens as a wide table. The primary `Value` column containing the enum dropdown starts off-screen to the right, even though focus may be on that hidden control. Users must discover a horizontal scroll area to reach the main control.

## Environment

- Deployed URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Viewports tested: `390x844` and `320x720`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Set the viewport to `390x844`.
2. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
3. In the first schema row, set field type to `domain`.
4. Select `person.firstName`.
5. Open `Edit params for person.firstName`.

Repeated with:

- `person.firstName`
- `location.countryCode`
- `finance.bitcoinAddress`
- `color.rgb`

## Expected

The enum value picker should be visible on open, or the modal should reflow so the primary editable control is discoverable without horizontal scrolling.

## Actual

At 390 px wide:

- `.params-editor-table-wrap` client width is about `316`.
- `.params-editor-table-wrap` scroll width is about `720`.
- The first enum select starts around `x=585`, beyond the 390 px viewport.

The dialog initially shows `Name` and `Type`, while the `Value` control is hidden to the right.

## Evidence

![mobile value control off-screen](../screenshots/defect-005-mobile-value-offscreen.png)

Additional lane screenshots:

![mobile dialog before horizontal scroll](../screenshots/responsive-accessibility-generator-dialog-mobile-390.png)

![mobile dialog after horizontal scroll](../screenshots/responsive-accessibility-generator-dialog-mobile-scrolled-390.png)

Local-only video: `../videos/defect-005-mobile-params-value-offscreen.webm`

## Notes

This is not a total blocker because the table wrapper can scroll horizontally, but it is a high-confidence mobile usability/accessibility defect for the enum picker story.
