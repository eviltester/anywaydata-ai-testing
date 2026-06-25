# UX Regression Retest Log - Issue #228 / PR #243

## Charter

Deployed-environment exploratory UX/usability and workflow regression retest for issue #228 / PR #243.

Target only: <https://eviltester.github.io/grid-table-editor/>

Do not run local verify/build/package-manager/repo test commands. No app code edits.

Focus areas:

- `generator.html`
- `app.html` embedded test-data/schema workflow
- Method picker search/filter
- Params editor modal
- Help panels
- Import/export schema workflow
- Focus/keyboard paths where relevant
- Whether recent validation/accessibility fixes introduce friction

## Techniques And Heuristics

- Deployed-browser exploratory testing using a real Chrome browser controlled through Playwright.
- Clean-page retries for defect confirmation where practical.
- Workflow-first UX heuristics: discoverability, recovery, clear feedback, minimal interruption.
- Accessibility heuristics: focus entry/exit, keyboard operation, icon-only accessible names, modal focus return.
- Regression heuristics: compare equivalent generator/app embedded controls, exercise fixed validation/accessibility surfaces rather than only happy-path generation.
- Evidence rule: only file defects for behavior observed on the deployed target and supported by screenshots or DOM state.

## Environment And Browser Control Proof

- Date: 2026-06-25.
- Browser: local Chrome executable driven headlessly.
- Deployed target opened at `https://eviltester.github.io/grid-table-editor/`.
- Proof interaction: clicked `Open generator.html` from the deployed index and reached `https://eviltester.github.io/grid-table-editor/generator.html`.
- Evidence:
- `screenshots/proof-home.png`
- `screenshots/proof-generator-click.png`

## Sequential Steps And Observations

1. Opened deployed index page.
2. Confirmed index title: `Grid Table Editor Test Environment`.
3. Clicked `Open generator.html`.
4. Confirmed generator title: `Data Generator - AnyWayData`.
5. Scouted generator page controls: schema editor, text mode, schema file actions, generation controls, options, preview, help icons, method picker trigger after choosing `faker`.
6. Generated enum data in `generator.html` using `Status`, type `enum`, values `Open,Closed`, preview count `5`.
7. Observed output preview with header and five generated values. No console errors were observed in that flow.
8. Switched schema type to `faker`.
9. Opened method picker using `Select faker command`.
10. Observed method picker modal with search field, category chips, method tiles, Cancel, and Apply.
11. Searched `email` while `Faker` chip was active.
12. Observed zero visible method tiles and no empty-state message. This is a UX friction observation, not filed as a defect because switching to `All` correctly finds email-related methods.
13. Switched method picker to `All`, searched `email`.
14. Observed `internet.email` and `internet.exampleEmail`.
15. Applied `internet.email`.
16. Observed selected command returned to the schema row and picker closed.
17. Reopened method picker, switched to `All`, searched `number.int`, selected and applied it.
18. Opened params editor for `number.int`.
19. Confirmed initial focus moved into the params table at `min value`.
20. Entered `min=1`, `max=3`, applied params.
21. Generated preview data and observed values between 1 and 3 using params `(min=1,max=3)`.
22. Opened method picker via keyboard from `Select faker command`.
23. Confirmed focus initially moved to the picker search field and early Tab stops remained inside the picker modal.
24. Pressed Escape to close method picker.
25. Confirmed focus dropped to `<body>` instead of returning to the command-picker trigger. Filed defect.
26. Opened params editor via keyboard from params button.
27. Confirmed focus initially moved to `min value`.
28. Pressed Escape to close params editor.
29. Confirmed focus dropped to `<body>` instead of returning to the params trigger. Same defect scope.
30. Exercised generator help icons.
31. Observed help buttons toggled `aria-expanded` from `false` to `true` and help/disclosure content remained visible without blocking the workflow.
32. Exported generator schema with one enum field using `Save Schema File`.
33. Observed download suggested filename `schema.txt`.
34. Saved artifact locally as `schema-export-schema.txt` in this QA folder.
35. Loaded the exported schema into a fresh `generator.html` page using the deployed file input.
36. Confirmed schema row restored as `Status`, `enum`, `Open,Closed` with no visible errors.
37. Opened `app.html`.
38. Scouted app page: grid toolbar, collapsed `Test Data` section, collapsed `Import / Export` section, text preview tabs/options.
39. Expanded `Test Data`.
40. Filled embedded schema row with `Status`, `enum`, `Open,Closed`.
41. Set visible generate count to `3`.
42. Clicked the embedded generate button using its deployed `data-role`.
43. Confirmed grid updated to `Total rows: 3`, header `Status`, and three generated enum rows.
44. Observed several compact app icon buttons have no text, `aria-label`, or `title`, despite being enabled user-facing controls. Filed defect.
45. Clicked `Set Text From Grid`.
46. Confirmed CSV text preview was populated from the grid.
47. Cleared the table, edited preview text to `"Status"\n"Imported"`, and clicked `Set Grid From Text`.
48. Confirmed grid imported text back as one row with header `Status` and value `Imported`.

## Confirmed Findings

### Medium - Modal Escape Close Does Not Restore Focus To Trigger

Defect file: `defects/issue-228-modal-focus-not-restored.md`

Observed in both method picker and params editor. Keyboard users lose their place after closing the modal with Escape because focus lands on `<body>` rather than the control that opened the modal.

Evidence:

- `screenshots/method-picker-keyboard-after-esc.png`
- `screenshots/params-editor-keyboard-after-esc.png`

### Medium - App Embedded Icon-Only Controls Lack Accessible Names

Defect file: `defects/issue-228-app-icon-controls-missing-accessible-names.md`

Several enabled app-page icon-only controls in the embedded instructions/schema/import-export workflows have empty visible text and no `aria-label`/`title`. This creates friction for screen reader users and makes compact controls hard to understand without visual icon interpretation.

Evidence:

- `screenshots/app-initial.png`
- `screenshots/app-generate-new-table.png`

## Coverage

- Browser-control proof from deployed index to `generator.html`.
- Generator enum schema happy path.
- Generator faker method picker open/search/filter/apply.
- Method picker category interaction with `Faker` and `All`.
- Method picker no-result state observed.
- Params editor open/fill/apply for `number.int`.
- Generator output preview after params application.
- Keyboard open/close for method picker.
- Keyboard open/close for params editor.
- Generator help icon/disclosure behavior.
- Generator schema save/load file workflow.
- App `Test Data` embedded schema generation workflow.
- App grid-to-text and text-to-grid workflow.
- App compact icon-button accessible-name inspection.

## Deferred Ideas

- Test method picker full Tab cycle through the end of the modal to confirm wrap behavior, not only early tab stops.
- Test mobile/narrow viewport usability for method picker and params editor, especially category chip overflow.
- Compare accessible names with a browser accessibility snapshot if a dedicated a11y tool is available.
- Test app embedded schema Save/Load file buttons functionally once accessible names are fixed or surfaced.
- Recheck whether method picker no-result searches should display an explicit "No methods found" message.

