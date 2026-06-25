from __future__ import annotations

import logging
import os

logging.disable(logging.CRITICAL)
os.environ.setdefault("ANONYMIZED_TELEMETRY", "false")

from mcp.server.fastmcp import FastMCP

from .runner import run_pool, summarize_bug_reports

mcp = FastMCP("vibe-test-codex")


@mcp.tool()
async def start(
    url: str,
    num_agents: int = 3,
    headless: bool = True,
    output_dir: str | None = None,
) -> str:
    """Launch Codex-backed browser testing against a URL."""
    try:
        return await run_pool(url, num_agents=num_agents, headless=headless, output_dir=output_dir)
    except Exception as exc:
        return f"Error starting test: {exc}"


@mcp.tool()
async def results(test_id: str) -> dict:
    """Return the consolidated results for a prior test run."""
    return await summarize_bug_reports(test_id)


def run() -> int:
    mcp.run()
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
