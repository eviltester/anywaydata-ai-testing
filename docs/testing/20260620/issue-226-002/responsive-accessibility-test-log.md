## 2026-06-20 17:23 +01:00

- Establish the responsive/accessibility subagent charter so mobile layout, keyboard interaction, and accessibility-oriented observations are explicitly covered.

the actions you take

- Created the responsive/accessibility subagent log.
- Reserved this log for viewport variation, keyboardability, label/help clarity, and accessibility heuristic notes.

the observations and results that you make

- This is intentionally separated from general UX so it does not get dropped when command testing becomes busy.

## 2026-06-20 18:08 +01:00

- Reviewed the deployed generator and published docs surfaces for responsive and accessibility risks related to the command/help changes in issue #226 / PR #231, using only `https://eviltester.github.io/grid-table-editor/` and focusing on mobile breakpoints, help affordances, landmark structure, and long command-reference docs.

the actions you take

- Opened the deployed test-environment landing page and mapped the relevant changed surfaces from there.
- Reviewed `generator.html` at `1280x720`, `768x1024`, `390x844`, and `320x568`.
- Reviewed published docs at `site/docs/intro`, `site/docs/category/generating-data`, `site/docs/test-data/method-picker-ui-spec`, and `site/docs/test-data/domain/string`.
- Checked generator landmark structure, heading structure, help-trigger markup, and form-control labeling heuristics.
- Probed the generatorâ€™s top help affordance to see whether activation updated state and exposed help content accessibly.
- Checked mobile docs pages for viewport overflow, dense table behavior, and long example/code-block fit.
- Used keyboard/accessibility heuristics and responsive heuristics only; did not run local repo verify/build/test commands.

the observations and results that you make

- The generator is materially weaker than the docs pages for baseline accessibility structure: there is no `main`, no `h1`, and no skip link on `generator.html`, while the Docusaurus docs pages consistently expose those landmarks.
- The generator help affordances are mixed. Several help triggers are `span` elements with `role="button"` and `tabindex`, rather than native buttons, which increases keyboard/screen-reader fragility compared with the docs surfaces.
- After activating the top generator `Show help` affordance, help content became visible in page text, but the trigger still reported `aria-expanded="false"`, which suggests state is not being conveyed reliably to assistive technology.
- Generator row editing includes fields that rely on placeholder-style naming without associated labels, notably the schema row `Column Name` and `Value / Regex` inputs, which is a weaker accessible-name pattern once users start typing.
- The generator did not show page-level horizontal overflow at the mobile widths reviewed, so the core page shell appears to stay within viewport.
- The docs pages also stayed within viewport at mobile widths, but dense command-reference tables on `site/docs/test-data/domain/string` overflow their containers significantly and require repeated horizontal scrolling on narrow screens.
- On `390px` width, sampled arg tables were about `366px` to `466px` wide inside a `343px` container; on `320px` width, sampled tables were still about `366px` to `466px` wide inside a `273px` container.
- Long docs examples are mostly contained, but some code blocks still run slightly wider than the mobile container and depend on copy/wrap controls, which adds friction on phones.
- The published docs mobile nav and skip-link behavior are in better shape than the generator shell and provide a stronger accessibility baseline for the command/help documentation surfaces.
