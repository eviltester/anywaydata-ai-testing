# RA-001: Method Picker Allows Background Page Scroll

Severity: Medium

Environment: https://eviltester.github.io/grid-table-editor/generator.html, branch codex/230-method-picker-mvc, commit 04570e0e428d.

Steps:

1. Open generator.html.
2. Change the first schema row field type to domain.
3. Open the method picker from Select domain command.
4. Keep focus in the Filter methods search box.
5. Press PageDown.

Observed:

window.scrollY moved from 0 to 290 while the modal remained open. The modal stayed fixed, but the underlying page scrolled behind it.

Expected:

Background page scroll should be locked while the modal is open, or PageDown should be contained within the active modal/list region.

Evidence:

- screenshots/responsive-a11y-background-scroll-page-down.png
- logs/responsive-accessibility-test-log.md
