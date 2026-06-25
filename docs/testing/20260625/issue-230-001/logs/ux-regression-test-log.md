# UX Regression Testing Lane Log

Scope: GitHub issue #230 / PR #247 deployed environment review. Deployed environment only: <https://eviltester.github.io/grid-table-editor/> plus published app/help/docs pages under <https://eviltester.github.io/grid-table-editor/>.

Charter: UX/usability and workflow regression in the generator, method-picker, help, and related flows. Focus areas: dialog open/close/apply/cancel/backdrop/escape, search, tabs, recent methods, keyboard shortcuts `/` and Enter, focus restoration, selected command continuity, help panel readability, generator workflow after method selection, and app integration.

Constraints honored: no app code edits, no local build/test/verify commands, no package-manager/repo test commands. This lane writes only session artifacts under `docs/testing/20260625/issue-230-001/`.

Techniques and heuristics: exploratory testing, risk-based testing from the changed method-picker/story surfaces, state/flow modeling for picker dialogs and generator row workflows, consistency/oracle checks between visible picker help and published help/docs pages, keyboard accessibility heuristics, focus-management heuristics, modal/dialog behavior heuristics, negative UX observation for cancel/escape/backdrop cases, and workflow continuity testing across standalone generator and embedded app surfaces.

---
## 2026-06-25 22:40:00 +01:00

- What you think you want to do and why

Establish this delegated UX lane, mirror the session log structure from `issue-230-test-log.md`, and prove browser interaction against the deployed environment before substantive testing. This creates a clean evidence baseline for dialog and workflow observations.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Prepared `logs/ux-regression-test-log.md` under `docs/testing/20260625/issue-230-001/`. The planned surfaces are the deployed landing page, `app.html`, `generator.html`, method picker dialog, help/dialog content, and published docs/help links reachable from the live UI. Browser proof is next.

the observations and results that you make

The UX lane is scoped and ready. No substantive application testing has been performed yet in this lane.

---
## 2026-06-25 22:43:00 +01:00

- What you think you want to do and why

Prove browser control and capture a scout inventory before testing dialog and workflow regressions. This validates that later observations are from the deployed environment, not inferred from code or local tests.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened a dedicated headless Chrome session against `https://eviltester.github.io/grid-table-editor/`. Confirmed the landing page title `Grid Table Editor Test Environment`, captured the branch/commit/build card, clicked the visible `Open app.html` link, and confirmed navigation to `https://eviltester.github.io/grid-table-editor/app.html`. Then navigated to `https://eviltester.github.io/grid-table-editor/generator.html` and captured the initial generator surface. Saved support inventory to `support/ux-regression-scout.json`. Saved screenshots:

- `screenshots/ux-regression-00-browser-proof-landing.png`
- `screenshots/ux-regression-01-browser-proof-app-loaded.png`
- `screenshots/ux-regression-02-generator-initial.png`

the observations and results that you make

Browser control is confirmed and screenshots are visually inspectable. The landing page reports branch `codex/230-method-picker-mvc`, commit `04570e0e428d`, built `2026-06-25T21:29:58.356Z`. The app and standalone generator both loaded from published pages.

---
## 2026-06-25 23:01:00 +01:00

- What you think you want to do and why

Loop 1: exercise the method picker dialog mechanics from a clean standalone generator state. This targets the highest-risk MVC refactor surface: modal open/close, Escape, Cancel, backdrop, search filtering, Apply, and focus restoration.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed `https://eviltester.github.io/grid-table-editor/generator.html`. Changed the single schema row from `regex` to `domain`, clicked `Select domain command`, and captured `screenshots/ux-regression-04-method-picker-open-full.png`. Verified the picker opens as an overlay/modal headed `Select schema method`, with search focused, tab chips visible, list tiles on the left, details/help on the right, and Cancel/Apply footer actions.

Then searched `internet.httpMethod`, captured `screenshots/ux-regression-05-method-picker-search-httpmethod.png`, pressed `Enter` from the search field, canceled, reopened, selected `internet.httpMethod`, clicked outside the modal backdrop, reopened again, selected `internet.httpMethod`, and clicked `Apply`. State details were saved to `support/ux-regression-flow-results.json`.

the observations and results that you make

Working behavior:

- Opening the picker focuses the search input.
- Escape closes the picker and restores focus to `Select domain command`.
- Cancel closes the picker and restores focus to the command button.
- Backdrop click closes the picker and restores focus to the command button.
- Search for `internet.httpMethod` filters to one tile and updates the detail pane.
- Apply updates the row command to `internet.httpMethod`, enables the params edit button, and updates the row help/docs link to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`.

Defect candidate: Apply does not restore focus. After clicking `Apply`, the captured state was `activeTag: BODY`, `focusOnPickerButton: false`, while Escape/Cancel/backdrop all restored focus correctly. Wrote `defects/ux-001-apply-does-not-restore-focus.md`.

Defect candidate: `Enter` did not apply the single filtered selected result when focus was in the search field. The picker stayed open and the row command stayed empty. This was retested later with tile focus.

Suspicious UX behavior: the domain picker opens on the `All` tab with `enum` selected and details for `Enum()`, even though the row is in `domain` mode and the launcher says `Select domain command`. This may be intentional cross-mode discovery, but it is easy to read as a mismatched default.

---
## 2026-06-25 23:08:00 +01:00

- What you think you want to do and why

Loop 2: test continuity after a successful method selection, including recent methods, tab filtering, cancel behavior after selecting a different method, help/detail readability, docs consistency, generator preview, and embedded app integration.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Continued on `https://eviltester.github.io/grid-table-editor/generator.html` after applying `internet.httpMethod`. Filled column name `method`, set Generate Rows to `5`, clicked `Preview`, and captured `screenshots/ux-regression-06-generator-preview-httpmethod.png`.

Reopened the picker from the selected `internet.httpMethod` row. Checked selected-command continuity, clicked the `Recently used` tab, clicked the `string` tab, searched `string.symbol`, selected it, and captured `screenshots/ux-regression-07-method-picker-string-symbol-detail.png`. Canceled and confirmed the row stayed on `internet.httpMethod`. Reopened again, clicked the `Faker` tab, searched `helpers.mustache`, selected it for inspection only, captured `screenshots/ux-regression-08-method-picker-faker-helper-detail.png`, then canceled.

Checked the published docs page `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet` with an HTTP fetch from the workstation; it returned status `200` and contained `internet.httpMethod`.

For app integration, navigated to `https://eviltester.github.io/grid-table-editor/app.html`, opened the `Test Data` panel, selected `internet.httpMethod` through the embedded picker, set column `method`, set `How Many?` to `3`, clicked embedded `Generate`, and captured `screenshots/ux-regression-09-app-embedded-generator-httpmethod.png`.

the observations and results that you make

Working behavior:

- Standalone generator preview produced CSV output for `internet.httpMethod`, with output such as `"method"` and `"TRACE"`, and the Data Table Preview showed the `method` column.
- Reopening the picker preserved selected-command continuity: `internet.httpMethod` remained selected and the detail pane showed that method.
- `Recently used` populated with `internet.httpMethod` after apply.
- Selecting `string.symbol` and then canceling did not mutate the already applied `internet.httpMethod` row.
- `string.symbol` help remained readable despite punctuation-heavy content; parameter tables and examples remained visible.
- `helpers.mustache` on the `Faker` tab showed required `text` and `data` params and readable example content.
- The published internet domain docs page is present and contains `internet.httpMethod`.
- Embedded app integration worked: the app grid changed to a `method` column with 3 generated rows and the status message `Generate complete. Grid updated.`

Suspicious UX behavior: the picker allows navigation from a domain row to the `Faker` tab and shows faker helper details while the underlying row remains `domain` until Apply. I canceled rather than applying cross-source content. This may be intentional, but it deserves targeted follow-up because users may not understand whether Apply will switch source type or create an invalid domain row.

---
## 2026-06-25 23:14:00 +01:00

- What you think you want to do and why

Loop 3: explicitly cover keyboard shortcuts and generate follow-up ideas from uncovered edges before stopping the delegated UX lane. This closes the charter items for `/`, Enter, keyboard continuity, focus restoration, and additional exploratory ideas.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Ran a focused keyboard pass on `https://eviltester.github.io/grid-table-editor/generator.html`. Opened a domain picker, focused the first result tile, pressed `/`, then searched `internet.httpMethod`, focused the single result tile, pressed `Enter`, and captured `screenshots/ux-regression-10-keyboard-enter-after-tile-focus.png`. Keyboard state was saved to `support/ux-regression-keyboard-results.json`.

the observations and results that you make

Working behavior:

- `/` works as a search-focus shortcut when a result tile has focus. Focus moved back to the search input and did not insert `/` into the search value.

Defect candidate: `Enter` on a focused selected result tile does not apply the command. After pressing `Enter`, the dialog remained open, `internet.httpMethod` remained selected, and the row command stayed empty. This supports the earlier search-field Enter observation. Wrote `defects/ux-002-enter-does-not-apply-selected-method.md`.

Follow-up ideas generated from this lane:

1. Execute a manual keyboard-only picker journey: open, search, arrow through results, apply, edit params, preview, with no mouse.
2. Confirm whether Enter is intended to apply, select-only, or no-op, then align implementation and help text.
3. Test Apply focus restoration in embedded `app.html`, not only standalone `generator.html`.
4. Apply a Faker helper from a domain-row picker and verify whether source type changes, params remain valid, or generation fails.
5. Open a faker row picker and verify whether domain/core commands appear symmetrically and whether that is understandable.
6. Test long recent-method history after selecting more than 10 methods, including duplicates and source-family mixing.
7. Test search with punctuation and mixed case, for example `HTTP`, `http method`, `string.symbol`, `helpers.mustache`, and `mustache`.
8. Test no-results search copy, Escape behavior, and focus restoration from an empty result state.
9. Test tab overflow and horizontal layout at narrower desktop widths, especially the many domain-family chips.
10. Test whether the default selected `enum` on a domain picker can be applied accidentally and what happens to row source type.
11. Verify screen-reader semantics for the picker: modal name, selected result, selected tab, list count, and Apply disabled/enabled state.
12. Test docs links from picker details after selecting `internet.httpMethod`, `string.symbol`, and `helpers.mustache`, including new-tab focus behavior.
13. Test params editor launch immediately after Apply to confirm focus and command continuity across chained dialogs.
14. Test backdrop click after editing search and selecting a different command to ensure cancel semantics are always non-mutating.

Stopping note for this lane: the chartered UX surfaces were covered broadly enough for a delegated pass: open/close/apply/cancel/backdrop/Escape, search, tabs, recent methods, `/` and Enter, focus restoration, selected command continuity, help readability, generator workflow, and app integration. Remaining ideas are useful but fit follow-up or adjacent lanes.

---
