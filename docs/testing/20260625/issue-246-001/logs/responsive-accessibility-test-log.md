# Responsive and Accessibility Test Log - Issue 246 Lane

Date: 2026-06-25

Lane: responsive/mobile and accessibility review for GitHub issue #246, story #226, PR #231.

Scope honored: deployed GitHub Pages only. No app code edits. No local build/test/verify. Evidence written only under this lane log, `screenshots/responsive-accessibility-*`, and `support/responsive-accessibility-*`.

## Environment and Tooling

- Target entrypoint: https://eviltester.github.io/grid-table-editor/site/
- Linked deployed app/docs pages under: https://eviltester.github.io/grid-table-editor/
- Browser automation: Playwright CLI via `npx.cmd --package @playwright/cli playwright-cli`.
- Playwright MCP and Chrome DevTools MCP were attempted, but each hit an attach/profile/bootstrap problem, so the reliable browser path was the CLI.
- Accessibility smoke check: axe-core 4.10.2 injected in the browser for deployed pages only.
- Viewports covered: desktop `1366x768`, tablet `768x1024`, mobile `390x844`, narrow mobile `320x640`.

## Browser Proof

Proof action completed at mobile viewport `390x844`:

1. Opened `https://eviltester.github.io/grid-table-editor/site/`.
2. Clicked the visible `Use The Application` CTA.
3. Confirmed navigation to `https://eviltester.github.io/grid-table-editor/site/app.html`.
4. Captured screenshot: `../screenshots/responsive-accessibility-proof-app-mobile.png`.
5. Captured support output: `../support/responsive-accessibility-proof-result.txt`.

## Pages Covered

- Site home: `https://eviltester.github.io/grid-table-editor/site/`
- Site app: `https://eviltester.github.io/grid-table-editor/site/app.html`
- Site generator: `https://eviltester.github.io/grid-table-editor/site/generator.html`
- Root linked app: `https://eviltester.github.io/grid-table-editor/app.html`
- Root linked generator: `https://eviltester.github.io/grid-table-editor/generator.html`
- Docs intro: `https://eviltester.github.io/grid-table-editor/site/docs/intro/`
- Docs generating category: `https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data/`
- Docs generate-to-file: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- Docs faker data: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`

## Findings and Defect Candidates

### RA-01 - Medium - `/site/` app/generator mobile header overflows and creates offscreen keyboard focus

Status: confirmed candidate.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-app-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile-focus-after-tabs.png`

Observed:

- `app-site mobile` at `390x844`: document scroll width `454`; `Blog` nav link measured `x=390..422`, outside the viewport.
- `app-site narrow` at `320x640`: document scroll width `454`; nav remains wider than viewport.
- `generator-site mobile` at `390x844`: document scroll width `455`; `Blog` nav and settings panel overflow the viewport.
- Keyboard tab sequence on `app-site mobile`: tab 4 focuses `Blog` at `x=390..422`, `offscreen=true`.
- After keyboarding through the app page, the browser horizontally auto-scrolls the page; the focus screenshot shows the left edge of the app clipped while focus is on `Add Rows Below`.

Expected:

- Mobile nav should fit, wrap, or collapse without horizontal page scroll.
- Keyboard focus should never move to an offscreen/clipped nav item.
- Focusing controls should not horizontally scroll the app so other content disappears off the left edge.

### RA-02 - Medium - Generator export settings panel is positioned offscreen on mobile/narrow viewports

Status: confirmed candidate from DOM geometry and screenshots.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`

Evidence:

- `../support/responsive-accessibility-generator-controls.txt`
- `../support/responsive-accessibility-scan-results.txt`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-narrow.png`

Observed:

- On `generator-site mobile` at `390x844`, `.export-encoding-settings__panel` is visible at `x=269..519`, width `250`; the viewport ends at `x=390`.
- On `generator-site narrow` at `320x640`, the same panel is visible at `x=269..519`; most of it is beyond the viewport.
- On root `generator.html`, the page-level scroll width stays at viewport width, but the same panel geometry is still offscreen, which makes the clipped area harder to recover with horizontal scrolling.
- Visible child controls include `select` text `Line endings` at `x=282..506` and a checkbox label area at `x=282..506`.

Expected:

- The settings panel should open within the viewport or stack below the Settings control on small screens.
- Settings labels and fields should remain readable and operable without horizontal scrolling.

### RA-03 - High - App and generator data grids have critical ARIA structure violations

Status: confirmed candidate from axe-core smoke check.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`

Observed axe violations at `390x844`:

- `app-mobile`: `aria-required-children` on `#myGrid` and `.tabulator-header`; axe impact `critical`.
- `app-mobile`: `aria-required-parent` on `.tabulator-header-contents`; axe impact `critical`.
- `generator-mobile`: `aria-required-children` on `.ag-theme-alpine` and `.tabulator-header`; axe impact `critical`.
- `generator-mobile`: `aria-required-parent` on `.tabulator-header-contents`; axe impact `critical`.

Expected:

- Elements with `role="grid"`, `rowgroup`, and related grid descendants should satisfy required ARIA parent/child relationships, or avoid roles that do not match the generated Tabulator structure.

### RA-04 - Medium - App/generator summaries contain nested interactive controls

Status: confirmed candidate from axe-core smoke check and visible page structure.

Affected pages:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`

Observed axe violations at `390x844`:

- `app-mobile`: `nested-interactive` on `.instructions > details > summary` and `details[data-role="test-data-details"] > summary`; axe impact `serious`.
- `generator-mobile`: `nested-interactive` on `.instructions > details > summary`; axe impact `serious`.
- The visible summaries include help controls next to the summary text, which can cause focus or announcement ambiguity for assistive technologies.

Expected:

- Interactive help controls should not be nested inside a `summary` element. Place help controls adjacent to the summary or restructure the disclosure header so each control has a distinct focus target.

### RA-05 - Medium - Docs active breadcrumb contrast fails WCAG AA threshold

Status: confirmed candidate from axe-core smoke check.

Affected pages sampled:

- `https://eviltester.github.io/grid-table-editor/site/docs/intro/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file/`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`

Observed:

- Axe reports `color-contrast` on `.breadcrumbs__item--active > .breadcrumbs__link`, impact `serious`.
- Contrast measured by axe: `4.07:1` for foreground `#2e8555` on background `#f2f2f2`; expected minimum `4.5:1` for the sampled text size.

Expected:

- Active breadcrumb text/pill state should meet at least WCAG 2.x AA contrast for normal text.

### RA-06 - Low - Site home skips from H1 to H3

Status: confirmed candidate from axe-core smoke check.

Affected page:

- `https://eviltester.github.io/grid-table-editor/site/`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`
- `../screenshots/responsive-accessibility-home-site-mobile.png`

Observed:

- Axe reports `heading-order` on the first feature heading `Easy to Use`, because the page moves from `h1` to `h3` without an intermediate `h2`.

Expected:

- Heading levels should follow a semantic sequence, e.g. page `h1`, section `h2`, then card/subsection `h3` if needed.

### RA-07 - Medium - App page lacks main landmark and H1

Status: confirmed candidate from axe-core smoke check.

Affected page:

- `https://eviltester.github.io/grid-table-editor/site/app.html`

Evidence:

- `../support/responsive-accessibility-axe-results.txt`

Observed at `390x844`:

- Axe reports `landmark-one-main`, impact `moderate`: document does not have a main landmark.
- Axe reports `page-has-heading-one`, impact `moderate`: page does not contain a level-one heading.
- Axe also reports `region`, impact `moderate`, for top navigation/pageheading content not contained by landmarks.

Expected:

- The app page should expose a clear `main` landmark and a page-level heading so screen-reader users can orient themselves quickly.

## Non-Defect Notes / Coverage That Looked Healthy

- Docusaurus docs pages sampled at `390x844` and `320x640` did not show page-level horizontal overflow in the DOM scan.
- Docs mobile hamburger, breadcrumbs, and `On this page` control were reachable by keyboard in the sampled docs intro page.
- Site home mobile/narrow did not show horizontal document overflow; only the expected off-canvas skip link appears outside the viewport before focus.
- Root linked `app.html` and `generator.html` did not show the same top-nav horizontal scroll as `/site/app.html` and `/site/generator.html`, but the root generator still has the offscreen settings-panel geometry noted above.
- One transient `net::ERR_CONNECTION_RESET` occurred while loading docs generate-to-file at desktop in the broad scan, but later mobile/narrow loads of the same page succeeded. I did not file this as a defect candidate.

## Artifacts

Support data:

- `../support/responsive-accessibility-proof-result.txt`
- `../support/responsive-accessibility-link-discovery.txt`
- `../support/responsive-accessibility-generating-links.txt`
- `../support/responsive-accessibility-scan-results.txt`
- `../support/responsive-accessibility-focus-results.txt`
- `../support/responsive-accessibility-generator-controls.txt`
- `../support/responsive-accessibility-axe-results.txt`

Key screenshots:

- `../screenshots/responsive-accessibility-proof-app-mobile.png`
- `../screenshots/responsive-accessibility-app-site-mobile.png`
- `../screenshots/responsive-accessibility-app-site-narrow.png`
- `../screenshots/responsive-accessibility-app-site-mobile-focus-after-tabs.png`
- `../screenshots/responsive-accessibility-generator-site-mobile.png`
- `../screenshots/responsive-accessibility-generator-site-narrow.png`
- `../screenshots/responsive-accessibility-generator-root-mobile.png`
- `../screenshots/responsive-accessibility-generator-root-narrow.png`
- `../screenshots/responsive-accessibility-docs-intro-mobile.png`
- `../screenshots/responsive-accessibility-docs-generate-to-file-mobile.png`
- `../screenshots/responsive-accessibility-home-site-mobile.png`
