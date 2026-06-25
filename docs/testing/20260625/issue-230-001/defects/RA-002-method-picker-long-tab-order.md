# RA-002: Method Picker All-Methods State Has Excessive Tab Order

Severity: Medium/Low

Environment: https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Observed:

The desktop all-methods dialog exposed 310 focusable controls, including 36 filter buttons and 269 method tiles. Tab trapping worked, but a plain Tab user must traverse a very long sequence unless they already know to use search, slash, or filtering.

Expected:

The method list should consider roving tabindex, listbox/grid semantics, or another keyboard model where Tab moves across major regions/actions and arrow keys move within the method list.

Evidence:

- screenshots/responsive-a11y-generator-method-picker-desktop.png
- logs/responsive-accessibility-test-log.md
