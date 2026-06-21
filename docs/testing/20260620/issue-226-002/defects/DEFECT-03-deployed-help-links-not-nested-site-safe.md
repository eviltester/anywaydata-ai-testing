# DEFECT-03: Deployed Help And Docs Links Are Not Consistently Nested-Site-Safe

## Summary

Help and docs links exposed by the deployed app/generator drift across mixed hosts and paths, including `/grid-table-editor/docs/...`, `eviltester.github.io/docs/...`, and `anywaydata.com/...`, instead of consistently staying inside the deployed nested test-environment docs path.

## Why This Matters

- Reviewers in the deployed test environment can be sent to the wrong host or wrong base path.
- This weakens trust in the test environment and makes docs parity harder to validate.
- The PR included broad docs/help changes, so path correctness is part of the changed surface.

## Environment

- Deployed app: [app.html](https://eviltester.github.io/grid-table-editor/app.html)
- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Expected nested docs base: `https://eviltester.github.io/grid-table-editor/site/docs/...`

## Reproduction

1. Open the deployed app or generator.
2. Trigger several inline docs/help links from changed surfaces.
3. Inspect the link destinations or navigate through them.

## Expected Result

- Deployed help/docs links should consistently target the intended nested docs base for the deployed environment.

## Actual Result

- Sampled links pointed to mixed targets including:
  - `https://eviltester.github.io/grid-table-editor/docs/...`
  - `https://eviltester.github.io/docs/...`
  - `https://anywaydata.com/...`

## Evidence

- Docs consistency log: [docs-consistency-test-log.md](../docs-consistency-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs/help link generation paths
- environment-specific site base-path handling
- any code that hardcodes docs hostnames instead of using the deployed nested base

## Investigation Questions

- Which links are intentionally external versus accidentally externalized?
- Are there separate link builders for app, generator, and docs-generated command pages?
- Is the deploy target base path injected inconsistently?

## Fix Verification Ideas

- Spot-check links from generator, app, and picker/help surfaces after the change.
- Confirm nested-site-safe behavior from the deployed environment.
- Verify intentional external links are still deliberate and consistently labeled.

