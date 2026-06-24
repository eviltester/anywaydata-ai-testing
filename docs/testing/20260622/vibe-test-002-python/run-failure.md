# Vibe Test Python Run Failure

- Date: 2026-06-22
- Target: `https://eviltester.github.io/grid-table-editor/site/app.html`
- Requested output folder: `docs/testing/20260622/vibe-test-002-python`

## Outcome

The local Ollama-backed Python app did not complete a full run.

## What succeeded

- The experiment package installed successfully.
- The Windows Playwright subprocess wrapper was repaired to use `npx.cmd`.
- The Playwright wrapper logic was repaired to keep the `@playwright/cli` package argument when using `npx.cmd`.
- The local Ollama structured-output client was reachable and had previously passed a small smoke test.

## Blocking failure

The app repeatedly failed during the scout planning phase before any full run artifacts were produced.

The immediate blocking exception was:

```text
TimeoutError: timed out
```

This occurred while waiting for the local Ollama model to answer the structured `plan_tasks(...)` request for the target page snapshot.

## Notes

- The blocker is in the local-model planning stage, not in the initial browser launch.
- The app likely needs one or more of the following before it will run reliably on this page:
  - a much smaller or more aggressively simplified scout payload
  - a faster local model
  - a lighter planning prompt
  - a fallback non-JSON planning path
  - cached or heuristic task generation instead of full-model planning from the entire snapshot
