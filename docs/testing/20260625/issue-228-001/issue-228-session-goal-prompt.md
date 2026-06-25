# Issue 228 Session Goal Prompt

Monitor the test environment every 10 minutes and when it has a new version of the application perform the retest again for:

Perform a comprehensive multi-agent exploratory test review of issue/story #228 and PR #243 using the deployed test environment only.

- Story: https://github.com/eviltester/grid-table-editor/issues/228
- PR: https://github.com/eviltester/grid-table-editor/pull/243
- Test environment: https://eviltester.github.io/grid-table-editor/

Prior to any testing check that the test environment opens in a browser and can be interacted with using Chrome DevTools MCP or Playwright MCP.

Operating rules:

- This is a test-environment exploratory review, not a code-change task.
- Do not run local verify commands, build commands, package-manager test commands, or repo test commands unless explicitly asked.
- Write every artifact for this session under `docs/testing/yyyymmdd/issue-999-001/`.
- Do not finish after the first defect pattern.
- Do not narrow scope to one or two commands.
- Treat the fact that nearly all command definitions changed as a primary coverage requirement.

Required deliverables include the main append-only sequential log, main report, final PDF export, subagent logs, screenshots where useful, split defect markdown files, collated `test-logs-and-defects.md`, PDFs, and README.

Mandatory coverage includes broad command family sampling, positive and negative cases, deployed docs/help/runtime comparison, looped execution with at least three loops plus a final review loop, and mandatory subagent delegation for command coverage, negative validation, docs consistency, UX regression, and responsive/accessibility review.
