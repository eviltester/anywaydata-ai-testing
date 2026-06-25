from __future__ import annotations

import json
import os
import urllib.request
from typing import TypeVar

from pydantic import TypeAdapter

from .models import AgentAction, SeveritySummary, TaskPlan


SCOUT_PROMPT = """You are planning exploratory browser QA tasks from a Playwright accessibility snapshot.

Goal:
- partition the page into 6-8 focused, non-overlapping test tasks
- prefer core user workflows, navigation, forms, filters, dialogs, settings, workflows, and responsive risks
- include only tasks that are grounded in the visible snapshot

Important:
- do not invent hidden UI
- do not assume any mode, filter, tab, toggle, dialog state, or selected option is active unless the snapshot clearly shows it
- require the worker to verify relevant state and setup before concluding that behavior is a defect
"""


ACTION_PROMPT = """You are a browser QA worker controlling a page through Playwright CLI refs from the provided snapshot.

Choose exactly one next action.

Rules:
- Use only refs visible in the current snapshot.
- Prefer concrete interactions over discussion.
- Do not raise a bug unless the setup is valid and the visible UI state matches the thing being tested.
- Verify relevant preconditions before concluding that behavior is defective.
- If you have enough evidence, return action=done with status success, issue, or blocked.
- If you suspect a defect, capture a screenshot before action=done.
"""


SUMMARY_PROMPT = """You are summarizing browser QA findings.

Report only real observed defects.
- Deduplicate repeated findings.
- Exclude invalid test setups and user-error interpretations.
- Bucket findings into high, medium, and low severity.
"""


T = TypeVar("T", TaskPlan, AgentAction, SeveritySummary)


class LLMClient:
    def __init__(self) -> None:
        self.base_url = os.getenv("VIBE_TEST_OLLAMA_URL", "http://127.0.0.1:11434").rstrip("/")
        self.model = os.getenv("VIBE_TEST_OLLAMA_MODEL", "qwen3:14b")
        self.summary_model = os.getenv("VIBE_TEST_OLLAMA_SUMMARY_MODEL", self.model)
        self.max_snapshot_chars = int(os.getenv("VIBE_TEST_MAX_SNAPSHOT_CHARS", "12000"))
        self.max_reports_chars = int(os.getenv("VIBE_TEST_MAX_REPORTS_CHARS", "30000"))

    def _trim(self, text: str | None, limit: int) -> str:
        value = text or ""
        if len(value) <= limit:
            return value
        truncated = value[:limit]
        return f"{truncated}\n\n[truncated {len(value) - limit} chars]"

    def _chat_structured(self, *, model: str, system: str, user: str, schema_type: type[T]) -> T:
        schema = TypeAdapter(schema_type).json_schema()
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            "stream": False,
            "think": False,
            "format": schema,
            "options": {
                "temperature": 0.2,
            },
        }
        req = urllib.request.Request(
            f"{self.base_url}/api/chat",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=180) as response:
            response_payload = json.loads(response.read().decode("utf-8"))
        content = response_payload.get("message", {}).get("content", "")
        if not content:
            raise RuntimeError(f"Ollama returned empty content: {response_payload}")
        return TypeAdapter(schema_type).validate_json(content)

    def plan_tasks(self, url: str, snapshot: str, console_output: str | None = None) -> TaskPlan:
        prompt = f"""{SCOUT_PROMPT}

URL: {url}

Snapshot:
{self._trim(snapshot, self.max_snapshot_chars)}

Console:
{self._trim(console_output or "<none>", 2000)}
"""
        return self._chat_structured(
            model=self.model,
            system="Plan focused browser QA tasks from the visible page only.",
            user=prompt,
            schema_type=TaskPlan,
        )

    def next_action(
        self,
        url: str,
        task_title: str,
        task_instructions: str,
        snapshot: str,
        steps: list[str],
        console_output: str | None = None,
        network_output: str | None = None,
    ) -> AgentAction:
        joined_steps = "\n".join(f"- {step}" for step in steps) or "<none>"
        prompt = f"""{ACTION_PROMPT}

URL: {url}
Task title: {task_title}
Task instructions: {task_instructions}

Steps so far:
{joined_steps}

Snapshot:
{self._trim(snapshot, self.max_snapshot_chars)}

Console:
{self._trim(console_output or "<not collected>", 2000)}

Network:
{self._trim(network_output or "<not collected>", 4000)}
"""
        return self._chat_structured(
            model=self.model,
            system="Choose the single best next browser QA action from the visible state.",
            user=prompt,
            schema_type=AgentAction,
        )

    def summarize(self, url: str, reports_json: str) -> SeveritySummary:
        prompt = f"""{SUMMARY_PROMPT}

URL: {url}

Worker reports:
{self._trim(reports_json, self.max_reports_chars)}
"""
        return self._chat_structured(
            model=self.summary_model,
            system="Summarize browser QA results into severity buckets with only real defects.",
            user=prompt,
            schema_type=SeveritySummary,
        )
