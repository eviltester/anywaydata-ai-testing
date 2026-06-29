# Defect 005 - Science docs and picker/help use inconsistent command names

Severity: Low

Status: Confirmed repeatable

## Summary

The published science domain docs and picker help show canonical/full calls using `science.chemicalElement.*` and `science.unit.*`, while the selectable picker commands and normalized schema text use `chemicalElement.*` and `unit.*` without the `science.` prefix. Runtime normalizes the docs form and generates data, so this is a docs/help naming consistency defect rather than a hard generation failure.

## Steps to Reproduce

1. Open https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/science/.
2. Observe examples such as `science.chemicalElement.name` and canonical `awd.domain.science.chemicalElement.name`.
3. Open the deployed generator and search the Method Picker for `science`.
4. Observe selectable commands such as `chemicalElement.name`, while help details still show `science.chemicalElement.name` as the full call.
5. Paste `science.chemicalElement.name` in text schema and preview.

## Expected Result

Docs, picker command names, help details, and normalized schema text should use one consistent command spelling, or clearly explain aliases.

## Actual Result

The user sees both `science.chemicalElement.name` and `chemicalElement.name` for the same concept. Text mode normalizes the documented form to the picker form.

## Evidence

- Screenshot: `../screenshots/defect-005-science-docs.png`
- Video: `../videos/defect-005-science-command-normalization.webm`
- Support data: `../support/defect-science-docs-evidence.json`
- Support data: `../support/science-runtime-compare.json`

## Notes for Fix Agent

Decide whether `science.` is an alias or obsolete namespace. Then align docs, picker tile command names, full-call examples, and normalization behavior.
