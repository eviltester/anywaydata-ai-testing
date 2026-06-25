# Candidate: Storybook method picker help links use production docs while live deployed picker uses GitHub Pages docs

## Summary

Published Storybook method picker examples link their `Open documentation` help links to `https://anywaydata.com/...`, while the live deployed generator method picker links equivalent commands to `https://eviltester.github.io/grid-table-editor/site/docs/...`.

This may be intentional if Storybook is production-facing, but it is inconsistent inside the deployed review environment and can send reviewers out of the test deployment while app/generator picker help stays within it.

## Environment

- Deployed app/generator: `https://eviltester.github.io/grid-table-editor/generator.html`
- Deployed Storybook: `https://eviltester.github.io/grid-table-editor/storybook/`
- PR: `https://github.com/eviltester/grid-table-editor/pull/247`
- Issue: `https://github.com/eviltester/grid-table-editor/issues/230`

## Evidence

Live deployed generator method picker samples:

- `internet.password` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
- `commerce.price` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/commerce`
- `helpers.arrayElement` link: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`

Storybook iframe samples:

- `shared-method-picker-dialog--help-display-with-usage` `Open documentation` link: `https://anywaydata.com/docs/test-data/domain/internet`
- `shared-method-picker-dialog--visual-always-open` `Open documentation` link: `https://anywaydata.com/docs/test-data/faker/helpers`

Supporting artifacts:

- `../support/docs-consistency-live-picker-samples.json`
- `../support/docs-consistency-storybook-story-inspection.json`
- `../support/docs-consistency-link-target-check.json`
- `../screenshots/docs-consistency-live-picker-internet_password.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--help-display-with-usage.png`
- `../screenshots/docs-consistency-storybook-shared-method-picker-dialog--visual-always-open.png`

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the schema row type to `domain`.
3. Open the method picker.
4. Search for and select `internet.password`.
5. Observe the `Open documentation` link uses the GitHub Pages `/grid-table-editor/site/docs/...` base.
6. Open `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story`.
7. Observe the `Open documentation` link uses the production `https://anywaydata.com/docs/...` base.

## Impact

Low to medium depending on intended behavior. If deployed Storybook is meant to mirror the deployed test environment, the link base mismatch weakens docs/help consistency and may hide branch-specific docs changes from reviewers. If Storybook is intentionally production-facing, classify this as accepted behavior and not a defect.

## Suggested follow-up

Decide whether Storybook stories should receive the same deployed docs base as the app/generator shell. If yes, update Storybook story setup or help-model docs URL normalization so `Open documentation` stays inside the GitHub Pages deployment during PR review.
