# DEFECT-02 Broken GitHub Pages Docs Link

## Problem

The deployed appÃ¢â‚¬â„¢s Test Data help exposes a root-relative `/docs/...` link that resolves to a GitHub Pages 404 instead of the nested-site docs for this test environment.

## Environment

- Deployed app on GitHub Pages test environment
- Root-relative target observed as `/docs/test-data/test-data-generation`

## Reproduction

1. Open the deployed app in the GitHub Pages test environment.
2. Open the Test Data help tooltip.
3. Activate `Learn more`.

## Expected

The link should open the matching docs page for this deployment, under the repo-based test-environment site path.

## Actual

The root-relative link resolves to `https://eviltester.github.io/docs/test-data/test-data-generation`, which returns a GitHub Pages `Page not found` page.

## Evidence

- [docs-consistency-test-log.md](../docs-consistency-test-log.md)
- [issue-226-third-session-test-report.md](../issue-226-third-session-test-report.md)

## Follow-Up

- Audit other in-app help links for the same root-relative path behavior.
