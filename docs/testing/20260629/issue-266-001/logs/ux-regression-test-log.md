# UX/usability and workflow regression exploratory log - subagent D

Session: issue-266-001
Date: 2026-06-29
Tester lane: D - UX/usability and workflow regression
Target: https://eviltester.github.io/grid-table-editor/site/
Scope guardrail: deployed-only public GitHub Pages app/generator/docs pages. No local build, test, or package commands.

## Charter

Focus on generator, method-picker, help, schema editor, params editor, stored/schema related flows, and related app.html workflows. Exercise keyboard, focus, cancel, apply, search, navigation, and help behavior where visible, including how those flows interact with grid/test-data work.

## Techniques and heuristics

- Charter-based exploratory testing with clean-state retries for suspicious behavior.
- CRUD/state-transition heuristics for schema rows, params, stored schemas, generated data, and app grid edits.
- Keyboard/focus heuristics: Tab order, Enter/Escape activation, modal focus containment, visible focus, and post-dialog focus return.
- Navigation/history heuristics: public site links, docs/help routing, browser back/forward, and deep app/generator pages.
- Search/filter heuristics for method picker discovery, empty results, typed selection, and cancellation.
- Data integrity heuristics: generator/schema changes should be reflected in generated grid/test-data output without stale or hidden state.
- UX regression watchpoints from prior deployed reviews: semantic-invalid parameter handling, misleading optional/required labels, and mobile/accessibility rough edges.

## Coverage plan

1. Public site navigation and live browser proof.
2. Generator method-picker search, help, keyboard, cancel/apply.
3. Generator schema editor and params editor interactions.
4. Stored schema / schema loading and persistence-style flows visible in deployed app.
5. app.html grid/test-data workflows that consume or expose schema/method choices.
6. Docs/help navigation and discoverability from public pages.
7. Narrow/mobile or constrained viewport pass if time permits.

## Running notes

- Log file was absent at start, so this file begins the append-only lane log.
- Existing session folder already had other lane artifacts; this lane will write support artifacts using the `ux-regression-` prefix only.

---

## 2026-06-29 subagent D execution notes

### Environment and proof

- Used deployed public pages only:
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/site/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- Did not run local app build/test/package commands.
- Browser proof:
  - Opened public site, clicked body, captured title `AnyWayData - Data Table Editor & Generator`.
  - Saved `support/ux-regression-00-site-proof.png` and `support/ux-regression-00-site-proof.txt`.
  - Visual verification: screenshot rendered the public Docusaurus landing page, app/docs/blog nav, and "Use The Application" CTA.

### Generator and method-picker coverage

Interactions:

- Opened generator route from public nav.
- Changed first schema row:
  - Column name: `full_name`, then later `person_name`.
  - Type: `faker`.
  - Opened `Select faker command` method picker.
- Searched method picker for `firstName`.
  - Result list narrowed to `helpers.fake` because `firstName` appeared in that method's usage example.
  - Applied `helpers.fake` once without params; preview output remained empty, consistent with invalid/missing required params.
- Clean retry:
  - Opened picker, searched `person`, pressed `Escape`.
  - Overlay closed and focus returned to `Select faker command`.
  - Reopened picker, selected `person` category, picked `person.firstName`, applied.
  - Set preview item count to `3`; preview produced CSV:

```text
"person_name"
"Lelia"
"Todd"
"Meghan"
```

Evidence:

- `support/ux-regression-03-faker-row-before-picker.png`
- `support/ux-regression-04-method-picker-open.png`
- `support/ux-regression-08-method-picker-escape-intercept-state.png`
- `support/ux-regression-09-method-picker-search-firstName.png`
- `support/ux-regression-13-method-picker-escape-repeat.png`
- `support/ux-regression-16-valid-person-preview.png`

Suspicious but not confirmed:

- First method-picker Escape/reopen attempt left the overlay visible across the full viewport and pointer events intercepted clicks to the underlying picker button. Active focus was on the preview grid filter behind the modal. Clean repeat did not reproduce; treat as a follow-up risk, not a confirmed defect.
- Search discoverability may be confusing: searching `firstName` surfaced `helpers.fake` via example text rather than a direct `person.firstName` result. This may be intentional broad search, but it is worth checking whether result ranking should prefer command names over examples.

### Params editor coverage

Interactions:

- Opened params editor for `person.firstName`.
- Verified centered modal opens with focus in the value input for optional `sex`.
- Cancel left params unchanged.
- Escape returned focus to the params edit button.
- Reopened, entered `female`, applied.
- Schema params field updated to `(sex="female")`.
- Preview count `5` produced plausible female first names:

```text
"person_name"
"Beulah"
"Madyson"
"Vicky"
"Sheila"
"Leticia"
```

Evidence:

- `support/ux-regression-17-params-editor-open.png`
- `support/ux-regression-18-params-editor-after-cancel.png`
- `support/ux-regression-20-params-editor-viewport-open.png`
- `support/ux-regression-22-params-applied-preview.png`

Notes:

- The `Req` column displayed an unchecked checkbox for optional `sex`; I did not see the optional param mislabeled as required in this path.
- Params editor modal focus and apply/cancel behavior looked usable in this focused pass.

### Schema editor and stored-schema coverage

Interactions:

- Entered regex schema row:
  - Column name: `simple_code`.
  - Type: `regex`.
  - Value: `[A-Z]{2}[0-9]{2}`.
- Initial validation briefly showed `Row 1: regex value is required` while the value field was visibly populated; after blur/tab, the message cleared.
- Expanded `Managed Stored Schemas (0)`.
- Clicked visible `Save Schema As`.
- Dialog opened, focus landed in schema name input.
- Saved as `uxRegressionSchemaD`.
- Managed section updated to `Managed Stored Schemas (1)` and displayed saved-schema controls.
- Tested the `Load Saved Schema` entry point enough to learn it opens a `Saved Schemas` chooser with `Load`, `Rename`, `Delete`, and `Close`.

Evidence:

- `support/ux-regression-35-save-repeat-before-click.png`
- `support/ux-regression-38-regex-value-validation-after-blur.png`
- `support/ux-regression-42-managed-stored-expanded.png`
- `support/ux-regression-43-managed-save-schema-modal.png`
- `support/ux-regression-44-managed-save-after-ok.png`
- `support/ux-regression-47-load-saved-schema-restored.png`
- `support/ux-regression-51-stored-state-after-close.png`

Invalid / interrupted attempts:

- I initially targeted the collapsed `Managed Stored Schemas` disclosure as if it were `Save Schema As`; corrected after screenshot review.
- I accidentally clicked general `Load Schema File` and row `Remove field` while trying to target stored-schema load/delete controls; results from that attempt are invalid for stored-schema load/delete.
- A later saved-schema chooser `Load` attempt timed out and reset the browser kernel before I could capture a reliable result. Treat load-from-chooser and delete/rename as gaps needing follow-up.

Suspicious but not confirmed:

- Hidden zero-sized `role="dialog" aria-modal="true"` text-input dialog elements were present in the DOM when no visible dialog was open. This confused role-based automation more than once. Needs accessibility confirmation with a screen reader/accessibility tree before filing.

### app.html workflow coverage

Interactions:

- Opened public `site/app.html`.
- Opened help on the app page and captured state.
- Added one grid row.
- Edited the first cell to `alpha`; total rows changed to `1`.
- Accidentally clicked the grid-to-text arrow rather than export preview; confirm modal opened:
  - Title/body: `Set Text From Grid` / `Do you want to Set Text From Grid?`
  - Cancel closed the modal.
  - Row remained present after cancel.

Evidence:

- `support/ux-regression-53-app-help-open.png`
- `support/ux-regression-54-app-add-row-preview.png`
- `support/ux-regression-58-app-backdrop-intercept-state.png`
- `support/ux-regression-59-app-after-set-text-cancel.png`

Invalid / not claimed:

- The attempted export preview click did not find a visible exact `Preview` button in the resumed app run, so no export-preview result is claimed.
- Reset Table was not tested because the earlier mis-targeted confirm modal blocked that branch until cancelled.

### Docs/help/navigation/mobile coverage

Interactions:

- Opened `site/docs/intro`.
- Captured docs intro page and collected 14 relevant docs/app/generator/schema-style links from the public docs page.
- Opened generator at mobile viewport `390x844`.
- Measured `documentElement.scrollWidth === 390`, so no page-level horizontal overflow at that viewport in the initial generator state.

Evidence:

- `support/ux-regression-61-docs-intro.png`
- `support/ux-regression-62-generator-mobile.png`
- `support/ux-regression-59-app-docs-mobile-results.txt`

### Suspected defects / risks for main-agent confirmation

1. Potential modal focus leak in method picker:
   - First run left method-picker overlay open while focus was on the preview grid filter behind the modal.
   - Clean repeat of Escape closed correctly, so this is suspicious/non-repeatable.
2. Potential accessibility issue from hidden zero-sized modal dialogs:
   - Hidden `role="dialog" aria-modal="true"` elements stayed in DOM with zero rectangles.
   - Role-based automation was confused by these; needs accessibility-tree or screen-reader-oriented confirmation.
3. Method picker search ranking/discoverability:
   - Searching `firstName` returned `helpers.fake` because examples mention `person.firstName`, while direct `person.firstName` required navigating to the `person` category.
   - This may be by design but could be a UX regression if users expect command-name search first.
4. Regex field validation timing:
   - `Row 1: regex value is required` appeared while `[A-Z]{2}[0-9]{2}` was visible in the value field, then cleared after blur.
   - Looks like validation-on-change timing; not confirmed as a defect.
5. Stored-schema chooser load/delete not completed:
   - Save path passed after expansion, but chooser `Load`, `Rename`, and `Delete` need a clean retest because my first load/delete targeting attempts were invalid and one chooser-load attempt timed out.

### Coverage gaps

- Did not file defect markdown files, per instruction.
- Did not complete stored-schema chooser `Load`, `Rename`, and `Delete`.
- Did not complete app export preview, Reset Table OK path, or Generate-to-grid in `app.html`.
- Did not test file import/export because charter constrained to visible deployed workflows and time was spent on picker/schema/storage behavior.
- Did not run a screen reader; accessibility observations are DOM/focus/browser-automation based.
- Did not test multiple browsers.

### Follow-up ideas

1. Repeat the method-picker focus-leak scenario with a trace: open picker, search, Escape, immediately click the underlying picker button, then inspect active element and overlay count.
2. Run an accessibility-tree pass on hidden modal/backdrop elements and verify whether closed dialogs are exposed as `aria-modal`.
3. Add a method-picker search-ranking test matrix: `firstName`, `person.first`, `email`, `uuid`, `array`, `country`, and `recent`.
4. Retest stored-schema chooser from a clean browser profile: save, close/reopen page, load saved schema, rename, delete, cancel delete, confirm delete.
5. Retest app grid/test-data chain deliberately: add/edit grid row, Set Text From Grid OK, edit text, Set Grid From Text OK, export preview, Reset Table cancel/OK.
6. Check keyboard-only path for generator: Tab from schema name to type to method picker, open with Enter/Space, search, select result, apply, and verify focus return.
7. Verify mobile method picker and params editor at 390px: overlay fit, scrolling, Apply/Cancel visibility, and no control clipping.
8. Test validation timing in schema editor with regex, literal, enum, domain, and faker rows to see whether messages clear consistently on input/change/blur.
