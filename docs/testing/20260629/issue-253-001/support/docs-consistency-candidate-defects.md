# Docs Consistency Candidate Defects

No final defect files were created from this lane.

## Candidate: Faker Helpers docs show a `helpers.uniqueArray` callback example rejected by deployed generator

Status: repeatable candidate docs/content defect  
Observed in: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/`  
Runtime checked in: `https://eviltester.github.io/grid-table-editor/generator.html`

### Steps

1. Open the deployed Faker Helpers docs page.
2. Copy the documented example `helpers.uniqueArray(this.word.sample, 5)`.
3. Open the deployed generator.
4. Click `Edit as Text`.
5. Enter:

```text
Words
helpers.uniqueArray(this.word.sample, 5)
```

6. Click `Preview`.

### Observed

The deployed generator rejects the example:

```text
Words failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

### Expected

A published docs example should either execute in the deployed generator or clearly explain that it is not direct generator syntax.

### Control Check

This alternative worked in the deployed generator:

```text
Words
helpers.uniqueArray(faker.word.sample, 5)
```

It generated arrays of five sampled words.

### Evidence

- `screenshots/docs-consistency-014-helpers-uniquearray-this-word.png`
- `screenshots/docs-consistency-015-helpers-uniquearray-faker-word.png`
- `support/docs-consistency-runtime-examples.json`
- `support/docs-consistency-page-matches.json`

