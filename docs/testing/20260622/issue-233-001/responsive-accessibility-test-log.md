# Responsive Accessibility Test Log

## Charter

- Owner: subagent for responsive, mobile, and accessibility review
- Goal: assess focus order, keyboard reachability, popup accessibility, and narrow-width behavior across changed surfaces using the deployed test environment only
- Write scope: this file only
- Techniques and heuristics: accessibility heuristics, responsive heuristics, keyboard-only exploration, exploratory testing

---
## 2026-06-22T13:46:15.7764222+01:00

- Assess deployed-only keyboard reachability, help-popup accessibility, focus order, and narrow-width behavior across `app.html`, `generator.html`, `writer-schema.html`, and nested `site/`, with extra attention on whether help-popup links can actually be reached from the keyboard.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used the deployed environment only at `https://eviltester.github.io/grid-table-editor/` and moved between `app.html`, `generator.html`, `writer-schema.html`, and `site/`. On `app.html`, I tabbed from page load, opened the top Instructions help popup, then tabbed again to see whether focus entered the popup. I also opened the Import/Export format help popup and checked whether its `Data Formats docs` link could be reached before the popup dismissed. On `generator.html`, I opened the file-generation help popup and checked whether its `Generate To File docs` link was keyboard reachable after opening the popup. I also checked for skip links on `generator.html`, `writer-schema.html`, and `site/`. For responsive coverage, I resized to `375x812` and checked `window.innerWidth`, `document.documentElement.scrollWidth`, and `document.documentElement.clientWidth` on `app.html`, `generator.html`, `writer-schema.html`, and `site/` to see whether the surfaces introduced horizontal overflow. On `site/` at narrow width, I also checked whether the mobile navigation toggle appeared. I attempted to switch to non-Playwright browser paths when asked, but the in-app browser route failed during setup and the Chrome DevTools route was blocked by an already-running browser profile, so I finished the pass with the already-working fallback rather than stop coverage.

the observations and results that you make

`app.html`: the page exposed multiple help buttons, but the help popup interaction is not keyboard-friendly. After opening the Instructions help popup, pressing `Tab` moved focus to `Add Row` in the main toolbar instead of into the popup's own `Load Sample Data` button. After opening the Import/Export format help popup, pressing `Tab` moved focus to the main-page `Markdown` format link and the popup dismissed, so the popup's `Data Formats docs` link did not become keyboard reachable in the tested flow. This is a concrete accessibility risk and matches the issue comment concern about help-popup links. At `375x812`, the app did not report horizontal overflow by document-width metrics, but the page still presents a very dense sequence of controls before the grid and preview content.

`generator.html`: this surface had a working `Skip to main content` link and exposed the shared schema/editor controls. Opening `Show file generation help` revealed a popup containing a `Generate To File docs` link, but pressing `Tab` moved focus to `Generate Data` and the popup closed, so that popup link was also not keyboard reachable in the tested path. At `375x812`, the page did not report horizontal overflow. The generator therefore looks more resilient than the app on mobile width, but it appears to share the same help-popup keyboard-reachability problem.

`writer-schema.html`: at `375x812`, the page did not report horizontal overflow, and the shared schema editor rendered. I did not find a skip link on this page, unlike `generator.html` and `site/`. The page also showed `Writer API is not available in this browser session`, so the actual browser-Writer generation path could not be exercised in this environment; coverage here is therefore limited to the surrounding page structure, responsive width, and presence of the shared schema surface rather than the AI generation interaction itself.

`site/`: the nested site exposed a `Skip to main content` link and, at `375x812`, switched to a mobile nav pattern with a `Toggle navigation bar` control. Width checks did not show horizontal overflow. This surface looked materially better prepared for narrow-width use than the app/editor pages. I did not pursue third-party iframe accessibility beyond noting that a YouTube player is embedded on the home page and can become part of the focusable surface.

Cross-surface result: the strongest issue I found is that help popups can expose links or buttons visually while not moving keyboard focus into the popup after it opens. I reproduced that pattern on both `app.html` and `generator.html`, including popup content that visibly contains documentation links. That makes the current help affordance partially mouse-dependent even when the popup content itself contains focusable elements.

---
