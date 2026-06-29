# Defect 005 - Faker Helpers docs show a uniqueArray example that deployed generator rejects

## Summary

The deployed Faker Helpers docs show `helpers.uniqueArray(this.word.sample, 5)`, but the deployed generator rejects that exact schema with `Unsafe faker rule syntax detected: requires complex argument parsing`.

## Environment

- Deployed docs: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
- Deployed generator: `https://eviltester.github.io/grid-table-editor/site/generator.html`
- Date tested: 2026-06-29

## Repeatability

Repeatable in deployed generator text schema mode. Subagent docs consistency also confirmed that `helpers.uniqueArray(faker.word.sample, 3)` works while the documented `this.word.sample` form fails.

## Reproduction

1. Open the deployed Faker Helpers docs.
2. Locate the `helpers.uniqueArray` section.
3. Observe the documented example:

```text
helpers.uniqueArray(this.word.sample, 5)
```

4. Open `https://eviltester.github.io/grid-table-editor/site/generator.html`.
5. Click `Edit as Text`.
6. Enter:

```text
Words
helpers.uniqueArray(this.word.sample, 5)
```

7. Click `Preview`.

## Observed

- Docs present `helpers.uniqueArray(this.word.sample, 5)` as the helper example.
- Generator rejects the schema with:

```text
Words failed faker validation - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

Docs evidence:

![Docs uniqueArray this example](../screenshots/defect-docs-unique-array-this-example.png)

Runtime evidence:

![Generator rejects docs uniqueArray this example](../screenshots/defect-docs-unique-array-generator-rejects-this-example.png)

Video: [defect-docs-unique-array-this-example.webm](../videos/defect-docs-unique-array-this-example.webm)

## Expected

Published docs should only show executable examples for the deployed schema parser, or should explicitly mark unsupported Faker-native callback syntax. The working form observed in this session was:

```text
helpers.uniqueArray(faker.word.sample, 3)
```

## Notes For Fix Investigation

The same docs page already warns that some callback shapes are not supported in browser schema text. This specific example should be updated to a supported form or moved under a clearly marked unsupported/native Faker comparison.
