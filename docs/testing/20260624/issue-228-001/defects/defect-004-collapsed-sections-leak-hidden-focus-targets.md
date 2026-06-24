# Defect 004: Collapsed Sections Leak Hidden Focus Targets Into Keyboard Order On Mobile

## Summary

On mobile `app.html`, collapsed sections still expose nested focusable controls to keyboard users. Tabbing moves into hidden help targets inside collapsed `Test Data` and `Import / Export` sections, causing confusing focus order and unexpected tooltip content from content the user has not opened.

## Environment

- Deployed test environment: `https://eviltester.github.io/grid-table-editor/app.html`
- Session date: `2026-06-24`
- Mobile viewport coverage used during confirmation: `375x812` and `320x800`

## Repeatability

Repeatable.

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/app.html` at a mobile-width viewport.
2. Leave the `Test Data` section collapsed.
3. Use keyboard `Tab` navigation forward through the page.
4. Continue tabbing until focus reaches the collapsed `Test Data` summary.
5. Tab again and observe focus moving into a hidden nested help target.
6. Continue the same process with `Import / Export` still collapsed.

## Expected Result

Collapsed sections should not expose hidden descendant controls in the normal keyboard tab order.

## Actual Result

- After the collapsed `Test Data` summary, `Tab` lands on a hidden nested help icon.
- Later, while `Import / Export` is still collapsed, `Tab` reaches a hidden option-help target and scrolls the page into the closed region.
- Tooltip content can appear from closed sections that the user has not opened.

## Evidence

- [responsive-accessibility-mobile-tab-24.png](../screenshots/responsive-accessibility-mobile-tab-24.png)
- [responsive-accessibility-mobile-tab-28.png](../screenshots/responsive-accessibility-mobile-tab-28.png)
- Supporting log: [responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)

## Why This Matters

This is a real keyboard accessibility defect. It breaks expected focus order, makes navigation confusing on mobile, and exposes controls that are visually and structurally hidden.
