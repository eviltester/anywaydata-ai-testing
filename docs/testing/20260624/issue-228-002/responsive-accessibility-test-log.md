# Responsive Accessibility Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: review the deployed generator/app/help surfaces under responsive and accessibility heuristics, including keyboarding and narrow-width behavior.

Techniques and heuristics to use: responsive testing heuristics, accessibility heuristics, keyboard-only exploration, focus-order checks, and visible-state consistency checks.

Expected focus: mobile and tablet layouts, keyboard reachability, focus visibility/order, modal/help interactions, semantics exposed through the accessibility tree, and user-visible layout breakage.

---

---
## 2026-06-24T21:36:40.0000000+01:00

- I want to prove that the changed generator/help/params flows still work at narrow widths and remain keyboard accessible, because issue 228 / PR 243 changed command definitions, params editing, and related help content.

I used Playwright CLI against https://eviltester.github.io/grid-table-editor/ with a dedicated session and resized the viewport to 390x844. On the landing page I captured keyboard focus order and a screenshot, then activated `Open generator.html` by keyboard. In `generator.html` I captured a full-page 390px-wide screenshot, checked for horizontal overflow, and used keyboard tabbing to record the early focus sequence: `Skip to main content`, `Data Generator Instructions`, `Show help`, `Show help`, `Edit as Text`, `Load Schema File`, `Save Schema File`, `Drag field to reorder`. I opened the generator instructions help and observed it exposes as a tooltip-like surface with a docs link. I then switched the first row to `faker`, selected `helpers.rangeToNumber`, opened the params editor at mobile width, captured a screenshot, checked dialog overflow, and tabbed through the modal to see whether focus stayed trapped. I also opened the published docs page https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/ in a second tab, resized it back to 390x844, checked heading structure and page overflow, and captured a screenshot.

The landing page and generator page both fit within 390px without horizontal overflow in this pass. The generator exposed useful accessible names for many icon-only controls such as `Show help`, `Drag field to reorder`, and `Edit params for helpers.rangeToNumber`, and the params dialog opened with focus in the `numberOrRange value` textbox. A confirmed defect was found in the `Edit Params` dialog for `helpers.rangeToNumber`: after one `Tab` focus moved to `Cancel`, and the next `Tab` escaped the dialog to the page `BODY` and then continued into page content (`Skip to main content`, `Data Generator Instructions`, etc.), showing the modal does not trap keyboard focus. This was repeatable in the same session. A secondary accessibility concern was observed in the generator instructions help: the visible help surface rendered as a tooltip with an embedded docs link, but tabbing continued through page controls rather than into the tooltip content, which suggests the help link may not be keyboard reachable when the help is open. The published `Faker Helpers` docs page at 390px showed no horizontal overflow and preserved a sensible `H1 -> H2 -> H3` heading progression in the sampled area. Screenshots saved: `screenshots/responsive-home-390w.png`, `screenshots/generator-390w-full.png`, `screenshots/generator-help-390w.png`, `screenshots/rangeToNumber-params-modal-390w.png`, `screenshots/faker-helpers-docs-390w.png`.

---
