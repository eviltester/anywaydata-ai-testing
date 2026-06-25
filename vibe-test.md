# Codex Vibe Test Prompt

Paste the prompt below into Codex when you want a Codex-native replacement for `vibetest/agents.py` that uses Playwright MCP and Chrome DevTools MCP instead of Browser Use.

```md
You are running a Codex-native multi-step website QA workflow. Use `mcp__playwright` as the primary browser automation engine and `mcp__chrome_devtools` as the diagnostic sidecar.

Your goal is to reproduce the behavior of a multi-agent vibe-test runner:

1. Scout the page once.
2. Partition the page into focused test tasks.
3. Execute each task in an isolated browser pass.
4. Collect screenshots plus console and network evidence when needed.
5. Deduplicate and summarize defects into severity buckets.

Inputs:

- `url`: the site to test
- `agent_count`: default `3`, cap `10`
- `headed`: whether to keep the browser visibly open when supported
- optional `scope_hint`: examples include `checkout`, `auth`, `homepage`

Operating rules:

- Use `mcp__playwright` for navigation and interaction by default.
- Use `mcp__chrome_devtools` only when interaction results are unclear or when you need console or network evidence.
- Keep each task isolated. Start each task from a fresh navigation to the target URL instead of carrying forward state from prior tasks unless the task explicitly requires a multi-step flow.
- Do not report subjective design opinions as bugs.
- Report only observed defects, broken flows, accessibility problems, technical errors, or serious performance failures.
- Always include exact elements, actions, and observed results in findings.

Phase 1: Scout pass

- Navigate to the target URL with `mcp__playwright.browser_navigate`.
- Capture a structural page inventory with `mcp__playwright.browser_snapshot`.
- Capture a baseline screenshot with `mcp__playwright.browser_take_screenshot`.
- If the page appears broken, unstable, or unusually dynamic, inspect:
  - `mcp__chrome_devtools.list_console_messages`
  - `mcp__chrome_devtools.list_network_requests`
- Build a structured inventory of:
  - header and navigation
  - primary CTAs
  - forms and input fields
  - modals, menus, tabs, accordions, dropdowns
  - footer and secondary links
  - route clusters or visibly important flows

Output of the scout pass:

- a concise page inventory
- a list of testable surfaces
- no final bug summary yet

Phase 2: Task partitioning

Convert the scout inventory into 6-8 focused, non-overlapping tasks.

Each task must specify:

- `task_id`
- exact surface or flow to test
- intended interactions
- expected success signals
- failure signals to watch for
- whether console or network diagnostics are likely needed

Prefer task shapes like:

- header navigation and top-level routing
- main CTA flow
- auth or signup form behavior
- modal or dropdown interactions
- footer links and secondary navigation
- mobile or resized layout sanity pass

If `agent_count` exceeds the number of tasks, reuse tasks cyclically. If it is smaller, prioritize the highest-risk tasks first.

Phase 3: Worker execution

Execute each task in its own isolated pass.

Preferred Playwright tools:

- `mcp__playwright.browser_navigate`
- `mcp__playwright.browser_snapshot`
- `mcp__playwright.browser_click`
- `mcp__playwright.browser_type`
- `mcp__playwright.browser_take_screenshot`
- `mcp__playwright.browser_resize` when a resized or mobile check is part of the task

Escalate to Chrome DevTools only when needed:

- `mcp__chrome_devtools.list_console_messages`
- `mcp__chrome_devtools.get_console_message`
- `mcp__chrome_devtools.list_network_requests`
- `mcp__chrome_devtools.get_network_request`
- `mcp__chrome_devtools.handle_dialog`

For each task:

1. Start from the target URL.
2. Execute only the assigned flow or surface.
3. Record the exact steps performed.
4. Capture screenshots before and after when they add evidence.
5. If a click, submit, or navigation behaves unexpectedly, inspect console and network evidence.
6. Classify the task result as `success`, `issue`, or `blocked`.

Normalize each task result into this structure:

```json
{
  "task_id": "cta-flow",
  "status": "issue",
  "steps": [
    "Opened homepage",
    "Clicked 'Start free trial'",
    "Submitted the signup form"
  ],
  "findings": [
    {
      "category": "broken functionality",
      "severity_hint": "medium",
      "description": "Clicking the 'Start free trial' CTA opened the signup form, but submitting valid-looking inputs produced no confirmation, redirect, or inline validation."
    }
  ],
  "artifacts": {
    "screenshots": ["describe or attach artifacts"],
    "console_errors": ["message id or short summary"],
    "network_failures": ["request id or short summary"]
  }
}
```

Parallelism rules:

- If you have true parallel task execution available, you may run tasks concurrently.
- If not, keep the same logical structure and execute sequentially.
- Concurrency is optional. Per-task isolation is required.

Phase 4: Summarization

After all task runs are complete, synthesize a final QA report.

Rules for the summary:

- deduplicate repeated findings across tasks
- separate real issues from opinions or feature requests
- use severity buckets: `high`, `medium`, `low`
- include exact evidence for every issue
- note any blocked or incomplete flows explicitly

Return:

1. A short executive summary with `overall_status`
2. A severity-grouped issue list
3. A per-task results section
4. A short list of blocked areas or manual follow-ups if applicable

Severity guidance:

- `high`: broken core flows, hard failures, severe accessibility problems, repeated JS/runtime failures, or major navigation dead ends
- `medium`: important flows partially broken, forms failing, broken links in meaningful paths, recoverable but real user-facing issues
- `low`: minor but real defects, smaller accessibility issues, layout breakages that do not fully block use

When no issues are found, say so explicitly and mention what was tested.
```
