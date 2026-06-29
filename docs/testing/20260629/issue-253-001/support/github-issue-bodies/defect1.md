## Summary

The published Faker Helpers docs show helpers.uniqueArray(this.word.sample, 5), but the deployed generator rejects that exact syntax. The nearby supported form helpers.uniqueArray(faker.word.sample, 5) works.

## Steps

1. Open https://eviltester.github.io/grid-table-editor/generator.html
2. Click Edit as Text.
3. Enter:

`	ext
Words
helpers.uniqueArray(this.word.sample, 5)
`

4. Click Preview.

## Observed

The generator reports:

`	ext
Words failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
`

## Expected

A published docs example should execute in the deployed generator or clearly say that it is not direct generator syntax.

## Evidence

- Defect report: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/defects/defect-001-docs-helpers-uniquearray-this-word.md
- Screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-001-docs-helpers-uniquearray-this-word.png
- Working control screenshot: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/screenshots/defect-001-control-helpers-uniquearray-faker-word.png
- Video: https://github.com/eviltester/anywaydata-ai-testing/blob/main/docs/testing/20260629/issue-253-001/videos/defect-001-docs-helpers-uniquearray-this-word.webm
