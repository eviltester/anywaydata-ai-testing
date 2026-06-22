# Defect 03: Root And Nested `/site/` Surfaces Still Disagree

## Summary

The deployment does not present one consistent routing model across equivalent surfaces. Some links are correctly rewritten on root pages or nested `/site/` pages, but related links on the same or sibling pages are still stale or broken.

## Repeatability

Repeatable.

## Confirmed Contrasts

- Root `app.html` and root `generator.html` expose a mix of:
  - correct nested `/site/docs/...` and `/site/blog`
  - stale `anywaydata.com` docs links
  - broken `/docs/...` links
  - broken `docs/...` links
- `combinatorial.html` and `webmcp.html` stayed clean in the sampled pass.
- `site/app.html` and `site/generator.html` improve some relative `docs/...` links because they run under `/site/`, but they still leak root-relative `/docs/...` links and row-level `Regex data help` production links.

## Reproduction

1. Compare `https://eviltester.github.io/grid-table-editor/generator.html` with `https://eviltester.github.io/grid-table-editor/site/generator.html`.
2. On both pages, inspect:
   - top docs/blog navigation
   - top tooltip help
   - row-level `Regex data help`
3. Observe that top tooltip/docs flows can be nested-site-safe while row-level family help still leaks to production.
4. Compare `https://eviltester.github.io/grid-table-editor/app.html` with `https://eviltester.github.io/grid-table-editor/site/app.html`.
5. Observe that nested pages partially fix relative links while root-relative `/docs/...` leaks remain.

## Expected

Equivalent surfaces should use the same effective routing strategy for owned docs and blog content.

## Actual

The deployment presents mixed routing behaviors depending on which page and which help-entry type is used.

## Why This Matters

- Users get inconsistent outcomes from visually similar help actions.
- Test results become harder to reason about because some flows silently leave the testenv while others stay inside it.
- It suggests the fix is only partial across different rendering seams.

## Supporting Evidence

- [cross-surface-root-links-test-log.md](../cross-surface-root-links-test-log.md)
- [command-coverage-test-log.md](../command-coverage-test-log.md)
- [docs-consistency-test-log.md](../docs-consistency-test-log.md)

## Notes For Investigation

- This defect is broader than one stale link. It points to multiple rewrite seams:
  - build-time root page rewriting
  - runtime tooltip HTML rewriting
  - direct visible help-link generation
  - nested `/site/` relative-link resolution
