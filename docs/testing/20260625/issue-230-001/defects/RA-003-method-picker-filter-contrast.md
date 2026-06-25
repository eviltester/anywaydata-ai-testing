# RA-003: Method Picker Filter Button Text Contrast Is Below 4.5:1

Severity: Low

Environment: https://eviltester.github.io/grid-table-editor/generator.html and Storybook method-picker stories, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

Computed browser-side contrast for method-picker filter/tab button text was approximately 4.08:1 for rgb(31, 111, 235) text on rgb(233, 241, 255) background at 13.33px normal-weight text.

Expected:

Normal-size text should meet at least 4.5:1 contrast.

Evidence:

- screenshots/responsive-a11y-generator-method-picker-mobile-390.png
- logs/responsive-accessibility-test-log.md
