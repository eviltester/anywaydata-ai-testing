from __future__ import annotations

import argparse
import asyncio
import json

from .runner import run_pool, summarize_bug_reports


def main() -> int:
    parser = argparse.ArgumentParser(description="Run the Codex vibe test experiment.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    start_parser = subparsers.add_parser("start")
    start_parser.add_argument("url")
    start_parser.add_argument("--agents", type=int, default=3)
    start_parser.add_argument("--headed", action="store_true")
    start_parser.add_argument("--output-dir")

    results_parser = subparsers.add_parser("results")
    results_parser.add_argument("test_id")

    args = parser.parse_args()

    if args.command == "start":
        test_id = asyncio.run(
            run_pool(
                args.url,
                num_agents=args.agents,
                headless=not args.headed,
                output_dir=args.output_dir,
            )
        )
        print(test_id)
        return 0

    if args.command == "results":
        payload = asyncio.run(summarize_bug_reports(args.test_id))
        print(json.dumps(payload, indent=2))
        return 0

    return 1
