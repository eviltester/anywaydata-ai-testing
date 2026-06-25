---
## 2026-06-25 22:44:00 +01:00

- What you think you want to do and why

Prove browser control against the deployed environment, then scout the changed method-picker surface before filing any accessibility or responsive issues.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/ with Chrome DevTools MCP after clearing stale automation-owned Chrome profile processes. Captured the landing page accessibility snapshot and screenshot screenshots/responsive-a11y-landing.png. Clicked Open app.html to https://eviltester.github.io/grid-table-editor/app.html and reviewed the app accessibility tree at desktop width. Switched Code and Code (Unit Test) import/export modes. Opened https://eviltester.github.io/grid-table-editor/generator.html, changed the first schema row Field type from regex to domain, then clicked Select domain command to open the live method picker.

the observations and results that you make

The landing page reports branch codex/230-method-picker-mvc, commit 04570e0e428d, built 2026-06-25T21:29:58.356Z. Browser interaction, snapshots, screenshots, resize, keyboard input, and browser-side DOM inspection all worked against the deployed pages. The app import/export flow does not expose the method picker in the exercised Code / Code (Unit Test) path, but it does expose option controls whose accessible names include neighboring help text such as "Show help for this option Use Quotes". The generator domain field exposes the live method-picker trigger as "Select domain command".

---
## 2026-06-25 22:45:00 +01:00

- What you think you want to do and why

Exercise the method-picker dialog in the integrated generator flow with keyboard-only interaction, visible focus, names/roles, escape/backdrop behavior, and selection application.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

With https://eviltester.github.io/grid-table-editor/generator.html open, clicked Select domain command. Captured screenshots/responsive-a11y-generator-method-picker-desktop.png. Read the accessibility snapshot for the dialog. Used Tab, Shift+Tab, slash, typed city, Enter, Escape, Apply, and a browser-side backdrop click event. Used browser-side DOM inspection to record role/name, active element, focusable order, scroll dimensions, and visible element counts.

the observations and results that you make

The dialog appears as dialog "Select schema method" modal. The search input is focused on open and is named "Filter methods". The close button is named "Close". The method list is exposed as region "Methods"; the help pane is exposed as complementary "Method details". Slash from a method tile returned focus to the search field. Typing city and pressing Enter selected location.city, with Apply enabled. Applying updated the generator trigger to "location.city" and changed the docs link to "Domain command help: location.city". Escape closed the dialog and restored focus to the trigger. Shift+Tab from the close button wrapped to Apply, and Tab from Apply wrapped to Close. A browser-side backdrop click removed the overlay and restored focus to the trigger. However, the dialog had 310 focusable controls in the desktop all-methods state, including 36 filter buttons and 269 method tiles, so a plain Tab user must traverse a very long sequence unless they know to use search/shortcuts.

---
## 2026-06-25 22:46:00 +01:00

- What you think you want to do and why

Check responsive/mobile layout and scroll containment for the method picker at desktop, tablet, and the narrowest Chrome DevTools width available in this profile.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Resized the deployed generator page to 1440x1000, 768x900, and the narrowest available Chrome DevTools content width, which was 500px wide despite requesting 390px. Captured screenshots/responsive-a11y-generator-method-picker-tablet.png and screenshots/responsive-a11y-generator-method-picker-mobile-390.png. Measured dialog, overlay, tabs, list, details, footer, document scroll width, and scroll heights in the browser. With the modal open at narrow width and focus in the search input, pressed PageDown and measured window.scrollY before and after. Captured screenshots/responsive-a11y-background-scroll-page-down.png after the background scroll.

the observations and results that you make

At desktop, the dialog was 1202x962 inside a 1440x1000 viewport; the method list and help pane were side-by-side and independently scrollable. At tablet, the dialog stacked list and detail vertically, remained horizontally contained, and document scrollWidth did not exceed clientWidth. At narrow/mobile width, the filter buttons wrapped into many rows and left only about 183px for the method list plus 183px for details, but the layout remained horizontally contained. The tab/filter rail is usable but dense. A confirmed scroll containment problem exists: body/document overflow remained visible, and PageDown with focus in the method-picker search moved window.scrollY from 0 to 290 while the modal stayed open. This means the underlying page can scroll behind the modal.

---
## 2026-06-25 22:47:00 +01:00

- What you think you want to do and why

Check contrast/readability and screen-reader names from snapshots for the highest-risk method-picker elements.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Computed foreground/background contrast in the browser for method-picker tabs, active tab, search input, method tiles, tile summaries, tile tags, Apply, Cancel, details text, and details code. Used the accessibility snapshots from generator/app/storybook to inspect roles and accessible names.

the observations and results that you make

Most text sampled above 4.5:1. The Apply button measured about 4.63:1, normal detail text 18.08:1, muted summaries/tags 8.01:1, and search input text 18.08:1. The method-picker tab/filter button text measured about 4.08:1 for rgb(31,111,235) on rgb(233,241,255) at 13.33px normal text, below the 4.5:1 target for normal-size text. Snapshot names for the core method-picker controls were generally good: dialog "Select schema method", searchbox "Filter methods", region "Methods", complementary "Method details", button "Close". Existing app/generator option controls still show polluted accessible names where adjacent help button text becomes part of checkbox/textbox names, for example checkbox "Show help for this option Use Quotes" and textbox "Show help for this option Quote Char".

---
## 2026-06-25 22:48:00 +01:00

- What you think you want to do and why

Use published Storybook to review the method-picker subcomponent stories because issue 230 explicitly requested story coverage for Method Navigator, Method List, Method Help Display, and the combined dialog.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/storybook/index.json directly and parsed method-picker entries from the published Storybook index. Navigated to https://eviltester.github.io/grid-table-editor/storybook/?path=/story/shared-method-picker-dialog--visual-always-open and then directly to https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story. Captured screenshots/responsive-a11y-storybook-method-picker.png and screenshots/responsive-a11y-storybook-iframe-mobile-500.png. Took accessibility snapshots and browser-side layout measurements.

the observations and results that you make

Published Storybook contains Shared/Method Picker Dialog entries for Docs, Navigator Default, List Default, Help Display With Usage, Visual Always Open, Choose Faker Method, Filter And Choose Domain Method, and Cancel Method Selection. The Visual Always Open story exposes the subcomponents in the accessibility tree: dialog "Choose Method", searchbox "Filter methods", filter buttons, region "Methods", complementary "Method details", Cancel, Apply, and a live "Method picker story log" status. In the direct iframe at 500px wide, the dialog measured x=20, y=-13, w=460, h=806, so the top of the dialog is clipped above the viewport. This was not reproduced in the integrated generator modal, where the dialog top stayed inside the viewport.

---
## 2026-06-25 22:49:00 +01:00

- What you think you want to do and why

Record defect candidates and follow-up ideas while separating confirmed observations from broader risks.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Created defect-candidate notes under defects/ and summarized this lane in responsive-accessibility-summary.md. No local build, verify, package-manager, or repo test commands were run.

the observations and results that you make

Defect candidates:

1. Medium: Method picker does not lock background page scrolling. With the modal open and focus in Filter methods, PageDown moved window.scrollY from 0 to 290. Evidence: screenshots/responsive-a11y-background-scroll-page-down.png.
2. Medium/Low: Plain Tab order through the all-methods dialog is very long. The desktop all-methods state exposed 310 focusable controls, including every method tile. Search and slash reduce pain for informed users, but keyboard-only tab traversal is excessive.
3. Low: Method-picker filter buttons have below-target normal-text contrast. Computed ratio was about 4.08:1 for blue text on pale blue at 13.33px normal text.
4. Low: Direct Storybook iframe at 500px clips the dialog top at y=-13. Evidence: screenshots/responsive-a11y-storybook-iframe-mobile-500.png. Integrated generator modal did not reproduce this.
5. Low / broader app debt: app/generator export option accessible names include neighboring help text, e.g. "Show help for this option Use Quotes", which can make screen-reader announcements noisy.

Follow-up ideas:

1. Add deployed-browser coverage for body scroll lock while the method-picker modal is open, including PageDown, Space, wheel, touch scroll, and background scrollbar drag.
2. Consider a roving tabindex/listbox pattern for method tiles so only the active tile is tabbable while arrow keys move between methods.
3. Add a visible keyboard help affordance near the search field if slash and Enter are first-class shortcuts.
4. Add aria-current, aria-selected, or a tablist/listbox pattern if the filter buttons are intended to behave as tabs rather than simple filters.
5. Re-check method-picker filter chip contrast against WCAG 2.2 normal-text thresholds and darken the blue or lighten/differentiate the background.
6. Add a mobile Storybook viewport story or visual regression for Visual Always Open at 500px and 390px widths.
7. Test with actual mobile emulation/touch input where available, because this Chrome DevTools session could not shrink content below 500px.
8. Verify screen-reader announcement order in NVDA or VoiceOver for dialog title, focused search, selected method, details updates, and live status changes.
9. Add an automated accessibility snapshot assertion that the integrated generator modal exposes exactly one dialog, named search, Methods region, Method details complementary pane, Close, Cancel, and Apply.
10. Add regression coverage that Escape, backdrop click, Cancel, Close, and Apply all restore focus to the original trigger in generator and Storybook stories.
11. Separate help buttons from form labels in export options so checkbox/textbox accessible names are concise, e.g. "Use Quotes" instead of "Show help for this option Use Quotes".
12. Check whether the document behind the modal should be inert or aria-hidden while the modal is open, because snapshots still include the underlying generator/app controls before the modal subtree.
13. Add a reduced-results state test where a search like city produces one method and Enter selects it without requiring tile focus.
14. Add a recent-methods keyboard path test after applying a method to ensure Recently used is reachable, named clearly, and not empty-confusing.
15. Test docs links from Method Help Display in deployed Storybook and generator for same-origin versus production anywaydata.com targets and expected new-tab/current-tab behavior.
