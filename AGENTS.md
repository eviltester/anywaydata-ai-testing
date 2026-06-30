# Agent Instructions

## Git Safety Rules

- Never use `git add -f` in this repository.
- Never commit any files or folders named `support` under test artifact folders.
- Never commit any files or folders named `videos` or `video` under test artifact folders.
- Treat `docs/testing/**/support/**`, `docs/testing/**/videos/**`, and `docs/testing/**/video/**` as local-only evidence, even when a task asks for a full artifact bundle.
- If evidence from those folders needs to be preserved in GitHub, summarize it in markdown and link only to committed screenshots, reports, logs, defect markdown, or PDFs.
- Before committing test artifacts, run a staged-file check for forbidden paths and stop if any are present.
- Enable the tracked local hook with `git config core.hooksPath .githooks`.
