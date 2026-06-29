---
## 2026-06-29T22:11:02+01:00

- What you think you want to do and why

Start the grid/filter and duplicate-column regression lane by scouting the deployed app surface and confirming the controls needed for PR #285's grid-specific risk areas. This lane needs to focus on active filter preservation after generated or bulk mutations, plus duplicate-column copy/export behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/app.html` in Chromium through Playwright Core using the deployed page only. Inspected visible controls, data roles, grid buttons, Test Data controls, schema text area, generation modes, duplicate-column header control, global filter input, and import/export preview controls. Saved `screenshots/grid-filter-regression-001-app-scout.png`.

the observations and results that you make

The deployed app exposes the required lane controls: global filter input, clear filters, generation modes `New Table`, `Amend Table`, and `Amend Selected`, the schema text editor, Tabulator header controls including `Duplicate column`, and CSV/text preview/copy controls. The Test Data panel starts collapsed, so subsequent steps explicitly open it before interacting with generation controls.

---
## 2026-06-29T22:18:06+01:00

- What you think you want to do and why

Exercise the PR #285 filter-preservation behavior with generated-data replacement and amendment, because the PR changed the Tabulator adapter to reapply active filters after bulk/generated mutations.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed app at `https://eviltester.github.io/grid-table-editor/site/app.html`. Opened the Test Data panel, switched the schema editor to text mode, and generated `CaseId` data with `autoIncrement.sequence`.

Workflow 1, new-table replacement:
- Generated 5 rows from `CaseId` / `autoIncrement.sequence(start=100,step=1)`.
- Applied global filter `202`, leaving no visible rows in the `100` through `104` dataset.
- Changed schema to `autoIncrement.sequence(start=200,step=1)`.
- Generated a new 5-row table while the `202` filter was still active.
- Cleared the filter afterward to inspect the full underlying dataset.

Workflow 2, amend-table mutation:
- Generated 2 rows from `CaseId` / `autoIncrement.sequence(start=2,step=1)`.
- Applied global filter `2`, leaving only the `2` row visible.
- Changed schema to `autoIncrement.sequence(start=100,step=1)`.
- Generated in `Amend Table` mode with row count `1` while the `2` filter was still active.
- Cleared the filter afterward to inspect the full underlying dataset.

Saved screenshots `grid-filter-regression-002-new-table-baseline.png` through `grid-filter-regression-008-clear-filter-after-amend.png` and structured observations in `support/grid-filter-regression-run.json`.

the observations and results that you make

Workflow 1 passed. Before replacement, filter `202` showed 0 visible rows from total rows 5. After the new-table replacement, the filter value remained `202`, total rows remained 5, and exactly one visible row, `202`, was shown. After clearing the filter, the full dataset was `200`, `201`, `202`, `203`, `204`.

Workflow 2 passed. Before amendment, filter `2` showed one visible row from total rows 2. After amendment, the filter value remained `2`, total rows stayed 2, and the visible row count changed to 0. After clearing the filter, the full dataset showed `100` and `3`, confirming the amended row no longer matched the active filter and the filter had been reapplied.

---
## 2026-06-29T22:19:50+01:00

- What you think you want to do and why

Cover the related duplicate-column/copy regression behavior from PR #285 and check nearby deployed app/generator/docs links without creating final defect files unless a repeatable defect is found.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed app at `https://eviltester.github.io/grid-table-editor/site/app.html`. Generated `CaseId` rows from `autoIncrement.sequence(start=10,step=1)`, used the header `Duplicate column` control, completed the naming dialog with `CaseIdCopy`, filtered the duplicated grid with global filter `11`, cleared filters, switched preview to CSV, accepted the `Set Text From Grid` confirmation, clicked `Copy`, and read browser clipboard text back through the automated browser context. Also opened `https://eviltester.github.io/grid-table-editor/generator.html` and `https://eviltester.github.io/grid-table-editor/site/docs/` as deployed link checks.

Saved screenshots `grid-filter-regression-009-duplicate-baseline.png` through `grid-filter-regression-014-docs-scout.png`. Saved structured run data to `support/grid-filter-regression-run.json`.

the observations and results that you make

Duplicate-column behavior passed. The duplicate action created `CaseIdCopy`; visible grid rows became `10/10`, `11/11`, and `12/12`. With global filter `11`, exactly one visible row remained and both duplicated values were `11`. CSV preview after clearing the filter contained headers `"CaseId","CaseIdCopy"` and all three copied rows. Clipboard readback matched the preview after normalizing line endings.

No page errors were captured. One Tabulator initialization warning and generic failed-resource console messages appeared; the only identified non-OK response in the final run was a 403 from a Google ad request on the docs page, so this was not treated as a grid/filter regression defect. The deployed generator and docs pages loaded for the scoped link check.

---
