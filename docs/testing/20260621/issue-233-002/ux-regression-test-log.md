# UX Regression Exploratory Retest Charter

- Date: 2026-06-21
- Target: https://eviltester.github.io/grid-table-editor/
- Scope: UX/usability and workflow regression around generator, shared schema editor, method picker, params editor, inline help, tippy learn-more links, and site-config/help-link related behavior in issue #233 / PR #234 retest coverage.
- Constraints: deployed site only; append-only logging; no repo code edits; no local build/verify/package/repo tests.
- Primary oracle: actual click destinations, resulting tab URLs, visible runtime behavior, and end-to-end workflow outcomes.
- Heuristics/techniques:
  - tour core user journeys before drilling into edge cases
  - compare expected destination versus actual destination for help and learn-more links
  - watch for workflow interruption, dead ends, misleading affordances, and state-loss surprises
  - vary entry points between generator, schema editing, method picker, and params editing
  - use progressive disclosure checks for inline help, tooltips, and secondary links
  - probe cross-surface consistency where the same concept appears in more than one UI area
  - note recovery cost when a user makes a mistake or follows an unclear affordance
  - capture candidate follow-up ideas for the main agent throughout the session

---
## 2026-06-21 18:45:11 +01:00

- What you think you want to do and why

Establish the deployed-site entry points and main app information architecture first so later UX checks on generator, method-picker, params, and help flows are grounded in the actual live navigation model.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/` in a real browser session and captured a live snapshot of the landing page. Confirmed the GitHub Pages test-environment hub exposed links for `app.html`, `generator.html`, `combinatorial.html`, `webmcp.html`, `writer-schema.html`, `storybook/index.html`, and `site/`. Clicked `Open app.html`, which navigated the active tab to `https://eviltester.github.io/grid-table-editor/app.html`, then captured a fresh snapshot of the live app UI.

the observations and results that you make

The landing page behaves like a review hub rather than the product itself, so a user starting at the root has to make an immediate product-surface choice. The app page loaded successfully and exposed the shared grid editor, a `Test Data` method-picker area, and an `Import / Export` workspace with many inline help affordances. The visible structure suggests that help-link and site-config regressions could affect multiple surfaces at once because the same help patterns recur across toolbar panels, export options, and schema-generation controls.

---
## 2026-06-21 18:51:19 +01:00

- What you think you want to do and why

Exercise the app-level end-to-end workflow that most directly combines shared schema editing, method-picker changes, params editing, help links, and generation so I can see whether the help-link changes behave cleanly while a user is actually building data.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Stayed on `https://eviltester.github.io/grid-table-editor/app.html`. Expanded `Test Data` help, observed the tooltip copy and clicked its `Learn more` link. Clicked the visible `Regex data help` icon in the schema row. Entered `status` as the column name, switched the method picker from `regex` to `domain`, and inspected the changed row UI. Used the domain command picker to select `autoIncrement.sequence`, clicked the command help icon, opened the params editor, entered `prefix=ID-`, applied the params, then clicked `Generate`. After generation succeeded, clicked `Preview`, accepted the `Set Text From Grid` confirmation, and inspected the resulting text preview. Captured one screenshot of the app state with lingering tooltip behavior at `docs/testing/20260621/issue-233-002/screenshots/ux-regression-app-stale-tooltips.png`.

the observations and results that you make

The positive path basically works: method switching updates the row controls, the params editor opens, the generated params string is written back into the row, generation produces `ID-1`, and export preview can populate the text editor. The rough edges are mostly workflow and help related. The `Test Data` tooltip `Learn more` click did not visibly navigate the active tab, but a new docs tab appeared later, so the user gets background-tab side effects without clear immediate feedback. The regex help icon opened a new docs tab to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`, and the domain command help eventually opened `https://eviltester.github.io/grid-table-editor/site/docs/test-data/auto-increment-sequences`, so help destinations themselves looked plausible. The bigger UX problem is stale tooltip persistence: after switching away from `regex`, the old regex tooltip stayed visible, and after opening domain help there were multiple overlapping tooltips. One of those lingering tooltips intercepted pointer events and blocked the first `Generate` click until I dismissed it with `Escape`. That makes the workflow feel fragile because a user can ask for help and then get punished when they try to continue. A second surprise is tab sprawl: one short schema-editing session left the app open plus multiple documentation tabs, which feels noisy for a workflow built around quick experiments. A third friction point is that preview introduces a confirmation dialog (`Set Text From Grid`) even after the user explicitly clicked `Preview`, which adds ceremony at a point where the user is usually just checking output.

---
## 2026-06-21 18:51:19 +01:00

- What you think you want to do and why

Check the standalone generator page for cross-surface consistency so I can tell whether the usability issues are shared-seam regressions or only app-surface quirks.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened a new tab to `https://eviltester.github.io/grid-table-editor/generator.html` and inspected the initial schema, generate, export settings, and preview layout. Expanded `Show file generation help` and clicked `Generate To File docs`. Filled the first schema row with `code` as the column name and `[A-Z]{2}` as the regex pattern, then clicked `Preview` to see whether the standalone generator used the edited schema. I also observed the `Managed Stored Schemas` selector state and the preview/output panels after interaction.

the observations and results that you make

The standalone generator shares the same help-link pattern and the same delayed-background-tab feel: clicking `Generate To File docs` did not visibly move the current tab, and the docs tab for `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/` appeared later. Cross-surface consistency is mixed. The page layout is clearer than the main app because schema, generation, and preview are separated, but the starting state is confusing: `Managed Stored Schemas` showed `last used - 2026-06-21T17:48:32.820Z` as selected even though the visible schema row was still blank. That looks like state/history is selected without the UI actually loading the selected content, which is likely to confuse users who expect history selection to be authoritative. The strongest regression-style surprise is preview inconsistency after editing: even after entering `code` and `[A-Z]{2}`, the preview path still showed a `~rename-me` preview column and the row-level validation message continued to say `regex value is required.` That made the standalone generator feel out of sync with the visible edits, whether because the input did not stick, the preview used stale state, or the selected-history state overrode the row editor. The generator page therefore feels more structured than the app, but less trustworthy once the user starts mixing direct editing, history state, preview, and help links.

New ideas for the main agent from this UX pass:

1. Auto-dismiss or replace old tippy help when the method picker changes so obsolete regex help cannot linger over a domain workflow.
2. Prevent tooltip/popover overlays from intercepting primary action clicks like `Generate` and `Preview`.
3. Make help-link clicks explicit by either opening docs in the same tab, showing a new-tab indicator, or surfacing a small confirmation/toast when a docs tab opens.
4. Consolidate repeated docs-tab spawning so repeated help clicks reuse one docs tab instead of multiplying background tabs.
5. Revisit whether `Preview` should ask `Set Text From Grid` confirmation after the user already chose a preview action.
6. Show a clearer active-state treatment for the current schema method help so users can tell which help applies after switching methods.
7. Clear or close stale help tooltips when the params editor opens or closes, because those overlays currently bleed across workflow steps.
8. Make `Managed Stored Schemas` either load the selected item immediately and visibly, or start unselected; the current selected-but-not-applied appearance is misleading.
9. Verify that standalone generator preview reads the latest edited schema row rather than stale history or placeholder state.
10. Add an inline status message near method/params edits that confirms what schema the next `Generate` or `Preview` will actually use.
11. Consider showing docs destinations in accessible text, not icon-only links, for method help and command help so the user has better link confidence before clicking.
12. Consider a single contextual help panel in the generator/app instead of multiple floating tippy layers, because layered tooltips increase accidental overlap and cognitive load.

---
## 2026-06-21 18:57:55 +01:00

- What you think you want to do and why

Run a second targeted pass to check repeatability: whether stale help overlays still block the first `Generate` click, whether standalone `generator.html` can still drift out of sync with current edits or stored-schema state, and whether either issue has a practical user recovery path.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reloaded `https://eviltester.github.io/grid-table-editor/app.html` to start from a fresh deployed state, expanded `Test Data` help again, clicked the tooltip `Learn more`, clicked the schema-row `Regex data help`, entered `status`, switched the method from `regex` to `domain`, selected `autoIncrement.sequence`, clicked the domain command help icon, and then attempted `Generate` again. After the app follow-up, switched to `https://eviltester.github.io/grid-table-editor/generator.html`, reloaded it, observed the stored-schema selector state, entered `code` and `[A-Z]{2}` into the visible schema row, and clicked `Preview` to see whether the preview reflected the latest visible edits. I also tried a light recovery probe by interacting with the stored-schema selector after the mismatch to see if the page would reconcile itself in-place.

the observations and results that you make

The stale-overlay condition is repeatable, but the click blockage is not fully deterministic. On the second pass, the old regex tooltip still remained visible after switching away from `regex`, and after opening the domain command help there were again overlapping regex and domain help tooltips on screen. That confirms the stale-overlay persistence problem is still present. However, on this loop the first `Generate` click succeeded even with both tooltips visible, so I could not reproduce the exact pointer-interception failure every time. My best current read is that the blocking bug is intermittent, while the underlying precondition of stale overlapping help is easy to reproduce. When the block does happen, the practical recovery I observed remains `Escape` to dismiss overlays before retrying the action.

The standalone generator desync did reproduce again. After reload, `Managed Stored Schemas` still showed a `last used ...` item as selected even though the visible row started blank. After entering `code` and `[A-Z]{2}` and clicking `Preview`, the page still showed a stale validation message `Row 1: regex value is required.` and the preview table header still became `~rename-me` rather than the visible `code` field name. That means the follow-up confirms the generator can remain out of sync with the latest visible edits and/or with the apparent stored-schema state. I did not find a reliable in-page recovery during this pass. Reloading the page gives a cleaner starting surface, but it still leaves the misleading selected stored-schema state. A user can partially recover by reloading and re-entering values, but that is more of a workaround than a trustworthy recovery flow, and I did not observe the stored-schema selector cleanly reconciling the UI in place.
