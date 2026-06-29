## Summary

In the generator schema row, pressing Tab from the first Column Name field does not proceed through the primary row data-entry controls in a predictable order. It moves to the page/body and row action controls before the main field type/value controls.

## Steps

1. Open https://eviltester.github.io/grid-table-editor/generator.html.
2. Focus the first schema row Column Name input.
3. Press Tab repeatedly.
4. Observe the focused element sequence.

## Observed

The repeated focus sequence began:

`	ext
Column Name input
BODY
Drag field to reorder
Insert field after this row
Remove field
...
`

## Expected

Tab should move through the row's primary editing controls in a predictable data-entry order, such as Column Name -> Field type -> command/value/params controls -> additional row controls.

## Evidence

- Defect report: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/defects/defect-004-schema-row-tab-order.md
- Screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-004-schema-row-tab-order.png
- Video: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/videos/defect-004-schema-row-tab-order.webm
