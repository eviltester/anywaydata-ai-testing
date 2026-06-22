# Defect 04: `chemicalElement.*` Is Exposed In UI But Nested Docs Page 404s

## Summary

The deployed generator command inventory exposed `chemicalElement.*` in the live domain picker, but the expected nested docs page route `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement` returned GitHub Pages `Page not found`.

## Repeatability

Repeatable.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Switch the row type to `domain`.
3. Open the method picker.
4. Observe that the live picker exposes `chemicalElement.*`.
5. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/chemicalElement`.
6. Observe that GitHub Pages returns a `Page not found` response.

## Expected

If a command family is exposed in the live picker and is expected to have docs coverage in the nested site, the nested docs route should exist and be reachable.

## Actual

The sampled nested route 404s.

## Why This Matters

- It weakens help/docs completeness even where routing itself is correct.
- It may leave a visible live command family without a matching nested docs target.
- It can create confusion for users if the picker inventory and docs inventory disagree.

## Supporting Evidence

- [command-coverage-test-log.md](../command-coverage-test-log.md)
- [issue-233-test-log.md](../issue-233-test-log.md)

## Notes For Investigation

- This may be a true missing docs page, a route/name mismatch, or a docs taxonomy change that the picker/help surfaces do not match.
