# Published Faker Helpers Docs Miss Commands Exposed In The Runtime Picker

## Summary

The live faker helper picker exposes commands that are not documented on the published Faker Helpers page. Confirmed missing examples from the docs page include:

- `helpers.enumValue`
- `helpers.objectEntry`
- `helpers.objectKey`
- `helpers.objectValue`

This is a repeatable documentation completeness defect because the runtime advertises these commands but the published reference page does not explain them.

## Environment

- Story: issue `#228`
- PR under review: `#243`
- Deployed build observed on landing page:
  - Branch: `codex/228-improve-command-definition`
  - Commit: `fb9e8e2049e1`
  - Built: `2026-06-24T20:13:50.037Z`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, change the type to `faker`.
3. Open the faker command picker and inspect the helper command list.
4. Note the presence of `helpers.enumValue`, `helpers.objectEntry`, `helpers.objectKey`, and `helpers.objectValue`.
5. Open the published docs page `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`.
6. Search the page for those four helper names.

## Actual Result

- The runtime picker exposes all four helper commands.
- The published Faker Helpers page does not document them.

## Expected Result

Commands exposed in the runtime picker should have published docs coverage, especially after a command-definition consolidation story.

## Evidence

- Runtime helper picker state: ![Runtime faker command list](../screenshots/faker-commands-runtime.png)
- Published helpers docs page reviewed at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`

## Notes For Investigation

- This is a docs/reference coverage defect, not proof that the commands fail at runtime.
- It may indicate that the runtime command-definition inventory and the published docs generation are still out of sync for some helper commands.
