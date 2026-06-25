from __future__ import annotations

import asyncio
import json
import os
import time
import uuid
from pathlib import Path

from .llm_client import LLMClient
from .models import SeveritySummary, WorkerResult
from .playwright_cli import PlaywrightCLI, PlaywrightCLIError

_test_results: dict[str, dict] = {}


def _artifacts_root() -> Path:
    root = os.getenv("VIBE_TEST_ARTIFACTS_DIR", "artifacts")
    path = Path(root).resolve()
    path.mkdir(parents=True, exist_ok=True)
    return path


def _run_output_dir(test_id: str, output_dir: str | None) -> Path:
    if output_dir:
        path = Path(output_dir).resolve()
    else:
        path = _artifacts_root() / test_id
    path.mkdir(parents=True, exist_ok=True)
    return path


def _write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


async def scout_page(base_url: str, artifacts_dir: Path) -> tuple[list, str]:
    session = f"scout-{uuid.uuid4().hex[:8]}"
    browser = PlaywrightCLI(session=session, artifacts_dir=artifacts_dir)
    try:
        await browser.open(base_url)
        snapshot = await browser.snapshot()
        console_output = await browser.console()
        planner = LLMClient()
        plan = planner.plan_tasks(base_url, snapshot, console_output)
        return plan.tasks, snapshot
    finally:
        await browser.close()


async def _run_single_agent(base_url: str, agent_id: int, task, artifacts_dir: Path) -> WorkerResult:
    session = f"worker-{agent_id}-{uuid.uuid4().hex[:6]}"
    browser = PlaywrightCLI(session=session, artifacts_dir=artifacts_dir)
    llm = LLMClient()
    steps: list[str] = []
    screenshots: list[str] = []
    console_output: str | None = None
    network_output: str | None = None

    try:
        await browser.open(base_url)
        steps.append(f"Opened {base_url}")

        for _ in range(12):
            snapshot = await browser.snapshot()
            action = llm.next_action(
                url=base_url,
                task_title=task.title,
                task_instructions=task.instructions,
                snapshot=snapshot,
                steps=steps,
                console_output=console_output,
                network_output=network_output,
            )

            if action.action == "click":
                if not action.target_ref:
                    raise PlaywrightCLIError("LLM requested click without target_ref")
                await browser.click(action.target_ref)
                steps.append(f"Clicked {action.target_ref}: {action.rationale}")
            elif action.action == "fill":
                if not action.target_ref:
                    raise PlaywrightCLIError("LLM requested fill without target_ref")
                await browser.fill(action.target_ref, action.text or "")
                steps.append(f"Filled {action.target_ref} with {action.text!r}: {action.rationale}")
            elif action.action == "press":
                await browser.press(action.text or "Enter")
                steps.append(f"Pressed {action.text or 'Enter'}: {action.rationale}")
            elif action.action == "goto":
                if not action.url:
                    raise PlaywrightCLIError("LLM requested goto without url")
                await browser.goto(action.url)
                steps.append(f"Navigated to {action.url}: {action.rationale}")
            elif action.action == "snapshot":
                _ = await browser.snapshot()
                steps.append(f"Captured snapshot: {action.rationale}")
            elif action.action == "console":
                console_output = await browser.console()
                steps.append(f"Collected console output: {action.rationale}")
            elif action.action == "requests":
                network_output = await browser.requests()
                steps.append(f"Collected network output: {action.rationale}")
            elif action.action == "screenshot":
                screenshot_path = await browser.screenshot()
                screenshots.append(screenshot_path)
                steps.append(f"Captured screenshot {screenshot_path}: {action.rationale}")
            elif action.action == "done":
                if action.status == "issue" and not screenshots:
                    screenshot_path = await browser.screenshot()
                    screenshots.append(screenshot_path)
                    steps.append(f"Captured final issue screenshot {screenshot_path}")
                return WorkerResult(
                    agent_id=agent_id,
                    task_id=task.task_id,
                    title=task.title,
                    task=task.instructions,
                    status=action.status or "success",
                    steps=steps,
                    findings=action.findings,
                    screenshots=screenshots,
                    console_output=console_output,
                    network_output=network_output,
                )
            else:
                raise PlaywrightCLIError(f"Unsupported action: {action.action}")

        return WorkerResult(
            agent_id=agent_id,
            task_id=task.task_id,
            title=task.title,
            task=task.instructions,
            status="blocked",
            steps=steps + ["Stopped after hitting max step count"],
            screenshots=screenshots,
            console_output=console_output,
            network_output=network_output,
        )
    except Exception as exc:
        return WorkerResult(
            agent_id=agent_id,
            task_id=task.task_id,
            title=task.title,
            task=task.instructions,
            status="error",
            steps=steps,
            screenshots=screenshots,
            console_output=console_output,
            network_output=network_output,
            error=str(exc),
        )
    finally:
        await browser.close()


async def run_pool(
    base_url: str,
    num_agents: int = 3,
    headless: bool = True,
    output_dir: str | None = None,
) -> str:
    del headless  # Playwright CLI controls its own browser runtime.

    test_id = str(uuid.uuid4())
    start_time = time.time()
    run_dir = _run_output_dir(test_id, output_dir)

    tasks, scout_snapshot = await scout_page(base_url, run_dir)
    if not tasks:
        raise RuntimeError("No tasks generated from scout pass")

    semaphore = asyncio.Semaphore(min(num_agents, 6))

    async def run_wrapped(i: int):
        async with semaphore:
            task = tasks[i % len(tasks)]
            return await _run_single_agent(base_url, i, task, run_dir)

    results = await asyncio.gather(*(run_wrapped(i) for i in range(num_agents)))
    end_time = time.time()

    _test_results[test_id] = {
        "test_id": test_id,
        "url": base_url,
        "agents": num_agents,
        "start_time": start_time,
        "end_time": end_time,
        "duration": end_time - start_time,
        "output_dir": str(run_dir),
        "scout_snapshot": scout_snapshot,
        "results": [result.model_dump() for result in results],
        "status": "completed",
    }
    _write_json(run_dir / "run.json", _test_results[test_id])
    return test_id


async def summarize_bug_reports(test_id: str) -> dict:
    if test_id not in _test_results:
        return {"error": f"Test ID {test_id} not found"}

    test_data = _test_results[test_id]
    url = test_data["url"]
    worker_results = test_data["results"]
    errors = [result for result in worker_results if result["status"] == "error"]
    actionable = [
        result
        for result in worker_results
        if result["status"] in {"success", "issue", "blocked"} and (result.get("findings") or result["status"] != "success")
    ]

    summary = {
        "test_id": test_id,
        "url": url,
        "output_dir": test_data.get("output_dir"),
        "total_agents": len(worker_results),
        "successful_agents": len([r for r in worker_results if r["status"] == "success"]),
        "issue_agents": len([r for r in worker_results if r["status"] == "issue"]),
        "blocked_agents": len([r for r in worker_results if r["status"] == "blocked"]),
        "failed_agents": len(errors),
        "errors": errors,
        "duration_seconds": test_data["duration"],
        "summary_generated": time.time(),
        "worker_results": worker_results,
    }

    if not actionable:
        summary.update(
            {
                "overall_status": "passing",
                "status_description": "No technical issues detected during testing",
                "severity_breakdown": SeveritySummary().model_dump(),
                "total_issues": 0,
            }
        )
        output_dir = test_data.get("output_dir")
        if output_dir:
            _write_json(Path(output_dir) / "summary.json", summary)
        return summary

    llm = LLMClient()
    severity = llm.summarize(url, json.dumps(actionable, indent=2))
    total_issues = (
        len(severity.high_severity)
        + len(severity.medium_severity)
        + len(severity.low_severity)
    )
    overall_status = "passing"
    if severity.high_severity:
        overall_status = "high-severity"
    elif severity.medium_severity:
        overall_status = "medium-severity"
    elif severity.low_severity:
        overall_status = "low-severity"

    summary.update(
        {
            "overall_status": overall_status,
            "status_description": {
                "high-severity": "Critical issues found that need immediate attention",
                "medium-severity": "Moderate issues found that should be addressed",
                "low-severity": "Minor issues found that could be improved",
                "passing": "No technical issues detected during testing",
            }[overall_status],
            "severity_breakdown": severity.model_dump(),
            "total_issues": total_issues,
        }
    )
    output_dir = test_data.get("output_dir")
    if output_dir:
        _write_json(Path(output_dir) / "summary.json", summary)
    return summary
