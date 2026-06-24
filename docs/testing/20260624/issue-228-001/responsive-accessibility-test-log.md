# Responsive Accessibility Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: review the deployed generator/app/help surfaces under responsive and accessibility heuristics, including keyboarding and narrow-width behavior.

Techniques and heuristics to use: responsive testing heuristics, accessibility heuristics, keyboard-only exploration, focus-order checks, and visible-state consistency checks.

Expected focus: mobile and tablet layouts, keyboard reachability, focus visibility, modal/help interactions, semantics exposed through the accessibility tree, and user-visible layout breakage.

---
## 2026-06-24T18:01:00+01:00

- Intent: prove live browser access against the deployed environment and scout which surfaces best match the responsive/accessibility charter.

Actions: opened `https://eviltester.github.io/grid-table-editor/` and `https://eviltester.github.io/grid-table-editor/app.html` in a standalone Playwright browser session against the live GitHub Pages deployment; captured the visible top-level links/buttons/inputs inventory from the rendered page state to identify responsive, keyboard, and help-heavy surfaces worth deeper coverage.

Observations: browser control worked against the deployed site. The root landing page is a lightweight launcher, while `app.html` exposes the highest-density interactive surface for this charter: icon-only toolbar buttons, multiple help triggers, filter/sort controls, schema/import-export sections, preview/copy actions, and modal-capable controls. Several actionable controls rely on `aria-label` rather than visible text, which makes keyboard/focus verification especially important in the next passes.

---
## 2026-06-24T18:12:00+01:00

- Intent: check whether the deployed app remains usable at mobile/tablet/narrow widths and capture visible layout/accessibility evidence.

Actions: opened `app.html` at `375x812`, `320x800`, and `768x1024`, plus `/site/` at `375x812`; recorded viewport-vs-scroll-width metrics; saved screenshots `responsive-accessibility-mobile-app-375.png`, `responsive-accessibility-narrow-app-320.png`, `responsive-accessibility-tablet-app-768.png`, and `responsive-accessibility-mobile-site-375.png`; visually reviewed the captured images.

Observations: the app avoided horizontal page overflow at the tested widths and stayed functionally visible on mobile/tablet, but the mobile layout becomes extremely dense. Many primary controls in the live app render at roughly `21-22px` tall, and several icon-only controls/help icons shrink to roughly `13-22px`, which is well below comfortable mobile tap sizing. The docs/home page also remained readable on mobile, although the hero heading wraps aggressively into a stacked multi-line block rather than preserving a more balanced small-screen headline.

---
## 2026-06-24T18:19:00+01:00

- Intent: verify keyboard reachability, focus visibility/order, and help/accordion behavior on the mobile viewport.

Actions: ran a keyboard-only `Tab` pass through the live `app.html` mobile view, logging the first 45 focus stops; captured focused-state screenshots including `responsive-accessibility-mobile-tab-2.png`, `responsive-accessibility-mobile-tab-10.png`, `responsive-accessibility-mobile-tab-23.png`, `responsive-accessibility-mobile-tab-24.png`, and `responsive-accessibility-mobile-tab-28.png`; specifically rechecked collapsed `Test Data` and `Import / Export` sections to see whether they leaked hidden focusable descendants.

Observations: focus indicators were generally visible on the tested controls, so the page does show keyboard focus styling. The strongest defect found is that collapsed sections still expose nested help controls in the tab order: when `Test Data` is still collapsed, the next `Tab` after its summary lands on the section help icon (`responsive-accessibility-mobile-tab-24.png`), and when `Import / Export` is collapsed, `Tab` later jumps into a hidden option-help control and scrolls the page deep into that closed section (`responsive-accessibility-mobile-tab-28.png`). That creates confusing keyboard order and exposes tooltip content from sections the user has not opened. The screenshots also reinforce the target-size issue: keyboard-focusable help icons and header action buttons are visibly tiny on mobile, even though they do receive focus.

---
