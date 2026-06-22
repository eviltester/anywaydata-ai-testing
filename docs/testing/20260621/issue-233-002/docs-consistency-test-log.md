---
## 2026-06-21T18:43:34+01:00

- What you think you want to do and why

Establish the docs/help consistency charter before exploratory testing so the session has a clear oracle, scope, and heuristic set for issue #233 / PR #234 focused on deployed help surfaces and published documentation only.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created this log file at `docs/testing/20260621/issue-233-002/docs-consistency-test-log.md` before substantive testing. Set scope to the deployed site at `https://eviltester.github.io/grid-table-editor/` and linked nested-site docs pages only. Defined review targets to include the root page, nested `site/` pages, the deployed app, generator, writer-schema, help/documentation entry points, and downstream linked docs pages. Defined primary oracle as actual click destinations, resulting browser tab URLs, and visible runtime behavior rather than static href inspection alone. Declared heuristics/techniques for the session: link tour, page comparison, consistency comparison across duplicate surfaces, stale content detection, command/example audit, navigation boundary checking for nested-site containment, terminology comparison, and follow-the-help exploratory branching.

the observations and results that you make

The session charter is now recorded before testing. The planned focus is docs/help/content consistency rather than code behavior, with emphasis on whether help links and docs destinations stay aligned with the nested published site structure required by issue #233.

---
## 2026-06-21T18:49:42+01:00

- What you think you want to do and why

Start from the published test-environment landing pages and prove where the main root and nested-site entry links actually take the browser, because issue #233 is specifically about whether linked destinations stay inside the nested published site when they should.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/` in a real browser session with Playwright CLI. Reviewed the root test-environment page and captured the visible links for `site/`, `app.html`, `generator.html`, and `writer-schema.html`. Clicked `Open site/` from the root landing page and confirmed the current tab URL changed to `https://eviltester.github.io/grid-table-editor/site/`. On the nested `site/` page, clicked the top-nav `App` link and observed a new tab open at `https://eviltester.github.io/grid-table-editor/site/app.html`. Also created a fresh tab back to `https://eviltester.github.io/grid-table-editor/`, clicked `Open app.html`, and observed the current tab navigate to `https://eviltester.github.io/grid-table-editor/app.html`. Then created another fresh tab at the root landing page, clicked `Open writer-schema.html`, and observed the current tab navigate to `https://eviltester.github.io/grid-table-editor/writer-schema.html`.

the observations and results that you make

The root landing page is internally consistent with its own role as a test-environment index: root links stay under `/grid-table-editor/`, while `Open site/` enters the nested Docusaurus site at `/grid-table-editor/site/`. The nested site opens `site/app.html` from its own top navigation, which suggests the intended nested-site experience exists. The root app at `/grid-table-editor/app.html` is a different visible surface from the nested app at `/grid-table-editor/site/app.html`: the root app does not expose the Docusaurus top navigation shell, while the nested app does. The writer-schema page is only exposed from the root landing page in this pass and also lives outside the nested site at `/grid-table-editor/writer-schema.html`, which is acceptable only if that page is intentionally root-scoped rather than expected to inherit nested-site navigation.

---
## 2026-06-21T18:49:42+01:00

- What you think you want to do and why

Follow the help and nav paths inside the app and generator surfaces, because the most likely consistency failure is that a nested `site/` surface contains links that unexpectedly jump back out to root pages or stale docs destinations.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Worked in the nested app tab at `https://eviltester.github.io/grid-table-editor/site/app.html`. Reviewed the visible top navigation and noted the displayed destinations for `AnyWayData`, `Generator`, `Docs`, and `Blog`. Clicked `Generator` from `site/app.html` and observed the current tab move to `https://eviltester.github.io/grid-table-editor/generator.html` rather than a nested `site/...` URL. On `generator.html`, opened the inline screen help so the `Generate To File docs` link was visible, then clicked the `Regex data help` icon beside the schema rule type. That interaction opened docs tabs at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/` and `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`. On the nested app tab, clicked `AnyWayData` and observed the current tab leave `https://eviltester.github.io/grid-table-editor/site/app.html` and navigate to the root test-environment page `https://eviltester.github.io/grid-table-editor/`. Took a full-page screenshot of the root generator surface at `docs/testing/20260621/issue-233-002/screenshots/docs-consistency-generator-root-full.png`.

the observations and results that you make

This is the clearest issue-233-style inconsistency from the session. Inside `site/app.html`, the visible top nav is mixed-scope:

`AnyWayData` leaves the nested site and returns to `/grid-table-editor/`.

`Generator` leaves the nested site and opens `/grid-table-editor/generator.html`.

`Docs` stays inside the nested site at `/grid-table-editor/site/docs/intro`.

`Blog` stays inside the nested site at `/grid-table-editor/site/blog`.

That means the nested app shell is not self-contained: some nav items keep the reader inside the nested documentation site, while others eject them back to root-only pages without the same visible docs shell. By contrast, the generator help links behaved more consistently than the top nav. Even though the generator itself was a root page, its in-product help links opened nested docs pages under `/grid-table-editor/site/docs/...`, which kept help content centralized in the docs site. The root app help also differed from the nested app presentation: the root app surface had inline help content but no Docusaurus shell at all, which reinforces that users can unexpectedly switch between two visibly different documentation/help contexts.

---
## 2026-06-21T18:49:42+01:00

- What you think you want to do and why

Review published docs pages for hosted-link consistency, stale examples, and help/documentation mismatches, then leave the main agent with concrete follow-up ideas rather than only a defect statement.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the nested docs tab at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/` to verify sidebar structure, breadcrumb behavior, and docs destinations. Clicked the sidebar entry `CLI (Node and Bun)` and confirmed the current docs tab changed to `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun`. Clicked the sidebar entry `Web UI` and confirmed the current docs tab changed to `https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui`. On the published `Web UI` docs page, reviewed the `Quick Start (Hosted)` section and the visible hosted links for the main app and generator. Reviewed the writer-schema root page at `https://eviltester.github.io/grid-table-editor/writer-schema.html`, including the introductory setup instructions, visible status text, and the shared schema editor help link to regex docs. Took full-page screenshots at `docs/testing/20260621/issue-233-002/screenshots/docs-consistency-web-ui-docs-full.png` and `docs/testing/20260621/issue-233-002/screenshots/docs-consistency-writer-schema-full.png`.

the observations and results that you make

Pages reviewed in this session: root test-environment landing page, nested `site/` home page, root `app.html`, nested `site/app.html`, root `generator.html`, root `writer-schema.html`, nested docs `regex-test-data`, nested docs `generate-to-file`, nested docs `cli-node-and-bun`, and nested docs `web-ui`.

The published docs are structurally healthy in the sense that the docs sidebar, breadcrumbs, and footer links stayed under `/grid-table-editor/site/...` during this pass. The main inconsistency remains the seam between docs-shell pages and root app pages. The `Web UI` docs page also shows a second content-consistency risk: its hosted quick-start links point to `https://anywaydata.com/app.html` and `https://anywaydata.com/generator.html`, while the live test environment under review is rooted at `https://eviltester.github.io/grid-table-editor/` with a nested docs site at `/site/`. That may be intentional production guidance, but it creates a visible mismatch between the environment the reader is currently in and the environment the docs tell them to open. The writer-schema page looked intentionally experimental and clearly warned that Writer API support was unavailable in the current browser session, so that part of the help copy did not appear misleading during this run.

New ideas for the main agent:
1. Verify whether `site/app.html` nav items `AnyWayData` and `Generator` are supposed to stay inside `/site/`; both currently escape to root pages.
2. Check whether a nested `site/generator.html` is expected to exist, or whether the nested app should label the root generator as an intentional context switch.
3. Decide whether the `AnyWayData` brand link on `site/app.html` should go to `/grid-table-editor/site/` instead of `/grid-table-editor/`.
4. Review whether root `app.html` and nested `site/app.html` are both intended public entry points, because they present materially different help/navigation shells.
5. Audit all top-nav links on nested app-like surfaces for mixed root-vs-site scope, not just `site/app.html`.
6. Compare the `Web UI` docs hosted links against the testenv expectations for issue #233 and decide whether environment-specific docs links are needed.
7. Review whether `writer-schema.html` should be linked anywhere from nested docs or clearly documented as root-only experimental functionality.
8. Search nested docs for any screenshots or wording that imply the root app shell when the reader is inside `site/`.
9. Confirm whether the root generator’s help links opening nested docs tabs is the desired model, then align root and nested app help around the same model.
10. Check whether the docs should explain the distinction between production hosted URLs (`anywaydata.com`) and GitHub Pages review URLs to reduce reader confusion.
11. Review footer and header link policy for testenv builds so readers are not silently bounced between review-only and production-style surfaces.
12. Do a broader click-through on other experimental root pages like `webmcp.html` and `combinatorial.html` to see whether they also mix root and nested docs destinations.
