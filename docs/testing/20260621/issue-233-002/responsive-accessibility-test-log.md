# Responsive / Accessibility Retest Charter

- Scope: deployed-environment exploratory retest of `https://eviltester.github.io/grid-table-editor/` for issue `#233` / PR `#234`, focused on responsive/mobile behavior and observable accessibility outcomes on changed routing/help/docs surfaces.
- Constraints: deployed site only; no local build/verify/package/repo tests; append-only logging after this charter; screenshots only under `docs/testing/20260621/issue-233-002/screenshots/` with `responsive-accessibility-` prefix.
- Primary areas:
  - narrow/mobile viewport behavior
  - keyboard-only access and focus visibility/order
  - dialogs, modals, and help flows
  - link purpose/label clarity
  - root vs nested docs/help navigation behavior where visible in runtime
  - regressions on generator, method-picker, help, and related changed surfaces
- Techniques and heuristics:
  - exploratory testing
  - risk-based testing
  - responsive heuristics across common narrow widths
  - accessibility heuristics for keyboard, focus, semantics, and dialog behavior
  - boundary analysis on viewport size and zoom-like narrow layouts
  - consistency/oracle checking between visible labels, destinations, and runtime behavior
  - repeatability checks for any suspected defect
  - documentation/help interaction sampling where exposed by the deployed UI

---
## 2026-06-21 18:53:00 +01:00

- What I think I want to do and why

I want to establish whether the deployed root landing page and app entry surfaces remain usable at a mobile width before drilling into deeper help/docs flows, because issue `#233` / PR `#234` changed navigation/help routing seams and those first-hop links are the top-level oracle for a mobile user.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

Opened `https://eviltester.github.io/grid-table-editor/` in a live browser session, resized to `390x844`, captured `screenshots/responsive-accessibility-root-390x844.png`, and took a runtime snapshot of the visible cards and links. I pressed `Tab` from the top of the page and queried the active element to confirm the first keyboard stop. I then navigated to `https://eviltester.github.io/grid-table-editor/app.html`, kept the viewport at `390x844`, captured `screenshots/responsive-accessibility-app-390x844-initial.png`, and recorded the first 12 `Tab` stops through the top toolbar and grid controls.

the observations and results that I make

At `390x844`, the root landing page remained readable and all visible cards used specific labels such as `Open app.html`, `Open generator.html`, and `Open site/`; there was no obvious text collision in the captured mobile viewport. Keyboard focus on the root page moved to the visible `site/` link first, which is consistent and repeatable. In the app at `390x844`, the toolbar wrapped onto multiple lines instead of introducing horizontal page overflow, and the first keyboard stops were logical and repeatable: `Instructions` summary, the adjacent `Show help` button, row action buttons, filter input, clear/reset controls, checkbox, then column-header controls. I did not see evidence of page-level horizontal overflow in the app at this width, but the control density is high enough that keyboard/focus behavior on help affordances needed deeper follow-up.

---
## 2026-06-21 18:53:30 +01:00

- What I think I want to do and why

I want to challenge the app help/tooltip behavior with keyboard-only navigation because the changed surfaces include inline help/docs generation, and the live app now exposes actionable content inside tooltip-like help popups.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

On `https://eviltester.github.io/grid-table-editor/app.html` at `390x844`, I clicked the `Instructions` help button and inspected the resulting popup. I pressed `Tab` and `Escape` to see whether focus moved into the popup and whether the popup dismissed cleanly. I then opened the `Options` help popup in the import/export section, captured `screenshots/responsive-accessibility-app-390x844-options-help.png`, and inspected the runtime tree showing two help links in the popup: `CSV (Comma Separated Values)` and `Learn more`. From the opened `Options` popup I pressed `Tab` four times, querying the active element after each press. I also clicked the visible popup links with the mouse to confirm their actual destinations and tab behavior.

the observations and results that I make

The `Instructions` popup closed with `Escape`, which is good, but `Tab` did not move focus into the popup content; focus advanced straight to the next main-page control instead. The same pattern repeated in the `Options` help popup that visibly contains real links. With the popup open, `Tab` did not land on `CSV (Comma Separated Values)` or `Learn more`; instead it moved to adjacent option help icons and checkboxes in the underlying page. This is repeatable and looks like an accessibility defect: the UI exposes interactive help content visually, but keyboard users cannot sequentially reach the popup links once the popup is open. Mouse activation of the popup links did work and opened the expected nested docs pages under `/site/docs/...`, so routing on those visible links appears correct even though keyboard access to them does not.

---
## 2026-06-21 18:54:00 +01:00

- What I think I want to do and why

I want to compare the nested docs experience and the standalone generator at narrower widths, because responsive regressions may show up differently on Docusaurus docs pages versus the custom app/generator surfaces, and the generator exposes changed docs/help links directly in the schema editor.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

I followed the app help popup links into the nested docs and inspected `https://eviltester.github.io/grid-table-editor/site/docs/data-formats/csv/options/`. I verified mobile behavior at `390x844`, queried `window.innerWidth` and scroll width, captured `screenshots/responsive-accessibility-docs-390x844-csv-options-mobile.png`, and pressed `Tab` once from the top of the page to confirm the first keyboard stop. I then returned to `https://eviltester.github.io/grid-table-editor/generator.html`, captured `screenshots/responsive-accessibility-generator-390x844-initial.png`, reduced the viewport further to `320x568`, verified no page-level horizontal overflow via DOM width checks, captured `screenshots/responsive-accessibility-generator-320x568.png`, queried button geometry around `Edit as Text` / `Load Schema File` / `Save Schema File`, and activated the visible `Regex data help` docs link from the schema row.

the observations and results that I make

The nested docs page behaved well at `390x844`: the layout switched into a mobile pattern with a hamburger nav, a visible `On this page` control, no horizontal overflow (`innerWidth`, `clientWidth`, and `scrollWidth` all matched `390`), and the first keyboard stop was a working `Skip to main content` link. The generator at `390x844` also stayed on-page without horizontal overflow and exposed a visible `Regex data help` link that routed to `/site/docs/test-data/regex-test-data/` when activated. The main responsive concern appeared at `320x568`: the generator did not overflow horizontally, but the `Edit as Text` button became visually cramped to the point that its label wrapped into an unreadable stacked fragment beside the file buttons. The DOM geometry confirms the button shrinks to a `32px` square while still trying to show multi-word text, so this looks like a real responsive usability regression rather than a screenshot artifact. This behavior is repeatable at `320x568`.

New ideas for the main agent:
1. `execute-now` Retest the app help popups with `Shift+Tab` to see whether reverse traversal can ever enter the visible popup links.
2. `execute-now` Check whether `Enter` or `Space` on the app help buttons leaves focus on the trigger and whether `aria-expanded` is announced consistently when the popup opens/closes.
3. `execute-now` Verify whether any other app help popups containing `Learn more` links share the same keyboard-inaccessible pattern, especially generator export/settings help.
4. `execute-now` Test the visible `Regex data help` link in generator with keyboard-only activation from the schema row, not just mouse click.
5. `execute-now` Inspect whether the `Edit as Text` button remains legible at intermediate widths like `360x740` and `344x882`, to define the breakpoint where the label becomes unusable.
6. `defer` Check high zoom equivalents such as desktop `1280` at `200%` browser zoom, because that often reproduces the same control-crowding issues as `320px`.
7. `defer` Run a screen-reader-oriented pass on the app help popups to confirm whether the tooltip role plus interactive children causes announcement problems beyond keyboard order.
8. `execute-now` Verify whether the docs `App` link in the nested site header still opens the correct testenv app surface from mobile docs pages.
9. `defer` Check color contrast and focus-ring visibility on the dark tooltip against the surrounding page, especially on the small help icons.
10. `execute-now` Test whether the docs hamburger menu, `On this page` disclosure, and skip link all remain usable after opening and closing them repeatedly on mobile.
11. `defer` Compare iPhone-SE-like height constraints with landscape mobile widths, because the long generator page may create focus-loss risks after scrolling.
12. `execute-now` Sample the root launch page at `320x568` to confirm card labels remain readable and there is no clipping around the build metadata and environment label.

---
## 2026-06-21 18:55:00 +01:00

- What I think I want to do and why

I want one more keyboard-only confirmation on the generator itself, because the visible `Regex data help` link is a changed docs/help surface and the narrow-width generator already showed control crowding.

the actions I take - include urls, steps and data that I use, describe any UI interactions that I make

I returned to `https://eviltester.github.io/grid-table-editor/generator.html`, kept the viewport at `320x568`, and recorded the first 14 `Tab` stops from the top of the page while querying the active element after each key press.

the observations and results that I make

The generator keyboard path at `320x568` started well with `Skip to main content`, the instructions summary, help buttons, `Edit as Text`, file buttons, and the row action buttons. After the `Column Name` textbox, the focus sequence became unstable: focus moved to the document `BODY` and then looped back to earlier row-action buttons instead of continuing forward through the remaining visible row controls such as the type combobox, the `Regex data help` link, and the `Value / Regex` textbox. This was repeatable in the recorded sequence and looks like a genuine keyboard navigation defect or focus-order regression in the narrow/mobile generator surface.

---
## 2026-06-21 19:04:00 +01:00

- What I think I want to do and why

I want to close out the Loop 2 follow-ups by rechecking the exact keyboard-only behaviors that were still uncertain: whether app help-popup links can be reached or activated without a mouse, whether the generator’s visible `Regex data help` link is keyboard-activatable, and where the `Edit as Text` control crosses from merely cramped into a responsive defect.

the actions I take - include urls, steps and data that I use, describe any UI interactions that you make

On `https://eviltester.github.io/grid-table-editor/app.html` at `390x844`, I reloaded the page, re-mapped the tab order into the import/export area, then focused the `Options` help trigger (`aria-label="Show help"`, parent text `Options`) and used only keyboard inputs: `Tab`, `Shift+Tab`, `Enter`, and `Space`. I queried the active element before and after each key press and checked whether the visible popup still contained the two links `CSV (Comma Separated Values)` and `Learn more`.

On `https://eviltester.github.io/grid-table-editor/generator.html` at `390x844`, I re-ran the keyboard tab path from the top of the page to see whether the visible `Regex data help` link ever entered the natural tab sequence. I then used a clean browser session to focus that link directly and tested `Enter` and `Space` separately, checking browser tabs after each key press.

To identify the narrow-width breakpoint for `Edit as Text`, I reloaded `generator.html` and captured fresh screenshots at widths `390`, `384`, `375`, `368`, `360`, `344`, `332`, and `320` pixels, saving:
- `screenshots/responsive-accessibility-generator-breakpoint-384.png`
- `screenshots/responsive-accessibility-generator-breakpoint-375.png`
- `screenshots/responsive-accessibility-generator-breakpoint-368.png`
- `screenshots/responsive-accessibility-generator-breakpoint-360.png`
- `screenshots/responsive-accessibility-generator-breakpoint-344.png`
- `screenshots/responsive-accessibility-generator-breakpoint-332.png`

I also recorded the rendered `Edit as Text` button width at those viewports from the DOM.

the observations and results that I make

The app help-popup accessibility finding still holds. With the `Options` help popup visible and containing `CSV (Comma Separated Values)` plus `Learn more`, keyboard focus remained on the trigger or moved to adjacent underlying controls instead of entering the popup links. `Tab` moved from the popup trigger to the next `Show help for this option` control, and `Shift+Tab` moved back to the same popup trigger rather than into the popup content. `Enter` and `Space` on the popup trigger did not move focus into the links or otherwise make the links keyboard-reachable. This is repeatable and confirms that the visible popup links in `app.html` are still not keyboard-accessible in sequential navigation.

The generator keyboard-only result is split into reachability vs activation. In natural tab order at `390x844`, the visible `Regex data help` link was still skipped entirely: focus moved from the `Column Name` textbox to `BODY` and then looped back to earlier controls, so a keyboard-only user cannot reach the link by tabbing. In a clean session where the link was directly focused, `Enter` opened a new tab to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data/`, while `Space` did not open a new tab. That means the link itself is keyboard-activatable with `Enter`, but it is not keyboard-reachable in the current focus order, which is the more important user-facing defect.

For the responsive breakpoint, `390px` and `384px` were cramped but still marginally legible. At `375px`, the `Edit as Text` label degraded into a stacked fragment that no longer reads cleanly as a control label; the same unreadable presentation persisted at `368`, `360`, `344`, `332`, and `320`. The DOM measurements support the visual change: the button width dropped from about `45.0px` at `384` to about `42.5px` at `375`, then to `40.5px` at `368`, `38.2px` at `360`, and down to the hard `32px` minimum by `332`. Based on the screenshots and repeatability, the practical breakpoint for this responsive issue is approximately `375px` and narrower.
