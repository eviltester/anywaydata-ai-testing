# Defect: Two public Faker Based Data examples do not execute in deployed generator

## Summary

The public `Faker Based Data` docs page presents direct faker examples that appear intended to be executable schema examples. Two of those examples fail in the deployed generator:

- `helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })`
- `faker.location.cardinalDirection({ abbreviated: true })`

The adjacent `helpers.fake(...)` example does execute successfully.

## Environment

- Deployed app: `https://eviltester.github.io/grid-table-editor/generator.html`
- Public docs: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`
- Branch shown by deployed landing page: `codex/228-improve-command-definition`
- Commit shown by deployed landing page: `a3b39ddcfe0f`
- Build shown by deployed landing page: `2026-06-24T23:03:43.621Z`

## Steps to Reproduce: `helpers.mustache`

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch schema editor to `Edit as Text`.
3. Enter the documented example:

```text
Sentence
helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
```

4. Click `Preview`.

## Actual Result: `helpers.mustache`

Preview fails with:

```text
Row 1: invalid faker params - Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

## Steps to Reproduce: direct faker object parameter

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch schema editor to `Edit as Text`.
3. Enter the documented example:

```text
Direction
faker.location.cardinalDirection({ abbreviated: true })
```

4. Click `Preview`.

## Actual Result: direct faker object parameter

Preview fails with:

```text
Row 1: invalid faker params - Invalid keyword arguments: too many positional arguments. Expected at most 0, received 1
```

## Expected Result

Public docs examples that are presented as schema examples should execute successfully in the deployed generator, or the docs should be changed to supported schema syntax.

## Control Example

The adjacent docs example below passed:

```text
Sentence
helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")
```

Observed output included rows such as:

```text
Hi, my name is Marisa McLaughlin!
```

## Notes for Fix

If object-literal/callback faker arguments are intentionally unsupported by the schema parser, the docs should avoid presenting them as executable schema examples. If direct faker examples should be executable, the parser/runtime needs support for these documented argument shapes or the docs should provide the equivalent supported named-argument/domain form.
