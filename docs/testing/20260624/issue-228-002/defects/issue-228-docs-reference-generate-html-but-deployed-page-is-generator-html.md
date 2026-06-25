# Published Docs Reference `generate.html` But The Deployed Workflow Uses `generator.html`

## Summary

Published docs still describe the web workflow page as `generate.html`, but in the deployed review environment the working page is `generator.html` and `generate.html` returns `404`.

This is a repeatable docs/runtime mismatch that can send users to a dead page while they follow published guidance.

## Environment

- Story: issue `#228`
- PR under review: `#243`
- Deployed build observed on landing page:
  - Branch: `codex/228-improve-command-definition`
  - Commit: `fb9e8e2049e1`
  - Built: `2026-06-24T20:13:50.037Z`

## Steps To Reproduce

1. Open the published docs page `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`.
2. Read the overview text describing the browser-based workflows.
3. Follow the published naming and request `https://eviltester.github.io/grid-table-editor/generate.html`.
4. Compare that result with `https://eviltester.github.io/grid-table-editor/generator.html`.

## Actual Result

- The published docs describe the workflow as `generate.html`.
- `generate.html` returns `404` in the deployed environment.
- `generator.html` is the live working page and is the page linked from the landing page for current testing.

## Expected Result

Published docs should name and link the working deployed page consistently so users are not sent to a `404`.

## Evidence

- Docs page reviewed: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
- Working page: `https://eviltester.github.io/grid-table-editor/generator.html`
- Dead page: `https://eviltester.github.io/grid-table-editor/generate.html`

## Notes For Investigation

- This looks like a naming drift between docs content and deployed routing rather than a runtime generator failure.
- Because issue `#228` is about consolidating command/help definitions, this still matters: the docs/help layer is part of the changed surface and currently gives incorrect navigation guidance.
