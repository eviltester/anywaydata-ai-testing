# Defect 004 - Faker Helpers docs multiple arrow callback example fails in runtime

Severity: Medium

Status: Confirmed repeatable

## Summary

The published Faker Helpers docs include `helpers.multiple(() => this.person.firstName(), { count: 3 })`, but the deployed generator rejects the arrow callback syntax as unsafe/complex.

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Names
helpers.multiple(() => this.person.firstName(), { count: 3 })
```

4. Click `Preview`.

## Expected Result

The documented example should generate an array of three first names, or the docs should show syntax supported by the deployed parser.

## Actual Result

The example fails validation and does not generate rows.

## Evidence

- Video: `../videos/defect-004-helpers-multiple-this-arrow-doc-example.webm`
- Related docs: https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers

## Notes for Fix Agent

This may be an intentional parser safety restriction. If so, docs should avoid arrow callbacks and `this.*` examples that cannot execute in the deployed generator.
