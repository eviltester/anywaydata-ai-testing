# command-coverage-test-log.md

## 2026-06-20 17:23 +01:00

- Establish the command-coverage subagent charter so representative positive-path coverage can be gathered across many amended command families and docs examples.

the actions you take

- Created the command coverage subagent log.
- Reserved this log for broad command-family sampling, docs-example execution, and coverage accounting.

the observations and results that you make

- This area needs to prove breadth, not just depth on one command.

## 2026-06-20 18:57 +01:00

- Sample one newly added command from the amended internet family, check whether the removed `image.urlLoremFlickr` still leaks through picker/docs/help, and add one quick breadth note so this log contributes real command-surface coverage.

the actions you take

- Opened the deployed generator at `https://eviltester.github.io/grid-table-editor/generator.html`.
- Switched the schema row to `domain`, inspected the live command picker options, selected `internet.httpMethod`, entered column name `method`, and ran `Preview`.
- Read the output preview and first visible preview-grid rows.
- Followed the command help surface for internet/image using the published docs URLs and fetched the published `image` and `internet` domain docs HTML to check for `internet.httpMethod`, `image.urlLoremFlickr`, and related examples.
- Performed one extra quick breadth check by confirming the same live picker still exposes representatives from other amended families (`date.month`, `finance.pin`, `string.alpha`, `word.words`) and sampling `number.int`.
- Techniques/heuristics used: positive-path sampling, docs/UI cross-checking, command-family breadth sampling, oracle comparison against published docs/help, and consistency heuristics across picker/help/docs/runtime surfaces.

the observations and results that you make

- `internet.httpMethod` is present in the live domain picker and in the published internet docs/help.
- Executing `internet.httpMethod` in the deployed generator produced plausible HTTP verbs in preview and grid output, including `PATCH`, `TRACE`, `PUT`, `OPTIONS`, `DELETE`, and `CONNECT`.
- The published internet docs/help currently show `internet.httpMethod()` with `No parameters`; I did not see published filtering/exclusion usage examples on that surface during this pass.
- `image.urlLoremFlickr` is absent from the live generator command picker while `image.url` and `image.urlPicsumPhotos` are present.
- The published image domain docs still contain `image.urlLoremFlickr` in the method list, body content, and table of contents, so removal appears incomplete across docs/help versus picker/runtime.
- Quick breadth note: the same live picker still exposed representatives from other broadly amended families (`date.month`, `finance.pin`, `string.alpha`, `word.words`), and a fast `number.int` sample still generated numeric-looking values in preview rows.
- New ideas suggested by this coverage: compare the published internet docs/examples against the actual `internet.httpMethod` parameter dialog/runtime support for filter or exclude behavior; audit the image docs/help generation path for stale removed commands; spot-check other removed/renamed commands for the same picker-vs-docs drift pattern.

\newpage

# docs-consistency-test-log.md

## 2026-06-20 17:23 +01:00

- Establish the docs-consistency subagent charter so published docs, command help, and runtime behavior can be cross-checked across the amended surfaces.

the actions you take

- Created the docs consistency subagent log.
- Reserved this log for docs page review, example cross-checking, removed-command checks, and stale-content detection.

the observations and results that you make

- Because the PR heavily edited domain docs and help surfaces, documentation accuracy is a first-class test target.

## 2026-06-20 18:05 +01:00

- Review broad published docs/content surfaces for issue #226 / PR #231 using only the deployed test environment, compare representative docs examples and help/navigation against live app surfaces where practical, and check for stale, removed, or deprecated visibility problems.

the actions you take

- Reviewed representative changed published domain docs pages under the deployed nested site.
- Sampled command names, canonical names, and example shapes from the published `airline`, `animal`, `autoIncrement`, `color`, `finance`, `internet`, `literal`, and `string` pages.
- Opened the deployed test-environment home, nested site, app, and generator surfaces.
- Inspected live inline docs/help link targets exposed by the deployed generator/app surfaces.
- Compared published command naming with live command-picker naming where the deployed UI exposed it.
- Tried representative docs-derived domain examples in the deployed generator flow to compare docs example shape against the live params-entry affordance.
- Checked sampled docs pages and sampled live surfaces for obvious removed/deprecated labels or commands.

the observations and results that you make

- The deployed generator/app help and docs navigation is inconsistent with the deployed nested-site base path: sampled live links pointed at mixed targets including `https://eviltester.github.io/grid-table-editor/docs/...`, `https://eviltester.github.io/docs/...`, and `https://anywaydata.com/...` instead of consistently using `https://eviltester.github.io/grid-table-editor/site/docs/...`.
- The published airline docs page uses aggregate and nested command names such as `airline.airline`, `airline.airplane`, `airline.airport`, `airline.airline.iataCode`, and `airline.airline.name`, but the live deployed command-picker surface exposed flattened names like `airline.iataCode`, `airline.name`, `airplane.iataTypeCode`, and `airport.iataCode`; the docs and picker naming model do not line up cleanly.
- Published docs examples use full invocation strings such as `autoIncrement.sequence(start=10, step=5)`, `literal.value(value="Pending")`, and `string.alpha(length=5, casing="upper")`, while the live deployed domain UI splits command selection from params entry and rejects bare params text unless it is wrapped for the separate params field; that makes docs-to-picker execution non-obvious.
- On the sampled domain docs pages there were no explicit `deprecated` or `removed` markers or obvious removed-command leakage. That is a limited positive signal only for the sampled pages.

\newpage

# issue-226-second-session-test-log.md

## 2026-06-20 17:23 +01:00

- Set up the second-session exploratory testing structure so the work follows the stricter brief with explicit planning, delegation, and looped coverage instead of drifting into a narrow single-thread pass.

the actions you take

- Re-read the second-session goal prompt from the workspace.
- Re-opened the issue and PR details from current GitHub state.
- Confirmed the expected output folder is `docs/testing/issue-226-second-session/`.
- Created the main sequential log for this session.
- Prepared to create the main report and the delegated subagent logs before substantive testing begins.

the observations and results that you make

- The prompt now makes planning, delegation, and final review loops mandatory.
- The scope is explicitly broad: nearly all command definitions changed, so command-family coverage must be demonstrable rather than assumed.
- The previous sessions narrow coverage should be treated as background caution, not as sufficient evidence for this session.

## 2026-06-20 18:03 +01:00

- Start Loop 1 substantive coverage on the deployed generator and published docs, looking for broad command-definition/runtime mismatches rather than stopping at the first known validator issue.

the actions you take

- Opened `https://eviltester.github.io/grid-table-editor/generator.html` in the deployed test environment.
- Switched the starter schema row from `regex` to `domain`.
- Opened the method picker and inspected `autoIncrement.sequence` details.
- Reviewed the documented usage examples exposed in the picker, including:
  - `autoIncrement.sequence()`
  - `autoIncrement.sequence(start=10, step=5)`
  - `autoIncrement.sequence(start=1, step=5, prefix="filename", suffix=".txt", zeropadding=3)`
- Applied `autoIncrement.sequence` to the row.
- Set the column name to `seq`.
- Entered params as `(start=10, step=5)` and previewed.
- Replaced params with `start=10, step=5` and previewed again.
- Switched the selected command from `autoIncrement.sequence` to `string.alpha`.
- Observed the params field state after the command switch.
- Entered `length=5, casing=upper` for `string.alpha` and previewed.
- Opened the published string docs page at `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string/`.
- Confirmed that the published string docs include multiple examples for `string.alpha`, `string.alphanumeric`, and `string.uuid`.

the observations and results that you make

- Good signal: the method picker for `autoIncrement.sequence` exposes rich parameter metadata and multiple usage examples consistent with the story intent.
- Potential defect: preview output for `autoIncrement.sequence` ignored both `(start=10, step=5)` and `start=10, step=5`, continuing to generate `1` through `10` instead of starting at `10` and incrementing by `5`.
- Potential defect: switching from `autoIncrement.sequence` to `string.alpha` preserved the old params text in the params field instead of clearing or reconciling it for the newly selected command.
- Potential defect: after switching to `string.alpha` and replacing params with `length=5, casing=upper`, the preview output still remained `1` through `10`, suggesting the preview/runtime state did not re-sync to the newly selected command.
- Good signal: the published string docs do contain a broad set of examples for `string.alpha` and related commands, which supports the story requirement at the documentation layer even though the runtime behavior sampled here looks suspicious.

## 2026-06-20 18:09 +01:00

- Integrate the first delegated subagent results so Loop 1 reflects real parallel coverage instead of only main-thread generator/browser findings.

the actions you take

- Received and reviewed the responsive/accessibility subagent output.
- Appended the delegated findings into the dedicated responsive/accessibility subagent log.
- Prepared to merge the most important subagent findings into the main report and Loop 1 coverage summary.

the observations and results that you make

- The delegated pass adds a distinct second lane of evidence: the generator has weaker semantic/accessibility structure than the docs site, and the published mobile docs keep page width contained but still force horizontal scrolling for dense command-reference tables.
- Confirmed delegated findings include:
  - no `main`, no `h1`, and no skip link on `generator.html`
  - multiple generator help affordances implemented as `span[role="button"]`
  - top generator help trigger exposing content without updating `aria-expanded`
  - mobile overflow/scroll pressure in command-reference tables on `site/docs/test-data/domain/string`
- This broadens Loop 1 coverage beyond runtime command parsing into accessibility and responsive risks tied to the changed help/docs surfaces.

## 2026-06-20 18:12 +01:00

- Integrate the second delegated subagent result so Loop 1 reflects workflow-level regression evidence and not just runtime/parser and accessibility findings.

the actions you take

- Received and reviewed the UX/regression subagent output.
- Appended the delegated findings into the dedicated UX/regression subagent log.
- Prepared to merge the strongest workflow findings into the main report before continuing broader command-family sampling.

the observations and results that you make

- The delegated UX pass independently reinforces the state-corruption theme already seen on the main thread.
- Confirmed delegated findings include:
  - command/params state corruption after picker lifecycle
  - preview stuck on repeated `Pending`
  - Last Used history being populated during exploratory interaction without an explicit save-style intent
  - broad presence of help affordances despite the unstable workflow behavior
- This adds a third distinct Loop 1 evidence lane: workflow regression, alongside runtime command/params mismatches and responsive/accessibility risks.

## 2026-06-20 18:14 +01:00

- Integrate the docs-consistency delegated result so Loop 1 includes documentation parity evidence rather than only runtime and UX behavior.

the actions you take

- Received and reviewed the docs-consistency subagent output.
- Appended the delegated findings into the dedicated docs-consistency subagent log.
- Prepared to merge the key docs/help parity problems into the main report before continuing direct command-family sampling.

the observations and results that you make

- The delegated docs pass adds a fourth distinct evidence lane: docs/help parity and deployed-link correctness.
- Confirmed delegated findings include:
  - deployed inline docs/help targets drifting across `/grid-table-editor/docs/...`, `eviltester.github.io/docs/...`, and `anywaydata.com/...` instead of staying nested-site-safe under `/grid-table-editor/site/docs/...`
  - naming drift between published airline docs and the live picker surface
  - docs examples not translating cleanly to the live picker params-entry workflow
- This substantially strengthens the case that the PR may satisfy examples exist at a content layer while still failing usability and parity expectations in the deployed product.

## 2026-06-20 18:19 +01:00

- Broaden direct command-example execution and fold in the stricter negative-validation lane so Loop 1 shows cross-family evidence rather than isolated defects.

the actions you take

- Re-used the deployed generator with fresh Playwright sessions so stale row state from earlier experiments did not contaminate new command samples.
- Re-checked published docs examples before execution, using the deployed `literal`, `finance`, and `internet` domain pages as live oracles.
- Executed `literal.value(value="Pending")` in the generator and compared the documented return value with the preview output.
- Executed `internet.protocol` as a no-params control sample to establish whether at least some amended command definitions still behave correctly end-to-end.
- Executed `finance.pin(length=5)` from the published docs examples and compared the requested length with the generated preview values.
- Reviewed and incorporated the stricter delegated negative-validation log, which added 12 invalid-case probes across `string`, `internet`, `autoIncrement`, and `number`.

the observations and results that you make

- Potential defect: `literal.value(value="Pending")` preview rendered blank values instead of the documented `Pending`, so another docs-backed example now fails at runtime in a different command family.
- Good control signal: `internet.protocol` behaved as expected and generated a mix of `http` and `https`, showing the deployed generator is capable of correct command execution for at least some no-params methods.
- Potential defect: `finance.pin(length=5)` generated 4-digit values such as `6444`, `2969`, and `2520` rather than 5-digit values, which strongly suggests parameterized examples are being ignored beyond the earlier `autoIncrement.sequence` case.
- The direct breadth pass now shows a cross-family pattern:
  - no-params/default examples can succeed
  - parameterized examples can fail by being ignored, malformed, or rendered blank
- The delegated negative pass substantially strengthens the failure model for bad params:
  - some invalid inputs regenerate malformed text with no validation message
  - some collapse to generic `**ERROR**` output with weak explanation
  - some surface a row-level validation message while still leaving stale prior grid data visible
- The malformed-parentheses guidance is itself defective because it demonstrates a broken example format, so even one of the clearer validation cases teaches the wrong correction.

## 2026-06-20 18:26 +01:00

- Run the required Loop 2 review so the next tests are chosen from gaps and patterns in the evidence rather than continuing as opportunistic spot checks.

the actions you take

- Reviewed the accumulated direct findings plus delegated docs, UX, accessibility, and negative-validation evidence.
- Generated 10 new Loop 2 ideas and classified them:
  - `execute-now`: compare `finance.pin()` baseline against `finance.pin(length=5)`
  - `execute-now`: try `number.int(min=10, max=12)` as another parameterized numeric-range example
  - `execute-now`: try `literal.value(value=1)` to see whether numeric literals behave differently from string literals
  - `execute-now`: try `autoIncrement.timestamp()` as a no-params control in the same family where `autoIncrement.sequence(start=10, step=5)` failed
  - `defer`: compare raw params textbox entry with the params edit dialog for one parameterized command
  - `defer`: add faker/helper-specific coverage such as `helpers.slugify` or `helpers.replaceSymbols`
  - `defer`: compare row-mode behavior with text-mode schema execution for the same documented examples
  - `defer`: sample date-family parameterized examples after the command-execution subagent returns broader coverage
  - `defer`: capture screenshots once the defect set stabilises enough for final-report illustration
  - `defer`: re-check stored-history/Recently Used side effects after a refresh to see whether pollution persists across fresh sessions
- Executed every `execute-now` item.
- Cleared the `finance.pin` params field and previewed to establish the default baseline after the earlier failed `length=5` check.
- Opened a fresh session and executed `number.int(min=10, max=12)`.
- Opened a fresh session and executed `literal.value(value=1)`.
- Opened a fresh session and executed `autoIncrement.timestamp()` with no params.

the observations and results that you make

- `finance.pin()` generated 4-digit values such as `0099`, `9930`, and `5065`, which confirms the default behavior is plausible while the documented `length=5` variant was ignored.
- Potential defect: `number.int(min=10, max=12)` produced large 16-digit values rather than values constrained to `10`, `11`, or `12`, which widens the parameter-application defect pattern into another unrelated command family.
- Potential defect: `literal.value(value=1)` still rendered blank cells, so the literal-value failure is not limited to quoted strings.
- Good control signal: `autoIncrement.timestamp()` behaved plausibly and generated sequential ISO timestamps, showing the same domain family can contain both a working default example and a broken parameterized example.
- Loop 2 sharpened the main testing hypothesis:
  - the deployed generator can execute some default/no-params commands correctly
  - many parameterized examples sampled so far are being ignored or mishandled across multiple families
  - the story/PR can therefore appear successful at the docs/help layer while still failing the practical can a user run these examples? expectation in the test environment

## 2026-06-20 18:32 +01:00

- Run Loop 3 against the remaining high-value gaps: faker/helper execution and whether the params dialog behaves differently from the raw params textbox.

the actions you take

- Switched the generator into explicit `faker` mode and opened the faker command picker.
- Used the picker details as a live oracle for helper examples because the picker exposes command-specific usage examples and documentation targets.
- Applied `helpers.arrayElement` and executed the example-style params `(["A", "B", "C"])`.
- Opened a fresh `finance.pin` session specifically to compare the raw params textbox path with the structured params dialog path.
- Opened the `Edit params for finance.pin` dialog, entered `length=5` through the dialog field, applied the generated params back to the row, and previewed.
- Observed the generated params string pushed back into the row after dialog use and compared the resulting preview output with the earlier raw-textbox behavior for `finance.pin(length=5)`.
- Reviewed the outcome to decide whether Loop 3 pointed more toward command-definition failure or params-input-path failure.

the observations and results that you make

- Potential defect: `helpers.arrayElement(["A", "B", "C"])` did not return one of `A`, `B`, or `C`. Instead it generated malformed outputs such as `helpersaarrayElement`, `helpersBarrayElement`, and `helpers7arrayElement`.
- This extends the parameterized-example problem into explicit faker/helper coverage, so the issue is not limited to domain-family commands.
- High-value differential finding: the `finance.pin` params dialog path behaved differently from the raw params textbox path.
- Through the dialog, entering `length=5` generated row params `(length=5)` and preview produced genuine 5-digit values such as `87566`, `52975`, `68273`, and `01786`.
- Earlier in direct row-mode typing, `finance.pin(length=5)` had produced only 4-digit values.
- This strongly suggests at least part of the defect lives in the raw params-entry/parsing path, not solely in the underlying command definition or runtime generator.
- Loop 3 therefore changes the working theory again:
  - some parameterized commands can execute correctly when params are supplied through the structured dialog
  - the free-text params textbox is likely misparsing, dropping, or corrupting at least some parameterized inputs
  - documentation-to-runtime failure may therefore be a usability/integration defect between examples and the primary row-mode input surface, not just a bad command catalog

## 2026-06-20 18:49 +01:00

- Run the mandatory final review loop and challenge the strongest current hypothesis before finishing, because several earlier failures may have been influenced by stale state or by pasting full-command examples into a UI that splits command selection from parameter entry.

the actions you take

- Reviewed the story intent, PR summary, accumulated logs, current report, sampled command families, docs pages reviewed, and the remaining gaps.
- Generated 10 additional final-review ideas and classified them:
  - `execute-now`: re-run `date.month(abbreviated=true)` in a fresh session using the picker plus parenthesized params only
  - `execute-now`: execute `helpers.replaceSymbols("##??-##")` from the picker example in a fresh session
  - `execute-now`: re-run `finance.pin(length=5)` using the split UI correctly: picker selects the command, params box contains only `(length=5)`
  - `execute-now`: re-run `number.int(min=10, max=12)` in a fresh session using the same split-UI pattern
  - `execute-now`: re-run `autoIncrement.sequence(start=10, step=5)` in a fresh session using the same split-UI pattern
  - `defer`: re-test `literal.value` after checking whether the picker expects a positional literal rather than `value=...`
  - `defer`: re-test `string.alpha` in a completely clean session to separate stale-state effects from true command failure
  - `defer`: compare row mode with text-mode schema execution for the same examples
  - `defer`: re-check stored-history behavior after refresh/new session
  - `defer`: add screenshots only if the corrected final defect set still needs visual explanation
- Executed every `execute-now` item in fresh sessions.
- Re-ran `date.month` with picker-selected command and params `(abbreviated=true)`.
- Re-ran `helpers.replaceSymbols` with picker-selected command and params matching the picker example shape.
- Re-ran `finance.pin`, `number.int`, and `autoIncrement.sequence` with picker-selected commands and parenthesized params only, avoiding the earlier full-command-in-row entry pattern.
- Re-ran `helpers.arrayElement` in a fresh faker session to check whether at least one previously suspicious helper failure still reproduces after the corrected retest pattern.

the observations and results that you make

- Important correction: `date.month(abbreviated=true)` worked correctly in a fresh session and generated abbreviated month names such as `Oct`, `Dec`, `Mar`, `Jan`, and `Jul`.
- Important correction: `helpers.replaceSymbols("##??-##")` worked correctly in a fresh session and generated outputs matching the documented shape such as `16OV-64`, `00AU-29`, and `23KC-73`.
- Important correction: `finance.pin(length=5)` also worked correctly when the UI was used as designed, with the picker selecting `finance.pin` and the params field containing only `(length=5)`. Preview then generated genuine 5-digit values such as `66488`, `43435`, and `01528`.
- Important correction: `number.int(min=10, max=12)` worked correctly in a fresh session and generated only `10`, `11`, and `12`.
- Important correction: `autoIncrement.sequence(start=10, step=5)` worked correctly in a fresh session and generated `10`, `15`, `20`, `25`, and onward.
- These clean retests materially change the session conclusion:
  - the earlier broad parameterized command execution is broken across many families hypothesis is not supported strongly enough to keep as a final conclusion
  - several earlier failures are better explained by a combination of stale row/session state and the mismatch between published full-command examples and the live split command-picker-plus-params workflow
  - the docs/workflow mismatch is therefore more important than the earlier all command definitions are broken interpretation
- A narrower runtime defect still appears real: `helpers.arrayElement` continued to generate malformed outputs such as `helpersmarrayElementC`, `helpersbarrayElementA`, and `helpers#arrayElementB` rather than returning a supplied array member, so at least one helper command still looks genuinely broken.
- The final review therefore leaves a more precise result:
  - many amended command definitions/examples do execute successfully in the deployed app when the split UI is used correctly
  - the largest cross-cutting problem is that published full-command examples are not directly executable in the primary row-mode workflow without users inferring how to split command choice from params entry
  - some previously logged command failures should be downgraded from confirmed defect to provisional earlier observation no longer reproduced cleanly

## 2026-06-20 18:57 +01:00

- Audit the current deliverables against the saved second-session goal prompt before treating the goal as complete, because the report still needs to prove requirement coverage more explicitly rather than relying on broad narrative claims.

the actions you take

- Re-read the saved second-session goal prompt from the workspace and checked the existing log, report, PDF, and delegated logs against its named requirements.
- Reviewed the current PR state directly with GitHub CLI to recover the actual changed-file groups behind PR #231 rather than relying only on the PR summary text.
- Confirmed the PR changed broad docs surfaces plus command-help, validator, picker, helper, keyword-definition, and interaction-matrix files.
- Captured a fresh screenshot for the still-reproducible `helpers.arrayElement` defect so the report can embed concrete visual evidence.
- Identified report gaps to tighten:
  - changed-surface inventory should be more explicitly derived from the changed files
  - coverage should be mapped more directly to the prompts command-coverage categories
  - the report should include at least one embedded screenshot now that a stable true defect remains

the observations and results that you make

- The completion audit changed the work again: the existing report was directionally good but still too generic in two important places:
  - its changed-surface inventory leaned on summary language more than the actual changed-file groups
  - it did not explicitly map enough coverage back to the prompts new command, removed/deprecated, and broad sampling class expectations
- The PR file list materially strengthens the planning evidence because it shows real change clusters in:
  - `docs-src/docs/040-test-data/domain/*`
  - command-help contract and validator files
  - picker/help UI files
  - keyword-definition reorganizations
  - helper keyword definitions
  - interaction-matrix fixtures and support
- The `helpers.arrayElement` screenshot provides stronger evidence than text alone because it shows the malformed preview/data-table values rather than a simple assertion in prose.

## 2026-06-20 18:59 +01:00

- Decide whether stopping is now justified, because the stricter prompt requires an explicit stop rationale rather than an implicit this feels done handoff.

the actions you take

- Reviewed the updated main log, main report, delegated logs, and regenerated PDF deliverable after the command-coverage subagent returned and after the report was tightened with actual PR file groups and an embedded screenshot.
- Checked whether any remaining high-value `execute-now` ideas were still obvious from the current evidence.
- Compared the remaining gaps against the strongest findings already established for the story.

the observations and results that you make

- Stopping is now justified for this session because:
  - multiple explicit loops were completed, including the mandatory final review loop
  - command coverage is broad enough to support a story-level assessment even though it is not exhaustive
  - the latest work mainly refined interpretation and deliverable quality rather than revealing a new major defect family
  - the remaining gaps are narrower follow-up items (`literal.value`, `string.alpha`, text-mode comparison, more removed-command spot checks) rather than evidence that the whole session lacks direction
- The strongest current story-level result is stable:
  - many parameterized examples do work when the split UI is used correctly
  - docs/help/workflow alignment remains weak
  - at least one helper command and several docs/help/accessibility/validation issues still warrant follow-up

\newpage

# negative-validation-test-log.md

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
- Because these modes are inconsistent, the UI currently does not reliably help a user distinguish your params were rejected from your old generated value is still being shown or generation failed generically downstream.
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

\newpage

# responsive-accessibility-test-log.md

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
- Probed the generators top help affordance to see whether activation updated state and exposed help content accessibly.
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

\newpage

# ux-regression-test-log.md

## 2026-06-20 17:23 +01:00

- Establish the UX/regression subagent charter so generator workflows, method-picker behavior, help affordances, and related usability regressions are covered.

the actions you take

- Created the UX regression subagent log.
- Reserved this log for flow-level generator behavior, method-picker usability, selection, application, and help-link workflow observations.

the observations and results that you make

- The PR changed help metadata and picker rendering, so workflow regressions are plausible even when command definitions themselves look correct.

## 2026-06-20 17:09 +01:00

- Exercise the deployed generators highest-risk UX/regression paths around source-type switching, method-picker lifecycle, params persistence, preview behavior, help affordances, and stored-history side effects because PR #231 changed help metadata, picker rendering, and command-definition workflows broadly.

the actions you take

- Opened the deployed test environment and reached the generator through the published site path only.
- Exercised the generator row workflow in row mode rather than local code or repo commands.
- Switched the schema row into domain-command mode and confirmed the row exposed the domain picker trigger, domain help link, params input, and params-edit affordance.
- Opened the method-picker modal, inspected its visible structure, and confirmed the picker exposed filter input, category chips, close/cancel/apply controls, and domain-family groupings including `internet`.
- Interacted with the picker lifecycle and category area, then closed the picker to observe whether command/params state remained stable.
- Inspected the post-picker schema row state, managed-stored-schema area, and preview controls.
- Ran Preview and waited for the preview area to settle to distinguish loading/transient behavior from a persistent regression.
- Cross-checked visible help affordances on the same deployed surface, including command help, preview help, and file-generation help entry points.

the observations and results that you make

- The method-picker modal does open and exposes the expected UX primitives: filter field, domain-family chips, close/cancel/apply controls, and a broad command catalog surface.
- Regression finding: after the picker lifecycle, the row state mutated unexpectedly. The row surfaced `Edit params for literal.value` while the params field held `(length=5, casing="upper")`, which does not match a clean domain-command selection flow and suggests command-switch/picker-close state corruption.
- Regression finding: the same workflow also surfaced a stronger mismatch earlier in-row, where a domain row carried `string.alpha(length=5, casing="upper")` in the params field instead of a clean command-selection-plus-params split.
- Regression finding: preview did not resolve to generated data or an explicit validation error. After triggering Preview and waiting an additional 2.5 seconds, the visible preview grid still showed repeated `Pending`, which looks like a stuck preview state rather than a completed render.
- Regression finding: stored-history state changed without an explicit save-style user intent. The Last Used area populated a timestamped entry (`last used - 2026-06-20T17:09:41.607Z`) and enabled `Load` / `Clear Last Used`, which creates a real risk of accidental history pollution from exploratory or half-complete edits.
- UX risk: the picker interactions provided weak visible confirmation for selection state during this run; the most obvious feedback arrived only after closing, and that feedback appeared incorrect.
- Good signal: help affordances are broadly present on the deployed surface for schema help, domain help, preview help, and file-generation help, so the PRs help-surface expansion is visible in the product.
- Good signal with caveat: the picker surface itself is richer and more discoverable than a bare command list, but the lifecycle/state-handling regressions make the richer UI hard to trust.

\newpage

# issue-226-second-session-defects-report.md

# Issue 226 Second Session Defects Report

## Purpose

This report summarizes the confirmed defects identified during the second-session exploratory review for issue #226 / PR #231 and links to the detailed investigator-ready defect writeups.

Use this file as the entry point for triage. Each linked defect file contains deeper reproduction detail, expected versus actual behavior, evidence pointers, likely investigation areas, and suggested verification checks.

## Scope

- Source session report: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)
- Source session log: [issue-226-second-session-test-log.md](issue-226-second-session-test-log.md)
- Defect pack index: [defects/README.md](defects/README.md)

## Confirmed Defects

### 1. `helpers.arrayElement` generates malformed output

- Summary: the deployed generator produced malformed values like `helpersmarrayElementC` instead of returning one supplied array member.
- Impact: genuine runtime defect in a helper command path.
- Detailed report: [DEFECT-01-helpers-arrayElement-malformed-output.md](defects/DEFECT-01-helpers-arrayElement-malformed-output.md)

### 2. Published examples do not map cleanly to the split picker-plus-params UI

- Summary: docs and help often present full invocation strings, while the live UI requires separate command selection and params entry.
- Impact: high usability/documentation defect that can create false failure signals.
- Detailed report: [DEFECT-02-docs-examples-do-not-map-cleanly-to-split-ui.md](defects/DEFECT-02-docs-examples-do-not-map-cleanly-to-split-ui.md)

### 3. Deployed help/docs links are not consistently nested-site-safe

- Summary: sampled links drift across mixed hosts and paths instead of staying consistently within the deployed nested docs path.
- Impact: parity and trust issue for the test environment.
- Detailed report: [DEFECT-03-deployed-help-links-not-nested-site-safe.md](defects/DEFECT-03-deployed-help-links-not-nested-site-safe.md)

### 4. Removed `image.urlLoremFlickr` command still appears in published docs

- Summary: the command is gone from the live picker/runtime but still visible in published image docs/help.
- Impact: stale documentation and incomplete removed-command cleanup.
- Detailed report: [DEFECT-04-image-urlLoremFlickr-still-published-in-docs.md](defects/DEFECT-04-image-urlLoremFlickr-still-published-in-docs.md)

### 5. Airline docs naming does not match live picker naming

- Summary: published airline docs use a naming model that does not line up cleanly with the pickers flattened names.
- Impact: docs-to-picker discoverability problem.
- Detailed report: [DEFECT-05-airline-docs-naming-does-not-match-picker.md](defects/DEFECT-05-airline-docs-naming-does-not-match-picker.md)

### 6. Invalid-parameter feedback is inconsistent and can leave stale data visible

- Summary: bad params can produce malformed output, generic `**ERROR**`, or row-level validation while old data remains on screen.
- Impact: high-value validator and UX defect.
- Detailed report: [DEFECT-06-invalid-param-feedback-is-inconsistent-and-can-leave-stale-data-visible.md](defects/DEFECT-06-invalid-param-feedback-is-inconsistent-and-can-leave-stale-data-visible.md)

### 7. Malformed-parentheses guidance message is itself wrong

- Summary: the validator message for missing closing parentheses demonstrates broken syntax instead of the correct fix.
- Impact: users get incorrect remediation guidance from one of the clearer validation paths.
- Detailed report: [DEFECT-07-malformed-parentheses-guidance-message-is-itself-wrong.md](defects/DEFECT-07-malformed-parentheses-guidance-message-is-itself-wrong.md)

### 8. Generator accessibility structure and help controls are weaker than the docs shell

- Summary: the generator lacks `main`, `h1`, and skip link structure; some help controls use weak semantics; `aria-expanded` does not track visible help correctly.
- Impact: accessibility and usability defect on a help-heavy workflow.
- Detailed report: [DEFECT-08-generator-accessibility-structure-and-help-controls.md](defects/DEFECT-08-generator-accessibility-structure-and-help-controls.md)

### 9. Mobile docs command tables overflow narrow viewports

- Summary: dense docs tables overflow their containers and require awkward horizontal scrolling on narrow screens.
- Impact: the richer docs are harder to use on phones.
- Detailed report: [DEFECT-09-mobile-docs-command-tables-overflow-narrow-viewports.md](defects/DEFECT-09-mobile-docs-command-tables-overflow-narrow-viewports.md)

### 10. Switching commands can preserve stale params

- Summary: after switching to a new command, the old commands params can remain in the params field.
- Impact: state contamination and misleading example execution.
- Detailed report: [DEFECT-10-command-switching-can-preserve-stale-params.md](defects/DEFECT-10-command-switching-can-preserve-stale-params.md)

## Excluded From This Defect Report

These items were intentionally not promoted into confirmed defect reports because the second session ended with insufficient clean evidence:

- `literal.value`
- `string.alpha`
- preview stuck behavior
- stored-history pollution

Those remain follow-up risks or ambiguous observations rather than confirmed defects from the final session evidence.

## Suggested Triage Order

If another agent is picking these up for investigation/fix, a sensible order is:

1. `helpers.arrayElement` runtime defect
2. invalid-parameter feedback consistency
3. split-ui example mapping/docs clarity
4. removed/stale docs issues (`image.urlLoremFlickr`, nested-site-safe links, airline naming)
5. command-switch stale params
6. accessibility and mobile docs issues

\newpage

# DEFECT-01-helpers-arrayElement-malformed-output.md

# DEFECT-01: `helpers.arrayElement` Generates Malformed Output Instead Of Returning An Array Member

## Summary

The deployed generator produced malformed strings like `helpersmarrayElementC` and `helpers#arrayElementB` when executing `helpers.arrayElement(["A", "B", "C"])` in faker mode. It did not return one member of the supplied array.

## Why This Matters

- This is a genuine runtime defect in a changed helper-command surface.
- It undermines trust in the amended command-definition/example work because the published example does not execute correctly.
- It affects a helper command family, which is important because the story scope was broad and not limited to domain commands.

## Environment

- Deployed test environment only: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Session artifacts: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Reproduction

1. Open the deployed generator.
2. In the starter row, set the source type to `faker`.
3. Open the faker command picker.
4. Select `helpers.arrayElement`.
5. Apply the command to the row.
6. Set the column name to `pick`.
7. Enter params as `(["A", "B", "C"])`.
8. Click `Preview`.

## Expected Result

- Each generated value should be exactly one of `A`, `B`, or `C`.
- Output preview and preview grid should contain only those supplied values.

## Actual Result

- The generated values were malformed strings such as:
  - `helpersmarrayElementC`
  - `helpersbarrayElementA`
  - `helpers#arrayElementB`
  - `helpers3arrayElement,`
- The supplied array members were not returned cleanly.

## Evidence

- Main report finding: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)
- Main log final-review retest entry: [issue-226-second-session-test-log.md](issue-226-second-session-test-log.md)
- Screenshot: [helpers-arrayElement-malformed-output.png](helpers-arrayElement-malformed-output.png)

## Likely Investigation Areas

- `packages/core/js/faker/faker-helper-keyword-definitions.js`
- command-help/example parsing for helper commands
- any runtime parser/adaptation layer that translates helper params from the split UI into actual faker helper invocation
- picker/help metadata for helper commands, especially array-shaped arguments

## Investigation Questions

- Is the array argument being serialized into a string and then tokenized incorrectly?
- Is the helper runtime path treating the example text as literal text rather than parsed data?
- Does the same failure happen for other array-based helper commands such as `helpers.arrayElements` or `helpers.shuffle`?
- Does the structured params dialog behave differently from direct textbox entry for this helper?

## Fix Verification Ideas

- Re-run the exact repro above.
- Add at least one additional sample with longer arrays, e.g. `(["red", "green", "blue"])`.
- Confirm both output preview and preview grid contain only supplied members.
- Spot-check a second helper command with array input to ensure the fix is not overly specific.

\newpage

# DEFECT-02-docs-examples-do-not-map-cleanly-to-split-ui.md

# DEFECT-02: Published Full-Command Examples Do Not Map Cleanly To The Split Picker-Plus-Params UI

## Summary

Published docs and picker examples frequently present full invocation strings such as `autoIncrement.sequence(start=10, step=5)` and `literal.value(value="Pending")`, while the live row-mode workflow splits command selection from params entry. A user must infer that the command should be selected separately and only the params belong in the params box.

## Why This Matters

- The story goal was not only examples exist but that examples help users use commands correctly.
- This mismatch creates false failure signals and real usability friction.
- Earlier runtime-failure conclusions were partially corrected only after retesting with the split UI used as intended.

## Environment

- Deployed test environment: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Published docs under [site/docs](https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data)

## Reproduction

1. Open a published command docs page, for example:
   - `autoIncrement.sequence`
   - `finance.pin`
   - `literal.value`
   - `string.alpha`
2. Read a published example formatted as a full invocation string.
3. Open the deployed generator in row mode.
4. Select the relevant source type and command.
5. Attempt to follow the documentation literally rather than infering the split workflow.

## Expected Result

- Published examples should either:
  - map directly into the live UI, or
  - clearly explain how to translate a full invocation into the split command-picker and params-entry workflow.

## Actual Result

- Examples are present, but the translation into the live UI is implicit.
- A user can easily paste or mentally model the full invocation incorrectly.
- Several earlier suspicious failures in the exploratory session turned out to be workflow/format mismatch rather than true generator-runtime failure.

## Evidence

- Docs consistency findings: [docs-consistency-test-log.md](docs-consistency-test-log.md)
- Main log final-review correction: [issue-226-second-session-test-log.md](issue-226-second-session-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs generation in `docs-src/docs/040-test-data/domain/*`
- command help metadata generation
- picker/help rendering that shows examples
- any docs/help spec that defines canonical example format

## Investigation Questions

- Should docs be rewritten to show separate command and params examples for row mode?
- Should the UI accept a pasted full-command example and split it automatically?
- Is there already a text-mode surface where the full-command examples are correct and clearer?

## Fix Verification Ideas

- Choose 3 representative examples from different families.
- Confirm a reviewer can follow them in row mode without extra undocumented inference.
- Verify picker examples and published docs use a consistent, explicit format.

\newpage

# DEFECT-03-deployed-help-links-not-nested-site-safe.md

# DEFECT-03: Deployed Help And Docs Links Are Not Consistently Nested-Site-Safe

## Summary

Help and docs links exposed by the deployed app/generator drift across mixed hosts and paths, including `/grid-table-editor/docs/...`, `eviltester.github.io/docs/...`, and `anywaydata.com/...`, instead of consistently staying inside the deployed nested test-environment docs path.

## Why This Matters

- Reviewers in the deployed test environment can be sent to the wrong host or wrong base path.
- This weakens trust in the test environment and makes docs parity harder to validate.
- The PR included broad docs/help changes, so path correctness is part of the changed surface.

## Environment

- Deployed app: [app.html](https://eviltester.github.io/grid-table-editor/app.html)
- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Expected nested docs base: `https://eviltester.github.io/grid-table-editor/site/docs/...`

## Reproduction

1. Open the deployed app or generator.
2. Trigger several inline docs/help links from changed surfaces.
3. Inspect the link destinations or navigate through them.

## Expected Result

- Deployed help/docs links should consistently target the intended nested docs base for the deployed environment.

## Actual Result

- Sampled links pointed to mixed targets including:
  - `https://eviltester.github.io/grid-table-editor/docs/...`
  - `https://eviltester.github.io/docs/...`
  - `https://anywaydata.com/...`

## Evidence

- Docs consistency log: [docs-consistency-test-log.md](docs-consistency-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs/help link generation paths
- environment-specific site base-path handling
- any code that hardcodes docs hostnames instead of using the deployed nested base

## Investigation Questions

- Which links are intentionally external versus accidentally externalized?
- Are there separate link builders for app, generator, and docs-generated command pages?
- Is the deploy target base path injected inconsistently?

## Fix Verification Ideas

- Spot-check links from generator, app, and picker/help surfaces after the change.
- Confirm nested-site-safe behavior from the deployed environment.
- Verify intentional external links are still deliberate and consistently labeled.

\newpage

# DEFECT-04-image-urlLoremFlickr-still-published-in-docs.md

# DEFECT-04: Removed `image.urlLoremFlickr` Command Still Appears In Published Image Docs

## Summary

`image.urlLoremFlickr` is absent from the live picker/runtime but still present in the published image docs/help surface, including method listings and body content.

## Why This Matters

- The PR notes indicate the deprecated command was removed.
- Leaving it in published docs creates stale guidance and can mislead users into looking for a command that no longer exists.
- This is a concrete removal/regression-parity defect and is useful as a focused docs-fix task.

## Environment

- Live picker/runtime: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Published image docs: [site/docs/test-data/domain/image](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image)

## Reproduction

1. Open the deployed generator.
2. Switch a row to `domain`.
3. Open the live picker and inspect image-related commands.
4. Search for or visually inspect whether `image.urlLoremFlickr` exists.
5. Open the published image docs page.
6. Search the page for `image.urlLoremFlickr`.

## Expected Result

- If the command has been removed, it should no longer be visible in live picker/runtime or in published docs/help content.

## Actual Result

- It is absent from the live picker/runtime.
- It is still present in the published image docs/help content.

## Evidence

- Command coverage log: [command-coverage-test-log.md](command-coverage-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- image domain docs source markdown
- docs generation path for removed commands
- command catalog to docs sync rules

## Investigation Questions

- Was the runtime catalog updated without regenerating the image docs?
- Is the docs generator consuming a stale source list for image commands?
- Are there other removed commands still present in published docs?

## Fix Verification Ideas

- Re-check the image docs page and table of contents after the change.
- Confirm the command is absent from both docs and picker/runtime.
- Spot-check another removed or renamed command to rule out a broader stale-doc generation problem.

\newpage

# DEFECT-05-airline-docs-naming-does-not-match-picker.md

# DEFECT-05: Published Airline Docs Naming Does Not Match Live Picker Naming

## Summary

The published airline docs use aggregate/nested naming such as `airline.airline`, `airline.airplane`, `airline.airport`, `airline.airline.iataCode`, and `airline.airline.name`, while the live picker exposes flattened names like `airline.iataCode`, `airline.name`, `airplane.iataTypeCode`, and `airport.iataCode`.

## Why This Matters

- Users cannot reliably map docs entries to picker entries.
- This weakens discoverability and makes broad example-following harder than it should be.
- The PR heavily changed help/docs metadata, so naming consistency is important.

## Environment

- Published docs page: [site/docs/test-data/domain/airline](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/airline)
- Live picker: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the published airline docs page.
2. Note the names used in page sections, tables of contents, and examples.
3. Open the deployed generator and switch a row to `domain`.
4. Open the command picker and inspect airline/airplane/airport entries.

## Expected Result

- Published docs naming should match the names a user sees in the live picker closely enough that the mapping is obvious.

## Actual Result

- The published naming model and the live picker naming model do not line up cleanly.

## Evidence

- Docs consistency log: [docs-consistency-test-log.md](docs-consistency-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- airline docs source markdown
- keyword-definition naming strategy
- command-help metadata generation for display names
- picker grouping/display rules

## Investigation Questions

- Is the docs surface intentionally more hierarchical while the picker is intentionally flatter?
- If yes, where should the mapping explanation live?
- If not, which naming convention should be treated as canonical?

## Fix Verification Ideas

- Compare docs and picker after the change for airline, airplane, and airport entries.
- Ask whether a first-time reviewer can locate a docs command in the picker without guesswork.

\newpage

# DEFECT-06-invalid-param-feedback-is-inconsistent-and-can-leave-stale-data-visible.md

# DEFECT-06: Invalid-Parameter Feedback Is Inconsistent And Can Leave Stale Generated Data Visible

## Summary

Bad parameter inputs do not fail consistently. The deployed app showed three different failure modes:

- malformed regenerated output with no validation message
- generic `**ERROR**` output with weak or missing explanation
- explicit row-level validation while stale prior generated data remains visible

This makes it hard for users to tell what actually happened.

## Why This Matters

- Invalid-input handling is a core part of the amended validator work in PR #231.
- Users cannot distinguish validator blocked this input from generation failed downstream from the old data is still on screen.
- This is a high-value follow-up defect for another agent because it likely touches validators, UI messaging, and stale-data handling.

## Environment

- Deployed app/generator only: [app.html](https://eviltester.github.io/grid-table-editor/app.html)

## Reproduction Examples

The exploratory session observed all three failure modes with real inputs. Examples include:

1. `string.alpha(length=abc)`:
   - malformed generated output
   - no clear validation message
2. `string.alpha(casing="sideways")`:
   - `**ERROR**`
   - weak/generic explanation
3. `internet.protocol(secure=true)`:
   - row-level validation message appears
   - prior generated cell stays visible

## Expected Result

- Invalid inputs should fail in a consistent, understandable way.
- If generation is blocked, stale prior data should not remain deceptively visible as if it were current.

## Actual Result

- Different invalid inputs fail through different pathways with inconsistent user feedback.
- In at least one clear validator case, the old generated cell remained visible.

## Evidence

- Detailed negative pass: [negative-validation-test-log.md](negative-validation-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- validator invocation path
- invalid-params UI messaging
- preview-grid refresh/clear behavior when validation blocks generation
- state carryover between one invalid case and the next

## Investigation Questions

- Which layer decides whether generation should proceed, be blocked, or render generic `**ERROR**`?
- When validation fails, should preview/grid be cleared, marked stale, or left untouched with explicit stale-state messaging?
- Are different command families bypassing a common validator contract?

## Fix Verification Ideas

- Re-run the exact invalid cases above.
- Confirm all of them fail through one coherent UX pattern.
- Verify no stale previous generated value remains visually misleading after a blocked regeneration.

\newpage

# DEFECT-07-malformed-parentheses-guidance-message-is-itself-wrong.md

# DEFECT-07: Malformed-Parentheses Guidance Message Teaches Broken Syntax

## Summary

For malformed params missing a closing parenthesis, the app does surface a row-level message, but the example text in the message is itself wrong. It shows doubled opening parentheses and still omits the closing parenthesis.

## Why This Matters

- This is one of the clearer validator pathways, so the guidance needs to be correct.
- Incorrect error-help text actively teaches users the wrong fix.

## Environment

- Deployed app/generator only: [app.html](https://eviltester.github.io/grid-table-editor/app.html)

## Reproduction

1. Open the deployed app/generator.
2. Set a command with params, such as `string.alpha`.
3. Enter malformed params without the closing parenthesis, e.g. `string.alpha(length=4`.
4. Trigger generation/preview.

## Expected Result

- The validation message should show the correct fixed syntax, e.g. `(length=4)`.

## Actual Result

- The message showed examples like:
  - `Row 1: params should be wrapped in parentheses, e.g. ((length=4).`
  - `Row 1: params should be wrapped in parentheses, e.g. ((start=1, step=5).`

## Evidence

- Negative validation log: [negative-validation-test-log.md](negative-validation-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- validator error message templates for malformed params
- any common helper that formats parameter examples in validation output

## Investigation Questions

- Is the broken guidance generated by string concatenation or by a reusable formatter?
- Do other validation messages use the same example-formatting helper?

## Fix Verification Ideas

- Re-run the malformed-parentheses cases for at least two commands.
- Confirm the message shows correct syntax with one opening and one closing parenthesis.

\newpage

# DEFECT-08-generator-accessibility-structure-and-help-controls.md

# DEFECT-08: Generator Accessibility Structure And Help Controls Are Weaker Than The Docs Shell

## Summary

The generator shell lacks basic structural accessibility landmarks and uses weaker help-control semantics than the docs site.

Confirmed issues from the exploratory session:

- no `main`
- no `h1`
- no skip link
- some help triggers implemented as `span[role="button"]` instead of native buttons
- the top help trigger exposes content without updating `aria-expanded`

## Why This Matters

- The story outcome depends heavily on help/example discoverability.
- Accessibility regressions on the generator reduce usability for keyboard and assistive-technology users.
- The docs shell was observed to be better structured, so this is a meaningful parity gap.

## Environment

- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the deployed generator.
2. Inspect the page structure and heading/landmark model.
3. Inspect or interact with help triggers, especially the top `Show help` affordance.

## Expected Result

- The generator should expose baseline landmark and heading structure comparable to the docs shell.
- Interactive help controls should use strong, accurate semantics and reflect expanded state correctly.

## Actual Result

- `generator.html` lacks `main`, `h1`, and a skip link.
- Some help controls are `span[role="button"]`.
- The top help trigger shows content without updating `aria-expanded`.

## Evidence

- Responsive/accessibility log: [responsive-accessibility-test-log.md](responsive-accessibility-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- generator page template/structure
- help-trigger component markup
- ARIA state management for expandable help content

## Investigation Questions

- Which help controls can be upgraded to native buttons without side effects?
- Why is `aria-expanded` not updating even when the content is shown?
- Can the generator reuse structural patterns already present in the docs shell?

## Fix Verification Ideas

- Re-check the generator page for `main`, `h1`, and skip link presence.
- Confirm help controls are keyboard-robust native controls where appropriate.
- Confirm `aria-expanded` tracks visible help state accurately.

\newpage

# DEFECT-09-mobile-docs-command-tables-overflow-narrow-viewports.md

# DEFECT-09: Mobile Docs Command Tables Overflow Narrow Viewports

## Summary

Dense command-reference tables on published docs pages overflow their containers on narrow mobile widths and require awkward horizontal scrolling.

## Why This Matters

- The PR invested heavily in examples and docs richness.
- If dense argument/reference tables are hard to use on phones, the expanded docs value is reduced.

## Environment

- Published docs pages, especially [site/docs/test-data/domain/string](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string)
- Narrow widths sampled during testing:
  - `390x844`
  - `320x568`

## Reproduction

1. Open a dense command-reference docs page such as `site/docs/test-data/domain/string`.
2. Resize to a narrow mobile viewport, e.g. `390px` or `320px` width.
3. Inspect argument/reference tables.

## Expected Result

- Tables should remain readable within the mobile experience with minimal awkward horizontal scrolling.

## Actual Result

- Dense tables overflow their containers significantly and require repeated horizontal scrolling.
- Sampled sizes during the session:
  - around `366px` to `466px` wide inside a `343px` container at `390px` width
  - around `366px` to `466px` wide inside a `273px` container at `320px` width

## Evidence

- Responsive/accessibility log: [responsive-accessibility-test-log.md](responsive-accessibility-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- docs table styling and responsive treatment
- long-code/example column behavior on mobile
- docs theme/table wrappers for overflow handling

## Investigation Questions

- Should parameter tables collapse, stack, or offer a different mobile presentation?
- Are only certain docs pages affected, or is this a general command-table styling issue?

## Fix Verification Ideas

- Re-check `string` and at least one other dense domain page at `390px` and `320px`.
- Confirm the resulting experience is materially easier to read and navigate on narrow screens.

\newpage

# DEFECT-10-command-switching-can-preserve-stale-params.md

# DEFECT-10: Switching Commands Can Preserve Stale Params For The Previously Selected Command

## Summary

When switching commands in the generator row flow, the params field can retain stale params text from the previously selected command instead of clearing or reconciling it for the new command.

## Why This Matters

- This can contaminate example execution and lead users to think the new command is broken.
- It contributed materially to early false-failure interpretations in the exploratory session.
- Another agent investigating generator workflow regressions should treat this as a distinct state-management defect.

## Environment

- Deployed generator: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)

## Reproduction

1. Open the deployed generator.
2. Switch a row into a command mode that uses params.
3. Select a command with params, such as `autoIncrement.sequence`.
4. Enter meaningful params such as `(start=10, step=5)`.
5. Change the selected command to another command such as `string.alpha`.
6. Observe the params field.

## Expected Result

- The params field should either:
  - clear, or
  - adapt safely and obviously for the newly selected command.

## Actual Result

- The old params can remain in the field after the command switch.
- This creates misleading row state for the newly selected command.

## Evidence

- Main log early Loop 1 observations: [issue-226-second-session-test-log.md](issue-226-second-session-test-log.md)
- UX regression log: [ux-regression-test-log.md](ux-regression-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](issue-226-second-session-test-report.md)

## Likely Investigation Areas

- row-state synchronization after command selection changes
- picker apply/close lifecycle
- params field state ownership in the generator UI

## Investigation Questions

- Is stale params text preserved intentionally for convenience, or is it accidental carryover?
- If intentionally preserved, should the UI mark it invalid or incompatible for the new command immediately?
- Does the same issue occur when switching between domain and faker commands?

## Fix Verification Ideas

- Re-run the command-switch flow with at least two command pairs.
- Confirm the new command starts from clean or clearly validated params state.
- Verify the change does not break the structured params dialog workflow.

