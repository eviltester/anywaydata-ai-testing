---
## 2026-06-25 22:42:09 +01:00

- What you think you want to do and why

Create a gap-coverage log for Storybook component parity around issue 230's Method Picker Dialog story request. The charter is narrower than the parent review: compare the deployed Storybook method-picker subcomponent stories with the live app/generator method picker, focusing on tabs, search, selection, help rendering, docs links, action logs, keyboard interactions, recent state, and cleanup/close behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Used only deployed/published surfaces and GitHub Pages URLs. Did not run local verify, build, package-manager, or repo test commands. Browser control was through Playwright MCP and direct Playwright automation against system Chrome, with screenshots saved under `screenshots/`.

Opened `https://eviltester.github.io/grid-table-editor/` and confirmed the deployed review environment reports branch `codex/230-method-picker-mvc`, commit `04570e0e428d`, built `2026-06-25T21:29:58.356Z`. Opened `https://eviltester.github.io/grid-table-editor/app.html`, `https://eviltester.github.io/grid-table-editor/generator.html`, and `https://eviltester.github.io/grid-table-editor/storybook/index.html?path=/docs/shared-method-picker-dialog--docs`.

Identified the deployed Storybook coverage under `Shared / Method Picker Dialog`:

- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--navigator-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--list-default&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--help-display-with-usage&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--visual-always-open&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--choose-faker-method&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--filter-and-choose-domain-method&viewMode=story`
- `https://eviltester.github.io/grid-table-editor/storybook/iframe.html?id=shared-method-picker-dialog--cancel-method-selection&viewMode=story`

Techniques and heuristics used:

- Story-to-live parity comparison: first map each Storybook subcomponent story, then compare its behavior with the live generator's real schema row method-picker.
- Component decomposition: checked navigator tabs, method list tiles, help panel, and combined dialog separately before combined flows.
- State transition testing: closed, open, search, select, apply, reopen, recent, and cancel/escape states.
- Accessibility-name heuristics: used role/name locators to expose differences between Storybook names and live app names.
- Data-realism heuristic: compared Storybook mock catalog size and method taxonomy to the live faker/domain catalog.
- Cleanup heuristic: after Apply, Cancel, and Escape, checked whether visible role dialogs remained.
- Link parity heuristic: compared Storybook docs links (`https://anywaydata.com/...`) with deployed live links (`https://eviltester.github.io/grid-table-editor/site/...`).
- Action-log heuristic: inspected the in-canvas Storybook action/result text after Apply and Escape.

Screenshots captured:

- Storybook subcomponent snapshots: `gap-shared-method-picker-dialog--navigator-default.png`, `gap-shared-method-picker-dialog--list-default.png`, `gap-shared-method-picker-dialog--help-display-with-usage.png`, `gap-shared-method-picker-dialog--visual-always-open.png`, `gap-shared-method-picker-dialog--choose-faker-method.png`, `gap-shared-method-picker-dialog--filter-and-choose-domain-method.png`, `gap-shared-method-picker-dialog--cancel-method-selection.png`
- Storybook interaction snapshots: `gap-story-choose-faker-open.png`, `gap-story-choose-faker-after-apply.png`, `gap-story-domain-filter-price.png`, `gap-story-domain-after-escape.png`
- Live generator snapshots: `gap-live-generator-initial.png`, `gap-live-generator-after-select-faker.png`, `gap-live-generator-after-select-domain.png`, `gap-live-faker-before-select-command-click.png`, `gap-live-faker-after-select-command-click.png`, `gap-live-faker-picker-search-password.png`, `gap-live-faker-picker-search-shuffle.png`, `gap-live-faker-picker-selected-shuffle.png`, `gap-live-faker-picker-after-scoped-apply-shuffle.png`, `gap-live-faker-picker-recent-after-shuffle.png`, `gap-live-faker-picker-after-recent-escape.png`

the observations and results that you make

Confirmed Storybook coverage exists for the issue-requested surface: Method Navigator, Method List, Method Help Display, and combined Method Picker Dialog stories are all deployed under `Shared / Method Picker Dialog`.

The Storybook navigator story renders tabs/categories (`All`, `Core`, `commerce`, `internet`, `Faker`, `Recently used`) and a search input with accessible name `Filter methods`. The live generator's faker picker renders a much larger catalog (`All`, `Core`, many faker namespaces, `Faker`, `Recently used`) after selecting `faker` in the field type and clicking `Select faker command`.

The Storybook list/help stories use a small mock method catalog with four items: `regex`, `helpers.arrayElement`, `internet.password`, and `commerce.price`. The live faker picker uses a larger real catalog; searching `shuffle` produces `helpers.shuffle`, help content, parameter table, usage example, and a deployed docs link. Searching `password` in live faker mode did not expose `internet.password`, while Storybook's combined faker story can select `internet.password`. This looks like a story-data parity gap rather than a live-app failure.

Storybook combined dialog uses visible title/accessibility label `Choose Method`. Live generator uses `Select schema method`. This is a parity mismatch in accessible naming and visible copy.

Storybook `Choose Faker Method` opens with focus in the `Filter methods` search input. Selecting `internet.password` and clicking dialog-scoped `Apply` closes the dialog and updates the story result text to `domain:internet.password`. The resulting selected prefix is suspicious for a story named "Choose Faker Method", because `internet.password` is shown as `domain` in the story result and help catalog.

Storybook `Filter And Choose Domain Method` supports search text `price`, narrows to `commerce.price`, renders the help panel, and Escape closes the dialog with the story result text `Cancelled`.

Live generator opens the picker from the schema row only after changing field type to `faker` or `domain`. Clicking `Select faker command` opens a modal labelled `Select schema method` and focuses the `Filter methods` input. Searching `shuffle` narrows to `helpers.shuffle`; selecting it enables the dialog Apply button and renders help content with schema `faker.helpers.shuffle()`, parameter details, usage examples, and docs link `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers`.

Live Apply works when scoped to the dialog. After applying `helpers.shuffle`, the row opener text changes from `Select faker command` to `helpers.shuffle`, the params button becomes enabled as `Edit params for helpers.shuffle`, and the hidden shadow select value is `helpers.shuffle`.

Suspicious behavior / defect candidates:

- Storybook combined dialog label/copy does not match the live dialog label/copy: Storybook says `Choose Method`, live says `Select schema method`.
- Storybook method catalog is too small and possibly misleading for parity: `Choose Faker Method` selects `internet.password`, but the result is `domain:internet.password`, and the live faker picker did not find `internet.password` via `password` search.
- Live dialog has a visible generator options `Apply` button and a visible method-picker `Apply` button simultaneously; automation and assistive tech benefit from scoping, but duplicated visible button names can be ambiguous.
- Live Escape did not close the method picker after reopening the selected `helpers.shuffle` picker and switching to `Recently used`; the dialog remained visible in `gap-live-faker-picker-after-recent-escape.png`. Storybook Escape closed the domain story from `gap-story-domain-filter-price.png` to `gap-story-domain-after-escape.png`.
- After clicking a live method tile, focus was observed on `BODY` rather than remaining on the selected method tile or moving to the dialog Apply button. This may weaken keyboard recovery inside the modal.
- Live page keeps hidden confirm dialogs in the DOM with `role="dialog"`; robust tests and assistive tech queries must distinguish hidden confirm dialogs from the visible method picker.

Follow-up ideas:

1. Add a Storybook combined-dialog story that uses the real deployed generator faker catalog shape instead of the four-item mock list.
2. Add a Storybook story for the live title/copy variant `Select schema method` so the accessible name is covered.
3. Add a Storybook story for the schema-row integration path: field type changes to faker/domain, opener text updates, params button enables, and shadow select value updates.
4. Add a Storybook story for a selected method opener state (`helpers.shuffle`) and the `Recently used` tab.
5. Add a Storybook interaction check that Escape closes from every state: initial open, filtered list, selected tile, docs/help focused, and recent tab.
6. Add a Storybook keyboard test for Tab/Shift+Tab focus containment inside the dialog and focus return to the opener on close.
7. Add a Storybook action-log assertion for Apply payload shape, including whether `faker` versus `domain` prefixes match the selected method.
8. Add a story that uses live docs-base configuration so docs links can be compared between Storybook (`anywaydata.com`) and deployed review pages (`/grid-table-editor/site/...`).
9. Add a "no results" search story for live-like data, covering empty search results and disabled Apply behavior.
10. Add a story for parameter-bearing faker methods, verifying parameter table, usage examples, params button enablement, and selected method schema rendering.
11. Add an accessibility story/check for duplicate visible `Apply` buttons when the picker is embedded inside the generator page.
12. Add cleanup assertions that no visible method-picker role dialog remains after Apply, Cancel, close button, and Escape.
13. Add a story for hidden sibling dialogs already present in the page, because the live generator has hidden confirm dialogs alongside the method picker.
14. Add a category-scale story with many namespaces so tab wrapping, scrolling, search, and responsive behavior match the live large catalog.

---
