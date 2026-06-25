from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class TaskSpec(BaseModel):
    task_id: str
    title: str
    instructions: str
    success_signals: list[str] = Field(default_factory=list)
    failure_signals: list[str] = Field(default_factory=list)
    diagnostics_focus: bool = False


class TaskPlan(BaseModel):
    tasks: list[TaskSpec]


class Finding(BaseModel):
    category: str
    severity_hint: Literal["high", "medium", "low"]
    description: str


class AgentAction(BaseModel):
    action: Literal[
        "click",
        "fill",
        "press",
        "goto",
        "snapshot",
        "console",
        "requests",
        "screenshot",
        "done",
    ]
    rationale: str
    target_ref: str | None = None
    text: str | None = None
    url: str | None = None
    status: Literal["success", "issue", "blocked"] | None = None
    findings: list[Finding] = Field(default_factory=list)


class WorkerResult(BaseModel):
    agent_id: int
    task_id: str
    title: str
    task: str
    status: Literal["success", "issue", "blocked", "error"]
    steps: list[str] = Field(default_factory=list)
    findings: list[Finding] = Field(default_factory=list)
    screenshots: list[str] = Field(default_factory=list)
    console_output: str | None = None
    network_output: str | None = None
    error: str | None = None


class SeveritySummary(BaseModel):
    high_severity: list[Finding] = Field(default_factory=list)
    medium_severity: list[Finding] = Field(default_factory=list)
    low_severity: list[Finding] = Field(default_factory=list)

