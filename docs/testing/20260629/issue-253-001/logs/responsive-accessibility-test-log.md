---
## 2026-06-29T22:10:00+01:00

- What you think you want to do and why

Run a deployed-only responsive/mobile and accessibility review for issue #253 and merged PR #285, focusing on the app, generator, schema editor, method picker, help, and docs surfaces because the fix changed text-to-schema handling for known commands with invalid params and the user requested a dedicated responsive/accessibility lane.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Reviewed remote GitHub context with `gh`: issue #253 is closed, PR #285 is merged and closes issue #253, and PR #295 does not resolve in `eviltester/grid-table-editor`. Created this lane log plus support summary/candidate files under `docs/testing/20260629/issue-253-001/`. Browser work is constrained to deployed GitHub Pages URLs rooted at `https://eviltester.github.io/grid-table-editor/site/`.

the observations and results that you make

Issue #253 describes switching from text schema back to Schema UI when a known command has invalid params, using `number.int(min=1, min=2, max=3)` as the example. PR #285 summary says the expected fixed behavior is row-level validation in Schema UI rather than converting to literal. No local build/test/package-manager commands were run.

---
## 2026-06-29T22:18:00+01:00

- What you think you want to do and why

Prove browser interaction against the deployed environment and exercise the issue #253 schema switching path before broad responsive/accessibility scanning, because the lane should be grounded in the changed workflow rather than generic page inspection.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened `https://eviltester.github.io/grid-table-editor/site/` at `390x844`, captured `screenshots/responsive-accessibility-001-site-home-mobile.png`, clicked the visible `Use The Application` link, confirmed navigation to `https://eviltester.github.io/grid-table-editor/site/app.html`, and captured `screenshots/responsive-accessibility-002-app-mobile-after-cta.png`. Opened `https://eviltester.github.io/grid-table-editor/site/generator.html`, captured `screenshots/responsive-accessibility-003-generator-mobile-initial.png`, used `Edit as Text`, entered `Num\nnumber.int(min=1, min=2, max=3)`, clicked `Edit as Schema`, and saved screenshots `004` through `006`. Repeated the closer original flow at `1440x900`: row mode, set column `Num`, selected domain `number.int`, filled Params `(min=1, min=2, max=3)`, clicked `Edit as Text`, then `Edit as Schema`; saved screenshots `007` through `009` and support probes `support/responsive-accessibility-invalid-params-schema-probe.json` and `support/responsive-accessibility-invalid-params-row-text-row-probe.json`.

the observations and results that you make

Browser proof succeeded on deployed GitHub Pages. The direct text-mode entry showed a status `Num failed domain validation - Invalid keyword arguments: duplicate named argument "min"` and stayed visually in text mode after clicking `Edit as Schema`; this is suspicious but may not be the original setup. The row-mode-to-text-mode-to-row-mode repeat matched the PR #285 expectation: after clicking back to schema mode, the UI returned to row mode with `Column Name` = `Num`, field type `domain`, command `number.int`, Params `(min=1, min=2, max=3)`, and row-level status `Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min"`.

---
## 2026-06-29T22:32:00+01:00

- What you think you want to do and why

Run the responsive/mobile and accessibility lane across the public deployed surfaces and separate real layout/accessibility problems from invalid setup noise.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Sampled these deployed URLs at `1440x900`, `768x1024`, `390x844`, and `320x568`: `https://eviltester.github.io/grid-table-editor/site/`, `https://eviltester.github.io/grid-table-editor/site/app.html`, `https://eviltester.github.io/grid-table-editor/site/generator.html`, `https://eviltester.github.io/grid-table-editor/site/docs/intro/`, and `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data/`. Saved the broad scan as `support/responsive-accessibility-responsive-scan.json` and mobile screenshots under `screenshots/responsive-accessibility-*.png`. Also sampled `https://eviltester.github.io/grid-table-editor/site/docs/test-data/schema-definition/`, but it returned a GitHub Pages 404 and was discarded as an invalid guessed URL rather than filed.

the observations and results that you make

Home, app, generator, docs intro, and domain docs pages did not show page-level horizontal overflow at the sampled mobile/narrow widths after filtering expected offscreen skip links and scrollable docs code blocks. `site/app.html` still has no `main` landmark and no H1 at all sampled widths. App and generator controls remain dense on mobile: help icons are commonly `13x13`, schema inputs/selects are about `21px` tall, and many compact controls fall below 24px in at least one dimension. Docs pages generally expose H1/main landmarks and fit the viewport, with code examples scrolling inside their own blocks rather than forcing document-width overflow.

---
## 2026-06-29T22:42:00+01:00

- What you think you want to do and why

Target keyboard/focus behavior for the method picker and schema editor because those are the highest-risk accessibility surfaces in the issue #253 / PR #285 workflow.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

At `390x844` on `https://eviltester.github.io/grid-table-editor/site/generator.html`, changed the schema row field type to `domain`, clicked the `Select domain command` button, and saved `screenshots/responsive-accessibility-010-generator-mobile-method-picker-open.png` plus `support/responsive-accessibility-method-picker-mobile-probe.json`. Pressed Tab repeatedly in the open method picker using two automation paths and saved `support/responsive-accessibility-method-picker-tab-sequence.json` and `support/responsive-accessibility-method-picker-tab-sequence-repeat.json`. Pressed Escape and saved `support/responsive-accessibility-method-picker-after-escape.json` plus `screenshots/responsive-accessibility-011-generator-mobile-method-picker-after-escape.png`. Repeated schema row Tab order from `Column Name` on generator at `1440x900` and `390x844`, saved as `support/responsive-accessibility-generator-schema-tab-order.json`.

the observations and results that you make

The mobile method picker fits the viewport and exposes `role="dialog"` with `aria-modal="true"` and a labelled `Select schema method` dialog. The method list uses `role="listbox"` with `role="option"` children, which looks consistent with the prior ARIA-structure fix. Escape closed the dialog and returned focus to `Select domain command`. However, pressing Tab from `Filter methods` remained on the same input through repeated attempts in two passes. The generator schema row showed the same repeated keyboard blockage: pressing Tab from `Column Name` remained on `Column Name` through ten presses on both desktop and mobile, rather than moving to `Field type` or later row controls.

---
