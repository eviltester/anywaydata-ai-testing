---

# Subagent E: Responsive/mobile and accessibility review

Started: 2026-06-29 (Europe/London)
Target: https://eviltester.github.io/grid-table-editor/site/
Scope: deployed public app/generator/docs pages only. No local build/test/package commands run.
Charter: desktop/tablet/mobile layouts, keyboard reachability, accessible names/roles, focus traps/restoration, dialogs/help/tooltips, grid controls, generator/schema editor, and changed-surface docs pages.
Artifact prefix: `support/responsive-accessibility-*`.

## Techniques and heuristics

- Playwright-driven Chromium against deployed GitHub Pages URLs only.
- Viewport sampling: desktop 1440x900, tablet 768x1024, mobile 390x844, small mobile 320x568, plus focused overflow checks.
- Accessibility heuristics: keyboard-only reachability, visible focus, role/name inspection from Playwright accessibility snapshots and DOM probes, dialog focus containment/restoration, touch target/reflow checks, horizontal overflow scan, zoom/narrow layout sampling, form labels and control descriptions.
- Evidence policy: screenshots/snapshots saved from the same Playwright session used for interaction; suspected defects retried once from a clean page when practical.

## Execution notes

Completed: 2026-06-29 12:12:30 +01:00

Tooling:

- Confirmed deployed homepage loaded at `https://eviltester.github.io/grid-table-editor/site/` with Playwright CLI snapshot and a theme-toggle interaction.
- DevTools MCP was unavailable because the shared Chrome profile was already locked, so the rest of the run used Playwright through the Node REPL against installed system Chrome.
- Playwright package Chromium was not installed, so system Chrome was used via `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- No local app build, test, or package commands were run.

Pages and viewports covered:

- Home: `site/` at 1440x900, 768x1024, 390x844, 320x568.
- App/table editor: `site/app.html` at 1440x900, 768x1024, 390x844, 320x568, with targeted desktop/mobile help and schema probes.
- Standalone generator: `site/generator.html` at 1440x900 and 390x844, with targeted schema keyboard repeat.
- Docs intro: `site/docs/intro` at 1440x900, 768x1024, 390x844, 320x568.
- Docs generator category: `site/docs/category/generating-data` at 390x844 with mobile drawer/menu probe.

Support artifacts saved:

- `support/responsive-accessibility-inventory.json`
- `support/responsive-accessibility-app-desktop-probe.json`
- `support/responsive-accessibility-app-mobile-probe.json`
- `support/responsive-accessibility-app-desktop-control-probe.json`
- `support/responsive-accessibility-generator-desktop-probe.json`
- `support/responsive-accessibility-generator-mobile-probe.json`
- `support/responsive-accessibility-generator-schema-tab-repeat.json`
- `support/responsive-accessibility-docs-generator-mobile-probe.json`
- `support/responsive-accessibility-docs-drawer-escape-probe.json`
- Screenshots under `support/responsive-accessibility-*.png`, including home/app/generator/docs desktop and mobile captures plus help, drawer, and schema-tab evidence.

## Observations

General responsive layout:

- Home and Docusaurus docs pages did not show page-level horizontal overflow at the sampled desktop, tablet, mobile, and small-mobile widths.
- `app.html` did not show page-level horizontal overflow at 1440x900, 768x1024, 390x844, or 320x568. On mobile, the app uses wrapping controls rather than a collapsed menu; the result is usable but dense, with many compact controls and a wrapped top nav.
- `generator.html` did not show page-level horizontal overflow at 1440x900 or 390x844. The schema/generate/preview panels reflow into a single column on mobile.
- Docs generator category cards were readable at 390x844 and exposed large card-style links for schema/generation topics.

Keyboard and focus:

- Docusaurus home/docs pages expose a skip link and mobile navigation button. Initial tab order on docs pages starts with skip link, nav toggle, brand/home, then page controls.
- App `app.html` keyboard order reached nav, theme toggle, instructions summary, grid row buttons, filter input, grid buttons, import/export controls, generator controls, schema editor controls, and preview controls in the first pass.
- App Tabulator grid exposes an unnamed AX `grid` plus unnamed rowgroups in the Chrome accessibility tree. Most app form controls had labels or aria names when checked through DOM labels/aria/placeholder, but the grid itself may need an accessible label.
- Standalone generator schema row keyboard repeat produced a stronger issue: from a clean page, focusing `Column Name` and pressing `Tab` moved focus to `body`, then subsequent tabs looped back through the row action buttons (`Drag field to reorder`, `Insert field after this row`, `Remove field`, `Column Name`) on both desktop and mobile. `Field type` and `Value / Regex` could receive programmatic focus and then tab onward, but the natural tab sequence did not reach them from `Column Name`.

Dialogs, help, and tooltips:

- App and generator help controls are mostly tiny icon buttons, commonly 13x13 or 16x16 CSS pixels.
- App help hovers/clicks were inconsistent. Some help icons showed the same translucent overview text overlay; several generator/grid/schema help icons showed no visible help text in the probe. No visible help surfaces were exposed as `dialog`, `[role=dialog]`, `[aria-modal=true]`, or native browser dialogs during the sampled clicks.
- Generator help hover did show useful help text for the screen overview and regex help in some cases, but several help icons have no visible text/name beyond generic `Show help`.
- Focus-trap testing found no modal dialog trap because the help surfaces did not behave as modal dialogs in the sampled paths.

Docs mobile drawer:

- The docs mobile drawer opened, kept focus within drawer/sidebar links during tabbing, and exposed generating-data child links.
- Repeat check: pressing `Escape` while the docs drawer was open left `Close navigation bar` visible and focus remained associated with the drawer/toggle area. Clicking the close button was attempted separately. This should be retested manually because Docusaurus drawer state detection through DOM classes was noisy, but the visible close control remained present after Escape in the probe.

Console notes:

- Home/docs/app/generator samples occasionally logged a deployed 404 resource error. App also logged `Using grid engine: tabulator`, `TODO: Create help for instructions-summary-title`, and a Tabulator warning about `getHeaderFilters` before initialization. These were recorded as environmental context, not filed as accessibility defects in this lane.

## Suspected defects for confirmation

1. Generator schema row keyboard loop blocks natural access to `Field type` and `Value / Regex`.
   - Repeated on desktop 1440x900 and mobile 390x844.
   - Steps: open `site/generator.html`, focus `Column Name`, press `Tab`.
   - Observed: focus moves to `body`, then cycles back to row action buttons and `Column Name`; it does not proceed to `Field type` or `Value / Regex`.
   - Evidence: `support/responsive-accessibility-generator-schema-tab-repeat.json`, `support/responsive-accessibility-generator-desktop-probe.json`, `support/responsive-accessibility-generator-mobile-probe.json`.

2. Help/icon controls may miss touch-target sizing and consistent accessible/help behavior.
   - Repeated across app and generator.
   - Observed sizes include 13x13 and 16x16 for help icons; several hovers/clicks showed no visible help text, while others showed shared/generic overlays.
   - Evidence: `support/responsive-accessibility-app-desktop-control-probe.json`, `support/responsive-accessibility-generator-*-probe.json`, and `support/responsive-accessibility-app-desktop-visible-help-hover-*.png`.

3. Docs mobile drawer may not close on Escape.
   - Repeated on `site/docs/category/generating-data` at 390x844.
   - Observed: after pressing Escape, `Close navigation bar` remained visible in the DOM/visibility probe.
   - Evidence: `support/responsive-accessibility-docs-drawer-escape-probe.json`, `support/responsive-accessibility-docs-generator-mobile-after-escape.png`.

4. App Tabulator grid lacks an accessible name in the Chrome AX tree.
   - Observed on `site/app.html` desktop and mobile.
   - AX tree included unnamed `grid` and rowgroup nodes.
   - Evidence: `support/responsive-accessibility-app-desktop-probe.json`, `support/responsive-accessibility-app-mobile-probe.json`.

5. Mobile app/generator controls meet layout reflow but remain dense with small click/tap targets.
   - Observed on `site/app.html` and `site/generator.html` at 390x844 and `site/app.html` at 320x568.
   - Not all compact controls are necessarily defects, but the grid/generator surfaces include many 21px-high buttons/inputs and 13px checkboxes/help icons.
   - Evidence: `support/responsive-accessibility-app-html-mobile.png`, `support/responsive-accessibility-app-html-small-mobile.png`, `support/responsive-accessibility-generator-mobile.png`.

## Coverage and gaps

- Covered public deployed pages only; no local repo build/test/package commands.
- Covered Chrome/Playwright behavior only; no manual screen-reader run.
- Did not run axe or Lighthouse because this lane stayed with browser snapshots/DOM/CDP probes rather than adding audit tooling.
- Docs coverage sampled intro plus generating-data category, not every child docs page.
- File upload/download flows were not exercised because the charter focused on responsive/accessibility and public deployed behavior, and destructive/download side effects were kept out of scope.
- Help behavior was probed by hover, click, Tab, Escape, DOM role checks, and screenshots; main agent should manually confirm before filing because some help overlays are visually translucent and state detection is somewhat noisy.

## Follow-up ideas

1. Manually confirm the `generator.html` schema tab loop with a visible headed browser and screen reader focus announcement.
2. Check whether the shared schema row component in `app.html` has the same `Column Name` to `body` tab-loop behavior.
3. Add automated keyboard-order coverage around schema row controls: row action buttons, column name, field type, help link, value/regex, constraints, add field.
4. Add accessible names to the app grid container, preview grid, and any rowgroup/interactive grid wrappers exposed to assistive tech.
5. Normalize help icon behavior: consistent tooltip/popover semantics, reachable by keyboard, dismissed by Escape, and connected via `aria-describedby` where appropriate.
6. Increase help icon/checkable control hit areas to at least a practical touch target while preserving the compact visual design.
7. Recheck the docs mobile drawer Escape behavior in a headed browser and compare with Docusaurus expected keyboard interaction.
8. Add a mobile visual QA check for the custom app/generator header because it wraps instead of using the Docusaurus mobile drawer.
9. Review the deployed 404 resource in app/generator pages to confirm it is harmless and not affecting icons, help, or theme assets.
10. Run a follow-up with browser zoom or text-size increase to 200 percent, especially on the dense app/generator controls.
