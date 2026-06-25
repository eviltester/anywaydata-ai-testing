# Issue 228 Retest Session README

This folder contains the deployed-environment exploratory retest for issue #228 / PR #243 after the test environment changed to commit `a3b39ddcfe0f`.

## Recommended Reading Order

1. [issue-228-test-report.md](issue-228-test-report.md) - main summary, scope, coverage, loops, findings, gaps, and recommendation.
2. [issue-228-test-report.pdf](issue-228-test-report.pdf) - PDF export of the main report.
3. [issue-228-test-log.md](issue-228-test-log.md) - append-only main sequential session log.
4. [test-logs-and-defects.md](test-logs-and-defects.md) - full collated content from main log, subagent logs, and defect files.
5. [test-logs-and-defects.pdf](test-logs-and-defects.pdf) - PDF export of the collated logs and defects.
6. [defects/](defects/) - individual defect reports, one markdown file per confirmed defect or supporting bundled subagent defect note.
7. [screenshots/](screenshots/) - screenshots referenced by the report, subagent logs, and defects.

## Subagent Logs

- [command-coverage-test-log.md](command-coverage-test-log.md)
- [negative-validation-test-log.md](negative-validation-test-log.md)
- [docs-consistency-test-log.md](docs-consistency-test-log.md)
- [ux-regression-test-log.md](ux-regression-test-log.md)
- [responsive-accessibility-test-log.md](responsive-accessibility-test-log.md)
- [enum-canonicalization-test-log.md](enum-canonicalization-test-log.md)

## Supporting Data

- `negative-validation-*.json` files contain raw negative-validation evidence.
- `responsive-accessibility-cdp-results.json` contains structured responsive/accessibility evidence.
- `import-*.schema` files are enum import fixtures used by the enum canonicalization lane.
