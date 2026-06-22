---
## 2026-06-21 15:55 +01:00

- Record an administrative correction so the file stays append-only while making the timing trace explicit for the main agent.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Reviewed the current log after appending the substantive cross-surface entry.
- Noted that the earlier setup block with timestamp `2026-06-21 15:49 +01:00` now appears after the substantive `2026-06-21 15:44 +01:00` block in file order.
- Chose not to rewrite or reorder prior content because this session requires append-only logging.

the observations and results that you make

- Interpret the timestamps rather than file-position alone for chronology:
  - the `15:49` block is the setup/context entry for this lane
  - the `15:44` block contains the substantive deployed-environment observations gathered afterward and written as the main evidence entry
- No testing evidence changed as a result of this correction; this is only a traceability note for the main agent.

---
## 2026-06-21 15:44 +01:00

- Execute a broad cross-surface deployed-site pass to compare root pages against nested `/site/` pages, confirm whether suspicious link patterns are actually broken or merely inconsistent, and record concrete navigation destinations outside the command-help tooltip lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Opened `https://eviltester.github.io/grid-table-editor/` in a dedicated Playwright CLI browser session named `issue233-cross-surface`.
- Extracted the root landing page anchors and confirmed the top-level launch surface exposes these direct destinations:
  - `https://eviltester.github.io/grid-table-editor/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/combinatorial.html`
  - `https://eviltester.github.io/grid-table-editor/webmcp.html`
  - `https://eviltester.github.io/grid-table-editor/writer-schema.html`
  - `https://eviltester.github.io/grid-table-editor/storybook/index.html`
  - `https://eviltester.github.io/grid-table-editor/site/`
- Navigated directly to each named surface and used browser-side DOM inspection to count and sample anchors matching these risk patterns:
  - stale `anywaydata.com` destinations
  - root-relative `href` values starting `/docs` or `/blog`
  - relative `href` values starting `docs/` or `blog`
  - nested-site destinations containing `/site/`
- Checked `app.html` at `https://eviltester.github.io/grid-table-editor/app.html`.
  - Observed nav links `Docs -> https://eviltester.github.io/grid-table-editor/site/docs/intro` and `Blog -> https://eviltester.github.io/grid-table-editor/site/blog`.
  - Sampled in-page content links and found mixed destination styles on the same page:
    - root-relative leak example: raw `/docs/editing-data/text-editing` resolved to `https://eviltester.github.io/docs/editing-data/text-editing`
    - relative docs example: raw `docs/editing-data/import-from-file` resolved to `https://eviltester.github.io/grid-table-editor/docs/editing-data/import-from-file`
    - stale external docs example: `https://anywaydata.com/docs/category/data-formats`
- Checked `generator.html` at `https://eviltester.github.io/grid-table-editor/generator.html`.
  - Recorded counts:
    - `anywaydata.com` links: 43
    - root-relative `/docs` or `/blog` links: 24
    - relative `docs/` or `blog` links: 210
    - nested `/site/` links: 2
  - Sampled representative destinations:
    - `https://anywaydata.com/docs/test-data/generate-to-file`
    - `https://eviltester.github.io/docs/editing-data/text-editing`
    - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- Checked `combinatorial.html` at `https://eviltester.github.io/grid-table-editor/combinatorial.html`.
  - Recorded counts:
    - `anywaydata.com` links: 0
    - root-relative `/docs` or `/blog` links: 0
    - relative `docs/` or `blog` links: 0
    - nested `/site/` links: 2
  - Observed only the expected nav destinations:
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `https://eviltester.github.io/grid-table-editor/site/blog`
- Checked `webmcp.html` at `https://eviltester.github.io/grid-table-editor/webmcp.html`.
  - Recorded counts:
    - `anywaydata.com` links: 0
    - root-relative `/docs` or `/blog` links: 0
    - relative `docs/` or `blog` links: 0
    - nested `/site/` links: 2
  - Observed only the expected nav destinations:
    - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `https://eviltester.github.io/grid-table-editor/site/blog`
- Checked `writer-schema.html` at `https://eviltester.github.io/grid-table-editor/writer-schema.html`.
  - Recorded counts:
    - `anywaydata.com` links: 8
    - root-relative `/docs` or `/blog` links: 4
    - relative `docs/` or `blog` links: 35
    - nested `/site/` links: 0
  - Sampled representative destinations:
    - `https://anywaydata.com/docs/test-data/regex-test-data`
    - `https://eviltester.github.io/docs/editing-data/text-editing`
    - `https://eviltester.github.io/grid-table-editor/docs/data-formats/markdown/options`
- Checked `storybook/index.html`, which redirected to `https://eviltester.github.io/grid-table-editor/storybook/index.html?path=/docs/pages-app-page--docs`.
  - Observed no matching `anywaydata.com`, `/docs`, `/blog`, or `/site/` anchor set on that default docs view.
- Checked the nested site landing page at `https://eviltester.github.io/grid-table-editor/site/`.
  - Observed consistent nested-site routing examples:
    - `AnyWayData -> https://eviltester.github.io/grid-table-editor/site/`
    - `App -> https://eviltester.github.io/grid-table-editor/site/app.html`
    - `Docs -> https://eviltester.github.io/grid-table-editor/site/docs/intro`
    - `Blog -> https://eviltester.github.io/grid-table-editor/site/blog`
- Navigated to nested docs and blog pages to compare nested-site rewriting:
  - `https://eviltester.github.io/grid-table-editor/site/docs/intro`
  - `https://eviltester.github.io/grid-table-editor/site/blog`
  - On both pages, observed links stayed inside the `/grid-table-editor/site/...` space and did not expose sampled stale `anywaydata.com`, root `/docs`, or root `/blog` leaks.
- Validated actual destinations rather than relying only on href sampling:
  - Navigated to `https://eviltester.github.io/grid-table-editor/docs/editing-data/text-editing` after seeing it generated from root-surface relative docs links.
  - Observed destination result: `Page not found · GitHub Pages` with visible `404 File not found`.
  - Navigated to `https://eviltester.github.io/grid-table-editor/site/app.html` from the nested-site route family.
  - Observed destination result: working app page with title `Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData`.
  - Navigated to `https://anywaydata.com/docs/test-data/generate-to-file` from the stale-link family.
  - Observed destination result: live external docs page titled `Generate to File | AnyWayData - Data Table Editor & Generator`.
- Inspected `https://eviltester.github.io/grid-table-editor/site/app.html` separately to compare it with root `app.html`.
  - Recorded counts:
    - `anywaydata.com` links: 57
    - root-relative `/docs` or `/blog` links: 33
    - relative `docs/` or `blog` links: 281
    - nested `/site/` links: 296
  - Observed an important rewrite difference:
    - on `/site/app.html`, relative `docs/...` links resolve correctly to `https://eviltester.github.io/grid-table-editor/site/docs/...`
    - but root-relative `/docs/...` links still escape to `https://eviltester.github.io/docs/...`
- Applied these techniques and heuristics during the pass:
  - exploratory testing across named surfaces
  - risk-based sampling of link families most likely to break under base-path rewriting
  - consistency/oracle checking between root and nested-site versions of similar surfaces
  - documentation-link testing by following sampled destinations
  - state-flow discipline by keeping one dedicated browser session and re-running suspect navigations sequentially when concurrent navigation caused session-race noise

the observations and results that you make

- Confirmed defect pattern: root-surface pages `app.html`, `generator.html`, and `writer-schema.html` still expose mixed link families, including:
  - stale external `anywaydata.com` docs links
  - root-relative `/docs/...` links that escape to `https://eviltester.github.io/docs/...`
  - relative `docs/...` links that resolve to `https://eviltester.github.io/grid-table-editor/docs/...` instead of the nested `/site/docs/...` area
- Confirmed broken destination, not just inconsistent markup:
  - `https://eviltester.github.io/grid-table-editor/docs/editing-data/text-editing` returns a GitHub Pages `404 File not found` page.
- Confirmed parity gap between surfaces:
  - `combinatorial.html` and `webmcp.html` present only the expected nested-site docs/blog nav.
  - `app.html`, `generator.html`, and `writer-schema.html` expose much noisier mixed link rewriting.
  - nested `site/docs/intro` and `site/blog` stay consistently inside `/grid-table-editor/site/...`.
- Confirmed a second parity gap inside the app surface itself:
  - nested `site/app.html` rewrites relative `docs/...` links into working `/site/docs/...` destinations,
  - but even the nested version still leaks root-relative `/docs/...` links to `https://eviltester.github.io/docs/...`.
- The stale `anywaydata.com` links are not broken in the narrow availability sense because the external pages load, but they are inconsistent with the deployed test-environment routing model and create cross-surface drift.
- Storybook did not expose the same sampled link families on its default docs view during this pass, so this lane did not confirm a Storybook-specific root-link regression.

---
## 2026-06-21 15:49 +01:00

- Set up the cross-surface root-link consistency subagent log first so the later deployed-environment checks can be appended in the required format and stay clearly scoped to root pages, nested-site pages, and cross-page link rewriting outside the command-help tooltip lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Read the session goal prompt at `docs/testing/20260621/issue-233-001/issue-233-session-goal-prompt.md` to confirm the append-only log structure, deployed-environment-only constraint, and the need to focus on exploratory evidence rather than local repo verification.
- Read sibling subagent logs to mirror the required entry structure and align this lane with the session focus on URL rewriting, nested-site routing, and user-visible parity problems.
- Confirmed the owned output file for this subagent is `docs/testing/20260621/issue-233-001/cross-surface-root-links-test-log.md`.
- Confirmed the test target for this lane is only the deployed environment at `https://eviltester.github.io/grid-table-editor/`.
- Declared the cross-surface scope for this lane:
  - the root landing page
  - `app.html`
  - `generator.html`
  - `combinatorial.html`
  - `webmcp.html`
  - `writer-schema.html`
  - storybook
  - the nested `/site/` landing and docs pages as reachable from the deployed environment
- Declared the main cross-surface checks for this lane:
  - stale `anywaydata.com` links
  - broken root-relative `/docs` or `/blog` links
  - inconsistent nested-site rewriting between root pages and `/site/` pages
  - parity gaps where one surface routes correctly and another leaks an outdated host or path
- Confirmed this subagent will use a dedicated Playwright CLI session name `issue233-cross-surface` and will only write to the owned log file plus the owned screenshots folder if screenshots become useful.

the observations and results that you make

- The highest-risk areas for this lane are the transitions between root pages and nested `/site/` pages, because link rewriting can appear correct in one surface while failing in another due to different base-path assumptions.
- The strongest consistency oracles for this lane are:
  - links to owned docs should resolve under `https://eviltester.github.io/grid-table-editor/site/` when launched from the deployed environment
  - links should not leak stale `https://anywaydata.com/...` destinations unless intentionally external
  - links should not point to root-relative `/docs` or `/blog` paths that would escape the GitHub Pages nested site
  - equivalent navigation affordances on different pages should resolve to comparable destinations

---
