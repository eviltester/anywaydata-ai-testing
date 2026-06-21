## 2026-06-20 17:23 +01:00

- Establish the negative-validation subagent charter so malformed params, wrong types, and validator edge cases are explored systematically across command families.

the actions you take

- Created the negative validation subagent log.
- Reserved this log for invalid inputs, boundary probes, and validator/error-handling evidence.

the observations and results that you make

- The prior session already suggests validator/runtime gaps may exist, so this area is high-risk and should not be limited to one family.

## 2026-06-20 18:18 +01:00

- Continue the negative-validation charter with a stricter deployed-only pass focused on invalid params, malformed structured params, boundary values, unsupported values, validator messaging quality, and whether failures are distinguishable from stale UI/runtime state.

the actions you take

- Rebuilt the browser harness against `https://eviltester.github.io/grid-table-editor/app.html` inside the published test environment only, with no local repo verify/build/test commands.
- Widened the browser viewport after confirming the narrow default view was collapsing the schema controls and making genuine validation behavior harder to distinguish from inert UI state.
- Opened the `Test Data` details panel explicitly and verified the schema row controls were actually interactable before trusting any negative result.
- Established a known-good baseline with `string.alpha` plus `(length=4)` and confirmed generation changed the live grid to one generated value (`KjpF`) with `Total rows: 1`.
- Used a differential oracle for each negative probe: record the current grid cell, change only the command/params, generate again, then compare the resulting grid cell, row count, and visible row-level messages.
- Applied negative-testing heuristics across multiple families:
- Type mismatch probes.
- Unsupported named argument probes.
- Malformed structured params with broken parentheses.
- Boundary-value probes.
- Stateful oracle checks for stale message persistence and unchanged generated cells.
- Executed these concrete invalid cases through the deployed UI:
- `string.alpha(length=abc)`
- `string.alpha(casing="sideways")`
- `string.alpha(exclude="A")`
- `internet.httpMethod(commonOnly=maybe)`
- `internet.protocol(secure=true)`
- `autoIncrement.sequence(start="ten")`
- `autoIncrement.sequence(zeropadding=-1)`
- `number.int(min=10, max=5)`
- `string.alpha(length=0)`
- `string.alpha(length=4`
- `autoIncrement.sequence(start=1, step=5`
- `number.int(min=1, max="five")`

the observations and results that you make

- Technique/heuristic coverage used in this pass:
- Negative testing.
- Equivalence partitioning for wrong-type vs unsupported-param vs malformed-structure failures.
- Boundary analysis.
- Differential oracle checking with before/after generated-cell comparison.
- Stateful UI heuristic checking for stale validation banners and unchanged output cells.
- Baseline sanity check passed: `string.alpha(length=4)` generated a normal value (`KjpF`), which shows the deployed harness can produce live data and that later failures were not caused by a dead generator.
- `string.alpha(length=abc)` was not blocked. The generated cell changed from `KjpF` to malformed output `string{alphalength=abc`, `Total rows: 1` stayed live, and no validator message appeared.
- This is a clear validation gap, not a stuck preview state: the runtime regenerated output, but treated the bad param as data-like text instead of surfacing a validation failure.
- `internet.httpMethod(commonOnly=maybe)` behaved similarly. The grid regenerated to malformed output `internet=httpMethodcommonOnly=maybe` with no validation message.
- This reproduces the earlier defect pattern in a second family and again indicates live regeneration without validator protection.
- `internet.protocol(secure=true)` produced the strongest true-validation signal in this pass. The grid cell stayed unchanged at the prior value `internet=httpMethodcommonOnly=maybe`, and the UI surfaced:
- `Value failed domain validation - Invalid keyword arguments: unknown named argument "secure"`
- `Row 1: invalid domain params - Invalid keyword arguments: unknown named argument "secure"`
- This case is important because it distinguishes validation failure from stale output state: the row-level validator fired, but the previously generated grid value remained on screen, so the user sees old data unless they notice the inline validation message.
- `string.alpha(casing="sideways")` changed the grid cell to generic `**ERROR**` and exposed only generic `**ERROR**` text rather than a precise parameter explanation.
- `string.alpha(exclude="A")` also stayed at generic `**ERROR**` with no precise row-level explanation, so structured-param type failures do not consistently explain what is wrong.
- `autoIncrement.sequence(start="ten")` also rendered `**ERROR**`, but the visible validation text was stale from the earlier `internet.protocol(secure=true)` run rather than being specific to the current `autoIncrement.sequence` failure.
- This suggests the validation-message area can lag behind the current row state, which weakens trust in the UI as an oracle during repeated negative edits.
- `autoIncrement.sequence(zeropadding=-1)` stayed at `**ERROR**` without a new specific row-level explanation, so the boundary violation result is ambiguous to an end user.
- `number.int(min=10, max=5)` stayed at `**ERROR**` with no specific boundary-order explanation, which leaves it unclear whether the app is validating the range or simply failing generically downstream.
- `string.alpha(length=0)` produced a blank generated cell with no validation message.
- This is either an accepted edge case or a missing minimum-length validation rule; either way it is worth explicit product clarification because an empty generated value looks like a silent failure.
- Malformed structured params with a missing closing parenthesis did trigger explicit row-level validation:
- `string.alpha(length=4` produced `Row 1: params should be wrapped in parentheses, e.g. ((length=4).`
- `autoIncrement.sequence(start=1, step=5` produced `Row 1: params should be wrapped in parentheses, e.g. ((start=1, step=5).`
- Those messages prove the deployed UI can catch at least some structural param errors before generation.
- The malformed-structure guidance text is itself flawed: both examples show doubled opening parentheses and still omit the closing parenthesis, so the validator message teaches the broken format instead of the correct one.
- `number.int(min=1, max="five")` ended in `**ERROR**` while the prior malformed-parenthesis validation message remained visible, further confirming stale validation messaging can persist across later command/param changes.
- Overall stricter-pass finding:
- The deployed app shows three different negative-failure modes for bad params:
- silent malformed regeneration with no validator message,
- generic `**ERROR**` output with poor or missing explanation,
- explicit row-level validation with stale prior grid data left visible.
- Because these modes are inconsistent, the UI currently does not reliably help a user distinguish â€œyour params were rejectedâ€ from â€œyour old generated value is still being shownâ€ or â€œgeneration failed generically downstream.â€
- Exact invalid cases tested in this stricter pass:
- `string.alpha(length=abc)` -> malformed generated cell `string{alphalength=abc`, no message.
- `string.alpha(casing="sideways")` -> generated cell `**ERROR**`, generic messaging only.
- `string.alpha(exclude="A")` -> generated cell `**ERROR**`, generic messaging only.
- `internet.httpMethod(commonOnly=maybe)` -> malformed generated cell `internet=httpMethodcommonOnly=maybe`, no message.
- `internet.protocol(secure=true)` -> prior cell preserved, row-level validation message about unknown named argument `secure`.
- `autoIncrement.sequence(start="ten")` -> generated cell `**ERROR**`, stale prior message persisted.
- `autoIncrement.sequence(zeropadding=-1)` -> generated cell `**ERROR**`, no new specific message.
- `number.int(min=10, max=5)` -> generated cell `**ERROR**`, no range-order message.
- `string.alpha(length=0)` -> blank generated cell, no message.
- `string.alpha(length=4` -> row-level malformed-parentheses message, no new generated value.
- `autoIncrement.sequence(start=1, step=5` -> row-level malformed-parentheses message, no new generated value.
- `number.int(min=1, max="five")` -> generated cell `**ERROR**`, stale malformed-parentheses message persisted.
- New follow-up ideas from this pass:
- Probe whether dismissing the inline validation message also clears the stale mental model problem, or whether the old generated cell still remains without any warning.
- Repeat the `internet.protocol(secure=true)` unsupported-param case after a successful clean generation in a different family to confirm unchanged-grid behavior is stable and not family-specific.
- Check whether switching from one invalid case to another invalid case refreshes the row-level message reliably, or whether stale-message carryover happens across all domains.
- Exercise the params edit dialog for a command with documented params and compare its validation behavior against raw typing in the params textbox.
- Probe array-shaped structured params with syntactically valid but semantically wrong values, e.g. `string.alpha(exclude=["A", 1])`, to see whether mixed-type arrays get specific feedback.
- Probe boolean families with canonical-but-quoted booleans, e.g. `internet.httpMethod(commonOnly="true")`, to see whether type coercion is silently accepted.
- Probe numeric boundaries at zero and one for commands like `autoIncrement.sequence(step=0)` and `string.alpha(length=1)` to separate intended edge handling from silent failure.
- Probe date-family malformed params such as reversed ranges and invalid dates once a stable date command with documented params is selected in the deployed picker.
- Compare row-mode validation with text-mode schema validation for the same malformed params to see whether one surface rejects earlier or explains better.
- Check whether the generated grid should be cleared or visibly marked stale when row-level validation blocks a regeneration, because leaving the prior value visible is misleading.
- Sample the browser console for validator/runtime errors during `**ERROR**` outcomes to determine whether useful detail exists in the runtime but is simply not surfaced in the UI.
- Verify whether blank output from `string.alpha(length=0)` is an intentional contract and, if so, whether the docs/help/examples should call that out explicitly.
