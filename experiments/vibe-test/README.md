# Vibe Test Codex Experiment

This experiment converts the original Browser Use `vibetest-use` app into a Python app that uses:

- local Ollama models through the Ollama HTTP API
- Playwright CLI for browser interaction
- FastMCP for the same `start/results` tool shape as the original app

## Why this shape

The original app used Browser Use agents to:

1. scout a page
2. partition the page into focused tasks
3. run multiple testing agents
4. summarize findings

This version keeps that control flow, but replaces Browser Use with:

- a local LLM planner to create tasks from a Playwright snapshot
- a local LLM action loop that chooses the next browser action from the latest snapshot
- Playwright CLI sessions as the browser runtime

## Requirements

- Python 3.11+
- Node.js with `npx`
- Playwright CLI available through `npx @playwright/cli`
- Ollama installed and running locally
- at least one local model available in Ollama

Optional environment variables:

- `VIBE_TEST_OLLAMA_MODEL`
  - default: `qwen3:14b`
- `VIBE_TEST_OLLAMA_SUMMARY_MODEL`
  - default: same as `VIBE_TEST_OLLAMA_MODEL`
- `VIBE_TEST_OLLAMA_URL`
  - default: `http://127.0.0.1:11434`
- `VIBE_TEST_PLAYWRIGHT_BIN`
  - default: `npx`
- `VIBE_TEST_ARTIFACTS_DIR`
  - default: `./artifacts`
  - used as the default parent folder when `output_dir` is not passed to a run

## Install

```powershell
cd experiments/vibe-test
python -m pip install -e .
```

## Run as MCP server

```powershell
vibe-test-local-mcp
```

Exposed tools:

- `start(url, num_agents=3, headless=True, output_dir=None)`
- `results(test_id)`

## Run as a CLI

```powershell
vibe-test-local start https://example.com --agents 3 --output-dir D:\tmp\vibe-test-run
vibe-test-local results <test_id>
```

Compatibility aliases are also kept:

- `vibe-test-codex`
- `vibe-test-codex-mcp`

## Notes

- This app uses Playwright CLI screenshots rather than a separate browser context, which avoids the blank screenshot failure seen in earlier experiments.
- It also includes a stricter generic prompt contract telling the local model to verify relevant UI state and test setup before raising a defect.
- Each run can persist `run.json`, `summary.json`, and copied screenshots into a caller-provided `output_dir`.
