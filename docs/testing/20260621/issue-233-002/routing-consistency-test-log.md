# Routing Consistency Test Log

- Subagent: 6
- Scope: cross-surface routing consistency and standalone page link integrity on the deployed GitHub Pages site only
- Site under test: https://eviltester.github.io/grid-table-editor/
- Restricted write target: this file only, plus optional screenshots under `docs/testing/20260621/issue-233-002/screenshots/` with `routing-consistency-` prefix
- Primary oracle: actual clicked destination URLs and resulting tab URLs, not snapshot-only URL fields
- Surfaces to prioritize: root index, nested site pages, `app.html`, `generator.html`, `combinatorial.html`, `webmcp.html`, `writer-schema.html`, and shared schema/help links
- Techniques and heuristics:
  - Compare root and nested `/site/` navigation outcomes for the same logical destinations
  - Favor real clicks and resultant tab locations over inferred href values
  - Check whether links stay under `https://eviltester.github.io/grid-table-editor/` or incorrectly escape to other bases such as `anywaydata.com`
  - Probe standalone pages for home, docs, help, schema, and cross-tool links
  - Check both in-page navigation and new-tab behavior when links are designed to open externally
  - Use exact final URLs, including fragments, to spot base-path and anchor drift
  - Revisit suspicious routes from a second surface to see whether the defect is shared or isolated
  - Capture screenshots only when they add evidence for a routing mismatch or broken destination
- Keep notes append-only with timestamps and action/result separation
- End with concrete follow-up ideas for broader retest coverage

---
## 2026-06-21 18:45:00 +01:00

- What I think I want to do and why
I want to establish the deployed route map from the root landing page first, then confirm whether the nested `site/` entry keeps navigation under the nested base or leaks back to root-level standalone pages. This gives me a baseline before I inspect standalone help links.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

I opened `https://eviltester.github.io/grid-table-editor/` in a real browser session and took a fresh snapshot of the root test-environment page. From that page I identified and then clicked the root `site/` link, which navigated the current tab from `https://eviltester.github.io/grid-table-editor/` to `https://eviltester.github.io/grid-table-editor/site/`. On the nested site homepage I took another snapshot and clicked the top-nav `App(opens in new tab)` link. That created a new tab at `https://eviltester.github.io/grid-table-editor/site/app.html`. Inside that nested app tab I took a fresh snapshot, then clicked the top-nav `Generator` link. That changed the current tab URL from `https://eviltester.github.io/grid-table-editor/site/app.html` to `https://eviltester.github.io/grid-table-editor/generator.html`.

the observations and results that I make

The root `site/` link stayed correctly under the GitHub Pages base and landed at the nested homepage: `https://eviltester.github.io/grid-table-editor/site/`. The nested site homepage `App(opens in new tab)` link also stayed under the nested base and opened `https://eviltester.github.io/grid-table-editor/site/app.html` in a new tab as labeled. The cross-surface behavior changed once I was inside `site/app.html`: the top-nav `Generator` link did not stay under `/site/`; it routed the current tab to the root standalone generator at `https://eviltester.github.io/grid-table-editor/generator.html`. That means the nested app surface is mixing nested docs/blog routing with root standalone HTML routing.

---
## 2026-06-21 18:47:30 +01:00

- What I think I want to do and why
I want to compare the root standalone surfaces against the nested app surface, then verify whether shared schema/help links consistently point into nested docs rather than escaping to another domain or a wrong base path.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

I reopened the root landing page at `https://eviltester.github.io/grid-table-editor/` and clicked `Open app.html`, which navigated the current tab to `https://eviltester.github.io/grid-table-editor/app.html`. I captured a fresh snapshot there and noted that this root app page does not show the top nav links that appear on `site/app.html`. I opened or selected the standalone root pages `https://eviltester.github.io/grid-table-editor/combinatorial.html`, `https://eviltester.github.io/grid-table-editor/webmcp.html`, and `https://eviltester.github.io/grid-table-editor/writer-schema.html`, taking fresh snapshots on each. From the root page I also clicked `Open combinatorial.html`, `Open webmcp.html`, and `Open writer-schema.html`, confirming the current-tab destinations `https://eviltester.github.io/grid-table-editor/combinatorial.html`, `https://eviltester.github.io/grid-table-editor/webmcp.html`, and `https://eviltester.github.io/grid-table-editor/writer-schema.html`. On `generator.html` I clicked the shared schema help icon link labeled `Regex data help`, which opened a new tab at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`. On `writer-schema.html` I clicked its `Regex data help` link and it also opened a new tab at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`. On `webmcp.html` I clicked `Chrome WebMCP documentation`, which navigated the current tab externally to `https://developer.chrome.com/docs/ai/webmcp`.

the observations and results that I make

The root landing page links for `app.html`, `combinatorial.html`, `webmcp.html`, and `writer-schema.html` all resolved correctly under the GitHub Pages root base. The root `app.html` surface is materially different from `site/app.html`: it appears to be a stripped standalone page without the root/site/docs/blog nav block, while `site/app.html` includes that nav. The shared schema help links I checked from both `generator.html` and `writer-schema.html` were consistent with each other and opened the nested docs URL `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/` in new tabs. I did not see those shared help links leak to `anywaydata.com`. The `webmcp.html` external documentation link worked, but it replaced the current tab with the Chrome docs page rather than opening a new tab.

---
## 2026-06-21 18:50:49 +01:00

- What I think I want to do and why
I want one final consistency pass focused on whether the nested app surface keeps users anchored to the nested docs area, whether home navigation escapes to the root index, and whether any obvious `anywaydata.com` leaks remain in the tested surfaces. I also want to leave concrete follow-up ideas for the main agent.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

I returned to `https://eviltester.github.io/grid-table-editor/site/`, took a fresh snapshot, and clicked `App(opens in new tab)` again to reopen `https://eviltester.github.io/grid-table-editor/site/app.html` in a dedicated tab for navigation checks. In that `site/app.html` tab I clicked the `AnyWayData` brand link, which navigated the current tab to `https://eviltester.github.io/grid-table-editor/`. I then used browser back to return to `https://eviltester.github.io/grid-table-editor/site/app.html`, took a fresh snapshot, and clicked `Docs`, which navigated the current tab to `https://eviltester.github.io/grid-table-editor/site/docs/intro/`. Separately, I ran DOM link filtering checks for `anywaydata.com` on the nested site homepage, the root `generator.html` page, and the `writer-schema.html` page by evaluating `Array.from(document.links).map(a=>a.href).filter(h=>h.includes('anywaydata.com'))`; each checked page returned `[]`.

the observations and results that I make

The nested app surface has split routing behavior: `Docs` correctly stays inside the nested docs base and lands at `https://eviltester.github.io/grid-table-editor/site/docs/intro/`, but the `AnyWayData` brand link escapes the nested site and returns to the root test-environment index `https://eviltester.github.io/grid-table-editor/`. Combined with the earlier `site/app.html` to root `generator.html` jump, this makes the nested app a mixed router surface rather than a fully nested one. The shared help links I checked are consistent and nested. In the specific pages I evaluated, I found no live `anywaydata.com` anchors. New ideas for the main agent: 1. Check whether `site/app.html` to root-index behavior is intended or a regression against the merged-site expectation. 2. Compare `site/app.html` and root `app.html` nav structures side by side to decide whether the missing top nav on root `app.html` is intentional. 3. Click `Blog` from `site/app.html` and confirm it stays at `/grid-table-editor/site/blog`. 4. Click the nested site `AnyWayData` brand link from a docs page, not just `site/app.html`, to confirm the nested site chrome itself stays consistent. 5. Click `Use The Application` from the nested site homepage and confirm whether it behaves identically to `App(opens in new tab)`. 6. Click `Generate To File docs` from the generator help tooltip to confirm that another shared help route also stays nested. 7. Inspect whether `webmcp.html` should mark external docs links as opening in-place versus new-tab, because current behavior swaps out the app tab. 8. Check the footer links `Privacy Policy`, `About`, and `Contact` from the nested site for base-path consistency and final tab URLs. 9. Probe whether `site/app.html` to root `generator.html` is mirrored by any reverse path from root standalone pages back into nested docs. 10. Search additional standalone pages for hidden or tooltip-only links that may not appear in the default viewport snapshot. 11. Check whether the regex docs page breadcrumbs and previous/next links always stay under `/site/docs/...` after multi-step navigation. 12. Verify whether any iframe-contained links, especially the YouTube embed on the site homepage, can surface confusing off-origin routing when activated by real clicks.
