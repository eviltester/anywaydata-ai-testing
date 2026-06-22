---
## 2026-06-21 15:35 +01:00

- Establish the negative-validation subagent setup first so the deployed-only pass stays append-only, targets the PR #234 link-consistency risk, and uses a dedicated Playwright CLI session from the start.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the issue #233 / PR #234 session prompt and confirmed this subagent owns only `negative-validation-test-log.md`.
- Confirmed the allowed target is the deployed test environment at `https://eviltester.github.io/grid-table-editor/` only.
- Confirmed the dedicated browser session name will be `issue233-negative-validation`.
- Confirmed the writable evidence area for any screenshots is `docs/testing/20260621/issue-233-001/screenshots/`.
- Prepared to focus on malformed or root-relative docs/blog paths, stale production links, inconsistent variants across app/help/docs surfaces, broken or surprising navigation outcomes, and command-help `Learn more` failures.
- Prepared to sample representative command/help flows rather than one isolated command family, with emphasis on negative and edge routing cases.

the observations and results that you make

- The changed surface is small in code terms but broad in runtime reach because help-tooltip and docs URL rewriting can affect many commands and multiple shipped pages.
- This subagent should treat link destinations and navigation outcomes as the primary oracle, with command selection used mainly to reach varied help surfaces.

---
## 2026-06-21 15:42 +01:00

- Run a substantive negative pass against deployed link consistency so I can prove which link variants work, which fail with 404s, which still leak to production, and whether command-help routing is consistent across app, generator, docs, and method-picker surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in a dedicated Playwright CLI session named `issue233-negative-validation`.
- Confirmed the positive-control root page links exposed `./site/`, `./app.html`, and `./generator.html`.
- Clicked `Open app.html` on the root page and inspected the deployed app at `https://eviltester.github.io/grid-table-editor/app.html`.
- Enumerated docs/blog-style anchors from the live `app.html` DOM and sampled the actual href families surfaced by the deployed UI:
  - nested-site positive links such as `https://eviltester.github.io/grid-table-editor/site/docs/intro` and `https://eviltester.github.io/grid-table-editor/site/blog`
  - root-relative links such as `https://eviltester.github.io/docs/editing-data/text-editing`
  - repo-relative links such as `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
  - stale production links such as `https://anywaydata.com/docs/test-data/generate-to-file`
- Opened those sampled URLs in separate tabs to classify outcomes:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
  - `https://eviltester.github.io/docs/editing-data/text-editing`
  - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
  - `https://anywaydata.com/docs/test-data/generate-to-file`
  - `https://eviltester.github.io/grid-table-editor/site/blog`
- Captured screenshots for the negative navigation outcomes:
  - `screenshots/negative-validation-root-relative-docs-404.png`
  - `screenshots/negative-validation-repo-relative-docs-404.png`
  - `screenshots/negative-validation-stale-production-docs.png`
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` and repeated the link audit on the standalone generator.
- Verified the generator top nav still exposes the positive nested-site links `./site/docs/intro` and `./site/blog`.
- Sampled the generator row-level help affordances in multiple command-help states:
  - default `regex` row with `Regex data help`
  - switched the row type combobox from `regex` to `domain`
  - opened the domain method picker with `Select domain command`
  - selected representative command-detail samples from different changed families inside the picker:
    - `finance.pin`
    - `helpers.slugify`
- Recorded the actual docs/help URLs exposed by those generator surfaces:
  - family-level help icons:
    - `Regex data help` -> `https://anywaydata.com/docs/test-data/regex-test-data`
    - `Domain data help` -> `https://anywaydata.com/docs/test-data/domain/domain-test-data`
  - command-detail docs links inside the method picker:
    - `finance.pin` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance`
    - `helpers.slugify` -> `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`
- Tried to click the visible `Domain data help` icon while the method-picker overlay was open.
- Observed the click fail because the overlay tab strip intercepted pointer events before the stale help link could be activated directly.
- Techniques and heuristics used:
  - exploratory testing focused on navigation behavior
  - negative testing of malformed/root-relative/repo-relative/prod-target link variants
  - consistency/oracle checking across root page, app, generator, docs, and blog surfaces
  - representative command-family sampling (`regex`, `domain`, `finance`, `faker/helpers`)
  - positive controls first, then broken-path and stale-link follow-up
  - repeatability checks using direct URL opens after DOM inspection

the observations and results that you make

- Positive control passed on the root page and nested-site shell:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro/` opened successfully with title `About | AnyWayData - Data Table Editor & Generator`.
  - `https://eviltester.github.io/grid-table-editor/site/blog/` opened successfully with title `Blog | AnyWayData - Data Table Editor & Generator`.
- Root-relative docs links are still broken in the deployed app/generator surfaces:
  - `https://eviltester.github.io/docs/editing-data/text-editing` opened `Page not found · GitHub Pages`.
  - This confirms `/docs/...` style links still escape the repo subpath and land on the wrong GitHub Pages host path.
- Repo-relative docs links are also still broken when they omit the nested `site/` segment:
  - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options` opened `Page not found · GitHub Pages`.
  - This is a different failure mode from root-relative links because it stays under `/grid-table-editor/` but still misses the nested-site mount point.
- Stale production docs links remain visible in the deployed test environment:
  - `https://anywaydata.com/docs/test-data/generate-to-file/` opened a live production docs page instead of staying inside the deployed review environment.
  - This makes the test environment navigation inconsistent and can hide testenv-only differences by silently switching the user to production content.
- The app and generator both expose mixed link variants at the same time rather than a single consistent routing strategy:
  - good nested-site links for top-level Docs/Blog navigation
  - broken root-relative `/docs/...`
  - broken repo-relative `docs/...`
  - stale production `https://anywaydata.com/docs/...`
- Generator command-help routing is internally inconsistent:
  - command-level `Open documentation` links for sampled commands were rewritten correctly to nested-site URLs under `/grid-table-editor/site/docs/...`
  - nearby family-level help icons for the same overall workflow still pointed to `https://anywaydata.com/docs/...`
  - this was reproduced across two different command/help areas:
    - domain sample `finance.pin`
    - faker/helper sample `helpers.slugify`
- The method-picker UI adds its own navigation/usability edge case:
  - the visible `Domain data help` anchor could not be clicked directly while the overlay was open because overlay content intercepted pointer events
  - even ignoring the stale destination, the activation path is fragile in-context
- Repeatability is strong for the main negative findings:
  - the 404 outcomes are deterministic for both sampled broken URL classes
  - the stale production-link outcome is deterministic
  - the command-level versus family-level inconsistency reproduced across multiple representative command families

---
