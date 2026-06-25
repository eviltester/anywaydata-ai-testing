# Responsive And Accessibility Test Log

## 2026-06-25 00:13 Europe/London - Responsive/mobile and accessibility retest

### Charter

Retest the deployed environment for issue #228 / PR #243 with a responsive/mobile and accessibility focus. Stay deployed-only at https://eviltester.github.io/grid-table-editor/. Do not run local verify, build, package-manager, or repo test commands. Focus on index, generator, app, method picker, params/editor modal areas, help/disclosure controls, keyboard tab order, labels/names, focus restoration, and accessibility regressions tied to recent fixes. Create defect markdown only for confirmed defects.

### Techniques And Heuristics

- Deployed-environment exploratory testing against the public GitHub Pages URL.
- Responsive viewport sampling across mobile portrait, mobile landscape, tablet, and desktop.
- Keyboard-only tab-order tracing from clean page states.
- Chrome accessibility-tree inspection for focusable control names.
- DOM heuristics for overflow, focusable controls, dialogs, details/summary disclosures, labels, and likely unlabeled controls.
- Screenshot-backed visual review for layout and focus-risk areas.
- Risk-based prioritization around PR #243 accessibility, picker, and schema UI changes.

### Viewports And Test Data

- Mobile portrait: 360 x 740, mobile emulation, device scale factor 2.
- Mobile landscape: 740 x 360, mobile emulation, device scale factor 2.
- Tablet: 768 x 1024, mobile emulation, device scale factor 2.
- Desktop: 1280 x 900, desktop emulation, device scale factor 1.
- Primary routes sampled:
  - `https://eviltester.github.io/grid-table-editor/`
  - `https://eviltester.github.io/grid-table-editor/site/`
  - `https://eviltester.github.io/grid-table-editor/app.html`
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - `https://eviltester.github.io/grid-table-editor/combinatorial.html`
  - `https://eviltester.github.io/grid-table-editor/webmcp.html`
  - `https://eviltester.github.io/grid-table-editor/writer-schema.html`
  - `https://eviltester.github.io/grid-table-editor/storybook/index.html`

### Browser Control Proof

- Chrome DevTools MCP and Playwright MCP were blocked by existing browser/profile conflicts, so I used Chrome's DevTools Protocol directly with a temporary profile.
- Browser interaction proof captured by navigating the deployed index and clicking a visible route/control.
- Evidence:
  - `screenshots/responsive-a11y-browser-proof-click.png`
  - `responsive-accessibility-cdp-results.json`

### Observations

- The index/test-environment landing page remained responsive at 360 px, 740 px, 768 px, and 1280 px. Tab order covered the route links repeatedly without layout breakage.
- The Docusaurus `site/` page adapted to mobile navigation. The only overflow heuristic hit was the off-canvas skip link position, which is expected for that pattern and was not filed.
- Generator responsive layout stacked schema controls and generation options without visible horizontal scrolling at 360 px.
- App responsive layout kept the main grid and test-data/editor sections reachable in a narrow viewport, though the page is long and dense on mobile.
- Export/settings details appeared visually contained in screenshots, even where DOM heuristics reported offscreen hidden/absolute panel geometry.
- Storybook loaded and adapted to the sampled sizes; the offscreen search label is a common visually-hidden label pattern and was not filed.
- WebMCP mobile had a long method name/card near the right edge. It did not produce page-level horizontal scroll, so I left it as a watch item rather than a defect.

### Confirmed Findings

- `defects/issue-228-generator-schema-row-tab-order-trap.md`
  - From the generator schema row `Column Name` input, `Tab` moves to `body`, then back through row action buttons and the same input. It does not advance to the field type picker, value input, constraints, or generation controls.
- `defects/issue-228-controls-missing-accessible-names.md`
  - Chrome's accessibility tree exposes empty names for the generator schema type combobox, generator preview searchbox, and app grid searchbox.

### Coverage

- Covered responsive behavior on index, site, app, generator, combinatorial, WebMCP, writer-schema, and Storybook routes.
- Covered mobile and desktop tab traces on the main sampled routes.
- Covered generator help/disclosure controls at a basic click level.
- Covered generator/app accessible-name risks using Chrome's accessibility tree for confirmed controls.
- Covered layout overflow heuristics and screenshot evidence for sampled routes.
- Created 38 `responsive-a11y-*` screenshots plus a structured JSON capture.

### Deferred Ideas

- Recheck modal focus restoration after opening a concrete params editor modal from a populated command that exposes editable parameters.
- Exercise the method picker with a mouse and keyboard after adding multiple field rows and changing field families.
- Run a screen-reader-oriented pass with a real accessibility extension or manual assistive-tech session.
- Check zoom at 200% and Windows high contrast mode.
- Add a targeted mobile pass for WebMCP method cards with very long method names.
- Recheck app import/export file controls and generated download controls for names after the parallel import/export lanes settle.

### Files Written

- `responsive-accessibility-test-log.md`
- `responsive-accessibility-cdp-results.json`
- `live-responsive-a11y-cdp.mjs`
- `defects/issue-228-generator-schema-row-tab-order-trap.md`
- `defects/issue-228-controls-missing-accessible-names.md`
- Screenshots under `screenshots/responsive-a11y-*.png`
