# AnyWayData AI Testing

This repo will contain artifacts and experiments used when expanding the use of AI tooling to explore assisting the testing process for AnyWayData.

Repo for AnyWayData is here:

- https://github.com/eviltester/grid-table-editor

Test Environment For AnyWayData is here:

https://eviltester.github.io/grid-table-editor

All interactive sessions are documented in [/docs/testing](/docs/testing/) in the dated folders with each session having its own index.

## Monitor Session

I tried a monitor session.

A prompt to monitor the test environment every 10 minutes and when a new version is released, retest the application for the issue and PR.

- The inital monitor log - https://github.com/eviltester/anywaydata-ai-testing/tree/main/docs/testing/20260624/issue-228-monitor
- The triggered session - https://github.com/eviltester/anywaydata-ai-testing/tree/main/docs/testing/20260625
- The end monitor log - https://github.com/eviltester/anywaydata-ai-testing/tree/main/docs/testing/20260625/issue-228-monitor

This worked, but it polled the environment every minute. But when the env was updated, the interactive exploration did trigger.

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
- 20260625 amended to
  - try and reduce teh amount of files in the root report folder - put agent logs in /logs and put any supporting scripts or data in /support
- 20260627 amended to
  - try to capture videos of bug replication and report issues to github
- 20260628 amended to
  - improve target github test report
  - remove non-evidential screenshots  
- 20260629 amended to
  - move goal prompt into own file for easier maintenance and re-use
  - [ai-review-goal.md](ai-review-goal.md)
  - added text to add defect evidence as attachments


