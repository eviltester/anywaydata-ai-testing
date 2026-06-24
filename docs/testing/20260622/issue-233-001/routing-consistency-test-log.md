# Routing Consistency Test Log

## Charter

- Owner: subagent for cross-surface routing consistency and verify-after-fix route checks
- Goal: verify visible help/docs links and related destinations across root pages, nested /site pages, and shared editor surfaces using the deployed test environment only
- Write scope: this file only
- Techniques and heuristics: consistency checking, exploratory testing, route-oracle checking, repeatability checks

---
## 2026-06-22T13:47:26+01:00

- What you think you want to do and why

I want to do a partial cross-surface routing pass on the deployed test environment and capture only concrete browser-verified evidence for visible help/docs/app links, because the review focus is issue 233 link consistency across root pages, nested /site pages, and shared schema/help surfaces.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed environment only at https://eviltester.github.io/grid-table-editor/ with Playwright browser tooling. Opened the root page and took a fresh snapshot of visible links. On the root page I recorded the visible destinations for `site/`, `Open app.html`, `Open generator.html`, `Open combinatorial.html`, `Open webmcp.html`, `Open writer-schema.html`, `Open Storybook`, and `Open site/`. I then clicked the visible `Open app.html` link from the root page and verified the resulting browser URL became `https://eviltester.github.io/grid-table-editor/app.html`.

On `https://eviltester.github.io/grid-table-editor/app.html` I opened the `Instructions` help toggle and enumerated visible anchors from the live page. This exposed external library/source links plus one internal shared-schema help destination with `aria-label="Regex data help"` pointing to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`. I also recorded that the export-format tabs (`Markdown`, `CSV`, `Delimited`, `JSON`, `JSONL`, `XML`, `SQL`, `Code`, `Code (Unit Test)`, `Gherkin`, `HTML`, `ASCII`) are in-page `#` links on `app.html`, which look like format switchers rather than docs routes.

On `https://eviltester.github.io/grid-table-editor/generator.html` I enumerated visible anchors, then took a fresh snapshot. The visible links were `Skip to main content` and the shared-schema help icon `Regex data help`, with the same destination `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`. I clicked the visible `Regex data help` control from the generator page, then checked the current browser URL and open tabs. After that click, the current page remained `https://eviltester.github.io/grid-table-editor/generator.html` and the browser still showed a single open tab for the generator page, so this click did not yield a directly observable new-tab destination in the tooling session.

On `https://eviltester.github.io/grid-table-editor/writer-schema.html` I enumerated visible anchors from the live page. The visible internal help destination was again the shared-schema help icon `Regex data help` targeting `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`.

On `https://eviltester.github.io/grid-table-editor/site/` I enumerated the visible navigation and CTA destinations from the live page. The visible internal routes resolved to `https://eviltester.github.io/grid-table-editor/site/`, `https://eviltester.github.io/grid-table-editor/site/app.html`, `https://eviltester.github.io/grid-table-editor/site/docs/intro`, `https://eviltester.github.io/grid-table-editor/site/blog`, `https://eviltester.github.io/grid-table-editor/site/privacy`, `https://eviltester.github.io/grid-table-editor/site/about`, and `https://eviltester.github.io/grid-table-editor/site/contact`. The visible external GitHub and Twitter links also resolved as expected in the extracted live hrefs. I took a snapshot confirming those links were rendered in the navbar, hero CTA, and footer, but the session was interrupted before I completed click-through verification for the `/site` navbar and footer routes.

the observations and results that you make

The deployed root page currently presents consistent visible absolute destinations for the main test-environment entry links, and the clicked `Open app.html` route resolved to the expected root-level URL `https://eviltester.github.io/grid-table-editor/app.html`.

Across the three shared-schema surfaces I covered (`app.html`, `generator.html`, and `writer-schema.html`), the visible internal help destination for regex data was consistent: all surfaced the same docs target `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data`. That is good evidence that the shared help/docs routing seam is aligned across those covered pages.

The `app.html` format tabs currently look like intentional in-page controls rather than cross-page docs links because they all resolve to `app.html#`. I did not treat those as defects in this partial pass.

The generator-page click on the visible `Regex data help` icon did not create an observable new tab or change the current browser URL in the Playwright tooling session, even though the live href on that control points to the expected `/site/docs/test-data/regex-test-data` destination and the same href appears consistently on other shared-schema pages. Because that behavior could be a tooling/session limitation around `target=\"_blank\"` handling rather than a deployed routing defect, I do not consider it a confirmed issue from this evidence alone.

The nested `/site` surface appears internally consistent in the extracted live hrefs: navbar, CTA, and footer links all resolve under `/grid-table-editor/site/...` rather than leaking to the root app path, except for the intentional `/site/app.html` app entry. I did not complete click-through confirmation for those `/site` links before the interruption, so those routes remain partially covered rather than fully proven by navigation.

---
