# Defect 003 - Faker Helpers docs uniqueArray example using this.word.sample fails in runtime

Severity: Medium

Status: Confirmed repeatable

## Summary

The published Faker Helpers docs include `helpers.uniqueArray(this.word.sample, 5)`, but the deployed generator rejects that syntax as unsafe/complex. The equivalent `helpers.uniqueArray(faker.word.sample, 5)` succeeds.

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Words
helpers.uniqueArray(this.word.sample, 5)
```

4. Click `Preview`.

## Expected Result

The documented example should generate an array of unique words, or docs should show the supported syntax.

## Actual Result

The deployed app rejects the example and does not generate rows.

## Evidence

- Video: `../videos/defect-003-helpers-unique-this-doc-example.webm`
- Related docs: https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers

## Notes for Fix Agent

Either support the documented `this.word.sample` syntax in safe helper parsing or update docs/examples to the deployed-supported `faker.word.sample` form.
