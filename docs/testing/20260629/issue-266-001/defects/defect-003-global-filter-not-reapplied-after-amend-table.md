# Defect 003 - active global filter is not reapplied after Amend Table changes generated data

## Summary

When a global grid filter is active, `Amend Table` can change the visible row so that it no longer matches the filter text. The row remains visible and the status still reports one filtered-visible row.

## Environment

- Deployed app: `https://eviltester.github.io/grid-table-editor/site/app.html`
- Date tested: 2026-06-29

## Repeatability

Repeatable. The grid-generation subagent repeated it twice with generated `TC-*` values; the main-agent confirmation repeated it with deterministic `autoIncrement.sequence` values.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/site/app.html`.
2. Open `Test Data`.
3. Click `Edit as Text`.
4. Generate a new table with:

```text
CaseId
autoIncrement.sequence(1,1)
Status
datatype.enum("active","blocked")
```

5. Set `How Many?` to `3`.
6. Click `Generate`.
7. Enter `2` in the global grid `Filter` box. Confirm only the `CaseId = 2` row is visible.
8. Replace the schema with:

```text
CaseId
autoIncrement.sequence(100,1)
Status
datatype.enum("active","blocked")
```

9. Select `Amend Table`.
10. Click `Generate`.

## Observed

- The filter box still contains `2`.
- The visible row changes to `CaseId = 100`.
- `100` does not match the active filter text `2`.
- The status still reports `Total rows: 3 | Filtered Visible: 1`.

![Filter not reapplied after amend](../screenshots/defect-filter-amend-not-reapplied.png)

Video: [defect-filter-amend-not-reapplied.webm](../videos/defect-filter-amend-not-reapplied.webm)

## Expected

After generated/amended data changes, the active global filter should be reapplied. In this reproduction, no rows should remain visible for filter `2` after the visible row changes to `100`.

## Notes For Fix Investigation

Sort state appeared to reapply more consistently in subagent testing. The likely gap is filter refresh/reapplication after generated row mutation in the `Amend Table` path.
