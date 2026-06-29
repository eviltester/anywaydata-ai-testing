# UX Regression Candidate Defects

Session: issue-253-001  
Lane: UX/usability and workflow regression  
Date: 2026-06-29

## Candidate Defects

No repeatable candidate defects were found in this lane.

## Non-Defect Notes

- Known command with invalid duplicate params, `number.int(min=1, min=2, max=3)`, correctly stayed editable in Schema UI and showed a row-level validation error instead of prompting literal conversion.
- Known command with invalid `autoIncrement.sequence(start=1, step=0)` correctly stayed editable in Schema UI and showed a row-level validation error.
- Unknown command `notARealDomain.command(foo=1)` correctly stayed in text mode and showed the literal-conversion decision dialog.
- Invalid params blocked preview generation; correcting params to `(min=1, max=3)` cleared the error and generated preview data.

## Suspicious But Not Repeatable Or Not User-Equivalent

- Transient GitHub Pages/resource-load failures appeared during automation (`ERR_CONNECTION_RESET`, once with unstyled site output). Direct retry rendered the deployed pages correctly.
- Programmatic method-picker search did not produce reliable evidence equivalent to real keyboard entry, so no search defect was filed.
- A guessed docs route returned 404, but it was not a clicked UI link and was excluded from defect consideration.
