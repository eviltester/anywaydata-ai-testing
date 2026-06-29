# Subagent F - Grid Generation Interplay Test Log

Session: 2026-06-29  
Target: eviltester/grid-table-editor issue #266  
Scope: deployed-only exploratory review using:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- published docs/help under `https://eviltester.github.io/grid-table-editor/site/`

Out of scope: local build/test/package commands; defect-file creation; preview/export coverage except where needed to set or observe grid state.

## Charter

Concentrate on the interaction between the app data grid, grid features, and test data generation. Test generation into empty/existing grids, column names, selected rows/amend flows if present, filters/sorts with generated data, row counts, unique column names, grid-to-schema or schema-to-grid interactions, reset/clear flows, and whether generation respects grid shape/state.

## Running Notes

### Environment and Constraints

- Browser automation: Playwright against system Chrome.
- Browser proof captured:
  - `../support/grid-generation-app-initial-browser-proof.png`
  - `../support/grid-generation-help-browser-proof.png`
  - `../support/grid-generation-generator-initial-browser-proof.png`
- No local build, test, or package commands were run.
- No defect files were created.

### Techniques / Heuristics

- Started from the deployed app and used the visible UI controls for state changes.
- Used rendered-grid DOM reads only to record exact observed headers, cells, selected rows, sort/filter state, and row-count text after actions.
- Rechecked one suspected filter/generation problem from a fresh value in the same session.
- Captured screenshots at each meaningful state transition and saved scenario JSON for exact row/header data.
- Used app in-page help text to distinguish observed behavior from documented control wording. Relevant help captured in `../support/grid-generation-app-help-texts.json`.

### Scout Notes

- `app.html` starts with one empty grid column titled `~rename-me` and `Total rows: 0`.
- Test Data panel exposes:
  - `Generate`
  - `Grid to Enum Schema`
  - `How Many?`
  - generation modes: `New Table`, `Amend Table`, `Amend Selected`
  - row-based schema editor and `Edit as Text`
- The generation help says: "Generate data from the current schema directly into the grid."
- The grid-to-schema help says it scans the current grid and builds an enum-only schema from visible column values.
- `generator.html` has a shared schema editor plus `Generate Data`, output options, and preview.

### Scenario 1 - Generate into Empty / Default Grid

Support:

- `../support/grid-generation-new-table-3rows.png`
- `../support/grid-generation-scenario-01-new-table.json`

Steps:

1. Opened `app.html`.
2. Opened `Test Data`.
3. Entered schema:
   - `CaseId` -> `regex(TC-[0-9]{2})`
   - `Status` -> `regex((active|blocked|pending))`
4. Set `How Many?` to `3`.
5. Selected `New Table`.
6. Clicked `Generate`.

Observed:

- Grid headers changed from `~rename-me` to `CaseId`, `Status`.
- 3 rows were generated.
- Row counter showed `Total rows: 3`.
- Example generated cells:
  - `TC-28`, `active`
  - `TC-86`, `blocked`
  - `TC-58`, `pending`

Assessment: healthy baseline. Generation into an empty/default grid replaces the grid shape with the schema shape and honors `How Many?`.

### Scenario 2 - Amend Existing Grid with Added Schema Column

Support:

- `../support/grid-generation-amend-table-existing-grid.png`
- `../support/grid-generation-scenario-02-amend-table.json`

Steps:

1. Started from the generated 3-row `CaseId` / `Status` grid.
2. Added a third schema field:
   - `Priority` -> `regex((P1|P2|P3))`
3. Set `How Many?` to `5`.
4. Selected `Amend Table`.
5. Clicked `Generate`.

Observed:

- Grid gained a new `Priority` column.
- Existing row count remained 3, despite `How Many? = 5`.
- All existing rows were regenerated/amended with new values.
- Row counter stayed `Total rows: 3`.

Assessment: likely intended distinction. `Amend Table` appears to operate over existing rows rather than generating the requested row count.

### Scenario 3 - Amend Selected Row

Support:

- `../support/grid-generation-amend-selected-one-row.png`
- `../support/grid-generation-scenario-03-amend-selected.json`

Steps:

1. Clicked the second visible grid row to select it.
2. Set `How Many?` to `10`.
3. Selected `Amend Selected`.
4. Clicked `Generate`.

Observed:

- Only the selected row changed.
- Non-selected rows retained their previous values.
- Row count remained 3.
- The selected row remained selected after generation.

Suspicious note:

- Immediately after selecting the row and before generation, the selected row's `Status` cell was observed blank in the DOM capture, then after `Amend Selected` it contained a generated value again. I did not repeat this enough to call it a defect; it may be a cell-focus/rendering artifact from the row click.

Assessment: selected-row amend behavior mostly matched the expected "only selected rows" model.

### Scenario 4 - Filtered Grid plus Amend Table

Support:

- `../support/grid-generation-filtered-amend-table-before-clear.png`
- `../support/grid-generation-filtered-amend-table-after-clear.png`
- `../support/grid-generation-filtered-amend-repeat.png`
- `../support/grid-generation-scenario-04-filter-amend.json`
- `../support/grid-generation-scenario-04-filter-amend-repeat.json`

Steps, first pass:

1. Set global grid filter to `TC-49`.
2. Confirmed only the row with `CaseId = TC-49` was visible.
3. Selected `Amend Table`.
4. Clicked `Generate`.
5. Observed grid before clearing filters.
6. Clicked `Clear Filters`.
7. Observed all rows.

Observed, first pass:

- Filter box still contained `TC-49`.
- Visible amended row changed from `TC-49` to `TC-50`.
- The row remained visible even though it no longer matched the filter text.
- Clearing filters revealed the full 3-row table.

Repeat attempt:

1. Used the current first row value `TC-50` as the filter.
2. Confirmed only `TC-50` row was visible.
3. Ran `Amend Table` again.

Observed, repeat:

- Filter box still contained `TC-50`.
- Visible amended row changed to `TC-11`.
- The row remained visible even though it no longer matched `TC-50`.

Suspected defect for main agent confirmation:

- Active global filter is not reapplied after generated/amended data changes. The UI can show a row that no longer matches the still-visible filter text. This repeated twice with different filter values.

### Scenario 5 - Sorted Grid plus Amend Table

Support:

- `../support/grid-generation-sort-amend-table.png`
- `../support/grid-generation-scenario-05-sort-amend.json`

Steps:

1. Cleared filters.
2. Applied descending sort to `CaseId`.
3. Ran `Amend Table`.
4. Observed row order and column sort metadata.
5. Used toolbar `Clear Sort`.

Observed:

- After generation, `CaseId` still reported `aria-sort = descending`.
- Visible row order matched descending `CaseId` order, e.g. `TC-91`, `TC-22`, `TC-11`.
- `Clear Sort` changed the row order back away from sorted order.

Assessment: sort state appeared to be maintained/reapplied more consistently than filter state.

### Scenario 6 - Duplicate Column Names and Unique Column Names Toggle

Support:

- `../support/grid-generation-duplicate-names-unique-on.png`
- `../support/grid-generation-duplicate-names-unique-off.png`
- `../support/grid-generation-scenario-06-duplicate-column-names.json`

Schema used:

```text
Dup
regex([A-C])
Dup
regex([1-3])
```

Steps:

1. Reset app.
2. Checked `Unique Column Names`.
3. Used schema text mode with duplicate `Dup` fields.
4. Generated 2 rows.
5. Reset app.
6. Unchecked `Unique Column Names`.
7. Used the same schema.
8. Generated 2 rows.

Observed:

- With `Unique Column Names` checked, generated grid headers were still `Dup`, `Dup`.
- With `Unique Column Names` unchecked, generated grid headers were also `Dup`, `Dup`.
- Both generated columns retained separate data fields internally (`column1`, `column2`), and both displayed data.

Suspected behavior question:

- If `Unique Column Names` is intended to apply to generation, it does not appear to enforce unique generated header names. If the toggle is only intended for import/manual grid editing, then this is a documentation/discoverability gap rather than a generation defect.

Setup friction note:

- In two automated attempts, clicking `+ Add Field` did not immediately add a second row before timeout. A later direct click did add a row. I used schema text mode to finish duplicate-name coverage. This needs manual confirmation before treating it as a UI bug.

### Scenario 7 - Grid to Enum Schema, Then Regenerate

Support:

- `../support/grid-generation-grid-to-schema-modal-state.json`
- `../support/grid-generation-grid-to-schema-after-build.png`
- `../support/grid-generation-regenerate-from-grid-enum-schema.png`
- `../support/grid-generation-scenario-07-grid-to-schema.json`

Steps:

1. Started from duplicate-header generated grid:
   - headers `Dup`, `Dup`
   - rows similar to `C,2` and `A,2`
2. Clicked `Grid to Enum Schema`.
3. Observed modal:
   - title `Grid to Enum Schema`
   - text included `largest Column has 2 unique values`
   - field value `2`
   - action `Build Schema`
4. Clicked `Build Schema`.
5. Observed schema text.
6. Generated 4 new rows from the resulting enum schema.

Observed:

- Built schema:

```text
Dup
enum("C","A")
Dup
enum("2")
```

- Regenerated grid still had duplicate headers `Dup`, `Dup`.
- Regenerated data respected enum values from the previous visible grid:
  - first `Dup`: `A` or `C`
  - second `Dup`: `2`

Assessment: grid-to-schema conversion works with duplicate headers by preserving duplicate names and using positional columns. This is useful but may compound ambiguity if users expect unique generated column names.

### Scenario 8 - Reset / Clear Flow

Support:

- `../support/grid-generation-reset-table-after-generated.png`
- `../support/grid-generation-scenario-08-reset-table.json`

Steps:

1. From generated data, clicked `Reset Table`.
2. Confirmed modal:
   - `Are you sure you want to reset the table and all data?`
3. Clicked `OK`.

Observed:

- Grid returned to one empty column titled `~rename-me`.
- Row counter returned to `Total rows: 0`.
- Generation mode reset to `New Table`.

Assessment: reset flow worked as expected.

### Scenario 9 - Generator Page Parity Check

Support:

- `../support/grid-generation-generator-parity-preview.png`
- `../support/grid-generation-generator-generate-data-generated-data.csv`
- `../support/grid-generation-scenario-09-generator-parity.json`
- `../support/grid-generation-scenario-09-generator-download.json`

Steps:

1. Opened `generator.html`.
2. Used schema text:

```text
CaseId
regex(TC-[0-9]{2})
Status
regex((active|blocked|pending))
```

3. Set `Generate Rows` to `3`.
4. Clicked `Preview`.
5. Clicked `Generate Data` and saved the downloaded CSV.

Observed:

- Preview output showed 10 rows because `Preview Items Count` remained `10`.
- Downloaded CSV contained exactly 3 generated data rows plus header:

```csv
"CaseId","Status"
"TC-58","blocked"
"TC-98","blocked"
"TC-79","pending"
```

Assessment: generator page uses the same schema syntax successfully. Preview count and generation row count are independent; that may be expected, but it is easy to misread when comparing app generation and generator-page output.

## Suspected Defects / Risks for Main Agent Confirmation

1. Active global filter is not reapplied after `Amend Table` changes data. Repeated twice: filter text remained `TC-49`/`TC-50`, while the still-visible amended row changed to `TC-50`/`TC-11`.
2. `Unique Column Names` does not make generated duplicate schema headers unique. Needs expectation check because the toggle may not be intended for generation.
3. `+ Add Field` sometimes did not add a schema row in automated user-like attempts, then worked on a later click. Needs manual repeat before filing.
4. Selecting a row before `Amend Selected` produced one DOM capture where the selected row's `Status` cell appeared blank before generation. Needs repeat; may be focus/rendering rather than data loss.
5. `Grid to Enum Schema` preserves duplicate header names through schema creation and regeneration. This may be acceptable positional behavior, but it creates an ambiguous schema/grid round trip when duplicate names are present.

## Coverage / Gaps

- Covered:
  - generation into default empty grid
  - generation into existing grid
  - add-column amend flow
  - selected-row amend flow
  - filter plus amend flow with repeat
  - sort plus amend flow
  - duplicate column-name generation
  - grid-to-enum-schema and schema-to-grid regeneration
  - reset table flow
  - generator.html schema/generation parity
- Not covered:
  - n-wise `Generate Combinations`
  - import/export beyond necessary generator download observation
  - schema constraints with generated app-grid data
  - multi-row selection with `Ctrl`/range selection
  - column rename/delete/duplicate toolbar interactions followed by generation
  - mobile/responsive behavior
  - accessibility review of generation controls

## Follow-Up Ideas

1. Confirm manually whether the global filter should re-run after generated/amended data mutation, then file a defect if the repeated behavior is unintended.
2. Clarify whether `Unique Column Names` is meant to apply to generated schema headers; if yes, add a regression around duplicate schema names.
3. Test `Amend Selected` with multiple selected rows, including non-contiguous selection and selected rows hidden by filters.
4. Test column toolbar edits, especially rename/duplicate/delete, then generate with matching and non-matching schema field names.
5. Test `Grid to Enum Schema` after filtering: confirm whether "visible column values" means filtered-visible rows only and whether that is documented clearly.
6. Test generation with schema constraints into an existing grid to see whether constraints reference old row values, newly generated row values, or only schema-generated values.
7. Test very high `How Many?` values in `New Table` versus `Amend Table` to verify performance and row-count semantics.
8. Test duplicate generated headers with export/import round trip to see whether duplicate names cause data loss or column collapse outside the grid UI.
9. Test preview auto-sync after app grid generation to confirm whether generated grid changes propagate to import/export preview consistently.
10. Compare app `Generate` and generator `Generate Data` output for the same schema and row count using deterministic/simple rules, especially enum and literal fields.

