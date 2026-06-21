## 2026-06-20 17:23 +01:00

- Establish the docs-consistency subagent charter so published docs, command help, and runtime behavior can be cross-checked across the amended surfaces.

the actions you take

- Created the docs consistency subagent log.
- Reserved this log for docs page review, example cross-checking, removed-command checks, and stale-content detection.

the observations and results that you make

- Because the PR heavily edited domain docs and help surfaces, documentation accuracy is a first-class test target.

## 2026-06-20 18:05 +01:00

- Review broad published docs/content surfaces for issue #226 / PR #231 using only the deployed test environment, compare representative docs examples and help/navigation against live app surfaces where practical, and check for stale, removed, or deprecated visibility problems.

the actions you take

- Reviewed representative changed published domain docs pages under the deployed nested site.
- Sampled command names, canonical names, and example shapes from the published `airline`, `animal`, `autoIncrement`, `color`, `finance`, `internet`, `literal`, and `string` pages.
- Opened the deployed test-environment home, nested site, app, and generator surfaces.
- Inspected live inline docs/help link targets exposed by the deployed generator/app surfaces.
- Compared published command naming with live command-picker naming where the deployed UI exposed it.
- Tried representative docs-derived domain examples in the deployed generator flow to compare docs example shape against the live params-entry affordance.
- Checked sampled docs pages and sampled live surfaces for obvious removed/deprecated labels or commands.

the observations and results that you make

- The deployed generator/app help and docs navigation is inconsistent with the deployed nested-site base path: sampled live links pointed at mixed targets including `https://eviltester.github.io/grid-table-editor/docs/...`, `https://eviltester.github.io/docs/...`, and `https://anywaydata.com/...` instead of consistently using `https://eviltester.github.io/grid-table-editor/site/docs/...`.
- The published airline docs page uses aggregate and nested command names such as `airline.airline`, `airline.airplane`, `airline.airport`, `airline.airline.iataCode`, and `airline.airline.name`, but the live deployed command-picker surface exposed flattened names like `airline.iataCode`, `airline.name`, `airplane.iataTypeCode`, and `airport.iataCode`; the docs and picker naming model do not line up cleanly.
- Published docs examples use full invocation strings such as `autoIncrement.sequence(start=10, step=5)`, `literal.value(value="Pending")`, and `string.alpha(length=5, casing="upper")`, while the live deployed domain UI splits command selection from params entry and rejects bare params text unless it is wrapped for the separate params field; that makes docs-to-picker execution non-obvious.
- On the sampled domain docs pages there were no explicit `deprecated` or `removed` markers or obvious removed-command leakage. That is a limited positive signal only for the sampled pages.
