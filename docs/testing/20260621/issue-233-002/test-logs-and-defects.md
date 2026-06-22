# Test Logs And Defects

## Reading Order

1. [issue-233-test-report.md](issue-233-test-report.md)
2. [issue-233-test-log.md](issue-233-test-log.md)
3. Subagent logs
4. Individual defect files

## Main Session Artifacts

- Session prompt: [issue-233-session-goal-prompt.md](issue-233-session-goal-prompt.md)
- Main report: [issue-233-test-report.md](issue-233-test-report.md)
- Main sequential log: [issue-233-test-log.md](issue-233-test-log.md)

## Subagent Logs

- Command coverage: [command-coverage-test-log.md](command-coverage-test-log.md)
- Negative validation: [negative-validation-test-log.md](negative-validation-test-log.md)
- Docs consistency: [docs-consistency-test-log.md](docs-consistency-test-log.md)
- UX regression: [ux-regression-test-log.md](ux-regression-test-log.md)
- Responsive and accessibility: [responsive-accessibility-test-log.md](responsive-accessibility-test-log.md)
- Routing consistency: [routing-consistency-test-log.md](routing-consistency-test-log.md)

## Defects

- [Defect 001: Web UI docs page still points hosted quick-start links at `anywaydata.com`](defects/defect-001-visible-web-ui-docs-hosted-links-point-to-anywaydata.md)
- [Defect 002: Testenv pages still publish `anywaydata.com` canonical and analytics URLs](defects/defect-002-testenv-pages-still-publish-anywaydata-canonical-and-analytics-urls.md)
- [Defect 003: Published domain and faker examples do not match runtime behavior](defects/defect-003-published-domain-and-faker-doc-examples-do-not-match-runtime.md)
- [Defect 004: Invalid numeric bounds report success but generate `**ERROR**`](defects/defect-004-invalid-number-bounds-report-success-but-generate-error-cell.md)
- [Defect 005: Visible help popup links are not keyboard reachable](defects/defect-005-help-popup-links-are-not-keyboard-reachable.md)
- [Defect 006: Stale help tooltips can persist and block `Generate`](defects/defect-006-stale-help-tooltips-can-block-generate.md)
- [Defect 007: Narrow-width generator focus order breaks before visible row controls](defects/defect-007-generator-mobile-focus-order-breaks-before-visible-row-controls.md)
- [Defect 008: `Edit as Text` button becomes illegible at `320x568`](defects/defect-008-generator-edit-as-text-button-becomes-illegible-at-320x568.md)
- [Defect 009: Text-mode validation feedback is much weaker than row mode](defects/defect-009-text-mode-validation-feedback-is-much-weaker-than-row-mode.md)

## Screenshot Evidence

- Docs mismatch: [screenshots/docs-consistency-web-ui-docs-full.png](screenshots/docs-consistency-web-ui-docs-full.png)
- Tooltip persistence: [screenshots/ux-regression-app-stale-tooltips.png](screenshots/ux-regression-app-stale-tooltips.png)
- Keyboard-inaccessible help popup: [screenshots/responsive-accessibility-app-390x844-options-help.png](screenshots/responsive-accessibility-app-390x844-options-help.png)
- Generator narrow-width layout: [screenshots/responsive-accessibility-generator-320x568.png](screenshots/responsive-accessibility-generator-320x568.png)

## Notes

- The previously disputed Regex help-link issue was retested and did not reproduce in this session.
- The strongest remaining issues are broader consistency defects beyond that specific link: visible docs leaks, metadata leaks, stale docs examples, false-success validation outcomes, and accessibility/UX regressions.
