# Defect 002: Testenv pages still publish `anywaydata.com` canonical and analytics URLs

## Summary

Multiple deployed testenv pages still expose `anywaydata.com` in post-load metadata, including canonical URLs and plausible analytics configuration.

## Why This Matters

Issue `#233` says the test environment should not have `anywaydata.com` URLs and specifically mentions AI tooling reading the environment. Canonical tags and analytics attributes are still part of the delivered page and remain visible to crawlers, browser tooling, and DOM inspection.

## Environment

- Deployed environment root: `https://eviltester.github.io/grid-table-editor/`

## Steps To Reproduce

1. Open any of the affected deployed pages.
2. Inspect the rendered DOM after page load.
3. Search for `anywaydata.com`.

## Expected

Deployed testenv pages should not expose `anywaydata.com` URLs in canonical metadata or environment-specific analytics configuration.

## Actual

Observed examples:

- Root page canonical: `https://anywaydata.com/`
- `app.html` canonical: `https://anywaydata.com/app.html`
- `generator.html` canonical: `https://anywaydata.com/generator.html`
- `combinatorial.html` canonical: `https://anywaydata.com/combinatorial.html`
- `webmcp.html` canonical: `https://anywaydata.com/webmcp.html`
- `writer-schema.html` canonical: `https://anywaydata.com/writer-schema.html`
- `app.html`, `site/app.html`, and `combinatorial.html` include plausible `data-domain="anywaydata.com"`

## Repeatability

- Repeatable

## Evidence

- Supporting log: [../issue-233-test-log.md](../issue-233-test-log.md)
- Supporting log: [../routing-consistency-test-log.md](../routing-consistency-test-log.md)

## Notes

- The visible Regex help link defect appears fixed, so this is a deeper remaining leak in the page metadata layer rather than the same failure mode as the original visible help-link issue.
