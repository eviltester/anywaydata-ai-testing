# AnyWayData AI Testing

This repo will contain artifacts and experiments used when expanding the use of AI tooling to explore assisting the testing process for AnyWayData.

Repo for AnyWayData is here:

- https://github.com/eviltester/grid-table-editor

Test Environment For AnyWayData is here:

https://eviltester.github.io/grid-table-editor

All interactive sessions are documented in [/docs/testing](/docs/testing/) in the dated folders with each session having its own index.

## Next Iteration of Prompt to Try

- 20260621 amended to include
  - explicitly writing out defects to their own files in a defect folder
  - collating all the agent logs and defects into a larger .md file
  - using relative path links
  - check browser interaction prior to doing any work
  - generate README.md
- 20260622 amended to
  - collate the logs and defects into a single file to use through pandoc, not create an index of links
- 20260624 amended to
  - only mention PR and Issue once to avoid mismatched ids in para and lnk 


```text
/Goal Perform a comprehensive multi-agent exploratory test review of issue/story and PR in the github links below with all testing conducted using only the deployed test environment linked to below.

Story: https://github.com/eviltester/grid-table-editor/issues/226
PR: https://github.com/eviltester/grid-table-editor/pull/231
Test environment: https://eviltester.github.io/grid-table-editor/

Prior to any testing check that you can open the test environment in a browser and interact with the application using either Chrome Dev Tools MCP or Playwright MCP.

Operating rules

- This is a test-environment exploratory review, not a code-change task.
- Do not run local verify commands, build commands, package-manager test commands, or repo test commands unless I explicitly ask.
- Write every artifact for this session under `docs/testing/yyyymmdd/issue-999-001/` where yyyymmdd is current date and 999 is the issue number and 001 is the ordinal number for the next test session report e.g. if there are none then 001, if 001 exists then this is incremented to 002.
- Do not finish after the first defect pattern.
- Do not narrow scope to one or two commands.
- Treat the fact that nearly all command definitions changed as a primary coverage requirement, not just background context.

Required deliverables

- Main append-only sequential log:
  - `issue-999-test-log.md`
- Main report that can be refined during the session:
  - `issue-999-test-report.md`
- Final PDF export:
  - `issue-999-test-report.pdf`
- Subagent logs for each delegated area in the same folder
- Any screenshots needed to explain findings, embedded in the markdown report
- Split all defects found into a `/defects` folder with one markdown file per defect. Where each defect is explained in enough detail that another AI agent could process this report to investigate and fix the issue. Include any supporting screenshots as necessary.

Main sequential log format

Every new entry in the main log must be appended, never amended in place, and must use exactly this structure:

---
## timestamp

- What you think you want to do and why

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

the observations and results that you make

---

Prior to any testing you must write this prompt into the test reporting folder as `issue-999-session-goal-prompt.md` where 999 is the issue number you are exploring.

Subagent requirement

You must use subagents. A single-agent pass is not acceptable for this task.

Before substantial testing begins, create a delegation plan and assign at least these subagent charters:

1. Command coverage and example execution
2. Negative validation and malformed parameter testing
3. Docs/help/content consistency across app and published docs
4. UX/usability and workflow regression in the generator, method-picker, help, and related flows
5. Responsive/mobile and accessibility review

Review the story and PR and identify any gaps in agent responsibilities appropriate for that story or PR. Where there are gaps. delegate those gaps to a new subagent.

Each subagent must:

- have a clear written charter
- write its own append-only sequential log in the dated ordinal testing output folder
- document techniques and heuristics used
- report findings, coverage, and new ideas back to the main agent

Suggested filenames:

- `command-coverage-test-log.md`
- `negative-validation-test-log.md`
- `docs-consistency-test-log.md`
- `ux-regression-test-log.md`
- `responsive-accessibility-test-log.md`

Mandatory planning stage

Before substantive testing, the main report must include:

1. Scope summary of the story and PR
2. Risk analysis based on the actual PR changes
3. A changed-surface inventory derived from the PR
4. A command coverage strategy that explicitly addresses the wide command-definition changes
5. A delegation map showing which subagent covers which area
6. A Mermaid model-based coverage diagram
7. A loop strategy that explains how new ideas will be generated, classified, and executed after each pass

Coverage expectations

You must derive a coverage plan from the changed files and then execute it.

At minimum you must:

- inspect the changed docs/help surfaces broadly
- test representative examples from many changed command families, not just one or two
- cover default examples and parameterized examples
- cover positive and negative cases
- compare app help, docs examples, and actual runtime behavior
- explicitly note which command families were sampled, which were deferred, and why

Your command coverage must include broad sampling across:

- domain command families
- faker/helper commands
- newly added commands
- removed/deprecated commands
- commands with validators
- commands with structured or constrained parameters
- commands whose docs now contain multiple examples

Looped execution is mandatory

You must work in explicit loops and document them in the main report and main log.

Loop 1:

- plan
- initial broad coverage
- record findings
- identify gaps

Loop 2:

- review logs, report, coverage, and gaps
- generate at least 10 new test ideas from uncovered areas, edge cases, and inconsistencies
- classify each as `execute-now` or `defer`
- execute every `execute-now` idea unless clearly out of scope
- append all work to the main log
- update the main report

Loop 3:

- repeat the review
- generate at least 10 additional new ideas
- classify each as `execute-now` or `defer`
- execute every `execute-now` idea unless clearly out of scope
- append all work to the main log
- update the main report

Continue beyond Loop 3 if recent loops are still producing meaningful new information.

Stopping rule

You may stop only when all of the following are true:

- coverage is broad enough for the story and PR
- multiple loops have been completed
- recent loops are yielding little genuinely new information
- you explicitly document why stopping is justified

Mandatory final review loop

Before you finish, you must perform a final explicit review pass over:

- the story requirements
- the PR summary and changed files
- the accumulated logs
- the coverage model
- the sampled command families
- the docs reviewed
- the examples tried
- the defects found
- the remaining gaps

In that final review loop you must:

1. identify at least 10 additional test ideas
2. classify each as `execute-now` or `defer`
3. execute every `execute-now` idea unless clearly out of scope
4. append the review and additional testing to the main sequential log
5. update the report to show what changed because of the final review
6. only then generate the final PDF using pandoc and stop

Docs and examples requirement

You must read and test the docs, not just the UI.

You must:

- review the published docs relevant to the changed command families
- explicitly record which docs/pages were reviewed
- try representative examples from the docs, not just ad hoc values
- compare documented examples against actual behavior in the deployed app where practical
- note stale examples, misleading examples, undocumented behavior, removed commands still visible, or new commands missing from docs/help

Required test techniques and heuristics

Document the techniques and heuristics you use, including where relevant:

- exploratory testing
- risk-based testing
- equivalence partitioning
- boundary analysis
- negative testing
- consistency/oracle checking
- state/flow modeling
- pairwise thinking
- accessibility heuristics
- responsive testing heuristics
- documentation testing

Evidence expectations

- Use screenshots when they improve understanding or capture the output of a suspected defect.
- Record actual test data used to trigger a defect.
- Record actual steps used to recreate a defect.
- Embed screenshots in the report using markdown image syntax.
- Record concrete evidence for defects and suspicious behavior.
- Distinguish confirmed defects from hypotheses and follow-up risks.
- For any suspected defect, try to repeat, and if it can be repeated make a note that this is repeatable or not.
- If a behavior may be intentional, say so and explain why it still deserves follow-up.

When adding links to files or between logs and reports in the output. Use relative file path links, not absolute file links.

Final report expectations

The final report must include:

- executive summary
- scope and references
- planning summary
- delegation summary
- model-based coverage diagram(s)
- test techniques and heuristics used
- coverage by command family, docs surface, and workflow area
- loops performed and what changed after each loop
- confirmed defects
- suspicious behaviors and risks
- deferred ideas
- what was not covered and why
- embedded screenshots where useful
- a final recommendation on whether the changes look acceptable for the story

Collate all agent logs and defects into a separate `test-logs-and-defects.md` file which contains all the detailed information and evidence from the agents and defect identification, this is all the content in those log and defect files it is not an index referencing the files, full content such that it can be fed into `pandoc` and used to generate a pdf.

Final response requirements

When completely finished:

- report back in chat
- clearly summarize the most important findings
- state how many loops were completed
- state which subagents were used
- provide links to:
  - the main log
  - the main report markdown
  - the pandoc pdf of the collated `test-logs-and-defects.md` file
  - the final PDF report
- create a README.md which describes the md files and links to each in the best reading order to understand the testing and results

Non-optional constraints

- Do not treat delegation as optional.
- Do not treat the final review loop as optional.
- Do not claim broad coverage without showing the command-family sampling performed.
- Do not stop immediately after finding a defect pattern if broad command coverage has not yet been demonstrated.
```

