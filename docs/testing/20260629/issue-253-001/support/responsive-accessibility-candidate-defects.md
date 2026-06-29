# Responsive/Mobile and Accessibility Candidate Defects - Issue 253 / PR 285

No final defect files were created.

## RA-CAND-001 - Method picker traps Tab focus on Filter methods

Status: repeatable candidate.

Affected URL:

- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Steps:

1. Set viewport to `390x844`.
2. Open generator.
3. Change first schema row field type to `domain`.
4. Click `Select domain command`.
5. With focus on `Filter methods`, press Tab repeatedly.

Observed:

- Focus remained on `Filter methods` through repeated Tab presses in two passes.
- Escape closed the dialog and restored focus to `Select domain command`.

Expected:

- Tab should move through the dialog's focusable controls, or the component should document/use a deliberate composite-widget keyboard model while still allowing users to reach Close and apply/select controls predictably.

Evidence:

- `../screenshots/responsive-accessibility-010-generator-mobile-method-picker-open.png`
- `responsive-accessibility-method-picker-mobile-probe.json`
- `responsive-accessibility-method-picker-tab-sequence.json`
- `responsive-accessibility-method-picker-tab-sequence-repeat.json`
- `responsive-accessibility-method-picker-after-escape.json`

## RA-CAND-002 - Generator schema row Tab does not advance from Column Name

Status: repeatable candidate.

Affected URL:

- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Steps:

1. Open generator at `1440x900`.
2. Focus the first schema row `Column Name` input.
3. Press Tab repeatedly.
4. Repeat at `390x844`.

Observed:

- Focus remained on `Column Name` through ten Tab presses on desktop and mobile.

Expected:

- Tab should advance from `Column Name` to `Field type`, command/value controls, constraints, and subsequent row controls in a predictable keyboard order.

Evidence:

- `responsive-accessibility-generator-schema-tab-order.json`

## RA-CAND-003 - App page lacks main landmark and H1

Status: repeatable candidate.

Affected URL:

- `https://eviltester.github.io/grid-table-editor/site/app.html`

Observed:

- DOM probes found no `main`/`role="main"` and no H1 at `1440x900`, `768x1024`, `390x844`, or `320x568`.

Expected:

- The deployed app page should expose a main landmark and a page-level heading so keyboard and assistive-technology users can orient to the primary editor surface.

Evidence:

- `responsive-accessibility-responsive-scan.json`
- `../screenshots/responsive-accessibility-app-site-mobile-390x844.png`

## RA-CAND-004 - App/generator controls include sub-24px touch targets

Status: repeatable candidate.

Affected URLs:

- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`

Observed:

- Mobile probes found multiple visible controls below 24px in at least one dimension, including `13x13` help icons and schema row controls around `21px` high.
- The controls are named, but the small physical target size makes them difficult for touch and motor accessibility.

Expected:

- Interactive controls should provide at least a 24px target area, preferably larger on touch-first mobile layouts.

Evidence:

- `responsive-accessibility-responsive-scan.json`
- `../screenshots/responsive-accessibility-app-site-mobile-390x844.png`
- `../screenshots/responsive-accessibility-generator-site-mobile-390x844.png`

