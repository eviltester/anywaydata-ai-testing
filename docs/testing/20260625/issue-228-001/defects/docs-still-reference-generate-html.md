# Published Docs Still Reference `generate.html`

## Summary

Several published docs pages still describe the generator page as `generate.html`, but the deployed environment exposes `generator.html`. Both root and nested `generate.html` URLs return `404`.

## Environment

- Landing page: `https://eviltester.github.io/grid-table-editor/`
- Branch: `codex/228-improve-command-definition`
- Commit: `a3b39ddcfe0f`
- Build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`.
2. Search the page text for `generate.html`.
3. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`.
4. Search the page text/metadata for `generate.html`.
5. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`.
6. Search the page text for `generate.html`.
7. Compare route availability:
   - `https://eviltester.github.io/grid-table-editor/generate.html`
   - `https://eviltester.github.io/grid-table-editor/generator.html`
   - `https://eviltester.github.io/grid-table-editor/site/generate.html`
   - `https://eviltester.github.io/grid-table-editor/site/generator.html`

## Expected Result

Published docs should consistently refer to the currently deployed generator route, `generator.html`, or avoid page-file names if the route is no longer meant to be user-facing.

## Actual Result

- `test-data/test-data-generation` contains visible text such as `Generate to File (generate.html)`.
- `test-data/generate-to-file` contains metadata/text such as `Use generate.html`.
- `test-data/Schema-Definition` says the schema editor is in `app.html` and `generate.html`.
- `https://eviltester.github.io/grid-table-editor/generate.html` returns `404`.
- `https://eviltester.github.io/grid-table-editor/site/generate.html` returns `404`.
- `https://eviltester.github.io/grid-table-editor/generator.html` returns `200`.
- `https://eviltester.github.io/grid-table-editor/site/generator.html` returns `200`.

## Severity

Medium.

This is a docs/content consistency regression that can send users to a dead page or teach the wrong route name for the changed generator surface.

## Notes

The app and generator shell links sampled in this pass point to `generator.html`; the stale `generate.html` references appear concentrated in the published docs content.
