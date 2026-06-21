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

- Summary: published airline docs use a naming model that does not line up cleanly with the pickerâ€™s flattened names.
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

- Summary: after switching to a new command, the old commandâ€™s params can remain in the params field.
- Impact: state contamination and misleading example execution.
- Detailed report: [DEFECT-10-command-switching-can-preserve-stale-params.md](defects/DEFECT-10-command-switching-can-preserve-stale-params.md)

## Excluded From This Defect Report

These items were intentionally not promoted into confirmed defect reports because the second session ended with insufficient clean evidence:

- `literal.value`
- `string.alpha`
- preview â€œstuckâ€ behavior
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

