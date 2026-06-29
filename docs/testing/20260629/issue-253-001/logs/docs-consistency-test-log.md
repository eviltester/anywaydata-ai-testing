---
## 2026-06-29T22:16:00+01:00

- What you think you want to do and why

Establish the docs/help/content consistency lane for issue #253 and PR #285 before substantive deployed-site review. This lane needs to compare published docs and in-app help/examples against actual deployed app/generator behavior, especially the known-command invalid-parameter change and related command definition/example surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created this append-only lane log at `docs/testing/20260629/issue-253-001/logs/docs-consistency-test-log.md`. Reviewed remote GitHub context only:

- Issue #253: `https://github.com/eviltester/grid-table-editor/issues/253`
- User-supplied PR #295: not resolvable in `eviltester/grid-table-editor`
- Resolved PR #285: `https://github.com/eviltester/grid-table-editor/pull/285`, merged and closing issue #253
- Deployed environment: `https://eviltester.github.io/grid-table-editor/site/`

Planned focused coverage:

1. Browser proof and deployed page inventory across site/app/generator/docs.
2. Published docs/help pages around schema definition, domain commands, Faker commands, auto-increment sequences, and app/generator workflows.
3. Runtime comparison for examples related to known commands with invalid params, `autoIncrement.sequence`, `number.int`, and visible command picker/help details.
4. Removed/stale/misleading command examples and missing or thin documentation.
5. Candidate defect notes only under `support/docs-consistency-candidate-defects.md`; no final defect files from this lane.

the observations and results that you make

The docs lane oracle is the deployed GitHub Pages environment and linked deployed app/generator/docs pages. No local repo build, verify, test, or package-manager commands will be run.

---
## 2026-06-29T22:20:00+01:00

- What you think you want to do and why

Prove deployed browser control before using the live app and docs as the consistency oracle.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used Playwright automation with the installed Chrome executable to open `https://eviltester.github.io/grid-table-editor/site/`. Captured the deployed landing page, clicked the visible `Use The Application` link, waited for `https://eviltester.github.io/grid-table-editor/site/app.html`, then clicked the app `Add Row` button. Saved evidence:

- `support/docs-consistency-browser-proof.json`
- `screenshots/docs-consistency-001-site-home.png`
- `screenshots/docs-consistency-002-app-opened-from-site.png`
- `screenshots/docs-consistency-003-app-add-row-proof.png`

the observations and results that you make

Browser interaction is proven. The deployed home page title was `AnyWayData - Data Table Editor & Generator`. The app page title was `Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData`. After clicking `Add Row`, the app reported `Total rows: 1`.

---
## 2026-06-29T22:24:00+01:00

- What you think you want to do and why

Inventory the deployed docs/help pages that can describe or contradict the changed command/schema behavior in issue #253 and PR #285.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Fetched and rendered deployed pages only, then extracted page titles, headings, links, and code snippets. Pages reviewed included:

- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/autoIncrement`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/rest-api`
- `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun`

Saved support artifacts:

- `support/docs-consistency-page-inventory.json`
- `support/docs-consistency-page-inventory.md`
- `support/docs-consistency-page-matches.json`
- `screenshots/docs-consistency-004-docs-inventory-last-page.png`

the observations and results that you make

The docs inventory found current examples for `number.int`, `autoIncrement.sequence`, and `helpers.mustache`. It did not find visible user-facing docs for `image.urlLoremFlickr`. The Faker Helpers docs still publish `helpers.uniqueArray(this.word.sample, 5)`, which required runtime comparison because previous command parsing changes make callback syntax a high-risk content area. The reviewed docs do not describe the issue #253 text-to-Schema-UI distinction directly; the runtime app/generator behavior is the oracle for that workflow.

---
## 2026-06-29T22:31:00+01:00

- What you think you want to do and why

Compare the issue #253 known-command invalid-params behavior against the contrasting unknown-command behavior in the deployed generator and app schema editor.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

In `https://eviltester.github.io/grid-table-editor/generator.html`, clicked `Edit as Text`, entered:

```text
Num
number.int(min=1, min=2, max=3)
```

Clicked `Edit as Schema`, then clicked `Preview`. Repeated the relevant text-to-schema switch on `https://eviltester.github.io/grid-table-editor/site/app.html` inside the `Test Data` schema editor. For the contrasting path, entered:

```text
Bad
person.notACommand()
```

Clicked `Edit as Schema` in the generator. Saved evidence:

- `support/docs-consistency-known-invalid-params.json`
- `support/docs-consistency-known-invalid-preview.json`
- `support/docs-consistency-unknown-command-switch.json`
- `support/docs-consistency-app-known-invalid-params.json`
- `screenshots/docs-consistency-006-known-invalid-text-mode.png`
- `screenshots/docs-consistency-007-known-invalid-schema-mode.png`
- `screenshots/docs-consistency-008-known-invalid-preview-error.png`
- `screenshots/docs-consistency-009-unknown-command-switch.png`
- `screenshots/docs-consistency-022-app-known-invalid-text-mode.png`
- `screenshots/docs-consistency-023-app-known-invalid-schema-mode.png`

the observations and results that you make

The deployed generator and app both preserved the issue #253 known command as an editable Schema UI row: column `Num`, source `domain`, command `number.int`, params `(min=1, min=2, max=3)`. No literal-conversion prompt appeared for this known command with invalid params. The row showed `invalid domain params - Invalid keyword arguments: duplicate named argument "min"`. In contrast, `person.notACommand()` stayed in text mode with `failed domain validation - Unknown keyword: person.notACommand` and displayed the `Convert invalid definitions?` prompt. This matches the intended distinction between known command/invalid params and unknown command.

---
## 2026-06-29T22:39:00+01:00

- What you think you want to do and why

Copy published examples into the deployed generator and compare their behavior with docs/help surfaces, especially command families touched by PR #285 and command-definition/example surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Tested these examples in the deployed generator preview:

- `Filename / autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
- `Build / autoIncrement.sequence(start=10, step=0)`
- `Build / autoIncrement.sequence(zeropadding=-1)`
- `Sentence / helpers.mustache("Hello {{name}}", { name: "Ada" })`
- `Words / helpers.uniqueArray(this.word.sample, 5)`
- `Words / helpers.uniqueArray(faker.word.sample, 5)`
- `Num / number.int(min=32, max=47)`

Opened the command picker/help surface for `number.int` and `autoIncrement.sequence`, searched for removed `urlLoremFlickr`, and captured app Test Data help/scout information. Saved evidence:

- `support/docs-consistency-autoincrement-runtime.json`
- `support/docs-consistency-runtime-examples.json`
- `support/docs-consistency-command-selection-surface.json`
- `support/docs-consistency-command-picker-number-int.json`
- `support/docs-consistency-picker-removed-current.json`
- `support/docs-consistency-app-help-scout.json`
- `screenshots/docs-consistency-010-autoincrement-valid.png`
- `screenshots/docs-consistency-011-autoincrement-step-zero.png`
- `screenshots/docs-consistency-012-autoincrement-negative-zeropadding.png`
- `screenshots/docs-consistency-013-helpers-mustache.png`
- `screenshots/docs-consistency-014-helpers-uniquearray-this-word.png`
- `screenshots/docs-consistency-015-helpers-uniquearray-faker-word.png`
- `screenshots/docs-consistency-016-number-int-valid.png`
- `screenshots/docs-consistency-017-command-selection-surface.png`
- `screenshots/docs-consistency-018-command-picker-number-int.png`
- `screenshots/docs-consistency-019-picker-urlLoremFlickr-absent.png`
- `screenshots/docs-consistency-020-picker-autoincrement-sequence.png`
- `screenshots/docs-consistency-021-app-test-data-scout.png`

the observations and results that you make

Consistent examples: documented `number.int(min=32, max=47)` generated values in range; documented `helpers.mustache("Hello {{name}}", { name: "Ada" })` generated `Hello Ada`; documented `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)` generated padded filenames such as `filename001.txt`, `filename006.txt`, and `filename011.txt`. PR-specific invalid examples produced useful validation: `step=0` reported `argument "step" must be a non-zero integer`; `zeropadding=-1` reported `argument "zeropadding" must be greater than or equal to 0`.

Mismatch: the published Faker Helpers example `helpers.uniqueArray(this.word.sample, 5)` was rejected with `Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing`. The equivalent `helpers.uniqueArray(faker.word.sample, 5)` worked and generated arrays of five sampled words. The command picker did not show `urlLoremFlickr`; searching for it returned `No methods match the current filter`. The picker details for `number.int` and `autoIncrement.sequence` showed parameter details and usage examples consistent with the sampled runtime behavior.

---
## 2026-06-29T22:46:00+01:00

- What you think you want to do and why

Close the docs/help/content consistency lane by summarizing confirmed coverage, suspected content drift, missing/removed commands, and deferred follow-up ideas without creating final defect files.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Visually checked representative screenshots for the known invalid params state and the rejected `helpers.uniqueArray(this.word.sample, 5)` example. Wrote:

- `support/docs-consistency-findings.md`
- `support/docs-consistency-candidate-defects.md`

the observations and results that you make

Confirmed one repeatable candidate docs/content defect: Faker Helpers documents `helpers.uniqueArray(this.word.sample, 5)`, but the deployed generator rejects that exact example; `helpers.uniqueArray(faker.word.sample, 5)` works. No final defect files were created. Positive consistency: issue #253 text-to-Schema-UI behavior is fixed in both app and generator, `autoIncrement.sequence` docs/help/runtime agree for sampled examples and validators, `number.int` docs/help/runtime agree for sampled examples, and removed `urlLoremFlickr` was absent from reviewed user-facing docs and picker search.

---
