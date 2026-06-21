## 2026-06-20 23:25 +01:00

- Establish the docs-consistency subagent charter so this lane can compare published docs, picker/help content, names, links, and runtime behavior across the changed help surfaces.

the actions you take

- Created the docs consistency log for the third session.
- Reserved this log for docs/help/runtime parity checks and stale-content investigation.

the observations and results that you make

- This lane should focus on cross-surface consistency, stale docs leakage, and example-transfer clarity from docs into the live workflow.

## 2026-06-20 23:35 +01:00

- Compare deployed app help, method-picker content, published docs links, and live domain-command discoverability for stale paths, stale names, removed-command leakage, and example-style drift across the issue #226 / PR #231 command-help surfaces.

the actions you take

- Opened the deployed test environment and exercised the live app and generator surfaces with Playwright CLI against `https://eviltester.github.io/grid-table-editor/`, `app.html`, and `generator.html`.
- Re-checked Chrome DevTools connectivity in this thread. I could start Chrome with a remote-debugging port, but the `mcp__chrome_devtools` connector still could not attach to the expected `DevToolsActivePort`, so I treated Playwright as the reliable execution path for this session.
- Opened the Test Data help tooltip in `app.html` and inspected the exposed `Learn more` target from the live accessibility snapshot.
- Verified the target path behind that help link by opening `https://eviltester.github.io/docs/test-data/test-data-generation` directly in the deployed environment.
- Opened the generator method picker for `domain` commands and used filter-driven exploratory probing to inspect `internet.httpMethod`, `internet.userName`, and the removed `image.urlLoremFlickr` surface in the live picker.
- Inspected the live pickerÃ¢â‚¬â„¢s detail panel, including `Open documentation` links, parameter tables, and usage examples for `internet.httpMethod` and `internet.username`.
- Fetched and compared the published docs pages for:
  - `https://anywaydata.com/docs/test-data/test-data-generation`
  - `https://anywaydata.com/docs/test-data/domain/domain-test-data`
  - `https://anywaydata.com/docs/test-data/domain/internet`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
- Used consistency-oracle checking, docs testing, targeted stale-name probing, and risk-based sampling around newly added commands, removed commands, and mixed documentation entry points.
- Follow-up ideas:
  - Check whether other in-app help popovers still emit root-relative `/docs/...` links that escape the GitHub Pages repo base path.
  - Compare more command-family pages between `anywaydata.com` and the embedded `/site` docs to see whether the stale/updated split is broad or limited to the internet/domain pages.
  - Spot-check whether picker examples for parameterless methods intentionally prefer bare commands on some surfaces and parenthesized full calls on others, or whether that drift is accidental.

the observations and results that you make

- Confirmed defect: the deployed appÃ¢â‚¬â„¢s Test Data help tooltip exposes `Learn more -> /docs/test-data/test-data-generation`. In the GitHub Pages test environment that resolves to `https://eviltester.github.io/docs/test-data/test-data-generation`, which returned a GitHub Pages `Page not found` page instead of the test-environment docs. This is a concrete path-drift break between runtime help and published docs.
- Cross-surface inconsistency: the live runtime currently sends users to two different docs surfaces for the same feature area. The inline schema help icons point to `https://anywaydata.com/...`, while the method-picker detail paneÃ¢â‚¬â„¢s `Open documentation` link points to `https://eviltester.github.io/grid-table-editor/site/...`. Those are not just different hosts; they currently expose materially different content.
- Confirmed newly added command visibility in runtime: filtering the live domain picker for `internet.httpMethod` returned a selectable command card with parameter details for `commonOnly` and `excludes`, plus structured usage examples and return samples. This shows the new command is present and documented in the live picker.
- Confirmed removed-command cleanup in runtime picker: filtering the live domain picker for `image.urlLoremFlickr` produced no method results and left the details pane at `No method selected`. That is consistent with the PR summary claim that the deprecated command was removed from available commands.
- Stale published-doc evidence on `anywaydata.com`: the public `internet` domain page still exposes older/staler content than the embedded `/site` docs and the live picker. The sampled production page included the old `internet.userName` alias section and older example formatting, while the live picker and the embedded `/site` docs only surfaced `internet.username`.
- Naming drift example: searching the live picker for `internet.userName` did not reveal a separate `internet.userName` method. Instead, it resolved to the current `internet.username` entry, which suggests production docs still advertise an outdated or superseded name that no longer exists as a first-class live picker item.
- Example-style drift remains visible across surfaces. The production `anywaydata.com` domain docs still show many old-style parenthesized examples such as `internet.url()` and `internet.jwtAlgorithm()`, while the embedded `/site` docs and picker examples are more structured but still not fully uniform, mixing bare command forms, parenthesized full calls, and `Params field` guidance. A reviewer trying to transfer examples between surfaces could still encounter inconsistency rather than one clear canonical representation.
- The embedded `/site` docs looked closer to the live picker than `anywaydata.com` did in this sample. For `internet.httpMethod`, the picker linked to the `/site` docs and the `/site` docs reflected the new command family, whereas the production host showed broader stale-content drift in the sampled `internet` page.
- Heuristics outcome: the highest-value docs-consistency risks are not missing command discovery in the live picker, but stale or broken navigation paths and disagreement between the two published doc surfaces users can reach from the deployed app.
