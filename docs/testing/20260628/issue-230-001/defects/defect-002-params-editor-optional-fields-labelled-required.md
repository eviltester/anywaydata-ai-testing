# Defect 002 - Params editor labels optional parameters as Required in accessibility tree

Severity: Medium

Status: Confirmed repeatable

## Summary

The params editor for commands such as `internet.email` displays optional parameters, but the disabled checkbox accessible names say `Required allowSpecialCharacters`, `Required firstName`, `Required lastName`, and `Required provider`.

## Steps to Reproduce

1. Open https://eviltester.github.io/grid-table-editor/generator.html.
2. Set a row to `domain`.
3. Open the Method Picker and select `internet.email`.
4. Click `Edit params for internet.email`.
5. Inspect the params editor accessibility snapshot or screen-reader labels.

## Expected Result

Optional parameters should not be announced as required. Disabled indicators should have labels that reflect optional status or should be hidden from assistive tech if purely visual.

## Actual Result

Optional parameter controls are announced with labels beginning `Required ...`, contradicting the visible optional metadata and help model.

## Evidence

- Screenshot: `../screenshots/defect-002-params-optional-required-label.png`
- Video: `../videos/defect-002-params-optional-required-label.webm`

## Notes for Fix Agent

Update params editor labeling so the Req column and accessibility names use actual required state. This is likely in the shared params editor/modal component.
