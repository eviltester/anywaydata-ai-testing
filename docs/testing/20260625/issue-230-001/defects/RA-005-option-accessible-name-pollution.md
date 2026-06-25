# RA-005: Export Option Accessible Names Include Neighboring Help Text

Severity: Low / broader app accessibility debt

Environment: https://eviltester.github.io/grid-table-editor/app.html and https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

Accessibility snapshots show export option controls with names that include adjacent help-button text, for example checkbox "Show help for this option Use Quotes" and textbox "Show help for this option Quote Char".

Expected:

Option controls should have concise names such as "Use Quotes" and "Quote Char", while the neighboring help buttons should retain their own independent names.

Evidence:

- screenshots/responsive-a11y-app-mobile-500.png
- logs/responsive-accessibility-test-log.md
