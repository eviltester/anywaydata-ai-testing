# Defect: Domain overview documents invalid `location.cardinalDirection(abbreviated=true)` example

## Summary

The public Domain Test Data overview shows a quick example using `location.cardinalDirection(abbreviated=true)`, but the deployed generator rejects `abbreviated` for `location.cardinalDirection`. The location domain detail page documents `location.cardinalDirection` as having no parameters, and the equivalent parameterized command that works is `location.direction(abbreviated=true)`.

## Environment

- Deployed app: `https://eviltester.github.io/grid-table-editor/generator.html`
- Public docs: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`
- Public detail docs: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/location/`
- Branch shown by deployed landing page: `codex/228-improve-command-definition`
- Commit shown by deployed landing page: `a3b39ddcfe0f`
- Build shown by deployed landing page: `2026-06-24T23:03:43.621Z`

## Steps to Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`.
2. Note the quick example:

```text
Direction
location.cardinalDirection(abbreviated=true)
```

3. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
4. Switch schema editor to `Edit as Text`.
5. Enter:

```text
Direction
location.cardinalDirection(abbreviated=true)
```

6. Click `Preview`.

## Actual Result

Preview fails with:

```text
Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"
```

## Expected Result

Either the documented quick example should execute successfully, or the overview should use the valid command:

```text
Direction
location.direction(abbreviated=true)
```

Control test:

```text
Direction
location.direction(abbreviated=true)
```

This passed and generated abbreviated directions such as `SW`, `N`, `W`, `NW`, `SE`, and `E`.

## Notes for Fix

The `location` detail page says `location.cardinalDirection` has no parameters and documents `location.direction(abbreviated=true)` as the parameterized abbreviated-direction example. The likely fix is to update the Domain Test Data overview quick example from `location.cardinalDirection(abbreviated=true)` to `location.direction(abbreviated=true)`.
