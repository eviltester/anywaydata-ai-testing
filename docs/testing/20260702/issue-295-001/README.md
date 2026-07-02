# Issue 295 / PR 305 Test Artifacts

Recommended reading order:

1. [issue-295-test-report.md](issue-295-test-report.md) - main summary, coverage, loops, defects, risks, and recommendation.
2. [issue-295-test-report.pdf](issue-295-test-report.pdf) - PDF export of the main report.
3. [issue-295-test-log.md](issue-295-test-log.md) - main append-only sequential log.
4. [test-logs-and-defects.md](test-logs-and-defects.md) - full collated content from all subagent logs and defect files.
5. [test-logs-and-defects.pdf](test-logs-and-defects.pdf) - PDF export of the collated logs and defects.
6. [defects/](defects/) - one markdown file per repeatable defect.
7. [logs/](logs/) - delegated lane logs.

Other folders:

- [screenshots/](screenshots/) contains referenced screenshots used by reports, logs, and defect files.
- `support/` contains local-only supporting metadata, scripts/results, and downloaded test data. Do not commit it.
- `videos/` contains local-only defect replication videos. Do not commit it.

Primary outcome:

- Core enum dropdown behavior worked across broad sampled command families.
- Six repeatable defects were split into `defects/`.
- Three main loops plus a final review loop were completed.
