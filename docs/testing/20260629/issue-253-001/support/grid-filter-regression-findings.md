# Grid/Filter And Duplicate-Column Regression Lane

## Scope

- Target PR: `#285` (`Fix auto defect regressions`), resolved because user-supplied PR `#295` was not available.
- Target issue family: `#253`, plus PR-linked issues `#268`, `#269`, and `#270`.
- Deployed surfaces only:
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/site/docs/`
- Evidence:
  - `support/grid-filter-regression-run.json`
  - `screenshots/grid-filter-regression-001-app-loaded.png` through `screenshots/grid-filter-regression-014-docs-scout.png`
  - `logs/grid-filter-regression-test-log.md`

## Techniques

- Risk-based exploratory testing from PR #285 changed files.
- Stateful grid workflow testing around active filters and generated-data mutation.
- Boundary-style deterministic data generation using `autoIncrement.sequence`.
- Before/after oracle checking using visible filtered rows plus full-grid inspection after clearing filters.
- Duplicate-column copy consistency checks across visible grid cells, filter behavior, CSV preview, and clipboard readback.
- Deployed link smoke checks for app, generator, and docs routes.

## Grid Workflows

- Opened the deployed app and explicitly opened the collapsed Test Data panel.
- Used schema text mode to generate deterministic `CaseId` values.
- Used global grid filter input, `Clear Filters`, `Generate`, `New Table`, `Amend Table`, duplicate-column header control, CSV preview, and Copy.
- Did not run local build, verify, package-manager, or repo test commands.

## Filters Applied

- `202` against generated rows `100` through `104`, then retained through new-table replacement to rows `200` through `204`.
- `2` against generated rows `2` and `3`, then retained through an amend-table mutation that changed the visible `2` row to `100`.
- `11` against duplicated `CaseId` / `CaseIdCopy` rows `10`, `11`, and `12`.

## Generation And Amendment Actions

- New-table baseline: `CaseId` with `autoIncrement.sequence(start=100,step=1)`, 5 rows.
- Filter-preserved replacement: active filter `202`, then `autoIncrement.sequence(start=200,step=1)`, 5 rows, `New Table`.
- Amend-table baseline: `CaseId` with `autoIncrement.sequence(start=2,step=1)`, 2 rows.
- Filter-preserved amendment: active filter `2`, then `autoIncrement.sequence(start=100,step=1)`, 1 row, `Amend Table`.

## Duplicate And Copy Checks

- Generated `CaseId` values `10`, `11`, and `12`.
- Used header `Duplicate column`, entered `CaseIdCopy` in the naming dialog, and verified copied values:
  - `10`, `10`
  - `11`, `11`
  - `12`, `12`
- Applied global filter `11`; one visible row remained with both values `11`.
- CSV preview contained:

```csv
"CaseId","CaseIdCopy"
"10","10"
"11","11"
"12","12"
```

- Clipboard readback matched the CSV preview after normalizing line endings (`LF` preview text, `CRLF` clipboard text).

## Results

- Active global filters were preserved and reapplied after new-table replacement.
- Active global filters were preserved and reapplied after amend-table mutation.
- Clearing filters revealed the expected full underlying data after each mutation.
- Duplicate-column behavior copied visible cell values into the new column.
- Duplicate-column data remained filterable.
- CSV preview and clipboard copy preserved duplicated headers and copied values.
- Generator and docs deployed links loaded during this lane's scoped smoke check.

## Defects Or Suspicious Behavior

No repeatable grid/filter or duplicate-column regression defects were found in this lane.

Observed but not filed:
- A Tabulator initialization warning appeared once in console output during automation. It was not tied to a visible failure in the tested workflows.
- A generic 403 resource response was identified as a Google ad request on the docs page. It was outside the grid/filter regression behavior under review.
- The CSV preview text and clipboard text used different line endings, but normalized content matched. This was not treated as a defect.

## Deferred Ideas

- Repeat the same filter-preservation checks with multi-column generated schemas and mixed domain/faker commands.
- Add an `Amend Selected` variant with selected rows and an active global filter.
- Exercise column-specific header filters, not only the global filter input.
- Repeat duplicate-column copy/export checks with duplicate source names while `Unique Column Names` is unchecked.
- Test import-driven bulk replacement while a global filter is active.
- Run a narrow mobile viewport pass specifically around the grid header icons and filter controls.
