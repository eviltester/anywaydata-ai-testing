# Docs/Help/Content Consistency Findings

Session: issue-253-001  
Lane: docs/help/content consistency  
Target: `https://eviltester.github.io/grid-table-editor/site/` and linked deployed app/generator/docs  
Issue/PR context: issue #253, resolved PR #285; user-supplied PR #295 was not resolvable

## Docs/Pages Reviewed

- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- `/site/docs/intro`
- `/site/docs/category/generating-data`
- `/site/docs/test-data/test-data-generation`
- `/site/docs/test-data/data-grid-editable`
- `/site/docs/test-data/generate-to-file`
- `/site/docs/test-data/Schema-Definition`
- `/site/docs/test-data/faker-test-data`
- `/site/docs/test-data/faker/helpers`
- `/site/docs/test-data/domain/domain-test-data`
- `/site/docs/test-data/domain/number`
- `/site/docs/test-data/domain/autoIncrement`
- `/site/docs/test-data/auto-increment-sequences`
- `/site/docs/interfaces-and-deployment/web-ui`
- `/site/docs/interfaces-and-deployment/rest-api`
- `/site/docs/interfaces-and-deployment/cli-node-and-bun`

Support inventory:

- `docs-consistency-page-inventory.json`
- `docs-consistency-page-inventory.md`
- `docs-consistency-page-matches.json`

## Examples Copied/Tested

- `Num / number.int(min=1, min=2, max=3)` switched from text to Schema UI as a known `domain` command in both generator and app, retained params, and showed duplicate `min` validation.
- `Bad / person.notACommand()` stayed in text mode and displayed the literal-conversion prompt, preserving the intended unknown-command distinction.
- `Num / number.int(min=32, max=47)` generated values in range.
- `Filename / autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)` generated padded filenames.
- `Build / autoIncrement.sequence(start=10, step=0)` rejected `step=0` with a non-zero integer validation message.
- `Build / autoIncrement.sequence(zeropadding=-1)` rejected negative `zeropadding`.
- `Sentence / helpers.mustache("Hello {{name}}", { name: "Ada" })` generated `Hello Ada`.
- `Words / helpers.uniqueArray(this.word.sample, 5)` was rejected.
- `Words / helpers.uniqueArray(faker.word.sample, 5)` generated arrays of five sampled words.

## App Help Surfaces Checked

- App `Test Data` panel and schema editor controls.
- Generator schema editor controls.
- Command picker/details for `number.int`.
- Command picker/details for `autoIncrement.sequence`.
- Command picker search for removed/stale `urlLoremFlickr`.
- App visible help hooks around Test Data, Generate, Grid to Enum Schema, schema mode, schema docs, import/export, preview/edit mode, and format options.

## Stale Examples

- `helpers.uniqueArray(this.word.sample, 5)` appears in published Faker Helpers docs, but the deployed generator rejects it as unsafe/complex. `helpers.uniqueArray(faker.word.sample, 5)` works.

## Misleading Examples

- The `helpers.uniqueArray(this.word.sample, 5)` docs example is misleading because it looks like a directly executable command example but fails in the deployed generator.
- The generic params placeholder `Params e.g. (10)` is still broad, but sampled `number.int` and `autoIncrement.sequence` command picker details provide better usage examples. No defect filed from this placeholder alone.

## Missing/Removed Commands

- `urlLoremFlickr` / `image.urlLoremFlickr` was not found in reviewed user-facing docs and was absent from command picker search.
- Current `image.url` and `image.urlPicsumPhotos` remain visible in picker command options.
- No missing current command was confirmed from this lane.

## Candidate Defects

- See `docs-consistency-candidate-defects.md`.

## Deferred Ideas

1. Add a Faker Helpers docs correction from `this.word.sample` to supported `faker.word.sample` callback syntax, or document why `this.*` examples are not meant for direct generator use.
2. Add a docs section for text-to-Schema-UI switching that explains the difference between known commands with invalid params and unknown/malformed commands.
3. Add a short app/generator command picker workflow page showing command search, parameter details, examples, and the params dialog.
4. Add explicit invalid `autoIncrement.sequence` examples to docs/help for `step=0` and negative `zeropadding` if validation messaging is intended to be user-facing.
5. Add direct docs examples for duplicate named params, since issue #253 is specifically about preserving known invalid command rows.
6. Review all Faker Helpers callback examples for direct runtime executability.
7. Consider making the params placeholder context-sensitive after selecting a command.
8. Run a later link-check/content pass over production `anywaydata.com` references if the GitHub Pages review environment is expected to stay self-contained.

