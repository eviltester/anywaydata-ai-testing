# RA-004: Direct Storybook Method Picker Iframe Clips Dialog Top At 500px

Severity: Low

Environment: https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

At 500px content width, the direct Storybook iframe dialog measured x=20, y=-13, w=460, h=806, so the top of the dialog is clipped above the viewport. The integrated generator modal did not reproduce this and measured with a positive top offset.

Expected:

The direct Storybook story should keep the full dialog inside the viewport at narrow widths.

Evidence:

- screenshots/responsive-a11y-storybook-iframe-mobile-500.png
- logs/responsive-accessibility-test-log.md
