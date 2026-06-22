# Defect 003: Published domain and faker examples do not match runtime behavior

## Summary

At least two published docs examples are stale or incompatible with the deployed runtime:

- `location.cardinalDirection(abbreviated=true)` from the domain docs
- `faker.location.cardinalDirection({ abbreviated: true })` from the faker docs

## Environment

- App under test: `https://eviltester.github.io/grid-table-editor/app.html`
- Docs:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data/`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/app.html`.
2. Switch the schema editor to text mode.
3. Enter:

```text
FirstName
person.firstName()
Direction
location.cardinalDirection(abbreviated=true)
```

4. Click `Generate`.
5. Replace the schema with:

```text
Direction
faker.location.cardinalDirection({ abbreviated: true })
```

6. Click `Generate` again.

## Expected

Docs examples presented as runnable examples should either:

- work as written, or
- be clearly marked as illustrative-only and not executable in this UI

## Actual

- `location.cardinalDirection(abbreviated=true)` fails with `Row 2: invalid domain params - Invalid keyword arguments: unknown named argument "abbreviated"`.
- `faker.location.cardinalDirection({ abbreviated: true })` fails with only the generic `Schema validation failed. Grid unchanged.` message.

## Repeatability

- Repeatable

## Evidence

- Supporting log: [../command-coverage-test-log.md](../command-coverage-test-log.md)
- Supporting log: [../negative-validation-test-log.md](../negative-validation-test-log.md)

## Notes

- The migrated helper path `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")` succeeds, so this is not a blanket faker outage. It looks more like docs/runtime drift on specific example shapes and accepted parameter syntax.
