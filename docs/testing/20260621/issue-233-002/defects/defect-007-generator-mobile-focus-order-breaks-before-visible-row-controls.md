# Defect 007: Narrow-width generator focus order breaks before visible row controls

## Summary

At `320x568`, keyboard focus in `generator.html` becomes unstable after the `Column Name` textbox. Focus moves to `BODY` and loops back to earlier controls instead of continuing through the remaining visible row controls.

## Environment

- Page under test: `https://eviltester.github.io/grid-table-editor/generator.html`
- Viewport used in evidence: `320x568`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Resize to `320x568`.
3. Press `Tab` repeatedly from the top of the page.
4. Continue until focus reaches the schema row area.

## Expected

Focus should continue through the visible schema-row controls in order, including method/type controls, help link, and value field.

## Actual

After the `Column Name` textbox, focus jumps to `BODY` and then loops back to earlier controls instead of progressing through the remaining visible row controls.

## Repeatability

- Repeatable

## Evidence

- Supporting log: [../responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)

## Notes

- This makes keyboard-only use of the narrow-width generator unreliable even though the page does not horizontally overflow.
