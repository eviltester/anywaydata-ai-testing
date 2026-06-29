# Responsive/Mobile and Accessibility Findings - Issue 253 / PR 285

Date: 2026-06-29

Scope honored: deployed GitHub Pages only. No local repo build, test, verify, package-manager, or app-server commands were run. Remote GitHub context was read with `gh` only.

## Techniques

- In-app browser automation against deployed URLs rooted at `https://eviltester.github.io/grid-table-editor/site/`.
- GitHub remote context check: issue #253 is closed by merged PR #285; PR #295 is not resolvable in `eviltester/grid-table-editor`.
- DOM snapshots, screenshots, viewport overrides, focus probes, landmark/name/role checks, target-size scans, and row-mode/text-mode schema workflow probes.
- Evidence written under `screenshots/` and `support/responsive-accessibility-*`.

## Viewport Sizes

- Desktop: `1440x900`.
- Tablet: `768x1024`.
- Mobile: `390x844`.
- Narrow mobile: `320x568`.

## Keyboard, Focus, and Labeling Checks

- Browser proof: opened `site/`, clicked `Use The Application`, and confirmed navigation to `site/app.html`.
- Issue #253 row-to-text-to-row repeat passed on deployed generator: `Num` + domain `number.int` + Params `(min=1, min=2, max=3)` returned to row mode with row-level validation after `Edit as Text` then `Edit as Schema`.
- Method picker mobile state: `role="dialog"`, `aria-modal="true"`, labelled `Select schema method`, `listbox` with `option` children, and Escape returned focus to `Select domain command`.
- Repeated keyboard concern: Tab stayed on method picker `Filter methods` through repeated Tab presses in two passes.
- Repeated keyboard concern: Tab stayed on generator schema row `Column Name` through ten Tab presses on desktop and mobile.
- App page accessible naming is mixed: most visible buttons/inputs have names, but several external attribution/footer links in the embedded app surface were unnamed in the DOM probe.

## Responsive Issues

- No repeatable page-level horizontal overflow was seen on home, app, generator, docs intro, or domain docs at `390x844`/`320x568` after filtering expected skip-link positioning and scrollable code examples.
- App/generator controls remain dense on mobile. Repeated examples include `13x13` help icons and schema row inputs/selects around `21px` high.
- Method picker mobile modal fit within the viewport at `390x844` (`350x806` modal inside a `390x844` overlay).
- Docs code blocks can scroll internally, which is expected for long examples and did not create document-level horizontal scroll in the sampled pages.

## Accessibility Issues

- `site/app.html` has no `main` landmark and no H1 at all sampled viewport sizes.
- Help icons and several schema/editor controls fall below practical touch target size, with some below the WCAG 2.2 24px target-size floor.
- Method picker and schema row keyboard movement appear blocked from their focused text fields in repeat probes.
- App/generator data-grid areas remain complex; this lane did not run axe/Lighthouse, but DOM probes showed dense grid controls and many compact targets.

## Suspicious Behavior

- Direct text-mode entry of `Num\nnumber.int(min=1, min=2, max=3)` showed a clear validation status but stayed visually in text mode after clicking `Edit as Schema`. The closer original row-mode-to-text-mode-to-row-mode path passed, so this is not filed as a defect.
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/schema-definition/` returned a GitHub Pages 404, but this was a guessed URL and was discarded as invalid setup.
- Browser key injection can be imperfect around focused inputs; however, the method picker and schema row keyboard symptoms repeated using targeted input presses and match visible focus remaining on the same element.

## Deferred Ideas

- Recheck method picker and schema row Tab behavior manually in a headed browser and, ideally, with a screen reader running.
- Run axe or Lighthouse against `site/app.html`, `site/generator.html`, and the open method picker once audit tooling is available without violating deployed-only/no-package-manager constraints.
- Compare the direct text-entry switching behavior against the intended controller behavior for PR #285; it may be an edge case separate from issue #253's original path.
- Sample the same flows in a second browser engine if cross-browser keyboard behavior matters.
- Review app footer/external links for accessible names if those links are intentionally user-facing in the deployed app shell.

