# Defect 006 - Method picker listbox uses incompatible ARIA structure

Severity: Medium

Status: Confirmed repeatable by Lighthouse snapshot

## Summary

The Method Picker Dialog list surface uses a `section.method-picker-list` with `role=listbox`. Lighthouse/axe reports the role is inappropriate for the element and contributes to an ill-formed accessibility tree. This area was changed by the MethodPickerDialog MVC work.

## Steps to Reproduce

1. Open the deployed generator.
2. Set a row to `domain` or `faker`.
3. Open the Method Picker Dialog.
4. Run an accessibility snapshot/audit on the current page.

## Expected Result

The Method Picker List should expose valid listbox/options semantics with required ARIA parent/child relationships.

## Actual Result

Lighthouse reports an accessibility-tree failure for `section.method-picker-list` with `role=listbox`, stating that the ARIA role should be appropriate for the element.

## Evidence

- Screenshot: `../screenshots/loop1-mobile-method-picker.png`
- Video: `../videos/defect-006-method-picker-aria-listbox-mobile.webm`
- Lighthouse report: `../support/lighthouse-mobile-picker/report.html`
- Lighthouse JSON: `../support/lighthouse-mobile-picker/report.json`

## Notes for Fix Agent

Inspect the Method List view markup. Consider using a `div` or `ul` with valid listbox semantics and ensure options are direct/valid children per ARIA expectations.
